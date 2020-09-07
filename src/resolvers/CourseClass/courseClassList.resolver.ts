import { Resolvers } from "../../generated/graphql.types";
import { getCourseClassListParent } from "../CourseClassList/CourseClassList.parent";

const resolver: Resolvers["CourseClass"]["courseClassList"] = async (parent, _, context) => {
	const courseClassList =
		parent.courseClassListId !== null
			? await context.dataLoaders.courseClassList.findOne({
					id: parent.courseClassListId,
					includeHidden: true,
			  })
			: null;

	return courseClassList && getCourseClassListParent(courseClassList);
};

export default resolver;
