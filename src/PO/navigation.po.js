class Navigation {
    // components of the side bar
    get main() {
        return $('#sidebarMenu');
    }

    get createUser() {
        return this.main.$('//a[text()[contains(.,"Create User")]]');
    }

    get createManager() {
        return this.main.$('//a[text()[contains(.,"Create Manager")]]');
    }

    get createSubscription() {
        return this.main.$('//a[text()[contains(.,"Create Subscription")]]');
    }

    get listOfUsers() {
        return this.main.$('//a[text()[contains(.,"List of users")]]');
    }

    get listOfSubscriptions() {
        return this.main.$('//a[text()[contains(.,"List of Subscriptions")]]');
    }

    // actions
    async goToCreateUser() {
        await this.createUser.click();
        await $('//h3[text()[contains(.,"Create new User")]]')
                .waitForDisplayed({timeoutMsg: 'cannot go to Create User'});
    }

    async goToCreateManager() {
        await this.createManager.click();
        await $('//h3[text()[contains(.,"Create new Manager")]]')
                .waitForDisplayed({timeoutMsg: 'cannot go to Create Manager'});
    }

    async goToCreateSubscription() {
        await this.createSubscription.click();
        await $('//h3[text()[contains(.,"Create new Subscriptions")]]')
                .waitForDisplayed({timeoutMsg: 'cannot go to Create Subscriptions'});
    }

    async goToListOfUsers() {
        await this.listOfUsers.click();
        await $('//h3[text()[contains(.,"List of Users")]]')
                .waitForDisplayed({timeoutMsg: 'cannot go to List Of Users'});
    }

    async goToListOfSubscriptions() {
        await this.listOfSubscriptions.click();
        await $('//h3[text()[contains(.,"List of Subscriptions")]]')
                .waitForDisplayed({timeoutMsg: 'cannot go to List of Subscriptions'});
    }
}

module.exports = { Navigation: new Navigation() }