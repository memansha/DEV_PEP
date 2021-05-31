const id = "pamico3332@nic58.com";
const pw = "12345678";
const puppeteer = require("puppeteer");

async function login(){
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
      });
    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1", id);
    await tab.type("#input-2", pw);
    await tab.click( ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]' , {visible:true});
    await tab.waitForTimeout(2000);
    let element = await tab.$('div[data-analytics="NavBarProfileDropDown"]');
    await element.click();
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]' , {visible:true});
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
    await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav li' , {visible:true});
    let bothLis = await tab.$$('.nav-tabs.nav.admin-tabbed-nav li');
    let manageChallengeLi = bothLis[1];
    await manageChallengeLi.click();
    await addmoderator(browser,tab);
    
};
login();

async function addmoderator(browser,tab){
    await tab.waitForSelector('.backbone.block-center',{visible:true});
    let alltags=await tab.$$('.backbone.block-center');
    let allqueslinks=[];
    for(let i=0;i<alltags.length;i++){
        let qlink=await tab.evaluate(function(elem){  return elem.getAttribute("href");} , alltags[i]);
        qlink="https://www.hackerrank.com"+qlink;
        allqueslinks.push(qlink);

    }
    console.log(allqueslinks);
    for(let i=0;i<allqueslinks.length;i++){
        let qlink=allqueslinks[i];
        let newtab=await browser.newPage();
        await addmodToAsingleQues(newtab,qlink);
    }

    let allLis=await tab.$$('.pagination li');
    let nextbtn=allLis[allLis.length-2];
    let isdisabled=await tab.evaluate(function(elem){  return elem.classList.contains("disabled");},nextbtn);
    if(isdisabled){
        return;    // disabled true
    }
    //else if disabled false
    await nextbtn.click();
    await tab.waitForTimeout(2000);
    await addmoderator(browser,tab);


}

async function addmodToAsingleQues(newtab,qlink){
    await newtab.goto(qlink);
    await newtab.waitForTimeout(2000);
    await newtab.click('li[data-tab="moderators"]');
    await newtab.waitForSelector('#moderator',{visible:true});
    await newtab.click('#moderator');
    await newtab.type('#moderator',"MEM");
    await newtab.click('.btn.moderator-save');
    await newtab.click('.save-challenge.btn.btn-green');
    await newtab.waitForTimeout(2000);
    await newtab.close();
}

