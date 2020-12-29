import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';
import ProductCard from './ProductCard';

function Products(props) {
	const [productData, setProductData] = useState();
	const [uniqueManufact, setUniqueManufact] = useState();
	const [availability, setAvailability] = useState([]);

	let loading = [...Array(15)].map(() => (
		<ProductCard name="Loading..." />
	));

	useEffect(() => {
		const fetchData = () => {
			try {
				axios(`/api/products/${props.product}`, {
					cancelToken: props.source.token
				})
				.then(result => {
					setProductData(result.data);
					console.log("result.data:", result.data);
					setUniqueManufact(result.data.filter((el, i, self) => 
						i === self.findIndex((t) => (
							t.manufacturer === el.manufacturer
						))
					).map(el => el.manufacturer));
					console.log(result);
				})
				.catch(err => {
					if (axios.isCancel(err)) {
						console.log("axios request cancelled", err);
					} else {
						console.log(err);
					}
				});
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [props.source.token, props.product]);

	console.log("uniqueManufact", uniqueManufact);

	useEffect(() => {
		const fetchData = () => {
			try {
				uniqueManufact.forEach(manufact => {
					console.log("quering for", manufact);
					axios(`/api/availability/${manufact}`, {
						cancelToken: props.source.token
					})
					.then(result => {
						setAvailability(prevData => {
							return ([...prevData, {manufacturer: manufact, data: result.data}]);
						});
					})
					.catch(err => {
						if (axios.isCancel(err)) {
							console.log("axios request cancelled", err);
						} else {
							console.log(err);
							setAvailability(prevData => {
								return ([...prevData, {manufacturer: manufact, data: {code: err.response.status, response: null}}]);
							});
						}
					});
				});
			} catch (error) {
				console.log(error);
			}
		};
		if (uniqueManufact) {
			fetchData();
		}
	}, [uniqueManufact, props.source.token]);

	console.log("availability:", availability);

	return (<>
	<div className="products container">
		<div className="row">
			{!productData
			? loading.map(el => {
				return (<ProductCard name={el.props.name} />);
			})
			: productData.map(product => {
				return (<ProductCard name={product.name} inStock={getProductAvailability(product.manufacturer, product.id, availability)} colors={product.color} price={product.price} manufact={product.manufacturer} />);
			})}
		</div>
	</div></>);
}

function getProductAvailability(manufacturer, id, availability) {
	const manufact = availability.find(el => el.manufacturer === manufacturer);
	if (manufact && manufact.data) {
		if (manufact.data.response && manufact.data.response[0]) {
			return (manufact.data.response.find(el => el.id.toLowerCase() === id).inStock);
		} else {
			return ("Error ❌");
		}
	} else {
		return (null);
	}
}

export default Products;