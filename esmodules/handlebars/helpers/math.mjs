import { SYSTEM } from "../configs/system.mjs";

// математические операции
export const registerHandlebarsMathHelpers = async function () {

  Handlebars.registerHelper('abs', function (num) {
    return Math.abs(num);
  });

};