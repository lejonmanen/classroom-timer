/*function timeSplit(ms) {
	let positive = ms >= 0
	if (!positive) { ms = -ms }

	let seconds = Math.round(ms / 1000)
	let s = seconds % 60
	if (s < 10) s = '0' + s
	let min = (seconds - s) / 60
	return [positive, min, s]
}*/

// minutes should be a positive float
// returns { total, m, s }
function splitTime(minutes) {
	// Splits fractional minutes in minute and second part
	if (isNaN(minutes) ) {
		return { total: 1, m: 1, s: 0 }
	}
	else if( minutes < 0 ) {
		let o = splitTime(-minutes)
		return { total: -o.total, m: -o.m, s: o.s }
	}
	else if (minutes == 0 || minutes == ':00') {
		// 5 seconds
		return { total: 1 / 12, m: 0, s: 5 }
	}
	let m = Math.floor(minutes)
	let s = Math.round((minutes - m) * 60)
	while( s >= 60 ) {
		s -= 60
		m += 1
	}

	return { total: minutes, m, s }
}

function formatTime(min, sec) {
	let sign = ''
	if( min < 0 || Object.is(min, -0) ) sign = '-'
	let str = sign + Math.abs(min) + ':'
	let s = sec + ''
	if (s.length < 2) str += '0'
	return str + s
}
export { splitTime, formatTime }
