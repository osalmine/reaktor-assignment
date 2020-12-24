import React from 'react';

function ProductCard({ name, colors, price, manufact, inStock }) {
	return (
	<div className="col-md-4">
		<div className="card mb-4 shadow-sm">
			<h2 className="product-name">{name}</h2>
			<div className="card-body">
				<p className="product-text">{manufact}</p>
				<div className="d-flex justify-content-start align-items-center">
					<p className="product-text">Colors:</p>
					{colors && colors.map(color => {
						return (color === "white" || color === "yellow" 
						? <p className="product-text">{color}</p>
						: <p className="product-text" style={{color: color}}>{color}</p>);
					})}
				</div>
				<p className="product-text">Price: {price}€</p>
				<p className="product-text">Availability: {inStock}</p>
			</div>
		</div>
	</div>);
}

export default ProductCard;