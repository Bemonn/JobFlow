# JobFlow

## How to use:

- Log into mysql: mysql -u root -p
- Open intergrated terminal
- Generate database: node scripts/createDatabase.js
<!-- - Generate tables for database: npx sequelize-cli db:migrate -->
- Seed employee and tasks table: npx sequelize-cli db:seed:all
- Run the server: node server.js
- NOTE - if the tables need to be unseeded or reset use: npx sequelize-cli db:migrate:undo:all

- node .\seeders\seed.js 
- node .\server.js   
