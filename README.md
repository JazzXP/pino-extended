# Pino Extended

Extends Pino with a couple of useful abilities.

Firstly we log on going out of scope (by leveraging Javascript's `using` keyword),
rather than immediately. This allows us to easily compute and log run times.

To go along with that, if you log the same field multiple times, it will convert
it into an array so you won't lose data.

## Installation

```bash
npm login --scope=@jazzxp --auth-type=legacy --registry=https://npm.pkg.github.com
npm install @jazzxp/pino-extended
```

or just use your package manager of choice

## Basic Usage

```Javascript
using log = startLog('EventName');
log.log({message: 'message'});
```

## Advanced Usage

### Automatically switch the event to another level

```Javascript
using log = startLog('EventName');
log.error({message: 'message'});
```

### Change the default event level

```Javascript
using log = startLog('EventName', 'warn');
log.log({message: 'message'});
```
