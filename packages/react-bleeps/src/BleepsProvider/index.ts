import { memo } from '@arwes/react-tools';
import { BleepsProvider as Component } from './BleepsProvider.js';

const BleepsProvider = memo(Component);

export * from './BleepsProvider.js';
export { BleepsProvider };
