const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../mocks/output.json')

module.exports = function (req, res) {
	try {
		fs.writeFile(filePath, JSON.stringify({}, null, 2), (err) => {
			if (err) {
				return res.status(500).json({ error: 'Internal Server Error' })
			}
			res.json({ message: 'Data clear successfully!' })
		})
	} catch (parseError) {
		res.status(400).json({ error: 'Invalid JSON format' })
	}
}
