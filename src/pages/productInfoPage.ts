import {Locator, Page} from '@playwright/test'
import { BasePage } from './basePage.js';

export class ProductInfoPage extends BasePage{
    readonly productHeaders:Locator
    private readonly productImages:Locator
    private readonly productMetadata:Locator
    private readonly productPrice:Locator
    private readonly addToCartLoc:Locator
    private readonly cartLink:Locator
    private readonly addedToCartSuccessMsg:Locator
    private readonly cartPageContent:Locator
    private readonly map:Map<string,string>

    constructor(page:Page){
        super(page)
        this.productHeaders=page.locator("h1")
        this.productImages=page.locator("//div[@class='image magnific-popup']//img")
        this.productMetadata=page.locator("(//div[@class='col-sm']//ul[@class='list-unstyled'])[1]/li")
        this.productPrice=page.locator("//span[@class='price-new']")
        this.addToCartLoc=page.locator("//button[@id='button-cart']")
        this.cartLink=page.locator("//a[text()='shopping cart']")
        this.addedToCartSuccessMsg=page.locator("//div[contains(@class,'alert-success')]")
        this.cartPageContent=page.getByText("Your shopping cart is empty!")
        this.map=new Map<string,string>
    }

    async getProductHeader():Promise<string>{
        return await this.productHeaders.innerText()
    }

    async getProductImagesCount():Promise<number>{
        await this.productImages.first().waitFor({state:'visible'})
        return await this.productImages.count()
    }

    async getProductMetadata():Promise<void>{
        await this.productMetadata.first().isVisible({timeout: 3000})
        let allData:string[] = await this.productMetadata.allInnerTexts()
        for(let data of allData){
            let allMetadata = data.split(":")
            let mapKey = allMetadata[0].trim()
            let mapValue = allMetadata[1].trim()
            this.map.set(mapKey, mapValue)
        }
    }

    async getProductPrice():Promise<void>{
        let priceInfo = await this.productPrice.innerText()
        this.map.set("Product Price", priceInfo)
    }

    async getCompleteProductInfo():Promise<Map<string,string>>{
        await this.getProductMetadata()
        await this.getProductPrice()
        return this.map
    }

    async addProductToCart():Promise<boolean>{
        await this.addToCartLoc.click()
        return await this.addedToCartSuccessMsg.isVisible()
    }

    async clickOnShoppingCart():Promise<boolean>{
        await this.addToCartLoc.click()
        await this.cartLink.click()
        return await this.cartPageContent.isVisible({timeout: 3000})
    }
}