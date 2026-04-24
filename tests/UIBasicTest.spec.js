const {test,expect} = require('@playwright/test');
const { sign } = require('node:crypto');


test('Browser context playwright test',async ({browser})=>
{
const contex = await browser.newContext();
const page =await contex.newPage();
const password = page.locator('#password');
const username = page.locator('#username');
const SignIn= page.locator("#signInBtn");
const cardTitles = page.locator(".card-body a");
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
//await expect(page).toHaveTitle('Google');
await username.fill("rahulshettyacademy");
await password.fill("Learning@830$3mK2");
await SignIn.click();
console.log(await cardTitles.first().textContent());
const allTitles = await cardTitles.allTextContents();
console.log(allTitles);
}
);

test('Page playwright test',async ({page})=>
{
await page.goto("https://google.com");
await console.log(await page.title());
await expect(page).toHaveTitle('Google');

}
);

test('UI controls',async ({page})=>
{
const documentLink = page.locator("[href*=documents-request]");
await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
await page.locator(".radiotextsty").last().click();
await page.locator("#okayBtn").click();
await expect(page.locator(".radiotextsty").last()).toBeChecked();
await page.locator("#terms").click(); 
await expect(page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
expect(await page.locator("#terms").isChecked()).toBeFalsy(); 
const  dropdown =page.locator("select.form-control");
await dropdown.selectOption("consult");
await expect(documentLink).toHaveAttribute("class","blinkingText");

}
);

test.only('@Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
   const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
 
 })