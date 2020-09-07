import gql from "graphql-tag";

const schema = gql`
	type CourseClass {
		id: ID!

		number: Int
		name: String

		videos: [CourseClassVideo!]!
		courseClassList: CourseClassList

		createdAt: String
		updatedAt: String
		deletedAt: String

		createdBy: User
		updatedBy: User
		deletedBy: User
	}

	union CourseClassByIdResult = CourseClass | NotFoundError
	union UpdateCourseClassVideosResult = CourseClass | NotFoundError

	extend type Query {
		courseClassById(id: ID!): CourseClassByIdResult!
		latestCourseClasses: [CourseClass!]!
	}

	extend type Mutation {
		updateCourseClassVideos(courseClassId: ID!, secret: String!): NotFoundError!
	}
`;

export default schema;
