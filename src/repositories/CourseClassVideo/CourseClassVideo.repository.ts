import { Connection } from "typeorm";

import { identity } from "../../_utils/identity";
import { getTypedRepository } from "../../entities/_utils/getTypedRepository";
import { CourseClassVideo, courseClassVideoColumns, CourseClassVideoVisibility } from "../../entities/CourseClassVideo";
import { CourseClassVideoRow } from "../../entities/CourseClassVideo/CourseClassVideo.entity.types";
import { CourseClassVideoRepository } from "./CourseClassVideo.repository.types";

export const getCourseClassVideoRepository = (connection: Connection): CourseClassVideoRepository => {
	const repo = getTypedRepository(CourseClassVideo, connection);

	const is: CourseClassVideoRepository["is"] = (courseClassVideo, options) => {
		return (
			courseClassVideo.id === options.id &&
			courseClassVideo.deletedAt === null &&
			(options.includeHidden ||
				courseClassVideo.visibility === CourseClassVideoVisibility.public ||
				options.includeDisabled ||
				courseClassVideo.visibility === CourseClassVideoVisibility.disabled)
		);
	};

	return {
		_typedRepository: repo,

		findAll: (options) => {
			const queryBuilder = repo.createQueryBuilder("ce");

			queryBuilder
				.andWhere(
					`ce.${courseClassVideoColumns.courseClassId.name} = :courseClassId`,
					identity<{ courseClassId: CourseClassVideoRow["courseClassId"] }>({
						courseClassId: options.courseClassId,
					})
				)
				.andWhere(`ce.${courseClassVideoColumns.deletedAt.name} is null`);

			if (!options.includeDisabled)
				queryBuilder.andWhere(
					`ce.${courseClassVideoColumns.visibility.name} != :v1`,
					identity<{ v1: CourseClassVideoRow["visibility"] }>({
						v1: CourseClassVideoVisibility.disabled,
					})
				);

			if (!options.includeHidden)
				queryBuilder.andWhere(
					`ce.${courseClassVideoColumns.visibility.name} != :v2`,
					identity<{ v2: CourseClassVideoRow["visibility"] }>({
						v2: CourseClassVideoVisibility.hidden,
					})
				);

			return queryBuilder.getMany();
		},

		findBatch: async (options) => {
			const queryBuilder = repo.createQueryBuilder("ce");

			queryBuilder
				.andWhere(`ce.${courseClassVideoColumns.deletedAt.name} is null`)
				.andWhereInIds(identity<Array<CourseClassVideoRow["id"]>>(options.map((options) => options.id)));

			const courseClassVideos = await queryBuilder.getMany();

			return options.map((options) => courseClassVideos.find((ce) => is(ce, options)) || null);
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
