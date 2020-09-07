import { Resolvers } from "../../generated/graphql.types";
import { getCourseClassVideoFormatParent } from "../CourseClassVideoFormat/CourseClassVideoFormat.parent";

const resolver: Resolvers["CourseClassVideoQuality"]["formats"] = async (parent, _, { dataLoaders }) => {
	return (
		await dataLoaders.courseClassVideoFormat.findAll({ courseClassVideoQualityId: parent.id })
	).map((courseClassVideoFormat) => getCourseClassVideoFormatParent(courseClassVideoFormat));
};

export default resolver;
