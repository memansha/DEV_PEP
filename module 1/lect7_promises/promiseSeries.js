const fs=require("fs");
let f1data=fs.promises.readFile("./f1.txt");

f1data.then(function(data){
    console.log(data+"");
    let f2data=fs.promises.readFile("./f2.txt");
     f2data.then(function(data){
        console.log(data+"");
        let f3data=fs.promises.readFile("./f3.txt");
        f3data.then(function(data){
            console.log(data+"");
        }) 
    })
})