//let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

const request = require("request");
const cheerio = require("cheerio");
const fs= require("fs");

let leaderboard=[];
let countofreq=0;

function getmatchdetail(matchLink){
    console.log("sending request",countofreq)
    request(matchLink ,function (error ,response ,data){
        countofreq--;
        processdata(data);
        console.log("callback",countofreq);
        if(countofreq==0){
            console.table(leaderboard);
        }
    })
    countofreq++;
    
}


function processdata(html){
    let Sixes;
    let batsmanName;
    let strikeRate;
    let runs;
    let fours;
    let balls;

    let myDocument = cheerio.load(html);
    let bothinnings = myDocument(".card.content-block.match-scorecard-table .Collapsible");
    
    for(let i = 0; i<bothinnings.length ; i++){
        let oneinning = myDocument(bothinnings[i]);
        let teamname=oneinning.find("h5").text();
        teamname=teamname.split("INNINGS")[0].trim();
       // console.log(teamname);

        let allTrs = oneinning.find(".table.batsman tbody tr");
        
        for(let j=0 ; j<allTrs.length-1; j++){
            let allTds = myDocument(allTrs[j]).find("td");
            if(allTds.length > 1){
                // inside valid tr
                
                    batsmanName = myDocument(allTds[0]).text().trim();
                    runs=myDocument(allTds[2]).text().trim();
                    balls=myDocument(allTds[3]).text().trim();
                    fours=myDocument(allTds[5]).text().trim();
                    Sixes = myDocument(allTds[6]).text().trim();
                    strikeRate = myDocument(allTds[7]).text().trim();
                    
                    //console.log(`Batsman= ${batsmanName} Runs= ${runs} Balls= ${balls} fours= ${fours} Sixes= ${Sixes} Strike rate= ${strikeRate}`);
                    //processdetails(teamname,batsmanName,runs,balls,fours,Sixes,strikeRate);
                      processlb(teamname,batsmanName,runs,balls,fours,Sixes); 
                
            }
        }
    }   
        //console.log("#################################");

}
 function processlb(teamname,batsmanName,runs,balls,fours,Sixes){
     runs=Number(runs);
     balls=Number(balls);
     fours=Number(fours);
     Sixes=Number(Sixes);
     for(let i=0;i<leaderboard.length;i++){
         let batsmanobj=leaderboard[i];
         if(batsmanobj.Team==teamname && batsmanobj.Batsman==batsmanName){
             batsmanobj.Runs+=runs;
             batsmanobj.Balls+=balls;
             batsmanobj.Fours+=fours;
             batsmanobj.sixes+=Sixes;
             return;
         }
     }
     let batsmanobj={
         Team: teamname,
         Batsman: batsmanName,
         Runs: runs,
         Balls: balls,
         Fours: fours,
         sixes: Sixes
     }
     leaderboard.push(batsmanobj);
 }

    
    
    

module.exports=getmatchdetail;