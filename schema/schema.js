const graphql = require("graphql");
const _ = require("lodash");
const authors = require("../data");

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
} = graphql;

// Books
const books = [
	{ id: "4", name: "Behind The Scenes", genre: "Documentary", authorId: "1" },
	{ id: "1", name: "The Endgame", genre: "Awesome", authorId: "1" },
	{ id: "2", name: "The Node.js", genre: "Backend", authorId: "2" },
	{ id: "3", name: "The Long Earth", genre: "Exploration", authorId: "3" },
];

// PCs
const pcData = [
	{ id: "1", name: "First Mark-1", company: "Intel" },
	{ id: "2", name: "First Mark-2", company: "DELL" },
	{ id: "3", name: "First Mark-3", company: "HP" },
];

// Book Type
const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				return _.find(authors, { id: parent.authorId });
			},
		},
	}),
});

// PC Type
const PCType = new GraphQLObjectType({
	name: "pc",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		company: { type: GraphQLString },
	}),
});

// Author Type
const AuthorType = new GraphQLObjectType({
	name: "author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				console.log({ parent });
				return _.filter(books, { authorId: parent.id });
			},
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: () => ({
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// code to get data from db or other source
				//console.log(_.find(data, { id: args.id }));
				return _.find(books, { id: args.id });
			},
		},
		pc: {
			type: PCType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// Return the pc
				return _.find(pcData, { id: args.id });
			},
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return _.find(authors, { id: args.id });
			},
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return books;
			},
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return authors;
			},
		},
	}),
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
