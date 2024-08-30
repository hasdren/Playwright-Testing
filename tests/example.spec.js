import { MainPage } from '../Page Objects/MainPage';
import { MenPage } from '../Page Objects/MenPage';
import { MenHoodiesSweatshirts } from '../Page Objects/MenHoodiesSweatshirts';
import { DetailsPage } from '../Page Objects/DetailsPage';
import { itemDetails, checkoutDetails} from '../data/data';
import { CheckOutPage } from '../Page Objects/CheckOutPage';
import { ReviewPage } from '../Page Objects/ReviewPage';
import { WomenPage } from '../Page Objects/WomenPage';
import { WomanPantsSection } from '../Page Objects/WomenPantsSection';
const { test, expect } = require('@playwright/test');

test('Test Case 1', async({page})=> {
  await page.goto('/')
  const mainPage = new MainPage(page)
  await mainPage.navigateMenSection()
  const menPage = new MenPage(page)
  await menPage.navigateHoodiesSweatshirts()
  const menHoodiesSweatshirts = new MenHoodiesSweatshirts(page)
  await menHoodiesSweatshirts.checkDisplayedjackets()
  await menHoodiesSweatshirts.goToDetailsFrankieSweatshirt(9)
  const detailsPage = new DetailsPage(page)
  await detailsPage.selectAtributesAddToCart(itemDetails)
  await detailsPage.checkAddedProductMatches(itemDetails)
  await detailsPage.proceedToCheckout()
  const checkoutPage = new CheckOutPage(page)
  await checkoutPage.fillCheckoutFields(checkoutDetails)
  await checkoutPage.continue()
  const reviewPage = new ReviewPage(page)
  await reviewPage.assertAddress(checkoutDetails)
  await reviewPage.placeOrder()
});

test.only('Test Case2', async({page})=>{
  await page.goto('/')
  const mainPage = new MainPage(page)
  await mainPage.navigateWomanSection()
  const womanPage = new WomenPage(page)
  await womanPage.navigateToWomenPants()
  const womanPantsSection= new WomanPantsSection(page)
  await womanPantsSection.filterByCheapest()
  await womanPantsSection.addItemToCart(0)
  await womanPantsSection.addItemToCart(1)
  await womanPantsSection.addItemToCart(2)
  await page.pause()

});
