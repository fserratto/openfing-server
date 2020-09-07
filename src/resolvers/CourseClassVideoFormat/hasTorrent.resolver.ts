import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["CourseClassVideoFormat"]["hasTorrent"] = async (parent, _, { dataLoaders }) =>
	!!parent.url && dataLoaders.courseClassVideoFormat.hasTorrent({ url: parent.url });

export default resolver;
