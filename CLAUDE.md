# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Arwes is a futuristic sci-fi UI web framework for building user interfaces with animations and sound effects. The project is a TypeScript monorepo using Lerna + Nx workspaces with 20+ packages organized into vanilla (framework-agnostic) and React wrapper packages.

**Status:** Alpha release (v1.0.0-alpha.20) - APIs may change. Branch `main` is for stable alpha releases, `next` is for active development.

## Commands

### Development

```bash
# Install dependencies and bootstrap packages
npm install

# Run tests (all packages)
npm test

# Run tests in watch mode
npm run test-watch

# Run specific package tests
npm test -- packages/animator

# List all test files
npm run test-list

# Generate test coverage
npm run test-coverage

# Lint JavaScript/TypeScript
npm run lint-js
npm run lint-js-fix

# Lint Markdown files
npm run lint-md
npm run lint-md-fix
```

### Building

```bash
# Build all packages (ESM, CJS, UMD, types)
npm run build

# Build specific package (from package directory)
cd packages/animator
npm run build           # All formats
npm run build-esm       # ESM only
npm run build-cjs       # CommonJS only
npm run build-umd       # UMD bundle only
npm run build-types     # TypeScript definitions only
npm run dev             # Watch mode (ESM only)

# Clean all build artifacts
npm run clean
```

### Apps

```bash
# Documentation site (Next.js on port 9200)
cd apps/docs
npm run dev
npm run build
npm start

# Playground (Webpack dev server on port 9000)
cd apps/play
npm run dev
npm run build
npm start
```

### Release

```bash
# Full integration check + release
npm run integration     # Runs build + lint + test-coverage
npm run release         # integration + lerna publish
```

## Architecture

### Package Organization

The codebase has three layers:

1. **Vanilla packages** (10 packages) - Framework-agnostic, pure JS/TS

   - `@arwes/tools` - General utilities, scheduler, memo
   - `@arwes/theme` - Dynamic theming system
   - `@arwes/animated` - HTML element animation utilities
   - `@arwes/animator` - Animation orchestration (FSM-based)
   - `@arwes/bleeps` - Web Audio API wrapper for sound effects
   - `@arwes/text` - Text rendering effects (typewriter, decryption)
   - `@arwes/frames` - SVG frame components
   - `@arwes/bgs` - Background effects
   - `@arwes/core` - Core UI functionalities
   - `arwes` - Bundle of all vanilla packages

2. **React packages** (8+ packages) - React wrappers using Context + hooks

   - `@arwes/react-tools` - Browser API tools for React
   - `@arwes/react-animator` - React animator components
   - `@arwes/react-animated` - Animated UI elements
   - `@arwes/react-bleeps` - Sound effects manager
   - `@arwes/react-text` - Text effect components
   - `@arwes/react-frames` - Frame components
   - `@arwes/react-bgs` - Background effects
   - `@arwes/react-core` - Core UI components
   - `@arwes/react-styles` - Styling utilities
   - `@arwes/react` - Bundle of all packages

3. **Apps** (3 applications)
   - `apps/docs` - Documentation site (Next.js)
   - `apps/play` - Interactive playground (Webpack)
   - `apps/perf` - Performance testing

### Dependency Pattern

React packages are thin wrappers around vanilla packages:

```
@arwes/react-animator → @arwes/animator + @arwes/react-tools + react
@arwes/react-bleeps → @arwes/bleeps + @arwes/react-tools + react
```

Vanilla packages have minimal dependencies and can be used independently or together.

### Animation System (Animator)

The core animation system uses a **finite state machine** with 4 states:

- `exited` → `entering` → `entered` → `exiting` → `exited`

Key concepts:

- **AnimatorNode**: Tree structure with parent-child relationships
- **Manager strategies**: 6 types for orchestrating child animations
  - `parallel`: All children animate together
  - `stagger`: Children animate with delay between each
  - `sequence`: Children animate one after another
  - `switch`: Only one child animates at a time
  - `queue`: Custom sequencing
  - `custom`: User-defined orchestration
- **TOScheduler**: Custom timing scheduler for precise control
- **Dynamic settings**: Duration, easing can be set at runtime

Located in: `packages/animator/src/`

### Sound System (Bleeps)

Web Audio API wrapper for interactive sound effects:

- 4 categories: background, transition, interaction, notification
- Lazy loading of audio files
- Master + individual gain nodes for volume control
- Safari compatibility (filters unsupported formats)
- Play counting for looped sounds

Located in: `packages/bleeps/src/`

### Build System

Each package builds to multiple formats:

```
package/
  build/
    esm/       # ES Modules (for modern bundlers)
    cjs/       # CommonJS (for Node.js)
    umd/       # UMD bundle (for browsers via <script>)
    *.d.ts     # TypeScript definitions
```

Build tools:

- **ESM**: ttsc with custom transformer for `.js` extensions
- **CJS**: tsc with CommonJS output
- **UMD**: Webpack with externals for peer dependencies
- **Types**: npm-dts for declaration files

Build scripts in: `scripts/pkg-build-*.sh`

## Key Files & Patterns

### TypeScript Configuration

- `tsconfig.base.json` - Base config with strict mode, ES2018 target
- `@repository/*` path alias for cross-package imports
- Each package has own tsconfig extending base

### Testing

- Jest with ts-jest preset
- jsdom environment for DOM testing
- Tests located in `packages/*/src/**/*.test.ts(x)`
- jest-canvas-mock for canvas testing

### Code Style

- ESLint with standard-with-typescript
- Semicolons required (stroustrup brace style)
- React hooks plugin enabled
- Type checking via tsconfig.json

### Design Patterns

1. **Factory functions** with Object.defineProperties for immutability
2. **State machines** for animation orchestration
3. **Strategy pattern** for manager strategies
4. **Context + Hooks** for React integration
5. **Peer dependencies** for clean package boundaries

## Common Tasks

### Adding a new vanilla package

1. Create `packages/new-package/` directory
2. Copy package.json structure from existing package
3. Add to workspace (automatically detected)
4. Create `src/index.ts` as entry point
5. Add tests in `src/**/*.test.ts`
6. Run `npm run build` to verify

### Adding a React wrapper

1. Create `packages/react-new-package/`
2. Add vanilla package as peer dependency
3. Create Context provider component
4. Create hooks for accessing context
5. Export from `src/index.ts`

### Modifying animation behavior

- Core FSM: `packages/animator/src/internal/createAnimatorMachine/`
- Manager strategies: `packages/animator/src/internal/createAnimatorManager/strategies/`
- Settings validation: `packages/animator/src/internal/createAnimatorSystem/`

### Modifying sound behavior

- Bleep creation: `packages/bleeps/src/createBleep/`
- Bleeps manager: `packages/bleeps/src/createBleeps/`
- React provider: `packages/react-bleeps/src/BleepsProvider/`

## Important Notes

- **No production use**: Project is in alpha, APIs will change
- **Peer dependencies**: React packages require vanilla packages as peers
- **Build order matters**: Nx handles dependency-aware builds with parallel execution
- **Test isolation**: Each package has isolated tests
- **Commit conventions**: Conventional commits (commitlint configured)
- **Branch strategy**: `main` for alpha releases, `next` for development
- **Release from**: `dev` branch only (configured in lerna.json)

## Documentation

For detailed architecture documentation:

- `ARCHITECTURE.md` - Complete architectural overview
- `ARCHITECTURE_QUICK_REFERENCE.md` - Quick guides with examples
- `PACKAGES_REFERENCE.md` - Detailed package breakdown
- `ARCHITECTURE_INDEX.md` - Navigation guide

Main README: `README.md`
FAQ: `FAQ.md`
Code of Conduct: `.github/CODE_OF_CONDUCT.md`
