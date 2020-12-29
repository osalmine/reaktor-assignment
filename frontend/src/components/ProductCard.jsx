import React from 'react';

function ProductCard({ name, colors, price, manufact, inStock }) {
	return (
	<div className="col-md-4">
		<div className="card mb-4 shadow-sm">
			<h2 className="product-name">{name}</h2>
			<div className="card-body">
				{manufact && <p className="product-text manufacturer-name">By: {manufact}</p>}
				{colors && <div className="d-flex justify-content-start align-items-center">
					<p className="product-text">Colors:</p>
					{colors && colors.map(color => {
						return (color === "white" || color === "yellow" 
						? <p className="product-text">{color}</p>
						: <p className="product-text" style={{color: color}}>{color}</p>);
					})}
				</div>}
				{price && <p className="product-text">Price: {price}€</p>}
				<div className="d-flex justify-content-start align-items-center">
					<p className="product-text">Availability: </p>
					{!inStock
					? <img className="loading-img" src="loading.gif" alt="Loading..." width="20" height="20"></img>
					: <p className="product-text">{inStock}</p>}
				</div>
			</div>
		</div>
	</div>);
}

export default ProductCard;