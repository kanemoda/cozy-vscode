// src/features/pet/petModel.ts
import * as vscode from 'vscode';

export interface PetState {
  name: string;
  mood: 'happy' | 'idle' | 'sleepy';
  xp: number;
  lastInteraction: number;
}

const defaultPetState: PetState = {
  name: 'Mochi',
  mood: 'idle',
  xp: 0,
  lastInteraction: Date.now(),
};

export function getPetState(context: vscode.ExtensionContext): PetState {
  return context.globalState.get<PetState>('petState') || defaultPetState;
}

export function updatePetState(context: vscode.ExtensionContext, state: PetState) {
  context.globalState.update('petState', state);
}
