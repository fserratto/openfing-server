import { Connection } from "typeorm";

import { identity } from "../../_utils/identity";
import { getTypedRepository } from "../../entities/_utils/getTypedRepository";
import { CourseClassVideoQuality, courseClassVideoQualityColumns } from "../../entities/CourseClassVideoQuality";
import { CourseClassVideoQualityRow } from "../../entities/CourseClassVideoQuality/CourseClassVideoQuality.entity.types";
import { CourseClassVideoQualityRepository } from "./CourseClassVideoQuality.repository.types";

export const getCourseClassVideoQualityRepository = (connection: Connection): CourseClassVideoQualityRepository => {
	const repo = getTypedRepository(CourseClassVideoQuality, connection);

	const is: CourseClassVideoQualityRepository["is"] = (courseClassVideoQuality, options) => {
		return courseClassVideoQuality.id === options.id && courseClassVideoQuality.deletedAt === null;
	};

	return {
		_typedRepository: repo,

		findAll: (options) => {
			const queryBuilder = repo.createQueryBuilder("ccvq");

			queryBuilder
				.andWhere(
					`ccvq.${courseClassVideoQualityColumns.courseClassVideoId.name} = :courseClassVideoId`,
					identity<{ courseClassVideoId: CourseClassVideoQualityRow["courseClassVideoId"] }>({
						courseClassVideoId: options.courseClassVideoId,
					})
				)
				.andWhere(`ccvq.${courseClassVideoQualityColumns.deletedAt.name} is null`);

			return queryBuilder.getMany();
		},

		findBatch: async (options) => {
			const queryBuilder = repo.createQueryBuilder("ccvq");

			queryBuilder
				.andWhere(`ccvq.${courseClassVideoQualityColumns.deletedAt.name} is null`)
				.andWhereInIds(identity<Array<CourseClassVideoQualityRow["id"]>>(options.map((options) => options.id)));

			const courseClassVideoQualitys = await queryBuilder.getMany();

			return options.map(
				(options) =>
					courseClassVideoQualitys.find((courseClassVideoQuality) => is(courseClassVideoQuality, options)) ||
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
