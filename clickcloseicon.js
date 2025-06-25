console.log("Make my trip practice");

const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');

(async function sampledemo() {
    let options = new chrome.Options();
    options.addArguments('--headless=new');
    options.addArguments('--disable-gpu');
    //options.addArguments('--start-maximized'); 
    options.addArguments('--window-size=1920,1080');
    options.addArguments('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.199 Safari/537.36');

    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        await driver.get("https://www.makemytrip.com/");
        await driver.manage().window().maximize();
        
        await driver.executeScript("window.scrollTo(0, 0);");

        //await driver.executeScript("document.body.focus();");


        const closebutn = await driver.wait(until.elementLocated(By.xpath("//span[@class='commonModal__close']")), 25000);
        await driver.wait(until.elementIsVisible(closebutn), 20000);
        //await driver.executeScript("arguments[0].scrollIntoView(true);", closebutn);
        //await driver.executeScript("arguments[0].click();", closebutn);
        await closebutn.click();
        console.log("clicked the close icon in the page");

        //await driver.sleep(5000);
        let radio_buttons = await driver.findElements(By.xpath('//ul[@class="fswTabs latoRegular darkGreyText "]//li')); //total elements
        let radio_buttons_length = radio_buttons.length;
        for (let i = 0; i < radio_buttons_length; i++) {
            let option = radio_buttons[i]
            let option_text = await option.getText();
            if (option_text === 'One Way') {
                await option.click();
                console.log("Clicked the one way radio button");
                break;
            }
            else{
                console.log("Unable to click the radio button");
                break;
            }
        } 

    }

    catch (err) {
        console.log("unable to click the close button", err);
        await driver.sleep(5000); 
        let screenshot = await driver.takeScreenshot();
        const screenshotPath = path.join(__dirname, 'error_screenshot.png');
        fs.writeFileSync(screenshotPath, screenshot, 'base64');
        console.log(`Screenshot saved at: ${screenshotPath}`);

    }
    

    finally {
        await driver.quit();
    }

})();