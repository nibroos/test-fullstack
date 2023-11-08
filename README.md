# Test Fullstack

Live frontend: [https://test-fullstack.nibross.com](https://test-fullstack.nibross.com)

Live backend: [https://api-test-fullstack.nibross.com](https://api-test-fullstack.nibross.com)

## Requirements

- PHP ^8.1
- Nodejs 18
- MySQL 8.0.2

## Installation

#### Backend setup
```bash
# Clone the repository
git clone

# Install dependencies
composer install

# Create database

# Create .env file
cp .env.example .env

# Edit .env, set database credentials and the frontend config. Focus on:

DB_CONNECTION
DB_HOST
DB_PORT
DB_DATABASE
DB_USERNAME
DB_PASSWORD

SESSION_DOMAIN            #Set the domain of the frontend
SANCTUM_STATEFUL_DOMAIN   #Set the domain of the frontend
FRONTEND_URL              #Set the URL of the frontend

# Generate key
php artisan key:generate

# Run migrations
php artisan migrate

# Run seeder
php artisan db:seed

# Run server
```

#### Frontend setup
```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env, set the backend config. Focus on:
NUXT_PUBLIC_BASE_URL   #URL of the API
APP_NAME               #Name of the app

# Run server
npm run dev

# Build for production
npm run generate
```


## Technologies

- Laravel 10.10
- Nuxt 3.8.1
- Vue 3.3.8
- TailwindCSS 3.3.5

## Issue

API http://tes-skill.datautama.com/test-skill/api/v1/transactions selalu mengeluarkan output error, walaupun status code nya `200`.

```json
{
    "code": 400106,
    "message": "Invalid signature"
}
```

Sudah saya ikuti sesuai dengan petunjuk dengan memberikan value yang sesuai dan mencoba untuk mengganti value yang huruf besar menjadi kecil dan sebaliknya, tetapi tetap mengeluarkan output yang sama.

Silahkan anda buka file `app/Actions/Transactions/TransactionStoreAction.php` untuk melihat bagaimana saya mengirimkan request ke API tersebut.