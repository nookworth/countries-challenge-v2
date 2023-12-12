## Installation
1. Clone this repository

## Running Locally
1. `cd` into the directory for this project on your computer
2. Run `yarn dev` in your terminal
3. Open `https://localhost:8000` in your web browser

## Dependencies
  ### Vite
    Chosen because it is faster than Webpack and works better with some component libraries that may be added in the future (Preline, Ark-UI)
  ### TailwindCSS
    Utility classes and presets are very helpful for speeding up development

  ### @Apollo/Client
    A standard GraphQL client with hooks configured for React

  ### Typescript
    Industry standard

  ### React
    Industry standard

## Development Challenges + Wins
  ### Typed-out Word
  Making the most recent search term appear typed out letter-by-letter was difficult. I tried several approaches using `setTimeout` and `for` loops, but these were frustrated by React's re-renders and the complexity of trying to integrate asynchronicity within loops.

  The winning strategy was calling `setInterval` within a `useEffect`. The interval acts as a loop, using an iterator stored in a `useRef` so that the iterator is not reset upon every new render. Upon each interval, a piece of state is updated to contain one more letter each time.

  The biggest challenges with this approach were:

  1. an issue where the second letter in the search term was skipped. I bypassed the issue by converting the term to an array before converting it back to a string for rendering but I don't understand why this worked.   
  2. knowing how to terminate the looping interval. I ended up using another piece of state that gets set to true or false and controls when the loop can start and stop.

  ### Country details popover
  I wanted to use the new Popover API (https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) but ran into TypeScript and React issues. I switched to using a `<dialog>` element instead. There are still some buggy behaviors with the animation (especially on Firefox), and I could not get the exact spacing and sizing of the modal that I wanted, but it worked well overall.

