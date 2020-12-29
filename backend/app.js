const express = require("express");
const path = require('path');
const axios = require('axios');

const port = process.env.PORT || 4200;
const apiUrl = 'https://bad-api-assignment.reaktor.com/v2/';

const app = express();

const clientPath = path.join(__dirname, '..', 'frontend/build');
app.use(express.static(clientPath));

async function parseAvailability(resData, manufacturer) {
	let parsedJson = {
		"code": 200,
		"response": []
	};
	if (resData.data.response && resData.data.response !== '[]') {
		resData.data.response.forEach(element => {
			const str = element.DATAPAYLOAD;
			const responseCode = str.match(/(?<=(<CODE>))\w+?(?=(<\/CODE>))/);
			const responseStock = str.match(/(?<=(<INSTOCKVALUE>))\w+?(?=(<\/INSTOCKVALUE>))/);
			parsedJson.response.push({"id": element.id, "code": responseCode[0], "inStock": responseStock[0]});
		});
	}
	return (parsedJson);
}

axios.interceptors.response.use(res => {
	console.log("INTERCEPTING RESPONSE");
	console.log("URL:", res.config.url);
	if (res.data.response === '[]') {
		console.log(res.data.response);
		console.log("REQUESTING AGAIN");
		return axios.get(res.config.url).then(res => {
			console.log("RETURNING SUCCESSFUL DATA", res.data.response[0]);
			return res;
		}).catch(err => {
			console.log("retry failed");
			return Promise.reject(err);
		});
	}
	// console.log("returning interception", res.data.response[0]);
	return res;
});

app.get('/api/availability/:manufacturer', (req, res) => {
	console.log(`URL: ${apiUrl}availability/${req.params.manufacturer}`);
	axios.get(`${apiUrl}availability/${req.params.manufacturer}`, {
		// headers: {
		// 	'x-force-error-mode': 'all'
		// }
	}).then(async response => {
			let parsedData = await parseAvailability(response, req.params.manufacturer);
			console.log("sending parsed data", req.params.manufacturer);
			if (parsedData.response[0]) {
				console.log(parsedData.response[0].inStock);
			}
			res.json(parsedData);
		})
		.catch(error => {
			console.log("error", req.params.manufacturer, error);
			res.send(error);
		});
});

app.get('/api/products/:product', (req, res) => {
	// console.log(`${apiUrl}products/${req.params.product}`);
	axios.get(`${apiUrl}products/${req.params.product}`)
		.then(response => {
			// console.log(response.data);
			console.log("sent response from");
			res.json(response.data);
		})
		.catch(error => {
			console.log("error", error);
			res.send(error);
		});
});

app.get('*', (req, res) => {
	// console.log(`Serving ${path.join(clientPath, 'index.html')}`);
	res.sendFile(path.join(clientPath, 'index.html'));
});

app.listen(port, () => {
	console.log(`Server running on localhost:${port}`);
});