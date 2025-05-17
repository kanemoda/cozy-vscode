import * as vscode from 'vscode';
import { CozyPetViewProvider } from './features/pet/petController';

export function activate(context: vscode.ExtensionContext) {
  const provider = new CozyPetViewProvider(context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(CozyPetViewProvider.viewType, provider)
  );

  console.log("✨ Cozy extension activated");
}

export function deactivate() {}
