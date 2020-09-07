import { appConfig } from "../../appConfig";
import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["Course"]["iconUrl"] = (parent) => parent.iconUrl || appConfig.DEFAULT_COURSE_ICON_URL;

export default resolver;
