# AGENTS.md

Development guide for AI agents working on the Console.log Toggle Comment extension.

## Project Overview

This is a VS Code extension that provides a one-click solution to toggle all console.log statements in the active editor between commented and uncommented states.

### Key Technologies

- **VS Code Extension API**: Primary API for extending VS Code functionality
- **TypeScript**: Primary language for type-safe development
- **Node.js**: Runtime environment for the extension host

## Architecture

### Extension Structure

```
consolelog-toggle-comment/
├── src/
│   ├── extension.ts          # Main entry point and core logic
│   └── test/
│       ├── extension.test.ts # Unit tests
│       └── runTest.ts         # Test runner
├── .vscode/
│   ├── launch.json            # Debug configuration
│   └── tasks.json             # Build tasks
├── package.json              # Extension manifest
├── tsconfig.json             # TypeScript configuration
├── README.md                 # User documentation
├── AGENTS.md                 # This file
├── CHANGELOG.md              # Version history
├── LICENSE                   # MIT License
└── .vscodeignore             # Package exclusion rules
```

### Core Components

#### 1. Main Entry Point (`src/extension.ts`)

The main file contains:

- **Activation Function**: Called when the extension is activated
  - Creates status bar item
  - Registers commands

- **Toggle Logic**: 
  - `isConsoleStatement()`: Detects console statements
  - `isCommented()`: Checks if line is commented
  - `toggleConsoleStatement()`: Toggles comment status

- **Status Bar Item**: 
  - Located at bottom-left
  - Uses VS Code codicon `$(terminal)`
  - Tooltip: "Toggle Console.log Statements"

- **Commands**:
  - `consolelogToggle.toggle`: Main toggle functionality
  - `consolelogToggle.mapKey`: Opens keybindings.json for custom shortcuts

#### 2. Extension Manifest (`package.json`)

Key sections:

- `contributes.commands`: Command declarations
- `contributes.keybindings`: Keyboard shortcut definitions
- `activationEvents`: When the extension activates
- `engines.vscode`: Minimum VS Code version requirement

## Development Guidelines

### Adding New Features

1. **Update version** in `package.json` following semantic versioning:
   - Major (x.0.0): Breaking changes
   - Minor (0.x.0): New features
   - Patch (0.0.x): Bug fixes

2. **Update CHANGELOG.md** with the new version entry

3. **Implement the feature** in `src/extension.ts`

4. **Add tests** in `src/test/extension.test.ts`

5. **Update README.md** if user-facing

### Console Statement Detection

The extension detects console statements using regex patterns:

```typescript
const CONSOLE_PATTERNS = [
  /^\s*(\/\/\s*)?(console\.(log|error|warn|info|debug)\s*\()/i,
];
```

**Supported methods:**
- `console.log()`
- `console.error()`
- `console.warn()`
- `console.info()`
- `console.debug()`

**To add support for new methods:**
1. Update `CONSOLE_PATTERNS` array in `src/extension.ts`
2. Update the Supported Console Methods section in `README.md`
3. Add test cases

### Status Bar Customization

To customize the status bar item:

```typescript
statusBarItem.text = '$(codicon-name) Text';
statusBarItem.command = 'command.id';
statusBarItem.tooltip = 'Tooltip text';
statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.prominentBackground');
```

### Keybinding Configuration

Default keybinding is `Ctrl+Alt+L` (Windows/Linux) or `Cmd+Alt+L` (Mac).

To change:
1. Edit `package.json` under `contributes.keybindings`
2. Update README.md with new keybinding

## Testing Guidelines

### Running Tests

```bash
npm run test
```

### Writing Tests

Tests should cover:

1. **Toggle functionality**:
   - Toggle commented → uncommented
   - Toggle uncommented → commented
   - Preserve indentation
   - Handle empty files
   - Handle files without console statements

2. **Edge cases**:
   - Mixed console methods
   - Console statements in strings/comments
   - Indented console statements
   - Console statements with complex arguments

### Example Test Case

```typescript
suite('Console Toggle Tests', () => {
  test('Should toggle console.log from active to commented', () => {
    const input = 'console.log("test");';
    const expected = '// console.log("test");';
    const result = toggleConsoleStatement(input);
    assert.strictEqual(result, expected);
  });
});
```

## Code Style Guidelines

### TypeScript

- Use strict mode enabled
- Use ES2020 target
- CommonJS modules
- Proper type annotations

### VS Code API Usage

- Always use `vscode.` namespace for API calls
- Register disposables in `context.subscriptions`
- Handle errors gracefully with try-catch
- Show user-friendly messages via `vscode.window.showInformationMessage()`

## Build and Release

### Build Commands

```bash
# Compile TypeScript
npm run compile

# Watch for changes
npm run watch

# Lint
npm run lint

# Test
npm run test
```

### Packaging

```bash
# Install vsce globally
npm install -g @vscode/vsce

# Package extension
vsce package
```

### Release Checklist

1. [ ] Update version in `package.json`
2. [ ] Update `CHANGELOG.md`
3. [ ] Update `README.md` if needed
4. [ ] Run all tests: `npm run test`
5. [ ] Run linting: `npm run lint`
6. [ ] Build: `npm run compile`
7. [ ] Package: `vsce package`
8. [ ] Test the `.vsix` file in a clean VS Code instance

## Troubleshooting

### Extension Not Activating

- Check `activationEvents` in `package.json`
- Ensure `engines.vscode` matches installed VS Code version
- Check Output panel for error messages

### Toggle Not Working

- Verify active editor exists
- Check console statement patterns match
- Ensure file is saved (text edit operations require saved state)

### Status Bar Not Showing

- Check if another extension hides status bar items
- Verify `statusBarItem.show()` is called in `activate()`

## Contributing for Agents

When working on this extension as an AI agent:

1. **Always read AGENTS.md first** to understand architecture
2. **Follow semantic versioning** for all version changes
3. **Keep documentation in sync** with code changes
4. **Test thoroughly** before proposing changes
5. **Use TypeScript strict mode** for type safety
6. **Follow VS Code extension best practices**

## Resources

- [VS Code Extension API Documentation](https://code.visualstudio.com/api)
- [Extension Manifest Reference](https://code.visualstudio.com/api/references/extension-manifest)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [VS Code Codicons](https://code.visualstudio.com/api/references/icons-in-labels)

## Contact

For questions or issues related to agent development, please refer to the main project repository.
