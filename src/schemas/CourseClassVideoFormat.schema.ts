import gql from "graphql-tag";

const schema = gql`
	type CourseClassVideoFormat {
		id: ID!

		name: String
		url: String
		hasTorrent: Boolean

		quality: CourseClassVideoQuality

		createdAt: String
		updatedAt: String
		deletedAt: String

		createdBy: User
		deletedBy: User
		updatedBy: User
	}
`;

export default schema;
