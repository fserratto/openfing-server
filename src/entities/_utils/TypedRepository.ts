import { Repository } from "typeorm";

import { SafeOmit } from "../../_utils/utilTypes";
import { EntityRow, Relations, TypedEntitySchema } from "./createTypedEntitySchema";

export type TypedRepository<T extends TypedEntitySchema> = SafeOmit<
	Repository<
		EntityRow<T> &
			{
				[K in keyof Exclude<T["_TRelations"], undefined>]: Exclude<
					T["_TRelations"],
					undefined
				> extends Relations
					? Exclude<T["_TRelations"], undefined>[K]["type"] extends "one-to-many" | "many-to-many"
						? Array<EntityRow<Exclude<Exclude<T["_TRelations"], undefined>[K]["_TTarget"], undefined>>>
						: EntityRow<Exclude<Exclude<T["_TRelations"], undefined>[K]["_TTarget"], undefined>>
					: never;
			}
	>,
	"create" | "save"
> & {
	save: (
		data: EntityRow<T> extends { id: unknown }
			? SafeOmit<EntityRow<T>, "id"> & { id?: EntityRow<T>["id"] }
			: EntityRow<T>
	) => Promise<EntityRow<T>>;
	create: (
		data: EntityRow<T> extends { id: unknown }
			? SafeOmit<EntityRow<T>, "id"> & { id?: EntityRow<T>["id"] }
			: EntityRow<T>
	) => EntityRow<T>;
};
