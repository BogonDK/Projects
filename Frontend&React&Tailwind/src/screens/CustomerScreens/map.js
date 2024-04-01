import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmbeddedMap from "../../components/EmbeddedMap";
import PageHeader from "../../components/PageHeader/PageHeader";
import { FooterContainer } from '../../containers/footer';

export const FilterInput = ({id, display, filters, setFilters}) => {
	const handleInputChange = () => {
		let newFilters = filters ? [...filters] : [];
		if (newFilters.includes(id)) {
			// Unset this filter
			newFilters.splice(newFilters.indexOf(id), 1);
		} else {
			// Set this filter
			newFilters.push(id);
		}
		setFilters(newFilters);
	};

	return (
		<div>
			<input type="checkbox" id={id} name={id} className="m-2" onChange={handleInputChange} />
			<label htmlFor={id}>{display}</label>
		</div>
	);
};

const Map = () => {
	const navigate = useNavigate();

	const [filters, setFilters] = useState(null);

	return (
		<div className="flex flex-col md:h-[100vh]">
			<PageHeader screen={'/map'}/>
			<div className="flex flex-col h-[200vh] md:flex-row md:h-full md:flex-1">
				<div className="p-10">
					<h2 className="text-4xl font-bold text-[#5F285E]">Filters:</h2>
					<div className="flex flex-col text-left">
						<FilterInput id="home" display="Home" filters={filters} setFilters={setFilters} />
						<FilterInput id="food" display="Food" filters={filters} setFilters={setFilters} />
						<FilterInput id="retail" display="Retail" filters={filters} setFilters={setFilters} />
						<FilterInput id="beauty" display="Beauty" filters={filters} setFilters={setFilters} />
						<FilterInput id="travel" display="Travel" filters={filters} setFilters={setFilters} />
						<FilterInput id="recreation" display="Recreation" filters={filters} setFilters={setFilters} />
						<FilterInput id="finance" display="Finance" filters={filters} setFilters={setFilters} />
						<FilterInput id="auto" display="Auto" filters={filters} setFilters={setFilters} />
						<FilterInput id="health" display="Health" filters={filters} setFilters={setFilters} />
						<FilterInput id="technology" display="Technology" filters={filters} setFilters={setFilters} />
						<FilterInput id="miscellaneous" display="Miscellaneous" filters={filters} setFilters={setFilters} />
					</div>
				</div>
				<div className="flex-auto h-[80vh]">
					<EmbeddedMap navigate={navigate} filters={filters} />
				</div>
			</div>
			<FooterContainer />
		</div>
	);
};

export default Map;