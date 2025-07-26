/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {CztItemSheet}
 */

import { SYSTEM } from "../configs/system.mjs";
import * as CztUtility from "../utilities/_module.mjs";
const { api, sheets } = foundry.applications;

export default class CztItemSheet extends api.HandlebarsApplicationMixin(sheets.ItemSheetV2) {
    /**
     * Different sheet modes.r
     * @enum {number}
     */
    static SHEET_MODES = { 
        EDIT: 0, 
        PLAY: 1 
    }
    
    constructor(options = {}) {
        super(options)
    }

    /** @override */
    static DEFAULT_OPTIONS = {
        tag: "form",
        position: {
            width: 580,
            height: "auto",
        },
        classes: [ SYSTEM.id, "sheet", "item" ],
        form: {
            submitOnChange: true,
            closeOnSubmit: false
        },
        window: {
          resizable: true,
        }
    }

    /**
     * The current sheet mode.
     * @type {number}
     */
    _sheetMode = this.constructor.SHEET_MODES.PLAY
    
    /**
     * Is the sheet currently in 'Play' mode?
     * @type {boolean}
     */
    get isPlayMode() {
        return this._sheetMode === this.constructor.SHEET_MODES.PLAY
    }

    /**
     * Is the sheet currently in 'Edit' mode?
     * @type {boolean}
     */
    get isEditMode() {
        return this._sheetMode === this.constructor.SHEET_MODES.EDIT
    }

    /** @override */
    static PARTS = {
        sheet: {
            template: `${SYSTEM.template_path}/sheets/items/equipment-sheet.hbs`
        }
    }

    /* -------------------------------------------- */

    /** @override */
    async _prepareContext() {
        var context = {
            fields: this.document.schema.fields,
            systemFields: this.document.system.schema.fields,
            item: this.document,
            system: this.document.system,
            source: this.document.toObject(),
            isEditMode: this.isEditMode,
            isPlayMode: this.isPlayMode,
            isEditable: this.isEditable
        }

        game.logger.log(context)
        return context
    }

    /** @override */
    _onRender(context, options) {
        super._onRender((context, options))

    }

}