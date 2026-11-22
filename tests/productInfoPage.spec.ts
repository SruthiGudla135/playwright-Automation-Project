import {test, expect} from "../src/fixtures/pageFixtures.js"

test.beforeEach(async ({loginPage})=>{
    await loginPage.goToLoginPage()
    await loginPage.doLogin(process.env.USER_NAME!, process.env.PASSWORD!)
})

test("Verify Product Images Count Test", async ({homePage, searchResultsPage, productInfoPage})=>{
    await homePage.doSearch("macbook")
    await searchResultsPage.selectAndClickProduct("MacBook Pro")
    expect(await productInfoPage.getProductImagesCount()).toBeGreaterThan(2)
})

test("Verify Product Information Test", async ({homePage, searchResultsPage, productInfoPage})=>{
    await homePage.doSearch("macbook")
    await searchResultsPage.selectAndClickProduct("MacBook Pro")
    let completeInfo = await productInfoPage.getCompleteProductInfo()
    expect.soft(completeInfo.get("Brand")).toBe("Apple")
    expect.soft(completeInfo.get("Product Code")).toBe("Product 18")
    expect.soft(completeInfo.get("Reward Points")).toBe("800")
    expect.soft(completeInfo.get("Availability")).toBe("In Stock")
    expect.soft(completeInfo.get("Product Price")).toBe("$2,000.00")
})

test("Verify Common Logo Test @sanity", async ({productInfoPage})=>{
    expect(await productInfoPage.isLogoVisible()).toBeTruthy
})

test("Verify Common Footers Count Test", async ({productInfoPage})=>{
    expect(await productInfoPage.getPageFootersCount()).toBe(15)
})

test("Add Product to Cart and Verify Success Msg Test", async ({homePage, searchResultsPage, productInfoPage})=>{
    await homePage.doSearch("macbook")
    await searchResultsPage.selectAndClickProduct("MacBook Pro")
    expect(await productInfoPage.addProductToCart()).toBeTruthy
})

test("Add Product to Cart and Click on Cart Link Test", async ({homePage, searchResultsPage, productInfoPage})=>{
    await homePage.doSearch("macbook")
    await searchResultsPage.selectAndClickProduct("MacBook Pro")
    expect(await productInfoPage.clickOnShoppingCart()).toBe(false)
})

test("Click on Cart and Verify Cart Page Test", async ({homePage, searchResultsPage, productInfoPage})=>{
    await homePage.doSearch("macbook")
    await searchResultsPage.selectAndClickProduct("MacBook Pro")
    expect(await productInfoPage.clickOnShoppingCart()).toBe(false)
})