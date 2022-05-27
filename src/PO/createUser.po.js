const UserModel = require("../../src/PO/forms/user.model");

class User {
    // components
    get main() {
        return $('form');
    }

    get email() {
        return this.main.$('#email');
    }

    get password() {
        return this.main.$('#password');
    }

    get address1() {
        return this.main.$('#address1');
    }

    get address2() {
        return this.main.$('#address2');
    }

    get city() {
        return this.main.$('#city');
    }

    get zip() {
        return this.main.$('#zip');
    }

    get description() {
        return this.main.$('#description');
    }

    get createButton() {
        return this.main.$('//button[contains(text(), "Create")]');
    }

    // actions
    async createNewUser(user){
        for (const elModel of UserModel.model) {
            const element = new elModel.type(elModel.selector);
            await element.set(user[elModel.name]);
            await browser.pause(200);
        }
        await this.createButton.click();
    }

    async checkUser(form) {
        console.log('check USER:');
        console.log(form);

        const email = await $(`//*[text()="${form.email}"]/..`);
        const emailText = await email.$('(.//div[@class="tabulator-cell"])[1]').getText();
        await expect(emailText).toEqual(form.email)
        console.log(emailText);
        
        const address1 = await $(`//*[text()="${form.address1}"]/..`);
        const address1Text = await address1.$('(.//div[@class="tabulator-cell"])[3]').getText();
        await expect(address1Text).toEqual(form.address1)
        console.log(address1Text);
        
        const address2 = await $(`//*[text()="${form.address2}"]/..`);
        const address2Text = await address2.$('(.//div[@class="tabulator-cell"])[4]').getText();
        await expect(address2Text).toEqual(form.address2)
        console.log(address2Text);
        
        const cityData = await $(`//*[text()="${form.city}"]/..`);
        const cityText = await cityData.$('(.//div[@class="tabulator-cell"])[5]').getText();
        await expect(cityText).toEqual(form.city)
        console.log(cityText);
        
        const zipData = await $(`//*[text()="${form.zip}"]/..`);
        const zipText = await zipData.$('(.//div[@class="tabulator-cell"])[7]').getText();
        await expect(zipText).toEqual(String(form.zip))
        console.log(zipText);
        
        const anual = await $(`//*[text()="${form.anual}"]/..`);
        const anualText = await anual.$('(.//div[@class="tabulator-cell"])[10]').getText();
        await expect(anualText).toEqual(String(form.anual))
        console.log(anualText);
    
        const description = await $(`//*[text()="${form.description}"]/..`);
        const descriptionText = await description.$('(.//div[@class="tabulator-cell"])[8]').getText();
        await expect(descriptionText).toEqual(form.description)
        console.log(descriptionText);
    }

}

module.exports = { User: new User() };
