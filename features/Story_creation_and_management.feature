@ui
Feature: Story Creation And Management in Pivotal Tracker

@US1_FS01_TC1 @login @createFirstProject @deleteFirstProject @functional @regression @PS
Scenario: Create a new story without assigning points
    When I create a new story with title "Story without points" and description "This story does not have assigned points" without assigning points
    Then the story should appear in the backlog
    Then I should not be able to press the "Start" button for the story
    Then the story should not move to "My Work"

@US1_FS01_TC2 @login @createFirstProject @deleteFirstProject @functional @regression @PS
Scenario: Create a new story with assigned points
    When I create a new story with title "Story with points" and description "This story has assigned points" with assigned points
    Then the story with points should appear in the backlog
    Then I should be able to press the "Start" button for the story
    Then the story should move to "Started" and show the "Finish" button
    Then the story should move to "My Work"