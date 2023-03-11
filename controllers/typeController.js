const { Type } = require('../models/models');
const ApiError = require('../error/ApiError');
const Sequelize = require('sequelize');
class typeController {
	async create(req, res) {
		try {
			const { name } = req.body;
			const type = await Type.create({ name });

			return res.json(type);
		} catch (error) {
			if (error instanceof Sequelize.UniqueConstraintError) {
				// handle the error when the ID is duplicated
				return res.status(400).json({ error: 'ID is already taken' });
			}
			// handle other errors
			return res.status(500).json({ error: 'Something went wrong' });
		}
	}
	async getAll(req, res) {
		const types = await Type.findAll();
		return res.status(200).json(types);
	}
}

module.exports = new typeController();
