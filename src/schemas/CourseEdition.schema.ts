import gql from "graphql-tag";

const schema = gql`
	type CourseEdition {
		id: ID!

		name: String
		semester: Int
		year: Int

		courseClassLists: [CourseClassList!]!
		course: Course

		createdAt: String
		updatedAt: String
		deletedAt: String

		createdBy: User
		updatedBy: User
		deletedBy: User
	}

	union CourseEditionByIdResult = CourseEdition | NotFoundError

	extend type Query {
		courseEditionById(id: ID!): CourseEditionByIdResult!
	}
`;

export default schema;
