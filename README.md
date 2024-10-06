# tree

## Setup

```
nvm use 21
npm i
npm run test
npm run build
npm run start -- --load-state=/path/to/state.json --save-state=/path/to/state.json
```

`--load-state` and `--save-state` are both optional arguments (so you can only save or only load or both or neither). The files for loading and saving can be different. Saving happens during exit (when user issues an `EXIT` command.)

## Notes
- To exit issue an `EXIT` command without arguements.
- I've changed the error format slightly for consistency and made it more informative.
- `CREATE` command acts like `mkdir -p` in Unix, i.e. it creates the intermediate directories if they don't exist.
- whitespaces inside directory names are not supported, e.g. you cannot do `CREATE "this is the same directory"`
- to `MOVE` something to root do `MOVE a/b/c /` (this will move `c` to root)
    - generally paths starting with `/` are not allowed, but for this specific `MOVE` to root scenario it is used

## TODO (if it was a production situation)
- code is not pretty printed
- for state saving/loading - need to add schema validation of the JSON files
- need to refactor logic to do with `/`. Currently internally the root node is signified by `/`, but you can only use `/` when `MOVE`ing to it. Internally there is some extra character logic for this to work. 
    - I'd need to clarify the requirements. *If we can use `/` at the start of all paths, it would help simplify internal logic too.*



