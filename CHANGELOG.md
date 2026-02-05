# Changelog

All notable changes to the Console.log Toggle Comment extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.6] - 2026-02-05

### Fixed

- Corrected demo GIF link to point to the correct repository name: `Console.logToggleComment`
- Fixed all repository links and metadata to match the actual GitHub project name

## [1.0.5] - 2026-02-05

### Changed

- Reverted demo GIF to relative path for standard `vsce` packaging
- Optimized `package.json` repository URL for better automatic URL resolution by the Marketplace

## [1.0.4] - 2026-02-05

### Fixed

- Switched to `raw.githubusercontent.com` absolute URL for demo GIF to ensure visibility on VS Code Marketplace
- Added `homepage` and `bugs` fields to `package.json` for better Marketplace integration
- Corrected extension version in README info table

## [1.0.3] - 2026-02-04

### Fixed

- Updated GIF reference to use absolute GitHub URL for proper display on VS Code Marketplace
- Changed from relative path to GitHub raw URL to ensure compatibility with both GitHub and Marketplace

## [1.0.2] - 2026-02-04

### Fixed

- Corrected incorrect "Color Flow" branding references in README.md
- Updated demo description to accurately reflect Console.log Toggle Comment functionality

## [1.0.1] - 2026-02-04

### Changed

- Improved README.md formatting for Extension Info section with table layout
- Updated version badge to 1.0.1
- Added extension icon for better visual identity in marketplace

### Fixed

- Minor formatting improvements in documentation

## [1.0.0] - 2026-02-04

### Added

- Initial release of Console.log Toggle Comment extension
- One-click toggle functionality for all console statements
- Status bar button located in bottom-left corner
- Default keyboard shortcut: Ctrl+Alt+L (Windows/Linux) / Cmd+Alt+L (Mac)
- Command palette entry for custom keybinding mapping
- Support for `console.log()`, `console.error()`, `console.warn()`, `console.info()`, and `console.debug()`
- Visual feedback showing count of toggled statements
- Smart detection to preserve non-console code
- Comprehensive documentation including README.md, AGENTS.md, and CHANGELOG.md
- MIT License for DotJumpDot

## [Unreleased]

### Planned Features

- Support for custom console method detection patterns
- Toggle selection only (instead of entire file)
- Auto-toggle on save option
- Console statement count badge in status bar
- Dark/Light theme status bar icon variants

### Potential Improvements

- Performance optimization for large files
- Multi-file toggle support
- Undo/redo support for toggle operations
- Quick pick menu for selective toggling

---

## Version Format

This project follows Semantic Versioning (SemVer):

- **MAJOR (x.0.0)**: Incompatible API changes
- **MINOR (0.x.0)**: New functionality in a backwards compatible manner
- **PATCH (0.0.x)**: Backwards compatible bug fixes

## Categories

- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security vulnerability fixes
