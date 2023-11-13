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
         type Todo{
            id:ID!
            title:String!
            completed:Boolean
         }

         type Query{
            getTodos:[Todo]
         }
      `,
      resolvers: { //all the logic of query and mutation is written in the resolvers
         Query:{
            getTodos:async()=>{
               (await axios.get('https://jsonplaceholder.typicode.com/todos')).data
            }
         }
      }
   }); //creates a new instance of apollo server,inside confid has typeDefs and resolvers

   app.use(bodyParser.json())
   app.use(cors());

   await server.start()
   
   app.use('/graphql',expressMiddleware(server)); //when some requiest comes to /graphql endppint expressMIdeware handles 

   app.listen(8000,()=>{
      console.log('Server is running on port 8000');
   })
}

startServer();
