import * as animated from '@arwes-amir/animated'
import * as animator from '@arwes-amir/animator'
import * as arwes from 'arwes'
import * as arwesReact from '@arwes-amir/react'
import * as bgs from '@arwes-amir/bgs'
import * as bleeps from '@arwes-amir/bleeps'
import * as effects from '@arwes-amir/effects'
import * as empanada from 'empanada'
import * as frames from '@arwes-amir/frames'
import * as motion from 'motion'
import * as reactAnimated from '@arwes-amir/react-animated'
import * as reactAnimator from '@arwes-amir/react-animator'
import * as reactBgs from '@arwes-amir/react-bgs'
import * as reactBleeps from '@arwes-amir/react-bleeps'
import * as reactCore from '@arwes-amir/react-core'
import * as reactEffects from '@arwes-amir/react-effects'
import * as reactFrames from '@arwes-amir/react-frames'
import * as reactText from '@arwes-amir/react-text'
// Arwes React
import * as reactTools from '@arwes-amir/react-tools'
import * as styles from '@arwes-amir/styles'
import * as text from '@arwes-amir/text'
import * as theme from '@arwes-amir/theme'
// Arwes Vanilla
import * as tools from '@arwes-amir/tools'

import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMClient from 'react-dom/client'

window.noxtron.setupSandbox(() => ({
  dependencies: [
    { name: 'react', pkg: React },
    { name: 'react-dom', pkg: ReactDOM },
    { name: 'react-dom/client', pkg: ReactDOMClient },
    { name: 'motion', pkg: motion },
    { name: 'empanada', pkg: empanada },
    { name: '@arwes-amir/tools', pkg: tools },
    { name: '@arwes-amir/theme', pkg: theme },
    { name: '@arwes-amir/styles', pkg: styles },
    { name: '@arwes-amir/animator', pkg: animator },
    { name: '@arwes-amir/animated', pkg: animated },
    { name: '@arwes-amir/bleeps', pkg: bleeps },
    { name: '@arwes-amir/text', pkg: text },
    { name: '@arwes-amir/frames', pkg: frames },
    { name: '@arwes-amir/bgs', pkg: bgs },
    { name: '@arwes-amir/effects', pkg: effects },
    { name: 'arwes', pkg: arwes },
    { name: '@arwes-amir/react-tools', pkg: reactTools },
    { name: '@arwes-amir/react-animator', pkg: reactAnimator },
    { name: '@arwes-amir/react-animated', pkg: reactAnimated },
    { name: '@arwes-amir/react-bleeps', pkg: reactBleeps },
    { name: '@arwes-amir/react-text', pkg: reactText },
    { name: '@arwes-amir/react-bgs', pkg: reactBgs },
    { name: '@arwes-amir/react-frames', pkg: reactFrames },
    { name: '@arwes-amir/react-effects', pkg: reactEffects },
    { name: '@arwes-amir/react-core', pkg: reactCore },
    { name: '@arwes-amir/react', pkg: arwesReact }
  ]
}))
