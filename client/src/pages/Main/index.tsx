import { Fragment, useEffect, useRef, useState } from 'react'
import { startOfWeek, endOfWeek, addWeeks, addDays } from 'date-fns'

import { WeekDays } from '../../shared/enums/weekdays'
import Button from '../../shared/ui/Button'
import Container from '../../shared/ui/Container'
import WeekDay from '../../shared/ui/WeekDay'
import WeekDaysContainer from '../../shared/ui/WeekDaysContainer'
import Shift, { Radio } from '../../shared/ui/Shift'
import MainContainer from '../../shared/ui/MainContainer'

import { IShift } from '../../shared/types/Shift'
import {
	clearSchedule,
	getSchedule,
	getShifts,
	saveSchedule,
} from '../../shared/api'
import { IScheduleData } from '../../shared/types/Schedule'

const startOfNextWeek = startOfWeek(addWeeks(new Date(), 1))
const displayStartOfNextWeek = startOfNextWeek.toLocaleDateString().slice(0, 2)

const endOfNextWeek = endOfWeek(addWeeks(new Date(), 1))
	.toLocaleDateString()
	.replaceAll('/', '.')

const WeekDaysArr: WeekDays[] = Object.values(WeekDays)

const Main = () => {
	const [formValues, setFormValues] = useState({})
	const [shifts, setShifts] = useState<IShift[] | null>(null)
	const [schedule, setSchedule] = useState<IScheduleData>({})
	const [isLoading, setIsLoading] = useState(false)

	const ref = useRef<HTMLFormElement | null>(null)

	useEffect(() => {
		!shifts && get()
	}, [shifts])

	const get = async () => {
		try {
			setIsLoading(true)
			const { data } = await getShifts()
			const { data: schedule } = await getSchedule()
			setShifts(data)
			setSchedule(schedule)
			setFormValues(schedule)
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleChange = (
		day: WeekDays,
		shiftId: IShift['id'],
		dateDay: number
	) => {
		setFormValues((prev) => ({
			...prev,
			[day]: { shiftId, date: addDays(startOfNextWeek, dateDay) },
		}))
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			setIsLoading(true)
			await saveSchedule(formValues)
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	const clear = async () => {
		try {
			setIsLoading(true)
			await clearSchedule()
			ref.current?.reset()
			setFormValues({})
			setSchedule({})
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		shifts && (
			<MainContainer>
				<Container>
					<p>
						{displayStartOfNextWeek}-{endOfNextWeek}
					</p>
					<form onSubmit={handleSubmit} ref={ref}>
						<WeekDaysContainer>
							{WeekDaysArr.map((day, i) => (
								<div key={i}>
									<WeekDay>{day.slice(0, 1)}</WeekDay>
									{shifts.map((shift) => {
										const id = shift.id + day + shift.name + i
										return (
											<Fragment key={id}>
												<Radio
													type='radio'
													name={day + i}
													id={id}
													onChange={() => handleChange(day, shift.id, i)}
													defaultChecked={schedule[day]?.shiftId === shift.id}
													disabled={isLoading}
												/>
												<Shift htmlFor={id}>{shift.name}</Shift>
											</Fragment>
										)
									})}
								</div>
							))}
						</WeekDaysContainer>
						{shifts.map((day) => (
							<p key={day.id}>
								{day.startTime} - {day.endTime} {day.name}
							</p>
						))}
						<Button type='submit' disabled={isLoading}>
							Save
						</Button>
					</form>
					<br />
					<Button onClick={clear} disabled={isLoading}>
						Clear
					</Button>
				</Container>
			</MainContainer>
		)
	)
}

export default Main
