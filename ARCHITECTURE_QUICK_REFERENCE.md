# Arwes Architecture - Quick Reference Guide

## Package Relationship Map

```
┌─────────────────────────────────────────────────────────────┐
│ Foundation Layer (No Dependencies)                          │
├─────────────────────────────────────────────────────────────┤
│ @arwes/tools          (scheduler, utilities)                │
│ @arwes/animated       (animation primitives)                │
└─────────────────────────────────────────────────────────────┘
           ▲                              ▲
           │ peerDeps                     │ peerDeps
           │                              │
┌──────────┴──────────┐        ┌──────────┴────────────────┐
│ Core Vanilla Pkg    │        │ Styling & Layout          │
├─────────────────────┤        ├──────────────────────────┤
│ @arwes/animator     │        │ @arwes/text              │
│ @arwes/bleeps       │        │ @arwes/frames            │
│ @arwes/theme        │        │ @arwes/bgs               │
└─────────┬───────────┘        └────────┬─────────────────┘
          │                             │
          └──────────────┬──────────────┘
                         │
         ┌───────────────┴────────────────┐
         │ @arwes/core (aggregates)      │
         └───────────┬────────────────────┘
                     │
         ┌───────────▼──────────────────┐
         │ React Integration Layer       │
         ├──────────────────────────────┤
         │ @arwes/react-animator        │
         │ @arwes/react-bleeps          │
         │ @arwes/react-animated        │
         │ @arwes/react-text            │
         │ @arwes/react-frames          │
         │ @arwes/react-bgs             │
         │ @arwes/react-core            │
         └───────────┬────────────────────┘
                     │
         ┌───────────▼──────────────────┐
         │ @arwes/react                 │
         │ (Entry Point)                │
         └──────────────────────────────┘
```

## Vanilla Package Guide

### @arwes/animator
**Purpose**: Animation state orchestration system
**Key Exports**:
- `createAnimatorSystem()` → AnimatorSystem
- Types: AnimatorNode, AnimatorControl, AnimatorSettings

**Usage Pattern**:
```typescript
const system = createAnimatorSystem();
const node = system.register(parentNode, animatorControl);
// node.state: 'exited' | 'entering' | 'entered' | 'exiting'
// node.send('enter') // trigger state transition
```

**State Transitions**:
```
exited → setup → entering → (completed) → entered
                                    ↓ exit
                              exiting → exited
```

### @arwes/animated
**Purpose**: Low-level animation primitives
**Key Exports**:
- `createAnimation(props)` → { isPending, cancel }
- `easing` object with 27+ easing functions

**Usage Pattern**:
```typescript
const animation = createAnimation({
  duration: 0.5,        // seconds
  easing: 'outQuad',
  direction: 'normal',
  onUpdate: (progress) => { /* 0-1 */ },
  onComplete: () => {},
  onCancel: () => {}
});
```

### @arwes/bleeps
**Purpose**: Sound effects management
**Key Exports**:
- `createBleep(props)` → Bleep
- `createBleepsManager(props)` → BleepsManager<T>

**Usage Pattern**:
```typescript
const manager = createBleepsManager({
  master: { volume: 0.8 },
  common: { preload: true },
  categories: {
    transition: { volume: 0.6 }
  },
  bleeps: {
    activate: {
      sources: [{ src: 'activate.mp3', type: 'audio/mpeg' }],
      category: 'interaction'
    }
  }
});

manager.bleeps.activate?.play();
manager.update({ master: { volume: 0.5 } });
```

### @arwes/tools
**Purpose**: Utilities and helpers
**Key Exports**:
- `createTOScheduler()` → TOScheduler
- `IS_BROWSER`, `IS_BROWSER_SAFARI` (environment detection)
- `cx()` (class composition)
- `loadImage()` (image preloading)

**TOScheduler Pattern**:
```typescript
const scheduler = createTOScheduler();
scheduler.start('taskId', 0.5, () => { /* runs after 0.5s */ });
scheduler.isPending('taskId');  // boolean
scheduler.stop('taskId');
scheduler.stopAll();
```

## React Wrapper Guide

### @arwes/react-animator
**Key Components**:
- `<Animator>` - Root/child animator component
- `<AnimatorGeneralProvider>` - Global settings provider

**Key Hooks**:
- `useAnimator()` → AnimatorInterface | undefined
- `useAnimatorGeneral()` → (similar interface)

**Usage Pattern**:
```typescript
<AnimatorGeneralProvider settings={{ duration: { enter: 0.3 } }}>
  <Animator root active manager="stagger" duration={{ enter: 0.3 }}>
    <div ref={nodeRef}>Content</div>
    
    <Animator manager="parallel">
      <Child1 /> {/* enters in parallel */}
      <Child2 />
    </Animator>
  </Animator>
</AnimatorGeneralProvider>
```

**Manager Strategies**:
- `parallel` - All children animate at same time
- `stagger` - Children with delay between each (forward)
- `staggerReverse` - Same but backward order
- `sequence` - One after another
- `sequenceReverse` - One after another, backward
- `switch` - Only one active at time

### @arwes/react-bleeps
**Key Components**:
- `<BleepsProvider>` - Context provider

**Key Hooks**:
- `useBleeps()` → BleepsManager

**Usage Pattern**:
```typescript
<BleepsProvider
  master={{ volume: 0.8 }}
  bleeps={{
    click: { sources: [{src: 'click.mp3', type: 'audio/mpeg'}] }
  }}
>
  <App />
</BleepsProvider>

// Inside component:
const bleeps = useBleeps();
bleeps.bleeps.click?.play();
```

## Build System Essentials

### Build Outputs (per package)
- **ESM**: `build/esm/index.js` - For modern bundlers
- **CJS**: `build/cjs/index.js` - For Node.js
- **UMD**: `build/umd/umd.min.js` - For browsers
- **Types**: `build/esm/index.d.ts` - TypeScript definitions

### Build Commands
```bash
npm run build              # Build all packages
npm run build-esm          # Build ESM only
npm run build-cjs          # Build CJS only
npm run build-umd          # Build UMD only
npm run build-types        # Generate .d.ts files
```

### How Exports are Resolved
```javascript
// package.json exports field
"exports": {
  ".": {
    "import": "./build/esm/index.js",  // ESM import
    "require": "./build/cjs/index.js"  // CommonJS require
  }
},
"unpkg": "./build/umd/umd.min.js"      // Browser CDN
```

## Common Patterns

### Factory Function Pattern
All vanilla packages use this:
```typescript
const createXXX = (props: XXXProps): XXX => {
  // Private state
  let state = {...};
  
  // Public API via Object.defineProperties
  const obj = {} as XXX;
  Object.defineProperties(obj, {
    readonly: { value: state.value, enumerable: true },
    computed: { 
      get: () => state.derived,
      enumerable: true 
    },
    method: { value: () => {...}, enumerable: true }
  });
  
  return obj;
};
```

### Context-Based React Integration
```typescript
// Create context
const Context = createContext<T | undefined>(undefined);

// Provider component
const Provider = ({ value, children }) => (
  <Context.Provider value={value}>{children}</Context.Provider>
);

// Hook for consuming
const useXXX = () => useContext(Context);
```

### Lifecycle in React Wrappers
```typescript
// 1. Create once (useMemo with empty deps)
const instance = useMemo(() => createInstance(props), []);

// 2. Update on changes (useEffect)
useEffect(() => {
  instance?.update(props);
}, [props]);

// 3. Cleanup (useEffect with cleanup)
useEffect(() => {
  return () => instance?.cleanup?.();
}, []);
```

## Key Files to Know

### Core Logic
- `/packages/animator/src/createAnimatorSystem/createAnimatorSystem.ts` - System creation
- `/packages/animator/src/internal/createAnimatorMachine/` - State machine impl
- `/packages/animator/src/internal/createAnimatorManager/` - Manager strategies
- `/packages/bleeps/src/createBleep/createBleep.ts` - Bleep implementation
- `/packages/animated/src/createAnimation/createAnimation.ts` - Animation primitives

### React Integration
- `/packages/react-animator/src/Animator/Animator.ts` - Main Animator component
- `/packages/react-bleeps/src/BleepsProvider/BleepsProvider.tsx` - BleepsProvider
- `/packages/react-*/src/useXXX/` - Custom hooks

### Build Configuration
- `/scripts/pkg-build-esm.sh` - ESM build
- `/scripts/pkg-build-cjs.sh` - CJS build
- `/scripts/pkg-build-umd.sh` - UMD build
- `/tsconfig.build.esm.json` - ESM config
- `/tsconfig.build.cjs.json` - CJS config

## Debugging Tips

### Check animator state
```typescript
const animatorNode = animatorRef.current;
console.log(animatorNode?.state);        // Current state
console.log(animatorNode?.duration);     // Computed duration
console.log(animatorNode?.children);     // Child nodes
```

### Check scheduler pending tasks
```typescript
const scheduler = animatorNode?.scheduler;
console.log(scheduler?.isPending());     // Any tasks pending?
scheduler?.stopAll();                    // Cancel all tasks
```

### Check bleep status
```typescript
const bleep = bleepsManager.bleeps.soundName;
console.log(bleep?.isLoaded);    // Loaded?
console.log(bleep?.isPlaying);   // Playing?
```

### Audio context issues
- Check `audioContext.state` - may be 'suspended' (needs user interaction)
- Check browser console for audio decode errors
- Safari doesn't support webm audio format
- Ensure audio files are in correct path

## Performance Considerations

1. **Animator System**: Creates tree structures - be mindful of deep nesting
2. **Audio Context**: Only one per BleepsManager - use manager for multiple sounds
3. **Scheduler**: Each node has scheduler - cleanup happens on unmount
4. **Memory**: Unregister animator nodes when removing from tree
5. **Builds**: ESM is smallest, UMD is largest (minified still included)

