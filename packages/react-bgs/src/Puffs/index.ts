import { memo } from '@arwes/react-tools';
import { Puffs as PuffsComponent } from './Puffs.js';

const Puffs = memo(PuffsComponent);

export * from './Puffs.types.js';
export { Puffs };
