# Arwes Codebase Architecture Summary

## Overview
Arwes is a futuristic sci-fi UI web framework organized as a monorepo using Lerna. The architecture separates vanilla JavaScript/TypeScript packages from their React-specific counterparts, allowing framework-agnostic usage while providing convenient React integration layers.

## Core Package Categories

### 1. Vanilla (Framework-Agnostic) Packages
These packages have NO React dependency and are the foundation of the framework:

- **@arwes/tools** - Utility library with no framework dependencies
  - `TOScheduler`: Timeout-based scheduler with named task support
  - `cx`: Class composition utility
  - `loadImage`: Image loading utility
  - `randomizeList`: Array randomization
  - Browser/environment detection utilities

- **@arwes/animator** - Core animation state machine system
  - Manages animation orchestration and timing
  - Peer depends on `@arwes/tools` only
  - Key types: `AnimatorNode`, `AnimatorSystem`, `AnimatorControl`
  - Uses Finite State Machine pattern with states: exited, entering, entered, exiting

- **@arwes/animated** - Low-level animation primitives
  - `createAnimation()`: requestAnimationFrame-based animation using easing functions
  - 27+ easing functions (linear, quad, cubic, sine, elastic, bounce, etc.)
  - No external dependencies, just core JavaScript

- **@arwes/bleeps** - Sound effects management system
  - `createBleep()`: Web Audio API wrapper for individual sound
  - `createBleepsManager()`: Manages collection of bleeps with categorization
  - Categories: background, transition, interaction, notification
  - Peer depends on `@arwes/tools` only
  - Browser detection for non-browser environments

- **@arwes/text** - Text rendering utilities
- **@arwes/frames** - Frame/border components
- **@arwes/bgs** - Background components
- **@arwes/theme** - Theme/styling utilities
  - Peer depends on `@arwes/tools`

### 2. React Wrapper Packages
These provide React-specific integration for vanilla packages:

- **@arwes/react-animator** - React bindings for animator system
  - `Animator` component: Main React component wrapping `createAnimatorSystem()`
  - `useAnimator()` hook: Access parent animator context
  - `useAnimatorGeneral()` hook: Access general animator settings
  - `AnimatorContext`: React Context for animator node
  - `AnimatorGeneralContext`: React Context for general settings
  - Peer depends on: @arwes/animator, @arwes/tools, @arwes/react-tools, react

- **@arwes/react-bleeps** - React bindings for bleeps system
  - `BleepsProvider` component: Context provider for bleeps manager
  - `useBleeps()` hook: Access bleeps manager from context
  - Uses `createBleepsManager()` from @arwes/bleeps
  - Peer depends on: @arwes/bleeps, @arwes/react-tools, react

- **@arwes/react-animated** - React bindings for animation primitives
  - Uses motion library (peer dep) and @arwes/animator
  - Peer depends on: @arwes/animator, @arwes/react-animator, @arwes/tools, motion 10, react

- **@arwes/react-tools** - React-specific utilities
  - Hooks and utilities for React integration
  - Peer depends on: react

- **@arwes/react-text** - React text components
- **@arwes/react-frames** - React frame components  
- **@arwes/react-bgs** - React background components
- **@arwes/react-core** - Core React components
- **@arwes/react-styles** - React styling utilities

### 3. High-Level Packages

- **@arwes/core** - Aggregates frames and theme
  - Peer depends on: @arwes/frames, @arwes/theme

- **@arwes/react** - Main React entry point
  - Peer depends on: react only

- **arwes (standalone)** - Monorepo root package
  - Development and publishing utility

## Architecture Patterns

### 1. Vanilla Package Design Pattern
Each vanilla package uses a "factory function" pattern:
```typescript
const createXXX = (props: XXXProps): XXX => {
  // Private state
  let privateState = {...};
  
  // Create object with Object.defineProperties for readonly/computed
  const obj = {} as XXX;
  const props: { [P in keyof XXX]: PropertyDescriptor } = {
    // Define readonly, writable, getters, and methods
  };
  Object.defineProperties(obj, props);
  
  return obj;
};
```

This pattern ensures:
- Immutability for public API (readonly properties)
- Encapsulation of private state
- Lazy evaluation via getters
- Type-safe implementation

### 2. State Machine Pattern (Animator)
The animator system uses a formal state machine:
- **States**: exited, entering, entered, exiting
- **Transitions**: Triggered by actions (enter, exit, update, setup, refresh)
- **State handlers**: Define behavior on entry and valid transitions
- **Manager strategies**: Different orchestration patterns for children
  - `parallel`: All children animate simultaneously
  - `stagger` / `staggerReverse`: Staggered timing with configurable delay
  - `sequence` / `sequenceReverse`: Sequential animation
  - `switch`: One-at-a-time switching

### 3. Manager Pattern (Animator Managers)
Animator has pluggable manager strategies:
- Each manager implements: `getDurationEnter()`, `enterChildren()`
- Managers can be dynamic: `animator.manager = newManager`
- Different managers control timing coordination between parent/children

### 4. Build System Architecture

**Multi-format output per package:**
- **ESM**: ES Modules (build/esm/) with `{ "type": "module" }` package.json
- **CJS**: CommonJS (build/cjs/) with `{ "type": "commonjs" }` package.json  
- **UMD**: Universal Module Definition (build/umd/) for browsers
  - Two versions: umd.js (development) and umd.min.js (production)

**Build tools:**
- **ttsc** (TypeScript transformer compiler): Handles ESM build with TypeScript transformers
- **tsc**: Standard TypeScript compiler for CJS
- **webpack**: UMD bundling with configurable output names

**Build scripts (in /scripts/):**
- `pkg-build-esm.sh`: Compiles to ESM format
- `pkg-build-cjs.sh`: Compiles to CommonJS format
- `pkg-build-umd.sh`: Bundles for UMD (development + minified production)
- `pkg-build-types.sh`: Generates TypeScript declarations
- `pkg-build-umd.webpack.config.js`: Webpack configuration for UMD builds

**Build configuration:**
- Each package extends root tsconfig files
- `tsconfig.build.esm.json`: ESM-specific configuration
- `tsconfig.build.cjs.json`: CJS-specific configuration
- `tsconfig.build.json`: Base configuration for package builds

**Export resolution (package.json):**
```json
{
  "exports": {
    ".": {
      "import": "./build/esm/index.js",
      "require": "./build/cjs/index.js"
    },
    "./build/": { "default": "./build/" }
  },
  "types": "./build/esm/index.d.ts",
  "module": "./build/esm/index.js",
  "main": "./build/cjs/index.js",
  "unpkg": "./build/umd/umd.min.js"
}
```

## Dependency Graph

### Base Layer (No Arwes dependencies)
- @arwes/tools (only tslib)
- @arwes/animated (only tslib)

### Core Packages (Depend on tools)
- @arwes/animator → @arwes/tools
- @arwes/bleeps → @arwes/tools
- @arwes/theme → @arwes/tools

### React Integration (Depend on vanilla packages + react)
- @arwes/react-animator → @arwes/animator, @arwes/tools, @arwes/react-tools, react
- @arwes/react-bleeps → @arwes/bleeps, @arwes/react-tools, react
- @arwes/react-animated → @arwes/animator, @arwes/react-animator, @arwes/tools, motion, react

### Composition
- @arwes/core → @arwes/frames, @arwes/theme
- @arwes/react → react only
- arwes (standalone) → all packages

## Key Technical Details

### Animator System

**Node Registration:**
```typescript
const system = createAnimatorSystem();
const node = system.register(parentNode, control);
system.unregister(node);
```

**AnimatorNode properties:**
- `id`: Unique identifier
- `state`: Current state (exited|entering|entered|exiting)
- `duration`: Computed from control.getSettings() and manager
- `children`: Set of child nodes
- `subscribers`: Notification subscribers
- `scheduler`: TOScheduler instance for timing
- `manager`: Current animation orchestration strategy

**Dynamic Settings:**
- `control.setDynamicSettings()`: Override settings at runtime
- `control.getDynamicSettings()`: Get current overrides
- Settings merge order: defaults → general → component → dynamic

### Bleeps System

**Audio Context Management:**
- Single shared `AudioContext` per BleepsManager
- Single shared `GainNode` for master volume control
- Individual GainNode per bleep for independent volume

**Bleep States:**
- Lazy loading: Audio loaded on demand
- Play counting: Supports multiple concurrent plays for looped sounds
- Safari compatibility: Filters webm formats (unsupported on Safari)

**Audio Graph:**
```
AudioBufferSourceNode → GainNode (individual) → MasterGainNode → AudioContext.destination
```

### React Integration Patterns

**Animator Component pattern:**
```typescript
const Animator = (props: AnimatorProps) => {
  // 1. Get parent animator from context (if exists)
  const parentAnimatorInterface = useContext(AnimatorContext);
  
  // 2. Create or get animator system
  const system = isRoot ? createAnimatorSystem() : parentAnimatorInterface.system;
  
  // 3. Register node with control methods
  const node = system.register(parentNode, control);
  
  // 4. Provide context to children
  return (
    <AnimatorContext.Provider value={animatorInterface}>
      {children}
    </AnimatorContext.Provider>
  );
};
```

**BleepsProvider pattern:**
```typescript
const BleepsProvider = (props: BleepsProviderProps) => {
  // 1. Create manager once (useMemo with empty deps)
  const bleepsManager = useMemo(() => createBleepsManager(props), []);
  
  // 2. Update manager on props change (useEffect)
  useEffect(() => {
    bleepsManager?.update({...props});
  }, [props]);
  
  // 3. Cleanup on unmount (useEffect)
  useEffect(() => {
    return () => bleepsManager?.unload();
  }, []);
  
  // 4. Provide context to children
  return (
    <BleepsManagerContext.Provider value={bleepsManager}>
      {children}
    </BleepsManagerContext.Provider>
  );
};
```

## Common Development Tasks

### Adding a feature to both vanilla and React versions

1. Implement feature in vanilla package (e.g., @arwes/animator)
   - Export types and factory function from `src/index.ts`
   - Add tests in `.test.ts` files

2. Create React wrapper in corresponding react-* package
   - Create Provider component using React Context
   - Export types from `src/index.ts`
   - Create custom hooks for accessing context

3. Update peer dependencies if needed

4. Build all packages:
   ```bash
   npm run build
   ```

### Understanding the animator state machine

Look at `/packages/animator/src/internal/createAnimatorMachine/createAnimatorMachine.ts`:
- State map defines valid transitions for each state
- `onEntry` executes when entering a state
- `schedule` handles timing with onComplete trigger
- `onActions` handles action handlers for each state

### Debugging animation timing

The `TOScheduler` from tools tracks all scheduled callbacks:
- Each animator node has its own scheduler
- Call `scheduler.isPending()` to check if tasks are pending
- Call `scheduler.stop()` to cancel specific tasks
- Called on node cleanup to prevent memory leaks

## File Organization Pattern

Each package follows consistent structure:
```
packages/PACKAGE/
├── src/
│   ├── index.ts          # Exports all public API
│   ├── types.ts          # Type definitions
│   ├── constants.ts      # Constants
│   ├── createXXX/        # Main factory function
│   │   ├── index.ts      # Exports
│   │   ├── createXXX.ts  # Implementation
│   │   └── createXXX.test.ts  # Tests
│   └── internal/         # Internal utilities
│       └── ...
├── build/                # Generated (esm/, cjs/, umd/)
├── package.json
├── tsconfig.build.esm.json
├── tsconfig.build.cjs.json
└── README.md
```

## Version Management

All packages are versioned together in monorepo:
- Currently: 1.0.0-alpha.20
- Uses Lerna for coordinated publishing
- All peer dependencies reference the same version range

## Key Insights for Future Development

1. **Separation of concerns**: Vanilla packages = logic, React packages = UI integration
2. **Factory pattern**: Provides immutable public APIs while maintaining private state
3. **Context-based React integration**: Uses React Context for dependency injection
4. **Scheduler-based timing**: Custom scheduler handles complex animation orchestration
5. **Web Audio API**: Direct access for fine-grained control over sound
6. **State machines**: Formal state machines ensure predictable animation behavior
7. **Multi-format builds**: Serves different module systems (ESM, CJS, UMD)
8. **TypeScript transformers**: Custom transformers for ESM-specific builds

