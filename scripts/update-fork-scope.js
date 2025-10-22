#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const glob = require('glob')

const OLD_SCOPE = '@arwes'
const NEW_SCOPE = '@arwes-amir'
const OLD_REPO = 'https://github.com/arwes/arwes'
const NEW_REPO = 'https://github.com/amir-arad/arwes'
const OLD_HOMEPAGE = 'https://arwes.dev'
const NEW_HOMEPAGE = 'https://github.com/amir-arad/arwes'

// Find all package.json files in packages directory
const packageFiles = glob.sync('packages/*/package.json', { cwd: __dirname + '/..' })

console.log(`Found ${packageFiles.length} package.json files to update`)

let updateCount = 0

packageFiles.forEach((file) => {
  const fullPath = path.join(__dirname, '..', file)
  const content = fs.readFileSync(fullPath, 'utf8')
  const pkg = JSON.parse(content)

  let modified = false

  // Update package name
  if (pkg.name && pkg.name.startsWith(OLD_SCOPE)) {
    pkg.name = pkg.name.replace(OLD_SCOPE, NEW_SCOPE)
    modified = true
    console.log(`  ${file}: Updated name to ${pkg.name}`)
  }

  // Update repository URL
  if (pkg.repository && pkg.repository.url && pkg.repository.url.includes('arwes/arwes')) {
    pkg.repository.url = pkg.repository.url.replace(OLD_REPO, NEW_REPO)
    modified = true
  }

  // Update homepage
  if (pkg.homepage === OLD_HOMEPAGE) {
    pkg.homepage = NEW_HOMEPAGE
    modified = true
  }

  // Update bugs URL
  if (pkg.bugs && pkg.bugs.url && pkg.bugs.url.includes('arwes/arwes')) {
    pkg.bugs.url = pkg.bugs.url.replace(OLD_REPO, NEW_REPO)
    modified = true
  }

  // Update dependencies
  ;['dependencies', 'peerDependencies', 'devDependencies'].forEach((depType) => {
    if (pkg[depType]) {
      Object.keys(pkg[depType]).forEach((depName) => {
        if (depName.startsWith(OLD_SCOPE)) {
          const newDepName = depName.replace(OLD_SCOPE, NEW_SCOPE)
          pkg[depType][newDepName] = pkg[depType][depName]
          delete pkg[depType][depName]
          modified = true
        }
      })
    }
  })

  if (modified) {
    fs.writeFileSync(fullPath, JSON.stringify(pkg, null, 2) + '\n')
    updateCount++
    console.log(`  ✓ Updated ${file}`)
  }
})

console.log(`\nSuccessfully updated ${updateCount} package.json files`)
