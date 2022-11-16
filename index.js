const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

// Middlware
app.use(
	"/graphql",
	graphqlHTTP({
		schema,
	})
);

app.listen(3000, () => console.log("Server listening on 3000"));
