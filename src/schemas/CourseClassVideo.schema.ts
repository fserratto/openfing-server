import gql from "graphql-tag";

const schema = gql`
	type CourseClassVideo {
		id: ID!

		name: String

		qualities: [CourseClassVideoQuality!]!
		courseClass: CourseClass

		createdAt: String
		updatedAt: String
		deletedAt: String

		createdBy: User
		deletedBy: User
		updatedBy: User
	}
`;

export default schema;
