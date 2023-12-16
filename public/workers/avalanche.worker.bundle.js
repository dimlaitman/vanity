/*! For license information please see ethereum.worker.bundle.js.LICENSE.txt */
(() => {
  var e = {
      5956: (e, t, r) => {
        const i = r(7221),
          n = r(5811),
          f = r(1798);
        r.g.Buffer = r.g.Buffer || r(8764).Buffer;
        const { Buffer: a } = r(8764),
          o = (e) => {
            const t = i.publicKeyCreate(e, !1).slice(1);
            return n("keccak256")
              .update(a.from(t))
              .digest()
              .slice(-20)
              .toString("hex");
          },
          s = () => {
            const e = f(32);
            return {
              address: o(e).toString("hex"),
              privKey: e.toString("hex"),
            };
          },
          d = (e, t, r, i) => {
            const n = e.substring(0, t.length),
              f = e.substring(40 - r.length);
            return i
              ? t.toLowerCase() === n && r.toLowerCase() === f && c(e, t, r)
              : t === n && r === f;
          },
          c = (e, t, r) => {
            const i = n("keccak256").update(e).digest().toString("hex");
            for (let r = 0; r < t.length; r++)
              if (
                t[r] !== (parseInt(i[r], 16) >= 8 ? e[r].toUpperCase() : e[r])
              )
                return !1;
            for (let t = 0; t < r.length; t++) {
              const n = t + 40 - r.length;
              if (
                r[t] !== (parseInt(i[n], 16) >= 8 ? e[n].toUpperCase() : e[n])
              )
                return !1;
            }
            return !0;
          },
          h = (e) => {
            const t = n("keccak256").update(e).digest().toString("hex");
            let r = "";
            for (let i = 0; i < e.length; i++)
              r += parseInt(t[i], 16) >= 8 ? e[i].toUpperCase() : e[i];
            return r;
          };
        (onmessage = function (e) {
          const t = e.data;
          try {
            ((e, t, r, i) => {
              let n = s(),
                f = 1;
              const a = r ? e : e.toLowerCase(),
                o = r ? t : t.toLowerCase();
              for (; !d(n.address, a, o, r); )
                f >= 500 && (i({ attempts: f }), (f = 0)), (n = s()), f++;
              i({
                address: "0x" + h(n.address),
                privKey: n.privKey,
                attempts: f,
              });
            })(t.prefix, t.suffix, t.checksum, (e) => postMessage(e));
          } catch (e) {
            self.postMessage({ error: e.toString() });
          }
        }),
          (e.exports = { onmessage });
      },
      9742: (e, t) => {
        "use strict";
        (t.byteLength = function (e) {
          var t = o(e),
            r = t[0],
            i = t[1];
          return (3 * (r + i)) / 4 - i;
        }),
          (t.toByteArray = function (e) {
            var t,
              r,
              f = o(e),
              a = f[0],
              s = f[1],
              d = new n(
                (function (e, t, r) {
                  return (3 * (t + r)) / 4 - r;
                })(0, a, s)
              ),
              c = 0,
              h = s > 0 ? a - 4 : a;
            for (r = 0; r < h; r += 4)
              (t =
                (i[e.charCodeAt(r)] << 18) |
                (i[e.charCodeAt(r + 1)] << 12) |
                (i[e.charCodeAt(r + 2)] << 6) |
                i[e.charCodeAt(r + 3)]),
                (d[c++] = (t >> 16) & 255),
                (d[c++] = (t >> 8) & 255),
                (d[c++] = 255 & t);
            return (
              2 === s &&
                ((t =
                  (i[e.charCodeAt(r)] << 2) | (i[e.charCodeAt(r + 1)] >> 4)),
                (d[c++] = 255 & t)),
              1 === s &&
                ((t =
                  (i[e.charCodeAt(r)] << 10) |
                  (i[e.charCodeAt(r + 1)] << 4) |
                  (i[e.charCodeAt(r + 2)] >> 2)),
                (d[c++] = (t >> 8) & 255),
                (d[c++] = 255 & t)),
              d
            );
          }),
          (t.fromByteArray = function (e) {
            for (
              var t,
                i = e.length,
                n = i % 3,
                f = [],
                a = 16383,
                o = 0,
                d = i - n;
              o < d;
              o += a
            )
              f.push(s(e, o, o + a > d ? d : o + a));
            return (
              1 === n
                ? ((t = e[i - 1]), f.push(r[t >> 2] + r[(t << 4) & 63] + "=="))
                : 2 === n &&
                  ((t = (e[i - 2] << 8) + e[i - 1]),
                  f.push(
                    r[t >> 10] + r[(t >> 4) & 63] + r[(t << 2) & 63] + "="
                  )),
              f.join("")
            );
          });
        for (
          var r = [],
            i = [],
            n = "undefined" != typeof Uint8Array ? Uint8Array : Array,
            f =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            a = 0;
          a < 64;
          ++a
        )
          (r[a] = f[a]), (i[f.charCodeAt(a)] = a);
        function o(e) {
          var t = e.length;
          if (t % 4 > 0)
            throw new Error("Invalid string. Length must be a multiple of 4");
          var r = e.indexOf("=");
          return -1 === r && (r = t), [r, r === t ? 0 : 4 - (r % 4)];
        }
        function s(e, t, i) {
          for (var n, f, a = [], o = t; o < i; o += 3)
            (n =
              ((e[o] << 16) & 16711680) +
              ((e[o + 1] << 8) & 65280) +
              (255 & e[o + 2])),
              a.push(
                r[((f = n) >> 18) & 63] +
                  r[(f >> 12) & 63] +
                  r[(f >> 6) & 63] +
                  r[63 & f]
              );
          return a.join("");
        }
        (i["-".charCodeAt(0)] = 62), (i["_".charCodeAt(0)] = 63);
      },
      9931: (e, t, r) => {
        var i;
        function n(e) {
          this.rand = e;
        }
        if (
          ((e.exports = function (e) {
            return i || (i = new n(null)), i.generate(e);
          }),
          (e.exports.Rand = n),
          (n.prototype.generate = function (e) {
            return this._rand(e);
          }),
          (n.prototype._rand = function (e) {
            if (this.rand.getBytes) return this.rand.getBytes(e);
            for (var t = new Uint8Array(e), r = 0; r < t.length; r++)
              t[r] = this.rand.getByte();
            return t;
          }),
          "object" == typeof self)
        )
          self.crypto && self.crypto.getRandomValues
            ? (n.prototype._rand = function (e) {
                var t = new Uint8Array(e);
                return self.crypto.getRandomValues(t), t;
              })
            : self.msCrypto && self.msCrypto.getRandomValues
            ? (n.prototype._rand = function (e) {
                var t = new Uint8Array(e);
                return self.msCrypto.getRandomValues(t), t;
              })
            : "object" == typeof window &&
              (n.prototype._rand = function () {
                throw new Error("Not implemented yet");
              });
        else
          try {
            var f = r(9214);
            if ("function" != typeof f.randomBytes)
              throw new Error("Not supported");
            n.prototype._rand = function (e) {
              return f.randomBytes(e);
            };
          } catch (e) {}
      },
      8764: (e, t, r) => {
        "use strict";
        const i = r(9742),
          n = r(645),
          f =
            "function" == typeof Symbol && "function" == typeof Symbol.for
              ? Symbol.for("nodejs.util.inspect.custom")
              : null;
        (t.Buffer = s),
          (t.SlowBuffer = function (e) {
            return +e != e && (e = 0), s.alloc(+e);
          }),
          (t.INSPECT_MAX_BYTES = 50);
        const a = 2147483647;
        function o(e) {
          if (e > a)
            throw new RangeError(
              'The value "' + e + '" is invalid for option "size"'
            );
          const t = new Uint8Array(e);
          return Object.setPrototypeOf(t, s.prototype), t;
        }
        function s(e, t, r) {
          if ("number" == typeof e) {
            if ("string" == typeof t)
              throw new TypeError(
                'The "string" argument must be of type string. Received type number'
              );
            return h(e);
          }
          return d(e, t, r);
        }
        function d(e, t, r) {
          if ("string" == typeof e)
            return (function (e, t) {
              if (
                (("string" == typeof t && "" !== t) || (t = "utf8"),
                !s.isEncoding(t))
              )
                throw new TypeError("Unknown encoding: " + t);
              const r = 0 | p(e, t);
              let i = o(r);
              const n = i.write(e, t);
              return n !== r && (i = i.slice(0, n)), i;
            })(e, t);
          if (ArrayBuffer.isView(e))
            return (function (e) {
              if (Y(e, Uint8Array)) {
                const t = new Uint8Array(e);
                return l(t.buffer, t.byteOffset, t.byteLength);
              }
              return u(e);
            })(e);
          if (null == e)
            throw new TypeError(
              "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                typeof e
            );
          if (Y(e, ArrayBuffer) || (e && Y(e.buffer, ArrayBuffer)))
            return l(e, t, r);
          if (
            "undefined" != typeof SharedArrayBuffer &&
            (Y(e, SharedArrayBuffer) || (e && Y(e.buffer, SharedArrayBuffer)))
          )
            return l(e, t, r);
          if ("number" == typeof e)
            throw new TypeError(
              'The "value" argument must not be of type number. Received type number'
            );
          const i = e.valueOf && e.valueOf();
          if (null != i && i !== e) return s.from(i, t, r);
          const n = (function (e) {
            if (s.isBuffer(e)) {
              const t = 0 | b(e.length),
                r = o(t);
              return 0 === r.length || e.copy(r, 0, 0, t), r;
            }
            return void 0 !== e.length
              ? "number" != typeof e.length || J(e.length)
                ? o(0)
                : u(e)
              : "Buffer" === e.type && Array.isArray(e.data)
              ? u(e.data)
              : void 0;
          })(e);
          if (n) return n;
          if (
            "undefined" != typeof Symbol &&
            null != Symbol.toPrimitive &&
            "function" == typeof e[Symbol.toPrimitive]
          )
            return s.from(e[Symbol.toPrimitive]("string"), t, r);
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
              typeof e
          );
        }
        function c(e) {
          if ("number" != typeof e)
            throw new TypeError('"size" argument must be of type number');
          if (e < 0)
            throw new RangeError(
              'The value "' + e + '" is invalid for option "size"'
            );
        }
        function h(e) {
          return c(e), o(e < 0 ? 0 : 0 | b(e));
        }
        function u(e) {
          const t = e.length < 0 ? 0 : 0 | b(e.length),
            r = o(t);
          for (let i = 0; i < t; i += 1) r[i] = 255 & e[i];
          return r;
        }
        function l(e, t, r) {
          if (t < 0 || e.byteLength < t)
            throw new RangeError('"offset" is outside of buffer bounds');
          if (e.byteLength < t + (r || 0))
            throw new RangeError('"length" is outside of buffer bounds');
          let i;
          return (
            (i =
              void 0 === t && void 0 === r
                ? new Uint8Array(e)
                : void 0 === r
                ? new Uint8Array(e, t)
                : new Uint8Array(e, t, r)),
            Object.setPrototypeOf(i, s.prototype),
            i
          );
        }
        function b(e) {
          if (e >= a)
            throw new RangeError(
              "Attempt to allocate Buffer larger than maximum size: 0x" +
                a.toString(16) +
                " bytes"
            );
          return 0 | e;
        }
        function p(e, t) {
          if (s.isBuffer(e)) return e.length;
          if (ArrayBuffer.isView(e) || Y(e, ArrayBuffer)) return e.byteLength;
          if ("string" != typeof e)
            throw new TypeError(
              'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
                typeof e
            );
          const r = e.length,
            i = arguments.length > 2 && !0 === arguments[2];
          if (!i && 0 === r) return 0;
          let n = !1;
          for (;;)
            switch (t) {
              case "ascii":
              case "latin1":
              case "binary":
                return r;
              case "utf8":
              case "utf-8":
                return V(e).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return 2 * r;
              case "hex":
                return r >>> 1;
              case "base64":
                return Z(e).length;
              default:
                if (n) return i ? -1 : V(e).length;
                (t = ("" + t).toLowerCase()), (n = !0);
            }
        }
        function y(e, t, r) {
          let i = !1;
          if (((void 0 === t || t < 0) && (t = 0), t > this.length)) return "";
          if (((void 0 === r || r > this.length) && (r = this.length), r <= 0))
            return "";
          if ((r >>>= 0) <= (t >>>= 0)) return "";
          for (e || (e = "utf8"); ; )
            switch (e) {
              case "hex":
                return B(this, t, r);
              case "utf8":
              case "utf-8":
                return x(this, t, r);
              case "ascii":
                return I(this, t, r);
              case "latin1":
              case "binary":
                return k(this, t, r);
              case "base64":
                return E(this, t, r);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return L(this, t, r);
              default:
                if (i) throw new TypeError("Unknown encoding: " + e);
                (e = (e + "").toLowerCase()), (i = !0);
            }
        }
        function m(e, t, r) {
          const i = e[t];
          (e[t] = e[r]), (e[r] = i);
        }
        function g(e, t, r, i, n) {
          if (0 === e.length) return -1;
          if (
            ("string" == typeof r
              ? ((i = r), (r = 0))
              : r > 2147483647
              ? (r = 2147483647)
              : r < -2147483648 && (r = -2147483648),
            J((r = +r)) && (r = n ? 0 : e.length - 1),
            r < 0 && (r = e.length + r),
            r >= e.length)
          ) {
            if (n) return -1;
            r = e.length - 1;
          } else if (r < 0) {
            if (!n) return -1;
            r = 0;
          }
          if (("string" == typeof t && (t = s.from(t, i)), s.isBuffer(t)))
            return 0 === t.length ? -1 : v(e, t, r, i, n);
          if ("number" == typeof t)
            return (
              (t &= 255),
              "function" == typeof Uint8Array.prototype.indexOf
                ? n
                  ? Uint8Array.prototype.indexOf.call(e, t, r)
                  : Uint8Array.prototype.lastIndexOf.call(e, t, r)
                : v(e, [t], r, i, n)
            );
          throw new TypeError("val must be string, number or Buffer");
        }
        function v(e, t, r, i, n) {
          let f,
            a = 1,
            o = e.length,
            s = t.length;
          if (
            void 0 !== i &&
            ("ucs2" === (i = String(i).toLowerCase()) ||
              "ucs-2" === i ||
              "utf16le" === i ||
              "utf-16le" === i)
          ) {
            if (e.length < 2 || t.length < 2) return -1;
            (a = 2), (o /= 2), (s /= 2), (r /= 2);
          }
          function d(e, t) {
            return 1 === a ? e[t] : e.readUInt16BE(t * a);
          }
          if (n) {
            let i = -1;
            for (f = r; f < o; f++)
              if (d(e, f) === d(t, -1 === i ? 0 : f - i)) {
                if ((-1 === i && (i = f), f - i + 1 === s)) return i * a;
              } else -1 !== i && (f -= f - i), (i = -1);
          } else
            for (r + s > o && (r = o - s), f = r; f >= 0; f--) {
              let r = !0;
              for (let i = 0; i < s; i++)
                if (d(e, f + i) !== d(t, i)) {
                  r = !1;
                  break;
                }
              if (r) return f;
            }
          return -1;
        }
        function w(e, t, r, i) {
          r = Number(r) || 0;
          const n = e.length - r;
          i ? (i = Number(i)) > n && (i = n) : (i = n);
          const f = t.length;
          let a;
          for (i > f / 2 && (i = f / 2), a = 0; a < i; ++a) {
            const i = parseInt(t.substr(2 * a, 2), 16);
            if (J(i)) return a;
            e[r + a] = i;
          }
          return a;
        }
        function M(e, t, r, i) {
          return $(V(t, e.length - r), e, r, i);
        }
        function _(e, t, r, i) {
          return $(
            (function (e) {
              const t = [];
              for (let r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
              return t;
            })(t),
            e,
            r,
            i
          );
        }
        function S(e, t, r, i) {
          return $(Z(t), e, r, i);
        }
        function A(e, t, r, i) {
          return $(
            (function (e, t) {
              let r, i, n;
              const f = [];
              for (let a = 0; a < e.length && !((t -= 2) < 0); ++a)
                (r = e.charCodeAt(a)),
                  (i = r >> 8),
                  (n = r % 256),
                  f.push(n),
                  f.push(i);
              return f;
            })(t, e.length - r),
            e,
            r,
            i
          );
        }
        function E(e, t, r) {
          return 0 === t && r === e.length
            ? i.fromByteArray(e)
            : i.fromByteArray(e.slice(t, r));
        }
        function x(e, t, r) {
          r = Math.min(e.length, r);
          const i = [];
          let n = t;
          for (; n < r; ) {
            const t = e[n];
            let f = null,
              a = t > 239 ? 4 : t > 223 ? 3 : t > 191 ? 2 : 1;
            if (n + a <= r) {
              let r, i, o, s;
              switch (a) {
                case 1:
                  t < 128 && (f = t);
                  break;
                case 2:
                  (r = e[n + 1]),
                    128 == (192 & r) &&
                      ((s = ((31 & t) << 6) | (63 & r)), s > 127 && (f = s));
                  break;
                case 3:
                  (r = e[n + 1]),
                    (i = e[n + 2]),
                    128 == (192 & r) &&
                      128 == (192 & i) &&
                      ((s = ((15 & t) << 12) | ((63 & r) << 6) | (63 & i)),
                      s > 2047 && (s < 55296 || s > 57343) && (f = s));
                  break;
                case 4:
                  (r = e[n + 1]),
                    (i = e[n + 2]),
                    (o = e[n + 3]),
                    128 == (192 & r) &&
                      128 == (192 & i) &&
                      128 == (192 & o) &&
                      ((s =
                        ((15 & t) << 18) |
                        ((63 & r) << 12) |
                        ((63 & i) << 6) |
                        (63 & o)),
                      s > 65535 && s < 1114112 && (f = s));
              }
            }
            null === f
              ? ((f = 65533), (a = 1))
              : f > 65535 &&
                ((f -= 65536),
                i.push(((f >>> 10) & 1023) | 55296),
                (f = 56320 | (1023 & f))),
              i.push(f),
              (n += a);
          }
          return (function (e) {
            const t = e.length;
            if (t <= R) return String.fromCharCode.apply(String, e);
            let r = "",
              i = 0;
            for (; i < t; )
              r += String.fromCharCode.apply(String, e.slice(i, (i += R)));
            return r;
          })(i);
        }
        (t.kMaxLength = a),
          (s.TYPED_ARRAY_SUPPORT = (function () {
            try {
              const e = new Uint8Array(1),
                t = {
                  foo: function () {
                    return 42;
                  },
                };
              return (
                Object.setPrototypeOf(t, Uint8Array.prototype),
                Object.setPrototypeOf(e, t),
                42 === e.foo()
              );
            } catch (e) {
              return !1;
            }
          })()),
          s.TYPED_ARRAY_SUPPORT ||
            "undefined" == typeof console ||
            "function" != typeof console.error ||
            console.error(
              "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
            ),
          Object.defineProperty(s.prototype, "parent", {
            enumerable: !0,
            get: function () {
              if (s.isBuffer(this)) return this.buffer;
            },
          }),
          Object.defineProperty(s.prototype, "offset", {
            enumerable: !0,
            get: function () {
              if (s.isBuffer(this)) return this.byteOffset;
            },
          }),
          (s.poolSize = 8192),
          (s.from = function (e, t, r) {
            return d(e, t, r);
          }),
          Object.setPrototypeOf(s.prototype, Uint8Array.prototype),
          Object.setPrototypeOf(s, Uint8Array),
          (s.alloc = function (e, t, r) {
            return (function (e, t, r) {
              return (
                c(e),
                e <= 0
                  ? o(e)
                  : void 0 !== t
                  ? "string" == typeof r
                    ? o(e).fill(t, r)
                    : o(e).fill(t)
                  : o(e)
              );
            })(e, t, r);
          }),
          (s.allocUnsafe = function (e) {
            return h(e);
          }),
          (s.allocUnsafeSlow = function (e) {
            return h(e);
          }),
          (s.isBuffer = function (e) {
            return null != e && !0 === e._isBuffer && e !== s.prototype;
          }),
          (s.compare = function (e, t) {
            if (
              (Y(e, Uint8Array) && (e = s.from(e, e.offset, e.byteLength)),
              Y(t, Uint8Array) && (t = s.from(t, t.offset, t.byteLength)),
              !s.isBuffer(e) || !s.isBuffer(t))
            )
              throw new TypeError(
                'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
              );
            if (e === t) return 0;
            let r = e.length,
              i = t.length;
            for (let n = 0, f = Math.min(r, i); n < f; ++n)
              if (e[n] !== t[n]) {
                (r = e[n]), (i = t[n]);
                break;
              }
            return r < i ? -1 : i < r ? 1 : 0;
          }),
          (s.isEncoding = function (e) {
            switch (String(e).toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "latin1":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return !0;
              default:
                return !1;
            }
          }),
          (s.concat = function (e, t) {
            if (!Array.isArray(e))
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            if (0 === e.length) return s.alloc(0);
            let r;
            if (void 0 === t)
              for (t = 0, r = 0; r < e.length; ++r) t += e[r].length;
            const i = s.allocUnsafe(t);
            let n = 0;
            for (r = 0; r < e.length; ++r) {
              let t = e[r];
              if (Y(t, Uint8Array))
                n + t.length > i.length
                  ? (s.isBuffer(t) || (t = s.from(t)), t.copy(i, n))
                  : Uint8Array.prototype.set.call(i, t, n);
              else {
                if (!s.isBuffer(t))
                  throw new TypeError(
                    '"list" argument must be an Array of Buffers'
                  );
                t.copy(i, n);
              }
              n += t.length;
            }
            return i;
          }),
          (s.byteLength = p),
          (s.prototype._isBuffer = !0),
          (s.prototype.swap16 = function () {
            const e = this.length;
            if (e % 2 != 0)
              throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (let t = 0; t < e; t += 2) m(this, t, t + 1);
            return this;
          }),
          (s.prototype.swap32 = function () {
            const e = this.length;
            if (e % 4 != 0)
              throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (let t = 0; t < e; t += 4)
              m(this, t, t + 3), m(this, t + 1, t + 2);
            return this;
          }),
          (s.prototype.swap64 = function () {
            const e = this.length;
            if (e % 8 != 0)
              throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (let t = 0; t < e; t += 8)
              m(this, t, t + 7),
                m(this, t + 1, t + 6),
                m(this, t + 2, t + 5),
                m(this, t + 3, t + 4);
            return this;
          }),
          (s.prototype.toString = function () {
            const e = this.length;
            return 0 === e
              ? ""
              : 0 === arguments.length
              ? x(this, 0, e)
              : y.apply(this, arguments);
          }),
          (s.prototype.toLocaleString = s.prototype.toString),
          (s.prototype.equals = function (e) {
            if (!s.isBuffer(e))
              throw new TypeError("Argument must be a Buffer");
            return this === e || 0 === s.compare(this, e);
          }),
          (s.prototype.inspect = function () {
            let e = "";
            const r = t.INSPECT_MAX_BYTES;
            return (
              (e = this.toString("hex", 0, r)
                .replace(/(.{2})/g, "$1 ")
                .trim()),
              this.length > r && (e += " ... "),
              "<Buffer " + e + ">"
            );
          }),
          f && (s.prototype[f] = s.prototype.inspect),
          (s.prototype.compare = function (e, t, r, i, n) {
            if (
              (Y(e, Uint8Array) && (e = s.from(e, e.offset, e.byteLength)),
              !s.isBuffer(e))
            )
              throw new TypeError(
                'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                  typeof e
              );
            if (
              (void 0 === t && (t = 0),
              void 0 === r && (r = e ? e.length : 0),
              void 0 === i && (i = 0),
              void 0 === n && (n = this.length),
              t < 0 || r > e.length || i < 0 || n > this.length)
            )
              throw new RangeError("out of range index");
            if (i >= n && t >= r) return 0;
            if (i >= n) return -1;
            if (t >= r) return 1;
            if (this === e) return 0;
            let f = (n >>>= 0) - (i >>>= 0),
              a = (r >>>= 0) - (t >>>= 0);
            const o = Math.min(f, a),
              d = this.slice(i, n),
              c = e.slice(t, r);
            for (let e = 0; e < o; ++e)
              if (d[e] !== c[e]) {
                (f = d[e]), (a = c[e]);
                break;
              }
            return f < a ? -1 : a < f ? 1 : 0;
          }),
          (s.prototype.includes = function (e, t, r) {
            return -1 !== this.indexOf(e, t, r);
          }),
          (s.prototype.indexOf = function (e, t, r) {
            return g(this, e, t, r, !0);
          }),
          (s.prototype.lastIndexOf = function (e, t, r) {
            return g(this, e, t, r, !1);
          }),
          (s.prototype.write = function (e, t, r, i) {
            if (void 0 === t) (i = "utf8"), (r = this.length), (t = 0);
            else if (void 0 === r && "string" == typeof t)
              (i = t), (r = this.length), (t = 0);
            else {
              if (!isFinite(t))
                throw new Error(
                  "Buffer.write(string, encoding, offset[, length]) is no longer supported"
                );
              (t >>>= 0),
                isFinite(r)
                  ? ((r >>>= 0), void 0 === i && (i = "utf8"))
                  : ((i = r), (r = void 0));
            }
            const n = this.length - t;
            if (
              ((void 0 === r || r > n) && (r = n),
              (e.length > 0 && (r < 0 || t < 0)) || t > this.length)
            )
              throw new RangeError("Attempt to write outside buffer bounds");
            i || (i = "utf8");
            let f = !1;
            for (;;)
              switch (i) {
                case "hex":
                  return w(this, e, t, r);
                case "utf8":
                case "utf-8":
                  return M(this, e, t, r);
                case "ascii":
                case "latin1":
                case "binary":
                  return _(this, e, t, r);
                case "base64":
                  return S(this, e, t, r);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return A(this, e, t, r);
                default:
                  if (f) throw new TypeError("Unknown encoding: " + i);
                  (i = ("" + i).toLowerCase()), (f = !0);
              }
          }),
          (s.prototype.toJSON = function () {
            return {
              type: "Buffer",
              data: Array.prototype.slice.call(this._arr || this, 0),
            };
          });
        const R = 4096;
        function I(e, t, r) {
          let i = "";
          r = Math.min(e.length, r);
          for (let n = t; n < r; ++n) i += String.fromCharCode(127 & e[n]);
          return i;
        }
        function k(e, t, r) {
          let i = "";
          r = Math.min(e.length, r);
          for (let n = t; n < r; ++n) i += String.fromCharCode(e[n]);
          return i;
        }
        function B(e, t, r) {
          const i = e.length;
          (!t || t < 0) && (t = 0), (!r || r < 0 || r > i) && (r = i);
          let n = "";
          for (let i = t; i < r; ++i) n += X[e[i]];
          return n;
        }
        function L(e, t, r) {
          const i = e.slice(t, r);
          let n = "";
          for (let e = 0; e < i.length - 1; e += 2)
            n += String.fromCharCode(i[e] + 256 * i[e + 1]);
          return n;
        }
        function T(e, t, r) {
          if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
          if (e + t > r)
            throw new RangeError("Trying to access beyond buffer length");
        }
        function P(e, t, r, i, n, f) {
          if (!s.isBuffer(e))
            throw new TypeError('"buffer" argument must be a Buffer instance');
          if (t > n || t < f)
            throw new RangeError('"value" argument is out of bounds');
          if (r + i > e.length) throw new RangeError("Index out of range");
        }
        function z(e, t, r, i, n) {
          F(t, i, n, e, r, 7);
          let f = Number(t & BigInt(4294967295));
          (e[r++] = f),
            (f >>= 8),
            (e[r++] = f),
            (f >>= 8),
            (e[r++] = f),
            (f >>= 8),
            (e[r++] = f);
          let a = Number((t >> BigInt(32)) & BigInt(4294967295));
          return (
            (e[r++] = a),
            (a >>= 8),
            (e[r++] = a),
            (a >>= 8),
            (e[r++] = a),
            (a >>= 8),
            (e[r++] = a),
            r
          );
        }
        function O(e, t, r, i, n) {
          F(t, i, n, e, r, 7);
          let f = Number(t & BigInt(4294967295));
          (e[r + 7] = f),
            (f >>= 8),
            (e[r + 6] = f),
            (f >>= 8),
            (e[r + 5] = f),
            (f >>= 8),
            (e[r + 4] = f);
          let a = Number((t >> BigInt(32)) & BigInt(4294967295));
          return (
            (e[r + 3] = a),
            (a >>= 8),
            (e[r + 2] = a),
            (a >>= 8),
            (e[r + 1] = a),
            (a >>= 8),
            (e[r] = a),
            r + 8
          );
        }
        function N(e, t, r, i, n, f) {
          if (r + i > e.length) throw new RangeError("Index out of range");
          if (r < 0) throw new RangeError("Index out of range");
        }
        function q(e, t, r, i, f) {
          return (
            (t = +t),
            (r >>>= 0),
            f || N(e, 0, r, 4),
            n.write(e, t, r, i, 23, 4),
            r + 4
          );
        }
        function C(e, t, r, i, f) {
          return (
            (t = +t),
            (r >>>= 0),
            f || N(e, 0, r, 8),
            n.write(e, t, r, i, 52, 8),
            r + 8
          );
        }
        (s.prototype.slice = function (e, t) {
          const r = this.length;
          (e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
            (t = void 0 === t ? r : ~~t) < 0
              ? (t += r) < 0 && (t = 0)
              : t > r && (t = r),
            t < e && (t = e);
          const i = this.subarray(e, t);
          return Object.setPrototypeOf(i, s.prototype), i;
        }),
          (s.prototype.readUintLE = s.prototype.readUIntLE =
            function (e, t, r) {
              (e >>>= 0), (t >>>= 0), r || T(e, t, this.length);
              let i = this[e],
                n = 1,
                f = 0;
              for (; ++f < t && (n *= 256); ) i += this[e + f] * n;
              return i;
            }),
          (s.prototype.readUintBE = s.prototype.readUIntBE =
            function (e, t, r) {
              (e >>>= 0), (t >>>= 0), r || T(e, t, this.length);
              let i = this[e + --t],
                n = 1;
              for (; t > 0 && (n *= 256); ) i += this[e + --t] * n;
              return i;
            }),
          (s.prototype.readUint8 = s.prototype.readUInt8 =
            function (e, t) {
              return (e >>>= 0), t || T(e, 1, this.length), this[e];
            }),
          (s.prototype.readUint16LE = s.prototype.readUInt16LE =
            function (e, t) {
              return (
                (e >>>= 0),
                t || T(e, 2, this.length),
                this[e] | (this[e + 1] << 8)
              );
            }),
          (s.prototype.readUint16BE = s.prototype.readUInt16BE =
            function (e, t) {
              return (
                (e >>>= 0),
                t || T(e, 2, this.length),
                (this[e] << 8) | this[e + 1]
              );
            }),
          (s.prototype.readUint32LE = s.prototype.readUInt32LE =
            function (e, t) {
              return (
                (e >>>= 0),
                t || T(e, 4, this.length),
                (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
                  16777216 * this[e + 3]
              );
            }),
          (s.prototype.readUint32BE = s.prototype.readUInt32BE =
            function (e, t) {
              return (
                (e >>>= 0),
                t || T(e, 4, this.length),
                16777216 * this[e] +
                  ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
              );
            }),
          (s.prototype.readBigUInt64LE = G(function (e) {
            K((e >>>= 0), "offset");
            const t = this[e],
              r = this[e + 7];
            (void 0 !== t && void 0 !== r) || W(e, this.length - 8);
            const i =
                t + 256 * this[++e] + 65536 * this[++e] + this[++e] * 2 ** 24,
              n = this[++e] + 256 * this[++e] + 65536 * this[++e] + r * 2 ** 24;
            return BigInt(i) + (BigInt(n) << BigInt(32));
          })),
          (s.prototype.readBigUInt64BE = G(function (e) {
            K((e >>>= 0), "offset");
            const t = this[e],
              r = this[e + 7];
            (void 0 !== t && void 0 !== r) || W(e, this.length - 8);
            const i =
                t * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + this[++e],
              n = this[++e] * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + r;
            return (BigInt(i) << BigInt(32)) + BigInt(n);
          })),
          (s.prototype.readIntLE = function (e, t, r) {
            (e >>>= 0), (t >>>= 0), r || T(e, t, this.length);
            let i = this[e],
              n = 1,
              f = 0;
            for (; ++f < t && (n *= 256); ) i += this[e + f] * n;
            return (n *= 128), i >= n && (i -= Math.pow(2, 8 * t)), i;
          }),
          (s.prototype.readIntBE = function (e, t, r) {
            (e >>>= 0), (t >>>= 0), r || T(e, t, this.length);
            let i = t,
              n = 1,
              f = this[e + --i];
            for (; i > 0 && (n *= 256); ) f += this[e + --i] * n;
            return (n *= 128), f >= n && (f -= Math.pow(2, 8 * t)), f;
          }),
          (s.prototype.readInt8 = function (e, t) {
            return (
              (e >>>= 0),
              t || T(e, 1, this.length),
              128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
            );
          }),
          (s.prototype.readInt16LE = function (e, t) {
            (e >>>= 0), t || T(e, 2, this.length);
            const r = this[e] | (this[e + 1] << 8);
            return 32768 & r ? 4294901760 | r : r;
          }),
          (s.prototype.readInt16BE = function (e, t) {
            (e >>>= 0), t || T(e, 2, this.length);
            const r = this[e + 1] | (this[e] << 8);
            return 32768 & r ? 4294901760 | r : r;
          }),
          (s.prototype.readInt32LE = function (e, t) {
            return (
              (e >>>= 0),
              t || T(e, 4, this.length),
              this[e] |
                (this[e + 1] << 8) |
                (this[e + 2] << 16) |
                (this[e + 3] << 24)
            );
          }),
          (s.prototype.readInt32BE = function (e, t) {
            return (
              (e >>>= 0),
              t || T(e, 4, this.length),
              (this[e] << 24) |
                (this[e + 1] << 16) |
                (this[e + 2] << 8) |
                this[e + 3]
            );
          }),
          (s.prototype.readBigInt64LE = G(function (e) {
            K((e >>>= 0), "offset");
            const t = this[e],
              r = this[e + 7];
            (void 0 !== t && void 0 !== r) || W(e, this.length - 8);
            const i =
              this[e + 4] + 256 * this[e + 5] + 65536 * this[e + 6] + (r << 24);
            return (
              (BigInt(i) << BigInt(32)) +
              BigInt(
                t + 256 * this[++e] + 65536 * this[++e] + this[++e] * 2 ** 24
              )
            );
          })),
          (s.prototype.readBigInt64BE = G(function (e) {
            K((e >>>= 0), "offset");
            const t = this[e],
              r = this[e + 7];
            (void 0 !== t && void 0 !== r) || W(e, this.length - 8);
            const i =
              (t << 24) + 65536 * this[++e] + 256 * this[++e] + this[++e];
            return (
              (BigInt(i) << BigInt(32)) +
              BigInt(
                this[++e] * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + r
              )
            );
          })),
          (s.prototype.readFloatLE = function (e, t) {
            return (
              (e >>>= 0), t || T(e, 4, this.length), n.read(this, e, !0, 23, 4)
            );
          }),
          (s.prototype.readFloatBE = function (e, t) {
            return (
              (e >>>= 0), t || T(e, 4, this.length), n.read(this, e, !1, 23, 4)
            );
          }),
          (s.prototype.readDoubleLE = function (e, t) {
            return (
              (e >>>= 0), t || T(e, 8, this.length), n.read(this, e, !0, 52, 8)
            );
          }),
          (s.prototype.readDoubleBE = function (e, t) {
            return (
              (e >>>= 0), t || T(e, 8, this.length), n.read(this, e, !1, 52, 8)
            );
          }),
          (s.prototype.writeUintLE = s.prototype.writeUIntLE =
            function (e, t, r, i) {
              (e = +e),
                (t >>>= 0),
                (r >>>= 0),
                i || P(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
              let n = 1,
                f = 0;
              for (this[t] = 255 & e; ++f < r && (n *= 256); )
                this[t + f] = (e / n) & 255;
              return t + r;
            }),
          (s.prototype.writeUintBE = s.prototype.writeUIntBE =
            function (e, t, r, i) {
              (e = +e),
                (t >>>= 0),
                (r >>>= 0),
                i || P(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
              let n = r - 1,
                f = 1;
              for (this[t + n] = 255 & e; --n >= 0 && (f *= 256); )
                this[t + n] = (e / f) & 255;
              return t + r;
            }),
          (s.prototype.writeUint8 = s.prototype.writeUInt8 =
            function (e, t, r) {
              return (
                (e = +e),
                (t >>>= 0),
                r || P(this, e, t, 1, 255, 0),
                (this[t] = 255 & e),
                t + 1
              );
            }),
          (s.prototype.writeUint16LE = s.prototype.writeUInt16LE =
            function (e, t, r) {
              return (
                (e = +e),
                (t >>>= 0),
                r || P(this, e, t, 2, 65535, 0),
                (this[t] = 255 & e),
                (this[t + 1] = e >>> 8),
                t + 2
              );
            }),
          (s.prototype.writeUint16BE = s.prototype.writeUInt16BE =
            function (e, t, r) {
              return (
                (e = +e),
                (t >>>= 0),
                r || P(this, e, t, 2, 65535, 0),
                (this[t] = e >>> 8),
                (this[t + 1] = 255 & e),
                t + 2
              );
            }),
          (s.prototype.writeUint32LE = s.prototype.writeUInt32LE =
            function (e, t, r) {
              return (
                (e = +e),
                (t >>>= 0),
                r || P(this, e, t, 4, 4294967295, 0),
                (this[t + 3] = e >>> 24),
                (this[t + 2] = e >>> 16),
                (this[t + 1] = e >>> 8),
                (this[t] = 255 & e),
                t + 4
              );
            }),
          (s.prototype.writeUint32BE = s.prototype.writeUInt32BE =
            function (e, t, r) {
              return (
                (e = +e),
                (t >>>= 0),
                r || P(this, e, t, 4, 4294967295, 0),
                (this[t] = e >>> 24),
                (this[t + 1] = e >>> 16),
                (this[t + 2] = e >>> 8),
                (this[t + 3] = 255 & e),
                t + 4
              );
            }),
          (s.prototype.writeBigUInt64LE = G(function (e, t = 0) {
            return z(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"));
          })),
          (s.prototype.writeBigUInt64BE = G(function (e, t = 0) {
            return O(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"));
          })),
          (s.prototype.writeIntLE = function (e, t, r, i) {
            if (((e = +e), (t >>>= 0), !i)) {
              const i = Math.pow(2, 8 * r - 1);
              P(this, e, t, r, i - 1, -i);
            }
            let n = 0,
              f = 1,
              a = 0;
            for (this[t] = 255 & e; ++n < r && (f *= 256); )
              e < 0 && 0 === a && 0 !== this[t + n - 1] && (a = 1),
                (this[t + n] = (((e / f) >> 0) - a) & 255);
            return t + r;
          }),
          (s.prototype.writeIntBE = function (e, t, r, i) {
            if (((e = +e), (t >>>= 0), !i)) {
              const i = Math.pow(2, 8 * r - 1);
              P(this, e, t, r, i - 1, -i);
            }
            let n = r - 1,
              f = 1,
              a = 0;
            for (this[t + n] = 255 & e; --n >= 0 && (f *= 256); )
              e < 0 && 0 === a && 0 !== this[t + n + 1] && (a = 1),
                (this[t + n] = (((e / f) >> 0) - a) & 255);
            return t + r;
          }),
          (s.prototype.writeInt8 = function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || P(this, e, t, 1, 127, -128),
              e < 0 && (e = 255 + e + 1),
              (this[t] = 255 & e),
              t + 1
            );
          }),
          (s.prototype.writeInt16LE = function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || P(this, e, t, 2, 32767, -32768),
              (this[t] = 255 & e),
              (this[t + 1] = e >>> 8),
              t + 2
            );
          }),
          (s.prototype.writeInt16BE = function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || P(this, e, t, 2, 32767, -32768),
              (this[t] = e >>> 8),
              (this[t + 1] = 255 & e),
              t + 2
            );
          }),
          (s.prototype.writeInt32LE = function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || P(this, e, t, 4, 2147483647, -2147483648),
              (this[t] = 255 & e),
              (this[t + 1] = e >>> 8),
              (this[t + 2] = e >>> 16),
              (this[t + 3] = e >>> 24),
              t + 4
            );
          }),
          (s.prototype.writeInt32BE = function (e, t, r) {
            return (
              (e = +e),
              (t >>>= 0),
              r || P(this, e, t, 4, 2147483647, -2147483648),
              e < 0 && (e = 4294967295 + e + 1),
              (this[t] = e >>> 24),
              (this[t + 1] = e >>> 16),
              (this[t + 2] = e >>> 8),
              (this[t + 3] = 255 & e),
              t + 4
            );
          }),
          (s.prototype.writeBigInt64LE = G(function (e, t = 0) {
            return z(
              this,
              e,
              t,
              -BigInt("0x8000000000000000"),
              BigInt("0x7fffffffffffffff")
            );
          })),
          (s.prototype.writeBigInt64BE = G(function (e, t = 0) {
            return O(
              this,
              e,
              t,
              -BigInt("0x8000000000000000"),
              BigInt("0x7fffffffffffffff")
            );
          })),
          (s.prototype.writeFloatLE = function (e, t, r) {
            return q(this, e, t, !0, r);
          }),
          (s.prototype.writeFloatBE = function (e, t, r) {
            return q(this, e, t, !1, r);
          }),
          (s.prototype.writeDoubleLE = function (e, t, r) {
            return C(this, e, t, !0, r);
          }),
          (s.prototype.writeDoubleBE = function (e, t, r) {
            return C(this, e, t, !1, r);
          }),
          (s.prototype.copy = function (e, t, r, i) {
            if (!s.isBuffer(e))
              throw new TypeError("argument should be a Buffer");
            if (
              (r || (r = 0),
              i || 0 === i || (i = this.length),
              t >= e.length && (t = e.length),
              t || (t = 0),
              i > 0 && i < r && (i = r),
              i === r)
            )
              return 0;
            if (0 === e.length || 0 === this.length) return 0;
            if (t < 0) throw new RangeError("targetStart out of bounds");
            if (r < 0 || r >= this.length)
              throw new RangeError("Index out of range");
            if (i < 0) throw new RangeError("sourceEnd out of bounds");
            i > this.length && (i = this.length),
              e.length - t < i - r && (i = e.length - t + r);
            const n = i - r;
            return (
              this === e && "function" == typeof Uint8Array.prototype.copyWithin
                ? this.copyWithin(t, r, i)
                : Uint8Array.prototype.set.call(e, this.subarray(r, i), t),
              n
            );
          }),
          (s.prototype.fill = function (e, t, r, i) {
            if ("string" == typeof e) {
              if (
                ("string" == typeof t
                  ? ((i = t), (t = 0), (r = this.length))
                  : "string" == typeof r && ((i = r), (r = this.length)),
                void 0 !== i && "string" != typeof i)
              )
                throw new TypeError("encoding must be a string");
              if ("string" == typeof i && !s.isEncoding(i))
                throw new TypeError("Unknown encoding: " + i);
              if (1 === e.length) {
                const t = e.charCodeAt(0);
                (("utf8" === i && t < 128) || "latin1" === i) && (e = t);
              }
            } else
              "number" == typeof e
                ? (e &= 255)
                : "boolean" == typeof e && (e = Number(e));
            if (t < 0 || this.length < t || this.length < r)
              throw new RangeError("Out of range index");
            if (r <= t) return this;
            let n;
            if (
              ((t >>>= 0),
              (r = void 0 === r ? this.length : r >>> 0),
              e || (e = 0),
              "number" == typeof e)
            )
              for (n = t; n < r; ++n) this[n] = e;
            else {
              const f = s.isBuffer(e) ? e : s.from(e, i),
                a = f.length;
              if (0 === a)
                throw new TypeError(
                  'The value "' + e + '" is invalid for argument "value"'
                );
              for (n = 0; n < r - t; ++n) this[n + t] = f[n % a];
            }
            return this;
          });
        const j = {};
        function U(e, t, r) {
          j[e] = class extends r {
            constructor() {
              super(),
                Object.defineProperty(this, "message", {
                  value: t.apply(this, arguments),
                  writable: !0,
                  configurable: !0,
                }),
                (this.name = `${this.name} [${e}]`),
                this.stack,
                delete this.name;
            }
            get code() {
              return e;
            }
            set code(e) {
              Object.defineProperty(this, "code", {
                configurable: !0,
                enumerable: !0,
                value: e,
                writable: !0,
              });
            }
            toString() {
              return `${this.name} [${e}]: ${this.message}`;
            }
          };
        }
        function D(e) {
          let t = "",
            r = e.length;
          const i = "-" === e[0] ? 1 : 0;
          for (; r >= i + 4; r -= 3) t = `_${e.slice(r - 3, r)}${t}`;
          return `${e.slice(0, r)}${t}`;
        }
        function F(e, t, r, i, n, f) {
          if (e > r || e < t) {
            const i = "bigint" == typeof t ? "n" : "";
            let n;
            throw (
              ((n =
                f > 3
                  ? 0 === t || t === BigInt(0)
                    ? `>= 0${i} and < 2${i} ** ${8 * (f + 1)}${i}`
                    : `>= -(2${i} ** ${8 * (f + 1) - 1}${i}) and < 2 ** ${
                        8 * (f + 1) - 1
                      }${i}`
                  : `>= ${t}${i} and <= ${r}${i}`),
              new j.ERR_OUT_OF_RANGE("value", n, e))
            );
          }
          !(function (e, t, r) {
            K(t, "offset"),
              (void 0 !== e[t] && void 0 !== e[t + r]) ||
                W(t, e.length - (r + 1));
          })(i, n, f);
        }
        function K(e, t) {
          if ("number" != typeof e)
            throw new j.ERR_INVALID_ARG_TYPE(t, "number", e);
        }
        function W(e, t, r) {
          if (Math.floor(e) !== e)
            throw (
              (K(e, r), new j.ERR_OUT_OF_RANGE(r || "offset", "an integer", e))
            );
          if (t < 0) throw new j.ERR_BUFFER_OUT_OF_BOUNDS();
          throw new j.ERR_OUT_OF_RANGE(
            r || "offset",
            `>= ${r ? 1 : 0} and <= ${t}`,
            e
          );
        }
        U(
          "ERR_BUFFER_OUT_OF_BOUNDS",
          function (e) {
            return e
              ? `${e} is outside of buffer bounds`
              : "Attempt to access memory outside buffer bounds";
          },
          RangeError
        ),
          U(
            "ERR_INVALID_ARG_TYPE",
            function (e, t) {
              return `The "${e}" argument must be of type number. Received type ${typeof t}`;
            },
            TypeError
          ),
          U(
            "ERR_OUT_OF_RANGE",
            function (e, t, r) {
              let i = `The value of "${e}" is out of range.`,
                n = r;
              return (
                Number.isInteger(r) && Math.abs(r) > 2 ** 32
                  ? (n = D(String(r)))
                  : "bigint" == typeof r &&
                    ((n = String(r)),
                    (r > BigInt(2) ** BigInt(32) ||
                      r < -(BigInt(2) ** BigInt(32))) &&
                      (n = D(n)),
                    (n += "n")),
                (i += ` It must be ${t}. Received ${n}`),
                i
              );
            },
            RangeError
          );
        const H = /[^+/0-9A-Za-z-_]/g;
        function V(e, t) {
          let r;
          t = t || 1 / 0;
          const i = e.length;
          let n = null;
          const f = [];
          for (let a = 0; a < i; ++a) {
            if (((r = e.charCodeAt(a)), r > 55295 && r < 57344)) {
              if (!n) {
                if (r > 56319) {
                  (t -= 3) > -1 && f.push(239, 191, 189);
                  continue;
                }
                if (a + 1 === i) {
                  (t -= 3) > -1 && f.push(239, 191, 189);
                  continue;
                }
                n = r;
                continue;
              }
              if (r < 56320) {
                (t -= 3) > -1 && f.push(239, 191, 189), (n = r);
                continue;
              }
              r = 65536 + (((n - 55296) << 10) | (r - 56320));
            } else n && (t -= 3) > -1 && f.push(239, 191, 189);
            if (((n = null), r < 128)) {
              if ((t -= 1) < 0) break;
              f.push(r);
            } else if (r < 2048) {
              if ((t -= 2) < 0) break;
              f.push((r >> 6) | 192, (63 & r) | 128);
            } else if (r < 65536) {
              if ((t -= 3) < 0) break;
              f.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
            } else {
              if (!(r < 1114112)) throw new Error("Invalid code point");
              if ((t -= 4) < 0) break;
              f.push(
                (r >> 18) | 240,
                ((r >> 12) & 63) | 128,
                ((r >> 6) & 63) | 128,
                (63 & r) | 128
              );
            }
          }
          return f;
        }
        function Z(e) {
          return i.toByteArray(
            (function (e) {
              if ((e = (e = e.split("=")[0]).trim().replace(H, "")).length < 2)
                return "";
              for (; e.length % 4 != 0; ) e += "=";
              return e;
            })(e)
          );
        }
        function $(e, t, r, i) {
          let n;
          for (n = 0; n < i && !(n + r >= t.length || n >= e.length); ++n)
            t[n + r] = e[n];
          return n;
        }
        function Y(e, t) {
          return (
            e instanceof t ||
            (null != e &&
              null != e.constructor &&
              null != e.constructor.name &&
              e.constructor.name === t.name)
          );
        }
        function J(e) {
          return e != e;
        }
        const X = (function () {
          const e = "0123456789abcdef",
            t = new Array(256);
          for (let r = 0; r < 16; ++r) {
            const i = 16 * r;
            for (let n = 0; n < 16; ++n) t[i + n] = e[r] + e[n];
          }
          return t;
        })();
        function G(e) {
          return "undefined" == typeof BigInt ? Q : e;
        }
        function Q() {
          throw new Error("BigInt not supported");
        }
      },
      6266: (e, t, r) => {
        "use strict";
        var i = t;
        (i.version = r(8597).i8),
          (i.utils = r(953)),
          (i.rand = r(9931)),
          (i.curve = r(8254)),
          (i.curves = r(5427)),
          (i.ec = r(7954)),
          (i.eddsa = r(5980));
      },
      4918: (e, t, r) => {
        "use strict";
        var i = r(3785),
          n = r(953),
          f = n.getNAF,
          a = n.getJSF,
          o = n.assert;
        function s(e, t) {
          (this.type = e),
            (this.p = new i(t.p, 16)),
            (this.red = t.prime ? i.red(t.prime) : i.mont(this.p)),
            (this.zero = new i(0).toRed(this.red)),
            (this.one = new i(1).toRed(this.red)),
            (this.two = new i(2).toRed(this.red)),
            (this.n = t.n && new i(t.n, 16)),
            (this.g = t.g && this.pointFromJSON(t.g, t.gRed)),
            (this._wnafT1 = new Array(4)),
            (this._wnafT2 = new Array(4)),
            (this._wnafT3 = new Array(4)),
            (this._wnafT4 = new Array(4)),
            (this._bitLength = this.n ? this.n.bitLength() : 0);
          var r = this.n && this.p.div(this.n);
          !r || r.cmpn(100) > 0
            ? (this.redN = null)
            : ((this._maxwellTrick = !0), (this.redN = this.n.toRed(this.red)));
        }
        function d(e, t) {
          (this.curve = e), (this.type = t), (this.precomputed = null);
        }
        (e.exports = s),
          (s.prototype.point = function () {
            throw new Error("Not implemented");
          }),
          (s.prototype.validate = function () {
            throw new Error("Not implemented");
          }),
          (s.prototype._fixedNafMul = function (e, t) {
            o(e.precomputed);
            var r = e._getDoubles(),
              i = f(t, 1, this._bitLength),
              n = (1 << (r.step + 1)) - (r.step % 2 == 0 ? 2 : 1);
            n /= 3;
            var a,
              s,
              d = [];
            for (a = 0; a < i.length; a += r.step) {
              s = 0;
              for (var c = a + r.step - 1; c >= a; c--) s = (s << 1) + i[c];
              d.push(s);
            }
            for (
              var h = this.jpoint(null, null, null),
                u = this.jpoint(null, null, null),
                l = n;
              l > 0;
              l--
            ) {
              for (a = 0; a < d.length; a++)
                (s = d[a]) === l
                  ? (u = u.mixedAdd(r.points[a]))
                  : s === -l && (u = u.mixedAdd(r.points[a].neg()));
              h = h.add(u);
            }
            return h.toP();
          }),
          (s.prototype._wnafMul = function (e, t) {
            var r = 4,
              i = e._getNAFPoints(r);
            r = i.wnd;
            for (
              var n = i.points,
                a = f(t, r, this._bitLength),
                s = this.jpoint(null, null, null),
                d = a.length - 1;
              d >= 0;
              d--
            ) {
              for (var c = 0; d >= 0 && 0 === a[d]; d--) c++;
              if ((d >= 0 && c++, (s = s.dblp(c)), d < 0)) break;
              var h = a[d];
              o(0 !== h),
                (s =
                  "affine" === e.type
                    ? h > 0
                      ? s.mixedAdd(n[(h - 1) >> 1])
                      : s.mixedAdd(n[(-h - 1) >> 1].neg())
                    : h > 0
                    ? s.add(n[(h - 1) >> 1])
                    : s.add(n[(-h - 1) >> 1].neg()));
            }
            return "affine" === e.type ? s.toP() : s;
          }),
          (s.prototype._wnafMulAdd = function (e, t, r, i, n) {
            var o,
              s,
              d,
              c = this._wnafT1,
              h = this._wnafT2,
              u = this._wnafT3,
              l = 0;
            for (o = 0; o < i; o++) {
              var b = (d = t[o])._getNAFPoints(e);
              (c[o] = b.wnd), (h[o] = b.points);
            }
            for (o = i - 1; o >= 1; o -= 2) {
              var p = o - 1,
                y = o;
              if (1 === c[p] && 1 === c[y]) {
                var m = [t[p], null, null, t[y]];
                0 === t[p].y.cmp(t[y].y)
                  ? ((m[1] = t[p].add(t[y])),
                    (m[2] = t[p].toJ().mixedAdd(t[y].neg())))
                  : 0 === t[p].y.cmp(t[y].y.redNeg())
                  ? ((m[1] = t[p].toJ().mixedAdd(t[y])),
                    (m[2] = t[p].add(t[y].neg())))
                  : ((m[1] = t[p].toJ().mixedAdd(t[y])),
                    (m[2] = t[p].toJ().mixedAdd(t[y].neg())));
                var g = [-3, -1, -5, -7, 0, 7, 5, 1, 3],
                  v = a(r[p], r[y]);
                for (
                  l = Math.max(v[0].length, l),
                    u[p] = new Array(l),
                    u[y] = new Array(l),
                    s = 0;
                  s < l;
                  s++
                ) {
                  var w = 0 | v[0][s],
                    M = 0 | v[1][s];
                  (u[p][s] = g[3 * (w + 1) + (M + 1)]),
                    (u[y][s] = 0),
                    (h[p] = m);
                }
              } else
                (u[p] = f(r[p], c[p], this._bitLength)),
                  (u[y] = f(r[y], c[y], this._bitLength)),
                  (l = Math.max(u[p].length, l)),
                  (l = Math.max(u[y].length, l));
            }
            var _ = this.jpoint(null, null, null),
              S = this._wnafT4;
            for (o = l; o >= 0; o--) {
              for (var A = 0; o >= 0; ) {
                var E = !0;
                for (s = 0; s < i; s++)
                  (S[s] = 0 | u[s][o]), 0 !== S[s] && (E = !1);
                if (!E) break;
                A++, o--;
              }
              if ((o >= 0 && A++, (_ = _.dblp(A)), o < 0)) break;
              for (s = 0; s < i; s++) {
                var x = S[s];
                0 !== x &&
                  (x > 0
                    ? (d = h[s][(x - 1) >> 1])
                    : x < 0 && (d = h[s][(-x - 1) >> 1].neg()),
                  (_ = "affine" === d.type ? _.mixedAdd(d) : _.add(d)));
              }
            }
            for (o = 0; o < i; o++) h[o] = null;
            return n ? _ : _.toP();
          }),
          (s.BasePoint = d),
          (d.prototype.eq = function () {
            throw new Error("Not implemented");
          }),
          (d.prototype.validate = function () {
            return this.curve.validate(this);
          }),
          (s.prototype.decodePoint = function (e, t) {
            e = n.toArray(e, t);
            var r = this.p.byteLength();
            if (
              (4 === e[0] || 6 === e[0] || 7 === e[0]) &&
              e.length - 1 == 2 * r
            )
              return (
                6 === e[0]
                  ? o(e[e.length - 1] % 2 == 0)
                  : 7 === e[0] && o(e[e.length - 1] % 2 == 1),
                this.point(e.slice(1, 1 + r), e.slice(1 + r, 1 + 2 * r))
              );
            if ((2 === e[0] || 3 === e[0]) && e.length - 1 === r)
              return this.pointFromX(e.slice(1, 1 + r), 3 === e[0]);
            throw new Error("Unknown point format");
          }),
          (d.prototype.encodeCompressed = function (e) {
            return this.encode(e, !0);
          }),
          (d.prototype._encode = function (e) {
            var t = this.curve.p.byteLength(),
              r = this.getX().toArray("be", t);
            return e
              ? [this.getY().isEven() ? 2 : 3].concat(r)
              : [4].concat(r, this.getY().toArray("be", t));
          }),
          (d.prototype.encode = function (e, t) {
            return n.encode(this._encode(t), e);
          }),
          (d.prototype.precompute = function (e) {
            if (this.precomputed) return this;
            var t = { doubles: null, naf: null, beta: null };
            return (
              (t.naf = this._getNAFPoints(8)),
              (t.doubles = this._getDoubles(4, e)),
              (t.beta = this._getBeta()),
              (this.precomputed = t),
              this
            );
          }),
          (d.prototype._hasDoubles = function (e) {
            if (!this.precomputed) return !1;
            var t = this.precomputed.doubles;
            return (
              !!t && t.points.length >= Math.ceil((e.bitLength() + 1) / t.step)
            );
          }),
          (d.prototype._getDoubles = function (e, t) {
            if (this.precomputed && this.precomputed.doubles)
              return this.precomputed.doubles;
            for (var r = [this], i = this, n = 0; n < t; n += e) {
              for (var f = 0; f < e; f++) i = i.dbl();
              r.push(i);
            }
            return { step: e, points: r };
          }),
          (d.prototype._getNAFPoints = function (e) {
            if (this.precomputed && this.precomputed.naf)
              return this.precomputed.naf;
            for (
              var t = [this],
                r = (1 << e) - 1,
                i = 1 === r ? null : this.dbl(),
                n = 1;
              n < r;
              n++
            )
              t[n] = t[n - 1].add(i);
            return { wnd: e, points: t };
          }),
          (d.prototype._getBeta = function () {
            return null;
          }),
          (d.prototype.dblp = function (e) {
            for (var t = this, r = 0; r < e; r++) t = t.dbl();
            return t;
          });
      },
      1138: (e, t, r) => {
        "use strict";
        var i = r(953),
          n = r(3785),
          f = r(5717),
          a = r(4918),
          o = i.assert;
        function s(e) {
          (this.twisted = 1 != (0 | e.a)),
            (this.mOneA = this.twisted && -1 == (0 | e.a)),
            (this.extended = this.mOneA),
            a.call(this, "edwards", e),
            (this.a = new n(e.a, 16).umod(this.red.m)),
            (this.a = this.a.toRed(this.red)),
            (this.c = new n(e.c, 16).toRed(this.red)),
            (this.c2 = this.c.redSqr()),
            (this.d = new n(e.d, 16).toRed(this.red)),
            (this.dd = this.d.redAdd(this.d)),
            o(!this.twisted || 0 === this.c.fromRed().cmpn(1)),
            (this.oneC = 1 == (0 | e.c));
        }
        function d(e, t, r, i, f) {
          a.BasePoint.call(this, e, "projective"),
            null === t && null === r && null === i
              ? ((this.x = this.curve.zero),
                (this.y = this.curve.one),
                (this.z = this.curve.one),
                (this.t = this.curve.zero),
                (this.zOne = !0))
              : ((this.x = new n(t, 16)),
                (this.y = new n(r, 16)),
                (this.z = i ? new n(i, 16) : this.curve.one),
                (this.t = f && new n(f, 16)),
                this.x.red || (this.x = this.x.toRed(this.curve.red)),
                this.y.red || (this.y = this.y.toRed(this.curve.red)),
                this.z.red || (this.z = this.z.toRed(this.curve.red)),
                this.t &&
                  !this.t.red &&
                  (this.t = this.t.toRed(this.curve.red)),
                (this.zOne = this.z === this.curve.one),
                this.curve.extended &&
                  !this.t &&
                  ((this.t = this.x.redMul(this.y)),
                  this.zOne || (this.t = this.t.redMul(this.z.redInvm()))));
        }
        f(s, a),
          (e.exports = s),
          (s.prototype._mulA = function (e) {
            return this.mOneA ? e.redNeg() : this.a.redMul(e);
          }),
          (s.prototype._mulC = function (e) {
            return this.oneC ? e : this.c.redMul(e);
          }),
          (s.prototype.jpoint = function (e, t, r, i) {
            return this.point(e, t, r, i);
          }),
          (s.prototype.pointFromX = function (e, t) {
            (e = new n(e, 16)).red || (e = e.toRed(this.red));
            var r = e.redSqr(),
              i = this.c2.redSub(this.a.redMul(r)),
              f = this.one.redSub(this.c2.redMul(this.d).redMul(r)),
              a = i.redMul(f.redInvm()),
              o = a.redSqrt();
            if (0 !== o.redSqr().redSub(a).cmp(this.zero))
              throw new Error("invalid point");
            var s = o.fromRed().isOdd();
            return (
              ((t && !s) || (!t && s)) && (o = o.redNeg()), this.point(e, o)
            );
          }),
          (s.prototype.pointFromY = function (e, t) {
            (e = new n(e, 16)).red || (e = e.toRed(this.red));
            var r = e.redSqr(),
              i = r.redSub(this.c2),
              f = r.redMul(this.d).redMul(this.c2).redSub(this.a),
              a = i.redMul(f.redInvm());
            if (0 === a.cmp(this.zero)) {
              if (t) throw new Error("invalid point");
              return this.point(this.zero, e);
            }
            var o = a.redSqrt();
            if (0 !== o.redSqr().redSub(a).cmp(this.zero))
              throw new Error("invalid point");
            return (
              o.fromRed().isOdd() !== t && (o = o.redNeg()), this.point(o, e)
            );
          }),
          (s.prototype.validate = function (e) {
            if (e.isInfinity()) return !0;
            e.normalize();
            var t = e.x.redSqr(),
              r = e.y.redSqr(),
              i = t.redMul(this.a).redAdd(r),
              n = this.c2.redMul(this.one.redAdd(this.d.redMul(t).redMul(r)));
            return 0 === i.cmp(n);
          }),
          f(d, a.BasePoint),
          (s.prototype.pointFromJSON = function (e) {
            return d.fromJSON(this, e);
          }),
          (s.prototype.point = function (e, t, r, i) {
            return new d(this, e, t, r, i);
          }),
          (d.fromJSON = function (e, t) {
            return new d(e, t[0], t[1], t[2]);
          }),
          (d.prototype.inspect = function () {
            return this.isInfinity()
              ? "<EC Point Infinity>"
              : "<EC Point x: " +
                  this.x.fromRed().toString(16, 2) +
                  " y: " +
                  this.y.fromRed().toString(16, 2) +
                  " z: " +
                  this.z.fromRed().toString(16, 2) +
                  ">";
          }),
          (d.prototype.isInfinity = function () {
            return (
              0 === this.x.cmpn(0) &&
              (0 === this.y.cmp(this.z) ||
                (this.zOne && 0 === this.y.cmp(this.curve.c)))
            );
          }),
          (d.prototype._extDbl = function () {
            var e = this.x.redSqr(),
              t = this.y.redSqr(),
              r = this.z.redSqr();
            r = r.redIAdd(r);
            var i = this.curve._mulA(e),
              n = this.x.redAdd(this.y).redSqr().redISub(e).redISub(t),
              f = i.redAdd(t),
              a = f.redSub(r),
              o = i.redSub(t),
              s = n.redMul(a),
              d = f.redMul(o),
              c = n.redMul(o),
              h = a.redMul(f);
            return this.curve.point(s, d, h, c);
          }),
          (d.prototype._projDbl = function () {
            var e,
              t,
              r,
              i,
              n,
              f,
              a = this.x.redAdd(this.y).redSqr(),
              o = this.x.redSqr(),
              s = this.y.redSqr();
            if (this.curve.twisted) {
              var d = (i = this.curve._mulA(o)).redAdd(s);
              this.zOne
                ? ((e = a.redSub(o).redSub(s).redMul(d.redSub(this.curve.two))),
                  (t = d.redMul(i.redSub(s))),
                  (r = d.redSqr().redSub(d).redSub(d)))
                : ((n = this.z.redSqr()),
                  (f = d.redSub(n).redISub(n)),
                  (e = a.redSub(o).redISub(s).redMul(f)),
                  (t = d.redMul(i.redSub(s))),
                  (r = d.redMul(f)));
            } else
              (i = o.redAdd(s)),
                (n = this.curve._mulC(this.z).redSqr()),
                (f = i.redSub(n).redSub(n)),
                (e = this.curve._mulC(a.redISub(i)).redMul(f)),
                (t = this.curve._mulC(i).redMul(o.redISub(s))),
                (r = i.redMul(f));
            return this.curve.point(e, t, r);
          }),
          (d.prototype.dbl = function () {
            return this.isInfinity()
              ? this
              : this.curve.extended
              ? this._extDbl()
              : this._projDbl();
          }),
          (d.prototype._extAdd = function (e) {
            var t = this.y.redSub(this.x).redMul(e.y.redSub(e.x)),
              r = this.y.redAdd(this.x).redMul(e.y.redAdd(e.x)),
              i = this.t.redMul(this.curve.dd).redMul(e.t),
              n = this.z.redMul(e.z.redAdd(e.z)),
              f = r.redSub(t),
              a = n.redSub(i),
              o = n.redAdd(i),
              s = r.redAdd(t),
              d = f.redMul(a),
              c = o.redMul(s),
              h = f.redMul(s),
              u = a.redMul(o);
            return this.curve.point(d, c, u, h);
          }),
          (d.prototype._projAdd = function (e) {
            var t,
              r,
              i = this.z.redMul(e.z),
              n = i.redSqr(),
              f = this.x.redMul(e.x),
              a = this.y.redMul(e.y),
              o = this.curve.d.redMul(f).redMul(a),
              s = n.redSub(o),
              d = n.redAdd(o),
              c = this.x
                .redAdd(this.y)
                .redMul(e.x.redAdd(e.y))
                .redISub(f)
                .redISub(a),
              h = i.redMul(s).redMul(c);
            return (
              this.curve.twisted
                ? ((t = i.redMul(d).redMul(a.redSub(this.curve._mulA(f)))),
                  (r = s.redMul(d)))
                : ((t = i.redMul(d).redMul(a.redSub(f))),
                  (r = this.curve._mulC(s).redMul(d))),
              this.curve.point(h, t, r)
            );
          }),
          (d.prototype.add = function (e) {
            return this.isInfinity()
              ? e
              : e.isInfinity()
              ? this
              : this.curve.extended
              ? this._extAdd(e)
              : this._projAdd(e);
          }),
          (d.prototype.mul = function (e) {
            return this._hasDoubles(e)
              ? this.curve._fixedNafMul(this, e)
              : this.curve._wnafMul(this, e);
          }),
          (d.prototype.mulAdd = function (e, t, r) {
            return this.curve._wnafMulAdd(1, [this, t], [e, r], 2, !1);
          }),
          (d.prototype.jmulAdd = function (e, t, r) {
            return this.curve._wnafMulAdd(1, [this, t], [e, r], 2, !0);
          }),
          (d.prototype.normalize = function () {
            if (this.zOne) return this;
            var e = this.z.redInvm();
            return (
              (this.x = this.x.redMul(e)),
              (this.y = this.y.redMul(e)),
              this.t && (this.t = this.t.redMul(e)),
              (this.z = this.curve.one),
              (this.zOne = !0),
              this
            );
          }),
          (d.prototype.neg = function () {
            return this.curve.point(
              this.x.redNeg(),
              this.y,
              this.z,
              this.t && this.t.redNeg()
            );
          }),
          (d.prototype.getX = function () {
            return this.normalize(), this.x.fromRed();
          }),
          (d.prototype.getY = function () {
            return this.normalize(), this.y.fromRed();
          }),
          (d.prototype.eq = function (e) {
            return (
              this === e ||
              (0 === this.getX().cmp(e.getX()) &&
                0 === this.getY().cmp(e.getY()))
            );
          }),
          (d.prototype.eqXToP = function (e) {
            var t = e.toRed(this.curve.red).redMul(this.z);
            if (0 === this.x.cmp(t)) return !0;
            for (var r = e.clone(), i = this.curve.redN.redMul(this.z); ; ) {
              if ((r.iadd(this.curve.n), r.cmp(this.curve.p) >= 0)) return !1;
              if ((t.redIAdd(i), 0 === this.x.cmp(t))) return !0;
            }
          }),
          (d.prototype.toP = d.prototype.normalize),
          (d.prototype.mixedAdd = d.prototype.add);
      },
      8254: (e, t, r) => {
        "use strict";
        var i = t;
        (i.base = r(4918)),
          (i.short = r(6673)),
          (i.mont = r(2881)),
          (i.edwards = r(1138));
      },
      2881: (e, t, r) => {
        "use strict";
        var i = r(3785),
          n = r(5717),
          f = r(4918),
          a = r(953);
        function o(e) {
          f.call(this, "mont", e),
            (this.a = new i(e.a, 16).toRed(this.red)),
            (this.b = new i(e.b, 16).toRed(this.red)),
            (this.i4 = new i(4).toRed(this.red).redInvm()),
            (this.two = new i(2).toRed(this.red)),
            (this.a24 = this.i4.redMul(this.a.redAdd(this.two)));
        }
        function s(e, t, r) {
          f.BasePoint.call(this, e, "projective"),
            null === t && null === r
              ? ((this.x = this.curve.one), (this.z = this.curve.zero))
              : ((this.x = new i(t, 16)),
                (this.z = new i(r, 16)),
                this.x.red || (this.x = this.x.toRed(this.curve.red)),
                this.z.red || (this.z = this.z.toRed(this.curve.red)));
        }
        n(o, f),
          (e.exports = o),
          (o.prototype.validate = function (e) {
            var t = e.normalize().x,
              r = t.redSqr(),
              i = r.redMul(t).redAdd(r.redMul(this.a)).redAdd(t);
            return 0 === i.redSqrt().redSqr().cmp(i);
          }),
          n(s, f.BasePoint),
          (o.prototype.decodePoint = function (e, t) {
            return this.point(a.toArray(e, t), 1);
          }),
          (o.prototype.point = function (e, t) {
            return new s(this, e, t);
          }),
          (o.prototype.pointFromJSON = function (e) {
            return s.fromJSON(this, e);
          }),
          (s.prototype.precompute = function () {}),
          (s.prototype._encode = function () {
            return this.getX().toArray("be", this.curve.p.byteLength());
          }),
          (s.fromJSON = function (e, t) {
            return new s(e, t[0], t[1] || e.one);
          }),
          (s.prototype.inspect = function () {
            return this.isInfinity()
              ? "<EC Point Infinity>"
              : "<EC Point x: " +
                  this.x.fromRed().toString(16, 2) +
                  " z: " +
                  this.z.fromRed().toString(16, 2) +
                  ">";
          }),
          (s.prototype.isInfinity = function () {
            return 0 === this.z.cmpn(0);
          }),
          (s.prototype.dbl = function () {
            var e = this.x.redAdd(this.z).redSqr(),
              t = this.x.redSub(this.z).redSqr(),
              r = e.redSub(t),
              i = e.redMul(t),
              n = r.redMul(t.redAdd(this.curve.a24.redMul(r)));
            return this.curve.point(i, n);
          }),
          (s.prototype.add = function () {
            throw new Error("Not supported on Montgomery curve");
          }),
          (s.prototype.diffAdd = function (e, t) {
            var r = this.x.redAdd(this.z),
              i = this.x.redSub(this.z),
              n = e.x.redAdd(e.z),
              f = e.x.redSub(e.z).redMul(r),
              a = n.redMul(i),
              o = t.z.redMul(f.redAdd(a).redSqr()),
              s = t.x.redMul(f.redISub(a).redSqr());
            return this.curve.point(o, s);
          }),
          (s.prototype.mul = function (e) {
            for (
              var t = e.clone(),
                r = this,
                i = this.curve.point(null, null),
                n = [];
              0 !== t.cmpn(0);
              t.iushrn(1)
            )
              n.push(t.andln(1));
            for (var f = n.length - 1; f >= 0; f--)
              0 === n[f]
                ? ((r = r.diffAdd(i, this)), (i = i.dbl()))
                : ((i = r.diffAdd(i, this)), (r = r.dbl()));
            return i;
          }),
          (s.prototype.mulAdd = function () {
            throw new Error("Not supported on Montgomery curve");
          }),
          (s.prototype.jumlAdd = function () {
            throw new Error("Not supported on Montgomery curve");
          }),
          (s.prototype.eq = function (e) {
            return 0 === this.getX().cmp(e.getX());
          }),
          (s.prototype.normalize = function () {
            return (
              (this.x = this.x.redMul(this.z.redInvm())),
              (this.z = this.curve.one),
              this
            );
          }),
          (s.prototype.getX = function () {
            return this.normalize(), this.x.fromRed();
          });
      },
      6673: (e, t, r) => {
        "use strict";
        var i = r(953),
          n = r(3785),
          f = r(5717),
          a = r(4918),
          o = i.assert;
        function s(e) {
          a.call(this, "short", e),
            (this.a = new n(e.a, 16).toRed(this.red)),
            (this.b = new n(e.b, 16).toRed(this.red)),
            (this.tinv = this.two.redInvm()),
            (this.zeroA = 0 === this.a.fromRed().cmpn(0)),
            (this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3)),
            (this.endo = this._getEndomorphism(e)),
            (this._endoWnafT1 = new Array(4)),
            (this._endoWnafT2 = new Array(4));
        }
        function d(e, t, r, i) {
          a.BasePoint.call(this, e, "affine"),
            null === t && null === r
              ? ((this.x = null), (this.y = null), (this.inf = !0))
              : ((this.x = new n(t, 16)),
                (this.y = new n(r, 16)),
                i &&
                  (this.x.forceRed(this.curve.red),
                  this.y.forceRed(this.curve.red)),
                this.x.red || (this.x = this.x.toRed(this.curve.red)),
                this.y.red || (this.y = this.y.toRed(this.curve.red)),
                (this.inf = !1));
        }
        function c(e, t, r, i) {
          a.BasePoint.call(this, e, "jacobian"),
            null === t && null === r && null === i
              ? ((this.x = this.curve.one),
                (this.y = this.curve.one),
                (this.z = new n(0)))
              : ((this.x = new n(t, 16)),
                (this.y = new n(r, 16)),
                (this.z = new n(i, 16))),
            this.x.red || (this.x = this.x.toRed(this.curve.red)),
            this.y.red || (this.y = this.y.toRed(this.curve.red)),
            this.z.red || (this.z = this.z.toRed(this.curve.red)),
            (this.zOne = this.z === this.curve.one);
        }
        f(s, a),
          (e.exports = s),
          (s.prototype._getEndomorphism = function (e) {
            if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
              var t, r;
              if (e.beta) t = new n(e.beta, 16).toRed(this.red);
              else {
                var i = this._getEndoRoots(this.p);
                t = (t = i[0].cmp(i[1]) < 0 ? i[0] : i[1]).toRed(this.red);
              }
              if (e.lambda) r = new n(e.lambda, 16);
              else {
                var f = this._getEndoRoots(this.n);
                0 === this.g.mul(f[0]).x.cmp(this.g.x.redMul(t))
                  ? (r = f[0])
                  : ((r = f[1]),
                    o(0 === this.g.mul(r).x.cmp(this.g.x.redMul(t))));
              }
              return {
                beta: t,
                lambda: r,
                basis: e.basis
                  ? e.basis.map(function (e) {
                      return { a: new n(e.a, 16), b: new n(e.b, 16) };
                    })
                  : this._getEndoBasis(r),
              };
            }
          }),
          (s.prototype._getEndoRoots = function (e) {
            var t = e === this.p ? this.red : n.mont(e),
              r = new n(2).toRed(t).redInvm(),
              i = r.redNeg(),
              f = new n(3).toRed(t).redNeg().redSqrt().redMul(r);
            return [i.redAdd(f).fromRed(), i.redSub(f).fromRed()];
          }),
          (s.prototype._getEndoBasis = function (e) {
            for (
              var t,
                r,
                i,
                f,
                a,
                o,
                s,
                d,
                c,
                h = this.n.ushrn(Math.floor(this.n.bitLength() / 2)),
                u = e,
                l = this.n.clone(),
                b = new n(1),
                p = new n(0),
                y = new n(0),
                m = new n(1),
                g = 0;
              0 !== u.cmpn(0);

            ) {
              var v = l.div(u);
              (d = l.sub(v.mul(u))), (c = y.sub(v.mul(b)));
              var w = m.sub(v.mul(p));
              if (!i && d.cmp(h) < 0)
                (t = s.neg()), (r = b), (i = d.neg()), (f = c);
              else if (i && 2 == ++g) break;
              (s = d), (l = u), (u = d), (y = b), (b = c), (m = p), (p = w);
            }
            (a = d.neg()), (o = c);
            var M = i.sqr().add(f.sqr());
            return (
              a.sqr().add(o.sqr()).cmp(M) >= 0 && ((a = t), (o = r)),
              i.negative && ((i = i.neg()), (f = f.neg())),
              a.negative && ((a = a.neg()), (o = o.neg())),
              [
                { a: i, b: f },
                { a, b: o },
              ]
            );
          }),
          (s.prototype._endoSplit = function (e) {
            var t = this.endo.basis,
              r = t[0],
              i = t[1],
              n = i.b.mul(e).divRound(this.n),
              f = r.b.neg().mul(e).divRound(this.n),
              a = n.mul(r.a),
              o = f.mul(i.a),
              s = n.mul(r.b),
              d = f.mul(i.b);
            return { k1: e.sub(a).sub(o), k2: s.add(d).neg() };
          }),
          (s.prototype.pointFromX = function (e, t) {
            (e = new n(e, 16)).red || (e = e.toRed(this.red));
            var r = e
                .redSqr()
                .redMul(e)
                .redIAdd(e.redMul(this.a))
                .redIAdd(this.b),
              i = r.redSqrt();
            if (0 !== i.redSqr().redSub(r).cmp(this.zero))
              throw new Error("invalid point");
            var f = i.fromRed().isOdd();
            return (
              ((t && !f) || (!t && f)) && (i = i.redNeg()), this.point(e, i)
            );
          }),
          (s.prototype.validate = function (e) {
            if (e.inf) return !0;
            var t = e.x,
              r = e.y,
              i = this.a.redMul(t),
              n = t.redSqr().redMul(t).redIAdd(i).redIAdd(this.b);
            return 0 === r.redSqr().redISub(n).cmpn(0);
          }),
          (s.prototype._endoWnafMulAdd = function (e, t, r) {
            for (
              var i = this._endoWnafT1, n = this._endoWnafT2, f = 0;
              f < e.length;
              f++
            ) {
              var a = this._endoSplit(t[f]),
                o = e[f],
                s = o._getBeta();
              a.k1.negative && (a.k1.ineg(), (o = o.neg(!0))),
                a.k2.negative && (a.k2.ineg(), (s = s.neg(!0))),
                (i[2 * f] = o),
                (i[2 * f + 1] = s),
                (n[2 * f] = a.k1),
                (n[2 * f + 1] = a.k2);
            }
            for (
              var d = this._wnafMulAdd(1, i, n, 2 * f, r), c = 0;
              c < 2 * f;
              c++
            )
              (i[c] = null), (n[c] = null);
            return d;
          }),
          f(d, a.BasePoint),
          (s.prototype.point = function (e, t, r) {
            return new d(this, e, t, r);
          }),
          (s.prototype.pointFromJSON = function (e, t) {
            return d.fromJSON(this, e, t);
          }),
          (d.prototype._getBeta = function () {
            if (this.curve.endo) {
              var e = this.precomputed;
              if (e && e.beta) return e.beta;
              var t = this.curve.point(
                this.x.redMul(this.curve.endo.beta),
                this.y
              );
              if (e) {
                var r = this.curve,
                  i = function (e) {
                    return r.point(e.x.redMul(r.endo.beta), e.y);
                  };
                (e.beta = t),
                  (t.precomputed = {
                    beta: null,
                    naf: e.naf && {
                      wnd: e.naf.wnd,
                      points: e.naf.points.map(i),
                    },
                    doubles: e.doubles && {
                      step: e.doubles.step,
                      points: e.doubles.points.map(i),
                    },
                  });
              }
              return t;
            }
          }),
          (d.prototype.toJSON = function () {
            return this.precomputed
              ? [
                  this.x,
                  this.y,
                  this.precomputed && {
                    doubles: this.precomputed.doubles && {
                      step: this.precomputed.doubles.step,
                      points: this.precomputed.doubles.points.slice(1),
                    },
                    naf: this.precomputed.naf && {
                      wnd: this.precomputed.naf.wnd,
                      points: this.precomputed.naf.points.slice(1),
                    },
                  },
                ]
              : [this.x, this.y];
          }),
          (d.fromJSON = function (e, t, r) {
            "string" == typeof t && (t = JSON.parse(t));
            var i = e.point(t[0], t[1], r);
            if (!t[2]) return i;
            function n(t) {
              return e.point(t[0], t[1], r);
            }
            var f = t[2];
            return (
              (i.precomputed = {
                beta: null,
                doubles: f.doubles && {
                  step: f.doubles.step,
                  points: [i].concat(f.doubles.points.map(n)),
                },
                naf: f.naf && {
                  wnd: f.naf.wnd,
                  points: [i].concat(f.naf.points.map(n)),
                },
              }),
              i
            );
          }),
          (d.prototype.inspect = function () {
            return this.isInfinity()
              ? "<EC Point Infinity>"
              : "<EC Point x: " +
                  this.x.fromRed().toString(16, 2) +
                  " y: " +
                  this.y.fromRed().toString(16, 2) +
                  ">";
          }),
          (d.prototype.isInfinity = function () {
            return this.inf;
          }),
          (d.prototype.add = function (e) {
            if (this.inf) return e;
            if (e.inf) return this;
            if (this.eq(e)) return this.dbl();
            if (this.neg().eq(e)) return this.curve.point(null, null);
            if (0 === this.x.cmp(e.x)) return this.curve.point(null, null);
            var t = this.y.redSub(e.y);
            0 !== t.cmpn(0) && (t = t.redMul(this.x.redSub(e.x).redInvm()));
            var r = t.redSqr().redISub(this.x).redISub(e.x),
              i = t.redMul(this.x.redSub(r)).redISub(this.y);
            return this.curve.point(r, i);
          }),
          (d.prototype.dbl = function () {
            if (this.inf) return this;
            var e = this.y.redAdd(this.y);
            if (0 === e.cmpn(0)) return this.curve.point(null, null);
            var t = this.curve.a,
              r = this.x.redSqr(),
              i = e.redInvm(),
              n = r.redAdd(r).redIAdd(r).redIAdd(t).redMul(i),
              f = n.redSqr().redISub(this.x.redAdd(this.x)),
              a = n.redMul(this.x.redSub(f)).redISub(this.y);
            return this.curve.point(f, a);
          }),
          (d.prototype.getX = function () {
            return this.x.fromRed();
          }),
          (d.prototype.getY = function () {
            return this.y.fromRed();
          }),
          (d.prototype.mul = function (e) {
            return (
              (e = new n(e, 16)),
              this.isInfinity()
                ? this
                : this._hasDoubles(e)
                ? this.curve._fixedNafMul(this, e)
                : this.curve.endo
                ? this.curve._endoWnafMulAdd([this], [e])
                : this.curve._wnafMul(this, e)
            );
          }),
          (d.prototype.mulAdd = function (e, t, r) {
            var i = [this, t],
              n = [e, r];
            return this.curve.endo
              ? this.curve._endoWnafMulAdd(i, n)
              : this.curve._wnafMulAdd(1, i, n, 2);
          }),
          (d.prototype.jmulAdd = function (e, t, r) {
            var i = [this, t],
              n = [e, r];
            return this.curve.endo
              ? this.curve._endoWnafMulAdd(i, n, !0)
              : this.curve._wnafMulAdd(1, i, n, 2, !0);
          }),
          (d.prototype.eq = function (e) {
            return (
              this === e ||
              (this.inf === e.inf &&
                (this.inf || (0 === this.x.cmp(e.x) && 0 === this.y.cmp(e.y))))
            );
          }),
          (d.prototype.neg = function (e) {
            if (this.inf) return this;
            var t = this.curve.point(this.x, this.y.redNeg());
            if (e && this.precomputed) {
              var r = this.precomputed,
                i = function (e) {
                  return e.neg();
                };
              t.precomputed = {
                naf: r.naf && { wnd: r.naf.wnd, points: r.naf.points.map(i) },
                doubles: r.doubles && {
                  step: r.doubles.step,
                  points: r.doubles.points.map(i),
                },
              };
            }
            return t;
          }),
          (d.prototype.toJ = function () {
            return this.inf
              ? this.curve.jpoint(null, null, null)
              : this.curve.jpoint(this.x, this.y, this.curve.one);
          }),
          f(c, a.BasePoint),
          (s.prototype.jpoint = function (e, t, r) {
            return new c(this, e, t, r);
          }),
          (c.prototype.toP = function () {
            if (this.isInfinity()) return this.curve.point(null, null);
            var e = this.z.redInvm(),
              t = e.redSqr(),
              r = this.x.redMul(t),
              i = this.y.redMul(t).redMul(e);
            return this.curve.point(r, i);
          }),
          (c.prototype.neg = function () {
            return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
          }),
          (c.prototype.add = function (e) {
            if (this.isInfinity()) return e;
            if (e.isInfinity()) return this;
            var t = e.z.redSqr(),
              r = this.z.redSqr(),
              i = this.x.redMul(t),
              n = e.x.redMul(r),
              f = this.y.redMul(t.redMul(e.z)),
              a = e.y.redMul(r.redMul(this.z)),
              o = i.redSub(n),
              s = f.redSub(a);
            if (0 === o.cmpn(0))
              return 0 !== s.cmpn(0)
                ? this.curve.jpoint(null, null, null)
                : this.dbl();
            var d = o.redSqr(),
              c = d.redMul(o),
              h = i.redMul(d),
              u = s.redSqr().redIAdd(c).redISub(h).redISub(h),
              l = s.redMul(h.redISub(u)).redISub(f.redMul(c)),
              b = this.z.redMul(e.z).redMul(o);
            return this.curve.jpoint(u, l, b);
          }),
          (c.prototype.mixedAdd = function (e) {
            if (this.isInfinity()) return e.toJ();
            if (e.isInfinity()) return this;
            var t = this.z.redSqr(),
              r = this.x,
              i = e.x.redMul(t),
              n = this.y,
              f = e.y.redMul(t).redMul(this.z),
              a = r.redSub(i),
              o = n.redSub(f);
            if (0 === a.cmpn(0))
              return 0 !== o.cmpn(0)
                ? this.curve.jpoint(null, null, null)
                : this.dbl();
            var s = a.redSqr(),
              d = s.redMul(a),
              c = r.redMul(s),
              h = o.redSqr().redIAdd(d).redISub(c).redISub(c),
              u = o.redMul(c.redISub(h)).redISub(n.redMul(d)),
              l = this.z.redMul(a);
            return this.curve.jpoint(h, u, l);
          }),
          (c.prototype.dblp = function (e) {
            if (0 === e) return this;
            if (this.isInfinity()) return this;
            if (!e) return this.dbl();
            var t;
            if (this.curve.zeroA || this.curve.threeA) {
              var r = this;
              for (t = 0; t < e; t++) r = r.dbl();
              return r;
            }
            var i = this.curve.a,
              n = this.curve.tinv,
              f = this.x,
              a = this.y,
              o = this.z,
              s = o.redSqr().redSqr(),
              d = a.redAdd(a);
            for (t = 0; t < e; t++) {
              var c = f.redSqr(),
                h = d.redSqr(),
                u = h.redSqr(),
                l = c.redAdd(c).redIAdd(c).redIAdd(i.redMul(s)),
                b = f.redMul(h),
                p = l.redSqr().redISub(b.redAdd(b)),
                y = b.redISub(p),
                m = l.redMul(y);
              m = m.redIAdd(m).redISub(u);
              var g = d.redMul(o);
              t + 1 < e && (s = s.redMul(u)), (f = p), (o = g), (d = m);
            }
            return this.curve.jpoint(f, d.redMul(n), o);
          }),
          (c.prototype.dbl = function () {
            return this.isInfinity()
              ? this
              : this.curve.zeroA
              ? this._zeroDbl()
              : this.curve.threeA
              ? this._threeDbl()
              : this._dbl();
          }),
          (c.prototype._zeroDbl = function () {
            var e, t, r;
            if (this.zOne) {
              var i = this.x.redSqr(),
                n = this.y.redSqr(),
                f = n.redSqr(),
                a = this.x.redAdd(n).redSqr().redISub(i).redISub(f);
              a = a.redIAdd(a);
              var o = i.redAdd(i).redIAdd(i),
                s = o.redSqr().redISub(a).redISub(a),
                d = f.redIAdd(f);
              (d = (d = d.redIAdd(d)).redIAdd(d)),
                (e = s),
                (t = o.redMul(a.redISub(s)).redISub(d)),
                (r = this.y.redAdd(this.y));
            } else {
              var c = this.x.redSqr(),
                h = this.y.redSqr(),
                u = h.redSqr(),
                l = this.x.redAdd(h).redSqr().redISub(c).redISub(u);
              l = l.redIAdd(l);
              var b = c.redAdd(c).redIAdd(c),
                p = b.redSqr(),
                y = u.redIAdd(u);
              (y = (y = y.redIAdd(y)).redIAdd(y)),
                (e = p.redISub(l).redISub(l)),
                (t = b.redMul(l.redISub(e)).redISub(y)),
                (r = (r = this.y.redMul(this.z)).redIAdd(r));
            }
            return this.curve.jpoint(e, t, r);
          }),
          (c.prototype._threeDbl = function () {
            var e, t, r;
            if (this.zOne) {
              var i = this.x.redSqr(),
                n = this.y.redSqr(),
                f = n.redSqr(),
                a = this.x.redAdd(n).redSqr().redISub(i).redISub(f);
              a = a.redIAdd(a);
              var o = i.redAdd(i).redIAdd(i).redIAdd(this.curve.a),
                s = o.redSqr().redISub(a).redISub(a);
              e = s;
              var d = f.redIAdd(f);
              (d = (d = d.redIAdd(d)).redIAdd(d)),
                (t = o.redMul(a.redISub(s)).redISub(d)),
                (r = this.y.redAdd(this.y));
            } else {
              var c = this.z.redSqr(),
                h = this.y.redSqr(),
                u = this.x.redMul(h),
                l = this.x.redSub(c).redMul(this.x.redAdd(c));
              l = l.redAdd(l).redIAdd(l);
              var b = u.redIAdd(u),
                p = (b = b.redIAdd(b)).redAdd(b);
              (e = l.redSqr().redISub(p)),
                (r = this.y.redAdd(this.z).redSqr().redISub(h).redISub(c));
              var y = h.redSqr();
              (y = (y = (y = y.redIAdd(y)).redIAdd(y)).redIAdd(y)),
                (t = l.redMul(b.redISub(e)).redISub(y));
            }
            return this.curve.jpoint(e, t, r);
          }),
          (c.prototype._dbl = function () {
            var e = this.curve.a,
              t = this.x,
              r = this.y,
              i = this.z,
              n = i.redSqr().redSqr(),
              f = t.redSqr(),
              a = r.redSqr(),
              o = f.redAdd(f).redIAdd(f).redIAdd(e.redMul(n)),
              s = t.redAdd(t),
              d = (s = s.redIAdd(s)).redMul(a),
              c = o.redSqr().redISub(d.redAdd(d)),
              h = d.redISub(c),
              u = a.redSqr();
            u = (u = (u = u.redIAdd(u)).redIAdd(u)).redIAdd(u);
            var l = o.redMul(h).redISub(u),
              b = r.redAdd(r).redMul(i);
            return this.curve.jpoint(c, l, b);
          }),
          (c.prototype.trpl = function () {
            if (!this.curve.zeroA) return this.dbl().add(this);
            var e = this.x.redSqr(),
              t = this.y.redSqr(),
              r = this.z.redSqr(),
              i = t.redSqr(),
              n = e.redAdd(e).redIAdd(e),
              f = n.redSqr(),
              a = this.x.redAdd(t).redSqr().redISub(e).redISub(i),
              o = (a = (a = (a = a.redIAdd(a)).redAdd(a).redIAdd(a)).redISub(
                f
              )).redSqr(),
              s = i.redIAdd(i);
            s = (s = (s = s.redIAdd(s)).redIAdd(s)).redIAdd(s);
            var d = n.redIAdd(a).redSqr().redISub(f).redISub(o).redISub(s),
              c = t.redMul(d);
            c = (c = c.redIAdd(c)).redIAdd(c);
            var h = this.x.redMul(o).redISub(c);
            h = (h = h.redIAdd(h)).redIAdd(h);
            var u = this.y.redMul(d.redMul(s.redISub(d)).redISub(a.redMul(o)));
            u = (u = (u = u.redIAdd(u)).redIAdd(u)).redIAdd(u);
            var l = this.z.redAdd(a).redSqr().redISub(r).redISub(o);
            return this.curve.jpoint(h, u, l);
          }),
          (c.prototype.mul = function (e, t) {
            return (e = new n(e, t)), this.curve._wnafMul(this, e);
          }),
          (c.prototype.eq = function (e) {
            if ("affine" === e.type) return this.eq(e.toJ());
            if (this === e) return !0;
            var t = this.z.redSqr(),
              r = e.z.redSqr();
            if (0 !== this.x.redMul(r).redISub(e.x.redMul(t)).cmpn(0))
              return !1;
            var i = t.redMul(this.z),
              n = r.redMul(e.z);
            return 0 === this.y.redMul(n).redISub(e.y.redMul(i)).cmpn(0);
          }),
          (c.prototype.eqXToP = function (e) {
            var t = this.z.redSqr(),
              r = e.toRed(this.curve.red).redMul(t);
            if (0 === this.x.cmp(r)) return !0;
            for (var i = e.clone(), n = this.curve.redN.redMul(t); ; ) {
              if ((i.iadd(this.curve.n), i.cmp(this.curve.p) >= 0)) return !1;
              if ((r.redIAdd(n), 0 === this.x.cmp(r))) return !0;
            }
          }),
          (c.prototype.inspect = function () {
            return this.isInfinity()
              ? "<EC JPoint Infinity>"
              : "<EC JPoint x: " +
                  this.x.toString(16, 2) +
                  " y: " +
                  this.y.toString(16, 2) +
                  " z: " +
                  this.z.toString(16, 2) +
                  ">";
          }),
          (c.prototype.isInfinity = function () {
            return 0 === this.z.cmpn(0);
          });
      },
      5427: (e, t, r) => {
        "use strict";
        var i,
          n = t,
          f = r(3715),
          a = r(8254),
          o = r(953).assert;
        function s(e) {
          "short" === e.type
            ? (this.curve = new a.short(e))
            : "edwards" === e.type
            ? (this.curve = new a.edwards(e))
            : (this.curve = new a.mont(e)),
            (this.g = this.curve.g),
            (this.n = this.curve.n),
            (this.hash = e.hash),
            o(this.g.validate(), "Invalid curve"),
            o(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
        }
        function d(e, t) {
          Object.defineProperty(n, e, {
            configurable: !0,
            enumerable: !0,
            get: function () {
              var r = new s(t);
              return (
                Object.defineProperty(n, e, {
                  configurable: !0,
                  enumerable: !0,
                  value: r,
                }),
                r
              );
            },
          });
        }
        (n.PresetCurve = s),
          d("p192", {
            type: "short",
            prime: "p192",
            p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
            a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
            b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
            n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
            hash: f.sha256,
            gRed: !1,
            g: [
              "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
              "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811",
            ],
          }),
          d("p224", {
            type: "short",
            prime: "p224",
            p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
            a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
            b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
            n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
            hash: f.sha256,
            gRed: !1,
            g: [
              "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
              "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34",
            ],
          }),
          d("p256", {
            type: "short",
            prime: null,
            p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
            a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
            b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
            n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
            hash: f.sha256,
            gRed: !1,
            g: [
              "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
              "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5",
            ],
          }),
          d("p384", {
            type: "short",
            prime: null,
            p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
            a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
            b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
            n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
            hash: f.sha384,
            gRed: !1,
            g: [
              "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
              "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f",
            ],
          }),
          d("p521", {
            type: "short",
            prime: null,
            p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
            a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
            b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
            n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
            hash: f.sha512,
            gRed: !1,
            g: [
              "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
              "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650",
            ],
          }),
          d("curve25519", {
            type: "mont",
            prime: "p25519",
            p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
            a: "76d06",
            b: "1",
            n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
            hash: f.sha256,
            gRed: !1,
            g: ["9"],
          }),
          d("ed25519", {
            type: "edwards",
            prime: "p25519",
            p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
            a: "-1",
            c: "1",
            d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
            n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
            hash: f.sha256,
            gRed: !1,
            g: [
              "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
              "6666666666666666666666666666666666666666666666666666666666666658",
            ],
          });
        try {
          i = r(1037);
        } catch (e) {
          i = void 0;
        }
        d("secp256k1", {
          type: "short",
          prime: "k256",
          p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
          a: "0",
          b: "7",
          n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
          h: "1",
          hash: f.sha256,
          beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
          lambda:
            "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
          basis: [
            {
              a: "3086d221a7d46bcde86c90e49284eb15",
              b: "-e4437ed6010e88286f547fa90abfe4c3",
            },
            {
              a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
              b: "3086d221a7d46bcde86c90e49284eb15",
            },
          ],
          gRed: !1,
          g: [
            "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
            "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
            i,
          ],
        });
      },
      7954: (e, t, r) => {
        "use strict";
        var i = r(3785),
          n = r(2156),
          f = r(953),
          a = r(5427),
          o = r(9931),
          s = f.assert,
          d = r(1251),
          c = r(611);
        function h(e) {
          if (!(this instanceof h)) return new h(e);
          "string" == typeof e &&
            (s(
              Object.prototype.hasOwnProperty.call(a, e),
              "Unknown curve " + e
            ),
            (e = a[e])),
            e instanceof a.PresetCurve && (e = { curve: e }),
            (this.curve = e.curve.curve),
            (this.n = this.curve.n),
            (this.nh = this.n.ushrn(1)),
            (this.g = this.curve.g),
            (this.g = e.curve.g),
            this.g.precompute(e.curve.n.bitLength() + 1),
            (this.hash = e.hash || e.curve.hash);
        }
        (e.exports = h),
          (h.prototype.keyPair = function (e) {
            return new d(this, e);
          }),
          (h.prototype.keyFromPrivate = function (e, t) {
            return d.fromPrivate(this, e, t);
          }),
          (h.prototype.keyFromPublic = function (e, t) {
            return d.fromPublic(this, e, t);
          }),
          (h.prototype.genKeyPair = function (e) {
            e || (e = {});
            for (
              var t = new n({
                  hash: this.hash,
                  pers: e.pers,
                  persEnc: e.persEnc || "utf8",
                  entropy: e.entropy || o(this.hash.hmacStrength),
                  entropyEnc: (e.entropy && e.entropyEnc) || "utf8",
                  nonce: this.n.toArray(),
                }),
                r = this.n.byteLength(),
                f = this.n.sub(new i(2));
              ;

            ) {
              var a = new i(t.generate(r));
              if (!(a.cmp(f) > 0)) return a.iaddn(1), this.keyFromPrivate(a);
            }
          }),
          (h.prototype._truncateToN = function (e, t) {
            var r = 8 * e.byteLength() - this.n.bitLength();
            return (
              r > 0 && (e = e.ushrn(r)),
              !t && e.cmp(this.n) >= 0 ? e.sub(this.n) : e
            );
          }),
          (h.prototype.sign = function (e, t, r, f) {
            "object" == typeof r && ((f = r), (r = null)),
              f || (f = {}),
              (t = this.keyFromPrivate(t, r)),
              (e = this._truncateToN(new i(e, 16)));
            for (
              var a = this.n.byteLength(),
                o = t.getPrivate().toArray("be", a),
                s = e.toArray("be", a),
                d = new n({
                  hash: this.hash,
                  entropy: o,
                  nonce: s,
                  pers: f.pers,
                  persEnc: f.persEnc || "utf8",
                }),
                h = this.n.sub(new i(1)),
                u = 0;
              ;
              u++
            ) {
              var l = f.k ? f.k(u) : new i(d.generate(this.n.byteLength()));
              if (
                !((l = this._truncateToN(l, !0)).cmpn(1) <= 0 || l.cmp(h) >= 0)
              ) {
                var b = this.g.mul(l);
                if (!b.isInfinity()) {
                  var p = b.getX(),
                    y = p.umod(this.n);
                  if (0 !== y.cmpn(0)) {
                    var m = l.invm(this.n).mul(y.mul(t.getPrivate()).iadd(e));
                    if (0 !== (m = m.umod(this.n)).cmpn(0)) {
                      var g =
                        (b.getY().isOdd() ? 1 : 0) | (0 !== p.cmp(y) ? 2 : 0);
                      return (
                        f.canonical &&
                          m.cmp(this.nh) > 0 &&
                          ((m = this.n.sub(m)), (g ^= 1)),
                        new c({ r: y, s: m, recoveryParam: g })
                      );
                    }
                  }
                }
              }
            }
          }),
          (h.prototype.verify = function (e, t, r, n) {
            (e = this._truncateToN(new i(e, 16))),
              (r = this.keyFromPublic(r, n));
            var f = (t = new c(t, "hex")).r,
              a = t.s;
            if (f.cmpn(1) < 0 || f.cmp(this.n) >= 0) return !1;
            if (a.cmpn(1) < 0 || a.cmp(this.n) >= 0) return !1;
            var o,
              s = a.invm(this.n),
              d = s.mul(e).umod(this.n),
              h = s.mul(f).umod(this.n);
            return this.curve._maxwellTrick
              ? !(o = this.g.jmulAdd(d, r.getPublic(), h)).isInfinity() &&
                  o.eqXToP(f)
              : !(o = this.g.mulAdd(d, r.getPublic(), h)).isInfinity() &&
                  0 === o.getX().umod(this.n).cmp(f);
          }),
          (h.prototype.recoverPubKey = function (e, t, r, n) {
            s((3 & r) === r, "The recovery param is more than two bits"),
              (t = new c(t, n));
            var f = this.n,
              a = new i(e),
              o = t.r,
              d = t.s,
              h = 1 & r,
              u = r >> 1;
            if (o.cmp(this.curve.p.umod(this.curve.n)) >= 0 && u)
              throw new Error("Unable to find sencond key candinate");
            o = u
              ? this.curve.pointFromX(o.add(this.curve.n), h)
              : this.curve.pointFromX(o, h);
            var l = t.r.invm(f),
              b = f.sub(a).mul(l).umod(f),
              p = d.mul(l).umod(f);
            return this.g.mulAdd(b, o, p);
          }),
          (h.prototype.getKeyRecoveryParam = function (e, t, r, i) {
            if (null !== (t = new c(t, i)).recoveryParam)
              return t.recoveryParam;
            for (var n = 0; n < 4; n++) {
              var f;
              try {
                f = this.recoverPubKey(e, t, n);
              } catch (e) {
                continue;
              }
              if (f.eq(r)) return n;
            }
            throw new Error("Unable to find valid recovery factor");
          });
      },
      1251: (e, t, r) => {
        "use strict";
        var i = r(3785),
          n = r(953).assert;
        function f(e, t) {
          (this.ec = e),
            (this.priv = null),
            (this.pub = null),
            t.priv && this._importPrivate(t.priv, t.privEnc),
            t.pub && this._importPublic(t.pub, t.pubEnc);
        }
        (e.exports = f),
          (f.fromPublic = function (e, t, r) {
            return t instanceof f ? t : new f(e, { pub: t, pubEnc: r });
          }),
          (f.fromPrivate = function (e, t, r) {
            return t instanceof f ? t : new f(e, { priv: t, privEnc: r });
          }),
          (f.prototype.validate = function () {
            var e = this.getPublic();
            return e.isInfinity()
              ? { result: !1, reason: "Invalid public key" }
              : e.validate()
              ? e.mul(this.ec.curve.n).isInfinity()
                ? { result: !0, reason: null }
                : { result: !1, reason: "Public key * N != O" }
              : { result: !1, reason: "Public key is not a point" };
          }),
          (f.prototype.getPublic = function (e, t) {
            return (
              "string" == typeof e && ((t = e), (e = null)),
              this.pub || (this.pub = this.ec.g.mul(this.priv)),
              t ? this.pub.encode(t, e) : this.pub
            );
          }),
          (f.prototype.getPrivate = function (e) {
            return "hex" === e ? this.priv.toString(16, 2) : this.priv;
          }),
          (f.prototype._importPrivate = function (e, t) {
            (this.priv = new i(e, t || 16)),
              (this.priv = this.priv.umod(this.ec.curve.n));
          }),
          (f.prototype._importPublic = function (e, t) {
            if (e.x || e.y)
              return (
                "mont" === this.ec.curve.type
                  ? n(e.x, "Need x coordinate")
                  : ("short" !== this.ec.curve.type &&
                      "edwards" !== this.ec.curve.type) ||
                    n(e.x && e.y, "Need both x and y coordinate"),
                void (this.pub = this.ec.curve.point(e.x, e.y))
              );
            this.pub = this.ec.curve.decodePoint(e, t);
          }),
          (f.prototype.derive = function (e) {
            return (
              e.validate() || n(e.validate(), "public point not validated"),
              e.mul(this.priv).getX()
            );
          }),
          (f.prototype.sign = function (e, t, r) {
            return this.ec.sign(e, this, t, r);
          }),
          (f.prototype.verify = function (e, t) {
            return this.ec.verify(e, t, this);
          }),
          (f.prototype.inspect = function () {
            return (
              "<Key priv: " +
              (this.priv && this.priv.toString(16, 2)) +
              " pub: " +
              (this.pub && this.pub.inspect()) +
              " >"
            );
          });
      },
      611: (e, t, r) => {
        "use strict";
        var i = r(3785),
          n = r(953),
          f = n.assert;
        function a(e, t) {
          if (e instanceof a) return e;
          this._importDER(e, t) ||
            (f(e.r && e.s, "Signature without r or s"),
            (this.r = new i(e.r, 16)),
            (this.s = new i(e.s, 16)),
            void 0 === e.recoveryParam
              ? (this.recoveryParam = null)
              : (this.recoveryParam = e.recoveryParam));
        }
        function o() {
          this.place = 0;
        }
        function s(e, t) {
          var r = e[t.place++];
          if (!(128 & r)) return r;
          var i = 15 & r;
          if (0 === i || i > 4) return !1;
          for (var n = 0, f = 0, a = t.place; f < i; f++, a++)
            (n <<= 8), (n |= e[a]), (n >>>= 0);
          return !(n <= 127) && ((t.place = a), n);
        }
        function d(e) {
          for (
            var t = 0, r = e.length - 1;
            !e[t] && !(128 & e[t + 1]) && t < r;

          )
            t++;
          return 0 === t ? e : e.slice(t);
        }
        function c(e, t) {
          if (t < 128) e.push(t);
          else {
            var r = 1 + ((Math.log(t) / Math.LN2) >>> 3);
            for (e.push(128 | r); --r; ) e.push((t >>> (r << 3)) & 255);
            e.push(t);
          }
        }
        (e.exports = a),
          (a.prototype._importDER = function (e, t) {
            e = n.toArray(e, t);
            var r = new o();
            if (48 !== e[r.place++]) return !1;
            var f = s(e, r);
            if (!1 === f) return !1;
            if (f + r.place !== e.length) return !1;
            if (2 !== e[r.place++]) return !1;
            var a = s(e, r);
            if (!1 === a) return !1;
            var d = e.slice(r.place, a + r.place);
            if (((r.place += a), 2 !== e[r.place++])) return !1;
            var c = s(e, r);
            if (!1 === c) return !1;
            if (e.length !== c + r.place) return !1;
            var h = e.slice(r.place, c + r.place);
            if (0 === d[0]) {
              if (!(128 & d[1])) return !1;
              d = d.slice(1);
            }
            if (0 === h[0]) {
              if (!(128 & h[1])) return !1;
              h = h.slice(1);
            }
            return (
              (this.r = new i(d)),
              (this.s = new i(h)),
              (this.recoveryParam = null),
              !0
            );
          }),
          (a.prototype.toDER = function (e) {
            var t = this.r.toArray(),
              r = this.s.toArray();
            for (
              128 & t[0] && (t = [0].concat(t)),
                128 & r[0] && (r = [0].concat(r)),
                t = d(t),
                r = d(r);
              !(r[0] || 128 & r[1]);

            )
              r = r.slice(1);
            var i = [2];
            c(i, t.length), (i = i.concat(t)).push(2), c(i, r.length);
            var f = i.concat(r),
              a = [48];
            return c(a, f.length), (a = a.concat(f)), n.encode(a, e);
          });
      },
      5980: (e, t, r) => {
        "use strict";
        var i = r(3715),
          n = r(5427),
          f = r(953),
          a = f.assert,
          o = f.parseBytes,
          s = r(9087),
          d = r(3622);
        function c(e) {
          if (
            (a("ed25519" === e, "only tested with ed25519 so far"),
            !(this instanceof c))
          )
            return new c(e);
          (e = n[e].curve),
            (this.curve = e),
            (this.g = e.g),
            this.g.precompute(e.n.bitLength() + 1),
            (this.pointClass = e.point().constructor),
            (this.encodingLength = Math.ceil(e.n.bitLength() / 8)),
            (this.hash = i.sha512);
        }
        (e.exports = c),
          (c.prototype.sign = function (e, t) {
            e = o(e);
            var r = this.keyFromSecret(t),
              i = this.hashInt(r.messagePrefix(), e),
              n = this.g.mul(i),
              f = this.encodePoint(n),
              a = this.hashInt(f, r.pubBytes(), e).mul(r.priv()),
              s = i.add(a).umod(this.curve.n);
            return this.makeSignature({ R: n, S: s, Rencoded: f });
          }),
          (c.prototype.verify = function (e, t, r) {
            (e = o(e)), (t = this.makeSignature(t));
            var i = this.keyFromPublic(r),
              n = this.hashInt(t.Rencoded(), i.pubBytes(), e),
              f = this.g.mul(t.S());
            return t.R().add(i.pub().mul(n)).eq(f);
          }),
          (c.prototype.hashInt = function () {
            for (var e = this.hash(), t = 0; t < arguments.length; t++)
              e.update(arguments[t]);
            return f.intFromLE(e.digest()).umod(this.curve.n);
          }),
          (c.prototype.keyFromPublic = function (e) {
            return s.fromPublic(this, e);
          }),
          (c.prototype.keyFromSecret = function (e) {
            return s.fromSecret(this, e);
          }),
          (c.prototype.makeSignature = function (e) {
            return e instanceof d ? e : new d(this, e);
          }),
          (c.prototype.encodePoint = function (e) {
            var t = e.getY().toArray("le", this.encodingLength);
            return (
              (t[this.encodingLength - 1] |= e.getX().isOdd() ? 128 : 0), t
            );
          }),
          (c.prototype.decodePoint = function (e) {
            var t = (e = f.parseBytes(e)).length - 1,
              r = e.slice(0, t).concat(-129 & e[t]),
              i = 0 != (128 & e[t]),
              n = f.intFromLE(r);
            return this.curve.pointFromY(n, i);
          }),
          (c.prototype.encodeInt = function (e) {
            return e.toArray("le", this.encodingLength);
          }),
          (c.prototype.decodeInt = function (e) {
            return f.intFromLE(e);
          }),
          (c.prototype.isPoint = function (e) {
            return e instanceof this.pointClass;
          });
      },
      9087: (e, t, r) => {
        "use strict";
        var i = r(953),
          n = i.assert,
          f = i.parseBytes,
          a = i.cachedProperty;
        function o(e, t) {
          (this.eddsa = e),
            (this._secret = f(t.secret)),
            e.isPoint(t.pub)
              ? (this._pub = t.pub)
              : (this._pubBytes = f(t.pub));
        }
        (o.fromPublic = function (e, t) {
          return t instanceof o ? t : new o(e, { pub: t });
        }),
          (o.fromSecret = function (e, t) {
            return t instanceof o ? t : new o(e, { secret: t });
          }),
          (o.prototype.secret = function () {
            return this._secret;
          }),
          a(o, "pubBytes", function () {
            return this.eddsa.encodePoint(this.pub());
          }),
          a(o, "pub", function () {
            return this._pubBytes
              ? this.eddsa.decodePoint(this._pubBytes)
              : this.eddsa.g.mul(this.priv());
          }),
          a(o, "privBytes", function () {
            var e = this.eddsa,
              t = this.hash(),
              r = e.encodingLength - 1,
              i = t.slice(0, e.encodingLength);
            return (i[0] &= 248), (i[r] &= 127), (i[r] |= 64), i;
          }),
          a(o, "priv", function () {
            return this.eddsa.decodeInt(this.privBytes());
          }),
          a(o, "hash", function () {
            return this.eddsa.hash().update(this.secret()).digest();
          }),
          a(o, "messagePrefix", function () {
            return this.hash().slice(this.eddsa.encodingLength);
          }),
          (o.prototype.sign = function (e) {
            return (
              n(this._secret, "KeyPair can only verify"),
              this.eddsa.sign(e, this)
            );
          }),
          (o.prototype.verify = function (e, t) {
            return this.eddsa.verify(e, t, this);
          }),
          (o.prototype.getSecret = function (e) {
            return (
              n(this._secret, "KeyPair is public only"),
              i.encode(this.secret(), e)
            );
          }),
          (o.prototype.getPublic = function (e) {
            return i.encode(this.pubBytes(), e);
          }),
          (e.exports = o);
      },
      3622: (e, t, r) => {
        "use strict";
        var i = r(3785),
          n = r(953),
          f = n.assert,
          a = n.cachedProperty,
          o = n.parseBytes;
        function s(e, t) {
          (this.eddsa = e),
            "object" != typeof t && (t = o(t)),
            Array.isArray(t) &&
              (t = {
                R: t.slice(0, e.encodingLength),
                S: t.slice(e.encodingLength),
              }),
            f(t.R && t.S, "Signature without R or S"),
            e.isPoint(t.R) && (this._R = t.R),
            t.S instanceof i && (this._S = t.S),
            (this._Rencoded = Array.isArray(t.R) ? t.R : t.Rencoded),
            (this._Sencoded = Array.isArray(t.S) ? t.S : t.Sencoded);
        }
        a(s, "S", function () {
          return this.eddsa.decodeInt(this.Sencoded());
        }),
          a(s, "R", function () {
            return this.eddsa.decodePoint(this.Rencoded());
          }),
          a(s, "Rencoded", function () {
            return this.eddsa.encodePoint(this.R());
          }),
          a(s, "Sencoded", function () {
            return this.eddsa.encodeInt(this.S());
          }),
          (s.prototype.toBytes = function () {
            return this.Rencoded().concat(this.Sencoded());
          }),
          (s.prototype.toHex = function () {
            return n.encode(this.toBytes(), "hex").toUpperCase();
          }),
          (e.exports = s);
      },
      1037: (e) => {
        e.exports = {
          doubles: {
            step: 4,
            points: [
              [
                "e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a",
                "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821",
              ],
              [
                "8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508",
                "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf",
              ],
              [
                "175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739",
                "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695",
              ],
              [
                "363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640",
                "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9",
              ],
              [
                "8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c",
                "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36",
              ],
              [
                "723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda",
                "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f",
              ],
              [
                "eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa",
                "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999",
              ],
              [
                "100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0",
                "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09",
              ],
              [
                "e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d",
                "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d",
              ],
              [
                "feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d",
                "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088",
              ],
              [
                "da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1",
                "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d",
              ],
              [
                "53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0",
                "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8",
              ],
              [
                "8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047",
                "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a",
              ],
              [
                "385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862",
                "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453",
              ],
              [
                "6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7",
                "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160",
              ],
              [
                "3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd",
                "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0",
              ],
              [
                "85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83",
                "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6",
              ],
              [
                "948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a",
                "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589",
              ],
              [
                "6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8",
                "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17",
              ],
              [
                "e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d",
                "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda",
              ],
              [
                "e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725",
                "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd",
              ],
              [
                "213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754",
                "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2",
              ],
              [
                "4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c",
                "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6",
              ],
              [
                "fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6",
                "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f",
              ],
              [
                "76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39",
                "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01",
              ],
              [
                "c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891",
                "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3",
              ],
              [
                "d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b",
                "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f",
              ],
              [
                "b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03",
                "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7",
              ],
              [
                "e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d",
                "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78",
              ],
              [
                "a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070",
                "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1",
              ],
              [
                "90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4",
                "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150",
              ],
              [
                "8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da",
                "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82",
              ],
              [
                "e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11",
                "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc",
              ],
              [
                "8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e",
                "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b",
              ],
              [
                "e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41",
                "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51",
              ],
              [
                "b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef",
                "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45",
              ],
              [
                "d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8",
                "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120",
              ],
              [
                "324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d",
                "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84",
              ],
              [
                "4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96",
                "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d",
              ],
              [
                "9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd",
                "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d",
              ],
              [
                "6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5",
                "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8",
              ],
              [
                "a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266",
                "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8",
              ],
              [
                "7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71",
                "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac",
              ],
              [
                "928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac",
                "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f",
              ],
              [
                "85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751",
                "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962",
              ],
              [
                "ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e",
                "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907",
              ],
              [
                "827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241",
                "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec",
              ],
              [
                "eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3",
                "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d",
              ],
              [
                "e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f",
                "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414",
              ],
              [
                "1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19",
                "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd",
              ],
              [
                "146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be",
                "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0",
              ],
              [
                "fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9",
                "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811",
              ],
              [
                "da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2",
                "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1",
              ],
              [
                "a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13",
                "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c",
              ],
              [
                "174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c",
                "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73",
              ],
              [
                "959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba",
                "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd",
              ],
              [
                "d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151",
                "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405",
              ],
              [
                "64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073",
                "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589",
              ],
              [
                "8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458",
                "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e",
              ],
              [
                "13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b",
                "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27",
              ],
              [
                "bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366",
                "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1",
              ],
              [
                "8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa",
                "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482",
              ],
              [
                "8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0",
                "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945",
              ],
              [
                "dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787",
                "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573",
              ],
              [
                "f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e",
                "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82",
              ],
            ],
          },
          naf: {
            wnd: 7,
            points: [
              [
                "f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9",
                "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672",
              ],
              [
                "2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4",
                "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6",
              ],
              [
                "5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc",
                "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da",
              ],
              [
                "acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe",
                "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37",
              ],
              [
                "774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb",
                "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b",
              ],
              [
                "f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8",
                "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81",
              ],
              [
                "d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e",
                "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58",
              ],
              [
                "defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34",
                "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77",
              ],
              [
                "2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c",
                "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a",
              ],
              [
                "352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5",
                "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c",
              ],
              [
                "2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f",
                "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67",
              ],
              [
                "9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714",
                "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402",
              ],
              [
                "daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729",
                "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55",
              ],
              [
                "c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db",
                "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482",
              ],
              [
                "6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4",
                "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82",
              ],
              [
                "1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5",
                "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396",
              ],
              [
                "605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479",
                "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49",
              ],
              [
                "62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d",
                "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf",
              ],
              [
                "80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f",
                "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a",
              ],
              [
                "7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb",
                "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7",
              ],
              [
                "d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9",
                "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933",
              ],
              [
                "49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963",
                "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a",
              ],
              [
                "77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74",
                "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6",
              ],
              [
                "f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530",
                "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37",
              ],
              [
                "463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b",
                "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e",
              ],
              [
                "f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247",
                "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6",
              ],
              [
                "caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1",
                "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476",
              ],
              [
                "2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120",
                "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40",
              ],
              [
                "7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435",
                "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61",
              ],
              [
                "754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18",
                "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683",
              ],
              [
                "e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8",
                "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5",
              ],
              [
                "186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb",
                "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b",
              ],
              [
                "df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f",
                "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417",
              ],
              [
                "5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143",
                "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868",
              ],
              [
                "290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba",
                "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a",
              ],
              [
                "af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45",
                "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6",
              ],
              [
                "766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a",
                "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996",
              ],
              [
                "59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e",
                "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e",
              ],
              [
                "f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8",
                "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d",
              ],
              [
                "7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c",
                "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2",
              ],
              [
                "948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519",
                "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e",
              ],
              [
                "7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab",
                "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437",
              ],
              [
                "3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca",
                "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311",
              ],
              [
                "d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf",
                "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4",
              ],
              [
                "1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610",
                "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575",
              ],
              [
                "733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4",
                "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d",
              ],
              [
                "15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c",
                "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d",
              ],
              [
                "a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940",
                "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629",
              ],
              [
                "e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980",
                "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06",
              ],
              [
                "311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3",
                "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374",
              ],
              [
                "34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf",
                "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee",
              ],
              [
                "f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63",
                "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1",
              ],
              [
                "d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448",
                "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b",
              ],
              [
                "32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf",
                "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661",
              ],
              [
                "7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5",
                "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6",
              ],
              [
                "ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6",
                "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e",
              ],
              [
                "16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5",
                "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d",
              ],
              [
                "eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99",
                "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc",
              ],
              [
                "78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51",
                "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4",
              ],
              [
                "494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5",
                "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c",
              ],
              [
                "a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5",
                "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b",
              ],
              [
                "c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997",
                "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913",
              ],
              [
                "841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881",
                "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154",
              ],
              [
                "5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5",
                "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865",
              ],
              [
                "36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66",
                "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc",
              ],
              [
                "336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726",
                "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224",
              ],
              [
                "8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede",
                "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e",
              ],
              [
                "1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94",
                "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6",
              ],
              [
                "85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31",
                "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511",
              ],
              [
                "29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51",
                "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b",
              ],
              [
                "a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252",
                "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2",
              ],
              [
                "4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5",
                "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c",
              ],
              [
                "d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b",
                "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3",
              ],
              [
                "ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4",
                "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d",
              ],
              [
                "af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f",
                "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700",
              ],
              [
                "e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889",
                "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4",
              ],
              [
                "591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246",
                "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196",
              ],
              [
                "11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984",
                "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4",
              ],
              [
                "3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a",
                "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257",
              ],
              [
                "cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030",
                "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13",
              ],
              [
                "c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197",
                "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096",
              ],
              [
                "c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593",
                "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38",
              ],
              [
                "a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef",
                "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f",
              ],
              [
                "347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38",
                "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448",
              ],
              [
                "da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a",
                "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a",
              ],
              [
                "c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111",
                "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4",
              ],
              [
                "4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502",
                "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437",
              ],
              [
                "3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea",
                "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7",
              ],
              [
                "cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26",
                "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d",
              ],
              [
                "b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986",
                "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a",
              ],
              [
                "d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e",
                "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54",
              ],
              [
                "48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4",
                "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77",
              ],
              [
                "dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda",
                "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517",
              ],
              [
                "6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859",
                "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10",
              ],
              [
                "e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f",
                "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125",
              ],
              [
                "eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c",
                "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e",
              ],
              [
                "13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942",
                "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1",
              ],
              [
                "ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a",
                "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2",
              ],
              [
                "b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80",
                "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423",
              ],
              [
                "ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d",
                "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8",
              ],
              [
                "8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1",
                "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758",
              ],
              [
                "52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63",
                "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375",
              ],
              [
                "e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352",
                "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d",
              ],
              [
                "7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193",
                "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec",
              ],
              [
                "5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00",
                "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0",
              ],
              [
                "32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58",
                "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c",
              ],
              [
                "e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7",
                "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4",
              ],
              [
                "8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8",
                "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f",
              ],
              [
                "4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e",
                "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649",
              ],
              [
                "3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d",
                "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826",
              ],
              [
                "674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b",
                "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5",
              ],
              [
                "d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f",
                "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87",
              ],
              [
                "30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6",
                "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b",
              ],
              [
                "be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297",
                "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc",
              ],
              [
                "93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a",
                "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c",
              ],
              [
                "b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c",
                "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f",
              ],
              [
                "d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52",
                "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a",
              ],
              [
                "d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb",
                "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46",
              ],
              [
                "463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065",
                "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f",
              ],
              [
                "7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917",
                "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03",
              ],
              [
                "74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9",
                "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08",
              ],
              [
                "30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3",
                "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8",
              ],
              [
                "9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57",
                "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373",
              ],
              [
                "176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66",
                "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3",
              ],
              [
                "75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8",
                "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8",
              ],
              [
                "809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721",
                "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1",
              ],
              [
                "1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180",
                "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9",
              ],
            ],
          },
        };
      },
      953: (e, t, r) => {
        "use strict";
        var i = t,
          n = r(3785),
          f = r(9746),
          a = r(4504);
        (i.assert = f),
          (i.toArray = a.toArray),
          (i.zero2 = a.zero2),
          (i.toHex = a.toHex),
          (i.encode = a.encode),
          (i.getNAF = function (e, t, r) {
            var i = new Array(Math.max(e.bitLength(), r) + 1);
            i.fill(0);
            for (
              var n = 1 << (t + 1), f = e.clone(), a = 0;
              a < i.length;
              a++
            ) {
              var o,
                s = f.andln(n - 1);
              f.isOdd()
                ? ((o = s > (n >> 1) - 1 ? (n >> 1) - s : s), f.isubn(o))
                : (o = 0),
                (i[a] = o),
                f.iushrn(1);
            }
            return i;
          }),
          (i.getJSF = function (e, t) {
            var r = [[], []];
            (e = e.clone()), (t = t.clone());
            for (var i, n = 0, f = 0; e.cmpn(-n) > 0 || t.cmpn(-f) > 0; ) {
              var a,
                o,
                s = (e.andln(3) + n) & 3,
                d = (t.andln(3) + f) & 3;
              3 === s && (s = -1),
                3 === d && (d = -1),
                (a =
                  0 == (1 & s)
                    ? 0
                    : (3 != (i = (e.andln(7) + n) & 7) && 5 !== i) || 2 !== d
                    ? s
                    : -s),
                r[0].push(a),
                (o =
                  0 == (1 & d)
                    ? 0
                    : (3 != (i = (t.andln(7) + f) & 7) && 5 !== i) || 2 !== s
                    ? d
                    : -d),
                r[1].push(o),
                2 * n === a + 1 && (n = 1 - n),
                2 * f === o + 1 && (f = 1 - f),
                e.iushrn(1),
                t.iushrn(1);
            }
            return r;
          }),
          (i.cachedProperty = function (e, t, r) {
            var i = "_" + t;
            e.prototype[t] = function () {
              return void 0 !== this[i] ? this[i] : (this[i] = r.call(this));
            };
          }),
          (i.parseBytes = function (e) {
            return "string" == typeof e ? i.toArray(e, "hex") : e;
          }),
          (i.intFromLE = function (e) {
            return new n(e, "hex", "le");
          });
      },
      3785: function (e, t, r) {
        !(function (e, t) {
          "use strict";
          function i(e, t) {
            if (!e) throw new Error(t || "Assertion failed");
          }
          function n(e, t) {
            e.super_ = t;
            var r = function () {};
            (r.prototype = t.prototype),
              (e.prototype = new r()),
              (e.prototype.constructor = e);
          }
          function f(e, t, r) {
            if (f.isBN(e)) return e;
            (this.negative = 0),
              (this.words = null),
              (this.length = 0),
              (this.red = null),
              null !== e &&
                (("le" !== t && "be" !== t) || ((r = t), (t = 10)),
                this._init(e || 0, t || 10, r || "be"));
          }
          var a;
          "object" == typeof e ? (e.exports = f) : (t.BN = f),
            (f.BN = f),
            (f.wordSize = 26);
          try {
            a =
              "undefined" != typeof window && void 0 !== window.Buffer
                ? window.Buffer
                : r(5568).Buffer;
          } catch (e) {}
          function o(e, t) {
            var r = e.charCodeAt(t);
            return r >= 65 && r <= 70
              ? r - 55
              : r >= 97 && r <= 102
              ? r - 87
              : (r - 48) & 15;
          }
          function s(e, t, r) {
            var i = o(e, r);
            return r - 1 >= t && (i |= o(e, r - 1) << 4), i;
          }
          function d(e, t, r, i) {
            for (var n = 0, f = Math.min(e.length, r), a = t; a < f; a++) {
              var o = e.charCodeAt(a) - 48;
              (n *= i),
                (n += o >= 49 ? o - 49 + 10 : o >= 17 ? o - 17 + 10 : o);
            }
            return n;
          }
          (f.isBN = function (e) {
            return (
              e instanceof f ||
              (null !== e &&
                "object" == typeof e &&
                e.constructor.wordSize === f.wordSize &&
                Array.isArray(e.words))
            );
          }),
            (f.max = function (e, t) {
              return e.cmp(t) > 0 ? e : t;
            }),
            (f.min = function (e, t) {
              return e.cmp(t) < 0 ? e : t;
            }),
            (f.prototype._init = function (e, t, r) {
              if ("number" == typeof e) return this._initNumber(e, t, r);
              if ("object" == typeof e) return this._initArray(e, t, r);
              "hex" === t && (t = 16), i(t === (0 | t) && t >= 2 && t <= 36);
              var n = 0;
              "-" === (e = e.toString().replace(/\s+/g, ""))[0] &&
                (n++, (this.negative = 1)),
                n < e.length &&
                  (16 === t
                    ? this._parseHex(e, n, r)
                    : (this._parseBase(e, t, n),
                      "le" === r && this._initArray(this.toArray(), t, r)));
            }),
            (f.prototype._initNumber = function (e, t, r) {
              e < 0 && ((this.negative = 1), (e = -e)),
                e < 67108864
                  ? ((this.words = [67108863 & e]), (this.length = 1))
                  : e < 4503599627370496
                  ? ((this.words = [67108863 & e, (e / 67108864) & 67108863]),
                    (this.length = 2))
                  : (i(e < 9007199254740992),
                    (this.words = [67108863 & e, (e / 67108864) & 67108863, 1]),
                    (this.length = 3)),
                "le" === r && this._initArray(this.toArray(), t, r);
            }),
            (f.prototype._initArray = function (e, t, r) {
              if ((i("number" == typeof e.length), e.length <= 0))
                return (this.words = [0]), (this.length = 1), this;
              (this.length = Math.ceil(e.length / 3)),
                (this.words = new Array(this.length));
              for (var n = 0; n < this.length; n++) this.words[n] = 0;
              var f,
                a,
                o = 0;
              if ("be" === r)
                for (n = e.length - 1, f = 0; n >= 0; n -= 3)
                  (a = e[n] | (e[n - 1] << 8) | (e[n - 2] << 16)),
                    (this.words[f] |= (a << o) & 67108863),
                    (this.words[f + 1] = (a >>> (26 - o)) & 67108863),
                    (o += 24) >= 26 && ((o -= 26), f++);
              else if ("le" === r)
                for (n = 0, f = 0; n < e.length; n += 3)
                  (a = e[n] | (e[n + 1] << 8) | (e[n + 2] << 16)),
                    (this.words[f] |= (a << o) & 67108863),
                    (this.words[f + 1] = (a >>> (26 - o)) & 67108863),
                    (o += 24) >= 26 && ((o -= 26), f++);
              return this.strip();
            }),
            (f.prototype._parseHex = function (e, t, r) {
              (this.length = Math.ceil((e.length - t) / 6)),
                (this.words = new Array(this.length));
              for (var i = 0; i < this.length; i++) this.words[i] = 0;
              var n,
                f = 0,
                a = 0;
              if ("be" === r)
                for (i = e.length - 1; i >= t; i -= 2)
                  (n = s(e, t, i) << f),
                    (this.words[a] |= 67108863 & n),
                    f >= 18
                      ? ((f -= 18), (a += 1), (this.words[a] |= n >>> 26))
                      : (f += 8);
              else
                for (
                  i = (e.length - t) % 2 == 0 ? t + 1 : t;
                  i < e.length;
                  i += 2
                )
                  (n = s(e, t, i) << f),
                    (this.words[a] |= 67108863 & n),
                    f >= 18
                      ? ((f -= 18), (a += 1), (this.words[a] |= n >>> 26))
                      : (f += 8);
              this.strip();
            }),
            (f.prototype._parseBase = function (e, t, r) {
              (this.words = [0]), (this.length = 1);
              for (var i = 0, n = 1; n <= 67108863; n *= t) i++;
              i--, (n = (n / t) | 0);
              for (
                var f = e.length - r,
                  a = f % i,
                  o = Math.min(f, f - a) + r,
                  s = 0,
                  c = r;
                c < o;
                c += i
              )
                (s = d(e, c, c + i, t)),
                  this.imuln(n),
                  this.words[0] + s < 67108864
                    ? (this.words[0] += s)
                    : this._iaddn(s);
              if (0 !== a) {
                var h = 1;
                for (s = d(e, c, e.length, t), c = 0; c < a; c++) h *= t;
                this.imuln(h),
                  this.words[0] + s < 67108864
                    ? (this.words[0] += s)
                    : this._iaddn(s);
              }
              this.strip();
            }),
            (f.prototype.copy = function (e) {
              e.words = new Array(this.length);
              for (var t = 0; t < this.length; t++) e.words[t] = this.words[t];
              (e.length = this.length),
                (e.negative = this.negative),
                (e.red = this.red);
            }),
            (f.prototype.clone = function () {
              var e = new f(null);
              return this.copy(e), e;
            }),
            (f.prototype._expand = function (e) {
              for (; this.length < e; ) this.words[this.length++] = 0;
              return this;
            }),
            (f.prototype.strip = function () {
              for (; this.length > 1 && 0 === this.words[this.length - 1]; )
                this.length--;
              return this._normSign();
            }),
            (f.prototype._normSign = function () {
              return (
                1 === this.length && 0 === this.words[0] && (this.negative = 0),
                this
              );
            }),
            (f.prototype.inspect = function () {
              return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
            });
          var c = [
              "",
              "0",
              "00",
              "000",
              "0000",
              "00000",
              "000000",
              "0000000",
              "00000000",
              "000000000",
              "0000000000",
              "00000000000",
              "000000000000",
              "0000000000000",
              "00000000000000",
              "000000000000000",
              "0000000000000000",
              "00000000000000000",
              "000000000000000000",
              "0000000000000000000",
              "00000000000000000000",
              "000000000000000000000",
              "0000000000000000000000",
              "00000000000000000000000",
              "000000000000000000000000",
              "0000000000000000000000000",
            ],
            h = [
              0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6,
              6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
            ],
            u = [
              0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
              16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536,
              11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101,
              5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
              20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875,
              60466176,
            ];
          function l(e, t, r) {
            r.negative = t.negative ^ e.negative;
            var i = (e.length + t.length) | 0;
            (r.length = i), (i = (i - 1) | 0);
            var n = 0 | e.words[0],
              f = 0 | t.words[0],
              a = n * f,
              o = 67108863 & a,
              s = (a / 67108864) | 0;
            r.words[0] = o;
            for (var d = 1; d < i; d++) {
              for (
                var c = s >>> 26,
                  h = 67108863 & s,
                  u = Math.min(d, t.length - 1),
                  l = Math.max(0, d - e.length + 1);
                l <= u;
                l++
              ) {
                var b = (d - l) | 0;
                (c +=
                  ((a = (n = 0 | e.words[b]) * (f = 0 | t.words[l]) + h) /
                    67108864) |
                  0),
                  (h = 67108863 & a);
              }
              (r.words[d] = 0 | h), (s = 0 | c);
            }
            return 0 !== s ? (r.words[d] = 0 | s) : r.length--, r.strip();
          }
          (f.prototype.toString = function (e, t) {
            var r;
            if (((t = 0 | t || 1), 16 === (e = e || 10) || "hex" === e)) {
              r = "";
              for (var n = 0, f = 0, a = 0; a < this.length; a++) {
                var o = this.words[a],
                  s = (16777215 & ((o << n) | f)).toString(16);
                (r =
                  0 != (f = (o >>> (24 - n)) & 16777215) ||
                  a !== this.length - 1
                    ? c[6 - s.length] + s + r
                    : s + r),
                  (n += 2) >= 26 && ((n -= 26), a--);
              }
              for (0 !== f && (r = f.toString(16) + r); r.length % t != 0; )
                r = "0" + r;
              return 0 !== this.negative && (r = "-" + r), r;
            }
            if (e === (0 | e) && e >= 2 && e <= 36) {
              var d = h[e],
                l = u[e];
              r = "";
              var b = this.clone();
              for (b.negative = 0; !b.isZero(); ) {
                var p = b.modn(l).toString(e);
                r = (b = b.idivn(l)).isZero() ? p + r : c[d - p.length] + p + r;
              }
              for (this.isZero() && (r = "0" + r); r.length % t != 0; )
                r = "0" + r;
              return 0 !== this.negative && (r = "-" + r), r;
            }
            i(!1, "Base should be between 2 and 36");
          }),
            (f.prototype.toNumber = function () {
              var e = this.words[0];
              return (
                2 === this.length
                  ? (e += 67108864 * this.words[1])
                  : 3 === this.length && 1 === this.words[2]
                  ? (e += 4503599627370496 + 67108864 * this.words[1])
                  : this.length > 2 &&
                    i(!1, "Number can only safely store up to 53 bits"),
                0 !== this.negative ? -e : e
              );
            }),
            (f.prototype.toJSON = function () {
              return this.toString(16);
            }),
            (f.prototype.toBuffer = function (e, t) {
              return i(void 0 !== a), this.toArrayLike(a, e, t);
            }),
            (f.prototype.toArray = function (e, t) {
              return this.toArrayLike(Array, e, t);
            }),
            (f.prototype.toArrayLike = function (e, t, r) {
              var n = this.byteLength(),
                f = r || Math.max(1, n);
              i(n <= f, "byte array longer than desired length"),
                i(f > 0, "Requested array length <= 0"),
                this.strip();
              var a,
                o,
                s = "le" === t,
                d = new e(f),
                c = this.clone();
              if (s) {
                for (o = 0; !c.isZero(); o++)
                  (a = c.andln(255)), c.iushrn(8), (d[o] = a);
                for (; o < f; o++) d[o] = 0;
              } else {
                for (o = 0; o < f - n; o++) d[o] = 0;
                for (o = 0; !c.isZero(); o++)
                  (a = c.andln(255)), c.iushrn(8), (d[f - o - 1] = a);
              }
              return d;
            }),
            Math.clz32
              ? (f.prototype._countBits = function (e) {
                  return 32 - Math.clz32(e);
                })
              : (f.prototype._countBits = function (e) {
                  var t = e,
                    r = 0;
                  return (
                    t >= 4096 && ((r += 13), (t >>>= 13)),
                    t >= 64 && ((r += 7), (t >>>= 7)),
                    t >= 8 && ((r += 4), (t >>>= 4)),
                    t >= 2 && ((r += 2), (t >>>= 2)),
                    r + t
                  );
                }),
            (f.prototype._zeroBits = function (e) {
              if (0 === e) return 26;
              var t = e,
                r = 0;
              return (
                0 == (8191 & t) && ((r += 13), (t >>>= 13)),
                0 == (127 & t) && ((r += 7), (t >>>= 7)),
                0 == (15 & t) && ((r += 4), (t >>>= 4)),
                0 == (3 & t) && ((r += 2), (t >>>= 2)),
                0 == (1 & t) && r++,
                r
              );
            }),
            (f.prototype.bitLength = function () {
              var e = this.words[this.length - 1],
                t = this._countBits(e);
              return 26 * (this.length - 1) + t;
            }),
            (f.prototype.zeroBits = function () {
              if (this.isZero()) return 0;
              for (var e = 0, t = 0; t < this.length; t++) {
                var r = this._zeroBits(this.words[t]);
                if (((e += r), 26 !== r)) break;
              }
              return e;
            }),
            (f.prototype.byteLength = function () {
              return Math.ceil(this.bitLength() / 8);
            }),
            (f.prototype.toTwos = function (e) {
              return 0 !== this.negative
                ? this.abs().inotn(e).iaddn(1)
                : this.clone();
            }),
            (f.prototype.fromTwos = function (e) {
              return this.testn(e - 1)
                ? this.notn(e).iaddn(1).ineg()
                : this.clone();
            }),
            (f.prototype.isNeg = function () {
              return 0 !== this.negative;
            }),
            (f.prototype.neg = function () {
              return this.clone().ineg();
            }),
            (f.prototype.ineg = function () {
              return this.isZero() || (this.negative ^= 1), this;
            }),
            (f.prototype.iuor = function (e) {
              for (; this.length < e.length; ) this.words[this.length++] = 0;
              for (var t = 0; t < e.length; t++)
                this.words[t] = this.words[t] | e.words[t];
              return this.strip();
            }),
            (f.prototype.ior = function (e) {
              return i(0 == (this.negative | e.negative)), this.iuor(e);
            }),
            (f.prototype.or = function (e) {
              return this.length > e.length
                ? this.clone().ior(e)
                : e.clone().ior(this);
            }),
            (f.prototype.uor = function (e) {
              return this.length > e.length
                ? this.clone().iuor(e)
                : e.clone().iuor(this);
            }),
            (f.prototype.iuand = function (e) {
              var t;
              t = this.length > e.length ? e : this;
              for (var r = 0; r < t.length; r++)
                this.words[r] = this.words[r] & e.words[r];
              return (this.length = t.length), this.strip();
            }),
            (f.prototype.iand = function (e) {
              return i(0 == (this.negative | e.negative)), this.iuand(e);
            }),
            (f.prototype.and = function (e) {
              return this.length > e.length
                ? this.clone().iand(e)
                : e.clone().iand(this);
            }),
            (f.prototype.uand = function (e) {
              return this.length > e.length
                ? this.clone().iuand(e)
                : e.clone().iuand(this);
            }),
            (f.prototype.iuxor = function (e) {
              var t, r;
              this.length > e.length
                ? ((t = this), (r = e))
                : ((t = e), (r = this));
              for (var i = 0; i < r.length; i++)
                this.words[i] = t.words[i] ^ r.words[i];
              if (this !== t)
                for (; i < t.length; i++) this.words[i] = t.words[i];
              return (this.length = t.length), this.strip();
            }),
            (f.prototype.ixor = function (e) {
              return i(0 == (this.negative | e.negative)), this.iuxor(e);
            }),
            (f.prototype.xor = function (e) {
              return this.length > e.length
                ? this.clone().ixor(e)
                : e.clone().ixor(this);
            }),
            (f.prototype.uxor = function (e) {
              return this.length > e.length
                ? this.clone().iuxor(e)
                : e.clone().iuxor(this);
            }),
            (f.prototype.inotn = function (e) {
              i("number" == typeof e && e >= 0);
              var t = 0 | Math.ceil(e / 26),
                r = e % 26;
              this._expand(t), r > 0 && t--;
              for (var n = 0; n < t; n++)
                this.words[n] = 67108863 & ~this.words[n];
              return (
                r > 0 &&
                  (this.words[n] = ~this.words[n] & (67108863 >> (26 - r))),
                this.strip()
              );
            }),
            (f.prototype.notn = function (e) {
              return this.clone().inotn(e);
            }),
            (f.prototype.setn = function (e, t) {
              i("number" == typeof e && e >= 0);
              var r = (e / 26) | 0,
                n = e % 26;
              return (
                this._expand(r + 1),
                (this.words[r] = t
                  ? this.words[r] | (1 << n)
                  : this.words[r] & ~(1 << n)),
                this.strip()
              );
            }),
            (f.prototype.iadd = function (e) {
              var t, r, i;
              if (0 !== this.negative && 0 === e.negative)
                return (
                  (this.negative = 0),
                  (t = this.isub(e)),
                  (this.negative ^= 1),
                  this._normSign()
                );
              if (0 === this.negative && 0 !== e.negative)
                return (
                  (e.negative = 0),
                  (t = this.isub(e)),
                  (e.negative = 1),
                  t._normSign()
                );
              this.length > e.length
                ? ((r = this), (i = e))
                : ((r = e), (i = this));
              for (var n = 0, f = 0; f < i.length; f++)
                (t = (0 | r.words[f]) + (0 | i.words[f]) + n),
                  (this.words[f] = 67108863 & t),
                  (n = t >>> 26);
              for (; 0 !== n && f < r.length; f++)
                (t = (0 | r.words[f]) + n),
                  (this.words[f] = 67108863 & t),
                  (n = t >>> 26);
              if (((this.length = r.length), 0 !== n))
                (this.words[this.length] = n), this.length++;
              else if (r !== this)
                for (; f < r.length; f++) this.words[f] = r.words[f];
              return this;
            }),
            (f.prototype.add = function (e) {
              var t;
              return 0 !== e.negative && 0 === this.negative
                ? ((e.negative = 0), (t = this.sub(e)), (e.negative ^= 1), t)
                : 0 === e.negative && 0 !== this.negative
                ? ((this.negative = 0),
                  (t = e.sub(this)),
                  (this.negative = 1),
                  t)
                : this.length > e.length
                ? this.clone().iadd(e)
                : e.clone().iadd(this);
            }),
            (f.prototype.isub = function (e) {
              if (0 !== e.negative) {
                e.negative = 0;
                var t = this.iadd(e);
                return (e.negative = 1), t._normSign();
              }
              if (0 !== this.negative)
                return (
                  (this.negative = 0),
                  this.iadd(e),
                  (this.negative = 1),
                  this._normSign()
                );
              var r,
                i,
                n = this.cmp(e);
              if (0 === n)
                return (
                  (this.negative = 0),
                  (this.length = 1),
                  (this.words[0] = 0),
                  this
                );
              n > 0 ? ((r = this), (i = e)) : ((r = e), (i = this));
              for (var f = 0, a = 0; a < i.length; a++)
                (f = (t = (0 | r.words[a]) - (0 | i.words[a]) + f) >> 26),
                  (this.words[a] = 67108863 & t);
              for (; 0 !== f && a < r.length; a++)
                (f = (t = (0 | r.words[a]) + f) >> 26),
                  (this.words[a] = 67108863 & t);
              if (0 === f && a < r.length && r !== this)
                for (; a < r.length; a++) this.words[a] = r.words[a];
              return (
                (this.length = Math.max(this.length, a)),
                r !== this && (this.negative = 1),
                this.strip()
              );
            }),
            (f.prototype.sub = function (e) {
              return this.clone().isub(e);
            });
          var b = function (e, t, r) {
            var i,
              n,
              f,
              a = e.words,
              o = t.words,
              s = r.words,
              d = 0,
              c = 0 | a[0],
              h = 8191 & c,
              u = c >>> 13,
              l = 0 | a[1],
              b = 8191 & l,
              p = l >>> 13,
              y = 0 | a[2],
              m = 8191 & y,
              g = y >>> 13,
              v = 0 | a[3],
              w = 8191 & v,
              M = v >>> 13,
              _ = 0 | a[4],
              S = 8191 & _,
              A = _ >>> 13,
              E = 0 | a[5],
              x = 8191 & E,
              R = E >>> 13,
              I = 0 | a[6],
              k = 8191 & I,
              B = I >>> 13,
              L = 0 | a[7],
              T = 8191 & L,
              P = L >>> 13,
              z = 0 | a[8],
              O = 8191 & z,
              N = z >>> 13,
              q = 0 | a[9],
              C = 8191 & q,
              j = q >>> 13,
              U = 0 | o[0],
              D = 8191 & U,
              F = U >>> 13,
              K = 0 | o[1],
              W = 8191 & K,
              H = K >>> 13,
              V = 0 | o[2],
              Z = 8191 & V,
              $ = V >>> 13,
              Y = 0 | o[3],
              J = 8191 & Y,
              X = Y >>> 13,
              G = 0 | o[4],
              Q = 8191 & G,
              ee = G >>> 13,
              te = 0 | o[5],
              re = 8191 & te,
              ie = te >>> 13,
              ne = 0 | o[6],
              fe = 8191 & ne,
              ae = ne >>> 13,
              oe = 0 | o[7],
              se = 8191 & oe,
              de = oe >>> 13,
              ce = 0 | o[8],
              he = 8191 & ce,
              ue = ce >>> 13,
              le = 0 | o[9],
              be = 8191 & le,
              pe = le >>> 13;
            (r.negative = e.negative ^ t.negative), (r.length = 19);
            var ye =
              (((d + (i = Math.imul(h, D))) | 0) +
                ((8191 & (n = ((n = Math.imul(h, F)) + Math.imul(u, D)) | 0)) <<
                  13)) |
              0;
            (d =
              ((((f = Math.imul(u, F)) + (n >>> 13)) | 0) + (ye >>> 26)) | 0),
              (ye &= 67108863),
              (i = Math.imul(b, D)),
              (n = ((n = Math.imul(b, F)) + Math.imul(p, D)) | 0),
              (f = Math.imul(p, F));
            var me =
              (((d + (i = (i + Math.imul(h, W)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(h, H)) | 0) + Math.imul(u, W)) | 0)) <<
                  13)) |
              0;
            (d =
              ((((f = (f + Math.imul(u, H)) | 0) + (n >>> 13)) | 0) +
                (me >>> 26)) |
              0),
              (me &= 67108863),
              (i = Math.imul(m, D)),
              (n = ((n = Math.imul(m, F)) + Math.imul(g, D)) | 0),
              (f = Math.imul(g, F)),
              (i = (i + Math.imul(b, W)) | 0),
              (n = ((n = (n + Math.imul(b, H)) | 0) + Math.imul(p, W)) | 0),
              (f = (f + Math.imul(p, H)) | 0);
            var ge =
              (((d + (i = (i + Math.imul(h, Z)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(h, $)) | 0) + Math.imul(u, Z)) | 0)) <<
                  13)) |
              0;
            (d =
              ((((f = (f + Math.imul(u, $)) | 0) + (n >>> 13)) | 0) +
                (ge >>> 26)) |
              0),
              (ge &= 67108863),
              (i = Math.imul(w, D)),
              (n = ((n = Math.imul(w, F)) + Math.imul(M, D)) | 0),
              (f = Math.imul(M, F)),
              (i = (i + Math.imul(m, W)) | 0),
              (n = ((n = (n + Math.imul(m, H)) | 0) + Math.imul(g, W)) | 0),
              (f = (f + Math.imul(g, H)) | 0),
              (i = (i + Math.imul(b, Z)) | 0),
              (n = ((n = (n + Math.imul(b, $)) | 0) + Math.imul(p, Z)) | 0),
              (f = (f + Math.imul(p, $)) | 0);
            var ve =
              (((d + (i = (i + Math.imul(h, J)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(h, X)) | 0) + Math.imul(u, J)) | 0)) <<
                  13)) |
              0;
            (d =
              ((((f = (f + Math.imul(u, X)) | 0) + (n >>> 13)) | 0) +
                (ve >>> 26)) |
              0),
              (ve &= 67108863),
              (i = Math.imul(S, D)),
              (n = ((n = Math.imul(S, F)) + Math.imul(A, D)) | 0),
              (f = Math.imul(A, F)),
              (i = (i + Math.imul(w, W)) | 0),
              (n = ((n = (n + Math.imul(w, H)) | 0) + Math.imul(M, W)) | 0),
              (f = (f + Math.imul(M, H)) | 0),
              (i = (i + Math.imul(m, Z)) | 0),
              (n = ((n = (n + Math.imul(m, $)) | 0) + Math.imul(g, Z)) | 0),
              (f = (f + Math.imul(g, $)) | 0),
              (i = (i + Math.imul(b, J)) | 0),
              (n = ((n = (n + Math.imul(b, X)) | 0) + Math.imul(p, J)) | 0),
              (f = (f + Math.imul(p, X)) | 0);
            var we =
              (((d + (i = (i + Math.imul(h, Q)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(h, ee)) | 0) + Math.imul(u, Q)) |
                    0)) <<
                  13)) |
              0;
            (d =
              ((((f = (f + Math.imul(u, ee)) | 0) + (n >>> 13)) | 0) +
                (we >>> 26)) |
              0),
              (we &= 67108863),
              (i = Math.imul(x, D)),
              (n = ((n = Math.imul(x, F)) + Math.imul(R, D)) | 0),
              (f = Math.imul(R, F)),
              (i = (i + Math.imul(S, W)) | 0),
              (n = ((n = (n + Math.imul(S, H)) | 0) + Math.imul(A, W)) | 0),
              (f = (f + Math.imul(A, H)) | 0),
              (i = (i + Math.imul(w, Z)) | 0),
              (n = ((n = (n + Math.imul(w, $)) | 0) + Math.imul(M, Z)) | 0),
              (f = (f + Math.imul(M, $)) | 0),
              (i = (i + Math.imul(m, J)) | 0),
              (n = ((n = (n + Math.imul(m, X)) | 0) + Math.imul(g, J)) | 0),
              (f = (f + Math.imul(g, X)) | 0),
              (i = (i + Math.imul(b, Q)) | 0),
              (n = ((n = (n + Math.imul(b, ee)) | 0) + Math.imul(p, Q)) | 0),
              (f = (f + Math.imul(p, ee)) | 0);
            var Me =
              (((d + (i = (i + Math.imul(h, re)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(h, ie)) | 0) + Math.imul(u, re)) |
                    0)) <<
                  13)) |
              0;
            (d =
              ((((f = (f + Math.imul(u, ie)) | 0) + (n >>> 13)) | 0) +
                (Me >>> 26)) |
              0),
              (Me &= 67108863),
              (i = Math.imul(k, D)),
              (n = ((n = Math.imul(k, F)) + Math.imul(B, D)) | 0),
              (f = Math.imul(B, F)),
              (i = (i + Math.imul(x, W)) | 0),
              (n = ((n = (n + Math.imul(x, H)) | 0) + Math.imul(R, W)) | 0),
              (f = (f + Math.imul(R, H)) | 0),
              (i = (i + Math.imul(S, Z)) | 0),
              (n = ((n = (n + Math.imul(S, $)) | 0) + Math.imul(A, Z)) | 0),
              (f = (f + Math.imul(A, $)) | 0),
              (i = (i + Math.imul(w, J)) | 0),
              (n = ((n = (n + Math.imul(w, X)) | 0) + Math.imul(M, J)) | 0),
              (f = (f + Math.imul(M, X)) | 0),
              (i = (i + Math.imul(m, Q)) | 0),
              (n = ((n = (n + Math.imul(m, ee)) | 0) + Math.imul(g, Q)) | 0),
              (f = (f + Math.imul(g, ee)) | 0),
              (i = (i + Math.imul(b, re)) | 0),
              (n = ((n = (n + Math.imul(b, ie)) | 0) + Math.imul(p, re)) | 0),
              (f = (f + Math.imul(p, ie)) | 0);
            var _e =
              (((d + (i = (i + Math.imul(h, fe)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(h, ae)) | 0) + Math.imul(u, fe)) |
                    0)) <<
                  13)) |
              0;
            (d =
              ((((f = (f + Math.imul(u, ae)) | 0) + (n >>> 13)) | 0) +
                (_e >>> 26)) |
              0),
              (_e &= 67108863),
              (i = Math.imul(T, D)),
              (n = ((n = Math.imul(T, F)) + Math.imul(P, D)) | 0),
              (f = Math.imul(P, F)),
              (i = (i + Math.imul(k, W)) | 0),
              (n = ((n = (n + Math.imul(k, H)) | 0) + Math.imul(B, W)) | 0),
              (f = (f + Math.imul(B, H)) | 0),
              (i = (i + Math.imul(x, Z)) | 0),
              (n = ((n = (n + Math.imul(x, $)) | 0) + Math.imul(R, Z)) | 0),
              (f = (f + Math.imul(R, $)) | 0),
              (i = (i + Math.imul(S, J)) | 0),
              (n = ((n = (n + Math.imul(S, X)) | 0) + Math.imul(A, J)) | 0),
              (f = (f + Math.imul(A, X)) | 0),
              (i = (i + Math.imul(w, Q)) | 0),
              (n = ((n = (n + Math.imul(w, ee)) | 0) + Math.imul(M, Q)) | 0),
              (f = (f + Math.imul(M, ee)) | 0),
              (i = (i + Math.imul(m, re)) | 0),
              (n = ((n = (n + Math.imul(m, ie)) | 0) + Math.imul(g, re)) | 0),
              (f = (f + Math.imul(g, ie)) | 0),
              (i = (i + Math.imul(b, fe)) | 0),
              (n = ((n = (n + Math.imul(b, ae)) | 0) + Math.imul(p, fe)) | 0),
              (f = (f + Math.imul(p, ae)) | 0);
            var Se =
              (((d + (i = (i + Math.imul(h, se)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(h, de)) | 0) + Math.imul(u, se)) |
                    0)) <<
                  13)) |
              0;
            (d =
              ((((f = (f + Math.imul(u, de)) | 0) + (n >>> 13)) | 0) +
                (Se >>> 26)) |
              0),
              (Se &= 67108863),
              (i = Math.imul(O, D)),
              (n = ((n = Math.imul(O, F)) + Math.imul(N, D)) | 0),
              (f = Math.imul(N, F)),
              (i = (i + Math.imul(T, W)) | 0),
              (n = ((n = (n + Math.imul(T, H)) | 0) + Math.imul(P, W)) | 0),
              (f = (f + Math.imul(P, H)) | 0),
              (i = (i + Math.imul(k, Z)) | 0),
              (n = ((n = (n + Math.imul(k, $)) | 0) + Math.imul(B, Z)) | 0),
              (f = (f + Math.imul(B, $)) | 0),
              (i = (i + Math.imul(x, J)) | 0),
              (n = ((n = (n + Math.imul(x, X)) | 0) + Math.imul(R, J)) | 0),
              (f = (f + Math.imul(R, X)) | 0),
              (i = (i + Math.imul(S, Q)) | 0),
              (n = ((n = (n + Math.imul(S, ee)) | 0) + Math.imul(A, Q)) | 0),
              (f = (f + Math.imul(A, ee)) | 0),
              (i = (i + Math.imul(w, re)) | 0),
              (n = ((n = (n + Math.imul(w, ie)) | 0) + Math.imul(M, re)) | 0),
              (f = (f + Math.imul(M, ie)) | 0),
              (i = (i + Math.imul(m, fe)) | 0),
              (n = ((n = (n + Math.imul(m, ae)) | 0) + Math.imul(g, fe)) | 0),
              (f = (f + Math.imul(g, ae)) | 0),
              (i = (i + Math.imul(b, se)) | 0),
              (n = ((n = (n + Math.imul(b, de)) | 0) + Math.imul(p, se)) | 0),
              (f = (f + Math.imul(p, de)) | 0);
            var Ae =
              (((d + (i = (i + Math.imul(h, he)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(h, ue)) | 0) + Math.imul(u, he)) |
                    0)) <<
                  13)) |
              0;
            (d =
              ((((f = (f + Math.imul(u, ue)) | 0) + (n >>> 13)) | 0) +
                (Ae >>> 26)) |
              0),
              (Ae &= 67108863),
              (i = Math.imul(C, D)),
              (n = ((n = Math.imul(C, F)) + Math.imul(j, D)) | 0),
              (f = Math.imul(j, F)),
              (i = (i + Math.imul(O, W)) | 0),
              (n = ((n = (n + Math.imul(O, H)) | 0) + Math.imul(N, W)) | 0),
              (f = (f + Math.imul(N, H)) | 0),
              (i = (i + Math.imul(T, Z)) | 0),
              (n = ((n = (n + Math.imul(T, $)) | 0) + Math.imul(P, Z)) | 0),
              (f = (f + Math.imul(P, $)) | 0),
              (i = (i + Math.imul(k, J)) | 0),
              (n = ((n = (n + Math.imul(k, X)) | 0) + Math.imul(B, J)) | 0),
              (f = (f + Math.imul(B, X)) | 0),
              (i = (i + Math.imul(x, Q)) | 0),
              (n = ((n = (n + Math.imul(x, ee)) | 0) + Math.imul(R, Q)) | 0),
              (f = (f + Math.imul(R, ee)) | 0),
              (i = (i + Math.imul(S, re)) | 0),
              (n = ((n = (n + Math.imul(S, ie)) | 0) + Math.imul(A, re)) | 0),
              (f = (f + Math.imul(A, ie)) | 0),
              (i = (i + Math.imul(w, fe)) | 0),
              (n = ((n = (n + Math.imul(w, ae)) | 0) + Math.imul(M, fe)) | 0),
              (f = (f + Math.imul(M, ae)) | 0),
              (i = (i + Math.imul(m, se)) | 0),
              (n = ((n = (n + Math.imul(m, de)) | 0) + Math.imul(g, se)) | 0),
              (f = (f + Math.imul(g, de)) | 0),
              (i = (i + Math.imul(b, he)) | 0),
              (n = ((n = (n + Math.imul(b, ue)) | 0) + Math.imul(p, he)) | 0),
              (f = (f + Math.imul(p, ue)) | 0);
            var Ee =
              (((d + (i = (i + Math.imul(h, be)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(h, pe)) | 0) + Math.imul(u, be)) |
                    0)) <<
                  13)) |
              0;
            (d =
              ((((f = (f + Math.imul(u, pe)) | 0) + (n >>> 13)) | 0) +
                (Ee >>> 26)) |
              0),
              (Ee &= 67108863),
              (i = Math.imul(C, W)),
              (n = ((n = Math.imul(C, H)) + Math.imul(j, W)) | 0),
              (f = Math.imul(j, H)),
              (i = (i + Math.imul(O, Z)) | 0),
              (n = ((n = (n + Math.imul(O, $)) | 0) + Math.imul(N, Z)) | 0),
              (f = (f + Math.imul(N, $)) | 0),
              (i = (i + Math.imul(T, J)) | 0),
              (n = ((n = (n + Math.imul(T, X)) | 0) + Math.imul(P, J)) | 0),
              (f = (f + Math.imul(P, X)) | 0),
              (i = (i + Math.imul(k, Q)) | 0),
              (n = ((n = (n + Math.imul(k, ee)) | 0) + Math.imul(B, Q)) | 0),
              (f = (f + Math.imul(B, ee)) | 0),
              (i = (i + Math.imul(x, re)) | 0),
              (n = ((n = (n + Math.imul(x, ie)) | 0) + Math.imul(R, re)) | 0),
              (f = (f + Math.imul(R, ie)) | 0),
              (i = (i + Math.imul(S, fe)) | 0),
              (n = ((n = (n + Math.imul(S, ae)) | 0) + Math.imul(A, fe)) | 0),
              (f = (f + Math.imul(A, ae)) | 0),
              (i = (i + Math.imul(w, se)) | 0),
              (n = ((n = (n + Math.imul(w, de)) | 0) + Math.imul(M, se)) | 0),
              (f = (f + Math.imul(M, de)) | 0),
              (i = (i + Math.imul(m, he)) | 0),
              (n = ((n = (n + Math.imul(m, ue)) | 0) + Math.imul(g, he)) | 0),
              (f = (f + Math.imul(g, ue)) | 0);
            var xe =
              (((d + (i = (i + Math.imul(b, be)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(b, pe)) | 0) + Math.imul(p, be)) |
                    0)) <<
                  13)) |
              0;
            (d =
              ((((f = (f + Math.imul(p, pe)) | 0) + (n >>> 13)) | 0) +
                (xe >>> 26)) |
              0),
              (xe &= 67108863),
              (i = Math.imul(C, Z)),
              (n = ((n = Math.imul(C, $)) + Math.imul(j, Z)) | 0),
              (f = Math.imul(j, $)),
              (i = (i + Math.imul(O, J)) | 0),
              (n = ((n = (n + Math.imul(O, X)) | 0) + Math.imul(N, J)) | 0),
              (f = (f + Math.imul(N, X)) | 0),
              (i = (i + Math.imul(T, Q)) | 0),
              (n = ((n = (n + Math.imul(T, ee)) | 0) + Math.imul(P, Q)) | 0),
              (f = (f + Math.imul(P, ee)) | 0),
              (i = (i + Math.imul(k, re)) | 0),
              (n = ((n = (n + Math.imul(k, ie)) | 0) + Math.imul(B, re)) | 0),
              (f = (f + Math.imul(B, ie)) | 0),
              (i = (i + Math.imul(x, fe)) | 0),
              (n = ((n = (n + Math.imul(x, ae)) | 0) + Math.imul(R, fe)) | 0),
              (f = (f + Math.imul(R, ae)) | 0),
              (i = (i + Math.imul(S, se)) | 0),
              (n = ((n = (n + Math.imul(S, de)) | 0) + Math.imul(A, se)) | 0),
              (f = (f + Math.imul(A, de)) | 0),
              (i = (i + Math.imul(w, he)) | 0),
              (n = ((n = (n + Math.imul(w, ue)) | 0) + Math.imul(M, he)) | 0),
              (f = (f + Math.imul(M, ue)) | 0);
            var Re =
              (((d + (i = (i + Math.imul(m, be)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(m, pe)) | 0) + Math.imul(g, be)) |
                    0)) <<
                  13)) |
              0;
            (d =
              ((((f = (f + Math.imul(g, pe)) | 0) + (n >>> 13)) | 0) +
                (Re >>> 26)) |
              0),
              (Re &= 67108863),
              (i = Math.imul(C, J)),
              (n = ((n = Math.imul(C, X)) + Math.imul(j, J)) | 0),
              (f = Math.imul(j, X)),
              (i = (i + Math.imul(O, Q)) | 0),
              (n = ((n = (n + Math.imul(O, ee)) | 0) + Math.imul(N, Q)) | 0),
              (f = (f + Math.imul(N, ee)) | 0),
              (i = (i + Math.imul(T, re)) | 0),
              (n = ((n = (n + Math.imul(T, ie)) | 0) + Math.imul(P, re)) | 0),
              (f = (f + Math.imul(P, ie)) | 0),
              (i = (i + Math.imul(k, fe)) | 0),
              (n = ((n = (n + Math.imul(k, ae)) | 0) + Math.imul(B, fe)) | 0),
              (f = (f + Math.imul(B, ae)) | 0),
              (i = (i + Math.imul(x, se)) | 0),
              (n = ((n = (n + Math.imul(x, de)) | 0) + Math.imul(R, se)) | 0),
              (f = (f + Math.imul(R, de)) | 0),
              (i = (i + Math.imul(S, he)) | 0),
              (n = ((n = (n + Math.imul(S, ue)) | 0) + Math.imul(A, he)) | 0),
              (f = (f + Math.imul(A, ue)) | 0);
            var Ie =
              (((d + (i = (i + Math.imul(w, be)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(w, pe)) | 0) + Math.imul(M, be)) |
                    0)) <<
                  13)) |
              0;
            (d =
              ((((f = (f + Math.imul(M, pe)) | 0) + (n >>> 13)) | 0) +
                (Ie >>> 26)) |
              0),
              (Ie &= 67108863),
              (i = Math.imul(C, Q)),
              (n = ((n = Math.imul(C, ee)) + Math.imul(j, Q)) | 0),
              (f = Math.imul(j, ee)),
              (i = (i + Math.imul(O, re)) | 0),
              (n = ((n = (n + Math.imul(O, ie)) | 0) + Math.imul(N, re)) | 0),
              (f = (f + Math.imul(N, ie)) | 0),
              (i = (i + Math.imul(T, fe)) | 0),
              (n = ((n = (n + Math.imul(T, ae)) | 0) + Math.imul(P, fe)) | 0),
              (f = (f + Math.imul(P, ae)) | 0),
              (i = (i + Math.imul(k, se)) | 0),
              (n = ((n = (n + Math.imul(k, de)) | 0) + Math.imul(B, se)) | 0),
              (f = (f + Math.imul(B, de)) | 0),
              (i = (i + Math.imul(x, he)) | 0),
              (n = ((n = (n + Math.imul(x, ue)) | 0) + Math.imul(R, he)) | 0),
              (f = (f + Math.imul(R, ue)) | 0);
            var ke =
              (((d + (i = (i + Math.imul(S, be)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(S, pe)) | 0) + Math.imul(A, be)) |
                    0)) <<
                  13)) |
              0;
            (d =
              ((((f = (f + Math.imul(A, pe)) | 0) + (n >>> 13)) | 0) +
                (ke >>> 26)) |
              0),
              (ke &= 67108863),
              (i = Math.imul(C, re)),
              (n = ((n = Math.imul(C, ie)) + Math.imul(j, re)) | 0),
              (f = Math.imul(j, ie)),
              (i = (i + Math.imul(O, fe)) | 0),
              (n = ((n = (n + Math.imul(O, ae)) | 0) + Math.imul(N, fe)) | 0),
              (f = (f + Math.imul(N, ae)) | 0),
              (i = (i + Math.imul(T, se)) | 0),
              (n = ((n = (n + Math.imul(T, de)) | 0) + Math.imul(P, se)) | 0),
              (f = (f + Math.imul(P, de)) | 0),
              (i = (i + Math.imul(k, he)) | 0),
              (n = ((n = (n + Math.imul(k, ue)) | 0) + Math.imul(B, he)) | 0),
              (f = (f + Math.imul(B, ue)) | 0);
            var Be =
              (((d + (i = (i + Math.imul(x, be)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(x, pe)) | 0) + Math.imul(R, be)) |
                    0)) <<
                  13)) |
              0;
            (d =
              ((((f = (f + Math.imul(R, pe)) | 0) + (n >>> 13)) | 0) +
                (Be >>> 26)) |
              0),
              (Be &= 67108863),
              (i = Math.imul(C, fe)),
              (n = ((n = Math.imul(C, ae)) + Math.imul(j, fe)) | 0),
              (f = Math.imul(j, ae)),
              (i = (i + Math.imul(O, se)) | 0),
              (n = ((n = (n + Math.imul(O, de)) | 0) + Math.imul(N, se)) | 0),
              (f = (f + Math.imul(N, de)) | 0),
              (i = (i + Math.imul(T, he)) | 0),
              (n = ((n = (n + Math.imul(T, ue)) | 0) + Math.imul(P, he)) | 0),
              (f = (f + Math.imul(P, ue)) | 0);
            var Le =
              (((d + (i = (i + Math.imul(k, be)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(k, pe)) | 0) + Math.imul(B, be)) |
                    0)) <<
                  13)) |
              0;
            (d =
              ((((f = (f + Math.imul(B, pe)) | 0) + (n >>> 13)) | 0) +
                (Le >>> 26)) |
              0),
              (Le &= 67108863),
              (i = Math.imul(C, se)),
              (n = ((n = Math.imul(C, de)) + Math.imul(j, se)) | 0),
              (f = Math.imul(j, de)),
              (i = (i + Math.imul(O, he)) | 0),
              (n = ((n = (n + Math.imul(O, ue)) | 0) + Math.imul(N, he)) | 0),
              (f = (f + Math.imul(N, ue)) | 0);
            var Te =
              (((d + (i = (i + Math.imul(T, be)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(T, pe)) | 0) + Math.imul(P, be)) |
                    0)) <<
                  13)) |
              0;
            (d =
              ((((f = (f + Math.imul(P, pe)) | 0) + (n >>> 13)) | 0) +
                (Te >>> 26)) |
              0),
              (Te &= 67108863),
              (i = Math.imul(C, he)),
              (n = ((n = Math.imul(C, ue)) + Math.imul(j, he)) | 0),
              (f = Math.imul(j, ue));
            var Pe =
              (((d + (i = (i + Math.imul(O, be)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(O, pe)) | 0) + Math.imul(N, be)) |
                    0)) <<
                  13)) |
              0;
            (d =
              ((((f = (f + Math.imul(N, pe)) | 0) + (n >>> 13)) | 0) +
                (Pe >>> 26)) |
              0),
              (Pe &= 67108863);
            var ze =
              (((d + (i = Math.imul(C, be))) | 0) +
                ((8191 &
                  (n = ((n = Math.imul(C, pe)) + Math.imul(j, be)) | 0)) <<
                  13)) |
              0;
            return (
              (d =
                ((((f = Math.imul(j, pe)) + (n >>> 13)) | 0) + (ze >>> 26)) |
                0),
              (ze &= 67108863),
              (s[0] = ye),
              (s[1] = me),
              (s[2] = ge),
              (s[3] = ve),
              (s[4] = we),
              (s[5] = Me),
              (s[6] = _e),
              (s[7] = Se),
              (s[8] = Ae),
              (s[9] = Ee),
              (s[10] = xe),
              (s[11] = Re),
              (s[12] = Ie),
              (s[13] = ke),
              (s[14] = Be),
              (s[15] = Le),
              (s[16] = Te),
              (s[17] = Pe),
              (s[18] = ze),
              0 !== d && ((s[19] = d), r.length++),
              r
            );
          };
          function p(e, t, r) {
            return new y().mulp(e, t, r);
          }
          function y(e, t) {
            (this.x = e), (this.y = t);
          }
          Math.imul || (b = l),
            (f.prototype.mulTo = function (e, t) {
              var r,
                i = this.length + e.length;
              return (
                (r =
                  10 === this.length && 10 === e.length
                    ? b(this, e, t)
                    : i < 63
                    ? l(this, e, t)
                    : i < 1024
                    ? (function (e, t, r) {
                        (r.negative = t.negative ^ e.negative),
                          (r.length = e.length + t.length);
                        for (var i = 0, n = 0, f = 0; f < r.length - 1; f++) {
                          var a = n;
                          n = 0;
                          for (
                            var o = 67108863 & i,
                              s = Math.min(f, t.length - 1),
                              d = Math.max(0, f - e.length + 1);
                            d <= s;
                            d++
                          ) {
                            var c = f - d,
                              h = (0 | e.words[c]) * (0 | t.words[d]),
                              u = 67108863 & h;
                            (o = 67108863 & (u = (u + o) | 0)),
                              (n +=
                                (a =
                                  ((a = (a + ((h / 67108864) | 0)) | 0) +
                                    (u >>> 26)) |
                                  0) >>> 26),
                              (a &= 67108863);
                          }
                          (r.words[f] = o), (i = a), (a = n);
                        }
                        return (
                          0 !== i ? (r.words[f] = i) : r.length--, r.strip()
                        );
                      })(this, e, t)
                    : p(this, e, t)),
                r
              );
            }),
            (y.prototype.makeRBT = function (e) {
              for (
                var t = new Array(e), r = f.prototype._countBits(e) - 1, i = 0;
                i < e;
                i++
              )
                t[i] = this.revBin(i, r, e);
              return t;
            }),
            (y.prototype.revBin = function (e, t, r) {
              if (0 === e || e === r - 1) return e;
              for (var i = 0, n = 0; n < t; n++)
                (i |= (1 & e) << (t - n - 1)), (e >>= 1);
              return i;
            }),
            (y.prototype.permute = function (e, t, r, i, n, f) {
              for (var a = 0; a < f; a++) (i[a] = t[e[a]]), (n[a] = r[e[a]]);
            }),
            (y.prototype.transform = function (e, t, r, i, n, f) {
              this.permute(f, e, t, r, i, n);
              for (var a = 1; a < n; a <<= 1)
                for (
                  var o = a << 1,
                    s = Math.cos((2 * Math.PI) / o),
                    d = Math.sin((2 * Math.PI) / o),
                    c = 0;
                  c < n;
                  c += o
                )
                  for (var h = s, u = d, l = 0; l < a; l++) {
                    var b = r[c + l],
                      p = i[c + l],
                      y = r[c + l + a],
                      m = i[c + l + a],
                      g = h * y - u * m;
                    (m = h * m + u * y),
                      (y = g),
                      (r[c + l] = b + y),
                      (i[c + l] = p + m),
                      (r[c + l + a] = b - y),
                      (i[c + l + a] = p - m),
                      l !== o &&
                        ((g = s * h - d * u), (u = s * u + d * h), (h = g));
                  }
            }),
            (y.prototype.guessLen13b = function (e, t) {
              var r = 1 | Math.max(t, e),
                i = 1 & r,
                n = 0;
              for (r = (r / 2) | 0; r; r >>>= 1) n++;
              return 1 << (n + 1 + i);
            }),
            (y.prototype.conjugate = function (e, t, r) {
              if (!(r <= 1))
                for (var i = 0; i < r / 2; i++) {
                  var n = e[i];
                  (e[i] = e[r - i - 1]),
                    (e[r - i - 1] = n),
                    (n = t[i]),
                    (t[i] = -t[r - i - 1]),
                    (t[r - i - 1] = -n);
                }
            }),
            (y.prototype.normalize13b = function (e, t) {
              for (var r = 0, i = 0; i < t / 2; i++) {
                var n =
                  8192 * Math.round(e[2 * i + 1] / t) +
                  Math.round(e[2 * i] / t) +
                  r;
                (e[i] = 67108863 & n),
                  (r = n < 67108864 ? 0 : (n / 67108864) | 0);
              }
              return e;
            }),
            (y.prototype.convert13b = function (e, t, r, n) {
              for (var f = 0, a = 0; a < t; a++)
                (f += 0 | e[a]),
                  (r[2 * a] = 8191 & f),
                  (f >>>= 13),
                  (r[2 * a + 1] = 8191 & f),
                  (f >>>= 13);
              for (a = 2 * t; a < n; ++a) r[a] = 0;
              i(0 === f), i(0 == (-8192 & f));
            }),
            (y.prototype.stub = function (e) {
              for (var t = new Array(e), r = 0; r < e; r++) t[r] = 0;
              return t;
            }),
            (y.prototype.mulp = function (e, t, r) {
              var i = 2 * this.guessLen13b(e.length, t.length),
                n = this.makeRBT(i),
                f = this.stub(i),
                a = new Array(i),
                o = new Array(i),
                s = new Array(i),
                d = new Array(i),
                c = new Array(i),
                h = new Array(i),
                u = r.words;
              (u.length = i),
                this.convert13b(e.words, e.length, a, i),
                this.convert13b(t.words, t.length, d, i),
                this.transform(a, f, o, s, i, n),
                this.transform(d, f, c, h, i, n);
              for (var l = 0; l < i; l++) {
                var b = o[l] * c[l] - s[l] * h[l];
                (s[l] = o[l] * h[l] + s[l] * c[l]), (o[l] = b);
              }
              return (
                this.conjugate(o, s, i),
                this.transform(o, s, u, f, i, n),
                this.conjugate(u, f, i),
                this.normalize13b(u, i),
                (r.negative = e.negative ^ t.negative),
                (r.length = e.length + t.length),
                r.strip()
              );
            }),
            (f.prototype.mul = function (e) {
              var t = new f(null);
              return (
                (t.words = new Array(this.length + e.length)), this.mulTo(e, t)
              );
            }),
            (f.prototype.mulf = function (e) {
              var t = new f(null);
              return (
                (t.words = new Array(this.length + e.length)), p(this, e, t)
              );
            }),
            (f.prototype.imul = function (e) {
              return this.clone().mulTo(e, this);
            }),
            (f.prototype.imuln = function (e) {
              i("number" == typeof e), i(e < 67108864);
              for (var t = 0, r = 0; r < this.length; r++) {
                var n = (0 | this.words[r]) * e,
                  f = (67108863 & n) + (67108863 & t);
                (t >>= 26),
                  (t += (n / 67108864) | 0),
                  (t += f >>> 26),
                  (this.words[r] = 67108863 & f);
              }
              return 0 !== t && ((this.words[r] = t), this.length++), this;
            }),
            (f.prototype.muln = function (e) {
              return this.clone().imuln(e);
            }),
            (f.prototype.sqr = function () {
              return this.mul(this);
            }),
            (f.prototype.isqr = function () {
              return this.imul(this.clone());
            }),
            (f.prototype.pow = function (e) {
              var t = (function (e) {
                for (
                  var t = new Array(e.bitLength()), r = 0;
                  r < t.length;
                  r++
                ) {
                  var i = (r / 26) | 0,
                    n = r % 26;
                  t[r] = (e.words[i] & (1 << n)) >>> n;
                }
                return t;
              })(e);
              if (0 === t.length) return new f(1);
              for (
                var r = this, i = 0;
                i < t.length && 0 === t[i];
                i++, r = r.sqr()
              );
              if (++i < t.length)
                for (var n = r.sqr(); i < t.length; i++, n = n.sqr())
                  0 !== t[i] && (r = r.mul(n));
              return r;
            }),
            (f.prototype.iushln = function (e) {
              i("number" == typeof e && e >= 0);
              var t,
                r = e % 26,
                n = (e - r) / 26,
                f = (67108863 >>> (26 - r)) << (26 - r);
              if (0 !== r) {
                var a = 0;
                for (t = 0; t < this.length; t++) {
                  var o = this.words[t] & f,
                    s = ((0 | this.words[t]) - o) << r;
                  (this.words[t] = s | a), (a = o >>> (26 - r));
                }
                a && ((this.words[t] = a), this.length++);
              }
              if (0 !== n) {
                for (t = this.length - 1; t >= 0; t--)
                  this.words[t + n] = this.words[t];
                for (t = 0; t < n; t++) this.words[t] = 0;
                this.length += n;
              }
              return this.strip();
            }),
            (f.prototype.ishln = function (e) {
              return i(0 === this.negative), this.iushln(e);
            }),
            (f.prototype.iushrn = function (e, t, r) {
              var n;
              i("number" == typeof e && e >= 0),
                (n = t ? (t - (t % 26)) / 26 : 0);
              var f = e % 26,
                a = Math.min((e - f) / 26, this.length),
                o = 67108863 ^ ((67108863 >>> f) << f),
                s = r;
              if (((n -= a), (n = Math.max(0, n)), s)) {
                for (var d = 0; d < a; d++) s.words[d] = this.words[d];
                s.length = a;
              }
              if (0 === a);
              else if (this.length > a)
                for (this.length -= a, d = 0; d < this.length; d++)
                  this.words[d] = this.words[d + a];
              else (this.words[0] = 0), (this.length = 1);
              var c = 0;
              for (d = this.length - 1; d >= 0 && (0 !== c || d >= n); d--) {
                var h = 0 | this.words[d];
                (this.words[d] = (c << (26 - f)) | (h >>> f)), (c = h & o);
              }
              return (
                s && 0 !== c && (s.words[s.length++] = c),
                0 === this.length && ((this.words[0] = 0), (this.length = 1)),
                this.strip()
              );
            }),
            (f.prototype.ishrn = function (e, t, r) {
              return i(0 === this.negative), this.iushrn(e, t, r);
            }),
            (f.prototype.shln = function (e) {
              return this.clone().ishln(e);
            }),
            (f.prototype.ushln = function (e) {
              return this.clone().iushln(e);
            }),
            (f.prototype.shrn = function (e) {
              return this.clone().ishrn(e);
            }),
            (f.prototype.ushrn = function (e) {
              return this.clone().iushrn(e);
            }),
            (f.prototype.testn = function (e) {
              i("number" == typeof e && e >= 0);
              var t = e % 26,
                r = (e - t) / 26,
                n = 1 << t;
              return !(this.length <= r || !(this.words[r] & n));
            }),
            (f.prototype.imaskn = function (e) {
              i("number" == typeof e && e >= 0);
              var t = e % 26,
                r = (e - t) / 26;
              if (
                (i(
                  0 === this.negative,
                  "imaskn works only with positive numbers"
                ),
                this.length <= r)
              )
                return this;
              if (
                (0 !== t && r++,
                (this.length = Math.min(r, this.length)),
                0 !== t)
              ) {
                var n = 67108863 ^ ((67108863 >>> t) << t);
                this.words[this.length - 1] &= n;
              }
              return this.strip();
            }),
            (f.prototype.maskn = function (e) {
              return this.clone().imaskn(e);
            }),
            (f.prototype.iaddn = function (e) {
              return (
                i("number" == typeof e),
                i(e < 67108864),
                e < 0
                  ? this.isubn(-e)
                  : 0 !== this.negative
                  ? 1 === this.length && (0 | this.words[0]) < e
                    ? ((this.words[0] = e - (0 | this.words[0])),
                      (this.negative = 0),
                      this)
                    : ((this.negative = 0),
                      this.isubn(e),
                      (this.negative = 1),
                      this)
                  : this._iaddn(e)
              );
            }),
            (f.prototype._iaddn = function (e) {
              this.words[0] += e;
              for (var t = 0; t < this.length && this.words[t] >= 67108864; t++)
                (this.words[t] -= 67108864),
                  t === this.length - 1
                    ? (this.words[t + 1] = 1)
                    : this.words[t + 1]++;
              return (this.length = Math.max(this.length, t + 1)), this;
            }),
            (f.prototype.isubn = function (e) {
              if ((i("number" == typeof e), i(e < 67108864), e < 0))
                return this.iaddn(-e);
              if (0 !== this.negative)
                return (
                  (this.negative = 0), this.iaddn(e), (this.negative = 1), this
                );
              if (
                ((this.words[0] -= e), 1 === this.length && this.words[0] < 0)
              )
                (this.words[0] = -this.words[0]), (this.negative = 1);
              else
                for (var t = 0; t < this.length && this.words[t] < 0; t++)
                  (this.words[t] += 67108864), (this.words[t + 1] -= 1);
              return this.strip();
            }),
            (f.prototype.addn = function (e) {
              return this.clone().iaddn(e);
            }),
            (f.prototype.subn = function (e) {
              return this.clone().isubn(e);
            }),
            (f.prototype.iabs = function () {
              return (this.negative = 0), this;
            }),
            (f.prototype.abs = function () {
              return this.clone().iabs();
            }),
            (f.prototype._ishlnsubmul = function (e, t, r) {
              var n,
                f,
                a = e.length + r;
              this._expand(a);
              var o = 0;
              for (n = 0; n < e.length; n++) {
                f = (0 | this.words[n + r]) + o;
                var s = (0 | e.words[n]) * t;
                (o = ((f -= 67108863 & s) >> 26) - ((s / 67108864) | 0)),
                  (this.words[n + r] = 67108863 & f);
              }
              for (; n < this.length - r; n++)
                (o = (f = (0 | this.words[n + r]) + o) >> 26),
                  (this.words[n + r] = 67108863 & f);
              if (0 === o) return this.strip();
              for (i(-1 === o), o = 0, n = 0; n < this.length; n++)
                (o = (f = -(0 | this.words[n]) + o) >> 26),
                  (this.words[n] = 67108863 & f);
              return (this.negative = 1), this.strip();
            }),
            (f.prototype._wordDiv = function (e, t) {
              var r = (this.length, e.length),
                i = this.clone(),
                n = e,
                a = 0 | n.words[n.length - 1];
              0 != (r = 26 - this._countBits(a)) &&
                ((n = n.ushln(r)),
                i.iushln(r),
                (a = 0 | n.words[n.length - 1]));
              var o,
                s = i.length - n.length;
              if ("mod" !== t) {
                ((o = new f(null)).length = s + 1),
                  (o.words = new Array(o.length));
                for (var d = 0; d < o.length; d++) o.words[d] = 0;
              }
              var c = i.clone()._ishlnsubmul(n, 1, s);
              0 === c.negative && ((i = c), o && (o.words[s] = 1));
              for (var h = s - 1; h >= 0; h--) {
                var u =
                  67108864 * (0 | i.words[n.length + h]) +
                  (0 | i.words[n.length + h - 1]);
                for (
                  u = Math.min((u / a) | 0, 67108863), i._ishlnsubmul(n, u, h);
                  0 !== i.negative;

                )
                  u--,
                    (i.negative = 0),
                    i._ishlnsubmul(n, 1, h),
                    i.isZero() || (i.negative ^= 1);
                o && (o.words[h] = u);
              }
              return (
                o && o.strip(),
                i.strip(),
                "div" !== t && 0 !== r && i.iushrn(r),
                { div: o || null, mod: i }
              );
            }),
            (f.prototype.divmod = function (e, t, r) {
              return (
                i(!e.isZero()),
                this.isZero()
                  ? { div: new f(0), mod: new f(0) }
                  : 0 !== this.negative && 0 === e.negative
                  ? ((o = this.neg().divmod(e, t)),
                    "mod" !== t && (n = o.div.neg()),
                    "div" !== t &&
                      ((a = o.mod.neg()), r && 0 !== a.negative && a.iadd(e)),
                    { div: n, mod: a })
                  : 0 === this.negative && 0 !== e.negative
                  ? ((o = this.divmod(e.neg(), t)),
                    "mod" !== t && (n = o.div.neg()),
                    { div: n, mod: o.mod })
                  : 0 != (this.negative & e.negative)
                  ? ((o = this.neg().divmod(e.neg(), t)),
                    "div" !== t &&
                      ((a = o.mod.neg()), r && 0 !== a.negative && a.isub(e)),
                    { div: o.div, mod: a })
                  : e.length > this.length || this.cmp(e) < 0
                  ? { div: new f(0), mod: this }
                  : 1 === e.length
                  ? "div" === t
                    ? { div: this.divn(e.words[0]), mod: null }
                    : "mod" === t
                    ? { div: null, mod: new f(this.modn(e.words[0])) }
                    : {
                        div: this.divn(e.words[0]),
                        mod: new f(this.modn(e.words[0])),
                      }
                  : this._wordDiv(e, t)
              );
              var n, a, o;
            }),
            (f.prototype.div = function (e) {
              return this.divmod(e, "div", !1).div;
            }),
            (f.prototype.mod = function (e) {
              return this.divmod(e, "mod", !1).mod;
            }),
            (f.prototype.umod = function (e) {
              return this.divmod(e, "mod", !0).mod;
            }),
            (f.prototype.divRound = function (e) {
              var t = this.divmod(e);
              if (t.mod.isZero()) return t.div;
              var r = 0 !== t.div.negative ? t.mod.isub(e) : t.mod,
                i = e.ushrn(1),
                n = e.andln(1),
                f = r.cmp(i);
              return f < 0 || (1 === n && 0 === f)
                ? t.div
                : 0 !== t.div.negative
                ? t.div.isubn(1)
                : t.div.iaddn(1);
            }),
            (f.prototype.modn = function (e) {
              i(e <= 67108863);
              for (
                var t = (1 << 26) % e, r = 0, n = this.length - 1;
                n >= 0;
                n--
              )
                r = (t * r + (0 | this.words[n])) % e;
              return r;
            }),
            (f.prototype.idivn = function (e) {
              i(e <= 67108863);
              for (var t = 0, r = this.length - 1; r >= 0; r--) {
                var n = (0 | this.words[r]) + 67108864 * t;
                (this.words[r] = (n / e) | 0), (t = n % e);
              }
              return this.strip();
            }),
            (f.prototype.divn = function (e) {
              return this.clone().idivn(e);
            }),
            (f.prototype.egcd = function (e) {
              i(0 === e.negative), i(!e.isZero());
              var t = this,
                r = e.clone();
              t = 0 !== t.negative ? t.umod(e) : t.clone();
              for (
                var n = new f(1),
                  a = new f(0),
                  o = new f(0),
                  s = new f(1),
                  d = 0;
                t.isEven() && r.isEven();

              )
                t.iushrn(1), r.iushrn(1), ++d;
              for (var c = r.clone(), h = t.clone(); !t.isZero(); ) {
                for (
                  var u = 0, l = 1;
                  0 == (t.words[0] & l) && u < 26;
                  ++u, l <<= 1
                );
                if (u > 0)
                  for (t.iushrn(u); u-- > 0; )
                    (n.isOdd() || a.isOdd()) && (n.iadd(c), a.isub(h)),
                      n.iushrn(1),
                      a.iushrn(1);
                for (
                  var b = 0, p = 1;
                  0 == (r.words[0] & p) && b < 26;
                  ++b, p <<= 1
                );
                if (b > 0)
                  for (r.iushrn(b); b-- > 0; )
                    (o.isOdd() || s.isOdd()) && (o.iadd(c), s.isub(h)),
                      o.iushrn(1),
                      s.iushrn(1);
                t.cmp(r) >= 0
                  ? (t.isub(r), n.isub(o), a.isub(s))
                  : (r.isub(t), o.isub(n), s.isub(a));
              }
              return { a: o, b: s, gcd: r.iushln(d) };
            }),
            (f.prototype._invmp = function (e) {
              i(0 === e.negative), i(!e.isZero());
              var t = this,
                r = e.clone();
              t = 0 !== t.negative ? t.umod(e) : t.clone();
              for (
                var n, a = new f(1), o = new f(0), s = r.clone();
                t.cmpn(1) > 0 && r.cmpn(1) > 0;

              ) {
                for (
                  var d = 0, c = 1;
                  0 == (t.words[0] & c) && d < 26;
                  ++d, c <<= 1
                );
                if (d > 0)
                  for (t.iushrn(d); d-- > 0; )
                    a.isOdd() && a.iadd(s), a.iushrn(1);
                for (
                  var h = 0, u = 1;
                  0 == (r.words[0] & u) && h < 26;
                  ++h, u <<= 1
                );
                if (h > 0)
                  for (r.iushrn(h); h-- > 0; )
                    o.isOdd() && o.iadd(s), o.iushrn(1);
                t.cmp(r) >= 0 ? (t.isub(r), a.isub(o)) : (r.isub(t), o.isub(a));
              }
              return (n = 0 === t.cmpn(1) ? a : o).cmpn(0) < 0 && n.iadd(e), n;
            }),
            (f.prototype.gcd = function (e) {
              if (this.isZero()) return e.abs();
              if (e.isZero()) return this.abs();
              var t = this.clone(),
                r = e.clone();
              (t.negative = 0), (r.negative = 0);
              for (var i = 0; t.isEven() && r.isEven(); i++)
                t.iushrn(1), r.iushrn(1);
              for (;;) {
                for (; t.isEven(); ) t.iushrn(1);
                for (; r.isEven(); ) r.iushrn(1);
                var n = t.cmp(r);
                if (n < 0) {
                  var f = t;
                  (t = r), (r = f);
                } else if (0 === n || 0 === r.cmpn(1)) break;
                t.isub(r);
              }
              return r.iushln(i);
            }),
            (f.prototype.invm = function (e) {
              return this.egcd(e).a.umod(e);
            }),
            (f.prototype.isEven = function () {
              return 0 == (1 & this.words[0]);
            }),
            (f.prototype.isOdd = function () {
              return 1 == (1 & this.words[0]);
            }),
            (f.prototype.andln = function (e) {
              return this.words[0] & e;
            }),
            (f.prototype.bincn = function (e) {
              i("number" == typeof e);
              var t = e % 26,
                r = (e - t) / 26,
                n = 1 << t;
              if (this.length <= r)
                return this._expand(r + 1), (this.words[r] |= n), this;
              for (var f = n, a = r; 0 !== f && a < this.length; a++) {
                var o = 0 | this.words[a];
                (f = (o += f) >>> 26), (o &= 67108863), (this.words[a] = o);
              }
              return 0 !== f && ((this.words[a] = f), this.length++), this;
            }),
            (f.prototype.isZero = function () {
              return 1 === this.length && 0 === this.words[0];
            }),
            (f.prototype.cmpn = function (e) {
              var t,
                r = e < 0;
              if (0 !== this.negative && !r) return -1;
              if (0 === this.negative && r) return 1;
              if ((this.strip(), this.length > 1)) t = 1;
              else {
                r && (e = -e), i(e <= 67108863, "Number is too big");
                var n = 0 | this.words[0];
                t = n === e ? 0 : n < e ? -1 : 1;
              }
              return 0 !== this.negative ? 0 | -t : t;
            }),
            (f.prototype.cmp = function (e) {
              if (0 !== this.negative && 0 === e.negative) return -1;
              if (0 === this.negative && 0 !== e.negative) return 1;
              var t = this.ucmp(e);
              return 0 !== this.negative ? 0 | -t : t;
            }),
            (f.prototype.ucmp = function (e) {
              if (this.length > e.length) return 1;
              if (this.length < e.length) return -1;
              for (var t = 0, r = this.length - 1; r >= 0; r--) {
                var i = 0 | this.words[r],
                  n = 0 | e.words[r];
                if (i !== n) {
                  i < n ? (t = -1) : i > n && (t = 1);
                  break;
                }
              }
              return t;
            }),
            (f.prototype.gtn = function (e) {
              return 1 === this.cmpn(e);
            }),
            (f.prototype.gt = function (e) {
              return 1 === this.cmp(e);
            }),
            (f.prototype.gten = function (e) {
              return this.cmpn(e) >= 0;
            }),
            (f.prototype.gte = function (e) {
              return this.cmp(e) >= 0;
            }),
            (f.prototype.ltn = function (e) {
              return -1 === this.cmpn(e);
            }),
            (f.prototype.lt = function (e) {
              return -1 === this.cmp(e);
            }),
            (f.prototype.lten = function (e) {
              return this.cmpn(e) <= 0;
            }),
            (f.prototype.lte = function (e) {
              return this.cmp(e) <= 0;
            }),
            (f.prototype.eqn = function (e) {
              return 0 === this.cmpn(e);
            }),
            (f.prototype.eq = function (e) {
              return 0 === this.cmp(e);
            }),
            (f.red = function (e) {
              return new S(e);
            }),
            (f.prototype.toRed = function (e) {
              return (
                i(!this.red, "Already a number in reduction context"),
                i(0 === this.negative, "red works only with positives"),
                e.convertTo(this)._forceRed(e)
              );
            }),
            (f.prototype.fromRed = function () {
              return (
                i(
                  this.red,
                  "fromRed works only with numbers in reduction context"
                ),
                this.red.convertFrom(this)
              );
            }),
            (f.prototype._forceRed = function (e) {
              return (this.red = e), this;
            }),
            (f.prototype.forceRed = function (e) {
              return (
                i(!this.red, "Already a number in reduction context"),
                this._forceRed(e)
              );
            }),
            (f.prototype.redAdd = function (e) {
              return (
                i(this.red, "redAdd works only with red numbers"),
                this.red.add(this, e)
              );
            }),
            (f.prototype.redIAdd = function (e) {
              return (
                i(this.red, "redIAdd works only with red numbers"),
                this.red.iadd(this, e)
              );
            }),
            (f.prototype.redSub = function (e) {
              return (
                i(this.red, "redSub works only with red numbers"),
                this.red.sub(this, e)
              );
            }),
            (f.prototype.redISub = function (e) {
              return (
                i(this.red, "redISub works only with red numbers"),
                this.red.isub(this, e)
              );
            }),
            (f.prototype.redShl = function (e) {
              return (
                i(this.red, "redShl works only with red numbers"),
                this.red.shl(this, e)
              );
            }),
            (f.prototype.redMul = function (e) {
              return (
                i(this.red, "redMul works only with red numbers"),
                this.red._verify2(this, e),
                this.red.mul(this, e)
              );
            }),
            (f.prototype.redIMul = function (e) {
              return (
                i(this.red, "redMul works only with red numbers"),
                this.red._verify2(this, e),
                this.red.imul(this, e)
              );
            }),
            (f.prototype.redSqr = function () {
              return (
                i(this.red, "redSqr works only with red numbers"),
                this.red._verify1(this),
                this.red.sqr(this)
              );
            }),
            (f.prototype.redISqr = function () {
              return (
                i(this.red, "redISqr works only with red numbers"),
                this.red._verify1(this),
                this.red.isqr(this)
              );
            }),
            (f.prototype.redSqrt = function () {
              return (
                i(this.red, "redSqrt works only with red numbers"),
                this.red._verify1(this),
                this.red.sqrt(this)
              );
            }),
            (f.prototype.redInvm = function () {
              return (
                i(this.red, "redInvm works only with red numbers"),
                this.red._verify1(this),
                this.red.invm(this)
              );
            }),
            (f.prototype.redNeg = function () {
              return (
                i(this.red, "redNeg works only with red numbers"),
                this.red._verify1(this),
                this.red.neg(this)
              );
            }),
            (f.prototype.redPow = function (e) {
              return (
                i(this.red && !e.red, "redPow(normalNum)"),
                this.red._verify1(this),
                this.red.pow(this, e)
              );
            });
          var m = { k256: null, p224: null, p192: null, p25519: null };
          function g(e, t) {
            (this.name = e),
              (this.p = new f(t, 16)),
              (this.n = this.p.bitLength()),
              (this.k = new f(1).iushln(this.n).isub(this.p)),
              (this.tmp = this._tmp());
          }
          function v() {
            g.call(
              this,
              "k256",
              "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
            );
          }
          function w() {
            g.call(
              this,
              "p224",
              "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
            );
          }
          function M() {
            g.call(
              this,
              "p192",
              "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
            );
          }
          function _() {
            g.call(
              this,
              "25519",
              "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
            );
          }
          function S(e) {
            if ("string" == typeof e) {
              var t = f._prime(e);
              (this.m = t.p), (this.prime = t);
            } else
              i(e.gtn(1), "modulus must be greater than 1"),
                (this.m = e),
                (this.prime = null);
          }
          function A(e) {
            S.call(this, e),
              (this.shift = this.m.bitLength()),
              this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
              (this.r = new f(1).iushln(this.shift)),
              (this.r2 = this.imod(this.r.sqr())),
              (this.rinv = this.r._invmp(this.m)),
              (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
              (this.minv = this.minv.umod(this.r)),
              (this.minv = this.r.sub(this.minv));
          }
          (g.prototype._tmp = function () {
            var e = new f(null);
            return (e.words = new Array(Math.ceil(this.n / 13))), e;
          }),
            (g.prototype.ireduce = function (e) {
              var t,
                r = e;
              do {
                this.split(r, this.tmp),
                  (t = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength());
              } while (t > this.n);
              var i = t < this.n ? -1 : r.ucmp(this.p);
              return (
                0 === i
                  ? ((r.words[0] = 0), (r.length = 1))
                  : i > 0
                  ? r.isub(this.p)
                  : void 0 !== r.strip
                  ? r.strip()
                  : r._strip(),
                r
              );
            }),
            (g.prototype.split = function (e, t) {
              e.iushrn(this.n, 0, t);
            }),
            (g.prototype.imulK = function (e) {
              return e.imul(this.k);
            }),
            n(v, g),
            (v.prototype.split = function (e, t) {
              for (
                var r = 4194303, i = Math.min(e.length, 9), n = 0;
                n < i;
                n++
              )
                t.words[n] = e.words[n];
              if (((t.length = i), e.length <= 9))
                return (e.words[0] = 0), void (e.length = 1);
              var f = e.words[9];
              for (t.words[t.length++] = f & r, n = 10; n < e.length; n++) {
                var a = 0 | e.words[n];
                (e.words[n - 10] = ((a & r) << 4) | (f >>> 22)), (f = a);
              }
              (f >>>= 22),
                (e.words[n - 10] = f),
                0 === f && e.length > 10 ? (e.length -= 10) : (e.length -= 9);
            }),
            (v.prototype.imulK = function (e) {
              (e.words[e.length] = 0),
                (e.words[e.length + 1] = 0),
                (e.length += 2);
              for (var t = 0, r = 0; r < e.length; r++) {
                var i = 0 | e.words[r];
                (t += 977 * i),
                  (e.words[r] = 67108863 & t),
                  (t = 64 * i + ((t / 67108864) | 0));
              }
              return (
                0 === e.words[e.length - 1] &&
                  (e.length--, 0 === e.words[e.length - 1] && e.length--),
                e
              );
            }),
            n(w, g),
            n(M, g),
            n(_, g),
            (_.prototype.imulK = function (e) {
              for (var t = 0, r = 0; r < e.length; r++) {
                var i = 19 * (0 | e.words[r]) + t,
                  n = 67108863 & i;
                (i >>>= 26), (e.words[r] = n), (t = i);
              }
              return 0 !== t && (e.words[e.length++] = t), e;
            }),
            (f._prime = function (e) {
              if (m[e]) return m[e];
              var t;
              if ("k256" === e) t = new v();
              else if ("p224" === e) t = new w();
              else if ("p192" === e) t = new M();
              else {
                if ("p25519" !== e) throw new Error("Unknown prime " + e);
                t = new _();
              }
              return (m[e] = t), t;
            }),
            (S.prototype._verify1 = function (e) {
              i(0 === e.negative, "red works only with positives"),
                i(e.red, "red works only with red numbers");
            }),
            (S.prototype._verify2 = function (e, t) {
              i(
                0 == (e.negative | t.negative),
                "red works only with positives"
              ),
                i(e.red && e.red === t.red, "red works only with red numbers");
            }),
            (S.prototype.imod = function (e) {
              return this.prime
                ? this.prime.ireduce(e)._forceRed(this)
                : e.umod(this.m)._forceRed(this);
            }),
            (S.prototype.neg = function (e) {
              return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this);
            }),
            (S.prototype.add = function (e, t) {
              this._verify2(e, t);
              var r = e.add(t);
              return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this);
            }),
            (S.prototype.iadd = function (e, t) {
              this._verify2(e, t);
              var r = e.iadd(t);
              return r.cmp(this.m) >= 0 && r.isub(this.m), r;
            }),
            (S.prototype.sub = function (e, t) {
              this._verify2(e, t);
              var r = e.sub(t);
              return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this);
            }),
            (S.prototype.isub = function (e, t) {
              this._verify2(e, t);
              var r = e.isub(t);
              return r.cmpn(0) < 0 && r.iadd(this.m), r;
            }),
            (S.prototype.shl = function (e, t) {
              return this._verify1(e), this.imod(e.ushln(t));
            }),
            (S.prototype.imul = function (e, t) {
              return this._verify2(e, t), this.imod(e.imul(t));
            }),
            (S.prototype.mul = function (e, t) {
              return this._verify2(e, t), this.imod(e.mul(t));
            }),
            (S.prototype.isqr = function (e) {
              return this.imul(e, e.clone());
            }),
            (S.prototype.sqr = function (e) {
              return this.mul(e, e);
            }),
            (S.prototype.sqrt = function (e) {
              if (e.isZero()) return e.clone();
              var t = this.m.andln(3);
              if ((i(t % 2 == 1), 3 === t)) {
                var r = this.m.add(new f(1)).iushrn(2);
                return this.pow(e, r);
              }
              for (
                var n = this.m.subn(1), a = 0;
                !n.isZero() && 0 === n.andln(1);

              )
                a++, n.iushrn(1);
              i(!n.isZero());
              var o = new f(1).toRed(this),
                s = o.redNeg(),
                d = this.m.subn(1).iushrn(1),
                c = this.m.bitLength();
              for (
                c = new f(2 * c * c).toRed(this);
                0 !== this.pow(c, d).cmp(s);

              )
                c.redIAdd(s);
              for (
                var h = this.pow(c, n),
                  u = this.pow(e, n.addn(1).iushrn(1)),
                  l = this.pow(e, n),
                  b = a;
                0 !== l.cmp(o);

              ) {
                for (var p = l, y = 0; 0 !== p.cmp(o); y++) p = p.redSqr();
                i(y < b);
                var m = this.pow(h, new f(1).iushln(b - y - 1));
                (u = u.redMul(m)), (h = m.redSqr()), (l = l.redMul(h)), (b = y);
              }
              return u;
            }),
            (S.prototype.invm = function (e) {
              var t = e._invmp(this.m);
              return 0 !== t.negative
                ? ((t.negative = 0), this.imod(t).redNeg())
                : this.imod(t);
            }),
            (S.prototype.pow = function (e, t) {
              if (t.isZero()) return new f(1).toRed(this);
              if (0 === t.cmpn(1)) return e.clone();
              var r = new Array(16);
              (r[0] = new f(1).toRed(this)), (r[1] = e);
              for (var i = 2; i < r.length; i++) r[i] = this.mul(r[i - 1], e);
              var n = r[0],
                a = 0,
                o = 0,
                s = t.bitLength() % 26;
              for (0 === s && (s = 26), i = t.length - 1; i >= 0; i--) {
                for (var d = t.words[i], c = s - 1; c >= 0; c--) {
                  var h = (d >> c) & 1;
                  n !== r[0] && (n = this.sqr(n)),
                    0 !== h || 0 !== a
                      ? ((a <<= 1),
                        (a |= h),
                        (4 == ++o || (0 === i && 0 === c)) &&
                          ((n = this.mul(n, r[a])), (o = 0), (a = 0)))
                      : (o = 0);
                }
                s = 26;
              }
              return n;
            }),
            (S.prototype.convertTo = function (e) {
              var t = e.umod(this.m);
              return t === e ? t.clone() : t;
            }),
            (S.prototype.convertFrom = function (e) {
              var t = e.clone();
              return (t.red = null), t;
            }),
            (f.mont = function (e) {
              return new A(e);
            }),
            n(A, S),
            (A.prototype.convertTo = function (e) {
              return this.imod(e.ushln(this.shift));
            }),
            (A.prototype.convertFrom = function (e) {
              var t = this.imod(e.mul(this.rinv));
              return (t.red = null), t;
            }),
            (A.prototype.imul = function (e, t) {
              if (e.isZero() || t.isZero())
                return (e.words[0] = 0), (e.length = 1), e;
              var r = e.imul(t),
                i = r
                  .maskn(this.shift)
                  .mul(this.minv)
                  .imaskn(this.shift)
                  .mul(this.m),
                n = r.isub(i).iushrn(this.shift),
                f = n;
              return (
                n.cmp(this.m) >= 0
                  ? (f = n.isub(this.m))
                  : n.cmpn(0) < 0 && (f = n.iadd(this.m)),
                f._forceRed(this)
              );
            }),
            (A.prototype.mul = function (e, t) {
              if (e.isZero() || t.isZero()) return new f(0)._forceRed(this);
              var r = e.mul(t),
                i = r
                  .maskn(this.shift)
                  .mul(this.minv)
                  .imaskn(this.shift)
                  .mul(this.m),
                n = r.isub(i).iushrn(this.shift),
                a = n;
              return (
                n.cmp(this.m) >= 0
                  ? (a = n.isub(this.m))
                  : n.cmpn(0) < 0 && (a = n.iadd(this.m)),
                a._forceRed(this)
              );
            }),
            (A.prototype.invm = function (e) {
              return this.imod(e._invmp(this.m).mul(this.r2))._forceRed(this);
            });
        })((e = r.nmd(e)), this);
      },
      7187: (e) => {
        "use strict";
        var t,
          r = "object" == typeof Reflect ? Reflect : null,
          i =
            r && "function" == typeof r.apply
              ? r.apply
              : function (e, t, r) {
                  return Function.prototype.apply.call(e, t, r);
                };
        t =
          r && "function" == typeof r.ownKeys
            ? r.ownKeys
            : Object.getOwnPropertySymbols
            ? function (e) {
                return Object.getOwnPropertyNames(e).concat(
                  Object.getOwnPropertySymbols(e)
                );
              }
            : function (e) {
                return Object.getOwnPropertyNames(e);
              };
        var n =
          Number.isNaN ||
          function (e) {
            return e != e;
          };
        function f() {
          f.init.call(this);
        }
        (e.exports = f),
          (e.exports.once = function (e, t) {
            return new Promise(function (r, i) {
              function n(r) {
                e.removeListener(t, f), i(r);
              }
              function f() {
                "function" == typeof e.removeListener &&
                  e.removeListener("error", n),
                  r([].slice.call(arguments));
              }
              p(e, t, f, { once: !0 }),
                "error" !== t &&
                  (function (e, t, r) {
                    "function" == typeof e.on && p(e, "error", t, { once: !0 });
                  })(e, n);
            });
          }),
          (f.EventEmitter = f),
          (f.prototype._events = void 0),
          (f.prototype._eventsCount = 0),
          (f.prototype._maxListeners = void 0);
        var a = 10;
        function o(e) {
          if ("function" != typeof e)
            throw new TypeError(
              'The "listener" argument must be of type Function. Received type ' +
                typeof e
            );
        }
        function s(e) {
          return void 0 === e._maxListeners
            ? f.defaultMaxListeners
            : e._maxListeners;
        }
        function d(e, t, r, i) {
          var n, f, a, d;
          if (
            (o(r),
            void 0 === (f = e._events)
              ? ((f = e._events = Object.create(null)), (e._eventsCount = 0))
              : (void 0 !== f.newListener &&
                  (e.emit("newListener", t, r.listener ? r.listener : r),
                  (f = e._events)),
                (a = f[t])),
            void 0 === a)
          )
            (a = f[t] = r), ++e._eventsCount;
          else if (
            ("function" == typeof a
              ? (a = f[t] = i ? [r, a] : [a, r])
              : i
              ? a.unshift(r)
              : a.push(r),
            (n = s(e)) > 0 && a.length > n && !a.warned)
          ) {
            a.warned = !0;
            var c = new Error(
              "Possible EventEmitter memory leak detected. " +
                a.length +
                " " +
                String(t) +
                " listeners added. Use emitter.setMaxListeners() to increase limit"
            );
            (c.name = "MaxListenersExceededWarning"),
              (c.emitter = e),
              (c.type = t),
              (c.count = a.length),
              (d = c),
              console && console.warn && console.warn(d);
          }
          return e;
        }
        function c() {
          if (!this.fired)
            return (
              this.target.removeListener(this.type, this.wrapFn),
              (this.fired = !0),
              0 === arguments.length
                ? this.listener.call(this.target)
                : this.listener.apply(this.target, arguments)
            );
        }
        function h(e, t, r) {
          var i = {
              fired: !1,
              wrapFn: void 0,
              target: e,
              type: t,
              listener: r,
            },
            n = c.bind(i);
          return (n.listener = r), (i.wrapFn = n), n;
        }
        function u(e, t, r) {
          var i = e._events;
          if (void 0 === i) return [];
          var n = i[t];
          return void 0 === n
            ? []
            : "function" == typeof n
            ? r
              ? [n.listener || n]
              : [n]
            : r
            ? (function (e) {
                for (var t = new Array(e.length), r = 0; r < t.length; ++r)
                  t[r] = e[r].listener || e[r];
                return t;
              })(n)
            : b(n, n.length);
        }
        function l(e) {
          var t = this._events;
          if (void 0 !== t) {
            var r = t[e];
            if ("function" == typeof r) return 1;
            if (void 0 !== r) return r.length;
          }
          return 0;
        }
        function b(e, t) {
          for (var r = new Array(t), i = 0; i < t; ++i) r[i] = e[i];
          return r;
        }
        function p(e, t, r, i) {
          if ("function" == typeof e.on) i.once ? e.once(t, r) : e.on(t, r);
          else {
            if ("function" != typeof e.addEventListener)
              throw new TypeError(
                'The "emitter" argument must be of type EventEmitter. Received type ' +
                  typeof e
              );
            e.addEventListener(t, function n(f) {
              i.once && e.removeEventListener(t, n), r(f);
            });
          }
        }
        Object.defineProperty(f, "defaultMaxListeners", {
          enumerable: !0,
          get: function () {
            return a;
          },
          set: function (e) {
            if ("number" != typeof e || e < 0 || n(e))
              throw new RangeError(
                'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                  e +
                  "."
              );
            a = e;
          },
        }),
          (f.init = function () {
            (void 0 !== this._events &&
              this._events !== Object.getPrototypeOf(this)._events) ||
              ((this._events = Object.create(null)), (this._eventsCount = 0)),
              (this._maxListeners = this._maxListeners || void 0);
          }),
          (f.prototype.setMaxListeners = function (e) {
            if ("number" != typeof e || e < 0 || n(e))
              throw new RangeError(
                'The value of "n" is out of range. It must be a non-negative number. Received ' +
                  e +
                  "."
              );
            return (this._maxListeners = e), this;
          }),
          (f.prototype.getMaxListeners = function () {
            return s(this);
          }),
          (f.prototype.emit = function (e) {
            for (var t = [], r = 1; r < arguments.length; r++)
              t.push(arguments[r]);
            var n = "error" === e,
              f = this._events;
            if (void 0 !== f) n = n && void 0 === f.error;
            else if (!n) return !1;
            if (n) {
              var a;
              if ((t.length > 0 && (a = t[0]), a instanceof Error)) throw a;
              var o = new Error(
                "Unhandled error." + (a ? " (" + a.message + ")" : "")
              );
              throw ((o.context = a), o);
            }
            var s = f[e];
            if (void 0 === s) return !1;
            if ("function" == typeof s) i(s, this, t);
            else {
              var d = s.length,
                c = b(s, d);
              for (r = 0; r < d; ++r) i(c[r], this, t);
            }
            return !0;
          }),
          (f.prototype.addListener = function (e, t) {
            return d(this, e, t, !1);
          }),
          (f.prototype.on = f.prototype.addListener),
          (f.prototype.prependListener = function (e, t) {
            return d(this, e, t, !0);
          }),
          (f.prototype.once = function (e, t) {
            return o(t), this.on(e, h(this, e, t)), this;
          }),
          (f.prototype.prependOnceListener = function (e, t) {
            return o(t), this.prependListener(e, h(this, e, t)), this;
          }),
          (f.prototype.removeListener = function (e, t) {
            var r, i, n, f, a;
            if ((o(t), void 0 === (i = this._events))) return this;
            if (void 0 === (r = i[e])) return this;
            if (r === t || r.listener === t)
              0 == --this._eventsCount
                ? (this._events = Object.create(null))
                : (delete i[e],
                  i.removeListener &&
                    this.emit("removeListener", e, r.listener || t));
            else if ("function" != typeof r) {
              for (n = -1, f = r.length - 1; f >= 0; f--)
                if (r[f] === t || r[f].listener === t) {
                  (a = r[f].listener), (n = f);
                  break;
                }
              if (n < 0) return this;
              0 === n
                ? r.shift()
                : (function (e, t) {
                    for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                    e.pop();
                  })(r, n),
                1 === r.length && (i[e] = r[0]),
                void 0 !== i.removeListener &&
                  this.emit("removeListener", e, a || t);
            }
            return this;
          }),
          (f.prototype.off = f.prototype.removeListener),
          (f.prototype.removeAllListeners = function (e) {
            var t, r, i;
            if (void 0 === (r = this._events)) return this;
            if (void 0 === r.removeListener)
              return (
                0 === arguments.length
                  ? ((this._events = Object.create(null)),
                    (this._eventsCount = 0))
                  : void 0 !== r[e] &&
                    (0 == --this._eventsCount
                      ? (this._events = Object.create(null))
                      : delete r[e]),
                this
              );
            if (0 === arguments.length) {
              var n,
                f = Object.keys(r);
              for (i = 0; i < f.length; ++i)
                "removeListener" !== (n = f[i]) && this.removeAllListeners(n);
              return (
                this.removeAllListeners("removeListener"),
                (this._events = Object.create(null)),
                (this._eventsCount = 0),
                this
              );
            }
            if ("function" == typeof (t = r[e])) this.removeListener(e, t);
            else if (void 0 !== t)
              for (i = t.length - 1; i >= 0; i--) this.removeListener(e, t[i]);
            return this;
          }),
          (f.prototype.listeners = function (e) {
            return u(this, e, !0);
          }),
          (f.prototype.rawListeners = function (e) {
            return u(this, e, !1);
          }),
          (f.listenerCount = function (e, t) {
            return "function" == typeof e.listenerCount
              ? e.listenerCount(t)
              : l.call(e, t);
          }),
          (f.prototype.listenerCount = l),
          (f.prototype.eventNames = function () {
            return this._eventsCount > 0 ? t(this._events) : [];
          });
      },
      3715: (e, t, r) => {
        var i = t;
        (i.utils = r(6436)),
          (i.common = r(5772)),
          (i.sha = r(9041)),
          (i.ripemd = r(2949)),
          (i.hmac = r(2344)),
          (i.sha1 = i.sha.sha1),
          (i.sha256 = i.sha.sha256),
          (i.sha224 = i.sha.sha224),
          (i.sha384 = i.sha.sha384),
          (i.sha512 = i.sha.sha512),
          (i.ripemd160 = i.ripemd.ripemd160);
      },
      5772: (e, t, r) => {
        "use strict";
        var i = r(6436),
          n = r(9746);
        function f() {
          (this.pending = null),
            (this.pendingTotal = 0),
            (this.blockSize = this.constructor.blockSize),
            (this.outSize = this.constructor.outSize),
            (this.hmacStrength = this.constructor.hmacStrength),
            (this.padLength = this.constructor.padLength / 8),
            (this.endian = "big"),
            (this._delta8 = this.blockSize / 8),
            (this._delta32 = this.blockSize / 32);
        }
        (t.BlockHash = f),
          (f.prototype.update = function (e, t) {
            if (
              ((e = i.toArray(e, t)),
              this.pending
                ? (this.pending = this.pending.concat(e))
                : (this.pending = e),
              (this.pendingTotal += e.length),
              this.pending.length >= this._delta8)
            ) {
              var r = (e = this.pending).length % this._delta8;
              (this.pending = e.slice(e.length - r, e.length)),
                0 === this.pending.length && (this.pending = null),
                (e = i.join32(e, 0, e.length - r, this.endian));
              for (var n = 0; n < e.length; n += this._delta32)
                this._update(e, n, n + this._delta32);
            }
            return this;
          }),
          (f.prototype.digest = function (e) {
            return (
              this.update(this._pad()),
              n(null === this.pending),
              this._digest(e)
            );
          }),
          (f.prototype._pad = function () {
            var e = this.pendingTotal,
              t = this._delta8,
              r = t - ((e + this.padLength) % t),
              i = new Array(r + this.padLength);
            i[0] = 128;
            for (var n = 1; n < r; n++) i[n] = 0;
            if (((e <<= 3), "big" === this.endian)) {
              for (var f = 8; f < this.padLength; f++) i[n++] = 0;
              (i[n++] = 0),
                (i[n++] = 0),
                (i[n++] = 0),
                (i[n++] = 0),
                (i[n++] = (e >>> 24) & 255),
                (i[n++] = (e >>> 16) & 255),
                (i[n++] = (e >>> 8) & 255),
                (i[n++] = 255 & e);
            } else
              for (
                i[n++] = 255 & e,
                  i[n++] = (e >>> 8) & 255,
                  i[n++] = (e >>> 16) & 255,
                  i[n++] = (e >>> 24) & 255,
                  i[n++] = 0,
                  i[n++] = 0,
                  i[n++] = 0,
                  i[n++] = 0,
                  f = 8;
                f < this.padLength;
                f++
              )
                i[n++] = 0;
            return i;
          });
      },
      2344: (e, t, r) => {
        "use strict";
        var i = r(6436),
          n = r(9746);
        function f(e, t, r) {
          if (!(this instanceof f)) return new f(e, t, r);
          (this.Hash = e),
            (this.blockSize = e.blockSize / 8),
            (this.outSize = e.outSize / 8),
            (this.inner = null),
            (this.outer = null),
            this._init(i.toArray(t, r));
        }
        (e.exports = f),
          (f.prototype._init = function (e) {
            e.length > this.blockSize &&
              (e = new this.Hash().update(e).digest()),
              n(e.length <= this.blockSize);
            for (var t = e.length; t < this.blockSize; t++) e.push(0);
            for (t = 0; t < e.length; t++) e[t] ^= 54;
            for (
              this.inner = new this.Hash().update(e), t = 0;
              t < e.length;
              t++
            )
              e[t] ^= 106;
            this.outer = new this.Hash().update(e);
          }),
          (f.prototype.update = function (e, t) {
            return this.inner.update(e, t), this;
          }),
          (f.prototype.digest = function (e) {
            return this.outer.update(this.inner.digest()), this.outer.digest(e);
          });
      },
      2949: (e, t, r) => {
        "use strict";
        var i = r(6436),
          n = r(5772),
          f = i.rotl32,
          a = i.sum32,
          o = i.sum32_3,
          s = i.sum32_4,
          d = n.BlockHash;
        function c() {
          if (!(this instanceof c)) return new c();
          d.call(this),
            (this.h = [
              1732584193, 4023233417, 2562383102, 271733878, 3285377520,
            ]),
            (this.endian = "little");
        }
        function h(e, t, r, i) {
          return e <= 15
            ? t ^ r ^ i
            : e <= 31
            ? (t & r) | (~t & i)
            : e <= 47
            ? (t | ~r) ^ i
            : e <= 63
            ? (t & i) | (r & ~i)
            : t ^ (r | ~i);
        }
        function u(e) {
          return e <= 15
            ? 0
            : e <= 31
            ? 1518500249
            : e <= 47
            ? 1859775393
            : e <= 63
            ? 2400959708
            : 2840853838;
        }
        function l(e) {
          return e <= 15
            ? 1352829926
            : e <= 31
            ? 1548603684
            : e <= 47
            ? 1836072691
            : e <= 63
            ? 2053994217
            : 0;
        }
        i.inherits(c, d),
          (t.ripemd160 = c),
          (c.blockSize = 512),
          (c.outSize = 160),
          (c.hmacStrength = 192),
          (c.padLength = 64),
          (c.prototype._update = function (e, t) {
            for (
              var r = this.h[0],
                i = this.h[1],
                n = this.h[2],
                d = this.h[3],
                c = this.h[4],
                g = r,
                v = i,
                w = n,
                M = d,
                _ = c,
                S = 0;
              S < 80;
              S++
            ) {
              var A = a(f(s(r, h(S, i, n, d), e[b[S] + t], u(S)), y[S]), c);
              (r = c),
                (c = d),
                (d = f(n, 10)),
                (n = i),
                (i = A),
                (A = a(
                  f(s(g, h(79 - S, v, w, M), e[p[S] + t], l(S)), m[S]),
                  _
                )),
                (g = _),
                (_ = M),
                (M = f(w, 10)),
                (w = v),
                (v = A);
            }
            (A = o(this.h[1], n, M)),
              (this.h[1] = o(this.h[2], d, _)),
              (this.h[2] = o(this.h[3], c, g)),
              (this.h[3] = o(this.h[4], r, v)),
              (this.h[4] = o(this.h[0], i, w)),
              (this.h[0] = A);
          }),
          (c.prototype._digest = function (e) {
            return "hex" === e
              ? i.toHex32(this.h, "little")
              : i.split32(this.h, "little");
          });
        var b = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1,
            10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1,
            2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15,
            14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
          ],
          p = [
            5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7,
            0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9,
            11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13,
            9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
          ],
          y = [
            11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13,
            11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13,
            15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14,
            5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8,
            5, 6,
          ],
          m = [
            8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15,
            7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6,
            14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9,
            12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13,
            11, 11,
          ];
      },
      9041: (e, t, r) => {
        "use strict";
        (t.sha1 = r(4761)),
          (t.sha224 = r(799)),
          (t.sha256 = r(9344)),
          (t.sha384 = r(772)),
          (t.sha512 = r(5900));
      },
      4761: (e, t, r) => {
        "use strict";
        var i = r(6436),
          n = r(5772),
          f = r(7038),
          a = i.rotl32,
          o = i.sum32,
          s = i.sum32_5,
          d = f.ft_1,
          c = n.BlockHash,
          h = [1518500249, 1859775393, 2400959708, 3395469782];
        function u() {
          if (!(this instanceof u)) return new u();
          c.call(this),
            (this.h = [
              1732584193, 4023233417, 2562383102, 271733878, 3285377520,
            ]),
            (this.W = new Array(80));
        }
        i.inherits(u, c),
          (e.exports = u),
          (u.blockSize = 512),
          (u.outSize = 160),
          (u.hmacStrength = 80),
          (u.padLength = 64),
          (u.prototype._update = function (e, t) {
            for (var r = this.W, i = 0; i < 16; i++) r[i] = e[t + i];
            for (; i < r.length; i++)
              r[i] = a(r[i - 3] ^ r[i - 8] ^ r[i - 14] ^ r[i - 16], 1);
            var n = this.h[0],
              f = this.h[1],
              c = this.h[2],
              u = this.h[3],
              l = this.h[4];
            for (i = 0; i < r.length; i++) {
              var b = ~~(i / 20),
                p = s(a(n, 5), d(b, f, c, u), l, r[i], h[b]);
              (l = u), (u = c), (c = a(f, 30)), (f = n), (n = p);
            }
            (this.h[0] = o(this.h[0], n)),
              (this.h[1] = o(this.h[1], f)),
              (this.h[2] = o(this.h[2], c)),
              (this.h[3] = o(this.h[3], u)),
              (this.h[4] = o(this.h[4], l));
          }),
          (u.prototype._digest = function (e) {
            return "hex" === e
              ? i.toHex32(this.h, "big")
              : i.split32(this.h, "big");
          });
      },
      799: (e, t, r) => {
        "use strict";
        var i = r(6436),
          n = r(9344);
        function f() {
          if (!(this instanceof f)) return new f();
          n.call(this),
            (this.h = [
              3238371032, 914150663, 812702999, 4144912697, 4290775857,
              1750603025, 1694076839, 3204075428,
            ]);
        }
        i.inherits(f, n),
          (e.exports = f),
          (f.blockSize = 512),
          (f.outSize = 224),
          (f.hmacStrength = 192),
          (f.padLength = 64),
          (f.prototype._digest = function (e) {
            return "hex" === e
              ? i.toHex32(this.h.slice(0, 7), "big")
              : i.split32(this.h.slice(0, 7), "big");
          });
      },
      9344: (e, t, r) => {
        "use strict";
        var i = r(6436),
          n = r(5772),
          f = r(7038),
          a = r(9746),
          o = i.sum32,
          s = i.sum32_4,
          d = i.sum32_5,
          c = f.ch32,
          h = f.maj32,
          u = f.s0_256,
          l = f.s1_256,
          b = f.g0_256,
          p = f.g1_256,
          y = n.BlockHash,
          m = [
            1116352408, 1899447441, 3049323471, 3921009573, 961987163,
            1508970993, 2453635748, 2870763221, 3624381080, 310598401,
            607225278, 1426881987, 1925078388, 2162078206, 2614888103,
            3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983,
            1249150122, 1555081692, 1996064986, 2554220882, 2821834349,
            2952996808, 3210313671, 3336571891, 3584528711, 113926993,
            338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700,
            1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
            3259730800, 3345764771, 3516065817, 3600352804, 4094571909,
            275423344, 430227734, 506948616, 659060556, 883997877, 958139571,
            1322822218, 1537002063, 1747873779, 1955562222, 2024104815,
            2227730452, 2361852424, 2428436474, 2756734187, 3204031479,
            3329325298,
          ];
        function g() {
          if (!(this instanceof g)) return new g();
          y.call(this),
            (this.h = [
              1779033703, 3144134277, 1013904242, 2773480762, 1359893119,
              2600822924, 528734635, 1541459225,
            ]),
            (this.k = m),
            (this.W = new Array(64));
        }
        i.inherits(g, y),
          (e.exports = g),
          (g.blockSize = 512),
          (g.outSize = 256),
          (g.hmacStrength = 192),
          (g.padLength = 64),
          (g.prototype._update = function (e, t) {
            for (var r = this.W, i = 0; i < 16; i++) r[i] = e[t + i];
            for (; i < r.length; i++)
              r[i] = s(p(r[i - 2]), r[i - 7], b(r[i - 15]), r[i - 16]);
            var n = this.h[0],
              f = this.h[1],
              y = this.h[2],
              m = this.h[3],
              g = this.h[4],
              v = this.h[5],
              w = this.h[6],
              M = this.h[7];
            for (a(this.k.length === r.length), i = 0; i < r.length; i++) {
              var _ = d(M, l(g), c(g, v, w), this.k[i], r[i]),
                S = o(u(n), h(n, f, y));
              (M = w),
                (w = v),
                (v = g),
                (g = o(m, _)),
                (m = y),
                (y = f),
                (f = n),
                (n = o(_, S));
            }
            (this.h[0] = o(this.h[0], n)),
              (this.h[1] = o(this.h[1], f)),
              (this.h[2] = o(this.h[2], y)),
              (this.h[3] = o(this.h[3], m)),
              (this.h[4] = o(this.h[4], g)),
              (this.h[5] = o(this.h[5], v)),
              (this.h[6] = o(this.h[6], w)),
              (this.h[7] = o(this.h[7], M));
          }),
          (g.prototype._digest = function (e) {
            return "hex" === e
              ? i.toHex32(this.h, "big")
              : i.split32(this.h, "big");
          });
      },
      772: (e, t, r) => {
        "use strict";
        var i = r(6436),
          n = r(5900);
        function f() {
          if (!(this instanceof f)) return new f();
          n.call(this),
            (this.h = [
              3418070365, 3238371032, 1654270250, 914150663, 2438529370,
              812702999, 355462360, 4144912697, 1731405415, 4290775857,
              2394180231, 1750603025, 3675008525, 1694076839, 1203062813,
              3204075428,
            ]);
        }
        i.inherits(f, n),
          (e.exports = f),
          (f.blockSize = 1024),
          (f.outSize = 384),
          (f.hmacStrength = 192),
          (f.padLength = 128),
          (f.prototype._digest = function (e) {
            return "hex" === e
              ? i.toHex32(this.h.slice(0, 12), "big")
              : i.split32(this.h.slice(0, 12), "big");
          });
      },
      5900: (e, t, r) => {
        "use strict";
        var i = r(6436),
          n = r(5772),
          f = r(9746),
          a = i.rotr64_hi,
          o = i.rotr64_lo,
          s = i.shr64_hi,
          d = i.shr64_lo,
          c = i.sum64,
          h = i.sum64_hi,
          u = i.sum64_lo,
          l = i.sum64_4_hi,
          b = i.sum64_4_lo,
          p = i.sum64_5_hi,
          y = i.sum64_5_lo,
          m = n.BlockHash,
          g = [
            1116352408, 3609767458, 1899447441, 602891725, 3049323471,
            3964484399, 3921009573, 2173295548, 961987163, 4081628472,
            1508970993, 3053834265, 2453635748, 2937671579, 2870763221,
            3664609560, 3624381080, 2734883394, 310598401, 1164996542,
            607225278, 1323610764, 1426881987, 3590304994, 1925078388,
            4068182383, 2162078206, 991336113, 2614888103, 633803317,
            3248222580, 3479774868, 3835390401, 2666613458, 4022224774,
            944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983,
            1495990901, 1249150122, 1856431235, 1555081692, 3175218132,
            1996064986, 2198950837, 2554220882, 3999719339, 2821834349,
            766784016, 2952996808, 2566594879, 3210313671, 3203337956,
            3336571891, 1034457026, 3584528711, 2466948901, 113926993,
            3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912,
            1546045734, 1294757372, 1522805485, 1396182291, 2643833823,
            1695183700, 2343527390, 1986661051, 1014477480, 2177026350,
            1206759142, 2456956037, 344077627, 2730485921, 1290863460,
            2820302411, 3158454273, 3259730800, 3505952657, 3345764771,
            106217008, 3516065817, 3606008344, 3600352804, 1432725776,
            4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752,
            506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280,
            958139571, 3318307427, 1322822218, 3812723403, 1537002063,
            2003034995, 1747873779, 3602036899, 1955562222, 1575990012,
            2024104815, 1125592928, 2227730452, 2716904306, 2361852424,
            442776044, 2428436474, 593698344, 2756734187, 3733110249,
            3204031479, 2999351573, 3329325298, 3815920427, 3391569614,
            3928383900, 3515267271, 566280711, 3940187606, 3454069534,
            4118630271, 4000239992, 116418474, 1914138554, 174292421,
            2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733,
            587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580,
            2618297676, 1288033470, 3409855158, 1501505948, 4234509866,
            1607167915, 987167468, 1816402316, 1246189591,
          ];
        function v() {
          if (!(this instanceof v)) return new v();
          m.call(this),
            (this.h = [
              1779033703, 4089235720, 3144134277, 2227873595, 1013904242,
              4271175723, 2773480762, 1595750129, 1359893119, 2917565137,
              2600822924, 725511199, 528734635, 4215389547, 1541459225,
              327033209,
            ]),
            (this.k = g),
            (this.W = new Array(160));
        }
        function w(e, t, r, i, n) {
          var f = (e & r) ^ (~e & n);
          return f < 0 && (f += 4294967296), f;
        }
        function M(e, t, r, i, n, f) {
          var a = (t & i) ^ (~t & f);
          return a < 0 && (a += 4294967296), a;
        }
        function _(e, t, r, i, n) {
          var f = (e & r) ^ (e & n) ^ (r & n);
          return f < 0 && (f += 4294967296), f;
        }
        function S(e, t, r, i, n, f) {
          var a = (t & i) ^ (t & f) ^ (i & f);
          return a < 0 && (a += 4294967296), a;
        }
        function A(e, t) {
          var r = a(e, t, 28) ^ a(t, e, 2) ^ a(t, e, 7);
          return r < 0 && (r += 4294967296), r;
        }
        function E(e, t) {
          var r = o(e, t, 28) ^ o(t, e, 2) ^ o(t, e, 7);
          return r < 0 && (r += 4294967296), r;
        }
        function x(e, t) {
          var r = o(e, t, 14) ^ o(e, t, 18) ^ o(t, e, 9);
          return r < 0 && (r += 4294967296), r;
        }
        function R(e, t) {
          var r = a(e, t, 1) ^ a(e, t, 8) ^ s(e, t, 7);
          return r < 0 && (r += 4294967296), r;
        }
        function I(e, t) {
          var r = o(e, t, 1) ^ o(e, t, 8) ^ d(e, t, 7);
          return r < 0 && (r += 4294967296), r;
        }
        function k(e, t) {
          var r = o(e, t, 19) ^ o(t, e, 29) ^ d(e, t, 6);
          return r < 0 && (r += 4294967296), r;
        }
        i.inherits(v, m),
          (e.exports = v),
          (v.blockSize = 1024),
          (v.outSize = 512),
          (v.hmacStrength = 192),
          (v.padLength = 128),
          (v.prototype._prepareBlock = function (e, t) {
            for (var r = this.W, i = 0; i < 32; i++) r[i] = e[t + i];
            for (; i < r.length; i += 2) {
              var n =
                  ((y = r[i - 4]),
                  (m = r[i - 3]),
                  (g = void 0),
                  (g = a(y, m, 19) ^ a(m, y, 29) ^ s(y, m, 6)) < 0 &&
                    (g += 4294967296),
                  g),
                f = k(r[i - 4], r[i - 3]),
                o = r[i - 14],
                d = r[i - 13],
                c = R(r[i - 30], r[i - 29]),
                h = I(r[i - 30], r[i - 29]),
                u = r[i - 32],
                p = r[i - 31];
              (r[i] = l(n, f, o, d, c, h, u, p)),
                (r[i + 1] = b(n, f, o, d, c, h, u, p));
            }
            var y, m, g;
          }),
          (v.prototype._update = function (e, t) {
            this._prepareBlock(e, t);
            var r,
              i,
              n,
              o = this.W,
              s = this.h[0],
              d = this.h[1],
              l = this.h[2],
              b = this.h[3],
              m = this.h[4],
              g = this.h[5],
              v = this.h[6],
              R = this.h[7],
              I = this.h[8],
              k = this.h[9],
              B = this.h[10],
              L = this.h[11],
              T = this.h[12],
              P = this.h[13],
              z = this.h[14],
              O = this.h[15];
            f(this.k.length === o.length);
            for (var N = 0; N < o.length; N += 2) {
              var q = z,
                C = O,
                j =
                  ((n = void 0),
                  (n = a((r = I), (i = k), 14) ^ a(r, i, 18) ^ a(i, r, 9)) <
                    0 && (n += 4294967296),
                  n),
                U = x(I, k),
                D = w(I, 0, B, 0, T),
                F = M(0, k, 0, L, 0, P),
                K = this.k[N],
                W = this.k[N + 1],
                H = o[N],
                V = o[N + 1],
                Z = p(q, C, j, U, D, F, K, W, H, V),
                $ = y(q, C, j, U, D, F, K, W, H, V);
              (q = A(s, d)),
                (C = E(s, d)),
                (j = _(s, 0, l, 0, m)),
                (U = S(0, d, 0, b, 0, g));
              var Y = h(q, C, j, U),
                J = u(q, C, j, U);
              (z = T),
                (O = P),
                (T = B),
                (P = L),
                (B = I),
                (L = k),
                (I = h(v, R, Z, $)),
                (k = u(R, R, Z, $)),
                (v = m),
                (R = g),
                (m = l),
                (g = b),
                (l = s),
                (b = d),
                (s = h(Z, $, Y, J)),
                (d = u(Z, $, Y, J));
            }
            c(this.h, 0, s, d),
              c(this.h, 2, l, b),
              c(this.h, 4, m, g),
              c(this.h, 6, v, R),
              c(this.h, 8, I, k),
              c(this.h, 10, B, L),
              c(this.h, 12, T, P),
              c(this.h, 14, z, O);
          }),
          (v.prototype._digest = function (e) {
            return "hex" === e
              ? i.toHex32(this.h, "big")
              : i.split32(this.h, "big");
          });
      },
      7038: (e, t, r) => {
        "use strict";
        var i = r(6436).rotr32;
        function n(e, t, r) {
          return (e & t) ^ (~e & r);
        }
        function f(e, t, r) {
          return (e & t) ^ (e & r) ^ (t & r);
        }
        function a(e, t, r) {
          return e ^ t ^ r;
        }
        (t.ft_1 = function (e, t, r, i) {
          return 0 === e
            ? n(t, r, i)
            : 1 === e || 3 === e
            ? a(t, r, i)
            : 2 === e
            ? f(t, r, i)
            : void 0;
        }),
          (t.ch32 = n),
          (t.maj32 = f),
          (t.p32 = a),
          (t.s0_256 = function (e) {
            return i(e, 2) ^ i(e, 13) ^ i(e, 22);
          }),
          (t.s1_256 = function (e) {
            return i(e, 6) ^ i(e, 11) ^ i(e, 25);
          }),
          (t.g0_256 = function (e) {
            return i(e, 7) ^ i(e, 18) ^ (e >>> 3);
          }),
          (t.g1_256 = function (e) {
            return i(e, 17) ^ i(e, 19) ^ (e >>> 10);
          });
      },
      6436: (e, t, r) => {
        "use strict";
        var i = r(9746),
          n = r(5717);
        function f(e, t) {
          return (
            55296 == (64512 & e.charCodeAt(t)) &&
            !(t < 0 || t + 1 >= e.length) &&
            56320 == (64512 & e.charCodeAt(t + 1))
          );
        }
        function a(e) {
          return (
            ((e >>> 24) |
              ((e >>> 8) & 65280) |
              ((e << 8) & 16711680) |
              ((255 & e) << 24)) >>>
            0
          );
        }
        function o(e) {
          return 1 === e.length ? "0" + e : e;
        }
        function s(e) {
          return 7 === e.length
            ? "0" + e
            : 6 === e.length
            ? "00" + e
            : 5 === e.length
            ? "000" + e
            : 4 === e.length
            ? "0000" + e
            : 3 === e.length
            ? "00000" + e
            : 2 === e.length
            ? "000000" + e
            : 1 === e.length
            ? "0000000" + e
            : e;
        }
        (t.inherits = n),
          (t.toArray = function (e, t) {
            if (Array.isArray(e)) return e.slice();
            if (!e) return [];
            var r = [];
            if ("string" == typeof e)
              if (t) {
                if ("hex" === t)
                  for (
                    (e = e.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 &&
                      (e = "0" + e),
                      n = 0;
                    n < e.length;
                    n += 2
                  )
                    r.push(parseInt(e[n] + e[n + 1], 16));
              } else
                for (var i = 0, n = 0; n < e.length; n++) {
                  var a = e.charCodeAt(n);
                  a < 128
                    ? (r[i++] = a)
                    : a < 2048
                    ? ((r[i++] = (a >> 6) | 192), (r[i++] = (63 & a) | 128))
                    : f(e, n)
                    ? ((a =
                        65536 +
                        ((1023 & a) << 10) +
                        (1023 & e.charCodeAt(++n))),
                      (r[i++] = (a >> 18) | 240),
                      (r[i++] = ((a >> 12) & 63) | 128),
                      (r[i++] = ((a >> 6) & 63) | 128),
                      (r[i++] = (63 & a) | 128))
                    : ((r[i++] = (a >> 12) | 224),
                      (r[i++] = ((a >> 6) & 63) | 128),
                      (r[i++] = (63 & a) | 128));
                }
            else for (n = 0; n < e.length; n++) r[n] = 0 | e[n];
            return r;
          }),
          (t.toHex = function (e) {
            for (var t = "", r = 0; r < e.length; r++)
              t += o(e[r].toString(16));
            return t;
          }),
          (t.htonl = a),
          (t.toHex32 = function (e, t) {
            for (var r = "", i = 0; i < e.length; i++) {
              var n = e[i];
              "little" === t && (n = a(n)), (r += s(n.toString(16)));
            }
            return r;
          }),
          (t.zero2 = o),
          (t.zero8 = s),
          (t.join32 = function (e, t, r, n) {
            var f = r - t;
            i(f % 4 == 0);
            for (
              var a = new Array(f / 4), o = 0, s = t;
              o < a.length;
              o++, s += 4
            ) {
              var d;
              (d =
                "big" === n
                  ? (e[s] << 24) | (e[s + 1] << 16) | (e[s + 2] << 8) | e[s + 3]
                  : (e[s + 3] << 24) |
                    (e[s + 2] << 16) |
                    (e[s + 1] << 8) |
                    e[s]),
                (a[o] = d >>> 0);
            }
            return a;
          }),
          (t.split32 = function (e, t) {
            for (
              var r = new Array(4 * e.length), i = 0, n = 0;
              i < e.length;
              i++, n += 4
            ) {
              var f = e[i];
              "big" === t
                ? ((r[n] = f >>> 24),
                  (r[n + 1] = (f >>> 16) & 255),
                  (r[n + 2] = (f >>> 8) & 255),
                  (r[n + 3] = 255 & f))
                : ((r[n + 3] = f >>> 24),
                  (r[n + 2] = (f >>> 16) & 255),
                  (r[n + 1] = (f >>> 8) & 255),
                  (r[n] = 255 & f));
            }
            return r;
          }),
          (t.rotr32 = function (e, t) {
            return (e >>> t) | (e << (32 - t));
          }),
          (t.rotl32 = function (e, t) {
            return (e << t) | (e >>> (32 - t));
          }),
          (t.sum32 = function (e, t) {
            return (e + t) >>> 0;
          }),
          (t.sum32_3 = function (e, t, r) {
            return (e + t + r) >>> 0;
          }),
          (t.sum32_4 = function (e, t, r, i) {
            return (e + t + r + i) >>> 0;
          }),
          (t.sum32_5 = function (e, t, r, i, n) {
            return (e + t + r + i + n) >>> 0;
          }),
          (t.sum64 = function (e, t, r, i) {
            var n = e[t],
              f = (i + e[t + 1]) >>> 0,
              a = (f < i ? 1 : 0) + r + n;
            (e[t] = a >>> 0), (e[t + 1] = f);
          }),
          (t.sum64_hi = function (e, t, r, i) {
            return (((t + i) >>> 0 < t ? 1 : 0) + e + r) >>> 0;
          }),
          (t.sum64_lo = function (e, t, r, i) {
            return (t + i) >>> 0;
          }),
          (t.sum64_4_hi = function (e, t, r, i, n, f, a, o) {
            var s = 0,
              d = t;
            return (
              (s += (d = (d + i) >>> 0) < t ? 1 : 0),
              (s += (d = (d + f) >>> 0) < f ? 1 : 0),
              (e + r + n + a + (s += (d = (d + o) >>> 0) < o ? 1 : 0)) >>> 0
            );
          }),
          (t.sum64_4_lo = function (e, t, r, i, n, f, a, o) {
            return (t + i + f + o) >>> 0;
          }),
          (t.sum64_5_hi = function (e, t, r, i, n, f, a, o, s, d) {
            var c = 0,
              h = t;
            return (
              (c += (h = (h + i) >>> 0) < t ? 1 : 0),
              (c += (h = (h + f) >>> 0) < f ? 1 : 0),
              (c += (h = (h + o) >>> 0) < o ? 1 : 0),
              (e + r + n + a + s + (c += (h = (h + d) >>> 0) < d ? 1 : 0)) >>> 0
            );
          }),
          (t.sum64_5_lo = function (e, t, r, i, n, f, a, o, s, d) {
            return (t + i + f + o + d) >>> 0;
          }),
          (t.rotr64_hi = function (e, t, r) {
            return ((t << (32 - r)) | (e >>> r)) >>> 0;
          }),
          (t.rotr64_lo = function (e, t, r) {
            return ((e << (32 - r)) | (t >>> r)) >>> 0;
          }),
          (t.shr64_hi = function (e, t, r) {
            return e >>> r;
          }),
          (t.shr64_lo = function (e, t, r) {
            return ((e << (32 - r)) | (t >>> r)) >>> 0;
          });
      },
      2156: (e, t, r) => {
        "use strict";
        var i = r(3715),
          n = r(4504),
          f = r(9746);
        function a(e) {
          if (!(this instanceof a)) return new a(e);
          (this.hash = e.hash),
            (this.predResist = !!e.predResist),
            (this.outLen = this.hash.outSize),
            (this.minEntropy = e.minEntropy || this.hash.hmacStrength),
            (this._reseed = null),
            (this.reseedInterval = null),
            (this.K = null),
            (this.V = null);
          var t = n.toArray(e.entropy, e.entropyEnc || "hex"),
            r = n.toArray(e.nonce, e.nonceEnc || "hex"),
            i = n.toArray(e.pers, e.persEnc || "hex");
          f(
            t.length >= this.minEntropy / 8,
            "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
          ),
            this._init(t, r, i);
        }
        (e.exports = a),
          (a.prototype._init = function (e, t, r) {
            var i = e.concat(t).concat(r);
            (this.K = new Array(this.outLen / 8)),
              (this.V = new Array(this.outLen / 8));
            for (var n = 0; n < this.V.length; n++)
              (this.K[n] = 0), (this.V[n] = 1);
            this._update(i),
              (this._reseed = 1),
              (this.reseedInterval = 281474976710656);
          }),
          (a.prototype._hmac = function () {
            return new i.hmac(this.hash, this.K);
          }),
          (a.prototype._update = function (e) {
            var t = this._hmac().update(this.V).update([0]);
            e && (t = t.update(e)),
              (this.K = t.digest()),
              (this.V = this._hmac().update(this.V).digest()),
              e &&
                ((this.K = this._hmac()
                  .update(this.V)
                  .update([1])
                  .update(e)
                  .digest()),
                (this.V = this._hmac().update(this.V).digest()));
          }),
          (a.prototype.reseed = function (e, t, r, i) {
            "string" != typeof t && ((i = r), (r = t), (t = null)),
              (e = n.toArray(e, t)),
              (r = n.toArray(r, i)),
              f(
                e.length >= this.minEntropy / 8,
                "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
              ),
              this._update(e.concat(r || [])),
              (this._reseed = 1);
          }),
          (a.prototype.generate = function (e, t, r, i) {
            if (this._reseed > this.reseedInterval)
              throw new Error("Reseed is required");
            "string" != typeof t && ((i = r), (r = t), (t = null)),
              r && ((r = n.toArray(r, i || "hex")), this._update(r));
            for (var f = []; f.length < e; )
              (this.V = this._hmac().update(this.V).digest()),
                (f = f.concat(this.V));
            var a = f.slice(0, e);
            return this._update(r), this._reseed++, n.encode(a, t);
          });
      },
      645: (e, t) => {
        (t.read = function (e, t, r, i, n) {
          var f,
            a,
            o = 8 * n - i - 1,
            s = (1 << o) - 1,
            d = s >> 1,
            c = -7,
            h = r ? n - 1 : 0,
            u = r ? -1 : 1,
            l = e[t + h];
          for (
            h += u, f = l & ((1 << -c) - 1), l >>= -c, c += o;
            c > 0;
            f = 256 * f + e[t + h], h += u, c -= 8
          );
          for (
            a = f & ((1 << -c) - 1), f >>= -c, c += i;
            c > 0;
            a = 256 * a + e[t + h], h += u, c -= 8
          );
          if (0 === f) f = 1 - d;
          else {
            if (f === s) return a ? NaN : (1 / 0) * (l ? -1 : 1);
            (a += Math.pow(2, i)), (f -= d);
          }
          return (l ? -1 : 1) * a * Math.pow(2, f - i);
        }),
          (t.write = function (e, t, r, i, n, f) {
            var a,
              o,
              s,
              d = 8 * f - n - 1,
              c = (1 << d) - 1,
              h = c >> 1,
              u = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
              l = i ? 0 : f - 1,
              b = i ? 1 : -1,
              p = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
            for (
              t = Math.abs(t),
                isNaN(t) || t === 1 / 0
                  ? ((o = isNaN(t) ? 1 : 0), (a = c))
                  : ((a = Math.floor(Math.log(t) / Math.LN2)),
                    t * (s = Math.pow(2, -a)) < 1 && (a--, (s *= 2)),
                    (t += a + h >= 1 ? u / s : u * Math.pow(2, 1 - h)) * s >=
                      2 && (a++, (s /= 2)),
                    a + h >= c
                      ? ((o = 0), (a = c))
                      : a + h >= 1
                      ? ((o = (t * s - 1) * Math.pow(2, n)), (a += h))
                      : ((o = t * Math.pow(2, h - 1) * Math.pow(2, n)),
                        (a = 0)));
              n >= 8;
              e[r + l] = 255 & o, l += b, o /= 256, n -= 8
            );
            for (
              a = (a << n) | o, d += n;
              d > 0;
              e[r + l] = 255 & a, l += b, a /= 256, d -= 8
            );
            e[r + l - b] |= 128 * p;
          });
      },
      5717: (e) => {
        "function" == typeof Object.create
          ? (e.exports = function (e, t) {
              t &&
                ((e.super_ = t),
                (e.prototype = Object.create(t.prototype, {
                  constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })));
            })
          : (e.exports = function (e, t) {
              if (t) {
                e.super_ = t;
                var r = function () {};
                (r.prototype = t.prototype),
                  (e.prototype = new r()),
                  (e.prototype.constructor = e);
              }
            });
      },
      5811: (e, t, r) => {
        e.exports = r(6066)(r(9653));
      },
      6066: (e, t, r) => {
        const i = r(7016),
          n = r(5675);
        e.exports = function (e) {
          const t = i(e),
            r = n(e);
          return function (e, i) {
            switch ("string" == typeof e ? e.toLowerCase() : e) {
              case "keccak224":
                return new t(1152, 448, null, 224, i);
              case "keccak256":
                return new t(1088, 512, null, 256, i);
              case "keccak384":
                return new t(832, 768, null, 384, i);
              case "keccak512":
                return new t(576, 1024, null, 512, i);
              case "sha3-224":
                return new t(1152, 448, 6, 224, i);
              case "sha3-256":
                return new t(1088, 512, 6, 256, i);
              case "sha3-384":
                return new t(832, 768, 6, 384, i);
              case "sha3-512":
                return new t(576, 1024, 6, 512, i);
              case "shake128":
                return new r(1344, 256, 31, i);
              case "shake256":
                return new r(1088, 512, 31, i);
              default:
                throw new Error("Invald algorithm: " + e);
            }
          };
        };
      },
      7016: (e, t, r) => {
        const { Transform: i } = r(5092);
        e.exports = (e) =>
          class t extends i {
            constructor(t, r, i, n, f) {
              super(f),
                (this._rate = t),
                (this._capacity = r),
                (this._delimitedSuffix = i),
                (this._hashBitLength = n),
                (this._options = f),
                (this._state = new e()),
                this._state.initialize(t, r),
                (this._finalized = !1);
            }
            _transform(e, t, r) {
              let i = null;
              try {
                this.update(e, t);
              } catch (e) {
                i = e;
              }
              r(i);
            }
            _flush(e) {
              let t = null;
              try {
                this.push(this.digest());
              } catch (e) {
                t = e;
              }
              e(t);
            }
            update(e, t) {
              if (!Buffer.isBuffer(e) && "string" != typeof e)
                throw new TypeError("Data must be a string or a buffer");
              if (this._finalized) throw new Error("Digest already called");
              return (
                Buffer.isBuffer(e) || (e = Buffer.from(e, t)),
                this._state.absorb(e),
                this
              );
            }
            digest(e) {
              if (this._finalized) throw new Error("Digest already called");
              (this._finalized = !0),
                this._delimitedSuffix &&
                  this._state.absorbLastFewBits(this._delimitedSuffix);
              let t = this._state.squeeze(this._hashBitLength / 8);
              return void 0 !== e && (t = t.toString(e)), this._resetState(), t;
            }
            _resetState() {
              return this._state.initialize(this._rate, this._capacity), this;
            }
            _clone() {
              const e = new t(
                this._rate,
                this._capacity,
                this._delimitedSuffix,
                this._hashBitLength,
                this._options
              );
              return (
                this._state.copy(e._state), (e._finalized = this._finalized), e
              );
            }
          };
      },
      5675: (e, t, r) => {
        const { Transform: i } = r(5092);
        e.exports = (e) =>
          class t extends i {
            constructor(t, r, i, n) {
              super(n),
                (this._rate = t),
                (this._capacity = r),
                (this._delimitedSuffix = i),
                (this._options = n),
                (this._state = new e()),
                this._state.initialize(t, r),
                (this._finalized = !1);
            }
            _transform(e, t, r) {
              let i = null;
              try {
                this.update(e, t);
              } catch (e) {
                i = e;
              }
              r(i);
            }
            _flush() {}
            _read(e) {
              this.push(this.squeeze(e));
            }
            update(e, t) {
              if (!Buffer.isBuffer(e) && "string" != typeof e)
                throw new TypeError("Data must be a string or a buffer");
              if (this._finalized) throw new Error("Squeeze already called");
              return (
                Buffer.isBuffer(e) || (e = Buffer.from(e, t)),
                this._state.absorb(e),
                this
              );
            }
            squeeze(e, t) {
              this._finalized ||
                ((this._finalized = !0),
                this._state.absorbLastFewBits(this._delimitedSuffix));
              let r = this._state.squeeze(e);
              return void 0 !== t && (r = r.toString(t)), r;
            }
            _resetState() {
              return this._state.initialize(this._rate, this._capacity), this;
            }
            _clone() {
              const e = new t(
                this._rate,
                this._capacity,
                this._delimitedSuffix,
                this._options
              );
              return (
                this._state.copy(e._state), (e._finalized = this._finalized), e
              );
            }
          };
      },
      4040: (e, t) => {
        const r = [
          1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0,
          2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136,
          0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648,
          32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128,
          2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648,
          32896, 2147483648, 2147483649, 0, 2147516424, 2147483648,
        ];
        t.p1600 = function (e) {
          for (let t = 0; t < 24; ++t) {
            const i = e[0] ^ e[10] ^ e[20] ^ e[30] ^ e[40],
              n = e[1] ^ e[11] ^ e[21] ^ e[31] ^ e[41],
              f = e[2] ^ e[12] ^ e[22] ^ e[32] ^ e[42],
              a = e[3] ^ e[13] ^ e[23] ^ e[33] ^ e[43],
              o = e[4] ^ e[14] ^ e[24] ^ e[34] ^ e[44],
              s = e[5] ^ e[15] ^ e[25] ^ e[35] ^ e[45],
              d = e[6] ^ e[16] ^ e[26] ^ e[36] ^ e[46],
              c = e[7] ^ e[17] ^ e[27] ^ e[37] ^ e[47],
              h = e[8] ^ e[18] ^ e[28] ^ e[38] ^ e[48],
              u = e[9] ^ e[19] ^ e[29] ^ e[39] ^ e[49];
            let l = h ^ ((f << 1) | (a >>> 31)),
              b = u ^ ((a << 1) | (f >>> 31));
            const p = e[0] ^ l,
              y = e[1] ^ b,
              m = e[10] ^ l,
              g = e[11] ^ b,
              v = e[20] ^ l,
              w = e[21] ^ b,
              M = e[30] ^ l,
              _ = e[31] ^ b,
              S = e[40] ^ l,
              A = e[41] ^ b;
            (l = i ^ ((o << 1) | (s >>> 31))),
              (b = n ^ ((s << 1) | (o >>> 31)));
            const E = e[2] ^ l,
              x = e[3] ^ b,
              R = e[12] ^ l,
              I = e[13] ^ b,
              k = e[22] ^ l,
              B = e[23] ^ b,
              L = e[32] ^ l,
              T = e[33] ^ b,
              P = e[42] ^ l,
              z = e[43] ^ b;
            (l = f ^ ((d << 1) | (c >>> 31))),
              (b = a ^ ((c << 1) | (d >>> 31)));
            const O = e[4] ^ l,
              N = e[5] ^ b,
              q = e[14] ^ l,
              C = e[15] ^ b,
              j = e[24] ^ l,
              U = e[25] ^ b,
              D = e[34] ^ l,
              F = e[35] ^ b,
              K = e[44] ^ l,
              W = e[45] ^ b;
            (l = o ^ ((h << 1) | (u >>> 31))),
              (b = s ^ ((u << 1) | (h >>> 31)));
            const H = e[6] ^ l,
              V = e[7] ^ b,
              Z = e[16] ^ l,
              $ = e[17] ^ b,
              Y = e[26] ^ l,
              J = e[27] ^ b,
              X = e[36] ^ l,
              G = e[37] ^ b,
              Q = e[46] ^ l,
              ee = e[47] ^ b;
            (l = d ^ ((i << 1) | (n >>> 31))),
              (b = c ^ ((n << 1) | (i >>> 31)));
            const te = e[8] ^ l,
              re = e[9] ^ b,
              ie = e[18] ^ l,
              ne = e[19] ^ b,
              fe = e[28] ^ l,
              ae = e[29] ^ b,
              oe = e[38] ^ l,
              se = e[39] ^ b,
              de = e[48] ^ l,
              ce = e[49] ^ b,
              he = p,
              ue = y,
              le = (g << 4) | (m >>> 28),
              be = (m << 4) | (g >>> 28),
              pe = (v << 3) | (w >>> 29),
              ye = (w << 3) | (v >>> 29),
              me = (_ << 9) | (M >>> 23),
              ge = (M << 9) | (_ >>> 23),
              ve = (S << 18) | (A >>> 14),
              we = (A << 18) | (S >>> 14),
              Me = (E << 1) | (x >>> 31),
              _e = (x << 1) | (E >>> 31),
              Se = (I << 12) | (R >>> 20),
              Ae = (R << 12) | (I >>> 20),
              Ee = (k << 10) | (B >>> 22),
              xe = (B << 10) | (k >>> 22),
              Re = (T << 13) | (L >>> 19),
              Ie = (L << 13) | (T >>> 19),
              ke = (P << 2) | (z >>> 30),
              Be = (z << 2) | (P >>> 30),
              Le = (N << 30) | (O >>> 2),
              Te = (O << 30) | (N >>> 2),
              Pe = (q << 6) | (C >>> 26),
              ze = (C << 6) | (q >>> 26),
              Oe = (U << 11) | (j >>> 21),
              Ne = (j << 11) | (U >>> 21),
              qe = (D << 15) | (F >>> 17),
              Ce = (F << 15) | (D >>> 17),
              je = (W << 29) | (K >>> 3),
              Ue = (K << 29) | (W >>> 3),
              De = (H << 28) | (V >>> 4),
              Fe = (V << 28) | (H >>> 4),
              Ke = ($ << 23) | (Z >>> 9),
              We = (Z << 23) | ($ >>> 9),
              He = (Y << 25) | (J >>> 7),
              Ve = (J << 25) | (Y >>> 7),
              Ze = (X << 21) | (G >>> 11),
              $e = (G << 21) | (X >>> 11),
              Ye = (ee << 24) | (Q >>> 8),
              Je = (Q << 24) | (ee >>> 8),
              Xe = (te << 27) | (re >>> 5),
              Ge = (re << 27) | (te >>> 5),
              Qe = (ie << 20) | (ne >>> 12),
              et = (ne << 20) | (ie >>> 12),
              tt = (ae << 7) | (fe >>> 25),
              rt = (fe << 7) | (ae >>> 25),
              it = (oe << 8) | (se >>> 24),
              nt = (se << 8) | (oe >>> 24),
              ft = (de << 14) | (ce >>> 18),
              at = (ce << 14) | (de >>> 18);
            (e[0] = he ^ (~Se & Oe)),
              (e[1] = ue ^ (~Ae & Ne)),
              (e[10] = De ^ (~Qe & pe)),
              (e[11] = Fe ^ (~et & ye)),
              (e[20] = Me ^ (~Pe & He)),
              (e[21] = _e ^ (~ze & Ve)),
              (e[30] = Xe ^ (~le & Ee)),
              (e[31] = Ge ^ (~be & xe)),
              (e[40] = Le ^ (~Ke & tt)),
              (e[41] = Te ^ (~We & rt)),
              (e[2] = Se ^ (~Oe & Ze)),
              (e[3] = Ae ^ (~Ne & $e)),
              (e[12] = Qe ^ (~pe & Re)),
              (e[13] = et ^ (~ye & Ie)),
              (e[22] = Pe ^ (~He & it)),
              (e[23] = ze ^ (~Ve & nt)),
              (e[32] = le ^ (~Ee & qe)),
              (e[33] = be ^ (~xe & Ce)),
              (e[42] = Ke ^ (~tt & me)),
              (e[43] = We ^ (~rt & ge)),
              (e[4] = Oe ^ (~Ze & ft)),
              (e[5] = Ne ^ (~$e & at)),
              (e[14] = pe ^ (~Re & je)),
              (e[15] = ye ^ (~Ie & Ue)),
              (e[24] = He ^ (~it & ve)),
              (e[25] = Ve ^ (~nt & we)),
              (e[34] = Ee ^ (~qe & Ye)),
              (e[35] = xe ^ (~Ce & Je)),
              (e[44] = tt ^ (~me & ke)),
              (e[45] = rt ^ (~ge & Be)),
              (e[6] = Ze ^ (~ft & he)),
              (e[7] = $e ^ (~at & ue)),
              (e[16] = Re ^ (~je & De)),
              (e[17] = Ie ^ (~Ue & Fe)),
              (e[26] = it ^ (~ve & Me)),
              (e[27] = nt ^ (~we & _e)),
              (e[36] = qe ^ (~Ye & Xe)),
              (e[37] = Ce ^ (~Je & Ge)),
              (e[46] = me ^ (~ke & Le)),
              (e[47] = ge ^ (~Be & Te)),
              (e[8] = ft ^ (~he & Se)),
              (e[9] = at ^ (~ue & Ae)),
              (e[18] = je ^ (~De & Qe)),
              (e[19] = Ue ^ (~Fe & et)),
              (e[28] = ve ^ (~Me & Pe)),
              (e[29] = we ^ (~_e & ze)),
              (e[38] = Ye ^ (~Xe & le)),
              (e[39] = Je ^ (~Ge & be)),
              (e[48] = ke ^ (~Le & Ke)),
              (e[49] = Be ^ (~Te & We)),
              (e[0] ^= r[2 * t]),
              (e[1] ^= r[2 * t + 1]);
          }
        };
      },
      9653: (e, t, r) => {
        const i = r(4040);
        function n() {
          (this.state = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0,
          ]),
            (this.blockSize = null),
            (this.count = 0),
            (this.squeezing = !1);
        }
        (n.prototype.initialize = function (e, t) {
          for (let e = 0; e < 50; ++e) this.state[e] = 0;
          (this.blockSize = e / 8), (this.count = 0), (this.squeezing = !1);
        }),
          (n.prototype.absorb = function (e) {
            for (let t = 0; t < e.length; ++t)
              (this.state[~~(this.count / 4)] ^=
                e[t] << ((this.count % 4) * 8)),
                (this.count += 1),
                this.count === this.blockSize &&
                  (i.p1600(this.state), (this.count = 0));
          }),
          (n.prototype.absorbLastFewBits = function (e) {
            (this.state[~~(this.count / 4)] ^= e << ((this.count % 4) * 8)),
              0 != (128 & e) &&
                this.count === this.blockSize - 1 &&
                i.p1600(this.state),
              (this.state[~~((this.blockSize - 1) / 4)] ^=
                128 << (((this.blockSize - 1) % 4) * 8)),
              i.p1600(this.state),
              (this.count = 0),
              (this.squeezing = !0);
          }),
          (n.prototype.squeeze = function (e) {
            this.squeezing || this.absorbLastFewBits(1);
            const t = Buffer.alloc(e);
            for (let r = 0; r < e; ++r)
              (t[r] =
                (this.state[~~(this.count / 4)] >>> ((this.count % 4) * 8)) &
                255),
                (this.count += 1),
                this.count === this.blockSize &&
                  (i.p1600(this.state), (this.count = 0));
            return t;
          }),
          (n.prototype.copy = function (e) {
            for (let t = 0; t < 50; ++t) e.state[t] = this.state[t];
            (e.blockSize = this.blockSize),
              (e.count = this.count),
              (e.squeezing = this.squeezing);
          }),
          (e.exports = n);
      },
      7630: (e) => {
        "use strict";
        var t = {};
        function r(e, r, i) {
          i || (i = Error);
          var n = (function (e) {
            var t, i;
            function n(t, i, n) {
              return (
                e.call(
                  this,
                  (function (e, t, i) {
                    return "string" == typeof r ? r : r(e, t, i);
                  })(t, i, n)
                ) || this
              );
            }
            return (
              (i = e),
              ((t = n).prototype = Object.create(i.prototype)),
              (t.prototype.constructor = t),
              (t.__proto__ = i),
              n
            );
          })(i);
          (n.prototype.name = i.name), (n.prototype.code = e), (t[e] = n);
        }
        function i(e, t) {
          if (Array.isArray(e)) {
            var r = e.length;
            return (
              (e = e.map(function (e) {
                return String(e);
              })),
              r > 2
                ? "one of "
                    .concat(t, " ")
                    .concat(e.slice(0, r - 1).join(", "), ", or ") + e[r - 1]
                : 2 === r
                ? "one of ".concat(t, " ").concat(e[0], " or ").concat(e[1])
                : "of ".concat(t, " ").concat(e[0])
            );
          }
          return "of ".concat(t, " ").concat(String(e));
        }
        r(
          "ERR_INVALID_OPT_VALUE",
          function (e, t) {
            return 'The value "' + t + '" is invalid for option "' + e + '"';
          },
          TypeError
        ),
          r(
            "ERR_INVALID_ARG_TYPE",
            function (e, t, r) {
              var n, f, a, o, s;
              if (
                ("string" == typeof t && ((f = "not "), t.substr(0, 4) === f)
                  ? ((n = "must not be"), (t = t.replace(/^not /, "")))
                  : (n = "must be"),
                (function (e, t, r) {
                  return (
                    (void 0 === r || r > e.length) && (r = e.length),
                    e.substring(r - 9, r) === t
                  );
                })(e, " argument"))
              )
                a = "The ".concat(e, " ").concat(n, " ").concat(i(t, "type"));
              else {
                var d =
                  ("number" != typeof s && (s = 0),
                  s + 1 > (o = e).length || -1 === o.indexOf(".", s)
                    ? "argument"
                    : "property");
                a = 'The "'
                  .concat(e, '" ')
                  .concat(d, " ")
                  .concat(n, " ")
                  .concat(i(t, "type"));
              }
              return a + ". Received type ".concat(typeof r);
            },
            TypeError
          ),
          r("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"),
          r("ERR_METHOD_NOT_IMPLEMENTED", function (e) {
            return "The " + e + " method is not implemented";
          }),
          r("ERR_STREAM_PREMATURE_CLOSE", "Premature close"),
          r("ERR_STREAM_DESTROYED", function (e) {
            return "Cannot call " + e + " after a stream was destroyed";
          }),
          r("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"),
          r("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"),
          r("ERR_STREAM_WRITE_AFTER_END", "write after end"),
          r(
            "ERR_STREAM_NULL_VALUES",
            "May not write null values to stream",
            TypeError
          ),
          r(
            "ERR_UNKNOWN_ENCODING",
            function (e) {
              return "Unknown encoding: " + e;
            },
            TypeError
          ),
          r(
            "ERR_STREAM_UNSHIFT_AFTER_END_EVENT",
            "stream.unshift() after end event"
          ),
          (e.exports.q = t);
      },
      7735: (e, t, r) => {
        "use strict";
        var i =
          Object.keys ||
          function (e) {
            var t = [];
            for (var r in e) t.push(r);
            return t;
          };
        e.exports = d;
        var n = r(3875),
          f = r(9843);
        r(5717)(d, n);
        for (var a = i(f.prototype), o = 0; o < a.length; o++) {
          var s = a[o];
          d.prototype[s] || (d.prototype[s] = f.prototype[s]);
        }
        function d(e) {
          if (!(this instanceof d)) return new d(e);
          n.call(this, e),
            f.call(this, e),
            (this.allowHalfOpen = !0),
            e &&
              (!1 === e.readable && (this.readable = !1),
              !1 === e.writable && (this.writable = !1),
              !1 === e.allowHalfOpen &&
                ((this.allowHalfOpen = !1), this.once("end", c)));
        }
        function c() {
          this._writableState.ended || process.nextTick(h, this);
        }
        function h(e) {
          e.end();
        }
        Object.defineProperty(d.prototype, "writableHighWaterMark", {
          enumerable: !1,
          get: function () {
            return this._writableState.highWaterMark;
          },
        }),
          Object.defineProperty(d.prototype, "writableBuffer", {
            enumerable: !1,
            get: function () {
              return this._writableState && this._writableState.getBuffer();
            },
          }),
          Object.defineProperty(d.prototype, "writableLength", {
            enumerable: !1,
            get: function () {
              return this._writableState.length;
            },
          }),
          Object.defineProperty(d.prototype, "destroyed", {
            enumerable: !1,
            get: function () {
              return (
                void 0 !== this._readableState &&
                void 0 !== this._writableState &&
                this._readableState.destroyed &&
                this._writableState.destroyed
              );
            },
            set: function (e) {
              void 0 !== this._readableState &&
                void 0 !== this._writableState &&
                ((this._readableState.destroyed = e),
                (this._writableState.destroyed = e));
            },
          });
      },
      6485: (e, t, r) => {
        "use strict";
        e.exports = n;
        var i = r(6311);
        function n(e) {
          if (!(this instanceof n)) return new n(e);
          i.call(this, e);
        }
        r(5717)(n, i),
          (n.prototype._transform = function (e, t, r) {
            r(null, e);
          });
      },
      3875: (e, t, r) => {
        "use strict";
        var i;
        (e.exports = A), (A.ReadableState = S), r(7187).EventEmitter;
        var n,
          f = function (e, t) {
            return e.listeners(t).length;
          },
          a = r(9868),
          o = r(8764).Buffer,
          s =
            (void 0 !== r.g
              ? r.g
              : "undefined" != typeof window
              ? window
              : "undefined" != typeof self
              ? self
              : {}
            ).Uint8Array || function () {},
          d = r(6586);
        n = d && d.debuglog ? d.debuglog("stream") : function () {};
        var c,
          h,
          u,
          l = r(7983),
          b = r(3505),
          p = r(5482).getHighWaterMark,
          y = r(7630).q,
          m = y.ERR_INVALID_ARG_TYPE,
          g = y.ERR_STREAM_PUSH_AFTER_EOF,
          v = y.ERR_METHOD_NOT_IMPLEMENTED,
          w = y.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
        r(5717)(A, a);
        var M = b.errorOrDestroy,
          _ = ["error", "close", "destroy", "pause", "resume"];
        function S(e, t, n) {
          (i = i || r(7735)),
            (e = e || {}),
            "boolean" != typeof n && (n = t instanceof i),
            (this.objectMode = !!e.objectMode),
            n && (this.objectMode = this.objectMode || !!e.readableObjectMode),
            (this.highWaterMark = p(this, e, "readableHighWaterMark", n)),
            (this.buffer = new l()),
            (this.length = 0),
            (this.pipes = null),
            (this.pipesCount = 0),
            (this.flowing = null),
            (this.ended = !1),
            (this.endEmitted = !1),
            (this.reading = !1),
            (this.sync = !0),
            (this.needReadable = !1),
            (this.emittedReadable = !1),
            (this.readableListening = !1),
            (this.resumeScheduled = !1),
            (this.paused = !0),
            (this.emitClose = !1 !== e.emitClose),
            (this.autoDestroy = !!e.autoDestroy),
            (this.destroyed = !1),
            (this.defaultEncoding = e.defaultEncoding || "utf8"),
            (this.awaitDrain = 0),
            (this.readingMore = !1),
            (this.decoder = null),
            (this.encoding = null),
            e.encoding &&
              (c || (c = r(2553).s),
              (this.decoder = new c(e.encoding)),
              (this.encoding = e.encoding));
        }
        function A(e) {
          if (((i = i || r(7735)), !(this instanceof A))) return new A(e);
          var t = this instanceof i;
          (this._readableState = new S(e, this, t)),
            (this.readable = !0),
            e &&
              ("function" == typeof e.read && (this._read = e.read),
              "function" == typeof e.destroy && (this._destroy = e.destroy)),
            a.call(this);
        }
        function E(e, t, r, i, f) {
          n("readableAddChunk", t);
          var a,
            d = e._readableState;
          if (null === t)
            (d.reading = !1),
              (function (e, t) {
                if ((n("onEofChunk"), !t.ended)) {
                  if (t.decoder) {
                    var r = t.decoder.end();
                    r &&
                      r.length &&
                      (t.buffer.push(r),
                      (t.length += t.objectMode ? 1 : r.length));
                  }
                  (t.ended = !0),
                    t.sync
                      ? k(e)
                      : ((t.needReadable = !1),
                        t.emittedReadable || ((t.emittedReadable = !0), B(e)));
                }
              })(e, d);
          else if (
            (f ||
              (a = (function (e, t) {
                var r, i;
                return (
                  (i = t),
                  o.isBuffer(i) ||
                    i instanceof s ||
                    "string" == typeof t ||
                    void 0 === t ||
                    e.objectMode ||
                    (r = new m("chunk", ["string", "Buffer", "Uint8Array"], t)),
                  r
                );
              })(d, t)),
            a)
          )
            M(e, a);
          else if (d.objectMode || (t && t.length > 0))
            if (
              ("string" == typeof t ||
                d.objectMode ||
                Object.getPrototypeOf(t) === o.prototype ||
                (t = (function (e) {
                  return o.from(e);
                })(t)),
              i)
            )
              d.endEmitted ? M(e, new w()) : x(e, d, t, !0);
            else if (d.ended) M(e, new g());
            else {
              if (d.destroyed) return !1;
              (d.reading = !1),
                d.decoder && !r
                  ? ((t = d.decoder.write(t)),
                    d.objectMode || 0 !== t.length ? x(e, d, t, !1) : L(e, d))
                  : x(e, d, t, !1);
            }
          else i || ((d.reading = !1), L(e, d));
          return !d.ended && (d.length < d.highWaterMark || 0 === d.length);
        }
        function x(e, t, r, i) {
          t.flowing && 0 === t.length && !t.sync
            ? ((t.awaitDrain = 0), e.emit("data", r))
            : ((t.length += t.objectMode ? 1 : r.length),
              i ? t.buffer.unshift(r) : t.buffer.push(r),
              t.needReadable && k(e)),
            L(e, t);
        }
        Object.defineProperty(A.prototype, "destroyed", {
          enumerable: !1,
          get: function () {
            return (
              void 0 !== this._readableState && this._readableState.destroyed
            );
          },
          set: function (e) {
            this._readableState && (this._readableState.destroyed = e);
          },
        }),
          (A.prototype.destroy = b.destroy),
          (A.prototype._undestroy = b.undestroy),
          (A.prototype._destroy = function (e, t) {
            t(e);
          }),
          (A.prototype.push = function (e, t) {
            var r,
              i = this._readableState;
            return (
              i.objectMode
                ? (r = !0)
                : "string" == typeof e &&
                  ((t = t || i.defaultEncoding) !== i.encoding &&
                    ((e = o.from(e, t)), (t = "")),
                  (r = !0)),
              E(this, e, t, !1, r)
            );
          }),
          (A.prototype.unshift = function (e) {
            return E(this, e, null, !0, !1);
          }),
          (A.prototype.isPaused = function () {
            return !1 === this._readableState.flowing;
          }),
          (A.prototype.setEncoding = function (e) {
            c || (c = r(2553).s);
            var t = new c(e);
            (this._readableState.decoder = t),
              (this._readableState.encoding =
                this._readableState.decoder.encoding);
            for (var i = this._readableState.buffer.head, n = ""; null !== i; )
              (n += t.write(i.data)), (i = i.next);
            return (
              this._readableState.buffer.clear(),
              "" !== n && this._readableState.buffer.push(n),
              (this._readableState.length = n.length),
              this
            );
          });
        var R = 1073741824;
        function I(e, t) {
          return e <= 0 || (0 === t.length && t.ended)
            ? 0
            : t.objectMode
            ? 1
            : e != e
            ? t.flowing && t.length
              ? t.buffer.head.data.length
              : t.length
            : (e > t.highWaterMark &&
                (t.highWaterMark = (function (e) {
                  return (
                    e >= R
                      ? (e = R)
                      : (e--,
                        (e |= e >>> 1),
                        (e |= e >>> 2),
                        (e |= e >>> 4),
                        (e |= e >>> 8),
                        (e |= e >>> 16),
                        e++),
                    e
                  );
                })(e)),
              e <= t.length
                ? e
                : t.ended
                ? t.length
                : ((t.needReadable = !0), 0));
        }
        function k(e) {
          var t = e._readableState;
          n("emitReadable", t.needReadable, t.emittedReadable),
            (t.needReadable = !1),
            t.emittedReadable ||
              (n("emitReadable", t.flowing),
              (t.emittedReadable = !0),
              process.nextTick(B, e));
        }
        function B(e) {
          var t = e._readableState;
          n("emitReadable_", t.destroyed, t.length, t.ended),
            t.destroyed ||
              (!t.length && !t.ended) ||
              (e.emit("readable"), (t.emittedReadable = !1)),
            (t.needReadable =
              !t.flowing && !t.ended && t.length <= t.highWaterMark),
            N(e);
        }
        function L(e, t) {
          t.readingMore || ((t.readingMore = !0), process.nextTick(T, e, t));
        }
        function T(e, t) {
          for (
            ;
            !t.reading &&
            !t.ended &&
            (t.length < t.highWaterMark || (t.flowing && 0 === t.length));

          ) {
            var r = t.length;
            if ((n("maybeReadMore read 0"), e.read(0), r === t.length)) break;
          }
          t.readingMore = !1;
        }
        function P(e) {
          var t = e._readableState;
          (t.readableListening = e.listenerCount("readable") > 0),
            t.resumeScheduled && !t.paused
              ? (t.flowing = !0)
              : e.listenerCount("data") > 0 && e.resume();
        }
        function z(e) {
          n("readable nexttick read 0"), e.read(0);
        }
        function O(e, t) {
          n("resume", t.reading),
            t.reading || e.read(0),
            (t.resumeScheduled = !1),
            e.emit("resume"),
            N(e),
            t.flowing && !t.reading && e.read(0);
        }
        function N(e) {
          var t = e._readableState;
          for (n("flow", t.flowing); t.flowing && null !== e.read(); );
        }
        function q(e, t) {
          return 0 === t.length
            ? null
            : (t.objectMode
                ? (r = t.buffer.shift())
                : !e || e >= t.length
                ? ((r = t.decoder
                    ? t.buffer.join("")
                    : 1 === t.buffer.length
                    ? t.buffer.first()
                    : t.buffer.concat(t.length)),
                  t.buffer.clear())
                : (r = t.buffer.consume(e, t.decoder)),
              r);
          var r;
        }
        function C(e) {
          var t = e._readableState;
          n("endReadable", t.endEmitted),
            t.endEmitted || ((t.ended = !0), process.nextTick(j, t, e));
        }
        function j(e, t) {
          if (
            (n("endReadableNT", e.endEmitted, e.length),
            !e.endEmitted &&
              0 === e.length &&
              ((e.endEmitted = !0),
              (t.readable = !1),
              t.emit("end"),
              e.autoDestroy))
          ) {
            var r = t._writableState;
            (!r || (r.autoDestroy && r.finished)) && t.destroy();
          }
        }
        function U(e, t) {
          for (var r = 0, i = e.length; r < i; r++) if (e[r] === t) return r;
          return -1;
        }
        (A.prototype.read = function (e) {
          n("read", e), (e = parseInt(e, 10));
          var t = this._readableState,
            r = e;
          if (
            (0 !== e && (t.emittedReadable = !1),
            0 === e &&
              t.needReadable &&
              ((0 !== t.highWaterMark
                ? t.length >= t.highWaterMark
                : t.length > 0) ||
                t.ended))
          )
            return (
              n("read: emitReadable", t.length, t.ended),
              0 === t.length && t.ended ? C(this) : k(this),
              null
            );
          if (0 === (e = I(e, t)) && t.ended)
            return 0 === t.length && C(this), null;
          var i,
            f = t.needReadable;
          return (
            n("need readable", f),
            (0 === t.length || t.length - e < t.highWaterMark) &&
              n("length less than watermark", (f = !0)),
            t.ended || t.reading
              ? n("reading or ended", (f = !1))
              : f &&
                (n("do read"),
                (t.reading = !0),
                (t.sync = !0),
                0 === t.length && (t.needReadable = !0),
                this._read(t.highWaterMark),
                (t.sync = !1),
                t.reading || (e = I(r, t))),
            null === (i = e > 0 ? q(e, t) : null)
              ? ((t.needReadable = t.length <= t.highWaterMark), (e = 0))
              : ((t.length -= e), (t.awaitDrain = 0)),
            0 === t.length &&
              (t.ended || (t.needReadable = !0), r !== e && t.ended && C(this)),
            null !== i && this.emit("data", i),
            i
          );
        }),
          (A.prototype._read = function (e) {
            M(this, new v("_read()"));
          }),
          (A.prototype.pipe = function (e, t) {
            var r = this,
              i = this._readableState;
            switch (i.pipesCount) {
              case 0:
                i.pipes = e;
                break;
              case 1:
                i.pipes = [i.pipes, e];
                break;
              default:
                i.pipes.push(e);
            }
            (i.pipesCount += 1), n("pipe count=%d opts=%j", i.pipesCount, t);
            var a =
              (t && !1 === t.end) ||
              e === process.stdout ||
              e === process.stderr
                ? b
                : o;
            function o() {
              n("onend"), e.end();
            }
            i.endEmitted ? process.nextTick(a) : r.once("end", a),
              e.on("unpipe", function t(f, a) {
                n("onunpipe"),
                  f === r &&
                    a &&
                    !1 === a.hasUnpiped &&
                    ((a.hasUnpiped = !0),
                    n("cleanup"),
                    e.removeListener("close", u),
                    e.removeListener("finish", l),
                    e.removeListener("drain", s),
                    e.removeListener("error", h),
                    e.removeListener("unpipe", t),
                    r.removeListener("end", o),
                    r.removeListener("end", b),
                    r.removeListener("data", c),
                    (d = !0),
                    !i.awaitDrain ||
                      (e._writableState && !e._writableState.needDrain) ||
                      s());
              });
            var s = (function (e) {
              return function () {
                var t = e._readableState;
                n("pipeOnDrain", t.awaitDrain),
                  t.awaitDrain && t.awaitDrain--,
                  0 === t.awaitDrain &&
                    f(e, "data") &&
                    ((t.flowing = !0), N(e));
              };
            })(r);
            e.on("drain", s);
            var d = !1;
            function c(t) {
              n("ondata");
              var f = e.write(t);
              n("dest.write", f),
                !1 === f &&
                  (((1 === i.pipesCount && i.pipes === e) ||
                    (i.pipesCount > 1 && -1 !== U(i.pipes, e))) &&
                    !d &&
                    (n("false write response, pause", i.awaitDrain),
                    i.awaitDrain++),
                  r.pause());
            }
            function h(t) {
              n("onerror", t),
                b(),
                e.removeListener("error", h),
                0 === f(e, "error") && M(e, t);
            }
            function u() {
              e.removeListener("finish", l), b();
            }
            function l() {
              n("onfinish"), e.removeListener("close", u), b();
            }
            function b() {
              n("unpipe"), r.unpipe(e);
            }
            return (
              r.on("data", c),
              (function (e, t, r) {
                if ("function" == typeof e.prependListener)
                  return e.prependListener(t, r);
                e._events && e._events[t]
                  ? Array.isArray(e._events[t])
                    ? e._events[t].unshift(r)
                    : (e._events[t] = [r, e._events[t]])
                  : e.on(t, r);
              })(e, "error", h),
              e.once("close", u),
              e.once("finish", l),
              e.emit("pipe", r),
              i.flowing || (n("pipe resume"), r.resume()),
              e
            );
          }),
          (A.prototype.unpipe = function (e) {
            var t = this._readableState,
              r = { hasUnpiped: !1 };
            if (0 === t.pipesCount) return this;
            if (1 === t.pipesCount)
              return (
                (e && e !== t.pipes) ||
                  (e || (e = t.pipes),
                  (t.pipes = null),
                  (t.pipesCount = 0),
                  (t.flowing = !1),
                  e && e.emit("unpipe", this, r)),
                this
              );
            if (!e) {
              var i = t.pipes,
                n = t.pipesCount;
              (t.pipes = null), (t.pipesCount = 0), (t.flowing = !1);
              for (var f = 0; f < n; f++)
                i[f].emit("unpipe", this, { hasUnpiped: !1 });
              return this;
            }
            var a = U(t.pipes, e);
            return (
              -1 === a ||
                (t.pipes.splice(a, 1),
                (t.pipesCount -= 1),
                1 === t.pipesCount && (t.pipes = t.pipes[0]),
                e.emit("unpipe", this, r)),
              this
            );
          }),
          (A.prototype.on = function (e, t) {
            var r = a.prototype.on.call(this, e, t),
              i = this._readableState;
            return (
              "data" === e
                ? ((i.readableListening = this.listenerCount("readable") > 0),
                  !1 !== i.flowing && this.resume())
                : "readable" === e &&
                  (i.endEmitted ||
                    i.readableListening ||
                    ((i.readableListening = i.needReadable = !0),
                    (i.flowing = !1),
                    (i.emittedReadable = !1),
                    n("on readable", i.length, i.reading),
                    i.length
                      ? k(this)
                      : i.reading || process.nextTick(z, this))),
              r
            );
          }),
          (A.prototype.addListener = A.prototype.on),
          (A.prototype.removeListener = function (e, t) {
            var r = a.prototype.removeListener.call(this, e, t);
            return "readable" === e && process.nextTick(P, this), r;
          }),
          (A.prototype.removeAllListeners = function (e) {
            var t = a.prototype.removeAllListeners.apply(this, arguments);
            return (
              ("readable" !== e && void 0 !== e) || process.nextTick(P, this), t
            );
          }),
          (A.prototype.resume = function () {
            var e = this._readableState;
            return (
              e.flowing ||
                (n("resume"),
                (e.flowing = !e.readableListening),
                (function (e, t) {
                  t.resumeScheduled ||
                    ((t.resumeScheduled = !0), process.nextTick(O, e, t));
                })(this, e)),
              (e.paused = !1),
              this
            );
          }),
          (A.prototype.pause = function () {
            return (
              n("call pause flowing=%j", this._readableState.flowing),
              !1 !== this._readableState.flowing &&
                (n("pause"),
                (this._readableState.flowing = !1),
                this.emit("pause")),
              (this._readableState.paused = !0),
              this
            );
          }),
          (A.prototype.wrap = function (e) {
            var t = this,
              r = this._readableState,
              i = !1;
            for (var f in (e.on("end", function () {
              if ((n("wrapped end"), r.decoder && !r.ended)) {
                var e = r.decoder.end();
                e && e.length && t.push(e);
              }
              t.push(null);
            }),
            e.on("data", function (f) {
              n("wrapped data"),
                r.decoder && (f = r.decoder.write(f)),
                (r.objectMode && null == f) ||
                  ((r.objectMode || (f && f.length)) &&
                    (t.push(f) || ((i = !0), e.pause())));
            }),
            e))
              void 0 === this[f] &&
                "function" == typeof e[f] &&
                (this[f] = (function (t) {
                  return function () {
                    return e[t].apply(e, arguments);
                  };
                })(f));
            for (var a = 0; a < _.length; a++)
              e.on(_[a], this.emit.bind(this, _[a]));
            return (
              (this._read = function (t) {
                n("wrapped _read", t), i && ((i = !1), e.resume());
              }),
              this
            );
          }),
          "function" == typeof Symbol &&
            (A.prototype[Symbol.asyncIterator] = function () {
              return void 0 === h && (h = r(3471)), h(this);
            }),
          Object.defineProperty(A.prototype, "readableHighWaterMark", {
            enumerable: !1,
            get: function () {
              return this._readableState.highWaterMark;
            },
          }),
          Object.defineProperty(A.prototype, "readableBuffer", {
            enumerable: !1,
            get: function () {
              return this._readableState && this._readableState.buffer;
            },
          }),
          Object.defineProperty(A.prototype, "readableFlowing", {
            enumerable: !1,
            get: function () {
              return this._readableState.flowing;
            },
            set: function (e) {
              this._readableState && (this._readableState.flowing = e);
            },
          }),
          (A._fromList = q),
          Object.defineProperty(A.prototype, "readableLength", {
            enumerable: !1,
            get: function () {
              return this._readableState.length;
            },
          }),
          "function" == typeof Symbol &&
            (A.from = function (e, t) {
              return void 0 === u && (u = r(6435)), u(A, e, t);
            });
      },
      6311: (e, t, r) => {
        "use strict";
        e.exports = c;
        var i = r(7630).q,
          n = i.ERR_METHOD_NOT_IMPLEMENTED,
          f = i.ERR_MULTIPLE_CALLBACK,
          a = i.ERR_TRANSFORM_ALREADY_TRANSFORMING,
          o = i.ERR_TRANSFORM_WITH_LENGTH_0,
          s = r(7735);
        function d(e, t) {
          var r = this._transformState;
          r.transforming = !1;
          var i = r.writecb;
          if (null === i) return this.emit("error", new f());
          (r.writechunk = null),
            (r.writecb = null),
            null != t && this.push(t),
            i(e);
          var n = this._readableState;
          (n.reading = !1),
            (n.needReadable || n.length < n.highWaterMark) &&
              this._read(n.highWaterMark);
        }
        function c(e) {
          if (!(this instanceof c)) return new c(e);
          s.call(this, e),
            (this._transformState = {
              afterTransform: d.bind(this),
              needTransform: !1,
              transforming: !1,
              writecb: null,
              writechunk: null,
              writeencoding: null,
            }),
            (this._readableState.needReadable = !0),
            (this._readableState.sync = !1),
            e &&
              ("function" == typeof e.transform &&
                (this._transform = e.transform),
              "function" == typeof e.flush && (this._flush = e.flush)),
            this.on("prefinish", h);
        }
        function h() {
          var e = this;
          "function" != typeof this._flush || this._readableState.destroyed
            ? u(this, null, null)
            : this._flush(function (t, r) {
                u(e, t, r);
              });
        }
        function u(e, t, r) {
          if (t) return e.emit("error", t);
          if ((null != r && e.push(r), e._writableState.length)) throw new o();
          if (e._transformState.transforming) throw new a();
          return e.push(null);
        }
        r(5717)(c, s),
          (c.prototype.push = function (e, t) {
            return (
              (this._transformState.needTransform = !1),
              s.prototype.push.call(this, e, t)
            );
          }),
          (c.prototype._transform = function (e, t, r) {
            r(new n("_transform()"));
          }),
          (c.prototype._write = function (e, t, r) {
            var i = this._transformState;
            if (
              ((i.writecb = r),
              (i.writechunk = e),
              (i.writeencoding = t),
              !i.transforming)
            ) {
              var n = this._readableState;
              (i.needTransform ||
                n.needReadable ||
                n.length < n.highWaterMark) &&
                this._read(n.highWaterMark);
            }
          }),
          (c.prototype._read = function (e) {
            var t = this._transformState;
            null === t.writechunk || t.transforming
              ? (t.needTransform = !0)
              : ((t.transforming = !0),
                this._transform(
                  t.writechunk,
                  t.writeencoding,
                  t.afterTransform
                ));
          }),
          (c.prototype._destroy = function (e, t) {
            s.prototype._destroy.call(this, e, function (e) {
              t(e);
            });
          });
      },
      9843: (e, t, r) => {
        "use strict";
        function i(e) {
          var t = this;
          (this.next = null),
            (this.entry = null),
            (this.finish = function () {
              !(function (e, t, r) {
                var i = e.entry;
                for (e.entry = null; i; ) {
                  var n = i.callback;
                  t.pendingcb--, n(undefined), (i = i.next);
                }
                t.corkedRequestsFree.next = e;
              })(t, e);
            });
        }
        var n;
        (e.exports = A), (A.WritableState = S);
        var f,
          a = { deprecate: r(4927) },
          o = r(9868),
          s = r(8764).Buffer,
          d =
            (void 0 !== r.g
              ? r.g
              : "undefined" != typeof window
              ? window
              : "undefined" != typeof self
              ? self
              : {}
            ).Uint8Array || function () {},
          c = r(3505),
          h = r(5482).getHighWaterMark,
          u = r(7630).q,
          l = u.ERR_INVALID_ARG_TYPE,
          b = u.ERR_METHOD_NOT_IMPLEMENTED,
          p = u.ERR_MULTIPLE_CALLBACK,
          y = u.ERR_STREAM_CANNOT_PIPE,
          m = u.ERR_STREAM_DESTROYED,
          g = u.ERR_STREAM_NULL_VALUES,
          v = u.ERR_STREAM_WRITE_AFTER_END,
          w = u.ERR_UNKNOWN_ENCODING,
          M = c.errorOrDestroy;
        function _() {}
        function S(e, t, f) {
          (n = n || r(7735)),
            (e = e || {}),
            "boolean" != typeof f && (f = t instanceof n),
            (this.objectMode = !!e.objectMode),
            f && (this.objectMode = this.objectMode || !!e.writableObjectMode),
            (this.highWaterMark = h(this, e, "writableHighWaterMark", f)),
            (this.finalCalled = !1),
            (this.needDrain = !1),
            (this.ending = !1),
            (this.ended = !1),
            (this.finished = !1),
            (this.destroyed = !1);
          var a = !1 === e.decodeStrings;
          (this.decodeStrings = !a),
            (this.defaultEncoding = e.defaultEncoding || "utf8"),
            (this.length = 0),
            (this.writing = !1),
            (this.corked = 0),
            (this.sync = !0),
            (this.bufferProcessing = !1),
            (this.onwrite = function (e) {
              !(function (e, t) {
                var r = e._writableState,
                  i = r.sync,
                  n = r.writecb;
                if ("function" != typeof n) throw new p();
                if (
                  ((function (e) {
                    (e.writing = !1),
                      (e.writecb = null),
                      (e.length -= e.writelen),
                      (e.writelen = 0);
                  })(r),
                  t)
                )
                  !(function (e, t, r, i, n) {
                    --t.pendingcb,
                      r
                        ? (process.nextTick(n, i),
                          process.nextTick(B, e, t),
                          (e._writableState.errorEmitted = !0),
                          M(e, i))
                        : (n(i),
                          (e._writableState.errorEmitted = !0),
                          M(e, i),
                          B(e, t));
                  })(e, r, i, t, n);
                else {
                  var f = I(r) || e.destroyed;
                  f ||
                    r.corked ||
                    r.bufferProcessing ||
                    !r.bufferedRequest ||
                    R(e, r),
                    i ? process.nextTick(x, e, r, f, n) : x(e, r, f, n);
                }
              })(t, e);
            }),
            (this.writecb = null),
            (this.writelen = 0),
            (this.bufferedRequest = null),
            (this.lastBufferedRequest = null),
            (this.pendingcb = 0),
            (this.prefinished = !1),
            (this.errorEmitted = !1),
            (this.emitClose = !1 !== e.emitClose),
            (this.autoDestroy = !!e.autoDestroy),
            (this.bufferedRequestCount = 0),
            (this.corkedRequestsFree = new i(this));
        }
        function A(e) {
          var t = this instanceof (n = n || r(7735));
          if (!t && !f.call(A, this)) return new A(e);
          (this._writableState = new S(e, this, t)),
            (this.writable = !0),
            e &&
              ("function" == typeof e.write && (this._write = e.write),
              "function" == typeof e.writev && (this._writev = e.writev),
              "function" == typeof e.destroy && (this._destroy = e.destroy),
              "function" == typeof e.final && (this._final = e.final)),
            o.call(this);
        }
        function E(e, t, r, i, n, f, a) {
          (t.writelen = i),
            (t.writecb = a),
            (t.writing = !0),
            (t.sync = !0),
            t.destroyed
              ? t.onwrite(new m("write"))
              : r
              ? e._writev(n, t.onwrite)
              : e._write(n, f, t.onwrite),
            (t.sync = !1);
        }
        function x(e, t, r, i) {
          r ||
            (function (e, t) {
              0 === t.length &&
                t.needDrain &&
                ((t.needDrain = !1), e.emit("drain"));
            })(e, t),
            t.pendingcb--,
            i(),
            B(e, t);
        }
        function R(e, t) {
          t.bufferProcessing = !0;
          var r = t.bufferedRequest;
          if (e._writev && r && r.next) {
            var n = t.bufferedRequestCount,
              f = new Array(n),
              a = t.corkedRequestsFree;
            a.entry = r;
            for (var o = 0, s = !0; r; )
              (f[o] = r), r.isBuf || (s = !1), (r = r.next), (o += 1);
            (f.allBuffers = s),
              E(e, t, !0, t.length, f, "", a.finish),
              t.pendingcb++,
              (t.lastBufferedRequest = null),
              a.next
                ? ((t.corkedRequestsFree = a.next), (a.next = null))
                : (t.corkedRequestsFree = new i(t)),
              (t.bufferedRequestCount = 0);
          } else {
            for (; r; ) {
              var d = r.chunk,
                c = r.encoding,
                h = r.callback;
              if (
                (E(e, t, !1, t.objectMode ? 1 : d.length, d, c, h),
                (r = r.next),
                t.bufferedRequestCount--,
                t.writing)
              )
                break;
            }
            null === r && (t.lastBufferedRequest = null);
          }
          (t.bufferedRequest = r), (t.bufferProcessing = !1);
        }
        function I(e) {
          return (
            e.ending &&
            0 === e.length &&
            null === e.bufferedRequest &&
            !e.finished &&
            !e.writing
          );
        }
        function k(e, t) {
          e._final(function (r) {
            t.pendingcb--,
              r && M(e, r),
              (t.prefinished = !0),
              e.emit("prefinish"),
              B(e, t);
          });
        }
        function B(e, t) {
          var r = I(t);
          if (
            r &&
            ((function (e, t) {
              t.prefinished ||
                t.finalCalled ||
                ("function" != typeof e._final || t.destroyed
                  ? ((t.prefinished = !0), e.emit("prefinish"))
                  : (t.pendingcb++,
                    (t.finalCalled = !0),
                    process.nextTick(k, e, t)));
            })(e, t),
            0 === t.pendingcb &&
              ((t.finished = !0), e.emit("finish"), t.autoDestroy))
          ) {
            var i = e._readableState;
            (!i || (i.autoDestroy && i.endEmitted)) && e.destroy();
          }
          return r;
        }
        r(5717)(A, o),
          (S.prototype.getBuffer = function () {
            for (var e = this.bufferedRequest, t = []; e; )
              t.push(e), (e = e.next);
            return t;
          }),
          (function () {
            try {
              Object.defineProperty(S.prototype, "buffer", {
                get: a.deprecate(
                  function () {
                    return this.getBuffer();
                  },
                  "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.",
                  "DEP0003"
                ),
              });
            } catch (e) {}
          })(),
          "function" == typeof Symbol &&
          Symbol.hasInstance &&
          "function" == typeof Function.prototype[Symbol.hasInstance]
            ? ((f = Function.prototype[Symbol.hasInstance]),
              Object.defineProperty(A, Symbol.hasInstance, {
                value: function (e) {
                  return (
                    !!f.call(this, e) ||
                    (this === A && e && e._writableState instanceof S)
                  );
                },
              }))
            : (f = function (e) {
                return e instanceof this;
              }),
          (A.prototype.pipe = function () {
            M(this, new y());
          }),
          (A.prototype.write = function (e, t, r) {
            var i,
              n = this._writableState,
              f = !1,
              a = !n.objectMode && ((i = e), s.isBuffer(i) || i instanceof d);
            return (
              a &&
                !s.isBuffer(e) &&
                (e = (function (e) {
                  return s.from(e);
                })(e)),
              "function" == typeof t && ((r = t), (t = null)),
              a ? (t = "buffer") : t || (t = n.defaultEncoding),
              "function" != typeof r && (r = _),
              n.ending
                ? (function (e, t) {
                    var r = new v();
                    M(e, r), process.nextTick(t, r);
                  })(this, r)
                : (a ||
                    (function (e, t, r, i) {
                      var n;
                      return (
                        null === r
                          ? (n = new g())
                          : "string" == typeof r ||
                            t.objectMode ||
                            (n = new l("chunk", ["string", "Buffer"], r)),
                        !n || (M(e, n), process.nextTick(i, n), !1)
                      );
                    })(this, n, e, r)) &&
                  (n.pendingcb++,
                  (f = (function (e, t, r, i, n, f) {
                    if (!r) {
                      var a = (function (e, t, r) {
                        return (
                          e.objectMode ||
                            !1 === e.decodeStrings ||
                            "string" != typeof t ||
                            (t = s.from(t, r)),
                          t
                        );
                      })(t, i, n);
                      i !== a && ((r = !0), (n = "buffer"), (i = a));
                    }
                    var o = t.objectMode ? 1 : i.length;
                    t.length += o;
                    var d = t.length < t.highWaterMark;
                    if ((d || (t.needDrain = !0), t.writing || t.corked)) {
                      var c = t.lastBufferedRequest;
                      (t.lastBufferedRequest = {
                        chunk: i,
                        encoding: n,
                        isBuf: r,
                        callback: f,
                        next: null,
                      }),
                        c
                          ? (c.next = t.lastBufferedRequest)
                          : (t.bufferedRequest = t.lastBufferedRequest),
                        (t.bufferedRequestCount += 1);
                    } else E(e, t, !1, o, i, n, f);
                    return d;
                  })(this, n, a, e, t, r))),
              f
            );
          }),
          (A.prototype.cork = function () {
            this._writableState.corked++;
          }),
          (A.prototype.uncork = function () {
            var e = this._writableState;
            e.corked &&
              (e.corked--,
              e.writing ||
                e.corked ||
                e.bufferProcessing ||
                !e.bufferedRequest ||
                R(this, e));
          }),
          (A.prototype.setDefaultEncoding = function (e) {
            if (
              ("string" == typeof e && (e = e.toLowerCase()),
              !(
                [
                  "hex",
                  "utf8",
                  "utf-8",
                  "ascii",
                  "binary",
                  "base64",
                  "ucs2",
                  "ucs-2",
                  "utf16le",
                  "utf-16le",
                  "raw",
                ].indexOf((e + "").toLowerCase()) > -1
              ))
            )
              throw new w(e);
            return (this._writableState.defaultEncoding = e), this;
          }),
          Object.defineProperty(A.prototype, "writableBuffer", {
            enumerable: !1,
            get: function () {
              return this._writableState && this._writableState.getBuffer();
            },
          }),
          Object.defineProperty(A.prototype, "writableHighWaterMark", {
            enumerable: !1,
            get: function () {
              return this._writableState.highWaterMark;
            },
          }),
          (A.prototype._write = function (e, t, r) {
            r(new b("_write()"));
          }),
          (A.prototype._writev = null),
          (A.prototype.end = function (e, t, r) {
            var i = this._writableState;
            return (
              "function" == typeof e
                ? ((r = e), (e = null), (t = null))
                : "function" == typeof t && ((r = t), (t = null)),
              null != e && this.write(e, t),
              i.corked && ((i.corked = 1), this.uncork()),
              i.ending ||
                (function (e, t, r) {
                  (t.ending = !0),
                    B(e, t),
                    r &&
                      (t.finished ? process.nextTick(r) : e.once("finish", r)),
                    (t.ended = !0),
                    (e.writable = !1);
                })(this, i, r),
              this
            );
          }),
          Object.defineProperty(A.prototype, "writableLength", {
            enumerable: !1,
            get: function () {
              return this._writableState.length;
            },
          }),
          Object.defineProperty(A.prototype, "destroyed", {
            enumerable: !1,
            get: function () {
              return (
                void 0 !== this._writableState && this._writableState.destroyed
              );
            },
            set: function (e) {
              this._writableState && (this._writableState.destroyed = e);
            },
          }),
          (A.prototype.destroy = c.destroy),
          (A.prototype._undestroy = c.undestroy),
          (A.prototype._destroy = function (e, t) {
            t(e);
          });
      },
      3471: (e, t, r) => {
        "use strict";
        var i;
        function n(e, t, r) {
          return (
            (t = (function (e) {
              var t = (function (e, t) {
                if ("object" != typeof e || null === e) return e;
                var r = e[Symbol.toPrimitive];
                if (void 0 !== r) {
                  var i = r.call(e, "string");
                  if ("object" != typeof i) return i;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return String(e);
              })(e);
              return "symbol" == typeof t ? t : String(t);
            })(t)) in e
              ? Object.defineProperty(e, t, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = r),
            e
          );
        }
        var f = r(8186),
          a = Symbol("lastResolve"),
          o = Symbol("lastReject"),
          s = Symbol("error"),
          d = Symbol("ended"),
          c = Symbol("lastPromise"),
          h = Symbol("handlePromise"),
          u = Symbol("stream");
        function l(e, t) {
          return { value: e, done: t };
        }
        function b(e) {
          var t = e[a];
          if (null !== t) {
            var r = e[u].read();
            null !== r &&
              ((e[c] = null), (e[a] = null), (e[o] = null), t(l(r, !1)));
          }
        }
        function p(e) {
          process.nextTick(b, e);
        }
        var y = Object.getPrototypeOf(function () {}),
          m = Object.setPrototypeOf(
            (n(
              (i = {
                get stream() {
                  return this[u];
                },
                next: function () {
                  var e = this,
                    t = this[s];
                  if (null !== t) return Promise.reject(t);
                  if (this[d]) return Promise.resolve(l(void 0, !0));
                  if (this[u].destroyed)
                    return new Promise(function (t, r) {
                      process.nextTick(function () {
                        e[s] ? r(e[s]) : t(l(void 0, !0));
                      });
                    });
                  var r,
                    i = this[c];
                  if (i)
                    r = new Promise(
                      (function (e, t) {
                        return function (r, i) {
                          e.then(function () {
                            t[d] ? r(l(void 0, !0)) : t[h](r, i);
                          }, i);
                        };
                      })(i, this)
                    );
                  else {
                    var n = this[u].read();
                    if (null !== n) return Promise.resolve(l(n, !1));
                    r = new Promise(this[h]);
                  }
                  return (this[c] = r), r;
                },
              }),
              Symbol.asyncIterator,
              function () {
                return this;
              }
            ),
            n(i, "return", function () {
              var e = this;
              return new Promise(function (t, r) {
                e[u].destroy(null, function (e) {
                  e ? r(e) : t(l(void 0, !0));
                });
              });
            }),
            i),
            y
          );
        e.exports = function (e) {
          var t,
            r = Object.create(
              m,
              (n((t = {}), u, { value: e, writable: !0 }),
              n(t, a, { value: null, writable: !0 }),
              n(t, o, { value: null, writable: !0 }),
              n(t, s, { value: null, writable: !0 }),
              n(t, d, { value: e._readableState.endEmitted, writable: !0 }),
              n(t, h, {
                value: function (e, t) {
                  var i = r[u].read();
                  i
                    ? ((r[c] = null), (r[a] = null), (r[o] = null), e(l(i, !1)))
                    : ((r[a] = e), (r[o] = t));
                },
                writable: !0,
              }),
              t)
            );
          return (
            (r[c] = null),
            f(e, function (e) {
              if (e && "ERR_STREAM_PREMATURE_CLOSE" !== e.code) {
                var t = r[o];
                return (
                  null !== t &&
                    ((r[c] = null), (r[a] = null), (r[o] = null), t(e)),
                  void (r[s] = e)
                );
              }
              var i = r[a];
              null !== i &&
                ((r[c] = null), (r[a] = null), (r[o] = null), i(l(void 0, !0))),
                (r[d] = !0);
            }),
            e.on("readable", p.bind(null, r)),
            r
          );
        };
      },
      7983: (e, t, r) => {
        "use strict";
        function i(e, t) {
          var r = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            t &&
              (i = i.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              r.push.apply(r, i);
          }
          return r;
        }
        function n(e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? i(Object(r), !0).forEach(function (t) {
                  f(e, t, r[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : i(Object(r)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(r, t)
                  );
                });
          }
          return e;
        }
        function f(e, t, r) {
          return (
            (t = o(t)) in e
              ? Object.defineProperty(e, t, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = r),
            e
          );
        }
        function a(e, t) {
          for (var r = 0; r < t.length; r++) {
            var i = t[r];
            (i.enumerable = i.enumerable || !1),
              (i.configurable = !0),
              "value" in i && (i.writable = !0),
              Object.defineProperty(e, o(i.key), i);
          }
        }
        function o(e) {
          var t = (function (e, t) {
            if ("object" != typeof e || null === e) return e;
            var r = e[Symbol.toPrimitive];
            if (void 0 !== r) {
              var i = r.call(e, "string");
              if ("object" != typeof i) return i;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return String(e);
          })(e);
          return "symbol" == typeof t ? t : String(t);
        }
        var s = r(8764).Buffer,
          d = r(9120).inspect,
          c = (d && d.custom) || "inspect";
        e.exports = (function () {
          function e() {
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, e),
              (this.head = null),
              (this.tail = null),
              (this.length = 0);
          }
          var t, r;
          return (
            (t = e),
            (r = [
              {
                key: "push",
                value: function (e) {
                  var t = { data: e, next: null };
                  this.length > 0 ? (this.tail.next = t) : (this.head = t),
                    (this.tail = t),
                    ++this.length;
                },
              },
              {
                key: "unshift",
                value: function (e) {
                  var t = { data: e, next: this.head };
                  0 === this.length && (this.tail = t),
                    (this.head = t),
                    ++this.length;
                },
              },
              {
                key: "shift",
                value: function () {
                  if (0 !== this.length) {
                    var e = this.head.data;
                    return (
                      1 === this.length
                        ? (this.head = this.tail = null)
                        : (this.head = this.head.next),
                      --this.length,
                      e
                    );
                  }
                },
              },
              {
                key: "clear",
                value: function () {
                  (this.head = this.tail = null), (this.length = 0);
                },
              },
              {
                key: "join",
                value: function (e) {
                  if (0 === this.length) return "";
                  for (var t = this.head, r = "" + t.data; (t = t.next); )
                    r += e + t.data;
                  return r;
                },
              },
              {
                key: "concat",
                value: function (e) {
                  if (0 === this.length) return s.alloc(0);
                  for (
                    var t,
                      r,
                      i,
                      n = s.allocUnsafe(e >>> 0),
                      f = this.head,
                      a = 0;
                    f;

                  )
                    (t = f.data),
                      (r = n),
                      (i = a),
                      s.prototype.copy.call(t, r, i),
                      (a += f.data.length),
                      (f = f.next);
                  return n;
                },
              },
              {
                key: "consume",
                value: function (e, t) {
                  var r;
                  return (
                    e < this.head.data.length
                      ? ((r = this.head.data.slice(0, e)),
                        (this.head.data = this.head.data.slice(e)))
                      : (r =
                          e === this.head.data.length
                            ? this.shift()
                            : t
                            ? this._getString(e)
                            : this._getBuffer(e)),
                    r
                  );
                },
              },
              {
                key: "first",
                value: function () {
                  return this.head.data;
                },
              },
              {
                key: "_getString",
                value: function (e) {
                  var t = this.head,
                    r = 1,
                    i = t.data;
                  for (e -= i.length; (t = t.next); ) {
                    var n = t.data,
                      f = e > n.length ? n.length : e;
                    if (
                      (f === n.length ? (i += n) : (i += n.slice(0, e)),
                      0 == (e -= f))
                    ) {
                      f === n.length
                        ? (++r,
                          t.next
                            ? (this.head = t.next)
                            : (this.head = this.tail = null))
                        : ((this.head = t), (t.data = n.slice(f)));
                      break;
                    }
                    ++r;
                  }
                  return (this.length -= r), i;
                },
              },
              {
                key: "_getBuffer",
                value: function (e) {
                  var t = s.allocUnsafe(e),
                    r = this.head,
                    i = 1;
                  for (r.data.copy(t), e -= r.data.length; (r = r.next); ) {
                    var n = r.data,
                      f = e > n.length ? n.length : e;
                    if ((n.copy(t, t.length - e, 0, f), 0 == (e -= f))) {
                      f === n.length
                        ? (++i,
                          r.next
                            ? (this.head = r.next)
                            : (this.head = this.tail = null))
                        : ((this.head = r), (r.data = n.slice(f)));
                      break;
                    }
                    ++i;
                  }
                  return (this.length -= i), t;
                },
              },
              {
                key: c,
                value: function (e, t) {
                  return d(
                    this,
                    n(n({}, t), {}, { depth: 0, customInspect: !1 })
                  );
                },
              },
            ]) && a(t.prototype, r),
            Object.defineProperty(t, "prototype", { writable: !1 }),
            e
          );
        })();
      },
      3505: (e) => {
        "use strict";
        function t(e, t) {
          i(e, t), r(e);
        }
        function r(e) {
          (e._writableState && !e._writableState.emitClose) ||
            (e._readableState && !e._readableState.emitClose) ||
            e.emit("close");
        }
        function i(e, t) {
          e.emit("error", t);
        }
        e.exports = {
          destroy: function (e, n) {
            var f = this,
              a = this._readableState && this._readableState.destroyed,
              o = this._writableState && this._writableState.destroyed;
            return a || o
              ? (n
                  ? n(e)
                  : e &&
                    (this._writableState
                      ? this._writableState.errorEmitted ||
                        ((this._writableState.errorEmitted = !0),
                        process.nextTick(i, this, e))
                      : process.nextTick(i, this, e)),
                this)
              : (this._readableState && (this._readableState.destroyed = !0),
                this._writableState && (this._writableState.destroyed = !0),
                this._destroy(e || null, function (e) {
                  !n && e
                    ? f._writableState
                      ? f._writableState.errorEmitted
                        ? process.nextTick(r, f)
                        : ((f._writableState.errorEmitted = !0),
                          process.nextTick(t, f, e))
                      : process.nextTick(t, f, e)
                    : n
                    ? (process.nextTick(r, f), n(e))
                    : process.nextTick(r, f);
                }),
                this);
          },
          undestroy: function () {
            this._readableState &&
              ((this._readableState.destroyed = !1),
              (this._readableState.reading = !1),
              (this._readableState.ended = !1),
              (this._readableState.endEmitted = !1)),
              this._writableState &&
                ((this._writableState.destroyed = !1),
                (this._writableState.ended = !1),
                (this._writableState.ending = !1),
                (this._writableState.finalCalled = !1),
                (this._writableState.prefinished = !1),
                (this._writableState.finished = !1),
                (this._writableState.errorEmitted = !1));
          },
          errorOrDestroy: function (e, t) {
            var r = e._readableState,
              i = e._writableState;
            (r && r.autoDestroy) || (i && i.autoDestroy)
              ? e.destroy(t)
              : e.emit("error", t);
          },
        };
      },
      8186: (e, t, r) => {
        "use strict";
        var i = r(7630).q.ERR_STREAM_PREMATURE_CLOSE;
        function n() {}
        e.exports = function e(t, r, f) {
          if ("function" == typeof r) return e(t, null, r);
          r || (r = {}),
            (f = (function (e) {
              var t = !1;
              return function () {
                if (!t) {
                  t = !0;
                  for (
                    var r = arguments.length, i = new Array(r), n = 0;
                    n < r;
                    n++
                  )
                    i[n] = arguments[n];
                  e.apply(this, i);
                }
              };
            })(f || n));
          var a = r.readable || (!1 !== r.readable && t.readable),
            o = r.writable || (!1 !== r.writable && t.writable),
            s = function () {
              t.writable || c();
            },
            d = t._writableState && t._writableState.finished,
            c = function () {
              (o = !1), (d = !0), a || f.call(t);
            },
            h = t._readableState && t._readableState.endEmitted,
            u = function () {
              (a = !1), (h = !0), o || f.call(t);
            },
            l = function (e) {
              f.call(t, e);
            },
            b = function () {
              var e;
              return a && !h
                ? ((t._readableState && t._readableState.ended) ||
                    (e = new i()),
                  f.call(t, e))
                : o && !d
                ? ((t._writableState && t._writableState.ended) ||
                    (e = new i()),
                  f.call(t, e))
                : void 0;
            },
            p = function () {
              t.req.on("finish", c);
            };
          return (
            (function (e) {
              return e.setHeader && "function" == typeof e.abort;
            })(t)
              ? (t.on("complete", c),
                t.on("abort", b),
                t.req ? p() : t.on("request", p))
              : o && !t._writableState && (t.on("end", s), t.on("close", s)),
            t.on("end", u),
            t.on("finish", c),
            !1 !== r.error && t.on("error", l),
            t.on("close", b),
            function () {
              t.removeListener("complete", c),
                t.removeListener("abort", b),
                t.removeListener("request", p),
                t.req && t.req.removeListener("finish", c),
                t.removeListener("end", s),
                t.removeListener("close", s),
                t.removeListener("finish", c),
                t.removeListener("end", u),
                t.removeListener("error", l),
                t.removeListener("close", b);
            }
          );
        };
      },
      6435: (e) => {
        e.exports = function () {
          throw new Error("Readable.from is not available in the browser");
        };
      },
      9619: (e, t, r) => {
        "use strict";
        var i,
          n = r(7630).q,
          f = n.ERR_MISSING_ARGS,
          a = n.ERR_STREAM_DESTROYED;
        function o(e) {
          if (e) throw e;
        }
        function s(e) {
          e();
        }
        function d(e, t) {
          return e.pipe(t);
        }
        e.exports = function () {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          var c,
            h = (function (e) {
              return e.length
                ? "function" != typeof e[e.length - 1]
                  ? o
                  : e.pop()
                : o;
            })(t);
          if ((Array.isArray(t[0]) && (t = t[0]), t.length < 2))
            throw new f("streams");
          var u = t.map(function (e, n) {
            var f = n < t.length - 1;
            return (function (e, t, n, f) {
              f = (function (e) {
                var t = !1;
                return function () {
                  t || ((t = !0), e.apply(void 0, arguments));
                };
              })(f);
              var o = !1;
              e.on("close", function () {
                o = !0;
              }),
                void 0 === i && (i = r(8186)),
                i(e, { readable: t, writable: n }, function (e) {
                  if (e) return f(e);
                  (o = !0), f();
                });
              var s = !1;
              return function (t) {
                if (!o && !s)
                  return (
                    (s = !0),
                    (function (e) {
                      return e.setHeader && "function" == typeof e.abort;
                    })(e)
                      ? e.abort()
                      : "function" == typeof e.destroy
                      ? e.destroy()
                      : void f(t || new a("pipe"))
                  );
              };
            })(e, f, n > 0, function (e) {
              c || (c = e), e && u.forEach(s), f || (u.forEach(s), h(c));
            });
          });
          return t.reduce(d);
        };
      },
      5482: (e, t, r) => {
        "use strict";
        var i = r(7630).q.ERR_INVALID_OPT_VALUE;
        e.exports = {
          getHighWaterMark: function (e, t, r, n) {
            var f = (function (e, t, r) {
              return null != e.highWaterMark
                ? e.highWaterMark
                : t
                ? e[r]
                : null;
            })(t, n, r);
            if (null != f) {
              if (!isFinite(f) || Math.floor(f) !== f || f < 0)
                throw new i(n ? r : "highWaterMark", f);
              return Math.floor(f);
            }
            return e.objectMode ? 16 : 16384;
          },
        };
      },
      9868: (e, t, r) => {
        e.exports = r(7187).EventEmitter;
      },
      5092: (e, t, r) => {
        ((t = e.exports = r(3875)).Stream = t),
          (t.Readable = t),
          (t.Writable = r(9843)),
          (t.Duplex = r(7735)),
          (t.Transform = r(6311)),
          (t.PassThrough = r(6485)),
          (t.finished = r(8186)),
          (t.pipeline = r(9619));
      },
      9746: (e) => {
        function t(e, t) {
          if (!e) throw new Error(t || "Assertion failed");
        }
        (e.exports = t),
          (t.equal = function (e, t, r) {
            if (e != t)
              throw new Error(r || "Assertion failed: " + e + " != " + t);
          });
      },
      4504: (e, t) => {
        "use strict";
        var r = t;
        function i(e) {
          return 1 === e.length ? "0" + e : e;
        }
        function n(e) {
          for (var t = "", r = 0; r < e.length; r++) t += i(e[r].toString(16));
          return t;
        }
        (r.toArray = function (e, t) {
          if (Array.isArray(e)) return e.slice();
          if (!e) return [];
          var r = [];
          if ("string" != typeof e) {
            for (var i = 0; i < e.length; i++) r[i] = 0 | e[i];
            return r;
          }
          if ("hex" === t)
            for (
              (e = e.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 &&
                (e = "0" + e),
                i = 0;
              i < e.length;
              i += 2
            )
              r.push(parseInt(e[i] + e[i + 1], 16));
          else
            for (i = 0; i < e.length; i++) {
              var n = e.charCodeAt(i),
                f = n >> 8,
                a = 255 & n;
              f ? r.push(f, a) : r.push(a);
            }
          return r;
        }),
          (r.zero2 = i),
          (r.toHex = n),
          (r.encode = function (e, t) {
            return "hex" === t ? n(e) : e;
          });
      },
      1798: (e, t, r) => {
        "use strict";
        var i = 65536,
          n = r(9509).Buffer,
          f = r.g.crypto || r.g.msCrypto;
        f && f.getRandomValues
          ? (e.exports = function (e, t) {
              if (e > 4294967295)
                throw new RangeError("requested too many random bytes");
              var r = n.allocUnsafe(e);
              if (e > 0)
                if (e > i)
                  for (var a = 0; a < e; a += i)
                    f.getRandomValues(r.slice(a, a + i));
                else f.getRandomValues(r);
              return "function" == typeof t
                ? process.nextTick(function () {
                    t(null, r);
                  })
                : r;
            })
          : (e.exports = function () {
              throw new Error(
                "Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11"
              );
            });
      },
      9509: (e, t, r) => {
        var i = r(8764),
          n = i.Buffer;
        function f(e, t) {
          for (var r in e) t[r] = e[r];
        }
        function a(e, t, r) {
          return n(e, t, r);
        }
        n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow
          ? (e.exports = i)
          : (f(i, t), (t.Buffer = a)),
          (a.prototype = Object.create(n.prototype)),
          f(n, a),
          (a.from = function (e, t, r) {
            if ("number" == typeof e)
              throw new TypeError("Argument must not be a number");
            return n(e, t, r);
          }),
          (a.alloc = function (e, t, r) {
            if ("number" != typeof e)
              throw new TypeError("Argument must be a number");
            var i = n(e);
            return (
              void 0 !== t
                ? "string" == typeof r
                  ? i.fill(t, r)
                  : i.fill(t)
                : i.fill(0),
              i
            );
          }),
          (a.allocUnsafe = function (e) {
            if ("number" != typeof e)
              throw new TypeError("Argument must be a number");
            return n(e);
          }),
          (a.allocUnsafeSlow = function (e) {
            if ("number" != typeof e)
              throw new TypeError("Argument must be a number");
            return i.SlowBuffer(e);
          });
      },
      7221: (e, t, r) => {
        e.exports = r(9119)(r(8573));
      },
      8573: (e, t, r) => {
        const i = new (0, r(6266).ec)("secp256k1"),
          n = i.curve,
          f = n.n.constructor;
        function a(e) {
          const t = e[0];
          switch (t) {
            case 2:
            case 3:
              return 33 !== e.length
                ? null
                : (function (e, t) {
                    let r = new f(t);
                    if (r.cmp(n.p) >= 0) return null;
                    r = r.toRed(n.red);
                    let a = r.redSqr().redIMul(r).redIAdd(n.b).redSqrt();
                    return (
                      (3 === e) !== a.isOdd() && (a = a.redNeg()),
                      i.keyPair({ pub: { x: r, y: a } })
                    );
                  })(t, e.subarray(1, 33));
            case 4:
            case 6:
            case 7:
              return 65 !== e.length
                ? null
                : (function (e, t, r) {
                    let a = new f(t),
                      o = new f(r);
                    if (a.cmp(n.p) >= 0 || o.cmp(n.p) >= 0) return null;
                    if (
                      ((a = a.toRed(n.red)),
                      (o = o.toRed(n.red)),
                      (6 === e || 7 === e) && o.isOdd() !== (7 === e))
                    )
                      return null;
                    const s = a.redSqr().redIMul(a);
                    return o.redSqr().redISub(s.redIAdd(n.b)).isZero()
                      ? i.keyPair({ pub: { x: a, y: o } })
                      : null;
                  })(t, e.subarray(1, 33), e.subarray(33, 65));
            default:
              return null;
          }
        }
        function o(e, t) {
          const r = t.encode(null, 33 === e.length);
          for (let t = 0; t < e.length; ++t) e[t] = r[t];
        }
        e.exports = {
          contextRandomize: () => 0,
          privateKeyVerify(e) {
            const t = new f(e);
            return t.cmp(n.n) < 0 && !t.isZero() ? 0 : 1;
          },
          privateKeyNegate(e) {
            const t = new f(e),
              r = n.n.sub(t).umod(n.n).toArrayLike(Uint8Array, "be", 32);
            return e.set(r), 0;
          },
          privateKeyTweakAdd(e, t) {
            const r = new f(t);
            if (r.cmp(n.n) >= 0) return 1;
            if ((r.iadd(new f(e)), r.cmp(n.n) >= 0 && r.isub(n.n), r.isZero()))
              return 1;
            const i = r.toArrayLike(Uint8Array, "be", 32);
            return e.set(i), 0;
          },
          privateKeyTweakMul(e, t) {
            let r = new f(t);
            if (r.cmp(n.n) >= 0 || r.isZero()) return 1;
            r.imul(new f(e)), r.cmp(n.n) >= 0 && (r = r.umod(n.n));
            const i = r.toArrayLike(Uint8Array, "be", 32);
            return e.set(i), 0;
          },
          publicKeyVerify: (e) => (null === a(e) ? 1 : 0),
          publicKeyCreate(e, t) {
            const r = new f(t);
            return r.cmp(n.n) >= 0 || r.isZero()
              ? 1
              : (o(e, i.keyFromPrivate(t).getPublic()), 0);
          },
          publicKeyConvert(e, t) {
            const r = a(t);
            return null === r ? 1 : (o(e, r.getPublic()), 0);
          },
          publicKeyNegate(e, t) {
            const r = a(t);
            if (null === r) return 1;
            const i = r.getPublic();
            return (i.y = i.y.redNeg()), o(e, i), 0;
          },
          publicKeyCombine(e, t) {
            const r = new Array(t.length);
            for (let e = 0; e < t.length; ++e)
              if (((r[e] = a(t[e])), null === r[e])) return 1;
            let i = r[0].getPublic();
            for (let e = 1; e < r.length; ++e) i = i.add(r[e].pub);
            return i.isInfinity() ? 2 : (o(e, i), 0);
          },
          publicKeyTweakAdd(e, t, r) {
            const i = a(t);
            if (null === i) return 1;
            if ((r = new f(r)).cmp(n.n) >= 0) return 2;
            const s = i.getPublic().add(n.g.mul(r));
            return s.isInfinity() ? 2 : (o(e, s), 0);
          },
          publicKeyTweakMul(e, t, r) {
            const i = a(t);
            return null === i
              ? 1
              : (r = new f(r)).cmp(n.n) >= 0 || r.isZero()
              ? 2
              : (o(e, i.getPublic().mul(r)), 0);
          },
          signatureNormalize(e) {
            const t = new f(e.subarray(0, 32)),
              r = new f(e.subarray(32, 64));
            return t.cmp(n.n) >= 0 || r.cmp(n.n) >= 0
              ? 1
              : (1 === r.cmp(i.nh) &&
                  e.set(n.n.sub(r).toArrayLike(Uint8Array, "be", 32), 32),
                0);
          },
          signatureExport(e, t) {
            const r = t.subarray(0, 32),
              i = t.subarray(32, 64);
            if (new f(r).cmp(n.n) >= 0) return 1;
            if (new f(i).cmp(n.n) >= 0) return 1;
            const { output: a } = e;
            let o = a.subarray(4, 37);
            (o[0] = 0), o.set(r, 1);
            let s = 33,
              d = 0;
            for (; s > 1 && 0 === o[d] && !(128 & o[d + 1]); --s, ++d);
            if (((o = o.subarray(d)), 128 & o[0])) return 1;
            if (s > 1 && 0 === o[0] && !(128 & o[1])) return 1;
            let c = a.subarray(39, 72);
            (c[0] = 0), c.set(i, 1);
            let h = 33,
              u = 0;
            for (; h > 1 && 0 === c[u] && !(128 & c[u + 1]); --h, ++u);
            return (
              (c = c.subarray(u)),
              128 & c[0] || (h > 1 && 0 === c[0] && !(128 & c[1]))
                ? 1
                : ((e.outputlen = 6 + s + h),
                  (a[0] = 48),
                  (a[1] = e.outputlen - 2),
                  (a[2] = 2),
                  (a[3] = o.length),
                  a.set(o, 4),
                  (a[4 + s] = 2),
                  (a[5 + s] = c.length),
                  a.set(c, 6 + s),
                  0)
            );
          },
          signatureImport(e, t) {
            if (t.length < 8) return 1;
            if (t.length > 72) return 1;
            if (48 !== t[0]) return 1;
            if (t[1] !== t.length - 2) return 1;
            if (2 !== t[2]) return 1;
            const r = t[3];
            if (0 === r) return 1;
            if (5 + r >= t.length) return 1;
            if (2 !== t[4 + r]) return 1;
            const i = t[5 + r];
            if (0 === i) return 1;
            if (6 + r + i !== t.length) return 1;
            if (128 & t[4]) return 1;
            if (r > 1 && 0 === t[4] && !(128 & t[5])) return 1;
            if (128 & t[r + 6]) return 1;
            if (i > 1 && 0 === t[r + 6] && !(128 & t[r + 7])) return 1;
            let a = t.subarray(4, 4 + r);
            if (
              (33 === a.length && 0 === a[0] && (a = a.subarray(1)),
              a.length > 32)
            )
              return 1;
            let o = t.subarray(6 + r);
            if (
              (33 === o.length && 0 === o[0] && (o = o.slice(1)), o.length > 32)
            )
              throw new Error("S length is too long");
            let s = new f(a);
            s.cmp(n.n) >= 0 && (s = new f(0));
            let d = new f(t.subarray(6 + r));
            return (
              d.cmp(n.n) >= 0 && (d = new f(0)),
              e.set(s.toArrayLike(Uint8Array, "be", 32), 0),
              e.set(d.toArrayLike(Uint8Array, "be", 32), 32),
              0
            );
          },
          ecdsaSign(e, t, r, a, o) {
            if (o) {
              const e = o;
              o = (i) => {
                const n = e(t, r, null, a, i);
                if (!(n instanceof Uint8Array && 32 === n.length))
                  throw new Error("This is the way");
                return new f(n);
              };
            }
            const s = new f(r);
            if (s.cmp(n.n) >= 0 || s.isZero()) return 1;
            let d;
            try {
              d = i.sign(t, r, { canonical: !0, k: o, pers: a });
            } catch (e) {
              return 1;
            }
            return (
              e.signature.set(d.r.toArrayLike(Uint8Array, "be", 32), 0),
              e.signature.set(d.s.toArrayLike(Uint8Array, "be", 32), 32),
              (e.recid = d.recoveryParam),
              0
            );
          },
          ecdsaVerify(e, t, r) {
            const o = { r: e.subarray(0, 32), s: e.subarray(32, 64) },
              s = new f(o.r),
              d = new f(o.s);
            if (s.cmp(n.n) >= 0 || d.cmp(n.n) >= 0) return 1;
            if (1 === d.cmp(i.nh) || s.isZero() || d.isZero()) return 3;
            const c = a(r);
            if (null === c) return 2;
            const h = c.getPublic();
            return i.verify(t, o, h) ? 0 : 3;
          },
          ecdsaRecover(e, t, r, a) {
            const s = { r: t.slice(0, 32), s: t.slice(32, 64) },
              d = new f(s.r),
              c = new f(s.s);
            if (d.cmp(n.n) >= 0 || c.cmp(n.n) >= 0) return 1;
            if (d.isZero() || c.isZero()) return 2;
            let h;
            try {
              h = i.recoverPubKey(a, s, r);
            } catch (e) {
              return 2;
            }
            return o(e, h), 0;
          },
          ecdh(e, t, r, o, s, d, c) {
            const h = a(t);
            if (null === h) return 1;
            const u = new f(r);
            if (u.cmp(n.n) >= 0 || u.isZero()) return 2;
            const l = h.getPublic().mul(u);
            if (void 0 === s) {
              const t = l.encode(null, !0),
                r = i.hash().update(t).digest();
              for (let t = 0; t < 32; ++t) e[t] = r[t];
            } else {
              d || (d = new Uint8Array(32));
              const t = l.getX().toArray("be", 32);
              for (let e = 0; e < 32; ++e) d[e] = t[e];
              c || (c = new Uint8Array(32));
              const r = l.getY().toArray("be", 32);
              for (let e = 0; e < 32; ++e) c[e] = r[e];
              const i = s(d, c, o);
              if (!(i instanceof Uint8Array && i.length === e.length)) return 2;
              e.set(i);
            }
            return 0;
          },
        };
      },
      9119: (e) => {
        const t = "Impossible case. Please create issue.",
          r =
            "The tweak was out of range or the resulted private key is invalid",
          i = "The tweak was out of range or equal to zero",
          n = "Public Key could not be parsed",
          f = "Public Key serialization error",
          a = "Signature could not be parsed";
        function o(e, t) {
          if (!e) throw new Error(t);
        }
        function s(e, t, r) {
          if (
            (o(t instanceof Uint8Array, `Expected ${e} to be an Uint8Array`),
            void 0 !== r)
          )
            if (Array.isArray(r)) {
              const i = `Expected ${e} to be an Uint8Array with length [${r.join(
                ", "
              )}]`;
              o(r.includes(t.length), i);
            } else {
              const i = `Expected ${e} to be an Uint8Array with length ${r}`;
              o(t.length === r, i);
            }
        }
        function d(e) {
          o("Boolean" === h(e), "Expected compressed to be a Boolean");
        }
        function c(e = (e) => new Uint8Array(e), t) {
          return "function" == typeof e && (e = e(t)), s("output", e, t), e;
        }
        function h(e) {
          return Object.prototype.toString.call(e).slice(8, -1);
        }
        e.exports = (e) => ({
          contextRandomize(t) {
            if (
              (o(
                null === t || t instanceof Uint8Array,
                "Expected seed to be an Uint8Array or null"
              ),
              null !== t && s("seed", t, 32),
              1 === e.contextRandomize(t))
            )
              throw new Error("Unknow error on context randomization");
          },
          privateKeyVerify: (t) => (
            s("private key", t, 32), 0 === e.privateKeyVerify(t)
          ),
          privateKeyNegate(r) {
            switch ((s("private key", r, 32), e.privateKeyNegate(r))) {
              case 0:
                return r;
              case 1:
                throw new Error(t);
            }
          },
          privateKeyTweakAdd(t, i) {
            switch (
              (s("private key", t, 32),
              s("tweak", i, 32),
              e.privateKeyTweakAdd(t, i))
            ) {
              case 0:
                return t;
              case 1:
                throw new Error(r);
            }
          },
          privateKeyTweakMul(t, r) {
            switch (
              (s("private key", t, 32),
              s("tweak", r, 32),
              e.privateKeyTweakMul(t, r))
            ) {
              case 0:
                return t;
              case 1:
                throw new Error(i);
            }
          },
          publicKeyVerify: (t) => (
            s("public key", t, [33, 65]), 0 === e.publicKeyVerify(t)
          ),
          publicKeyCreate(t, r = !0, i) {
            switch (
              (s("private key", t, 32),
              d(r),
              (i = c(i, r ? 33 : 65)),
              e.publicKeyCreate(i, t))
            ) {
              case 0:
                return i;
              case 1:
                throw new Error("Private Key is invalid");
              case 2:
                throw new Error(f);
            }
          },
          publicKeyConvert(t, r = !0, i) {
            switch (
              (s("public key", t, [33, 65]),
              d(r),
              (i = c(i, r ? 33 : 65)),
              e.publicKeyConvert(i, t))
            ) {
              case 0:
                return i;
              case 1:
                throw new Error(n);
              case 2:
                throw new Error(f);
            }
          },
          publicKeyNegate(r, i = !0, a) {
            switch (
              (s("public key", r, [33, 65]),
              d(i),
              (a = c(a, i ? 33 : 65)),
              e.publicKeyNegate(a, r))
            ) {
              case 0:
                return a;
              case 1:
                throw new Error(n);
              case 2:
                throw new Error(t);
              case 3:
                throw new Error(f);
            }
          },
          publicKeyCombine(t, r = !0, i) {
            o(Array.isArray(t), "Expected public keys to be an Array"),
              o(
                t.length > 0,
                "Expected public keys array will have more than zero items"
              );
            for (const e of t) s("public key", e, [33, 65]);
            switch ((d(r), (i = c(i, r ? 33 : 65)), e.publicKeyCombine(i, t))) {
              case 0:
                return i;
              case 1:
                throw new Error(n);
              case 2:
                throw new Error("The sum of the public keys is not valid");
              case 3:
                throw new Error(f);
            }
          },
          publicKeyTweakAdd(t, i, f = !0, a) {
            switch (
              (s("public key", t, [33, 65]),
              s("tweak", i, 32),
              d(f),
              (a = c(a, f ? 33 : 65)),
              e.publicKeyTweakAdd(a, t, i))
            ) {
              case 0:
                return a;
              case 1:
                throw new Error(n);
              case 2:
                throw new Error(r);
            }
          },
          publicKeyTweakMul(t, r, f = !0, a) {
            switch (
              (s("public key", t, [33, 65]),
              s("tweak", r, 32),
              d(f),
              (a = c(a, f ? 33 : 65)),
              e.publicKeyTweakMul(a, t, r))
            ) {
              case 0:
                return a;
              case 1:
                throw new Error(n);
              case 2:
                throw new Error(i);
            }
          },
          signatureNormalize(t) {
            switch ((s("signature", t, 64), e.signatureNormalize(t))) {
              case 0:
                return t;
              case 1:
                throw new Error(a);
            }
          },
          signatureExport(r, i) {
            s("signature", r, 64);
            const n = { output: (i = c(i, 72)), outputlen: 72 };
            switch (e.signatureExport(n, r)) {
              case 0:
                return i.slice(0, n.outputlen);
              case 1:
                throw new Error(a);
              case 2:
                throw new Error(t);
            }
          },
          signatureImport(r, i) {
            switch (
              (s("signature", r), (i = c(i, 64)), e.signatureImport(i, r))
            ) {
              case 0:
                return i;
              case 1:
                throw new Error(a);
              case 2:
                throw new Error(t);
            }
          },
          ecdsaSign(r, i, n = {}, f) {
            s("message", r, 32),
              s("private key", i, 32),
              o("Object" === h(n), "Expected options to be an Object"),
              void 0 !== n.data && s("options.data", n.data),
              void 0 !== n.noncefn &&
                o(
                  "Function" === h(n.noncefn),
                  "Expected options.noncefn to be a Function"
                );
            const a = { signature: (f = c(f, 64)), recid: null };
            switch (e.ecdsaSign(a, r, i, n.data, n.noncefn)) {
              case 0:
                return a;
              case 1:
                throw new Error(
                  "The nonce generation function failed, or the private key was invalid"
                );
              case 2:
                throw new Error(t);
            }
          },
          ecdsaVerify(t, r, i) {
            switch (
              (s("signature", t, 64),
              s("message", r, 32),
              s("public key", i, [33, 65]),
              e.ecdsaVerify(t, r, i))
            ) {
              case 0:
                return !0;
              case 3:
                return !1;
              case 1:
                throw new Error(a);
              case 2:
                throw new Error(n);
            }
          },
          ecdsaRecover(r, i, n, f = !0, u) {
            switch (
              (s("signature", r, 64),
              o(
                "Number" === h(i) && i >= 0 && i <= 3,
                "Expected recovery id to be a Number within interval [0, 3]"
              ),
              s("message", n, 32),
              d(f),
              (u = c(u, f ? 33 : 65)),
              e.ecdsaRecover(u, r, i, n))
            ) {
              case 0:
                return u;
              case 1:
                throw new Error(a);
              case 2:
                throw new Error("Public key could not be recover");
              case 3:
                throw new Error(t);
            }
          },
          ecdh(t, r, i = {}, f) {
            switch (
              (s("public key", t, [33, 65]),
              s("private key", r, 32),
              o("Object" === h(i), "Expected options to be an Object"),
              void 0 !== i.data && s("options.data", i.data),
              void 0 !== i.hashfn
                ? (o(
                    "Function" === h(i.hashfn),
                    "Expected options.hashfn to be a Function"
                  ),
                  void 0 !== i.xbuf && s("options.xbuf", i.xbuf, 32),
                  void 0 !== i.ybuf && s("options.ybuf", i.ybuf, 32),
                  s("output", f))
                : (f = c(f, 32)),
              e.ecdh(f, t, r, i.data, i.hashfn, i.xbuf, i.ybuf))
            ) {
              case 0:
                return f;
              case 1:
                throw new Error(n);
              case 2:
                throw new Error("Scalar was invalid (zero or overflow)");
            }
          },
        });
      },
      2553: (e, t, r) => {
        "use strict";
        var i = r(9509).Buffer,
          n =
            i.isEncoding ||
            function (e) {
              switch ((e = "" + e) && e.toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                case "raw":
                  return !0;
                default:
                  return !1;
              }
            };
        function f(e) {
          var t;
          switch (
            ((this.encoding = (function (e) {
              var t = (function (e) {
                if (!e) return "utf8";
                for (var t; ; )
                  switch (e) {
                    case "utf8":
                    case "utf-8":
                      return "utf8";
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return "utf16le";
                    case "latin1":
                    case "binary":
                      return "latin1";
                    case "base64":
                    case "ascii":
                    case "hex":
                      return e;
                    default:
                      if (t) return;
                      (e = ("" + e).toLowerCase()), (t = !0);
                  }
              })(e);
              if ("string" != typeof t && (i.isEncoding === n || !n(e)))
                throw new Error("Unknown encoding: " + e);
              return t || e;
            })(e)),
            this.encoding)
          ) {
            case "utf16le":
              (this.text = s), (this.end = d), (t = 4);
              break;
            case "utf8":
              (this.fillLast = o), (t = 4);
              break;
            case "base64":
              (this.text = c), (this.end = h), (t = 3);
              break;
            default:
              return (this.write = u), void (this.end = l);
          }
          (this.lastNeed = 0),
            (this.lastTotal = 0),
            (this.lastChar = i.allocUnsafe(t));
        }
        function a(e) {
          return e <= 127
            ? 0
            : e >> 5 == 6
            ? 2
            : e >> 4 == 14
            ? 3
            : e >> 3 == 30
            ? 4
            : e >> 6 == 2
            ? -1
            : -2;
        }
        function o(e) {
          var t = this.lastTotal - this.lastNeed,
            r = (function (e, t, r) {
              if (128 != (192 & t[0])) return (e.lastNeed = 0), "�";
              if (e.lastNeed > 1 && t.length > 1) {
                if (128 != (192 & t[1])) return (e.lastNeed = 1), "�";
                if (e.lastNeed > 2 && t.length > 2 && 128 != (192 & t[2]))
                  return (e.lastNeed = 2), "�";
              }
            })(this, e);
          return void 0 !== r
            ? r
            : this.lastNeed <= e.length
            ? (e.copy(this.lastChar, t, 0, this.lastNeed),
              this.lastChar.toString(this.encoding, 0, this.lastTotal))
            : (e.copy(this.lastChar, t, 0, e.length),
              void (this.lastNeed -= e.length));
        }
        function s(e, t) {
          if ((e.length - t) % 2 == 0) {
            var r = e.toString("utf16le", t);
            if (r) {
              var i = r.charCodeAt(r.length - 1);
              if (i >= 55296 && i <= 56319)
                return (
                  (this.lastNeed = 2),
                  (this.lastTotal = 4),
                  (this.lastChar[0] = e[e.length - 2]),
                  (this.lastChar[1] = e[e.length - 1]),
                  r.slice(0, -1)
                );
            }
            return r;
          }
          return (
            (this.lastNeed = 1),
            (this.lastTotal = 2),
            (this.lastChar[0] = e[e.length - 1]),
            e.toString("utf16le", t, e.length - 1)
          );
        }
        function d(e) {
          var t = e && e.length ? this.write(e) : "";
          if (this.lastNeed) {
            var r = this.lastTotal - this.lastNeed;
            return t + this.lastChar.toString("utf16le", 0, r);
          }
          return t;
        }
        function c(e, t) {
          var r = (e.length - t) % 3;
          return 0 === r
            ? e.toString("base64", t)
            : ((this.lastNeed = 3 - r),
              (this.lastTotal = 3),
              1 === r
                ? (this.lastChar[0] = e[e.length - 1])
                : ((this.lastChar[0] = e[e.length - 2]),
                  (this.lastChar[1] = e[e.length - 1])),
              e.toString("base64", t, e.length - r));
        }
        function h(e) {
          var t = e && e.length ? this.write(e) : "";
          return this.lastNeed
            ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed)
            : t;
        }
        function u(e) {
          return e.toString(this.encoding);
        }
        function l(e) {
          return e && e.length ? this.write(e) : "";
        }
        (t.s = f),
          (f.prototype.write = function (e) {
            if (0 === e.length) return "";
            var t, r;
            if (this.lastNeed) {
              if (void 0 === (t = this.fillLast(e))) return "";
              (r = this.lastNeed), (this.lastNeed = 0);
            } else r = 0;
            return r < e.length
              ? t
                ? t + this.text(e, r)
                : this.text(e, r)
              : t || "";
          }),
          (f.prototype.end = function (e) {
            var t = e && e.length ? this.write(e) : "";
            return this.lastNeed ? t + "�" : t;
          }),
          (f.prototype.text = function (e, t) {
            var r = (function (e, t, r) {
              var i = t.length - 1;
              if (i < r) return 0;
              var n = a(t[i]);
              return n >= 0
                ? (n > 0 && (e.lastNeed = n - 1), n)
                : --i < r || -2 === n
                ? 0
                : (n = a(t[i])) >= 0
                ? (n > 0 && (e.lastNeed = n - 2), n)
                : --i < r || -2 === n
                ? 0
                : (n = a(t[i])) >= 0
                ? (n > 0 && (2 === n ? (n = 0) : (e.lastNeed = n - 3)), n)
                : 0;
            })(this, e, t);
            if (!this.lastNeed) return e.toString("utf8", t);
            this.lastTotal = r;
            var i = e.length - (r - this.lastNeed);
            return e.copy(this.lastChar, 0, i), e.toString("utf8", t, i);
          }),
          (f.prototype.fillLast = function (e) {
            if (this.lastNeed <= e.length)
              return (
                e.copy(
                  this.lastChar,
                  this.lastTotal - this.lastNeed,
                  0,
                  this.lastNeed
                ),
                this.lastChar.toString(this.encoding, 0, this.lastTotal)
              );
            e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length),
              (this.lastNeed -= e.length);
          });
      },
      4927: (e, t, r) => {
        function i(e) {
          try {
            if (!r.g.localStorage) return !1;
          } catch (e) {
            return !1;
          }
          var t = r.g.localStorage[e];
          return null != t && "true" === String(t).toLowerCase();
        }
        e.exports = function (e, t) {
          if (i("noDeprecation")) return e;
          var r = !1;
          return function () {
            if (!r) {
              if (i("throwDeprecation")) throw new Error(t);
              i("traceDeprecation") ? console.trace(t) : console.warn(t),
                (r = !0);
            }
            return e.apply(this, arguments);
          };
        };
      },
      9214: () => {},
      5568: () => {},
      9120: () => {},
      6586: () => {},
      8597: (e) => {
        "use strict";
        e.exports = { i8: "6.5.4" };
      },
    },
    t = {};
  function r(i) {
    var n = t[i];
    if (void 0 !== n) return n.exports;
    var f = (t[i] = { id: i, loaded: !1, exports: {} });
    return e[i].call(f.exports, f, f.exports, r), (f.loaded = !0), f.exports;
  }
  (r.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e) {
      if ("object" == typeof window) return window;
    }
  })()),
    (r.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
    r(5956);
})();
