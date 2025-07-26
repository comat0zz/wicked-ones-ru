import CharacterBase from "./CharacterBase.mjs";
const { NumberField, SchemaField, ArrayField, ObjectField, HTMLField } = foundry.data.fields;

export default class WickedOne extends CharacterBase {

  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      gold: new NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 3 }),
      recklessXP: new NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 3 }),
    }
  };

}