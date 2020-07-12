require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const app = express();

const UserFitnessData = require("./Models/userFitnessDataModel")

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({ //configure graphql
    //links to our graphQL schema
    schema: buildSchema(`
        type avgWaterPerWeek{
            week: Int!
            ltr: Int!
        }

        type UserFitnessData{
            _id: ID!
            userName: String!
            waterConsumption: [avgWaterPerWeek]!
        }

        type RootQuery{
            userFitnessData: [UserFitnessData]
        }

        input avgWaterPerWeekInput{
            week: Int!
            ltr: Int!
        }

        input UserFitnessDataInput{
            userName: String! 
            waterConsumption: [avgWaterPerWeekInput]
        }

        type RootMutation{
            createUserFitnessData(userFitnessDataInput : UserFitnessDataInput): UserFitnessData
        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    //links to our resolvers
    rootValue: { 
        userFitnessData: () => {
            return allUserFitnessData;
        },
        createUserFitnessData: (args) => {
            const userFitnessData = new UserFitnessData ({
                userName: args.userFitnessDataInput.userName,
                waterConsumption: args.userFitnessDataInput.waterConsumption,
            });

            //save() providede by mongoose lib, to write data to the MongoDB connected
            return userFitnessData.save()
                .then(
                    result =>{
                        console.log(result);
                        return {...result._doc}
                    }
                )
                .catch(
                    err => { 
                        console.log(err)
                        throw err;
                    }
                );
        }
    },
    //to enable default UI for graphQL interaction which is shipped with graphql
    graphiql: true
}));

mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@fitnesstrackingdashboar.vookk.mongodb.net/fitnessDB?retryWrites=true&w=majority`, 
    { useNewUrlParser: true , useUnifiedTopology: true}
).then(() => {
        app.listen(8080);
        console.log('perfect')
    }
)
.catch( err => {
    console.log(err);
    }
)