import { test, expect } from '@playwright/test';
import LoginPageEkart from '../pages/LoginPageEkart';
import { data } from '../testdata/ekartCred';

test('User Login and Checkout', async ({ page }) => {

    const loginPage = new LoginPageEkart(page);

    // Navigate to application
    await loginPage.navigateUrl(data.urlEkart);
    console.info('Navigated to URL');

    // Login
    await loginPage.login(data.username, data.password);
    console.info('User logged successfully');

    // Verify Products page
    await expect(loginPage.homePage).toBeVisible();
    console.info('User landed on Products page');

    // Verify product
    await expect(loginPage.productName).toBeVisible();
    console.info('Product name verified successfully');

    // Add product to cart
    await loginPage.addToCart();

    // Verify product is added
    await expect(loginPage.productRemove).toBeVisible();
    console.info('Product added to cart successfully');

    // Verify cart count
    await expect(loginPage.cartOne).toHaveText('1');
    console.info('Cart count is 1');

    // Open cart
    await loginPage.openCart();

    // Verify product in cart
    await expect(loginPage.verifyProductName).toHaveText('Sauce Labs Backpack');
    console.info('Product name verified in cart successfully');

    // Click checkout
    await loginPage.checkout();

    // Verify checkout information page
    await expect(loginPage.checkoutPage).toHaveText('Checkout: Your Information');
    console.info('User navigated to checkout page successfully');

    // Enter checkout information
    await loginPage.checkoutInfo(data.firstName,data.lastName,data.pinCode);
    console.info('First name, last name, and pincode added successfully' );

    // Verify checkout overview
    await expect(loginPage.checkOverview).toHaveText('Checkout: Overview');
    console.info('User navigated to checkout overview page successfully');

    // Verify product in checkout overview
    await expect(loginPage.checkOutProductName).toHaveText('Sauce Labs Backpack');
    console.info('Product name verified in checkout overview successfully');

    //verify item price in checkout overview
    await expect(loginPage.itemPrice).toBeVisible();
    console.info('Item price verified in checkout overview successfully');

    //verify total price in checkout overview
    await expect(loginPage.totalPrice).toBeVisible();
    console.info('Total price verified in checkout overview successfully');

    // Click finish
    await loginPage.finish();
    console.info('Clicked on finish button successfully');

    // Verify order completion message
    await expect(loginPage.message).toHaveText('Thank you for your order!');
    console.info('Thank you message verified successfully');

    // Verify order completion message
    await expect(loginPage.orderMessage).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    console.info('Order completion message verified successfully');
});