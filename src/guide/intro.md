# Introduction

## What is Chitchat.js?

Chitchat (or CJS) is a progressive framework for building voice user interfaces (a.k.a. VUI). Chitchat is designed to be incrementally adaptable. Chitchat can be adopted to design a simple rule based voice user interface or as complex as a machine learnt model based VUI. Chitchat comes with two primary components - core library (`@chichatjs/core`), a CLI (`@chitchatjs/cli`) and the implementation strategies (dialog management) which may or may not be platform dependents. We offer `@chitchatjs/alexa` to seamlessly integrate your voice user interface with Alexa.

`@chichatjs/core` is a primitive base that defines core framework premitives that are voice-platform and dialog management strategy independent. `@chitchatjs/cli` provides easy command access to create a project, build and deploy it (only supported for Alexa platform right now). `@chitchatjs/alexa` is a collection of VUI components designed on top of the core library's components that help build Alexa oriented VUI.

## Concepts

Chitchat is designed around three core components:

### 1. State

**State** is a single point-in-time state of a voice application during a dialog between user and agent (a voice enabled virtual assistant system). As user interacts with the application, user events cause the state to change.

### 2. Block

**Block** defines what the agent would do during a certain state. Blocks are highly composable and can define experiences as simple as Greeting Block - `say("hello")` and also complex experiences using smaller blocks, dynamic hooks etc. Blocks are decoupled from states, meaning they can be shared across multiple states. Blocks are replacable, you might use a `compound` block or just use `say` block, it is in your full control. `@chitchatjs/alexa` library comes with some native building Blocks, however, implementing a new blocks is quite easy as well! We will go through that later in this document.

### 3. Coversation

**Conversation** is a collection of states and their transitions in a user-agent dialog. When user interacts with an agent, the dialog may go through multiple states. Conversation is a graph-like visualization of all the states that agent is trained to process.

**Example**, in a Movie Bot, a user might ask for a movie recommendation and then s/he might ask about a cast of that movie, then agent tells about the cast and exits. In this scenario, we go through the following states:

```
INIT
  -> (tell me about star wars) -> AboutMovie
  -> (who plays in it) -> AboutCast
  -> EXIT
```

Here, Conversation is a collection of `AboutMovie` and `AboutCast` states and how they relate to each other.
