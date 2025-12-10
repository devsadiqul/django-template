const vscode = require('vscode');
const fs = require('fs-extra');
const path = require('path');

function activate(context) {
    let disposable = vscode.commands.registerCommand('djangoDRF.scaffoldProject', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('Please open a workspace folder first.');
            return;
        }

        const targetFolder = workspaceFolders[0].uri.fsPath;
        const sourceFolder = path.join(__dirname, 'template');

        try {
            await fs.copy(sourceFolder, targetFolder, { overwrite: true });
            vscode.window.showInformationMessage('Django + DRF project scaffolded successfully!');
        } catch (err) {
            vscode.window.showErrorMessage('Error scaffolding project: ' + err.message);
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
