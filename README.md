# Goopubtag

![badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/IainMcHugh/6098142efd5a281865b461a4c89acd8e/raw/gpt_coverage_badge.json)

Goopubtag is a modern solution for [Google Publisher tag](https://developers.google.com/publisher-tag/guides/get-started) in React applications. It was heavily inspired by the widely used [react-dfp](https://www.npmjs.com/package/react-dfp) package, and aims to provide a similar DX but with some improvements:

- Functional approach (with hooks) 🪝
- Type safety with typescript 🎉
- Ease of use with debug mode 🛠️
- Support for most recent GPT implementations 🚀

To get started, head over to the [documentation site](https://www.goopubtag.com).

## Installation

At the route of your application, in your terminal run:

```bash
npm install goopubtag # or yarn, pnpm
```

## Usage

After installation is complete, you can start using goopubtag in your application:

```tsx
import { GPTProvider, GPTSlot } from 'goopubtag';
 
const Component = () => {
  return (
    <div>
      <GPTProvider networkId={123456}>
        {/** .. */}
        <GPTSlot slotId="your-slot-id">
      </GPTProvider>
    </div>
  );
}
```
