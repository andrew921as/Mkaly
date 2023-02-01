import React, {useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {getUser} from '../../../src/functions/requests';
import {Button, CircularProgress} from '@mui/material';

// Diccionaries
import es from '../../../public/languages/es';
import en from '../../../public/languages/en';

// Requests
import {getClientContracts} from '../../../src/functions/requests';

// MAP
// import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet';
import opencage from 'opencage-api-client';
import axios from 'axios';
import {UserContext} from '../../../src/context/UserContext';
import {marker} from 'leaflet';
// import 'leaflet';

const UserInfo = () => {
	var geocoder = new google.maps.Geocoder();
	const router = useRouter();
	const {userId} = router.query;
	const [user, setUser] = useState([]);
	const [contracts, setContracts] = useState([]);
	const {user: currentUser} = useContext(UserContext);
	const [markers, setMarkers] = useState([{coord: [3.4446307, -76.5430657]}]);
	const [isLoading, setIsLoading] = useState(true);
	const {locale} = router;
	const t = locale === 'en' ? en : es;

	const getCoords = async () => {
		try {
			setIsLoading(true);
			let result = await Promise.all(
				contracts.map(async (contract) => {
					let address = `${contract.type_of_avenue}, ${contract.neighborhood}, ${contract.city}, Colombia`;
					let res = await axios.get(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`);
					if (res.data.length > 0) {
						const location = res.data[0];
						// setMarkers([...markersCoords, [location.lat, location.lon]]);
						return {contract, coord: [location.lat, location.lon]};
					} else {
						console.log('No se pudo encontrar la ubicación especificada.');
						return null;
					}
				})
			);

			setMarkers(result);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const fetchUser = async () => {
		const {data} = await getUser(userId);
		const {data: contracts} = await getClientContracts(data.user.id);
		setContracts(contracts.Contract);
		setUser(data.user);
		// setIsLoading(false);
	};

	useEffect(() => {
		setIsLoading(true);
		fetchUser();
	}, []);

	useEffect(() => {
		getCoords();
		console.log(markers);
	}, [contracts]);

	if (isLoading) {
		return (
			<div className="flex w-full h-screen justify-center items-center">
				<CircularProgress />
			</div>
		);
	}

	return (
		<div className="w-full h-full overflow-hidden">
			<h1 className="font-black text-4xl sm:ml-16">
				<span className="cursor-pointer" onClick={() => router.back()}>
					⬅️
				</span>
				{user.first_name_user} {user.sec_name_user} {user.first_lastname_user} {user.sec_lastname_user}
			</h1>
			<div className="text-lg flex flex-col sm:flex-row mt-16 items-center justify-around bg-primary">
				<div className="mb-16 sm:mb-0">
					<p>
						<b>{t.InfoUser.email}:</b> {user.email}
					</p>
					<p>
						<b>{t.InfoUser.username}:</b> {user.username}
					</p>
					<p>
						<b>{t.InfoUser.idCard}:</b> {user.id_card}
					</p>
					<p>
						<b>{t.InfoUser.city}:</b> {user.city}
					</p>
					<p>
						<b>{t.InfoUser.active}:</b> {user.is_active ? 'true' : 'false'}
					</p>
					<p>
						<b>{t.InfoUser.role}:</b> {user.role}
					</p>
					{currentUser.role === 'operator' && (
						<Button onClick={() => router.push(`/user-management/contracts/${userId}`)} sx={{color: 'white'}} color="blue" size="large" variant="contained">
							{t.InfoUser.buttonCreateContract}
						</Button>
					)}
				</div>

				<div className="overflow-hidden rounded-3xl w-full h-[500px] sm:w-[500px] sm:h-[500px]">
					<MapContainer center={markers[0]?.coord?.length > 0 ? markers[0].coord : [3.4446307, -76.5430657]} zoom={14} scrollWheelZoom={true}>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>

						{markers.map((marker) => (
							<Marker position={marker.coord}>
								<Popup>
									{t.InfoUser.contract.contractStart} {marker.contract.contract_number}, {t.InfoUser.contract.contractAddress} {marker.contract.type_of_avenue}{' '}
									# {marker.contract.first_number} - {marker.contract.second_number}.
								</Popup>
							</Marker>
						))}
					</MapContainer>
				</div>
			</div>

			{/* <Map center={[52.6376, -1.135171]} zoom={12}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
            </Map> */}

			{/* {crimes.map(crime => (
        <Marker
          key={crime.id}
          position={[crime.location.latitude, crime.location.longitude]}
          icon={icon}
          onClick={() => {
            setActiveCrime(crime);
          }}
        />
      ))} */}
		</div>
	);
};

export default UserInfo;
