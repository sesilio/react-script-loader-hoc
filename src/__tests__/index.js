import 'babel-polyfill';
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import {render, fireEvent} from 'react-testing-library';
import React from 'react';

const flushPromises = async () => new Promise(resolve => setImmediate(resolve));

const loadingText = 'scripts loading';
const errorText = 'some scripts failed';
const successfulText = 'success';
// eslint-disable-next-line
const TestComponent = ({scriptsLoaded, scriptsLoadedSuccessfully}) => {
  if (!scriptsLoaded) {
    return <div>{loadingText}</div>;
  }

  if (!scriptsLoadedSuccessfully) {
    return <div>{errorText}</div>;
  }

  return <div>{successfulText}</div>;
};

const getScripts = () => document.getElementsByTagName('script');

beforeEach(() => {
  jest.resetModules();

  const scripts = getScripts();

  // eslint-disable-next-line
  const length = scripts.length;

  // crazy stuff to deal with the html collection
  // (its not an array)
  for (let i = 0; i < length; i += 1) {
    scripts[0].remove();
  }
});

test('it will add scripts to the dom with the correct src', () => {
  // need to require here rather than globally due to the cache
  // not resetting with jest.resetModules() with es6 imports
  // eslint-disable-next-line
  const scriptLoader = require('..').default;
  const Component = scriptLoader('test1', 'test2')(TestComponent);

  render(<Component />);

  const scripts = getScripts();

  expect(scripts).toHaveLength(2);
  expect(scripts[0].src).toBe('http://localhost/test1');
  expect(scripts[1].src).toBe('http://localhost/test2');
});

test('initially the scriptsLoaded prop will be passed', () => {
  // eslint-disable-next-line
  const scriptLoader = require('..').default;
  const Component = scriptLoader('test1', 'test2')(TestComponent);
  const {getByText} = render(<Component />);

  expect(getByText(loadingText));
});

test('if both scripts load successfully both props will be true', async () => {
  // eslint-disable-next-line
  const scriptLoader = require('..').default;
  const Component = scriptLoader('test1', 'test2')(TestComponent);
  const {getByText} = render(<Component />);

  const [script1, script2] = getScripts();

  fireEvent.load(script1);
  fireEvent.load(script2);

  await flushPromises();

  expect(getByText(successfulText)).toBeInTheDocument();
});

test('if one scripts loads successfully and the other fails scriptsLoadingSuccessfully will be false', async () => {
  // eslint-disable-next-line
  const scriptLoader = require('..').default;
  const Component = scriptLoader('test1', 'test2')(TestComponent);
  const {getByText} = render(<Component />);

  const [script1, script2] = getScripts();

  fireEvent.load(script1);
  fireEvent.error(script2);

  await flushPromises();

  expect(getByText(errorText)).toBeInTheDocument();
});

test('if both scripts are successful the cache will stop them being readded', async () => {
  // eslint-disable-next-line
  const scriptLoader = require('..').default;
  const Component = scriptLoader('test1', 'test2')(TestComponent);
  render(<Component />);

  const [script1, script2] = getScripts();

  fireEvent.load(script1);
  fireEvent.load(script2);

  await flushPromises();

  const Component2 = scriptLoader('test1', 'test2')(TestComponent);
  render(<Component2 />);

  const newScripts = getScripts();

  expect(newScripts.length).toBe(2);
});

test('if a script fails once it can be rerendered and succeed a second time (its not put in the cache)', async () => {
  // eslint-disable-next-line
  const scriptLoader = require('..').default;
  const Component = scriptLoader('test1', 'test2')(TestComponent);
  render(<Component />);

  const [script1, script2] = getScripts();

  fireEvent.load(script1);
  fireEvent.error(script2);

  await flushPromises();

  expect(getScripts().length).toBe(1);

  const Component2 = scriptLoader('test2')(TestComponent);

  render(<Component2 />);

  const [, newScript2] = getScripts();

  fireEvent.load(newScript2);

  await flushPromises();

  expect(getScripts().length).toBe(2);
});
