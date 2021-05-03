const fs= require("fs");

let f1kadata=fs.readFileSync("./f1.txt","utf8");

function applySflag(f1kadata){
    let emptyIncluded=false;
    let removespace=[];
    let splitteddata=f1kadata.split("\r\n");
    console.log(splitteddata);

    for(let i=0;i<splitteddata.length;i++){
        if(splitteddata[i]==""&& emptyIncluded==false){
            removespace.push(splitteddata[i]);
            emptyIncluded=true;
        }
        else if(splitteddata[i]!=""){
            removespace.push(splitteddata[i]);
            if(i<splitteddata.length-2)
            emptyIncluded=false;
        }
    }
    let removespaceString=removespace.join("\r\n");
    return removespaceString;
}
let removespaceString=applySflag(f1kadata);
console.log(removespaceString);