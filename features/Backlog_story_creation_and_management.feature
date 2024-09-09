@ui
Feature: Story Creation And Management in Pivotal Tracker

@US1_FS02_TC20 @login @createFirstProject @deleteFirstProject @functional @regression @PS
Scenario: Create a new story without assigning points
    When I create a new story with title "Story without points" and description "This story does not have assigned points" without assigning points
    Then the story should appear in the backlog
    Then I should not be able to press the "Start" button for the story
    Then the story should not move to "My Work"

@US1_FS02_TC21 @login @createFirstProject @deleteFirstProject @functional @regression @PS
Scenario: Create a new story with assigned points
    When I create a new story with title "Story with points" and description "This story has assigned points" with assigned points
    Then the story with points should appear in the backlog
    Then I should be able to press the "Start" button for the story
    Then the story should move to "Started" and show the "Finish" button
    Then the story should move to "My Work"

@US1_FS02_TC22 @login @createFirstProject @deleteFirstProject @functional @regression @PS
Scenario: Adjust story points and check recalculated iteration date
    Given I create and adjust story with title "My Story Title" and description "My Story Description"
    When I set the story points to 0
    And I set the iteration length to 1 week
    And I set the velocity to 1
    Then I save the current iteration date
    When I change the story points to 3
    Then the iteration date should have changed

@US1_FS02_TC23 @login @createFirstProject @deleteFirstProject @functional @regression @PS
Scenario: A story remains in My Work after being changed to Unstarted
    Given I create a specific story with title "My Story Title" and description "My Story Description"
    When I enter the story and start it
    Then the story should be moved to My Work
    When I change the state of the story to "Unstarted"
    Then the story should remain in My Work


@US1_FS02_TC24 @login @createFirstProject @deleteFirstProject @functional @regression @PS
Scenario: Change story state from unstarted to accepted
    Given I have created multiple stories in the backlog and modify one
    When I start, finish, deliver, and accept the story
    Then the accepted story should appear in the accepted stories dropdown
    Then the number of accepted stories should be 1