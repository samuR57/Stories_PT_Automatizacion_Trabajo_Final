@ui
Feature: Story Blocking and Acceptance

@US1_FS01_TC5 @login @createFirstProject @deleteFirstProject @functional @regression @PS
Scenario: Attempt to accept a blocked story shows a warning
    Given I create a new story with title "Blocked Story" and description "This story has a blocker"
    When I enter the story and add a blocker
    And I attempt to accept the blocked story
    Then I should see a warning message about the unresolved blocker and cancel it

@US1_FS01_TC6 @login @createFirstProject @deleteFirstProject @functional @regression @PS
Scenario: A story remains in My Work after being changed to Unstarted
    Given I create a specific story with title "My Story Title" and description "My Story Description"
    When I enter the story and start it
    Then the story should be moved to My Work
    When I change the state of the story to "Unstarted"
    Then the story should remain in My Work

@US1_FS01_TC8 @login @createFirstProject @deleteFirstProject @functional @regression @PS
Scenario: Change story state from unstarted to accepted
    Given I have created multiple stories in the backlog and modify one
    When I start, finish, deliver, and accept the story
    Then the accepted story should appear in the accepted stories dropdown
    Then the number of accepted stories should be 1