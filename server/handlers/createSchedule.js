const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../mocks/output.json')

module.exports = function (req, res) {
	let body = ''

	req.on('data', (chunk) => {
		body += chunk.toString()
	})

	req.on('end', () => {
		try {
			const data = JSON.parse(body)
			fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
				if (err) {
					return res.status(500).json({ error: 'Internal Server Error' })
				}
				res.json({ message: 'Data saved successfully!' })
			})
		} catch (parseError) {
			res.status(400).json({ error: 'Invalid JSON format' })
		}
	})
}
