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
- To exit issue an `EXIT` command without arguments.
- I've changed the error format slightly for consistency and made it more informative.
- `CREATE` command acts like `mkdir -p` in Unix, i.e. it creates the intermediate directories if they don't exist.
- `CREATE` is idempotent, i.e. it won't error when trying to create a node that already exists. 
- whitespaces inside directory names are not supported, e.g. you cannot do `CREATE "this is a single directory"`
- to `MOVE` something to root do `MOVE a/b/c /` (this will move `c` to root)
    - generally paths starting with `/` are not allowed, but for this specific `MOVE` to root scenario it is used
- `MOVE` of a parent to a child is prohibited
- To run multiple commands simply paste the commands into the terminal

## TODO (if this was a production situation)
I have spent 6 hours to complete this task. The aim was to show my general capability as a software engineer. I hope this project fulfills that purpose. Some things are left undone, I list them here.

- Code is not pretty printed
- For state saving/loading - need to add schema validation of the JSON files
- Need to refactor logic to do with `/`. Currently internally the root node is signified by `/`, but you can only use `/` when `MOVE`ing to it. Internally there is some extra character logic related and unrelated to this. It would benefit from being refactored. 
    - I'd need to clarify the requirements. *If we can use `/` at the start of all paths, it would help simplify internal logic too.*
- Some errors need to be made slightly more clear, e.g. when trying to `CREATE /`
- The task was not to use any libraries, so I didn't use any. In reality of course you would use libraries for much of the functionality I have implemented.
- The code is generally well tested, however for a real project I would have added an integration test that runs the main application as a standalone process (to test how arguments are parsed, how errors and output is propagated, how state is saved and loaded end to end, etc)
- Standard CLI arguments like `--help`, shorthands, etc.
- It's not unthinkable that some bugs may be present. For a real life project more thorough manual testing, but as I said, integration testing would be needed.
- While NodeJS is cross platform, this project has only been tested on MacOS. It is conceivable that some things, especially the ones to do with filesystem, and especially the tests that create temporary directories may not work on other platforms. The chance of that is low, and Linux is most probably going to be fine, but this needs to be noted.
- I was completing this on a machine I don't frequently work on, without my IDE that has spelling check, so there may be some typos.
- **To sum up: more testing, requirements refinement and some refactoring**




