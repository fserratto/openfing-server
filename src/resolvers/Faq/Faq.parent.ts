import { SafeOmit } from "../../_utils/utilTypes";
import { FaqRow } from "../../entities/Faq/Faq.entity.types";
import { Faq } from "../../generated/graphql.types";

export type FaqParent = Required<
	SafeOmit<FaqRow, "id" | "title" | "content" | "createdAt" | "updatedAt" | "deletedAt">
> &
	Pick<Required<Faq>, "__typename" | "id" | "title" | "content" | "createdAt" | "updatedAt" | "deletedAt">;

export const getFaqParent = (faqRow: FaqRow): FaqParent => ({
	__typename: "Faq",
	...faqRow,
	id: faqRow.id.toString(),
	title: faqRow.title || "", // TODO: fix
	content: faqRow.content || "", // TODO: fix
	createdAt: faqRow.createdAt?.toISOString() || null,
	updatedAt: faqRow.updatedAt?.toISOString() || null,
	deletedAt: faqRow.deletedAt?.toISOString() || null,
});
