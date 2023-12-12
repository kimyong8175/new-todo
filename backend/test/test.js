const jwt = require('jsonwebtoken')

let token = jwt.sign({ foo: 'let' }, 'secret');

jwt.verify(token, 'secret', function(err, decoded) {
  console.log(decoded) // bar
});
