import styled from 'styled-components'

const WeekDay = styled('div')(() => {
	return {
		backgroundColor: 'rgb(56, 61, 71)',
		width: '50px',
		height: '70px',
		color: 'white',
		border: 'none',
		textTransform: 'uppercase',
		textAlign: 'center',
		marginBottom: '12px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	}
})

export default WeekDay
