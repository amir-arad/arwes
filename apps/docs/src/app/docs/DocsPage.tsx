'use client'

import { Animator } from '@arwes/react'

import { LayoutContent, Article } from '@/ui'

const DocsPage = (): JSX.Element => {
  return (
    <Animator>
      <LayoutContent>
        <Article className="flex flex-col gap-6">
          <h1>Futuristic Sci-Fi UI Web Framework</h1>

          <hr />

          <div className="flex flex-row flex-wrap gap-1">
            <a href="https://npmjs.org/package/arwes" target="_blank">
              <img src="https://img.shields.io/npm/v/arwes.svg?style=flat-square" alt="Version" />
            </a>
            <a href="https://github.com/arwes/arwes/actions" target="_blank">
              <img
                src="https://github.com/arwes/arwes/workflows/ci/badge.svg?style=flat-square"
                alt="CI"
              />
            </a>
            <a href="https://www.codefactor.io/repository/github/arwes/arwes">
              <img
                src="https://www.codefactor.io/repository/github/arwes/arwes/badge"
                alt="CodeFactor"
              />
            </a>
            <a href="https://github.com/arwes/arwes" target="_blank">
              <img
                src="https://img.shields.io/github/stars/arwes/arwes.svg?style=flat-square&label=stars"
                alt="Github Stars"
              />
            </a>
            <a href="https://npmjs.org/package/arwes" target="_blank">
              <img
                alt="npm"
                src="https://img.shields.io/npm/dm/arwes?label=installs&style=flat-square"
              />
            </a>
            <a href="https://x.com/arwesjs" target="_blank">
              <img
                src="https://img.shields.io/twitter/follow/arwesjs?style=social"
                alt="Follow on X"
              />
            </a>
            <a href="https://discord.gg/s5sbTkw" target="_blank">
              <img
                src="https://img.shields.io/discord/457381046497968128?color=5865F2&logo=discord&logoColor=white&style=flat-square"
                alt="Discord"
              />
            </a>
            <a href="https://github.com/arwes/arwes/blob/main/LICENSE" target="_blank">
              <img
                src="https://img.shields.io/github/license/arwes/arwes.svg?maxAge=2592000&style=flat-square"
                alt="License"
              />
            </a>
          </div>

          <p>
            ARWES is a web framework to build user interfaces based on futuristic science fiction
            designs, animations, and sound effects. The concepts behind are opinionated with
            influences from{' '}
            <a href="https://aesthetics.fandom.com/wiki/Cyberprep" target="_blank">
              Cyberprep
            </a>{' '}
            and productions like{' '}
            <a href="http://robertsspaceindustries.com" target="_blank">
              Star Citizen
            </a>
            ,{' '}
            <a href="https://www.halowaypoint.com/en-us/games" target="_blank">
              Halo
            </a>
            ,{' '}
            <a href="https://www.eidosmontreal.com/games/deus-ex-mankind-divided" target="_blank">
              Deus Ex
            </a>{' '}
            , and{' '}
            <a href="https://nikke-en.com" target="_blank">
              NIKKE
            </a>
            . It tries to inspire advanced science and technology.
          </p>

          <blockquote>
            <p>
              The project is under development and not ready for production yet. It is still in{' '}
              <a href="https://stackoverflow.com/questions/40067469" target="_blank">
                alpha release
              </a>
              , so the components are being tested and their API may change as it gets completed.
            </p>
          </blockquote>

          <blockquote>
            <p>
              <a href="https://github.com/arwes/arwes/tree/main" target="_blank">
                Branch main
              </a>{' '}
              is for <code>@alpha</code> version releases and public content deployed at{' '}
              <a href="https://arwes.dev" target="_blank">
                arwes.dev
              </a>
              .
              <br />
              <a href="https://github.com/arwes/arwes/tree/next" target="_blank">
                Branch next
              </a>{' '}
              is for <code>@next</code> version releases and active development deployed at{' '}
              <a href="https://next.arwes.dev" target="_blank">
                next.arwes.dev
              </a>
              .
            </p>
          </blockquote>

          <p>
            The framework is delivered for the web platform as{' '}
            <a href="https://www.npmjs.com" target="_blank">
              NPM
            </a>{' '}
            packages in the <code>@arwes/[package]</code> scope for ESModules and CommonJS formats
            in JavaScript ES2022 version with strict{' '}
            <a href="https://www.typescriptlang.org" target="_blank">
              TypeScript
            </a>{' '}
            v5+ type definitions.
          </p>

          <p>
            Latest version of Chrome, Firefox, and Safari, for Android, iOS and desktop are
            supported. Server-side rendering with Node.js is supported. There are custom APIs for{' '}
            <a href="https://react.dev" target="_blank">
              React.js
            </a>{' '}
            v18+ which can be used with tools like <a href="https://nextjs.org">Next.js</a> and{' '}
            <a href="https://remix.run" target="_blank">
              Remix
            </a>
            .
          </p>

          <p>
            Since sci-fi UIs normally have very particular aesthetics with custom visual workflows
            and user experiences, the tools offered are currently "low/medium level APIs", which
            means that the framework does not provide an entire set of UI components for a common
            web app but rather a set of primitives, utilities, and base components to build a design
            system.
          </p>
        </Article>
      </LayoutContent>
    </Animator>
  )
}

export { DocsPage }
