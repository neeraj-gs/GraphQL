const express = require('express');
const {ApolloServer} = require('@apollo/server') //apoloo is a library used ot create graphql servers in NOdejs
const {expressMiddleware} = require('@apollo/server/express4') //integrates apollo server with express
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: axios } = require('axios');


async function startServer(){ // set up and start the Express server with Apollo Server integrated.
   const app = express();
   const server = new ApolloServer({
      typeDefs: `

         type User{
            id:ID!
         }

         type Todo{
            id:ID!
            title:String!
            completed:Boolean
         }

         type Query{
            getTodos:[Todo]
         }
      `, //int the typedefs we will only mention the data nad what it writtens , only name of the funotin and return
      resolvers: { //all the logic of query and mutation is written in the resolvers
         Query:{
            getTodos:async()=>{
               try {
                  const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
                  return response.data; // Return the fetched todos
               } catch (error) {
                  console.error("Error fetching todos:", error);
                  return []; // Return an empty array or handle the error accordingly
               }
            }
         }
      }
   }); //creates a new instance of apollo server,inside confid has typeDefs and resolvers

   app.use(bodyParser.json())
   app.use(cors());

   await server.start()
   
   app.use('/graphql',expressMiddleware(server)); //when some requiest comes to /graphql endppint expressMIdeware handles 

   app.listen(8000,()=>{
      console.log(`Server is running on port http://localhost:8000`);
   })
}

startServer();
