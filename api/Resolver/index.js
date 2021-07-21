const UserResolver = require('./userResolver')
const pubsub = require('./helper/PubSub')
module.exports = resolvers ={
    Query:{
        getUser:(_,args) => UserResolver.getUser(args)
    },
    Mutation:{
        createUser:(_,args) => UserResolver.createUser(args) 
    },
    Subscription:{
        userAdded:{
            subscribe:() => pubsub.asyncIterator(['USER_ADDED'])
        }
    }
}