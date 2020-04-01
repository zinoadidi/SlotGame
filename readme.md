##################
## slot game was wriiten in JS ES6

App.js serves as entry point.

js folder contains the source code for app.js and other js files
vue js is used for data binding and jquery for dom manipulation

## How to run
It is best to run code on a server (Any node, apache, ngnix etc server will work just fine)  
- IDE like webstorm can be used to lunch the html file in browser
- Using Docker / Docker compose is possible with included docker compose file.
Navigate to project folder in terminal / cmd and run
````
docker-compose up -d
````
Server will be live at:
``http://localhost:8080/``

code is tested with latest version of chrome

Working version will be available at 
```http://zinoadidi.site/```
for a limited time

## Note:
- animation on the reel itself is the only item not submitted that isn't activated at submission time because it was commented out; i activated it after and committed the update.
- Everything is designed to best understanding of the requirement pdf file i have included

# Known Issue
- Solved:<s>Sometimes there are delays in updating the UI during spinning. this however doesnt affect the logic and everything works fine behind the scene.
There are other options i have tried as regards spinning the UI and other options i didnt get to try but it can be optimized to work more effectively.</s>

#observations
- i wrote the scoring logic to work from top to bottom. if there are matching reels on the first line then it scores that line over the second line.
the logic can be changed easily to accommodate scoring multiple lines with matching symbols or prioritizing the scores.
I assumed we are scoring from top to bottom; first matching symbols.
