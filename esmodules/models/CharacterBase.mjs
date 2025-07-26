// https://foundryvtt.wiki/en/development/api/DataModel
const { NumberField, SchemaField, ArrayField, ObjectField, HTMLField, BooleanField } = foundry.data.fields;

export default class CharacterBase extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        const requiredInteger = { required: true, nullable: false, integer: true };
        const schema = {};

        schema.description = new HTMLField({ required: true, textSearch: true });

        schema.xp = new NumberField({ ...requiredInteger, initial: 0, min: 0, max: 9 });
        schema.stress = new NumberField({ ...requiredInteger, initial: 0, min: 0, max: 8 });
        // link to _id Calling
        schema.calling = new StringField({ required: false, nullable: false, initial: "" });
        schema.darkImpulses = new ArrayField(new StringField());
        schema.abilities = new ArrayField(new ObjectField());
        schema.gears = new ArrayField(new ObjectField());
        schema.supplities = new ArrayField(new ObjectField());
        // link to _id Minion Pack
        schema.minionPack = new StringField({ required: false, nullable: false, initial: "" });

        schema.stats = new SchemaField({
            brains: new SchemaField({
                shock: new BooleanField({required: true, initial: false}),
                scan: makeStatLine(),
                tinker: makeStatLine(),
                trick: makeStatLine()
            }),
            muscles: new SchemaField({
                shock: new BooleanField({required: true, initial: false}),
                finesse: makeStatLine(),
                skulk: makeStatLine(),
                smash: makeStatLine()
            }),
            guts: new SchemaField({
                shock: new BooleanField({required: true, initial: false}),
                banter: makeStatLine(),
                threaten: makeStatLine(),
                invoke: makeStatLine()
            })
        });

        return schema;
    }

    /**
    * Produce the schema field for a simple stat.
    * @param {object} schemaOptions  Options passed to the outer schema.
    * @returns {StatLineData}
    */
    function makeStatLine(schemaOptions={}) {
        return new SchemaField({
            pos1: new NumberField({ ...requiredInteger, initial: 0, min: 0, max: 3 }),
            pos2: new NumberField({ ...requiredInteger, initial: 0, min: 0, max: 3 }),
            pos3: new NumberField({ ...requiredInteger, initial: 0, min: 0, max: 3 })
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
}