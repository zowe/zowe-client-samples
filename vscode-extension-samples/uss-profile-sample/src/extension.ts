// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { ZoweVsCodeExtension, type IZoweTreeNode } from "@zowe/zowe-explorer-api";
// import { SshUssApi } from "./SshUssApi";
import { ProfileConstants } from "@zf-test/sample-plugin-for-zowe-cli";


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "menu-item-sample" is now active!');
    const disposable = vscode.commands.registerCommand("menu-item-sample.showNodeContext", async () => {
        vscode.window.showInformationMessage("Hello World");
    
        const zoweExplorerApi = ZoweVsCodeExtension.getZoweExplorerApi();
        if (zoweExplorerApi != null) {
            // zoweExplorerApi.registerUssApi(new SshUssApi());
            await zoweExplorerApi.getExplorerExtenderApi().initForZowe("sample", [ProfileConstants.SAMPLE_PROFILE_SCHEMA]);
            await zoweExplorerApi.getExplorerExtenderApi().reloadProfiles("sample");
        } else {
            vscode.window.showErrorMessage("Could not access Zowe Explorer API. Please check that the latest version of Zowe Explorer is installed.");
        }

        const updatedProfile = await ZoweVsCodeExtension.updateCredentials(
            {
                sessionName: "sample",
                rePrompt: true,
                passwordInputBoxOptions: { value: "" }
            },
            ZoweVsCodeExtension.getZoweExplorerApi("3.3.1")
        );

        console.log(JSON.stringify(updatedProfile, null, 2));
    });
    context.subscriptions.push(disposable);
}
