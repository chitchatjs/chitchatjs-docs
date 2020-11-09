# Core Concepts

Chitchat is designed around three core components:

## 1. Building Block

**Building Blocks** define what the agent would do during a certain state. On a high level, a Block defines two behaviors - 1. how to contribute to the application during the build process, such as generating specific artifacts and 2. how construct the response back to the user during a conversion. It does so by implementing these two interfaces:

```ts
interface Block {
    build: (context: BuildContext): void => {},
    execute: (context: DialogContext, event Event): void => {}
}
```

Blocks are highly composable and can define experiences as simple as Greeting Block - `say("hello")` or complex experiences that make use of smaller blocks, hooks for dynamic data, dynamic conditionalities etc. Blocks are decoupled from states, meaning they can be shared across multiple states. Blocks are replacable, you might use a `compound` block or just use `say` block, you are in full control.

[`@chitchatjs/alexa`](/alexa/overview.html) library comes with a rich set of native Building Blocks along with many plugin for making it really easy to build Alexa Skills. [Creating a new building block](/plugins/writing.html) yourself is quite easy as well!

## 2. State

**State** is a single point-in-time state of a voice application during a dialog between user and agent (a voice enabled virtual assistant system). As user interacts with the application, user events cause the state to change. In CJS, State is a collection of building blocks application uses at a specific point in time to construct an output. For example - "Food ordering" might be a state where you might handle all food ordering related events from the user.

As shown below, an input event and the current state would produce the output based on the configured building blocks and the updated state.

```
event + current state => output + updated state
```

## 3. Agent

**Agent** is where everything comes together. Agent is a collection of states, and how they relate to each other and which user events trigger a transition between states.

**Example**, in a Movie Bot, a user might ask for a movie recommendation and then s/he might ask about a cast of that movie, then agent tells about the cast and exits. In this scenario, we go through the following states:

```ts
INIT
  -> (tell me about star wars) -> AboutMovie
  -> (who plays in it) -> AboutCast
  -> EXIT
```

Here, Agent is a collection of `AboutMovie` and `AboutCast` states.

For Alexa development, we expose `Skill` as an `Agent`, which you will learn about further in this document.
