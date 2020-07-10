require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const app = express();

const events = [];

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({ //configure graphql
    //links to our schema
    schema: buildSchema(`
        type Event{
            _id: ID
            title: String!
            description: String!
            time: String!
        }

        type RootQuery{
            events: [Event!]!
        }


        type RootMutation{
            createEvent(title: String! description: String! time: String!): Event
        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    //links to our resolvers
    rootValue: { 
        events: () => {
            return events;
        },
        createEvent: (args) => {
            const event = {
                _id: Math.random().toString(),
                title: args.title,
                description: args.description,
                time: args.time
            };
            events.push(event);
            return event;
        }
    },
    //to enable default UI for graphQL interaction which is shipped with graphql
    graphiql: true
}));

console.log(process.env.MONGODB_USER);

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