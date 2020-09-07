import { Resolvers } from "../../generated/graphql.types";
import { getCourseClassParent } from "../CourseClass/CourseClass.parent";

const resolver: Resolvers["Query"]["latestCourseClasses"] = async (_, __, context) => {
	return (await context.dataLoaders.courseClass.findAll({ latest: 20 })).map(getCourseClassParent);
};

export default resolver;
