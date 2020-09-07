import gql from "graphql-tag";

const schema = gql`
	type CourseClassList {
		id: ID!

		code: String!
		name: String

		classes: [CourseClass!]
		courseEdition: CourseEdition

		createdAt: String
		updatedAt: String
		deletedAt: String

		createdBy: User
		updatedBy: User
		deletedBy: User
	}

	union CourseClassListByIdResult = CourseClassList | NotFoundError
	union CourseClassListByCodeResult = CourseClassList | NotFoundError

	extend type Query {
		courseClassListById(id: ID!): CourseClassListByIdResult!
		courseClassListByCode(code: String!): CourseClassListByCodeResult!
	}
`;

export default schema;
