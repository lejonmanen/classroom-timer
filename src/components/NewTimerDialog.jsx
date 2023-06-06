import { Dialog, DialogContent, DialogActions, DialogTitle, Typography, TextField, Stack, Button } from '@mui/material'
import { useState } from 'react'

const NewTimerDialog = ({ open, doClose, doCancel }) => {
	const [title, setTitle] = useState('Rast')
	const [minutes, setMinutes] = useState(15)

	const handleClose = e => {
		e.preventDefault()
		doClose({ title, minutes })
	}
	
	return (
		<Dialog open={open} disableRestoreFocus>
		<form onSubmit={handleClose}>
			<DialogTitle> New countdown timer </DialogTitle>
			<DialogContent>
			<Stack spacing={1} sx={{ marginTop: 1 }}>
				<TextField label="Title" variant="outlined" value={title} onChange={e => setTitle(e.target.value)} autoFocus={true} />
				<TextField label="Minutes" variant="outlined" type="number" value={minutes} onChange={e => setMinutes(e.target.value)} min={1} />
			</Stack>
			</DialogContent>
			<DialogActions>
				<Button variant="" onClick={doCancel}> Close </Button>
				<Button variant="primary" onClick={handleClose} type="submit"> Add timer </Button>
			</DialogActions>
		</form>
		</Dialog>
	)
}

export default NewTimerDialog
