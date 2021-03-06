'use strict'

const tman = require('tman')
const thunk = require('thunks')()
const supertest = require('supertest')
const app = require('..')

const request = supertest(app.server)
const user = {
  id: 'abc',
  name: 'test',
  email: 'test@teambition.com'
}

tman.suite('SPA Seed', function () {
  tman.after(function * () {
    yield thunk.delay(1000)
    process.exit()
  })

  tman.it('get index view', function * () {
    yield request.get('')
      .expect(200)
  })

  tman.it('get favicon.ico', function * () {
    yield request.get('/favicon.ico')
      .expect(200)
  })

  tman.it('get /api/info', function * () {
    yield request.get('/api/info')
      .expect(200)
      .expect('content-type', /application\/json/)
  })

  tman.it('post /api/echo', function * () {
    yield request.post('/api/echo')
      .send(user)
      .expect(200)
      .expect('content-type', /application\/json/)
      .expect(user)
  })
})
