@ui
Feature: Task Management in Pivotal Tracker

@US1_FS02_TC16 @login @createFirstProject @deleteFirstProject @functional
Scenario: Add random tasks to a story and mark them as complete
    Given I create a story with title "Story with tasks" and description "This story will have tasks" to add tasks
    When I complete data in the story
    When I add random tasks to the story
    Then I mark tasks as complete