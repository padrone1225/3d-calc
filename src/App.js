import './App.css';
import React, { useEffect, useRef, useState } from 'react';

const useSetState = (initialState = []) => {
  const [state, setState] = useState(new Set(initialState));
  const add = (item) => setState(state => new Set(state.add(item)));
  const remove = (item) => setState(state => {
    state.delete(item);
    return new Set(state);
  });
  return { set: state, add, remove, has: char => state.has(char) };
};
const useSound = (url) => {
  const sound = useRef(new Audio(url));
  return {
    play: () => sound.current.play(),
    stop: () => {
      sound.current.pause();
      sound.current.currentTime = 0;
    }
  };
};
const Key = ({ char, span, active }) => {
  return (React.createElement("div", { className: ['key', span && 'span', active && 'active'].filter(Boolean).join(' ') },
    React.createElement("div", { className: 'side' }),
    React.createElement("div", { className: 'top' }),
    React.createElement("div", { className: 'char' }, char)));
};
const Column = ({ children }) => (React.createElement("div", { className: 'column' }, children));
const Row = ({ children }) => (React.createElement("div", { className: 'row' }, children));

function App() {
  const { play, stop } = useSound('https://cdn.yoavik.com/codepen/mechanical-keyboard/keytype.mp3');
  const { add, remove, has } = useSetState([]);
  useEffect(() => {
    document.addEventListener('keydown', e => { add(e.key); stop(); play(); });
    document.addEventListener('keyup', e => remove(e.key));
  }, []);
  const keys = (chars, spans = []) => chars.map((char, i) => (React.createElement(Key, { key: char, char: char, span: spans[i] || false, active: has(char) })));
  return (React.createElement("div", { className: 'keyboard' },
    React.createElement(Column, null,
      React.createElement(Row, null, keys(['7', '8', '9'])),
      React.createElement(Row, null, keys(['4', '5', '6'])),
      React.createElement(Row, null, keys(['1', '2', '3'])),
      React.createElement(Row, null, keys(['0', '.'], [true, false]))),
    React.createElement(Column, null, keys(['+', '-'], [true, true])),
    React.createElement("div", { className: 'shade' }),
    React.createElement("div", { className: 'cover' })));
}

export default App;