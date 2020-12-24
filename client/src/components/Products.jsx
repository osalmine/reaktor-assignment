import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';
import ProductCard from './ProductCard';
import Header from './Header';

function Products(props) {
	const [productData, setProductData] = useState();
	const [uniqueManufact, setUniqueManufact] = useState();
	const [availability, setAvailability] = useState([]);
	// const [cancelRequest, setCancelRequest] = useState(false);

	let loading = [...Array(10)].map(() => (
		<ProductCard name="Loading..." />
	));

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios(`/api/products/${props.product}`, {
					cancelToken: props.source.token
				}).catch(err => {
					if (axios.isCancel(err)) {
						console.log("axios request cancelled", err);
					} else {
						console.log(err);
					}
				});
				setProductData(result.data);
				setUniqueManufact(result.data.filter((el, i, self) => 
					i === self.findIndex((t) => (
						t.manufacturer === el.manufacturer
					))
				).map(el => el.manufacturer));
				console.log(result);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	console.log("uniqueManufact", uniqueManufact);

	useEffect(() => {
		const fetchData = async () => {
			try {
				uniqueManufact.forEach(async manufact => {
					console.log("quering for", manufact);
					const result = await axios(`/api/availability/${manufact}`, {
						cancelToken: props.source.token
					}).catch(err => {
						if (axios.isCancel(err)) {
							console.log("axios request cancelled", err);
						} else {
							console.log(err);
						}
					});
					setAvailability(prevData => {
						return ([...prevData, {manufacturer: manufact, data: result.data}])
					});
					// console.log("availability:", result.data);
				});
			} catch (error) {
				console.log(error);
			}
		};
		if (uniqueManufact) {
			fetchData();
		}
	}, [uniqueManufact]);

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
	// console.log("getProductAvailability", id);
	const manufact = availability.find(el => el.manufacturer === manufacturer);
	if (manufact && manufact.data) {
		// console.log("manufact:", manufact.manufacturer);
		if (manufact.data.response) {
			// console.log("manufact.data.response[0].id:", manufact.data.response[0].id);
			// var ok = manufact.data.response.find(el => {
			// 	// console.log(`el.id: ${el.id}, id: ${id}`);
			// 	return (el.id.toLowerCase() == id);
			// })
			// // console.log("manufact.data.response.find(el => el.id === id):", ok);
			// if (ok) {
			// 	console.log("FOUND:", ok);
			// 	console.log(`id: ${id}, manufact: ${manufact.manufacturer}`);
			// }
			// return ("In stock");
			return (manufact.data.response.find(el => el.id.toLowerCase() === id).inStock);
		} else {
			return ("Error");
		}
	} else {
		return ("Loading..");
	}
}

export default Products;