import { SYSTEM } from "../configs/system.mjs";

// Хелперы c условными операциями
export const registerHandlebarsifNHelpers = async function () {

  // if equal v1 === v2
  Handlebars.registerHelper('ife', function (v1, v2, options) {
    if (v1 === v2) return options.fn(this);
    else return options.inverse(this);
  });

  // if v1 > v2
  Handlebars.registerHelper('ifgt', function (v1, v2, options) {
    if (v1 > v2) return options.fn(this);
    else return options.inverse(this);
  });

  // if v1 < v2
  Handlebars.registerHelper('iflt', function (v1, v2, options) {
    if (v1 < v2) return options.fn(this);
    else return options.inverse(this);
  });

  // if v1 <= v2
  Handlebars.registerHelper('iflteq', function (v1, v2, options) {
    if (v1 <= v2) return options.fn(this);
    else return options.inverse(this);
  });

  Handlebars.registerHelper('ifor', function (v1, v2) {
    return (v1 || v2); 
  });

  // value in array
  Handlebars.registerHelper('ifIn', function(elem, list, options) {
    if(list.indexOf(elem) > -1) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  // if empty 
  Handlebars.registerHelper('ifempty', function(value) {
    return (value === "");
  });

  // Ifis not equal
  Handlebars.registerHelper('ifne', function (v1, v2, options) {
    if (v1 !== v2) return options.fn(this);
    else return options.inverse(this);
  });

  // if not
  Handlebars.registerHelper('ifn', function (v1, options) {
    if (!v1) return options.fn(this);
    else return options.inverse(this);
  });

  // if all true
  Handlebars.registerHelper('ifat', function (...args) {
    // remove handlebar options
    let options = args.pop();
    return args.indexOf(false) === -1 ? options.fn(this) : options.inverse(this);
  });

};