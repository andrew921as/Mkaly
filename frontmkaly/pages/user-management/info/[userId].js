import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {getUser} from '../../../src/functions/requests';
import {Button, CircularProgress} from '@mui/material';

// Diccionaries
import es from '../../../public/languages/es';
import en from '../../../public/languages/en';

// MAP
// import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet';
import opencage from 'opencage-api-client';
import axios from 'axios';
// import 'leaflet';

const UserInfo = () => {
	var geocoder = new google.maps.Geocoder();
	const router = useRouter();
	const {userId} = router.query;
	const [user, setUser] = useState([]);
	const [markersCoords, setMarkersCoords] = useState([[3.4446307, -76.5430657]]);
	const [isLoading, setIsLoading] = useState(false);
	const {locale} = router;
	const t = locale === 'en' ? en : es;

	const decodeAddress = async (address) => {
		try {
			let result = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=750d3373673b4ae68d86b6d831c2f327&q=${address}`);
			console.log(result);
		} catch (err) {}
		// opencage
		// 	.geocode({q: address})
		// 	.then((data) => {
		// 		console.log(data.results[0].geometry);
		// 		// { "lat": 49.2909409, "lng": -123.024879 }
		// 	})
		// 	.catch((error) => {
		// 		console.warn(error.message);
		// 	});
	};

	const axios = require('axios');

	const getCoords = async (saddress) => {
		try {
			const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${saddress}&format=json`);
			if (response.data.length > 0) {
				const location = response.data[0];
				// console.log(`C# ${location.lat} ${location.lon}  ---> ${location.display_name}`);
				setMarkersCoords([...markersCoords, [location.lat, location.lon]]);
				return [location.lat, location.lon];
			} else {
				console.log('No se pudo encontrar la ubicación especificada.');
				return null;
			}
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const fetchUser = async () => {
		const {data} = await getUser(userId);
		setIsLoading(false);
		setUser(data.user);
	};

	useEffect(() => {
		setIsLoading(true);
		fetchUser();
		// decodeAddress(encodeURIComponent('Calle 3 oeste, San Cayetano, Cali, Colombia'));
		getCoords('calle 19, villagorgona, candelaria, colombia').then((coords) => {
			console.log(coords);
		});
	}, []);

	if (isLoading) {
		return <CircularProgress />;
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
					<Button onClick={() => router.push(`/user-management/contracts/${userId}`)} sx={{color: 'white'}} color="blue" size="large" variant="contained">
						{t.InfoUser.buttonCreateContract}
					</Button>
				</div>

				<div className="overflow-hidden rounded-3xl w-full h-[500px] sm:w-[500px] sm:h-[500px]">
					<MapContainer center={[3.4446307, -76.5430657]} zoom={14} scrollWheelZoom={true}>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>

						{markersCoords.map((coord) => (
							<Marker position={coord}>
								<Popup>Property of {user.first_name_user}.</Popup>
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
