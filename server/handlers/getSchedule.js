const fs = require('fs')
const path = require('path')

module.exports = function (req, res) {
	const filePath = path.join(__dirname, '../mocks/output.json')

	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			return res.status(500).json({ error: 'Internal Server Error' })
		}

		try {
			const jsonData = JSON.parse(data)
			res.json(jsonData)
		} catch (parseError) {
			res.status(500).json({ error: 'Internal Server Error' })
		}
	})
}
