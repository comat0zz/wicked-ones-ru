import { SYSTEM } from "./configs/system.mjs";
globalThis.SYSTEM = SYSTEM; // Expose the SYSTEM object to the global scope

import { registerSystemSettings } from "./configs/settings.mjs";
import { initializeHandlebars } from "./handlebars/init.mjs";

// Import modules
import * as CztUtility from "./utilities/_module.mjs";
import * as applications from "./applications/_module.mjs";
import * as documents from "./documents/_module.mjs";
import * as models from "./models/_module.mjs";

import { handleSocketEvent } from "./socket.mjs";

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */
Hooks.once("init", async function() {
  globalThis[SYSTEM.id] = game[SYSTEM.id] = Object.assign(game.system, globalThis.SYSTEM);

  registerSystemSettings();
  
  game.logger = new CztUtility.Log(game.settings.get(SYSTEM.id,'isSystemDebug'));
  
  // Expose the system API
  game.system.api = {
    applications,
    models,
    documents,
  }

  CONFIG.Actor.documentClass = documents.CztActor;
  CONFIG.Actor.dataModels = {
    hero: models.CztActor
  };

  CONFIG.Item.documentClass = documents.CztItem;
  CONFIG.Item.dataModels = {
    equipment: models.CztItem,
    skill: models.CztSkill
  }

  foundry.documents.collections.Actors.unregisterSheet("core", foundry.appv1.sheets.ActorSheet);
  foundry.documents.collections.Actors.registerSheet(SYSTEM.id, applications.CztActorSheet, { 
    types: ["hero"], 
    makeDefault: true,
    label: "TYPES.Actor.hero"
  });

  foundry.documents.collections.Items.unregisterSheet("core", foundry.appv1.sheets.ItemSheet)
  foundry.documents.collections.Items.registerSheet(SYSTEM.id, applications.CztItemSheet, { 
    types: ["equipment"], 
    makeDefault: true,
    label: "TYPES.Item.equipment"
  })

  // Activate socket handler
  game.socket.on(`system.${SYSTEM.id}`, handleSocketEvent)

  
  initializeHandlebars();

  game.logger.info(`${SYSTEM.id} | System Initialized`);
});

