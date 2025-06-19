Feature: Get list of Pets by status

    Scenario Outline: Successfully get list of pets with pet "<petStatus>" status
    Given I have a query param with "<petStatus>" status 
    When I submit the query param to the Get List of Pets endpoint
    Then I should receive a 200 response
    And the response should be equal as query param provided
    And the response should be equal as json schema

    Examples:
        | petStatus  |
        | available  |
        | pending    |
        | sold       |