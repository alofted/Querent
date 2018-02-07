import test from 'ava'
import Querent from './Querent'

test('query', t => {
  const BART = { surname: 'Simpson', age: 10, grades: { math: 'F' } }
  const LISA = { surname: 'Simpson', age: 7, grades: { math: 'A' } }
  const MILHOUSE = { surname: 'Van Houten', age: 10, grades: { math: 'B' } }
  const RALPH = { surname: 'Wiggum', age: 8, grades: { math: 'F' } }

  const STUDENTS = [ BART, LISA, MILHOUSE, RALPH ]

  t.deepEqual(Querent.query(STUDENTS, { surname: 'Simpson' }), [ BART, LISA ])
  t.deepEqual(Querent.query(STUDENTS, { surname: ['Simpson', 'Wiggum'] }), [ BART, LISA, RALPH ])
  t.deepEqual(Querent.query(STUDENTS, { surname: { '!': 'Simpson' } }), [ MILHOUSE, RALPH ])
  t.deepEqual(Querent.query(STUDENTS, { surname: { '!': ['Simpson'] }, age: 10 }), [ MILHOUSE ])

  t.deepEqual(Querent.query(STUDENTS, { age: { '<': 8 } }), [ LISA ])
  t.deepEqual(Querent.query(STUDENTS, { age: { '<=': 8 } }), [ LISA, RALPH ])
  t.deepEqual(Querent.query(STUDENTS, { age: { '>': 8 } }), [ BART, MILHOUSE ])
  t.deepEqual(Querent.query(STUDENTS, { age: { '>=': 8 } }), [ BART, MILHOUSE, RALPH ])
  t.deepEqual(Querent.query(STUDENTS, { age: { '!': { '>': 1 } } }), [])

  t.deepEqual(Querent.query(STUDENTS, { grades: { math: ['A', 'B'] } }), [ LISA, MILHOUSE ])
})

test('matches', t => {
  const BART = { surname: 'Simpson', age: 10, grades: { math: 'F' } }

  t.true(Querent.matches(BART, BART))

  t.true(Querent.matches(BART, { surname: 'Simpson' }))
  t.false(Querent.matches(BART, { surname: 'Van Houten' }))

  t.true(Querent.matches(BART, { surname: ['Simpson'] }))
  t.false(Querent.matches(BART, { surname: ['Wiggum', 'Van Houten'] }))

  t.true(Querent.matches(BART, { surname: { '!': 'Wiggum' } }))
  t.false(Querent.matches(BART, { surname: { '!': ['Van Houten', 'Simpson'] } }))

  t.true(Querent.matches(BART, { age: 10 }))
  t.true(Querent.matches(BART, { age: { '<': 12 } }))
  t.false(Querent.matches(BART, { age: { '>': 12 } }))
  t.true(Querent.matches(BART, { age: { '<=': 10 } }))
  t.true(Querent.matches(BART, { age: { '>=': 10 } }))
  t.false(Querent.matches(BART, { age: { '<=': 8 } }))
  t.false(Querent.matches(BART, { age: { '>=': 12 } }))
  t.false(Querent.matches(BART, { age: { '!': 10 } }))
  t.false(Querent.matches(BART, { age: { '!': { '>': 1 } } }))

  t.true(Querent.matches(BART, { grades: { math: 'F' } }))
  t.true(Querent.matches(BART, { grades: { math: ['F'] } }))
})
