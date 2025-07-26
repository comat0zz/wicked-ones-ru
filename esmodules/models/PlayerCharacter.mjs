import CharacterBase from "./CharacterBase.mjs";
const { NumberField, SchemaField, ArrayField, ObjectField, HTMLField } = foundry.data.fields;

export default class PlayerCharacter extends CharacterBase {

  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      gold: new NumberField({ super.requiredInteger, initial: 0, min: 0, max: 3 }),
      recklessXP: new NumberField({ super.requiredInteger, initial: 0, min: 0, max: 3 }),
    }
  };

}