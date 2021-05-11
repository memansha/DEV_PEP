//let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

const request = require("request");
const cheerio = require("cheerio");
const fs= require("fs");

function getmatchdetail(matchLink){
    request(matchLink , cb);

    function cb(error ,response ,data){
        processdata(data);
    }
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
        console.log(teamname);

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
                    processdetails(teamname,batsmanName,runs,balls,fours,Sixes,strikeRate);
                       
                
            }
        }
    }   
        console.log("#################################");

}
    
    function checkteamfolder(teamname){
        let teamfolderpath=`./IPL/${teamname}`;
        return fs.existsSync(teamfolderpath);
    }
    function checkbatsmanfile(teamname,batsmanName){
        let batsmanfilepath= `./IPL/${teamname}/${batsmanName}.json`;
        return fs.existsSync(batsmanfilepath);

    }
    function updatebatsmanfile(teamname,batsmanName,runs,balls,fours,Sixes,strikeRate){
        let batsmanfilepath= `./IPL/${teamname}/${batsmanName}.json`;
        let batsmanfile=JSON.parse(fs.readFileSync(batsmanfilepath));
        let inning={
            Runs:runs,
            Balls:balls,
            Fours:fours,
            sixes:Sixes,
            Strikerate:strikeRate
        }
        batsmanfile.push(inning);
        fs.writeFileSync(batsmanfilepath,JSON.stringify(batsmanfile));

    }
    function createteamfolder(teamname){
        let teamfolderpath=`./IPL/${teamname}`;
        fs.mkdirSync(teamfolderpath);

    }
    function createbatsmanfile(teamname,batsmanName,runs,balls,fours,Sixes,strikeRate){
        let batsmanfilepath= `./IPL/${teamname}/${batsmanName}.json`;
        let batsmanfile=[];
        let inning={
            Runs:runs,
            Balls:balls,
            Fours:fours,
            sixes:Sixes,
            Strikerate:strikeRate
        }
        batsmanfile.push(inning);
        fs.writeFileSync(batsmanfilepath,JSON.stringify(batsmanfile));

    }



    function processdetails(teamname,batsmanName,runs,balls,fours,Sixes,strikeRate){
        let isteamfolder=checkteamfolder(teamname);
        if(isteamfolder){
            let isbatsmanpresent=checkbatsmanfile(teamname,batsmanName);
            if(isbatsmanpresent){
                updatebatsmanfile(teamname,batsmanName,runs,balls,fours,Sixes,strikeRate);

            }
            else{
                createbatsmanfile(teamname,batsmanName,runs,balls,fours,Sixes,strikeRate);

            }

        }
        else{
            createteamfolder(teamname);
            createbatsmanfile(teamname,batsmanName,runs,balls,fours,Sixes,strikeRate)

        }
    }
    

module.exports=getmatchdetail;