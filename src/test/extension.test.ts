import * as assert from 'assert';
import * as vscode from 'vscode';
import { toggleConsoleStatement, isConsoleStatement, isCommented } from '../extension';

suite('Console Toggle Extension Tests', () => {

  test('isConsoleStatement should detect console.log', () => {
    assert.strictEqual(isConsoleStatement('console.log("test");'), true);
  });

  test('isConsoleStatement should detect console.error', () => {
    assert.strictEqual(isConsoleStatement('console.error("error");'), true);
  });

  test('isConsoleStatement should detect console.warn', () => {
    assert.strictEqual(isConsoleStatement('console.warn("warning");'), true);
  });

  test('isConsoleStatement should detect console.info', () => {
    assert.strictEqual(isConsoleStatement('console.info("info");'), true);
  });

  test('isConsoleStatement should detect console.debug', () => {
    assert.strictEqual(isConsoleStatement('console.debug("debug");'), true);
  });

  test('isConsoleStatement should handle indented console statements', () => {
    assert.strictEqual(isConsoleStatement('    console.log("test");'), true);
  });

  test('isConsoleStatement should not detect non-console statements', () => {
    assert.strictEqual(isConsoleStatement('const log = "test";'), false);
    assert.strictEqual(isConsoleStatement('console.log.test();'), false);
  });

  test('isCommented should detect commented console statements', () => {
    assert.strictEqual(isCommented('// console.log("test");'), true);
  });

  test('isCommented should not detect uncommented console statements', () => {
    assert.strictEqual(isCommented('console.log("test");'), false);
  });

  test('isCommented should handle commented indented statements', () => {
    assert.strictEqual(isCommented('    // console.log("test");'), true);
  });

  test('toggleConsoleStatement should uncomment console.log', () => {
    const input = '// console.log("test");';
    const expected = 'console.log("test");';
    const result = toggleConsoleStatement(input);
    assert.strictEqual(result, expected);
  });

  test('toggleConsoleStatement should comment console.log', () => {
    const input = 'console.log("test");';
    const expected = '// console.log("test");';
    const result = toggleConsoleStatement(input);
    assert.strictEqual(result, expected);
  });

  test('toggleConsoleStatement should preserve indentation', () => {
    const input = '    // console.log("test");';
    const expected = '    console.log("test");';
    const result = toggleConsoleStatement(input);
    assert.strictEqual(result, expected);
  });

  test('toggleConsoleStatement should handle console.error', () => {
    const input = 'console.error("error");';
    const expected = '// console.error("error");';
    const result = toggleConsoleStatement(input);
    assert.strictEqual(result, expected);
  });

  test('toggleConsoleStatement should handle console.warn', () => {
    const input = 'console.warn("warning");';
    const expected = '// console.warn("warning");';
    const result = toggleConsoleStatement(input);
    assert.strictEqual(result, expected);
  });

  test('toggleConsoleStatement should handle console.info', () => {
    const input = 'console.info("info");';
    const expected = '// console.info("info");';
    const result = toggleConsoleStatement(input);
    assert.strictEqual(result, expected);
  });

  test('toggleConsoleStatement should handle console.debug', () => {
    const input = 'console.debug("debug");';
    const expected = '// console.debug("debug");';
    const result = toggleConsoleStatement(input);
    assert.strictEqual(result, expected);
  });

  test('toggleConsoleStatement should not modify non-console lines', () => {
    const input = 'const x = 5;';
    const result = toggleConsoleStatement(input);
    assert.strictEqual(result, input);
  });

  test('toggleConsoleStatement should handle console with complex arguments', () => {
    const input = 'console.log("Hello", { name: "test" }, 123);';
    const expected = '// console.log("Hello", { name: "test" }, 123);';
    const result = toggleConsoleStatement(input);
    assert.strictEqual(result, expected);
  });

  test('toggleConsoleStatement should handle console in comments', () => {
    const input = '// This is a comment with console.log in it';
    const result = toggleConsoleStatement(input);
    assert.strictEqual(result, input);
  });

  test('toggleConsoleStatement should handle string containing console.log', () => {
    const input = 'const str = "console.log is a function";';
    const result = toggleConsoleStatement(input);
    assert.strictEqual(result, input);
  });

  test('toggleConsoleStatement should handle mixed comment styles', () => {
    const input = '//console.log("test");';
    const expected = 'console.log("test");';
    const result = toggleConsoleStatement(input);
    assert.strictEqual(result, expected);
  });

  test('toggleConsoleStatement should preserve spacing after comment', () => {
    const input = '//  console.log("test");';
    const expected = 'console.log("test");';
    const result = toggleConsoleStatement(input);
    assert.strictEqual(result, expected);
  });
});
