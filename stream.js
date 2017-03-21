var fs = require('fs');
var file = process.argv[2];
var time = process.argv[3];
var seconds = time.split('s')[0];
console.log('seconds', seconds);




var fileContent = '';
var readStream = fs.createReadStream(file, 'utf8');

readStream.on('error', (err) => {
  return err;
});

readStream.on('data', (chunk) => {
  if (seconds) {
    readStream.pause();
    setTimeout(function() {
      readStream.resume();
      console.log(chunk);
    }, 1000 * seconds);


  } else {
    console.log(chunk);
  }


  fileContent += chunk;
});

readStream.on('end', () => {
  console.log('completed');
});
