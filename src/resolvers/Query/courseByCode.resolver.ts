import { getNotFoundError } from "../_utils/getNotFoundError";
import { Resolvers } from "../../generated/graphql.types";
import { getCourseParent } from "../Course/Course.parent";

const resolver: Resolvers["Query"]["courseByCode"] = async (_, args, context) => {
	const { dataLoaders } = context;
	const course = await dataLoaders.course.findOne({ code: args.code, includeHidden: true });

	return course ? getCourseParent(course) : getNotFoundError();
};

export default resolver;
