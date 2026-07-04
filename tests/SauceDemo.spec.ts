import { test } from'@playwright/test';
import { sauceDemoLoginPage } from '../SauceDemo/SauceDemoLoginPage';
import { sauceDemoCartPage } from '../SauceDemo/SauceDemoCartPage';
import { sauceDemoCheckoutPage } from '../SauceDemo/SauceDemoCheckoutPage';
import { sauceDemoHomePage } from '../SauceDemo/SauceDemoHomePage';
import { CsvReader } from '../Utils/CSVReader';


test('Saucedemo Product Sorting and Checkout', async ({ page }) => {
  const csvdata = CsvReader.getDataForTest('testData/testdata.csv', test.info().title);
  const loginPage = new sauceDemoLoginPage(page);
  const sauceHomePage = new sauceDemoHomePage(page);
  const cartPage = new sauceDemoCartPage(page);
  const checkoutPage = new sauceDemoCheckoutPage(page);

  let targetedItem = {};

  await test.step('login into saucedemo', async () => {
    await loginPage.sauceDemoApplicationLaunch(csvdata.url);
    await loginPage.EnterSauceDemoLoginCredential(csvdata.username, csvdata.password);
  });

  await test.step('Validate cart item count', async () => {
    await sauceHomePage.verifyAddToCartButtonCount(6);
  });

  await test.step('verify prices are sorting in ascending order and descending order', async () => {
    await sauceHomePage.verifyPriceSorting();
    // Add an item to the basket so step-7 has a valid product name/price to track
    targetedItem = await sauceHomePage.addFirstProductToCart();
  });

  await test.step('click on cart button', async () => {
    await sauceHomePage.goToCart();
  });

  await test.step('click checkout', async () => {
    await cartPage.clickCheckout();
  });

  await test.step('click continue to goto payment details page', async () => {
    await checkoutPage.fillFormAndContinue(csvdata.firstName, csvdata.lastName, csvdata.postalCode);
  });

  await test.step('verify product name and price are correct', async () => {
    await checkoutPage.verifyProductDetails(csvdata.productName, csvdata.productPrice);
  });

  await test.step('click finish', async () => {
    await checkoutPage.clickFinish();
  });

  await test.step('verify thank you message', async () => {
    await checkoutPage.verifyThankYouMessage();
  });
});
