const express = require('express');
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
const bodyParser = require('body-parser');
const cors = require('cors');

async function startServer(){
   const app = express();
   const server = new ApolloServer({});

   app.use(bodyParser.json())
   app.use(cors());

   await server.start()
   
   app.use('/graphql',expressMiddleware(server)); //when some requiest comes to /graphql endppint expressMIdeware handles 

   app.listen(8000,()=>{
      console.log('Server is running on port 8000');
   })
}

startServer();
