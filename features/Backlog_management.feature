@ui
Feature: Backlog Management

@US1_FS02_TC15 @login @createFirstProject @deleteFirstProject @functional @interface
Scenario: Separate and combine Current Iteration and Backlog panels
    Given the Current Iteration_Backlog panel is active
    When I split the Current Iteration and Backlog panels
    Then the Current Iteration and Backlog panels should be separated
    When I combine the Current Iteration and Backlog panels
    Then the Current Iteration and Backlog panels should be combined