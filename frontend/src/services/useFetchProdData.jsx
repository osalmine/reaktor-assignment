import { useState, useEffect } from 'react';
import axios from 'axios'

export default function useFetchProdData(props) {
	const [productData, setProductData] = useState();

	useEffect(() => {
		const fetchProdData = () => {
			try {
				console.log(`Quering for ${props.product}`);
				axios(`/api/products/${props.product}`, {
					cancelToken: props.source.token
				})
				.then(result => {
					setProductData(result.data);
					console.log("Product result.data:", result.data);
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
		}
		fetchProdData();
	}, [props.source.token, props.product]);
	return productData;
};