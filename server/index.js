const express = require('express');
const app = express(); // create express app
var bodyParser = require('body-parser');

let images = [];

app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/create', (req, res) => {
  images.push(req.body.data);
  res.send(JSON.stringify({ data: 'success' }));
  saveImage(req.body.data);
});

app.get('/', (req, res) => {
  res.send(JSON.stringify({ images: images }));
});

// start express server on port 5000
app.listen(3001, () => {
  console.log('server started on port 3001');
});

function decodeBase64Image(dataString) {
  const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  let response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

function saveImage(base64Data) {
  try {
    const imageTypeRegularExpression = /\/(.*?)$/;

    const crypto = require('crypto');
    const seed = crypto.randomBytes(20);
    const uniqueSHA1String = crypto
      .createHash('sha1')
      .update(seed)
      .digest('hex');

    const imageBuffer = decodeBase64Image(base64Data);
    const userUploadedFeedMessagesLocation = './img/';

    const uniqueRandomImageName = 'image-' + uniqueSHA1String;

    const imageTypeDetected = imageBuffer.type.match(
      imageTypeRegularExpression
    );

    const userUploadedImagePath =
      userUploadedFeedMessagesLocation +
      uniqueRandomImageName +
      '.' +
      imageTypeDetected[1];

    try {
      require('fs').writeFile(
        userUploadedImagePath,
        imageBuffer.data,
        function() {
          console.log(
            'DEBUG - feed:message: Saved to disk image attached by user:',
            userUploadedImagePath
          );
        }
      );
    } catch (error) {
      console.log('ERROR:', error);
    }
  } catch (error) {
    console.log('ERROR:', error);
  }
}
