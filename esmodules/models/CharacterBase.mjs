// https://foundryvtt.wiki/en/development/api/DataModel
import Base from "./Base.mjs";
const { 
    NumberField, SchemaField, ArrayField, ObjectField, HTMLField, BooleanField 
} = foundry.data.fields;

export default class CharacterBase extends Base {
    
    static defineSchema() {
        return this.mergeSchema(super.defineSchema(), {
            xp: new NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 9 }),
            stress: new NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 6 }),
            // link to _id Calling
            calling: new StringField({ required: false, nullable: false, initial: "" }),
            darkImpulses: new ArrayField(new StringField()),
            abilities: new ArrayField(new ObjectField()),
            gears: new ArrayField(new ObjectField()),
            supplities: new ArrayField(new ObjectField()),
            // link to _id Minion Pack
            minionPack: new StringField({ required: false, nullable: false, initial: "" }),

            skills: new SchemaField({
                wounded: new BooleanField({required: true, initial: false}),
                brains: new SchemaField({
                    shocked: new BooleanField({required: true, initial: false}),
                    scan: makeSkillLine(),
                    tinker: makeSkillLine(),
                    trick: makeSkillLine()
                }),
                muscles: new SchemaField({
                    shocked: new BooleanField({required: true, initial: false}),
                    finesse: makeSkillLine(),
                    skulk: makeSkillLine(),
                    smash: makeSkillLine()
                }),
                guts: new SchemaField({
                    shocked: new BooleanField({required: true, initial: false}),
                    banter: makeSkillLine(),
                    threaten: makeSkillLine(),
                    invoke: makeSkillLine()
                })
            })
        });
    }

    /** @override */
    prepareDerivedData() {
        super.prepareDerivedData();
        let updates = {};

        if (Object.keys(updates).length > 0) {
            this.parent.update(updates);
        }
    }
};

/**
* Produce the schema field for a simple skill.
* @param {object} schemaOptions  Options passed to the outer schema.
* @returns {StatLineData}
*/
function makeSkillLine(schemaOptions = {}) {
    return new SchemaField({
        pos1: new NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 3 }),
        pos2: new NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 3 }),
        pos3: new NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 3 })
    });
};