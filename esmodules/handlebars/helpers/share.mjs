import { SYSTEM } from "../configs/system.mjs";

// Хелперы общего назначения
export const registerHandlebarsShareHelpers = async function () {
  
  Handlebars.registerHelper("striptags", function( txt ){
    // exit now if text is undefined 
    if(typeof txt == "undefined") return;
    // the regular expresion
    var regexp = /<[\/\w]+>/g
    // replacing the text
    return txt.replace(regexp, '');
    
  });
  
  // localize "SYSTEM.WORD.STR." VAL 
  Handlebars.registerHelper('lzCc', function (str, val) {
    return game.i18n.localize(str + val);
  });

  // Отвязываем картинки от путей
  Handlebars.registerHelper('get_assets', function (asset) {
    return `${SYSTEM.assets_path}/${asset}`;
  });

  Handlebars.registerHelper('isGM', function (options) {
    if (game.user.isGM) return options.fn(this);
    return options.inverse(this);
  });

  Handlebars.registerHelper('getCharacterActorId', function () {
    return game.user.character.id;
  });

  
  Handlebars.registerHelper('isArray', function (value, options) {
    if(Array.isArray(value)){
      return options.fn(this);
    }
    return options.inverse(this);
  });

  Handlebars.registerHelper('stringify', function (value) {
    return JSON.stringify(value);
  });

  Handlebars.registerHelper('frCfg', function (obj, val) {
    console.log(this.config, obj)

    //if(! Object.keys(obj).includes(val)) return undefined;
    console.log(obj[val])
    return game.i18n.localize( obj[val] );
  });

  Handlebars.registerHelper('isdefined', function (value) {
    return value === 0 ? true : typeof (value) !== undefined && value !== null;
  });
  
  
};