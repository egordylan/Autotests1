Feature: User Creation and subscription

  Background:
    When I go to "https://viktor-silakov.github.io/course-sut/"
    When I login as: "walker@jw.com", "password"
    And I wait "John Walker" for displayed

  Scenario Outline: Create user and subscription: "<email>"
    When I go to the Create User menu item
    And I fill the user form "<email>", "<password>", "<address1>", "<address2>", "<city>", "<zip>", "<anual>", "<description>"
    Then I go to the List of Users
    And Check the data "<email>", "<address1>", "<address2>", "<city>", "<zip>", "<anual>", "<description>"
    Then I go to Create new Subscription
    And I create new subscription "<plan>", "<email>", "<years>", "<total>", "<suspend>", "<description2>"
    Then I go to the List of Subscriptions
    And I check subscription "<plan>", "<email>", "<years>", "<total>", "<suspend>", "<description2>"
    Then Logout
    Examples:
        | email          | password   | address1               | address2 | city    | zip    | anual | description  | plan | years | total | description2 | suspend |
        | test@test.com  | U&cmpYsxK9 | Ravala pst 7-21        | flor 3   | Tallinn | 332567 | 100   | test user    | EDU  | 1     | 100   | full         |         |
        | mail@test.com  | a*_mp0KLj3 | Calle de Arganzuela 15 | flor 4   | Madrid  | 280050 | 200   | new user     | PREM | 2     | 400   | monthly      |         |
        | snail@test.com | 3/L5d7rRqs | 92 Main St Bridgeton   | flor 5   | Glasgow | 030201 | 300   | testTESTtest | ENT  | 3     | 900   | year         | on      |


# npx wdio -f cucumber --spec features/createUserHomework-ddt.feature