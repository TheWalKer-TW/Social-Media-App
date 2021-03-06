/*
https://studio.apollographql.com/sandbox/explorer
https://cloud.mongodb.com/v2/6143a46f950db50bad04c659#metrics/replicaSet/6143a63a0dcb7875f8edcc78/explorer/merng/posts/find
*/

const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post')
const User = require('./models/User')
const { MONGODB } = require('./config.js')


const typeDefs = gql`
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }
    type Query{
        getPosts: [Post]
    }
`;

const resolvers = {
    Query: {
        async getPost(){
            try{
                const posts = await Post.find();
                return
            } catch(err){
                console.log(err);
            }
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, { useNewUrlParser: true }).then(() => {
    console.log(`MongoDB Connected`);
    return server.listen({ port: 5000 }).then((res) => {
        console.log(`Server running at ${res.url}`);
    });
});