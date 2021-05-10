let matchlink="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
const request=require("request");
const cheerio=require("cheerio");

request(matchlink,cb);
function cb(error,response,data){
    gethighestsixes(data);
}

function gethighestsixes(data){
    let highestsixes;
    let name;
    let strikerate;

    let mydoc=cheerio.load(data);
    let bothbatsmantable=mydoc(".table.batsman");

    for(let i=0;i<bothbatsmantable.length;i++){
        let onebatsmantable=mydoc(bothbatsmantable[i]);
        let allTrs=onebatsmantable.find("tbody tr");
        for(let j=0;j<allTrs.length;j++){
            let allTds=mydoc(allTrs[j]).find("td");
            if(allTds.length>1){
                if(i==0 && j==0){
                    name=mydoc(allTds[0]).text();
                    highestsixes=mydoc(allTds[6]).text();
                    strikerate=mydoc(allTds[7]).text();

                }
                else{
                    let currentsixes=mydoc(allTds[6]).text();
                    let currstrikerate=mydoc(allTds[7]).text();
                    if(currentsixes>highestsixes || (currentsixes==highestsixes && currstrikerate>strikerate)){
                        name=mydoc(allTds[0]).text();
                        highestsixes=currentsixes
                        strikerate=currstrikerate 

                    }
                }
            }
        }
    }

    console.log("name of highestsixes player:"+name);
    console.log("highestsixes:"+highestsixes);
    console.log("strike rate:"+strikerate);
}