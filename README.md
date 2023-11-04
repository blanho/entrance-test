

# How to SetUp & Install?

```sh
# Clone the repository
git clone 

# Install essential dependencies
yarn install or npm install

# Set up enviroment configuration .env by following .env.example below

PORT = 5000
NODE_ENV = development

MYSQL_DEV_HOST = localhost
MYSQL_DEV_PORT = 3306
MYSQL_DEV_USERNAME = blanho
MYSQL_DEV_PASSWORD = password
MYSQL_DEV_DATABASE = entrance_test

MYSQL_TEST_HOST = localhost
MYSQL_TEST_PORT = 3306
MYSQL_TEST_USERNAME = blanho
MYSQL_TEST_PASSWORD = password
MYSQL_TEST_DATABASE = database

ACCESS_TOKEN_SECRET_KEY = jwtsecret

REFRESH_TOKEN_SECRET_KEY = jwtsecret
  
# Migrate schema to database
yarn run migrate

# Seed data to database
yarn run seed:run

# For dev mode
yarn run dev

# For test mode
yarn run test

# Don't forget to look around scripts in package.json to start my app on your own.

```




# Pre-defined routes

| Auth                      |
| ------------------------- |
| `POST - api/v1/auth/sign-up`       |
| `POST - api/v1/auth/sign-in`   |
| `POST - api/v1/auth/log-out`   |
| `POST - api/v1/auth/refresh-token`            |



# How to access the API Documentation?

- Try accessing the http://`<HOST>:<PORT>/api-docs`

# Licences
- Ho Bao Lan
