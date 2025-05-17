// src/features/pet/petController.ts
import * as vscode from 'vscode';
import { getPetState, updatePetState, PetState } from './petModel';

export function activatePet(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    'cozyPet',
    'Cozy Pet',
    vscode.ViewColumn.Two,
    {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'media')]
    }
  );

  const petState = getPetState(context);
  const petScriptUri = panel.webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, 'src/ui/webviews/petScript.js')
  );
  const styleUri = panel.webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, 'src/ui/webviews/style.css')
  );
  const petUri = panel.webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, 'media/cat.png') // placeholder
  );

  panel.webview.html = getPetHtml(petUri.toString(), petScriptUri.toString(), styleUri.toString());

  panel.webview.onDidReceiveMessage(
    message => {
      if (message.command === 'petClicked') {
        petState.mood = 'happy';
        petState.xp += 1;
        updatePetState(context, petState);
        panel.webview.postMessage({ command: 'setMood', value: petState.mood });
      }
    },
    undefined,
    context.subscriptions
  );
}

function getPetHtml(imageSrc: string, scriptSrc: string, cssSrc: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <link href="${cssSrc}" rel="stylesheet" />
    </head>
    <body>
      <canvas id="petCanvas"></canvas>
      <img id="pet" src="${imageSrc}" alt="cat" />
      <script src="${scriptSrc}"></script>
    </body>
    </html>
  `;
}
