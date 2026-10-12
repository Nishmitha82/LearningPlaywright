/*lick Login.
Verify that the Products page is displayed.
Find the product Sauce Labs Backpack.
Click Add to cart for that product.
Verify that the cart badge displays 1.
Click the shopping cart.
Verify that Sauce Labs Backpack is displayed in the cart.

Click Checkout.
Verify that the Checkout: Your Information page is displayed.
Enter the following customer details:
- First Name: Nishmitha
- Last Name: MJ
- Zip/Postal Code: 411001
Click Continue.
Verify that the Checkout: Overview page is displayed.
Verify that Sauce Labs Backpack is displayed in the order summary.
Verify that the item price is displayed.
Verify that the total price is displayed.
Click Finish.
Verify that the Thank you for your order! message is displayed.
Verify that the order completion message is displayed.*/

import { Locator, Page } from '@playwright/test';

export default class LoginPageEkart {
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly homePage: Locator;
    readonly productName: Locator;
    readonly productAddToCart: Locator;
    readonly productRemove: Locator;
    readonly cartOne: Locator;
    readonly openAddCart: Locator;
    readonly verifyProductName: Locator;
    readonly checkoutButton: Locator;
    readonly checkoutPage: Locator;

    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly pinCode: Locator;
    readonly continue: Locator;
    readonly checkOverview: Locator;

    readonly checkOutProductName:Locator;
    readonly itemPrice:Locator;
    readonly totalPrice: Locator;
    readonly finishButton: Locator;

    readonly message:Locator;
    readonly orderMessage:Locator;

    readonly invalidErrorMessage: Locator;
    readonly loginPage: Locator;


    constructor(private page: Page) {

        this.userName = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.homePage = page.getByText('Products', { exact: true });
        this.productName = page.getByText('Sauce Labs Backpack', { exact: true });
        this.productAddToCart = page.locator('//button[@name="add-to-cart-sauce-labs-backpack"]');
        this.productRemove = page.getByRole('button', {name: 'Remove'});
        this.cartOne = page.locator('.shopping_cart_badge');
        this.openAddCart = page.locator('//a[@class="shopping_cart_link"]');
        this.verifyProductName = page.getByText('Sauce Labs Backpack',{ exact: true } );
        this.checkoutButton = page.getByRole('button', {name: 'Checkout'});
        this.checkoutPage = page.getByText('Checkout: Your Information',{ exact: true });
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.pinCode = page.getByPlaceholder('Zip/Postal Code');
        this.continue = page.getByRole('button', {name: 'Continue'});
        this.checkOverview = page.getByText('Checkout: Overview',{ exact: true });
        this.checkOutProductName=page.getByText('Sauce Labs Backpack',{ exact: true });
        this.itemPrice=page.getByText('$29.99',{exact:true});
        this.totalPrice=page.getByText('Total: $32.39',{exact:true});
        this.finishButton = page.getByRole('button', {name: 'Finish'});
        this.message=page.getByText('Thank you for your order!',{ exact: true });
        this.orderMessage=page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!',{ exact: true });
        this.invalidErrorMessage = page.getByText('Epic sadface: Username and password do not match any user in this service',{ exact: true });
        this.loginPage = page.getByText('Swag Labs',{ exact: true });

    }

    async navigateUrl(url: string) {
        await this.page.goto(url);
    }

    async login(username: string, password: string) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async addToCart() {
        await this.productAddToCart.click();
    }

    async openCart() {
        await this.openAddCart.click();
    }

    async checkout() {
        await this.checkoutButton.click();
    }

    async checkoutInfo(firstName: string,lastName: string,pinCode: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.pinCode.fill(pinCode);
        await this.continue.click();
    }
    async finish()
    {
        await this.finishButton.click();
    }
}