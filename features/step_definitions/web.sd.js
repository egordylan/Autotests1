// noinspection NpmUsedModulesInstalled
const { When, Then, Given } = require('@cucumber/cucumber');
const YAML = require('yaml');
const title = 'The Internet';
const { default: AllureReporter } = require('@wdio/allure-reporter');
const { addAttachment } = require('@wdio/allure-reporter').default;

When(/^I go to "([^"]*)"$/, async function (url) {
    await browser.url(url);
});

When('Check the title of the web-page', async function () {
    const titleOfThePage = await browser.getTitle();
    console.log(titleOfThePage);
    await expect(titleOfThePage).toMatch(title);
    await $('//h4[text()="Dynamic Controls"]').waitForDisplayed({reverse: false, timeout: 5000});
});

Then('I click the checkbox and Check it is selected or not', async function(){
    await $('#checkbox > input[type=checkbox]').click();
    await $('#checkbox > input[type=checkbox]').isSelected();
    const checkboxSelection = await $('#checkbox > input[type=checkbox]').isSelected();
    console.log(checkboxSelection);
});

Then('Click on the Remove button using the Xpath selector', async function () {
    await $('//button[text()="Remove"]').click();
});

Then('Wait for the checkbox to be removed', async function () {
    await $('#checkbox > input[type=checkbox]').waitForDisplayed({reverse: true, timeout: 5000});
});

Then('Check the input form', async function() {
    const form = await $('#input-example > input[type="text"]');
        await $('//button[text()="Disable"]').isDisplayed();
        await $('#input-example > button').click();
        await $('//button[text()="Disable"]').waitForDisplayed({reverse: false, timeout: 5000});

        await form.waitForEnabled({timeout: 5000, reverse: false});
        await $('//*[@type="text"]').click();
        const elem = await form.isEnabled();
        console.log(elem);
        await form.setValue('test');
});
