const low = require('lowdb')
const storage = require('lowdb/file-sync')

const db = low('db.json', { storage })

db('posts').push({ title: 'lowdb is awesome' })