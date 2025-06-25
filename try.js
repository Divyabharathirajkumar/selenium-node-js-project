
console.log("Make my trip practice");

const {Builder} =require ('seleniumwebdriver');

(async function sampledemo() {
    let driver=await new Builder().forbrowser('chrome').build();

    try{
       await driver.get("https://www.makemytrip.com/");

       await driver.sleep(5000);

       const closebutn = await driver.findElement(By.CSS("<span data-cy='closeModal' class='commonModal__close'></span>"));
       await closebutn.click();
       Console.log("clicked the close icon in the page");
       await driver.sleep(3000);

    }
    catch(err){
        console.log("unable to click the close button",err);
    

    }
    finally{
        await driver.quit();
    }


    


}

)

