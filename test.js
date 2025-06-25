console.log("Make my trip practice - running in headless mode");

const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');

(async function sampledemo() {
    let options = new chrome.Options();
    options.addArguments('--headless=new');
    options.addArguments('--disable-gpu');
    options.addArguments('--window-size=1920,1080');
    options.addArguments('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.199 Safari/537.36');

    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    //let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get("https://www.makemytrip.com/");
        await driver.manage().window().maximize();
        await driver.executeScript("document.body.style.zoom='75%'");
        console.log(" zoom out done");


        try {
            
            let closebutton = await driver.findElement(By.xpath("//span[@class='commonModal__close']"));
            await driver.executeScript("arguments[0].click();", closebutton);
            console.log("Closed popup");

        } catch (e) {
            console.log("Could not close a popup");
        }

        //await driver.executeScript("document.body.click();");
        //console.log("clicked the page");
        //await driver.sleep(5000);

        await driver.wait(until.elementsLocated(By.xpath('//ul[@class="fswTabs latoRegular darkGreyText "]//li')), 10000);
        let radio_buttons = await driver.findElements(By.xpath('//ul[@class="fswTabs latoRegular darkGreyText "]//li')); //total elements
        console.log("found radio buttons");

        let radio_buttons_length = radio_buttons.length;
        for (let i = 0; i < radio_buttons_length; i++) {
            let option = radio_buttons[i]
            let option_text = await option.getAttribute("innerText");
            console.log("Got text of buttons");

            if (option_text.trim() === 'One Way') {
                await driver.wait(until.elementIsVisible(option), 5000);
                await driver.executeScript("arguments[0].click();", option);
                //await option.click();
                console.log("Clicked the one way radio button");
                break;

            } else {
                console.log("Unable to click the radio button");
            }
        }


        let frombox = await driver.wait(until.elementLocated(By.xpath('//label[@for="fromCity"]')), 10000);
        await driver.wait(until.elementIsVisible(frombox), 5000);
        await driver.executeScript("arguments[0].click();", frombox);
        console.log("Clicked the from input box");
        await driver.sleep(5000);


        let fromSearch = await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='From']")), 10000);
        //let fromSearch = await driver.wait(until.elementLocated(By.xpath('//input[@type="text" and contains(@class,"react-autosuggest__input")]')), 10000);
        await fromSearch.sendKeys("Chennai");

        let fromOption = await driver.findElement(By.xpath('//li[@role="option"]//p[contains(text(),"Chennai")]'));
        await driver.executeScript("arguments[0].click();", fromOption);
        console.log("Entered chennai");


        let tobox = await driver.wait(until.elementLocated(By.xpath("//label[@for='toCity']")), 10000);
        await driver.wait(until.elementIsVisible(tobox), 5000);
        await driver.executeScript("arguments[0].click();", tobox);
        console.log("Clicked the To input Box");

        let toInput = await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='To']")), 10000);
        await driver.wait(until.elementIsVisible(toInput), 5000);
        await toInput.clear();
        await toInput.sendKeys("Salem");
        console.log("Typed 'Salem' in the To input box");

        await driver.wait(until.elementLocated(By.xpath('//li[@role="option"]//p[contains(text(),"Salem")]')), 10000);
        let toOption = await driver.findElement(By.xpath('//li[@role="option"]//p[contains(text(),"Salem")]'));
        await driver.executeScript("arguments[0].click();", toOption);
        console.log("Selected 'Salem' ");

        
        let dateField = await driver.wait(until.elementLocated(By.xpath("//label[@for='departure']")), 10000);
        await driver.wait(until.elementIsVisible(dateField), 5000);
        await driver.executeScript("arguments[0].click();", dateField);
        console.log("Opened the departure calendar");

        let todayElement = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class,"DayPicker-Day") and contains(@class,"--today")]')), 10000);

        let nextdate= await driver.wait(until.elementLocated(By.xpath('(//div[contains(@class,"DayPicker-Day") and contains(@class,"--today")]/following::div[contains(@class,"DayPicker-Day")])[1]')), 10000);

        await driver.wait(until.elementIsVisible(nextdate), 5000);
        await driver.executeScript("arguments[0].click();", nextdate);
        console.log("Clicked the next day from today");

    }catch (err) {
    console.log("Error occurred", err);
}


finally {
    await driver.quit();
}

}) ();