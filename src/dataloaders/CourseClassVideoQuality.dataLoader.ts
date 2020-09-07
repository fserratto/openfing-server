import DataLoader from "dataloader";
import { Connection } from "typeorm";

import { CourseClassVideoQualityRow } from "../entities/CourseClassVideoQuality/CourseClassVideoQuality.entity.types";
import { getCourseClassVideoQualityRepository } from "../repositories/CourseClassVideoQuality";
import {
	CourseClassVideoQualityFindAllOptions,
	CourseClassVideoQualityFindOneOptions,
} from "../repositories/CourseClassVideoQuality/CourseClassVideoQuality.repository.types";

export type CourseClassVideoQualityDataLoader = {
	findOne: (options: CourseClassVideoQualityFindOneOptions) => Promise<CourseClassVideoQualityRow | null>;
	findAll: (options: CourseClassVideoQualityFindAllOptions) => Promise<CourseClassVideoQualityRow[]>;
};

export const getCourseClassVideoQualityDataLoader = (connection: Connection): CourseClassVideoQualityDataLoader => {
	const repo = getCourseClassVideoQualityRepository(connection);
	const loader = new DataLoader<CourseClassVideoQualityFindOneOptions, CourseClassVideoQualityRow | null>(
		repo.findBatch
	);

	const courseClassVideoQualityById = new Map<CourseClassVideoQualityRow["id"], CourseClassVideoQualityRow | null>();

	return {
		findOne: async (options) => {
			const fromCache = courseClassVideoQualityById.get(options.id);

			if (fromCache !== undefined) return fromCache && repo.is(fromCache, options) ? fromCache : null;

			const courseClassVideoQuality = await loader.load(options);
			courseClassVideoQualityById.set(options.id, courseClassVideoQuality);

			return courseClassVideoQuality;
		},

		findAll: async (options) => {
			const courseClassVideoQualitys = await repo.findAll(options);

			courseClassVideoQualitys.forEach((courseClassVideoQuality) => {
				courseClassVideoQualityById.set(courseClassVideoQuality.id, courseClassVideoQuality);
			});

			return courseClassVideoQualitys;
		},
	};
};
