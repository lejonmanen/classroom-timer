import { useState } from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import WidgetActions from './WidgetActions.jsx';


const Note = ({ text, onDelete, onEdit }) => {
	const [isEditing, setIsEditing] = useState(false)
	const [editText, setEditText] = useState(text)

	const handleEdit = () => {
		if( isEditing ) {
			doSave()
		} else
			setIsEditing(true)
	}
	const maybeSave = e => {
		if( e.key === 'Enter' ) { doSave() }
	}
	const doSave = () => {
		setIsEditing(false)
		onEdit(editText)
	}

	return (
		<Stack sx={stackCss}>
			{ !isEditing
			? (<Typography variant="subtitle1" sx={textCss}>
				{text}
			</Typography>)
			: (
				<TextField
					label="Note"
					variant="outlined"
					value={editText}
					multiline
					sx={textFieldCss}
					onChange={e => setEditText(e.target.value)}
					onKeyDown={maybeSave} />
			)
			}
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
const textFieldCss = {
	paddingRight: 7
}

export default Note
