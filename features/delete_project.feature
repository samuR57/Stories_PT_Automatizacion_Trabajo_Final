@ui
Feature: Create a new project in Pivotal Tracker

@US1_FS1_TC4 @login @createFirstProject @functional @regression
Scenario: Verify that a new project can be deleted
    When I delete a new project
    Then I should see the Dashboard page without new project