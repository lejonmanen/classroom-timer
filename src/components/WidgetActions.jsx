import { useTheme } from '@mui/material/styles'; 
import Stack from '@mui/material/Stack'
import Fab from '@mui/material/Fab'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const WidgetActions = ({ onEdit, onDelete, direction='row' }) => {
	const theme = useTheme()

	const fabHover = {
		"&:hover": {
			color: theme.palette.primary.main,
			transition: '0.4s all ease-out'
		},
		// transform: 'scale(0.9)'
	}

	return (
		<Stack direction={direction} spacing={1}
			sx={{ position: 'absolute', right: '8px', top: '8px' }}>
			<Fab size="small" sx={fabHover} onClick={onEdit}>
				<EditIcon />
			</Fab>
			<Fab size="small" sx={fabHover} onClick={onDelete}>
				<DeleteIcon />
			</Fab>
		</Stack>
	)
}

export default WidgetActions
