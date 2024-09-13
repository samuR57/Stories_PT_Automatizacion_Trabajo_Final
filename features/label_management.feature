@ui
Feature: Label Management

@US1_FS03_TC01 @login @createFirstProject @deleteFirstProject @functional
Scenario: Create and verify label in the label panel
    Given the label panel is open
    When I click the Add Label button
    And I enter a random name for the label
    And I confirm the creation of the label
    Then the label should be created and visible in the label panel

@US1_FS03_TC02 @login @createFirstProject @deleteFirstProject @functional
Scenario: Delete a created label from the label panel
    Given the label panel is open for delete
    When I creation label
    When I delete label
    Then the label should no longer be visible in the label panel

@US1_FS03_TC03 @login @createFirstProject @deleteFirstProject @functional
Scenario: Rename a created label in the label panel
    Given the label panel is open for renaming
    When I create a label to rename
    When I rename label
    Then the label should be renamed and visible in the label panel

@US1_FS03_TC04 @login @createFirstProject @deleteFirstProject @functional @integration
Scenario: Assign a created label to a user story in the backlog
    Given I create a label for assigned
    When I create a user story in the backlog with title "Historia de Prueba" and description "Descripción de prueba para la historia" for assigned label
    When I open the labels dropdown in the user story
    When I select the created label from the dropdown
    Then the label should be assigned to the user story