@ui
Feature: Story Movement Scenarios

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

@US1_FS01_TC9 @login @createFirstProject @deleteFirstProject @functional @regression @PS
Scenario: Restriction of moving accepted stories
    Given I have created multiple stories in the backlog for move histories accepted
    When I start, finish, deliver, accept, and collapse the story
    Then the accepted story should not be movable within the backlog
