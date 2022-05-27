// noinspection NpmUsedModulesInstalled
const { When, Then, Given } = require('@cucumber/cucumber');
const YAML = require('yaml');
const { Login } = require("../../src/PO/login.po");
const { Navigation } = require("../../src/PO/navigation.po");
const { User } = require("../../src/PO/createUser.po")
const { Subscription } = require("../../src/PO/subscription.po");
const { CustomPage } = require("../../src/PO/custom_page.po");
const { CustomPage2 } = require("../../src/PO/custom_page_2.po");
const { Table } = require("../../src/PO/tables/table.po");
const Subscribe = require('../../src/PO/forms/subscribe.model');
const { default: AllureReporter } = require('@wdio/allure-reporter');
const { addAttachment } = require('@wdio/allure-reporter').default;

When(/^I go to "([^"]*)"$/, async function (url) {
    await browser.url(url);
});

When('I login as: {string}, {string}', async function (login, password) {
    await Login.login({ username: login, password: password });
});

When('I wait {string} for displayed', async function(item){
    const userLabel = await $('#user-label');
    expect(await userLabel.getText()).toEqual(item)
});

// homework homework homework
When('I go to the Create User menu item', async function () {
    await Navigation.goToCreateUser();
    console.log('We login');
});

When('I fill the user form {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}', 
async function (email, password, address1, address2, city, zip, anual, description) {
    const user = {
        email: email,
        password: password,
        address1: address1,
        address2: address2,
        city: city,
        zip: zip,
        anual: anual,
        description: description,
    };
  
    console.log('User data is here: ', { user });
    this.state.user = user;
    // addAttachment('User\' data: ', user, 'application/json');
    await User.createNewUser(user);
});

Then('I go to the List of Users', async function() {
    await Navigation.goToListOfUsers();
});

Then('Check the data {string}, {string}, {string}, {string}, {string}, {string}, {string}', 
async function(email, address1, address2, city, zip, anual, description) {
    await $('//*[text()[contains(.,"List of Users")]]').waitForExist({reverse: false, timeout: 5000});
    const url = await browser.getUrl();
    await expect(url).toMatch('https://viktor-silakov.github.io/course-sut/Users.html');
    
    const user = {
        email: email,
        address1: address1,
        address2: address2,
        city: city,
        zip: zip,
        anual: anual,
        description: description,
    };

    await User.checkUser(user);
});

Then('I go to Create new Subscription', async function() {
    await Navigation.goToCreateSubscription();
});

Then('I create new subscription {string}, {string}, {string}, {string}, {string}, {string}', 
async function (plan, email, years, total, suspend, description2) {
    const newSubscribe = {
        plan: plan,
        years: years,
        user: email,
        total: total,
        suspend: suspend,
        description: description2,
    };

    const user = this.state.user;
    console.log('DATA___DATA::: ', this.state.user);
    AllureReporter.addAttachment('User\' data: ', user, 'application/json');
    AllureReporter.addAttachment('Subscription data: ', newSubscribe, 'application/json');
    await Subscription.createSubscription(newSubscribe);
});

Then('I go to the List of Subscriptions', async function(){
    await Navigation.goToListOfSubscriptions();
});

Then("I check subscription {string}, {string}, {string}, {string}, {string}, {string}", async function (plan, email, years, total, suspend, description2) {
    const oracle = {
        Plan: plan,
        User: email,
        Years: years,
        Total: total,
        Suspend: suspend,
        Description: description2,
    };

    const data = (await Table.data()).filter((item) => item.User === email);
    console.log('DATA PROMISE:::', data[0]);
    await expect(data[0]).toEqual(oracle);
});

Then('Logout', async function() {
    await $('//a[@title="Log out"]').click();
});
