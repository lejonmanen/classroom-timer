import { useState, useRef } from 'react'
import './App.css'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import styled from '@emotion/styled'
import Countdown from './components/Countdown'
import Note from './components/Note'
import NewTimerDialog from './components/NewTimerDialog'
import { ThemeProvider } from '@mui/material/styles';
import {theme} from './theme.js'

const Row = styled.div`
	display: flex;
	flex-direction: row;
	border: 1px solid gray;
	justify-content: center;
	gap: 1em;
	/* align-items: center; */
`
const Column = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid lightgray;
`
// Timer: { type, startTime }
// Countdown: { type, startTime }
// Note: { type, text }
const Type = { COUNTDOWN: 'countdown', NOTE: 'note' }

/*
TODO
x remove widgets
+ style change when reaching 0
+ add note
+ edit note widget
+ edit countdown widget
+ cooler clock font
*/

function calculateId(widgets) {
	return widgets.reduce((acc, cur) => Math.max(acc, cur.id), 0) + 1
}

function App() {
	const [isAddingTimer, setIsAddingTimer] = useState(false)
	// const [isAddingNote, setIsAddingNote] = useState(false)
	const [widgets, setWidgets] = useState([
		{ id: 1, type: Type.COUNTDOWN, timeLeft: 5, title: 'Rast'  },
		{ id: 2, type: Type.COUNTDOWN, timeLeft: 1, title: 'Look out'  }
	])

	const doAddCountdown = ({title, minutes}) => {
		let newId = calculateId(widgets)
		let newW = { id: newId, type: 'countdown', title, timeLeft: Number(minutes) }
		console.log(newW);
		setWidgets([...widgets, newW])
		setIsAddingTimer(false)
	}
	
	const doAddNote = () => {
		let newId = calculateId(widgets)
		let newW = { id: newId, type: 'note', text: 'This is a test of a test is a test of a test is a test of a test is a test of a test is a test of a test is a test of a test is a test of a test' }
		console.log(newW);
		setWidgets([...widgets, newW])
	}

	const doDeleteWidget = id => {
		console.log('DELETING widget ', id);
		setWidgets(ws => ws.filter(w => w.id !== id))
	}

	const handleAddTimer = () => {
		setIsAddingTimer(true)
	}

	function selectWidget(w) {
		if( w.type === 'countdown' ) {
			return (
				<Countdown key={w.id}
					minutesTotal={w.timeLeft}
					title={w.title}
					onDelete={() => doDeleteWidget(w.id)} />
			)
		} else if( w.type === 'note' ) {
			return (
				<Note key={w.id}
					text={w.text}
					onDelete={() => doDeleteWidget(w.id)} />
			)
		} else {
			return null
		}
	}

	return (
		<ThemeProvider theme={theme}>
		<main style={{ backgroundColor: theme.palette.background.default }}>
			{widgets.map(w => selectWidget(w))}

			<Stack direction="row" spacing={1} justifyContent="center">
				<Button onClick={handleAddTimer}> New timer </Button>
				<Button onClick={doAddNote}> New note </Button>
			</Stack>
			
			{/*<Column>
				note
			</Column>*/}

			{/*<Row>
				<button> New timer </button>
				<button> Add note </button>
			</Row>*/}
			<NewTimerDialog open={isAddingTimer} doClose={doAddCountdown} doCancel={() => setIsAddingTimer(false)} />
			{/*<Row>
				shortcuts: break 15, lesson 45
			</Row>*/}
		
		</main>
		</ThemeProvider>
	)
}



export default App
