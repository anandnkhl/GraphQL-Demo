require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const app = express();

const allUserFitnessData = [];

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({ //configure graphql
    //links to our schema
    schema: buildSchema(`
        type avgWaterPerWeek{
            week: Int!
            ltr: Int!
        }

        type UserFitnessData{
            _id: Float!
            userName: String!
            waterConsumption: [avgWaterPerWeek]
        }

        type RootQuery{
            userFitnessData: UserFitnessData
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
            const userFitnessData = {
                _id: Math.random()*99,
                userName: args.userFitnessDataInput.userName,
                waterConsumption: args.userFitnessDataInput.waterConsumption,
            };
            allUserFitnessData.push(userFitnessData);
            console.log(allUserFitnessData);
            return allUserFitnessData;
        }
    },
    //to enable default UI for graphQL interaction which is shipped with graphql
    graphiql: true
}));

mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@fitnesstrackingdashboar.vookk.mongodb.net/fitnessDB?retryWrites=true&w=majority`, 
    { useNewUrlParser: true , useUnifiedTopology: true}
).then(() => {
        console.log('perfect')
    }
)
.catch( err => {
    console.log(err);
    }
)
app.listen(8080);