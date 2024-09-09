@ui
Feature: Story Blocking and Acceptance

@US1_FS02_TC25 @login @createFirstProject @deleteFirstProject @functional @regression @PS
Scenario: Attempt to accept a blocked story shows a warning
    Given I create a new story with title "Blocked Story" and description "This story has a blocker"
    When I enter the story and add a blocker
    And I attempt to accept the blocked story
    Then I should see a warning message about the unresolved blocker and cancel it
