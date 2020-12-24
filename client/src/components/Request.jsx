import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Request() {
	const [data, setData] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				// const headers = {
				// 	'x-force-error-mode': 'all'
				// };
				const result = await axios("/api/availability/juuran");
				setData(result.data);
				console.log(result);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);
	return (<p>aaa</p>);
}

export default Request;