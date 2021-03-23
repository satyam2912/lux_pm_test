var express = require('express');
const path = require('path');
const multer = require("multer");
var cors = require('cors');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

var app = express();

app.use(cors());
//Configuration for Multer
//Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
//Calling the "multer" Function
const upload = multer({
  storage: multerStorage,
  // fileFilter: multerFilter,
});
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const db = mongoose.createConnection(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const { Schema } = mongoose;
const fileSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: [true, "Uploaded file must have a name"],
  },
  type: {
    type: String,
    required: [true, "Uploaded file must have a type"],
  },
  size: {
    type: Number,
    required: [true, "Uploaded file must have a size"],
  }
});
const FileInfo = db.model('FileInfo', fileSchema);

app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post("/api/fileanalyse", upload.single("upfile"), async (req, res) => {
  console.log(req.file);
  try {
    const newFile = await FileInfo.create({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
    res.status(200).json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
