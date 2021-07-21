const User = require('../../models/user')
const pubsub = require('./helper/PubSub')
const bcrypt = require('bcryptjs')
module.exports = {
    getUser: async(args) => {
        try{
            const getuser = await User.findById(args.userID);
            if(getuser){
                return getuser
            }
        }
        catch(error){
            throw error
        }
    },
    createUser: async(args) => {
        try{
            console.log(args)
            const isUserExists = await User.findOne({username:args.userInput.username})
            if(isUserExists){
                throw new Error("User Already Exists!")
            }
            else{
                let hashedPassword = await bcrypt.hash(args.userInput.password,12)
                const newuser = new User({
                    username:args.userInput.username,
                    password:hashedPassword
                })
                pubsub.publish('USERADDED',{
                    userAdded:{
                        username:args.userInput.username,
                        password:args.userInput.password
                    }
                })
                const result = await newuser.save()
                if(result){
                    return result
                }
            }
        }
        catch(error){
            throw error
        }
    },
}