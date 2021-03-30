var express = require('express');
const path = require('path');
const {PythonShell} =require('python-shell');
var cors = require('cors');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

var app = express();

app.use(cors());
//Configuration for Multer

const bodyParser = require('body-parser')
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.get('/readingpyfile', (req, res) => {

  let options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
};
PythonShell.run('odd_number.py', options, function (err, response){
  if (err) throw err;
  console.log('result: ', response.toString());
  res.send(response.toString())
});

})
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
