# GraphQL-Server 
Pada repositori ini merupakan contoh pembutan GraphQL menggunakan Node.JS dengan framework ExpressJS dan database MySQL, PostgreSQL, serta MongoDB. Repositori ini bertujuan untuk mengetahui konsep atau konfigurasi dalam pembuatan endpoint API menggunakan GraphQL khususnya dengan Node.JS. 

# Kebutuhan 
- Node.JS
- MySQL 
- PostgreSQL
- MongoDB
- [Nodemon](https://www.npmjs.com/package/nodemon) (optional) 

# Konfigurasi Project
- Install package terlebih dahulu pada folder project dengan menjalankan perintah 
    ```
    npm install
    ```
- Kemudian membuat database pada localhost pada MySQL, PostgreSQL, dan MongoDB misalnya dengan nama "test_graphql"
- Import SQL dari file yang sudah tersedia pada folder project dengan nama file "test_graphql.sql" untuk MySQL dan PostgreSQL dan "author.json" serta "book.json" untuk MongoDB
- Untuk konfigurasi database terdapat pada beberapa file pada folder "./schema" yang berbeda-beda yaitu:
    1. schemamongo.js => untuk konfigurasi GraphQL menggunakan database MongoDB 
    2. schemamysql.js => untuk konfigurasi GraphQL menggunakan database MySQL 
    3. schemamysqlpool.js => untuk konfigurasi GraphQL menggunakan database MySQL dengan koneksi pool 
    4. schemamysqlpoolrest.js => untuk konfigurasi RESTful API menggunakan database MySQL 
    5. schemapostgre.js => untuk konfigurasi GraphQL menggunakan database PostgreSQL
- Dari file tersebut harus diubah konfigurasinya sesuai localhost anda. Valu yang perlu diubah pada database MySQL terdapat pada variabel:
    1. host : isi dengan nama host anda
    2. user : isi dengan nama user pada localhost anda
    3. password : isi dengan password user pada localhost anda 
    4. database : isi dengan nama database untuk menyimpan data dari SQL yang telah di import 
- Untuk PostgreSQL terdapat pada variabel connectionString dan disesuaikan dengan linkn postgresql anda dan untuk mongoDB terdapat pada Mongoose.connect() dengan link yang disesuaikan dengan MongoDB anda 
---
# Penggunaan Aplikasi 
Pada aplikasi terdapat 2 file utama atau index yaitu app.js untuk GraphQL dan apprest.js untuk RESTful API. Untuk menjalankan serve pada file tersebut dapat menggunakan perintah "node" atau "nodemon" sebagai berikut:
- Menjalankan app.js 
    ```
    node app.js
    ```
    atau 
    ```
    nodemon app
    ```
- Menjalankan apprest.js
    ```
    node apprest.js
    ```
    atau 
    ```
    nodemon apprest
    ```
    
Untuk hasil serve pada app.js berjalan di [localhost:3000](http://localhost:3000/) dan apprest.js berjalan di [localhost:3001](http://localhost:3001/). Link yang tersedia pada app.js:

- [localhost:3000/graphmysql](http://localhost:3000/graphmysql)  => Endpoint GraphQL dengan database MySQL 
- [localhost:3000/graphmysqlpool](http://localhost:3000/graphmysqlpool)  => Endpoint GraphQL dengan database MySQL dengan menggunakan pool
- [localhost:3000/graphmysqlcrypt](http://localhost:3000/graphmysqlcrypt)  => Endpoint GraphQL dengan database MySQL dan query encrypt
- [localhost:3000/graphpostgre](http://localhost:3000/graphpostgre)  => Endpoint GraphQL dengan database PostgreSQL
- [localhost:3000/graphmysql](http://localhost:3000/graphmongo)  => Endpoint GraphQL dengan database MongoDB     

Pada file apprest.js terdapat link:

- [localhost:3001/getbooks](http://localhost:3001/getbooks)  => Endpoint untuk data book dengan RESTful API  