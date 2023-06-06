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
import { splitTime, formatTime } from '../utils.js';
import { celebrate } from '../confetti.js'

// How long to display confetti
const celebrationTime = 2000


const Countdown = ({ minutesTotal, title, onDelete, onEdit }) => {
	const [isPaused, setIsPaused] = useState(true)
	const [isEditing, setIsEditing] = useState(false)
	const [editObj, setEditObj] = useState(null)
	const [display, setDisplay] = useState('--:--')
	const interval = useRef(null)
	const theme = useTheme()

	
	useEffect(() => {
		let { total, m, s } = splitTime(minutesTotal)
		setDisplay(formatTime(m, s))
		interval.current = {
			timeLeft: minutesTotal * 60 * 1000,
			id: null,
			didCelebrate: false
		}
		return () => { clearInterval(interval.current.id) }
	}, [])

	const handleEdit = () => {
		console.log('handle edit', title, minutesTotal);
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
		let t = +editObj.time
		console.log('do save', editObj, t);
		if( isNaN(t) || t < 0 ) { t = 1 }

		if( t === 0 ) {  // skriv "0" för att få 5 sekunder
			t = 1 / 12
			setDisplay('0:05')
		}
		else {
			setDisplay(t + ':00')
		}
		
		if (interval.current) {
			interval.current.timeLeft = t * 60 * 1000
		}
		onEdit(editObj.title, t)
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
				// let [pos, min, sec] = timeSplit(ic.timeLeft)
				let { total, m, s } = splitTime(ic.timeLeft / 1000 / 60)
				setDisplay(formatTime(m, s))

				if( !ic.didCelebrate && ic.timeLeft < celebrationTime ) {
					ic.didCelebrate = true
					celebrate(celebrationTime / 1000)
				}
			}, 200)
		} else {
			clearInterval(interval.current.id)
			interval.current.id = null
		}
		setIsPaused(p => !p)
	}
	const reset = () => {
		// setMsLeft(minutesTotal)
		interval.current.didCelebrate = false
		let {m, s} = splitTime(minutesTotal)
		setDisplay(formatTime(m, s))
		if( interval.current ) {
			interval.current.timeLeft = minutesTotal * 60 * 1000
		}
	}

	// console.log(theme.palette.primary);
	const timeStyle = {
		fontFamily: "'Chivo Mono', 'Orbitron', sans-serif",
		fontSize: '200%',
		lineHeight: 1.3
	}
	const widgetStyle = {
		position: 'relative',
		textAlign: 'center',
		border: 1, borderColor: 'primary.main', borderRadius: 1,
		padding: 1, margin: 1,
		// backgroundColor
	}
	if( interval.current?.timeLeft <= 0 ) {
		widgetStyle.backgroundColor = theme.palette.error.light
	}

	return (
		<Stack sx={widgetStyle}>

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
				<Typography sx={timeStyle}> {display} </Typography>
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
