import { describe, expect, it, vi } from 'vitest';
import { singleLog, startLog } from '.';
import pino, { Level } from 'pino';
describe('Logger Tests', () => {
  it('should output when out of scope', () => {
    // ARRANGE
    const testTime = new Date();
    vi.setSystemTime(testTime);
    let pinoLogger: pino.Logger;
    {
      using log = startLog('TestEvent');
      pinoLogger = log.logger;
      pinoLogger.info = vi.fn();
      log.log({ test: 'test' });
      // ACT
    }
    // ASSERT
    expect(pinoLogger.info).toHaveBeenCalledExactlyOnceWith({
      startTime: testTime,
      endTime: testTime,
      totalTime: 0,
      event: 'TestEvent',
      test: 'test',
    });
  });
  it('should be able to turn existing data to an array', () => {
    // ARRANGE
    const testTime = new Date();
    vi.setSystemTime(testTime);
    let pinoLogger: pino.Logger;
    {
      using log = startLog('TestEvent');
      pinoLogger = log.logger;
      pinoLogger.info = vi.fn();
      log.log({ test: 'test' });
      log.log({ test: 'test2' });
      log.log({ test: 'test3' });
      // ACT
    }
    // ASSERT
    expect(pinoLogger.info).toHaveBeenCalledExactlyOnceWith({
      startTime: testTime,
      endTime: testTime,
      totalTime: 0,
      event: 'TestEvent',
      test: ['test', 'test2', 'test3'],
    });
  });
  it('should be able to do a single log without going out of scope', () => {
    // ARRANGE
    const testTime = new Date();
    vi.setSystemTime(testTime);
    const pinoLogger = pino();
    const spy = vi.spyOn(pinoLogger, 'info');

    singleLog('TestEvent', { test: 'test' }, 'info', pinoLogger);

    // ASSERT
    expect(spy).toHaveBeenCalledExactlyOnceWith({
      startTime: testTime,
      endTime: testTime,
      totalTime: 0,
      event: 'TestEvent',
      test: 'test',
    });
  });
  const levels: Level[] = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];
  it.each(levels)('should be able to test at level %s', (level) => {
    // ARRANGE
    const testTime = new Date();
    vi.setSystemTime(testTime);
    let pinoLogger: pino.Logger;
    {
      using log = startLog('TestEvent');
      pinoLogger = log.logger;
      pinoLogger[level] = vi.fn();
      log[level]({ test: 'test' });
      // ACT
    }
    // ASSERT
    expect(pinoLogger[level]).toHaveBeenCalledExactlyOnceWith({
      startTime: testTime,
      endTime: testTime,
      totalTime: 0,
      event: 'TestEvent',
      test: 'test',
    });
  });
  it.each(levels)(
    'should be able to test at level with default level %s',
    (level) => {
      // ARRANGE
      const testTime = new Date();
      vi.setSystemTime(testTime);
      let pinoLogger: pino.Logger;
      {
        using log = startLog('TestEvent', level);
        pinoLogger = log.logger;
        pinoLogger[level] = vi.fn();
        log.log({ test: 'test' });
        // ACT
      }
      // ASSERT
      expect(pinoLogger[level]).toHaveBeenCalledExactlyOnceWith({
        startTime: testTime,
        endTime: testTime,
        totalTime: 0,
        event: 'TestEvent',
        test: 'test',
      });
    },
  );
});
