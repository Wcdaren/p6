function diff(oldTrss, newTree) {
    let patches = {

    }
    let index = 0;
    // 递归树 比较后的结果放到补丁包中
    walk(oldTrss, newTree, index, patches);

    return patches;
}

function diffAttr(oldAttrs, newAttrs) {
    let patch = {};
    // 判断老的属性和新的属性的关系
    for (let key in oldAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            //有可能是undefind
            patch[key] = newAttrs[key];
        }
    }

    for (let key in newAttrs) {
        // 老节点没有新节点的属性
        if (!oldAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key];
        }
    }
    return patch;
}

const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
let Index = 0;

function diffChildren(oldChildren, newChildren, patches) {
    // 比较老的第一个和新的第一个
    oldChildren.forEach((child, idx) => {
        // 索引不应该是index了
        // index 每次传递给walk时 index是递增的
        //  所有的人都基于一个序号来实现
        walk(child, newChildren[idx], ++Index, patches)
    })
}

function isString(node) {
    // console.log('====================================');
    // console.log(Object.prototype.toString.call(node));
    // console.log('====================================');
    return Object.prototype.toString.call(node) === '[object String]';
}

function walk(oldNode, newNode, index, patches) {
    // 每个元素都有一个补丁对象
    let currentPatch = [];
    // console.log('====================================');
    // console.log(isString(oldNode));
    // console.log(isString(newNode));
    // console.log('====================================');
    if (!newNode) {
        currentPatch.push({ type: REMOVE, index })
    } else if (isString(oldNode) && isString(newNode)) {
        if (oldNode !== newNode) {
            currentPatch.push({ type: TEXT, text: newNode })
        }
    } else if (oldNode.type === newNode.type) {
        // 比较属性是否有更改
        let attrs = diffAttr(oldNode.props, newNode.props);
        if (Object.keys(attrs).length > 0) {
            currentPatch.push({ type: ATTRS, attrs })
        }
        // 如果有儿子节点就要去遍历儿子节点
        diffChildren(oldNode.children, newNode.children, patches);
    } else {
        currentPatch.push({ type: REPLACE, newNode });
    }
    if (currentPatch.length) {
        // 当前元素确实有补丁
        // 将元素和补丁对应起来 放到大补丁包中
        patches[index] = currentPatch;
        console.log('====================================');
        console.log(patches);
        console.log('====================================');
    }
}

export default diff;