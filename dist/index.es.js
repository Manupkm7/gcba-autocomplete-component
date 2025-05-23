var de = Object.defineProperty;
var me = (f, t, o) => t in f ? de(f, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : f[t] = o;
var X = (f, t, o) => me(f, typeof t != "symbol" ? t + "" : t, o);
import fe, { useState as E, useRef as K, useEffect as ce, useCallback as ie } from "react";
import w from "axios";
var Q = { exports: {} }, H = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var te;
function pe() {
  if (te) return H;
  te = 1;
  var f = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function o(r, n, u) {
    var a = null;
    if (u !== void 0 && (a = "" + u), n.key !== void 0 && (a = "" + n.key), "key" in n) {
      u = {};
      for (var m in n)
        m !== "key" && (u[m] = n[m]);
    } else u = n;
    return n = u.ref, {
      $$typeof: f,
      type: r,
      key: a,
      ref: n !== void 0 ? n : null,
      props: u
    };
  }
  return H.Fragment = t, H.jsx = o, H.jsxs = o, H;
}
var Z = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var oe;
function ge() {
  return oe || (oe = 1, process.env.NODE_ENV !== "production" && function() {
    function f(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === g ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case A:
          return "Fragment";
        case x:
          return "Profiler";
        case N:
          return "StrictMode";
        case G:
          return "Suspense";
        case q:
          return "SuspenseList";
        case i:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case B:
            return "Portal";
          case F:
            return (e.displayName || "Context") + ".Provider";
          case D:
            return (e._context.displayName || "Context") + ".Consumer";
          case W:
            var c = e.render;
            return e = e.displayName, e || (e = c.displayName || c.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case V:
            return c = e.displayName || null, c !== null ? c : f(e.type) || "Memo";
          case z:
            c = e._payload, e = e._init;
            try {
              return f(e(c));
            } catch {
            }
        }
      return null;
    }
    function t(e) {
      return "" + e;
    }
    function o(e) {
      try {
        t(e);
        var c = !1;
      } catch {
        c = !0;
      }
      if (c) {
        c = console;
        var p = c.error, h = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return p.call(
          c,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          h
        ), t(e);
      }
    }
    function r(e) {
      if (e === A) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === z)
        return "<...>";
      try {
        var c = f(e);
        return c ? "<" + c + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function n() {
      var e = R.A;
      return e === null ? null : e.getOwner();
    }
    function u() {
      return Error("react-stack-top-frame");
    }
    function a(e) {
      if (k.call(e, "key")) {
        var c = Object.getOwnPropertyDescriptor(e, "key").get;
        if (c && c.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function m(e, c) {
      function p() {
        j || (j = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          c
        ));
      }
      p.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: p,
        configurable: !0
      });
    }
    function b() {
      var e = f(this.type);
      return M[e] || (M[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function y(e, c, p, h, T, v, J, s) {
      return p = v.ref, e = {
        $$typeof: _,
        type: e,
        key: c,
        props: v,
        _owner: T
      }, (p !== void 0 ? p : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: b
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(e, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: J
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: s
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function P(e, c, p, h, T, v, J, s) {
      var d = c.children;
      if (d !== void 0)
        if (h)
          if (U(d)) {
            for (h = 0; h < d.length; h++)
              I(d[h]);
            Object.freeze && Object.freeze(d);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else I(d);
      if (k.call(c, "key")) {
        d = f(e);
        var S = Object.keys(c).filter(function(ue) {
          return ue !== "key";
        });
        h = 0 < S.length ? "{key: someKey, " + S.join(": ..., ") + ": ...}" : "{key: someKey}", C[d + h] || (S = 0 < S.length ? "{" + S.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          h,
          d,
          S,
          d
        ), C[d + h] = !0);
      }
      if (d = null, p !== void 0 && (o(p), d = "" + p), a(c) && (o(c.key), d = "" + c.key), "key" in c) {
        p = {};
        for (var ee in c)
          ee !== "key" && (p[ee] = c[ee]);
      } else p = c;
      return d && m(
        p,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), y(
        e,
        d,
        v,
        T,
        n(),
        p,
        J,
        s
      );
    }
    function I(e) {
      typeof e == "object" && e !== null && e.$$typeof === _ && e._store && (e._store.validated = 1);
    }
    var $ = fe, _ = Symbol.for("react.transitional.element"), B = Symbol.for("react.portal"), A = Symbol.for("react.fragment"), N = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), D = Symbol.for("react.consumer"), F = Symbol.for("react.context"), W = Symbol.for("react.forward_ref"), G = Symbol.for("react.suspense"), q = Symbol.for("react.suspense_list"), V = Symbol.for("react.memo"), z = Symbol.for("react.lazy"), i = Symbol.for("react.activity"), g = Symbol.for("react.client.reference"), R = $.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, k = Object.prototype.hasOwnProperty, U = Array.isArray, Y = console.createTask ? console.createTask : function() {
      return null;
    };
    $ = {
      "react-stack-bottom-frame": function(e) {
        return e();
      }
    };
    var j, M = {}, O = $["react-stack-bottom-frame"].bind(
      $,
      u
    )(), L = Y(r(u)), C = {};
    Z.Fragment = A, Z.jsx = function(e, c, p, h, T) {
      var v = 1e4 > R.recentlyCreatedOwnerStacks++;
      return P(
        e,
        c,
        p,
        !1,
        h,
        T,
        v ? Error("react-stack-top-frame") : O,
        v ? Y(r(e)) : L
      );
    }, Z.jsxs = function(e, c, p, h, T) {
      var v = 1e4 > R.recentlyCreatedOwnerStacks++;
      return P(
        e,
        c,
        p,
        !0,
        h,
        T,
        v ? Error("react-stack-top-frame") : O,
        v ? Y(r(e)) : L
      );
    };
  }()), Z;
}
var se;
function he() {
  return se || (se = 1, process.env.NODE_ENV === "production" ? Q.exports = pe() : Q.exports = ge()), Q.exports;
}
var l = he();
const re = "https://servicios.usig.buenosaires.gob.ar", be = "https://epok.buenosaires.gob.ar/catastro";
class le {
  constructor(t = {}) {
    X(this, "debug");
    X(this, "maxSuggestions");
    X(this, "lastRequest");
    X(this, "serverTimeout");
    this.debug = t.debug || !1, this.maxSuggestions = t.maxSuggestions || 10, this.serverTimeout = t.serverTimeout || 5e3, this.lastRequest = null;
  }
  /**
   * Abort any ongoing request
   */
  abort() {
    this.lastRequest && (this.lastRequest.abort(), this.lastRequest = null, this.debug && console.log("Request aborted"));
  }
  /**
   * Normalizes an address string and returns matching addresses
   */
  async normalizar(t, o = this.maxSuggestions) {
    this.debug && console.log(`ApiNormalizer.normalizar('${t}', ${o})`), this.abort(), this.lastRequest = new AbortController();
    try {
      let r = [];
      const n = await this.searchAddresses(t, o);
      r = [...r, ...n];
      const u = this.parseCoordinates(t);
      if (u) {
        const a = await this.reverseGeocode(
          u.x,
          u.y
        );
        r = [...r, ...a];
      }
      return r.slice(0, o);
    } catch (r) {
      return w.isCancel(r) ? this.debug && console.log("Request was cancelled") : console.error("Error normalizing address:", r), [];
    } finally {
      this.lastRequest = null;
    }
  }
  /**
   * Search for addresses using the USIG API
   */
  async searchAddresses(t, o) {
    var r;
    try {
      const n = `${re}/normalizar/?direccion=${encodeURIComponent(
        t
      )}&geocodificar=true&max=${o}`, u = {
        headers: {
          Accept: "application/json"
        },
        signal: (r = this.lastRequest) == null ? void 0 : r.signal,
        timeout: this.serverTimeout
      }, a = await w.get(n, u);
      return a.data.error ? (this.debug && console.error("API error:", a.data.error), []) : a.data.direccionesNormalizadas && a.data.direccionesNormalizadas.length > 0 ? this.processDireccionesNormalizadas(
        a.data.direccionesNormalizadas
      ) : a.data.calles && a.data.calles.length > 0 ? this.processCalles(a.data.calles) : [];
    } catch (n) {
      return w.isCancel(n) ? this.debug && console.log("Address search request was cancelled") : console.error("Error searching addresses:", n), [];
    }
  }
  /**
   * Parse coordinates from input string
   * Supports formats like "lat,lng", "x,y", "-34.603722,-58.381592"
   */
  parseCoordinates(t) {
    const o = t.trim().replace(/\s+/g, ""), r = [
      // Lat,Lng format (e.g., -34.603722,-58.381592)
      /^(-?\d+\.?\d*),(-?\d+\.?\d*)$/,
      // X,Y format with optional text (e.g., "x: 123.45, y: 678.90")
      /x:?(-?\d+\.?\d*)[,\s]+y:?(-?\d+\.?\d*)/i,
      // Y,X format with optional text (e.g., "y: 678.90, x: 123.45")
      /y:?(-?\d+\.?\d*)[,\s]+x:?(-?\d+\.?\d*)/i
    ];
    for (const n of r) {
      const u = o.match(n);
      if (u) {
        if (n === r[0])
          return {
            y: Number.parseFloat(u[1]),
            // Latitude is Y
            x: Number.parseFloat(u[2])
            // Longitude is X
          };
        if (n === r[1])
          return {
            x: Number.parseFloat(u[1]),
            y: Number.parseFloat(u[2])
          };
        if (n === r[2])
          return {
            y: Number.parseFloat(u[1]),
            x: Number.parseFloat(u[2])
          };
      }
    }
    return null;
  }
  /**
   * Reverse geocode coordinates to get an address
   */
  async reverseGeocode(t, o) {
    var r;
    this.debug && console.log(`ApiNormalizer.reverseGeocode(${t}, ${o})`), this.abort(), this.lastRequest = new AbortController();
    try {
      const n = `${re}/reverseGeocoderLugares/?x=${t}&y=${o}&srid=4326`, u = {
        headers: {
          Accept: "application/json"
        },
        signal: this.lastRequest.signal,
        timeout: this.serverTimeout
      }, a = await w.get(n, u);
      if (a.data.error)
        return this.debug && console.error("Reverse geocoding API error:", a.data.error), [];
      if (!a.data.direccion)
        return [];
      const m = {
        codigo: a.data.cod_calle || "coord",
        nombre: a.data.nombre || a.data.direccion || "Coordenada",
        descripcion: a.data.direccion || "Coordenada",
        tipo: "CALLE",
        alturas: [
          {
            inicio: 1,
            fin: 1e4
            // Default range
          }
        ]
      };
      let b = 0;
      return a.data.altura && (b = Number.parseInt(a.data.altura, 10)), [{
        calle: m,
        altura: b || 1,
        // Default to 1 if no number found
        tipoDireccion: "DIRECCION_CALLE_ALTURA",
        tipo: "DIRECCION",
        nombre: a.data.direccion || `Coordenada (${t.toFixed(6)}, ${o.toFixed(6)})`,
        descripcion: `Coordenada (${t.toFixed(6)}, ${o.toFixed(6)})`,
        coordenadas: {
          x: t,
          y: o,
          srid: ((r = a.data.coordenadas) == null ? void 0 : r.srid) || 4326
        }
      }];
    } catch (n) {
      return w.isCancel(n) ? this.debug && console.log("Reverse geocoding request was cancelled") : console.error("Error in reverse geocoding:", n), [];
    } finally {
      this.lastRequest = null;
    }
  }
  /**
   * Process normalized addresses from API response
   */
  processDireccionesNormalizadas(t) {
    if (!t) return Promise.resolve([]);
    const o = t.map(async (r) => {
      if (!r.direccion || !r.cod_calle) return null;
      const n = {
        codigo: r.cod_calle,
        nombre: r.nombre || r.direccion.split(" ")[0],
        descripcion: r.direccion,
        tipo: "CALLE",
        alturas: [
          {
            inicio: 1,
            fin: 1e4
            // Default range
          }
        ]
      }, u = r.direccion.includes(" y ");
      let a;
      if (u) {
        const m = r.direccion.split(" y ").map((y) => y.trim()), b = {
          codigo: `${r.cod_calle}_cruce`,
          nombre: m[1] || "Calle cruce",
          descripcion: m[1] || "Calle cruce",
          tipo: "CALLE",
          alturas: [
            {
              inicio: 1,
              fin: 1e4
            }
          ]
        };
        a = {
          calle: n,
          calleCruce: b,
          tipoDireccion: "DIRECCION_CALLE_Y_CALLE",
          tipo: "DIRECCION",
          nombre: r.direccion,
          descripcion: r.direccion,
          coordenadas: r.coordenadas ? {
            x: Number.parseFloat(r.coordenadas.x),
            y: Number.parseFloat(r.coordenadas.y),
            srid: r.coordenadas.srid
          } : void 0
        };
      } else {
        const m = r.altura ? Number.parseInt(r.altura, 10) : 0;
        if (a = {
          calle: n,
          altura: m,
          tipoDireccion: "DIRECCION_CALLE_ALTURA",
          tipo: "DIRECCION",
          nombre: r.direccion,
          descripcion: r.direccion,
          coordenadas: r.coordenadas ? {
            x: Number.parseFloat(r.coordenadas.x),
            y: Number.parseFloat(r.coordenadas.y),
            srid: r.coordenadas.srid
          } : void 0
        }, m > 0)
          try {
            const b = await this.getSMP({
              nombre: r.direccion,
              descripcion: r.direccion || "",
              tipo: "DIRECCION",
              codigo: r.cod_calle,
              altura: r.altura,
              calle: {
                codigo: r.cod_calle
              }
            });
            b && (a.smp = b);
          } catch (b) {
            this.debug && console.error("Error getting SMP:", b);
          }
      }
      return a;
    });
    return Promise.all(o).then(
      (r) => r.filter(Boolean)
    );
  }
  /**
   * Process streets from API response
   */
  processCalles(t) {
    return t ? t.map((o) => {
      var r, n;
      return {
        codigo: o.cod_calle,
        nombre: o.nombre,
        descripcion: o.tipo ? `${o.tipo} ${o.nombre}` : o.nombre,
        tipo: "CALLE",
        alturas: [
          {
            inicio: ((r = o.altura) == null ? void 0 : r.inicial) || 1,
            fin: ((n = o.altura) == null ? void 0 : n.final) || 1e4
          }
        ],
        partido: o.partido,
        localidad: o.localidad
      };
    }) : [];
  }
  /**
   * Get coordinates for an address
   */
  async getCoordinates(t) {
    var o;
    try {
      this.abort(), this.lastRequest = new AbortController();
      const r = `${re}/normalizar/?direccion=${encodeURIComponent(
        t.nombre
      )},${encodeURIComponent(t.descripcion)}&geocodificar=true&srid=4326`, n = {
        headers: {
          Accept: "application/json"
        },
        signal: this.lastRequest.signal,
        timeout: this.serverTimeout
      }, a = (o = (await w.get(r, n)).data.direccionesNormalizadas) == null ? void 0 : o[0];
      if (a != null && a.coordenadas) {
        const m = a.coordenadas;
        return {
          x: Number.parseFloat(m.x),
          y: Number.parseFloat(m.y),
          srid: m.srid
        };
      }
      return;
    } catch (r) {
      w.isCancel(r) ? this.debug && console.debug("Request was aborted") : console.error("Error fetching coordinates:", r);
      return;
    } finally {
      this.lastRequest = null;
    }
  }
  /**
   * Get SMP (cadastral identifier) for an address
   */
  async getSMP(t) {
    var o;
    try {
      this.abort(), this.lastRequest = new AbortController();
      const r = t.codigo || ((o = t.calle) == null ? void 0 : o.codigo);
      if (!r || !t.altura)
        return;
      const n = `${be}/parcela/?codigo_calle=${encodeURIComponent(
        r
      )}&altura=${encodeURIComponent(
        String(t.altura)
      )}&geocodificar=true&srid=4326`, u = {
        headers: {
          Accept: "application/json"
        },
        signal: this.lastRequest.signal,
        timeout: this.serverTimeout
      };
      return (await w.get(n, u)).data.smp;
    } catch (r) {
      w.isCancel(r) ? this.debug && console.log("Request was aborted") : console.error("Error fetching catastro data:", r);
      return;
    } finally {
      this.lastRequest = null;
    }
  }
  /**
   * Check if the normalizer is initialized
   */
  static inicializado() {
    return !0;
  }
}
const ne = ({
  className: f = "",
  size: t = 24,
  color: o = "currentColor"
}) => /* @__PURE__ */ l.jsx(
  "svg",
  {
    width: t,
    height: t,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: o,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: f,
    children: /* @__PURE__ */ l.jsx("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" })
  }
), ae = ({
  className: f = "",
  size: t = 24,
  color: o = "currentColor"
}) => /* @__PURE__ */ l.jsx(
  "svg",
  {
    width: t,
    height: t,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: o,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: f,
    children: /* @__PURE__ */ l.jsx("polygon", { points: "3,11 22,2 13,21 11,13 3,11" })
  }
), Ee = ({
  maxSuggestions: f = 10,
  onAddressSelect: t,
  onAddressesChange: o,
  placeholder: r = "Buscar dirección o coordenadas...",
  debug: n = !1,
  className: u = "",
  inputClassName: a = "",
  suggestionsClassName: m = "",
  suggestionItemClassName: b = "",
  selectedAddressesClassName: y = "",
  loadingClassName: P = "",
  suggestionsContainerClassName: I = "",
  selectedAddressesContainerClassName: $ = "",
  selectedAddressItemClassName: _ = "",
  removeButtonClassName: B = "",
  errorClassName: A = "",
  iconClassName: N = "",
  titleClassName: x = "",
  subtitleClassName: D = "",
  coordsClassName: F = "",
  smpClassName: W = "",
  serverTimeout: G = 5e3
}) => {
  const [q, V] = E(""), [z, i] = E([]), [g, R] = E([]), [k, U] = E(!1), [Y, j] = E(!1), [M, O] = E(null), L = K(null), C = K(null);
  ce(() => (C.current = new le({
    debug: n,
    maxSuggestions: f,
    serverTimeout: G
  }), () => {
    L.current && clearTimeout(L.current), C.current && C.current.abort();
  }), [n, f, G]);
  const e = (s) => s.tipo === "CALLE" ? {
    title: s.nombre,
    subTitle: s.descripcion || "CABA",
    type: "CALLE",
    category: "CALLE",
    suggesterName: "Direcciones",
    data: {
      nombre: s.nombre,
      descripcion: s.descripcion || "",
      tipo: "CALLE",
      codigo: s.codigo
    }
  } : {
    title: s.nombre,
    subTitle: s.descripcion || "CABA",
    type: s.tipoDireccion,
    category: s.tipoDireccion,
    suggesterName: "Direcciones",
    data: {
      nombre: s.nombre,
      descripcion: s.descripcion || "",
      tipo: s.tipo,
      codigo: s.calle.codigo,
      altura: s.tipoDireccion === "DIRECCION_CALLE_ALTURA" ? s.altura : void 0,
      calle: {
        codigo: s.calle.codigo
      },
      coordenadas: s.coordenadas,
      smp: s.smp
    }
  }, c = ie(
    async (s) => {
      if (n && console.log(`getSuggestions('${s}')`), !C.current || !s || s.length < 3) {
        i([]);
        return;
      }
      try {
        U(!0), O(null);
        const S = (await C.current.normalizar(
          s,
          f
        )).map(e);
        i(S), j(!0), S.length === 0 && O("No se encontraron resultados");
      } catch (d) {
        console.error("Error getting suggestions:", d), i([]), O("Error al buscar direcciones");
      } finally {
        U(!1);
      }
    },
    [n, f]
  ), p = (s) => {
    const d = s.target.value;
    V(d), O(null), L.current && clearTimeout(L.current), C.current && C.current.abort(), d.length >= 3 ? (j(!0), U(!0), L.current = setTimeout(() => {
      c(d);
    }, 300)) : (i([]), j(!1), U(!1));
  }, h = (s) => {
    if (!g.some(
      (d) => d.data.nombre === s.data.nombre
    )) {
      const d = [...g, s];
      R(d), t && t(s), o && o(d);
    }
    V(""), i([]), j(!1);
  }, T = (s) => {
    const d = [...g];
    d.splice(s, 1), R(d), o && o(d);
  }, v = () => {
    q.length >= 3 && j(!0);
  }, J = () => {
    setTimeout(() => {
      j(!1);
    }, 200);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: `address-search-container ${u}`, children: [
    /* @__PURE__ */ l.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ l.jsx(
        "input",
        {
          type: "text",
          value: q,
          onChange: p,
          onFocus: v,
          onBlur: J,
          placeholder: r,
          className: `w-full p-2 border rounded ${a}`
        }
      ),
      k && /* @__PURE__ */ l.jsx(
        "div",
        {
          className: `absolute right-2 top-1/2 transform -translate-y-1/2 ${P}`,
          children: /* @__PURE__ */ l.jsx(ne, { className: "h-4 w-4 text-gray-500 animate-spin" })
        }
      ),
      (Y || k) && /* @__PURE__ */ l.jsx(
        "ul",
        {
          className: `absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-auto ${I}`,
          children: k ? /* @__PURE__ */ l.jsxs(
            "li",
            {
              className: `p-4 text-center text-gray-500 ${m}`,
              children: [
                /* @__PURE__ */ l.jsx(ne, { className: "h-5 w-5 mx-auto animate-spin mb-2" }),
                /* @__PURE__ */ l.jsx("span", { children: "Buscando direcciones..." })
              ]
            }
          ) : z.length > 0 ? z.map((s, d) => /* @__PURE__ */ l.jsx(
            "li",
            {
              className: `p-2 cursor-pointer hover:bg-gray-100 ${b}`,
              onClick: () => h(s),
              children: /* @__PURE__ */ l.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ l.jsx("div", { className: "mt-1", children: /* @__PURE__ */ l.jsx(
                  ae,
                  {
                    className: `h-4 w-4 text-blue-500 ${N}`
                  }
                ) }),
                /* @__PURE__ */ l.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ l.jsx("div", { className: `font-medium ${x}`, children: s.title }),
                  /* @__PURE__ */ l.jsx(
                    "div",
                    {
                      className: `text-sm text-gray-500 ${D}`,
                      children: s.subTitle
                    }
                  ),
                  s.data.coordenadas && /* @__PURE__ */ l.jsxs(
                    "div",
                    {
                      className: `text-xs text-gray-400 ${F}`,
                      children: [
                        "Coord: ",
                        s.data.coordenadas.x.toFixed(6),
                        ",",
                        " ",
                        s.data.coordenadas.y.toFixed(6)
                      ]
                    }
                  ),
                  s.data.smp && /* @__PURE__ */ l.jsxs(
                    "div",
                    {
                      className: `text-xs text-gray-400 ${W}`,
                      children: [
                        "SMP: ",
                        s.data.smp
                      ]
                    }
                  )
                ] })
              ] })
            },
            `${s.data.nombre}-${d}`
          )) : q.length >= 3 ? /* @__PURE__ */ l.jsx("li", { className: `p-4 text-center text-red-500 ${A}`, children: M || "No se encontraron resultados" }) : /* @__PURE__ */ l.jsx(
            "li",
            {
              className: `p-4 text-center text-gray-500 ${m}`,
              children: "Ingrese al menos 3 caracteres para buscar"
            }
          )
        }
      ),
      M && !k && !Y && /* @__PURE__ */ l.jsx("div", { className: `mt-1 text-sm text-red-500 ${A}`, children: M })
    ] }),
    g.length > 0 && /* @__PURE__ */ l.jsxs(
      "div",
      {
        className: `mt-4 ${y} ${$}`,
        children: [
          /* @__PURE__ */ l.jsx("h3", { className: "text-sm font-medium mb-2", children: "Direcciones seleccionadas:" }),
          /* @__PURE__ */ l.jsx("ul", { className: "space-y-2", children: g.map((s, d) => /* @__PURE__ */ l.jsxs(
            "li",
            {
              className: `flex justify-between items-center p-2 bg-gray-50 rounded ${_}`,
              children: [
                /* @__PURE__ */ l.jsxs("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ l.jsx("div", { className: "mt-1", children: /* @__PURE__ */ l.jsx(
                    ae,
                    {
                      className: `h-4 w-4 text-blue-500 ${N}`
                    }
                  ) }),
                  /* @__PURE__ */ l.jsxs("div", { children: [
                    /* @__PURE__ */ l.jsx("div", { className: `font-medium ${x}`, children: s.title }),
                    /* @__PURE__ */ l.jsx(
                      "div",
                      {
                        className: `text-sm text-gray-500 ${D}`,
                        children: s.subTitle
                      }
                    ),
                    s.data.coordenadas && /* @__PURE__ */ l.jsxs(
                      "div",
                      {
                        className: `text-xs text-gray-400 ${F}`,
                        children: [
                          "Coord: ",
                          s.data.coordenadas.x.toFixed(6),
                          ",",
                          " ",
                          s.data.coordenadas.y.toFixed(6)
                        ]
                      }
                    ),
                    s.data.smp && /* @__PURE__ */ l.jsxs("div", { className: `text-xs text-gray-400 ${W}`, children: [
                      "SMP: ",
                      s.data.smp
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ l.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => T(d),
                    className: `text-red-500 hover:text-red-700 ${B}`,
                    children: "×"
                  }
                )
              ]
            },
            `selected-${d}`
          )) })
        ]
      }
    )
  ] });
};
function Ae(f = {}) {
  const { maxSuggestions: t = 10, debug: o = !1, serverTimeout: r = 5e3 } = f, [n, u] = E(""), [a, m] = E([]), [b, y] = E([]), [P, I] = E(!1), [$, _] = E(null), [B, A] = E(!1), N = K(null), x = K(null);
  ce(() => (x.current = new le({
    debug: o,
    maxSuggestions: t,
    serverTimeout: r
  }), () => {
    N.current && clearTimeout(N.current), x.current && x.current.abort();
  }), [o, t, r]);
  const D = (i) => i.tipo === "CALLE" ? {
    title: i.nombre,
    subTitle: i.descripcion || "CABA",
    type: "CALLE",
    category: "CALLE",
    suggesterName: "Direcciones",
    data: {
      nombre: i.nombre,
      descripcion: i.descripcion || "",
      tipo: "CALLE",
      codigo: i.codigo
    }
  } : {
    title: i.nombre,
    subTitle: i.descripcion || "CABA",
    type: i.tipoDireccion,
    category: i.tipoDireccion,
    suggesterName: "Direcciones",
    data: {
      nombre: i.nombre,
      descripcion: i.descripcion || "",
      tipo: i.tipo,
      codigo: i.calle.codigo,
      altura: i.tipoDireccion === "DIRECCION_CALLE_ALTURA" ? i.altura : void 0,
      calle: {
        codigo: i.calle.codigo
      },
      coordenadas: i.coordenadas,
      smp: i.smp
    }
  }, F = ie(
    async (i) => {
      if (o && console.log(`fetchSuggestions('${i}')`), !x.current || !i || i.length < 3) {
        m([]);
        return;
      }
      try {
        I(!0), _(null);
        const R = (await x.current.normalizar(
          i,
          t
        )).map(D);
        m(R), R.length === 0 && _("No se encontraron resultados");
      } catch (g) {
        console.error("Error getting suggestions:", g), m([]), _("Error al buscar direcciones");
      } finally {
        I(!1);
      }
    },
    [o, t]
  );
  return {
    searchText: n,
    setSearchText: u,
    suggestions: a,
    selectedAddresses: b,
    isLoading: P,
    error: $,
    showSuggestions: B,
    setShowSuggestions: A,
    handleInputChange: (i) => {
      const g = i.target.value;
      u(g), _(null), N.current && clearTimeout(N.current), x.current && x.current.abort(), g.length >= 3 ? N.current = setTimeout(() => {
        F(g);
      }, 300) : m([]);
    },
    handleSelectSuggestion: (i) => {
      b.some(
        (g) => g.data.nombre === i.data.nombre
      ) || y((g) => [...g, i]), u(""), m([]), A(!1);
    },
    handleRemoveAddress: (i) => {
      y((g) => {
        const R = [...g];
        return R.splice(i, 1), R;
      });
    },
    handleInputFocus: () => {
      n.length >= 3 && a.length > 0 && A(!0);
    },
    handleInputBlur: () => {
      setTimeout(() => {
        A(!1);
      }, 200);
    }
  };
}
export {
  Ee as AddressSearch,
  Ae as useAddressSearch
};
