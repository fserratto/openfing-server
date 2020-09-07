import gql from "graphql-tag";

const schema = gql`
	type Faq {
		id: ID!

		title: String!
		content: String!
		isHtml: Boolean

		createdAt: String
		createdBy: User

		updatedAt: String
		updatedBy: User

		deletedAt: String
		deletedBy: User
	}

	extend type Query {
		faqs: [Faq!]!
	}
`;

export default schema;
