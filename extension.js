const vscode = require('vscode');
const { exec } = require('child_process');
const fs = require('fs');

function activate(context) {
    let disposable = vscode.commands.registerCommand('djangoDRF.scaffoldProject', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;

        if (!workspaceFolders) {
            vscode.window.showErrorMessage('Please open a workspace folder first.');
            return;
        }

        const targetFolder = workspaceFolders[0].uri.fsPath;

        // Check if folder is empty
        const files = fs.readdirSync(targetFolder);
        if (files.length > 0) {
            vscode.window.showWarningMessage('Target folder is not empty!');
            return;
        }

        vscode.window.showInformationMessage('Cloning django-template from GitHub...');

        // Clone directly from django-template repo
        const repoUrl = 'https://github.com/devsadiqul/django-template.git';
        exec(`git clone ${repoUrl} "${targetFolder}"`, (err, stdout, stderr) => {
            if (err) {
                vscode.window.showErrorMessage('Git clone failed: ' + err.message);
                console.error(stderr);
            } else {
                vscode.window.showInformationMessage('Django DRF project scaffolded successfully from django-template!');
                console.log(stdout);
            }
        });
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = { activate, deactivate };
