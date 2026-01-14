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
    
        const zoweExplorerApi = ZoweVsCodeExtension.getZoweExplorerApi()?.getExplorerExtenderApi();
        const schema = [ProfileConstants.SAMPLE_PROFILE_SCHEMA];

        await zoweExplorerApi?.initForZowe("sample", schema);
        await zoweExplorerApi?.reloadProfiles("sample");

        const zeApiRegister = ZoweVsCodeExtension.getZoweExplorerApi("3.3.1");
        const updateCredentialsOptions = {
            sessionName: "sample",
            rePrompt: true,
            passwordInputBoxOptions: { value: "" }
        };
        const updatedProfile = await ZoweVsCodeExtension.updateCredentials(updateCredentialsOptions, zeApiRegister);

        console.log(JSON.stringify(updatedProfile, null, 2));
    });
    context.subscriptions.push(disposable);
}
