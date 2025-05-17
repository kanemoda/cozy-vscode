"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CozyPetViewProvider = void 0;
// src/features/pet/petController.ts
const vscode = __importStar(require("vscode"));
const petModel_1 = require("./petModel");
class CozyPetViewProvider {
    constructor(context) {
        this.context = context;
    }
    resolveWebviewView(webviewView) {
        this.view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.joinPath(this.context.extensionUri, 'media')]
        };
        const petUri = webviewView.webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'media/cat.png'));
        const scriptUri = webviewView.webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'src/ui/webviews/petScript.js'));
        const styleUri = webviewView.webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'src/ui/webviews/style.css'));
        webviewView.webview.html = getPetHtml(petUri.toString(), scriptUri.toString(), styleUri.toString());
        webviewView.webview.onDidReceiveMessage(message => {
            var _a;
            if (message.command === 'petClicked') {
                const state = (0, petModel_1.getPetState)(this.context);
                state.xp += 1;
                state.mood = 'happy';
                (0, petModel_1.updatePetState)(this.context, state);
                (_a = this.view) === null || _a === void 0 ? void 0 : _a.webview.postMessage({ command: 'setMood', value: 'happy' });
            }
        });
    }
}
exports.CozyPetViewProvider = CozyPetViewProvider;
CozyPetViewProvider.viewType = 'cozyPetView';
function getPetHtml(imageSrc, scriptSrc, cssSrc) {
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
