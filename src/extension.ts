import * as vscode from "vscode";

const CONSOLE_PATTERNS = [/^\s*(\/\/\s*)?(console\.(log|error|warn|info|debug)\s*\()/i];

export function isConsoleStatement(line: string): boolean {
  return CONSOLE_PATTERNS.some((pattern) => pattern.test(line));
}

export function isCommented(line: string): boolean {
  const trimmed = line.trim();
  return trimmed.startsWith("//") && isConsoleStatement(trimmed.replace(/^\/\/\s*/, ""));
}

export function toggleConsoleStatement(line: string): string {
  const trimmed = line.trim();

  if (!isConsoleStatement(trimmed)) {
    return line;
  }

  if (isCommented(trimmed)) {
    return line.replace(/^(\s*)\/\/\s*/, "$1");
  } else {
    return line.replace(/^(\s*)(console\.)/, "$1// $2");
  }
}

export function activate(context: vscode.ExtensionContext) {
  console.log("Console.log Toggle Comment extension is now active!");

  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  statusBarItem.text = "$(terminal) $(check)";
  statusBarItem.command = "consolelogToggle.toggle";
  statusBarItem.tooltip = "Toggle Console.log Statements";
  statusBarItem.show();

  const toggleCommand = vscode.commands.registerCommand("consolelogToggle.toggle", async () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      vscode.window.showWarningMessage("No active editor found");
      return;
    }

    const document = editor.document;
    const text = document.getText();
    const lines = text.split("\n");

    let modified = false;
    const edits: vscode.TextEdit[] = [];
    let commentedLines = 0;
    let uncommentedLines = 0;

    for (let i = 0; i < lines.length; i++) {
      const originalLine = lines[i];
      const newLine = toggleConsoleStatement(originalLine);

      if (newLine !== originalLine) {
        const startPos = new vscode.Position(i, 0);
        const endPos = new vscode.Position(i, originalLine.length);
        edits.push(new vscode.TextEdit(new vscode.Range(startPos, endPos), newLine));
        modified = true;

        if (isCommented(newLine)) {
          commentedLines++;
        } else {
          uncommentedLines++;
        }
      }
    }

    if (modified) {
      await editor.edit((editBuilder) => {
        edits.forEach((edit) => editBuilder.replace(edit.range, edit.newText));
      });

      const consoleCount = edits.filter((edit) => !isCommented(edit.newText)).length;
      const commentedCount = edits.length - consoleCount;

      if (commentedCount > consoleCount) {
        statusBarItem.text = "$(terminal) $(x)";
      } else {
        statusBarItem.text = "$(terminal) $(check)";
      }

      vscode.window.showInformationMessage(
        `Toggled ${edits.length} console statement(s) (${consoleCount} active, ${commentedCount} commented)`
      );
    } else {
      vscode.window.showInformationMessage("No console statements found to toggle");
    }
  });

  const mapKeyCommand = vscode.commands.registerCommand("consolelogToggle.mapKey", async () => {
    await vscode.commands.executeCommand("workbench.action.openGlobalKeybindings");
    vscode.window.showInformationMessage(
      'Add your custom keybinding for "consolelogToggle.toggle" in the Keyboard Shortcuts editor'
    );
  });

  context.subscriptions.push(toggleCommand, mapKeyCommand, statusBarItem);
}

export function deactivate() {
  console.log("Console.log Toggle Comment extension is deactivated");
}
