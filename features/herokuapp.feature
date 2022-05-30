Feature: Heroku app testing
  Scenario: check that the correct page is loaded
    When I go to "https://the-internet.herokuapp.com/dynamic_controls" 
    And Check the title of the web-page
    Then I click the checkbox and Check it is selected or not
    Then Click on the Remove button using the Xpath selector
    And Wait for the checkbox to be removed
    Then Check the input form

# npx wdio -f cucumber --spec features/herokuapp.feature