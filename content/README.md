
# Chorded Predictive Text [App](https://davedplg.github.io/predsteno/)


A proof of concept T9-inspired demo web-app [here on githubpages](https://davedplg.github.io/predsteno/
) for predictive text input using chorded keypresses, mapping the alphabet to digits 1-8 with a custom dictionary. 

**THIS IS NOT T9**; 1) the digits are **1 LESS** than the [E.161](https://en.wikipedia.org/wiki/E.161)  mapping, 2) and sometimes **REORDERED** pairwise ascending.  

|word     | E.161-1| pairwise reordered|
|----     |------- |-------------------|
|blind    | 14,35,2|14,35,2            |
|jamie    | 41,53,2|14,35,2            |

![e.161](../../content/numpad.png)
## Features
- Predictive text with 3 word suggestions per chord input.

- Input from one or both hands, one or more fingers per hand
  - Three-pass input:
  - chord input, reserve word selection 
  - QWERTY fallback.

|pass   | scr. shot | action |
|-------|-----------|-----------|
|1st    | ![word options](../../content/blindPressSpace.png)|press b,v/n,m/x|
|||||
|1st    |![nice needs b](../../content/nicePressB.png)| mice not option: press space/h|
|2nd    |![mice needs j](../../content/micePressJ.png)| press b/space,vjkl?;uiop h for 3d parse | 
|||||
|3rd|![qwerty inputbox](../../content/3rd-Pass.jpg)|type in missing word|
- Markdown rendering for formatted output.
- Debug interface for chord and word tracking.

## Setup
1. Clone the repository: `git clone <repo-url>`
2. Place `marked.min.js` in the `lib/` folder.
3. Run locally: `python -m http.server`
4. Open `http://localhost:8000` in a browser.

## Usage
- Use the QWERTY keyboard with mappings (e.g., Q/W/E/R → 1/4/7/8).
- Press b/v/n,  to select word suggestions.
- Press space for reserve words if not in initial options, then J/K/L/; to select.
- Double Enter triggers a second and/or third parse for reserve selection and/or QWERTY input (in an input field).
## Multiple Pass Input
![more than one pass](../../content/3-Passes.png)
## Keyboard Mappings

### Variant 1
![keys to digits](../../content/variant1.jpg)
### Variant 2
![keys to digits](../../content/variant3.jpg)
### Variant 4
![keys to digits](../../content/variant4.jpg)
### Variant 5
![keys to digits](v5-keymap.jpg)


## Dependencies
- `marked.min.js` (included locally in `lib/`).

## License
MIT


## Credits
This project uses [marked.js](https://github.com/markedjs/marked) (`marked.min.js`), licensed under the [MIT License](https://github.com/markedjs/marked/blob/master/LICENSE.md).


CMU prounuciation dictionary and BNC data was used in compiling the dictionary.  The pronunciation granularity was increased from word to transcription, to letter to phoneme by the author.

   
