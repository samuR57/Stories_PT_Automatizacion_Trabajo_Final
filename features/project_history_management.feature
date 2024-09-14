@ui
Feature: Project History Management

@US1_FS05_TC01 @login @createFirstProject @deleteFirstProject @functional @integration
Scenario: History of changes made to the Stories module
    Given I have created multiple stories
    And I have created labels
    And I have created epics
    When I open the project history panel
    Then I verify that there are change records in the history