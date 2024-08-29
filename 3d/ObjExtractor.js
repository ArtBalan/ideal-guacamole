// Importing the fs module
fs = require('fs');

try {  
    // Intitializing the readFileLines with filename
    var data = fs.readFileSync('source.txt', 'utf8');

    data = data.split("\r\nv");
    let splitedData = [];
    data.forEach(line => {
      splitedData.push(line.split(" "));
    });

    splitedData.filter(e => e[0] == 'v')
    let outStr = [];
    splitedData.forEach(e => {
      outStr.push("["+e[1]+","+e[2]+","+e[3]+"],");
    })

    var finalPath = "out.txt";
    fs.writeFileSync(finalPath, "\r\n", (err) => {
      if (err) console.log(err);
    });
    let writeStream = fs.openSync(finalPath, "r+");
    outStr.forEach((line) => {
      fs.writeSync(writeStream, line + "\n");
    });

}catch(e) {
    // Printing error 
    console.log('Error:', e.stack);
}