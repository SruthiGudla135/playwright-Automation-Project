import {test, expect} from "../src/fixtures/pageFixtures.js"
import { CsvHelper } from "../src/utils/csvUtils.js"

test.beforeEach(async ({loginPage})=>{
    await loginPage.goToLoginPage()
    await loginPage.doLogin(process.env.USER_NAME!, process.env.PASSWORD!)
})

test("Verify Search Header Functionality Test", async ({homePage, searchResultsPage})=>{
    await homePage.doSearch("macbook")
    expect(await searchResultsPage.getSearchPageHeader()).toContain("macbook")
})

test("Verify the Count of Result Products Test", async ({homePage,searchResultsPage})=>{
    await homePage.doSearch("Samsung")
    expect(await searchResultsPage.getSearchResultsCount()).toBeGreaterThan(0)
})

test("Verify the Title of the Product Page Test", async ({homePage,searchResultsPage, page})=>{
    await homePage.doSearch("macbook")
    await searchResultsPage.selectAndClickProduct("MacBook Air")
    await expect(page).toHaveTitle("MacBook Air")
})

let productDetails:Record<string, string>[] = CsvHelper.readCsv("src/testData/productData.csv")

for(let productData of productDetails){
    test(`Verify the Count of Result Products Using CSV for ${productData.searchKey} Test`, async ({homePage,searchResultsPage})=>{
        await homePage.doSearch(productData.searchKey)
        expect(await searchResultsPage.getSearchResultsCount()).toBe(Number(productData.count))
    })

    test(`Verify the Title of the Product Page Using CSV for ${productData.searchKey} Test`, async ({homePage,searchResultsPage, page})=>{
        await homePage.doSearch(productData.searchKey)
        await searchResultsPage.selectAndClickProduct(productData.productName)
        await expect(page).toHaveTitle(productData.productName)
    })
}