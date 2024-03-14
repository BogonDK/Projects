import React from "react";
import PropTypes from 'prop-types';
import lunch from '../../images/temp-lunch.jpg';
import beauty from '../../images/temp-beauty.jpg';
import home from '../../images/temp-home.jpg';
import retail from '../../images/temp-retail.jpg';
import other from '../../images/temp-other.jpg';
import { useNavigate } from 'react-router-dom';
import styles from './Carousel.css';

const Carousel = ({ offers }) => {
	const navigate = useNavigate();

	const seeOfferDetails = (offerID, businessID, businessName) => {
		navigate('/offerdetails', { state: 
			{ 
				offerID: offerID,
				businessID: businessID,
				businessName: businessName,
			}
		});
	};

	const allCards = () => {
		return (
			offers.map((offer) => {
				const endDate = (new Date(offer.endDate)).toDateString();
				return (
					<button className="card" onClick={() => seeOfferDetails(offer.offerID, offer.businessID, offer.businessName)}>
						<div class="w-full max-w-sm bg-g border border-gray-400 rounded-lg shadow">
							<img src={offer.image} className="carousel-pic"/>
							<div className="px-5 pb-3">
								<a href="#">
									<h5 className="text-lg font-semibold tracking-tight text-gray-900">{offer.title}</h5>
									<h5 className="text-sm font-semibold tracking-tight text-gray-500">{offer.businessName}</h5>
								</a>
							</div>
						</div>
					</button>
				);
			})
		);
	};

	return (
		<div>
			<div className="cards">
				{allCards()}
			</div>
		</div>
	)
};

Carousel.propTypes = {
    offers: PropTypes.any,
};

export default Carousel;
