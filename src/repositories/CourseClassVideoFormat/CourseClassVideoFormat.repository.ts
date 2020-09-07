import { Connection } from "typeorm";

import { identity } from "../../_utils/identity";
import { getTypedRepository } from "../../entities/_utils/getTypedRepository";
import { CourseClassVideoFormat, courseClassVideoFormatColumns } from "../../entities/CourseClassVideoFormat";
import { CourseClassVideoFormatRow } from "../../entities/CourseClassVideoFormat/CourseClassVideoFormat.entity.types";
import { CourseClassVideoFormatRepository } from "./CourseClassVideoFormat.repository.types";

export const getCourseClassVideoFormatRepository = (connection: Connection): CourseClassVideoFormatRepository => {
	const repo = getTypedRepository(CourseClassVideoFormat, connection);

	const is: CourseClassVideoFormatRepository["is"] = (courseClassVideoFormat, options) => {
		return courseClassVideoFormat.id === options.id && courseClassVideoFormat.deletedAt === null;
	};

	return {
		_typedRepository: repo,

		findAll: (options) => {
			const queryBuilder = repo.createQueryBuilder("ccvf");

			queryBuilder
				.andWhere(
					`ccvf.${courseClassVideoFormatColumns.courseClassVideoQualityId.name} = :courseClassVideoQualityId`,
					identity<{ courseClassVideoQualityId: CourseClassVideoFormatRow["courseClassVideoQualityId"] }>({
						courseClassVideoQualityId: options.courseClassVideoQualityId,
					})
				)
				.andWhere(`ccvf.${courseClassVideoFormatColumns.deletedAt.name} is null`);

			return queryBuilder.getMany();
		},

		findBatch: async (options) => {
			const queryBuilder = repo.createQueryBuilder("ccvf");

			queryBuilder
				.andWhere(`ccvf.${courseClassVideoFormatColumns.deletedAt.name} is null`)
				.andWhereInIds(identity<Array<CourseClassVideoFormatRow["id"]>>(options.map((options) => options.id)));

			const courseClassVideoFormats = await queryBuilder.getMany();

			return options.map(
				(options) =>
					courseClassVideoFormats.find((courseClassVideoFormat) => is(courseClassVideoFormat, options)) ||
					null
			);
		},

		is,

		create: (data) => ({
			...data,
			createdAt: data.createdAt || new Date(),
			updatedAt: data.updatedAt || null,
			deletedAt: data.deletedAt || null,
			updatedById: data.updatedById || null,
			deletedById: data.deletedById || null,
		}),

		save: (data) => repo.save(data),
	};
};
