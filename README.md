
# Chorded Predictive Text [App](https://davedplg.github.io/predsteno/)


A proof of concept T9-inspired demo web app [here on githubpages](https://davedplg.github.io/predsteno/
)for predictive text input using chorded keypresses, mapping the alphabet to digits 1-8 with a custom dictionary. 

**THIS IS NOT T9**; 1) the digits are **1 LESS** than the [E.161](https://en.wikipedia.org/wiki/E.161)  mapping, 2) and **REORDERED** pairwise ascending.  

|word     | E.161-1| pairwise reordered|
|----     |------- |-------------------|
|blind    | 14,35,2|14,35,2            |
|jamie    | 41,53,2|14,35,2            |

![e.161](/numpad.png)
## Features
- Predictive text with 2-3 word suggestions per chord input.

- Input from one or both hands, one or more fingers per hand
- Three-pass parsing: chord input, reserve word selection, and QWERTY fallback.
 |pass   | scr. shot | action | result|
|-------|-----------|-----------|--------|-------|
|1st    | ![word options](/blindPressSpace.png)|press space|blind|
|1st    | ![word options](/blindPressSpace.png)|press /    |jamie|
|1st    |![nice needs b](/nicePressB.png)| mice not option: press b| reserve group inserted|
|2nd    |![mice needs j](/micePressJ.png)| press j (not-kl;) | mice| 
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

