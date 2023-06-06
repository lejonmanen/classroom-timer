// import Container from '@mui/material/Container'
import { useTheme } from '@mui/material/styles'; 
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
// import Fab from '@mui/material/Fab'
// import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
// import styled from '@emotion/styled'
import { useState, useRef, useEffect } from 'react'
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import WidgetActions from './WidgetActions.jsx';
import { timeSplit } from '../utils.js';


const Countdown = ({ minutesTotal, title, onDelete }) => {
	// const [msLeft, setMsLeft] = useState(minutes * 60 * 1000)
	const [isPaused, setIsPaused] = useState(true)
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

	const handleEdit = () => {}

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

	// <Stack direction="row">
	// console.log(theme.palette.primary);
	const paused = <PlayArrowIcon />


	return (
		<Stack sx={{ position: 'relative', textAlign: 'center', border: 1, borderColor: 'primary.main', borderRadius: 1, padding: 1, margin: 1 }}>
			<Typography variant="subtitle1" sx={{ lineHeight: 1 }}>
				{title}
				<WidgetActions onEdit={handleEdit} onDelete={onDelete} />
			</Typography>
			<Typography sx={{ fontFamily: 'Roboto Mono', fontSize: '200%', lineHeight: 1.3 }}> {display} </Typography>
			<Stack direction="row" spacing={1} justifyContent="center">
			<Button variant={isPaused ? "contained" : "outlined"} onClick={resumePause}>
				{isPaused ? <PlayArrowIcon /> : <PauseIcon />}
			</Button>
			<Button variant="outlined" onClick={reset} disabled={!isPaused}> <RestartAltIcon /> </Button>
			</Stack>
		</Stack>
	)
			// </Stack>
	// <Button variant="contained"> oh come on </Button>
}

export default Countdown
