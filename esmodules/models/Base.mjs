// https://foundryvtt.wiki/en/development/api/DataModel
const { HTMLField } = foundry.data.fields;

export default class Base extends foundry.abstract.TypeDataModel {

  static defineSchema() {
    const schema = {};
    schema.description = new HTMLField({ required: true, textSearch: true });
    return schema;
  };

};