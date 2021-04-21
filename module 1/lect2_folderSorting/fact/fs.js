//fs-->file system
const fs=require("fs");
console.log(fs);

let f1kadata=fs.readFileSync("./f1.txt", "utf-8");
console.log(f1kadata);

fs.writeFileSync("index.html","hello World");
fs.writeFileSync("../activity/activity.js","hi my new file");