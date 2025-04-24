# Pino Extended

[![JSR](https://jsr.io/badges/@jazzxp/pino-extended)](https://jsr.io/@jazzxp/pino-extended)
[![NPM Version](https://img.shields.io/npm/v/%40jazzxp%2Fpino-extended)](https://www.npmjs.com/package/@jazzxp/pino-extended)
[![GitHub Release](https://img.shields.io/github/v/release/jazzxp/pino-extended)](https://github.com/JazzXP/pino-extended)

[![License](https://img.shields.io/github/license/jazzxp/pino-extended)](LICENSE)
[![CodeQL](https://github.com/JazzXP/pino-extended/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/JazzXP/pino-extended/actions/workflows/github-code-scanning/codeql)

Extends [Pino](https://getpino.io/#/) with a couple of useful abilities.

Firstly we log on going out of scope (by leveraging Javascript's `using` keyword),
rather than immediately. This allows us to easily compute and log run times.

To go along with that, if you log the same field multiple times, it will convert
it into an array so you won't lose data.

## Installation

### NPM

```bash
npm install @jazzxp/pino-extended
```

### Github

```bash
npm login --scope=@jazzxp --auth-type=legacy --registry=https://npm.pkg.github.com
npm install @jazzxp/pino-extended
```

### JSR

```bash
npx jsr add @jazzxp/pino-extended
```

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
