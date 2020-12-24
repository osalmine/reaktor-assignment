const express = require("express");
const path = require('path');
const axios = require('axios');

const port = process.env.PORT || 4200;
const apiUrl = 'https://bad-api-assignment.reaktor.com/v2/';

const app = express();

const clientPath = path.join(__dirname, '..', 'client/build');
app.use(express.static(clientPath));

var requestAgainNb = 5;

async function parseAvailability(resData, manufacturer) {
	let parsedJson = {
		"code": 200,
		"response": []
	};

	// console.log(resData.data.response);
	if (resData.data.response === '[]' && requestAgainNb !== 0) {
		setTimeout(() => console.log("waiting 1sec"), 1000);
		console.log("no data");
		requestAgainMb -= 1;
		axios.get(`${apiUrl}availability/${manufacturer}`)
		.then(response => {
			let parsedData = parseAvailability(response);
			return(parsedData);
		})
		.catch(error => {
			console.log(error);
		});
	}
	if (resData.data.response) {
		resData.data.response.forEach(element => {
			const str = element.DATAPAYLOAD;
			const responseCode = str.match(/(?<=(<CODE>))\w+?(?=(<\/CODE>))/);
			const responseStock = str.match(/(?<=(<INSTOCKVALUE>))\w+?(?=(<\/INSTOCKVALUE>))/);
			parsedJson.response.push({"id": element.id, "code": responseCode[0], "inStock": responseStock[0]});
		});
		return (parsedJson);
	} else {
		return (null);
	}
}

axios.interceptors.response.use(null, (err) => {
	console.log("INTERCEPTING RESPONSE");
	if (err) {
		console.log(err);
		return axios.request(config);
	}
	return Promise.reject(err);
});

app.get('/api/availability/:manufacturer', (req, res) => {
	console.log("Manufacturer:", req.params.manufacturer);
	axios.get(`${apiUrl}availability/${req.params.manufacturer}`, {
		// headers: {
		// 	'x-force-error-mode': 'all'
		// }
	}).then(async response => {
			let parsedData = await parseAvailability(response, req.params.manufacturer);
			// console.log(parsedData);
			console.log("sending parsed data");
			res.json(parsedData);
		})
		.catch(error => {
			res.send(error);
		});
});

app.get('/api/products/:product', (req, res) => {
	// console.log(`${apiUrl}products/${req.params.product}`);
	axios.get(`${apiUrl}products/${req.params.product}`)
		.then(response => {
			// console.log(response.data);
			console.log("sent response");
			res.json(response.data);
		})
		.catch(error => {
			// console.log("error");
			res.send(error);
		});
});

app.get('*', (req, res) => {
	// console.log(`Serving ${path.join(clientPath, 'index.html')}`);
	res.sendFile(path.join(clientPath, 'index.html'));
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});