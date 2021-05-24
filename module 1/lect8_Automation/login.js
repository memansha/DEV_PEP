const puppetteer=require("puppeteer");
const id="yinec56612@isecv.com";
const pass="0987654321";
let tab;

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
        let pendingpromise=onetag.evaluate(function(element){
            return element.getAttribute("href");
        },onetag);
        allpendingpromises.push(pendingpromise);
    }
    let allpromisecombined=Promise.all(allpendingpromises);
    return allpromisecombined;
})
.then(function(allqueslinks){
    console.log(allqueslinks);
})
.catch(function(err){
    console.log(err);
})

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