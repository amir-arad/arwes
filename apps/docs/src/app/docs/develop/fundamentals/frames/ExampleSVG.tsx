'use client'

import { Animated, Animator, AnimatorGeneralProvider } from '@arwes/react'

const Example = (): JSX.Element => {
  return (
    <AnimatorGeneralProvider disabled={false} dismissed={false} duration={{ enter: 2, exit: 2 }}>
      <Animator root active>
        <Animated
          className="relative inline-block text-[15rem]"
          animated={{
            transitions: {
              entering: {
                fontSize: ['5rem', '15rem'],
                easing: 'linear',
                repeat: Infinity,
                direction: 'alternate'
              }
            }
          }}
        >
          <svg
            className="relative"
            width="1em"
            viewBox="0 0 202 152"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M186 149.5H16L1 134.5L79.5 0.5H122.5L201 134.5L186 149.5Z"
              vectorEffect="non-scaling-stroke"
              fill="#20DFDF"
              fillOpacity="0.1"
              stroke="#0D5959"
            />
            <path
              d="M17.8 152L14.7998 149H65.9995L64.9995 150H36.9995L34.4995 152H17.8Z"
              vectorEffect="non-scaling-stroke"
              fill="#20DFDF"
            />
            <path
              d="M184.2 152L187.2 149H136.001L137.001 150H165.001L167.501 152H184.2Z"
              vectorEffect="non-scaling-stroke"
              fill="#20DFDF"
            />
            <path
              d="M75 6.4V8.22656L79.7709 1H86L87 0H79.2L75 6.4Z"
              vectorEffect="non-scaling-stroke"
              fill="#20DFDF"
            />
            <path
              d="M127 6.41406V8.22656L122.229 1H116L115 0H122.8L127 6.41406Z"
              vectorEffect="non-scaling-stroke"
              fill="#20DFDF"
            />
          </svg>
          <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 not-prose font-header text-[0.2em] text-primary-main-3">
            <b>74.9%</b>
          </div>
        </Animated>
      </Animator>
    </AnimatorGeneralProvider>
  )
}

const ExampleSVG = (): JSX.Element => {
  return (
    <Animator unmountOnExited>
      <Animated data-name="example" className="size-[15rem]">
        <Example />
      </Animated>
    </Animator>
  )
}

export { ExampleSVG }
