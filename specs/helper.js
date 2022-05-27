async function login (email, password, link) {
    await browser.url(link);
    await $('#login').setValue(email);
    await $('#password').setValue(password);
    await $('button').click();
    await $('#spinner').waitForDisplayed({reverse: false, timeout: 10000});
    await $('#spinner').waitForDisplayed({reverse: true, timeout: 10000});
}   


module.exports = {login};
