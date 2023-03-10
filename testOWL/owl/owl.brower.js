!function (t) {
    "use strict";

    function e(t) {
        t = t.slice();
        const e = [];
        let n;
        for (; (n = t[0]) && "string" == typeof n;) e.push(t.shift());
        return {modifiers: e, data: t}
    }

    const n = {
        shouldNormalizeDom: !0,
        mainEventHandler: (t, n, o) => ("function" == typeof t ? t(n) : Array.isArray(t) && (t = e(t).data)[0](t[1], n), !1)
    };

    class o {
        constructor(t, e) {
            this.key = t, this.child = e
        }

        mount(t, e) {
            this.parentEl = t, this.child.mount(t, e)
        }

        moveBeforeDOMNode(t, e) {
            this.child.moveBeforeDOMNode(t, e)
        }

        moveBeforeVNode(t, e) {
            this.moveBeforeDOMNode(t && t.firstNode() || e)
        }

        patch(t, e) {
            if (this === t) return;
            let n = this.child, o = t.child;
            this.key === t.key ? n.patch(o, e) : (o.mount(this.parentEl, n.firstNode()), e && n.beforeRemove(), n.remove(), this.child = o, this.key = t.key)
        }

        beforeRemove() {
            this.child.beforeRemove()
        }

        remove() {
            this.child.remove()
        }

        firstNode() {
            return this.child.firstNode()
        }

        toString() {
            return this.child.toString()
        }
    }

    function r(t, e) {
        return new o(t, e)
    }

    class i extends Error {
    }

    const s = new WeakMap, l = new WeakMap;

    function a(t, e) {
        if (!t) return !1;
        const n = t.fiber;
        n && s.set(n, e);
        const o = l.get(t);
        if (o) {
            let t = !1;
            for (let n = o.length - 1; n >= 0; n--) try {
                o[n](e), t = !0;
                break
            } catch (t) {
                e = t
            }
            if (t) return !0
        }
        return a(t.parent, e)
    }

    function c(t) {
        let {error: e} = t;
        e instanceof i || (e = Object.assign(new i('An error occured in the owl lifecycle (see this Error\'s "cause" property)'), {cause: e}));
        const n = "node" in t ? t.node : t.fiber.node, o = "fiber" in t ? t.fiber : n.fiber;
        let r = o;
        do {
            r.node.fiber = r, r = r.parent
        } while (r);
        s.set(o.root, e);
        if (!a(n, e)) {
            console.warn("[Owl] Unhandled error. Destroying the root component");
            try {
                n.app.destroy()
            } catch (t) {
                console.error(t)
            }
            throw e
        }
    }

    const {setAttribute: h, removeAttribute: u} = Element.prototype, d = DOMTokenList.prototype, f = d.add,
        p = d.remove, m = Array.isArray, {split: g, trim: b} = String.prototype, v = /\s+/;

    function y(t, e) {
        switch (e) {
            case!1:
            case void 0:
                u.call(this, t);
                break;
            case!0:
                h.call(this, t, "");
                break;
            default:
                h.call(this, t, e)
        }
    }

    function w(t) {
        return function (e) {
            y.call(this, t, e)
        }
    }

    function $(t) {
        if (m(t)) y.call(this, t[0], t[1]); else for (let e in t) y.call(this, e, t[e])
    }

    function x(t, e) {
        if (m(t)) {
            const n = t[0], o = t[1];
            if (n === e[0]) {
                if (o === e[1]) return;
                y.call(this, n, o)
            } else u.call(this, e[0]), y.call(this, n, o)
        } else {
            for (let n in e) n in t || u.call(this, n);
            for (let n in t) {
                const o = t[n];
                o !== e[n] && y.call(this, n, o)
            }
        }
    }

    function N(t) {
        const e = {};
        switch (typeof t) {
            case"string":
                const n = b.call(t);
                if (!n) return {};
                let o = g.call(n, v);
                for (let t = 0, n = o.length; t < n; t++) e[o[t]] = !0;
                return e;
            case"object":
                for (let n in t) {
                    const o = t[n];
                    if (o) {
                        if (n = b.call(n), !n) continue;
                        const t = g.call(n, v);
                        for (let n of t) e[n] = o
                    }
                }
                return e;
            case"undefined":
                return {};
            case"number":
                return {[t]: !0};
            default:
                return {[t]: !0}
        }
    }

    function k(t) {
        t = "" === t ? {} : N(t);
        const e = this.classList;
        for (let n in t) f.call(e, n)
    }

    function E(t, e) {
        e = "" === e ? {} : N(e), t = "" === t ? {} : N(t);
        const n = this.classList;
        for (let o in e) o in t || p.call(n, o);
        for (let o in t) o in e || f.call(n, o)
    }

    function A(t) {
        return function (e) {
            this[t] = 0 === e ? 0 : e ? e.valueOf() : ""
        }
    }

    function T(t, e) {
        switch (t) {
            case"input":
                return "checked" === e || "indeterminate" === e || "value" === e || "readonly" === e || "disabled" === e;
            case"option":
                return "selected" === e || "disabled" === e;
            case"textarea":
                return "value" === e || "readonly" === e || "disabled" === e;
            case"select":
                return "value" === e || "disabled" === e;
            case"button":
            case"optgroup":
                return "disabled" === e
        }
        return !1
    }

    function _(t) {
        const e = t.split(".")[0], o = t.includes(".capture");
        return t.includes(".synthetic") ? function (t, e = !1) {
            let o = `__event__synthetic_${t}`;
            e && (o = `${o}_capture`);
            !function (t, e, o = !1) {
                if (D[e]) return;
                document.addEventListener(t, (t => function (t, e) {
                    let o = e.target;
                    for (; null !== o;) {
                        const r = o[t];
                        if (r) for (const t of Object.values(r)) {
                            if (n.mainEventHandler(t, e, o)) return
                        }
                        o = o.parentNode
                    }
                }(e, t)), {capture: o}), D[e] = !0
            }(t, o, e);
            const r = C++;

            function i(t) {
                const e = this[o] || {};
                e[r] = t, this[o] = e
            }

            function s() {
                delete this[o]
            }

            return {setup: i, update: i, remove: s}
        }(e, o) : function (t, e = !1) {
            let o = `__event__${t}_${S++}`;
            e && (o = `${o}_capture`);

            function r(t) {
                const e = t.currentTarget;
                if (!e || !e.ownerDocument.contains(e)) return;
                const r = e[o];
                r && n.mainEventHandler(r, t, e)
            }

            function i(n) {
                this[o] = n, this.addEventListener(t, r, {capture: e})
            }

            function s() {
                delete this[o], this.removeEventListener(t, r, {capture: e})
            }

            function l(t) {
                this[o] = t
            }

            return {setup: i, update: l, remove: s}
        }(e, o)
    }

    let S = 1;
    let C = 1;
    const D = {};
    const O = Node.prototype, L = O.insertBefore,
        B = (R = O, M = "textContent", Object.getOwnPropertyDescriptor(R, M)).set;
    var R, M;
    const P = O.removeChild;

    class I {
        constructor(t) {
            this.children = t
        }

        mount(t, e) {
            const n = this.children, o = n.length, r = new Array(o);
            for (let i = 0; i < o; i++) {
                let o = n[i];
                if (o) o.mount(t, e); else {
                    const n = document.createTextNode("");
                    r[i] = n, L.call(t, n, e)
                }
            }
            this.anchors = r, this.parentEl = t
        }

        moveBeforeDOMNode(t, e = this.parentEl) {
            this.parentEl = e;
            const n = this.children, o = this.anchors;
            for (let r = 0, i = n.length; r < i; r++) {
                let i = n[r];
                if (i) i.moveBeforeDOMNode(t, e); else {
                    const n = o[r];
                    L.call(e, n, t)
                }
            }
        }

        moveBeforeVNode(t, e) {
            if (t) {
                const n = t.children[0];
                e = (n ? n.firstNode() : t.anchors[0]) || null
            }
            const n = this.children, o = this.parentEl, r = this.anchors;
            for (let t = 0, i = n.length; t < i; t++) {
                let i = n[t];
                if (i) i.moveBeforeVNode(null, e); else {
                    const n = r[t];
                    L.call(o, n, e)
                }
            }
        }

        patch(t, e) {
            if (this === t) return;
            const n = this.children, o = t.children, r = this.anchors, i = this.parentEl;
            for (let t = 0, s = n.length; t < s; t++) {
                const s = n[t], l = o[t];
                if (s) if (l) s.patch(l, e); else {
                    const o = s.firstNode(), l = document.createTextNode("");
                    r[t] = l, L.call(i, l, o), e && s.beforeRemove(), s.remove(), n[t] = void 0
                } else if (l) {
                    n[t] = l;
                    const e = r[t];
                    l.mount(i, e), P.call(i, e)
                }
            }
        }

        beforeRemove() {
            const t = this.children;
            for (let e = 0, n = t.length; e < n; e++) {
                const n = t[e];
                n && n.beforeRemove()
            }
        }

        remove() {
            const t = this.parentEl;
            if (this.isOnlyChild) B.call(t, ""); else {
                const e = this.children, n = this.anchors;
                for (let o = 0, r = e.length; o < r; o++) {
                    const r = e[o];
                    r ? r.remove() : P.call(t, n[o])
                }
            }
        }

        firstNode() {
            const t = this.children[0];
            return t ? t.firstNode() : this.anchors[0]
        }

        toString() {
            return this.children.map((t => t ? t.toString() : "")).join("")
        }
    }

    function j(t) {
        return new I(t)
    }

    const W = Node.prototype, V = CharacterData.prototype, F = W.insertBefore,
        K = ((t, e) => Object.getOwnPropertyDescriptor(t, e))(V, "data").set, z = W.removeChild;

    class H {
        constructor(t) {
            this.text = t
        }

        mountNode(t, e, n) {
            this.parentEl = e, F.call(e, t, n), this.el = t
        }

        moveBeforeDOMNode(t, e = this.parentEl) {
            this.parentEl = e, F.call(e, this.el, t)
        }

        moveBeforeVNode(t, e) {
            F.call(this.parentEl, this.el, t ? t.el : e)
        }

        beforeRemove() {
        }

        remove() {
            z.call(this.parentEl, this.el)
        }

        firstNode() {
            return this.el
        }

        toString() {
            return this.text
        }
    }

    class U extends H {
        mount(t, e) {
            this.mountNode(document.createTextNode(Y(this.text)), t, e)
        }

        patch(t) {
            const e = t.text;
            this.text !== e && (K.call(this.el, Y(e)), this.text = e)
        }
    }

    class q extends H {
        mount(t, e) {
            this.mountNode(document.createComment(Y(this.text)), t, e)
        }

        patch() {
        }
    }

    function G(t) {
        return new U(t)
    }

    function X(t) {
        return new q(t)
    }

    function Y(t) {
        switch (typeof t) {
            case"string":
                return t;
            case"number":
                return String(t);
            case"boolean":
                return t ? "true" : "false";
            default:
                return t || ""
        }
    }

    const Z = (t, e) => Object.getOwnPropertyDescriptor(t, e), J = Node.prototype, Q = Element.prototype,
        tt = Z(CharacterData.prototype, "data").set, et = Z(J, "firstChild").get, nt = Z(J, "nextSibling").get,
        ot = () => {
        }, rt = {};

    function it(t) {
        if (t in rt) return rt[t];
        const e = (new DOMParser).parseFromString(`<t>${t}</t>`, "text/xml").firstChild.firstChild;
        n.shouldNormalizeDom && st(e);
        const o = lt(e), r = ht(o), i = function (t, e) {
            let n = function (t, e) {
                const {refN: n, collectors: o, children: r} = e, i = o.length;
                e.locations.sort(((t, e) => t.idx - e.idx));
                const s = e.locations.map((t => ({refIdx: t.refIdx, setData: t.setData, updateData: t.updateData}))),
                    l = s.length, a = r.length, c = r, h = n > 0, u = J.cloneNode, d = J.insertBefore, f = Q.remove;

                class p {
                    constructor(t) {
                        this.data = t
                    }

                    beforeRemove() {
                    }

                    remove() {
                        f.call(this.el)
                    }

                    firstNode() {
                        return this.el
                    }

                    moveBeforeDOMNode(t, e = this.parentEl) {
                        this.parentEl = e, d.call(e, this.el, t)
                    }

                    moveBeforeVNode(t, e) {
                        d.call(this.parentEl, this.el, t ? t.el : e)
                    }

                    toString() {
                        const t = document.createElement("div");
                        return this.mount(t, null), t.innerHTML
                    }

                    mount(e, n) {
                        const o = u.call(t, !0);
                        d.call(e, o, n), this.el = o, this.parentEl = e
                    }

                    patch(t, e) {
                    }
                }

                h && (p.prototype.mount = function (e, r) {
                    const h = u.call(t, !0), f = new Array(n);
                    this.refs = f, f[0] = h;
                    for (let t = 0; t < i; t++) {
                        const e = o[t];
                        f[e.idx] = e.getVal.call(f[e.prevIdx])
                    }
                    if (l) {
                        const t = this.data;
                        for (let e = 0; e < l; e++) {
                            const n = s[e];
                            n.setData.call(f[n.refIdx], t[e])
                        }
                    }
                    if (d.call(e, h, r), a) {
                        const t = this.children;
                        for (let e = 0; e < a; e++) {
                            const n = t[e];
                            if (n) {
                                const t = c[e], o = t.afterRefIdx ? f[t.afterRefIdx] : null;
                                n.isOnlyChild = t.isOnlyChild, n.mount(f[t.parentRefIdx], o)
                            }
                        }
                    }
                    this.el = h, this.parentEl = e
                }, p.prototype.patch = function (t, e) {
                    if (this === t) return;
                    const n = this.refs;
                    if (l) {
                        const e = this.data, o = t.data;
                        for (let t = 0; t < l; t++) {
                            const r = e[t], i = o[t];
                            if (r !== i) {
                                const e = s[t];
                                e.updateData.call(n[e.refIdx], i, r)
                            }
                        }
                        this.data = o
                    }
                    if (a) {
                        let o = this.children;
                        const r = t.children;
                        for (let t = 0; t < a; t++) {
                            const i = o[t], s = r[t];
                            if (i) s ? i.patch(s, e) : (e && i.beforeRemove(), i.remove(), o[t] = void 0); else if (s) {
                                const e = c[t], r = e.afterRefIdx ? n[e.afterRefIdx] : null;
                                s.mount(n[e.parentRefIdx], r), o[t] = s
                            }
                        }
                    }
                });
                return p
            }(t, e);
            if (e.cbRefs.length) {
                const t = e.cbRefs, o = e.refList;
                let r = t.length;
                n = class extends n {
                    mount(t, e) {
                        o.push(new Array(r)), super.mount(t, e);
                        for (let t of o.pop()) t()
                    }

                    remove() {
                        super.remove();
                        for (let e of t) {
                            (0, this.data[e])(null)
                        }
                    }
                }
            }
            if (e.children.length) return n = class extends n {
                constructor(t, e) {
                    super(t), this.children = e
                }
            }, n.prototype.beforeRemove = I.prototype.beforeRemove, (t, e = []) => new n(t, e);
            return t => new n(t)
        }(o.el, r);
        return rt[t] = i, i
    }

    function st(t) {
        if (t.nodeType !== Node.TEXT_NODE || /\S/.test(t.textContent)) {
            if (t.nodeType !== Node.ELEMENT_NODE || "pre" !== t.tagName) for (let e = t.childNodes.length - 1; e >= 0; --e) st(t.childNodes.item(e))
        } else t.remove()
    }

    function lt(t, e = null, n = null) {
        switch (t.nodeType) {
            case Node.ELEMENT_NODE: {
                let o = n && n.currentNS;
                const r = t.tagName;
                let i;
                const s = [];
                if (r.startsWith("block-text-")) {
                    const t = parseInt(r.slice(11), 10);
                    s.push({type: "text", idx: t}), i = document.createTextNode("")
                }
                if (r.startsWith("block-child-")) {
                    n.isRef || at(n);
                    const t = parseInt(r.slice(12), 10);
                    s.push({type: "child", idx: t}), i = document.createTextNode("")
                }
                const l = t.attributes, a = l.getNamedItem("block-ns");
                if (a && (l.removeNamedItem("block-ns"), o = a.value), i || (i = o ? document.createElementNS(o, r) : document.createElement(r)), i instanceof Element) {
                    if (!n) {
                        document.createElement("template").content.appendChild(i)
                    }
                    for (let t = 0; t < l.length; t++) {
                        const e = l[t].name, n = l[t].value;
                        if (e.startsWith("block-handler-")) {
                            const t = parseInt(e.slice(14), 10);
                            s.push({type: "handler", idx: t, event: n})
                        } else if (e.startsWith("block-attribute-")) {
                            const t = parseInt(e.slice(16), 10);
                            s.push({type: "attribute", idx: t, name: n, tag: r})
                        } else "block-attributes" === e ? s.push({
                            type: "attributes",
                            idx: parseInt(n, 10)
                        }) : "block-ref" === e ? s.push({
                            type: "ref",
                            idx: parseInt(n, 10)
                        }) : i.setAttribute(l[t].name, n)
                    }
                }
                const c = {parent: e, firstChild: null, nextSibling: null, el: i, info: s, refN: 0, currentNS: o};
                if (t.firstChild) {
                    const e = t.childNodes[0];
                    if (1 === t.childNodes.length && e.nodeType === Node.ELEMENT_NODE && e.tagName.startsWith("block-child-")) {
                        const t = e.tagName, n = parseInt(t.slice(12), 10);
                        s.push({idx: n, type: "child", isOnlyChild: !0})
                    } else {
                        c.firstChild = lt(t.firstChild, c, c), i.appendChild(c.firstChild.el);
                        let e = t.firstChild, n = c.firstChild;
                        for (; e = e.nextSibling;) n.nextSibling = lt(e, n, c), i.appendChild(n.nextSibling.el), n = n.nextSibling
                    }
                }
                return c.info.length && at(c), c
            }
            case Node.TEXT_NODE:
            case Node.COMMENT_NODE:
                return {
                    parent: e,
                    firstChild: null,
                    nextSibling: null,
                    el: t.nodeType === Node.TEXT_NODE ? document.createTextNode(t.textContent) : document.createComment(t.textContent),
                    info: [],
                    refN: 0,
                    currentNS: null
                }
        }
        throw new i("boom")
    }

    function at(t) {
        t.isRef = !0;
        do {
            t.refN++
        } while (t = t.parent)
    }

    function ct(t) {
        let e = t.parent;
        for (; e && e.nextSibling === t;) t = e, e = e.parent;
        return e
    }

    function ht(t, e, n) {
        if (!e) {
            e = {
                collectors: [],
                locations: [],
                children: new Array(t.info.filter((t => "child" === t.type)).length),
                cbRefs: [],
                refN: t.refN,
                refList: []
            }, n = 0
        }
        if (t.refN) {
            const o = n, r = t.isRef, i = t.firstChild ? t.firstChild.refN : 0,
                s = t.nextSibling ? t.nextSibling.refN : 0;
            if (r) {
                for (let e of t.info) e.refIdx = o;
                t.refIdx = o, function (t, e) {
                    for (let n of e.info) switch (n.type) {
                        case"text":
                            t.locations.push({idx: n.idx, refIdx: n.refIdx, setData: ut, updateData: ut});
                            break;
                        case"child":
                            n.isOnlyChild ? t.children[n.idx] = {
                                parentRefIdx: n.refIdx,
                                isOnlyChild: !0
                            } : t.children[n.idx] = {parentRefIdx: ct(e).refIdx, afterRefIdx: n.refIdx};
                            break;
                        case"attribute": {
                            const e = n.refIdx;
                            let o, r;
                            if (T(n.tag, n.name)) {
                                const t = A(n.name);
                                r = t, o = t
                            } else "class" === n.name ? (r = k, o = E) : (r = w(n.name), o = r);
                            t.locations.push({idx: n.idx, refIdx: e, setData: r, updateData: o});
                            break
                        }
                        case"attributes":
                            t.locations.push({idx: n.idx, refIdx: n.refIdx, setData: $, updateData: x});
                            break;
                        case"handler": {
                            const {setup: e, update: o} = _(n.event);
                            t.locations.push({idx: n.idx, refIdx: n.refIdx, setData: e, updateData: o});
                            break
                        }
                        case"ref":
                            const o = t.cbRefs.push(n.idx) - 1;
                            t.locations.push({idx: n.idx, refIdx: n.refIdx, setData: dt(o, t.refList), updateData: ot})
                    }
                }(e, t), n++
            }
            if (s) {
                const r = n + i;
                e.collectors.push({idx: r, prevIdx: o, getVal: nt}), ht(t.nextSibling, e, r)
            }
            i && (e.collectors.push({idx: n, prevIdx: o, getVal: et}), ht(t.firstChild, e, n))
        }
        return e
    }

    function ut(t) {
        tt.call(this, Y(t))
    }

    function dt(t, e) {
        return function (n) {
            e[e.length - 1][t] = () => n(this)
        }
    }

    const ft = Node.prototype, pt = ft.insertBefore, mt = ft.appendChild, gt = ft.removeChild,
        bt = ((t, e) => Object.getOwnPropertyDescriptor(t, e))(ft, "textContent").set;

    class vt {
        constructor(t) {
            this.children = t
        }

        mount(t, e) {
            const n = this.children, o = document.createTextNode("");
            this.anchor = o, pt.call(t, o, e);
            const r = n.length;
            if (r) {
                const e = n[0].mount;
                for (let i = 0; i < r; i++) e.call(n[i], t, o)
            }
            this.parentEl = t
        }

        moveBeforeDOMNode(t, e = this.parentEl) {
            this.parentEl = e;
            const n = this.children;
            for (let o = 0, r = n.length; o < r; o++) n[o].moveBeforeDOMNode(t, e);
            e.insertBefore(this.anchor, t)
        }

        moveBeforeVNode(t, e) {
            if (t) {
                const n = t.children[0];
                e = (n ? n.firstNode() : t.anchor) || null
            }
            const n = this.children;
            for (let t = 0, o = n.length; t < o; t++) n[t].moveBeforeVNode(null, e);
            this.parentEl.insertBefore(this.anchor, e)
        }

        patch(t, e) {
            if (this === t) return;
            const n = this.children, o = t.children;
            if (0 === o.length && 0 === n.length) return;
            this.children = o;
            const r = o[0] || n[0], {
                mount: i,
                patch: s,
                remove: l,
                beforeRemove: a,
                moveBeforeVNode: c,
                firstNode: h
            } = r, u = this.anchor, d = this.isOnlyChild, f = this.parentEl;
            if (0 === o.length && d) {
                if (e) for (let t = 0, e = n.length; t < e; t++) a.call(n[t]);
                return bt.call(f, ""), void mt.call(f, u)
            }
            let p, m = 0, g = 0, b = n[0], v = o[0], y = n.length - 1, w = o.length - 1, $ = n[y], x = o[w];
            for (; m <= y && g <= w;) {
                if (null === b) {
                    b = n[++m];
                    continue
                }
                if (null === $) {
                    $ = n[--y];
                    continue
                }
                let t = b.key, r = v.key;
                if (t === r) {
                    s.call(b, v, e), o[g] = b, b = n[++m], v = o[++g];
                    continue
                }
                let l = $.key, a = x.key;
                if (l === a) {
                    s.call($, x, e), o[w] = $, $ = n[--y], x = o[--w];
                    continue
                }
                if (t === a) {
                    s.call(b, x, e), o[w] = b;
                    const t = o[w + 1];
                    c.call(b, t, u), b = n[++m], x = o[--w];
                    continue
                }
                if (l === r) {
                    s.call($, v, e), o[g] = $;
                    const t = n[m];
                    c.call($, t, u), $ = n[--y], v = o[++g];
                    continue
                }
                p = p || wt(n, m, y);
                let d = p[r];
                if (void 0 === d) i.call(v, f, h.call(b) || null); else {
                    const t = n[d];
                    c.call(t, b, null), s.call(t, v, e), o[g] = t, n[d] = null
                }
                v = o[++g]
            }
            if (m <= y || g <= w) if (m > y) {
                const t = o[w + 1], e = t ? h.call(t) || null : u;
                for (let t = g; t <= w; t++) i.call(o[t], f, e)
            } else for (let t = m; t <= y; t++) {
                let o = n[t];
                o && (e && a.call(o), l.call(o))
            }
        }

        beforeRemove() {
            const t = this.children, e = t.length;
            if (e) {
                const n = t[0].beforeRemove;
                for (let o = 0; o < e; o++) n.call(t[o])
            }
        }

        remove() {
            const {parentEl: t, anchor: e} = this;
            if (this.isOnlyChild) bt.call(t, ""); else {
                const n = this.children, o = n.length;
                if (o) {
                    const t = n[0].remove;
                    for (let e = 0; e < o; e++) t.call(n[e])
                }
                gt.call(t, e)
            }
        }

        firstNode() {
            const t = this.children[0];
            return t ? t.firstNode() : void 0
        }

        toString() {
            return this.children.map((t => t.toString())).join("")
        }
    }

    function yt(t) {
        return new vt(t)
    }

    function wt(t, e, n) {
        let o = {};
        for (let r = e; r <= n; r++) o[t[r].key] = r;
        return o
    }

    const $t = Node.prototype, xt = $t.insertBefore, Nt = $t.removeChild;

    class kt {
        constructor(t) {
            this.content = [], this.html = t
        }

        mount(t, e) {
            this.parentEl = t;
            const n = document.createElement("template");
            n.innerHTML = this.html, this.content = [...n.content.childNodes];
            for (let n of this.content) xt.call(t, n, e);
            if (!this.content.length) {
                const n = document.createTextNode("");
                this.content.push(n), xt.call(t, n, e)
            }
        }

        moveBeforeDOMNode(t, e = this.parentEl) {
            this.parentEl = e;
            for (let n of this.content) xt.call(e, n, t)
        }

        moveBeforeVNode(t, e) {
            const n = t ? t.content[0] : e;
            this.moveBeforeDOMNode(n)
        }

        patch(t) {
            if (this === t) return;
            const e = t.html;
            if (this.html !== e) {
                const n = this.parentEl, o = this.content[0], r = document.createElement("template");
                r.innerHTML = e;
                const i = [...r.content.childNodes];
                for (let t of i) xt.call(n, t, o);
                if (!i.length) {
                    const t = document.createTextNode("");
                    i.push(t), xt.call(n, t, o)
                }
                this.remove(), this.content = i, this.html = t.html
            }
        }

        beforeRemove() {
        }

        remove() {
            const t = this.parentEl;
            for (let e of this.content) Nt.call(t, e)
        }

        firstNode() {
            return this.content[0]
        }

        toString() {
            return this.html
        }
    }

    function Et(t) {
        return new kt(t)
    }

    function At(t, e, n = null) {
        t.mount(e, n)
    }

    function Tt() {
        throw new i("Attempted to render cancelled fiber")
    }

    function _t(t) {
        let e = 0;
        for (let n of t) {
            let t = n.node;
            n.render = Tt, 0 === t.status && (t.destroy(), delete t.parent.children[t.parentKey]), t.fiber = null, n.bdom ? t.forceNextRender = !0 : e++, e += _t(n.children)
        }
        return e
    }

    class St {
        constructor(t, e) {
            if (this.bdom = null, this.children = [], this.appliedToDom = !1, this.deep = !1, this.childrenMap = {}, this.node = t, this.parent = e, e) {
                this.deep = e.deep;
                const t = e.root;
                t.setCounter(t.counter + 1), this.root = t, e.children.push(this)
            } else this.root = this
        }

        render() {
            let t = this.root.node, e = t.app.scheduler, n = t.parent;
            for (; n;) {
                if (n.fiber) {
                    let o = n.fiber.root;
                    if (0 !== o.counter || !(t.parentKey in n.fiber.childrenMap)) return void e.delayedRenders.push(this);
                    n = o.node
                }
                t = n, n = n.parent
            }
            this._render()
        }

        _render() {
            const t = this.node, e = this.root;
            if (e) {
                try {
                    this.bdom = !0, this.bdom = t.renderFn()
                } catch (e) {
                    t.app.handleError({node: t, error: e})
                }
                e.setCounter(e.counter - 1)
            }
        }
    }

    class Ct extends St {
        constructor() {
            super(...arguments), this.counter = 1, this.willPatch = [], this.patched = [], this.mounted = [], this.locked = !1
        }

        complete() {
            const t = this.node;
            let e;
            this.locked = !0;
            try {
                for (e of this.willPatch) {
                    let t = e.node;
                    if (t.fiber === e) {
                        const e = t.component;
                        for (let n of t.willPatch) n.call(e)
                    }
                }
                e = void 0, t._patch(), this.locked = !1;
                let n = this.mounted;
                for (; e = n.pop();) if (e = e, e.appliedToDom) for (let t of e.node.mounted) t();
                let o = this.patched;
                for (; e = o.pop();) if (e = e, e.appliedToDom) for (let t of e.node.patched) t()
            } catch (n) {
                this.locked = !1, t.app.handleError({fiber: e || this, error: n})
            }
        }

        setCounter(t) {
            this.counter = t, 0 === t && this.node.app.scheduler.flush()
        }
    }

    class Dt extends Ct {
        constructor(t, e, n = {}) {
            super(t, null), this.target = e, this.position = n.position || "last-child"
        }

        complete() {
            let t = this;
            try {
                const e = this.node;
                if (e.children = this.childrenMap, e.app.constructor.validateTarget(this.target), e.bdom) e.updateDom(); else if (e.bdom = this.bdom, "last-child" === this.position || 0 === this.target.childNodes.length) At(e.bdom, this.target); else {
                    const t = this.target.childNodes[0];
                    At(e.bdom, this.target, t)
                }
                e.fiber = null, e.status = 1, this.appliedToDom = !0;
                let n = this.mounted;
                for (; t = n.pop();) if (t.appliedToDom) for (let e of t.node.mounted) e()
            } catch (e) {
                this.node.app.handleError({fiber: t, error: e})
            }
        }
    }

    const Ot = Symbol("Key changes"), Lt = Object.prototype.toString, Bt = Object.prototype.hasOwnProperty,
        Rt = new Set(["Object", "Array", "Set", "Map", "WeakMap"]), Mt = new Set(["Set", "Map", "WeakMap"]);

    function Pt(t) {
        return Lt.call(t).slice(8, -1)
    }

    function It(t) {
        return "object" == typeof t && Rt.has(Pt(t))
    }

    function jt(t, e) {
        return It(t) ? Yt(t, e) : t
    }

    const Wt = new WeakSet;

    function Vt(t) {
        return Wt.add(t), t
    }

    function Ft(t) {
        return Gt.has(t) ? Gt.get(t) : t
    }

    const Kt = new WeakMap;

    function zt(t, e, n) {
        Kt.get(t) || Kt.set(t, new Map);
        const o = Kt.get(t);
        o.get(e) || o.set(e, new Set), o.get(e).add(n), Ut.has(n) || Ut.set(n, new Set), Ut.get(n).add(t)
    }

    function Ht(t, e) {
        const n = Kt.get(t);
        if (!n) return;
        const o = n.get(e);
        if (o) for (const t of [...o]) qt(t), t()
    }

    const Ut = new WeakMap;

    function qt(t) {
        const e = Ut.get(t);
        if (e) {
            for (const n of e) {
                const e = Kt.get(n);
                if (e) for (const n of e.values()) n.delete(t)
            }
            e.clear()
        }
    }

    const Gt = new WeakMap, Xt = new WeakMap;

    function Yt(t, e = (() => {
    })) {
        if (!It(t)) throw new i("Cannot make the given value reactive");
        if (Wt.has(t)) return t;
        if (Gt.has(t)) return Yt(Gt.get(t), e);
        Xt.has(t) || Xt.set(t, new WeakMap);
        const n = Xt.get(t);
        if (!n.has(e)) {
            const o = Pt(t), r = Mt.has(o) ? function (t, e, n) {
                const o = oe[n](t, e);
                return Object.assign(Zt(e), {get: (t, n) => Bt.call(o, n) ? o[n] : (zt(t, n, e), jt(t[n], e))})
            }(t, e, o) : Zt(e), i = new Proxy(t, r);
            n.set(e, i), Gt.set(i, t)
        }
        return n.get(e)
    }

    function Zt(t) {
        return {
            get(e, n, o) {
                const r = Object.getOwnPropertyDescriptor(e, n);
                return !r || r.writable || r.configurable ? (zt(e, n, t), jt(Reflect.get(e, n, o), t)) : Reflect.get(e, n, o)
            }, set(t, e, n, o) {
                const r = Bt.call(t, e), i = Reflect.get(t, e, o), s = Reflect.set(t, e, n, o);
                return !r && Bt.call(t, e) && Ht(t, Ot), (i !== Reflect.get(t, e, o) || "length" === e && Array.isArray(t)) && Ht(t, e), s
            }, deleteProperty(t, e) {
                const n = Reflect.deleteProperty(t, e);
                return Ht(t, Ot), Ht(t, e), n
            }, ownKeys: e => (zt(e, Ot, t), Reflect.ownKeys(e)), has: (e, n) => (zt(e, Ot, t), Reflect.has(e, n))
        }
    }

    function Jt(t, e, n) {
        return o => (o = Ft(o), zt(e, o, n), jt(e[t](o), n))
    }

    function Qt(t, e, n) {
        return function* () {
            zt(e, Ot, n);
            const o = e.keys();
            for (const r of e[t]()) {
                const t = o.next().value;
                zt(e, t, n), yield jt(r, n)
            }
        }
    }

    function te(t, e) {
        return function (n, o) {
            zt(t, Ot, e), t.forEach((function (r, i, s) {
                zt(t, i, e), n.call(o, jt(r, e), jt(i, e), jt(s, e))
            }), o)
        }
    }

    function ee(t, e, n) {
        return (o, r) => {
            o = Ft(o);
            const i = n.has(o), s = n[e](o), l = n[t](o, r);
            return i !== n.has(o) && Ht(n, Ot), s !== r && Ht(n, o), l
        }
    }

    function ne(t) {
        return () => {
            const e = [...t.keys()];
            t.clear(), Ht(t, Ot);
            for (const n of e) Ht(t, n)
        }
    }

    const oe = {
        Set: (t, e) => ({
            has: Jt("has", t, e),
            add: ee("add", "has", t),
            delete: ee("delete", "has", t),
            keys: Qt("keys", t, e),
            values: Qt("values", t, e),
            entries: Qt("entries", t, e),
            [Symbol.iterator]: Qt(Symbol.iterator, t, e),
            forEach: te(t, e),
            clear: ne(t),
            get size() {
                return zt(t, Ot, e), t.size
            }
        }),
        Map: (t, e) => ({
            has: Jt("has", t, e),
            get: Jt("get", t, e),
            set: ee("set", "get", t),
            delete: ee("delete", "has", t),
            keys: Qt("keys", t, e),
            values: Qt("values", t, e),
            entries: Qt("entries", t, e),
            [Symbol.iterator]: Qt(Symbol.iterator, t, e),
            forEach: te(t, e),
            clear: ne(t),
            get size() {
                return zt(t, Ot, e), t.size
            }
        }),
        WeakMap: (t, e) => ({
            has: Jt("has", t, e),
            get: Jt("get", t, e),
            set: ee("set", "get", t),
            delete: ee("delete", "has", t)
        })
    };

    class re extends EventTarget {
        trigger(t, e) {
            this.dispatchEvent(new CustomEvent(t, {detail: e}))
        }
    }

    class ie extends String {
    }

    let se = null;

    function le() {
        if (!se) throw new i("No active component (a hook function should only be called in 'setup')");
        return se
    }

    function ae(t, e) {
        for (let n in e) void 0 === t[n] && (t[n] = e[n])
    }

    const ce = new WeakMap;

    function he(t) {
        const e = le();
        let n = ce.get(e);
        return n || (n = function (t) {
            let e = !1;
            return async () => {
                await Promise.resolve(), e || (e = !0, Promise.resolve().then((() => e = !1)), t())
            }
        }(e.render.bind(e, !1)), ce.set(e, n), e.willDestroy.push(qt.bind(null, n))), Yt(t, n)
    }

    class ue {
        constructor(t, e, n, o, r) {
            this.fiber = null, this.bdom = null, this.status = 0, this.forceNextRender = !1, this.children = Object.create(null), this.refs = {}, this.willStart = [], this.willUpdateProps = [], this.willUnmount = [], this.mounted = [], this.willPatch = [], this.patched = [], this.willDestroy = [], se = this, this.app = n, this.parent = o, this.props = e, this.parentKey = r;
            const i = t.defaultProps;
            e = Object.assign({}, e), i && ae(e, i);
            const s = o && o.childEnv || n.env;
            this.childEnv = s;
            for (const t in e) {
                const n = e[t];
                n && "object" == typeof n && Gt.has(n) && (e[t] = he(n))
            }
            this.component = new t(e, s, this), this.renderFn = n.getTemplate(t.template).bind(this.component, this.component, this), this.component.setup(), se = null
        }

        mountComponent(t, e) {
            const n = new Dt(this, t, e);
            this.app.scheduler.addFiber(n), this.initiateRender(n)
        }

        async initiateRender(t) {
            this.fiber = t, this.mounted.length && t.root.mounted.push(t);
            const e = this.component;
            try {
                await Promise.all(this.willStart.map((t => t.call(e))))
            } catch (t) {
                return void this.app.handleError({node: this, error: t})
            }
            0 === this.status && this.fiber === t && t.render()
        }

        async render(t) {
            let e = this.fiber;
            if (e && (e.root.locked || !0 === e.bdom) && (await Promise.resolve(), e = this.fiber), e) {
                if (!e.bdom && !s.has(e)) return void (t && (e.deep = t));
                t = t || e.deep
            } else if (!this.bdom) return;
            const n = function (t) {
                let e = t.fiber;
                if (e) {
                    let t = e.root;
                    return t.locked = !0, t.setCounter(t.counter + 1 - _t(e.children)), t.locked = !1, e.children = [], e.childrenMap = {}, e.bdom = null, s.has(e) && (s.delete(e), s.delete(t), e.appliedToDom = !1), e
                }
                const n = new Ct(t, null);
                return t.willPatch.length && n.willPatch.push(n), t.patched.length && n.patched.push(n), n
            }(this);
            n.deep = t, this.fiber = n, this.app.scheduler.addFiber(n), await Promise.resolve(), 2 !== this.status && (this.fiber !== n || !e && n.parent || n.render())
        }

        destroy() {
            let t = 1 === this.status;
            this._destroy(), t && this.bdom.remove()
        }

        _destroy() {
            const t = this.component;
            if (1 === this.status) for (let e of this.willUnmount) e.call(t);
            for (let t of Object.values(this.children)) t._destroy();
            if (this.willDestroy.length) try {
                for (let e of this.willDestroy) e.call(t)
            } catch (t) {
                this.app.handleError({error: t, node: this})
            }
            this.status = 2
        }

        async updateAndRender(t, e) {
            const n = t;
            t = Object.assign({}, t);
            const o = function (t, e) {
                let n = t.fiber;
                return n && (_t(n.children), n.root = null), new St(t, e)
            }(this, e);
            this.fiber = o;
            const r = this.component, i = r.constructor.defaultProps;
            i && ae(t, i), se = this;
            for (const e in t) {
                const n = t[e];
                n && "object" == typeof n && Gt.has(n) && (t[e] = he(n))
            }
            se = null;
            const s = Promise.all(this.willUpdateProps.map((e => e.call(r, t))));
            if (await s, o !== this.fiber) return;
            r.props = t, this.props = n, o.render();
            const l = e.root;
            this.willPatch.length && l.willPatch.push(o), this.patched.length && l.patched.push(o)
        }

        updateDom() {
            if (this.fiber) if (this.bdom === this.fiber.bdom) for (let t in this.children) {
                this.children[t].updateDom()
            } else this.bdom.patch(this.fiber.bdom, !1), this.fiber.appliedToDom = !0, this.fiber = null
        }

        firstNode() {
            const t = this.bdom;
            return t ? t.firstNode() : void 0
        }

        mount(t, e) {
            const n = this.fiber.bdom;
            this.bdom = n, n.mount(t, e), this.status = 1, this.fiber.appliedToDom = !0, this.children = this.fiber.childrenMap, this.fiber = null
        }

        moveBeforeDOMNode(t, e) {
            this.bdom.moveBeforeDOMNode(t, e)
        }

        moveBeforeVNode(t, e) {
            this.bdom.moveBeforeVNode(t ? t.bdom : null, e)
        }

        patch() {
            this.fiber && this.fiber.parent && this._patch()
        }

        _patch() {
            let t = !1;
            for (let e in this.children) {
                t = !0;
                break
            }
            const e = this.fiber;
            this.children = e.childrenMap, this.bdom.patch(e.bdom, t), e.appliedToDom = !0, this.fiber = null
        }

        beforeRemove() {
            this._destroy()
        }

        remove() {
            this.bdom.remove()
        }

        get name() {
            return this.component.constructor.name
        }

        get subscriptions() {
            const t = ce.get(this);
            return t ? (e = t, [...Ut.get(e) || []].map((t => {
                const e = Kt.get(t);
                return {target: t, keys: e ? [...e.keys()] : []}
            }))) : [];
            var e
        }
    }

    const de = Symbol("timeout");

    function fe(t, e) {
        const n = new i(`The following error occurred in ${e}: `),
            o = new i(`${e}'s promise hasn't resolved after 3 seconds`), r = le();
        return (...i) => {
            const s = t => {
                throw n.cause = t, t instanceof Error ? n.message += `"${t.message}"` : n.message = `Something that is not an Error was thrown in ${e} (see this Error's "cause" property)`, n
            };
            try {
                const n = t(...i);
                if (n instanceof Promise) {
                    if ("onWillStart" === e || "onWillUpdateProps" === e) {
                        const t = r.fiber;
                        Promise.race([n.catch((() => {
                        })), new Promise((t => setTimeout((() => t(de)), 3e3)))]).then((e => {
                            e === de && r.fiber === t && console.warn(o)
                        }))
                    }
                    return n.catch(s)
                }
                return n
            } catch (t) {
                s(t)
            }
        }
    }

    function pe(t) {
        const e = le(), n = e.app.dev ? fe : t => t;
        e.mounted.push(n(t.bind(e.component), "onMounted"))
    }

    function me(t) {
        const e = le(), n = e.app.dev ? fe : t => t;
        e.patched.push(n(t.bind(e.component), "onPatched"))
    }

    function ge(t) {
        const e = le(), n = e.app.dev ? fe : t => t;
        e.willUnmount.unshift(n(t.bind(e.component), "onWillUnmount"))
    }

    class be {
        constructor(t, e, n) {
            this.props = t, this.env = e, this.__owl__ = n
        }

        setup() {
        }

        render(t = !1) {
            this.__owl__.render(!0 === t)
        }
    }

    be.template = "";
    const ve = G("").constructor;

    class ye extends ve {
        constructor(t, e) {
            super(""), this.target = null, this.selector = t, this.content = e
        }

        mount(t, e) {
            super.mount(t, e), this.target = document.querySelector(this.selector), this.target ? this.content.mount(this.target, null) : this.content.mount(t, e)
        }

        beforeRemove() {
            this.content.beforeRemove()
        }

        remove() {
            this.content && (super.remove(), this.content.remove(), this.content = null)
        }

        patch(t) {
            super.patch(t), this.content ? this.content.patch(t.content, !0) : (this.content = t.content, this.content.mount(this.target, null))
        }
    }

    class we extends be {
        setup() {
            const t = this.__owl__;
            pe((() => {
                const e = t.bdom;
                if (!e.target) {
                    const t = document.querySelector(this.props.target);
                    if (!t) throw new i("invalid portal target");
                    e.content.moveBeforeDOMNode(t.firstChild, t)
                }
            })), ge((() => {
                t.bdom.remove()
            }))
        }
    }

    we.template = "__portal__", we.props = {target: {type: String}, slots: !0};
    const $e = t => Array.isArray(t), xe = t => "object" != typeof t,
        Ne = t => "object" == typeof t && t && "value" in t;

    function ke(t) {
        return "object" == typeof t && "optional" in t && t.optional || !1
    }

    function Ee(t) {
        return "*" === t || !0 === t ? "value" : t.name.toLowerCase()
    }

    function Ae(t) {
        return xe(t) ? Ee(t) : $e(t) ? t.map(Ae).join(" or ") : Ne(t) ? String(t.value) : "element" in t ? `list of ${Ae({
            type: t.element,
            optional: !1
        })}s` : "shape" in t ? "object" : Ae(t.type || "*")
    }

    function Te(t, e) {
        var n;
        Array.isArray(e) && (n = e, e = Object.fromEntries(n.map((t => t.endsWith("?") ? [t.slice(0, -1), {optional: !0}] : [t, {
            type: "*",
            optional: !1
        }]))));
        let o = [];
        for (let n in t) if (n in e) {
            let r = _e(n, t[n], e[n]);
            r && o.push(r)
        } else "*" in e || o.push(`unknown key '${n}'`);
        for (let n in e) {
            const r = e[n];
            if ("*" !== n && !ke(r) && !(n in t)) {
                const t = "object" == typeof r && !Array.isArray(r);
                let e = "*" === r || (t && "type" in r ? "*" === r.type : t) ? "" : ` (should be a ${Ae(r)})`;
                o.push(`'${n}' is missing${e}`)
            }
        }
        return o
    }

    function _e(t, e, n) {
        if (void 0 === e) return ke(n) ? null : `'${t}' is undefined (should be a ${Ae(n)})`;
        if (xe(n)) return function (t, e, n) {
            if ("function" == typeof n) if ("object" == typeof e) {
                if (!(e instanceof n)) return `'${t}' is not a ${Ee(n)}`
            } else if (typeof e !== n.name.toLowerCase()) return `'${t}' is not a ${Ee(n)}`;
            return null
        }(t, e, n);
        if (Ne(n)) return e === n.value ? null : `'${t}' is not equal to '${n.value}'`;
        if ($e(n)) {
            let o = n.find((n => !_e(t, e, n)));
            return o ? null : `'${t}' is not a ${Ae(n)}`
        }
        let o = null;
        if ("element" in n) o = function (t, e, n) {
            if (!Array.isArray(e)) return `'${t}' is not a list of ${Ae(n)}s`;
            for (let o = 0; o < e.length; o++) {
                const r = _e(`${t}[${o}]`, e[o], n);
                if (r) return r
            }
            return null
        }(t, e, n.element); else if ("shape" in n && !o) if ("object" != typeof e || Array.isArray(e)) o = `'${t}' is not an object`; else {
            const r = Te(e, n.shape);
            r.length && (o = `'${t}' has not the correct shape (${r.join(", ")})`)
        }
        return "type" in n && !o && (o = _e(t, e, n.type)), "validate" in n && !o && (o = n.validate(e) ? null : `'${t}' is not valid`), o
    }

    const Se = Object.create;

    function Ce(t, e) {
        const n = Se(e);
        for (let e in t) n[e] = t[e];
        return n
    }

    const De = Symbol("isBoundary");

    class Oe {
        constructor(t, e, n, o, r) {
            this.fn = t, this.ctx = Ce(e, n), this.component = n, this.node = o, this.key = r
        }

        evaluate() {
            return this.fn.call(this.component, this.ctx, this.node, this.key)
        }

        toString() {
            return this.evaluate().toString()
        }
    }

    let Le = new WeakMap;
    const Be = WeakMap.prototype.get, Re = WeakMap.prototype.set;

    function Me(t, e, n) {
        const o = "string" != typeof t ? t : n.constructor.components[t];
        if (!o) return;
        const r = o.props;
        if (!r) return void (n.__owl__.app.warnIfNoStaticProps && console.warn(`Component '${o.name}' does not have a static props description`));
        const s = o.defaultProps;
        if (s) {
            let t = t => Array.isArray(r) ? r.includes(t) : t in r && !("*" in r) && !ke(r[t]);
            for (let e in s) if (t(e)) throw new i(`A default value cannot be defined for a mandatory prop (name: '${e}', component: ${o.name})`)
        }
        const l = Te(e, r);
        if (l.length) throw new i(`Invalid props for component '${o.name}': ` + l.join(", "))
    }

    const Pe = {
        withDefault: function (t, e) {
            return null == t || !1 === t ? e : t
        }, zero: Symbol("zero"), isBoundary: De, callSlot: function (t, e, n, o, i, s, l) {
            n = n + "__slot_" + o;
            const a = t.props.slots || {}, {__render: c, __ctx: h, __scope: u} = a[o] || {}, d = Se(h || {});
            u && (d[u] = s);
            const f = c ? c(d, e, n) : null;
            if (l) {
                let s, a;
                return f ? s = i ? r(o, f) : f : a = l(t, e, n), j([s, a])
            }
            return f || G("")
        }, capture: Ce, withKey: function (t, e) {
            return t.key = e, t
        }, prepareList: function (t) {
            let e, n;
            if (Array.isArray(t)) e = t, n = t; else {
                if (!t) throw new i("Invalid loop expression");
                n = Object.keys(t), e = Object.values(t)
            }
            const o = n.length;
            return [e, n, o, new Array(o)]
        }, setContextValue: function (t, e, n) {
            const o = t;
            for (; !t.hasOwnProperty(e) && !t.hasOwnProperty(De);) {
                const e = t.__proto__;
                if (!e) {
                    t = o;
                    break
                }
                t = e
            }
            t[e] = n
        }, multiRefSetter: function (t, e) {
            let n = 0;
            return o => {
                if (o && (n++, n > 1)) throw new i("Cannot have 2 elements with same ref name at the same time");
                (0 === n || o) && (t[e] = o)
            }
        }, shallowEqual: function (t, e) {
            for (let n = 0, o = t.length; n < o; n++) if (t[n] !== e[n]) return !1;
            return !0
        }, toNumber: function (t) {
            const e = parseFloat(t);
            return isNaN(e) ? t : e
        }, validateProps: Me, LazyValue: Oe, safeOutput: function (t, e) {
            if (void 0 === t) return e ? r("default", e) : r("undefined", G(""));
            let n, o;
            switch (typeof t) {
                case"object":
                    t instanceof ie ? (n = "string_safe", o = Et(t)) : t instanceof Oe ? (n = "lazy_value", o = t.evaluate()) : t instanceof String ? (n = "string_unsafe", o = G(t)) : (n = "block_safe", o = t);
                    break;
                case"string":
                    n = "string_unsafe", o = G(t);
                    break;
                default:
                    n = "string_unsafe", o = G(String(t))
            }
            return r(n, o)
        }, bind: function (t, e) {
            let n = Be.call(Le, t);
            n || (n = new WeakMap, Re.call(Le, t, n));
            let o = Be.call(n, e);
            return o || (o = e.bind(t), Re.call(n, e, o)), o
        }, createCatcher: function (t) {
            const e = Object.keys(t).length;

            class n {
                constructor(t, e) {
                    this.handlerFns = [], this.afterNode = null, this.child = t, this.handlerData = e
                }

                mount(e, n) {
                    this.parentEl = e, this.child.mount(e, n), this.afterNode = document.createTextNode(""), e.insertBefore(this.afterNode, n), this.wrapHandlerData();
                    for (let n in t) {
                        const o = t[n], r = _(n);
                        this.handlerFns[o] = r, r.setup.call(e, this.handlerData[o])
                    }
                }

                wrapHandlerData() {
                    for (let t = 0; t < e; t++) {
                        let e = this.handlerData[t], n = e.length - 2, o = e[n];
                        const r = this;
                        e[n] = function (t) {
                            const e = t.target;
                            let n = r.child.firstNode();
                            const i = r.afterNode;
                            for (; n && n !== i;) {
                                if (n.contains(e)) return o.call(this, t);
                                n = n.nextSibling
                            }
                        }
                    }
                }

                moveBeforeDOMNode(t, e = this.parentEl) {
                    this.parentEl = e, this.child.moveBeforeDOMNode(t, e), e.insertBefore(this.afterNode, t)
                }

                moveBeforeVNode(t, e) {
                    t && (e = t.firstNode() || e), this.child.moveBeforeVNode(t ? t.child : null, e), this.parentEl.insertBefore(this.afterNode, e)
                }

                patch(t, n) {
                    if (this !== t) {
                        this.handlerData = t.handlerData, this.wrapHandlerData();
                        for (let t = 0; t < e; t++) this.handlerFns[t].update.call(this.parentEl, this.handlerData[t]);
                        this.child.patch(t.child, n)
                    }
                }

                beforeRemove() {
                    this.child.beforeRemove()
                }

                remove() {
                    for (let t = 0; t < e; t++) this.handlerFns[t].remove.call(this.parentEl);
                    this.child.remove(), this.afterNode.remove()
                }

                firstNode() {
                    return this.child.firstNode()
                }

                toString() {
                    return this.child.toString()
                }
            }

            return function (t, e) {
                return new n(t, e)
            }
        }, markRaw: Vt, OwlError: i
    }, Ie = {text: G, createBlock: it, list: yt, multi: j, html: Et, toggler: r, comment: X};

    class je {
        constructor(t = {}) {
            this.rawTemplates = Object.create(We), this.templates = {}, this.Portal = we, this.dev = t.dev || !1, this.translateFn = t.translateFn, this.translatableAttributes = t.translatableAttributes, t.templates && this.addTemplates(t.templates)
        }

        static registerTemplate(t, e) {
            We[t] = e
        }

        addTemplate(t, e) {
            if (t in this.rawTemplates) {
                const n = this.rawTemplates[t];
                if (("string" == typeof n ? n : n instanceof Element ? n.outerHTML : n.toString()) === ("string" == typeof e ? e : e.outerHTML)) return;
                throw new i(`Template ${t} already defined with different content`)
            }
            this.rawTemplates[t] = e
        }

        addTemplates(t) {
            if (t) {
                t = t instanceof Document ? t : function (t) {
                    const e = (new DOMParser).parseFromString(t, "text/xml");
                    if (e.getElementsByTagName("parsererror").length) {
                        let n = "Invalid XML in template.";
                        const o = e.getElementsByTagName("parsererror")[0].textContent;
                        if (o) {
                            n += "\nThe parser has produced the following error message:\n" + o;
                            const e = /\d+/g, r = e.exec(o);
                            if (r) {
                                const i = Number(r[0]), s = t.split("\n")[i - 1], l = e.exec(o);
                                if (s && l) {
                                    const t = Number(l[0]) - 1;
                                    s[t] && (n += `\nThe error might be located at xml line ${i} column ${t}\n${s}\n${"-".repeat(t - 1)}^`)
                                }
                            }
                        }
                        throw new i(n)
                    }
                    return e
                }(t);
                for (const e of t.querySelectorAll("[t-name]")) {
                    const t = e.getAttribute("t-name");
                    this.addTemplate(t, e)
                }
            }
        }

        getTemplate(t) {
            if (!(t in this.templates)) {
                const e = this.rawTemplates[t];
                if (void 0 === e) {
                    let e = "";
                    try {
                        e = ` (for component "${le().component.constructor.name}")`
                    } catch {
                    }
                    throw new i(`Missing template: "${t}"${e}`)
                }
                const n = "function" == typeof e && !(e instanceof Element) ? e : this._compileTemplate(t, e),
                    o = this.templates;
                this.templates[t] = function (e, n) {
                    return o[t].call(this, e, n)
                };
                const r = n(this, Ie, Pe);
                this.templates[t] = r
            }
            return this.templates[t]
        }

        _compileTemplate(t, e) {
            throw new i("Unable to compile a template. Please use owl full build instead")
        }

        callTemplate(t, e, n, o, i) {
            return r(e, this.getTemplate(e).call(t, n, o, i))
        }
    }

    const We = {};

    function Ve(...t) {
        const e = "__template__" + Ve.nextId++, n = String.raw(...t);
        return We[e] = n, e
    }

    Ve.nextId = 1, je.registerTemplate("__portal__", (function (t, e, n) {
        let {callSlot: o} = n;
        return function (t, e, n = "") {
            return new ye(t.props.target, o(t, e, n, "default", !1, null))
        }
    }));
    const Fe = "true,false,NaN,null,undefined,debugger,console,window,in,instanceof,new,function,return,this,eval,void,Math,RegExp,Array,Object,Date".split(","),
        Ke = Object.assign(Object.create(null), {and: "&&", or: "||", gt: ">", gte: ">=", lt: "<", lte: "<="}),
        ze = Object.assign(Object.create(null), {
            "{": "LEFT_BRACE",
            "}": "RIGHT_BRACE",
            "[": "LEFT_BRACKET",
            "]": "RIGHT_BRACKET",
            ":": "COLON",
            ",": "COMMA",
            "(": "LEFT_PAREN",
            ")": "RIGHT_PAREN"
        }), He = "...,.,===,==,+,!==,!=,!,||,&&,>=,>,<=,<,?,-,*,/,%,typeof ,=>,=,;,in ,new ,|,&,^,~".split(",");
    const Ue = [function (t) {
        let e = t[0], n = e;
        if ("'" !== e && '"' !== e && "`" !== e) return !1;
        let o, r = 1;
        for (; t[r] && t[r] !== n;) {
            if (o = t[r], e += o, "\\" === o) {
                if (r++, o = t[r], !o) throw new i("Invalid expression");
                e += o
            }
            r++
        }
        if (t[r] !== n) throw new i("Invalid expression");
        return e += n, "`" === n ? {
            type: "TEMPLATE_STRING",
            value: e,
            replace: t => e.replace(/\$\{(.*?)\}/g, ((e, n) => "${" + t(n) + "}"))
        } : {type: "VALUE", value: e}
    }, function (t) {
        let e = t[0];
        if (e && e.match(/[0-9]/)) {
            let n = 1;
            for (; t[n] && t[n].match(/[0-9]|\./);) e += t[n], n++;
            return {type: "VALUE", value: e}
        }
        return !1
    }, function (t) {
        for (let e of He) if (t.startsWith(e)) return {type: "OPERATOR", value: e};
        return !1
    }, function (t) {
        let e = t[0];
        if (e && e.match(/[a-zA-Z_\$]/)) {
            let n = 1;
            for (; t[n] && t[n].match(/\w/);) e += t[n], n++;
            return e in Ke ? {type: "OPERATOR", value: Ke[e], size: e.length} : {type: "SYMBOL", value: e}
        }
        return !1
    }, function (t) {
        const e = t[0];
        return !(!e || !(e in ze)) && {type: ze[e], value: e}
    }];
    const qe = t => t && ("LEFT_BRACE" === t.type || "COMMA" === t.type),
        Ge = t => t && ("RIGHT_BRACE" === t.type || "COMMA" === t.type);

    function Xe(t) {
        const e = new Set, n = function (t) {
            const e = [];
            let n, o = !0, r = t;
            try {
                for (; o;) if (r = r.trim(), r) {
                    for (let t of Ue) if (o = t(r), o) {
                        e.push(o), r = r.slice(o.size || o.value.length);
                        break
                    }
                } else o = !1
            } catch (t) {
                n = t
            }
            if (r.length || n) throw new i(`Tokenizer error: could not tokenize \`${t}\``);
            return e
        }(t);
        let o = 0, r = [];
        for (; o < n.length;) {
            let t = n[o], i = n[o - 1], s = n[o + 1], l = r[r.length - 1];
            switch (t.type) {
                case"LEFT_BRACE":
                case"LEFT_BRACKET":
                    r.push(t.type);
                    break;
                case"RIGHT_BRACE":
                case"RIGHT_BRACKET":
                    r.pop()
            }
            let a = "SYMBOL" === t.type && !Fe.includes(t.value);
            if ("SYMBOL" !== t.type || Fe.includes(t.value) || i && ("LEFT_BRACE" === l && qe(i) && Ge(s) && (n.splice(o + 1, 0, {
                type: "COLON",
                value: ":"
            }, {...t}), s = n[o + 1]), "OPERATOR" === i.type && "." === i.value ? a = !1 : "LEFT_BRACE" !== i.type && "COMMA" !== i.type || s && "COLON" === s.type && (a = !1)), "TEMPLATE_STRING" === t.type && (t.value = t.replace((t => Ze(t)))), s && "OPERATOR" === s.type && "=>" === s.value) if ("RIGHT_PAREN" === t.type) {
                let t = o - 1;
                for (; t > 0 && "LEFT_PAREN" !== n[t].type;) "SYMBOL" === n[t].type && n[t].originalValue && (n[t].value = n[t].originalValue, e.add(n[t].value)), t--
            } else e.add(t.value);
            a && (t.varName = t.value, e.has(t.value) || (t.originalValue = t.value, t.value = `ctx['${t.value}']`)), o++
        }
        for (const t of n) "SYMBOL" === t.type && t.varName && e.has(t.value) && (t.originalValue = t.value, t.value = `_${t.value}`, t.isLocal = !0);
        return n
    }

    const Ye = new Map([["in ", " in "]]);

    function Ze(t) {
        return Xe(t).map((t => Ye.get(t.value) || t.value)).join("")
    }

    const Je = /\{\{.*?\}\}|\#\{.*?\}/g;

    function Qe(t, e) {
        let n = t.match(Je);
        if (n && n[0].length === t.length) return `(${e(t.slice(2, "{" === n[0][0] ? -2 : -1))})`;
        let o = t.replace(Je, (t => "${" + e(t.slice(2, "{" === t[0] ? -2 : -1)) + "}"));
        return "`" + o + "`"
    }

    function tn(t) {
        return Qe(t, Ze)
    }

    const en = document.implementation.createDocument(null, null, null),
        nn = new Set(["stop", "capture", "prevent", "self", "synthetic"]);
    let on = {};

    function rn(t = "") {
        return on[t] = (on[t] || 0) + 1, t + on[t]
    }

    class sn {
        constructor(t, e) {
            this.dynamicTagName = null, this.isRoot = !1, this.hasDynamicChildren = !1, this.children = [], this.data = [], this.childNumber = 0, this.parentVar = "", this.id = sn.nextBlockId++, this.varName = "b" + this.id, this.blockName = "block" + this.id, this.target = t, this.type = e
        }

        insertData(t, e = "d") {
            const n = rn(e);
            return this.target.addLine(`let ${n} = ${t};`), this.data.push(n) - 1
        }

        insert(t) {
            this.currentDom ? this.currentDom.appendChild(t) : this.dom = t
        }

        generateExpr(t) {
            if ("block" === this.type) {
                const t = this.children.length;
                let e = this.data.length ? `[${this.data.join(", ")}]` : t ? "[]" : "";
                return t && (e += ", [" + this.children.map((t => t.varName)).join(", ") + "]"), this.dynamicTagName ? `toggler(${this.dynamicTagName}, ${this.blockName}(${this.dynamicTagName})(${e}))` : `${this.blockName}(${e})`
            }
            return "list" === this.type ? `list(c_block${this.id})` : t
        }

        asXmlString() {
            const t = en.createElement("t");
            return t.appendChild(this.dom), t.innerHTML
        }
    }

    function ln(t, e) {
        return Object.assign({
            block: null,
            index: 0,
            forceNewBlock: !0,
            translate: t.translate,
            tKeyExpr: null,
            nameSpace: t.nameSpace,
            tModelSelectedExpr: t.tModelSelectedExpr
        }, e)
    }

    sn.nextBlockId = 1;

    class an {
        constructor(t, e) {
            this.indentLevel = 0, this.loopLevel = 0, this.code = [], this.hasRoot = !1, this.hasCache = !1, this.hasRef = !1, this.refInfo = {}, this.shouldProtectScope = !1, this.name = t, this.on = e || null
        }

        addLine(t, e) {
            const n = new Array(this.indentLevel + 2).join("  ");
            void 0 === e ? this.code.push(n + t) : this.code.splice(e, 0, n + t)
        }

        generateCode() {
            let t = [];
            if (t.push(`function ${this.name}(ctx, node, key = "") {`), this.hasRef) {
                t.push("  const refs = this.__owl__.refs;");
                for (let e in this.refInfo) {
                    const [n, o] = this.refInfo[e];
                    t.push(`  const ${n} = ${o};`)
                }
            }
            this.shouldProtectScope && (t.push("  ctx = Object.create(ctx);"), t.push("  ctx[isBoundary] = 1")), this.hasCache && (t.push("  let cache = ctx.cache || {};"), t.push("  let nextCache = ctx.cache = {};"));
            for (let e of this.code) t.push(e);
            return this.hasRoot || t.push("return text('');"), t.push("}"), t.join("\n  ")
        }

        currentKey(t) {
            let e = this.loopLevel ? `key${this.loopLevel}` : "key";
            return t.tKeyExpr && (e = `${t.tKeyExpr} + ${e}`), e
        }
    }

    const cn = ["label", "title", "placeholder", "alt"], hn = /^(\s*)([\s\S]+?)(\s*)$/;

    class un {
        constructor(t, e) {
            if (this.blocks = [], this.nextBlockId = 1, this.isDebug = !1, this.targets = [], this.target = new an("template"), this.translatableAttributes = cn, this.staticDefs = [], this.slotNames = new Set, this.helpers = new Set, this.translateFn = e.translateFn || (t => t), e.translatableAttributes) {
                const t = new Set(cn);
                for (let n of e.translatableAttributes) n.startsWith("-") ? t.delete(n.slice(1)) : t.add(n);
                this.translatableAttributes = [...t]
            }
            this.hasSafeContext = e.hasSafeContext || !1, this.dev = e.dev || !1, this.ast = t, this.templateName = e.name
        }

        generateCode() {
            const t = this.ast;
            this.isDebug = 12 === t.type, sn.nextBlockId = 1, on = {}, this.compileAST(t, {
                block: null,
                index: 0,
                forceNewBlock: !1,
                isLast: !0,
                translate: !0,
                tKeyExpr: null
            });
            let e = ["  let { text, createBlock, list, multi, html, toggler, comment } = bdom;"];
            this.helpers.size && e.push(`let { ${[...this.helpers].join(", ")} } = helpers;`), this.templateName && e.push(`// Template name: "${this.templateName}"`);
            for (let {id: t, expr: n} of this.staticDefs) e.push(`const ${t} = ${n};`);
            if (this.blocks.length) {
                e.push("");
                for (let t of this.blocks) if (t.dom) {
                    let n = t.asXmlString();
                    n = n.replace(/`/g, "\\`"), t.dynamicTagName ? (n = n.replace(/^<\w+/, `<\${tag || '${t.dom.nodeName}'}`), n = n.replace(/\w+>$/, `\${tag || '${t.dom.nodeName}'}>`), e.push(`let ${t.blockName} = tag => createBlock(\`${n}\`);`)) : e.push(`let ${t.blockName} = createBlock(\`${n}\`);`)
                }
            }
            if (this.targets.length) for (let t of this.targets) e.push(""), e = e.concat(t.generateCode());
            e.push(""), e = e.concat("return " + this.target.generateCode());
            const n = e.join("\n  ");
            if (this.isDebug) {
                const t = `[Owl Debug]\n${n}`;
                console.log(t)
            }
            return n
        }

        compileInNewTarget(t, e, n, o) {
            const r = rn(t), i = this.target, s = new an(r, o);
            return this.targets.push(s), this.target = s, this.compileAST(e, ln(n)), this.target = i, r
        }

        addLine(t, e) {
            this.target.addLine(t, e)
        }

        define(t, e) {
            this.addLine(`const ${t} = ${e};`)
        }

        insertAnchor(t, e = t.children.length) {
            const n = `block-child-${e}`, o = en.createElement(n);
            t.insert(o)
        }

        createBlock(t, e, n) {
            const o = this.target.hasRoot, r = new sn(this.target, e);
            return o || n.preventRoot || (this.target.hasRoot = !0, r.isRoot = !0), t && (t.children.push(r), "list" === t.type && (r.parentVar = `c_block${t.id}`)), r
        }

        insertBlock(t, e, n) {
            let o = e.generateExpr(t);
            if (e.parentVar) {
                let t = this.target.currentKey(n);
                return this.helpers.add("withKey"), void this.addLine(`${e.parentVar}[${n.index}] = withKey(${o}, ${t});`)
            }
            n.tKeyExpr && (o = `toggler(${n.tKeyExpr}, ${o})`), e.isRoot && !n.preventRoot ? (this.target.on && (o = this.wrapWithEventCatcher(o, this.target.on)), this.addLine(`return ${o};`)) : this.define(e.varName, o)
        }

        captureExpression(t, e = !1) {
            if (!e && !t.includes("=>")) return Ze(t);
            const n = Xe(t), o = new Map;
            return n.map((t => {
                if (t.varName && !t.isLocal) {
                    if (!o.has(t.varName)) {
                        const e = rn("v");
                        o.set(t.varName, e), this.define(e, t.value)
                    }
                    t.value = o.get(t.varName)
                }
                return t.value
            })).join("")
        }

        compileAST(t, e) {
            switch (t.type) {
                case 1:
                    return this.compileComment(t, e);
                case 0:
                    return this.compileText(t, e);
                case 2:
                    return this.compileTDomNode(t, e);
                case 4:
                    return this.compileTEsc(t, e);
                case 8:
                    return this.compileTOut(t, e);
                case 5:
                    return this.compileTIf(t, e);
                case 9:
                    return this.compileTForeach(t, e);
                case 10:
                    return this.compileTKey(t, e);
                case 3:
                    return this.compileMulti(t, e);
                case 7:
                    return this.compileTCall(t, e);
                case 15:
                    return this.compileTCallBlock(t, e);
                case 6:
                    return this.compileTSet(t, e);
                case 11:
                    return this.compileComponent(t, e);
                case 12:
                    return this.compileDebug(t, e);
                case 13:
                    return this.compileLog(t, e);
                case 14:
                    return this.compileTSlot(t, e);
                case 16:
                    return this.compileTTranslation(t, e);
                case 17:
                    return this.compileTPortal(t, e)
            }
        }

        compileDebug(t, e) {
            return this.addLine("debugger;"), t.content ? this.compileAST(t.content, e) : null
        }

        compileLog(t, e) {
            return this.addLine(`console.log(${Ze(t.expr)});`), t.content ? this.compileAST(t.content, e) : null
        }

        compileComment(t, e) {
            let {block: n, forceNewBlock: o} = e;
            if (!n || o) n = this.createBlock(n, "comment", e), this.insertBlock(`comment(\`${t.value}\`)`, n, {
                ...e,
                forceNewBlock: o && !n
            }); else {
                const e = en.createComment(t.value);
                n.insert(e)
            }
            return n.varName
        }

        compileText(t, e) {
            let {block: n, forceNewBlock: o} = e, r = t.value;
            if (r && !1 !== e.translate) {
                const t = hn.exec(r);
                r = t[1] + this.translateFn(t[2]) + t[3]
            }
            if (!n || o) n = this.createBlock(n, "text", e), this.insertBlock(`text(\`${r}\`)`, n, {
                ...e,
                forceNewBlock: o && !n
            }); else {
                const e = 0 === t.type ? en.createTextNode : en.createComment;
                n.insert(e.call(en, r))
            }
            return n.varName
        }

        generateHandlerCode(t, e) {
            const n = t.split(".").slice(1).map((t => {
                if (!nn.has(t)) throw new i(`Unknown event modifier: '${t}'`);
                return `"${t}"`
            }));
            let o = "";
            return n.length && (o = `${n.join(",")}, `), `[${o}${this.captureExpression(e)}, ctx]`
        }

        compileTDomNode(t, e) {
            let {block: n, forceNewBlock: o} = e;
            const r = !n || o || null !== t.dynamicTag || t.ns;
            let i = this.target.code.length;
            if (r && ((t.dynamicTag || e.tKeyExpr || t.ns) && e.block && this.insertAnchor(e.block), n = this.createBlock(n, "block", e), this.blocks.push(n), t.dynamicTag)) {
                const e = rn("tag");
                this.define(e, Ze(t.dynamicTag)), n.dynamicTagName = e
            }
            const s = {}, l = t.ns || e.nameSpace;
            l && r && (s["block-ns"] = l);
            for (let o in t.attrs) {
                let r, i;
                if (o.startsWith("t-attf")) {
                    r = tn(t.attrs[o]);
                    const e = n.insertData(r, "attr");
                    i = o.slice(7), s["block-attribute-" + e] = i
                } else if (o.startsWith("t-att")) {
                    i = "t-att" === o ? null : o.slice(6), r = Ze(t.attrs[o]), i && T(t.tag, i) && (r = "value" === i ? `new String((${r}) || "")` : `new Boolean(${r})`);
                    const e = n.insertData(r, "attr");
                    "t-att" === o ? s["block-attributes"] = String(e) : s[`block-attribute-${e}`] = i
                } else this.translatableAttributes.includes(o) ? s[o] = this.translateFn(t.attrs[o]) : (r = `"${t.attrs[o]}"`, i = o, s[o] = t.attrs[o]);
                if ("value" === i && e.tModelSelectedExpr) {
                    s[`block-attribute-${n.insertData(`${e.tModelSelectedExpr} === ${r}`, "attr")}`] = "selected"
                }
            }
            let a;
            if (t.model) {
                const {
                    hasDynamicChildren: e,
                    baseExpr: o,
                    expr: r,
                    eventType: i,
                    shouldNumberize: l,
                    shouldTrim: c,
                    targetAttr: h,
                    specialInitTargetAttr: u
                } = t.model, d = Ze(o), f = rn("bExpr");
                this.define(f, d);
                const p = Ze(r), m = rn("expr");
                this.define(m, p);
                const g = `${f}[${m}]`;
                let b;
                if (u) b = n.insertData(`${g} === '${s[h]}'`, "attr"), s[`block-attribute-${b}`] = u; else if (e) {
                    a = `${rn("bValue")}`, this.define(a, g)
                } else b = n.insertData(`${g}`, "attr"), s[`block-attribute-${b}`] = h;
                this.helpers.add("toNumber");
                let v = `ev.target.${h}`;
                v = c ? `${v}.trim()` : v, v = l ? `toNumber(${v})` : v;
                const y = `[(ev) => { ${g} = ${v}; }]`;
                b = n.insertData(y, "hdlr"), s[`block-handler-${b}`] = i
            }
            for (let e in t.on) {
                const o = this.generateHandlerCode(e, t.on[e]);
                s[`block-handler-${n.insertData(o, "hdlr")}`] = e
            }
            if (t.ref) {
                this.target.hasRef = !0;
                if (Je.test(t.ref)) {
                    const e = Qe(t.ref, (t => this.captureExpression(t, !0))),
                        o = n.insertData(`(el) => refs[${e}] = el`, "ref");
                    s["block-ref"] = String(o)
                } else {
                    let e = t.ref;
                    if (e in this.target.refInfo) {
                        this.helpers.add("multiRefSetter");
                        const t = this.target.refInfo[e], o = n.data.push(t[0]) - 1;
                        s["block-ref"] = String(o), t[1] = `multiRefSetter(refs, \`${e}\`)`
                    } else {
                        let t = rn("ref");
                        this.target.refInfo[e] = [t, `(el) => refs[\`${e}\`] = el`];
                        const o = n.data.push(t) - 1;
                        s["block-ref"] = String(o)
                    }
                }
            }
            const c = en.createElement(t.tag);
            for (const [t, e] of Object.entries(s)) "class" === t && "" === e || c.setAttribute(t, e);
            if (n.insert(c), t.content.length) {
                const o = n.currentDom;
                n.currentDom = c;
                const r = t.content;
                for (let o = 0; o < r.length; o++) {
                    const i = t.content[o], s = ln(e, {
                        block: n,
                        index: n.childNumber,
                        forceNewBlock: !1,
                        isLast: e.isLast && o === r.length - 1,
                        tKeyExpr: e.tKeyExpr,
                        nameSpace: l,
                        tModelSelectedExpr: a
                    });
                    this.compileAST(i, s)
                }
                n.currentDom = o
            }
            if (r && (this.insertBlock(`${n.blockName}(ddd)`, n, e), n.children.length && n.hasDynamicChildren)) {
                const t = this.target.code, e = n.children.slice();
                let o = e.shift();
                for (let n = i; n < t.length && (!t[n].trimStart().startsWith(`const ${o.varName} `) || (t[n] = t[n].replace(`const ${o.varName}`, o.varName), o = e.shift(), o)); n++) ;
                this.addLine(`let ${n.children.map((t => t.varName))};`, i)
            }
            return n.varName
        }

        compileTEsc(t, e) {
            let n, {block: o, forceNewBlock: r} = e;
            if ("0" === t.expr ? (this.helpers.add("zero"), n = "ctx[zero]") : (n = Ze(t.expr), t.defaultValue && (this.helpers.add("withDefault"), n = `withDefault(${n}, \`${t.defaultValue}\`)`)), !o || r) o = this.createBlock(o, "text", e), this.insertBlock(`text(${n})`, o, {
                ...e,
                forceNewBlock: r && !o
            }); else {
                const t = o.insertData(n, "txt"), e = en.createElement(`block-text-${t}`);
                o.insert(e)
            }
            return o.varName
        }

        compileTOut(t, e) {
            let n, {block: o} = e;
            if (o && this.insertAnchor(o), o = this.createBlock(o, "html", e), "0" === t.expr) this.helpers.add("zero"), n = "ctx[zero]"; else if (t.body) {
                let o = null;
                o = sn.nextBlockId;
                const r = ln(e);
                this.compileAST({
                    type: 3,
                    content: t.body
                }, r), this.helpers.add("safeOutput"), n = `safeOutput(${Ze(t.expr)}, b${o})`
            } else this.helpers.add("safeOutput"), n = `safeOutput(${Ze(t.expr)})`;
            return this.insertBlock(n, o, e), o.varName
        }

        compileTIfBranch(t, e, n) {
            this.target.indentLevel++;
            let o = e.children.length;
            this.compileAST(t, ln(n, {
                block: e,
                index: n.index
            })), e.children.length > o && this.insertAnchor(e, o), this.target.indentLevel--
        }

        compileTIf(t, e, n) {
            let {block: o, forceNewBlock: r} = e;
            const i = this.target.code.length, s = !o || "multi" !== o.type && r;
            if (o && (o.hasDynamicChildren = !0), (!o || "multi" !== o.type && r) && (o = this.createBlock(o, "multi", e)), this.addLine(`if (${Ze(t.condition)}) {`), this.compileTIfBranch(t.content, o, e), t.tElif) for (let n of t.tElif) this.addLine(`} else if (${Ze(n.condition)}) {`), this.compileTIfBranch(n.content, o, e);
            if (t.tElse && (this.addLine("} else {"), this.compileTIfBranch(t.tElse, o, e)), this.addLine("}"), s) {
                if (o.children.length) {
                    const t = this.target.code, e = o.children.slice();
                    let n = e.shift();
                    for (let o = i; o < t.length && (!t[o].trimStart().startsWith(`const ${n.varName} `) || (t[o] = t[o].replace(`const ${n.varName}`, n.varName), n = e.shift(), n)); o++) ;
                    this.addLine(`let ${o.children.map((t => t.varName))};`, i)
                }
                const t = o.children.map((t => t.varName)).join(", ");
                this.insertBlock(`multi([${t}])`, o, e)
            }
            return o.varName
        }

        compileTForeach(t, e) {
            let {block: n} = e;
            n && this.insertAnchor(n), n = this.createBlock(n, "list", e), this.target.loopLevel++;
            const o = `i${this.target.loopLevel}`;
            this.addLine("ctx = Object.create(ctx);");
            const r = `v_block${n.id}`, i = `k_block${n.id}`, s = `l_block${n.id}`, l = `c_block${n.id}`;
            let a;
            this.helpers.add("prepareList"), this.define(`[${i}, ${r}, ${s}, ${l}]`, `prepareList(${Ze(t.collection)});`), this.dev && this.define(`keys${n.id}`, "new Set()"), this.addLine(`for (let ${o} = 0; ${o} < ${s}; ${o}++) {`), this.target.indentLevel++, this.addLine(`ctx[\`${t.elem}\`] = ${r}[${o}];`), t.hasNoFirst || this.addLine(`ctx[\`${t.elem}_first\`] = ${o} === 0;`), t.hasNoLast || this.addLine(`ctx[\`${t.elem}_last\`] = ${o} === ${r}.length - 1;`), t.hasNoIndex || this.addLine(`ctx[\`${t.elem}_index\`] = ${o};`), t.hasNoValue || this.addLine(`ctx[\`${t.elem}_value\`] = ${i}[${o}];`), this.define(`key${this.target.loopLevel}`, t.key ? Ze(t.key) : o), this.dev && (this.helpers.add("OwlError"), this.addLine(`if (keys${n.id}.has(String(key${this.target.loopLevel}))) { throw new OwlError(\`Got duplicate key in t-foreach: \${key${this.target.loopLevel}}\`)}`), this.addLine(`keys${n.id}.add(String(key${this.target.loopLevel}));`)), t.memo && (this.target.hasCache = !0, a = rn(), this.define(`memo${a}`, Ze(t.memo)), this.define(`vnode${a}`, `cache[key${this.target.loopLevel}];`), this.addLine(`if (vnode${a}) {`), this.target.indentLevel++, this.addLine(`if (shallowEqual(vnode${a}.memo, memo${a})) {`), this.target.indentLevel++, this.addLine(`${l}[${o}] = vnode${a};`), this.addLine(`nextCache[key${this.target.loopLevel}] = vnode${a};`), this.addLine("continue;"), this.target.indentLevel--, this.addLine("}"), this.target.indentLevel--, this.addLine("}"));
            const c = ln(e, {block: n, index: o});
            return this.compileAST(t.body, c), t.memo && this.addLine(`nextCache[key${this.target.loopLevel}] = Object.assign(${l}[${o}], {memo: memo${a}});`), this.target.indentLevel--, this.target.loopLevel--, this.addLine("}"), e.isLast || this.addLine("ctx = ctx.__proto__;"), this.insertBlock("l", n, e), n.varName
        }

        compileTKey(t, e) {
            const n = rn("tKey_");
            return this.define(n, Ze(t.expr)), e = ln(e, {
                tKeyExpr: n,
                block: e.block,
                index: e.index
            }), this.compileAST(t.content, e)
        }

        compileMulti(t, e) {
            let {block: n, forceNewBlock: o} = e;
            const r = !n || o;
            let i = this.target.code.length;
            if (r) {
                let o = null;
                if (t.content.filter((t => 6 !== t.type)).length <= 1) {
                    for (let n of t.content) {
                        const t = this.compileAST(n, e);
                        o = o || t
                    }
                    return o
                }
                n = this.createBlock(n, "multi", e)
            }
            let s = 0;
            for (let o = 0, r = t.content.length; o < r; o++) {
                const i = t.content[o], l = 6 === i.type, a = ln(e, {
                    block: n,
                    index: s,
                    forceNewBlock: !l,
                    preventRoot: e.preventRoot,
                    isLast: e.isLast && o === r - 1
                });
                this.compileAST(i, a), l || s++
            }
            if (r) {
                if (n.hasDynamicChildren && n.children.length) {
                    const t = this.target.code, e = n.children.slice();
                    let o = e.shift();
                    for (let n = i; n < t.length && (!t[n].trimStart().startsWith(`const ${o.varName} `) || (t[n] = t[n].replace(`const ${o.varName}`, o.varName), o = e.shift(), o)); n++) ;
                    this.addLine(`let ${n.children.map((t => t.varName))};`, i)
                }
                const t = n.children.map((t => t.varName)).join(", ");
                this.insertBlock(`multi([${t}])`, n, e)
            }
            return n.varName
        }

        compileTCall(t, e) {
            let {block: n, forceNewBlock: o} = e, r = e.ctxVar || "ctx";
            if (t.context && (r = rn("ctx"), this.addLine(`let ${r} = ${Ze(t.context)};`)), t.body) {
                this.addLine(`${r} = Object.create(${r});`), this.addLine(`${r}[isBoundary] = 1;`), this.helpers.add("isBoundary");
                const n = ln(e, {preventRoot: !0, ctxVar: r}), o = this.compileMulti({type: 3, content: t.body}, n);
                o && (this.helpers.add("zero"), this.addLine(`${r}[zero] = ${o};`))
            }
            const i = Je.test(t.name), s = i ? tn(t.name) : "`" + t.name + "`";
            n && (o || this.insertAnchor(n));
            const l = `key + \`${this.generateComponentKey()}\``;
            if (i) {
                const t = rn("template");
                this.staticDefs.find((t => "call" === t.id)) || this.staticDefs.push({
                    id: "call",
                    expr: "app.callTemplate.bind(app)"
                }), this.define(t, s), n = this.createBlock(n, "multi", e), this.insertBlock(`call(this, ${t}, ${r}, node, ${l})`, n, {
                    ...e,
                    forceNewBlock: !n
                })
            } else {
                const t = rn("callTemplate_");
                this.staticDefs.push({
                    id: t,
                    expr: `app.getTemplate(${s})`
                }), n = this.createBlock(n, "multi", e), this.insertBlock(`${t}.call(this, ${r}, node, ${l})`, n, {
                    ...e,
                    forceNewBlock: !n
                })
            }
            return t.body && !e.isLast && this.addLine(`${r} = ${r}.__proto__;`), n.varName
        }

        compileTCallBlock(t, e) {
            let {block: n, forceNewBlock: o} = e;
            return n && (o || this.insertAnchor(n)), n = this.createBlock(n, "multi", e), this.insertBlock(Ze(t.name), n, {
                ...e,
                forceNewBlock: !n
            }), n.varName
        }

        compileTSet(t, e) {
            this.target.shouldProtectScope = !0, this.helpers.add("isBoundary").add("withDefault");
            const n = t.value ? Ze(t.value || "") : "null";
            if (t.body) {
                this.helpers.add("LazyValue");
                const o = {type: 3, content: t.body};
                let r = `new LazyValue(${this.compileInNewTarget("value", o, e)}, ctx, this, node, ${this.target.currentKey(e)})`;
                r = t.value ? r ? `withDefault(${n}, ${r})` : n : r, this.addLine(`ctx[\`${t.name}\`] = ${r};`)
            } else {
                let o;
                o = t.defaultValue ? t.value ? `withDefault(${n}, \`${t.defaultValue}\`)` : `\`${t.defaultValue}\`` : n, this.helpers.add("setContextValue"), this.addLine(`setContextValue(${e.ctxVar || "ctx"}, "${t.name}", ${o});`)
            }
            return null
        }

        generateComponentKey() {
            const t = [rn("__")];
            for (let e = 0; e < this.target.loopLevel; e++) t.push(`\${key${e + 1}}`);
            return t.join("__")
        }

        formatProp(t, e) {
            if (e = this.captureExpression(e), t.includes(".")) {
                let [n, o] = t.split(".");
                if ("bind" !== o) throw new i("Invalid prop suffix");
                this.helpers.add("bind"), t = n, e = `bind(this, ${e || void 0})`
            }
            return `${t = /^[a-z_]+$/i.test(t) ? t : `'${t}'`}: ${e || void 0}`
        }

        formatPropObject(t) {
            return Object.entries(t).map((([t, e]) => this.formatProp(t, e)))
        }

        getPropString(t, e) {
            let n = `{${t.join(",")}}`;
            return e && (n = `Object.assign({}, ${Ze(e)}${t.length ? ", " + n : ""})`), n
        }

        compileComponent(t, e) {
            let {block: n} = e;
            const o = "slots" in (t.props || {}), r = t.props ? this.formatPropObject(t.props) : [];
            let i = "";
            if (t.slots) {
                let n = "ctx";
                !this.target.loopLevel && this.hasSafeContext || (n = rn("ctx"), this.helpers.add("capture"), this.define(n, "capture(ctx, this)"));
                let o = [];
                for (let r in t.slots) {
                    const i = t.slots[r], s = [];
                    if (i.content) {
                        const t = this.compileInNewTarget("slot", i.content, e, i.on);
                        s.push(`__render: ${t}.bind(this), __ctx: ${n}`)
                    }
                    const l = t.slots[r].scope;
                    l && s.push(`__scope: "${l}"`), t.slots[r].attrs && s.push(...this.formatPropObject(t.slots[r].attrs));
                    const a = `{${s.join(", ")}}`;
                    o.push(`'${r}': ${a}`)
                }
                i = `{${o.join(", ")}}`
            }
            !i || t.dynamicProps || o || (this.helpers.add("markRaw"), r.push(`slots: markRaw(${i})`));
            let s, l = this.getPropString(r, t.dynamicProps);
            (i && (t.dynamicProps || o) || this.dev) && (s = rn("props"), this.define(s, l), l = s), i && (t.dynamicProps || o) && (this.helpers.add("markRaw"), this.addLine(`${s}.slots = markRaw(Object.assign(${i}, ${s}.slots))`));
            const a = this.generateComponentKey();
            let c;
            t.isDynamic ? (c = rn("Comp"), this.define(c, Ze(t.name))) : c = `\`${t.name}\``, this.dev && this.addLine(`helpers.validateProps(${c}, ${s}, this);`), n && (!1 === e.forceNewBlock || e.tKeyExpr) && this.insertAnchor(n);
            let h = `key + \`${a}\``;
            e.tKeyExpr && (h = `${e.tKeyExpr} + ${h}`);
            let u = rn("comp");
            this.staticDefs.push({
                id: u,
                expr: `app.createComponent(${t.isDynamic ? null : c}, ${!t.isDynamic}, ${!!t.slots}, ${!!t.dynamicProps}, ${!t.props && !t.dynamicProps})`
            });
            let d = `${u}(${l}, ${h}, node, this, ${t.isDynamic ? c : null})`;
            return t.isDynamic && (d = `toggler(${c}, ${d})`), t.on && (d = this.wrapWithEventCatcher(d, t.on)), n = this.createBlock(n, "multi", e), this.insertBlock(d, n, e), n.varName
        }

        wrapWithEventCatcher(t, e) {
            this.helpers.add("createCatcher");
            let n = rn("catcher"), o = {}, r = [];
            for (let t in e) {
                let n = rn("hdlr"), i = r.push(n) - 1;
                o[t] = i;
                const s = this.generateHandlerCode(t, e[t]);
                this.define(n, s)
            }
            return this.staticDefs.push({
                id: n,
                expr: `createCatcher(${JSON.stringify(o)})`
            }), `${n}(${t}, [${r.join(",")}])`
        }

        compileTSlot(t, e) {
            this.helpers.add("callSlot");
            let n, o, {block: r} = e, i = !1, s = !1;
            t.name.match(Je) ? (i = !0, s = !0, o = tn(t.name)) : (o = "'" + t.name + "'", s = s || this.slotNames.has(t.name), this.slotNames.add(t.name));
            const l = t.attrs ? t.attrs["t-props"] : null;
            t.attrs && delete t.attrs["t-props"];
            let a = this.target.loopLevel ? `key${this.target.loopLevel}` : "key";
            s && (a = `${a} + \`${this.generateComponentKey()}\``);
            const c = t.attrs ? this.formatPropObject(t.attrs) : [], h = this.getPropString(c, l);
            if (t.defaultContent) {
                n = `callSlot(ctx, node, ${a}, ${o}, ${i}, ${h}, ${this.compileInNewTarget("defaultContent", t.defaultContent, e)}.bind(this))`
            } else if (i) {
                let t = rn("slot");
                this.define(t, o), n = `toggler(${t}, callSlot(ctx, node, ${a}, ${t}, ${i}, ${h}))`
            } else n = `callSlot(ctx, node, ${a}, ${o}, ${i}, ${h})`;
            return t.on && (n = this.wrapWithEventCatcher(n, t.on)), r && this.insertAnchor(r), r = this.createBlock(r, "multi", e), this.insertBlock(n, r, {
                ...e,
                forceNewBlock: !1
            }), r.varName
        }

        compileTTranslation(t, e) {
            return t.content ? this.compileAST(t.content, Object.assign({}, e, {translate: !1})) : null
        }

        compileTPortal(t, e) {
            this.staticDefs.find((t => "Portal" === t.id)) || this.staticDefs.push({id: "Portal", expr: "app.Portal"});
            let {block: n} = e;
            const o = this.compileInNewTarget("slot", t.content, e), r = this.generateComponentKey();
            let i = "ctx";
            !this.target.loopLevel && this.hasSafeContext || (i = rn("ctx"), this.helpers.add("capture"), this.define(i, "capture(ctx, this)"));
            let s = rn("comp");
            this.staticDefs.push({id: s, expr: "app.createComponent(null, false, true, false, false)"});
            const l = `${s}({target: ${Ze(t.target)},slots: {'default': {__render: ${o}.bind(this), __ctx: ${i}}}}, key + \`${r}\`, node, ctx, Portal)`;
            return n && this.insertAnchor(n), n = this.createBlock(n, "multi", e), this.insertBlock(l, n, {
                ...e,
                forceNewBlock: !1
            }), n.varName
        }
    }

    const dn = new WeakMap;

    function fn(t) {
        if ("string" == typeof t) {
            const e = function (t) {
                const e = (new DOMParser).parseFromString(t, "text/xml");
                if (e.getElementsByTagName("parsererror").length) {
                    let n = "Invalid XML in template.";
                    const o = e.getElementsByTagName("parsererror")[0].textContent;
                    if (o) {
                        n += "\nThe parser has produced the following error message:\n" + o;
                        const e = /\d+/g, r = e.exec(o);
                        if (r) {
                            const i = Number(r[0]), s = t.split("\n")[i - 1], l = e.exec(o);
                            if (s && l) {
                                const t = Number(l[0]) - 1;
                                s[t] && (n += `\nThe error might be located at xml line ${i} column ${t}\n${s}\n${"-".repeat(t - 1)}^`)
                            }
                        }
                    }
                    throw new i(n)
                }
                return e
            }(`<t>${t}</t>`).firstChild;
            return pn(e)
        }
        let e = dn.get(t);
        return e || (e = pn(t.cloneNode(!0)), dn.set(t, e)), e
    }

    function pn(t) {
        var e;
        (function (t) {
            let e = t.querySelectorAll("[t-elif], [t-else]");
            for (let t = 0, n = e.length; t < n; t++) {
                let n = e[t], o = n.previousElementSibling, r = t => o.getAttribute(t), s = t => +!!n.getAttribute(t);
                if (!o || !r("t-if") && !r("t-elif")) throw new i("t-elif and t-else directives must be preceded by a t-if or t-elif directive");
                {
                    if (r("t-foreach")) throw new i("t-if cannot stay at the same level as t-foreach when using t-elif or t-else");
                    if (["t-if", "t-elif", "t-else"].map(s).reduce((function (t, e) {
                        return t + e
                    })) > 1) throw new i("Only one conditional branching directive is allowed per node");
                    let t;
                    for (; (t = n.previousSibling) !== o;) {
                        if (t.nodeValue.trim().length && 8 !== t.nodeType) throw new i("text is not allowed between branching directives");
                        t.remove()
                    }
                }
            }
        })(e = t), function (t) {
            const e = [...t.querySelectorAll("[t-esc]")].filter((t => t.tagName[0] === t.tagName[0].toUpperCase() || t.hasAttribute("t-component")));
            for (const t of e) {
                if (t.childNodes.length) throw new i("Cannot have t-esc on a component that already has content");
                const e = t.getAttribute("t-esc");
                t.removeAttribute("t-esc");
                const n = t.ownerDocument.createElement("t");
                null != e && n.setAttribute("t-esc", e), t.appendChild(n)
            }
        }(e);
        return mn(t, {inPreTag: !1, inSVG: !1}) || {type: 0, value: ""}
    }

    function mn(t, e) {
        return t instanceof Element ? function (t, e) {
            if (t.hasAttribute("t-debug")) return t.removeAttribute("t-debug"), {type: 12, content: mn(t, e)};
            if (t.hasAttribute("t-log")) {
                const n = t.getAttribute("t-log");
                return t.removeAttribute("t-log"), {type: 13, expr: n, content: mn(t, e)}
            }
            return null
        }(t, e) || function (t, e) {
            if (!t.hasAttribute("t-foreach")) return null;
            const n = t.outerHTML, o = t.getAttribute("t-foreach");
            t.removeAttribute("t-foreach");
            const r = t.getAttribute("t-as") || "";
            t.removeAttribute("t-as");
            const s = t.getAttribute("t-key");
            if (!s) throw new i(`"Directive t-foreach should always be used with a t-key!" (expression: t-foreach="${o}" t-as="${r}")`);
            t.removeAttribute("t-key");
            const l = t.getAttribute("t-memo") || "";
            t.removeAttribute("t-memo");
            const a = mn(t, e);
            if (!a) return null;
            const c = !n.includes("t-call"), h = c && !n.includes(`${r}_first`), u = c && !n.includes(`${r}_last`),
                d = c && !n.includes(`${r}_index`), f = c && !n.includes(`${r}_value`);
            return {
                type: 9,
                collection: o,
                elem: r,
                body: a,
                memo: l,
                key: s,
                hasNoFirst: h,
                hasNoLast: u,
                hasNoIndex: d,
                hasNoValue: f
            }
        }(t, e) || function (t, e) {
            if (!t.hasAttribute("t-if")) return null;
            const n = t.getAttribute("t-if");
            t.removeAttribute("t-if");
            const o = mn(t, e) || {type: 0, value: ""};
            let r = t.nextElementSibling;
            const i = [];
            for (; r && r.hasAttribute("t-elif");) {
                const t = r.getAttribute("t-elif");
                r.removeAttribute("t-elif");
                const n = mn(r, e), o = r.nextElementSibling;
                r.remove(), r = o, n && i.push({condition: t, content: n})
            }
            let s = null;
            r && r.hasAttribute("t-else") && (r.removeAttribute("t-else"), s = mn(r, e), r.remove());
            return {type: 5, condition: n, content: o, tElif: i.length ? i : null, tElse: s}
        }(t, e) || function (t, e) {
            if (!t.hasAttribute("t-portal")) return null;
            const n = t.getAttribute("t-portal");
            t.removeAttribute("t-portal");
            const o = mn(t, e);
            if (!o) return {type: 0, value: ""};
            return {type: 17, target: n, content: o}
        }(t, e) || function (t, e) {
            if (!t.hasAttribute("t-call")) return null;
            const n = t.getAttribute("t-call"), o = t.getAttribute("t-call-context");
            if (t.removeAttribute("t-call"), t.removeAttribute("t-call-context"), "t" !== t.tagName) {
                const r = mn(t, e), i = {type: 7, name: n, body: null, context: o};
                if (r && 2 === r.type) return r.content = [i], r;
                if (r && 11 === r.type) return {
                    ...r,
                    slots: {default: {content: i, scope: null, on: null, attrs: null}}
                }
            }
            const r = xn(t, e);
            return {type: 7, name: n, body: r.length ? r : null, context: o}
        }(t, e) || function (t, e) {
            if (!t.hasAttribute("t-call-block")) return null;
            return {type: 15, name: t.getAttribute("t-call-block")}
        }(t) || function (t, e) {
            if (!t.hasAttribute("t-esc")) return null;
            const n = t.getAttribute("t-esc");
            t.removeAttribute("t-esc");
            const o = {type: 4, expr: n, defaultValue: t.textContent || ""};
            let r = t.getAttribute("t-ref");
            t.removeAttribute("t-ref");
            const s = mn(t, e);
            if (!s) return o;
            if (2 === s.type) return {...s, ref: r, content: [o]};
            if (11 === s.type) throw new i("t-esc is not supported on Component nodes");
            return o
        }(t, e) || function (t, e) {
            if (!t.hasAttribute("t-key")) return null;
            const n = t.getAttribute("t-key");
            t.removeAttribute("t-key");
            const o = mn(t, e);
            if (!o) return null;
            return {type: 10, expr: n, content: o}
        }(t, e) || function (t, e) {
            if ("off" !== t.getAttribute("t-translation")) return null;
            return t.removeAttribute("t-translation"), {type: 16, content: mn(t, e)}
        }(t, e) || function (t, e) {
            if (!t.hasAttribute("t-slot")) return null;
            const n = t.getAttribute("t-slot");
            t.removeAttribute("t-slot");
            let o = null, r = null;
            for (let e of t.getAttributeNames()) {
                const n = t.getAttribute(e);
                e.startsWith("t-on-") ? (r = r || {}, r[e.slice(5)] = n) : (o = o || {}, o[e] = n)
            }
            return {type: 14, name: n, attrs: o, on: r, defaultContent: Nn(t, e)}
        }(t, e) || function (t, e) {
            if (!t.hasAttribute("t-out") && !t.hasAttribute("t-raw")) return null;
            t.hasAttribute("t-raw") && console.warn('t-raw has been deprecated in favor of t-out. If the value to render is not wrapped by the "markup" function, it will be escaped');
            const n = t.getAttribute("t-out") || t.getAttribute("t-raw");
            t.removeAttribute("t-out"), t.removeAttribute("t-raw");
            const o = {type: 8, expr: n, body: null}, r = t.getAttribute("t-ref");
            t.removeAttribute("t-ref");
            const i = mn(t, e);
            if (!i) return o;
            if (2 === i.type) return o.body = i.content.length ? i.content : null, {...i, ref: r, content: [o]};
            return o
        }(t, e) || function (t, e) {
            let n = t.tagName;
            const o = n[0];
            let r = t.hasAttribute("t-component");
            if (r && "t" !== n) throw new i(`Directive 't-component' can only be used on <t> nodes (used on a <${n}>)`);
            if (o !== o.toUpperCase() && !r) return null;
            r && (n = t.getAttribute("t-component"), t.removeAttribute("t-component"));
            const s = t.getAttribute("t-props");
            t.removeAttribute("t-props");
            const l = t.getAttribute("t-slot-scope");
            t.removeAttribute("t-slot-scope");
            let a = null, c = null;
            for (let e of t.getAttributeNames()) {
                const n = t.getAttribute(e);
                if (e.startsWith("t-")) {
                    if (!e.startsWith("t-on-")) {
                        const t = $n.get(e.split("-").slice(0, 2).join("-"));
                        throw new i(t || `unsupported directive on Component: ${e}`)
                    }
                    a = a || {}, a[e.slice(5)] = n
                } else c = c || {}, c[e] = n
            }
            let h = null;
            if (t.hasChildNodes()) {
                const n = t.cloneNode(!0), o = Array.from(n.querySelectorAll("[t-set-slot]"));
                for (let t of o) {
                    if ("t" !== t.tagName) throw new i(`Directive 't-set-slot' can only be used on <t> nodes (used on a <${t.tagName}>)`);
                    const o = t.getAttribute("t-set-slot");
                    let r = t.parentElement, s = !1;
                    for (; r !== n;) {
                        if (r.hasAttribute("t-component") || r.tagName[0] === r.tagName[0].toUpperCase()) {
                            s = !0;
                            break
                        }
                        r = r.parentElement
                    }
                    if (s) continue;
                    t.removeAttribute("t-set-slot"), t.remove();
                    const l = mn(t, e);
                    let a = null, c = null, u = null;
                    for (let e of t.getAttributeNames()) {
                        const n = t.getAttribute(e);
                        "t-slot-scope" !== e ? e.startsWith("t-on-") ? (a = a || {}, a[e.slice(5)] = n) : (c = c || {}, c[e] = n) : u = n
                    }
                    h = h || {}, h[o] = {content: l, on: a, attrs: c, scope: u}
                }
                const r = Nn(n, e);
                h = h || {}, r && !h.default && (h.default = {content: r, on: a, attrs: null, scope: l})
            }
            return {type: 11, name: n, isDynamic: r, dynamicProps: s, props: c, slots: h, on: a}
        }(t, e) || function (t, e) {
            const {tagName: n} = t, o = t.getAttribute("t-tag");
            if (t.removeAttribute("t-tag"), "t" === n && !o) return null;
            if (n.startsWith("block-")) throw new i(`Invalid tag name: '${n}'`);
            e = Object.assign({}, e), "pre" === n && (e.inPreTag = !0);
            const r = wn.has(n) && !e.inSVG;
            e.inSVG = e.inSVG || r;
            const s = r ? "http://www.w3.org/2000/svg" : null, l = t.getAttribute("t-ref");
            t.removeAttribute("t-ref");
            const a = t.getAttributeNames();
            let c = null, h = null, u = null;
            for (let o of a) {
                const r = t.getAttribute(o);
                if (o.startsWith("t-on")) {
                    if ("t-on" === o) throw new i("Missing event name with t-on directive");
                    h = h || {}, h[o.slice(5)] = r
                } else if (o.startsWith("t-model")) {
                    if (!["input", "select", "textarea"].includes(n)) throw new i("The t-model directive only works with <input>, <textarea> and <select>");
                    let s, l;
                    if (vn.test(r)) {
                        const t = r.lastIndexOf(".");
                        s = r.slice(0, t), l = `'${r.slice(t + 1)}'`
                    } else {
                        if (!yn.test(r)) throw new i(`Invalid t-model expression: "${r}" (it should be assignable)`);
                        {
                            const t = r.lastIndexOf("[");
                            s = r.slice(0, t), l = r.slice(t + 1, -1)
                        }
                    }
                    const a = t.getAttribute("type"), c = "input" === n, h = "select" === n, d = "textarea" === n,
                        f = c && "checkbox" === a, p = c && "radio" === a, m = c && !f && !p, g = o.includes(".lazy"),
                        b = o.includes(".number");
                    u = {
                        baseExpr: s,
                        expr: l,
                        targetAttr: f ? "checked" : "value",
                        specialInitTargetAttr: p ? "checked" : null,
                        eventType: p ? "click" : h || g ? "change" : "input",
                        hasDynamicChildren: !1,
                        shouldTrim: o.includes(".trim") && (m || d),
                        shouldNumberize: b && (m || d)
                    }, h && ((e = Object.assign({}, e)).tModelInfo = u)
                } else {
                    if (o.startsWith("block-")) throw new i(`Invalid attribute: '${o}'`);
                    if ("t-name" !== o) {
                        if (o.startsWith("t-") && !o.startsWith("t-att")) throw new i(`Unknown QWeb directive: '${o}'`);
                        const t = e.tModelInfo;
                        t && ["t-att-value", "t-attf-value"].includes(o) && (t.hasDynamicChildren = !0), c = c || {}, c[o] = r
                    }
                }
            }
            const d = xn(t, e);
            return {type: 2, tag: n, dynamicTag: o, attrs: c, on: h, ref: l, content: d, model: u, ns: s}
        }(t, e) || function (t, e) {
            if (!t.hasAttribute("t-set")) return null;
            const n = t.getAttribute("t-set"), o = t.getAttribute("t-value") || null,
                r = t.innerHTML === t.textContent && t.textContent || null;
            let i = null;
            t.textContent !== t.innerHTML && (i = xn(t, e));
            return {type: 6, name: n, value: o, defaultValue: r, body: i}
        }(t, e) || function (t, e) {
            if ("t" !== t.tagName) return null;
            return Nn(t, e)
        }(t, e) : function (t, e) {
            if (t.nodeType === Node.TEXT_NODE) {
                let n = t.textContent || "";
                if (!e.inPreTag) {
                    if (gn.test(n) && !n.trim()) return null;
                    n = n.replace(bn, " ")
                }
                return {type: 0, value: n}
            }
            if (t.nodeType === Node.COMMENT_NODE) return {type: 1, value: t.textContent || ""};
            return null
        }(t, e)
    }

    const gn = /[\r\n]/, bn = /\s+/g;
    const vn = /\.[\w_]+\s*$/, yn = /\[[^\[]+\]\s*$/, wn = new Set(["svg", "g", "path"]);
    const $n = new Map([["t-ref", "t-ref is no longer supported on components. Consider exposing only the public part of the component's API through a callback prop."], ["t-att", "t-att makes no sense on component: props are already treated as expressions"], ["t-attf", "t-attf is not supported on components: use template strings for string interpolation in props"]]);

    function xn(t, e) {
        const n = [];
        for (let o of t.childNodes) {
            const t = mn(o, e);
            t && (3 === t.type ? n.push(...t.content) : n.push(t))
        }
        return n
    }

    function Nn(t, e) {
        const n = xn(t, e);
        switch (n.length) {
            case 0:
                return null;
            case 1:
                return n[0];
            default:
                return {type: 3, content: n}
        }
    }

    class kn {
        constructor() {
            this.tasks = new Set, this.frame = 0, this.delayedRenders = [], this.requestAnimationFrame = kn.requestAnimationFrame
        }

        addFiber(t) {
            this.tasks.add(t.root)
        }

        flush() {
            if (this.delayedRenders.length) {
                let t = this.delayedRenders;
                this.delayedRenders = [];
                for (let e of t) e.root && 2 !== e.node.status && e.node.fiber === e && e.render()
            }
            0 === this.frame && (this.frame = this.requestAnimationFrame((() => {
                this.frame = 0, this.tasks.forEach((t => this.processFiber(t)));
                for (let t of this.tasks) 2 === t.node.status && this.tasks.delete(t)
            })))
        }

        processFiber(t) {
            if (t.root !== t) return void this.tasks.delete(t);
            const e = s.has(t);
            e && 0 !== t.counter ? this.tasks.delete(t) : 2 !== t.node.status ? 0 === t.counter && (e || t.complete(), this.tasks.delete(t)) : this.tasks.delete(t)
        }
    }

    kn.requestAnimationFrame = window.requestAnimationFrame.bind(window);
    let En = !1;

    class An extends je {
        constructor(t, e = {}) {
            super(e), this.scheduler = new kn, this.root = null, this.Root = t, e.test && (this.dev = !0), this.warnIfNoStaticProps = e.warnIfNoStaticProps || !1, !this.dev || e.test || En || (console.info(`Owl is running in 'dev' mode.\n\nThis is not suitable for production use.\nSee https://github.com/odoo/owl/blob/${window.owl ? window.owl.__info__.hash : "master"}/doc/reference/app.md#configuration for more information.`), En = !0);
            const n = e.env || {}, o = Object.getOwnPropertyDescriptors(n);
            this.env = Object.freeze(Object.create(Object.getPrototypeOf(n), o)), this.props = e.props || {}
        }

        mount(t, e) {
            An.validateTarget(t), this.dev && Me(this.Root, this.props, {__owl__: {app: this}});
            const n = this.makeNode(this.Root, this.props), o = this.mountNode(n, t, e);
            return this.root = n, o
        }

        makeNode(t, e) {
            return new ue(t, e, this, null, null)
        }

        mountNode(t, e, n) {
            const o = new Promise(((e, n) => {
                let o = !1;
                t.mounted.push((() => {
                    e(t.component), o = !0
                }));
                let r = l.get(t);
                r || (r = [], l.set(t, r)), r.unshift((t => {
                    throw o || n(t), t
                }))
            }));
            return t.mountComponent(e, n), o
        }

        destroy() {
            this.root && (this.scheduler.flush(), this.root.destroy())
        }

        createComponent(t, e, n, o, r) {
            const s = !e;
            const l = n ? (t, e) => !0 : r ? (t, e) => !1 : function (t, e) {
                for (let n in t) if (t[n] !== e[n]) return !0;
                return o && Object.keys(t).length !== Object.keys(e).length
            }, a = ue.prototype.updateAndRender, c = ue.prototype.initiateRender;
            return (n, o, r, h, u) => {
                let d = r.children, f = d[o];
                s && f && f.component.constructor !== u && (f = void 0);
                const p = r.fiber;
                if (f) (l(f.props, n) || p.deep || f.forceNextRender) && (f.forceNextRender = !1, a.call(f, n, p)); else {
                    if (e) {
                        const e = h.constructor.components;
                        if (!e) throw new i(`Cannot find the definition of component "${t}", missing static components key in parent`);
                        if (!(u = e[t])) throw new i(`Cannot find the definition of component "${t}"`);
                        if (!(u.prototype instanceof be)) throw new i(`"${t}" is not a Component. It must inherit from the Component class`)
                    }
                    f = new ue(u, n, this, r, o), d[o] = f, c.call(f, new St(f, p))
                }
                return p.childrenMap[o] = f, f
            }
        }

        handleError(...t) {
            return c(...t)
        }
    }

    function Tn(t, e) {
        const n = Object.create(t), o = Object.getOwnPropertyDescriptors(e);
        return Object.freeze(Object.defineProperties(n, o))
    }

    function _n(t) {
        const e = le();
        e.childEnv = Tn(e.childEnv, t)
    }

    An.validateTarget = function (t) {
        const e = t && t.ownerDocument;
        if (e) {
            if (t instanceof e.defaultView.HTMLElement) {
                if (!e.body.contains(t)) throw new i("Cannot mount a component on a detached dom node");
                return
            }
        }
        throw new i("Cannot mount component: the target is not a valid DOM element")
    }, n.shouldNormalizeDom = !1, n.mainEventHandler = (t, n, o) => {
        const {data: r, modifiers: s} = e(t);
        t = r;
        let l = !1;
        if (s.length) {
            let t = !1;
            const e = n.target === o;
            for (const o of s) switch (o) {
                case"self":
                    if (t = !0, e) continue;
                    return l;
                case"prevent":
                    (t && e || !t) && n.preventDefault();
                    continue;
                case"stop":
                    (t && e || !t) && n.stopPropagation(), l = !0;
                    continue
            }
        }
        if (Object.hasOwnProperty.call(t, 0)) {
            const e = t[0];
            if ("function" != typeof e) throw new i(`Invalid handler (expected a function, received: '${e}')`);
            let o = t[1] ? t[1].__owl__ : null;
            o && 1 !== o.status || e.call(o ? o.component : null, n)
        }
        return l
    };
    const Sn = {
        config: n, mount: At, patch: function (t, e, n = !1) {
            t.patch(e, n)
        }, remove: function (t, e = !1) {
            e && t.beforeRemove(), t.remove()
        }, list: yt, multi: j, text: G, toggler: r, createBlock: it, html: Et, comment: X
    }, Cn = {};
    je.prototype._compileTemplate = function (t, e) {
        return function (t, e = {}) {
            const n = fn(t),
                o = t instanceof Node ? !(t instanceof Element) || null === t.querySelector("[t-set], [t-call]") : !t.includes("t-set") && !t.includes("t-call"),
                r = new un(n, {...e, hasSafeContext: o}).generateCode();
            return new Function("app, bdom, helpers", r)
        }(e, {
            name: t,
            dev: this.dev,
            translateFn: this.translateFn,
            translatableAttributes: this.translatableAttributes
        })
    }, t.App = An, t.Component = be, t.EventBus = re, t.OwlError = i, t.__info__ = Cn, t.blockDom = Sn, t.loadFile = async function (t) {
        const e = await fetch(t);
        if (!e.ok) throw new i("Error while fetching xml templates");
        return await e.text()
    }, t.markRaw = Vt, t.markup = function (t) {
        return new ie(t)
    }, t.mount = async function (t, e, n = {}) {
        return new An(t, n).mount(e, n)
    }, t.onError = function (t) {
        const e = le();
        let n = l.get(e);
        n || (n = [], l.set(e, n)), n.push(t.bind(e.component))
    }, t.onMounted = pe, t.onPatched = me, t.onRendered = function (t) {
        const e = le(), n = e.renderFn, o = e.app.dev ? fe : t => t;
        t = o(t.bind(e.component), "onRendered"), e.renderFn = () => {
            const e = n();
            return t(), e
        }
    }, t.onWillDestroy = function (t) {
        const e = le(), n = e.app.dev ? fe : t => t;
        e.willDestroy.push(n(t.bind(e.component), "onWillDestroy"))
    }, t.onWillPatch = function (t) {
        const e = le(), n = e.app.dev ? fe : t => t;
        e.willPatch.unshift(n(t.bind(e.component), "onWillPatch"))
    }, t.onWillRender = function (t) {
        const e = le(), n = e.renderFn, o = e.app.dev ? fe : t => t;
        t = o(t.bind(e.component), "onWillRender"), e.renderFn = () => (t(), n())
    }, t.onWillStart = function (t) {
        const e = le(), n = e.app.dev ? fe : t => t;
        e.willStart.push(n(t.bind(e.component), "onWillStart"))
    }, t.onWillUnmount = ge, t.onWillUpdateProps = function (t) {
        const e = le(), n = e.app.dev ? fe : t => t;
        e.willUpdateProps.push(n(t.bind(e.component), "onWillUpdateProps"))
    }, t.reactive = Yt, t.status = function (t) {
        switch (t.__owl__.status) {
            case 0:
                return "new";
            case 1:
                return "mounted";
            case 2:
                return "destroyed"
        }
    }, t.toRaw = Ft, t.useChildSubEnv = _n, t.useComponent = function () {
        return se.component
    }, t.useEffect = function (t, e = (() => [NaN])) {
        let n, o;
        pe((() => {
            o = e(), n = t(...o)
        })), me((() => {
            const r = e();
            r.some(((t, e) => t !== o[e])) && (o = r, n && n(), n = t(...o))
        })), ge((() => n && n()))
    }, t.useEnv = function () {
        return le().component.env
    }, t.useExternalListener = function (t, e, n, o) {
        const r = le(), i = n.bind(r.component);
        pe((() => t.addEventListener(e, i, o))), ge((() => t.removeEventListener(e, i, o)))
    }, t.useRef = function (t) {
        const e = le().refs;
        return {
            get el() {
                return e[t] || null
            }
        }
    }, t.useState = he, t.useSubEnv = function (t) {
        const e = le();
        e.component.env = Tn(e.component.env, t), _n(t)
    }, t.validate = function (t, e) {
        let n = Te(t, e);
        if (n.length) throw new i("Invalid object: " + n.join(", "))
    }, t.whenReady = function (t) {
        return new Promise((function (t) {
            "loading" !== document.readyState ? t(!0) : document.addEventListener("DOMContentLoaded", t, !1)
        })).then(t || function () {
        })
    }, t.xml = Ve, Object.defineProperty(t, "__esModule", {value: !0}), Cn.version = "2.0.2", Cn.date = "2022-11-29T14:10:54.119Z", Cn.hash = "ef8baa2", Cn.url = "https://github.com/odoo/owl"
}(this.owl = this.owl || {});