import gql from "graphql-tag";

const schema = gql`
	type User {
		id: ID!

		email: String!
		name: String
		uid: String

		roles: [UserRole!]!

		createdAt: String
		updatedAt: String
		deletedAt: String
	}
`;

export default schema;
