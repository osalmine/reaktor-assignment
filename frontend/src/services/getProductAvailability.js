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

export default getProductAvailability;