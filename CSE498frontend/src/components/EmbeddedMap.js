import { Fragment, memo, useEffect, useState } from 'react';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';

const EmbeddedMap = ({navigate, filters=null, storefrontId=null}) => {
	const [initialized, setInitialized] = useState(false);
	const [userLocation, setUserLocation] = useState(null);
	const [businesses, setBusinesses] = useState(null);
	const [businessOffers, setBusinessOffers] = useState(null);
	const [markers, setMarkers] = useState(null);
	const [selectedMarker, setSelectedMarker] = useState(null);

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: "AIzaSyCoJ2dosqQree0ARyQ5Isa9XPUt_6CcoRg",
	});

	// Whenever filters change, update the markers
	useEffect(() => {
		// Only run if we have initialized
		if (!initialized) {
			return;
		}

		if (filters.length === 0) {
			// Show all businesses when no filters are set
			setMarkerData(businesses);
		} else {
			// When filters are set, show only filtered businesses
			const filteredBusinesses = [];
			businesses.forEach(business => {
				if (filters.includes(business.category)) {
					filteredBusinesses.push(business);
				}
			});
			setMarkerData(filteredBusinesses);
		}
	}, [filters]);

	useEffect(() => {
		// Set latitude and longitude of user when this component mounts
		navigator.geolocation.getCurrentPosition((position) => {
			setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
		});

		// Get a list of mappable businesses including their name, id, and latLong
		if (!businesses) {
			setMappableBusinesses();
		}

		if (businesses && !businessOffers) {
			setOffersByBusiness(businesses);
		}

		if (businesses && !markers) {
			if (!storefrontId) {
				setMarkerData(businesses);
			} else {
				const singleBusinessList = [];
				businesses.forEach(business => {
					if (business.id === storefrontId) {
						singleBusinessList.push(business)
					}
				});

				setMarkerData(singleBusinessList);
			}
		}

		if (isLoaded && businesses && markers && businessOffers) {
			// Everything is initialized so we are good to display the map
			setInitialized(true);
		}
	}, [businesses, markers, isLoaded]);

	// Set a list of businesses whose coordinates we have
	const setMappableBusinesses = async () => {
		const response = await axios.get("http://localhost:8080/CustomerUsers/BusinessLocations")
		.catch((error) => {
			if (error.response) {
				console.log('Server responded with status code:', error.response.status);
				console.log('Response data:', error.response.data);
			} else if (error.request) {
				console.log('No response received:', error.request);
			} else {
				console.log('Error creating request:', error.message);
			}
		});
		setBusinesses(await response.data);
	};

	// Set an object containing all the offers of each business
	const setOffersByBusiness = (businesses) => {
		const offers = {};
		businesses.forEach(async (business) => {
			const data = { id: business.id }
			const response = await axios.post(
				"http://localhost:8080/BusinessUsers/Analytics",
				data,
				{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
			)
			.catch((error) => {
				if (error.response) {
					console.log('Server responded with status code:', error.response.status);
					console.log('Response data:', error.response.data);
				} else if (error.request) {
					console.log('No response received:', error.request);
				} else {
					console.log('Error creating request:', error.message);
				}
			});

			offers[business.id] = await response.data;
		});

		setBusinessOffers(offers);
	};

	// Set a list of Markers with the names and locations of each business
	const setMarkerData = (businesses) => {
		const markers = [];
		businesses.forEach((business) => {
			const marker = {
				id: business.id,
				name: business.name,
				position: {lat: business.latLong[0], lng: business.latLong[1]},
			};
			markers.push(marker);
		});

		setMarkers(markers);
	};

	return (
		initialized ? (
			<GoogleMap
				mapContainerStyle={{width: '100%', height: '100%'}}
				center={storefrontId ? markers[0].position : userLocation}
				zoom={15}
				clickableIcons={false}
				options={{
					styles: [{
						featureType: "poi",
						stylers: [{ visibility: "off" }],
					}]
				}}
			>
				{!storefrontId && <Marker
					key="userMarker"
					position={userLocation}
				/>}
				{markers.map((marker) => {
					return (
						<Marker
							key={marker.name}
							position={marker.position}
							onClick={storefrontId ? null : () => setSelectedMarker(marker)}
							icon={"../../map-marker-icon.png"}
							zIndex={1}
						/>
					);
				})}
				{selectedMarker && (
					<>
						<Marker
							key={selectedMarker.name}
							position={selectedMarker.position}
							onClick={() => {setSelectedMarker(null)}}
							icon={"../../map-marker-icon.png"}
							zIndex={2}
						/>
						<InfoWindow
							position={selectedMarker.position}
							options={{pixelOffset: new window.google.maps.Size(0, -40)}}
							onCloseClick={() => {setSelectedMarker(null)}}
						>
							<div>
								<h1
									className='text-lg font-normal hover:underline cursor-pointer'
									onClick={() => {
										navigate('/storefront', { state: { businessID: selectedMarker.id } });
									}}
								>
									{selectedMarker.name}
								</h1>
								{businessOffers[selectedMarker.id] && businessOffers[selectedMarker.id].map((offer) => {
									return (
										<p key={offer.id}>{offer.title}</p>
									);
								})}
							</div>
						</InfoWindow>
					</>
				)}
			</GoogleMap>
		) : <></>
	);
};

export default memo(EmbeddedMap);