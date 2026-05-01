Product & Supplier Management System

A full stack web project built with Node.js, Express, and SQLite to manage products and their suppliers.



Features
- Manage products with name, price, and image  
- Manage suppliers linked to products (via foreign key)  
- Auto-created SQLite database  
- RESTful API endpoints  
- Ready for frontend integration  


 Setup
```bash
git clone https://github.com/afakruha2003/newtest9.git
cd newtest9
npm install
node backend/server.js
Server runs at http://localhost:5000
```
 Tech Stack
Node.js

Express.js

SQLite

dotenv

 Database
Two main tables:

products → stores product data

suppliers → linked to products via product_id foreign key

 Structure
```bash
backend/
 ├── config/              # Database setup
 ├── routes/              # Product & report routes
 └── server.js            # Express app
frontend/
database.sqlite
```



