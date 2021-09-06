const { cp } = require("fs");
let puppeteer = require("puppeteer");
// creates headless browser
let browserStartPromise = puppeteer.launch({
    // visible 
    headless: false,
    // type 1sec // slowMo: 1000,
    defaultViewport: null,
    // browser setting 
    args: ["--start-maximized", "--disable-notifications"]
});
let page, browser, rTab;
browserStartPromise
    .then(function (browserObj) {
        console.log("Browser opened");
        // new tab 
        browser = browserObj
        let browserTabOpenPromise = browserObj.newPage();
        return browserTabOpenPromise;
    }).then(function (newTab) {
        page = newTab
        console.log("new tab opened ")
        let gPageOpenPromise = newTab.goto("https://www.google.com/");
        return gPageOpenPromise;
    }).then(function () {
        console.log("Google home page opened");
        // keyboard -> data entry 
        let waitforTypingPromise = page.type("input[title='Search']", "pepcoding");
        return waitforTypingPromise;
    }).then(function () {
        // keyboard -> specific keys
        let enterWillBeDonePromise = page.keyboard.press('Enter', { delay: 100 });
        return enterWillBeDonePromise;
    })
    // .then(function () {
    //     // next page 
    //     //wait for element to be visible on the page-> whenver you go to a new page 
    //     console.log("wait for element to be visible");
    //     let waitForElementPromise = page.waitForSelector(".LC20lb.DKV0Md",
    //         { visible: true });
    //     return waitForElementPromise;
    // }).then(function () {
    //     // mouse function 
    //     let elemClickPromise = page.click(".LC20lb.DKV0Md");
    //     return elemClickPromise;
    // })
    .then(function(){
        console.log("wait for element to be visible");
        let waitPromise=waitAndClick(".LC20lb.DKV0Md",page);
        return waitPromise;
    })
    // .then(function () {
    //     // 30 seconds 
    //     let waitForModalPromise = page.waitForSelector("#lp_modal_close", { visible: true });
    //     return waitForModalPromise;
    // })
    // .then(function () {
    //     let clickModal = page.click("#lp_modal_close", { delay: 100 });
    //     return clickModal;
    // })
    // .then(function(){
    //     let wcPromise=waitAndClick("#lp_modal_close",page);
    //     return wcPromise;
    // })
    .then(function(){
        let wcPromise=handleIfNotPromise("#lp_modal_close",page);
        console.log("wcPromises",wcPromise);
        return wcPromise;
    })
    .then(function () {
        // page element -> cheerio 
        let allLisPromise = page.$$(".site-nav-li"); //$$ use to list all the elements;
        return allLisPromise;
    }).then(function (allElem) {
        let elementWillBeclickedPromise = allElem[7].click({ delay: 100 });
        return elementWillBeclickedPromise;
    }).then(function(){
        let waitPromise = page.waitFor(3000);
        return waitPromise
    })
    // resources page is on next tab and next tab will take some time to open 
    .then(function () {
        // let future2secondAfter = Date.now() + 2000;
        // while (Date.now() < future2secondAfter) {

        // }
        // page.waitFor(2000);
        let listofOpenedTabsPromise = browser.pages(); //select all pages of browser.
        return listofOpenedTabsPromise;
    })
    // .then(function (array) {
    //     rTab = array[array.length - 1];
    //     let waitforLevel1Promise = rTab.waitForSelector('h2[title="Data Structures and Algorithms in Java [Level 1 - Foundation]"]',
    //         { visible: true });
    //     return waitforLevel1Promise;
    // }).then(function () {
    //     let clickLevel1Promise = rTab.click('h2[title="Data Structures and Algorithms in Java [Level 1 - Foundation]"]');
    //     return clickLevel1Promise;
    // })
    .then(function(array){
        rTab=array[array.length - 1];
        let waitforLevel1Promise=waitAndClick('h2[title="Data Structures and Algorithms in Java [Level 1 - Foundation]"]',rTab);
        return waitforLevel1Promise;
    })
    .then(function () {
        console.log("level 1 will be opened");
    })

    //for wait and click we will use the single function;
    function waitAndClick(selector,cPage){
        return new Promise(function (resolve,reject){
            let waitForModalPromise=cPage.waitForSelector(selector, {visible: true});
            waitForModalPromise.then(function(){
                let clickModal=cPage.click(selector, {delay: 100});
                return clickModal;
            }).then(function(){
                resolve();
            }).catch(function(err){
                reject(err);
            })
        })
    }

    //here we will handle with banner is present or not -> code will run;
    function handleIfNotPromise(selector,cPage){
        return new Promise(function(resolve,reject){
            let waitAndClickPromise=waitAndClick(selector,cPage);
                waitAndClickPromise.then(function(){
                    resolve();
                })
                waitAndClickPromise.catch(function(err){
                    resolve();
                })
        })
    }




    // browser.pages -> array of all the open tabs

    // .then(function (array) {
    //     rTab = array[array.length - 1];
    //     let urlPromise = rTab.url();
    //     return urlPromise
    // }).then(function (url) {
    //     console.log(url)
    // })