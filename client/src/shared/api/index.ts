import { ISchedule } from '../types/Schedule'
import axios, { AxiosRequestConfig } from 'axios'
axios.defaults.baseURL = 'http://localhost:8000/'

export const getShifts = async () => await axios('/')

export const getSchedule = async () => await axios('/schedule')

export const saveSchedule = async (body: AxiosRequestConfig<ISchedule>) =>
	await axios.post('/save', body)

export const clearSchedule = async () => await axios.post('/clear')
