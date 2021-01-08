import { useState, useEffect } from 'react';

export default function useGetManufact(productData) {
	const [uniqueManufact, setUniqueManufact] = useState();

	useEffect(() => {
		const getManufact = () => {
			setUniqueManufact(productData.filter((el, i, self) => 
				i === self.findIndex((t) => (
					t.manufacturer === el.manufacturer
				))
			).map(el => el.manufacturer));
		};
		if (productData) {
			getManufact();
		}
	}, [productData]);
	return uniqueManufact;
}