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
    
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");   
await page.locator(".radiotextsty").last().click();
await page.locator("#okayBtn").click();
await expect(page.locator(".radiotextsty").last()).toBeChecked();
await page.locator("#terms").click(); 
await expect(page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
expect(await page.locator("#terms").isChecked()).toBeFalsy(); 

}
);