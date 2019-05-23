const db = require("../config/db");

module.exports = class {
	static async getAddresses() {
		let connection = await db.getConnection();
		const rows = await connection.query("SELECT * FROM `person` JOIN `address` ON `person`.`addressID`=`address.addressID`");
		connection.end();
		return rows;
	}

	static async addAddress(p, a) {
		let conn = await db.getConnection();

		const addressResult = await conn.query(
			"INSERT INTO`address`(`street`, `city`, `country`, `province`, `postal_code`) VALUES(?, ?, ?, ?, ?)",
			[a.street, a.city, a.country, a.province, a.postal_code]
		);

		const addressId = addressResult.insertId;

		const addPersonResult = await conn.query(
			"INSERT INTO `person`(`first`, `last`, `phone`, `addressId`) VALUES(?, ?, ?, ?)",
			[p.first, p.last, p.phone, addressId]
		);

		const personId = addPersonResult.insertId;

		console.log(addressResult, addPersonResult);

		conn.end();

		return { addressId: addressId, personId: personId };

	}
};
