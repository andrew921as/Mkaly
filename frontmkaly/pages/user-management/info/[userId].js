import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {getUser} from '../../../src/functions/requests';
import {CircularProgress} from '@mui/material';

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

	const fetchUser = async () => {
		const {data} = await getUser(userId);
		setIsLoading(false);
		setUser(data.user);
	};

	useEffect(() => {
		setIsLoading(true);
		fetchUser();
		decodeAddress(encodeURIComponent('Calle 3 oeste, San Cayetano, Cali, Colombia'));
	}, []);

	if (isLoading) {
		return <CircularProgress />;
	}

	return (
		<div className="w-full h-full overflow-hidden">
			<h1 className="font-black text-4xl ml-16">
				{user.first_name_user} {user.sec_name_user} {user.first_lastname_user} {user.sec_lastname_user}
			</h1>
			<p>
				<b>Email:</b> {user.email}
			</p>
			<p>
				<b>Username:</b> {user.username}
			</p>
			<p>
				<b>Id card:</b> {user.id_card}
			</p>
			<p>
				<b>City:</b> {user.city}
			</p>
			<p>
				<b>Active:</b> {user.is_active}
			</p>
			<p>
				<b>Role:</b> {user.role}
			</p>
			<div className="overflow-hidden rounded-3xl w-[500px] h-[500px]">
				<MapContainer center={[3.4446307, -76.5430657]} zoom={14} scrollWheelZoom={true}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={[3.4446307, -76.5430657]}>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
					</Marker>
				</MapContainer>
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
