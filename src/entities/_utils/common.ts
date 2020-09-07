import { identityMap } from "../../_utils/identityMap";

export const commonManagedAtColumns: {
	createdAt: {
		name: "created_at";
		type: "timestamp with time zone";
		nullable: true;
	};
	updatedAt: {
		name: "updated_at";
		type: "timestamp with time zone";
		nullable: true;
	};
	deletedAt: {
		name: "deleted_at";
		type: "timestamp with time zone";
		nullable: true;
	};
} = {
	createdAt: {
		name: "created_at",
		type: "timestamp with time zone",
		nullable: true,
	},
	updatedAt: {
		name: "updated_at",
		type: "timestamp with time zone",
		nullable: true,
	},
	deletedAt: {
		name: "deleted_at",
		type: "timestamp with time zone",
		nullable: true,
	},
};

export const commonManagedByColumns: {
	createdById: {
		name: "created_by_id";
		type: "integer";
		nullable: true;
	};
	updatedById: {
		name: "updated_by_id";
		type: "integer";
		nullable: true;
	};
	deletedById: {
		name: "deleted_by_id";
		type: "integer";
		nullable: true;
	};
} = {
	createdById: {
		name: "created_by_id",
		type: "integer",
		nullable: true,
	},
	updatedById: {
		name: "updated_by_id",
		type: "integer",
		nullable: true,
	},
	deletedById: {
		name: "deleted_by_id",
		type: "integer",
		nullable: true,
	},
};

export const commonVisibility = identityMap<"public" | "hidden" | "disabled">({
	public: "",
	hidden: "",
	disabled: "",
});
