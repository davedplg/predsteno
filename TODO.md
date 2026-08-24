# Features/Upgrade List
##
swap variant lhs down a row and make r swy. This will make all the variants consistant


## slowness 2
the large documents seem slower than i remember. They are okay when we turn the color off. 


## autoscroll failing backwards 1
## arrow up   1

at the moment it just goes to the next doc.line
maybe it would be better doing indexof('.'). 
Also look for ? and ! sequnetially ':'?

## sounds and symbols 1
need a key to the phonic input and the marked TO

perhaps a table with details summary of words that feature the sounds and buttons for them


## event handlers 2
refactor these.

giving these functions might make the code more
readable. And we can put the code into separate files

## cursor
does the cursor animation slow down the app
dr jekyll and mr hyde seems noticably slower this pm could it be the cursor blink slows shit down?

had a look dont think so.


## rejects on pairwise-reordered 2
850ish  this has gone up since we added US/UK dialect split. There are now a couple of thousand doubled words so this has increased collisions a bit. However, some words are now easier to get to like 'all' and 'already' OL is quicker than ORL; OLREDEE than ORLREDEE
## reform.pl 2
check wa is consistent

## exportMD 3
i think this is redundant and not called anywhere

## html save 3

maybe get rid of div and make export.css have column structure of outputHTML

also think about AI claim that epub scrolling - horizontal is possible using css only nowadays.

base64 encode images.

- it would be better if the pagedown and pageup
events js was also bundled into the output html 2



## cursor 3
 -should we add it as text not node might not add fake linemarkers.
 - it sometimes hits non text nodes but is not catastropnic
 - we need the cursor in a span to allow the autoscroll function to operate

#need to freeze input when in markdown view
the markdown view doesn't like 3rd parse' 2

## put all digraphed letters on the reserves? 1
12   â  2 ã  83 ŝħ 
5(R) å  1 b  or add them to the source dictionary and they will come in automatically.
## website
 - change all vowels on website
 - get paging working on my tab


## ow -> õw0
 - webpidgin too 


## take unstressed schwas away? 3
-- ment/ness/ence/ance  and plurals
-- other unstressed
 
## check more im/in/con/de  prefixes for schwas 2
This seemed fairly well coded in the dictonary maybe this willl be fine


#### Schwas 3
-- incurrect correct c o0 er r ect (current coding dont like)

#### Paging 3
-- the portrait is almost perfect
-- the landscape is under-scrolling

 **Add a prompt and cookie to set a user defined gap**
#### different colors per variant?
#### Focus
-- augmention loses editor focus

#### space racing
-- keysup + timeout to deal with key-blocking??

#### Heteronym choice in md? after augmentation 4


#### give \u2014 a name for flexibility
This is problematic if i hard code --MissingWord-- into the reserves.js. Unless i build it in with node

#### push 
-- sort other phone backup 3
-- try the github codespaces 2 
-- codespaces --> **library screen luxury**


#### Event listeners fail when focus lost are we focused on browser not page 3

#### add Content Page

-- Some exercises on using the app
-- blends 
-- key familiarisation
-- navigation

#### auto generate content links in about menu 3
Dont do this it is wanky and initial efforts could
be deleted. I dunno now looks cool and could add in a little curricula style content as a point of departure.

#### tidying codee 4

############ build an app.js?
-- split funtions into more structured files and directories
 
#### short-term shuffling
-- chordTimeout --> uiUtils
-- primeMap     --> uiUtils 


## view good behaviour 4
maybe kill view menu when the checkboxes on it 
are changed, or at least the special characters and fullScreen ones at least


#### Long-Term

############ Documentation 3
-- Teacher/Helper looks up puzzling words. 3rd pass plus augmentation
-- content

############ Anki
-- common word decks
-- key and navigation deck
-- mediumm word decks

############ Find/Replace 2.5

############ Some webpidgin stories?
-- original paragraphs with phonetic paragraph cues?
-- examples  for cloze exercises?

############ Typescript for portfolio/credibility

############ dictionary choice
-- is di-pairwise reordered dictionary less arbitrary better zipf coverage, ie quicker to hit useful words?

############ swap option keys with tyghbn maybe 
-- research common key-blocking mechanics

--------------------------------------------------
# Done

## o-concatenees and reserves

have we got any duplicates
/(sep1[^sep1]*)sep.*\1/  look for repeated entries
better we look in toptext.js and reserves.js
split on sep sort -u count find ones with 2
this will happen when steno divergence is after the frag length maybe long word ending in TOOD TYOOD

## high frequency anomolies
 - er
 - re
 - 'd
 THESE HAVE BEEN DONE - Seems better?!
 are these blocking more useful words?
