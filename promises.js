let fs = require("fs");
console.log("Before")
// call back way of doing async tasks
// fs.readFile("f1.text", function cb(err, data){
//     console.log("data" + data);
// })
let freadPromise = fs.promises.readFile("f1.text");
console.log("promise", freadPromise);
// promise -> resolve -> data
// function pass -> resolve
freadPromise.then(function cb(data){
console.log("Data" + data);
})
//function pass -> reject
freadPromise.catch(function cb(err)
{
console.log("error" + err);
})
console.log("After");