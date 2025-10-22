import { vi, test, expect, beforeEach, afterEach } from 'vitest'

import { createBleepsManager } from './createBleepsManager'

beforeEach(() => {
  class AudioContext {
    createGain(): object {
      return {
        connect: vi.fn(),
        gain: {
          setValueAtTime: vi.fn()
        }
      }
    }
  }
  window.AudioContext = AudioContext as any
})

afterEach(() => {
  window.AudioContext = null as any
})

test('Should create bleeps manager structure', () => {
  const bleepsManager = createBleepsManager({
    bleeps: {
      click: {
        sources: [{ src: 'audio.mp3', type: 'audio/mpeg' }],
        preload: false
      }
    }
  })
  expect(bleepsManager).toMatchObject({
    bleeps: {
      click: expect.any(Object)
    },
    unload: expect.any(Function),
    update: expect.any(Function)
  })
})

// TODO:
/*
test('Should create and update bleeps with common and category settings changes', () => {
  let bleeps: any;
  const bleepsSettings: BleepsSettings = {
    click: { player: 'click' },
    hover: { player: 'hover', category: BLEEPS_INTERACTION }
  };

  const audioSettings1 = {
    common: { volume: 0.9 },
    categories: {
      [BLEEPS_INTERACTION]: { volume: 0.5 }
    }
  };
  const playersSettings1 = {
    click: { src: ['click.webm'] },
    hover: { src: ['hover.webm'] }
  };
  bleeps = createOrUpdateBleeps(bleeps, audioSettings1, playersSettings1, bleepsSettings);

  expect(Object.keys(bleeps)).toEqual(['click', 'hover']);
  expect(bleeps.click).toMatchObject({
    _settings: { volume: 0.9, src: ['click.webm'] }
  });
  expect(bleeps.hover).toMatchObject({
    _settings: { volume: 0.5, src: ['hover.webm'] }
  });

  const audioSettings2 = {
    common: { volume: 1 },
    categories: {
      [BLEEPS_INTERACTION]: { volume: 0.4 }
    }
  };
  const playersSettings2 = {
    click: { src: ['click.webm'] },
    hover: { src: ['hover.webm'], loop: true }
  };
  bleeps = createOrUpdateBleeps(bleeps, audioSettings2, playersSettings2, bleepsSettings);

  expect(Object.keys(bleeps)).toEqual(['click', 'hover']);
  expect(bleeps.click).toMatchObject({
    _settings: { volume: 1, src: ['click.webm'] }
  });
  expect(bleeps.hover).toMatchObject({
    _settings: { volume: 0.4, src: ['hover.webm'], loop: true }
  });
});

test('Should create and not update bleeps with player "src" or "format" changes', () => {
  const audioSettings = {
    common: { volume: 1 }
  };
  const playersSettings1 = {
    notify: { src: ['notify.webm'] },
    click: { src: ['click.webm'] },
    hover: { src: ['hover.webm'], format: ['webm'] }
  };
  const bleepsSettings: BleepsSettings = {
    notify: { player: 'notify' },
    click: { player: 'click' },
    hover: { player: 'hover' }
  };
  const bleeps1 = createOrUpdateBleeps({}, audioSettings, playersSettings1, bleepsSettings);
  // The individual bleeps are copied to properly compare them later.
  const bleeps1Notify = bleeps1.notify;
  const bleeps1Click = bleeps1.click;
  const bleeps1Hover = bleeps1.hover;

  expect(Object.keys(bleeps1)).toEqual(['notify', 'click', 'hover']);
  expect(bleeps1.notify).toMatchObject({
    _settings: { volume: 1, src: ['notify.webm'] }
  });
  expect(bleeps1.click).toMatchObject({
    _settings: { volume: 1, src: ['click.webm'] }
  });
  expect(bleeps1.hover).toMatchObject({
    _settings: { volume: 1, src: ['hover.webm'], format: ['webm'] }
  });

  const playersSettings2 = {
    notify: { src: ['notify.webm'] }, // unchanged
    click: { src: ['click.mp3'] }, // "src" changed
    hover: { src: ['hover.webm'], format: [] } // "format" changed
  };
  const bleeps2 = createOrUpdateBleeps(bleeps1, audioSettings, playersSettings2, bleepsSettings);

  expect(Object.keys(bleeps2)).toEqual(['notify', 'click', 'hover']);
  expect(bleeps1Notify._howl).toBe(bleeps2.notify._howl); // Updated
  expect(bleeps1Click._howl).not.toBe(bleeps2.click._howl); // Recreated
  expect(bleeps1Hover._howl).not.toBe(bleeps2.hover._howl); // Recreated
  expect(bleeps2.notify).toMatchObject({
    _settings: { volume: 1, src: ['notify.webm'] }
  });
  expect(bleeps2.click).toMatchObject({
    _settings: { volume: 1, src: ['click.mp3'] }
  });
  expect(bleeps2.hover).toMatchObject({
    _settings: { volume: 1, src: ['hover.webm'], format: [] }
  });
});

test('Should unload current bleeps playing when they are re-created', () => {
  const audioSettings = { common: { volume: 1 } };
  const playersSettings1 = { click: { src: ['click.webm'] } };
  const bleepsSettings: BleepsSettings = { click: { player: 'click' } };
  const bleeps1 = createOrUpdateBleeps({}, audioSettings, playersSettings1, bleepsSettings);

  // The current bleep is copied so it can be compared later.
  const bleeps1Click = bleeps1.click;

  expect(Object.keys(bleeps1)).toEqual(['click']);

  // Simulate the bleep is playing.
  jest.spyOn(bleeps1.click, 'getIsPlaying').mockImplementation(() => true);
  const onUnload = jest.spyOn(bleeps1.click, 'unload');

  // "src" setting changed so the bleep is re-created.
  const playersSettings2 = { click: { src: ['click.mp3'] } };
  const bleeps2 = createOrUpdateBleeps(bleeps1, audioSettings, playersSettings2, bleepsSettings);

  expect(Object.keys(bleeps2)).toEqual(['click']);
  expect(bleeps1Click._howl).not.toBe(bleeps2.click._howl); // Recreated.
  expect(onUnload).toHaveBeenCalled();
});

test('Should not create disabled common bleeps', () => {
  const audioSettings = {
    common: { disabled: true }
  };
  const playersSettings = {
    tap: { src: ['tap.webm'] }
  };
  const bleepsSettings: BleepsSettings = {
    click: { player: 'tap' }
  };
  const bleeps = createOrUpdateBleeps({}, audioSettings, playersSettings, bleepsSettings);
  expect(bleeps).toEqual({});
});

test('Should not create disabled category bleeps', () => {
  const audioSettings = {
    categories: {
      [BLEEPS_TRANSITION]: { disabled: true }
    }
  };
  const playersSettings = {
    tap: { src: ['tap.webm'] }
  };
  const bleepsSettings: BleepsSettings = {
    click: { player: 'tap', category: BLEEPS_TRANSITION }
  };
  const bleeps = createOrUpdateBleeps({}, audioSettings, playersSettings, bleepsSettings);
  expect(bleeps).toEqual({});
});

test('Should not create disabled players bleeps', () => {
  const audioSettings = {};
  const playersSettings = {
    tap: { src: ['tap.webm'], disabled: true }
  };
  const bleepsSettings: BleepsSettings = {
    click: { player: 'tap' }
  };
  const bleeps = createOrUpdateBleeps({}, audioSettings, playersSettings, bleepsSettings);
  expect(bleeps).toEqual({});
});

test('Should unload and remove disabled category bleeps on update', () => {
  let bleeps: any;
  const bleepsSettings: BleepsSettings = {
    click: { player: 'click', category: BLEEPS_INTERACTION }
  };

  const audioSettings1 = {
    common: { volume: 1 },
    categories: {
      [BLEEPS_INTERACTION]: { volume: 0.5 }
    }
  };
  const playersSettings1 = {
    click: { src: ['click.webm'] }
  };
  bleeps = createOrUpdateBleeps(bleeps, audioSettings1, playersSettings1, bleepsSettings);
  expect(bleeps.click).toMatchObject({
    _settings: { volume: 0.5, src: ['click.webm'] }
  });

  const audioSettings2 = {
    common: { volume: 1 },
    categories: {
      [BLEEPS_INTERACTION]: { volume: 0.5, disabled: true }
    }
  };
  const playersSettings2 = {
    click: { src: ['click.webm'] }
  };
  const spyUnload = jest.spyOn(bleeps.click, 'unload');
  bleeps = createOrUpdateBleeps(bleeps, audioSettings2, playersSettings2, bleepsSettings);
  expect(spyUnload).toHaveBeenCalled();
  expect(bleeps.click).toBeUndefined();
});

test('Should unload and remove disabled bleeps on update', () => {
  let bleeps: any;
  const bleepsSettings: BleepsSettings = {
    click: { player: 'click' }
  };

  const audioSettings1 = {
    common: { volume: 1 }
  };
  const playersSettings1 = {
    click: { src: ['click.webm'] }
  };
  bleeps = createOrUpdateBleeps(bleeps, audioSettings1, playersSettings1, bleepsSettings);
  expect(bleeps.click).toMatchObject({
    _settings: { volume: 1, src: ['click.webm'] }
  });

  const audioSettings2 = {
    common: { volume: 1 }
  };
  const playersSettings2 = {
    click: { src: ['click.webm'], disabled: true }
  };
  const spyUnload = jest.spyOn(bleeps.click, 'unload');
  bleeps = createOrUpdateBleeps(bleeps, audioSettings2, playersSettings2, bleepsSettings);
  expect(spyUnload).toHaveBeenCalled();
  expect(bleeps.click).toBeUndefined();
});

test('Should throw error if configured bleep has no valid provided player', () => {
  const audioSettings = {};
  const playersSettings = {
    tap: { src: ['tap.webm'], disabled: true }
  };
  const bleepsSettings: BleepsSettings = {
    click: { player: 'click' } // player "click" does not exist
  };
  expect(() => {
    createOrUpdateBleeps({}, audioSettings, playersSettings, bleepsSettings);
  }).toThrow('Component bleep requires a provided player. Player "click" was not found.');
});

test('Should throw error if bleep category does not exist', () => {
  const audioSettings = {};
  const playersSettings = {
    tap: { src: ['tap.webm'], disabled: true }
  };
  const bleepsSettings: any = {
    click: { player: 'click', category: 'xxx' }
  };
  expect(() => {
    createOrUpdateBleeps({}, audioSettings, playersSettings, bleepsSettings);
  }).toThrow('Bleep category "xxx" is not valid.');
});
*/
