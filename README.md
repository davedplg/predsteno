
# Chorded Predictive Text App

A T9-inspired web app for predictive text input using chorded keypresses, mapping the alphabet to digits 1-9 with a custom dictionary.

## Features
- Predictive text with 2-3 word suggestions per chord input.
- Input from one or both hands, one or more fingers per hand
- Three-pass parsing: chord input, reserve word selection, and QWERTY fallback.
- Markdown rendering for formatted output.
- Debug interface for chord and word tracking.

## Setup
1. Clone the repository: `git clone <repo-url>`
2. Place `marked.min.js` in the `lib/` folder.
3. Run locally: `python -m http.server`
4. Open `http://localhost:8000` in a browser.

## Usage
- Use the QWERTY keyboard with mappings (e.g., Q/W/E/R → 1/2/3/4).
- Press space, /, or both to select word suggestions.
- Press B for reserve words if not in initial options, then J/K/L/; to select.
- Double Enter triggers a second and/or third parse for reserve selection and/or QWERTY input (in an input field).

## Keyboard Mappings
| Left Hand | Digits | Right Hand | Digits |
|-----------|--------|------------|--------|
| Q/W/E/R   | 1/2/3/4| U/I/O/P    | 4/3/2/1|
| A/S/D/F   | 5/6/7/8| J/K/L/;    | 8/7/6/5|
| Z/X/C/V   | 4/3/2/1| N/M/</>    | 1/2/3/4|

## Dependencies
- `marked.min.js` (included locally in `lib/` with CDN fallback).

## License
MIT
