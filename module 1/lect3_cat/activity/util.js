let fs=require("fs");

function getfilesdata(files){
    let filesdata="";
    for(let i=0;i<files.length;i++){
        if(!fs.existsSync(files[i])){
            console.log("one or more files doesn't exist!");
            return;
        }
        if(i==files.length-1){
            filesdata+=fs.readFileSync(files[i]);
        }
        else{
            filesdata+=fs.readFileSync(files[i])+"\n";
        }
        
    }
    return filesdata;
}

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

function applyBflag(f1kadata){
    let count=1;
    let splitteddata=f1kadata.split("\r\n");
    for(let i=0;i<splitteddata.length;i++){
        if(splitteddata[i]!=''){
            splitteddata[i]= `${count}.${splitteddata[i]}`;
            count++;
        }
    }
    console.log(splitteddata);
    let bFlaggedstring=splitteddata.join("\r\n");
    return bFlaggedstring;
}

function applyNflag(f1kadata){
    let count=1;
    let splitteddata=f1kadata.split("\r\n");
    for(let i=0;i<splitteddata.length;i++){
        splitteddata[i]=`${count}.${splitteddata[i]}`;
        count++;
    }
    console.log(splitteddata);
    let nFlaggedstring =splitteddata.join("\n");
    return nFlaggedstring;
}


module.exports.getfilesdata=getfilesdata;
module.exports.applySflag=applySflag;
module.exports.applyBflag=applyBflag;
module.exports.applyNflag=applyNflag;

