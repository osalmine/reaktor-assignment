const express = require("express");
const path = require('path');
const axios = require('axios');

const port = process.env.PORT || 4200;
const apiUrl = 'https://bad-api-assignment.reaktor.com/v2/';

const app = express();

const frontPath = path.join(__dirname, '..', 'frontend/build');
app.use(express.static(frontPath));

async function parseAvailability(resData) {
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
	if (res.data.response === '[]') {
		console.log("Bad response from", res.config.url, "requesting again");
		return axios.get(res.config.url).then(res => {
			return res;
		}).catch(err => {
			return Promise.reject(err);
		});
	}
	return res;
});

app.get('/api/availability/:manufacturer', (req, res) => {
	axios.get(`${apiUrl}availability/${req.params.manufacturer}`)
		.then(async response => {
			let parsedData = await parseAvailability(response);
			console.log("sending parsed data", req.params.manufacturer);
			res.json(parsedData);
		})
		.catch(error => {
			console.log("error", req.params.manufacturer, error);
			res.send(error);
		});
});

app.get('/api/products/:product', (req, res) => {
	axios.get(`${apiUrl}products/${req.params.product}`)
		.then(response => {
			console.log("sending response for", req.params.product);
			res.json(response.data);
		})
		.catch(error => {
			console.log("error", error);
			res.send(error);
		});
});

app.get('*', (req, res) => {
	res.sendFile(path.join(frontPath, 'index.html'));
});

app.listen(port, () => {
	console.log(`Server running on localhost:${port}`);
});