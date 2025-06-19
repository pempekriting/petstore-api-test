Feature: Add a new Pet

    Scenario Outline: Successfully add a new pet with valid pet status
    Given I have a pet payload with status "<petStatus>"
    When I submit the payload to the Add Pet endpoint
    Then I should receive a 200 response
    And the response should be the same as payload body provided

    Examples:
        | petStatus     |
        | available  |
        | pending    |
        | sold       |