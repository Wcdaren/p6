import { createElement, render, renderDom } from './element'

let vertualDom = createElement('ul', { class: 'list' },
    [
        createElement('li', { class: 'item' }, ['a']),
        createElement('li', { class: 'item' }, ['b']),
        createElement('li', { class: 'item' }, ['c']),
    ])

let el = render(vertualDom);
// 将虚拟dom转换成真实dom渲染到页面上
renderDom(el,window.root);
console.log('====================================');
console.log(vertualDom);
console.log('====================================');

console.log('====================================');
console.log(el);
console.log('====================================');