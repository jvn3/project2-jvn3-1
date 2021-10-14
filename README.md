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

## Databases setup
1. Install PostGreSQL: `sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs` Enter yes to all prompts.
2. Initialize PSQL database: `sudo service postgresql initdb`
3. Start PSQL: `sudo service postgresql start`
4. Make a new superuser: `sudo -u postgres createuser --superuser $USER` 
5. Make a new database: `sudo -u postgres createdb $USER` 
6. Make sure your user shows up:
- a) `psql`
- b) `\du` look for ec2-user as a user 
- c) `\l` look for ec2-user as a database 
7. Make a new user:
- a) `psql` (if you already quit out of psql)
- b) Type this with your username and password (DONT JUST COPY PASTE): `create user some_username_here superuser password 'some_unique_new_password_here';
8. Save your username and password in a `sql.env` file with the format `SQL_USER=` and `SQL_PASSWORD=`.
9. To use SQL in Python: `pip install psycopg2-binary`
10. `pip install Flask-SQLAlchemy==2.1`


Once these steps are finished. Run the following code in your terminal.

1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Push to Heroku: `git push heroku {your_branch_name}:main`



