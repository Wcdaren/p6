import { createElement, render, renderDom } from './element'
import diff from './diff'
import patch from './patch'

let vertualDom = createElement('ul', { class: 'list' },
    [
        createElement('li', { class: 'item' }, ['a']),
        createElement('li', { class: 'item' }, ['b']),
        createElement('li', { class: 'item' }, ['c']),
    ])
let vertualDom2 = createElement('ul', { class: 'list-groud' },
    [
        createElement('li', { class: 'item' }, ['1']),
        createElement('li', { class: 'item' }, ['b']),
        createElement('div', { class: 'item' }, ['3']),
    ])


let el = render(vertualDom);
// 将虚拟dom转换成真实dom渲染到页面上
renderDom(el, window.root);

let patches = diff(vertualDom, vertualDom2)
// DOM Diff 比较两个虚拟DOM区别 比较两个对象的区别
// dom diff作用 根据两个虚拟对象创建出补丁：描述改变的内容
// ，将这个补丁用来更新dom

// 给元素打补丁，重新更新视图
patch(el,patches);


// 元素互换 会重新渲染
// 新增结点没办法更新