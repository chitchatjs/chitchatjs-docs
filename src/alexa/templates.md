# Templates

You can bootstrap your projects using external templates. Some of the existing templates:

- [Hello Bot](https://github.com/chitchatjs/hello-bot-template)

```
U: open chitchat hello bot
A: welcome, tell me your name
U: kevindra
A: it's great to talk to you, kevindra, thank you!
```

- [Pet Match](https://github.com/chitchatjs/pet-match-template)

A simple dog finder skill. Full breakdown available in the [End to End examples section](/alexa/examples).

```
U: open pet match
A: welcome to pet match...
U: i want a small family dog
A: ok, a small family dog right?
A: ok i have a foo dog for small and family ..
```

## Installing templates

Installing template is easy!

Go to your `~/.cjs/config.json`

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
