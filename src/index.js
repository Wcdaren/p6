import { createElement } from './element'

let vertualDom = createElement('ul', { class: 'list' },
    [
        createElement('li', { class: 'item' }, ['a']),
        createElement('li', { class: 'item' }, ['b']),
        createElement('li', { class: 'item' }, ['c']),
    ])

console.log('====================================');
console.log(vertualDom);
console.log('====================================');