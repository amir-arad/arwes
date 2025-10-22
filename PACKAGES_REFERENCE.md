# Arwes Packages - Detailed Reference

## Vanilla (Framework-Agnostic) Packages

### @arwes/tools

**Path**: `/packages/tools`
**Dependencies**: None (only tslib)
**Purpose**: Core utilities and environment detection

**Exports**:

- `createTOScheduler()` - Timeout-based scheduler with task management
- `IS_BROWSER` - Boolean flag for browser environment
- `IS_BROWSER_SAFARI` - Boolean flag for Safari browser
- `cx()` - Class composition utility
- `loadImage()` - Image preloading utility
- `randomizeList()` - Array randomization

**Key Files**:

- `src/createTOScheduler/createTOScheduler.ts` - Scheduler implementation
- `src/constants.ts` - Environment constants

**When to use**: Nearly every package depends on this for utilities and scheduling

---

### @arwes/animator

**Path**: `/packages/animator`
**Dependencies**: @arwes/tools (peerDep)
**Purpose**: Core animation orchestration and state machine

**Exports**:

- `createAnimatorSystem()` - Creates root animation system
- `ANIMATOR_DEFAULT_SETTINGS` - Default configuration
- `ANIMATOR_STATES` - State constants
- `ANIMATOR_ACTIONS` - Action constants
- `ANIMATOR_MANAGER_NAMES` - Manager type names
- Types: `AnimatorNode`, `AnimatorSystem`, `AnimatorControl`, `AnimatorSettings`, etc.

**Key Files**:

- `src/createAnimatorSystem/createAnimatorSystem.ts` - System creation and node management
- `src/internal/createAnimatorMachine/createAnimatorMachine.ts` - State machine with FSM
- `src/internal/createAnimatorManager/createAnimatorManager.ts` - 6 manager strategies

**Key Concepts**:

- **States**: exited, entering, entered, exiting
- **Manager Strategies**: parallel, stagger, staggerReverse, sequence, sequenceReverse, switch
- **Duration Computation**: Combines parent settings with children durations
- **Dynamic Settings**: Can override settings at runtime

**When to use**: As the foundation for any animation choreography

---

### @arwes/animated

**Path**: `/packages/animated`
**Dependencies**: None (only tslib)
**Purpose**: Low-level animation primitives using requestAnimationFrame

**Exports**:

- `createAnimation()` - Frame-based animation with easing
- `easing` object - 27+ easing functions
- Types: `Animation`, `AnimationProps`, `Easing`

**Key Files**:

- `src/createAnimation/createAnimation.ts` - Animation loop implementation
- `src/easing/easing.ts` - All easing function definitions

**Easing Functions Available**:

- Linear: `linear`
- Quadratic: `inQuad`, `outQuad`, `inOutQuad`
- Cubic: `inCubic`, `outCubic`, `inOutCubic`
- Quartic: `inQuart`, `outQuart`, `inOutQuart`
- Quintic: `inQuint`, `outQuint`, `inOutQuint`
- Sinusoidal: `inSine`, `outSine`, `inOutSine`
- Exponential: `inExpo`, `outExpo`, `inOutExpo`
- Circular: `inCirc`, `outCirc`, `inOutCirc`
- Back: `inBack`, `outBack`, `inOutBack`
- Elastic: `inElastic`, `outElastic`, `inOutElastic`
- Bounce: `inBounce`, `outBounce`, `inOutBounce`

**When to use**: For direct frame-by-frame animations with specific easing functions

---

### @arwes/bleeps

**Path**: `/packages/bleeps`
**Dependencies**: @arwes/tools (peerDep)
**Purpose**: Sound effects management with Web Audio API

**Exports**:

- `createBleep()` - Creates single sound effect
- `createBleepsManager()` - Manages collection of sounds
- Types: `Bleep`, `BleepsManager`, `BleepProps`, `BleepsManagerProps`

**Key Files**:

- `src/createBleep/createBleep.ts` - Web Audio API wrapper
- `src/createBleepsManager/createBleepsManager.ts` - Manager for multiple bleeps

**Audio Categories**:

- `background` - Background/ambient sounds
- `transition` - Transition/movement sounds
- `interaction` - Click/interaction sounds
- `notification` - Alert/notification sounds

**Audio Graph**:

```
AudioBufferSourceNode → GainNode (bleep-level) → MasterGainNode → AudioContext.destination
```

**Key Features**:

- Lazy loading - Audio loads on first play
- Play counting - Supports multiple plays for looped sounds
- Safari compatibility - Filters unsupported webm format
- Volume control - Per-bleep and master volume
- Dynamic updates - Can update settings after creation

**When to use**: For any audio/sound effect playback in the application

---

### @arwes/frames

**Path**: `/packages/frames`
**Dependencies**: None visible in package.json
**Purpose**: Frame/border component utilities

**Status**: UI component package, implementation similar to text/bgs

---

### @arwes/text

**Path**: `/packages/text`
**Dependencies**: None visible in package.json
**Purpose**: Text rendering utilities

**Status**: UI component package

---

### @arwes/bgs

**Path**: `/packages/bgs`
**Dependencies**: None visible in package.json
**Purpose**: Background component utilities

**Status**: UI component package

---

### @arwes/theme

**Path**: `/packages/theme`
**Dependencies**: @arwes/tools (peerDep)
**Purpose**: Theme and styling utilities

**Status**: Styling package for consistent theming

---

## React Wrapper Packages

### @arwes/react-animator

**Path**: `/packages/react-animator`
**Dependencies**: @arwes/animator, @arwes/tools, @arwes/react-tools, react (peerDeps)
**Purpose**: React integration for animator system

**Exports**:

- `Animator` component - Main animator component (can be root or child)
- `AnimatorGeneralProvider` component - Global animator settings provider
- `useAnimator()` hook - Access parent animator context
- `useAnimatorGeneral()` hook - Access general animator settings
- Internal contexts: `AnimatorContext`, `AnimatorGeneralContext`

**Key Files**:

- `src/Animator/Animator.ts` - Main component (~200+ lines)
- `src/useAnimator/useAnimator.ts` - Hook for context access
- `src/internal/AnimatorContext/` - Context definition
- `src/internal/AnimatorGeneralContext/` - General settings context

**Component Props**:

- `root?` - Make this a root animator
- `active?` - Control if animator is active
- `disabled?` - Disable animator
- `dismissed?` - Hide without animation
- `manager?` - Manager strategy
- `duration?` - Duration configuration
- `nodeRef?` - Forward ref to AnimatorNode
- `children` - React elements

**When to use**: As the React-friendly animation choreography system

---

### @arwes/react-bleeps

**Path**: `/packages/react-bleeps`
**Dependencies**: @arwes/bleeps, @arwes/react-tools, react (peerDeps)
**Purpose**: React integration for bleeps system

**Exports**:

- `BleepsProvider` component - Context provider for bleeps manager
- `useBleeps()` hook - Access bleeps manager from context
- Types: `BleepsProviderProps`

**Key Files**:

- `src/BleepsProvider/BleepsProvider.tsx` - Provider implementation
- `src/useBleeps/useBleeps.ts` - Hook for context access
- `src/internal/BleepsManagerContext.tsx` - Context definition

**Component Pattern**:

```typescript
<BleepsProvider
  master={{ volume: 0.8 }}
  common={{ preload: true }}
  categories={{ interaction: { volume: 0.6 } }}
  bleeps={{
    click: { sources: [{src: 'click.mp3', type: 'audio/mpeg'}] }
  }}
>
  <App />
</BleepsProvider>
```

**When to use**: Wrap application to provide sound effects to all components

---

### @arwes/react-animated

**Path**: `/packages/react-animated`
**Dependencies**: @arwes/animator, @arwes/react-animator, @arwes/tools, motion 10, react (peerDeps)
**Purpose**: React bindings for animation primitives with motion library

**Note**: Uses motion library for animation, integrates with react-animator

---

### @arwes/react-tools

**Path**: `/packages/react-tools`
**Dependencies**: react (peerDep)
**Purpose**: React-specific utilities and hooks

**Note**: Provides utility functions for other react-\* packages

---

### @arwes/react-text, @arwes/react-frames, @arwes/react-bgs

**Path**: `/packages/react-text`, `/packages/react-frames`, `/packages/react-bgs`
**Purpose**: React components for text, frames, and backgrounds

**Status**: UI component wrappers for vanilla packages

---

### @arwes/react-core

**Path**: `/packages/react-core`
**Purpose**: Core React components

**Status**: Aggregates core functionality

---

### @arwes/react-styles

**Path**: `/packages/react-styles`
**Purpose**: React styling utilities

**Status**: Styling helper package

---

## High-Level Packages

### @arwes/core

**Path**: `/packages/core`
**Dependencies**: @arwes/frames, @arwes/theme (peerDeps)
**Purpose**: Aggregates frames and theme for core styling

---

### @arwes/react

**Path**: `/packages/react`
**Dependencies**: react (peerDep)
**Purpose**: Main React entry point

**Note**: Minimal peerDeps - delegates to specific packages

---

### arwes (standalone)

**Path**: Root package
**Purpose**: Monorepo management and publishing

**Build**: `npm run build` - Builds all packages
**Release**: `npm run release` - Publishes all packages

---

## Dependency Resolution Quick Reference

| Package               | Depends On                              | Used By                                               |
| --------------------- | --------------------------------------- | ----------------------------------------------------- |
| @arwes/tools          | tslib only                              | animator, bleeps, theme, react-animator, react-bleeps |
| @arwes/animator       | tools                                   | react-animator, react-animated                        |
| @arwes/animated       | tslib only                              | react-animated                                        |
| @arwes/bleeps         | tools                                   | react-bleeps                                          |
| @arwes/react-animator | animator, tools, react-tools            | react-animated, components                            |
| @arwes/react-bleeps   | bleeps, react-tools                     | components                                            |
| @arwes/react-animated | animator, react-animator, tools, motion | components                                            |
| @arwes/core           | frames, theme                           | react                                                 |
| @arwes/react          | react                                   | app bundles                                           |

---

## Package Organization Rules

1. **Vanilla packages are framework-agnostic**: No React dependency
2. **React packages wrap vanilla packages**: Provide hooks/context for React
3. **Peer dependencies only**: Prevent version conflicts and circular deps
4. **Single responsibility**: Each package has one main purpose
5. **Consistent structure**: All follow factory pattern and index.ts exports

---

## Build Output Organization

Each package produces:

- `build/esm/` - ES Modules with proper `package.json { "type": "module" }`
- `build/cjs/` - CommonJS with `{ "type": "commonjs" }`
- `build/umd/` - UMD bundle (umd.js + umd.min.js)
- `build/esm/index.d.ts` - TypeScript definitions

This allows users to:

- Import ESM: `import { X } from '@arwes/package'`
- Require CJS: `const { X } = require('@arwes/package')`
- Include UMD: `<script src="package.min.js"></script>`
