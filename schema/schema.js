const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
	}),
});

// some data
const data = [
	{ id: "1", name: "The Endgame", genre: "Awesome" },
	{ id: "2", name: "The Node.js", genre: "Backend" },
	{ id: "3", name: "The Long Earth", genre: "Exploration" },
];

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: () => ({
		book: {
			type: BookType,
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				// code to get data from db or other source
				data.forEach((item) => {
					if (item.id === args.id) {
						return item;
					}
				});
			},
		},
	}),
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
