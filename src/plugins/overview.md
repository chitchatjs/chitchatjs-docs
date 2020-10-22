# Plugins <Badge text="new" />

Plugins are a great way to enrich your development and reuse as much as possible. Plugins are components that expose more building blocks than what platform provides. They may be higher level conversational constructs such as _"greeting a good morning"_ or a lower level construct such as a rich APL template home screen building block.

## Platform Developed

- `@chitchatjs/alexa` comes with a large set of [building blocks](/building-blocks/core).
- `@chitchatjs/plugin-ax-kit` library contains reusable conversational building blocks which use the building blocks from the `@chitchatjs/alexa` library.

## Examples

Some examples from `@chitchatjs/plugin-ax-kit`:

### Greetings

#### `axkit.greet.hello()`

Greets users when they say "hello" or similar utterances.

```ts
axkit.greet.hello();

// or
axkit.greet.hello("hello there!");

// or
axkit.greet.hello("hello there!", [Locale.en_US, Locale.en_GB]);
```

#### `axkit.greet.about()`

Answers when users ask the Alexa Skill who/what it is.

```ts
axkit.greet.about(); // renders "I'm an Alexa skill"

// or
axkit.greet.about("I'm a custom skill");

// or
axkit.greet.about("I'm a custom skill in en-US and en-GB", [Locale.en_US, Locale.en_GB]);
```

#### `axkit.greet.bye()`

Greets user when they say "bye" or similar utterances.

```ts
axkit.greet.bye();

// or
axkit.greet.bye("good bye!");

// or
axkit.greet.bye("good bye!", [Locale.en_US, Locale.en_GB]);
```

#### `More ..`

```ts
axkit.builtin.help(..)
axkit.builtin.stop(..)
axkit.builtin.fallback(..)
```
