Feature: Add a new Pet

    Scenario Outline: Successfully add a new pet with pet "<petStatus>" status
    Given I have a pet payload with status "<petStatus>"
    When I submit the payload to the Add Pet endpoint
    Then I should receive a 200 response
    And the response should be equal as payload body provided
    And the response should be equal as json schema

    Examples:
        | petStatus  |
        | available  |
        | pending    |
        | sold       |