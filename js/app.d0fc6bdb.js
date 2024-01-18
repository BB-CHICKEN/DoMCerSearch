var Ou = Object.defineProperty, wu = Object.defineProperties;
var Su = Object.getOwnPropertyDescriptors;
var Vi = Object.getOwnPropertySymbols;
var Pu = Object.prototype.hasOwnProperty, Cu = Object.prototype.propertyIsEnumerable;
var Ki = (e, t, n) => t in e ? Ou(e, t, {enumerable: !0, configurable: !0, writable: !0, value: n}) : e[t] = n,
    Le = (e, t) => {
        for (var n in t || (t = {})) Pu.call(t, n) && Ki(e, n, t[n]);
        if (Vi) for (var n of Vi(t)) Cu.call(t, n) && Ki(e, n, t[n]);
        return e
    }, It = (e, t) => wu(e, Su(t));
const zi = {};

function ai(e, t) {
    const n = Object.create(null), r = e.split(",");
    for (let o = 0; o < r.length; o++) n[r[o]] = !0;
    return t ? o => !!n[o.toLowerCase()] : o => !!n[o]
}

const Au = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Iu = ai(Au);

function el(e) {
    return !!e || e === ""
}

function Kr(e) {
    if (Z(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n], o = ge(r) ? Tu(r) : Kr(r);
            if (o) for (const i in o) t[i] = o[i]
        }
        return t
    } else {
        if (ge(e)) return e;
        if (Ce(e)) return e
    }
}

const xu = /;(?![^(]*\))/g, ju = /:(.+)/;

function Tu(e) {
    const t = {};
    return e.split(xu).forEach(n => {
        if (n) {
            const r = n.split(ju);
            r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
    }), t
}

function Zn(e) {
    let t = "";
    if (ge(e)) t = e; else if (Z(e)) for (let n = 0; n < e.length; n++) {
        const r = Zn(e[n]);
        r && (t += r + " ")
    } else if (Ce(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim()
}

const ku = e => ge(e) ? e : e == null ? "" : Z(e) || Ce(e) && (e.toString === ol || !oe(e.toString)) ? JSON.stringify(e, tl, 2) : String(e),
    tl = (e, t) => t && t.__v_isRef ? tl(e, t.value) : sn(t) ? {[`Map(${t.size})`]: [...t.entries()].reduce((n, [r, o]) => (n[`${r} =>`] = o, n), {})} : nl(t) ? {[`Set(${t.size})`]: [...t.values()]} : Ce(t) && !Z(t) && !il(t) ? String(t) : t,
    ve = {}, on = [], Xe = () => {
    }, Ru = () => !1, Du = /^on[^a-z]/, Xn = e => Du.test(e), li = e => e.startsWith("onUpdate:"), Re = Object.assign,
    ci = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1)
    }, Lu = Object.prototype.hasOwnProperty, ce = (e, t) => Lu.call(e, t), Z = Array.isArray,
    sn = e => Wr(e) === "[object Map]", nl = e => Wr(e) === "[object Set]", oe = e => typeof e == "function",
    ge = e => typeof e == "string", ui = e => typeof e == "symbol", Ce = e => e !== null && typeof e == "object",
    rl = e => Ce(e) && oe(e.then) && oe(e.catch), ol = Object.prototype.toString, Wr = e => ol.call(e),
    Nu = e => Wr(e).slice(8, -1), il = e => Wr(e) === "[object Object]",
    fi = e => ge(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    Tn = ai(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    Jr = e => {
        const t = Object.create(null);
        return n => t[n] || (t[n] = e(n))
    }, Mu = /-(\w)/g, at = Jr(e => e.replace(Mu, (t, n) => n ? n.toUpperCase() : "")), Hu = /\B([A-Z])/g,
    Ut = Jr(e => e.replace(Hu, "-$1").toLowerCase()), Qr = Jr(e => e.charAt(0).toUpperCase() + e.slice(1)),
    ao = Jr(e => e ? `on${Qr(e)}` : ""), zn = (e, t) => !Object.is(e, t), lo = (e, t) => {
        for (let n = 0; n < e.length; n++) e[n](t)
    }, Pr = (e, t, n) => {
        Object.defineProperty(e, t, {configurable: !0, enumerable: !1, value: n})
    }, sl = e => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t
    };
let Wi;
const Fu = () => Wi || (Wi = typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : typeof global != "undefined" ? global : {});
let Je;

class qu {
    constructor(t = !1) {
        this.active = !0, this.effects = [], this.cleanups = [], !t && Je && (this.parent = Je, this.index = (Je.scopes || (Je.scopes = [])).push(this) - 1)
    }

    run(t) {
        if (this.active) try {
            return Je = this, t()
        } finally {
            Je = this.parent
        }
    }

    on() {
        Je = this
    }

    off() {
        Je = this.parent
    }

    stop(t) {
        if (this.active) {
            let n, r;
            for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
            for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
            if (this.scopes) for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
            if (this.parent && !t) {
                const o = this.parent.scopes.pop();
                o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index)
            }
            this.active = !1
        }
    }
}

function zu(e, t = Je) {
    t && t.active && t.effects.push(e)
}

function Bu() {
    return Je
}

function $u(e) {
    Je && Je.cleanups.push(e)
}

const di = e => {
    const t = new Set(e);
    return t.w = 0, t.n = 0, t
}, al = e => (e.w & Ct) > 0, ll = e => (e.n & Ct) > 0, Uu = ({deps: e}) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Ct
}, Vu = e => {
    const {deps: t} = e;
    if (t.length) {
        let n = 0;
        for (let r = 0; r < t.length; r++) {
            const o = t[r];
            al(o) && !ll(o) ? o.delete(e) : t[n++] = o, o.w &= ~Ct, o.n &= ~Ct
        }
        t.length = n
    }
}, Io = new WeakMap;
let An = 0, Ct = 1;
const xo = 30;
let ot;
const qt = Symbol(""), jo = Symbol("");

class pi {
    constructor(t, n = null, r) {
        this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, zu(this, r)
    }

    run() {
        if (!this.active) return this.fn();
        let t = ot, n = wt;
        for (; t;) {
            if (t === this) return;
            t = t.parent
        }
        try {
            return this.parent = ot, ot = this, wt = !0, Ct = 1 << ++An, An <= xo ? Uu(this) : Ji(this), this.fn()
        } finally {
            An <= xo && Vu(this), Ct = 1 << --An, ot = this.parent, wt = n, this.parent = void 0
        }
    }

    stop() {
        this.active && (Ji(this), this.onStop && this.onStop(), this.active = !1)
    }
}

function Ji(e) {
    const {deps: t} = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++) t[n].delete(e);
        t.length = 0
    }
}

let wt = !0;
const cl = [];

function mn() {
    cl.push(wt), wt = !1
}

function hn() {
    const e = cl.pop();
    wt = e === void 0 ? !0 : e
}

function Ue(e, t, n) {
    if (wt && ot) {
        let r = Io.get(e);
        r || Io.set(e, r = new Map);
        let o = r.get(n);
        o || r.set(n, o = di()), ul(o)
    }
}

function ul(e, t) {
    let n = !1;
    An <= xo ? ll(e) || (e.n |= Ct, n = !al(e)) : n = !e.has(ot), n && (e.add(ot), ot.deps.push(e))
}

function pt(e, t, n, r, o, i) {
    const s = Io.get(e);
    if (!s) return;
    let a = [];
    if (t === "clear") a = [...s.values()]; else if (n === "length" && Z(e)) s.forEach((l, c) => {
        (c === "length" || c >= r) && a.push(l)
    }); else switch (n !== void 0 && a.push(s.get(n)), t) {
        case"add":
            Z(e) ? fi(n) && a.push(s.get("length")) : (a.push(s.get(qt)), sn(e) && a.push(s.get(jo)));
            break;
        case"delete":
            Z(e) || (a.push(s.get(qt)), sn(e) && a.push(s.get(jo)));
            break;
        case"set":
            sn(e) && a.push(s.get(qt));
            break
    }
    if (a.length === 1) a[0] && To(a[0]); else {
        const l = [];
        for (const c of a) c && l.push(...c);
        To(di(l))
    }
}

function To(e, t) {
    for (const n of Z(e) ? e : [...e]) (n !== ot || n.allowRecurse) && (n.scheduler ? n.scheduler() : n.run())
}

const Ku = ai("__proto__,__v_isRef,__isVue"),
    fl = new Set(Object.getOwnPropertyNames(Symbol).map(e => Symbol[e]).filter(ui)), Wu = mi(), Ju = mi(!1, !0),
    Qu = mi(!0), Qi = Yu();

function Yu() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(t => {
        e[t] = function (...n) {
            const r = fe(this);
            for (let i = 0, s = this.length; i < s; i++) Ue(r, "get", i + "");
            const o = r[t](...n);
            return o === -1 || o === !1 ? r[t](...n.map(fe)) : o
        }
    }), ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
        e[t] = function (...n) {
            mn();
            const r = fe(this)[t].apply(this, n);
            return hn(), r
        }
    }), e
}

function mi(e = !1, t = !1) {
    return function (r, o, i) {
        if (o === "__v_isReactive") return !e;
        if (o === "__v_isReadonly") return e;
        if (o === "__v_isShallow") return t;
        if (o === "__v_raw" && i === (e ? t ? pf : vl : t ? hl : ml).get(r)) return r;
        const s = Z(r);
        if (!e && s && ce(Qi, o)) return Reflect.get(Qi, o, i);
        const a = Reflect.get(r, o, i);
        return (ui(o) ? fl.has(o) : Ku(o)) || (e || Ue(r, "get", o), t) ? a : je(a) ? !s || !fi(o) ? a.value : a : Ce(a) ? e ? gi(a) : vn(a) : a
    }
}

const Gu = dl(), Zu = dl(!0);

function dl(e = !1) {
    return function (n, r, o, i) {
        let s = n[r];
        if (Bn(s) && je(s) && !je(o)) return !1;
        if (!e && !Bn(o) && (gl(o) || (o = fe(o), s = fe(s)), !Z(n) && je(s) && !je(o))) return s.value = o, !0;
        const a = Z(n) && fi(r) ? Number(r) < n.length : ce(n, r), l = Reflect.set(n, r, o, i);
        return n === fe(i) && (a ? zn(o, s) && pt(n, "set", r, o) : pt(n, "add", r, o)), l
    }
}

function Xu(e, t) {
    const n = ce(e, t);
    e[t];
    const r = Reflect.deleteProperty(e, t);
    return r && n && pt(e, "delete", t, void 0), r
}

function ef(e, t) {
    const n = Reflect.has(e, t);
    return (!ui(t) || !fl.has(t)) && Ue(e, "has", t), n
}

function tf(e) {
    return Ue(e, "iterate", Z(e) ? "length" : qt), Reflect.ownKeys(e)
}

const pl = {get: Wu, set: Gu, deleteProperty: Xu, has: ef, ownKeys: tf}, nf = {
    get: Qu, set(e, t) {
        return !0
    }, deleteProperty(e, t) {
        return !0
    }
}, rf = Re({}, pl, {get: Ju, set: Zu}), hi = e => e, Yr = e => Reflect.getPrototypeOf(e);

function or(e, t, n = !1, r = !1) {
    e = e.__v_raw;
    const o = fe(e), i = fe(t);
    t !== i && !n && Ue(o, "get", t), !n && Ue(o, "get", i);
    const {has: s} = Yr(o), a = r ? hi : n ? yi : $n;
    if (s.call(o, t)) return a(e.get(t));
    if (s.call(o, i)) return a(e.get(i));
    e !== o && e.get(t)
}

function ir(e, t = !1) {
    const n = this.__v_raw, r = fe(n), o = fe(e);
    return e !== o && !t && Ue(r, "has", e), !t && Ue(r, "has", o), e === o ? n.has(e) : n.has(e) || n.has(o)
}

function sr(e, t = !1) {
    return e = e.__v_raw, !t && Ue(fe(e), "iterate", qt), Reflect.get(e, "size", e)
}

function Yi(e) {
    e = fe(e);
    const t = fe(this);
    return Yr(t).has.call(t, e) || (t.add(e), pt(t, "add", e, e)), this
}

function Gi(e, t) {
    t = fe(t);
    const n = fe(this), {has: r, get: o} = Yr(n);
    let i = r.call(n, e);
    i || (e = fe(e), i = r.call(n, e));
    const s = o.call(n, e);
    return n.set(e, t), i ? zn(t, s) && pt(n, "set", e, t) : pt(n, "add", e, t), this
}

function Zi(e) {
    const t = fe(this), {has: n, get: r} = Yr(t);
    let o = n.call(t, e);
    o || (e = fe(e), o = n.call(t, e)), r && r.call(t, e);
    const i = t.delete(e);
    return o && pt(t, "delete", e, void 0), i
}

function Xi() {
    const e = fe(this), t = e.size !== 0, n = e.clear();
    return t && pt(e, "clear", void 0, void 0), n
}

function ar(e, t) {
    return function (r, o) {
        const i = this, s = i.__v_raw, a = fe(s), l = t ? hi : e ? yi : $n;
        return !e && Ue(a, "iterate", qt), s.forEach((c, u) => r.call(o, l(c), l(u), i))
    }
}

function lr(e, t, n) {
    return function (...r) {
        const o = this.__v_raw, i = fe(o), s = sn(i), a = e === "entries" || e === Symbol.iterator && s,
            l = e === "keys" && s, c = o[e](...r), u = n ? hi : t ? yi : $n;
        return !t && Ue(i, "iterate", l ? jo : qt), {
            next() {
                const {value: d, done: f} = c.next();
                return f ? {value: d, done: f} : {value: a ? [u(d[0]), u(d[1])] : u(d), done: f}
            }, [Symbol.iterator]() {
                return this
            }
        }
    }
}

function ht(e) {
    return function (...t) {
        return e === "delete" ? !1 : this
    }
}

function of() {
    const e = {
        get(i) {
            return or(this, i)
        }, get size() {
            return sr(this)
        }, has: ir, add: Yi, set: Gi, delete: Zi, clear: Xi, forEach: ar(!1, !1)
    }, t = {
        get(i) {
            return or(this, i, !1, !0)
        }, get size() {
            return sr(this)
        }, has: ir, add: Yi, set: Gi, delete: Zi, clear: Xi, forEach: ar(!1, !0)
    }, n = {
        get(i) {
            return or(this, i, !0)
        }, get size() {
            return sr(this, !0)
        }, has(i) {
            return ir.call(this, i, !0)
        }, add: ht("add"), set: ht("set"), delete: ht("delete"), clear: ht("clear"), forEach: ar(!0, !1)
    }, r = {
        get(i) {
            return or(this, i, !0, !0)
        }, get size() {
            return sr(this, !0)
        }, has(i) {
            return ir.call(this, i, !0)
        }, add: ht("add"), set: ht("set"), delete: ht("delete"), clear: ht("clear"), forEach: ar(!0, !0)
    };
    return ["keys", "values", "entries", Symbol.iterator].forEach(i => {
        e[i] = lr(i, !1, !1), n[i] = lr(i, !0, !1), t[i] = lr(i, !1, !0), r[i] = lr(i, !0, !0)
    }), [e, n, t, r]
}

const [sf, af, lf, cf] = of();

function vi(e, t) {
    const n = t ? e ? cf : lf : e ? af : sf;
    return (r, o, i) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(ce(n, o) && o in r ? n : r, o, i)
}

const uf = {get: vi(!1, !1)}, ff = {get: vi(!1, !0)}, df = {get: vi(!0, !1)}, ml = new WeakMap, hl = new WeakMap,
    vl = new WeakMap, pf = new WeakMap;

function mf(e) {
    switch (e) {
        case"Object":
        case"Array":
            return 1;
        case"Map":
        case"Set":
        case"WeakMap":
        case"WeakSet":
            return 2;
        default:
            return 0
    }
}

function hf(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : mf(Nu(e))
}

function vn(e) {
    return Bn(e) ? e : _i(e, !1, pl, uf, ml)
}

function vf(e) {
    return _i(e, !1, rf, ff, hl)
}

function gi(e) {
    return _i(e, !0, nf, df, vl)
}

function _i(e, t, n, r, o) {
    if (!Ce(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
    const i = o.get(e);
    if (i) return i;
    const s = hf(e);
    if (s === 0) return e;
    const a = new Proxy(e, s === 2 ? r : n);
    return o.set(e, a), a
}

function an(e) {
    return Bn(e) ? an(e.__v_raw) : !!(e && e.__v_isReactive)
}

function Bn(e) {
    return !!(e && e.__v_isReadonly)
}

function gl(e) {
    return !!(e && e.__v_isShallow)
}

function _l(e) {
    return an(e) || Bn(e)
}

function fe(e) {
    const t = e && e.__v_raw;
    return t ? fe(t) : e
}

function yl(e) {
    return Pr(e, "__v_skip", !0), e
}

const $n = e => Ce(e) ? vn(e) : e, yi = e => Ce(e) ? gi(e) : e;

function bl(e) {
    wt && ot && (e = fe(e), ul(e.dep || (e.dep = di())))
}

function El(e, t) {
    e = fe(e), e.dep && To(e.dep)
}

function je(e) {
    return !!(e && e.__v_isRef === !0)
}

function ke(e) {
    return wl(e, !1)
}

function Ol(e) {
    return wl(e, !0)
}

function wl(e, t) {
    return je(e) ? e : new gf(e, t)
}

class gf {
    constructor(t, n) {
        this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : fe(t), this._value = n ? t : $n(t)
    }

    get value() {
        return bl(this), this._value
    }

    set value(t) {
        t = this.__v_isShallow ? t : fe(t), zn(t, this._rawValue) && (this._rawValue = t, this._value = this.__v_isShallow ? t : $n(t), El(this))
    }
}

function zt(e) {
    return je(e) ? e.value : e
}

const _f = {
    get: (e, t, n) => zt(Reflect.get(e, t, n)), set: (e, t, n, r) => {
        const o = e[t];
        return je(o) && !je(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r)
    }
};

function Sl(e) {
    return an(e) ? e : new Proxy(e, _f)
}

function w0(e) {
    const t = Z(e) ? new Array(e.length) : {};
    for (const n in e) t[n] = bf(e, n);
    return t
}

class yf {
    constructor(t, n, r) {
        this._object = t, this._key = n, this._defaultValue = r, this.__v_isRef = !0
    }

    get value() {
        const t = this._object[this._key];
        return t === void 0 ? this._defaultValue : t
    }

    set value(t) {
        this._object[this._key] = t
    }
}

function bf(e, t, n) {
    const r = e[t];
    return je(r) ? r : new yf(e, t, n)
}

class Ef {
    constructor(t, n, r, o) {
        this._setter = n, this.dep = void 0, this.__v_isRef = !0, this._dirty = !0, this.effect = new pi(t, () => {
            this._dirty || (this._dirty = !0, El(this))
        }), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = r
    }

    get value() {
        const t = fe(this);
        return bl(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value
    }

    set value(t) {
        this._setter(t)
    }
}

function Of(e, t, n = !1) {
    let r, o;
    const i = oe(e);
    return i ? (r = e, o = Xe) : (r = e.get, o = e.set), new Ef(r, o, i || !o, n)
}

Promise.resolve();

function St(e, t, n, r) {
    let o;
    try {
        o = r ? e(...r) : e()
    } catch (i) {
        er(i, t, n)
    }
    return o
}

function Qe(e, t, n, r) {
    if (oe(e)) {
        const i = St(e, t, n, r);
        return i && rl(i) && i.catch(s => {
            er(s, t, n)
        }), i
    }
    const o = [];
    for (let i = 0; i < e.length; i++) o.push(Qe(e[i], t, n, r));
    return o
}

function er(e, t, n, r = !0) {
    const o = t ? t.vnode : null;
    if (t) {
        let i = t.parent;
        const s = t.proxy, a = n;
        for (; i;) {
            const c = i.ec;
            if (c) {
                for (let u = 0; u < c.length; u++) if (c[u](e, s, a) === !1) return
            }
            i = i.parent
        }
        const l = t.appContext.config.errorHandler;
        if (l) {
            St(l, null, 10, [e, s, a]);
            return
        }
    }
    wf(e, n, o, r)
}

function wf(e, t, n, r = !0) {
    console.error(e)
}

let Cr = !1, ko = !1;
const Be = [];
let ct = 0;
const kn = [];
let In = null, Gt = 0;
const Rn = [];
let yt = null, Zt = 0;
const Pl = Promise.resolve();
let bi = null, Ro = null;

function Ei(e) {
    const t = bi || Pl;
    return e ? t.then(this ? e.bind(this) : e) : t
}

function Sf(e) {
    let t = ct + 1, n = Be.length;
    for (; t < n;) {
        const r = t + n >>> 1;
        Un(Be[r]) < e ? t = r + 1 : n = r
    }
    return t
}

function Oi(e) {
    (!Be.length || !Be.includes(e, Cr && e.allowRecurse ? ct + 1 : ct)) && e !== Ro && (e.id == null ? Be.push(e) : Be.splice(Sf(e.id), 0, e), Cl())
}

function Cl() {
    !Cr && !ko && (ko = !0, bi = Pl.then(Il))
}

function Pf(e) {
    const t = Be.indexOf(e);
    t > ct && Be.splice(t, 1)
}

function Al(e, t, n, r) {
    Z(e) ? n.push(...e) : (!t || !t.includes(e, e.allowRecurse ? r + 1 : r)) && n.push(e), Cl()
}

function Cf(e) {
    Al(e, In, kn, Gt)
}

function Af(e) {
    Al(e, yt, Rn, Zt)
}

function wi(e, t = null) {
    if (kn.length) {
        for (Ro = t, In = [...new Set(kn)], kn.length = 0, Gt = 0; Gt < In.length; Gt++) In[Gt]();
        In = null, Gt = 0, Ro = null, wi(e, t)
    }
}

function Ar(e) {
    if (Rn.length) {
        const t = [...new Set(Rn)];
        if (Rn.length = 0, yt) {
            yt.push(...t);
            return
        }
        for (yt = t, yt.sort((n, r) => Un(n) - Un(r)), Zt = 0; Zt < yt.length; Zt++) yt[Zt]();
        yt = null, Zt = 0
    }
}

const Un = e => e.id == null ? 1 / 0 : e.id;

function Il(e) {
    ko = !1, Cr = !0, wi(e), Be.sort((n, r) => Un(n) - Un(r));
    const t = Xe;
    try {
        for (ct = 0; ct < Be.length; ct++) {
            const n = Be[ct];
            n && n.active !== !1 && St(n, null, 14)
        }
    } finally {
        ct = 0, Be.length = 0, Ar(), Cr = !1, bi = null, (Be.length || kn.length || Rn.length) && Il(e)
    }
}

function If(e, t, ...n) {
    const r = e.vnode.props || ve;
    let o = n;
    const i = t.startsWith("update:"), s = i && t.slice(7);
    if (s && s in r) {
        const u = `${s === "modelValue" ? "model" : s}Modifiers`, {number: d, trim: f} = r[u] || ve;
        f ? o = n.map(h => h.trim()) : d && (o = n.map(sl))
    }
    let a, l = r[a = ao(t)] || r[a = ao(at(t))];
    !l && i && (l = r[a = ao(Ut(t))]), l && Qe(l, e, 6, o);
    const c = r[a + "Once"];
    if (c) {
        if (!e.emitted) e.emitted = {}; else if (e.emitted[a]) return;
        e.emitted[a] = !0, Qe(c, e, 6, o)
    }
}

function xl(e, t, n = !1) {
    const r = t.emitsCache, o = r.get(e);
    if (o !== void 0) return o;
    const i = e.emits;
    let s = {}, a = !1;
    if (!oe(e)) {
        const l = c => {
            const u = xl(c, t, !0);
            u && (a = !0, Re(s, u))
        };
        !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l)
    }
    return !i && !a ? (r.set(e, null), null) : (Z(i) ? i.forEach(l => s[l] = null) : Re(s, i), r.set(e, s), s)
}

function Si(e, t) {
    return !e || !Xn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), ce(e, t[0].toLowerCase() + t.slice(1)) || ce(e, Ut(t)) || ce(e, t))
}

let $e = null, jl = null;

function Ir(e) {
    const t = $e;
    return $e = e, jl = e && e.type.__scopeId || null, t
}

function xf(e, t = $e, n) {
    if (!t || e._n) return e;
    const r = (...o) => {
        r._d && us(-1);
        const i = Ir(t), s = e(...o);
        return Ir(i), r._d && us(1), s
    };
    return r._n = !0, r._c = !0, r._d = !0, r
}

function co(e) {
    const {
        type: t,
        vnode: n,
        proxy: r,
        withProxy: o,
        props: i,
        propsOptions: [s],
        slots: a,
        attrs: l,
        emit: c,
        render: u,
        renderCache: d,
        data: f,
        setupState: h,
        ctx: m,
        inheritAttrs: g
    } = e;
    let v, _;
    const E = Ir(e);
    try {
        if (n.shapeFlag & 4) {
            const S = o || r;
            v = Ze(u.call(S, S, d, i, h, f, m)), _ = l
        } else {
            const S = t;
            v = Ze(S.length > 1 ? S(i, {attrs: l, slots: a, emit: c}) : S(i, null)), _ = t.props ? l : jf(l)
        }
    } catch (S) {
        Ln.length = 0, er(S, e, 1), v = Se(Ye)
    }
    let O = v;
    if (_ && g !== !1) {
        const S = Object.keys(_), {shapeFlag: x} = O;
        S.length && x & 7 && (s && S.some(li) && (_ = Tf(_, s)), O = ln(O, _))
    }
    return n.dirs && (O.dirs = O.dirs ? O.dirs.concat(n.dirs) : n.dirs), n.transition && (O.transition = n.transition), v = O, Ir(E), v
}

const jf = e => {
    let t;
    for (const n in e) (n === "class" || n === "style" || Xn(n)) && ((t || (t = {}))[n] = e[n]);
    return t
}, Tf = (e, t) => {
    const n = {};
    for (const r in e) (!li(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n
};

function kf(e, t, n) {
    const {props: r, children: o, component: i} = e, {props: s, children: a, patchFlag: l} = t, c = i.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && l >= 0) {
        if (l & 1024) return !0;
        if (l & 16) return r ? es(r, s, c) : !!s;
        if (l & 8) {
            const u = t.dynamicProps;
            for (let d = 0; d < u.length; d++) {
                const f = u[d];
                if (s[f] !== r[f] && !Si(c, f)) return !0
            }
        }
    } else return (o || a) && (!a || !a.$stable) ? !0 : r === s ? !1 : r ? s ? es(r, s, c) : !0 : !!s;
    return !1
}

function es(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return !0;
    for (let o = 0; o < r.length; o++) {
        const i = r[o];
        if (t[i] !== e[i] && !Si(n, i)) return !0
    }
    return !1
}

function Rf({vnode: e, parent: t}, n) {
    for (; t && t.subTree === e;) (e = t.vnode).el = n, t = t.parent
}

const Df = e => e.__isSuspense;

function Tl(e, t) {
    t && t.pendingBranch ? Z(e) ? t.effects.push(...e) : t.effects.push(e) : Af(e)
}

function Pt(e, t) {
    if (Ie) {
        let n = Ie.provides;
        const r = Ie.parent && Ie.parent.provides;
        r === n && (n = Ie.provides = Object.create(r)), n[e] = t
    }
}

function xe(e, t, n = !1) {
    const r = Ie || $e;
    if (r) {
        const o = r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides;
        if (o && e in o) return o[e];
        if (arguments.length > 1) return n && oe(t) ? t.call(r.proxy) : t
    }
}

const ts = {};

function et(e, t, n) {
    return kl(e, t, n)
}

function kl(e, t, {immediate: n, deep: r, flush: o, onTrack: i, onTrigger: s} = ve) {
    const a = Ie;
    let l, c = !1, u = !1;
    if (je(e) ? (l = () => e.value, c = gl(e)) : an(e) ? (l = () => e, r = !0) : Z(e) ? (u = !0, c = e.some(an), l = () => e.map(_ => {
        if (je(_)) return _.value;
        if (an(_)) return Ft(_);
        if (oe(_)) return St(_, a, 2)
    })) : oe(e) ? t ? l = () => St(e, a, 2) : l = () => {
        if (!(a && a.isUnmounted)) return d && d(), Qe(e, a, 3, [f])
    } : l = Xe, t && r) {
        const _ = l;
        l = () => Ft(_())
    }
    let d, f = _ => {
        d = v.onStop = () => {
            St(_, a, 4)
        }
    };
    if (un) return f = Xe, t ? n && Qe(t, a, 3, [l(), u ? [] : void 0, f]) : l(), Xe;
    let h = u ? [] : ts;
    const m = () => {
        if (!!v.active) if (t) {
            const _ = v.run();
            (r || c || (u ? _.some((E, O) => zn(E, h[O])) : zn(_, h))) && (d && d(), Qe(t, a, 3, [_, h === ts ? void 0 : h, f]), h = _)
        } else v.run()
    };
    m.allowRecurse = !!t;
    let g;
    o === "sync" ? g = m : o === "post" ? g = () => He(m, a && a.suspense) : g = () => {
        !a || a.isMounted ? Cf(m) : m()
    };
    const v = new pi(l, g);
    return t ? n ? m() : h = v.run() : o === "post" ? He(v.run.bind(v), a && a.suspense) : v.run(), () => {
        v.stop(), a && a.scope && ci(a.scope.effects, v)
    }
}

function Lf(e, t, n) {
    const r = this.proxy, o = ge(e) ? e.includes(".") ? Rl(r, e) : () => r[e] : e.bind(r, r);
    let i;
    oe(t) ? i = t : (i = t.handler, n = t);
    const s = Ie;
    cn(this);
    const a = kl(o, i.bind(r), n);
    return s ? cn(s) : $t(), a
}

function Rl(e, t) {
    const n = t.split(".");
    return () => {
        let r = e;
        for (let o = 0; o < n.length && r; o++) r = r[n[o]];
        return r
    }
}

function Ft(e, t) {
    if (!Ce(e) || e.__v_skip || (t = t || new Set, t.has(e))) return e;
    if (t.add(e), je(e)) Ft(e.value, t); else if (Z(e)) for (let n = 0; n < e.length; n++) Ft(e[n], t); else if (nl(e) || sn(e)) e.forEach(n => {
        Ft(n, t)
    }); else if (il(e)) for (const n in e) Ft(e[n], t);
    return e
}

function Nf() {
    const e = {isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map};
    return tt(() => {
        e.isMounted = !0
    }), Pi(() => {
        e.isUnmounting = !0
    }), e
}

const Ke = [Function, Array], Mf = {
    name: "BaseTransition",
    props: {
        mode: String,
        appear: Boolean,
        persisted: Boolean,
        onBeforeEnter: Ke,
        onEnter: Ke,
        onAfterEnter: Ke,
        onEnterCancelled: Ke,
        onBeforeLeave: Ke,
        onLeave: Ke,
        onAfterLeave: Ke,
        onLeaveCancelled: Ke,
        onBeforeAppear: Ke,
        onAppear: Ke,
        onAfterAppear: Ke,
        onAppearCancelled: Ke
    },
    setup(e, {slots: t}) {
        const n = tc(), r = Nf();
        let o;
        return () => {
            const i = t.default && Nl(t.default(), !0);
            if (!i || !i.length) return;
            const s = fe(e), {mode: a} = s, l = i[0];
            if (r.isLeaving) return uo(l);
            const c = ns(l);
            if (!c) return uo(l);
            const u = Do(c, s, r, n);
            Lo(c, u);
            const d = n.subTree, f = d && ns(d);
            let h = !1;
            const {getTransitionKey: m} = c.type;
            if (m) {
                const g = m();
                o === void 0 ? o = g : g !== o && (o = g, h = !0)
            }
            if (f && f.type !== Ye && (!Mt(c, f) || h)) {
                const g = Do(f, s, r, n);
                if (Lo(f, g), a === "out-in") return r.isLeaving = !0, g.afterLeave = () => {
                    r.isLeaving = !1, n.update()
                }, uo(l);
                a === "in-out" && c.type !== Ye && (g.delayLeave = (v, _, E) => {
                    const O = Ll(r, f);
                    O[String(f.key)] = f, v._leaveCb = () => {
                        _(), v._leaveCb = void 0, delete u.delayedLeave
                    }, u.delayedLeave = E
                })
            }
            return l
        }
    }
}, Dl = Mf;

function Ll(e, t) {
    const {leavingVNodes: n} = e;
    let r = n.get(t.type);
    return r || (r = Object.create(null), n.set(t.type, r)), r
}

function Do(e, t, n, r) {
    const {
        appear: o,
        mode: i,
        persisted: s = !1,
        onBeforeEnter: a,
        onEnter: l,
        onAfterEnter: c,
        onEnterCancelled: u,
        onBeforeLeave: d,
        onLeave: f,
        onAfterLeave: h,
        onLeaveCancelled: m,
        onBeforeAppear: g,
        onAppear: v,
        onAfterAppear: _,
        onAppearCancelled: E
    } = t, O = String(e.key), S = Ll(n, e), x = (A, P) => {
        A && Qe(A, r, 9, P)
    }, L = {
        mode: i, persisted: s, beforeEnter(A) {
            let P = a;
            if (!n.isMounted) if (o) P = g || a; else return;
            A._leaveCb && A._leaveCb(!0);
            const B = S[O];
            B && Mt(e, B) && B.el._leaveCb && B.el._leaveCb(), x(P, [A])
        }, enter(A) {
            let P = l, B = c, q = u;
            if (!n.isMounted) if (o) P = v || l, B = _ || c, q = E || u; else return;
            let U = !1;
            const C = A._enterCb = F => {
                U || (U = !0, F ? x(q, [A]) : x(B, [A]), L.delayedLeave && L.delayedLeave(), A._enterCb = void 0)
            };
            P ? (P(A, C), P.length <= 1 && C()) : C()
        }, leave(A, P) {
            const B = String(e.key);
            if (A._enterCb && A._enterCb(!0), n.isUnmounting) return P();
            x(d, [A]);
            let q = !1;
            const U = A._leaveCb = C => {
                q || (q = !0, P(), C ? x(m, [A]) : x(h, [A]), A._leaveCb = void 0, S[B] === e && delete S[B])
            };
            S[B] = e, f ? (f(A, U), f.length <= 1 && U()) : U()
        }, clone(A) {
            return Do(A, t, n, r)
        }
    };
    return L
}

function uo(e) {
    if (tr(e)) return e = ln(e), e.children = null, e
}

function ns(e) {
    return tr(e) ? e.children ? e.children[0] : void 0 : e
}

function Lo(e, t) {
    e.shapeFlag & 6 && e.component ? Lo(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
}

function Nl(e, t = !1) {
    let n = [], r = 0;
    for (let o = 0; o < e.length; o++) {
        const i = e[o];
        i.type === Fe ? (i.patchFlag & 128 && r++, n = n.concat(Nl(i.children, t))) : (t || i.type !== Ye) && n.push(i)
    }
    if (r > 1) for (let o = 0; o < n.length; o++) n[o].patchFlag = -2;
    return n
}

function Ve(e) {
    return oe(e) ? {setup: e, name: e.name} : e
}

const xr = e => !!e.type.__asyncLoader;

function Oe(e) {
    oe(e) && (e = {loader: e});
    const {
        loader: t,
        loadingComponent: n,
        errorComponent: r,
        delay: o = 200,
        timeout: i,
        suspensible: s = !0,
        onError: a
    } = e;
    let l = null, c, u = 0;
    const d = () => (u++, l = null, f()), f = () => {
        let h;
        return l || (h = l = t().catch(m => {
            if (m = m instanceof Error ? m : new Error(String(m)), a) return new Promise((g, v) => {
                a(m, () => g(d()), () => v(m), u + 1)
            });
            throw m
        }).then(m => h !== l && l ? l : (m && (m.__esModule || m[Symbol.toStringTag] === "Module") && (m = m.default), c = m, m)))
    };
    return Ve({
        name: "AsyncComponentWrapper", __asyncLoader: f, get __asyncResolved() {
            return c
        }, setup() {
            const h = Ie;
            if (c) return () => fo(c, h);
            const m = E => {
                l = null, er(E, h, 13, !r)
            };
            if (s && h.suspense || un) return f().then(E => () => fo(E, h)).catch(E => (m(E), () => r ? Se(r, {error: E}) : null));
            const g = ke(!1), v = ke(), _ = ke(!!o);
            return o && setTimeout(() => {
                _.value = !1
            }, o), i != null && setTimeout(() => {
                if (!g.value && !v.value) {
                    const E = new Error(`Async component timed out after ${i}ms.`);
                    m(E), v.value = E
                }
            }, i), f().then(() => {
                g.value = !0, h.parent && tr(h.parent.vnode) && Oi(h.parent.update)
            }).catch(E => {
                m(E), v.value = E
            }), () => {
                if (g.value && c) return fo(c, h);
                if (v.value && r) return Se(r, {error: v.value});
                if (n && !_.value) return Se(n)
            }
        }
    })
}

function fo(e, {vnode: {ref: t, props: n, children: r}}) {
    const o = Se(e, n, r);
    return o.ref = t, o
}

const tr = e => e.type.__isKeepAlive;

function Hf(e, t) {
    Ml(e, "a", t)
}

function Ff(e, t) {
    Ml(e, "da", t)
}

function Ml(e, t, n = Ie) {
    const r = e.__wdc || (e.__wdc = () => {
        let o = n;
        for (; o;) {
            if (o.isDeactivated) return;
            o = o.parent
        }
        return e()
    });
    if (Gr(t, r, n), n) {
        let o = n.parent;
        for (; o && o.parent;) tr(o.parent.vnode) && qf(r, t, n, o), o = o.parent
    }
}

function qf(e, t, n, r) {
    const o = Gr(t, e, r, !0);
    Ci(() => {
        ci(r[t], o)
    }, n)
}

function Gr(e, t, n = Ie, r = !1) {
    if (n) {
        const o = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...s) => {
            if (n.isUnmounted) return;
            mn(), cn(n);
            const a = Qe(t, n, e, s);
            return $t(), hn(), a
        });
        return r ? o.unshift(i) : o.push(i), i
    }
}

const mt = e => (t, n = Ie) => (!un || e === "sp") && Gr(e, t, n), zf = mt("bm"), tt = mt("m"), Bf = mt("bu"),
    $f = mt("u"), Pi = mt("bum"), Ci = mt("um"), Uf = mt("sp"), Vf = mt("rtg"), Kf = mt("rtc");

function Wf(e, t = Ie) {
    Gr("ec", e, t)
}

let No = !0;

function Jf(e) {
    const t = Fl(e), n = e.proxy, r = e.ctx;
    No = !1, t.beforeCreate && rs(t.beforeCreate, e, "bc");
    const {
        data: o,
        computed: i,
        methods: s,
        watch: a,
        provide: l,
        inject: c,
        created: u,
        beforeMount: d,
        mounted: f,
        beforeUpdate: h,
        updated: m,
        activated: g,
        deactivated: v,
        beforeDestroy: _,
        beforeUnmount: E,
        destroyed: O,
        unmounted: S,
        render: x,
        renderTracked: L,
        renderTriggered: A,
        errorCaptured: P,
        serverPrefetch: B,
        expose: q,
        inheritAttrs: U,
        components: C,
        directives: F,
        filters: Q
    } = t;
    if (c && Qf(c, r, null, e.appContext.config.unwrapInjectedRef), s) for (const ee in s) {
        const te = s[ee];
        oe(te) && (r[ee] = te.bind(n))
    }
    if (o) {
        const ee = o.call(n, n);
        Ce(ee) && (e.data = vn(ee))
    }
    if (No = !0, i) for (const ee in i) {
        const te = i[ee], Ee = oe(te) ? te.bind(n, n) : oe(te.get) ? te.get.bind(n, n) : Xe,
            Pe = !oe(te) && oe(te.set) ? te.set.bind(n) : Xe, Ae = be({get: Ee, set: Pe});
        Object.defineProperty(r, ee, {enumerable: !0, configurable: !0, get: () => Ae.value, set: we => Ae.value = we})
    }
    if (a) for (const ee in a) Hl(a[ee], r, n, ee);
    if (l) {
        const ee = oe(l) ? l.call(n) : l;
        Reflect.ownKeys(ee).forEach(te => {
            Pt(te, ee[te])
        })
    }
    u && rs(u, e, "c");

    function W(ee, te) {
        Z(te) ? te.forEach(Ee => ee(Ee.bind(n))) : te && ee(te.bind(n))
    }

    if (W(zf, d), W(tt, f), W(Bf, h), W($f, m), W(Hf, g), W(Ff, v), W(Wf, P), W(Kf, L), W(Vf, A), W(Pi, E), W(Ci, S), W(Uf, B), Z(q)) if (q.length) {
        const ee = e.exposed || (e.exposed = {});
        q.forEach(te => {
            Object.defineProperty(ee, te, {get: () => n[te], set: Ee => n[te] = Ee})
        })
    } else e.exposed || (e.exposed = {});
    x && e.render === Xe && (e.render = x), U != null && (e.inheritAttrs = U), C && (e.components = C), F && (e.directives = F)
}

function Qf(e, t, n = Xe, r = !1) {
    Z(e) && (e = Mo(e));
    for (const o in e) {
        const i = e[o];
        let s;
        Ce(i) ? "default" in i ? s = xe(i.from || o, i.default, !0) : s = xe(i.from || o) : s = xe(i), je(s) && r ? Object.defineProperty(t, o, {
            enumerable: !0,
            configurable: !0,
            get: () => s.value,
            set: a => s.value = a
        }) : t[o] = s
    }
}

function rs(e, t, n) {
    Qe(Z(e) ? e.map(r => r.bind(t.proxy)) : e.bind(t.proxy), t, n)
}

function Hl(e, t, n, r) {
    const o = r.includes(".") ? Rl(n, r) : () => n[r];
    if (ge(e)) {
        const i = t[e];
        oe(i) && et(o, i)
    } else if (oe(e)) et(o, e.bind(n)); else if (Ce(e)) if (Z(e)) e.forEach(i => Hl(i, t, n, r)); else {
        const i = oe(e.handler) ? e.handler.bind(n) : t[e.handler];
        oe(i) && et(o, i, e)
    }
}

function Fl(e) {
    const t = e.type, {mixins: n, extends: r} = t, {
        mixins: o,
        optionsCache: i,
        config: {optionMergeStrategies: s}
    } = e.appContext, a = i.get(t);
    let l;
    return a ? l = a : !o.length && !n && !r ? l = t : (l = {}, o.length && o.forEach(c => jr(l, c, s, !0)), jr(l, t, s)), i.set(t, l), l
}

function jr(e, t, n, r = !1) {
    const {mixins: o, extends: i} = t;
    i && jr(e, i, n, !0), o && o.forEach(s => jr(e, s, n, !0));
    for (const s in t) if (!(r && s === "expose")) {
        const a = Yf[s] || n && n[s];
        e[s] = a ? a(e[s], t[s]) : t[s]
    }
    return e
}

const Yf = {
    data: os,
    props: Dt,
    emits: Dt,
    methods: Dt,
    computed: Dt,
    beforeCreate: Ne,
    created: Ne,
    beforeMount: Ne,
    mounted: Ne,
    beforeUpdate: Ne,
    updated: Ne,
    beforeDestroy: Ne,
    beforeUnmount: Ne,
    destroyed: Ne,
    unmounted: Ne,
    activated: Ne,
    deactivated: Ne,
    errorCaptured: Ne,
    serverPrefetch: Ne,
    components: Dt,
    directives: Dt,
    watch: Zf,
    provide: os,
    inject: Gf
};

function os(e, t) {
    return t ? e ? function () {
        return Re(oe(e) ? e.call(this, this) : e, oe(t) ? t.call(this, this) : t)
    } : t : e
}

function Gf(e, t) {
    return Dt(Mo(e), Mo(t))
}

function Mo(e) {
    if (Z(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t
    }
    return e
}

function Ne(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}

function Dt(e, t) {
    return e ? Re(Re(Object.create(null), e), t) : t
}

function Zf(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = Re(Object.create(null), e);
    for (const r in t) n[r] = Ne(e[r], t[r]);
    return n
}

function Xf(e, t, n, r = !1) {
    const o = {}, i = {};
    Pr(i, Xr, 1), e.propsDefaults = Object.create(null), ql(e, t, o, i);
    for (const s in e.propsOptions[0]) s in o || (o[s] = void 0);
    n ? e.props = r ? o : vf(o) : e.type.props ? e.props = o : e.props = i, e.attrs = i
}

function ed(e, t, n, r) {
    const {props: o, attrs: i, vnode: {patchFlag: s}} = e, a = fe(o), [l] = e.propsOptions;
    let c = !1;
    if ((r || s > 0) && !(s & 16)) {
        if (s & 8) {
            const u = e.vnode.dynamicProps;
            for (let d = 0; d < u.length; d++) {
                let f = u[d];
                const h = t[f];
                if (l) if (ce(i, f)) h !== i[f] && (i[f] = h, c = !0); else {
                    const m = at(f);
                    o[m] = Ho(l, a, m, h, e, !1)
                } else h !== i[f] && (i[f] = h, c = !0)
            }
        }
    } else {
        ql(e, t, o, i) && (c = !0);
        let u;
        for (const d in a) (!t || !ce(t, d) && ((u = Ut(d)) === d || !ce(t, u))) && (l ? n && (n[d] !== void 0 || n[u] !== void 0) && (o[d] = Ho(l, a, d, void 0, e, !0)) : delete o[d]);
        if (i !== a) for (const d in i) (!t || !ce(t, d) && !0) && (delete i[d], c = !0)
    }
    c && pt(e, "set", "$attrs")
}

function ql(e, t, n, r) {
    const [o, i] = e.propsOptions;
    let s = !1, a;
    if (t) for (let l in t) {
        if (Tn(l)) continue;
        const c = t[l];
        let u;
        o && ce(o, u = at(l)) ? !i || !i.includes(u) ? n[u] = c : (a || (a = {}))[u] = c : Si(e.emitsOptions, l) || (!(l in r) || c !== r[l]) && (r[l] = c, s = !0)
    }
    if (i) {
        const l = fe(n), c = a || ve;
        for (let u = 0; u < i.length; u++) {
            const d = i[u];
            n[d] = Ho(o, l, d, c[d], e, !ce(c, d))
        }
    }
    return s
}

function Ho(e, t, n, r, o, i) {
    const s = e[n];
    if (s != null) {
        const a = ce(s, "default");
        if (a && r === void 0) {
            const l = s.default;
            if (s.type !== Function && oe(l)) {
                const {propsDefaults: c} = o;
                n in c ? r = c[n] : (cn(o), r = c[n] = l.call(null, t), $t())
            } else r = l
        }
        s[0] && (i && !a ? r = !1 : s[1] && (r === "" || r === Ut(n)) && (r = !0))
    }
    return r
}

function zl(e, t, n = !1) {
    const r = t.propsCache, o = r.get(e);
    if (o) return o;
    const i = e.props, s = {}, a = [];
    let l = !1;
    if (!oe(e)) {
        const u = d => {
            l = !0;
            const [f, h] = zl(d, t, !0);
            Re(s, f), h && a.push(...h)
        };
        !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u)
    }
    if (!i && !l) return r.set(e, on), on;
    if (Z(i)) for (let u = 0; u < i.length; u++) {
        const d = at(i[u]);
        is(d) && (s[d] = ve)
    } else if (i) for (const u in i) {
        const d = at(u);
        if (is(d)) {
            const f = i[u], h = s[d] = Z(f) || oe(f) ? {type: f} : f;
            if (h) {
                const m = ls(Boolean, h.type), g = ls(String, h.type);
                h[0] = m > -1, h[1] = g < 0 || m < g, (m > -1 || ce(h, "default")) && a.push(d)
            }
        }
    }
    const c = [s, a];
    return r.set(e, c), c
}

function is(e) {
    return e[0] !== "$"
}

function ss(e) {
    const t = e && e.toString().match(/^\s*function (\w+)/);
    return t ? t[1] : e === null ? "null" : ""
}

function as(e, t) {
    return ss(e) === ss(t)
}

function ls(e, t) {
    return Z(t) ? t.findIndex(n => as(n, e)) : oe(t) && as(t, e) ? 0 : -1
}

const Bl = e => e[0] === "_" || e === "$stable", Ai = e => Z(e) ? e.map(Ze) : [Ze(e)], td = (e, t, n) => {
    const r = xf((...o) => Ai(t(...o)), n);
    return r._c = !1, r
}, $l = (e, t, n) => {
    const r = e._ctx;
    for (const o in e) {
        if (Bl(o)) continue;
        const i = e[o];
        if (oe(i)) t[o] = td(o, i, r); else if (i != null) {
            const s = Ai(i);
            t[o] = () => s
        }
    }
}, Ul = (e, t) => {
    const n = Ai(t);
    e.slots.default = () => n
}, nd = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
        const n = t._;
        n ? (e.slots = fe(t), Pr(t, "_", n)) : $l(t, e.slots = {})
    } else e.slots = {}, t && Ul(e, t);
    Pr(e.slots, Xr, 1)
}, rd = (e, t, n) => {
    const {vnode: r, slots: o} = e;
    let i = !0, s = ve;
    if (r.shapeFlag & 32) {
        const a = t._;
        a ? n && a === 1 ? i = !1 : (Re(o, t), !n && a === 1 && delete o._) : (i = !t.$stable, $l(t, o)), s = t
    } else t && (Ul(e, t), s = {default: 1});
    if (i) for (const a in o) !Bl(a) && !(a in s) && delete o[a]
};

function S0(e, t) {
    const n = $e;
    if (n === null) return e;
    const r = n.proxy, o = e.dirs || (e.dirs = []);
    for (let i = 0; i < t.length; i++) {
        let [s, a, l, c = ve] = t[i];
        oe(s) && (s = {mounted: s, updated: s}), s.deep && Ft(a), o.push({
            dir: s,
            instance: r,
            value: a,
            oldValue: void 0,
            arg: l,
            modifiers: c
        })
    }
    return e
}

function rt(e, t, n, r) {
    const o = e.dirs, i = t && t.dirs;
    for (let s = 0; s < o.length; s++) {
        const a = o[s];
        i && (a.oldValue = i[s].value);
        let l = a.dir[r];
        l && (mn(), Qe(l, n, 8, [e.el, a, e, t]), hn())
    }
}

function Vl() {
    return {
        app: null,
        config: {
            isNativeTag: Ru,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}

let od = 0;

function id(e, t) {
    return function (r, o = null) {
        o != null && !Ce(o) && (o = null);
        const i = Vl(), s = new Set;
        let a = !1;
        const l = i.app = {
            _uid: od++,
            _component: r,
            _props: o,
            _container: null,
            _context: i,
            _instance: null,
            version: Id,
            get config() {
                return i.config
            },
            set config(c) {
            },
            use(c, ...u) {
                return s.has(c) || (c && oe(c.install) ? (s.add(c), c.install(l, ...u)) : oe(c) && (s.add(c), c(l, ...u))), l
            },
            mixin(c) {
                return i.mixins.includes(c) || i.mixins.push(c), l
            },
            component(c, u) {
                return u ? (i.components[c] = u, l) : i.components[c]
            },
            directive(c, u) {
                return u ? (i.directives[c] = u, l) : i.directives[c]
            },
            mount(c, u, d) {
                if (!a) {
                    const f = Se(r, o);
                    return f.appContext = i, u && t ? t(f, c) : e(f, c, d), a = !0, l._container = c, c.__vue_app__ = l, ji(f.component) || f.component.proxy
                }
            },
            unmount() {
                a && (e(null, l._container), delete l._container.__vue_app__)
            },
            provide(c, u) {
                return i.provides[c] = u, l
            }
        };
        return l
    }
}

function Tr(e, t, n, r, o = !1) {
    if (Z(e)) {
        e.forEach((f, h) => Tr(f, t && (Z(t) ? t[h] : t), n, r, o));
        return
    }
    if (xr(r) && !o) return;
    const i = r.shapeFlag & 4 ? ji(r.component) || r.component.proxy : r.el, s = o ? null : i, {i: a, r: l} = e,
        c = t && t.r, u = a.refs === ve ? a.refs = {} : a.refs, d = a.setupState;
    if (c != null && c !== l && (ge(c) ? (u[c] = null, ce(d, c) && (d[c] = null)) : je(c) && (c.value = null)), oe(l)) St(l, a, 12, [s, u]); else {
        const f = ge(l), h = je(l);
        if (f || h) {
            const m = () => {
                if (e.f) {
                    const g = f ? u[l] : l.value;
                    o ? Z(g) && ci(g, i) : Z(g) ? g.includes(i) || g.push(i) : f ? u[l] = [i] : (l.value = [i], e.k && (u[e.k] = l.value))
                } else f ? (u[l] = s, ce(d, l) && (d[l] = s)) : je(l) && (l.value = s, e.k && (u[e.k] = s))
            };
            s ? (m.id = -1, He(m, n)) : m()
        }
    }
}

let vt = !1;
const cr = e => /svg/.test(e.namespaceURI) && e.tagName !== "foreignObject", po = e => e.nodeType === 8;

function sd(e) {
    const {mt: t, p: n, o: {patchProp: r, nextSibling: o, parentNode: i, remove: s, insert: a, createComment: l}} = e,
        c = (v, _) => {
            if (!_.hasChildNodes()) {
                n(null, v, _), Ar();
                return
            }
            vt = !1, u(_.firstChild, v, null, null, null), Ar(), vt && console.error("Hydration completed but contains mismatches.")
        }, u = (v, _, E, O, S, x = !1) => {
            const L = po(v) && v.data === "[", A = () => m(v, _, E, O, S, L), {type: P, ref: B, shapeFlag: q} = _,
                U = v.nodeType;
            _.el = v;
            let C = null;
            switch (P) {
                case Vn:
                    U !== 3 ? C = A() : (v.data !== _.children && (vt = !0, v.data = _.children), C = o(v));
                    break;
                case Ye:
                    U !== 8 || L ? C = A() : C = o(v);
                    break;
                case Dn:
                    if (U !== 1) C = A(); else {
                        C = v;
                        const F = !_.children.length;
                        for (let Q = 0; Q < _.staticCount; Q++) F && (_.children += C.outerHTML), Q === _.staticCount - 1 && (_.anchor = C), C = o(C);
                        return C
                    }
                    break;
                case Fe:
                    L ? C = h(v, _, E, O, S, x) : C = A();
                    break;
                default:
                    if (q & 1) U !== 1 || _.type.toLowerCase() !== v.tagName.toLowerCase() ? C = A() : C = d(v, _, E, O, S, x); else if (q & 6) {
                        _.slotScopeIds = S;
                        const F = i(v);
                        if (t(_, F, null, E, O, cr(F), x), C = L ? g(v) : o(v), xr(_)) {
                            let Q;
                            L ? (Q = Se(Fe), Q.anchor = C ? C.previousSibling : F.lastChild) : Q = v.nodeType === 3 ? Ii("") : Se("div"), Q.el = v, _.component.subTree = Q
                        }
                    } else q & 64 ? U !== 8 ? C = A() : C = _.type.hydrate(v, _, E, O, S, x, e, f) : q & 128 && (C = _.type.hydrate(v, _, E, O, cr(i(v)), S, x, e, u))
            }
            return B != null && Tr(B, null, O, _), C
        }, d = (v, _, E, O, S, x) => {
            x = x || !!_.dynamicChildren;
            const {type: L, props: A, patchFlag: P, shapeFlag: B, dirs: q} = _, U = L === "input" && q || L === "option";
            if (U || P !== -1) {
                if (q && rt(_, null, E, "created"), A) if (U || !x || P & 48) for (const F in A) (U && F.endsWith("value") || Xn(F) && !Tn(F)) && r(v, F, null, A[F], !1, void 0, E); else A.onClick && r(v, "onClick", null, A.onClick, !1, void 0, E);
                let C;
                if ((C = A && A.onVnodeBeforeMount) && We(C, E, _), q && rt(_, null, E, "beforeMount"), ((C = A && A.onVnodeMounted) || q) && Tl(() => {
                    C && We(C, E, _), q && rt(_, null, E, "mounted")
                }, O), B & 16 && !(A && (A.innerHTML || A.textContent))) {
                    let F = f(v.firstChild, _, v, E, O, S, x);
                    for (; F;) {
                        vt = !0;
                        const Q = F;
                        F = F.nextSibling, s(Q)
                    }
                } else B & 8 && v.textContent !== _.children && (vt = !0, v.textContent = _.children)
            }
            return v.nextSibling
        }, f = (v, _, E, O, S, x, L) => {
            L = L || !!_.dynamicChildren;
            const A = _.children, P = A.length;
            for (let B = 0; B < P; B++) {
                const q = L ? A[B] : A[B] = Ze(A[B]);
                if (v) v = u(v, q, O, S, x, L); else {
                    if (q.type === Vn && !q.children) continue;
                    vt = !0, n(null, q, E, null, O, S, cr(E), x)
                }
            }
            return v
        }, h = (v, _, E, O, S, x) => {
            const {slotScopeIds: L} = _;
            L && (S = S ? S.concat(L) : L);
            const A = i(v), P = f(o(v), _, A, E, O, S, x);
            return P && po(P) && P.data === "]" ? o(_.anchor = P) : (vt = !0, a(_.anchor = l("]"), A, P), P)
        }, m = (v, _, E, O, S, x) => {
            if (vt = !0, _.el = null, x) {
                const P = g(v);
                for (; ;) {
                    const B = o(v);
                    if (B && B !== P) s(B); else break
                }
            }
            const L = o(v), A = i(v);
            return s(v), n(null, _, A, L, E, O, cr(A), S), L
        }, g = v => {
            let _ = 0;
            for (; v;) if (v = o(v), v && po(v) && (v.data === "[" && _++, v.data === "]")) {
                if (_ === 0) return o(v);
                _--
            }
            return v
        };
    return [c, u]
}

const He = Tl;

function ad(e) {
    return ld(e, sd)
}

function ld(e, t) {
    const n = Fu();
    n.__VUE__ = !0;
    const {
            insert: r,
            remove: o,
            patchProp: i,
            createElement: s,
            createText: a,
            createComment: l,
            setText: c,
            setElementText: u,
            parentNode: d,
            nextSibling: f,
            setScopeId: h = Xe,
            cloneNode: m,
            insertStaticContent: g
        } = e, v = (p, y, w, I = null, T = null, k = null, M = !1, R = null, H = !!y.dynamicChildren) => {
            if (p === y) return;
            p && !Mt(p, y) && (I = $(p), Te(p, T, k, !0), p = null), y.patchFlag === -2 && (H = !1, y.dynamicChildren = null);
            const {type: D, ref: J, shapeFlag: K} = y;
            switch (D) {
                case Vn:
                    _(p, y, w, I);
                    break;
                case Ye:
                    E(p, y, w, I);
                    break;
                case Dn:
                    p == null && O(y, w, I, M);
                    break;
                case Fe:
                    F(p, y, w, I, T, k, M, R, H);
                    break;
                default:
                    K & 1 ? L(p, y, w, I, T, k, M, R, H) : K & 6 ? Q(p, y, w, I, T, k, M, R, H) : (K & 64 || K & 128) && D.process(p, y, w, I, T, k, M, R, H, de)
            }
            J != null && T && Tr(J, p && p.ref, k, y || p, !y)
        }, _ = (p, y, w, I) => {
            if (p == null) r(y.el = a(y.children), w, I); else {
                const T = y.el = p.el;
                y.children !== p.children && c(T, y.children)
            }
        }, E = (p, y, w, I) => {
            p == null ? r(y.el = l(y.children || ""), w, I) : y.el = p.el
        }, O = (p, y, w, I) => {
            [p.el, p.anchor] = g(p.children, y, w, I, p.el, p.anchor)
        }, S = ({el: p, anchor: y}, w, I) => {
            let T;
            for (; p && p !== y;) T = f(p), r(p, w, I), p = T;
            r(y, w, I)
        }, x = ({el: p, anchor: y}) => {
            let w;
            for (; p && p !== y;) w = f(p), o(p), p = w;
            o(y)
        }, L = (p, y, w, I, T, k, M, R, H) => {
            M = M || y.type === "svg", p == null ? A(y, w, I, T, k, M, R, H) : q(p, y, T, k, M, R, H)
        }, A = (p, y, w, I, T, k, M, R) => {
            let H, D;
            const {type: J, props: K, shapeFlag: V, transition: G, patchFlag: ie, dirs: ye} = p;
            if (p.el && m !== void 0 && ie === -1) H = p.el = m(p.el); else {
                if (H = p.el = s(p.type, k, K && K.is, K), V & 8 ? u(H, p.children) : V & 16 && B(p.children, H, null, I, T, k && J !== "foreignObject", M, R), ye && rt(p, null, I, "created"), K) {
                    for (const _e in K) _e !== "value" && !Tn(_e) && i(H, _e, null, K[_e], k, p.children, I, T, N);
                    "value" in K && i(H, "value", null, K.value), (D = K.onVnodeBeforeMount) && We(D, I, p)
                }
                P(H, p, p.scopeId, M, I)
            }
            ye && rt(p, null, I, "beforeMount");
            const me = (!T || T && !T.pendingBranch) && G && !G.persisted;
            me && G.beforeEnter(H), r(H, y, w), ((D = K && K.onVnodeMounted) || me || ye) && He(() => {
                D && We(D, I, p), me && G.enter(H), ye && rt(p, null, I, "mounted")
            }, T)
        }, P = (p, y, w, I, T) => {
            if (w && h(p, w), I) for (let k = 0; k < I.length; k++) h(p, I[k]);
            if (T) {
                let k = T.subTree;
                if (y === k) {
                    const M = T.vnode;
                    P(p, M, M.scopeId, M.slotScopeIds, T.parent)
                }
            }
        }, B = (p, y, w, I, T, k, M, R, H = 0) => {
            for (let D = H; D < p.length; D++) {
                const J = p[D] = R ? bt(p[D]) : Ze(p[D]);
                v(null, J, y, w, I, T, k, M, R)
            }
        }, q = (p, y, w, I, T, k, M) => {
            const R = y.el = p.el;
            let {patchFlag: H, dynamicChildren: D, dirs: J} = y;
            H |= p.patchFlag & 16;
            const K = p.props || ve, V = y.props || ve;
            let G;
            w && xt(w, !1), (G = V.onVnodeBeforeUpdate) && We(G, w, y, p), J && rt(y, p, w, "beforeUpdate"), w && xt(w, !0);
            const ie = T && y.type !== "foreignObject";
            if (D ? U(p.dynamicChildren, D, R, w, I, ie, k) : M || Ee(p, y, R, null, w, I, ie, k, !1), H > 0) {
                if (H & 16) C(R, y, K, V, w, I, T); else if (H & 2 && K.class !== V.class && i(R, "class", null, V.class, T), H & 4 && i(R, "style", K.style, V.style, T), H & 8) {
                    const ye = y.dynamicProps;
                    for (let me = 0; me < ye.length; me++) {
                        const _e = ye[me], Ge = K[_e], Vt = V[_e];
                        (Vt !== Ge || _e === "value") && i(R, _e, Ge, Vt, T, p.children, w, I, N)
                    }
                }
                H & 1 && p.children !== y.children && u(R, y.children)
            } else !M && D == null && C(R, y, K, V, w, I, T);
            ((G = V.onVnodeUpdated) || J) && He(() => {
                G && We(G, w, y, p), J && rt(y, p, w, "updated")
            }, I)
        }, U = (p, y, w, I, T, k, M) => {
            for (let R = 0; R < y.length; R++) {
                const H = p[R], D = y[R], J = H.el && (H.type === Fe || !Mt(H, D) || H.shapeFlag & 70) ? d(H.el) : w;
                v(H, D, J, null, I, T, k, M, !0)
            }
        }, C = (p, y, w, I, T, k, M) => {
            if (w !== I) {
                for (const R in I) {
                    if (Tn(R)) continue;
                    const H = I[R], D = w[R];
                    H !== D && R !== "value" && i(p, R, D, H, M, y.children, T, k, N)
                }
                if (w !== ve) for (const R in w) !Tn(R) && !(R in I) && i(p, R, w[R], null, M, y.children, T, k, N);
                "value" in I && i(p, "value", w.value, I.value)
            }
        }, F = (p, y, w, I, T, k, M, R, H) => {
            const D = y.el = p ? p.el : a(""), J = y.anchor = p ? p.anchor : a("");
            let {patchFlag: K, dynamicChildren: V, slotScopeIds: G} = y;
            G && (R = R ? R.concat(G) : G), p == null ? (r(D, w, I), r(J, w, I), B(y.children, w, J, T, k, M, R, H)) : K > 0 && K & 64 && V && p.dynamicChildren ? (U(p.dynamicChildren, V, w, T, k, M, R), (y.key != null || T && y === T.subTree) && Kl(p, y, !0)) : Ee(p, y, w, J, T, k, M, R, H)
        }, Q = (p, y, w, I, T, k, M, R, H) => {
            y.slotScopeIds = R, p == null ? y.shapeFlag & 512 ? T.ctx.activate(y, w, I, M, H) : se(y, w, I, T, k, M, H) : W(p, y, H)
        }, se = (p, y, w, I, T, k, M) => {
            const R = p.component = Ed(p, I, T);
            if (tr(p) && (R.ctx.renderer = de), Od(R), R.asyncDep) {
                if (T && T.registerDep(R, ee), !p.el) {
                    const H = R.subTree = Se(Ye);
                    E(null, H, y, w)
                }
                return
            }
            ee(R, p, y, w, T, k, M)
        }, W = (p, y, w) => {
            const I = y.component = p.component;
            if (kf(p, y, w)) if (I.asyncDep && !I.asyncResolved) {
                te(I, y, w);
                return
            } else I.next = y, Pf(I.update), I.update(); else y.component = p.component, y.el = p.el, I.vnode = y
        }, ee = (p, y, w, I, T, k, M) => {
            const R = () => {
                if (p.isMounted) {
                    let {next: J, bu: K, u: V, parent: G, vnode: ie} = p, ye = J, me;
                    xt(p, !1), J ? (J.el = ie.el, te(p, J, M)) : J = ie, K && lo(K), (me = J.props && J.props.onVnodeBeforeUpdate) && We(me, G, J, ie), xt(p, !0);
                    const _e = co(p), Ge = p.subTree;
                    p.subTree = _e, v(Ge, _e, d(Ge.el), $(Ge), p, T, k), J.el = _e.el, ye === null && Rf(p, _e.el), V && He(V, T), (me = J.props && J.props.onVnodeUpdated) && He(() => We(me, G, J, ie), T)
                } else {
                    let J;
                    const {el: K, props: V} = y, {bm: G, m: ie, parent: ye} = p, me = xr(y);
                    if (xt(p, !1), G && lo(G), !me && (J = V && V.onVnodeBeforeMount) && We(J, ye, y), xt(p, !0), K && X) {
                        const _e = () => {
                            p.subTree = co(p), X(K, p.subTree, p, T, null)
                        };
                        me ? y.type.__asyncLoader().then(() => !p.isUnmounted && _e()) : _e()
                    } else {
                        const _e = p.subTree = co(p);
                        v(null, _e, w, I, p, T, k), y.el = _e.el
                    }
                    if (ie && He(ie, T), !me && (J = V && V.onVnodeMounted)) {
                        const _e = y;
                        He(() => We(J, ye, _e), T)
                    }
                    y.shapeFlag & 256 && p.a && He(p.a, T), p.isMounted = !0, y = w = I = null
                }
            }, H = p.effect = new pi(R, () => Oi(p.update), p.scope), D = p.update = H.run.bind(H);
            D.id = p.uid, xt(p, !0), D()
        }, te = (p, y, w) => {
            y.component = p;
            const I = p.vnode.props;
            p.vnode = y, p.next = null, ed(p, y.props, I, w), rd(p, y.children, w), mn(), wi(void 0, p.update), hn()
        }, Ee = (p, y, w, I, T, k, M, R, H = !1) => {
            const D = p && p.children, J = p ? p.shapeFlag : 0, K = y.children, {patchFlag: V, shapeFlag: G} = y;
            if (V > 0) {
                if (V & 128) {
                    Ae(D, K, w, I, T, k, M, R, H);
                    return
                } else if (V & 256) {
                    Pe(D, K, w, I, T, k, M, R, H);
                    return
                }
            }
            G & 8 ? (J & 16 && N(D, T, k), K !== D && u(w, K)) : J & 16 ? G & 16 ? Ae(D, K, w, I, T, k, M, R, H) : N(D, T, k, !0) : (J & 8 && u(w, ""), G & 16 && B(K, w, I, T, k, M, R, H))
        }, Pe = (p, y, w, I, T, k, M, R, H) => {
            p = p || on, y = y || on;
            const D = p.length, J = y.length, K = Math.min(D, J);
            let V;
            for (V = 0; V < K; V++) {
                const G = y[V] = H ? bt(y[V]) : Ze(y[V]);
                v(p[V], G, w, null, T, k, M, R, H)
            }
            D > J ? N(p, T, k, !0, !1, K) : B(y, w, I, T, k, M, R, H, K)
        }, Ae = (p, y, w, I, T, k, M, R, H) => {
            let D = 0;
            const J = y.length;
            let K = p.length - 1, V = J - 1;
            for (; D <= K && D <= V;) {
                const G = p[D], ie = y[D] = H ? bt(y[D]) : Ze(y[D]);
                if (Mt(G, ie)) v(G, ie, w, null, T, k, M, R, H); else break;
                D++
            }
            for (; D <= K && D <= V;) {
                const G = p[K], ie = y[V] = H ? bt(y[V]) : Ze(y[V]);
                if (Mt(G, ie)) v(G, ie, w, null, T, k, M, R, H); else break;
                K--, V--
            }
            if (D > K) {
                if (D <= V) {
                    const G = V + 1, ie = G < J ? y[G].el : I;
                    for (; D <= V;) v(null, y[D] = H ? bt(y[D]) : Ze(y[D]), w, ie, T, k, M, R, H), D++
                }
            } else if (D > V) for (; D <= K;) Te(p[D], T, k, !0), D++; else {
                const G = D, ie = D, ye = new Map;
                for (D = ie; D <= V; D++) {
                    const ze = y[D] = H ? bt(y[D]) : Ze(y[D]);
                    ze.key != null && ye.set(ze.key, D)
                }
                let me, _e = 0;
                const Ge = V - ie + 1;
                let Vt = !1, Bi = 0;
                const yn = new Array(Ge);
                for (D = 0; D < Ge; D++) yn[D] = 0;
                for (D = G; D <= K; D++) {
                    const ze = p[D];
                    if (_e >= Ge) {
                        Te(ze, T, k, !0);
                        continue
                    }
                    let nt;
                    if (ze.key != null) nt = ye.get(ze.key); else for (me = ie; me <= V; me++) if (yn[me - ie] === 0 && Mt(ze, y[me])) {
                        nt = me;
                        break
                    }
                    nt === void 0 ? Te(ze, T, k, !0) : (yn[nt - ie] = D + 1, nt >= Bi ? Bi = nt : Vt = !0, v(ze, y[nt], w, null, T, k, M, R, H), _e++)
                }
                const $i = Vt ? cd(yn) : on;
                for (me = $i.length - 1, D = Ge - 1; D >= 0; D--) {
                    const ze = ie + D, nt = y[ze], Ui = ze + 1 < J ? y[ze + 1].el : I;
                    yn[D] === 0 ? v(null, nt, w, Ui, T, k, M, R, H) : Vt && (me < 0 || D !== $i[me] ? we(nt, w, Ui, 2) : me--)
                }
            }
        }, we = (p, y, w, I, T = null) => {
            const {el: k, type: M, transition: R, children: H, shapeFlag: D} = p;
            if (D & 6) {
                we(p.component.subTree, y, w, I);
                return
            }
            if (D & 128) {
                p.suspense.move(y, w, I);
                return
            }
            if (D & 64) {
                M.move(p, y, w, de);
                return
            }
            if (M === Fe) {
                r(k, y, w);
                for (let K = 0; K < H.length; K++) we(H[K], y, w, I);
                r(p.anchor, y, w);
                return
            }
            if (M === Dn) {
                S(p, y, w);
                return
            }
            if (I !== 2 && D & 1 && R) if (I === 0) R.beforeEnter(k), r(k, y, w), He(() => R.enter(k), T); else {
                const {leave: K, delayLeave: V, afterLeave: G} = R, ie = () => r(k, y, w), ye = () => {
                    K(k, () => {
                        ie(), G && G()
                    })
                };
                V ? V(k, ie, ye) : ye()
            } else r(k, y, w)
        }, Te = (p, y, w, I = !1, T = !1) => {
            const {type: k, props: M, ref: R, children: H, dynamicChildren: D, shapeFlag: J, patchFlag: K, dirs: V} = p;
            if (R != null && Tr(R, null, w, p, !0), J & 256) {
                y.ctx.deactivate(p);
                return
            }
            const G = J & 1 && V, ie = !xr(p);
            let ye;
            if (ie && (ye = M && M.onVnodeBeforeUnmount) && We(ye, y, p), J & 6) z(p.component, w, I); else {
                if (J & 128) {
                    p.suspense.unmount(w, I);
                    return
                }
                G && rt(p, null, y, "beforeUnmount"), J & 64 ? p.type.remove(p, y, w, T, de, I) : D && (k !== Fe || K > 0 && K & 64) ? N(D, y, w, !1, !0) : (k === Fe && K & 384 || !T && J & 16) && N(H, y, w), I && qe(p)
            }
            (ie && (ye = M && M.onVnodeUnmounted) || G) && He(() => {
                ye && We(ye, y, p), G && rt(p, null, y, "unmounted")
            }, w)
        }, qe = p => {
            const {type: y, el: w, anchor: I, transition: T} = p;
            if (y === Fe) {
                j(w, I);
                return
            }
            if (y === Dn) {
                x(p);
                return
            }
            const k = () => {
                o(w), T && !T.persisted && T.afterLeave && T.afterLeave()
            };
            if (p.shapeFlag & 1 && T && !T.persisted) {
                const {leave: M, delayLeave: R} = T, H = () => M(w, k);
                R ? R(p.el, k, H) : H()
            } else k()
        }, j = (p, y) => {
            let w;
            for (; p !== y;) w = f(p), o(p), p = w;
            o(y)
        }, z = (p, y, w) => {
            const {bum: I, scope: T, update: k, subTree: M, um: R} = p;
            I && lo(I), T.stop(), k && (k.active = !1, Te(M, p, y, w)), R && He(R, y), He(() => {
                p.isUnmounted = !0
            }, y), y && y.pendingBranch && !y.isUnmounted && p.asyncDep && !p.asyncResolved && p.suspenseId === y.pendingId && (y.deps--, y.deps === 0 && y.resolve())
        }, N = (p, y, w, I = !1, T = !1, k = 0) => {
            for (let M = k; M < p.length; M++) Te(p[M], y, w, I, T)
        }, $ = p => p.shapeFlag & 6 ? $(p.component.subTree) : p.shapeFlag & 128 ? p.suspense.next() : f(p.anchor || p.el),
        le = (p, y, w) => {
            p == null ? y._vnode && Te(y._vnode, null, null, !0) : v(y._vnode || null, p, y, null, null, null, w), Ar(), y._vnode = p
        }, de = {p: v, um: Te, m: we, r: qe, mt: se, mc: B, pc: Ee, pbc: U, n: $, o: e};
    let ne, X;
    return t && ([ne, X] = t(de)), {render: le, hydrate: ne, createApp: id(le, ne)}
}

function xt({effect: e, update: t}, n) {
    e.allowRecurse = t.allowRecurse = n
}

function Kl(e, t, n = !1) {
    const r = e.children, o = t.children;
    if (Z(r) && Z(o)) for (let i = 0; i < r.length; i++) {
        const s = r[i];
        let a = o[i];
        a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = o[i] = bt(o[i]), a.el = s.el), n || Kl(s, a))
    }
}

function cd(e) {
    const t = e.slice(), n = [0];
    let r, o, i, s, a;
    const l = e.length;
    for (r = 0; r < l; r++) {
        const c = e[r];
        if (c !== 0) {
            if (o = n[n.length - 1], e[o] < c) {
                t[r] = o, n.push(r);
                continue
            }
            for (i = 0, s = n.length - 1; i < s;) a = i + s >> 1, e[n[a]] < c ? i = a + 1 : s = a;
            c < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), n[i] = r)
        }
    }
    for (i = n.length, s = n[i - 1]; i-- > 0;) n[i] = s, s = t[s];
    return n
}

const ud = e => e.__isTeleport, Wl = "components";

function fd(e, t) {
    return pd(Wl, e, !0, t) || e
}

const dd = Symbol();

function pd(e, t, n = !0, r = !1) {
    const o = $e || Ie;
    if (o) {
        const i = o.type;
        if (e === Wl) {
            const a = Cd(i);
            if (a && (a === t || a === at(t) || a === Qr(at(t)))) return i
        }
        const s = cs(o[e] || i[e], t) || cs(o.appContext[e], t);
        return !s && r ? i : s
    }
}

function cs(e, t) {
    return e && (e[t] || e[at(t)] || e[Qr(at(t))])
}

const Fe = Symbol(void 0), Vn = Symbol(void 0), Ye = Symbol(void 0), Dn = Symbol(void 0), Ln = [];
let Bt = null;

function Zr(e = !1) {
    Ln.push(Bt = e ? null : [])
}

function md() {
    Ln.pop(), Bt = Ln[Ln.length - 1] || null
}

let kr = 1;

function us(e) {
    kr += e
}

function Jl(e) {
    return e.dynamicChildren = kr > 0 ? Bt || on : null, md(), kr > 0 && Bt && Bt.push(e), e
}

function Ql(e, t, n, r, o, i) {
    return Jl(Zl(e, t, n, r, o, i, !0))
}

function Yl(e, t, n, r, o) {
    return Jl(Se(e, t, n, r, o, !0))
}

function Rr(e) {
    return e ? e.__v_isVNode === !0 : !1
}

function Mt(e, t) {
    return e.type === t.type && e.key === t.key
}

const Xr = "__vInternal", Gl = ({key: e}) => e != null ? e : null,
    _r = ({ref: e, ref_key: t, ref_for: n}) => e != null ? ge(e) || je(e) || oe(e) ? {
        i: $e,
        r: e,
        k: t,
        f: !!n
    } : e : null;

function Zl(e, t = null, n = null, r = 0, o = null, i = e === Fe ? 0 : 1, s = !1, a = !1) {
    const l = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && Gl(t),
        ref: t && _r(t),
        scopeId: jl,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: i,
        patchFlag: r,
        dynamicProps: o,
        dynamicChildren: null,
        appContext: null
    };
    return a ? (xi(l, n), i & 128 && e.normalize(l)) : n && (l.shapeFlag |= ge(n) ? 8 : 16), kr > 0 && !s && Bt && (l.patchFlag > 0 || i & 6) && l.patchFlag !== 32 && Bt.push(l), l
}

const Se = hd;

function hd(e, t = null, n = null, r = 0, o = null, i = !1) {
    if ((!e || e === dd) && (e = Ye), Rr(e)) {
        const a = ln(e, t, !0);
        return n && xi(a, n), a
    }
    if (Ad(e) && (e = e.__vccOpts), t) {
        t = vd(t);
        let {class: a, style: l} = t;
        a && !ge(a) && (t.class = Zn(a)), Ce(l) && (_l(l) && !Z(l) && (l = Re({}, l)), t.style = Kr(l))
    }
    const s = ge(e) ? 1 : Df(e) ? 128 : ud(e) ? 64 : Ce(e) ? 4 : oe(e) ? 2 : 0;
    return Zl(e, t, n, r, o, s, i, !0)
}

function vd(e) {
    return e ? _l(e) || Xr in e ? Re({}, e) : e : null
}

function ln(e, t, n = !1) {
    const {props: r, ref: o, patchFlag: i, children: s} = e, a = t ? gd(r || {}, t) : r;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: a,
        key: a && Gl(a),
        ref: t && t.ref ? n && o ? Z(o) ? o.concat(_r(t)) : [o, _r(t)] : _r(t) : o,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: s,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== Fe ? i === -1 ? 16 : i | 16 : i,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && ln(e.ssContent),
        ssFallback: e.ssFallback && ln(e.ssFallback),
        el: e.el,
        anchor: e.anchor
    }
}

function Ii(e = " ", t = 0) {
    return Se(Vn, null, e, t)
}

function P0(e, t) {
    const n = Se(Dn, null, e);
    return n.staticCount = t, n
}

function C0(e = "", t = !1) {
    return t ? (Zr(), Yl(Ye, null, e)) : Se(Ye, null, e)
}

function Ze(e) {
    return e == null || typeof e == "boolean" ? Se(Ye) : Z(e) ? Se(Fe, null, e.slice()) : typeof e == "object" ? bt(e) : Se(Vn, null, String(e))
}

function bt(e) {
    return e.el === null || e.memo ? e : ln(e)
}

function xi(e, t) {
    let n = 0;
    const {shapeFlag: r} = e;
    if (t == null) t = null; else if (Z(t)) n = 16; else if (typeof t == "object") if (r & 65) {
        const o = t.default;
        o && (o._c && (o._d = !1), xi(e, o()), o._c && (o._d = !0));
        return
    } else {
        n = 32;
        const o = t._;
        !o && !(Xr in t) ? t._ctx = $e : o === 3 && $e && ($e.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024))
    } else oe(t) ? (t = {default: t, _ctx: $e}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Ii(t)]) : n = 8);
    e.children = t, e.shapeFlag |= n
}

function gd(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        for (const o in r) if (o === "class") t.class !== r.class && (t.class = Zn([t.class, r.class])); else if (o === "style") t.style = Kr([t.style, r.style]); else if (Xn(o)) {
            const i = t[o], s = r[o];
            s && i !== s && !(Z(i) && i.includes(s)) && (t[o] = i ? [].concat(i, s) : s)
        } else o !== "" && (t[o] = r[o])
    }
    return t
}

function We(e, t, n, r = null) {
    Qe(e, t, 7, [n, r])
}

function A0(e, t, n, r) {
    let o;
    const i = n && n[r];
    if (Z(e) || ge(e)) {
        o = new Array(e.length);
        for (let s = 0, a = e.length; s < a; s++) o[s] = t(e[s], s, void 0, i && i[s])
    } else if (typeof e == "number") {
        o = new Array(e);
        for (let s = 0; s < e; s++) o[s] = t(s + 1, s, void 0, i && i[s])
    } else if (Ce(e)) if (e[Symbol.iterator]) o = Array.from(e, (s, a) => t(s, a, void 0, i && i[a])); else {
        const s = Object.keys(e);
        o = new Array(s.length);
        for (let a = 0, l = s.length; a < l; a++) {
            const c = s[a];
            o[a] = t(e[c], c, a, i && i[a])
        }
    } else o = [];
    return n && (n[r] = o), o
}

function Xl(e, t, n = {}, r, o) {
    if ($e.isCE) return Se("slot", t === "default" ? null : {name: t}, r && r());
    let i = e[t];
    i && i._c && (i._d = !1), Zr();
    const s = i && ec(i(n)), a = Yl(Fe, {key: n.key || `_${t}`}, s || (r ? r() : []), s && e._ === 1 ? 64 : -2);
    return !o && a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]), i && i._c && (i._d = !0), a
}

function ec(e) {
    return e.some(t => Rr(t) ? !(t.type === Ye || t.type === Fe && !ec(t.children)) : !0) ? e : null
}

const Fo = e => e ? nc(e) ? ji(e) || e.proxy : Fo(e.parent) : null, Dr = Re(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => Fo(e.parent),
    $root: e => Fo(e.root),
    $emit: e => e.emit,
    $options: e => Fl(e),
    $forceUpdate: e => () => Oi(e.update),
    $nextTick: e => Ei.bind(e.proxy),
    $watch: e => Lf.bind(e)
}), _d = {
    get({_: e}, t) {
        const {ctx: n, setupState: r, data: o, props: i, accessCache: s, type: a, appContext: l} = e;
        let c;
        if (t[0] !== "$") {
            const h = s[t];
            if (h !== void 0) switch (h) {
                case 1:
                    return r[t];
                case 2:
                    return o[t];
                case 4:
                    return n[t];
                case 3:
                    return i[t]
            } else {
                if (r !== ve && ce(r, t)) return s[t] = 1, r[t];
                if (o !== ve && ce(o, t)) return s[t] = 2, o[t];
                if ((c = e.propsOptions[0]) && ce(c, t)) return s[t] = 3, i[t];
                if (n !== ve && ce(n, t)) return s[t] = 4, n[t];
                No && (s[t] = 0)
            }
        }
        const u = Dr[t];
        let d, f;
        if (u) return t === "$attrs" && Ue(e, "get", t), u(e);
        if ((d = a.__cssModules) && (d = d[t])) return d;
        if (n !== ve && ce(n, t)) return s[t] = 4, n[t];
        if (f = l.config.globalProperties, ce(f, t)) return f[t]
    }, set({_: e}, t, n) {
        const {data: r, setupState: o, ctx: i} = e;
        return o !== ve && ce(o, t) ? (o[t] = n, !0) : r !== ve && ce(r, t) ? (r[t] = n, !0) : ce(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0)
    }, has({_: {data: e, setupState: t, accessCache: n, ctx: r, appContext: o, propsOptions: i}}, s) {
        let a;
        return !!n[s] || e !== ve && ce(e, s) || t !== ve && ce(t, s) || (a = i[0]) && ce(a, s) || ce(r, s) || ce(Dr, s) || ce(o.config.globalProperties, s)
    }, defineProperty(e, t, n) {
        return n.get != null ? this.set(e, t, n.get(), null) : n.value != null && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
    }
}, yd = Vl();
let bd = 0;

function Ed(e, t, n) {
    const r = e.type, o = (t ? t.appContext : e.appContext) || yd, i = {
        uid: bd++,
        vnode: e,
        type: r,
        parent: t,
        appContext: o,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        scope: new qu(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: t ? t.provides : Object.create(o.provides),
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: zl(r, o),
        emitsOptions: xl(r, o),
        emit: null,
        emitted: null,
        propsDefaults: ve,
        inheritAttrs: r.inheritAttrs,
        ctx: ve,
        data: ve,
        props: ve,
        attrs: ve,
        slots: ve,
        refs: ve,
        setupState: ve,
        setupContext: null,
        suspense: n,
        suspenseId: n ? n.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
    };
    return i.ctx = {_: i}, i.root = t ? t.root : i, i.emit = If.bind(null, i), e.ce && e.ce(i), i
}

let Ie = null;
const tc = () => Ie || $e, cn = e => {
    Ie = e, e.scope.on()
}, $t = () => {
    Ie && Ie.scope.off(), Ie = null
};

function nc(e) {
    return e.vnode.shapeFlag & 4
}

let un = !1;

function Od(e, t = !1) {
    un = t;
    const {props: n, children: r} = e.vnode, o = nc(e);
    Xf(e, n, o, t), nd(e, r);
    const i = o ? wd(e, t) : void 0;
    return un = !1, i
}

function wd(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null), e.proxy = yl(new Proxy(e.ctx, _d));
    const {setup: r} = n;
    if (r) {
        const o = e.setupContext = r.length > 1 ? Pd(e) : null;
        cn(e), mn();
        const i = St(r, e, 0, [e.props, o]);
        if (hn(), $t(), rl(i)) {
            if (i.then($t, $t), t) return i.then(s => {
                fs(e, s, t)
            }).catch(s => {
                er(s, e, 0)
            });
            e.asyncDep = i
        } else fs(e, i, t)
    } else rc(e, t)
}

function fs(e, t, n) {
    oe(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Ce(t) && (e.setupState = Sl(t)), rc(e, n)
}

let ds;

function rc(e, t, n) {
    const r = e.type;
    if (!e.render) {
        if (!t && ds && !r.render) {
            const o = r.template;
            if (o) {
                const {isCustomElement: i, compilerOptions: s} = e.appContext.config, {
                    delimiters: a,
                    compilerOptions: l
                } = r, c = Re(Re({isCustomElement: i, delimiters: a}, s), l);
                r.render = ds(o, c)
            }
        }
        e.render = r.render || Xe
    }
    cn(e), mn(), Jf(e), hn(), $t()
}

function Sd(e) {
    return new Proxy(e.attrs, {
        get(t, n) {
            return Ue(e, "get", "$attrs"), t[n]
        }
    })
}

function Pd(e) {
    const t = r => {
        e.exposed = r || {}
    };
    let n;
    return {
        get attrs() {
            return n || (n = Sd(e))
        }, slots: e.slots, emit: e.emit, expose: t
    }
}

function ji(e) {
    if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(Sl(yl(e.exposed)), {
        get(t, n) {
            if (n in t) return t[n];
            if (n in Dr) return Dr[n](e)
        }
    }))
}

function Cd(e) {
    return oe(e) && e.displayName || e.name
}

function Ad(e) {
    return oe(e) && "__vccOpts" in e
}

const be = (e, t) => Of(e, t, un);

function pe(e, t, n) {
    const r = arguments.length;
    return r === 2 ? Ce(t) && !Z(t) ? Rr(t) ? Se(e, null, [t]) : Se(e, t) : Se(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && Rr(n) && (n = [n]), Se(e, t, n))
}

const Id = "3.2.31", xd = "http://www.w3.org/2000/svg", Ht = typeof document != "undefined" ? document : null,
    ps = Ht && Ht.createElement("template"), jd = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null)
        },
        remove: e => {
            const t = e.parentNode;
            t && t.removeChild(e)
        },
        createElement: (e, t, n, r) => {
            const o = t ? Ht.createElementNS(xd, e) : Ht.createElement(e, n ? {is: n} : void 0);
            return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o
        },
        createText: e => Ht.createTextNode(e),
        createComment: e => Ht.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t
        },
        setElementText: (e, t) => {
            e.textContent = t
        },
        parentNode: e => e.parentNode,
        nextSibling: e => e.nextSibling,
        querySelector: e => Ht.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, "")
        },
        cloneNode(e) {
            const t = e.cloneNode(!0);
            return "_value" in e && (t._value = e._value), t
        },
        insertStaticContent(e, t, n, r, o, i) {
            const s = n ? n.previousSibling : t.lastChild;
            if (o && (o === i || o.nextSibling)) for (; t.insertBefore(o.cloneNode(!0), n), !(o === i || !(o = o.nextSibling));) ; else {
                ps.innerHTML = r ? `<svg>${e}</svg>` : e;
                const a = ps.content;
                if (r) {
                    const l = a.firstChild;
                    for (; l.firstChild;) a.appendChild(l.firstChild);
                    a.removeChild(l)
                }
                t.insertBefore(a, n)
            }
            return [s ? s.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
        }
    };

function Td(e, t, n) {
    const r = e._vtc;
    r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}

function kd(e, t, n) {
    const r = e.style, o = ge(n);
    if (n && !o) {
        for (const i in n) qo(r, i, n[i]);
        if (t && !ge(t)) for (const i in t) n[i] == null && qo(r, i, "")
    } else {
        const i = r.display;
        o ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (r.display = i)
    }
}

const ms = /\s*!important$/;

function qo(e, t, n) {
    if (Z(n)) n.forEach(r => qo(e, t, r)); else if (t.startsWith("--")) e.setProperty(t, n); else {
        const r = Rd(e, t);
        ms.test(n) ? e.setProperty(Ut(r), n.replace(ms, ""), "important") : e[r] = n
    }
}

const hs = ["Webkit", "Moz", "ms"], mo = {};

function Rd(e, t) {
    const n = mo[t];
    if (n) return n;
    let r = at(t);
    if (r !== "filter" && r in e) return mo[t] = r;
    r = Qr(r);
    for (let o = 0; o < hs.length; o++) {
        const i = hs[o] + r;
        if (i in e) return mo[t] = i
    }
    return t
}

const vs = "http://www.w3.org/1999/xlink";

function Dd(e, t, n, r, o) {
    if (r && t.startsWith("xlink:")) n == null ? e.removeAttributeNS(vs, t.slice(6, t.length)) : e.setAttributeNS(vs, t, n); else {
        const i = Iu(t);
        n == null || i && !el(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : n)
    }
}

function Ld(e, t, n, r, o, i, s) {
    if (t === "innerHTML" || t === "textContent") {
        r && s(r, o, i), e[t] = n == null ? "" : n;
        return
    }
    if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
        e._value = n;
        const a = n == null ? "" : n;
        (e.value !== a || e.tagName === "OPTION") && (e.value = a), n == null && e.removeAttribute(t);
        return
    }
    if (n === "" || n == null) {
        const a = typeof e[t];
        if (a === "boolean") {
            e[t] = el(n);
            return
        } else if (n == null && a === "string") {
            e[t] = "", e.removeAttribute(t);
            return
        } else if (a === "number") {
            try {
                e[t] = 0
            } catch {
            }
            e.removeAttribute(t);
            return
        }
    }
    try {
        e[t] = n
    } catch {
    }
}

let Lr = Date.now, oc = !1;
if (typeof window != "undefined") {
    Lr() > document.createEvent("Event").timeStamp && (Lr = () => performance.now());
    const e = navigator.userAgent.match(/firefox\/(\d+)/i);
    oc = !!(e && Number(e[1]) <= 53)
}
let zo = 0;
const Nd = Promise.resolve(), Md = () => {
    zo = 0
}, Hd = () => zo || (Nd.then(Md), zo = Lr());

function Fd(e, t, n, r) {
    e.addEventListener(t, n, r)
}

function qd(e, t, n, r) {
    e.removeEventListener(t, n, r)
}

function zd(e, t, n, r, o = null) {
    const i = e._vei || (e._vei = {}), s = i[t];
    if (r && s) s.value = r; else {
        const [a, l] = Bd(t);
        if (r) {
            const c = i[t] = $d(r, o);
            Fd(e, a, c, l)
        } else s && (qd(e, a, s, l), i[t] = void 0)
    }
}

const gs = /(?:Once|Passive|Capture)$/;

function Bd(e) {
    let t;
    if (gs.test(e)) {
        t = {};
        let n;
        for (; n = e.match(gs);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0
    }
    return [Ut(e.slice(2)), t]
}

function $d(e, t) {
    const n = r => {
        const o = r.timeStamp || Lr();
        (oc || o >= n.attached - 1) && Qe(Ud(r, n.value), t, 5, [r])
    };
    return n.value = e, n.attached = Hd(), n
}

function Ud(e, t) {
    if (Z(t)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = () => {
            n.call(e), e._stopped = !0
        }, t.map(r => o => !o._stopped && r && r(o))
    } else return t
}

const _s = /^on[a-z]/, Vd = (e, t, n, r, o = !1, i, s, a, l) => {
    t === "class" ? Td(e, r, o) : t === "style" ? kd(e, n, r) : Xn(t) ? li(t) || zd(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Kd(e, t, r, o)) ? Ld(e, t, r, i, s, a, l) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Dd(e, t, r, o))
};

function Kd(e, t, n, r) {
    return r ? !!(t === "innerHTML" || t === "textContent" || t in e && _s.test(t) && oe(n)) : t === "spellcheck" || t === "draggable" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || _s.test(t) && ge(n) ? !1 : t in e
}

const gt = "transition", bn = "animation", eo = (e, {slots: t}) => pe(Dl, Wd(e), t);
eo.displayName = "Transition";
const ic = {
    name: String,
    type: String,
    css: {type: Boolean, default: !0},
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
};
eo.props = Re({}, Dl.props, ic);
const jt = (e, t = []) => {
    Z(e) ? e.forEach(n => n(...t)) : e && e(...t)
}, ys = e => e ? Z(e) ? e.some(t => t.length > 1) : e.length > 1 : !1;

function Wd(e) {
    const t = {};
    for (const C in e) C in ic || (t[C] = e[C]);
    if (e.css === !1) return t;
    const {
        name: n = "v",
        type: r,
        duration: o,
        enterFromClass: i = `${n}-enter-from`,
        enterActiveClass: s = `${n}-enter-active`,
        enterToClass: a = `${n}-enter-to`,
        appearFromClass: l = i,
        appearActiveClass: c = s,
        appearToClass: u = a,
        leaveFromClass: d = `${n}-leave-from`,
        leaveActiveClass: f = `${n}-leave-active`,
        leaveToClass: h = `${n}-leave-to`
    } = e, m = Jd(o), g = m && m[0], v = m && m[1], {
        onBeforeEnter: _,
        onEnter: E,
        onEnterCancelled: O,
        onLeave: S,
        onLeaveCancelled: x,
        onBeforeAppear: L = _,
        onAppear: A = E,
        onAppearCancelled: P = O
    } = t, B = (C, F, Q) => {
        Kt(C, F ? u : a), Kt(C, F ? c : s), Q && Q()
    }, q = (C, F) => {
        Kt(C, h), Kt(C, f), F && F()
    }, U = C => (F, Q) => {
        const se = C ? A : E, W = () => B(F, C, Q);
        jt(se, [F, W]), bs(() => {
            Kt(F, C ? l : i), _t(F, C ? u : a), ys(se) || Es(F, r, g, W)
        })
    };
    return Re(t, {
        onBeforeEnter(C) {
            jt(_, [C]), _t(C, i), _t(C, s)
        }, onBeforeAppear(C) {
            jt(L, [C]), _t(C, l), _t(C, c)
        }, onEnter: U(!1), onAppear: U(!0), onLeave(C, F) {
            const Q = () => q(C, F);
            _t(C, d), Gd(), _t(C, f), bs(() => {
                Kt(C, d), _t(C, h), ys(S) || Es(C, r, v, Q)
            }), jt(S, [C, Q])
        }, onEnterCancelled(C) {
            B(C, !1), jt(O, [C])
        }, onAppearCancelled(C) {
            B(C, !0), jt(P, [C])
        }, onLeaveCancelled(C) {
            q(C), jt(x, [C])
        }
    })
}

function Jd(e) {
    if (e == null) return null;
    if (Ce(e)) return [ho(e.enter), ho(e.leave)];
    {
        const t = ho(e);
        return [t, t]
    }
}

function ho(e) {
    return sl(e)
}

function _t(e, t) {
    t.split(/\s+/).forEach(n => n && e.classList.add(n)), (e._vtc || (e._vtc = new Set)).add(t)
}

function Kt(e, t) {
    t.split(/\s+/).forEach(r => r && e.classList.remove(r));
    const {_vtc: n} = e;
    n && (n.delete(t), n.size || (e._vtc = void 0))
}

function bs(e) {
    requestAnimationFrame(() => {
        requestAnimationFrame(e)
    })
}

let Qd = 0;

function Es(e, t, n, r) {
    const o = e._endId = ++Qd, i = () => {
        o === e._endId && r()
    };
    if (n) return setTimeout(i, n);
    const {type: s, timeout: a, propCount: l} = Yd(e, t);
    if (!s) return r();
    const c = s + "end";
    let u = 0;
    const d = () => {
        e.removeEventListener(c, f), i()
    }, f = h => {
        h.target === e && ++u >= l && d()
    };
    setTimeout(() => {
        u < l && d()
    }, a + 1), e.addEventListener(c, f)
}

function Yd(e, t) {
    const n = window.getComputedStyle(e), r = m => (n[m] || "").split(", "), o = r(gt + "Delay"),
        i = r(gt + "Duration"), s = Os(o, i), a = r(bn + "Delay"), l = r(bn + "Duration"), c = Os(a, l);
    let u = null, d = 0, f = 0;
    t === gt ? s > 0 && (u = gt, d = s, f = i.length) : t === bn ? c > 0 && (u = bn, d = c, f = l.length) : (d = Math.max(s, c), u = d > 0 ? s > c ? gt : bn : null, f = u ? u === gt ? i.length : l.length : 0);
    const h = u === gt && /\b(transform|all)(,|$)/.test(n[gt + "Property"]);
    return {type: u, timeout: d, propCount: f, hasTransform: h}
}

function Os(e, t) {
    for (; e.length < t.length;) e = e.concat(e);
    return Math.max(...t.map((n, r) => ws(n) + ws(e[r])))
}

function ws(e) {
    return Number(e.slice(0, -1).replace(",", ".")) * 1e3
}

function Gd() {
    return document.body.offsetHeight
}

const Zd = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace"
}, I0 = (e, t) => n => {
    if (!("key" in n)) return;
    const r = Ut(n.key);
    if (t.some(o => o === r || Zd[o] === r)) return e(n)
}, x0 = {
    beforeMount(e, {value: t}, {transition: n}) {
        e._vod = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : En(e, t)
    }, mounted(e, {value: t}, {transition: n}) {
        n && t && n.enter(e)
    }, updated(e, {value: t, oldValue: n}, {transition: r}) {
        !t != !n && (r ? t ? (r.beforeEnter(e), En(e, !0), r.enter(e)) : r.leave(e, () => {
            En(e, !1)
        }) : En(e, t))
    }, beforeUnmount(e, {value: t}) {
        En(e, t)
    }
};

function En(e, t) {
    e.style.display = t ? e._vod : "none"
}

const Xd = Re({patchProp: Vd}, jd);
let vo, Ss = !1;

function ep() {
    return vo = Ss ? vo : ad(Xd), Ss = !0, vo
}

const tp = (...e) => {
    const t = ep().createApp(...e), {mount: n} = t;
    return t.mount = r => {
        const o = np(r);
        if (o) return n(o, !0, o instanceof SVGElement)
    }, t
};

function np(e) {
    return ge(e) ? document.querySelector(e) : e
}/*!
* vue-router v4.0.12
* (c) 2021 Eduardo San Martin Morote
* @license MIT
*/
const sc = typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol", gn = e => sc ? Symbol(e) : "_vr_" + e,
    rp = gn("rvlm"), Ps = gn("rvd"), to = gn("r"), Ti = gn("rl"), Bo = gn("rvl"), Xt = typeof window != "undefined";

function op(e) {
    return e.__esModule || sc && e[Symbol.toStringTag] === "Module"
}

const he = Object.assign;

function go(e, t) {
    const n = {};
    for (const r in t) {
        const o = t[r];
        n[r] = Array.isArray(o) ? o.map(e) : e(o)
    }
    return n
}

const Nn = () => {
}, ip = /\/$/, sp = e => e.replace(ip, "");

function _o(e, t, n = "/") {
    let r, o = {}, i = "", s = "";
    const a = t.indexOf("?"), l = t.indexOf("#", a > -1 ? a : 0);
    return a > -1 && (r = t.slice(0, a), i = t.slice(a + 1, l > -1 ? l : t.length), o = e(i)), l > -1 && (r = r || t.slice(0, l), s = t.slice(l, t.length)), r = up(r != null ? r : t, n), {
        fullPath: r + (i && "?") + i + s,
        path: r,
        query: o,
        hash: s
    }
}

function ap(e, t) {
    const n = t.query ? e(t.query) : "";
    return t.path + (n && "?") + n + (t.hash || "")
}

function Cs(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/"
}

function lp(e, t, n) {
    const r = t.matched.length - 1, o = n.matched.length - 1;
    return r > -1 && r === o && fn(t.matched[r], n.matched[o]) && ac(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash
}

function fn(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t)
}

function ac(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e) if (!cp(e[n], t[n])) return !1;
    return !0
}

function cp(e, t) {
    return Array.isArray(e) ? As(e, t) : Array.isArray(t) ? As(t, e) : e === t
}

function As(e, t) {
    return Array.isArray(t) ? e.length === t.length && e.every((n, r) => n === t[r]) : e.length === 1 && e[0] === t
}

function up(e, t) {
    if (e.startsWith("/")) return e;
    if (!e) return t;
    const n = t.split("/"), r = e.split("/");
    let o = n.length - 1, i, s;
    for (i = 0; i < r.length; i++) if (s = r[i], !(o === 1 || s === ".")) if (s === "..") o--; else break;
    return n.slice(0, o).join("/") + "/" + r.slice(i - (i === r.length ? 1 : 0)).join("/")
}

var Kn;
(function (e) {
    e.pop = "pop", e.push = "push"
})(Kn || (Kn = {}));
var Mn;
(function (e) {
    e.back = "back", e.forward = "forward", e.unknown = ""
})(Mn || (Mn = {}));

function fp(e) {
    if (!e) if (Xt) {
        const t = document.querySelector("base");
        e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "")
    } else e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), sp(e)
}

const dp = /^[^#]+#/;

function pp(e, t) {
    return e.replace(dp, "#") + t
}

function mp(e, t) {
    const n = document.documentElement.getBoundingClientRect(), r = e.getBoundingClientRect();
    return {behavior: t.behavior, left: r.left - n.left - (t.left || 0), top: r.top - n.top - (t.top || 0)}
}

const no = () => ({left: window.pageXOffset, top: window.pageYOffset});

function hp(e) {
    let t;
    if ("el" in e) {
        const n = e.el, r = typeof n == "string" && n.startsWith("#"),
            o = typeof n == "string" ? r ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
        if (!o) return;
        t = mp(o, e)
    } else t = e;
    "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.pageXOffset, t.top != null ? t.top : window.pageYOffset)
}

function Is(e, t) {
    return (history.state ? history.state.position - t : -1) + e
}

const $o = new Map;

function vp(e, t) {
    $o.set(e, t)
}

function gp(e) {
    const t = $o.get(e);
    return $o.delete(e), t
}

let _p = () => location.protocol + "//" + location.host;

function lc(e, t) {
    const {pathname: n, search: r, hash: o} = t, i = e.indexOf("#");
    if (i > -1) {
        let a = o.includes(e.slice(i)) ? e.slice(i).length : 1, l = o.slice(a);
        return l[0] !== "/" && (l = "/" + l), Cs(l, "")
    }
    return Cs(n, e) + r + o
}

function yp(e, t, n, r) {
    let o = [], i = [], s = null;
    const a = ({state: f}) => {
        const h = lc(e, location), m = n.value, g = t.value;
        let v = 0;
        if (f) {
            if (n.value = h, t.value = f, s && s === m) {
                s = null;
                return
            }
            v = g ? f.position - g.position : 0
        } else r(h);
        o.forEach(_ => {
            _(n.value, m, {delta: v, type: Kn.pop, direction: v ? v > 0 ? Mn.forward : Mn.back : Mn.unknown})
        })
    };

    function l() {
        s = n.value
    }

    function c(f) {
        o.push(f);
        const h = () => {
            const m = o.indexOf(f);
            m > -1 && o.splice(m, 1)
        };
        return i.push(h), h
    }

    function u() {
        const {history: f} = window;
        !f.state || f.replaceState(he({}, f.state, {scroll: no()}), "")
    }

    function d() {
        for (const f of i) f();
        i = [], window.removeEventListener("popstate", a), window.removeEventListener("beforeunload", u)
    }

    return window.addEventListener("popstate", a), window.addEventListener("beforeunload", u), {
        pauseListeners: l,
        listen: c,
        destroy: d
    }
}

function xs(e, t, n, r = !1, o = !1) {
    return {back: e, current: t, forward: n, replaced: r, position: window.history.length, scroll: o ? no() : null}
}

function bp(e) {
    const {history: t, location: n} = window, r = {value: lc(e, n)}, o = {value: t.state};
    o.value || i(r.value, {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null
    }, !0);

    function i(l, c, u) {
        const d = e.indexOf("#"),
            f = d > -1 ? (n.host && document.querySelector("base") ? e : e.slice(d)) + l : _p() + e + l;
        try {
            t[u ? "replaceState" : "pushState"](c, "", f), o.value = c
        } catch (h) {
            console.error(h), n[u ? "replace" : "assign"](f)
        }
    }

    function s(l, c) {
        const u = he({}, t.state, xs(o.value.back, l, o.value.forward, !0), c, {position: o.value.position});
        i(l, u, !0), r.value = l
    }

    function a(l, c) {
        const u = he({}, o.value, t.state, {forward: l, scroll: no()});
        i(u.current, u, !0);
        const d = he({}, xs(r.value, l, null), {position: u.position + 1}, c);
        i(l, d, !1), r.value = l
    }

    return {location: r, state: o, push: a, replace: s}
}

function Ep(e) {
    e = fp(e);
    const t = bp(e), n = yp(e, t.state, t.location, t.replace);

    function r(i, s = !0) {
        s || n.pauseListeners(), history.go(i)
    }

    const o = he({location: "", base: e, go: r, createHref: pp.bind(null, e)}, t, n);
    return Object.defineProperty(o, "location", {
        enumerable: !0,
        get: () => t.location.value
    }), Object.defineProperty(o, "state", {enumerable: !0, get: () => t.state.value}), o
}

function Op(e) {
    return typeof e == "string" || e && typeof e == "object"
}

function cc(e) {
    return typeof e == "string" || typeof e == "symbol"
}

const lt = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
}, uc = gn("nf");
var js;
(function (e) {
    e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated"
})(js || (js = {}));

function dn(e, t) {
    return he(new Error, {type: e, [uc]: !0}, t)
}

function Tt(e, t) {
    return e instanceof Error && uc in e && (t == null || !!(e.type & t))
}

const Ts = "[^/]+?", wp = {sensitive: !1, strict: !1, start: !0, end: !0}, Sp = /[.+*?^${}()[\]/\\]/g;

function Pp(e, t) {
    const n = he({}, wp, t), r = [];
    let o = n.start ? "^" : "";
    const i = [];
    for (const c of e) {
        const u = c.length ? [] : [90];
        n.strict && !c.length && (o += "/");
        for (let d = 0; d < c.length; d++) {
            const f = c[d];
            let h = 40 + (n.sensitive ? .25 : 0);
            if (f.type === 0) d || (o += "/"), o += f.value.replace(Sp, "\\$&"), h += 40; else if (f.type === 1) {
                const {value: m, repeatable: g, optional: v, regexp: _} = f;
                i.push({name: m, repeatable: g, optional: v});
                const E = _ || Ts;
                if (E !== Ts) {
                    h += 10;
                    try {
                        new RegExp(`(${E})`)
                    } catch (S) {
                        throw new Error(`Invalid custom RegExp for param "${m}" (${E}): ` + S.message)
                    }
                }
                let O = g ? `((?:${E})(?:/(?:${E}))*)` : `(${E})`;
                d || (O = v && c.length < 2 ? `(?:/${O})` : "/" + O), v && (O += "?"), o += O, h += 20, v && (h += -8), g && (h += -20), E === ".*" && (h += -50)
            }
            u.push(h)
        }
        r.push(u)
    }
    if (n.strict && n.end) {
        const c = r.length - 1;
        r[c][r[c].length - 1] += .7000000000000001
    }
    n.strict || (o += "/?"), n.end ? o += "$" : n.strict && (o += "(?:/|$)");
    const s = new RegExp(o, n.sensitive ? "" : "i");

    function a(c) {
        const u = c.match(s), d = {};
        if (!u) return null;
        for (let f = 1; f < u.length; f++) {
            const h = u[f] || "", m = i[f - 1];
            d[m.name] = h && m.repeatable ? h.split("/") : h
        }
        return d
    }

    function l(c) {
        let u = "", d = !1;
        for (const f of e) {
            (!d || !u.endsWith("/")) && (u += "/"), d = !1;
            for (const h of f) if (h.type === 0) u += h.value; else if (h.type === 1) {
                const {value: m, repeatable: g, optional: v} = h, _ = m in c ? c[m] : "";
                if (Array.isArray(_) && !g) throw new Error(`Provided param "${m}" is an array but it is not repeatable (* or + modifiers)`);
                const E = Array.isArray(_) ? _.join("/") : _;
                if (!E) if (v) f.length < 2 && (u.endsWith("/") ? u = u.slice(0, -1) : d = !0); else throw new Error(`Missing required param "${m}"`);
                u += E
            }
        }
        return u
    }

    return {re: s, score: r, keys: i, parse: a, stringify: l}
}

function Cp(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length;) {
        const r = t[n] - e[n];
        if (r) return r;
        n++
    }
    return e.length < t.length ? e.length === 1 && e[0] === 40 + 40 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 40 + 40 ? 1 : -1 : 0
}

function Ap(e, t) {
    let n = 0;
    const r = e.score, o = t.score;
    for (; n < r.length && n < o.length;) {
        const i = Cp(r[n], o[n]);
        if (i) return i;
        n++
    }
    return o.length - r.length
}

const Ip = {type: 0, value: ""}, xp = /[a-zA-Z0-9_]/;

function jp(e) {
    if (!e) return [[]];
    if (e === "/") return [[Ip]];
    if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);

    function t(h) {
        throw new Error(`ERR (${n})/"${c}": ${h}`)
    }

    let n = 0, r = n;
    const o = [];
    let i;

    function s() {
        i && o.push(i), i = []
    }

    let a = 0, l, c = "", u = "";

    function d() {
        !c || (n === 0 ? i.push({
            type: 0,
            value: c
        }) : n === 1 || n === 2 || n === 3 ? (i.length > 1 && (l === "*" || l === "+") && t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`), i.push({
            type: 1,
            value: c,
            regexp: u,
            repeatable: l === "*" || l === "+",
            optional: l === "*" || l === "?"
        })) : t("Invalid state to consume buffer"), c = "")
    }

    function f() {
        c += l
    }

    for (; a < e.length;) {
        if (l = e[a++], l === "\\" && n !== 2) {
            r = n, n = 4;
            continue
        }
        switch (n) {
            case 0:
                l === "/" ? (c && d(), s()) : l === ":" ? (d(), n = 1) : f();
                break;
            case 4:
                f(), n = r;
                break;
            case 1:
                l === "(" ? n = 2 : xp.test(l) ? f() : (d(), n = 0, l !== "*" && l !== "?" && l !== "+" && a--);
                break;
            case 2:
                l === ")" ? u[u.length - 1] == "\\" ? u = u.slice(0, -1) + l : n = 3 : u += l;
                break;
            case 3:
                d(), n = 0, l !== "*" && l !== "?" && l !== "+" && a--, u = "";
                break;
            default:
                t("Unknown state");
                break
        }
    }
    return n === 2 && t(`Unfinished custom RegExp for param "${c}"`), d(), s(), o
}

function Tp(e, t, n) {
    const r = Pp(jp(e.path), n), o = he(r, {record: e, parent: t, children: [], alias: []});
    return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o
}

function kp(e, t) {
    const n = [], r = new Map;
    t = Rs({strict: !1, end: !0, sensitive: !1}, t);

    function o(u) {
        return r.get(u)
    }

    function i(u, d, f) {
        const h = !f, m = Dp(u);
        m.aliasOf = f && f.record;
        const g = Rs(t, u), v = [m];
        if ("alias" in u) {
            const O = typeof u.alias == "string" ? [u.alias] : u.alias;
            for (const S of O) v.push(he({}, m, {
                components: f ? f.record.components : m.components,
                path: S,
                aliasOf: f ? f.record : m
            }))
        }
        let _, E;
        for (const O of v) {
            const {path: S} = O;
            if (d && S[0] !== "/") {
                const x = d.record.path, L = x[x.length - 1] === "/" ? "" : "/";
                O.path = d.record.path + (S && L + S)
            }
            if (_ = Tp(O, d, g), f ? f.alias.push(_) : (E = E || _, E !== _ && E.alias.push(_), h && u.name && !ks(_) && s(u.name)), "children" in m) {
                const x = m.children;
                for (let L = 0; L < x.length; L++) i(x[L], _, f && f.children[L])
            }
            f = f || _, l(_)
        }
        return E ? () => {
            s(E)
        } : Nn
    }

    function s(u) {
        if (cc(u)) {
            const d = r.get(u);
            d && (r.delete(u), n.splice(n.indexOf(d), 1), d.children.forEach(s), d.alias.forEach(s))
        } else {
            const d = n.indexOf(u);
            d > -1 && (n.splice(d, 1), u.record.name && r.delete(u.record.name), u.children.forEach(s), u.alias.forEach(s))
        }
    }

    function a() {
        return n
    }

    function l(u) {
        let d = 0;
        for (; d < n.length && Ap(u, n[d]) >= 0;) d++;
        n.splice(d, 0, u), u.record.name && !ks(u) && r.set(u.record.name, u)
    }

    function c(u, d) {
        let f, h = {}, m, g;
        if ("name" in u && u.name) {
            if (f = r.get(u.name), !f) throw dn(1, {location: u});
            g = f.record.name, h = he(Rp(d.params, f.keys.filter(E => !E.optional).map(E => E.name)), u.params), m = f.stringify(h)
        } else if ("path" in u) m = u.path, f = n.find(E => E.re.test(m)), f && (h = f.parse(m), g = f.record.name); else {
            if (f = d.name ? r.get(d.name) : n.find(E => E.re.test(d.path)), !f) throw dn(1, {
                location: u,
                currentLocation: d
            });
            g = f.record.name, h = he({}, d.params, u.params), m = f.stringify(h)
        }
        const v = [];
        let _ = f;
        for (; _;) v.unshift(_.record), _ = _.parent;
        return {name: g, path: m, params: h, matched: v, meta: Np(v)}
    }

    return e.forEach(u => i(u)), {addRoute: i, resolve: c, removeRoute: s, getRoutes: a, getRecordMatcher: o}
}

function Rp(e, t) {
    const n = {};
    for (const r of t) r in e && (n[r] = e[r]);
    return n
}

function Dp(e) {
    return {
        path: e.path,
        redirect: e.redirect,
        name: e.name,
        meta: e.meta || {},
        aliasOf: void 0,
        beforeEnter: e.beforeEnter,
        props: Lp(e),
        children: e.children || [],
        instances: {},
        leaveGuards: new Set,
        updateGuards: new Set,
        enterCallbacks: {},
        components: "components" in e ? e.components || {} : {default: e.component}
    }
}

function Lp(e) {
    const t = {}, n = e.props || !1;
    if ("component" in e) t.default = n; else for (const r in e.components) t[r] = typeof n == "boolean" ? n : n[r];
    return t
}

function ks(e) {
    for (; e;) {
        if (e.record.aliasOf) return !0;
        e = e.parent
    }
    return !1
}

function Np(e) {
    return e.reduce((t, n) => he(t, n.meta), {})
}

function Rs(e, t) {
    const n = {};
    for (const r in e) n[r] = r in t ? t[r] : e[r];
    return n
}

const fc = /#/g, Mp = /&/g, Hp = /\//g, Fp = /=/g, qp = /\?/g, dc = /\+/g, zp = /%5B/g, Bp = /%5D/g, pc = /%5E/g,
    $p = /%60/g, mc = /%7B/g, Up = /%7C/g, hc = /%7D/g, Vp = /%20/g;

function ki(e) {
    return encodeURI("" + e).replace(Up, "|").replace(zp, "[").replace(Bp, "]")
}

function Kp(e) {
    return ki(e).replace(mc, "{").replace(hc, "}").replace(pc, "^")
}

function Uo(e) {
    return ki(e).replace(dc, "%2B").replace(Vp, "+").replace(fc, "%23").replace(Mp, "%26").replace($p, "`").replace(mc, "{").replace(hc, "}").replace(pc, "^")
}

function Wp(e) {
    return Uo(e).replace(Fp, "%3D")
}

function Jp(e) {
    return ki(e).replace(fc, "%23").replace(qp, "%3F")
}

function Qp(e) {
    return e == null ? "" : Jp(e).replace(Hp, "%2F")
}

function Nr(e) {
    try {
        return decodeURIComponent("" + e)
    } catch {
    }
    return "" + e
}

function Yp(e) {
    const t = {};
    if (e === "" || e === "?") return t;
    const r = (e[0] === "?" ? e.slice(1) : e).split("&");
    for (let o = 0; o < r.length; ++o) {
        const i = r[o].replace(dc, " "), s = i.indexOf("="), a = Nr(s < 0 ? i : i.slice(0, s)),
            l = s < 0 ? null : Nr(i.slice(s + 1));
        if (a in t) {
            let c = t[a];
            Array.isArray(c) || (c = t[a] = [c]), c.push(l)
        } else t[a] = l
    }
    return t
}

function Ds(e) {
    let t = "";
    for (let n in e) {
        const r = e[n];
        if (n = Wp(n), r == null) {
            r !== void 0 && (t += (t.length ? "&" : "") + n);
            continue
        }
        (Array.isArray(r) ? r.map(i => i && Uo(i)) : [r && Uo(r)]).forEach(i => {
            i !== void 0 && (t += (t.length ? "&" : "") + n, i != null && (t += "=" + i))
        })
    }
    return t
}

function Gp(e) {
    const t = {};
    for (const n in e) {
        const r = e[n];
        r !== void 0 && (t[n] = Array.isArray(r) ? r.map(o => o == null ? null : "" + o) : r == null ? r : "" + r)
    }
    return t
}

function On() {
    let e = [];

    function t(r) {
        return e.push(r), () => {
            const o = e.indexOf(r);
            o > -1 && e.splice(o, 1)
        }
    }

    function n() {
        e = []
    }

    return {add: t, list: () => e, reset: n}
}

function Et(e, t, n, r, o) {
    const i = r && (r.enterCallbacks[o] = r.enterCallbacks[o] || []);
    return () => new Promise((s, a) => {
        const l = d => {
            d === !1 ? a(dn(4, {from: n, to: t})) : d instanceof Error ? a(d) : Op(d) ? a(dn(2, {
                from: t,
                to: d
            })) : (i && r.enterCallbacks[o] === i && typeof d == "function" && i.push(d), s())
        }, c = e.call(r && r.instances[o], t, n, l);
        let u = Promise.resolve(c);
        e.length < 3 && (u = u.then(l)), u.catch(d => a(d))
    })
}

function yo(e, t, n, r) {
    const o = [];
    for (const i of e) for (const s in i.components) {
        let a = i.components[s];
        if (!(t !== "beforeRouteEnter" && !i.instances[s])) if (Zp(a)) {
            const c = (a.__vccOpts || a)[t];
            c && o.push(Et(c, n, r, i, s))
        } else {
            let l = a();
            o.push(() => l.then(c => {
                if (!c) return Promise.reject(new Error(`Couldn't resolve component "${s}" at "${i.path}"`));
                const u = op(c) ? c.default : c;
                i.components[s] = u;
                const f = (u.__vccOpts || u)[t];
                return f && Et(f, n, r, i, s)()
            }))
        }
    }
    return o
}

function Zp(e) {
    return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e
}

function Ls(e) {
    const t = xe(to), n = xe(Ti), r = be(() => t.resolve(zt(e.to))), o = be(() => {
            const {matched: l} = r.value, {length: c} = l, u = l[c - 1], d = n.matched;
            if (!u || !d.length) return -1;
            const f = d.findIndex(fn.bind(null, u));
            if (f > -1) return f;
            const h = Ns(l[c - 2]);
            return c > 1 && Ns(u) === h && d[d.length - 1].path !== h ? d.findIndex(fn.bind(null, l[c - 2])) : f
        }), i = be(() => o.value > -1 && nm(n.params, r.value.params)),
        s = be(() => o.value > -1 && o.value === n.matched.length - 1 && ac(n.params, r.value.params));

    function a(l = {}) {
        return tm(l) ? t[zt(e.replace) ? "replace" : "push"](zt(e.to)).catch(Nn) : Promise.resolve()
    }

    return {route: r, href: be(() => r.value.href), isActive: i, isExactActive: s, navigate: a}
}

const Xp = Ve({
    name: "RouterLink",
    props: {
        to: {type: [String, Object], required: !0},
        replace: Boolean,
        activeClass: String,
        exactActiveClass: String,
        custom: Boolean,
        ariaCurrentValue: {type: String, default: "page"}
    },
    useLink: Ls,
    setup(e, {slots: t}) {
        const n = vn(Ls(e)), {options: r} = xe(to), o = be(() => ({
            [Ms(e.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
            [Ms(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
        }));
        return () => {
            const i = t.default && t.default(n);
            return e.custom ? i : pe("a", {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: o.value
            }, i)
        }
    }
}), em = Xp;

function tm(e) {
    if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
        if (e.currentTarget && e.currentTarget.getAttribute) {
            const t = e.currentTarget.getAttribute("target");
            if (/\b_blank\b/i.test(t)) return
        }
        return e.preventDefault && e.preventDefault(), !0
    }
}

function nm(e, t) {
    for (const n in t) {
        const r = t[n], o = e[n];
        if (typeof r == "string") {
            if (r !== o) return !1
        } else if (!Array.isArray(o) || o.length !== r.length || r.some((i, s) => i !== o[s])) return !1
    }
    return !0
}

function Ns(e) {
    return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}

const Ms = (e, t, n) => e != null ? e : t != null ? t : n, rm = Ve({
    name: "RouterView",
    inheritAttrs: !1,
    props: {name: {type: String, default: "default"}, route: Object},
    setup(e, {attrs: t, slots: n}) {
        const r = xe(Bo), o = be(() => e.route || r.value), i = xe(Ps, 0), s = be(() => o.value.matched[i]);
        Pt(Ps, i + 1), Pt(rp, s), Pt(Bo, o);
        const a = ke();
        return et(() => [a.value, s.value, e.name], ([l, c, u], [d, f, h]) => {
            c && (c.instances[u] = l, f && f !== c && l && l === d && (c.leaveGuards.size || (c.leaveGuards = f.leaveGuards), c.updateGuards.size || (c.updateGuards = f.updateGuards))), l && c && (!f || !fn(c, f) || !d) && (c.enterCallbacks[u] || []).forEach(m => m(l))
        }, {flush: "post"}), () => {
            const l = o.value, c = s.value, u = c && c.components[e.name], d = e.name;
            if (!u) return Hs(n.default, {Component: u, route: l});
            const f = c.props[e.name], h = f ? f === !0 ? l.params : typeof f == "function" ? f(l) : f : null,
                g = pe(u, he({}, h, t, {
                    onVnodeUnmounted: v => {
                        v.component.isUnmounted && (c.instances[d] = null)
                    }, ref: a
                }));
            return Hs(n.default, {Component: g, route: l}) || g
        }
    }
});

function Hs(e, t) {
    if (!e) return null;
    const n = e(t);
    return n.length === 1 ? n[0] : n
}

const vc = rm;

function om(e) {
    const t = kp(e.routes, e), n = e.parseQuery || Yp, r = e.stringifyQuery || Ds, o = e.history, i = On(), s = On(),
        a = On(), l = Ol(lt);
    let c = lt;
    Xt && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
    const u = go.bind(null, j => "" + j), d = go.bind(null, Qp), f = go.bind(null, Nr);

    function h(j, z) {
        let N, $;
        return cc(j) ? (N = t.getRecordMatcher(j), $ = z) : $ = j, t.addRoute($, N)
    }

    function m(j) {
        const z = t.getRecordMatcher(j);
        z && t.removeRoute(z)
    }

    function g() {
        return t.getRoutes().map(j => j.record)
    }

    function v(j) {
        return !!t.getRecordMatcher(j)
    }

    function _(j, z) {
        if (z = he({}, z || l.value), typeof j == "string") {
            const X = _o(n, j, z.path), p = t.resolve({path: X.path}, z), y = o.createHref(X.fullPath);
            return he(X, p, {params: f(p.params), hash: Nr(X.hash), redirectedFrom: void 0, href: y})
        }
        let N;
        if ("path" in j) N = he({}, j, {path: _o(n, j.path, z.path).path}); else {
            const X = he({}, j.params);
            for (const p in X) X[p] == null && delete X[p];
            N = he({}, j, {params: d(j.params)}), z.params = d(z.params)
        }
        const $ = t.resolve(N, z), le = j.hash || "";
        $.params = u(f($.params));
        const de = ap(r, he({}, j, {hash: Kp(le), path: $.path})), ne = o.createHref(de);
        return he({fullPath: de, hash: le, query: r === Ds ? Gp(j.query) : j.query || {}}, $, {
            redirectedFrom: void 0,
            href: ne
        })
    }

    function E(j) {
        return typeof j == "string" ? _o(n, j, l.value.path) : he({}, j)
    }

    function O(j, z) {
        if (c !== j) return dn(8, {from: z, to: j})
    }

    function S(j) {
        return A(j)
    }

    function x(j) {
        return S(he(E(j), {replace: !0}))
    }

    function L(j) {
        const z = j.matched[j.matched.length - 1];
        if (z && z.redirect) {
            const {redirect: N} = z;
            let $ = typeof N == "function" ? N(j) : N;
            return typeof $ == "string" && ($ = $.includes("?") || $.includes("#") ? $ = E($) : {path: $}, $.params = {}), he({
                query: j.query,
                hash: j.hash,
                params: j.params
            }, $)
        }
    }

    function A(j, z) {
        const N = c = _(j), $ = l.value, le = j.state, de = j.force, ne = j.replace === !0, X = L(N);
        if (X) return A(he(E(X), {state: le, force: de, replace: ne}), z || N);
        const p = N;
        p.redirectedFrom = z;
        let y;
        return !de && lp(r, $, N) && (y = dn(16, {
            to: p,
            from: $
        }), Pe($, $, !0, !1)), (y ? Promise.resolve(y) : B(p, $)).catch(w => Tt(w) ? w : ee(w, p, $)).then(w => {
            if (w) {
                if (Tt(w, 2)) return A(he(E(w.to), {state: le, force: de, replace: ne}), z || p)
            } else w = U(p, $, !0, ne, le);
            return q(p, $, w), w
        })
    }

    function P(j, z) {
        const N = O(j, z);
        return N ? Promise.reject(N) : Promise.resolve()
    }

    function B(j, z) {
        let N;
        const [$, le, de] = im(j, z);
        N = yo($.reverse(), "beforeRouteLeave", j, z);
        for (const X of $) X.leaveGuards.forEach(p => {
            N.push(Et(p, j, z))
        });
        const ne = P.bind(null, j, z);
        return N.push(ne), Wt(N).then(() => {
            N = [];
            for (const X of i.list()) N.push(Et(X, j, z));
            return N.push(ne), Wt(N)
        }).then(() => {
            N = yo(le, "beforeRouteUpdate", j, z);
            for (const X of le) X.updateGuards.forEach(p => {
                N.push(Et(p, j, z))
            });
            return N.push(ne), Wt(N)
        }).then(() => {
            N = [];
            for (const X of j.matched) if (X.beforeEnter && !z.matched.includes(X)) if (Array.isArray(X.beforeEnter)) for (const p of X.beforeEnter) N.push(Et(p, j, z)); else N.push(Et(X.beforeEnter, j, z));
            return N.push(ne), Wt(N)
        }).then(() => (j.matched.forEach(X => X.enterCallbacks = {}), N = yo(de, "beforeRouteEnter", j, z), N.push(ne), Wt(N))).then(() => {
            N = [];
            for (const X of s.list()) N.push(Et(X, j, z));
            return N.push(ne), Wt(N)
        }).catch(X => Tt(X, 8) ? X : Promise.reject(X))
    }

    function q(j, z, N) {
        for (const $ of a.list()) $(j, z, N)
    }

    function U(j, z, N, $, le) {
        const de = O(j, z);
        if (de) return de;
        const ne = z === lt, X = Xt ? history.state : {};
        N && ($ || ne ? o.replace(j.fullPath, he({scroll: ne && X && X.scroll}, le)) : o.push(j.fullPath, le)), l.value = j, Pe(j, z, N, ne), Ee()
    }

    let C;

    function F() {
        C = o.listen((j, z, N) => {
            const $ = _(j), le = L($);
            if (le) {
                A(he(le, {replace: !0}), $).catch(Nn);
                return
            }
            c = $;
            const de = l.value;
            Xt && vp(Is(de.fullPath, N.delta), no()), B($, de).catch(ne => Tt(ne, 12) ? ne : Tt(ne, 2) ? (A(ne.to, $).then(X => {
                Tt(X, 20) && !N.delta && N.type === Kn.pop && o.go(-1, !1)
            }).catch(Nn), Promise.reject()) : (N.delta && o.go(-N.delta, !1), ee(ne, $, de))).then(ne => {
                ne = ne || U($, de, !1), ne && (N.delta ? o.go(-N.delta, !1) : N.type === Kn.pop && Tt(ne, 20) && o.go(-1, !1)), q($, de, ne)
            }).catch(Nn)
        })
    }

    let Q = On(), se = On(), W;

    function ee(j, z, N) {
        Ee(j);
        const $ = se.list();
        return $.length ? $.forEach(le => le(j, z, N)) : console.error(j), Promise.reject(j)
    }

    function te() {
        return W && l.value !== lt ? Promise.resolve() : new Promise((j, z) => {
            Q.add([j, z])
        })
    }

    function Ee(j) {
        W || (W = !0, F(), Q.list().forEach(([z, N]) => j ? N(j) : z()), Q.reset())
    }

    function Pe(j, z, N, $) {
        const {scrollBehavior: le} = e;
        if (!Xt || !le) return Promise.resolve();
        const de = !N && gp(Is(j.fullPath, 0)) || ($ || !N) && history.state && history.state.scroll || null;
        return Ei().then(() => le(j, z, de)).then(ne => ne && hp(ne)).catch(ne => ee(ne, j, z))
    }

    const Ae = j => o.go(j);
    let we;
    const Te = new Set;
    return {
        currentRoute: l,
        addRoute: h,
        removeRoute: m,
        hasRoute: v,
        getRoutes: g,
        resolve: _,
        options: e,
        push: S,
        replace: x,
        go: Ae,
        back: () => Ae(-1),
        forward: () => Ae(1),
        beforeEach: i.add,
        beforeResolve: s.add,
        afterEach: a.add,
        onError: se.add,
        isReady: te,
        install(j) {
            const z = this;
            j.component("RouterLink", em), j.component("RouterView", vc), j.config.globalProperties.$router = z, Object.defineProperty(j.config.globalProperties, "$route", {
                enumerable: !0,
                get: () => zt(l)
            }), Xt && !we && l.value === lt && (we = !0, S(o.location).catch(le => {
            }));
            const N = {};
            for (const le in lt) N[le] = be(() => l.value[le]);
            j.provide(to, z), j.provide(Ti, vn(N)), j.provide(Bo, l);
            const $ = j.unmount;
            Te.add(j), j.unmount = function () {
                Te.delete(j), Te.size < 1 && (c = lt, C && C(), l.value = lt, we = !1, W = !1), $()
            }
        }
    }
}

function Wt(e) {
    return e.reduce((t, n) => t.then(() => n()), Promise.resolve())
}

function im(e, t) {
    const n = [], r = [], o = [], i = Math.max(t.matched.length, e.matched.length);
    for (let s = 0; s < i; s++) {
        const a = t.matched[s];
        a && (e.matched.find(c => fn(c, a)) ? r.push(a) : n.push(a));
        const l = e.matched[s];
        l && (t.matched.find(c => fn(c, l)) || o.push(l))
    }
    return [n, r, o]
}

function ro() {
    return xe(to)
}

function Ri() {
    return xe(Ti)
}

const sm = Ve({
        setup(e, t) {
            const n = ke(!1);
            return tt(() => {
                n.value = !0
            }), () => {
                var r, o;
                return n.value ? (o = (r = t.slots).default) === null || o === void 0 ? void 0 : o.call(r) : null
            }
        }
    }), am = "modulepreload", Fs = {}, lm = "/", re = function (t, n) {
        return !n || n.length === 0 ? t() : Promise.all(n.map(r => {
            if (r = `${lm}${r}`, r in Fs) return;
            Fs[r] = !0;
            const o = r.endsWith(".css"), i = o ? '[rel="stylesheet"]' : "";
            if (document.querySelector(`link[href="${r}"]${i}`)) return;
            const s = document.createElement("link");
            if (s.rel = o ? "stylesheet" : am, o || (s.as = "script", s.crossOrigin = ""), s.href = r, document.head.appendChild(s), o) return new Promise((a, l) => {
                s.addEventListener("load", a), s.addEventListener("error", l)
            })
        })).then(() => t())
    }, gc = {
        "v-8daa1a0e": Oe(() => re(() => import("./index.html.504c7800.js"), ["assets/index.html.504c7800.js", "assets/plugin-vue_export-helper.21dcd24c.js"])),
        "v-638c1d18": Oe(() => re(() => import("./index.html.01ce1839.js"), ["assets/index.html.01ce1839.js", "assets/plugin-vue_export-helper.21dcd24c.js"])),
        "v-744497ce": Oe(() => re(() => import("./index.html.1fa0a497.js"), ["assets/index.html.1fa0a497.js", "assets/plugin-vue_export-helper.21dcd24c.js"])),
        "v-4b693314": Oe(() => re(() => import("./guild.html.e01f60f9.js"), ["assets/guild.html.e01f60f9.js", "assets/plugin-vue_export-helper.21dcd24c.js"])),
        "v-b4ede9ca": Oe(() => re(() => import("./index.html.9e68ebf6.js"), ["assets/index.html.9e68ebf6.js", "assets/plugin-vue_export-helper.21dcd24c.js"])),
        "v-7ca4f50e": Oe(() => re(() => import("./index.html.b44a688b.js"), ["assets/index.html.b44a688b.js", "assets/plugin-vue_export-helper.21dcd24c.js"])),
        "v-ac33ff58": Oe(() => re(() => import("./guild.html.b38806dd.js"), ["assets/guild.html.b38806dd.js", "assets/plugin-vue_export-helper.21dcd24c.js"])),
        "v-7446a652": Oe(() => re(() => import("./index.html.5e0532b9.js"), ["assets/index.html.5e0532b9.js", "assets/plugin-vue_export-helper.21dcd24c.js"])),
        "v-341a81f4": Oe(() => re(() => import("./slider.html.719d6e07.js"), ["assets/slider.html.719d6e07.js", "assets/plugin-vue_export-helper.21dcd24c.js"])),
        "v-fffb8e28": Oe(() => re(() => import("./index.html.5e702989.js"), ["assets/index.html.5e702989.js", "assets/plugin-vue_export-helper.21dcd24c.js"])),
        "v-9e2d8fd8": Oe(() => re(() => import("./achieve.html.57fbb250.js"), ["assets/achieve.html.57fbb250.js", "assets/plugin-vue_export-helper.21dcd24c.js"])),
        "v-85fa9b2a": Oe(() => re(() => import("./config.html.a630792c.js"), ["assets/config.html.a630792c.js", "assets/plugin-vue_export-helper.21dcd24c.js"])),
        "v-3988e24d": Oe(() => re(() => import("./docker.html.d0f4060f.js"), ["assets/docker.html.d0f4060f.js", "assets/plugin-vue_export-helper.21dcd24c.js"])),
        "v-08638a73": Oe(() => re(() => import("./eventfilter.html.a0affe40.js"), ["assets/eventfilter.html.a0affe40.js", "assets/plugin-vue_export-helper.21dcd24c.js"])),
        "v-55846971": Oe(() => re(() => import("./file.html.095717d8.js"), ["assets/file.html.095717d8.js", "assets/plugin-vue_export-helper.21dcd24c.js"])),
        "v-5c1af435": Oe(() => re(() => import("./quick_start.html.34b7c15e.js"), ["assets/quick_start.html.34b7c15e.js", "assets/plugin-vue_export-helper.21dcd24c.js"])),
        "v-fffb5256": Oe(() => re(() => import("./index.html.7ce7f80d.js"), ["assets/index.html.7ce7f80d.js", "assets/plugin-vue_export-helper.21dcd24c.js"])),
        "v-c4895de8": Oe(() => re(() => import("./data_struct.html.deae7989.js"), ["assets/data_struct.html.deae7989.js", "assets/plugin-vue_export-helper.21dcd24c.js"])),
        "v-22a2f9fd": Oe(() => re(() => import("./index.html.798eabdc.js"), ["assets/index.html.798eabdc.js", "assets/plugin-vue_export-helper.21dcd24c.js"])),
        "v-3706649a": Oe(() => re(() => import("./404.html.bee13de6.js"), ["assets/404.html.bee13de6.js", "assets/plugin-vue_export-helper.21dcd24c.js"]))
    }, cm = {
        "v-8daa1a0e": () => re(() => import("./index.html.635b21aa.js"), []).then(({data: e}) => e),
        "v-638c1d18": () => re(() => import("./index.html.a384fcd0.js"), []).then(({data: e}) => e),
        "v-744497ce": () => re(() => import("./index.html.cfb3444c.js"), []).then(({data: e}) => e),
        "v-4b693314": () => re(() => import("./guild.html.5e0fa9d8.js"), []).then(({data: e}) => e),
        "v-b4ede9ca": () => re(() => import("./index.html.5dd05570.js"), []).then(({data: e}) => e),
        "v-7ca4f50e": () => re(() => import("./index.html.e2015be6.js"), []).then(({data: e}) => e),
        "v-ac33ff58": () => re(() => import("./guild.html.0fcebac3.js"), []).then(({data: e}) => e),
        "v-7446a652": () => re(() => import("./index.html.4c2c4c3e.js"), []).then(({data: e}) => e),
        "v-341a81f4": () => re(() => import("./slider.html.043e001c.js"), []).then(({data: e}) => e),
        "v-fffb8e28": () => re(() => import("./index.html.89a4d10a.js"), []).then(({data: e}) => e),
        "v-9e2d8fd8": () => re(() => import("./achieve.html.e2f9cfcf.js"), []).then(({data: e}) => e),
        "v-85fa9b2a": () => re(() => import("./config.html.44292f78.js"), []).then(({data: e}) => e),
        "v-3988e24d": () => re(() => import("./docker.html.6e7fde92.js"), []).then(({data: e}) => e),
        "v-08638a73": () => re(() => import("./eventfilter.html.e0d8f80d.js"), []).then(({data: e}) => e),
        "v-55846971": () => re(() => import("./file.html.fe9e674f.js"), []).then(({data: e}) => e),
        "v-5c1af435": () => re(() => import("./quick_start.html.57a37349.js"), []).then(({data: e}) => e),
        "v-fffb5256": () => re(() => import("./index.html.806b33f8.js"), []).then(({data: e}) => e),
        "v-c4895de8": () => re(() => import("./data_struct.html.6293fa91.js"), []).then(({data: e}) => e),
        "v-22a2f9fd": () => re(() => import("./index.html.a2195323.js"), []).then(({data: e}) => e),
        "v-3706649a": () => re(() => import("./404.html.93146c89.js"), []).then(({data: e}) => e)
    }, _c = ke(cm), yc = gi({key: "", path: "", title: "", lang: "", frontmatter: {}, excerpt: "", headers: []}),
    ut = ke(yc), nr = () => ut;
zi.webpackHot && (__VUE_HMR_RUNTIME__.updatePageData = e => {
    _c.value[e.key] = () => Promise.resolve(e), e.key === ut.value.key && (ut.value = e)
});
const bc = Symbol(""), um = () => {
    const e = xe(bc);
    if (!e) throw new Error("usePageFrontmatter() is called without provider.");
    return e
}, Ec = Symbol(""), fm = () => {
    const e = xe(Ec);
    if (!e) throw new Error("usePageHead() is called without provider.");
    return e
}, dm = Symbol(""), Oc = Symbol(""), wc = () => {
    const e = xe(Oc);
    if (!e) throw new Error("usePageLang() is called without provider.");
    return e
}, Di = Symbol(""), Li = () => {
    const e = xe(Di);
    if (!e) throw new Error("useRouteLocale() is called without provider.");
    return e
}, pm = {
    base: "/",
    lang: "zh-CN",
    title: "go-cqhttp \u5E2E\u52A9\u4E2D\u5FC3",
    description: "Onebot \u7684 golang \u5B9E\u73B0\uFF0C\u8F7B\u91CF\u3001\u539F\u751F\u8DE8\u5E73\u53F0",
    head: [["link", {
        rel: "icon",
        href: "https://user-images.githubusercontent.com/25968335/120111974-8abef880-c139-11eb-99cd-fa928348b198.png"
    }]],
    locales: {}
}, Ot = ke(pm), Sc = () => Ot;
zi.webpackHot && (__VUE_HMR_RUNTIME__.updateSiteData = e => {
    Ot.value = e
});
const Pc = Symbol(""), j0 = () => {
    const e = xe(Pc);
    if (!e) throw new Error("useSiteLocaleData() is called without provider.");
    return e
}, mm = Symbol(""), Ni = e => {
    let t;
    e.pageKey ? t = e.pageKey : t = nr().value.key;
    const n = gc[t];
    return n ? pe(n) : pe("div", "404 Not Found")
};
Ni.displayName = "Content";
Ni.props = {pageKey: {type: String, required: !1}};
const hm = {
        "404": Oe(() => re(() => import("./404.ab500e7b.js"), [])),
        Layout: Oe(() => re(() => import("./Layout.caf74c47.js"), ["assets/Layout.caf74c47.js", "assets/plugin-vue_export-helper.21dcd24c.js"]))
    },
    vm = ([e, t, n]) => e === "meta" && t.name ? `${e}.${t.name}` : ["title", "base"].includes(e) ? e : e === "template" && t.id ? `${e}.${t.id}` : JSON.stringify([e, t, n]),
    gm = e => {
        const t = new Set, n = [];
        return e.forEach(r => {
            const o = vm(r);
            t.has(o) || (t.add(o), n.push(r))
        }), n
    }, _m = e => /^(https?:)?\/\//.test(e), T0 = e => /^mailto:/.test(e), k0 = e => /^tel:/.test(e),
    Cc = e => Object.prototype.toString.call(e) === "[object Object]", ym = e => e.replace(/\/$/, ""),
    bm = e => e.replace(/^\//, ""), Ac = (e, t) => {
        const n = Object.keys(e).sort((r, o) => {
            const i = o.split("/").length - r.split("/").length;
            return i !== 0 ? i : o.length - r.length
        });
        for (const r of n) if (t.startsWith(r)) return r;
        return "/"
    }, Em = (e, t = "/") => e.replace(/^(https?:)?\/\/[^/]*/, "").replace(new RegExp(`^${t}`), "/"), qs = Ve({
        name: "Vuepress", setup() {
            const e = nr(), t = be(() => {
                let n;
                if (e.value.path) {
                    const r = e.value.frontmatter.layout;
                    ge(r) ? n = r : n = "Layout"
                } else n = "404";
                return hm[n] || fd(n, !1)
            });
            return () => pe(t.value)
        }
    }), _n = e => e, oo = e => e, Ic = e => _m(e) ? e : `${Sc().value.base}${bm(e)}`, Lt = vn({
        resolvePageData: async e => {
            const t = _c.value[e], n = await (t == null ? void 0 : t());
            return n != null ? n : yc
        },
        resolvePageFrontmatter: e => e.frontmatter,
        resolvePageHead: (e, t, n) => {
            const r = ge(t.description) ? t.description : n.description,
                o = [...Z(t.head) ? t.head : [], ...n.head, ["title", {}, e], ["meta", {
                    name: "description",
                    content: r
                }]];
            return gm(o)
        },
        resolvePageHeadTitle: (e, t) => `${e.title ? `${e.title} | ` : ""}${t.title}`,
        resolvePageLang: e => e.lang || "en",
        resolveRouteLocale: (e, t) => Ac(e, t),
        resolveSiteLocaleData: (e, t) => Le(Le({}, e), e.locales[t])
    });
const Om = pe("svg", {
    class: "external-link-icon",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    x: "0px",
    y: "0px",
    viewBox: "0 0 100 100",
    width: "15",
    height: "15"
}, [pe("path", {
    fill: "currentColor",
    d: "M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
}), pe("polygon", {
    fill: "currentColor",
    points: "45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
})]), wm = Ve({
    name: "ExternalLinkIcon", props: {locales: {type: Object, required: !1, default: () => ({})}}, setup(e) {
        const t = Li(), n = be(() => {
            var r;
            return (r = e.locales[t.value]) !== null && r !== void 0 ? r : {openInNewWindow: "open in new window"}
        });
        return () => pe("span", [Om, pe("span", {class: "external-link-icon-sr-only"}, n.value.openInNewWindow)])
    }
}), Sm = {"/": {openInNewWindow: "open in new window"}};
var Pm = _n(({app: e}) => {
    e.component("ExternalLinkIcon", pe(wm, {locales: Sm}))
});/*!medium-zoom 1.0.6 | MIT License | https://github.com/francoischalifour/medium-zoom*/
var Nt = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
    }
    return e
}, ur = function (t) {
    return t.tagName === "IMG"
}, Cm = function (t) {
    return NodeList.prototype.isPrototypeOf(t)
}, yr = function (t) {
    return t && t.nodeType === 1
}, zs = function (t) {
    var n = t.currentSrc || t.src;
    return n.substr(-4).toLowerCase() === ".svg"
}, Bs = function (t) {
    try {
        return Array.isArray(t) ? t.filter(ur) : Cm(t) ? [].slice.call(t).filter(ur) : yr(t) ? [t].filter(ur) : typeof t == "string" ? [].slice.call(document.querySelectorAll(t)).filter(ur) : []
    } catch {
        throw new TypeError(`The provided selector is invalid.
Expects a CSS selector, a Node element, a NodeList or an array.
See: https://github.com/francoischalifour/medium-zoom`)
    }
}, Am = function (t) {
    var n = document.createElement("div");
    return n.classList.add("medium-zoom-overlay"), n.style.background = t, n
}, Im = function (t) {
    var n = t.getBoundingClientRect(), r = n.top, o = n.left, i = n.width, s = n.height, a = t.cloneNode(),
        l = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        c = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    return a.removeAttribute("id"), a.style.position = "absolute", a.style.top = r + l + "px", a.style.left = o + c + "px", a.style.width = i + "px", a.style.height = s + "px", a.style.transform = "", a
}, Jt = function (t, n) {
    var r = Nt({bubbles: !1, cancelable: !1, detail: void 0}, n);
    if (typeof window.CustomEvent == "function") return new CustomEvent(t, r);
    var o = document.createEvent("CustomEvent");
    return o.initCustomEvent(t, r.bubbles, r.cancelable, r.detail), o
}, xm = function e(t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = window.Promise || function (C) {
        function F() {
        }

        C(F, F)
    }, o = function (C) {
        var F = C.target;
        if (F === B) {
            m();
            return
        }
        O.indexOf(F) !== -1 && g({target: F})
    }, i = function () {
        if (!(x || !P.original)) {
            var C = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            Math.abs(L - C) > A.scrollOffset && setTimeout(m, 150)
        }
    }, s = function (C) {
        var F = C.key || C.keyCode;
        (F === "Escape" || F === "Esc" || F === 27) && m()
    }, a = function () {
        var C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, F = C;
        if (C.background && (B.style.background = C.background), C.container && C.container instanceof Object && (F.container = Nt({}, A.container, C.container)), C.template) {
            var Q = yr(C.template) ? C.template : document.querySelector(C.template);
            F.template = Q
        }
        return A = Nt({}, A, F), O.forEach(function (se) {
            se.dispatchEvent(Jt("medium-zoom:update", {detail: {zoom: q}}))
        }), q
    }, l = function () {
        var C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        return e(Nt({}, A, C))
    }, c = function () {
        for (var C = arguments.length, F = Array(C), Q = 0; Q < C; Q++) F[Q] = arguments[Q];
        var se = F.reduce(function (W, ee) {
            return [].concat(W, Bs(ee))
        }, []);
        return se.filter(function (W) {
            return O.indexOf(W) === -1
        }).forEach(function (W) {
            O.push(W), W.classList.add("medium-zoom-image")
        }), S.forEach(function (W) {
            var ee = W.type, te = W.listener, Ee = W.options;
            se.forEach(function (Pe) {
                Pe.addEventListener(ee, te, Ee)
            })
        }), q
    }, u = function () {
        for (var C = arguments.length, F = Array(C), Q = 0; Q < C; Q++) F[Q] = arguments[Q];
        P.zoomed && m();
        var se = F.length > 0 ? F.reduce(function (W, ee) {
            return [].concat(W, Bs(ee))
        }, []) : O;
        return se.forEach(function (W) {
            W.classList.remove("medium-zoom-image"), W.dispatchEvent(Jt("medium-zoom:detach", {detail: {zoom: q}}))
        }), O = O.filter(function (W) {
            return se.indexOf(W) === -1
        }), q
    }, d = function (C, F) {
        var Q = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        return O.forEach(function (se) {
            se.addEventListener("medium-zoom:" + C, F, Q)
        }), S.push({type: "medium-zoom:" + C, listener: F, options: Q}), q
    }, f = function (C, F) {
        var Q = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        return O.forEach(function (se) {
            se.removeEventListener("medium-zoom:" + C, F, Q)
        }), S = S.filter(function (se) {
            return !(se.type === "medium-zoom:" + C && se.listener.toString() === F.toString())
        }), q
    }, h = function () {
        var C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, F = C.target, Q = function () {
            var W = {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }, ee = void 0, te = void 0;
            if (A.container) if (A.container instanceof Object) W = Nt({}, W, A.container), ee = W.width - W.left - W.right - A.margin * 2, te = W.height - W.top - W.bottom - A.margin * 2; else {
                var Ee = yr(A.container) ? A.container : document.querySelector(A.container),
                    Pe = Ee.getBoundingClientRect(), Ae = Pe.width, we = Pe.height, Te = Pe.left, qe = Pe.top;
                W = Nt({}, W, {width: Ae, height: we, left: Te, top: qe})
            }
            ee = ee || W.width - A.margin * 2, te = te || W.height - A.margin * 2;
            var j = P.zoomedHd || P.original, z = zs(j) ? ee : j.naturalWidth || ee,
                N = zs(j) ? te : j.naturalHeight || te, $ = j.getBoundingClientRect(), le = $.top, de = $.left,
                ne = $.width, X = $.height, p = Math.min(z, ee) / ne, y = Math.min(N, te) / X, w = Math.min(p, y),
                I = (-de + (ee - ne) / 2 + A.margin + W.left) / w, T = (-le + (te - X) / 2 + A.margin + W.top) / w,
                k = "scale(" + w + ") translate3d(" + I + "px, " + T + "px, 0)";
            P.zoomed.style.transform = k, P.zoomedHd && (P.zoomedHd.style.transform = k)
        };
        return new r(function (se) {
            if (F && O.indexOf(F) === -1) {
                se(q);
                return
            }
            var W = function Ae() {
                x = !1, P.zoomed.removeEventListener("transitionend", Ae), P.original.dispatchEvent(Jt("medium-zoom:opened", {detail: {zoom: q}})), se(q)
            };
            if (P.zoomed) {
                se(q);
                return
            }
            if (F) P.original = F; else if (O.length > 0) {
                var ee = O;
                P.original = ee[0]
            } else {
                se(q);
                return
            }
            if (P.original.dispatchEvent(Jt("medium-zoom:open", {detail: {zoom: q}})), L = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, x = !0, P.zoomed = Im(P.original), document.body.appendChild(B), A.template) {
                var te = yr(A.template) ? A.template : document.querySelector(A.template);
                P.template = document.createElement("div"), P.template.appendChild(te.content.cloneNode(!0)), document.body.appendChild(P.template)
            }
            if (document.body.appendChild(P.zoomed), window.requestAnimationFrame(function () {
                document.body.classList.add("medium-zoom--opened")
            }), P.original.classList.add("medium-zoom-image--hidden"), P.zoomed.classList.add("medium-zoom-image--opened"), P.zoomed.addEventListener("click", m), P.zoomed.addEventListener("transitionend", W), P.original.getAttribute("data-zoom-src")) {
                P.zoomedHd = P.zoomed.cloneNode(), P.zoomedHd.removeAttribute("srcset"), P.zoomedHd.removeAttribute("sizes"), P.zoomedHd.src = P.zoomed.getAttribute("data-zoom-src"), P.zoomedHd.onerror = function () {
                    clearInterval(Ee), console.warn("Unable to reach the zoom image target " + P.zoomedHd.src), P.zoomedHd = null, Q()
                };
                var Ee = setInterval(function () {
                    P.zoomedHd.complete && (clearInterval(Ee), P.zoomedHd.classList.add("medium-zoom-image--opened"), P.zoomedHd.addEventListener("click", m), document.body.appendChild(P.zoomedHd), Q())
                }, 10)
            } else if (P.original.hasAttribute("srcset")) {
                P.zoomedHd = P.zoomed.cloneNode(), P.zoomedHd.removeAttribute("sizes"), P.zoomedHd.removeAttribute("loading");
                var Pe = P.zoomedHd.addEventListener("load", function () {
                    P.zoomedHd.removeEventListener("load", Pe), P.zoomedHd.classList.add("medium-zoom-image--opened"), P.zoomedHd.addEventListener("click", m), document.body.appendChild(P.zoomedHd), Q()
                })
            } else Q()
        })
    }, m = function () {
        return new r(function (C) {
            if (x || !P.original) {
                C(q);
                return
            }
            var F = function Q() {
                P.original.classList.remove("medium-zoom-image--hidden"), document.body.removeChild(P.zoomed), P.zoomedHd && document.body.removeChild(P.zoomedHd), document.body.removeChild(B), P.zoomed.classList.remove("medium-zoom-image--opened"), P.template && document.body.removeChild(P.template), x = !1, P.zoomed.removeEventListener("transitionend", Q), P.original.dispatchEvent(Jt("medium-zoom:closed", {detail: {zoom: q}})), P.original = null, P.zoomed = null, P.zoomedHd = null, P.template = null, C(q)
            };
            x = !0, document.body.classList.remove("medium-zoom--opened"), P.zoomed.style.transform = "", P.zoomedHd && (P.zoomedHd.style.transform = ""), P.template && (P.template.style.transition = "opacity 150ms", P.template.style.opacity = 0), P.original.dispatchEvent(Jt("medium-zoom:close", {detail: {zoom: q}})), P.zoomed.addEventListener("transitionend", F)
        })
    }, g = function () {
        var C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, F = C.target;
        return P.original ? m() : h({target: F})
    }, v = function () {
        return A
    }, _ = function () {
        return O
    }, E = function () {
        return P.original
    }, O = [], S = [], x = !1, L = 0, A = n, P = {original: null, zoomed: null, zoomedHd: null, template: null};
    Object.prototype.toString.call(t) === "[object Object]" ? A = t : (t || typeof t == "string") && c(t), A = Nt({
        margin: 0,
        background: "#fff",
        scrollOffset: 40,
        container: null,
        template: null
    }, A);
    var B = Am(A.background);
    document.addEventListener("click", o), document.addEventListener("keyup", s), document.addEventListener("scroll", i), window.addEventListener("resize", m);
    var q = {
        open: h,
        close: m,
        toggle: g,
        update: a,
        clone: l,
        attach: c,
        detach: u,
        on: d,
        off: f,
        getOptions: v,
        getImages: _,
        getZoomedImage: E
    };
    return q
};

function jm(e, t) {
    t === void 0 && (t = {});
    var n = t.insertAt;
    if (!(!e || typeof document == "undefined")) {
        var r = document.head || document.getElementsByTagName("head")[0], o = document.createElement("style");
        o.type = "text/css", n === "top" && r.firstChild ? r.insertBefore(o, r.firstChild) : r.appendChild(o), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(document.createTextNode(e))
    }
}

var Tm = ".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}";
jm(Tm);
var km = xm;
const Rm = Symbol("mediumZoom");
const Dm = ".theme-default-content > img, .theme-default-content :not(a) > img", Lm = {}, Nm = 300;
var Mm = _n(({app: e, router: t}) => {
    const n = km(Lm);
    n.refresh = (r = Dm) => {
        n.detach(), n.attach(r)
    }, e.provide(Rm, n), t.afterEach(() => {
        setTimeout(() => n.refresh(), Nm)
    })
});
const Hm = {
    repo: "Mrs4s/go-cqhttp",
    docsRepo: "ishkong/go-cqhttp-docs",
    docsBranch: "main",
    docsDir: "docs",
    editLinkText: "\u7F16\u8F91\u6B64\u9875",
    lastUpdated: !0,
    lastUpdatedText: "\u4E0A\u4E00\u6B21\u7F16\u8F91",
    contributors: !0,
    tip: "\u63D0\u793A",
    warning: "\u6CE8\u610F",
    danger: "\u8B66\u544A",
    backToHome: "\u8FD4\u56DE\u9996\u9875",
    navbar: [{
        text: "Guide",
        children: ["/guide/", "/guide/quick_start.md", "/guide/config.md", "/guide/eventfilter.md", "/guide/file.md", "/guide/achieve.md", "/guide/docker.md"]
    }, {text: "API", children: ["/api/", "/api/guild.md"]}, {
        text: "Event",
        children: ["/event/", "/event/guild.md"]
    }, {text: "CQ Code", link: "/cqcode/"}, {text: "Guild", link: "/guild/"}, {
        text: "Reference",
        children: ["/reference/", "/reference/data_struct.md"]
    }, {text: "Advanced", link: "/advanced/"}, {text: "FAQ", link: "/faq/"}],
    sidebar: "auto",
    locales: {"/": {selectLanguageName: "English"}},
    logo: null,
    darkMode: !0,
    selectLanguageText: "Languages",
    selectLanguageAriaLabel: "Select language",
    sidebarDepth: 2,
    editLink: !0,
    contributorsText: "Contributors",
    notFound: ["There's nothing here.", "How did we get here?", "That's a Four-Oh-Four.", "Looks like we've got some broken links."],
    openInNewWindow: "open in new window",
    toggleDarkMode: "toggle dark mode",
    toggleSidebar: "toggle sidebar"
}, xc = ke(Hm), Fm = () => xc;
zi.webpackHot && (__VUE_HMR_RUNTIME__.updateThemeData = e => {
    xc.value = e
});
const jc = Symbol(""), qm = () => {
    const e = xe(jc);
    if (!e) throw new Error("useThemeLocaleData() is called without provider.");
    return e
}, zm = (e, t) => {
    var n;
    return Le(Le({}, e), (n = e.locales) === null || n === void 0 ? void 0 : n[t])
};
var Bm = _n(({app: e}) => {
    const t = Fm(), n = e._context.provides[Di], r = be(() => zm(t.value, n.value));
    e.provide(jc, r), Object.defineProperties(e.config.globalProperties, {
        $theme: {
            get() {
                return t.value
            }
        }, $themeLocale: {
            get() {
                return r.value
            }
        }
    })
});
const $m = Ve({
    props: {
        type: {type: String, required: !1, default: "tip"},
        text: {type: String, required: !1, default: ""},
        vertical: {type: String, required: !1, default: void 0}
    }, setup(e) {
        return (t, n) => (Zr(), Ql("span", {
            class: Zn(["badge", e.type]),
            style: Kr({verticalAlign: e.vertical})
        }, [Xl(t.$slots, "default", {}, () => [Ii(ku(e.text), 1)])], 6))
    }
});
var Um = Ve({
    name: "CodeGroup", setup(e, {slots: t}) {
        const n = ke(-1), r = ke([]), o = (a = n.value) => {
            a < r.value.length - 1 ? n.value = a + 1 : n.value = 0, r.value[n.value].focus()
        }, i = (a = n.value) => {
            a > 0 ? n.value = a - 1 : n.value = r.value.length - 1, r.value[n.value].focus()
        }, s = (a, l) => {
            a.key === " " || a.key === "Enter" ? (a.preventDefault(), n.value = l) : a.key === "ArrowRight" ? (a.preventDefault(), o(l)) : a.key === "ArrowLeft" && (a.preventDefault(), i(l))
        };
        return () => {
            var a;
            const l = (((a = t.default) === null || a === void 0 ? void 0 : a.call(t)) || []).filter(c => c.type.name === "CodeGroupItem").map(c => (c.props === null && (c.props = {}), c));
            return l.length === 0 ? null : (n.value < 0 || n.value > l.length - 1 ? (n.value = l.findIndex(c => c.props.active === "" || c.props.active === !0), n.value === -1 && (n.value = 0)) : l.forEach((c, u) => {
                c.props.active = u === n.value
            }), pe("div", {class: "code-group"}, [pe("div", {class: "code-group__nav"}, pe("ul", {class: "code-group__ul"}, l.map((c, u) => {
                const d = u === n.value;
                return pe("li", {class: "code-group__li"}, pe("button", {
                    ref: f => {
                        f && (r.value[u] = f)
                    },
                    class: {"code-group__nav-tab": !0, "code-group__nav-tab-active": d},
                    ariaPressed: d,
                    ariaExpanded: d,
                    onClick: () => n.value = u,
                    onKeydown: f => s(f, u)
                }, c.props.title))
            }))), l]))
        }
    }
});
const Vm = ["aria-selected"], Km = Ve({name: "CodeGroupItem"}), Wm = Ve(It(Le({}, Km), {
    props: {
        title: {type: String, required: !0},
        active: {type: Boolean, required: !1, default: !1}
    }, setup(e) {
        return (t, n) => (Zr(), Ql("div", {
            class: Zn(["code-group-item", {"code-group-item__active": e.active}]),
            "aria-selected": e.active
        }, [Xl(t.$slots, "default")], 10, Vm))
    }
}));

function Tc(e) {
    return Bu() ? ($u(e), !0) : !1
}

const rr = typeof window != "undefined", Jm = e => typeof e == "string", bo = () => {
};

function Qm(e, t) {
    function n(...r) {
        e(() => t.apply(this, r), {fn: t, thisArg: this, args: r})
    }

    return n
}

const Ym = e => e();
var $s = Object.getOwnPropertySymbols, Gm = Object.prototype.hasOwnProperty, Zm = Object.prototype.propertyIsEnumerable,
    Xm = (e, t) => {
        var n = {};
        for (var r in e) Gm.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
        if (e != null && $s) for (var r of $s(e)) t.indexOf(r) < 0 && Zm.call(e, r) && (n[r] = e[r]);
        return n
    };

function eh(e, t, n = {}) {
    const r = n, {eventFilter: o = Ym} = r, i = Xm(r, ["eventFilter"]);
    return et(e, Qm(o, t), i)
}

function th(e, t = !0) {
    tc() ? tt(e) : t ? e() : Ei(e)
}

const Mr = rr ? window : void 0;
rr && window.document;
rr && window.navigator;
rr && window.location;

function nh(...e) {
    let t, n, r, o;
    if (Jm(e[0]) ? ([n, r, o] = e, t = Mr) : [t, n, r, o] = e, !t) return bo;
    let i = bo;
    const s = et(() => zt(t), l => {
        i(), !!l && (l.addEventListener(n, r, o), i = () => {
            l.removeEventListener(n, r, o), i = bo
        })
    }, {immediate: !0, flush: "post"}), a = () => {
        s(), i()
    };
    return Tc(a), a
}

function rh(e, t = {}) {
    const {window: n = Mr} = t;
    let r;
    const o = ke(!1), i = () => {
        !n || (r || (r = n.matchMedia(e)), o.value = r.matches)
    };
    return th(() => {
        i(), !!r && ("addEventListener" in r ? r.addEventListener("change", i) : r.addListener(i), Tc(() => {
            "removeEventListener" in i ? r.removeEventListener("change", i) : r.removeListener(i)
        }))
    }), o
}

const Vo = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {},
    Ko = "__vueuse_ssr_handlers__";
Vo[Ko] = Vo[Ko] || {};
const oh = Vo[Ko];

function ih(e, t) {
    return oh[e] || t
}

function sh(e) {
    return e == null ? "any" : e instanceof Set ? "set" : e instanceof Map ? "map" : typeof e == "boolean" ? "boolean" : typeof e == "string" ? "string" : typeof e == "object" || Array.isArray(e) ? "object" : Number.isNaN(e) ? "any" : "number"
}

const ah = {
    boolean: {read: e => e === "true", write: e => String(e)},
    object: {read: e => JSON.parse(e), write: e => JSON.stringify(e)},
    number: {read: e => Number.parseFloat(e), write: e => String(e)},
    any: {read: e => e, write: e => String(e)},
    string: {read: e => e, write: e => String(e)},
    map: {read: e => new Map(JSON.parse(e)), write: e => JSON.stringify(Array.from(e.entries()))},
    set: {read: e => new Set(JSON.parse(e)), write: e => JSON.stringify(Array.from(e.entries()))}
};

function lh(e, t, n, r = {}) {
    var o;
    const {
        flush: i = "pre",
        deep: s = !0,
        listenToStorageChanges: a = !0,
        writeDefaults: l = !0,
        shallow: c,
        window: u = Mr,
        eventFilter: d,
        onError: f = E => {
            console.error(E)
        }
    } = r, h = zt(t), m = sh(h), g = (c ? Ol : ke)(t), v = (o = r.serializer) != null ? o : ah[m];
    if (!n) try {
        n = ih("getDefaultStorage", () => {
            var E;
            return (E = Mr) == null ? void 0 : E.localStorage
        })()
    } catch (E) {
        f(E)
    }

    function _(E) {
        if (!(!n || E && E.key !== e)) try {
            const O = E ? E.newValue : n.getItem(e);
            O == null ? (g.value = h, l && h !== null && n.setItem(e, v.write(h))) : typeof O != "string" ? g.value = O : g.value = v.read(O)
        } catch (O) {
            f(O)
        }
    }

    return _(), u && a && nh(u, "storage", E => setTimeout(() => _(E), 0)), n && eh(g, () => {
        try {
            g.value == null ? n.removeItem(e) : n.setItem(e, v.write(g.value))
        } catch (E) {
            f(E)
        }
    }, {flush: i, deep: s, eventFilter: d}), g
}

function ch(e) {
    return rh("(prefers-color-scheme: dark)", e)
}

var Us, Vs;
rr && (window == null ? void 0 : window.navigator) && ((Us = window == null ? void 0 : window.navigator) == null ? void 0 : Us.platform) && /iP(ad|hone|od)/.test((Vs = window == null ? void 0 : window.navigator) == null ? void 0 : Vs.platform);
var uh = Object.defineProperty, Ks = Object.getOwnPropertySymbols, fh = Object.prototype.hasOwnProperty,
    dh = Object.prototype.propertyIsEnumerable,
    Ws = (e, t, n) => t in e ? uh(e, t, {enumerable: !0, configurable: !0, writable: !0, value: n}) : e[t] = n,
    ph = (e, t) => {
        for (var n in t || (t = {})) fh.call(t, n) && Ws(e, n, t[n]);
        if (Ks) for (var n of Ks(t)) dh.call(t, n) && Ws(e, n, t[n]);
        return e
    };
const mh = {top: 0, left: 0, bottom: 0, right: 0, height: 0, width: 0};
ph({text: ""}, mh);
const kc = Symbol(""), R0 = () => {
    const e = xe(kc);
    if (!e) throw new Error("useDarkMode() is called without provider.");
    return e
}, hh = () => {
    const e = Nc(), t = ch(), n = lh("vuepress-color-scheme", "auto"), r = be({
        get() {
            return e.value.darkMode ? n.value === "auto" ? t.value : n.value === "dark" : !1
        }, set(o) {
            o === t.value ? n.value = "auto" : n.value = o ? "dark" : "light"
        }
    });
    Pt(kc, r), vh(r)
}, vh = e => {
    const t = (n = e.value) => {
        const r = window == null ? void 0 : window.document.querySelector("html");
        r == null || r.classList.toggle("dark", n)
    };
    tt(() => {
        et(e, t, {immediate: !0})
    }), Ci(() => t())
}, Rc = (...e) => {
    const n = ro().resolve(...e), r = n.matched[n.matched.length - 1];
    if (!(r == null ? void 0 : r.redirect)) return n;
    const {redirect: o} = r, i = oe(o) ? o(n) : o, s = ge(i) ? {path: i} : i;
    return Rc(Le({hash: n.hash, query: n.query, params: n.params}, s))
}, gh = e => {
    const t = Rc(e);
    return {text: t.meta.title || e, link: t.name === "404" ? e : t.fullPath}
};
let Eo = null, wn = null;
const _h = {
        wait: () => Eo, pending: () => {
            Eo = new Promise(e => wn = e)
        }, resolve: () => {
            wn == null || wn(), Eo = null, wn = null
        }
    }, yh = () => _h, Dc = Symbol("sidebarItems"), D0 = () => {
        const e = xe(Dc);
        if (!e) throw new Error("useSidebarItems() is called without provider.");
        return e
    }, bh = () => {
        const e = Nc(), t = um(), n = be(() => Eh(t.value, e.value));
        Pt(Dc, n)
    }, Eh = (e, t) => {
        var n, r, o, i;
        const s = (r = (n = e.sidebar) !== null && n !== void 0 ? n : t.sidebar) !== null && r !== void 0 ? r : "auto",
            a = (i = (o = e.sidebarDepth) !== null && o !== void 0 ? o : t.sidebarDepth) !== null && i !== void 0 ? i : 2;
        return e.home || s === !1 ? [] : s === "auto" ? wh(a) : Z(s) ? Lc(s, a) : Cc(s) ? Sh(s, a) : []
    }, Oh = (e, t) => ({text: e.title, link: `#${e.slug}`, children: Mi(e.children, t)}),
    Mi = (e, t) => t > 0 ? e.map(n => Oh(n, t - 1)) : [], wh = e => {
        const t = nr();
        return [{text: t.value.title, children: Mi(t.value.headers, e)}]
    }, Lc = (e, t) => {
        const n = Ri(), r = nr(), o = i => {
            var s;
            let a;
            if (ge(i) ? a = gh(i) : a = i, a.children) return It(Le({}, a), {children: a.children.map(l => o(l))});
            if (a.link === n.path) {
                const l = ((s = r.value.headers[0]) === null || s === void 0 ? void 0 : s.level) === 1 ? r.value.headers[0].children : r.value.headers;
                return It(Le({}, a), {children: Mi(l, t)})
            }
            return a
        };
        return e.map(i => o(i))
    }, Sh = (e, t) => {
        var n;
        const r = Ri(), o = Ac(e, r.path), i = (n = e[o]) !== null && n !== void 0 ? n : [];
        return Lc(i, t)
    }, Nc = () => qm();
var Ph = _n(({app: e, router: t}) => {
    e.component("Badge", $m), e.component("CodeGroup", Um), e.component("CodeGroupItem", Wm), e.component("NavbarSearch", () => {
        const r = e.component("Docsearch") || e.component("SearchBox");
        return r ? pe(r) : null
    });
    const n = t.options.scrollBehavior;
    t.options.scrollBehavior = async (...r) => (await yh().wait(), n(...r))
});
const Ch = e => {
    if (window.dataLayer && window.gtag) return;
    const t = document.createElement("script");
    t.src = `https://www.googletagmanager.com/gtag/js?id=${e}`, t.async = !0, document.head.appendChild(t), window.dataLayer = window.dataLayer || [], window.gtag = function () {
        dataLayer.push(arguments)
    }, gtag("js", new Date), gtag("config", e)
}, Ah = "G-CZJ8X185MG";
var Ih = _n(() => {
    Ch(Ah)
});/*!@docsearch/js 3.0.0-alpha.42 | MIT License | © Algolia, Inc. and contributors | https://docsearch.algolia.com*/
function Wn(e) {
    return Wn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
        return typeof t
    } : function (t) {
        return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, Wn(e)
}

function xh(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

function Wo() {
    return Wo = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }, Wo.apply(this, arguments)
}

function Js(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (o) {
            return Object.getOwnPropertyDescriptor(e, o).enumerable
        })), n.push.apply(n, r)
    }
    return n
}

function ue(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t] != null ? arguments[t] : {};
        t % 2 ? Js(Object(n), !0).forEach(function (r) {
            xh(e, r, n[r])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Js(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
        })
    }
    return e
}

function jh(e, t) {
    if (e == null) return {};
    var n, r, o = function (s, a) {
        if (s == null) return {};
        var l, c, u = {}, d = Object.keys(s);
        for (c = 0; c < d.length; c++) l = d[c], a.indexOf(l) >= 0 || (u[l] = s[l]);
        return u
    }(e, t);
    if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);
        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
    }
    return o
}

function Hr(e, t) {
    return function (n) {
        if (Array.isArray(n)) return n
    }(e) || function (n, r) {
        if (!(typeof Symbol == "undefined" || !(Symbol.iterator in Object(n)))) {
            var o = [], i = !0, s = !1, a = void 0;
            try {
                for (var l, c = n[Symbol.iterator](); !(i = (l = c.next()).done) && (o.push(l.value), !r || o.length !== r); i = !0) ;
            } catch (u) {
                s = !0, a = u
            } finally {
                try {
                    i || c.return == null || c.return()
                } finally {
                    if (s) throw a
                }
            }
            return o
        }
    }(e, t) || Mc(e, t) || function () {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
    }()
}

function Fr(e) {
    return function (t) {
        if (Array.isArray(t)) return Jo(t)
    }(e) || function (t) {
        if (typeof Symbol != "undefined" && Symbol.iterator in Object(t)) return Array.from(t)
    }(e) || Mc(e) || function () {
        throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
    }()
}

function Mc(e, t) {
    if (e) {
        if (typeof e == "string") return Jo(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Jo(e, t) : void 0
    }
}

function Jo(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r
}

var Y, Hn, Hc, Qs, Fc, qr = {}, Hi = [], Th = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;

function ft(e, t) {
    for (var n in t) e[n] = t[n];
    return e
}

function qc(e) {
    var t = e.parentNode;
    t && t.removeChild(e)
}

function it(e, t, n) {
    var r, o, i, s = arguments, a = {};
    for (i in t) i == "key" ? r = t[i] : i == "ref" ? o = t[i] : a[i] = t[i];
    if (arguments.length > 3) for (n = [n], i = 3; i < arguments.length; i++) n.push(s[i]);
    if (n != null && (a.children = n), typeof e == "function" && e.defaultProps != null) for (i in e.defaultProps) a[i] === void 0 && (a[i] = e.defaultProps[i]);
    return Fn(e, a, r, o, null)
}

function Fn(e, t, n, r, o) {
    var i = {
        type: e,
        props: t,
        key: n,
        ref: r,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: o == null ? ++Y.__v : o
    };
    return Y.vnode != null && Y.vnode(i), i
}

function At(e) {
    return e.children
}

function st(e, t) {
    this.props = e, this.context = t
}

function Jn(e, t) {
    if (t == null) return e.__ ? Jn(e.__, e.__.__k.indexOf(e) + 1) : null;
    for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
    return typeof e.type == "function" ? Jn(e) : null
}

function zc(e) {
    var t, n;
    if ((e = e.__) != null && e.__c != null) {
        for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) {
            e.__e = e.__c.base = n.__e;
            break
        }
        return zc(e)
    }
}

function Qo(e) {
    (!e.__d && (e.__d = !0) && Hn.push(e) && !zr.__r++ || Qs !== Y.debounceRendering) && ((Qs = Y.debounceRendering) || Hc)(zr)
}

function zr() {
    for (var e; zr.__r = Hn.length;) e = Hn.sort(function (t, n) {
        return t.__v.__b - n.__v.__b
    }), Hn = [], e.some(function (t) {
        var n, r, o, i, s, a;
        t.__d && (s = (i = (n = t).__v).__e, (a = n.__P) && (r = [], (o = ft({}, i)).__v = i.__v + 1, Fi(a, i, o, n.__n, a.ownerSVGElement !== void 0, i.__h != null ? [s] : null, r, s == null ? Jn(i) : s, i.__h), Vc(r, i), i.__e != s && zc(i)))
    })
}

function Bc(e, t, n, r, o, i, s, a, l, c) {
    var u, d, f, h, m, g, v, _ = r && r.__k || Hi, E = _.length;
    for (n.__k = [], u = 0; u < t.length; u++) if ((h = n.__k[u] = (h = t[u]) == null || typeof h == "boolean" ? null : typeof h == "string" || typeof h == "number" ? Fn(null, h, null, null, h) : Array.isArray(h) ? Fn(At, {children: h}, null, null, null) : h.__b > 0 ? Fn(h.type, h.props, h.key, null, h.__v) : h) != null) {
        if (h.__ = n, h.__b = n.__b + 1, (f = _[u]) === null || f && h.key == f.key && h.type === f.type) _[u] = void 0; else for (d = 0; d < E; d++) {
            if ((f = _[d]) && h.key == f.key && h.type === f.type) {
                _[d] = void 0;
                break
            }
            f = null
        }
        Fi(e, h, f = f || qr, o, i, s, a, l, c), m = h.__e, (d = h.ref) && f.ref != d && (v || (v = []), f.ref && v.push(f.ref, null, h), v.push(d, h.__c || m, h)), m != null ? (g == null && (g = m), typeof h.type == "function" && h.__k != null && h.__k === f.__k ? h.__d = l = $c(h, l, e) : l = Uc(e, h, f, _, m, l), c || n.type !== "option" ? typeof n.type == "function" && (n.__d = l) : e.value = "") : l && f.__e == l && l.parentNode != e && (l = Jn(f))
    }
    for (n.__e = g, u = E; u--;) _[u] != null && (typeof n.type == "function" && _[u].__e != null && _[u].__e == n.__d && (n.__d = Jn(r, u + 1)), Wc(_[u], _[u]));
    if (v) for (u = 0; u < v.length; u++) Kc(v[u], v[++u], v[++u])
}

function $c(e, t, n) {
    var r, o;
    for (r = 0; r < e.__k.length; r++) (o = e.__k[r]) && (o.__ = e, t = typeof o.type == "function" ? $c(o, t, n) : Uc(n, o, o, e.__k, o.__e, t));
    return t
}

function dt(e, t) {
    return t = t || [], e == null || typeof e == "boolean" || (Array.isArray(e) ? e.some(function (n) {
        dt(n, t)
    }) : t.push(e)), t
}

function Uc(e, t, n, r, o, i) {
    var s, a, l;
    if (t.__d !== void 0) s = t.__d, t.__d = void 0; else if (n == null || o != i || o.parentNode == null) e:if (i == null || i.parentNode !== e) e.appendChild(o), s = null; else {
        for (a = i, l = 0; (a = a.nextSibling) && l < r.length; l += 2) if (a == o) break e;
        e.insertBefore(o, i), s = i
    }
    return s !== void 0 ? s : o.nextSibling
}

function Ys(e, t, n) {
    t[0] === "-" ? e.setProperty(t, n) : e[t] = n == null ? "" : typeof n != "number" || Th.test(t) ? n : n + "px"
}

function fr(e, t, n, r, o) {
    var i;
    e:if (t === "style") if (typeof n == "string") e.style.cssText = n; else {
        if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || Ys(e.style, t, "");
        if (n) for (t in n) r && n[t] === r[t] || Ys(e.style, t, n[t])
    } else if (t[0] === "o" && t[1] === "n") i = t !== (t = t.replace(/Capture$/, "")), t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + i] = n, n ? r || e.addEventListener(t, i ? Zs : Gs, i) : e.removeEventListener(t, i ? Zs : Gs, i); else if (t !== "dangerouslySetInnerHTML") {
        if (o) t = t.replace(/xlink[H:h]/, "h").replace(/sName$/, "s"); else if (t !== "href" && t !== "list" && t !== "form" && t !== "download" && t in e) try {
            e[t] = n == null ? "" : n;
            break e
        } catch {
        }
        typeof n == "function" || (n != null && (n !== !1 || t[0] === "a" && t[1] === "r") ? e.setAttribute(t, n) : e.removeAttribute(t))
    }
}

function Gs(e) {
    this.l[e.type + !1](Y.event ? Y.event(e) : e)
}

function Zs(e) {
    this.l[e.type + !0](Y.event ? Y.event(e) : e)
}

function Fi(e, t, n, r, o, i, s, a, l) {
    var c, u, d, f, h, m, g, v, _, E, O, S = t.type;
    if (t.constructor !== void 0) return null;
    n.__h != null && (l = n.__h, a = t.__e = n.__e, t.__h = null, i = [a]), (c = Y.__b) && c(t);
    try {
        e:if (typeof S == "function") {
            if (v = t.props, _ = (c = S.contextType) && r[c.__c], E = c ? _ ? _.props.value : c.__ : r, n.__c ? g = (u = t.__c = n.__c).__ = u.__E : ("prototype" in S && S.prototype.render ? t.__c = u = new S(v, E) : (t.__c = u = new st(v, E), u.constructor = S, u.render = Rh), _ && _.sub(u), u.props = v, u.state || (u.state = {}), u.context = E, u.__n = r, d = u.__d = !0, u.__h = []), u.__s == null && (u.__s = u.state), S.getDerivedStateFromProps != null && (u.__s == u.state && (u.__s = ft({}, u.__s)), ft(u.__s, S.getDerivedStateFromProps(v, u.__s))), f = u.props, h = u.state, d) S.getDerivedStateFromProps == null && u.componentWillMount != null && u.componentWillMount(), u.componentDidMount != null && u.__h.push(u.componentDidMount); else {
                if (S.getDerivedStateFromProps == null && v !== f && u.componentWillReceiveProps != null && u.componentWillReceiveProps(v, E), !u.__e && u.shouldComponentUpdate != null && u.shouldComponentUpdate(v, u.__s, E) === !1 || t.__v === n.__v) {
                    u.props = v, u.state = u.__s, t.__v !== n.__v && (u.__d = !1), u.__v = t, t.__e = n.__e, t.__k = n.__k, u.__h.length && s.push(u);
                    break e
                }
                u.componentWillUpdate != null && u.componentWillUpdate(v, u.__s, E), u.componentDidUpdate != null && u.__h.push(function () {
                    u.componentDidUpdate(f, h, m)
                })
            }
            u.context = E, u.props = v, u.state = u.__s, (c = Y.__r) && c(t), u.__d = !1, u.__v = t, u.__P = e, c = u.render(u.props, u.state, u.context), u.state = u.__s, u.getChildContext != null && (r = ft(ft({}, r), u.getChildContext())), d || u.getSnapshotBeforeUpdate == null || (m = u.getSnapshotBeforeUpdate(f, h)), O = c != null && c.type === At && c.key == null ? c.props.children : c, Bc(e, Array.isArray(O) ? O : [O], t, n, r, o, i, s, a, l), u.base = t.__e, t.__h = null, u.__h.length && s.push(u), g && (u.__E = u.__ = null), u.__e = !1
        } else i == null && t.__v === n.__v ? (t.__k = n.__k, t.__e = n.__e) : t.__e = kh(n.__e, t, n, r, o, i, s, l);
        (c = Y.diffed) && c(t)
    } catch (x) {
        t.__v = null, (l || i != null) && (t.__e = a, t.__h = !!l, i[i.indexOf(a)] = null), Y.__e(x, t, n)
    }
}

function Vc(e, t) {
    Y.__c && Y.__c(t, e), e.some(function (n) {
        try {
            e = n.__h, n.__h = [], e.some(function (r) {
                r.call(n)
            })
        } catch (r) {
            Y.__e(r, n.__v)
        }
    })
}

function kh(e, t, n, r, o, i, s, a) {
    var l, c, u, d, f = n.props, h = t.props, m = t.type, g = 0;
    if (m === "svg" && (o = !0), i != null) {
        for (; g < i.length; g++) if ((l = i[g]) && (l === e || (m ? l.localName == m : l.nodeType == 3))) {
            e = l, i[g] = null;
            break
        }
    }
    if (e == null) {
        if (m === null) return document.createTextNode(h);
        e = o ? document.createElementNS("http://www.w3.org/2000/svg", m) : document.createElement(m, h.is && h), i = null, a = !1
    }
    if (m === null) f === h || a && e.data === h || (e.data = h); else {
        if (i = i && Hi.slice.call(e.childNodes), c = (f = n.props || qr).dangerouslySetInnerHTML, u = h.dangerouslySetInnerHTML, !a) {
            if (i != null) for (f = {}, d = 0; d < e.attributes.length; d++) f[e.attributes[d].name] = e.attributes[d].value;
            (u || c) && (u && (c && u.__html == c.__html || u.__html === e.innerHTML) || (e.innerHTML = u && u.__html || ""))
        }
        if (function (v, _, E, O, S) {
            var x;
            for (x in E) x === "children" || x === "key" || x in _ || fr(v, x, null, E[x], O);
            for (x in _) S && typeof _[x] != "function" || x === "children" || x === "key" || x === "value" || x === "checked" || E[x] === _[x] || fr(v, x, _[x], E[x], O)
        }(e, h, f, o, a), u) t.__k = []; else if (g = t.props.children, Bc(e, Array.isArray(g) ? g : [g], t, n, r, o && m !== "foreignObject", i, s, e.firstChild, a), i != null) for (g = i.length; g--;) i[g] != null && qc(i[g]);
        a || ("value" in h && (g = h.value) !== void 0 && (g !== e.value || m === "progress" && !g) && fr(e, "value", g, f.value, !1), "checked" in h && (g = h.checked) !== void 0 && g !== e.checked && fr(e, "checked", g, f.checked, !1))
    }
    return e
}

function Kc(e, t, n) {
    try {
        typeof e == "function" ? e(t) : e.current = t
    } catch (r) {
        Y.__e(r, n)
    }
}

function Wc(e, t, n) {
    var r, o, i;
    if (Y.unmount && Y.unmount(e), (r = e.ref) && (r.current && r.current !== e.__e || Kc(r, null, t)), n || typeof e.type == "function" || (n = (o = e.__e) != null), e.__e = e.__d = void 0, (r = e.__c) != null) {
        if (r.componentWillUnmount) try {
            r.componentWillUnmount()
        } catch (s) {
            Y.__e(s, t)
        }
        r.base = r.__P = null
    }
    if (r = e.__k) for (i = 0; i < r.length; i++) r[i] && Wc(r[i], t, n);
    o != null && qc(o)
}

function Rh(e, t, n) {
    return this.constructor(e, n)
}

function Qn(e, t, n) {
    var r, o, i;
    Y.__ && Y.__(e, t), o = (r = typeof n == "function") ? null : n && n.__k || t.__k, i = [], Fi(t, e = (!r && n || t).__k = it(At, null, [e]), o || qr, qr, t.ownerSVGElement !== void 0, !r && n ? [n] : o ? null : t.firstChild ? Hi.slice.call(t.childNodes) : null, i, !r && n ? n : o ? o.__e : t.firstChild, r), Vc(i, e)
}

function Jc(e, t) {
    Qn(e, t, Jc)
}

function Dh(e, t, n) {
    var r, o, i, s = arguments, a = ft({}, e.props);
    for (i in t) i == "key" ? r = t[i] : i == "ref" ? o = t[i] : a[i] = t[i];
    if (arguments.length > 3) for (n = [n], i = 3; i < arguments.length; i++) n.push(s[i]);
    return n != null && (a.children = n), Fn(e.type, a, r || e.key, o || e.ref, null)
}

Y = {
    __e: function (e, t) {
        for (var n, r, o; t = t.__;) if ((n = t.__c) && !n.__) try {
            if ((r = n.constructor) && r.getDerivedStateFromError != null && (n.setState(r.getDerivedStateFromError(e)), o = n.__d), n.componentDidCatch != null && (n.componentDidCatch(e), o = n.__d), o) return n.__E = n
        } catch (i) {
            e = i
        }
        throw e
    }, __v: 0
}, st.prototype.setState = function (e, t) {
    var n;
    n = this.__s != null && this.__s !== this.state ? this.__s : this.__s = ft({}, this.state), typeof e == "function" && (e = e(ft({}, n), this.props)), e && ft(n, e), e != null && this.__v && (t && this.__h.push(t), Qo(this))
}, st.prototype.forceUpdate = function (e) {
    this.__v && (this.__e = !0, e && this.__h.push(e), Qo(this))
}, st.prototype.render = At, Hn = [], Hc = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, zr.__r = 0, Fc = 0;
var pn, Me, Xs, tn = 0, Yo = [], ea = Y.__b, ta = Y.__r, na = Y.diffed, ra = Y.__c, oa = Y.unmount;

function Yn(e, t) {
    Y.__h && Y.__h(Me, e, tn || t), tn = 0;
    var n = Me.__H || (Me.__H = {__: [], __h: []});
    return e >= n.__.length && n.__.push({}), n.__[e]
}

function ia(e, t, n) {
    var r = Yn(pn++, 2);
    return r.t = e, r.__c || (r.__ = [n ? n(t) : Qc(void 0, t), function (o) {
        var i = r.t(r.__[0], o);
        r.__[0] !== i && (r.__ = [i, r.__[1]], r.__c.setState({}))
    }], r.__c = Me), r.__
}

function sa(e, t) {
    var n = Yn(pn++, 4);
    !Y.__s && qi(n.__H, t) && (n.__ = e, n.__H = t, Me.__h.push(n))
}

function br(e, t) {
    var n = Yn(pn++, 7);
    return qi(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__
}

function Lh() {
    Yo.forEach(function (e) {
        if (e.__P) try {
            e.__H.__h.forEach(Er), e.__H.__h.forEach(Go), e.__H.__h = []
        } catch (t) {
            e.__H.__h = [], Y.__e(t, e.__v)
        }
    }), Yo = []
}

Y.__b = function (e) {
    Me = null, ea && ea(e)
}, Y.__r = function (e) {
    ta && ta(e), pn = 0;
    var t = (Me = e.__c).__H;
    t && (t.__h.forEach(Er), t.__h.forEach(Go), t.__h = [])
}, Y.diffed = function (e) {
    na && na(e);
    var t = e.__c;
    t && t.__H && t.__H.__h.length && (Yo.push(t) !== 1 && Xs === Y.requestAnimationFrame || ((Xs = Y.requestAnimationFrame) || function (n) {
        var r, o = function () {
            clearTimeout(i), aa && cancelAnimationFrame(r), setTimeout(n)
        }, i = setTimeout(o, 100);
        aa && (r = requestAnimationFrame(o))
    })(Lh)), Me = void 0
}, Y.__c = function (e, t) {
    t.some(function (n) {
        try {
            n.__h.forEach(Er), n.__h = n.__h.filter(function (r) {
                return !r.__ || Go(r)
            })
        } catch (r) {
            t.some(function (o) {
                o.__h && (o.__h = [])
            }), t = [], Y.__e(r, n.__v)
        }
    }), ra && ra(e, t)
}, Y.unmount = function (e) {
    oa && oa(e);
    var t = e.__c;
    if (t && t.__H) try {
        t.__H.__.forEach(Er)
    } catch (n) {
        Y.__e(n, t.__v)
    }
};
var aa = typeof requestAnimationFrame == "function";

function Er(e) {
    var t = Me;
    typeof e.__c == "function" && e.__c(), Me = t
}

function Go(e) {
    var t = Me;
    e.__c = e.__(), Me = t
}

function qi(e, t) {
    return !e || e.length !== t.length || t.some(function (n, r) {
        return n !== e[r]
    })
}

function Qc(e, t) {
    return typeof t == "function" ? t(e) : t
}

function Yc(e, t) {
    for (var n in t) e[n] = t[n];
    return e
}

function Zo(e, t) {
    for (var n in e) if (n !== "__source" && !(n in t)) return !0;
    for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
    return !1
}

function Xo(e) {
    this.props = e
}

(Xo.prototype = new st).isPureReactComponent = !0, Xo.prototype.shouldComponentUpdate = function (e, t) {
    return Zo(this.props, e) || Zo(this.state, t)
};
var la = Y.__b;
Y.__b = function (e) {
    e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), la && la(e)
};
var Nh = typeof Symbol != "undefined" && Symbol.for && Symbol.for("react.forward_ref") || 3911, ca = function (e, t) {
    return e == null ? null : dt(dt(e).map(t))
}, Mh = {
    map: ca, forEach: ca, count: function (e) {
        return e ? dt(e).length : 0
    }, only: function (e) {
        var t = dt(e);
        if (t.length !== 1) throw"Children.only";
        return t[0]
    }, toArray: dt
}, Hh = Y.__e;

function Or() {
    this.__u = 0, this.t = null, this.__b = null
}

function Gc(e) {
    var t = e.__.__c;
    return t && t.__e && t.__e(e)
}

function xn() {
    this.u = null, this.o = null
}

Y.__e = function (e, t, n) {
    if (e.then) {
        for (var r, o = t; o = o.__;) if ((r = o.__c) && r.__c) return t.__e == null && (t.__e = n.__e, t.__k = n.__k), r.__c(e, t)
    }
    Hh(e, t, n)
}, (Or.prototype = new st).__c = function (e, t) {
    var n = t.__c, r = this;
    r.t == null && (r.t = []), r.t.push(n);
    var o = Gc(r.__v), i = !1, s = function () {
        i || (i = !0, n.componentWillUnmount = n.__c, o ? o(a) : a())
    };
    n.__c = n.componentWillUnmount, n.componentWillUnmount = function () {
        s(), n.__c && n.__c()
    };
    var a = function () {
        if (!--r.__u) {
            if (r.state.__e) {
                var c = r.state.__e;
                r.__v.__k[0] = function d(f, h, m) {
                    return f && (f.__v = null, f.__k = f.__k && f.__k.map(function (g) {
                        return d(g, h, m)
                    }), f.__c && f.__c.__P === h && (f.__e && m.insertBefore(f.__e, f.__d), f.__c.__e = !0, f.__c.__P = m)), f
                }(c, c.__c.__P, c.__c.__O)
            }
            var u;
            for (r.setState({__e: r.__b = null}); u = r.t.pop();) u.forceUpdate()
        }
    }, l = t.__h === !0;
    r.__u++ || l || r.setState({__e: r.__b = r.__v.__k[0]}), e.then(s, s)
}, Or.prototype.componentWillUnmount = function () {
    this.t = []
}, Or.prototype.render = function (e, t) {
    if (this.__b) {
        if (this.__v.__k) {
            var n = document.createElement("div"), r = this.__v.__k[0].__c;
            this.__v.__k[0] = function i(s, a, l) {
                return s && (s.__c && s.__c.__H && (s.__c.__H.__.forEach(function (c) {
                    typeof c.__c == "function" && c.__c()
                }), s.__c.__H = null), (s = Yc({}, s)).__c != null && (s.__c.__P === l && (s.__c.__P = a), s.__c = null), s.__k = s.__k && s.__k.map(function (c) {
                    return i(c, a, l)
                })), s
            }(this.__b, n, r.__O = r.__P)
        }
        this.__b = null
    }
    var o = t.__e && it(At, null, e.fallback);
    return o && (o.__h = null), [it(At, null, t.__e ? null : e.children), o]
};
var ua = function (e, t, n) {
    if (++n[1] === n[0] && e.o.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.o.size)) for (n = e.u; n;) {
        for (; n.length > 3;) n.pop()();
        if (n[1] < n[0]) break;
        e.u = n = n[2]
    }
};

function Fh(e) {
    return this.getChildContext = function () {
        return e.context
    }, e.children
}

function qh(e) {
    var t = this, n = e.i;
    t.componentWillUnmount = function () {
        Qn(null, t.l), t.l = null, t.i = null
    }, t.i && t.i !== n && t.componentWillUnmount(), e.__v ? (t.l || (t.i = n, t.l = {
        nodeType: 1,
        parentNode: n,
        childNodes: [],
        appendChild: function (r) {
            this.childNodes.push(r), t.i.appendChild(r)
        },
        insertBefore: function (r, o) {
            this.childNodes.push(r), t.i.appendChild(r)
        },
        removeChild: function (r) {
            this.childNodes.splice(this.childNodes.indexOf(r) >>> 1, 1), t.i.removeChild(r)
        }
    }), Qn(it(Fh, {context: t.context}, e.__v), t.l)) : t.l && t.componentWillUnmount()
}

function Zc(e, t) {
    return it(qh, {__v: e, i: t})
}

(xn.prototype = new st).__e = function (e) {
    var t = this, n = Gc(t.__v), r = t.o.get(e);
    return r[0]++, function (o) {
        var i = function () {
            t.props.revealOrder ? (r.push(o), ua(t, e, r)) : o()
        };
        n ? n(i) : i()
    }
}, xn.prototype.render = function (e) {
    this.u = null, this.o = new Map;
    var t = dt(e.children);
    e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
    for (var n = t.length; n--;) this.o.set(t[n], this.u = [1, 0, this.u]);
    return e.children
}, xn.prototype.componentDidUpdate = xn.prototype.componentDidMount = function () {
    var e = this;
    this.o.forEach(function (t, n) {
        ua(e, n, t)
    })
};
var Xc = typeof Symbol != "undefined" && Symbol.for && Symbol.for("react.element") || 60103,
    zh = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,
    Bh = function (e) {
        return (typeof Symbol != "undefined" && Wn(Symbol()) == "symbol" ? /fil|che|rad/i : /fil|che|ra/i).test(e)
    };

function eu(e, t, n) {
    return t.__k == null && (t.textContent = ""), Qn(e, t), typeof n == "function" && n(), e ? e.__c : null
}

st.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function (e) {
    Object.defineProperty(st.prototype, e, {
        configurable: !0, get: function () {
            return this["UNSAFE_" + e]
        }, set: function (t) {
            Object.defineProperty(this, e, {configurable: !0, writable: !0, value: t})
        }
    })
});
var fa = Y.event;

function $h() {
}

function Uh() {
    return this.cancelBubble
}

function Vh() {
    return this.defaultPrevented
}

Y.event = function (e) {
    return fa && (e = fa(e)), e.persist = $h, e.isPropagationStopped = Uh, e.isDefaultPrevented = Vh, e.nativeEvent = e
};
var tu, da = {
    configurable: !0, get: function () {
        return this.class
    }
}, pa = Y.vnode;
Y.vnode = function (e) {
    var t = e.type, n = e.props, r = n;
    if (typeof t == "string") {
        for (var o in r = {}, n) {
            var i = n[o];
            o === "value" && "defaultValue" in n && i == null || (o === "defaultValue" && "value" in n && n.value == null ? o = "value" : o === "download" && i === !0 ? i = "" : /ondoubleclick/i.test(o) ? o = "ondblclick" : /^onchange(textarea|input)/i.test(o + t) && !Bh(n.type) ? o = "oninput" : /^on(Ani|Tra|Tou|BeforeInp)/.test(o) ? o = o.toLowerCase() : zh.test(o) ? o = o.replace(/[A-Z0-9]/, "-$&").toLowerCase() : i === null && (i = void 0), r[o] = i)
        }
        t == "select" && r.multiple && Array.isArray(r.value) && (r.value = dt(n.children).forEach(function (s) {
            s.props.selected = r.value.indexOf(s.props.value) != -1
        })), t == "select" && r.defaultValue != null && (r.value = dt(n.children).forEach(function (s) {
            s.props.selected = r.multiple ? r.defaultValue.indexOf(s.props.value) != -1 : r.defaultValue == s.props.value
        })), e.props = r
    }
    t && n.class != n.className && (da.enumerable = "className" in n, n.className != null && (r.class = n.className), Object.defineProperty(r, "className", da)), e.$$typeof = Xc, pa && pa(e)
};
var ma = Y.__r;
Y.__r = function (e) {
    ma && ma(e), tu = e.__c
};
var Kh = {
    ReactCurrentDispatcher: {
        current: {
            readContext: function (e) {
                return tu.__n[e.__c].props.value
            }
        }
    }
};
(typeof performance == "undefined" ? "undefined" : Wn(performance)) == "object" && typeof performance.now == "function" && performance.now.bind(performance);

function ha(e) {
    return !!e && e.$$typeof === Xc
}

var b = {
    useState: function (e) {
        return tn = 1, ia(Qc, e)
    }, useReducer: ia, useEffect: function (e, t) {
        var n = Yn(pn++, 3);
        !Y.__s && qi(n.__H, t) && (n.__ = e, n.__H = t, Me.__H.__h.push(n))
    }, useLayoutEffect: sa, useRef: function (e) {
        return tn = 5, br(function () {
            return {current: e}
        }, [])
    }, useImperativeHandle: function (e, t, n) {
        tn = 6, sa(function () {
            typeof e == "function" ? e(t()) : e && (e.current = t())
        }, n == null ? n : n.concat(e))
    }, useMemo: br, useCallback: function (e, t) {
        return tn = 8, br(function () {
            return e
        }, t)
    }, useContext: function (e) {
        var t = Me.context[e.__c], n = Yn(pn++, 9);
        return n.__c = e, t ? (n.__ == null && (n.__ = !0, t.sub(Me)), t.props.value) : e.__
    }, useDebugValue: function (e, t) {
        Y.useDebugValue && Y.useDebugValue(t ? t(e) : e)
    }, version: "16.8.0", Children: Mh, render: eu, hydrate: function (e, t, n) {
        return Jc(e, t), typeof n == "function" && n(), e ? e.__c : null
    }, unmountComponentAtNode: function (e) {
        return !!e.__k && (Qn(null, e), !0)
    }, createPortal: Zc, createElement: it, createContext: function (e, t) {
        var n = {
            __c: t = "__cC" + Fc++, __: e, Consumer: function (r, o) {
                return r.children(o)
            }, Provider: function (r) {
                var o, i;
                return this.getChildContext || (o = [], (i = {})[t] = this, this.getChildContext = function () {
                    return i
                }, this.shouldComponentUpdate = function (s) {
                    this.props.value !== s.value && o.some(Qo)
                }, this.sub = function (s) {
                    o.push(s);
                    var a = s.componentWillUnmount;
                    s.componentWillUnmount = function () {
                        o.splice(o.indexOf(s), 1), a && a.call(s)
                    }
                }), r.children
            }
        };
        return n.Provider.__ = n.Consumer.contextType = n
    }, createFactory: function (e) {
        return it.bind(null, e)
    }, cloneElement: function (e) {
        return ha(e) ? Dh.apply(null, arguments) : e
    }, createRef: function () {
        return {current: null}
    }, Fragment: At, isValidElement: ha, findDOMNode: function (e) {
        return e && (e.base || e.nodeType === 1 && e) || null
    }, Component: st, PureComponent: Xo, memo: function (e, t) {
        function n(o) {
            var i = this.props.ref, s = i == o.ref;
            return !s && i && (i.call ? i(null) : i.current = null), t ? !t(this.props, o) || !s : Zo(this.props, o)
        }

        function r(o) {
            return this.shouldComponentUpdate = n, it(e, o)
        }

        return r.displayName = "Memo(" + (e.displayName || e.name) + ")", r.prototype.isReactComponent = !0, r.__f = !0, r
    }, forwardRef: function (e) {
        function t(n, r) {
            var o = Yc({}, n);
            return delete o.ref, e(o, (r = n.ref || r) && (Wn(r) != "object" || "current" in r) ? r : null)
        }

        return t.$$typeof = Nh, t.render = t, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (e.displayName || e.name) + ")", t
    }, unstable_batchedUpdates: function (e, t) {
        return e(t)
    }, StrictMode: At, Suspense: Or, SuspenseList: xn, lazy: function (e) {
        var t, n, r;

        function o(i) {
            if (t || (t = e()).then(function (s) {
                n = s.default || s
            }, function (s) {
                r = s
            }), r) throw r;
            if (!n) throw t;
            return it(n, i)
        }

        return o.displayName = "Lazy", o.__f = !0, o
    }, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Kh
};

function Wh() {
    return b.createElement("svg", {
        width: "15",
        height: "15",
        className: "DocSearch-Control-Key-Icon"
    }, b.createElement("path", {
        d: "M4.505 4.496h2M5.505 5.496v5M8.216 4.496l.055 5.993M10 7.5c.333.333.5.667.5 1v2M12.326 4.5v5.996M8.384 4.496c1.674 0 2.116 0 2.116 1.5s-.442 1.5-2.116 1.5M3.205 9.303c-.09.448-.277 1.21-1.241 1.203C1 10.5.5 9.513.5 8V7c0-1.57.5-2.5 1.464-2.494.964.006 1.134.598 1.24 1.342M12.553 10.5h1.953",
        strokeWidth: "1.2",
        stroke: "currentColor",
        fill: "none",
        strokeLinecap: "square"
    }))
}

function nu() {
    return b.createElement("svg", {
        width: "20",
        height: "20",
        className: "DocSearch-Search-Icon",
        viewBox: "0 0 20 20"
    }, b.createElement("path", {
        d: "M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z",
        stroke: "currentColor",
        fill: "none",
        fillRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }))
}

var Jh = ["translations"];

function ei() {
    return ei = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }, ei.apply(this, arguments)
}

function Qh(e, t) {
    if (e == null) return {};
    var n, r, o = function (s, a) {
        if (s == null) return {};
        var l, c, u = {}, d = Object.keys(s);
        for (c = 0; c < d.length; c++) l = d[c], a.indexOf(l) >= 0 || (u[l] = s[l]);
        return u
    }(e, t);
    if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);
        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
    }
    return o
}

var Yh = b.forwardRef(function (e, t) {
    var n = e.translations, r = n === void 0 ? {} : n, o = Qh(e, Jh), i = r.buttonText, s = i === void 0 ? "Search" : i,
        a = r.buttonAriaLabel, l = a === void 0 ? "Search" : a, c = br(function () {
            return typeof navigator != "undefined" ? /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? "\u2318" : "Ctrl" : null
        }, []);
    return b.createElement("button", ei({
        type: "button",
        className: "DocSearch DocSearch-Button",
        "aria-label": l
    }, o, {ref: t}), b.createElement("span", {className: "DocSearch-Button-Container"}, b.createElement(nu, null), b.createElement("span", {className: "DocSearch-Button-Placeholder"}, s)), b.createElement("span", {className: "DocSearch-Button-Keys"}, c !== null && b.createElement(b.Fragment, null, b.createElement("span", {className: "DocSearch-Button-Key"}, c === "Ctrl" ? b.createElement(Wh, null) : c), b.createElement("span", {className: "DocSearch-Button-Key"}, "K"))))
});

function Gn(e) {
    return e.reduce(function (t, n) {
        return t.concat(n)
    }, [])
}

var Gh = 0;

function ti(e) {
    return e.collections.length === 0 ? 0 : e.collections.reduce(function (t, n) {
        return t + n.items.length
    }, 0)
}

var Zh = function () {
}, Xh = [{segment: "autocomplete-core", version: "1.5.0"}];

function va(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (o) {
            return Object.getOwnPropertyDescriptor(e, o).enumerable
        })), n.push.apply(n, r)
    }
    return n
}

function ev(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

function tv(e, t, n) {
    var r = t.initialState;
    return {
        getState: function () {
            return r
        }, dispatch: function (o, i) {
            var s = function (a) {
                for (var l = 1; l < arguments.length; l++) {
                    var c = arguments[l] != null ? arguments[l] : {};
                    l % 2 ? va(Object(c), !0).forEach(function (u) {
                        ev(a, u, c[u])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(c)) : va(Object(c)).forEach(function (u) {
                        Object.defineProperty(a, u, Object.getOwnPropertyDescriptor(c, u))
                    })
                }
                return a
            }({}, r);
            r = e(r, {type: o, props: t, payload: i}), n({state: r, prevState: s})
        }
    }
}

function ga(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (o) {
            return Object.getOwnPropertyDescriptor(e, o).enumerable
        })), n.push.apply(n, r)
    }
    return n
}

function dr(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t] != null ? arguments[t] : {};
        t % 2 ? ga(Object(n), !0).forEach(function (r) {
            nv(e, r, n[r])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ga(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
        })
    }
    return e
}

function nv(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

function _a(e, t, n, r) {
    if (!n) return null;
    if (e < 0 && (t === null || r !== null && t === 0)) return n + e;
    var o = (t === null ? -1 : t) + e;
    return o <= -1 || o >= n ? r === null ? null : 0 : o
}

function ya(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (o) {
            return Object.getOwnPropertyDescriptor(e, o).enumerable
        })), n.push.apply(n, r)
    }
    return n
}

function rv(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

function ov(e, t) {
    var n = [];
    return Promise.resolve(e(t)).then(function (r) {
        return Promise.all(r.filter(function (o) {
            return Boolean(o)
        }).map(function (o) {
            if (o.sourceId, n.includes(o.sourceId)) throw new Error("[Autocomplete] The `sourceId` ".concat(JSON.stringify(o.sourceId), " is not unique."));
            n.push(o.sourceId);
            var i = function (s) {
                for (var a = 1; a < arguments.length; a++) {
                    var l = arguments[a] != null ? arguments[a] : {};
                    a % 2 ? ya(Object(l), !0).forEach(function (c) {
                        rv(s, c, l[c])
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(s, Object.getOwnPropertyDescriptors(l)) : ya(Object(l)).forEach(function (c) {
                        Object.defineProperty(s, c, Object.getOwnPropertyDescriptor(l, c))
                    })
                }
                return s
            }({
                getItemInputValue: function (s) {
                    return s.state.query
                }, getItemUrl: function () {
                }, onSelect: function (s) {
                    (0, s.setIsOpen)(!1)
                }, onActive: Zh
            }, o);
            return Promise.resolve(i)
        }))
    })
}

function nn(e) {
    var t = function (o) {
        var i = o.collections.map(function (s) {
            return s.items.length
        }).reduce(function (s, a, l) {
            var c = (s[l - 1] || 0) + a;
            return s.push(c), s
        }, []).reduce(function (s, a) {
            return a <= o.activeItemId ? s + 1 : s
        }, 0);
        return o.collections[i]
    }(e);
    if (!t) return null;
    var n = t.items[function (o) {
        for (var i = o.state, s = o.collection, a = !1, l = 0, c = 0; a === !1;) {
            var u = i.collections[l];
            if (u === s) {
                a = !0;
                break
            }
            c += u.items.length, l++
        }
        return i.activeItemId - c
    }({state: e, collection: t})], r = t.source;
    return {
        item: n,
        itemInputValue: r.getItemInputValue({item: n, state: e}),
        itemUrl: r.getItemUrl({item: n, state: e}),
        source: r
    }
}

function ba(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (o) {
            return Object.getOwnPropertyDescriptor(e, o).enumerable
        })), n.push.apply(n, r)
    }
    return n
}

function pr(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t] != null ? arguments[t] : {};
        t % 2 ? ba(Object(n), !0).forEach(function (r) {
            iv(e, r, n[r])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ba(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
        })
    }
    return e
}

function iv(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

function sv(e) {
    return function (t) {
        if (Array.isArray(t)) return Oo(t)
    }(e) || function (t) {
        if (typeof Symbol != "undefined" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
    }(e) || function (t, n) {
        if (!!t) {
            if (typeof t == "string") return Oo(t, n);
            var r = Object.prototype.toString.call(t).slice(8, -1);
            if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
            if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Oo(t, n)
        }
    }(e) || function () {
        throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
    }()
}

function Oo(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r
}

function Ea(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (o) {
            return Object.getOwnPropertyDescriptor(e, o).enumerable
        })), n.push.apply(n, r)
    }
    return n
}

function Qt(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t] != null ? arguments[t] : {};
        t % 2 ? Ea(Object(n), !0).forEach(function (r) {
            av(e, r, n[r])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ea(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
        })
    }
    return e
}

function av(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

function Oa(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (o) {
            return Object.getOwnPropertyDescriptor(e, o).enumerable
        })), n.push.apply(n, r)
    }
    return n
}

function mr(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t] != null ? arguments[t] : {};
        t % 2 ? Oa(Object(n), !0).forEach(function (r) {
            ru(e, r, n[r])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Oa(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
        })
    }
    return e
}

function ru(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

function lv(e) {
    return function (t) {
        if (Array.isArray(t)) return wo(t)
    }(e) || function (t) {
        if (typeof Symbol != "undefined" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t)
    }(e) || function (t, n) {
        if (!!t) {
            if (typeof t == "string") return wo(t, n);
            var r = Object.prototype.toString.call(t).slice(8, -1);
            if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
            if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return wo(t, n)
        }
    }(e) || function () {
        throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
    }()
}

function wo(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r
}

function wa(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (o) {
            return Object.getOwnPropertyDescriptor(e, o).enumerable
        })), n.push.apply(n, r)
    }
    return n
}

function Sa(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t] != null ? arguments[t] : {};
        t % 2 ? wa(Object(n), !0).forEach(function (r) {
            cv(e, r, n[r])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : wa(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
        })
    }
    return e
}

function cv(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

function hr(e) {
    return Boolean(e.execute)
}

function uv(e, t) {
    return n = e, Boolean(n == null ? void 0 : n.execute) ? Sa(Sa({}, e), {}, {
        requests: e.queries.map(function (r) {
            return {query: r, sourceId: t, transformResponse: e.transformResponse}
        })
    }) : {items: e, sourceId: t};
    var n
}

function fv(e) {
    var t = e.reduce(function (n, r) {
        if (!hr(r)) return n.push(r), n;
        var o = r.searchClient, i = r.execute, s = r.requests, a = n.find(function (u) {
            return hr(r) && hr(u) && u.searchClient === o && u.execute === i
        });
        if (a) {
            var l;
            (l = a.items).push.apply(l, lv(s))
        } else {
            var c = {execute: i, items: s, searchClient: o};
            n.push(c)
        }
        return n
    }, []).map(function (n) {
        if (!hr(n)) return Promise.resolve(n);
        var r = n, o = r.execute, i = r.items;
        return o({searchClient: r.searchClient, requests: i})
    });
    return Promise.all(t).then(function (n) {
        return Gn(n)
    })
}

function dv(e, t) {
    return t.map(function (n) {
        var r = e.filter(function (a) {
            return a.sourceId === n.sourceId
        }), o = r.map(function (a) {
            return a.items
        }), i = r[0].transformResponse, s = i ? i(function (a) {
            var l = a.map(function (c) {
                var u;
                return pr(pr({}, c), {}, {
                    hits: (u = c.hits) === null || u === void 0 ? void 0 : u.map(function (d) {
                        return pr(pr({}, d), {}, {__autocomplete_indexName: c.index, __autocomplete_queryID: c.queryID})
                    })
                })
            });
            return {
                results: l, hits: l.map(function (c) {
                    return c.hits
                }).filter(Boolean), facetHits: l.map(function (c) {
                    var u;
                    return (u = c.facetHits) === null || u === void 0 ? void 0 : u.map(function (d) {
                        return {label: d.value, count: d.count, _highlightResult: {label: {value: d.highlighted}}}
                    })
                }).filter(Boolean)
            }
        }(o)) : o;
        return s.every(Boolean), 'The `getItems` function from source "'.concat(n.sourceId, '" must return an array of items but returned ').concat(JSON.stringify(void 0), `.

Did you forget to return items?

See: https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/sources/#param-getitems`), {
            source: n,
            items: s
        }
    })
}

var pv = ["event", "nextState", "props", "query", "refresh", "store"];

function Pa(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (o) {
            return Object.getOwnPropertyDescriptor(e, o).enumerable
        })), n.push.apply(n, r)
    }
    return n
}

function Sn(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t] != null ? arguments[t] : {};
        t % 2 ? Pa(Object(n), !0).forEach(function (r) {
            mv(e, r, n[r])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Pa(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
        })
    }
    return e
}

function mv(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

function hv(e, t) {
    if (e == null) return {};
    var n, r, o = function (s, a) {
        if (s == null) return {};
        var l, c, u = {}, d = Object.keys(s);
        for (c = 0; c < d.length; c++) l = d[c], a.indexOf(l) >= 0 || (u[l] = s[l]);
        return u
    }(e, t);
    if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);
        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
    }
    return o
}

var Ca, So, vr, Pn = null, Aa = (Ca = -1, So = -1, vr = void 0, function (e) {
    var t = ++Ca;
    return Promise.resolve(e).then(function (n) {
        return vr && t < So ? vr : (So = t, vr = n, n)
    })
});

function en(e) {
    var t = e.event, n = e.nextState, r = n === void 0 ? {} : n, o = e.props, i = e.query, s = e.refresh, a = e.store,
        l = hv(e, pv);
    Pn && o.environment.clearTimeout(Pn);
    var c = l.setCollections, u = l.setIsOpen, d = l.setQuery, f = l.setActiveItemId, h = l.setStatus;
    if (d(i), f(o.defaultActiveItemId), !i && o.openOnFocus === !1) {
        var m, g = a.getState().collections.map(function (v) {
            return Sn(Sn({}, v), {}, {items: []})
        });
        return h("idle"), c(g), u((m = r.isOpen) !== null && m !== void 0 ? m : o.shouldPanelOpen({state: a.getState()})), Aa(g).then(function () {
            return Promise.resolve()
        })
    }
    return h("loading"), Pn = o.environment.setTimeout(function () {
        h("stalled")
    }, o.stallThreshold), Aa(o.getSources(Sn({query: i, refresh: s, state: a.getState()}, l)).then(function (v) {
        return Promise.all(v.map(function (_) {
            return Promise.resolve(_.getItems(Sn({query: i, refresh: s, state: a.getState()}, l))).then(function (E) {
                return uv(E, _.sourceId)
            })
        })).then(fv).then(function (_) {
            return dv(_, v)
        }).then(function (_) {
            return function (E) {
                var O = E.collections, S = E.props, x = E.state, L = O.reduce(function (A, P) {
                    return mr(mr({}, A), {}, ru({}, P.source.sourceId, mr(mr({}, P.source), {}, {
                        getItems: function () {
                            return Gn(P.items)
                        }
                    })))
                }, {});
                return Gn(S.reshape({
                    sources: Object.values(L),
                    sourcesBySourceId: L,
                    state: x
                })).filter(Boolean).map(function (A) {
                    return {source: A, items: A.getItems()}
                })
            }({collections: _, props: o, state: a.getState()})
        })
    })).then(function (v) {
        var _;
        h("idle"), c(v);
        var E = o.shouldPanelOpen({state: a.getState()});
        u((_ = r.isOpen) !== null && _ !== void 0 ? _ : o.openOnFocus && !i && E || E);
        var O = nn(a.getState());
        if (a.getState().activeItemId !== null && O) {
            var S = O.item, x = O.itemInputValue, L = O.itemUrl, A = O.source;
            A.onActive(Sn({
                event: t,
                item: S,
                itemInputValue: x,
                itemUrl: L,
                refresh: s,
                source: A,
                state: a.getState()
            }, l))
        }
    }).finally(function () {
        Pn && o.environment.clearTimeout(Pn)
    })
}

var vv = ["event", "props", "refresh", "store"];

function Ia(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (o) {
            return Object.getOwnPropertyDescriptor(e, o).enumerable
        })), n.push.apply(n, r)
    }
    return n
}

function kt(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t] != null ? arguments[t] : {};
        t % 2 ? Ia(Object(n), !0).forEach(function (r) {
            gv(e, r, n[r])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ia(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
        })
    }
    return e
}

function gv(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

function _v(e, t) {
    if (e == null) return {};
    var n, r, o = function (s, a) {
        if (s == null) return {};
        var l, c, u = {}, d = Object.keys(s);
        for (c = 0; c < d.length; c++) l = d[c], a.indexOf(l) >= 0 || (u[l] = s[l]);
        return u
    }(e, t);
    if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);
        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
    }
    return o
}

var yv = ["props", "refresh", "store"], bv = ["inputElement", "formElement", "panelElement"], Ev = ["inputElement"],
    Ov = ["inputElement", "maxLength"], wv = ["item", "source"];

function xa(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (o) {
            return Object.getOwnPropertyDescriptor(e, o).enumerable
        })), n.push.apply(n, r)
    }
    return n
}

function De(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t] != null ? arguments[t] : {};
        t % 2 ? xa(Object(n), !0).forEach(function (r) {
            Sv(e, r, n[r])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : xa(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
        })
    }
    return e
}

function Sv(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

function Cn(e, t) {
    if (e == null) return {};
    var n, r, o = function (s, a) {
        if (s == null) return {};
        var l, c, u = {}, d = Object.keys(s);
        for (c = 0; c < d.length; c++) l = d[c], a.indexOf(l) >= 0 || (u[l] = s[l]);
        return u
    }(e, t);
    if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);
        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
    }
    return o
}

function Pv(e) {
    var t = e.props, n = e.refresh, r = e.store, o = Cn(e, yv);
    return {
        getEnvironmentProps: function (i) {
            var s = i.inputElement, a = i.formElement, l = i.panelElement;
            return De({
                onTouchStart: function (c) {
                    r.getState().isOpen !== !1 && c.target !== s && [a, l].some(function (u) {
                        return d = u, f = c.target, d === f || d.contains(f);
                        var d, f
                    }) === !1 && r.dispatch("blur", null)
                }, onTouchMove: function (c) {
                    r.getState().isOpen !== !1 && s === t.environment.document.activeElement && c.target !== s && s.blur()
                }
            }, Cn(i, bv))
        }, getRootProps: function (i) {
            return De({
                role: "combobox",
                "aria-expanded": r.getState().isOpen,
                "aria-haspopup": "listbox",
                "aria-owns": r.getState().isOpen ? "".concat(t.id, "-list") : void 0,
                "aria-labelledby": "".concat(t.id, "-label")
            }, i)
        }, getFormProps: function (i) {
            return i.inputElement, De({
                action: "", noValidate: !0, role: "search", onSubmit: function (s) {
                    var a;
                    s.preventDefault(), t.onSubmit(De({
                        event: s,
                        refresh: n,
                        state: r.getState()
                    }, o)), r.dispatch("submit", null), (a = i.inputElement) === null || a === void 0 || a.blur()
                }, onReset: function (s) {
                    var a;
                    s.preventDefault(), t.onReset(De({
                        event: s,
                        refresh: n,
                        state: r.getState()
                    }, o)), r.dispatch("reset", null), (a = i.inputElement) === null || a === void 0 || a.focus()
                }
            }, Cn(i, Ev))
        }, getLabelProps: function (i) {
            return De({htmlFor: "".concat(t.id, "-input"), id: "".concat(t.id, "-label")}, i)
        }, getInputProps: function (i) {
            function s(h) {
                (t.openOnFocus || Boolean(r.getState().query)) && en(De({
                    event: h,
                    props: t,
                    query: r.getState().completion || r.getState().query,
                    refresh: n,
                    store: r
                }, o)), r.dispatch("focus", null)
            }

            var a = "ontouchstart" in t.environment, l = i || {}, c = (l.inputElement, l.maxLength),
                u = c === void 0 ? 512 : c, d = Cn(l, Ov), f = nn(r.getState());
            return De({
                "aria-autocomplete": "both",
                "aria-activedescendant": r.getState().isOpen && r.getState().activeItemId !== null ? "".concat(t.id, "-item-").concat(r.getState().activeItemId) : void 0,
                "aria-controls": r.getState().isOpen ? "".concat(t.id, "-list") : void 0,
                "aria-labelledby": "".concat(t.id, "-label"),
                value: r.getState().completion || r.getState().query,
                id: "".concat(t.id, "-input"),
                autoComplete: "off",
                autoCorrect: "off",
                autoCapitalize: "off",
                enterKeyHint: f != null && f.itemUrl ? "go" : "search",
                spellCheck: "false",
                autoFocus: t.autoFocus,
                placeholder: t.placeholder,
                maxLength: u,
                type: "search",
                onChange: function (h) {
                    en(De({event: h, props: t, query: h.currentTarget.value.slice(0, u), refresh: n, store: r}, o))
                },
                onKeyDown: function (h) {
                    (function (m) {
                        var g = m.event, v = m.props, _ = m.refresh, E = m.store, O = _v(m, vv);
                        if (g.key === "ArrowUp" || g.key === "ArrowDown") {
                            var S = function () {
                                var U = v.environment.document.getElementById("".concat(v.id, "-item-").concat(E.getState().activeItemId));
                                U && (U.scrollIntoViewIfNeeded ? U.scrollIntoViewIfNeeded(!1) : U.scrollIntoView(!1))
                            }, x = function () {
                                var U = nn(E.getState());
                                if (E.getState().activeItemId !== null && U) {
                                    var C = U.item, F = U.itemInputValue, Q = U.itemUrl, se = U.source;
                                    se.onActive(kt({
                                        event: g,
                                        item: C,
                                        itemInputValue: F,
                                        itemUrl: Q,
                                        refresh: _,
                                        source: se,
                                        state: E.getState()
                                    }, O))
                                }
                            };
                            g.preventDefault(), E.getState().isOpen === !1 && (v.openOnFocus || Boolean(E.getState().query)) ? en(kt({
                                event: g,
                                props: v,
                                query: E.getState().query,
                                refresh: _,
                                store: E
                            }, O)).then(function () {
                                E.dispatch(g.key, {nextActiveItemId: v.defaultActiveItemId}), x(), setTimeout(S, 0)
                            }) : (E.dispatch(g.key, {}), x(), S())
                        } else if (g.key === "Escape") g.preventDefault(), E.dispatch(g.key, null); else if (g.key === "Enter") {
                            if (E.getState().activeItemId === null || E.getState().collections.every(function (U) {
                                return U.items.length === 0
                            })) return;
                            g.preventDefault();
                            var L = nn(E.getState()), A = L.item, P = L.itemInputValue, B = L.itemUrl, q = L.source;
                            if (g.metaKey || g.ctrlKey) B !== void 0 && (q.onSelect(kt({
                                event: g,
                                item: A,
                                itemInputValue: P,
                                itemUrl: B,
                                refresh: _,
                                source: q,
                                state: E.getState()
                            }, O)), v.navigator.navigateNewTab({
                                itemUrl: B,
                                item: A,
                                state: E.getState()
                            })); else if (g.shiftKey) B !== void 0 && (q.onSelect(kt({
                                event: g,
                                item: A,
                                itemInputValue: P,
                                itemUrl: B,
                                refresh: _,
                                source: q,
                                state: E.getState()
                            }, O)), v.navigator.navigateNewWindow({
                                itemUrl: B,
                                item: A,
                                state: E.getState()
                            })); else if (!g.altKey) {
                                if (B !== void 0) return q.onSelect(kt({
                                    event: g,
                                    item: A,
                                    itemInputValue: P,
                                    itemUrl: B,
                                    refresh: _,
                                    source: q,
                                    state: E.getState()
                                }, O)), void v.navigator.navigate({itemUrl: B, item: A, state: E.getState()});
                                en(kt({
                                    event: g,
                                    nextState: {isOpen: !1},
                                    props: v,
                                    query: P,
                                    refresh: _,
                                    store: E
                                }, O)).then(function () {
                                    q.onSelect(kt({
                                        event: g,
                                        item: A,
                                        itemInputValue: P,
                                        itemUrl: B,
                                        refresh: _,
                                        source: q,
                                        state: E.getState()
                                    }, O))
                                })
                            }
                        }
                    })(De({event: h, props: t, refresh: n, store: r}, o))
                },
                onFocus: s,
                onBlur: function () {
                    a || r.dispatch("blur", null)
                },
                onClick: function (h) {
                    i.inputElement !== t.environment.document.activeElement || r.getState().isOpen || s(h)
                }
            }, d)
        }, getPanelProps: function (i) {
            return De({
                onMouseDown: function (s) {
                    s.preventDefault()
                }, onMouseLeave: function () {
                    r.dispatch("mouseleave", null)
                }
            }, i)
        }, getListProps: function (i) {
            return De({role: "listbox", "aria-labelledby": "".concat(t.id, "-label"), id: "".concat(t.id, "-list")}, i)
        }, getItemProps: function (i) {
            var s = i.item, a = i.source, l = Cn(i, wv);
            return De({
                id: "".concat(t.id, "-item-").concat(s.__autocomplete_id),
                role: "option",
                "aria-selected": r.getState().activeItemId === s.__autocomplete_id,
                onMouseMove: function (c) {
                    if (s.__autocomplete_id !== r.getState().activeItemId) {
                        r.dispatch("mousemove", s.__autocomplete_id);
                        var u = nn(r.getState());
                        if (r.getState().activeItemId !== null && u) {
                            var d = u.item, f = u.itemInputValue, h = u.itemUrl, m = u.source;
                            m.onActive(De({
                                event: c,
                                item: d,
                                itemInputValue: f,
                                itemUrl: h,
                                refresh: n,
                                source: m,
                                state: r.getState()
                            }, o))
                        }
                    }
                },
                onMouseDown: function (c) {
                    c.preventDefault()
                },
                onClick: function (c) {
                    var u = a.getItemInputValue({item: s, state: r.getState()}),
                        d = a.getItemUrl({item: s, state: r.getState()});
                    (d ? Promise.resolve() : en(De({
                        event: c,
                        nextState: {isOpen: !1},
                        props: t,
                        query: u,
                        refresh: n,
                        store: r
                    }, o))).then(function () {
                        a.onSelect(De({
                            event: c,
                            item: s,
                            itemInputValue: u,
                            itemUrl: d,
                            refresh: n,
                            source: a,
                            state: r.getState()
                        }, o))
                    })
                }
            }, l)
        }
    }
}

function ja(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (o) {
            return Object.getOwnPropertyDescriptor(e, o).enumerable
        })), n.push.apply(n, r)
    }
    return n
}

function Cv(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t] != null ? arguments[t] : {};
        t % 2 ? ja(Object(n), !0).forEach(function (r) {
            ou(e, r, n[r])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ja(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
        })
    }
    return e
}

function ou(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

function Av(e) {
    var t, n, r, o, i = e.plugins, s = e.options,
        a = (t = (((n = s.__autocomplete_metadata) === null || n === void 0 ? void 0 : n.userAgents) || [])[0]) === null || t === void 0 ? void 0 : t.segment,
        l = a ? ou({}, a, Object.keys(((r = s.__autocomplete_metadata) === null || r === void 0 ? void 0 : r.options) || {})) : {};
    return {
        plugins: i.map(function (c) {
            return {name: c.name, options: Object.keys(c.__autocomplete_pluginOptions || [])}
        }),
        options: Cv({"autocomplete-core": Object.keys(s)}, l),
        ua: Xh.concat(((o = s.__autocomplete_metadata) === null || o === void 0 ? void 0 : o.userAgents) || [])
    }
}

function Ta(e) {
    var t, n = e.state;
    return n.isOpen === !1 || n.activeItemId === null ? null : ((t = nn(n)) === null || t === void 0 ? void 0 : t.itemInputValue) || null
}

function ka(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (o) {
            return Object.getOwnPropertyDescriptor(e, o).enumerable
        })), n.push.apply(n, r)
    }
    return n
}

function ae(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t] != null ? arguments[t] : {};
        t % 2 ? ka(Object(n), !0).forEach(function (r) {
            Iv(e, r, n[r])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ka(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
        })
    }
    return e
}

function Iv(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

var xv = function (e, t) {
    switch (t.type) {
        case"setActiveItemId":
        case"mousemove":
            return ae(ae({}, e), {}, {activeItemId: t.payload});
        case"setQuery":
            return ae(ae({}, e), {}, {query: t.payload, completion: null});
        case"setCollections":
            return ae(ae({}, e), {}, {collections: t.payload});
        case"setIsOpen":
            return ae(ae({}, e), {}, {isOpen: t.payload});
        case"setStatus":
            return ae(ae({}, e), {}, {status: t.payload});
        case"setContext":
            return ae(ae({}, e), {}, {context: ae(ae({}, e.context), t.payload)});
        case"ArrowDown":
            var n = ae(ae({}, e), {}, {activeItemId: t.payload.hasOwnProperty("nextActiveItemId") ? t.payload.nextActiveItemId : _a(1, e.activeItemId, ti(e), t.props.defaultActiveItemId)});
            return ae(ae({}, n), {}, {completion: Ta({state: n})});
        case"ArrowUp":
            var r = ae(ae({}, e), {}, {activeItemId: _a(-1, e.activeItemId, ti(e), t.props.defaultActiveItemId)});
            return ae(ae({}, r), {}, {completion: Ta({state: r})});
        case"Escape":
            return e.isOpen ? ae(ae({}, e), {}, {
                activeItemId: null,
                isOpen: !1,
                completion: null
            }) : ae(ae({}, e), {}, {activeItemId: null, query: "", status: "idle", collections: []});
        case"submit":
            return ae(ae({}, e), {}, {activeItemId: null, isOpen: !1, status: "idle"});
        case"reset":
            return ae(ae({}, e), {}, {
                activeItemId: t.props.openOnFocus === !0 ? t.props.defaultActiveItemId : null,
                status: "idle",
                query: ""
            });
        case"focus":
            return ae(ae({}, e), {}, {
                activeItemId: t.props.defaultActiveItemId,
                isOpen: (t.props.openOnFocus || Boolean(e.query)) && t.props.shouldPanelOpen({state: e})
            });
        case"blur":
            return t.props.debug ? e : ae(ae({}, e), {}, {isOpen: !1, activeItemId: null});
        case"mouseleave":
            return ae(ae({}, e), {}, {activeItemId: t.props.defaultActiveItemId});
        default:
            return "The reducer action ".concat(JSON.stringify(t.type), " is not supported."), e
    }
};

function Ra(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (o) {
            return Object.getOwnPropertyDescriptor(e, o).enumerable
        })), n.push.apply(n, r)
    }
    return n
}

function Rt(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t] != null ? arguments[t] : {};
        t % 2 ? Ra(Object(n), !0).forEach(function (r) {
            jv(e, r, n[r])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ra(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
        })
    }
    return e
}

function jv(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

function Tv(e) {
    var t = [], n = function (a, l) {
        var c, u = typeof window != "undefined" ? window : {}, d = a.plugins || [];
        return Qt(Qt({
            debug: !1,
            openOnFocus: !1,
            placeholder: "",
            autoFocus: !1,
            defaultActiveItemId: null,
            stallThreshold: 300,
            environment: u,
            shouldPanelOpen: function (f) {
                return ti(f.state) > 0
            },
            reshape: function (f) {
                return f.sources
            }
        }, a), {}, {
            id: (c = a.id) !== null && c !== void 0 ? c : "autocomplete-".concat(Gh++),
            plugins: d,
            initialState: Qt({
                activeItemId: null,
                query: "",
                completion: null,
                collections: [],
                isOpen: !1,
                status: "idle",
                context: {}
            }, a.initialState),
            onStateChange: function (f) {
                var h;
                (h = a.onStateChange) === null || h === void 0 || h.call(a, f), d.forEach(function (m) {
                    var g;
                    return (g = m.onStateChange) === null || g === void 0 ? void 0 : g.call(m, f)
                })
            },
            onSubmit: function (f) {
                var h;
                (h = a.onSubmit) === null || h === void 0 || h.call(a, f), d.forEach(function (m) {
                    var g;
                    return (g = m.onSubmit) === null || g === void 0 ? void 0 : g.call(m, f)
                })
            },
            onReset: function (f) {
                var h;
                (h = a.onReset) === null || h === void 0 || h.call(a, f), d.forEach(function (m) {
                    var g;
                    return (g = m.onReset) === null || g === void 0 ? void 0 : g.call(m, f)
                })
            },
            getSources: function (f) {
                return Promise.all([].concat(sv(d.map(function (h) {
                    return h.getSources
                })), [a.getSources]).filter(Boolean).map(function (h) {
                    return ov(h, f)
                })).then(function (h) {
                    return Gn(h)
                }).then(function (h) {
                    return h.map(function (m) {
                        return Qt(Qt({}, m), {}, {
                            onSelect: function (g) {
                                m.onSelect(g), l.forEach(function (v) {
                                    var _;
                                    return (_ = v.onSelect) === null || _ === void 0 ? void 0 : _.call(v, g)
                                })
                            }, onActive: function (g) {
                                m.onActive(g), l.forEach(function (v) {
                                    var _;
                                    return (_ = v.onActive) === null || _ === void 0 ? void 0 : _.call(v, g)
                                })
                            }
                        })
                    })
                })
            },
            navigator: Qt({
                navigate: function (f) {
                    var h = f.itemUrl;
                    u.location.assign(h)
                }, navigateNewTab: function (f) {
                    var h = f.itemUrl, m = u.open(h, "_blank", "noopener");
                    m == null || m.focus()
                }, navigateNewWindow: function (f) {
                    var h = f.itemUrl;
                    u.open(h, "_blank", "noopener")
                }
            }, a.navigator)
        })
    }(e, t), r = tv(xv, n, function (a) {
        var l = a.prevState, c = a.state;
        n.onStateChange(Rt({prevState: l, state: c, refresh: s}, o))
    }), o = function (a) {
        var l = a.store;
        return {
            setActiveItemId: function (c) {
                l.dispatch("setActiveItemId", c)
            }, setQuery: function (c) {
                l.dispatch("setQuery", c)
            }, setCollections: function (c) {
                var u = 0, d = c.map(function (f) {
                    return dr(dr({}, f), {}, {
                        items: Gn(f.items).map(function (h) {
                            return dr(dr({}, h), {}, {__autocomplete_id: u++})
                        })
                    })
                });
                l.dispatch("setCollections", d)
            }, setIsOpen: function (c) {
                l.dispatch("setIsOpen", c)
            }, setStatus: function (c) {
                l.dispatch("setStatus", c)
            }, setContext: function (c) {
                l.dispatch("setContext", c)
            }
        }
    }({store: r}), i = Pv(Rt({props: n, refresh: s, store: r}, o));

    function s() {
        return en(Rt({
            event: new Event("input"),
            nextState: {isOpen: r.getState().isOpen},
            props: n,
            query: r.getState().query,
            refresh: s,
            store: r
        }, o))
    }

    return n.plugins.forEach(function (a) {
        var l;
        return (l = a.subscribe) === null || l === void 0 ? void 0 : l.call(a, Rt(Rt({}, o), {}, {
            refresh: s,
            onSelect: function (c) {
                t.push({onSelect: c})
            },
            onActive: function (c) {
                t.push({onActive: c})
            }
        }))
    }), function (a) {
        var l, c = a.metadata, u = a.environment;
        if ((l = u.navigator) === null || l === void 0 ? void 0 : l.userAgent.includes("Algolia Crawler")) {
            var d = u.document.createElement("meta"), f = u.document.querySelector("head");
            d.name = "algolia:metadata", setTimeout(function () {
                d.content = JSON.stringify(c), f.appendChild(d)
            }, 0)
        }
    }({metadata: Av({plugins: n.plugins, options: e}), environment: n.environment}), Rt(Rt({refresh: s}, i), o)
}

function kv(e) {
    var t = e.translations, n = (t === void 0 ? {} : t).searchByText, r = n === void 0 ? "Search by" : n;
    return b.createElement("a", {
        href: "https://www.algolia.com/docsearch",
        target: "_blank",
        rel: "noopener noreferrer"
    }, b.createElement("span", {className: "DocSearch-Label"}, r), b.createElement("svg", {
        width: "77",
        height: "19"
    }, b.createElement("path", {
        d: "M2.5067 0h14.0245c1.384.001 2.5058 1.1205 2.5068 2.5017V16.5c-.0014 1.3808-1.1232 2.4995-2.5068 2.5H2.5067C1.1232 18.9995.0014 17.8808 0 16.5V2.4958A2.495 2.495 0 01.735.7294 2.505 2.505 0 012.5068 0zM37.95 15.0695c-3.7068.0168-3.7068-2.986-3.7068-3.4634L34.2372.3576 36.498 0v11.1794c0 .2715 0 1.9889 1.452 1.994v1.8961zm-9.1666-1.8388c.694 0 1.2086-.0397 1.5678-.1088v-2.2934a5.3639 5.3639 0 00-1.3303-.1679 4.8283 4.8283 0 00-.758.0582 2.2845 2.2845 0 00-.688.2024c-.2029.0979-.371.2362-.4919.4142-.1268.1788-.185.2826-.185.5533 0 .5297.185.8359.5205 1.0375.3355.2016.7928.3053 1.365.3053v-.0008zm-.1969-8.1817c.7463 0 1.3768.092 1.8856.2767.5088.1838.9195.4428 1.2204.7717.3068.334.5147.7777.6423 1.251.1327.4723.196.991.196 1.5603v5.798c-.5235.1036-1.05.192-1.5787.2649-.7048.1037-1.4976.156-2.3774.156-.5832 0-1.1215-.0582-1.6016-.167a3.385 3.385 0 01-1.2432-.5364 2.6034 2.6034 0 01-.8037-.9565c-.191-.3922-.29-.9447-.29-1.5208 0-.5533.11-.905.3246-1.2863a2.7351 2.7351 0 01.8849-.9329c.376-.242.8029-.415 1.2948-.5187a7.4517 7.4517 0 011.5381-.156 7.1162 7.1162 0 011.6667.2024V8.886c0-.259-.0296-.5061-.093-.7372a1.5847 1.5847 0 00-.3245-.6158 1.5079 1.5079 0 00-.6119-.4158 2.6788 2.6788 0 00-.966-.173c-.5206 0-.9948.0634-1.4283.1384a6.5481 6.5481 0 00-1.065.259l-.2712-1.849c.2831-.0986.7048-.1964 1.2491-.2943a9.2979 9.2979 0 011.752-.1501v.0008zm44.6597 8.1193c.6947 0 1.2086-.0405 1.567-.1097v-2.2942a5.3743 5.3743 0 00-1.3303-.1679c-.2485 0-.503.0177-.7573.0582a2.2853 2.2853 0 00-.688.2024 1.2333 1.2333 0 00-.4918.4142c-.1268.1788-.1843.2826-.1843.5533 0 .5297.1843.8359.5198 1.0375.3414.2066.7927.3053 1.365.3053v.0009zm-.191-8.1767c.7463 0 1.3768.0912 1.8856.2759.5087.1847.9195.4436 1.2204.7717.3.329.5147.7786.6414 1.251a5.7248 5.7248 0 01.197 1.562v5.7972c-.3466.0742-.874.1602-1.5788.2648-.7049.1038-1.4976.1552-2.3774.1552-.5832 0-1.1215-.0573-1.6016-.167a3.385 3.385 0 01-1.2432-.5356 2.6034 2.6034 0 01-.8038-.9565c-.191-.3922-.2898-.9447-.2898-1.5216 0-.5533.1098-.905.3245-1.2854a2.7373 2.7373 0 01.8849-.9338c.376-.2412.8029-.4141 1.2947-.5178a7.4545 7.4545 0 012.325-.1097c.2781.0287.5672.081.879.156v-.3686a2.7781 2.7781 0 00-.092-.738 1.5788 1.5788 0 00-.3246-.6166 1.5079 1.5079 0 00-.612-.415 2.6797 2.6797 0 00-.966-.1729c-.5205 0-.9947.0633-1.4282.1384a6.5608 6.5608 0 00-1.065.259l-.2712-1.8498c.283-.0979.7048-.1957 1.2491-.2935a9.8597 9.8597 0 011.752-.1494zm-6.79-1.072c-.7576.001-1.373-.6103-1.3759-1.3664 0-.755.6128-1.3664 1.376-1.3664.764 0 1.3775.6115 1.3775 1.3664s-.6195 1.3664-1.3776 1.3664zm1.1393 11.1507h-2.2726V5.3409l2.2734-.3568v10.0845l-.0008.0017zm-3.984 0c-3.707.0168-3.707-2.986-3.707-3.4642L59.7069.3576 61.9685 0v11.1794c0 .2715 0 1.9889 1.452 1.994V15.0703zm-7.3512-4.979c0-.975-.2138-1.7873-.6305-2.3516-.4167-.571-.9998-.852-1.747-.852-.7454 0-1.3302.281-1.7452.852-.4166.5702-.6195 1.3765-.6195 2.3516 0 .9851.208 1.6473.6254 2.2183.4158.576.9998.8587 1.7461.8587.7454 0 1.3303-.2885 1.747-.8595.4158-.5761.6237-1.2315.6237-2.2184v.0009zm2.3132-.006c0 .7609-.1099 1.3361-.3356 1.9654a4.654 4.654 0 01-.9533 1.6076A4.214 4.214 0 0155.613 14.69c-.579.2412-1.4697.3795-1.9143.3795-.4462-.005-1.3303-.1324-1.9033-.3795a4.307 4.307 0 01-1.474-1.0316c-.4115-.4445-.7293-.9801-.9609-1.6076a5.3423 5.3423 0 01-.3465-1.9653c0-.7608.104-1.493.3356-2.1155a4.683 4.683 0 01.9719-1.5958 4.3383 4.3383 0 011.479-1.0257c.5739-.242 1.2043-.3567 1.8864-.3567.6829 0 1.3125.1197 1.8906.3567a4.1245 4.1245 0 011.4816 1.0257 4.7587 4.7587 0 01.9592 1.5958c.2426.6225.3643 1.3547.3643 2.1155zm-17.0198 0c0 .9448.208 1.9932.6238 2.431.4166.4386.955.6579 1.6142.6579.3584 0 .6998-.0523 1.0176-.1502.3186-.0978.5721-.2134.775-.3517V7.0784a8.8706 8.8706 0 00-1.4926-.1906c-.8206-.0236-1.4452.312-1.8847.8468-.4335.5365-.6533 1.476-.6533 2.3516v-.0008zm6.2863 4.4485c0 1.5385-.3938 2.662-1.1866 3.3773-.791.7136-2.0005 1.0712-3.6308 1.0712-.5958 0-1.834-.1156-2.8228-.334l.3643-1.7865c.8282.173 1.9202.2193 2.4932.2193.9077 0 1.555-.1847 1.943-.5533.388-.3686.578-.916.578-1.643v-.3687a6.8289 6.8289 0 01-.8848.3349c-.3634.1096-.786.167-1.261.167-.6246 0-1.1917-.0979-1.7055-.2944a3.5554 3.5554 0 01-1.3244-.8645c-.3642-.3796-.6541-.8579-.8561-1.4289-.2028-.571-.3068-1.59-.3068-2.339 0-.7034.1099-1.5856.3245-2.1735.2198-.5871.5316-1.0949.9542-1.515.4167-.42.9255-.743 1.5213-.98a5.5923 5.5923 0 012.052-.3855c.7353 0 1.4114.092 2.0707.2024.6592.1088 1.2204.2236 1.6776.35v8.945-.0008zM11.5026 4.2418v-.6511c-.0005-.4553-.3704-.8241-.8266-.8241H8.749c-.4561 0-.826.3688-.8265.824v.669c0 .0742.0693.1264.1445.1096a6.0346 6.0346 0 011.6768-.2362 6.125 6.125 0 011.6202.2185.1116.1116 0 00.1386-.1097zm-5.2806.852l-.3296-.3282a.8266.8266 0 00-1.168 0l-.393.3922a.8199.8199 0 000 1.164l.3237.323c.0524.0515.1268.0397.1733-.0117.191-.259.3989-.507.6305-.7372.2374-.2362.48-.4437.7462-.6335.0575-.0354.0634-.1155.017-.1687zm3.5159 2.069v2.818c0 .081.0879.1392.1622.0987l2.5102-1.2964c.0574-.0287.0752-.0987.0464-.1552a3.1237 3.1237 0 00-2.603-1.574c-.0575 0-.115.0456-.115.1097l-.0008-.0009zm.0008 6.789c-2.0933.0005-3.7915-1.6912-3.7947-3.7804C5.9468 8.0821 7.6452 6.39 9.7387 6.391c2.0932-.0005 3.7911 1.6914 3.794 3.7804a3.7783 3.7783 0 01-1.1124 2.675 3.7936 3.7936 0 01-2.6824 1.1054h.0008zM9.738 4.8002c-1.9218 0-3.6975 1.0232-4.6584 2.6841a5.359 5.359 0 000 5.3683c.9609 1.661 2.7366 2.6841 4.6584 2.6841a5.3891 5.3891 0 003.8073-1.5725 5.3675 5.3675 0 001.578-3.7987 5.3574 5.3574 0 00-1.5771-3.797A5.379 5.379 0 009.7387 4.801l-.0008-.0008z",
        fill: "currentColor",
        fillRule: "evenodd"
    })))
}

function gr(e) {
    return b.createElement("svg", {width: "15", height: "15"}, b.createElement("g", {
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "1.2"
    }, e.children))
}

function Rv(e) {
    var t = e.translations, n = t === void 0 ? {} : t, r = n.selectText, o = r === void 0 ? "to select" : r,
        i = n.navigateText, s = i === void 0 ? "to navigate" : i, a = n.closeText, l = a === void 0 ? "to close" : a,
        c = n.searchByText, u = c === void 0 ? "Search by" : c;
    return b.createElement(b.Fragment, null, b.createElement("div", {className: "DocSearch-Logo"}, b.createElement(kv, {translations: {searchByText: u}})), b.createElement("ul", {className: "DocSearch-Commands"}, b.createElement("li", null, b.createElement("span", {className: "DocSearch-Commands-Key"}, b.createElement(gr, null, b.createElement("path", {d: "M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"}))), b.createElement("span", {className: "DocSearch-Label"}, o)), b.createElement("li", null, b.createElement("span", {className: "DocSearch-Commands-Key"}, b.createElement(gr, null, b.createElement("path", {d: "M7.5 3.5v8M10.5 8.5l-3 3-3-3"}))), b.createElement("span", {className: "DocSearch-Commands-Key"}, b.createElement(gr, null, b.createElement("path", {d: "M7.5 11.5v-8M10.5 6.5l-3-3-3 3"}))), b.createElement("span", {className: "DocSearch-Label"}, s)), b.createElement("li", null, b.createElement("span", {className: "DocSearch-Commands-Key"}, b.createElement(gr, null, b.createElement("path", {d: "M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"}))), b.createElement("span", {className: "DocSearch-Label"}, l))))
}

function Dv(e) {
    var t = e.hit, n = e.children;
    return b.createElement("a", {href: t.url}, n)
}

function Lv() {
    return b.createElement("svg", {
        viewBox: "0 0 38 38",
        stroke: "currentColor",
        strokeOpacity: ".5"
    }, b.createElement("g", {fill: "none", fillRule: "evenodd"}, b.createElement("g", {
        transform: "translate(1 1)",
        strokeWidth: "2"
    }, b.createElement("circle", {
        strokeOpacity: ".3",
        cx: "18",
        cy: "18",
        r: "18"
    }), b.createElement("path", {d: "M36 18c0-9.94-8.06-18-18-18"}, b.createElement("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        from: "0 18 18",
        to: "360 18 18",
        dur: "1s",
        repeatCount: "indefinite"
    })))))
}

function Nv() {
    return b.createElement("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 20 20"
    }, b.createElement("g", {
        stroke: "currentColor",
        fill: "none",
        fillRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, b.createElement("path", {d: "M3.18 6.6a8.23 8.23 0 1112.93 9.94h0a8.23 8.23 0 01-11.63 0"}), b.createElement("path", {d: "M6.44 7.25H2.55V3.36M10.45 6v5.6M10.45 11.6L13 13"})))
}

function ni() {
    return b.createElement("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 20 20"
    }, b.createElement("path", {
        d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
        stroke: "currentColor",
        fill: "none",
        fillRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }))
}

function Mv() {
    return b.createElement("svg", {
        className: "DocSearch-Hit-Select-Icon",
        width: "20",
        height: "20",
        viewBox: "0 0 20 20"
    }, b.createElement("g", {
        stroke: "currentColor",
        fill: "none",
        fillRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, b.createElement("path", {d: "M18 3v4c0 2-2 4-4 4H2"}), b.createElement("path", {d: "M8 17l-6-6 6-6"})))
}

var Hv = function () {
    return b.createElement("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 20 20"
    }, b.createElement("path", {
        d: "M17 6v12c0 .52-.2 1-1 1H4c-.7 0-1-.33-1-1V2c0-.55.42-1 1-1h8l5 5zM14 8h-3.13c-.51 0-.87-.34-.87-.87V4",
        stroke: "currentColor",
        fill: "none",
        fillRule: "evenodd",
        strokeLinejoin: "round"
    }))
};

function Fv(e) {
    switch (e.type) {
        case"lvl1":
            return b.createElement(Hv, null);
        case"content":
            return b.createElement(zv, null);
        default:
            return b.createElement(qv, null)
    }
}

function qv() {
    return b.createElement("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 20 20"
    }, b.createElement("path", {
        d: "M13 13h4-4V8H7v5h6v4-4H7V8H3h4V3v5h6V3v5h4-4v5zm-6 0v4-4H3h4z",
        stroke: "currentColor",
        fill: "none",
        fillRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }))
}

function zv() {
    return b.createElement("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 20 20"
    }, b.createElement("path", {
        d: "M17 5H3h14zm0 5H3h14zm0 5H3h14z",
        stroke: "currentColor",
        fill: "none",
        fillRule: "evenodd",
        strokeLinejoin: "round"
    }))
}

function Da() {
    return b.createElement("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 20 20"
    }, b.createElement("path", {
        d: "M10 14.2L5 17l1-5.6-4-4 5.5-.7 2.5-5 2.5 5 5.6.8-4 4 .9 5.5z",
        stroke: "currentColor",
        fill: "none",
        fillRule: "evenodd",
        strokeLinejoin: "round"
    }))
}

function Bv() {
    return b.createElement("svg", {
        width: "40",
        height: "40",
        viewBox: "0 0 20 20",
        fill: "none",
        fillRule: "evenodd",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, b.createElement("path", {d: "M19 4.8a16 16 0 00-2-1.2m-3.3-1.2A16 16 0 001.1 4.7M16.7 8a12 12 0 00-2.8-1.4M10 6a12 12 0 00-6.7 2M12.3 14.7a4 4 0 00-4.5 0M14.5 11.4A8 8 0 0010 10M3 16L18 2M10 18h0"}))
}

function $v() {
    return b.createElement("svg", {
        width: "40",
        height: "40",
        viewBox: "0 0 20 20",
        fill: "none",
        fillRule: "evenodd",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, b.createElement("path", {d: "M15.5 4.8c2 3 1.7 7-1 9.7h0l4.3 4.3-4.3-4.3a7.8 7.8 0 01-9.8 1m-2.2-2.2A7.8 7.8 0 0113.2 2.4M2 18L18 2"}))
}

function Uv(e) {
    var t = e.translations, n = t === void 0 ? {} : t, r = n.titleText,
        o = r === void 0 ? "Unable to fetch results" : r, i = n.helpText,
        s = i === void 0 ? "You might want to check your network connection." : i;
    return b.createElement("div", {className: "DocSearch-ErrorScreen"}, b.createElement("div", {className: "DocSearch-Screen-Icon"}, b.createElement(Bv, null)), b.createElement("p", {className: "DocSearch-Title"}, o), b.createElement("p", {className: "DocSearch-Help"}, s))
}

var Vv = ["translations"];

function Kv(e) {
    return function (t) {
        if (Array.isArray(t)) return Po(t)
    }(e) || function (t) {
        if (typeof Symbol != "undefined" && Symbol.iterator in Object(t)) return Array.from(t)
    }(e) || function (t, n) {
        if (!!t) {
            if (typeof t == "string") return Po(t, n);
            var r = Object.prototype.toString.call(t).slice(8, -1);
            if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set") return Array.from(t);
            if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Po(t, n)
        }
    }(e) || function () {
        throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
    }()
}

function Po(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r
}

function Wv(e, t) {
    if (e == null) return {};
    var n, r, o = function (s, a) {
        if (s == null) return {};
        var l, c, u = {}, d = Object.keys(s);
        for (c = 0; c < d.length; c++) l = d[c], a.indexOf(l) >= 0 || (u[l] = s[l]);
        return u
    }(e, t);
    if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);
        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
    }
    return o
}

function Jv(e) {
    var t = e.translations, n = t === void 0 ? {} : t, r = Wv(e, Vv), o = n.noResultsText,
        i = o === void 0 ? "No results for" : o, s = n.suggestedQueryText, a = s === void 0 ? "Try searching for" : s,
        l = n.openIssueText, c = l === void 0 ? "Believe this query should return results?" : l,
        u = n.openIssueLinkText, d = u === void 0 ? "Let us know" : u, f = r.state.context.searchSuggestions;
    return b.createElement("div", {className: "DocSearch-NoResults"}, b.createElement("div", {className: "DocSearch-Screen-Icon"}, b.createElement($v, null)), b.createElement("p", {className: "DocSearch-Title"}, i, ' "', b.createElement("strong", null, r.state.query), '"'), f && f.length > 0 && b.createElement("div", {className: "DocSearch-NoResults-Prefill-List"}, b.createElement("p", {className: "DocSearch-Help"}, a, ":"), b.createElement("ul", null, f.slice(0, 3).reduce(function (h, m) {
        return [].concat(Kv(h), [b.createElement("li", {key: m}, b.createElement("button", {
            className: "DocSearch-Prefill",
            key: m,
            type: "button",
            onClick: function () {
                r.setQuery(m.toLowerCase() + " "), r.refresh(), r.inputRef.current.focus()
            }
        }, m))])
    }, []))), b.createElement("p", {className: "DocSearch-Help"}, "".concat(c, " "), b.createElement("a", {
        href: "https://github.com/algolia/docsearch-configs/issues/new?template=Missing_results.md&title=[".concat(r.indexName, ']+Missing+results+for+query+"').concat(r.state.query, '"'),
        target: "_blank",
        rel: "noopener noreferrer"
    }, d), "."))
}

var Qv = ["hit", "attribute", "tagName"];

function La(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (o) {
            return Object.getOwnPropertyDescriptor(e, o).enumerable
        })), n.push.apply(n, r)
    }
    return n
}

function Na(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t] != null ? arguments[t] : {};
        t % 2 ? La(Object(n), !0).forEach(function (r) {
            Yv(e, r, n[r])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : La(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
        })
    }
    return e
}

function Yv(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

function Gv(e, t) {
    if (e == null) return {};
    var n, r, o = function (s, a) {
        if (s == null) return {};
        var l, c, u = {}, d = Object.keys(s);
        for (c = 0; c < d.length; c++) l = d[c], a.indexOf(l) >= 0 || (u[l] = s[l]);
        return u
    }(e, t);
    if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);
        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
    }
    return o
}

function Ma(e, t) {
    return t.split(".").reduce(function (n, r) {
        return n != null && n[r] ? n[r] : null
    }, e)
}

function Yt(e) {
    var t = e.hit, n = e.attribute, r = e.tagName;
    return it(r === void 0 ? "span" : r, Na(Na({}, Gv(e, Qv)), {}, {dangerouslySetInnerHTML: {__html: Ma(t, "_snippetResult.".concat(n, ".value")) || Ma(t, n)}}))
}

function Ha(e, t) {
    return function (n) {
        if (Array.isArray(n)) return n
    }(e) || function (n, r) {
        if (!(typeof Symbol == "undefined" || !(Symbol.iterator in Object(n)))) {
            var o = [], i = !0, s = !1, a = void 0;
            try {
                for (var l, c = n[Symbol.iterator](); !(i = (l = c.next()).done) && (o.push(l.value), !r || o.length !== r); i = !0) ;
            } catch (u) {
                s = !0, a = u
            } finally {
                try {
                    i || c.return == null || c.return()
                } finally {
                    if (s) throw a
                }
            }
            return o
        }
    }(e, t) || function (n, r) {
        if (!!n) {
            if (typeof n == "string") return Fa(n, r);
            var o = Object.prototype.toString.call(n).slice(8, -1);
            if (o === "Object" && n.constructor && (o = n.constructor.name), o === "Map" || o === "Set") return Array.from(n);
            if (o === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)) return Fa(n, r)
        }
    }(e, t) || function () {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
    }()
}

function Fa(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r
}

function Br() {
    return Br = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }, Br.apply(this, arguments)
}

function ri(e) {
    return e.collection && e.collection.items.length !== 0 ? b.createElement("section", {className: "DocSearch-Hits"}, b.createElement("div", {className: "DocSearch-Hit-source"}, e.title), b.createElement("ul", e.getListProps(), e.collection.items.map(function (t, n) {
        return b.createElement(Zv, Br({key: [e.title, t.objectID].join(":"), item: t, index: n}, e))
    }))) : null
}

function Zv(e) {
    var t = e.item, n = e.index, r = e.renderIcon, o = e.renderAction, i = e.getItemProps, s = e.onItemClick,
        a = e.collection, l = e.hitComponent, c = Ha(b.useState(!1), 2), u = c[0], d = c[1], f = Ha(b.useState(!1), 2),
        h = f[0], m = f[1], g = b.useRef(null), v = l;
    return b.createElement("li", Br({
        className: ["DocSearch-Hit", t.__docsearch_parent && "DocSearch-Hit--Child", u && "DocSearch-Hit--deleting", h && "DocSearch-Hit--favoriting"].filter(Boolean).join(" "),
        onTransitionEnd: function () {
            g.current && g.current()
        }
    }, i({
        item: t, source: a.source, onClick: function () {
            s(t)
        }
    })), b.createElement(v, {hit: t}, b.createElement("div", {className: "DocSearch-Hit-Container"}, r({
        item: t,
        index: n
    }), t.hierarchy[t.type] && t.type === "lvl1" && b.createElement("div", {className: "DocSearch-Hit-content-wrapper"}, b.createElement(Yt, {
        className: "DocSearch-Hit-title",
        hit: t,
        attribute: "hierarchy.lvl1"
    }), t.content && b.createElement(Yt, {
        className: "DocSearch-Hit-path",
        hit: t,
        attribute: "content"
    })), t.hierarchy[t.type] && (t.type === "lvl2" || t.type === "lvl3" || t.type === "lvl4" || t.type === "lvl5" || t.type === "lvl6") && b.createElement("div", {className: "DocSearch-Hit-content-wrapper"}, b.createElement(Yt, {
        className: "DocSearch-Hit-title",
        hit: t,
        attribute: "hierarchy.".concat(t.type)
    }), b.createElement(Yt, {
        className: "DocSearch-Hit-path",
        hit: t,
        attribute: "hierarchy.lvl1"
    })), t.type === "content" && b.createElement("div", {className: "DocSearch-Hit-content-wrapper"}, b.createElement(Yt, {
        className: "DocSearch-Hit-title",
        hit: t,
        attribute: "content"
    }), b.createElement(Yt, {className: "DocSearch-Hit-path", hit: t, attribute: "hierarchy.lvl1"})), o({
        item: t,
        runDeleteTransition: function (_) {
            d(!0), g.current = _
        },
        runFavoriteTransition: function (_) {
            m(!0), g.current = _
        }
    }))))
}

function qa(e, t) {
    return e.reduce(function (n, r) {
        var o = t(r);
        return n.hasOwnProperty(o) || (n[o] = []), n[o].length < 5 && n[o].push(r), n
    }, {})
}

function za(e) {
    return e
}

function Xv() {
}

var iu = /(<mark>|<\/mark>)/g, eg = RegExp(iu.source);

function su(e) {
    var t, n, r, o, i, s = e;
    if (!s.__docsearch_parent && !e._highlightResult) return e.hierarchy.lvl0;
    var a = ((s.__docsearch_parent ? (t = s.__docsearch_parent) === null || t === void 0 || (n = t._highlightResult) === null || n === void 0 || (r = n.hierarchy) === null || r === void 0 ? void 0 : r.lvl0 : (o = e._highlightResult) === null || o === void 0 || (i = o.hierarchy) === null || i === void 0 ? void 0 : i.lvl0) || {}).value;
    return a && eg.test(a) ? a.replace(iu, "") : a
}

function oi() {
    return oi = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }, oi.apply(this, arguments)
}

function tg(e) {
    return b.createElement("div", {className: "DocSearch-Dropdown-Container"}, e.state.collections.map(function (t) {
        if (t.items.length === 0) return null;
        var n = su(t.items[0]);
        return b.createElement(ri, oi({}, e, {
            key: t.source.sourceId,
            title: n,
            collection: t,
            renderIcon: function (r) {
                var o, i = r.item, s = r.index;
                return b.createElement(b.Fragment, null, i.__docsearch_parent && b.createElement("svg", {
                    className: "DocSearch-Hit-Tree",
                    viewBox: "0 0 24 54"
                }, b.createElement("g", {
                    stroke: "currentColor",
                    fill: "none",
                    fillRule: "evenodd",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                }, i.__docsearch_parent !== ((o = t.items[s + 1]) === null || o === void 0 ? void 0 : o.__docsearch_parent) ? b.createElement("path", {d: "M8 6v21M20 27H8.3"}) : b.createElement("path", {d: "M8 6v42M20 27H8.3"}))), b.createElement("div", {className: "DocSearch-Hit-icon"}, b.createElement(Fv, {type: i.type})))
            },
            renderAction: function () {
                return b.createElement("div", {className: "DocSearch-Hit-action"}, b.createElement(Mv, null))
            }
        }))
    }), e.resultsFooterComponent && b.createElement("section", {className: "DocSearch-HitsFooter"}, b.createElement(e.resultsFooterComponent, {state: e.state})))
}

var ng = ["translations"];

function $r() {
    return $r = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }, $r.apply(this, arguments)
}

function rg(e, t) {
    if (e == null) return {};
    var n, r, o = function (s, a) {
        if (s == null) return {};
        var l, c, u = {}, d = Object.keys(s);
        for (c = 0; c < d.length; c++) l = d[c], a.indexOf(l) >= 0 || (u[l] = s[l]);
        return u
    }(e, t);
    if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);
        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
    }
    return o
}

function og(e) {
    var t = e.translations, n = t === void 0 ? {} : t, r = rg(e, ng), o = n.recentSearchesTitle,
        i = o === void 0 ? "Recent" : o, s = n.noRecentSearchesText, a = s === void 0 ? "No recent searches" : s,
        l = n.saveRecentSearchButtonTitle, c = l === void 0 ? "Save this search" : l,
        u = n.removeRecentSearchButtonTitle, d = u === void 0 ? "Remove this search from history" : u,
        f = n.favoriteSearchesTitle, h = f === void 0 ? "Favorite" : f, m = n.removeFavoriteSearchButtonTitle,
        g = m === void 0 ? "Remove this search from favorites" : m;
    return r.state.status === "idle" && r.hasCollections === !1 ? r.disableUserPersonalization ? null : b.createElement("div", {className: "DocSearch-StartScreen"}, b.createElement("p", {className: "DocSearch-Help"}, a)) : r.hasCollections === !1 ? null : b.createElement("div", {className: "DocSearch-Dropdown-Container"}, b.createElement(ri, $r({}, r, {
        title: i,
        collection: r.state.collections[0],
        renderIcon: function () {
            return b.createElement("div", {className: "DocSearch-Hit-icon"}, b.createElement(Nv, null))
        },
        renderAction: function (v) {
            var _ = v.item, E = v.runFavoriteTransition, O = v.runDeleteTransition;
            return b.createElement(b.Fragment, null, b.createElement("div", {className: "DocSearch-Hit-action"}, b.createElement("button", {
                className: "DocSearch-Hit-action-button",
                title: c,
                type: "submit",
                onClick: function (S) {
                    S.preventDefault(), S.stopPropagation(), E(function () {
                        r.favoriteSearches.add(_), r.recentSearches.remove(_), r.refresh()
                    })
                }
            }, b.createElement(Da, null))), b.createElement("div", {className: "DocSearch-Hit-action"}, b.createElement("button", {
                className: "DocSearch-Hit-action-button",
                title: d,
                type: "submit",
                onClick: function (S) {
                    S.preventDefault(), S.stopPropagation(), O(function () {
                        r.recentSearches.remove(_), r.refresh()
                    })
                }
            }, b.createElement(ni, null))))
        }
    })), b.createElement(ri, $r({}, r, {
        title: h, collection: r.state.collections[1], renderIcon: function () {
            return b.createElement("div", {className: "DocSearch-Hit-icon"}, b.createElement(Da, null))
        }, renderAction: function (v) {
            var _ = v.item, E = v.runDeleteTransition;
            return b.createElement("div", {className: "DocSearch-Hit-action"}, b.createElement("button", {
                className: "DocSearch-Hit-action-button",
                title: g,
                type: "submit",
                onClick: function (O) {
                    O.preventDefault(), O.stopPropagation(), E(function () {
                        r.favoriteSearches.remove(_), r.refresh()
                    })
                }
            }, b.createElement(ni, null)))
        }
    })))
}

var ig = ["translations"];

function Ur() {
    return Ur = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }, Ur.apply(this, arguments)
}

function sg(e, t) {
    if (e == null) return {};
    var n, r, o = function (s, a) {
        if (s == null) return {};
        var l, c, u = {}, d = Object.keys(s);
        for (c = 0; c < d.length; c++) l = d[c], a.indexOf(l) >= 0 || (u[l] = s[l]);
        return u
    }(e, t);
    if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);
        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
    }
    return o
}

var ag = b.memo(function (e) {
    var t = e.translations, n = t === void 0 ? {} : t, r = sg(e, ig);
    if (r.state.status === "error") return b.createElement(Uv, {translations: n == null ? void 0 : n.errorScreen});
    var o = r.state.collections.some(function (i) {
        return i.items.length > 0
    });
    return r.state.query ? o === !1 ? b.createElement(Jv, Ur({}, r, {translations: n == null ? void 0 : n.noResultsScreen})) : b.createElement(tg, r) : b.createElement(og, Ur({}, r, {
        hasCollections: o,
        translations: n == null ? void 0 : n.startScreen
    }))
}, function (e, t) {
    return t.state.status === "loading" || t.state.status === "stalled"
}), lg = ["translations"];

function Vr() {
    return Vr = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }, Vr.apply(this, arguments)
}

function cg(e, t) {
    if (e == null) return {};
    var n, r, o = function (s, a) {
        if (s == null) return {};
        var l, c, u = {}, d = Object.keys(s);
        for (c = 0; c < d.length; c++) l = d[c], a.indexOf(l) >= 0 || (u[l] = s[l]);
        return u
    }(e, t);
    if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);
        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
    }
    return o
}

function ug(e) {
    var t = e.translations, n = t === void 0 ? {} : t, r = cg(e, lg), o = n.resetButtonTitle,
        i = o === void 0 ? "Clear the query" : o, s = n.resetButtonAriaLabel, a = s === void 0 ? "Clear the query" : s,
        l = n.cancelButtonText, c = l === void 0 ? "Cancel" : l, u = n.cancelButtonAriaLabel,
        d = u === void 0 ? "Cancel" : u, f = r.getFormProps({inputElement: r.inputRef.current}).onReset;
    return b.useEffect(function () {
        r.autoFocus && r.inputRef.current && r.inputRef.current.focus()
    }, [r.autoFocus, r.inputRef]), b.useEffect(function () {
        r.isFromSelection && r.inputRef.current && r.inputRef.current.select()
    }, [r.isFromSelection, r.inputRef]), b.createElement(b.Fragment, null, b.createElement("form", {
        className: "DocSearch-Form",
        onSubmit: function (h) {
            h.preventDefault()
        },
        onReset: f
    }, b.createElement("label", Vr({className: "DocSearch-MagnifierLabel"}, r.getLabelProps()), b.createElement(nu, null)), b.createElement("div", {className: "DocSearch-LoadingIndicator"}, b.createElement(Lv, null)), b.createElement("input", Vr({
        className: "DocSearch-Input",
        ref: r.inputRef
    }, r.getInputProps({
        inputElement: r.inputRef.current,
        autoFocus: r.autoFocus,
        maxLength: 64
    }))), b.createElement("button", {
        type: "reset",
        title: i,
        className: "DocSearch-Reset",
        "aria-label": a,
        hidden: !r.state.query
    }, b.createElement(ni, null))), b.createElement("button", {
        className: "DocSearch-Cancel",
        type: "reset",
        "aria-label": d,
        onClick: r.onClose
    }, c))
}

var fg = ["_highlightResult", "_snippetResult"];

function dg(e, t) {
    if (e == null) return {};
    var n, r, o = function (s, a) {
        if (s == null) return {};
        var l, c, u = {}, d = Object.keys(s);
        for (c = 0; c < d.length; c++) l = d[c], a.indexOf(l) >= 0 || (u[l] = s[l]);
        return u
    }(e, t);
    if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);
        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
    }
    return o
}

function pg(e) {
    return function () {
        var t = "__TEST_KEY__";
        try {
            return localStorage.setItem(t, ""), localStorage.removeItem(t), !0
        } catch {
            return !1
        }
    }() === !1 ? {
        setItem: function () {
        }, getItem: function () {
            return []
        }
    } : {
        setItem: function (t) {
            return window.localStorage.setItem(e, JSON.stringify(t))
        }, getItem: function () {
            var t = window.localStorage.getItem(e);
            return t ? JSON.parse(t) : []
        }
    }
}

function Ba(e) {
    var t = e.key, n = e.limit, r = n === void 0 ? 5 : n, o = pg(t), i = o.getItem().slice(0, r);
    return {
        add: function (s) {
            var a = s, l = (a._highlightResult, a._snippetResult, dg(a, fg)), c = i.findIndex(function (u) {
                return u.objectID === l.objectID
            });
            c > -1 && i.splice(c, 1), i.unshift(l), i = i.slice(0, r), o.setItem(i)
        }, remove: function (s) {
            i = i.filter(function (a) {
                return a.objectID !== s.objectID
            }), o.setItem(i)
        }, getAll: function () {
            return i
        }
    }
}

var mg = ["facetName", "facetQuery"];

function hg(e) {
    var t, n = "algoliasearch-client-js-".concat(e.key), r = function () {
        return t === void 0 && (t = e.localStorage || window.localStorage), t
    }, o = function () {
        return JSON.parse(r().getItem(n) || "{}")
    };
    return {
        get: function (i, s) {
            var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
                miss: function () {
                    return Promise.resolve()
                }
            };
            return Promise.resolve().then(function () {
                var l = JSON.stringify(i), c = o()[l];
                return Promise.all([c || s(), c !== void 0])
            }).then(function (l) {
                var c = Hr(l, 2), u = c[0], d = c[1];
                return Promise.all([u, d || a.miss(u)])
            }).then(function (l) {
                return Hr(l, 1)[0]
            })
        }, set: function (i, s) {
            return Promise.resolve().then(function () {
                var a = o();
                return a[JSON.stringify(i)] = s, r().setItem(n, JSON.stringify(a)), s
            })
        }, delete: function (i) {
            return Promise.resolve().then(function () {
                var s = o();
                delete s[JSON.stringify(i)], r().setItem(n, JSON.stringify(s))
            })
        }, clear: function () {
            return Promise.resolve().then(function () {
                r().removeItem(n)
            })
        }
    }
}

function jn(e) {
    var t = Fr(e.caches), n = t.shift();
    return n === void 0 ? {
        get: function (r, o) {
            var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
                miss: function () {
                    return Promise.resolve()
                }
            };
            return o().then(function (s) {
                return Promise.all([s, i.miss(s)])
            }).then(function (s) {
                return Hr(s, 1)[0]
            })
        }, set: function (r, o) {
            return Promise.resolve(o)
        }, delete: function (r) {
            return Promise.resolve()
        }, clear: function () {
            return Promise.resolve()
        }
    } : {
        get: function (r, o) {
            var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
                miss: function () {
                    return Promise.resolve()
                }
            };
            return n.get(r, o, i).catch(function () {
                return jn({caches: t}).get(r, o, i)
            })
        }, set: function (r, o) {
            return n.set(r, o).catch(function () {
                return jn({caches: t}).set(r, o)
            })
        }, delete: function (r) {
            return n.delete(r).catch(function () {
                return jn({caches: t}).delete(r)
            })
        }, clear: function () {
            return n.clear().catch(function () {
                return jn({caches: t}).clear()
            })
        }
    }
}

function Co() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {serializable: !0}, t = {};
    return {
        get: function (n, r) {
            var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
                miss: function () {
                    return Promise.resolve()
                }
            }, i = JSON.stringify(n);
            if (i in t) return Promise.resolve(e.serializable ? JSON.parse(t[i]) : t[i]);
            var s = r(), a = o && o.miss || function () {
                return Promise.resolve()
            };
            return s.then(function (l) {
                return a(l)
            }).then(function () {
                return s
            })
        }, set: function (n, r) {
            return t[JSON.stringify(n)] = e.serializable ? JSON.stringify(r) : r, Promise.resolve(r)
        }, delete: function (n) {
            return delete t[JSON.stringify(n)], Promise.resolve()
        }, clear: function () {
            return t = {}, Promise.resolve()
        }
    }
}

function vg(e) {
    for (var t = e.length - 1; t > 0; t--) {
        var n = Math.floor(Math.random() * (t + 1)), r = e[t];
        e[t] = e[n], e[n] = r
    }
    return e
}

function au(e, t) {
    return t && Object.keys(t).forEach(function (n) {
        e[n] = t[n](e)
    }), e
}

function io(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
    var o = 0;
    return e.replace(/%s/g, function () {
        return encodeURIComponent(n[o++])
    })
}

var wr = {WithinQueryParameters: 0, WithinHeaders: 1};

function $a(e, t) {
    var n = e || {}, r = n.data || {};
    return Object.keys(n).forEach(function (o) {
        ["timeout", "headers", "queryParameters", "data", "cacheable"].indexOf(o) === -1 && (r[o] = n[o])
    }), {
        data: Object.entries(r).length > 0 ? r : void 0,
        timeout: n.timeout || t,
        headers: n.headers || {},
        queryParameters: n.queryParameters || {},
        cacheable: n.cacheable
    }
}

var rn = {Read: 1, Write: 2, Any: 3}, lu = 1, gg = 2, cu = 3;

function uu(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : lu;
    return ue(ue({}, e), {}, {status: t, lastUpdate: Date.now()})
}

function fu(e) {
    return typeof e == "string" ? {protocol: "https", url: e, accept: rn.Any} : {
        protocol: e.protocol || "https",
        url: e.url,
        accept: e.accept || rn.Any
    }
}

var Ua = "GET", so = "POST";

function _g(e, t) {
    return Promise.all(t.map(function (n) {
        return e.get(n, function () {
            return Promise.resolve(uu(n))
        })
    })).then(function (n) {
        var r = n.filter(function (s) {
            return function (a) {
                return a.status === lu || Date.now() - a.lastUpdate > 12e4
            }(s)
        }), o = n.filter(function (s) {
            return function (a) {
                return a.status === cu && Date.now() - a.lastUpdate <= 12e4
            }(s)
        }), i = [].concat(Fr(r), Fr(o));
        return {
            getTimeout: function (s, a) {
                return (o.length === 0 && s === 0 ? 1 : o.length + 3 + s) * a
            }, statelessHosts: i.length > 0 ? i.map(function (s) {
                return fu(s)
            }) : t
        }
    })
}

function Va(e, t, n, r) {
    var o = [], i = function (f, h) {
            if (!(f.method === Ua || f.data === void 0 && h.data === void 0)) {
                var m = Array.isArray(f.data) ? f.data : ue(ue({}, f.data), h.data);
                return JSON.stringify(m)
            }
        }(n, r), s = function (f, h) {
            var m = ue(ue({}, f.headers), h.headers), g = {};
            return Object.keys(m).forEach(function (v) {
                var _ = m[v];
                g[v.toLowerCase()] = _
            }), g
        }(e, r), a = n.method, l = n.method !== Ua ? {} : ue(ue({}, n.data), r.data),
        c = ue(ue(ue({"x-algolia-agent": e.userAgent.value}, e.queryParameters), l), r.queryParameters), u = 0,
        d = function f(h, m) {
            var g = h.pop();
            if (g === void 0) throw{
                name: "RetryError",
                message: "Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.",
                transporterStackTrace: Ka(o)
            };
            var v = {
                data: i,
                headers: s,
                method: a,
                url: bg(g, n.path, c),
                connectTimeout: m(u, e.timeouts.connect),
                responseTimeout: m(u, r.timeout)
            }, _ = function (O) {
                var S = {request: v, response: O, host: g, triesLeft: h.length};
                return o.push(S), S
            }, E = {
                onSucess: function (O) {
                    return function (S) {
                        try {
                            return JSON.parse(S.content)
                        } catch (x) {
                            throw function (L, A) {
                                return {name: "DeserializationError", message: L, response: A}
                            }(x.message, S)
                        }
                    }(O)
                }, onRetry: function (O) {
                    var S = _(O);
                    return O.isTimedOut && u++, Promise.all([e.logger.info("Retryable failure", pu(S)), e.hostsCache.set(g, uu(g, O.isTimedOut ? cu : gg))]).then(function () {
                        return f(h, m)
                    })
                }, onFail: function (O) {
                    throw _(O), function (S, x) {
                        var L = S.content, A = S.status, P = L;
                        try {
                            P = JSON.parse(L).message
                        } catch {
                        }
                        return function (B, q, U) {
                            return {name: "ApiError", message: B, status: q, transporterStackTrace: U}
                        }(P, A, x)
                    }(O, Ka(o))
                }
            };
            return e.requester.send(v).then(function (O) {
                return function (S, x) {
                    return function (L) {
                        var A = L.status;
                        return L.isTimedOut || function (P) {
                            var B = P.isTimedOut, q = P.status;
                            return !B && ~~q == 0
                        }(L) || ~~(A / 100) != 2 && ~~(A / 100) != 4
                    }(S) ? x.onRetry(S) : ~~(S.status / 100) == 2 ? x.onSucess(S) : x.onFail(S)
                }(O, E)
            })
        };
    return _g(e.hostsCache, t).then(function (f) {
        return d(Fr(f.statelessHosts).reverse(), f.getTimeout)
    })
}

function yg(e) {
    var t = {
        value: "Algolia for JavaScript (".concat(e, ")"), add: function (n) {
            var r = "; ".concat(n.segment).concat(n.version !== void 0 ? " (".concat(n.version, ")") : "");
            return t.value.indexOf(r) === -1 && (t.value = "".concat(t.value).concat(r)), t
        }
    };
    return t
}

function bg(e, t, n) {
    var r = du(n), o = "".concat(e.protocol, "://").concat(e.url, "/").concat(t.charAt(0) === "/" ? t.substr(1) : t);
    return r.length && (o += "?".concat(r)), o
}

function du(e) {
    return Object.keys(e).map(function (t) {
        return io("%s=%s", t, (n = e[t], Object.prototype.toString.call(n) === "[object Object]" || Object.prototype.toString.call(n) === "[object Array]" ? JSON.stringify(e[t]) : e[t]));
        var n
    }).join("&")
}

function Ka(e) {
    return e.map(function (t) {
        return pu(t)
    })
}

function pu(e) {
    var t = e.request.headers["x-algolia-api-key"] ? {"x-algolia-api-key": "*****"} : {};
    return ue(ue({}, e), {}, {request: ue(ue({}, e.request), {}, {headers: ue(ue({}, e.request.headers), t)})})
}

var Eg = function (e) {
    var t = e.appId, n = function (i, s, a) {
        var l = {"x-algolia-api-key": a, "x-algolia-application-id": s};
        return {
            headers: function () {
                return i === wr.WithinHeaders ? l : {}
            }, queryParameters: function () {
                return i === wr.WithinQueryParameters ? l : {}
            }
        }
    }(e.authMode !== void 0 ? e.authMode : wr.WithinHeaders, t, e.apiKey), r = function (i) {
        var s = i.hostsCache, a = i.logger, l = i.requester, c = i.requestsCache, u = i.responsesCache, d = i.timeouts,
            f = i.userAgent, h = i.hosts, m = i.queryParameters, g = {
                hostsCache: s,
                logger: a,
                requester: l,
                requestsCache: c,
                responsesCache: u,
                timeouts: d,
                userAgent: f,
                headers: i.headers,
                queryParameters: m,
                hosts: h.map(function (v) {
                    return fu(v)
                }),
                read: function (v, _) {
                    var E = $a(_, g.timeouts.read), O = function () {
                        return Va(g, g.hosts.filter(function (x) {
                            return (x.accept & rn.Read) != 0
                        }), v, E)
                    };
                    if ((E.cacheable !== void 0 ? E.cacheable : v.cacheable) !== !0) return O();
                    var S = {
                        request: v,
                        mappedRequestOptions: E,
                        transporter: {queryParameters: g.queryParameters, headers: g.headers}
                    };
                    return g.responsesCache.get(S, function () {
                        return g.requestsCache.get(S, function () {
                            return g.requestsCache.set(S, O()).then(function (x) {
                                return Promise.all([g.requestsCache.delete(S), x])
                            }, function (x) {
                                return Promise.all([g.requestsCache.delete(S), Promise.reject(x)])
                            }).then(function (x) {
                                var L = Hr(x, 2);
                                return L[0], L[1]
                            })
                        })
                    }, {
                        miss: function (x) {
                            return g.responsesCache.set(S, x)
                        }
                    })
                },
                write: function (v, _) {
                    return Va(g, g.hosts.filter(function (E) {
                        return (E.accept & rn.Write) != 0
                    }), v, $a(_, g.timeouts.write))
                }
            };
        return g
    }(ue(ue({
        hosts: [{url: "".concat(t, "-dsn.algolia.net"), accept: rn.Read}, {
            url: "".concat(t, ".algolia.net"),
            accept: rn.Write
        }].concat(vg([{url: "".concat(t, "-1.algolianet.com")}, {url: "".concat(t, "-2.algolianet.com")}, {url: "".concat(t, "-3.algolianet.com")}]))
    }, e), {}, {
        headers: ue(ue(ue({}, n.headers()), {"content-type": "application/x-www-form-urlencoded"}), e.headers),
        queryParameters: ue(ue({}, n.queryParameters()), e.queryParameters)
    })), o = {
        transporter: r, appId: t, addAlgoliaAgent: function (i, s) {
            r.userAgent.add({segment: i, version: s})
        }, clearCache: function () {
            return Promise.all([r.requestsCache.clear(), r.responsesCache.clear()]).then(function () {
            })
        }
    };
    return au(o, e.methods)
}, mu = function (e) {
    return function (t) {
        var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
            r = {transporter: e.transporter, appId: e.appId, indexName: t};
        return au(r, n.methods)
    }
}, Wa = function (e) {
    return function (t, n) {
        var r = t.map(function (o) {
            return ue(ue({}, o), {}, {params: du(o.params || {})})
        });
        return e.transporter.read({method: so, path: "1/indexes/*/queries", data: {requests: r}, cacheable: !0}, n)
    }
}, Ja = function (e) {
    return function (t, n) {
        return Promise.all(t.map(function (r) {
            var o = r.params, i = o.facetName, s = o.facetQuery, a = jh(o, mg);
            return mu(e)(r.indexName, {methods: {searchForFacetValues: hu}}).searchForFacetValues(i, s, ue(ue({}, n), a))
        }))
    }
}, Og = function (e) {
    return function (t, n, r) {
        return e.transporter.read({
            method: so,
            path: io("1/answers/%s/prediction", e.indexName),
            data: {query: t, queryLanguages: n},
            cacheable: !0
        }, r)
    }
}, wg = function (e) {
    return function (t, n) {
        return e.transporter.read({
            method: so,
            path: io("1/indexes/%s/query", e.indexName),
            data: {query: t},
            cacheable: !0
        }, n)
    }
}, hu = function (e) {
    return function (t, n, r) {
        return e.transporter.read({
            method: so,
            path: io("1/indexes/%s/facets/%s/query", e.indexName, t),
            data: {facetQuery: n},
            cacheable: !0
        }, r)
    }
}, Sg = 1, Pg = 2, Cg = 3;

function vu(e, t, n) {
    var r, o = {
        appId: e,
        apiKey: t,
        timeouts: {connect: 1, read: 2, write: 30},
        requester: {
            send: function (i) {
                return new Promise(function (s) {
                    var a = new XMLHttpRequest;
                    a.open(i.method, i.url, !0), Object.keys(i.headers).forEach(function (d) {
                        return a.setRequestHeader(d, i.headers[d])
                    });
                    var l, c = function (d, f) {
                        return setTimeout(function () {
                            a.abort(), s({status: 0, content: f, isTimedOut: !0})
                        }, 1e3 * d)
                    }, u = c(i.connectTimeout, "Connection timeout");
                    a.onreadystatechange = function () {
                        a.readyState > a.OPENED && l === void 0 && (clearTimeout(u), l = c(i.responseTimeout, "Socket timeout"))
                    }, a.onerror = function () {
                        a.status === 0 && (clearTimeout(u), clearTimeout(l), s({
                            content: a.responseText || "Network request failed",
                            status: a.status,
                            isTimedOut: !1
                        }))
                    }, a.onload = function () {
                        clearTimeout(u), clearTimeout(l), s({content: a.responseText, status: a.status, isTimedOut: !1})
                    }, a.send(i.data)
                })
            }
        },
        logger: (r = Cg, {
            debug: function (i, s) {
                return Sg >= r && console.debug(i, s), Promise.resolve()
            }, info: function (i, s) {
                return Pg >= r && console.info(i, s), Promise.resolve()
            }, error: function (i, s) {
                return console.error(i, s), Promise.resolve()
            }
        }),
        responsesCache: Co(),
        requestsCache: Co({serializable: !1}),
        hostsCache: jn({caches: [hg({key: "".concat("4.8.5", "-").concat(e)}), Co()]}),
        userAgent: yg("4.8.5").add({segment: "Browser", version: "lite"}),
        authMode: wr.WithinQueryParameters
    };
    return Eg(ue(ue(ue({}, o), n), {}, {
        methods: {
            search: Wa,
            searchForFacetValues: Ja,
            multipleQueries: Wa,
            multipleSearchForFacetValues: Ja,
            initIndex: function (i) {
                return function (s) {
                    return mu(i)(s, {methods: {search: wg, searchForFacetValues: hu, findAnswers: Og}})
                }
            }
        }
    }))
}

vu.version = "4.8.5";
var Ag = ["footer", "searchBox"];

function qn() {
    return qn = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }, qn.apply(this, arguments)
}

function Qa(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (o) {
            return Object.getOwnPropertyDescriptor(e, o).enumerable
        })), n.push.apply(n, r)
    }
    return n
}

function Ao(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t] != null ? arguments[t] : {};
        t % 2 ? Qa(Object(n), !0).forEach(function (r) {
            Ig(e, r, n[r])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Qa(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
        })
    }
    return e
}

function Ig(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

function xg(e, t) {
    return function (n) {
        if (Array.isArray(n)) return n
    }(e) || function (n, r) {
        if (!(typeof Symbol == "undefined" || !(Symbol.iterator in Object(n)))) {
            var o = [], i = !0, s = !1, a = void 0;
            try {
                for (var l, c = n[Symbol.iterator](); !(i = (l = c.next()).done) && (o.push(l.value), !r || o.length !== r); i = !0) ;
            } catch (u) {
                s = !0, a = u
            } finally {
                try {
                    i || c.return == null || c.return()
                } finally {
                    if (s) throw a
                }
            }
            return o
        }
    }(e, t) || function (n, r) {
        if (!!n) {
            if (typeof n == "string") return Ya(n, r);
            var o = Object.prototype.toString.call(n).slice(8, -1);
            if (o === "Object" && n.constructor && (o = n.constructor.name), o === "Map" || o === "Set") return Array.from(n);
            if (o === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)) return Ya(n, r)
        }
    }(e, t) || function () {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
    }()
}

function Ya(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r
}

function jg(e, t) {
    if (e == null) return {};
    var n, r, o = function (s, a) {
        if (s == null) return {};
        var l, c, u = {}, d = Object.keys(s);
        for (c = 0; c < d.length; c++) l = d[c], a.indexOf(l) >= 0 || (u[l] = s[l]);
        return u
    }(e, t);
    if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);
        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
    }
    return o
}

function Tg(e) {
    var t = e.appId, n = t === void 0 ? "BH4D9OD16A" : t, r = e.apiKey, o = e.indexName, i = e.placeholder,
        s = i === void 0 ? "Search docs" : i, a = e.searchParameters, l = e.onClose, c = l === void 0 ? Xv : l,
        u = e.transformItems, d = u === void 0 ? za : u, f = e.hitComponent, h = f === void 0 ? Dv : f,
        m = e.resultsFooterComponent, g = m === void 0 ? function () {
            return null
        } : m, v = e.navigator, _ = e.initialScrollY, E = _ === void 0 ? 0 : _, O = e.transformSearchClient,
        S = O === void 0 ? za : O, x = e.disableUserPersonalization, L = x !== void 0 && x, A = e.initialQuery,
        P = A === void 0 ? "" : A, B = e.translations, q = B === void 0 ? {} : B, U = q.footer, C = q.searchBox,
        F = jg(q, Ag), Q = xg(b.useState({
            query: "",
            collections: [],
            completion: null,
            context: {},
            isOpen: !1,
            activeItemId: null,
            status: "idle"
        }), 2), se = Q[0], W = Q[1], ee = b.useRef(null), te = b.useRef(null), Ee = b.useRef(null), Pe = b.useRef(null),
        Ae = b.useRef(null), we = b.useRef(10),
        Te = b.useRef(typeof window != "undefined" ? window.getSelection().toString().slice(0, 64) : "").current,
        qe = b.useRef(P || Te).current, j = function (p, y, w) {
            return b.useMemo(function () {
                var I = vu(p, y);
                return I.addAlgoliaAgent("docsearch", "3.0.0-alpha.42"), /docsearch.js \(.*\)/.test(I.transporter.userAgent.value) === !1 && I.addAlgoliaAgent("docsearch-react", "3.0.0-alpha.42"), w(I)
            }, [p, y, w])
        }(n, r, S), z = b.useRef(Ba({key: "__DOCSEARCH_FAVORITE_SEARCHES__".concat(o), limit: 10})).current,
        N = b.useRef(Ba({
            key: "__DOCSEARCH_RECENT_SEARCHES__".concat(o),
            limit: z.getAll().length === 0 ? 7 : 4
        })).current, $ = b.useCallback(function (p) {
            if (!L) {
                var y = p.type === "content" ? p.__docsearch_parent : p;
                y && z.getAll().findIndex(function (w) {
                    return w.objectID === y.objectID
                }) === -1 && N.add(y)
            }
        }, [z, N, L]), le = b.useMemo(function () {
            return Tv({
                id: "docsearch",
                defaultActiveItemId: 0,
                placeholder: s,
                openOnFocus: !0,
                initialState: {query: qe, context: {searchSuggestions: []}},
                navigator: v,
                onStateChange: function (p) {
                    W(p.state)
                },
                getSources: function (p) {
                    var y = p.query, w = p.state, I = p.setContext, T = p.setStatus;
                    return y ? j.search([{
                        query: y,
                        indexName: o,
                        params: Ao({
                            attributesToRetrieve: ["hierarchy.lvl0", "hierarchy.lvl1", "hierarchy.lvl2", "hierarchy.lvl3", "hierarchy.lvl4", "hierarchy.lvl5", "hierarchy.lvl6", "content", "type", "url"],
                            attributesToSnippet: ["hierarchy.lvl1:".concat(we.current), "hierarchy.lvl2:".concat(we.current), "hierarchy.lvl3:".concat(we.current), "hierarchy.lvl4:".concat(we.current), "hierarchy.lvl5:".concat(we.current), "hierarchy.lvl6:".concat(we.current), "content:".concat(we.current)],
                            snippetEllipsisText: "\u2026",
                            highlightPreTag: "<mark>",
                            highlightPostTag: "</mark>",
                            hitsPerPage: 20
                        }, a)
                    }]).catch(function (k) {
                        throw k.name === "RetryError" && T("error"), k
                    }).then(function (k) {
                        var M = k.results[0], R = M.hits, H = M.nbHits, D = qa(R, function (J) {
                            return su(J)
                        });
                        return w.context.searchSuggestions.length < Object.keys(D).length && I({searchSuggestions: Object.keys(D)}), I({nbHits: H}), Object.values(D).map(function (J, K) {
                            return {
                                sourceId: "hits".concat(K), onSelect: function (V) {
                                    var G = V.item, ie = V.event;
                                    $(G), ie.shiftKey || ie.ctrlKey || ie.metaKey || c()
                                }, getItemUrl: function (V) {
                                    return V.item.url
                                }, getItems: function () {
                                    return Object.values(qa(J, function (V) {
                                        return V.hierarchy.lvl1
                                    })).map(d).map(function (V) {
                                        return V.map(function (G) {
                                            return Ao(Ao({}, G), {}, {
                                                __docsearch_parent: G.type !== "lvl1" && V.find(function (ie) {
                                                    return ie.type === "lvl1" && ie.hierarchy.lvl1 === G.hierarchy.lvl1
                                                })
                                            })
                                        })
                                    }).flat()
                                }
                            }
                        })
                    }) : L ? [] : [{
                        sourceId: "recentSearches", onSelect: function (k) {
                            var M = k.item, R = k.event;
                            $(M), R.shiftKey || R.ctrlKey || R.metaKey || c()
                        }, getItemUrl: function (k) {
                            return k.item.url
                        }, getItems: function () {
                            return N.getAll()
                        }
                    }, {
                        sourceId: "favoriteSearches", onSelect: function (k) {
                            var M = k.item, R = k.event;
                            $(M), R.shiftKey || R.ctrlKey || R.metaKey || c()
                        }, getItemUrl: function (k) {
                            return k.item.url
                        }, getItems: function () {
                            return z.getAll()
                        }
                    }]
                }
            })
        }, [o, a, j, c, N, z, $, qe, s, v, d, L]), de = le.getEnvironmentProps, ne = le.getRootProps, X = le.refresh;
    return function (p) {
        var y = p.getEnvironmentProps, w = p.panelElement, I = p.formElement, T = p.inputElement;
        b.useEffect(function () {
            if (w && I && T) {
                var k = y({panelElement: w, formElement: I, inputElement: T}), M = k.onTouchStart, R = k.onTouchMove;
                return window.addEventListener("touchstart", M), window.addEventListener("touchmove", R), function () {
                    window.removeEventListener("touchstart", M), window.removeEventListener("touchmove", R)
                }
            }
        }, [y, w, I, T])
    }({
        getEnvironmentProps: de,
        panelElement: Pe.current,
        formElement: Ee.current,
        inputElement: Ae.current
    }), function (p) {
        var y = p.container;
        b.useEffect(function () {
            if (y) {
                var w = y.querySelectorAll("a[href]:not([disabled]), button:not([disabled]), input:not([disabled])"),
                    I = w[0], T = w[w.length - 1];
                return y.addEventListener("keydown", k), function () {
                    y.removeEventListener("keydown", k)
                }
            }

            function k(M) {
                M.key === "Tab" && (M.shiftKey ? document.activeElement === I && (M.preventDefault(), T.focus()) : document.activeElement === T && (M.preventDefault(), I.focus()))
            }
        }, [y])
    }({container: ee.current}), b.useEffect(function () {
        return document.body.classList.add("DocSearch--active"), function () {
            var p, y;
            document.body.classList.remove("DocSearch--active"), (p = (y = window).scrollTo) === null || p === void 0 || p.call(y, 0, E)
        }
    }, []), b.useEffect(function () {
        window.matchMedia("(max-width: 750px)").matches && (we.current = 5)
    }, []), b.useEffect(function () {
        Pe.current && (Pe.current.scrollTop = 0)
    }, [se.query]), b.useEffect(function () {
        qe.length > 0 && (X(), Ae.current && Ae.current.focus())
    }, [qe, X]), b.useEffect(function () {
        function p() {
            if (te.current) {
                var y = .01 * window.innerHeight;
                te.current.style.setProperty("--docsearch-vh", "".concat(y, "px"))
            }
        }

        return p(), window.addEventListener("resize", p), function () {
            window.removeEventListener("resize", p)
        }
    }, []), b.createElement("div", qn({ref: ee}, ne({"aria-expanded": !0}), {
        className: ["DocSearch", "DocSearch-Container", se.status === "stalled" && "DocSearch-Container--Stalled", se.status === "error" && "DocSearch-Container--Errored"].filter(Boolean).join(" "),
        role: "button",
        tabIndex: 0,
        onMouseDown: function (p) {
            p.target === p.currentTarget && c()
        }
    }), b.createElement("div", {
        className: "DocSearch-Modal",
        ref: te
    }, b.createElement("header", {className: "DocSearch-SearchBar", ref: Ee}, b.createElement(ug, qn({}, le, {
        state: se,
        autoFocus: qe.length === 0,
        inputRef: Ae,
        isFromSelection: Boolean(qe) && qe === Te,
        translations: C,
        onClose: c
    }))), b.createElement("div", {
        className: "DocSearch-Dropdown",
        ref: Pe
    }, b.createElement(ag, qn({}, le, {
        indexName: o,
        state: se,
        hitComponent: h,
        resultsFooterComponent: g,
        disableUserPersonalization: L,
        recentSearches: N,
        favoriteSearches: z,
        inputRef: Ae,
        translations: F,
        onItemClick: function (p) {
            $(p), c()
        }
    }))), b.createElement("footer", {className: "DocSearch-Footer"}, b.createElement(Rv, {translations: U}))))
}

function ii() {
    return ii = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }, ii.apply(this, arguments)
}

function Ga(e, t) {
    return function (n) {
        if (Array.isArray(n)) return n
    }(e) || function (n, r) {
        if (!(typeof Symbol == "undefined" || !(Symbol.iterator in Object(n)))) {
            var o = [], i = !0, s = !1, a = void 0;
            try {
                for (var l, c = n[Symbol.iterator](); !(i = (l = c.next()).done) && (o.push(l.value), !r || o.length !== r); i = !0) ;
            } catch (u) {
                s = !0, a = u
            } finally {
                try {
                    i || c.return == null || c.return()
                } finally {
                    if (s) throw a
                }
            }
            return o
        }
    }(e, t) || function (n, r) {
        if (!!n) {
            if (typeof n == "string") return Za(n, r);
            var o = Object.prototype.toString.call(n).slice(8, -1);
            if (o === "Object" && n.constructor && (o = n.constructor.name), o === "Map" || o === "Set") return Array.from(n);
            if (o === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)) return Za(n, r)
        }
    }(e, t) || function () {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
    }()
}

function Za(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r
}

function kg(e) {
    var t, n, r = b.useRef(null), o = Ga(b.useState(!1), 2), i = o[0], s = o[1],
        a = Ga(b.useState((e == null ? void 0 : e.initialQuery) || void 0), 2), l = a[0], c = a[1],
        u = b.useCallback(function () {
            s(!0)
        }, [s]), d = b.useCallback(function () {
            s(!1)
        }, [s]);
    return function (f) {
        var h = f.isOpen, m = f.onOpen, g = f.onClose, v = f.onInput, _ = f.searchButtonRef;
        b.useEffect(function () {
            function E(O) {
                (O.keyCode === 27 && h || O.key === "k" && (O.metaKey || O.ctrlKey) || !function (S) {
                    var x = S.target, L = x.tagName;
                    return x.isContentEditable || L === "INPUT" || L === "SELECT" || L === "TEXTAREA"
                }(O) && O.key === "/" && !h) && (O.preventDefault(), h ? g() : document.body.classList.contains("DocSearch--active") || document.body.classList.contains("DocSearch--active") || m()), _ && _.current === document.activeElement && v && /[a-zA-Z0-9]/.test(String.fromCharCode(O.keyCode)) && v(O)
            }

            return window.addEventListener("keydown", E), function () {
                window.removeEventListener("keydown", E)
            }
        }, [h, m, g, v, _])
    }({
        isOpen: i, onOpen: u, onClose: d, onInput: b.useCallback(function (f) {
            s(!0), c(f.key)
        }, [s, c]), searchButtonRef: r
    }), b.createElement(b.Fragment, null, b.createElement(Yh, {
        ref: r,
        translations: e == null || (t = e.translations) === null || t === void 0 ? void 0 : t.button,
        onClick: u
    }), i && Zc(b.createElement(Tg, ii({}, e, {
        initialScrollY: window.scrollY,
        initialQuery: l,
        translations: e == null || (n = e.translations) === null || n === void 0 ? void 0 : n.modal,
        onClose: d
    })), document.body))
}

function Rg(e) {
    eu(b.createElement(kg, Wo({}, e, {
        transformSearchClient: function (t) {
            return t.addAlgoliaAgent("docsearch.js", "3.0.0-alpha.42"), e.transformSearchClient ? e.transformSearchClient(t) : t
        }
    })), function (t) {
        var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : window;
        return typeof t == "string" ? n.document.querySelector(t) : t
    }(e.container, e.environment))
}

var gu, si, _u, Dg = [];

function Lg(e, t, n) {
    var r, o, i, s = {};
    for (i in t) i == "key" ? r = t[i] : i == "ref" ? o = t[i] : s[i] = t[i];
    if (arguments.length > 2 && (s.children = arguments.length > 3 ? gu.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null) for (i in e.defaultProps) s[i] === void 0 && (s[i] = e.defaultProps[i]);
    return Ng(e, s, r, o, null)
}

function Ng(e, t, n, r, o) {
    var i = {
        type: e,
        props: t,
        key: n,
        ref: r,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: o == null ? ++_u : o
    };
    return o == null && si.vnode != null && si.vnode(i), i
}

gu = Dg.slice, si = {
    __e: function (e, t) {
        for (var n, r, o; t = t.__;) if ((n = t.__c) && !n.__) try {
            if ((r = n.constructor) && r.getDerivedStateFromError != null && (n.setState(r.getDerivedStateFromError(e)), o = n.__d), n.componentDidCatch != null && (n.componentDidCatch(e), o = n.__d), o) return n.__E = n
        } catch (i) {
            e = i
        }
        throw e
    }
}, _u = 0, typeof Promise == "function" && Promise.prototype.then.bind(Promise.resolve());
const Mg = e => e.button === 1 || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey, Hg = () => {
    const e = ro(), t = Sc();
    return {
        transformItems: n => n.map(r => It(Le({}, r), {url: Em(r.url, t.value.base)})),
        hitComponent: ({hit: n, children: r}) => Lg("a", {
            href: n.url, onClick: o => {
                Mg(o) || (o.preventDefault(), e.push(n.url))
            }
        }, r),
        navigator: {
            navigate: ({itemUrl: n}) => {
                e.push(n)
            }
        }
    }
};
const Fg = Ve({
    name: "Docsearch", props: {options: {type: Object, required: !0}}, setup(e) {
        const t = Li(), n = wc(), r = Hg(), o = be(() => {
            var a;
            return Le(Le({}, e.options), (a = e.options.locales) === null || a === void 0 ? void 0 : a[t.value])
        }), i = [], s = () => {
            var a, l;
            const c = (l = (a = o.value.searchParameters) === null || a === void 0 ? void 0 : a.facetFilters) !== null && l !== void 0 ? l : [];
            i.splice(0, i.length, `lang:${n.value}`, ...Z(c) ? c : [c]), Rg(It(Le(Le({}, r), o.value), {
                container: "#docsearch-container",
                searchParameters: It(Le({}, o.value.searchParameters), {facetFilters: i})
            }))
        };
        return tt(() => {
            s(), et([t, o], ([a, l], [c, u]) => {
                a !== c && JSON.stringify(l) !== JSON.stringify(u) && s()
            }), et(n, (a, l) => {
                if (a !== l) {
                    const c = i.findIndex(u => u === `lang:${l}`);
                    c > -1 && i.splice(c, 1, `lang:${a}`)
                }
            })
        }), () => pe("div", {id: "docsearch-container"})
    }
}), qg = {
    apiKey: "4cfe0f33be16c346fed77effff922cf8",
    indexName: "go-cqhttp",
    algoliaOptions: {facetFilters: ["lang:en-US"]}
};
var zg = _n(({app: e}) => {
    e.component("Docsearch", () => pe(Fg, {options: qg}))
});
const Bg = [Pm, Mm, Bm, Ph, Ih, zg];

function yu(e, t, n) {
    var r, o, i;
    t === void 0 && (t = 50), n === void 0 && (n = {});
    var s = (r = n.isImmediate) != null && r, a = (o = n.callback) != null && o, l = n.maxWait, c = Date.now(), u = [];

    function d() {
        if (l !== void 0) {
            var h = Date.now() - c;
            if (h + t >= l) return l - h
        }
        return t
    }

    var f = function () {
        var h = [].slice.call(arguments), m = this;
        return new Promise(function (g, v) {
            var _ = s && i === void 0;
            if (i !== void 0 && clearTimeout(i), i = setTimeout(function () {
                if (i = void 0, c = Date.now(), !s) {
                    var O = e.apply(m, h);
                    a && a(O), u.forEach(function (S) {
                        return (0, S.resolve)(O)
                    }), u = []
                }
            }, d()), _) {
                var E = e.apply(m, h);
                return a && a(E), g(E)
            }
            u.push({resolve: g, reject: v})
        })
    };
    return f.cancel = function (h) {
        i !== void 0 && clearTimeout(i), u.forEach(function (m) {
            return (0, m.reject)(h)
        }), u = []
    }, f
}

const Xa = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
    $g = () => window.scrollTo({top: 0, behavior: "smooth"});
const Ug = Ve({
    name: "BackToTop", setup() {
        const e = ke(0), t = be(() => e.value > 300), n = yu(() => {
            e.value = Xa()
        }, 100);
        tt(() => {
            e.value = Xa(), window.addEventListener("scroll", () => n())
        });
        const r = pe("div", {class: "back-to-top", onClick: $g});
        return () => pe(eo, {name: "back-to-top"}, {default: () => t.value ? r : null})
    }
}), bu = Symbol("pwaEvent"), Vg = () => {
    const e = xe(bu);
    if (!e) throw new Error("usePwaEvent() is called without provider.");
    return e
}, Kg = e => {
    const t = e.waiting;
    if (!t) return;
    const n = new MessageChannel;
    t.postMessage({type: "SKIP_WAITING"}, [n.port2])
};
const Wg = Ve({
        name: "PwaPopup", props: {locales: {type: Object, required: !1, default: () => ({})}}, setup(e) {
            const t = Vg(), n = Li(), r = be(() => {
                var a;
                return (a = e.locales[n.value]) !== null && a !== void 0 ? a : {
                    message: "New content is available.",
                    buttonText: "Refresh"
                }
            }), o = ke(!1), i = ke(null), s = () => {
                o.value = !1, i.value && (Kg(i.value), location.reload(!0))
            };
            return t.on("updated", a => {
                a && (i.value = a, o.value = !0)
            }), () => pe(eo, {name: "pwa-popup"}, {default: () => o.value ? pe("div", {class: "pwa-popup"}, [r.value.message, pe("br"), pe("button", {onClick: s}, r.value.buttonText)]) : null})
        }
    }), Jg = {"/": {message: "\u53D1\u73B0\u65B0\u5185\u5BB9\u53EF\u7528", buttonText: "\u5237\u65B0"}},
    Eu = () => pe(Wg, {locales: Jg});
Eu.displayName = "PwaPopupWrapper";
const Qg = [Ug, Eu], Yg = ({headerLinkSelector: e, headerAnchorSelector: t, delay: n, offset: r = 5}) => {
    const o = ro(), i = nr(), a = yu(() => {
        var l, c, u, d;
        const f = Array.from(document.querySelectorAll(e)),
            m = Array.from(document.querySelectorAll(t)).filter(O => f.some(S => S.hash === O.hash)),
            g = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop),
            v = window.innerHeight + g, _ = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
            E = Math.abs(_ - v) < r;
        for (let O = 0; O < m.length; O++) {
            const S = m[O], x = m[O + 1], L = O === 0 && g === 0,
                A = g >= ((c = (l = S.parentElement) === null || l === void 0 ? void 0 : l.offsetTop) !== null && c !== void 0 ? c : 0) - r,
                P = !x || g < ((d = (u = x.parentElement) === null || u === void 0 ? void 0 : u.offsetTop) !== null && d !== void 0 ? d : 0) - r;
            if (!(L || A && P)) continue;
            const q = decodeURIComponent(o.currentRoute.value.hash), U = decodeURIComponent(S.hash);
            if (q === U) return;
            if (E) {
                for (let C = O + 1; C < m.length; C++) if (q === decodeURIComponent(m[C].hash)) return
            }
            Gg(o, {hash: U, force: !0});
            return
        }
    }, n);
    tt(() => {
        a(), window.addEventListener("scroll", a)
    }), Pi(() => {
        window.removeEventListener("scroll", a)
    }), et(() => i.value.path, a)
}, Gg = async (e, ...t) => {
    const {scrollBehavior: n} = e.options;
    e.options.scrollBehavior = void 0, await e.replace(...t).finally(() => e.options.scrollBehavior = n)
}, Zg = "a.sidebar-item", Xg = ".header-anchor", e0 = 300, t0 = 5;
var n0 = oo(() => {
        Yg({headerLinkSelector: Zg, headerAnchorSelector: Xg, delay: e0, offset: t0})
    }),
    r0 = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {},
    Sr = {exports: {}};
(function (e, t) {
    (function (n, r) {
        e.exports = r()
    })(r0, function () {
        var n = {};
        n.version = "0.2.0";
        var r = n.settings = {
            minimum: .08,
            easing: "ease",
            positionUsing: "",
            speed: 200,
            trickle: !0,
            trickleRate: .02,
            trickleSpeed: 800,
            showSpinner: !0,
            barSelector: '[role="bar"]',
            spinnerSelector: '[role="spinner"]',
            parent: "body",
            template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        };
        n.configure = function (m) {
            var g, v;
            for (g in m) v = m[g], v !== void 0 && m.hasOwnProperty(g) && (r[g] = v);
            return this
        }, n.status = null, n.set = function (m) {
            var g = n.isStarted();
            m = o(m, r.minimum, 1), n.status = m === 1 ? null : m;
            var v = n.render(!g), _ = v.querySelector(r.barSelector), E = r.speed, O = r.easing;
            return v.offsetWidth, a(function (S) {
                r.positionUsing === "" && (r.positionUsing = n.getPositioningCSS()), l(_, s(m, E, O)), m === 1 ? (l(v, {
                    transition: "none",
                    opacity: 1
                }), v.offsetWidth, setTimeout(function () {
                    l(v, {transition: "all " + E + "ms linear", opacity: 0}), setTimeout(function () {
                        n.remove(), S()
                    }, E)
                }, E)) : setTimeout(S, E)
            }), this
        }, n.isStarted = function () {
            return typeof n.status == "number"
        }, n.start = function () {
            n.status || n.set(0);
            var m = function () {
                setTimeout(function () {
                    !n.status || (n.trickle(), m())
                }, r.trickleSpeed)
            };
            return r.trickle && m(), this
        }, n.done = function (m) {
            return !m && !n.status ? this : n.inc(.3 + .5 * Math.random()).set(1)
        }, n.inc = function (m) {
            var g = n.status;
            return g ? (typeof m != "number" && (m = (1 - g) * o(Math.random() * g, .1, .95)), g = o(g + m, 0, .994), n.set(g)) : n.start()
        }, n.trickle = function () {
            return n.inc(Math.random() * r.trickleRate)
        }, function () {
            var m = 0, g = 0;
            n.promise = function (v) {
                return !v || v.state() === "resolved" ? this : (g === 0 && n.start(), m++, g++, v.always(function () {
                    g--, g === 0 ? (m = 0, n.done()) : n.set((m - g) / m)
                }), this)
            }
        }(), n.render = function (m) {
            if (n.isRendered()) return document.getElementById("nprogress");
            u(document.documentElement, "nprogress-busy");
            var g = document.createElement("div");
            g.id = "nprogress", g.innerHTML = r.template;
            var v = g.querySelector(r.barSelector), _ = m ? "-100" : i(n.status || 0),
                E = document.querySelector(r.parent), O;
            return l(v, {
                transition: "all 0 linear",
                transform: "translate3d(" + _ + "%,0,0)"
            }), r.showSpinner || (O = g.querySelector(r.spinnerSelector), O && h(O)), E != document.body && u(E, "nprogress-custom-parent"), E.appendChild(g), g
        }, n.remove = function () {
            d(document.documentElement, "nprogress-busy"), d(document.querySelector(r.parent), "nprogress-custom-parent");
            var m = document.getElementById("nprogress");
            m && h(m)
        }, n.isRendered = function () {
            return !!document.getElementById("nprogress")
        }, n.getPositioningCSS = function () {
            var m = document.body.style,
                g = "WebkitTransform" in m ? "Webkit" : "MozTransform" in m ? "Moz" : "msTransform" in m ? "ms" : "OTransform" in m ? "O" : "";
            return g + "Perspective" in m ? "translate3d" : g + "Transform" in m ? "translate" : "margin"
        };

        function o(m, g, v) {
            return m < g ? g : m > v ? v : m
        }

        function i(m) {
            return (-1 + m) * 100
        }

        function s(m, g, v) {
            var _;
            return r.positionUsing === "translate3d" ? _ = {transform: "translate3d(" + i(m) + "%,0,0)"} : r.positionUsing === "translate" ? _ = {transform: "translate(" + i(m) + "%,0)"} : _ = {"margin-left": i(m) + "%"}, _.transition = "all " + g + "ms " + v, _
        }

        var a = function () {
            var m = [];

            function g() {
                var v = m.shift();
                v && v(g)
            }

            return function (v) {
                m.push(v), m.length == 1 && g()
            }
        }(), l = function () {
            var m = ["Webkit", "O", "Moz", "ms"], g = {};

            function v(S) {
                return S.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function (x, L) {
                    return L.toUpperCase()
                })
            }

            function _(S) {
                var x = document.body.style;
                if (S in x) return S;
                for (var L = m.length, A = S.charAt(0).toUpperCase() + S.slice(1), P; L--;) if (P = m[L] + A, P in x) return P;
                return S
            }

            function E(S) {
                return S = v(S), g[S] || (g[S] = _(S))
            }

            function O(S, x, L) {
                x = E(x), S.style[x] = L
            }

            return function (S, x) {
                var L = arguments, A, P;
                if (L.length == 2) for (A in x) P = x[A], P !== void 0 && x.hasOwnProperty(A) && O(S, A, P); else O(S, L[1], L[2])
            }
        }();

        function c(m, g) {
            var v = typeof m == "string" ? m : f(m);
            return v.indexOf(" " + g + " ") >= 0
        }

        function u(m, g) {
            var v = f(m), _ = v + g;
            c(v, g) || (m.className = _.substring(1))
        }

        function d(m, g) {
            var v = f(m), _;
            !c(m, g) || (_ = v.replace(" " + g + " ", " "), m.className = _.substring(1, _.length - 1))
        }

        function f(m) {
            return (" " + (m.className || "") + " ").replace(/\s+/gi, " ")
        }

        function h(m) {
            m && m.parentNode && m.parentNode.removeChild(m)
        }

        return n
    })
})(Sr);
const o0 = () => {
    tt(() => {
        const e = ro(), t = new Set;
        t.add(e.currentRoute.value.path), Sr.exports.configure({showSpinner: !1}), e.beforeEach(n => {
            t.has(n.path) || Sr.exports.start()
        }), e.afterEach(n => {
            t.add(n.path), Sr.exports.done()
        })
    })
};
var i0 = oo(() => {
    o0()
}), s0 = oo(() => {
    hh(), bh()
});

function a0(e) {
    return {
        all: e = e || new Map, on: function (t, n) {
            var r = e.get(t);
            r ? r.push(n) : e.set(t, [n])
        }, off: function (t, n) {
            var r = e.get(t);
            r && (n ? r.splice(r.indexOf(n) >>> 0, 1) : e.set(t, []))
        }, emit: function (t, n) {
            var r = e.get(t);
            r && r.slice().map(function (o) {
                o(n)
            }), (r = e.get("*")) && r.slice().map(function (o) {
                o(t, n)
            })
        }
    }
}

const l0 = "service-worker.js";
var c0 = oo(() => {
    const e = (...n) => console.log("[@vuepress/plugin-pwa]", ...n), t = a0();
    Pt(bu, t), tt(async () => {
        const {register: n} = await import("./index.0e8935cb.js");
        n(Ic(l0), {
            ready(r) {
                e("Service worker is active."), t.emit("ready", r)
            }, registered(r) {
                e("Service worker has been registered."), t.emit("registered", r)
            }, cached(r) {
                e("Content has been cached for offline use."), t.emit("cached", r)
            }, updatefound(r) {
                e("New content is downloading."), t.emit("updatefound", r)
            }, updated(r) {
                e("New content is available, please refresh."), t.emit("updated", r)
            }, offline() {
                e("No internet connection found. App is running in offline mode."), t.emit("offline")
            }, error(r) {
                e("Error during service worker registration:", r), t.emit("error", r)
            }
        })
    })
});
const u0 = [n0, i0, s0, c0],
    f0 = [["v-8daa1a0e", "/", {title: ""}, ["/index.html", "/README.md"]], ["v-638c1d18", "/advanced/", {title: "\u81EA\u5B9A\u4E49 go-cqhttp"}, ["/advanced/index.html", "/advanced/README.md"]], ["v-744497ce", "/api/", {title: "API"}, ["/api/index.html", "/api/README.md"]], ["v-4b693314", "/api/guild.html", {title: "\u9891\u9053 API"}, ["/api/guild", "/api/guild.md"]], ["v-b4ede9ca", "/cqcode/", {title: "CQ \u7801 / CQ Code"}, ["/cqcode/index.html", "/cqcode/README.md"]], ["v-7ca4f50e", "/event/", {title: "\u4E8B\u4EF6"}, ["/event/index.html", "/event/README.md"]], ["v-ac33ff58", "/event/guild.html", {title: "\u9891\u9053\u4E8B\u4EF6"}, ["/event/guild", "/event/guild.md"]], ["v-7446a652", "/faq/", {title: "\u5E38\u89C1\u95EE\u9898"}, ["/faq/index.html", "/faq/README.md"]], ["v-341a81f4", "/faq/slider.html", {title: "\u6ED1\u5757\u9A8C\u8BC1\u7801"}, ["/faq/slider", "/faq/slider.md"]], ["v-fffb8e28", "/guide/", {title: "\u7B80\u4ECB"}, ["/guide/index.html", "/guide/README.md"]], ["v-9e2d8fd8", "/guide/achieve.html", {title: "\u5B9E\u73B0"}, ["/guide/achieve", "/guide/achieve.md"]], ["v-85fa9b2a", "/guide/config.html", {title: "\u914D\u7F6E"}, ["/guide/config", "/guide/config.md"]], ["v-3988e24d", "/guide/docker.html", {title: "\u4F7F\u7528Docker"}, ["/guide/docker", "/guide/docker.md"]], ["v-08638a73", "/guide/eventfilter.html", {title: "\u4E8B\u4EF6\u8FC7\u6EE4\u5668"}, ["/guide/eventfilter", "/guide/eventfilter.md"]], ["v-55846971", "/guide/file.html", {title: "\u76EE\u5F55\u7ED3\u6784"}, ["/guide/file", "/guide/file.md"]], ["v-5c1af435", "/guide/quick_start.html", {title: "\u5F00\u59CB"}, ["/guide/quick_start", "/guide/quick_start.md"]], ["v-fffb5256", "/guild/", {title: "\u9891\u9053"}, ["/guild/index.html", "/guild/README.md"]], ["v-c4895de8", "/reference/data_struct.html", {title: "\u6570\u636E\u7ED3\u6784"}, ["/reference/data_struct", "/reference/data_struct.md"]], ["v-22a2f9fd", "/reference/", {title: "\u53C2\u8003"}, ["/reference/index.html", "/reference/readme.md"]], ["v-3706649a", "/404.html", {title: ""}, ["/404"]]],
    d0 = f0.reduce((e, [t, n, r, o]) => (e.push({name: t, path: n, component: qs, meta: r}, ...o.map(i => ({
        path: i,
        redirect: n
    }))), e), [{name: "404", path: "/:catchAll(.*)", component: qs}]), p0 = Ep, m0 = () => {
        const e = om({
            history: p0(ym(Ot.value.base)),
            routes: d0,
            scrollBehavior: (t, n, r) => r || (t.hash ? {el: t.hash} : {top: 0})
        });
        return e.beforeResolve(async (t, n) => {
            var r;
            (t.path !== n.path || n === lt) && ([ut.value] = await Promise.all([Lt.resolvePageData(t.name), (r = gc[t.name]) === null || r === void 0 ? void 0 : r.__asyncLoader()]))
        }), e
    }, h0 = e => {
        e.component("ClientOnly", sm), e.component("Content", Ni)
    }, v0 = (e, t) => {
        const n = be(() => Lt.resolveRouteLocale(Ot.value.locales, t.currentRoute.value.path)),
            r = be(() => Lt.resolveSiteLocaleData(Ot.value, n.value)), o = be(() => Lt.resolvePageFrontmatter(ut.value)),
            i = be(() => Lt.resolvePageHeadTitle(ut.value, r.value)),
            s = be(() => Lt.resolvePageHead(i.value, o.value, r.value)), a = be(() => Lt.resolvePageLang(ut.value));
        return e.provide(Di, n), e.provide(Pc, r), e.provide(bc, o), e.provide(dm, i), e.provide(Ec, s), e.provide(Oc, a), Object.defineProperties(e.config.globalProperties, {
            $frontmatter: {get: () => o.value},
            $head: {get: () => s.value},
            $headTitle: {get: () => i.value},
            $lang: {get: () => a.value},
            $page: {get: () => ut.value},
            $routeLocale: {get: () => n.value},
            $site: {get: () => Ot.value},
            $siteLocale: {get: () => r.value},
            $withBase: {get: () => Ic}
        }), {
            pageData: ut,
            pageFrontmatter: o,
            pageHead: s,
            pageHeadTitle: i,
            pageLang: a,
            routeLocale: n,
            siteData: Ot,
            siteLocaleData: r
        }
    }, g0 = () => {
        const e = Ri(), t = fm(), n = wc(), r = ke([]), o = () => {
            t.value.forEach(s => {
                const a = _0(s);
                a && r.value.push(a)
            })
        }, i = () => {
            document.documentElement.lang = n.value, r.value.forEach(s => {
                s.parentNode === document.head && document.head.removeChild(s)
            }), r.value.splice(0, r.value.length), t.value.forEach(s => {
                const a = y0(s);
                a !== null && (document.head.appendChild(a), r.value.push(a))
            })
        };
        Pt(mm, i), tt(() => {
            o(), i(), et(() => e.path, () => i())
        })
    }, _0 = ([e, t, n = ""]) => {
        const r = Object.entries(t).map(([a, l]) => ge(l) ? `[${a}="${l}"]` : l === !0 ? `[${a}]` : "").join(""),
            o = `head > ${e}${r}`;
        return Array.from(document.querySelectorAll(o)).find(a => a.innerText === n) || null
    }, y0 = ([e, t, n]) => {
        if (!ge(e)) return null;
        const r = document.createElement(e);
        return Cc(t) && Object.entries(t).forEach(([o, i]) => {
            ge(i) ? r.setAttribute(o, i) : i === !0 && r.setAttribute(o, "")
        }), ge(n) && r.appendChild(document.createTextNode(n)), r
    }, b0 = tp, E0 = async () => {
        const e = b0({
            name: "VuepressApp", setup() {
                g0();
                for (const n of u0) n();
                return () => [pe(vc), ...Qg.map(n => pe(n))]
            }
        }), t = m0();
        h0(e), v0(e, t);
        for (const n of Bg) await n({app: e, router: t, siteData: Ot});
        return e.use(t), {app: e, router: t}
    };
E0().then(({app: e, router: t}) => {
    t.isReady().then(() => {
        e.mount("#app")
    })
});
export {
    Sc as A,
    j0 as B,
    R0 as C,
    pe as D,
    Ic as E,
    Fe as F,
    sm as G,
    Zn as H,
    ke as I,
    et as J,
    S0 as K,
    x0 as L,
    bm as M,
    ym as N,
    ro as O,
    ge as P,
    gh as Q,
    tt as R,
    Kr as S,
    eo as T,
    nr as U,
    D0 as V,
    Cc as W,
    I0 as X,
    Ci as Y,
    yh as Z,
    Zl as a,
    Se as b,
    Ql as c,
    E0 as createVueApp,
    Ii as d,
    P0 as e,
    Ve as f,
    Nc as g,
    zt as h,
    um as i,
    be as j,
    Z as k,
    A0 as l,
    C0 as m,
    Ri as n,
    Zr as o,
    w0 as p,
    Yl as q,
    fd as r,
    gd as s,
    ku as t,
    Li as u,
    Xl as v,
    xf as w,
    _m as x,
    T0 as y,
    k0 as z
};