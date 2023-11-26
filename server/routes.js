const getShifts = require('./handlers/getShifts')
const getSchedule = require('./handlers/getSchedule')
const createSchedule = require('./handlers/createSchedule')
const clearSchedule = require('./handlers/clearSchedule')

module.exports = function (app, opts) {
	app.get('/', getShifts)
	app.get('/schedule', getSchedule)
	app.post('/save', createSchedule)
	app.post('/clear', clearSchedule)
}
