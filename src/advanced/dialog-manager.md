# Dialog Manager

Dialog Manager targets a specific platform such as Alexa, Google, Lex or more. A dialog manager has two underlying components that makes it functional.

1. Dialog Engine - engine defines the strategy how the dialog manager would resolve user inputs and perform system actions.
2. Agent - agent defines the artifacts, business logic and states.

## Creating a new Dialog Manager

To create a new dialog manager, extend the interface `DialogManager` from the `@chitchatjs/core` library and implement the functionality.
