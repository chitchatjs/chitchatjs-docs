# Sample Alexa Skills

You can bootstrap your projects using external templates. Some of the existing templates:

- 👋 [Hello Bot](https://github.com/chitchatjs/hello-bot-template)

```
U: open chitchat hello bot
A: welcome, tell me your name
U: kevindra
A: it's great to talk to you, kevindra, thank you!
```

- 🐶 [Dog Match](https://github.com/chitchatjs/pet-match-template)

A simple dog finder skill that helps you find a ("foo") dog.

```
U: open pet match
A: welcome to pet match...
U: i want a small family dog
A: ok, a small family dog right?
U: yes
A: ok i have a foo dog for small and family ..
```

- 🔢 [High Low Game](https://github.com/chitchatjs/high-low-game)

A game where user guesses a number and Alexa tells if it's too low, high or a match!

```
U: open high low game
A: Welcome to High Low guessing game. Would you like to play?
U: Great! Try saying a number to start the game.
U: twenty
A: 20 is low, try again
U: thirty
A: 30 is high, try again
U: how about twenty nine
A: 29 is correct! Would you like to play again?
..
```

- ☕ [Coffee Shop](https://github.com/chitchatjs/coffee-shop)

A more complex skill that shows two flavors - order coffee and order snacks and multiple slot filling and seamless transition between different states.

```
------ init state ------
U: open coffee shop next door
A: Good day! I have a lot of coffee and snacks. What can I get you?
------ order type state ------
U: i want to order drink
A: ok what kind of drink would you like?
------ order drink state ------
U: two medium hot chocolate please
A: delivery or pickup?
U: for pickup
A: okay, that was 2 medium hot chocolate for pickup, right?
U: can i order snacks
A: okay what kind of snacks would you like?
------ order snacks state ------
U: chips please
A: ok ordered your snack. Anything else?
U: drink also please
A: what kind of drink?
------ order drink state ------
U: same hot chocolate
A: okay, that was 2 medium hot chocolate for pickup, right? (context is preserved)
U: ok ordered!
```

## Installing templates

If you want to install above sample skills as templates in your CJS cli. Go to your `~/.cjs/config.json` and add an entry with the git repo url.

```json
{
  "version": "1.0",
  "templates": [
    {
      "name": "hello-bot",
      "url": {
        "type": "GIT",
        "value": "https://github.com/chitchatjs/hello-bot-template.git"
      }
    },
    {..},
    {
      "name": "<my-template>",
      "url": {
        "type": "GIT",
        "value": "<git-url>"
      }
    }
  ]
}
```
