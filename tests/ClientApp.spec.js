const {test,expect} = require('@playwright/test');
const { sign } = require('node:crypto');

   test.only('@Webst Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const creditNumber = page.locator("//input[@value='4542 9931 9292 2293']");
   const cvvCode = page.locator("(//input[@class='input txt'])[1]");
   const nameOnCard = page.locator("(//input[@class='input txt'])[2]");
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
 
   await page.locator("[routerlink*='cart']").click();
   //await page.pause();
 
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
   await page.locator(await creditNumber.first().click());
   await page.locator(await creditNumber.fill('')); 
   await page.locator(await creditNumber.fill('4542 9931 9292 2293'));
   await page.locator(await cvvCode.fill('779'));
   await page.locator(await nameOnCard.fill('Anshika Saini'));
 
   await page.getByPlaceholder('Select Country').pressSequentially("India", { delay: 150 }) 
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
 
   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
   
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr",{delay:100000});
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th",{delay:100000}).textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button",{delay:100000}).first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator("//th[text()='69e8c2cef86ba51a657cd233']").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
 
});
 

test('Page playwright test',async ({page})=>
{
await page.goto("https://google.com");
await console.log(await page.title());
await expect(page).toHaveTitle('Google');

}
);