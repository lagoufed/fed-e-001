import {VNode, VNodeData} from '../vnode';
import {Module} from './module';

// because those in TypeScript are too restrictive: https://github.com/Microsoft/TSJS-lib-generator/pull/237
declare global {
  interface Element {
    setAttribute(name: string, value: string | number | boolean): void;
    setAttributeNS(namespaceURI: string, qualifiedName: string, value: string | number | boolean): void;
  }
}

export type Attrs = Record<string, string | number | boolean>

const xlinkNS = 'http://www.w3.org/1999/xlink';
const xmlNS = 'http://www.w3.org/XML/1998/namespace';
const colonChar = 58;
const xChar = 120;

function updateAttrs(oldVnode: VNode, vnode: VNode): void {
  var key: string, elm: Element = vnode.elm as Element,
      oldAttrs = (oldVnode.data as VNodeData).attrs,
      attrs = (vnode.data as VNodeData).attrs;
  // 新老节点没有 attrs 属性，返回
  if (!oldAttrs && !attrs) return;
  // 新老节点的 attrs 属性相同，返回
  if (oldAttrs === attrs) return;
  oldAttrs = oldAttrs || {};
  attrs = attrs || {};

  // update modified attributes, add new attributes
  // 遍历新节点的属性
  for (key in attrs) {
    // 新老节点的属性值
    const cur = attrs[key];
    const old = oldAttrs[key];
    // 如果新老节点的属性值不同
    if (old !== cur) {
      // 布尔类型值的处理
      if (cur === true) {
        elm.setAttribute(key, "");
      } else if (cur === false) {
        elm.removeAttribute(key);
      } else {
        // xChar -> x
        // <svg xmlns="http://www.w3.org/2000/svg">
        if (key.charCodeAt(0) !== xChar) {
          elm.setAttribute(key, cur);
        } else if (key.charCodeAt(3) === colonChar) {
          // colonChar -> :
          // Assume xml namespace
          elm.setAttributeNS(xmlNS, key, cur);
        } else if (key.charCodeAt(5) === colonChar) {
          // Assume xlink namespace
          // <svg xmlns:xlink="http://www.w3.org/1999/xlink">
          elm.setAttributeNS(xlinkNS, key, cur);
        } else {
          elm.setAttribute(key, cur);
        }
      }
    }
  }
  // remove removed attributes
  // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
  // the other option is to remove all attributes with value == undefined
  // 如果老节点的属性在新节点中不存在，移除
  for (key in oldAttrs) {
    if (!(key in attrs)) {
      elm.removeAttribute(key);
    }
  }
}

export const attributesModule = {create: updateAttrs, update: updateAttrs} as Module;
export default attributesModule;
