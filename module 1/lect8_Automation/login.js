const puppetteer=require("puppeteer");
const id="yinec56612@isecv.com";
const pass="0987654321";
let tab;
let idx;
let gcode;

let browseropenpromise=puppetteer.launch({headless:false,defaultViewport:null,args:["--start-maximized"]});
//console.log(browseropenpromise);
browseropenpromise.then(function(browser){
    console.log("Browser is opened!!");
    return browser.pages();
})
//.then(function(pages){
  //  let tab=pages[0];
    //return tab.goto("https://www.google.com");
//})
.then(function(pages){
     tab=pages[0];
    return tab.goto("https://www.hackerrank.com/auth/login");
})
.then(function(){
    return tab.type("#input-1",id);
})
.then(function(){
    return tab.type("#input-2",pass);
})
.then(function(){
    return tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
})
//.then(function(){
   //return tab.waitForSelector("#base-card-1-link",{visible:true});
//})
//.then(function(){
  //  return tab.click("#base-card-1-link");
//})
//.then(function(){
  // return tab.waitForSelector('a[data-attr1="warmup"]',{visible:true});
//})
//.then(function(){
   // return tab.click('a[data-attr1="warmup"]');
//})
//writing waitforselector and click functions under one function
.then(function(){
    return waitandclick("#base-card-1-link");
})
.then(function(){
    return waitandclick('a[data-attr1="warmup"]');
})
.then(function(){
    return tab.waitForSelector(".js-track-click.challenge-list-item",{visible:true});
})
.then(function(){
    return tab.$$(".js-track-click.challenge-list-item");
})
.then(function(allquesArray){
    let allpendingpromises=[];
    for(let i=0;i<allquesArray.length;i++){
        let onetag=allquesArray[i];
        let pendingpromise=tab.evaluate(function(element){
            return element.getAttribute("href");
        },onetag);
        allpendingpromises.push(pendingpromise);
    }
    let allpromisecombined=Promise.all(allpendingpromises);
    return allpromisecombined;
})
.then(function(allqueslinks){
    let onequesSolvepromise=solvequestion(allqueslinks[0]);
    for(let i=0;i<allqueslinks;i++){
        onequesSolvepromise=onequesSolvepromise.then(function(){
            let nextquesSolve=solvequestion(allqueslinks[i]);
            return nextquesSolve;
        })
    }
    return onequesSolvepromise;
    
})
.then(function(){
    console.log("All ques solved!!");
})
.catch(function(err){
    console.log(err);
})

function getcode(){
    return new Promise(function(scb,fcb){
        let waitprom=tab.waitForSelector(".hackdown-content h3",{visible:true});
        waitprom.then(function(){
            return tab.$$(".hackdown-content h3");
        })
        .then(function(allcodenameElement){
            let allcodenamePromise=[];

            for(let i=0;i<allcodenameElement.length;i++){
                let codenamePromise=tab.evaluate(function(elem){ return elem.textContent; } , allcodenameElement[i] );
                allcodenamePromise.push(codenamePromise);
            }

            let combinePromise=Promise.all(allcodenamePromise);
            return combinePromise;
        })
        .then(function(allcodename){
            for(let i=0;i<allcodename.length;i++){
                if(allcodename[i]=="C++"){
                    idx=i;
                    break;
                }
            }
            return tab.$$(".hackdown-content .highlight");
        })
        .then(function(allcodediv){
            let codediv=allcodediv[idx];
            return tab.evaluate(function(elem){  return elem.textContent; } ,codediv );
        })
        .then(function(code){
            gcode=code;
            scb();
        })
        .catch(function(error){
            fcb(error);
        })
    })
}

function pastecode(){
    return new Promise(function(scb,fcb){
        let waitandclickprom= waitandclick('.checkbox-input');
        waitandclickprom.then(function(){
            return tab.waitForTimeout(2000);
        })
        .then(function(){
            return tab.type('.custom-input ',gcode);
        })
        .then(function(){
            return tab.keyboard.down("Control");
        })
        .then(function(){
            return tab.keyboard.press("A");
        })
        .then(function(){
            return tab.keyboard.press("X");
        })
        .then(function(){
            return tab.click('.monaco-scrollable-element.editor-scrollable.vs');
        })
        .then(function(){
            return tab.keyboard.press("A");
        })
        .then(function(){
            return tab.keyboard.press("V");
        })
        .then(function(){
            return tab.keyboard.up("Control");
        })
        .then(function(){
            scb();
        })
    })
}

function handleLockbtn(){
    return new Promise(function(scb,fcb){
        let waitforLockbtn=tab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled' , {visible:true , timeout:5000});
        waitforLockbtn.then(function(){
            return tab.$('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
        })
        .then(function(lockbutton){
            return tab.evaluate(function(elem){ return elem.click() } , lockbutton);
        })
        .then(function(){
            //lock button found
            console.log("Lock Button Found");
            scb();
        })
        .catch(function(){
            //lock button not found
            console.log("Lock Button not found");
            scb();
        })
    })
}
 
function solvequestion(queslink){
    return new Promise(function(scb,fcb){
        let gotopromise=tab.goto("https://www.hackerrank.com"+queslink);
        gotopromise.then(function(){
            return waitandclick('div[data-attr2="Editorial"]');
        })
        .then(function(){
            return handleLockbtn();
        })
        .then(function(){
            return getcode();
        })
        .then(function(){
            return tab.click('div[data-attr2="Problem"]');
        })
        .then(function(){
            return pastecode();
        })
        .then(function(){
            return tab.click('.ui-btn.ui-btn-normal.ui-btn-primary ');
        })
        .then(function(){
            scb();
        })
         .catch(function(error){
             fcb(error);
         })
    })
}
function waitandclick(selector){
    return new Promise(function(scb,fcb){
        let waitpromise=tab.waitForSelector(selector,{visible:true});
         waitpromise.then(function(){
             return tab.click(selector);
         })
         .then(function(){
             scb();
         })
         .catch(function(){
             fcb();
         })
    })
    

}