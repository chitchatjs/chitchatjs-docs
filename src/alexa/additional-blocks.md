# Additional Building Blocks

## `ax.ssml()` <Badge text="coming soon" /><Badge text="0.3.0+" type="error" />

You can use `ax.ssml()` building block to build SSML (Speech Synthesis Markup Language) output speech. Learn about [SSML primitives here](https://developer.amazon.com/en-US/docs/alexa/custom-skills/speech-synthesis-markup-language-ssml-reference.html).

**Example**

```ts
ax.say(
  ax
    .ssml(
      ax
        .ssml("Five seconds till lift off!")
        .append(
          ax
            .ssml("54321")
            .sayAs(ssml.Interpreter.digits)
            .build()
        )
        .append(ax.ssml("Lift off!").build())
        .build()
    )
    .emotion(ssml.Emotion.excited, ssml.Intensity.medium)
    .build()
);
```

Produces:

```xml
<speak>
    <amazon:emotion name="excited" intensity="medium">
        Five seconds till lift off!
        <say-as interpret-as="digits">54321</say-as>.
        Lift off!
    </amazon:emotion>
</speak>
```

### `.voice()`

```ts
ax.ssml("hello")
  .voice(ssml.Voice.Brian)
  .build();
```

### `.domain()`

```ts
ax.ssml("Latest news: The conversational and news styles are now available!")
  .domain(ssml.Domain.news)
  .build();
```

### `.effect()`

```ts
ax.ssml("I am not a real human.")
  .effect(ssml.Effect.whispered)
  .build();
```

### `.emotion()`

```ts
ax.ssml("Christina wins this round!")
  .emotion(ssml.Emotion.excited, ssml.Intensity.medium)
  .build();
```

### `.appendAudio()`

```ts
ax.ssml("Welcome to Ride Hailer")
  .appendAudio("soundbank://soundlibrary/transportation/amzn_sfx_car_accelerate_01")
  .build();
```

### `.appendBreak()`

```ts
ax.ssml("There is a three second pause here")
  .appendBreak(3000) // 3 seconds break
  .append(ax.ssml("then the speech continues.").build())
  .build();
```

### `.emphasis()`

```ts
ax.ssml("I already told you I ")
  .append(
    ax
      .ssml("really like")
      .emphasis(ssml.EmphasisLevel.strong)
      .build()
  )
  .append(ax.ssml("that person.").build())
  .build();
```

### `.lang()`

```ts
ax.ssml("Paris")
  .lang(Locale.fr_FR)
  .build();
```

### `.paragraph()`

```ts
ax.ssml("This is a paragraph")
  .paragraph()
  .build();
```

### `.phoneme()`

```ts
ax.ssml("pecan")
  .phoneme(ssml.PhoneticAlphabet.ipa, "pɪˈkɑːn")
  .build();
```

### `.volume()`

```ts
ax.ssml("Hello!")
  .volume(ssml.Volume.loud)
  .build();
```

### `.pitch()`

```ts
ax.ssml("Hello!")
  .pitch(ssml.Pitch.medium)
  .build();
```

### `.rate()`

```ts
ax.ssml("Hello")
  .rate(ssml.Rate.medium)
  .build();
```

### `.sentence()`

```ts
ax.ssml("Hello")
  .sentence()
  .build();
```

### `.sayAs()`

```ts
ax.ssml("12345")
  .sayAs(ssml.Interpreters.digits)
  .build();
```

### `.sub()`

```ts
ax.ssml("al")
  .sub("aluminum")
  .build();
```

### `.wordRole()`

```ts
ax.ssml("read")
  .wordRole(ssml.WordRole.vbd)
  .build();
```
