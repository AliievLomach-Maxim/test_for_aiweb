import styled from 'styled-components'

const Button = styled('button')(({ disabled }) => {
	return {
		cursor: 'pointer',
		borderRadius: '12px',
		backgroundColor: disabled ? 'rgb(159, 159, 159)' : 'rgb(71, 126, 255)',
		width: '100%',
		paddingBlock: '16px',
		color: 'white',
		border: 'none',
		textTransform: 'uppercase',
	}
})

export default Button
