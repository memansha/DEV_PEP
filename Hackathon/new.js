
module.exports = function () {
    const puppeteer = require("puppeteer");
    const id = "manshubhaiya7@gmail.com";
    const password = "circuitloveslaila";
    const prompt = require("prompt-sync")({ sigint: true });
    const inquirer = require("inquirer");
    var nodemailer = require('nodemailer');
    let url;
    let FormLink;
    let title = prompt("Enter Title:");
    //title=console.log(`${title}`);
    let des = prompt("Enter Description:");
    //des=console.log(`${des}`);
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
        // await tab.goto("https://docs.google.com/forms/d/1-8fKPNrCAPgGskkmD6KNcFfy8tm-ENYezxScfPpbE3M/edit", { waitUntil: "networkidle2" });
        // await tab.waitForTimeout(3000);
        await tab.waitForSelector('.docs-homescreen-templates-templateview-preview', { visible: true });
        await tab.click(".docs-homescreen-templates-templateview-preview");
        // await tab.waitForSelector('textarea[data-initial-value="Untitled form"]',{visible:true});
        // await tab.waitForTimeout(2000);
        // let element=await tab.$('textarea[data-initial-value="Untitled form"]');
        // await element.click();
        ///await tab.keyboard.press("Backspace");
        // await tab.type('textarea[data-initial-value="Untitled form"]',title);
        await tab.waitForSelector('.freebirdFormeditorViewPageSectionTitleRow', { visible: true });
        await tab.waitForTimeout(2000);
        let element = await tab.$('.freebirdFormeditorViewPageSectionTitleRow');
        await element.click();
        await tab.keyboard.down("Control");
        await tab.keyboard.press("A");
        await tab.keyboard.up("Control");
        await tab.keyboard.press("Backspace");
        await tab.type('.freebirdFormeditorViewPageSectionTitleRow', title);
        //await tab.waitForTimeout(3000);
        await tab.click('textarea[aria-label="Form description"]');
        await tab.type('textarea[aria-label="Form description"]', des);
        await tab.keyboard.press("Tab");
        await tab.waitForTimeout(2000);
        await tab.waitForSelector('textarea[data-initial-value="Untitled Question"]', { visible: true });
        await tab.type('textarea[data-initial-value="Untitled Question"]', ques1);
        await tab.waitForTimeout(3000);
        url = tab.url();
        //await tab.waitForTimeout(3000);

        //freebirdFormeditorViewFatCard
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
                    addnewques(ques2);
                } else {
                    SaveandMail();
                }
                //save and li]k copy and mail


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

    async function addnewques(ques2) {
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
        await tab.goto(url);
        await tab.waitForTimeout(2000);
        await tab.waitForSelector('div[aria-label="Add question"]', { visible: true });
        await tab.click('div[aria-label="Add question"]');
        await tab.waitForTimeout(2000);
        await tab.waitForSelector('textarea[aria-label="Question title"]', { visible: true });
        let element = await tab.$$('textarea[aria-label="Question title"]');
        await element[element.length - 1].type(ques2);


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
                    addnewques(ques2);
                }
                else {
                    SaveandMail();
                }



            })
            .catch((error) => {
                console.log(error);

            });


    }
    async function SaveandMail() {
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
        await tab.goto(url);
        await tab.waitForTimeout(2000);
        await tab.click('.appsMaterialWizButtonPaperbuttonContent.exportButtonContent');
        await tab.waitForSelector('div[aria-label="Send form via link"]', { visible: true });
        await tab.click('div[aria-label="Send form via link"]');




        //https://docs.google.com/forms/d/e/1FAIpQLSf1fbVgCDOAWEteFkIOP4icnmRSYbgcs74VfxjbQ1FcpTzNIw/viewform?usp=sf_lin



        FormLink = "https://docs.google.com/forms/d/e/1FAIpQLSf1fbVgCDOAWEteFkIOP4icnmRSYbgcs74VfxjbQ1FcpTzNIw/viewform?usp=sf_link";


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'masnshubhaiya7@gmail.com',
                pass: 'circuitloveslaila'
            }
        });

        var mailOptions = {
            from: 'manshubhaiya7@gmail.com',
            to: 'memansha.arya57@gmail.com',
            subject: 'Sending Google Form Link',
            text: `Form Link is Ready ${FormLink}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });















    }















}