const mongoose = require('mongoose');
const express = require('express');
const { ApolloServer} = require('apollo-server')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const keys = require('./config/keys')
const graphqlSchema = require('./api/Schema/index.js')
const graphqlResolver = require('./api/Resolver/index.js')
mongoose.connect(keys.mongoURI,{useUnifiedTopology:true,useNewUrlParser:true},(error) => {
    if(error) throw error
    console.log('MongoDB Connected')
})
const server = new ApolloServer({typeDefs:graphqlSchema,resolvers:graphqlResolver});
server.listen().then(({url}) => {
	
	console.log(`Server is Running on ${url}`)
})