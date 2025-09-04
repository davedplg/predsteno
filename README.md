
# Chorded Predictive Text App

A T9-inspired web app for predictive text input using chorded keypresses, mapping the alphabet to digits 1-9 with a custom dictionary.
![e.161](/numpad.png)
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
## Multiple Pass Input
![more than one pass](/3-Passes.png)
## Keyboard Mappings

### Variant 1
![keys to digits](/variant1.png)
### Variant 2
![keys to digits](/variant2.png)
### Variant 3
![keys to digits](/variant3.png)
### Variant 4
![keys to digits](/variant4.png)


## Dependencies
- `marked.min.js` (included locally in `lib/`).

## License
MIT


## Credits
This project uses [marked.js](https://github.com/markedjs/marked) (`marked.min.js`), licensed under the [MIT License](https://github.com/markedjs/marked/blob/master/LICENSE.md).


CMU prounuciation dictionary and BNC data was used in compiling the dictionary.  The pronunciation granularity was increased from word to transcription, to letter to phoneme by the author.

