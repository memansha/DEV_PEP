const puppetteer=require("puppeteer");
const id="reveuse_5";


async function login(){
    let browser=await puppetteer.launch({headless:false,defaultViewport:null,args:["--start-maximized"],slowMo:100});
    let pages=await browser.pages(); 
    let tab=pages[0];
    await tab.goto("https://www.instagram.com/accounts/login/");
    await tab.waitForTimeout(2000);
    await tab.type('input[name="username"]',id,{delay:200});
    await tab.type('input[name="password"]',pass,{delay:200});
    await tab.click('.sqdOP.L3NKy.y3zKF');//login button
    await tab.waitForSelector('span[tabindex="0"]',{visible:true});
    await tab.click('span[tabindex="0"]');
    await tab.waitForTimeout(1000);
    await tab.waitForSelector('svg[aria-label="Profile"]',{visible:true});
    await tab.click('svg[aria-label="Profile"]');
    await tab.waitForTimeout(1000);
    await tab.waitForSelector('a[href="/reveuse_5/following/"]',{visible:true});//select the following icon and click on it
    await tab.click('a[href="/reveuse_5/following/"]');
    //await tab.waitForTimeout(1000);
    //await tab.waitForSelector('a[title="meme.anshaa"]',{visible:true}); //select username and click on it
    //await tab.click('a[title="meme.anshaa"]');
    await tab.waitForTimeout(1000);
    await tab.waitForSelector('a[title="_sakshiaryaa_"]',{visible:true});
    await tab.click('a[title="_sakshiaryaa_"]');
    await tab.waitForTimeout(1000);
    let allTags=await tab.$$('._9AhH0');
    for(let i=0;i<allTags.length;i++){
        let clickOnpost=allTags[i];
        await clickOnpost.click();
        await tab.waitForSelector('.fr66n',{visible:true});
        await tab.click('.fr66n');
        await tab.waitForSelector('._15y0l',{visible:true});
        await tab.click('._15y0l');
        await tab.waitForTimeout(1000);
        await tab.waitForSelector('.Ypffh',{visible:true});
        await tab.type('.Ypffh',"Gorgeous");
        await tab.waitForTimeout(1000);
        await tab.waitForSelector('button[type="submit"]',{visible:true});
        //await tab.keyboard.press("Enter");
        await tab.click('button[type="submit"]');
        await tab.waitForSelector(' ._65Bje.coreSpriteRightPaginationArrow',{visble:true});
        await tab.click(' ._65Bje.coreSpriteRightPaginationArrow');
        
    }
    


    
    
    

    
};
login();
