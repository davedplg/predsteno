# Features/Upgrade List
## high frequency anomolies
 - er
 - re
 - 'd

 are these blocking more useful words?

## rejects on pairwise-reordered
850ish  this has gone up since we added US/UK dialect split. There are now a couple of thousand doubled words so this has increased collisions a bit. However, some words are now easier to get to like 'all' and 'already' OL is quicker than ORL; OLREDEE than ORLREDEE
## reform.pl 2
check wa is consistent

## exportMD 3
i think this is redundant and not called anywhere

## html save 3

maybe get rid of div and make export.css have column structure of outputHTML

base64 encode images.

- it would be better if the pagedown and pageup
events js was also bundled into the output html 2

## augmentation 2
Both maybe should have the ability to mark words missing from dic.

## arrow up   1
at the moment it just goes to the next doc.line
maybe it would be better doing indexof('.'). 
Also look for ? and ! sequnetially ':'?

## autoscroll failing backwards 1

## cursor 3
 -should we add it as text not node might not add fake linemarkers.
 - it sometimes hits non text nodes but is not catastropnic

#need to freeze input when in markdown view
the markdown view doesn't like 3rd parse' 2

## put all digraphed letters on the reserves? 2
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

##  couldnt wouldnt 1

shall we double the macron over ou instead of o macron u silent

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


