function timeSplit(ms) {
	let positive = ms >= 0
	if (!positive) { ms = -ms }

	let seconds = Math.round(ms / 1000)
	let s = seconds % 60
	if (s < 10) s = '0' + s
	let min = (seconds - s) / 60
	return [positive, min, s]
}

export { timeSplit }
