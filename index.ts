import pino from 'pino';

let globalLogger: pino.Logger | undefined;
export const startLog = (
  event: string,
  defaultLogLevel: pino.Level = 'info',
  pinoLogger?: pino.Logger,
) => {
  let localLogger = pinoLogger;
  if (!globalLogger && !pinoLogger) {
    globalLogger = pino();
  }
  if (!pinoLogger) {
    localLogger = globalLogger;
  }
  return new Logger(event, defaultLogLevel, localLogger as pino.Logger);
};

export const singleLog = (
  event: string,
  data: Record<string, unknown>,
  logLevel: pino.Level = 'info',
  pinoLogger?: pino.Logger,
) => {
  using logger = startLog(event, logLevel, pinoLogger);
  logger.log(data);
};

class Logger implements Disposable {
  logger: pino.Logger;
  #currentLogLevel: pino.Level;
  #currentData: Record<PropertyKey, unknown> = {};
  #startTime: Date;

  constructor(event: string, defaultLogLevel: pino.Level, logger: pino.Logger) {
    this.#currentLogLevel = defaultLogLevel;
    this.#startTime = new Date();
    this.logger = logger;
    this.log({ event });
  }
  [Symbol.dispose]() {
    const endTime = new Date();

    this.log({
      startTime: this.#startTime,
      endTime,
      totalTime: endTime.getDate() - this.#startTime.getDate(),
    });
    switch (this.#currentLogLevel) {
      case 'trace':
        this.logger.trace(this.#currentData);
        break;
      case 'debug':
        this.logger.debug(this.#currentData);
        break;
      case 'info':
        this.logger.info(this.#currentData);
        break;
      case 'warn':
        this.logger.warn(this.#currentData);
        break;
      case 'error':
        this.logger.error(this.#currentData);
        break;
      case 'fatal':
        this.logger.fatal(this.#currentData);
        break;
    }
  }
  log(data: Record<string, unknown>): Logger {
    // If field exists, convert to array
    const keys = Object.keys(this.#currentData);
    const dataKeys = Object.keys(data);
    const arrayKeys = keys.filter((k) => dataKeys.includes(k));
    const newData = { ...this.#currentData };
    if (arrayKeys.length > 0) {
      arrayKeys.forEach((k) => {
        let field = newData[k];
        if (Array.isArray(field)) {
          field = [...field, data[k]];
        } else {
          field = [field, data[k]];
        }
        newData[k] = field;
      });
      this.#currentData = { ...this.#currentData, ...newData };
      return this;
    }

    this.#currentData = { ...this.#currentData, ...data };
    return this;
  }
  trace(data: Record<PropertyKey, unknown>): Logger {
    this.#currentLogLevel = 'trace';
    return this.log(data);
  }
  debug(data: Record<PropertyKey, unknown>): Logger {
    this.#currentLogLevel = 'debug';
    return this.log(data);
  }
  info(data: Record<PropertyKey, unknown>): Logger {
    this.#currentLogLevel = 'info';
    return this.log(data);
  }
  warn(data: Record<PropertyKey, unknown>): Logger {
    this.#currentLogLevel = 'warn';
    return this.log(data);
  }
  error(data: Record<PropertyKey, unknown>): Logger {
    this.#currentLogLevel = 'error';
    return this.log(data);
  }
  fatal(data: Record<PropertyKey, unknown>): Logger {
    this.#currentLogLevel = 'fatal';
    return this.log(data);
  }
}
