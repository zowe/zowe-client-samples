// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "local-storage-sample" is now active!');
    
    const zeApi = vscode.extensions.getExtension("Zowe.vscode-extension-for-zowe")?.exports;
    const localStorage = zeApi.getExplorerExtenderApi().getLocalStorage();

    // access readable and writable keys within local storage:
    vscode.window.showInformationMessage(localStorage.getWritableKeys().join(","));
    vscode.window.showInformationMessage(localStorage.getReadableKeys().join(","));

    vscode.window.showInformationMessage(JSON.stringify(localStorage.getValue("zowe.ds.history")));
    try {
        // trying to access a key with insufficient perms will throw an error
        localStorage.getValue("zowe.v1MigrationStatus");
    } catch (err) {
        if (err instanceof Error) {
            vscode.window.showErrorMessage(err.message);
        }
    }
}
