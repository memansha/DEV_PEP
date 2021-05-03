const { getfilesdata , applySflag , applyBflag , applyNflag } = require("./util.js");
let contents=process.argv.slice(2);

const flags=[];
const files=[];

for (let i = 0; i < contents.length; i++) {
    if (contents[i].startsWith("-")) {
      flags.push(contents[i]);
    } else {
      files.push(contents[i]);
    }
  }

  let filesdata=getfilesdata(files);
  if(flags.includes("-s")){
      filesdata=applySflag(filesdata);
  }

  if(flags.includes("-b")&&flags.includes("-n")){
      if(flags.indexOf("-b")<flags.includes("-n")){
          filesdata=applyBflag(filesdata);
      }
      else{
          filesdata=applyNflag(filesdata);
      }
  }
  else if(flags.includes("-b")){
    filesdata=applyBflag(filesdata);
  }
  else if(flags.includes("-n")){
    filesdata=applyNflag(filesdata);
  }
  console.log(filesdata)