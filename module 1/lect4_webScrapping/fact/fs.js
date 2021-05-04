const fs=require("fs");
const cheerio=require("cheerio");

let htmlkadata=fs.readFileSync("./index.html","utf8");
let mydoc=cheerio.load(htmlkadata);
let  h1data=mydoc("h6").text();
console.log(h1data);