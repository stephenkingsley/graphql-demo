/**
 * Copyright (c) 2016/5/10, Stephen.Kingsley
 * This is a demo for graphql
*/
const graphql = require('graphql');

// better
const GraphQLEnumType = graphql.GraphQLEnumType;
const GraphQLInterfaceType = graphql.GraphQLInterfaceType;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLList = graphql.GraphQLList;
const GraphQLNonNull = graphql.GraphQLNonNull;
const GraphQLSchema = graphql.GraphQLSchema;
const GraphQLString = graphql.GraphQLString;

// best node.js 5.1.1 not supported yet
/**
const { GraphQLEnumType, 
  GraphQLInterfaceType, 
  GraphQLObjectType, 
  GraphQLList, 
  GraphQLNonNull, 
  GraphQLSchema, 
  GraphQLString 
} = graphql;
**/

const graphqlHTTP = require('express-graphql');
const express = require('express');

const fakeData = require('./fakeData');

const getHuman = fakeData.getHuman;
const getHobby = fakeData.getHobby;

/**
 * Human example is like that:
 * interface hobbyTypeInterfaceType: {
 *  id: String!,
 *  name: String,
 *  hobby:[hobbyTypeInterfaceType]
 * }
 *
 * interface hobbyTypeInterfaceType: {
 *  id: String!,
 *  name: String
 * }
 *
 * type hobbyType: {
 *  id: String!,
 *  name: String,
 * }
 *
 * type human: {
 *  id: String!,
 *  name: String,
 *  hobby:[hobbyTypeInterfaceType]
 * }
 *
 * type Query {
 *   human(id: String!): Human
 * }
*/

/**
 * This implements the following type system shorthand
*/
const humanTypeInterface = new GraphQLInterfaceType({
  name: 'humanInterface',
  description: 'human interface',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the human.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the human.',
    },
    hobby: {
      type: new GraphQLList(hobbyTypeInterfaceType),
      description: 'The hobby of the human, or an empty list if they ' +
                   'have none.',
    }
  }),
  resolveType: human => humanType
});

/**
 * This implements the following type system shorthand
*/
const hobbyTypeInterfaceType = new GraphQLInterfaceType({
  name: 'hobbyInterface',
  description: 'hobby interface',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the hobby.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the hobby.',
    }
  }),
  resolveType: hobby => hobbyType
});

/**
 * This implements the following type system shorthand
*/
const hobbyType = new GraphQLObjectType({
  name: 'Hobby',
  description: 'hobby',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the hobby.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the hobby.',
    }
  }),
  interfaces: [hobbyTypeInterfaceType]
});

/**
 * This implements the following type system shorthand
*/
const humanType = new GraphQLObjectType({
  name: 'Human',
  description: 'Awesome Human',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the human.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the human.',
    },
    hobby: {
      type: new GraphQLList(hobbyTypeInterfaceType),
      description: 'The friends of the human, or an empty list if they ' +
                   'have none.',
      resolve: human => getHobby(human),
    }
  }),
  interfaces: [humanTypeInterface]
});


const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    human: {
      type: humanType,
      args: {
        id: {
          description: 'id of the human',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, {id}) => getHuman(id),
    },
  })
});

const schema = new GraphQLSchema({
  query: queryType,
  types: [humanType, hobbyType]
});

express()
  .use('/graphql', graphqlHTTP({ schema, pretty: true }))
  .listen(5000);

console.log('GraphQL server running on http://localhost:5000/graphql');
