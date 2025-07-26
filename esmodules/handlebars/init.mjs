import { registerHandlebarsCommonHelpers } from "./helpers/common.mjs";
import { registerHandlebarsShareHelpers } from "./helpers/share.mjs";
import { registerHandlebarsifNHelpers } from "./helpers/ifN.mjs";
import { registerHandlebarsMathHelpers } from "./helpers/math.mjs";
import { preloadHandlebarsTemplates } from "./templates.mjs";

export const initializeHandlebars = () => {
  registerHandlebarsShareHelpers();
  registerHandlebarsCommonHelpers();
  registerHandlebarsifNHelpers();
  registerHandlebarsMathHelpers();


  preloadHandlebarsTemplates();
};