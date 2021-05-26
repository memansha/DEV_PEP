const puppetteer=require("puppeteer");
const id="yinec56612@isecv.com";
const pass="0987654321";
let challenges=require("./challenges");

async function login(){
    let browser= await puppetteer.launch({headless:false,defaultViewport:null,args:["--start-maximized"]});
    let pages= await browser.pages();
    let tab=pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1",id);
    await tab.type("#input-2",pass);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]' ,{visible:true});
    await tab.waitForTimeout(2000);
    let element=await tab.$('div[data-analytics="NavBarProfileDropDown"]');
    await element.click();
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]',{visible:true});
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
    await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav li',{visible:true});
    let bothli = await tab.$$('.nav-tabs.nav.admin-tabbed-nav li');
    let managechallengeLi=bothli[1];
    await managechallengeLi.click();
    await tab.waitForSelector('.btn.btn-green.backbone.pull-right' , {visible:true});
    let challengeElement=await tab.$('.btn.btn-green.backbone.pull-right');
    let challengeLink=await tab.evaluate(function(elem){  return elem.getAttribute("href") } , challengeElement);
    challengeLink="https://www.hackerrank.com"+challengeLink;

    for(let i=0;i<challenges.length;i++){
        await addchallenge(browser, challengeLink, challenges[i]);
    }

};
login();

async function addchallenge(browser,challengeLink,challenge){
    let newtab=await browser.newPage();
    await newtab.goto(challengeLink);

    let challengename=challenge["Challenge Name"];
    let description=challenge["Description"];
    let problemStatement = challenge["Problem Statement"];
    let Inputformat=challenge["Input Format"];
    let constraints=challenge["Constraints"];
    let outputformat=challenge["Output Format"];
    let tags=challenge["Tags"];

    await newtab.waitForTimeout(2000);
    await newtab.type('#name',challengename);
    await newtab.type('#preview',description);
    await newtab.type('#problem_statement-container .CodeMirror textarea', problemStatement);
    await newtab.type('#input_format-container .CodeMirror textarea' , Inputformat);
    await newtab.type('#constraints-container .CodeMirror textarea', constraints);
    await newtab.type('#output_format-container .CodeMirror textarea',outputformat);
    await newtab.type('#tags_tag',tags);
    await newtab.keyboard.press("Enter");
    await newtab.click('.save-challenge.btn.btn-green');
    await newtab.waitForTimeout(3000);
    await newtab.close();
}