// https://foundryvtt.wiki/en/development/guides/handling-data
import { SYSTEM } from "./system.mjs";

export const registerSystemSettings = function() {

  game.settings.register(SYSTEM.id, 'isSystemDebug', {
    name: game.i18n.localize("DEBUG.Label"),
    hint: game.i18n.localize("DEBUG.Info"),
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
    requiresReload: true
  });

};