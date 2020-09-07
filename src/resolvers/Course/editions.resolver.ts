import { Resolvers } from "../../generated/graphql.types";
import { getCourseEditionParent } from "../CourseEdition/CourseEdition.parent";

const resolver: Resolvers["Course"]["editions"] = async (parent, _, context) => {
	const { dataLoaders, includeHidden } = context;

	return (
		await dataLoaders.courseEdition.findAll({
			courseId: parent.id,
			includeHidden,
		})
	).map(getCourseEditionParent);
};

export default resolver;
