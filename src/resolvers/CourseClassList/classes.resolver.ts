import { Resolvers } from "../../generated/graphql.types";
import { getCourseClassParent } from "../CourseClass/CourseClass.parent";

const resolver: Resolvers["CourseClassList"]["classes"] = async (parent, _, { dataLoaders, includeHidden }) => {
	return (
		await dataLoaders.courseClass.findAll({
			courseClassListId: parent.id,
			includeHidden,
		})
	).map((courseClass) => getCourseClassParent(courseClass));
};

export default resolver;
