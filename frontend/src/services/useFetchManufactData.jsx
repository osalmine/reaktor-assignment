import { useState, useEffect } from 'react';
import axios from 'axios'

export default function useFetchManufactData(props, uniqueManufact) {
	const [availability, setAvailability] = useState([]);

	useEffect(() => {
		const fetchManufactData = () => {
			try {
				uniqueManufact.forEach(manufact => {
					console.log("quering for", manufact);
					axios(`/api/availability/${manufact}`, {
						cancelToken: props.source.token
					})
					.then(result => {
						setAvailability(prevData => {
							return ([...prevData, { manufacturer: manufact, data: result.data }]);
						});
					})
					.catch(err => {
						if (axios.isCancel(err)) {
							console.log("axios request cancelled", err);
						} else {
							console.log(err);
							setAvailability(prevData => {
								return ([...prevData, { manufacturer: manufact, data: { code: err.response.status, response: null }}]);
							});
						}
					});
				});
			} catch (error) {
				console.log(error);
			}
		}
		if (uniqueManufact) {
			console.log("uniqueManufact", uniqueManufact);
			fetchManufactData();
		}
	}, [uniqueManufact, props.source.token]);

	return availability;
};