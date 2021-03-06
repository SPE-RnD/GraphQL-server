const graphql=require('graphql');
const _=require('lodash');
const{ Pool,Client} = require('pg');
const connectionString = 'postgressql://postgres:123456@localhost:5432/test_graphql';
const {GraphQLSchema,GraphQLObjectType,GraphQLList,GraphQLString,GraphQLID,GraphQLInt} = graphql;

var koneksi= new Client({
    connectionString:connectionString
});

koneksi.connect();

function query_mysql(query, callback){
    return new Promise((resolve,reject)=>{ //Untuk return data 
        koneksi.query(query,function(error, rows, fields){
            if(error){
                reject(error);
            }
            
            if(rows.rows){
                if(rows.rows.length>0){
                    var result = JSON.parse(JSON.stringify(rows.rows));
                    resolve(result);
                }
            }

            resolve([{}]);
            
        });
    })
}


function query_mysql_cud(query,val,callback){
    return new Promise((resolve,reject)=>{ //Untuk return data 
        koneksi.query(query,val,function(error, rows, fields){
            
            if(error){
                reject(error);
            }
            
            if(rows.rows){
                if(rows.rows.length>0){
                    var result = JSON.parse(JSON.stringify(rows.rows));
                    resolve(result);
                }
            }

            resolve([{}]);
            
        });
    })
}


//Membuat Tipe Field Pada Obejct / Sebagai Bentuk Jsonnya Nanti
const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLID}, //id dengan jenis ID
        id_author_fk:{type:GraphQLID},//id_author_fk dengan jenis ID
        name:{type:GraphQLString}, //name dengan jenis String
        genre:{type:GraphQLString}, //genre dengan jenis String
        list_author:{ //untuk relasi ke author
            type:new GraphQLList(AuthorType), //untuk menampilkan author dalam bentuk list
            resolve(parents,args){
                //handle error
                if(parents.id_author_fk==null){
                    throw new Error( //return untuk error jika data book tidak ada
                        "Data Book Is Empty"
                      );      
                }
                return query_mysql_cud('SELECT * FROM author WHERE id=$1',[parents.id_author_fk]).then(function(result){ //uquery untuk mndapatkan data author
                    return result;
                });
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLID},//id dengan jenis ID
        name:{type:GraphQLString},//name dengan jenis String
        age:{type:GraphQLInt}//Age dengan jenis Integer
    })
})
//---------------------------------

//Untuk Root Query Atau Sebagai Route Pemanggilan Ke Object
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        get_data_book:{
            type:GraphQLList(BookType),
            resolve(parents,args){ //untuk mengambil datanya
                return query_mysql('SELECT * FROM book').then(function(result){
                    return result;
                });
            }
        },
        get_data_book_detail:{
            type:BookType,
            args:{
                id:{type:GraphQLID}
            },
            resolve(parents,args){ //untuk mengambil datanya
                return query_mysql_cud('SELECT * FROM book WHERE id=$1',[args.id]).then(function(result){
                    return result[0];
                });
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parents,args){
                return query_mysql_cud('SELECT * FROM author WHERE id=$1',[args.id]).then(function(result){
                    return result[0];
                });
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parents,args){
                return query_mysql('SELECT * FROM author').then(function(result){
                    return result;
                });
            }
        }
    }
})
//------------------------------------------


//Untu CREATE,UPDATE,DELETE data
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields:{
        add_book:{ //Untuk tambah data book 
            type:BookType,
            args:{
                id_author_fk:{type:GraphQLID},
                name:{type:GraphQLString},
                genre:{type:GraphQLString},
            },
            resolve(parents,args){
                console.log(args.name);
                return query_mysql_cud("INSERT INTO book (id_author_fk,name,genre) VALUES ($1,$2,$3)",[args.id_author_fk,args.name,args.genre]).then(function(result){
                    return query_mysql("SELECT * FROM book WHERE id = (SELECT MAX(id) FROM book)").then(function(result){
                        return result[0];
                    });
                });
            }
        },
        update_book:{ //Untuk ubah data book 
            type:BookType,
            args:{
                id:{type:GraphQLID},
                id_author_fk:{type:GraphQLID},
                name:{type:GraphQLString},
                genre:{type:GraphQLString},
            },
            resolve(parents,args){
                return query_mysql_cud("UPDATE book SET name=$1,genre=$2,id_author_fk=$3 WHERE id=$4",[args.name,args.genre,args.id_author_fk,args.id]).then(function(result){
                    return [];
                });
            }
        },
        delete_book:{ //Untuk hapus data book 
            type:BookType,
            args:{
                id:{type:GraphQLID}
            },
            resolve(parents,args){
                return query_mysql_cud("DELETE FROM book WHERE id=$1",[args.id]).then(function(result){
                    return [];
                });
            }
        },
    }
});


// koneksi.end();

//Untuk Export Schema Dengan Query Dari Variabel RootQuery
module.exports= new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})
//-------------------------------------------


