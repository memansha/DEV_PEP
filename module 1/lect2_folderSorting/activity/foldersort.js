let fs=require("fs");
//const { futimes } = require("fs/promises");
let extensionmapping=require("./util.js");
//console.log(extensionmapping);
let testfolderpath="./downloads";
let allfiles=fs.readdirSync(testfolderpath);
for(let i=0;i<allfiles.length;i++){
    sortfile(allfiles[i]);
}
function getextension(file){
    file=file.split(".");
    return file[1];
} 
function checkextensionfolder(extension){
    let extensionfoldername=testfolderpath;
    for(let key in extensionmapping){
        let extensions=extensionmapping[key];
        if(extensions.includes(extension)){
            extensionfoldername=extensionfoldername+"/"+key;
            break;
        }
    }
    let isfolderexist=fs.existsSync(extensionfoldername);
    if(!isfolderexist){
        fs.mkdirSync(extensionfoldername);
    }
    return extensionfoldername;
}
function movefile(file,extensionfoldername){
    let srcfile=testfolderpath+"/"+file;
    let destfile=extensionfoldername+"/"+file;
    fs.copyFileSync(srcfile,destfile);
    fs.unlinkSync(srcfile);
}
function sortfile(file){
    let extension=getextension(file);
    let extensionfoldername=checkextensionfolder(extension);
    movefile(file,extensionfoldername);
}