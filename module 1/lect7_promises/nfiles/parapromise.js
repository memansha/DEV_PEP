let files=["../f1.txt","../f2.txt","../f3.txt"];

const fs=require("fs");
//console.log(files.length);
for(let i=0;i<files.length;i++){
    let filespromise=fs.promises.readFile(files[i]);
    filespromise.then(function(data){
        console.log(data+"");
    })
}
