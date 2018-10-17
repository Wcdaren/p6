import { Element, render } from './element'

let allPathes;
let index = 0;

function patch(node, patches) {
    console.log('====================================');
    console.log(node);
    console.log('====================================');
    // 给某个元素打补丁
    allPathes = patches;

    walk(node);
    // 给某个元素打补丁
}

function walk(node) {
    let currentPatch = allPathes[index++];
    let childNodes = node.childNodes;
    childNodes.forEach(child => walk(child));
    if (currentPatch) {
        doPatch(node, currentPatch);
    }

}

const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';

function doPatch(node, patches) {
    patches.forEach(patch => {
        switch (patch.type) {
            case ATTRS:
                for (let key in patch.attrs) {
                    let value = patch.attrs[key];
                    if (value) {
                        setAttr(node, key, value);
                    }else{
                        node.removeAttribute(key);
                    }
                }
                break;
            case TEXT:
                node.textContent = patch.text;
                break;
            case REPLACE:
                let newNode = (patch.newNode instanceof Element) ? render(patch.newNode) : document.createTextNode;
                node.parentNode.replaceChild(newNode, node)
                break
            case REMOVE:
                node.parentNode.removeChild(node);
                break;
            default:
                break;
        }
    })
}

// 设置属性
function setAttr(node, key, value) {
    switch (key) {
        case 'value': // node是一个input或者textarea
            if (node.tagName.toUpperCase() === 'INPUT' ||
                node.tagName.toUpperCase() === 'TEXTAREA') {
                node.value = value;
            } else {
                node.setAttribute(key, value);
            }
            break;
        case 'style':
            node.style.cssText = value;
            break;
        default:
            node.setAttribute(key, value);
            break;
    }
}

export default patch;