const low = require('lowdb').
const storage = require('lowdb/file-async')

const db = low('db.json', { storage })

app.get('/posts/:id', (req, res) => {
  // Returns a post
  const post = db('posts').find({ id: req.params.id })
  res.send(post)
})

app.post('/posts', (req, res) => {
  // Returns a Promise that resolves to a post
  db('posts')
    .push(req.body)
    .then(post => res.send(post))
})