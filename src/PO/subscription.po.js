class Subscription {
    // components
    get main() {
        return $('form');
    }

    get plan() {
        return this.main.$('#plan');
    }

    get years() {
        return this.main.$('#years');
    }

    get user() {
        return this.main.$('#user');
    }

    get total() {
        return this.main.$('#total');
    }

    get description() {
        return this.main.$('#description');
    }

    get suspend() {
        return this.main.$('#suspend');
    }

    get createButton() {
        return this.main.$('button');
    }

    // actions
    async createSubscription(form) {
        console.log(form);
        await this.plan.selectByAttribute('value' , form.plan);
        await this.years.setValue(form.years);
        await this.user.selectByVisibleText(form.user); 
        await this.total.setValue(form.total);
        if (form.suspend === 'on') {
            await this.suspend.click();
        }
        await this.description.setValue(form.description);

        await browser.pause(1000);       
        
        await this.createButton.click();
    }
}

module.exports = { Subscription: new Subscription() };
