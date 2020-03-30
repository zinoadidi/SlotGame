##################
## slot game was wriiten in JS ES6

App.js serves as entry point.

js folder contains the source code for app.js and other js files
vue js is used for data binding and jquery for dom manipulation

It is best to run code on any server available 
or using ide like webstorm to lunch the html file in browser
code can also be run by clicking the index.html file

code is tested with latest version of chrome

## Note:
- animation on the reel itself is the only item not submitted that isn't activated at submission time because it was commented out; i activated it after and committed the update.
- Everything is designed to best understanding of the requirement pdf file i have included

# Known Issue
- Sometimes there are delays in updating the UI during spinning. this however doesnt affect the logic and everything works fine behind the scene.
There are other options i have tried as regards spinning the UI and other options i didnt get to try but it can be optimized to work more effectively.

#observations
- i wrote the scoring logic to work from top to bottom. if there are matching reels on the first line then it scores that line over the second line.
the logic can be changed easily to accommodate scoring multiple lines with matching symbols. if this is what the actualy requirement is; 
i assumed we are scoring from top to bottom; first mating symbols.
