require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');

const models = require('./models/models');
const PORT = process.env.PORT || 5001;
const routers = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routers);
app.use(errorHandler);

const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();

		app.listen(PORT, () =>
			console.log(`server is running on port ${PORT}`)
		);
	} catch (err) {
		console.log(err);
	}
};

start();
// run app
