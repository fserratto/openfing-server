import { DocumentNode } from "graphql";

import BaseDoc from "../schemas/Base.schema";
import CourseDoc from "../schemas/Course.schema";
import CourseClassDoc from "../schemas/CourseClass.schema";
import CourseClassListDoc from "../schemas/CourseClassList.schema";
import CourseClassVideoDoc from "../schemas/CourseClassVideo.schema";
import CourseClassVideoFormatDoc from "../schemas/CourseClassVideoFormat.schema";
import CourseClassVideoQualityDoc from "../schemas/CourseClassVideoQuality.schema";
import CourseEditionDoc from "../schemas/CourseEdition.schema";
import FaqDoc from "../schemas/Faq.schema";
import UserDoc from "../schemas/User.schema";
import UserRoleDoc from "../schemas/UserRole.schema";

export const typeDefs: DocumentNode[] = [
	BaseDoc,
	CourseDoc,
	CourseClassDoc,
	CourseClassListDoc,
	CourseClassVideoDoc,
	CourseClassVideoFormatDoc,
	CourseClassVideoQualityDoc,
	CourseEditionDoc,
	FaqDoc,
	UserDoc,
	UserRoleDoc,
];
