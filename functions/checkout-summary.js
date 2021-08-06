require('dotenv').config();
const calculateOrderAmount = require('./calculate-order-amount.js');

module.exports.handler = async (event, context) => {
	try {
		const { items, shipping, state } = JSON.parse(event.body);

		const cartSummary = await calculateOrderAmount(items, shipping, state);

		return {
			statusCode: 200,
			body: JSON.stringify({
				cartSummary
			})
		};
	}
	catch (error) {
		console.log('Error: ', error.toString());

		return {
			statusCode: 500,
			body: JSON.stringify({ error })
		};		
	}		
}