const {gql} = require('apollo-server')

module.exports = gql`
        type User{
            username:String!
            password:String!
        }
        input UserInput{
            username:String!
            password:String
        }
        type Query{
            getUser(userID:ID!):User!
        }
        type Mutation{
            createUser(userInput:UserInput):User
        }
        type Subscription{
                userAdded:User!
        }
`