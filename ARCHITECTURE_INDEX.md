# Arwes Codebase Architecture - Documentation Index

This directory contains comprehensive documentation of the Arwes framework's architecture, designed to help future Claude Code instances and developers understand the codebase structure and relationships.

## Documentation Files

### 1. ARCHITECTURE.md (13 KB)

**Comprehensive architectural overview** - Start here for a complete understanding of the framework.

**Contains**:

- Overview of the monorepo structure
- Detailed breakdown of vanilla vs React packages
- Package categories and purposes
- Architecture patterns (factory pattern, state machine, managers)
- Build system architecture (ESM, CJS, UMD)
- Complete dependency graph with hierarchy
- Key technical details for animator and bleeps systems
- React integration patterns with code examples
- File organization patterns
- Development workflow guidance

**Best for**: Understanding the big picture, architectural decisions, and system design

---

### 2. ARCHITECTURE_QUICK_REFERENCE.md (11 KB)

**Quick lookup guide** - Use this for rapid reference during development.

**Contains**:

- ASCII package relationship diagram
- Vanilla package quick guide with code examples
- React wrapper package quick guide
- Build system essentials
- Common design patterns
- Key files to know for different tasks
- Debugging tips with code snippets
- Performance considerations

**Best for**: Quick lookups, code examples, common patterns, debugging

---

### 3. PACKAGES_REFERENCE.md (10 KB)

**Detailed package-by-package breakdown** - Reference specific packages here.

**Contains**:

- Vanilla packages:
  - @arwes/tools
  - @arwes/animator
  - @arwes/animated
  - @arwes/bleeps
  - @arwes/frames, text, bgs, theme
- React wrapper packages:
  - @arwes/react-animator
  - @arwes/react-bleeps
  - @arwes/react-animated
  - @arwes/react-tools, text, frames, bgs, core, styles
- High-level packages:
  - @arwes/core
  - @arwes/react
  - arwes (monorepo)
- Dependency resolution table
- Package organization rules
- Build output organization

**Best for**: Learning what a specific package does, its dependencies, and where to find its implementation

---

## Quick Navigation

### Understanding Package Relationships

1. Start with package diagram in **ARCHITECTURE_QUICK_REFERENCE.md**
2. Get details in **PACKAGES_REFERENCE.md**
3. Deep dive in **ARCHITECTURE.md** sections on dependency graph

### Learning the Animation System

1. Read "Animator System" in **ARCHITECTURE.md**
2. Check "@arwes/animator" in **PACKAGES_REFERENCE.md**
3. Look at code examples in **ARCHITECTURE_QUICK_REFERENCE.md**
4. Examine actual files:
   - `/packages/animator/src/createAnimatorSystem/createAnimatorSystem.ts`
   - `/packages/animator/src/internal/createAnimatorMachine/createAnimatorMachine.ts`

### Learning the Sound System

1. Read "Bleeps System" in **ARCHITECTURE.md**
2. Check "@arwes/bleeps" in **PACKAGES_REFERENCE.md**
3. Look at code examples in **ARCHITECTURE_QUICK_REFERENCE.md**
4. Examine actual files:
   - `/packages/bleeps/src/createBleep/createBleep.ts`
   - `/packages/bleeps/src/createBleepsManager/createBleepsManager.ts`

### Working with React Integration

1. Read "React Integration Patterns" in **ARCHITECTURE.md**
2. Check "@arwes/react-animator" and "@arwes/react-bleeps" in **PACKAGES_REFERENCE.md**
3. Look at component patterns in **ARCHITECTURE_QUICK_REFERENCE.md**
4. Examine actual files:
   - `/packages/react-animator/src/Animator/Animator.ts`
   - `/packages/react-bleeps/src/BleepsProvider/BleepsProvider.tsx`

### Understanding the Build System

1. Read "Build System Architecture" in **ARCHITECTURE.md**
2. Check "Build System Essentials" in **ARCHITECTURE_QUICK_REFERENCE.md**
3. Examine scripts in `/scripts/`:
   - `pkg-build-esm.sh`
   - `pkg-build-cjs.sh`
   - `pkg-build-umd.sh`

## Key Architectural Concepts

### 1. Vanilla/React Separation

- **Vanilla packages**: Pure JavaScript/TypeScript, no React dependency
- **React packages**: Thin wrappers providing React Context and hooks
- **Pattern**: Single-responsibility, composable, framework-agnostic logic

### 2. Factory Function Pattern

All vanilla packages use this pattern:

```typescript
const createXXX = (props: XXXProps): XXX => {
  // Private state
  // Public API via Object.defineProperties
  // Returns immutable interface with private implementation
}
```

### 3. State Machine Architecture (Animator)

- **States**: exited, entering, entered, exiting
- **Transitions**: Triggered by actions (enter, exit, update, setup, refresh)
- **Managers**: Pluggable strategies for coordinating child animations

### 4. Multi-Format Builds

- **ESM**: Modern JavaScript modules
- **CJS**: CommonJS for Node.js
- **UMD**: Browser bundles with minified production version

### 5. Peer Dependencies

- Prevents version conflicts
- Allows framework-agnostic packages
- Clear dependency graph

## Common Tasks & Where to Look

| Task                      | Primary Doc                             | Secondary Doc                   | Key Files                |
| ------------------------- | --------------------------------------- | ------------------------------- | ------------------------ |
| Add new animation feature | ARCHITECTURE.md                         | ARCHITECTURE_QUICK_REFERENCE.md | animator/src/\*          |
| Add new sound effect      | ARCHITECTURE.md                         | PACKAGES_REFERENCE.md           | bleeps/src/\*            |
| Create React wrapper      | ARCHITECTURE_QUICK_REFERENCE.md         | ARCHITECTURE.md                 | react-_/src/_            |
| Fix animation timing      | ARCHITECTURE_QUICK_REFERENCE.md (debug) | ARCHITECTURE.md                 | animator/src/internal/\* |
| Modify build system       | ARCHITECTURE.md                         | ARCHITECTURE_QUICK_REFERENCE.md | scripts/\*               |
| Understand dependencies   | PACKAGES_REFERENCE.md                   | ARCHITECTURE.md                 | package.json files       |
| Debug state transitions   | ARCHITECTURE.md                         | ARCHITECTURE_QUICK_REFERENCE.md | animator FSM code        |
| Working with audio        | PACKAGES_REFERENCE.md                   | ARCHITECTURE.md                 | bleeps/src/\*            |

## File Organization Reference

```
arwes/
├── ARCHITECTURE.md                 # Full architectural overview
├── ARCHITECTURE_QUICK_REFERENCE.md # Quick lookup guide
├── PACKAGES_REFERENCE.md           # Package-by-package details
├── ARCHITECTURE_INDEX.md           # This file
├── packages/
│   ├── tools/
│   ├── animator/
│   ├── animated/
│   ├── bleeps/
│   ├── react-animator/
│   ├── react-bleeps/
│   └── ... (other packages)
├── scripts/
│   ├── pkg-build-esm.sh
│   ├── pkg-build-cjs.sh
│   ├── pkg-build-umd.sh
│   └── ... (other build scripts)
├── apps/
│   ├── play/     (Playground app)
│   ├── docs/     (Documentation)
│   └── perf/     (Performance testing)
└── tsconfig*.json (Build configurations)
```

## Version Information

- **Current Version**: 1.0.0-alpha.20
- **Node.js**: ^18.16
- **TypeScript**: 4.9.x
- **React**: 18.2.0
- **Key Dependencies**: Motion 10, Emotion, Lerna

## Key Files to Study

### Entry Points

- `/packages/animator/src/index.ts` - Animator exports
- `/packages/bleeps/src/index.ts` - Bleeps exports
- `/packages/react-animator/src/index.ts` - React animator exports
- `/packages/react-bleeps/src/index.ts` - React bleeps exports

### Core Implementations

- `/packages/animator/src/createAnimatorSystem/` - System creation
- `/packages/animator/src/internal/createAnimatorMachine/` - State machine
- `/packages/animator/src/internal/createAnimatorManager/` - Manager strategies
- `/packages/bleeps/src/createBleep/` - Audio handling
- `/packages/animated/src/easing/` - Easing functions

### React Integration

- `/packages/react-animator/src/Animator/` - Main React component
- `/packages/react-bleeps/src/BleepsProvider/` - Provider component
- `/packages/react-*/src/use*/` - Custom hooks

### Build Configuration

- `/tsconfig.build.esm.json` - ESM configuration
- `/tsconfig.build.cjs.json` - CJS configuration
- `/scripts/pkg-build-*.sh` - Build scripts

## For Future Claude Code Instances

When exploring this codebase:

1. **Start with this index** to understand what documentation is available
2. **Consult ARCHITECTURE_QUICK_REFERENCE.md** for quick answers
3. **Use PACKAGES_REFERENCE.md** to understand specific packages
4. **Read ARCHITECTURE.md** for deep dives and complex relationships
5. **Look at actual source code** for implementation details

The three documentation files complement each other:

- ARCHITECTURE.md provides breadth and depth
- QUICK_REFERENCE.md provides breadth and quick examples
- PACKAGES_REFERENCE.md provides focused package details

Together, they form a comprehensive guide to the Arwes framework architecture.

## Architectural Highlights

### Strengths

- Clean separation of vanilla and React packages
- Type-safe factory pattern for encapsulation
- Flexible animation choreography with multiple strategies
- Web Audio API integration for sound effects
- Multi-format build outputs for maximum compatibility
- Peer dependencies prevent version conflicts

### Design Patterns

- Factory functions (all vanilla packages)
- State machines (animator system)
- Strategy pattern (manager strategies)
- Context + Hooks (React integration)
- Object.defineProperties for property descriptors (immutability)

### Performance Considerations

- Lazy loading of audio files
- Efficient scheduler for animations
- Tree-based animator node structure
- Single AudioContext per BleepsManager
- Minimal React re-renders with context

---

**Last Updated**: October 22, 2025
**Framework**: Arwes v1.0.0-alpha.20
**Documentation Version**: 1.0
