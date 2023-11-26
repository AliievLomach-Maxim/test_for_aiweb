import styled from 'styled-components'

const Shift = styled('label')(() => {
	return {
		cursor: 'pointer',
		backgroundColor: 'rgb(159, 159, 159)',
		width: '50px',
		height: '70px',
		color: 'rgb(56, 61, 71)',
		border: 'none',
		textTransform: 'uppercase',
		marginBottom: '12px',
		fontSize: '8px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	}
})

export const Radio = styled.input`
	display: none;
	&&&:checked + ${Shift} {
		background-color: rgb(71, 126, 255);
		color: white;
	}
`

export default Shift
