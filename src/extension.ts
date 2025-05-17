import * as vscode from 'vscode';
import { activatePet } from './features/pet/petController';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('cozy.showPet', () => activatePet(context))
  );
}
