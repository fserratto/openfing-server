import gql from "graphql-tag";

const schema = gql`
	type UserRole {
		id: ID!
		code: String!
	}

	extend type Query {
		userRoles: [UserRole!]!
	}
`;

export default schema;
