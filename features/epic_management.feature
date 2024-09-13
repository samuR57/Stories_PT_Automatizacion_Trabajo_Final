@ui
Feature: Epic Management

@US1_FS04_TC01 @login @createFirstProject @deleteFirstProject @functional
Scenario: Create a new Epic
    Given all panels except the Epics panel are closed
    When I press the button to add a new Epic
    And I enter a title for the Epic
    And I press the button to save the Epic
    Then I verify that the Epic was created

@US1_FS04_TC02 @login @createFirstProject @deleteFirstProject @functional
Scenario: Delete an Epic
    Given I have created a new Epic
    When I open the newly created Epic
    And I press the delete button
    And I confirm the deletion

@US1_FS04_TC03 @login @createFirstProject @deleteFirstProject @functional
Scenario: Assign a label to an Epic
    Given I have created a label to assign to the Epic
    And I add a new Epic
    When I open the label dropdown in the Epic
    And I select the created label from the dropdown for epic
    And I save the Epic with the label assigned
    Then I verify that the label is assigned to the Epic