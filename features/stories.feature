@ui
Feature: Story Management in Pivotal Tracker

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

  @US1_FS01_TC3 @login @createFirstProject @deleteFirstProject @functional @regression @PS
  Scenario: Move a story within the backlog
    Given I have created multiple stories in the backlog
    When I move the first story to the top of the backlog
    Then the story should be moved to the new position

  @US1_FS01_TC4 @login @createFirstProject @deleteFirstProject @functional @regression @PS
  Scenario: A "Started" story cannot be moved below "Unstarted" stories
    Given I will create 5 stories for the backlog
    When I enter a story and press the "Start" button
    Then I should not be able to move the started story below unstarted stories

  @US1_FS01_TC5 @login @createFirstProject @deleteFirstProject @functional @regression @PS
  Scenario: Attempt to accept a blocked story shows a warning
    Given I create a new story with title "Blocked Story" and description "This story has a blocker"
    When I enter the story and add a blocker
    And I attempt to accept the blocked story
    Then I should see a warning message about the unresolved blocker and cancel it