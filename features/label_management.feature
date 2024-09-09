@ui
Feature: Label Management

@US1_FS03_TC01 @login @createFirstProject @deleteFirstProject @functional @regression @PS
Scenario: Create and verify label in the label panel
    Given the label panel is open
    When I click the Add Label button
    And I enter a random name for the label
    And I confirm the creation of the label
    Then the label should be created and visible in the label panel
