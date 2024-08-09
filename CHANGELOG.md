# goopubtag

## 0.3.0

### Minor Changes

- 3b9657f: Fixed out of page implementation, breaking changes:

  - `outOfPage` prop no longer exists on `GPTSlot`
  - `outOfPage` prop on `GPTProvider` has changed

  - updated readme
  - updated tests
  - added examples for side rail ads
  - fixed console error "div element is already associated with another slot"

## 0.2.3

### Patch Changes

- 941b237: Remove isLoading state, init googletag and cmd as recommended

## 0.2.2

### Patch Changes

- 6bc0420: Enable single request

## 0.2.1

### Patch Changes

- d5df73a: This fixes a bug where the size mapping for responsive ads was not being defined properly

## 0.2.0

### Minor Changes

- a89e501: - Built using tsup minify flag, reducing build size

## 0.1.0

### Minor Changes

- d68f04a: - Add the ability to lazy load units
  - Reduce re-renders with memoization
  - Fix bug in event listeners

## 0.0.6

### Patch Changes

- 5ab382a: Updating all packages

## 0.0.5

### Patch Changes

- Fix peer dependencies bug

## 0.0.4

### Patch Changes

- This change involves:

  - An internal directory restructure
  - Generic Type for Page level targeting in GPTProvider
  - Generic Type for Unit level targeting and slotId in GPTSlot
  - Generic Types for targeting methods in useGPT
  - Comprehensive commenting for better intellisense
