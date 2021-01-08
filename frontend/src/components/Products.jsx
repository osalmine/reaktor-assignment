import React from 'react';
import './Products.css';
import ProductCard from './ProductCard';
import useFetchProdData from '../services/useFetchProdData'
import useFetchManufactData from '../services/useFetchManufactData'
import useGetManufact from '../services/useGetManufact'
import getProductAvailability from '../services/getProductAvailability'

function Products(props) {
	const productData = useFetchProdData(props);
	const uniqueManufact = useGetManufact(productData);
	const availability = useFetchManufactData(props, uniqueManufact);

	let loading = [...Array(15)].map(() => (
		<ProductCard name="Loading..." />
	));

	console.log("availability:", availability);

	return (
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
	</div>);
}

export default Products;