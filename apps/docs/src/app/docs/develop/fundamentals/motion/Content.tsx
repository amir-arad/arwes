'use client'

import { AR } from '@/ui'
import { ExampleAnimatorNodeState } from './ExampleAnimatorNodeState'
import { ExampleAnimatorTree } from './ExampleAnimatorTree'
import { ExampleAnimated } from './ExampleAnimated'
import { ExampleText } from './ExampleText'

export default (): JSX.Element => (
  <>
    <AR.H1>Motion Fundamentals</AR.H1>

    <AR.HR />

    <AR.P>
      To create special motion effects, ARWES provides an <b>animator system</b> to orchestrate
      elements transitions and functionalities to facilitate the execution of animations on those
      transitions, along with some utilities to create certain common sci-fi animation effects.
    </AR.P>

    <AR.H2>Animator System</AR.H2>

    <AR.P>
      An animator system is a tree of nodes (similar to the{' '}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model"
        target="_blank"
      >
        DOM
      </a>
      , a{' '}
      <a href="https://en.wikipedia.org/wiki/Directed_acyclic_graph" target="_blank">
        DAG
      </a>
      ) with a root node to control the animation flow and children nodes which transition based on
      a set of rules.
    </AR.P>

    <AR.P>An animator node can be in one of the following states:</AR.P>

    <AR.UL>
      <li>
        <b>Exited</b>: Denotes elements which are invisible/unavailable to the user. The default
        state.
      </li>
      <li>
        <b>Entering</b>: Denotes elements which are transitioning into the app.
      </li>
      <li>
        <b>Entered</b>: Denotes elements which are visible/available to the user.
      </li>
      <li>
        <b>Exiting</b>: Denotes elements which are transitioning out of the app.
      </li>
    </AR.UL>

    <AR.P>An animator node has the following transitions:</AR.P>

    <AR.UL>
      <li>
        <b>Enter</b>: From exited/exiting to entering to entered. To show/enable elements.
      </li>
      <li>
        <b>Exit</b>: From entered/entering to exiting to exited. To hide/disable elements.
      </li>
    </AR.UL>

    <ExampleAnimatorNodeState />

    <AR.P>
      By default, a parent animator node which is in exited state will have all its children in
      exited state too. When it enters and transitions to entered state, then it enters its children
      nodes. And then the children nodes continue the same process unless configured otherwise.
    </AR.P>

    <AR.P>
      Normally, there is one root node which receives orders to activate or not. If it is activated,
      then it enters the cascade of nodes. Otherwise, it exits them.
    </AR.P>

    <ExampleAnimatorTree />

    <AR.P>
      An animator node uses a "manager" to transition its children nodes. By default it is done in
      parallel but this can be configured, for example, to transition children nodes in sequence.
    </AR.P>

    <ExampleAnimatorTree manager="sequence" />

    <AR.P>
      This pattern simplifies the creation of complex transition animations using serial, parallel,
      sequence, staggering, and other strategies in trees of nodes. There are also a few other
      settings an animator node can have to configure how and when it should transition itself and
      its children, allowing the creation of very rich motion effects.
    </AR.P>

    <AR.H2>Animated Elements</AR.H2>

    <AR.P>
      An animator node can be linked to zero, one, or multiple UI elements such as HTML, SVG, 2D
      Canvas, or 3D WebGL elements. These UI elements basically listen to their animator node state
      changes and execute animations on specific states.
    </AR.P>

    <ExampleAnimated />

    <AR.P>
      In the example above, there is one animator node, but the two border lines, the background
      shape, and the text element, have different transition animations in different times with
      different durations.
    </AR.P>

    <AR.H2>Dynamic Transitions</AR.H2>

    <AR.P>
      Some effects should be calculated dynamically such as text transitions which should have a
      different duration based on the length of the content. ARWES provides a few text transition
      animations which resemble many famous special effects. They can dynamically calculate how long
      should a duration last and modify their linked animator nodes transition durations.
    </AR.P>

    <ExampleText />

    <AR.P>
      In the example above, each paragraph has its own animator node, and each one with its own
      calculated transition durations.
    </AR.P>

    <AR.HR />

    <AR.Navigation
      prevHref="/docs/develop/fundamentals/visual"
      prev="Visual"
      nextHref="/docs/develop/fundamentals/audio"
      next="Audio"
    />
  </>
)
