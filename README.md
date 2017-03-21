# Buffers and Streams :godmode:

Writing buffers


## Reading large files

Streams are useful because they allow us to read bits of large files as soon as they're available.

This repo has the entire Dracula book within it. :trollface:

We want to print this to the terminal and specify how often a section of text is streamed to the terminal using the command:

`
node our_file.js file_to_be_read.txt seconds(e.g. 1s)
`

**Setting up**
* Get the arguments to be entered in the command line

```javascript
var fs = require('fs');
var file = process.argv[2];
var time = process.argv[3] || null;
var readStream = fs.createReadStream(file, 'utf8');
```

**Error handling**

```javascript
readStream.on('error', (err) => {
  return err;
});
```

**The interesting bit**
* You can pause a stream as it's being read using `nameOfStream.pause()`
* And resume again with `nameOfStream.resume()`

```javascript
readStream.on('data', (chunk) => {
  if (time) {
    readStream.pause();
    var seconds = time.split('s')[0];

    setTimeout(function() {
      readStream.resume();
      console.log(chunk);
    }, 1000 * seconds);

  } else {
    console.log(chunk);
  }
});
```
**End**

```javascript
readStream.on('end', () => {
  console.log('completed');
});
```
