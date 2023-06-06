import { useState } from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import WidgetActions from './WidgetActions.jsx';

const Note = ({ text, onDelete }) => {
	const handleEdit = () => {}

	return (
		<Stack sx={stackCss}>
			<Typography variant="subtitle1" sx={textCss}>
				{text}
			</Typography>
			<WidgetActions onEdit={handleEdit} onDelete={onDelete} direction="column" />
		</Stack>
	)
}

const stackCss = {
	position: 'relative',
	textAlign: 'center',
	border: 1, borderColor: 'primary.main', borderRadius: 1,
	padding: 1, margin: 1,
	minHeight: '6.5em'
}
const textCss = {
	lineHeight: 1.5,
	paddingLeft: 7, paddingRight: 7
}

export default Note
