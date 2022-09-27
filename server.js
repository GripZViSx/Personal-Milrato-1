const app = require('express')();

app.get('/', (req, res) => res.send('Server is started !'));

module.exports = () => {
  app.listen(3000);
}
