# Using a plugin

You can use a plugin by simply installing it using `npm`.

```sh
npm i @chitchatjs/plugin-ax-kit
```

and then, importing it into the state where you want to add that experience in your skill.

```ts
import { axkit } from "@chitchatjs/plugin-ax-kit";

let welcomeWithName = ax
  .state()
  .block(axkit.greet.hello())
  .build();
```
