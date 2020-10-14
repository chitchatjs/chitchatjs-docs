# Dialog Engine

A dialog engine defines the strategy a dialog manager takes to resolve user inputs and perform system actions. Currently, `AlexaDialogManager` comes with a `RuleBasedDialogEngine` by default. However, it's possible to create another strategy such as machine learnt dialog engine or a more sophisticated rule based or mixed dialog engine.

## Creating a new dialog engine

Implement the interface `DialogEngine` from the core library `@chitchatjs/core`. You will also need to define your own `DialogContext`, `BuilderContext` and `Event` interfaces extending the base definitions.
