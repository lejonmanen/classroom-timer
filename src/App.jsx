import { useState } from 'react'
import './App.css'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import styled from '@emotion/styled'
import Countdown from './components/Countdown'
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
+ remove widgets
+ style change when reaching 0
+ add note
+ edit note widget
+ edit countdown widget
*/


function App() {
	const [isAddingTimer, setIsAddingTimer] = useState(false)
	// const [isAddingNote, setIsAddingNote] = useState(false)
	const [widgets, setWidgets] = useState([
		{ id: 1, type: Type.COUNTDOWN, timeLeft: 5, title: 'Rast'  },
		{ id: 2, type: Type.COUNTDOWN, timeLeft: 1, title: 'Look out'  }
	])

	const doAddCountdown = ({title, minutes}) => {
		let newId = widgets.reduce((acc, cur) => Math.max(acc, cur.id), 0) + 1
		let newW = { id: newId, type: 'countdown', title, timeLeft: Number(minutes) }
		console.log(newW);
		setWidgets([newW, ...widgets])
		setIsAddingTimer(false)
	}

	return (
		<ThemeProvider theme={theme}>
		<main style={{ backgroundColor: theme.palette.background.default }}>
			{widgets.map(w => (
				<Countdown key={w.id} minutesTotal={w.timeLeft} title={w.title} />
			))}

			<Stack direction="row" spacing={1} justifyContent="center">
				<Button onClick={() => setIsAddingTimer(true)}> New timer </Button>
				<Button disabled> New note </Button>
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
