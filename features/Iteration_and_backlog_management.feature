@ui
Feature: Iteration and Backlog Management

@US1_FS01_TC7 @login @createFirstProject @deleteFirstProject @functional @regression @PS
Scenario: Adjust story points and check recalculated iteration date
    Given I create and adjust story with title "My Story Title" and description "My Story Description"
    When I set the story points to 0
    And I set the iteration length to 1 week
    And I set the velocity to 1
    Then I save the current iteration date
    When I change the story points to 3
    Then the iteration date should have changed

@US1_FS01_TC10 @login @createFirstProject @deleteFirstProject @functional @regression @PS
Scenario: Separate and combine Current Iteration and Backlog panels
    Given the Current Iteration_Backlog panel is active
    When I split the Current Iteration and Backlog panels
    Then the Current Iteration and Backlog panels should be separated
    When I combine the Current Iteration and Backlog panels
    Then the Current Iteration and Backlog panels should be combined