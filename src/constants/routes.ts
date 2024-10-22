import langroutes from "../../configs/routesLocaleDefinition.json";

// add new routes in "./configs/routesLocaleDefinition.json"
export const ROUTES = langroutes;

// use this array to define routes that require authentication

export type IRouteMetaData = {
  title: string;
  description: string;
  showTitle?: boolean;
  bredcrumb?: string[];
};
