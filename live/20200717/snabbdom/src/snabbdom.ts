/* global module, document, Node */
// 导入 Module 接口，定义了钩子函数的形式
import {Module} from './modules/module';
import vnode, {VNode} from './vnode';
import * as is from './is';
import htmlDomApi, {DOMAPI} from './htmldomapi';

type NonUndefined<T> = T extends undefined ? never : T;

function isUndef(s: any): boolean { return s === undefined; }
function isDef<A>(s: A): s is NonUndefined<A> { return s !== undefined; }

type VNodeQueue = VNode[];

const emptyNode = vnode('', {}, [], undefined, undefined);

function sameVnode(vnode1: VNode, vnode2: VNode): boolean {
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}

function isVnode(vnode: any): vnode is VNode {
  return vnode.sel !== undefined;
}

type KeyToIndexMap = {[key: string]: number};

type ArraysOf<T> = {
  [K in keyof T]: Array<T[K]>;
}

type ModuleHooks = ArraysOf<Module>;

function createKeyToOldIdx(children: VNode[], beginIdx: number, endIdx: number): KeyToIndexMap {
  const map: KeyToIndexMap = {};
  for (let i = beginIdx; i <= endIdx; ++i) {
    const key = children[i]?.key;
    if (key !== undefined) {
      map[key] = i;
    }
  }
  return map;
}

const hooks: Array<keyof Module> = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];

export {h} from './h';
export {thunk} from './thunk';

export function init(modules: Array<Partial<Module>>, domApi?: DOMAPI) {
  let i: number, j: number, cbs = ({} as ModuleHooks);
  // 初始化转换虚拟节点的 api
  const api: DOMAPI = domApi !== undefined ? domApi : htmlDomApi;
  // 把传入的所有模块的钩子函数，统一存储到 cbs 对象中
  // 最终构建的 cbs 对象的形式 cbs = { create: [fn1, fn2], update: [], ... }
  for (i = 0; i < hooks.length; ++i) {
    // cbs.create = [], cbs.update = []....
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      // modules 传入的模块数组
      // 获取模块中的 hook 函数
      // hook = modules[0][create]......
      const hook = modules[j][hooks[i]];
      if (hook !== undefined) {
        // 把获取到的hook函数放入到 cbs 对应的钩子函数数组中
        (cbs[hooks[i]] as any[]).push(hook);
      }
    }
  }

  function emptyNodeAt(elm: Element) {
    const id = elm.id ? '#' + elm.id : '';
    const c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
    return vnode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
  }

  function createRmCb(childElm: Node, listeners: number) {
    // 返回删除元素的回调函数
    return function rmCb() {
      if (--listeners === 0) {
        const parent = api.parentNode(childElm);
        api.removeChild(parent, childElm);
      }
    };
  }

  function createElm(vnode: VNode, insertedVnodeQueue: VNodeQueue): Node {
    let i: any, data = vnode.data;
    if (data !== undefined) {
      // 执行用户设置的 init 钩子函数
      const init = data.hook?.init;
      if (isDef(init)) {
        init(vnode);
        data = vnode.data;
      }
    }
    // 把 vnode 转换成真实 DOM 对象（没有渲染到页面）
    let children = vnode.children, sel = vnode.sel;
    if (sel === '!') {
      // 如果选择器是!，创建注释节点
      if (isUndef(vnode.text)) {
        vnode.text = '';
      }
      vnode.elm = api.createComment(vnode.text!);
    } else if (sel !== undefined) {
      // 如果选择器不为空
      // 解析选择器
      // Parse selector
      const hashIdx = sel.indexOf('#');
      const dotIdx = sel.indexOf('.', hashIdx);
      const hash = hashIdx > 0 ? hashIdx : sel.length;
      const dot = dotIdx > 0 ? dotIdx : sel.length;
      const tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
      const elm = vnode.elm = isDef(data) && isDef(i = data.ns)
        ? api.createElementNS(i, tag)
        : api.createElement(tag);
      if (hash < dot) elm.setAttribute('id', sel.slice(hash + 1, dot));
      if (dotIdx > 0) elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '));
      // 执行模块的 create 钩子函数
      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
      // 如果 vnode 中有子节点，创建子 vnode 对应的 DOM 元素并追加到 DOM 树上
      if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
          const ch = children[i];
          if (ch != null) {
            api.appendChild(elm, createElm(ch as VNode, insertedVnodeQueue));
          }
        }
      } else if (is.primitive(vnode.text)) {
        // 如果 vnode 的 text 值是 string/number，创建文本节点并追加到 DOM 树
        api.appendChild(elm, api.createTextNode(vnode.text));
      }
      const hook = vnode.data!.hook;
      if (isDef(hook)) {
        // 执行用户传入的钩子 create
        hook.create?.(emptyNode, vnode);
        if (hook.insert) {
          // 把 vnode 添加到队列中，为后续执行 insert 钩子做准备
          insertedVnodeQueue.push(vnode);
        }
      }
    } else {
      // 如果选择器为空，创建文本节点
      vnode.elm = api.createTextNode(vnode.text!);
    }
    // 返回新创建的 DOM
    return vnode.elm;
  }

  function addVnodes(
    parentElm: Node,
    before: Node | null,
    vnodes: VNode[],
    startIdx: number,
    endIdx: number,
    insertedVnodeQueue: VNodeQueue
  ) {
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx];
      if (ch != null) {
        api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
      }
    }
  }

  function invokeDestroyHook(vnode: VNode) {
    const data = vnode.data;
    if (data !== undefined) {
      // 执行用户设置的 destroy 钩子函数
      data?.hook?.destroy?.(vnode);
      // 调用模块的 destroy 钩子函数
      for (let i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
      // 执行子节点的 destroy 钩子函数
      if (vnode.children !== undefined) {
        for (let j = 0; j < vnode.children.length; ++j) {
          const child = vnode.children[j];
          if (child != null && typeof child !== "string") {
            invokeDestroyHook(child);
          }
        }
      }
    }
  }

  function removeVnodes(parentElm: Node,
                        vnodes: VNode[],
                        startIdx: number,
                        endIdx: number): void {
    for (; startIdx <= endIdx; ++startIdx) {
      let listeners: number, rm: () => void, ch = vnodes[startIdx];
      if (ch != null) {
        // 如果 sel 有值
        if (isDef(ch.sel)) {
          // 执行 destroy 钩子函数（会执行所有子节点的 destroy 钩子函数）
          invokeDestroyHook(ch);
          listeners = cbs.remove.length + 1;
          // 创建删除的回调函数
          rm = createRmCb(ch.elm!, listeners);
          for (let i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm);
          // 执行用户设置的 remove 钩子函数
          const removeHook = ch?.data?.hook?.remove;
          if (isDef(removeHook)) {
            removeHook(ch, rm);
          } else {
            // 如果没有用户钩子函数，直接调用删除元素的方法
            rm();
          }
        } else { // Text node
          // 如果是文本节点，直接调用删除元素的方法
          api.removeChild(parentElm, ch.elm!);
        }
      }
    }
  }

  function updateChildren(parentElm: Node,
                          oldCh: VNode[],
                          newCh: VNode[],
                          insertedVnodeQueue: VNodeQueue) {
    let oldStartIdx = 0, newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let oldKeyToIdx: KeyToIndexMap | undefined;
    let idxInOld: number;
    let elmToMove: VNode;
    let before: any;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      // 索引变化后，可能会把节点设置为空
      if (oldStartVnode == null) {
        // 节点为空移动索引
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
      } else if (oldEndVnode == null) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (newStartVnode == null) {
        newStartVnode = newCh[++newStartIdx];
      } else if (newEndVnode == null) {
        newEndVnode = newCh[--newEndIdx];
      // 比较开始和结束节点的四种情况
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        // 1. 比较老开始节点和新的开始节点
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        // 2. 比较老结束节点和新的结束节点
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        // 3. 比较老开始节点和新的结束节点
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldStartVnode.elm!, api.nextSibling(oldEndVnode.elm!));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        // 4. 比较老结束节点和新的开始节点
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldEndVnode.elm!, oldStartVnode.elm!);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        // 开始节点和结束节点都不相同
        // 使用 newStartNode 的 key 再老节点数组中找相同节点
        // 先设置记录 key 和 index 的对象
        if (oldKeyToIdx === undefined) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        // 遍历 newStartVnode, 从老的节点中找相同 key 的 oldVnode 的索引
        idxInOld = oldKeyToIdx[newStartVnode.key as string];
        // 如果是新的vnode
        if (isUndef(idxInOld)) { // New element
          // 如果没找到，newStartNode 是新节点
          // 创建元素插入 DOM 树
          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm!);
          // 重新给 newStartVnode 赋值，指向下一个新节点
          newStartVnode = newCh[++newStartIdx];
        } else {
          // 如果找到相同 key 相同的老节点，记录到 elmToMove 遍历
          elmToMove = oldCh[idxInOld];
          if (elmToMove.sel !== newStartVnode.sel) {
            // 如果新旧节点的选择器不同
            // 创建新开始节点对应的 DOM 元素，插入到 DOM 树中
            api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm!);
          } else {
            // 如果相同，patchVnode()
            // 把 elmToMove 对应的 DOM 元素，移动到左边
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined as any;
            api.insertBefore(parentElm, elmToMove.elm!, oldStartVnode.elm!);
          }
          // 重新给 newStartVnode 赋值，指向下一个新节点
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
    // 循环结束，老节点数组先遍历完成或者新节点数组先遍历完成
    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
      if (oldStartIdx > oldEndIdx) {
        // 如果老节点数组先遍历完成，说明有新的节点剩余
        // 把剩余的新节点都插入到右边
        before = newCh[newEndIdx+1] == null ? null : newCh[newEndIdx+1].elm;
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
      } else {
        // 如果新节点数组先遍历完成，说明老节点有剩余
        // 批量删除老节点
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
      }
    }
  }

  function patchVnode(oldVnode: VNode, vnode: VNode, insertedVnodeQueue: VNodeQueue) {
    const hook = vnode.data?.hook;
    // 首先执行用户设置的 prepatch 钩子函数
    hook?.prepatch?.(oldVnode, vnode);
    const elm = vnode.elm = oldVnode.elm!;
    let oldCh = oldVnode.children as VNode[];
    let ch = vnode.children as VNode[];
    // 如果新老 vnode 相同返回
    if (oldVnode === vnode) return;
    if (vnode.data !== undefined) {
      // 执行模块的 update 钩子函数
      for (let i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
      // 执行用户设置的 update 钩子函数
      vnode.data.hook?.update?.(oldVnode, vnode);
    }
    // 如果 vnode.text 未定义
    if (isUndef(vnode.text)) {
      // 如果新老节点都有 children
      if (isDef(oldCh) && isDef(ch)) {
        // 使用 diff 算法对比子节点，更新子节点
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
      } else if (isDef(ch)) {
        // 如果新节点有 children，老节点没有 children
        // 如果老节点有text，清空dom 元素的内容
        if (isDef(oldVnode.text)) api.setTextContent(elm, '');
        // 批量添加子节点
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        // 如果老节点有children，新节点没有children
        // 批量移除子节点
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        // 如果老节点有 text，清空 DOM 元素
        api.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      // 如果没有设置 vnode.text
      if (isDef(oldCh)) {
        // 如果老节点有 children，移除
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      }
      // 设置 DOM 元素的 textContent 为 vnode.text
      api.setTextContent(elm, vnode.text!);
    }
    // 最后执行用户设置的 postpatch 钩子函数
    hook?.postpatch?.(oldVnode, vnode);
  }

  // init 内部返回 patch 函数，把 vnode 渲染成真实 dom，并返回vnode
  return function patch(oldVnode: VNode | Element, vnode: VNode): VNode {
    let i: number, elm: Node, parent: Node;
    // 保存新插入节点的队列，为了触发钩子函数
    const insertedVnodeQueue: VNodeQueue = [];
    // 执行模块的 pre 钩子函数
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();

    // 如果 oldVnode 不是 VNode，创建 VNode 并设置 elm 
    if (!isVnode(oldVnode)) {
      // 把 DOM 元素转换成空的 VNode
      oldVnode = emptyNodeAt(oldVnode);
    }
    // 如果新旧节点是相同节点(key 和 sel 相同)
    if (sameVnode(oldVnode, vnode)) {
      // 找节点的差异并更新 DOM
      patchVnode(oldVnode, vnode, insertedVnodeQueue);
    } else {
      // 如果新旧节点不同，vnode 创建对应的 DOM
      // 获取当前的 DOM 元素
      elm = oldVnode.elm!;
      parent = api.parentNode(elm);
      // 创建 vnode 对应的 DOM 元素，并触发 init/create 钩子函数,
      createElm(vnode, insertedVnodeQueue);

      if (parent !== null) {
        // 如果父节点不为空，把 vnode 对应的 DOM 插入到文档中
        api.insertBefore(parent, vnode.elm!, api.nextSibling(elm));
        // 移除老节点
        removeVnodes(parent, [oldVnode], 0, 0);
      }
    }
    // 执行用户设置的 insert 钩子函数
    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data!.hook!.insert!(insertedVnodeQueue[i]);
    }
    // 执行模块的 post 钩子函数
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
    // 返回 vnode
    return vnode;
  };
}
