import { WeekDays } from '../enums/weekdays'
import { IShift } from './Shift'

export interface ISchedule {
	day: WeekDays
	shiftId: IShift['id']
	date: Date
}

export interface IScheduleData {
	[key: string]: { shiftId: IShift['id']; date: Date }
}
