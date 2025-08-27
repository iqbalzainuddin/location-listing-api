# Location Listing API

## Overview
A RESTful API built with **Express.js** and **Sequelize**, providing CRUD operations for location-based listings with JWT Authentication.  
Supports distance calculation based on client-provided coordinates using haversine formula. The codebase is structured based on feature-based and 3 layer architecture.

## Runtime Environment
- Node >= 18.18.0
- MySQL for database

## Features
- Authentication - Register for normal user
- Admin Features
   - Create new location listing
   - Get location listing
   - Update location listing
   - Delete location listing
- Normal User Features
   - Register user
   - Get location listing

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/iqbalzainuddin/location-listing-api.git
   ```
2. Copy _.env.example_ to _.env_ file:
   ```bash
   cp .env.example .env
   ```
   Edit your _.env_ to fill in necessary data
   <br>
3. Install dependencies using this command:
   ```bash
   npm ci
   ```

## Database Migration
Run migrations with command:
```bash
npm run db:migration:up
```

## Add Admin Account
Seed admin account using command like this:
```bash
ADMIN_NAME="Admin Name" ADMIN_EMAIL="admin_email@example.com" ADMIN_PASSWORD="adminpassword" npm run db:seed:admin
```
Assign the details for the Admin account to the variables.

## Run Local Environment

Run using this command:
```bash
npm run dev
```

## Postman Collection
https://www.postman.com/avionics-geologist-19485356/workspace/iz-workspace/collection/15527619-d43dc176-1d7b-4594-95e1-a54bd5733728?action=share&creator=15527619
