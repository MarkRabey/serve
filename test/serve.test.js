import path from 'path'
import test from 'ava'
import mock from 'mock-require'

const pkg = require('../package.json')

const originalExit = process.exit
const originalArgv = process.argv

test.before(() => {
  mock('node-version', {
    original: 'v4.0.0',
    short: '4.0',
    long: '4.0.0',
    major: '4',
    minor: '0',
    build: '0'
  })
})

test.after(() => {
  mock.stopAll()
  process.exit = originalExit
  process.argv = originalArgv
})

test('exits with status code 1 if Node version < 6', t => {
  let called = false
  process.exit = arg => {
    if (called) {
      return
    }

    called = true
    t.is(arg, 1)
  }

  process.argv = ['node', path.resolve(__dirname, '..', pkg.bin.serve)]

  require('../bin/serve') // eslint-disable-line import/no-unassigned-import
})
