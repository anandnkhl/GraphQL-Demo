const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({ //configure graphql
    //links to our schema
    schema: buildSchema(`
        type RootQuery{
            events: [String!]!
        }

        type RootMutation{
            createEvent(name : String): String
        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    //links to our resolvers
    rootValue: { 
        events: () => {
            return ['Running', 'Swiming', 'Yoga']
        },
        createEvent: (args) => {
            const eventName = args.name;
            return eventName;
        }
    },
    //to enable default UI for graphQL interaction which is shipped with graphql
    graphiql: true
}));

app.listen(8080);