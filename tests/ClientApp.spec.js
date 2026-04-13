const {test,expect} = require('@playwright/test');
const { sign } = require('node:crypto');


test.only('Browser context playwright test',async ({page})=>
{


    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

}
);

test('Page playwright test',async ({page})=>
{
await page.goto("https://google.com");
await console.log(await page.title());
await expect(page).toHaveTitle('Google');

}
);