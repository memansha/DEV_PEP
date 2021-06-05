module.exports = function () {
    const puppeteer = require("puppeteer");
    const id = "dem070809@gmail.com";
    const password = "mansh070809";
    const prompt = require("prompt-sync")({ sigint: true });
    const inquirer = require("inquirer");
    var nodemailer = require('nodemailer');
    let url;
    let FormLink;
    let title = prompt("Enter Title:");
    let des = prompt("Enter Description:");
    let ques1 = prompt("Enter The Question :");
    async function New() {
        let browser = await puppeteer.launch({
            executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
            slowMo: 100
        });
        let pages = await browser.pages();
        let tab = pages[0];
        await tab.goto("https://docs.google.com/forms/u/0/", { waitUntil: "networkidle2" });
        await tab.waitForTimeout(2000);
        await tab.waitForSelector('input[type="email"]', { visible: true });
        await tab.type('input[type="email"]', id);
        await tab.waitForSelector('#identifierNext', { visible: true });
        await tab.click('#identifierNext');
        await tab.waitForTimeout(2000);
        await tab.waitForSelector('input[type="password"]', { visible: true });
        await tab.type('input[type="password"]', password);
        await tab.click(".VfPpkd-vQzf8d");
        await tab.waitForTimeout(3000);
        await tab.waitForSelector('.docs-homescreen-templates-templateview-preview', { visible: true });
        await tab.click(".docs-homescreen-templates-templateview-preview");
        await tab.waitForSelector('.freebirdFormeditorViewPageSectionTitleRow', { visible: true });
        await tab.waitForTimeout(2000);
        let element = await tab.$('.freebirdFormeditorViewPageSectionTitleRow');
        await element.click();
        await tab.keyboard.down("Control");
        await tab.keyboard.press("A");
        await tab.keyboard.up("Control");
        await tab.keyboard.press("Backspace");
        await tab.type('.freebirdFormeditorViewPageSectionTitleRow', title);
        
        await tab.click('textarea[aria-label="Form description"]');
        await tab.type('textarea[aria-label="Form description"]', des);
        await tab.keyboard.press("Tab");
        await tab.waitForTimeout(2000);
        await tab.waitForSelector('textarea[data-initial-value="Untitled Question"]', { visible: true });
        await tab.type('textarea[data-initial-value="Untitled Question"]', ques1);
        await tab.waitForTimeout(3000);
        url = tab.url();
        
        //first question added
        inquirer
            .prompt([{
                type: "list",
                name: "choice",
                message: "DO YOU WANT TO ADD MORE QUESTIONS",
                choices: [
                    {
                        name: "YES",
                        value: "true",
                    }, {
                        name: "NO",
                        value: "false",
                    },
                ],
            },
            ])
            .then((answers) => {
                if (answers.choice == "true") {
                    let ques2 = getques();
                    addnewques(ques2, browser);
                } else {
                    SaveandMail(browser);
                }
                // link copy and mail
            })
            .catch((error) => {
                console.log(error);
            });
    }
    New();
    function getques() {
        let ques2 = prompt("Enter The Question :");
        return ques2;
    }
    async function addnewques(ques2, browser) {
    
        let pages = await browser.pages();
        let tab = pages[0];
        
        await tab.waitForTimeout(3000);
        await tab.goto(url);
        await tab.waitForTimeout(2000);
        tab.waitForSelector('.freebirdFormeditorViewItemTitleInputWrapper',{visible:true}); //questionkatag
        let element2 = await tab.$$('.freebirdFormeditorViewItemTitleInputWrapper');
        await element2[element2.length-1].click();
        await tab.waitForTimeout(3000);
        await tab.waitForSelector('div[aria-label="Add question"]',{visible:true});//add ques icon
        await tab.click('div[aria-label="Add question"]');
        await tab.keyboard.press("Backspace");
        await tab.waitForSelector('.appsMaterialWizTextinputTextareaContentArea.exportContentArea', { visible: true });
        element = await tab.$$('.appsMaterialWizTextinputTextareaContentArea.exportContentArea');
        await element[0].type(ques2);
        inquirer
            .prompt([{
                type: "list",
                name: "choice",
                message: "DO YOU WANT TO ADD MORE QUESTIONS",
                choices: [
                    {
                        name: "YES",
                        value: "true",
                    }, {
                        name: "NO",
                        value: "false",
                    },
                ],
            },
            ])
            .then((answers) => {

                if (answers.choice == "true") {
                    let ques2 = getques();
                    addnewques(ques2, browser);
                }
                else {
                    SaveandMail(browser);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async function SaveandMail(browser) {
        
        let pages = await browser.pages();
        let tab = pages[0];
        
        await tab.goto(url);
        await tab.waitForTimeout(2000);
        await tab.click('.appsMaterialWizButtonPaperbuttonContent.exportButtonContent');
        await tab.waitForSelector('div[aria-label="Send form via link"]', { visible: true });
        await tab.waitForTimeout(3000);
        await tab.click('div[aria-label="Send form via link"]');
        await tab.waitForTimeout(2000);
        let element = await tab.$$('.quantumWizTextinputPaperinputInput.exportInput');
            let link=element[16];
            await tab.waitForTimeout(2000);
            let formlink = await tab.evaluate(function (elem) { return elem.getAttribute("data-initial-value") }, link);
            console.log(formlink);
    
    
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dem070809@gmail.com',
                pass: 'mansh070809'
            }
        });
        var mailOptions = {
            from: 'dem070809@gmail.com',
            to: 'memansha.05@gmail.com',
            subject: 'Sending Google Form Link',
            text: ` Google Form Link : ${formlink}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent : " + info.response);
            }
        });
        

    }
}