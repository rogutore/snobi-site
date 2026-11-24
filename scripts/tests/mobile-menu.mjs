/* Run the actual Header handlers at the touch/focus boundary, without a browser.
   Browser/device navigation must still be verified separately. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const file = new URL('../../components/v3/shell.tsx', import.meta.url);
const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
    esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const effects = [], listeners = new Map();
let ref, focused = false;
class Node {
  constructor(inside) { this.inside = inside; }
}
const summary = new Node(true), link = new Node(true), outside = new Node(false);
const details = {
  open: true,
  contains: node => node?.inside === true,
  removeAttribute: name => { assert.equal(name, 'open'); details.open = false; },
  querySelector: selector => {
    assert.equal(selector, 'summary');
    return { focus: () => { focused = true; } };
  },
};
const jsx = (type, props) => ({ type, props });
const module = { exports: {} };
const boundary = {
  'react': { useRef: () => (ref = { current: details }), useEffect: fn => effects.push(fn) },
  'react/jsx-runtime': { jsx, jsxs: jsx },
  'next/link': { __esModule: true, default: 'Link' },
  'lucide-react': { Menu: 'Menu' },
  '@/components/commerce/cart': { useCart: () => ({ count: 0, open() {} }) },
};
vm.runInNewContext(`(function(require,module,exports){${source}\n})`, {
  Node, document: {
    addEventListener: (name, handler) => listeners.set(name, handler),
    removeEventListener: (name, handler) => {
      assert.equal(listeners.get(name), handler); listeners.delete(name);
    },
  },
})(name => { assert.ok(name in boundary, name); return boundary[name]; }, module, module.exports);
const tree = module.exports.Header();
function all(node) {
  if (!node || typeof node !== 'object') return [];
  return [node, ...[node.props?.children].flat(Infinity).flatMap(all)];
}
const menu = all(tree).find(node => node.type === 'details');
const links = all(menu).filter(node => node.type === 'Link');
assert.ok(links.length > 0);
assert.equal(ref.current, details);
const cleanups = effects.map(effect => effect());

// iPhone touch order: pointerdown inside, summary blur with no related target,
// then the link's navigation. The target must stay visible until navigation.
for (const item of links) {
  details.open = true;
  listeners.get('pointerdown')?.({ target: link });
  menu.props.onBlur?.({ currentTarget: details, relatedTarget: null });
  assert.equal(details.open, true, 'Touch blur must not hide the link before activation');
  listeners.get('focusin')?.({ target: link });
  assert.equal(details.open, true, 'Focusing a link keeps the menu open');
  assert.equal(typeof item.props.onNavigate, 'function');
  item.props.onNavigate({ preventDefault() { assert.fail('Navigation must not be canceled'); } });
  assert.equal(details.open, false, 'Committed navigation closes the menu');
  assert.ok(item.props.href.startsWith('/'));
}
details.open = true;
listeners.get('focusin')?.({ target: summary });
assert.equal(details.open, true);
listeners.get('focusin')?.({ target: outside });
assert.equal(details.open, false, 'Keyboard focus outside closes the menu');
details.open = true;
listeners.get('pointerdown')({ target: outside });
assert.equal(details.open, false, 'Outside tap closes the menu');
details.open = true;
menu.props.onKeyDown({ key: 'Escape' });
assert.equal(details.open, false);
assert.equal(focused, true, 'Escape returns focus to summary');
cleanups.forEach(cleanup => cleanup());
assert.equal(listeners.size, 0, 'Unmount removes listeners');
console.log(`PASS: ${links.length} mobile links survive touch blur; navigation, outside focus/tap, Escape and cleanup`);
