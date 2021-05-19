const puppetteer=require("puppeteer");
let browseropenpromise=puppetteer.launch({headless:false});
console.log(browseropenpromise);
browseropenpromise.then(function(browser){
    console.log("Browser is opened!!");
    return browser.pages();
})
//.then(function(pages){
  //  let tab=pages[0];
    //return tab.goto("https://www.google.com");
//})
.then(function(pages){
    let tab=pages[0];
    return tab.goto("https://www.youtube.com");
})
.then(function(){
    console.log("On Homepages");
})