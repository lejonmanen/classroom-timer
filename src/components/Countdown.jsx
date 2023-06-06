import { useTheme } from '@mui/material/styles'; 
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useState, useRef, useEffect } from 'react'
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TextField from '@mui/material/TextField';

import WidgetActions from './WidgetActions.jsx';
import { timeSplit } from '../utils.js';


const Countdown = ({ minutesTotal, title, onDelete, onEdit }) => {
	const [isPaused, setIsPaused] = useState(true)
	const [isEditing, setIsEditing] = useState(false)
	const [editObj, setEditObj] = useState(null)
	const [display, setDisplay] = useState('--:--')
	const interval = useRef(null)
	const theme = useTheme()

	useEffect(() => {
		setDisplay(minutesTotal + ':00')
		interval.current = {
			timeLeft: minutesTotal * 60 * 1000,
			id: null
		}
		return () => { clearInterval(interval.current.id) }
	}, [])

	const handleEdit = () => {
		if( isEditing ) {
			doSave()
		} else {
			if( !isPaused ) {
				resumePause()
			}
			setIsEditing(true)
			setEditObj({ title: title, time: minutesTotal })
		}
	}
	const maybeSave = e => {
		if (e.key === 'Enter') { doSave() }
	}
	const doSave = () => {
		setIsEditing(false)
		if( +editObj.time <= 0 ) editObj.time = 1
		setDisplay(editObj.time + ':00')
		if (interval.current) {
			interval.current.timeLeft = editObj.time * 60 * 1000
		}
		onEdit(editObj.title, editObj.time)
	}

	const resumePause = () => {
		if( isPaused ) {
			// start countdown
			const ic = interval.current
			ic.lastUpdate = Date.now()
			
			ic.id = setInterval(() => {
				let now = Date.now()
				let diff = now - ic.lastUpdate
				ic.timeLeft -= diff
				ic.lastUpdate = now
				let [pos, min, sec] = timeSplit(ic.timeLeft)
				setDisplay((pos ? '' : '-') + `${min}:${sec}`)
			}, 200)
		} else {
			clearInterval(interval.current.id)
			interval.current.id = null
		}
		setIsPaused(p => !p)
	}
	const reset = () => {
		// setMsLeft(minutesTotal)
		setDisplay(minutesTotal + `:00`)
		if( interval.current ) {
			interval.current.timeLeft = minutesTotal * 60 * 1000
		}
	}

	// console.log(theme.palette.primary);
	// const paused = <PlayArrowIcon />


	return (
		<Stack sx={{ position: 'relative', textAlign: 'center', border: 1, borderColor: 'primary.main', borderRadius: 1, padding: 1, margin: 1 }}>

			{ !isEditing ? (
				<Typography variant="subtitle1" sx={{ lineHeight: 1 }}>
					{title}
				</Typography>
			) : (
				<TextField
					label="Title"
					variant="outlined"
					value={editObj.title}
					onChange={e => setEditObj({ ...editObj, title: e.target.value })}
					onKeyDown={maybeSave}
					/>
			)}

			{!isEditing ? (
				<Typography sx={{ fontFamily: 'Roboto Mono', fontSize: '200%', lineHeight: 1.3 }}> {display} </Typography>
			) : (
				<TextField
					label="Minutes"
					variant="outlined"
					type="number"
					value={editObj.time}
					onChange={e => setEditObj({ ...editObj, time: e.target.value })}
					onKeyDown={maybeSave}
				/>
			)}

			<WidgetActions onEdit={handleEdit} onDelete={onDelete} />

			<Stack direction="row" spacing={1} justifyContent="center">
			<Button variant={isPaused ? "contained" : "outlined"} onClick={resumePause}>
				{isPaused ? <PlayArrowIcon /> : <PauseIcon />}
			</Button>
			<Button variant="outlined" onClick={reset} disabled={!isPaused}> <RestartAltIcon /> </Button>
			</Stack>
		</Stack>
	)
}

export default Countdown
