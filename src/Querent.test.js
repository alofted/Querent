import test from 'ava'
import * as Querent from './Querent'

test('query', t => {
  const JUMP = { id: 1, verb: 'jump', active: true, nested: { value: 1 } }
  const RUN = { id: 2, verb: 'run', active: false, nested: { value: 2 } }
  const SWIM = { id: 3, verb: 'swim', active: true, nested: { value: 3 } }
  const DANCE = { id: 4, verb: 'dance', active: false, nested: { value: 4 } }
  const HIKE = { id: 5, verb: 'hike', active: true, nested: { value: 5 } }

  const ACTIONS = [ JUMP, RUN, SWIM, DANCE, HIKE ]

  t.deepEqual(Querent.query(ACTIONS, { verb: 'run' }), [ RUN ])
  t.deepEqual(Querent.query(ACTIONS, { verb: ['jump', 'run'] }), [ JUMP, RUN ])
  t.deepEqual(Querent.query(ACTIONS, { verb: { '!': 'swim' } }), [ JUMP, RUN, DANCE, HIKE ])
  t.deepEqual(Querent.query(ACTIONS, { active: true, verb: { '!': ['jump', 'hike'] } }), [ SWIM ])
  t.deepEqual(Querent.query(ACTIONS, { id: { '<': 2 } }), [ JUMP ])
  t.deepEqual(Querent.query(ACTIONS, { id: { '<=': 5 } }), [ JUMP, RUN, SWIM, DANCE, HIKE ])
  t.deepEqual(Querent.query(ACTIONS, { id: { '!': { '>': 0 } } }), [])
  t.deepEqual(Querent.query(ACTIONS, { id: { '>=': 5 } }), [ HIKE ])
  t.deepEqual(Querent.query(ACTIONS, { nested: { value: [1, 5] } }), [ JUMP, HIKE ])
})

test('matches', t => {
  const JUMP = { id: 1, verb: 'jump', active: true, nested: { value: 1 } }

  t.false(Querent.matches(JUMP, { verb: 'run' }))
  t.true(Querent.matches(JUMP, { verb: ['jump', 'run'] }))
  t.true(Querent.matches(JUMP, { verb: { '!': 'swim' } }))
  t.false(Querent.matches(JUMP, { active: true, verb: { '!': ['jump', 'hike'] } }))
  t.true(Querent.matches(JUMP, { id: { '<': 2 } }))
  t.true(Querent.matches(JUMP, { id: { '<=': 5 } }))
  t.false(Querent.matches(JUMP, { id: { '!': { '>': 0 } } }))
  t.false(Querent.matches(JUMP, { id: { '>=': 5 } }))
  t.true(Querent.matches(JUMP, { nested: { value: [1, 5] } }))
})
