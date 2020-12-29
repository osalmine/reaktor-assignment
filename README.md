# reaktor-assignment
Reaktor junior pre-assignment for summer 2021
> Your client is a clothing brand that is looking for a simple web app to use in their warehouses. To do their work efficiently, the warehouse workers need a fast and simple listing page per product category, where they can check simple product and availability information from a single UI.

I tackled this task using NodeJs (Express) on the backend and React on the frontend.

Live at: https://osalmine-reaktor-assignment.herokuapp.com/

## Running locally
After cloning, go to the root if the repository and run
```
npm install && npm start
```
and head to `localhost:4200`

The postinstall script in the root package.json will trigger after the install script and will install the required packages for frontend and backend. It also builds the frontend to production mode that can be served by the server.

## How it works

I tried to focus on speed which means loading content while the API queries are processing.

1. When entering a product page, the page renders with some elements as "loading" just to fill out the page while the API is queried.
2. The product page sends a request to the backend which in turn sends a request to the API for the specific product.
3. After the query is returned, a product card is rendered for each product. The individual manufacturers are gathered and a query is send to the backend for each manufacturer, which again sends a request to the API.
4. As soon as a result from any of the queries is returned, all the product cards from that manufacturer are updated to the product's availability status.

The server intercepts each response from the API before it's sent to the frontend to see if it was successful or not. If the manufacturer query was not successful, the server will retry the query until a valid response is sent from the API. On Heroku, there is a timeout of 30 secs that can't be modified, but running locally the queries can run indefinitely.

To be able to refresh and switch pages while the page is waiting a response from the server, an axios CancelToken is generated and used to cancel the requests.

**Some issues:**
- The axios CancelToken doesn't seem to work when the products are loading. Fortunately this query is so fast that it doesn't really matter.
- Quering the API indefinitely is probably not a good idea in a real life scenario, but as this API will eventually send a correct response, it shouldn't break anything.
