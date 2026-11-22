import {Locator, Page} from '@playwright/test'
import { BasePage } from './basePage.js';

export class SearchResultsPage extends BasePage {
    private readonly resultsHeader:Locator
    private readonly searchResults:Locator

    constructor(page:Page){
        super(page)
        this.resultsHeader=page.locator("h1")
        this.searchResults=page.locator("//div[@class='product-thumb']")
    }

    async getSearchPageHeader():Promise<string>{
        return await this.resultsHeader.innerText()
    }

    async getSearchResultsCount():Promise<number>{
        return await this.searchResults.count()
    }

    async selectAndClickProduct(productName:string):Promise<void>{
        let productLocator:Locator = this.page.locator(`(//a[contains(text(),'${productName}')])[2]`)
        console.log(`The product we are going to select is: ${productName}`)
        await productLocator.click()
    }
}