const title = 'The Internet';
const link = 'https://the-internet.herokuapp.com/dynamic_controls';

describe('Heroku app testing', async function () {
    it('check that the correct page is loaded', async function () {
        await browser.url(link);
        const titleOfThePage = await browser.getTitle();
        console.log(titleOfThePage);
        await expect(titleOfThePage).toMatch(title);
        await $('//h4[text()="Dynamic Controls"]').waitForDisplayed({reverse: false, timeout: 5000});
    });

    it('check the checkbox', async function () {
        await $('#checkbox > input[type=checkbox]').click();
        await $('#checkbox > input[type=checkbox]').isSelected();
        const checkboxSelection = await $('#checkbox > input[type=checkbox]').isSelected();
        console.log(checkboxSelection);

        //Click on the Remove button using the Xpath selector
        await $('//button[text()="Remove"]').click();

        //Wait for the checkbox to be removed
        await $('#checkbox > input[type=checkbox]').waitForDisplayed({reverse: true, timeout: 5000});
        await browser.pause(6000);
        
    });

    it('check the input form', async function () {
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
});


// npx wdio wdio.conf.js --spec specs/herokuapp.js
