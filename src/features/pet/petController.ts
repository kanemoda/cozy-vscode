// src/features/pet/petController.ts
import * as vscode from 'vscode';
import { getPetState, updatePetState } from './petModel';

export class CozyPetViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'cozyPetView';
  private view?: vscode.WebviewView;

  constructor(private readonly context: vscode.ExtensionContext) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView
  ): void | Thenable<void> {
    this.view = webviewView;
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this.context.extensionUri, 'media')]
    };

    const petUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media/cat.png')
    );
    const scriptUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'src/ui/webviews/petScript.js')
    );
    const styleUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'src/ui/webviews/style.css')
    );

    webviewView.webview.html = getPetHtml(petUri.toString(), scriptUri.toString(), styleUri.toString());

    webviewView.webview.onDidReceiveMessage(message => {
      if (message.command === 'petClicked') {
        const state = getPetState(this.context);
        state.xp += 1;
        state.mood = 'happy';
        updatePetState(this.context, state);
        this.view?.webview.postMessage({ command: 'setMood', value: 'happy' });
      }
    });
  }
}

function getPetHtml(imageSrc: string, scriptSrc: string, cssSrc: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" href="${cssSrc}">
    </head>
    <body>
      <img id="pet" src="${imageSrc}" alt="cat" />
      <script src="${scriptSrc}"></script>
    </body>
    </html>
  `;
}
