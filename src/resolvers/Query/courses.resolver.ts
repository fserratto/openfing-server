import { Resolvers } from "../../generated/graphql.types";
import { getCourseParent } from "../Course/Course.parent";

const resolver: Resolvers["Query"]["courses"] = async (_, __, context) => {
	const { dataLoaders } = context;

	return (await dataLoaders.course.findAll()).map(getCourseParent);
};

export default resolver;
