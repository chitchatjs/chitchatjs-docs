# Conversational Building Blocks <Badge text="new" />

Alexa kit (`@chitchatjs/ax-kit`) library contains reusable conversational building blocks. Some early ones are:

## Greetings

### `axkit.greet.hello()`

Greets users when they say "hello" or similar utterances.

```ts
axkit.greet.hello();

// or
axkit.greet.hello("hello there!");

// or
axkit.greet.hello("hello there!", [Locale.en_US, Locale.en_GB]);
```

### `axkit.greet.about()`

Answers when users ask the Alexa Skill who/what it is.

```ts
axkit.greet.about(); // renders "I'm an Alexa skill"

// or
axkit.greet.about("I'm a custom skill");

// or
axkit.greet.about("I'm a custom skill in en-US and en-GB", [Locale.en_US, Locale.en_GB]);
```

### `axkit.greet.bye()`

Greets user when they say "bye" or similar utterances.

```ts
axkit.greet.bye();

// or
axkit.greet.bye("good bye!");

// or
axkit.greet.bye("good bye!", [Locale.en_US, Locale.en_GB]);
```
