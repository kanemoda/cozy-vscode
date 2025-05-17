"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPetState = getPetState;
exports.updatePetState = updatePetState;
const defaultPetState = {
    name: 'Mochi',
    mood: 'idle',
    xp: 0,
    lastInteraction: Date.now(),
};
function getPetState(context) {
    return context.globalState.get('petState') || defaultPetState;
}
function updatePetState(context, state) {
    context.globalState.update('petState', state);
}
