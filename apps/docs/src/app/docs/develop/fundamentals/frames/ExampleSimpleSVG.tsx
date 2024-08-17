'use client'

import { Animated, Animator, AnimatorGeneralProvider } from '@arwes/react'

const Example = (): JSX.Element => {
  return (
    <AnimatorGeneralProvider disabled={false} dismissed={false} duration={{ enter: 2, exit: 2 }}>
      <Animator root active>
        <Animated
          className="relative inline-block w-full"
          animated={{
            transitions: {
              entering: {
                width: ['30%', '100%'],
                easing: 'steps(5, end)',
                repeat: Infinity,
                direction: 'alternate'
              }
            }
          }}
        >
          <svg
            className="block relative"
            width="100%"
            viewBox="0 0 203 152"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M186.738 149.5H16.0617L1.00195 124.5L69.7746 0.5H133.025L201.798 124.5L186.738 149.5Z"
              fill="#20DFDF"
              fillOpacity="0.1"
              stroke="#0D5959"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M16.4504 151L15.1982 149H66.2605L65.2566 150H37L36 151H16.4504Z"
              fill="#20DFDF"
            />
            <path
              d="M186.368 151L187.62 149H136.558L137.562 150H165.818L166.818 151H186.368Z"
              fill="#20DFDF"
            />
            <path
              d="M65.2568 7.6V9.70703L70.0467 1H76.3006L77.3046 0H69.4736L65.2568 7.6Z"
              fill="#20DFDF"
            />
            <path
              d="M137.544 7.6V9.70703L132.754 1H126.5L125.496 0H133.327L137.544 7.6Z"
              fill="#20DFDF"
            />
            <path
              d="M0.400391 124.5L6.14276 134L7.60857 134.5L1.60477 124.5L7.40778 114L5.97209 114.5L0.400391 124.5Z"
              fill="#20DFDF"
            />
            <path
              d="M202.4 124.5L196.658 134L195.192 134.5L201.196 124.5L195.393 114L196.829 114.5L202.4 124.5Z"
              fill="#20DFDF"
            />
          </svg>

          <Animated
            className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 not-prose font-header text-[1rem] text-primary-main-3"
            animated={{
              transitions: {
                entering: {
                  fontSize: ['1rem', '3rem'],
                  easing: 'steps(5, end)',
                  repeat: Infinity,
                  direction: 'alternate'
                }
              }
            }}
          >
            <b>74.9%</b>
          </Animated>
        </Animated>
      </Animator>
    </AnimatorGeneralProvider>
  )
}

const ExampleSimpleSVG = (): JSX.Element => {
  return (
    <Animator unmountOnExited>
      <Animated data-name="example" className="size-[15rem]">
        <Example />
      </Animated>
    </Animator>
  )
}

export { ExampleSimpleSVG }
