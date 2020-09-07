import gql from "graphql-tag";

const schema = gql`
	type Course {
		id: ID!

		code: String!
		name: String!
		iconUrl: String
		eva: String

		editions: [CourseEdition!]!

		createdAt: String
		updatedAt: String
		deletedAt: String

		createdBy: User
		updatedBy: User
		deletedBy: User
	}

	extend type Query {
		courses: [Course!]!
		courseById(id: ID!): CourseByIdResult!
		courseByCode(code: String!): CourseByCodeResult!
	}

	extend type Mutation {
		createCourse(input: CreateCourseInput!): CreateCoursePayload!
	}

	union CourseByIdResult = Course | NotFoundError
	union CourseByCodeResult = Course | NotFoundError

	input CreateCourseInput {
		code: String!
		name: String!
		eva: String
		editionName: String!
		editionSemester: Int!
		editionYear: Int!
		courseClassListCode: String!
		courseClassListName: String!
	}

	union CreateCoursePayload = GenericError | NotFoundError
`;

export default schema;
