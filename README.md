# GPT CodePal 🤖

Test it out at https://gptcodepal.xyz

## [Vue3](https://v3.vuejs.org/) + [Vite](https://vitejs.dev/) + [NaiveUI](https://www.naiveui.com/en-US/os-theme/dark) + [TailwindCSS](https://tailwindcss.com/)

Prompted into existence by [GPT-4](https://openai.com/blog/gpt-4/)

## About

This is a simple chat interface, prompted into existance thanks to early access to GPT-4. I wanted to see how far could the prompting with minor tweaks take me when creating a new app, the result is quite messy and will need further refactor (but works for now).

Note: Created with 8k context model, we'll see the results for 32k.

## What doesn't work (yet)

- [ ] **Stop generating** button
- [ ] Token counting is off, as I'm using GPT-3 library for estimates (more tokens are estimated than spent) 
- [ ] 

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

Rest should be pretty obvious, regular Vue/Vite setup. I'm using [NaiveUI](https://www.naiveui.com/en-US/os-theme/dark) for the UI components, and [TailwindCSS](https://tailwindcss.com/) for the styling.

![image](https://user-images.githubusercontent.com/73316633/230739644-9c26932b-1dd6-492a-b58d-d05f60baae60.png)
![image](https://user-images.githubusercontent.com/73316633/230739685-866ca8c0-ffa6-498f-8e59-03b1f7f6716d.png)
