# huex

Super slim and easy data storage. Like Redux\Vuex, but with ease. Written just for fun, not advised for production.

## Getting Started

All you need in Node

### Installing

Just clone this Repository and add it as external module in your package.json file.

## Running the tests

```
npm run test
```

##Usage

Require Huex where you need.
Then instantiate it.
Then add some listeners and you are ready.

```
const Huex = require('huex');

const storage = Huex();

storage.on('change:hello', e => console.log('hello ' + e.value));

storage.hello = 'world';
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


## Last words

I know about perfomance issues, relax. This is just for fun.