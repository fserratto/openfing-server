import { Resolvers } from "../../generated/graphql.types";
import { getFaqParent } from "../Faq/Faq.parent";

const resolver: Resolvers["Query"]["faqs"] = async (_, __, { dataLoaders }) =>
	(await dataLoaders.faq.findAll()).map(getFaqParent);

export default resolver;
