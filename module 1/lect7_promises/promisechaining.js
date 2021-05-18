const fs=require("fs");

let f1promise=fs.promises.readFile("./f1.txt");
f1promise.then(function(f1data){
    console.log(f1data+"");
    let f2promise=fs.promises.readFile("./f2.txt");
    return f2promise;
})
.then(function(f2data){
    console.log(f2data+"");
    let f3promise=fs.promises.readFile("./f3.txt");
    return f3promise;
})
.then(function(f3data){
    console.log(f3data+"");
})