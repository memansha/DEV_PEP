let matchlink="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
const request = require("request");
const fs=require("fs");
const cheerio=require("cheerio");

request(matchlink ,cb);
function cb(error,response,data){
   // fs.writeFileSync("./match.html",data);
    gethighestwicketTaker(data);
}


//let htmlkadata=fs.readFileSync("./match.html","utf8");


//let matchinfo=mydoc(".status-text span").text();
//console.log(matchinfo);
function gethighestwicketTaker(data){
   let mydoc=cheerio.load(data);
   let bothbowlingtables=mydoc(".table.bowler");
//console.log(bothbowlingtables.length);
//fs.writeFileSync("./bothbowlingtable.html",bothbowlingtables+"");
let highestwicketname;
let highestwickettaken;
let economy;
for(let i=0;i<bothbowlingtables.length;i++){
    let bowlingtable=mydoc(bothbowlingtables[i]);
    let allTrs=bothbowlingtables.find(" tbody tr");

    for(let j=0;j<allTrs.length;j++){
        let allTds=mydoc(allTrs[j]).find("td");
        if(i==0 && j==0){
            highestwicketname=mydoc(allTds[0]).find("a").text();
            highestwickettaken=mydoc(allTds[4]).text();
            economy=mydoc(allTds[5]).text();
        }
        else{
            let currentwickets=mydoc(allTds[4]).text();
            let currenteconomy=mydoc(allTds[5]).text();
            if(currentwickets>highestwickettaken || (currentwickets==highestwickettaken && currenteconomy<economy)){
                highestwicketname=mydoc(allTds[0]).find("a").text();
                highestwickettaken=currentwickets;
                economy=mydoc(allTds[5]).text();
            }
        }
    }
    
}
console.log("highestwicket name:" +highestwicketname);
    console.log("highestwicketTaken:" +highestwickettaken);
    console.log("highesteconomy:" +economy);

}
