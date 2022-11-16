const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
	}),
});

const pcType = new GraphQLObjectType({
	name: "pc",
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		company: { type: GraphQLString },
	}),
});

// some data
const data = [
	{ id: "1", name: "The Endgame", genre: "Awesome" },
	{ id: "2", name: "The Node.js", genre: "Backend" },
	{ id: "3", name: "The Long Earth", genre: "Exploration" },
];

const pcData = [
	{ id: "1", name: "First Mark-1", company: "Intel" },
	{ id: "2", name: "First Mark-2", company: "DELL" },
	{ id: "3", name: "First Mark-3", company: "HP" },
];

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: () => ({
		book: {
			type: BookType,
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				// code to get data from db or other source
				//console.log(_.find(data, { id: args.id }));
				return _.find(data, { id: args.id });
			},
		},
		pc: {
			type: pcType,
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				// Return the pc
				return _.find(pcData, { id: args.id });
			},
		},
	}),
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
