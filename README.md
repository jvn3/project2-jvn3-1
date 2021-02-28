# Flask and create-react-app

## Requirements
1. `npm install`
2. `pip install -r requirements.txt`

## Setup
1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## Run Application
1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Deploy to Heroku
Note - Before deploying the app on heroku, make sure there are no heroku app installed in the directory.
To check this run `git remote -v` in your terminal. If you see a heroku app, run `git remote rm heroku`.

Once these steps are finished. Run the following code in your terminal.

1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Push to Heroku: `git push heroku {your_branch_name}:main`


## Known Problems
1. One of the known problem for this project was to track user when they click on log out button.
   When a user clicks on log out button, the app insisted clearing the board data for all the logged in users.

2. In addition to that, there was also a problem rendering the spectaters user list on the web app.  

## Technical Difficulies
1. The main problem was to deploy the app on heroku. After deploying the app, I received errors for module not found. To fix this, 
I went on stackoverflow to check if there was any solution posted for this. Later, I learned that there was already
a heroku app in the local directory. So, I removed that app using `git remote rm heroku` and re-deployed the app, and it worked fine.

2.  I had trouble first using the react component. For instance, useState, useEffect. I'd run into mountains of error. 
    Then, I did some practice watching online videos in regards to these states.

