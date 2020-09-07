import { Resolvers } from "../../generated/graphql.types";
import { getCourseClassListParent } from "../CourseClassList/CourseClassList.parent";

const resolver: Resolvers["CourseEdition"]["courseClassLists"] = async (parent, _, { dataLoaders, includeHidden }) => {
	return (
		await dataLoaders.courseClassList.findAll({
			courseEditionId: parent.id,
			includeHidden,
		})
	).map((courseClassList) => getCourseClassListParent(courseClassList));
};

export default resolver;
