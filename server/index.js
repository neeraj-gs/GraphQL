const express = require('express');
const {ApolloServer} = require('@apollo/server') //apoloo is a library used ot create graphql servers in NOdejs
const {expressMiddleware} = require('@apollo/server/express4') //integrates apollo server with express
const bodyParser = require('body-parser');
const cors = require('cors');

async function startServer(){ // set up and start the Express server with Apollo Server integrated.
   const app = express();
   const server = new ApolloServer({}); //creates a new instance of apollo server,inside confid has typeDefs and resolvers

   app.use(bodyParser.json())
   app.use(cors());

   await server.start()
   
   app.use('/graphql',expressMiddleware(server)); //when some requiest comes to /graphql endppint expressMIdeware handles 

   app.listen(8000,()=>{
      console.log('Server is running on port 8000');
   })
}

startServer();
