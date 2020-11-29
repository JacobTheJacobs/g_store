/*! jQuery Migrate v3.0.0 | (c) jQuery Foundation and other contributors | jquery.org/license */
"undefined" == typeof jQuery.migrateMute && (jQuery.migrateMute = !0),
function(A, e) {
    "use strict";
    function t(t) {
        var i = e.console;
        o[t] || (o[t] = !0,
        A.migrateWarnings.push(t),
        i && i.warn && !A.migrateMute && (i.warn("JQMIGRATE: " + t),
        A.migrateTrace && i.trace && i.trace()))
    }
    function i(A, e, i, o) {
        Object.defineProperty(A, e, {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return t(o),
                i
            }
        })
    }
    A.migrateVersion = "3.0.0",
    function() {
        var t = e.console && e.console.log && function() {
            e.console.log.apply(e.console, arguments)
        }
          , i = /^[12]\./;
        t && (A && !i.test(A.fn.jquery) || t("JQMIGRATE: jQuery 3.0.0+ REQUIRED"),
        A.migrateWarnings && t("JQMIGRATE: Migrate plugin loaded multiple times"),
        t("JQMIGRATE: Migrate is installed" + (A.migrateMute ? "" : " with logging active") + ", version " + A.migrateVersion))
    }();
    var o = {};
    A.migrateWarnings = [],
    void 0 === A.migrateTrace && (A.migrateTrace = !0),
    A.migrateReset = function() {
        o = {},
        A.migrateWarnings.length = 0
    }
    ,
    "BackCompat" === document.compatMode && t("jQuery is not compatible with Quirks Mode");
    var n = A.fn.init
      , s = A.isNumeric
      , r = A.find
      , a = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/
      , l = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g;
    A.fn.init = function(A) {
        var e = Array.prototype.slice.call(arguments);
        return "string" == typeof A && "#" === A && (t("jQuery( '#' ) is not a valid selector"),
        e[0] = []),
        n.apply(this, e)
    }
    ,
    A.fn.init.prototype = A.fn,
    A.find = function(A) {
        var e = Array.prototype.slice.call(arguments);
        if ("string" == typeof A && a.test(A))
            try {
                document.querySelector(A)
            } catch (i) {
                A = A.replace(l, function(A, e, t, i) {
                    return "[" + e + t + '"' + i + '"]'
                });
                try {
                    document.querySelector(A),
                    t("Attribute selector with '#' must be quoted: " + e[0]),
                    e[0] = A
                } catch (A) {
                    t("Attribute selector with '#' was not fixed: " + e[0])
                }
            }
        return r.apply(this, e)
    }
    ;
    var d;
    for (d in r)
        Object.prototype.hasOwnProperty.call(r, d) && (A.find[d] = r[d]);
    A.fn.size = function() {
        return t("jQuery.fn.size() is deprecated; use the .length property"),
        this.length
    }
    ,
    A.parseJSON = function() {
        return t("jQuery.parseJSON is deprecated; use JSON.parse"),
        JSON.parse.apply(null, arguments)
    }
    ,
    A.isNumeric = function(e) {
        function i(e) {
            var t = e && e.toString();
            return !A.isArray(e) && t - parseFloat(t) + 1 >= 0
        }
        var o = s(e)
          , n = i(e);
        return o !== n && t("jQuery.isNumeric() should not be called on constructed objects"),
        n
    }
    ,
    i(A, "unique", A.uniqueSort, "jQuery.unique is deprecated, use jQuery.uniqueSort"),
    i(A.expr, "filters", A.expr.pseudos, "jQuery.expr.filters is now jQuery.expr.pseudos"),
    i(A.expr, ":", A.expr.pseudos, 'jQuery.expr[":"] is now jQuery.expr.pseudos');
    var c = A.ajax;
    A.ajax = function() {
        var A = c.apply(this, arguments);
        return A.promise && (i(A, "success", A.done, "jQXHR.success is deprecated and removed"),
        i(A, "error", A.fail, "jQXHR.error is deprecated and removed"),
        i(A, "complete", A.always, "jQXHR.complete is deprecated and removed")),
        A
    }
    ;
    var p = A.fn.removeAttr
      , u = A.fn.toggleClass
      , f = /\S+/g;
    A.fn.removeAttr = function(e) {
        var i = this;
        return A.each(e.match(f), function(e, o) {
            A.expr.match.bool.test(o) && (t("jQuery.fn.removeAttr no longer sets boolean properties: " + o),
            i.prop(o, !1))
        }),
        p.apply(this, arguments)
    }
    ,
    A.fn.toggleClass = function(e) {
        return void 0 !== e && "boolean" != typeof e ? u.apply(this, arguments) : (t("jQuery.fn.toggleClass( boolean ) is deprecated"),
        this.each(function() {
            var t = this.getAttribute && this.getAttribute("class") || "";
            t && A.data(this, "__className__", t),
            this.setAttribute && this.setAttribute("class", t || e === !1 ? "" : A.data(this, "__className__") || "")
        }))
    }
    ;
    var w = !1;
    A.swap && A.each(["height", "width", "reliableMarginRight"], function(e, t) {
        var i = A.cssHooks[t] && A.cssHooks[t].get;
        i && (A.cssHooks[t].get = function() {
            var A;
            return w = !0,
            A = i.apply(this, arguments),
            w = !1,
            A
        }
        )
    }),
    A.swap = function(A, e, i, o) {
        var n, s, r = {};
        w || t("jQuery.swap() is undocumented and deprecated");
        for (s in e)
            r[s] = A.style[s],
            A.style[s] = e[s];
        n = i.apply(A, o || []);
        for (s in e)
            A.style[s] = r[s];
        return n
    }
    ;
    var h = A.data;
    A.data = function(e, i, o) {
        var n;
        return i && i !== A.camelCase(i) && (n = A.hasData(e) && h.call(this, e),
        n && i in n) ? (t("jQuery.data() always sets/gets camelCased names: " + i),
        arguments.length > 2 && (n[i] = o),
        n[i]) : h.apply(this, arguments)
    }
    ;
    var g = A.Tween.prototype.run;
    A.Tween.prototype.run = function(e) {
        A.easing[this.easing].length > 1 && (t('easing function "jQuery.easing.' + this.easing.toString() + '" should use only first argument'),
        A.easing[this.easing] = A.easing[this.easing].bind(A.easing, e, this.options.duration * e, 0, 1, this.options.duration)),
        g.apply(this, arguments)
    }
    ;
    var v = A.fn.load
      , m = A.event.fix;
    A.event.props = [],
    A.event.fixHooks = {},
    A.event.fix = function(e) {
        var i, o = e.type, n = this.fixHooks[o], s = A.event.props;
        if (s.length)
            for (t("jQuery.event.props are deprecated and removed: " + s.join()); s.length; )
                A.event.addProp(s.pop());
        if (n && !n._migrated_ && (n._migrated_ = !0,
        t("jQuery.event.fixHooks are deprecated and removed: " + o),
        (s = n.props) && s.length))
            for (; s.length; )
                A.event.addProp(s.pop());
        return i = m.call(this, e),
        n && n.filter ? n.filter(i, e) : i
    }
    ,
    A.each(["load", "unload", "error"], function(e, i) {
        A.fn[i] = function() {
            var A = Array.prototype.slice.call(arguments, 0);
            return "load" === i && "string" == typeof A[0] ? v.apply(this, A) : (t("jQuery.fn." + i + "() is deprecated"),
            A.splice(0, 0, i),
            arguments.length ? this.on.apply(this, A) : (this.triggerHandler.apply(this, A),
            this))
        }
    }),
    A(function() {
        A(document).triggerHandler("ready")
    }),
    A.event.special.ready = {
        setup: function() {
            this === document && t("'ready' event is deprecated")
        }
    },
    A.fn.extend({
        bind: function(A, e, i) {
            return t("jQuery.fn.bind() is deprecated"),
            this.on(A, null, e, i)
        },
        unbind: function(A, e) {
            return t("jQuery.fn.unbind() is deprecated"),
            this.off(A, null, e)
        },
        delegate: function(A, e, i, o) {
            return t("jQuery.fn.delegate() is deprecated"),
            this.on(e, A, i, o)
        },
        undelegate: function(A, e, i) {
            return t("jQuery.fn.undelegate() is deprecated"),
            1 === arguments.length ? this.off(A, "**") : this.off(e, A || "**", i)
        }
    });
    var y = A.fn.offset;
    A.fn.offset = function() {
        var e, i = this[0], o = {
            top: 0,
            left: 0
        };
        return i && i.nodeType ? (e = (i.ownerDocument || document).documentElement,
        A.contains(e, i) ? y.apply(this, arguments) : (t("jQuery.fn.offset() requires an element connected to a document"),
        o)) : (t("jQuery.fn.offset() requires a valid DOM element"),
        o)
    }
    ;
    var D = A.param;
    A.param = function(e, i) {
        var o = A.ajaxSettings && A.ajaxSettings.traditional;
        return void 0 === i && o && (t("jQuery.param() no longer uses jQuery.ajaxSettings.traditional"),
        i = o),
        D.call(this, e, i)
    }
    ;
    var P = A.fn.andSelf || A.fn.addBack;
    A.fn.andSelf = function() {
        return t("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),
        P.apply(this, arguments)
    }
    ;
    var C = A.Deferred
      , E = [["resolve", "done", A.Callbacks("once memory"), A.Callbacks("once memory"), "resolved"], ["reject", "fail", A.Callbacks("once memory"), A.Callbacks("once memory"), "rejected"], ["notify", "progress", A.Callbacks("memory"), A.Callbacks("memory")]];
    A.Deferred = function(e) {
        var i = C()
          , o = i.promise();
        return i.pipe = o.pipe = function() {
            var e = arguments;
            return t("deferred.pipe() is deprecated"),
            A.Deferred(function(t) {
                A.each(E, function(n, s) {
                    var r = A.isFunction(e[n]) && e[n];
                    i[s[1]](function() {
                        var e = r && r.apply(this, arguments);
                        e && A.isFunction(e.promise) ? e.promise().done(t.resolve).fail(t.reject).progress(t.notify) : t[s[0] + "With"](this === o ? t.promise() : this, r ? [e] : arguments)
                    })
                }),
                e = null
            }).promise()
        }
        ,
        e && e.call(i, i),
        i
    }
}(jQuery, window),
/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-animation-audio-audioloop-audiopreload-backgroundsize-bgsizecover-borderradius-boxshadow-boxsizing-canvas-canvastext-checked-cors-cssanimations-csscalc-csscolumns-cssgradients-csspointerevents-cssremunit-csstransforms-csstransforms3d-csstransitions-emoji-flexbox-flexboxlegacy-fullscreen-geolocation-hashchange-hiddenscroll-history-htmlimports-inlinesvg-intl-json-multiplebgs-nthchild-opacity-pagevisibility-pointerevents-preserve3d-rgba-shapes-supports-svg-svgasimg-textshadow-touchevents-video-videoautoplay-videoloop-videopreload-webaudio-webgl-webglextensions-websockets-webworkers-atrule-domprefixes-prefixedcss-prefixedcssvalue-prefixes-setclasses-shiv !*/
!function(A, e, t) {
    function i(A, e) {
        return typeof A === e
    }
    function o() {
        var A, e, t, o, n, s, r;
        for (var a in y)
            if (y.hasOwnProperty(a)) {
                if (A = [],
                e = y[a],
                e.name && (A.push(e.name.toLowerCase()),
                e.options && e.options.aliases && e.options.aliases.length))
                    for (t = 0; t < e.options.aliases.length; t++)
                        A.push(e.options.aliases[t].toLowerCase());
                for (o = i(e.fn, "function") ? e.fn() : e.fn,
                n = 0; n < A.length; n++)
                    s = A[n],
                    r = s.split("."),
                    1 === r.length ? P[r[0]] = o : (!P[r[0]] || P[r[0]]instanceof Boolean || (P[r[0]] = new Boolean(P[r[0]])),
                    P[r[0]][r[1]] = o),
                    m.push((o ? "" : "no-") + r.join("-"))
            }
    }
    function n(A) {
        var e = T.className
          , t = P._config.classPrefix || "";
        if (b && (e = e.baseVal),
        P._config.enableJSClass) {
            var i = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
            e = e.replace(i, "$1" + t + "js$2")
        }
        P._config.enableClasses && (e += " " + t + A.join(" " + t),
        b ? T.className.baseVal = e : T.className = e)
    }
    function s(A) {
        return A.replace(/([A-Z])/g, function(A, e) {
            return "-" + e.toLowerCase()
        }).replace(/^ms-/, "-ms-")
    }
    function r() {
        return "function" != typeof e.createElement ? e.createElement(arguments[0]) : b ? e.createElementNS.call(e, "http://www.w3.org/2000/svg", arguments[0]) : e.createElement.apply(e, arguments)
    }
    function a(A) {
        return A.replace(/([a-z])-([a-z])/g, function(A, e, t) {
            return e + t.toUpperCase()
        }).replace(/^-/, "")
    }
    function l(A, e) {
        if ("object" == typeof A)
            for (var t in A)
                V(A, t) && l(t, A[t]);
        else {
            A = A.toLowerCase();
            var i = A.split(".")
              , o = P[i[0]];
            if (2 == i.length && (o = o[i[1]]),
            "undefined" != typeof o)
                return P;
            e = "function" == typeof e ? e() : e,
            1 == i.length ? P[i[0]] = e : (!P[i[0]] || P[i[0]]instanceof Boolean || (P[i[0]] = new Boolean(P[i[0]])),
            P[i[0]][i[1]] = e),
            n([(e && 0 != e ? "" : "no-") + i.join("-")]),
            P._trigger(A, e)
        }
        return P
    }
    function d() {
        var A = e.body;
        return A || (A = r(b ? "svg" : "body"),
        A.fake = !0),
        A
    }
    function c(A, t, i, o) {
        var n, s, a, l, c = "modernizr", p = r("div"), u = d();
        if (parseInt(i, 10))
            for (; i--; )
                a = r("div"),
                a.id = o ? o[i] : c + (i + 1),
                p.appendChild(a);
        return n = r("style"),
        n.type = "text/css",
        n.id = "s" + c,
        (u.fake ? u : p).appendChild(n),
        u.appendChild(p),
        n.styleSheet ? n.styleSheet.cssText = A : n.appendChild(e.createTextNode(A)),
        p.id = c,
        u.fake && (u.style.background = "",
        u.style.overflow = "hidden",
        l = T.style.overflow,
        T.style.overflow = "hidden",
        T.appendChild(u)),
        s = t(p, A),
        u.fake ? (u.parentNode.removeChild(u),
        T.style.overflow = l,
        T.offsetHeight) : p.parentNode.removeChild(p),
        !!s
    }
    function p(A, e) {
        return !!~("" + A).indexOf(e)
    }
    function u(e, i) {
        var o = e.length;
        if ("CSS"in A && "supports"in A.CSS) {
            for (; o--; )
                if (A.CSS.supports(s(e[o]), i))
                    return !0;
            return !1
        }
        if ("CSSSupportsRule"in A) {
            for (var n = []; o--; )
                n.push("(" + s(e[o]) + ":" + i + ")");
            return n = n.join(" or "),
            c("@supports (" + n + ") { #modernizr { position: absolute; } }", function(A) {
                return "absolute" == getComputedStyle(A, null).position
            })
        }
        return t
    }
    function f(A, e) {
        return function() {
            return A.apply(e, arguments)
        }
    }
    function w(A, e, t) {
        var o;
        for (var n in A)
            if (A[n]in e)
                return t === !1 ? A[n] : (o = e[A[n]],
                i(o, "function") ? f(o, t || e) : o);
        return !1
    }
    function h(A, e, o, n) {
        function s() {
            d && (delete $.style,
            delete $.modElem)
        }
        if (n = !i(n, "undefined") && n,
        !i(o, "undefined")) {
            var l = u(A, o);
            if (!i(l, "undefined"))
                return l
        }
        for (var d, c, f, w, h, g = ["modernizr", "tspan", "samp"]; !$.style && g.length; )
            d = !0,
            $.modElem = r(g.shift()),
            $.style = $.modElem.style;
        for (f = A.length,
        c = 0; f > c; c++)
            if (w = A[c],
            h = $.style[w],
            p(w, "-") && (w = a(w)),
            $.style[w] !== t) {
                if (n || i(o, "undefined"))
                    return s(),
                    "pfx" != e || w;
                try {
                    $.style[w] = o
                } catch (A) {}
                if ($.style[w] != h)
                    return s(),
                    "pfx" != e || w
            }
        return s(),
        !1
    }
    function g(A, e, t, o, n) {
        var s = A.charAt(0).toUpperCase() + A.slice(1)
          , r = (A + " " + x.join(s + " ") + s).split(" ");
        return i(e, "string") || i(e, "undefined") ? h(r, e, o, n) : (r = (A + " " + Q.join(s + " ") + s).split(" "),
        w(r, e, t))
    }
    function v(A, e, i) {
        return g(A, t, t, e, i)
    }
    var m = []
      , y = []
      , D = {
        _version: "3.3.1",
        _config: {
            classPrefix: "",
            enableClasses: !0,
            enableJSClass: !0,
            usePrefixes: !0
        },
        _q: [],
        on: function(A, e) {
            var t = this;
            setTimeout(function() {
                e(t[A])
            }, 0)
        },
        addTest: function(A, e, t) {
            y.push({
                name: A,
                fn: e,
                options: t
            })
        },
        addAsyncTest: function(A) {
            y.push({
                name: null,
                fn: A
            })
        }
    }
      , P = function() {};
    P.prototype = D,
    P = new P,
    P.addTest("cors", "XMLHttpRequest"in A && "withCredentials"in new XMLHttpRequest),
    P.addTest("geolocation", "geolocation"in navigator),
    P.addTest("history", function() {
        var e = navigator.userAgent;
        return (-1 === e.indexOf("Android 2.") && -1 === e.indexOf("Android 4.0") || -1 === e.indexOf("Mobile Safari") || -1 !== e.indexOf("Chrome") || -1 !== e.indexOf("Windows Phone")) && (A.history && "pushState"in A.history)
    }),
    P.addTest("json", "JSON"in A && "parse"in JSON && "stringify"in JSON),
    P.addTest("svg", !!e.createElementNS && !!e.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect);
    var C = !1;
    try {
        C = "WebSocket"in A && 2 === A.WebSocket.CLOSING
    } catch (A) {}
    P.addTest("websockets", C),
    P.addTest("webaudio", function() {
        var e = "webkitAudioContext"in A
          , t = "AudioContext"in A;
        return P._config.usePrefixes ? e || t : t
    });
    var E = "CSS"in A && "supports"in A.CSS
      , S = "supportsCSS"in A;
    P.addTest("supports", E || S);
    var k = D._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
    D._prefixes = k;
    var T = e.documentElement
      , b = "svg" === T.nodeName.toLowerCase();
    b || !function(A, e) {
        function t(A, e) {
            var t = A.createElement("p")
              , i = A.getElementsByTagName("head")[0] || A.documentElement;
            return t.innerHTML = "x<style>" + e + "</style>",
            i.insertBefore(t.lastChild, i.firstChild)
        }
        function i() {
            var A = m.elements;
            return "string" == typeof A ? A.split(" ") : A
        }
        function o(A, e) {
            var t = m.elements;
            "string" != typeof t && (t = t.join(" ")),
            "string" != typeof A && (A = A.join(" ")),
            m.elements = t + " " + A,
            l(e)
        }
        function n(A) {
            var e = v[A[h]];
            return e || (e = {},
            g++,
            A[h] = g,
            v[g] = e),
            e
        }
        function s(A, t, i) {
            if (t || (t = e),
            c)
                return t.createElement(A);
            i || (i = n(t));
            var o;
            return o = i.cache[A] ? i.cache[A].cloneNode() : w.test(A) ? (i.cache[A] = i.createElem(A)).cloneNode() : i.createElem(A),
            !o.canHaveChildren || f.test(A) || o.tagUrn ? o : i.frag.appendChild(o)
        }
        function r(A, t) {
            if (A || (A = e),
            c)
                return A.createDocumentFragment();
            t = t || n(A);
            for (var o = t.frag.cloneNode(), s = 0, r = i(), a = r.length; a > s; s++)
                o.createElement(r[s]);
            return o
        }
        function a(A, e) {
            e.cache || (e.cache = {},
            e.createElem = A.createElement,
            e.createFrag = A.createDocumentFragment,
            e.frag = e.createFrag()),
            A.createElement = function(t) {
                return m.shivMethods ? s(t, A, e) : e.createElem(t)
            }
            ,
            A.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + i().join().replace(/[\w\-:]+/g, function(A) {
                return e.createElem(A),
                e.frag.createElement(A),
                'c("' + A + '")'
            }) + ");return n}")(m, e.frag)
        }
        function l(A) {
            A || (A = e);
            var i = n(A);
            return !m.shivCSS || d || i.hasCSS || (i.hasCSS = !!t(A, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),
            c || a(A, i),
            A
        }
        var d, c, p = "3.7.3", u = A.html5 || {}, f = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, w = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, h = "_html5shiv", g = 0, v = {};
        !function() {
            try {
                var A = e.createElement("a");
                A.innerHTML = "<xyz></xyz>",
                d = "hidden"in A,
                c = 1 == A.childNodes.length || function() {
                    e.createElement("a");
                    var A = e.createDocumentFragment();
                    return "undefined" == typeof A.cloneNode || "undefined" == typeof A.createDocumentFragment || "undefined" == typeof A.createElement
                }()
            } catch (A) {
                d = !0,
                c = !0
            }
        }();
        var m = {
            elements: u.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
            version: p,
            shivCSS: u.shivCSS !== !1,
            supportsUnknownElements: c,
            shivMethods: u.shivMethods !== !1,
            type: "default",
            shivDocument: l,
            createElement: s,
            createDocumentFragment: r,
            addElements: o
        };
        A.html5 = m,
        l(e),
        "object" == typeof module && module.exports && (module.exports = m)
    }("undefined" != typeof A ? A : this, e);
    var B = "Moz O ms Webkit"
      , Q = D._config.usePrefixes ? B.toLowerCase().split(" ") : [];
    D._domPrefixes = Q;
    var x = D._config.usePrefixes ? B.split(" ") : [];
    D._cssomPrefixes = x;
    var I = function(e) {
        var i, o = k.length, n = A.CSSRule;
        if ("undefined" == typeof n)
            return t;
        if (!e)
            return !1;
        if (e = e.replace(/^@/, ""),
        i = e.replace(/-/g, "_").toUpperCase() + "_RULE",
        i in n)
            return "@" + e;
        for (var s = 0; o > s; s++) {
            var r = k[s]
              , a = r.toUpperCase() + "_" + i;
            if (a in n)
                return "@-" + r.toLowerCase() + "-" + e
        }
        return !1
    };
    D.atRule = I;
    var M = function(A, e) {
        var t = !1
          , i = r("div")
          , o = i.style;
        if (A in o) {
            var n = Q.length;
            for (o[A] = e,
            t = o[A]; n-- && !t; )
                o[A] = "-" + Q[n] + "-" + e,
                t = o[A]
        }
        return "" === t && (t = !1),
        t
    };
    D.prefixedCSSValue = M,
    P.addTest("audio", function() {
        var A = r("audio")
          , e = !1;
        try {
            (e = !!A.canPlayType) && (e = new Boolean(e),
            e.ogg = A.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
            e.mp3 = A.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/, ""),
            e.opus = A.canPlayType('audio/ogg; codecs="opus"') || A.canPlayType('audio/webm; codecs="opus"').replace(/^no$/, ""),
            e.wav = A.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
            e.m4a = (A.canPlayType("audio/x-m4a;") || A.canPlayType("audio/aac;")).replace(/^no$/, ""))
        } catch (A) {}
        return e
    }),
    P.addTest("canvas", function() {
        var A = r("canvas");
        return !(!A.getContext || !A.getContext("2d"))
    }),
    P.addTest("canvastext", function() {
        return P.canvas !== !1 && "function" == typeof r("canvas").getContext("2d").fillText
    }),
    P.addTest("emoji", function() {
        if (!P.canvastext)
            return !1;
        var e = A.devicePixelRatio || 1
          , t = 12 * e
          , i = r("canvas")
          , o = i.getContext("2d");
        return o.fillStyle = "#f00",
        o.textBaseline = "top",
        o.font = "32px Arial",
        o.fillText("\ud83d\udc28", 0, 0),
        0 !== o.getImageData(t, t, 1, 1).data[0]
    }),
    P.addTest("video", function() {
        var A = r("video")
          , e = !1;
        try {
            (e = !!A.canPlayType) && (e = new Boolean(e),
            e.ogg = A.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""),
            e.h264 = A.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""),
            e.webm = A.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""),
            e.vp9 = A.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ""),
            e.hls = A.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ""))
        } catch (A) {}
        return e
    }),
    P.addTest("webanimations", "animate"in r("div")),
    P.addTest("webgl", function() {
        var e = r("canvas")
          , t = "probablySupportsContext"in e ? "probablySupportsContext" : "supportsContext";
        return t in e ? e[t]("webgl") || e[t]("experimental-webgl") : "WebGLRenderingContext"in A
    }),
    P.addTest("audioloop", "loop"in r("audio")),
    P.addTest("csscalc", function() {
        var A = "width:"
          , e = "calc(10px);"
          , t = r("a");
        return t.style.cssText = A + k.join(e + A),
        !!t.style.length
    }),
    P.addTest("cssgradients", function() {
        for (var A, e = "background-image:", t = "gradient(linear,left top,right bottom,from(#9f9),to(white));", i = "", o = 0, n = k.length - 1; n > o; o++)
            A = 0 === o ? "to " : "",
            i += e + k[o] + "linear-gradient(" + A + "left top, #9f9, white);";
        P._config.usePrefixes && (i += e + "-webkit-" + t);
        var s = r("a")
          , a = s.style;
        return a.cssText = i,
        ("" + a.backgroundImage).indexOf("gradient") > -1
    }),
    P.addTest("multiplebgs", function() {
        var A = r("a").style;
        return A.cssText = "background:url(https://),url(https://),red url(https://)",
        /(url\s*\(.*?){3}/.test(A.background)
    }),
    P.addTest("opacity", function() {
        var A = r("a").style;
        return A.cssText = k.join("opacity:.55;"),
        /^0.55$/.test(A.opacity)
    }),
    P.addTest("csspointerevents", function() {
        var A = r("a").style;
        return A.cssText = "pointer-events:auto",
        "auto" === A.pointerEvents
    }),
    P.addTest("cssremunit", function() {
        var A = r("a").style;
        try {
            A.fontSize = "3rem"
        } catch (A) {}
        return /rem/.test(A.fontSize)
    }),
    P.addTest("rgba", function() {
        var A = r("a").style;
        return A.cssText = "background-color:rgba(150,255,150,.5)",
        ("" + A.backgroundColor).indexOf("rgba") > -1
    }),
    P.addTest("preserve3d", function() {
        var A = r("a")
          , e = r("a");
        A.style.cssText = "display: block; transform-style: preserve-3d; transform-origin: right; transform: rotateY(40deg);",
        e.style.cssText = "display: block; width: 9px; height: 1px; background: #000; transform-origin: right; transform: rotateY(40deg);",
        A.appendChild(e),
        T.appendChild(A);
        var t = e.getBoundingClientRect();
        return T.removeChild(A),
        t.width && t.width < 4
    }),
    P.addTest("inlinesvg", function() {
        var A = r("div");
        return A.innerHTML = "<svg/>",
        "http://www.w3.org/2000/svg" == ("undefined" != typeof SVGRect && A.firstChild && A.firstChild.namespaceURI)
    }),
    P.addTest("videoloop", "loop"in r("video")),
    P.addTest("videopreload", "preload"in r("video")),
    P.addAsyncTest(function() {
        if (P.webglextensions = new Boolean(!1),
        P.webgl) {
            var A, e, i;
            try {
                A = r("canvas"),
                e = A.getContext("webgl") || A.getContext("experimental-webgl"),
                i = e.getSupportedExtensions()
            } catch (A) {
                return
            }
            e !== t && (P.webglextensions = new Boolean(!0));
            for (var o = -1, n = i.length; ++o < n; )
                P.webglextensions[i[o]] = !0;
            A = t
        }
    });
    var R = function() {
        function A(A, e) {
            var o;
            return !!A && (e && "string" != typeof e || (e = r(e || "div")),
            A = "on" + A,
            o = A in e,
            !o && i && (e.setAttribute || (e = r("div")),
            e.setAttribute(A, ""),
            o = "function" == typeof e[A],
            e[A] !== t && (e[A] = t),
            e.removeAttribute(A)),
            o)
        }
        var i = !("onblur"in e.documentElement);
        return A
    }();
    D.hasEvent = R,
    P.addTest("hashchange", function() {
        return R("hashchange", A) !== !1 && (e.documentMode === t || e.documentMode > 7)
    }),
    P.addTest("pointerevents", function() {
        var A = !1
          , e = Q.length;
        for (A = P.hasEvent("pointerdown"); e-- && !A; )
            R(Q[e] + "pointerdown") && (A = !0);
        return A
    }),
    P.addTest("webworkers", "Worker"in A);
    var V;
    !function() {
        var A = {}.hasOwnProperty;
        V = i(A, "undefined") || i(A.call, "undefined") ? function(A, e) {
            return e in A && i(A.constructor.prototype[e], "undefined")
        }
        : function(e, t) {
            return A.call(e, t)
        }
    }(),
    D._l = {},
    D.on = function(A, e) {
        this._l[A] || (this._l[A] = []),
        this._l[A].push(e),
        P.hasOwnProperty(A) && setTimeout(function() {
            P._trigger(A, P[A])
        }, 0)
    }
    ,
    D._trigger = function(A, e) {
        if (this._l[A]) {
            var t = this._l[A];
            setTimeout(function() {
                var A, i;
                for (A = 0; A < t.length; A++)
                    (i = t[A])(e)
            }, 0),
            delete this._l[A]
        }
    }
    ,
    P._q.push(function() {
        D.addTest = l
    }),
    l("htmlimports", "import"in r("link")),
    P.addAsyncTest(function() {
        function A(i) {
            clearTimeout(e);
            var n = i !== t && "loadeddata" === i.type;
            o.removeEventListener("loadeddata", A, !1),
            l("audiopreload", n),
            o.parentNode.removeChild(o)
        }
        var e, i = 300, o = r("audio"), n = o.style;
        if (!(P.audio && "preload"in o))
            return void l("audiopreload", !1);
        n.position = "absolute",
        n.height = 0,
        n.width = 0;
        try {
            if (P.audio.mp3)
                o.src = "data:audio/mpeg;base64,//MUxAAB6AXgAAAAAPP+c6nf//yi/6f3//MUxAMAAAIAAAjEcH//0fTX6C9Lf//0//MUxA4BeAIAAAAAAKX2/6zv//+IlR4f//MUxBMCMAH8AAAAABYWalVMQU1FMy45//MUxBUB0AH0AAAAADkuM1VVVVVVVVVV//MUxBgBUATowAAAAFVVVVVVVVVVVVVV";
            else if (P.audio.m4a)
                o.src = "data:audio/x-m4a;base64,AAAAGGZ0eXBNNEEgAAACAGlzb21pc28yAAAACGZyZWUAAAAfbWRhdN4EAABsaWJmYWFjIDEuMjgAAAFoAQBHAAACiG1vb3YAAABsbXZoZAAAAAB8JbCAfCWwgAAAA+gAAAAYAAEAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAG0dHJhawAAAFx0a2hkAAAAD3wlsIB8JbCAAAAAAQAAAAAAAAAYAAAAAAAAAAAAAAAAAQAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAABUG1kaWEAAAAgbWRoZAAAAAB8JbCAfCWwgAAArEQAAAQAVcQAAAAAAC1oZGxyAAAAAAAAAABzb3VuAAAAAAAAAAAAAAAAU291bmRIYW5kbGVyAAAAAPttaW5mAAAAEHNtaGQAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAL9zdGJsAAAAW3N0c2QAAAAAAAAAAQAAAEttcDRhAAAAAAAAAAEAAAAAAAAAAAACABAAAAAArEQAAAAAACdlc2RzAAAAAAMZAAEABBFAFQAAAAABftAAAAAABQISCAYBAgAAABhzdHRzAAAAAAAAAAEAAAABAAAEAAAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAUc3RzegAAAAAAAAAXAAAAAQAAABRzdGNvAAAAAAAAAAEAAAAoAAAAYHVkdGEAAABYbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAAraWxzdAAAACOpdG9vAAAAG2RhdGEAAAABAAAAAExhdmY1Mi42NC4y";
            else if (P.audio.ogg)
                o.src = "data:audio/ogg;base64,T2dnUwACAAAAAAAAAAD/QwAAAAAAAM2LVKsBHgF2b3JiaXMAAAAAAUSsAAAAAAAAgLsAAAAAAAC4AU9nZ1MAAAAAAAAAAAAA/0MAAAEAAADmvOe6Dy3/////////////////MgN2b3JiaXMdAAAAWGlwaC5PcmcgbGliVm9yYmlzIEkgMjAwNzA2MjIAAAAAAQV2b3JiaXMfQkNWAQAAAQAYY1QpRplS0kqJGXOUMUaZYpJKiaWEFkJInXMUU6k515xrrLm1IIQQGlNQKQWZUo5SaRljkCkFmVIQS0kldBI6J51jEFtJwdaYa4tBthyEDZpSTCnElFKKQggZU4wpxZRSSkIHJXQOOuYcU45KKEG4nHOrtZaWY4updJJK5yRkTEJIKYWSSgelU05CSDWW1lIpHXNSUmpB6CCEEEK2IIQNgtCQVQAAAQDAQBAasgoAUAAAEIqhGIoChIasAgAyAAAEoCiO4iiOIzmSY0kWEBqyCgAAAgAQAADAcBRJkRTJsSRL0ixL00RRVX3VNlVV9nVd13Vd13UgNGQVAAABAEBIp5mlGiDCDGQYCA1ZBQAgAAAARijCEANCQ1YBAAABAABiKDmIJrTmfHOOg2Y5aCrF5nRwItXmSW4q5uacc845J5tzxjjnnHOKcmYxaCa05pxzEoNmKWgmtOacc57E5kFrqrTmnHPGOaeDcUYY55xzmrTmQWo21uaccxa0pjlqLsXmnHMi5eZJbS7V5pxzzjnnnHPOOeecc6oXp3NwTjjnnHOi9uZabkIX55xzPhmne3NCOOecc84555xzzjnnnHOC0JBVAAAQAABBGDaGcacgSJ+jgRhFiGnIpAfdo8MkaAxyCqlHo6ORUuoglFTGSSmdIDRkFQAACAAAIYQUUkghhRRSSCGFFFKIIYYYYsgpp5yCCiqppKKKMsoss8wyyyyzzDLrsLPOOuwwxBBDDK20EktNtdVYY62555xrDtJaaa211koppZRSSikIDVkFAIAAABAIGWSQQUYhhRRSiCGmnHLKKaigAkJDVgEAgAAAAgAAADzJc0RHdERHdERHdERHdETHczxHlERJlERJtEzL1ExPFVXVlV1b1mXd9m1hF3bd93Xf93Xj14VhWZZlWZZlWZZlWZZlWZZlWYLQkFUAAAgAAIAQQgghhRRSSCGlGGPMMeegk1BCIDRkFQAACAAgAAAAwFEcxXEkR3IkyZIsSZM0S7M8zdM8TfREURRN01RFV3RF3bRF2ZRN13RN2XRVWbVdWbZt2dZtX5Zt3/d93/d93/d93/d93/d1HQgNWQUASAAA6EiOpEiKpEiO4ziSJAGhIasAABkAAAEAKIqjOI7jSJIkSZakSZ7lWaJmaqZneqqoAqEhqwAAQAAAAQAAAAAAKJriKabiKaLiOaIjSqJlWqKmaq4om7Lruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7rui4QGrIKAJAAANCRHMmRHEmRFEmRHMkBQkNWAQAyAAACAHAMx5AUybEsS9M8zdM8TfRET/RMTxVd0QVCQ1YBAIAAAAIAAAAAADAkw1IsR3M0SZRUS7VUTbVUSxVVT1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTVN0zRNIDRkJQAABADAYo3B5SAhJSXl3hDCEJOeMSYhtV4hBJGS3jEGFYOeMqIMct5C4xCDHggNWREARAEAAMYgxxBzyDlHqZMSOeeodJQa5xyljlJnKcWYYs0oldhSrI1zjlJHraOUYiwtdpRSjanGAgAAAhwAAAIshEJDVgQAUQAAhDFIKaQUYow5p5xDjCnnmHOGMeYcc44556B0UirnnHROSsQYc445p5xzUjonlXNOSiehAACAAAcAgAALodCQFQFAnACAQZI8T/I0UZQ0TxRFU3RdUTRd1/I81fRMU1U90VRVU1Vt2VRVWZY8zzQ901RVzzRV1VRVWTZVVZZFVdVt03V123RV3ZZt2/ddWxZ2UVVt3VRd2zdV1/Zd2fZ9WdZ1Y/I8VfVM03U903Rl1XVtW3VdXfdMU5ZN15Vl03Vt25VlXXdl2fc103Rd01Vl2XRd2XZlV7ddWfZ903WF35VlX1dlWRh2XfeFW9eV5XRd3VdlVzdWWfZ9W9eF4dZ1YZk8T1U903RdzzRdV3VdX1dd19Y105Rl03Vt2VRdWXZl2fddV9Z1zzRl2XRd2zZdV5ZdWfZ9V5Z13XRdX1dlWfhVV/Z1WdeV4dZt4Tdd1/dVWfaFV5Z14dZ1Ybl1XRg+VfV9U3aF4XRl39eF31luXTiW0XV9YZVt4VhlWTl+4ViW3feVZXRdX1ht2RhWWRaGX/id5fZ943h1XRlu3efMuu8Mx++k+8rT1W1jmX3dWWZfd47hGDq/8OOpqq+brisMpywLv+3rxrP7vrKMruv7qiwLvyrbwrHrvvP8vrAso+z6wmrLwrDatjHcvm4sv3Acy2vryjHrvlG2dXxfeArD83R1XXlmXcf2dXTjRzh+ygAAgAEHAIAAE8pAoSErAoA4AQCPJImiZFmiKFmWKIqm6LqiaLqupGmmqWmeaVqaZ5qmaaqyKZquLGmaaVqeZpqap5mmaJqua5qmrIqmKcumasqyaZqy7LqybbuubNuiacqyaZqybJqmLLuyq9uu7Oq6pFmmqXmeaWqeZ5qmasqyaZquq3meanqeaKqeKKqqaqqqraqqLFueZ5qa6KmmJ4qqaqqmrZqqKsumqtqyaaq2bKqqbbuq7Pqybeu6aaqybaqmLZuqatuu7OqyLNu6L2maaWqeZ5qa55mmaZqybJqqK1uep5qeKKqq5ommaqqqLJumqsqW55mqJ4qq6omea5qqKsumatqqaZq2bKqqLZumKsuubfu+68qybqqqbJuqauumasqybMu+78qq7oqmKcumqtqyaaqyLduy78uyrPuiacqyaaqybaqqLsuybRuzbPu6aJqybaqmLZuqKtuyLfu6LNu678qub6uqrOuyLfu67vqucOu6MLyybPuqrPq6K9u6b+sy2/Z9RNOUZVM1bdtUVVl2Zdn2Zdv2fdE0bVtVVVs2TdW2ZVn2fVm2bWE0Tdk2VVXWTdW0bVmWbWG2ZeF2Zdm3ZVv2ddeVdV/XfePXZd3murLty7Kt+6qr+rbu+8Jw667wCgAAGHAAAAgwoQwUGrISAIgCAACMYYwxCI1SzjkHoVHKOecgZM5BCCGVzDkIIZSSOQehlJQy5yCUklIIoZSUWgshlJRSawUAABQ4AAAE2KApsThAoSErAYBUAACD41iW55miatqyY0meJ4qqqaq27UiW54miaaqqbVueJ4qmqaqu6+ua54miaaqq6+q6aJqmqaqu67q6Lpqiqaqq67qyrpumqqquK7uy7Oumqqqq68quLPvCqrquK8uybevCsKqu68qybNu2b9y6ruu+7/vCka3rui78wjEMRwEA4AkOAEAFNqyOcFI0FlhoyEoAIAMAgDAGIYMQQgYhhJBSSiGllBIAADDgAAAQYEIZKDRkRQAQJwAAGEMppJRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkgppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkqppJRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoplVJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSCgCQinAAkHowoQwUGrISAEgFAACMUUopxpyDEDHmGGPQSSgpYsw5xhyUklLlHIQQUmktt8o5CCGk1FJtmXNSWosx5hgz56SkFFvNOYdSUoux5ppr7qS0VmuuNedaWqs115xzzbm0FmuuOdecc8sx15xzzjnnGHPOOeecc84FAOA0OACAHtiwOsJJ0VhgoSErAYBUAAACGaUYc8456BBSjDnnHIQQIoUYc845CCFUjDnnHHQQQqgYc8w5CCGEkDnnHIQQQgghcw466CCEEEIHHYQQQgihlM5BCCGEEEooIYQQQgghhBA6CCGEEEIIIYQQQgghhFJKCCGEEEIJoZRQAABggQMAQIANqyOcFI0FFhqyEgAAAgCAHJagUs6EQY5Bjw1BylEzDUJMOdGZYk5qMxVTkDkQnXQSGWpB2V4yCwAAgCAAIMAEEBggKPhCCIgxAABBiMwQCYVVsMCgDBoc5gHAA0SERACQmKBIu7iALgNc0MVdB0IIQhCCWBxAAQk4OOGGJ97whBucoFNU6iAAAAAAAAwA4AEA4KAAIiKaq7C4wMjQ2ODo8AgAAAAAABYA+AAAOD6AiIjmKiwuMDI0Njg6PAIAAAAAAAAAAICAgAAAAAAAQAAAAICAT2dnUwAE7AwAAAAAAAD/QwAAAgAAADuydfsFAQEBAQEACg4ODg==";
            else {
                if (!P.audio.wav)
                    return void l("audiopreload", !1);
                o.src = "data:audio/wav;base64,UklGRvwZAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YdgZAAAAAAEA/v8CAP//AAABAP////8DAPz/BAD9/wEAAAAAAAAAAAABAP7/AgD//wAAAQD//wAAAQD//wAAAQD+/wIA//8AAAAAAAD//wIA/v8BAAAA//8BAAAA//8BAP//AQAAAP//AQD//wEAAAD//wEA//8BAP//AQD//wEA//8BAP//AQD+/wMA/f8DAP3/AgD+/wIA/////wMA/f8CAP7/AgD+/wMA/f8CAP7/AgD//wAAAAAAAAAAAQD+/wIA/v8CAP7/AwD9/wIA/v8BAAEA/v8CAP7/AQAAAAAAAAD//wEAAAD//wIA/f8DAP7/AQD//wEAAAD//wEA//8CAP7/AQD//wIA/v8CAP7/AQAAAAAAAAD//wEAAAAAAAAA//8BAP//AgD9/wQA+/8FAPz/AgAAAP//AgD+/wEAAAD//wIA/v8CAP3/BAD8/wQA/P8DAP7/AwD8/wQA/P8DAP7/AQAAAAAA//8BAP//AgD+/wEAAAD//wIA/v8BAP//AQD//wEAAAD//wEA//8BAAAAAAAAAP//AgD+/wEAAAAAAAAAAAD//wEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AgD+/wIA/v8BAP//AQABAP7/AQD//wIA/v8CAP3/AwD/////AgD9/wMA/v8BAP//AQAAAP//AQD//wEA//8BAP//AAABAP//AAABAP//AQD//wAAAAACAP3/AwD9/wIA//8BAP//AQD//wEA//8BAP//AgD9/wMA/v8AAAIA/f8CAAAA/v8EAPv/BAD9/wIAAAD+/wQA+v8HAPr/BAD+/wEAAAD//wIA/f8EAPz/BAD7/wUA/P8EAPz/AwD+/wEAAAD//wEAAAAAAP//AgD8/wUA+/8FAPz/AwD9/wIA//8AAAEA/v8CAP//AQD//wAAAAABAP//AgD9/wMA/f8EAPz/AwD+/wAAAwD7/wUA/P8DAP7/AQAAAP//AgD+/wEAAQD+/wIA/v8BAAEA/v8CAP7/AQAAAP//AgD9/wMA/f8DAP7/AgD+/wEAAAAAAAEA//8AAAEA/v8DAP3/AgD//wEA//8BAP7/AwD9/wMA/v8BAP//AQAAAP//AgD9/wMA/v8BAP//AQAAAP//AgD+/wEAAQD+/wIA/////wIA//8AAAEA/f8DAP//AAABAP////8DAP3/AwD+/wEA//8BAP//AQAAAAAA//8BAP//AQD//wEA//8BAP//AAAAAAEA//8BAP7/AgD//wEA//8AAAAAAAAAAAAAAAD//wIA/v8BAAAA//8BAAEA/v8BAAAA//8DAPz/AwD+/wIA/v8CAP3/AwD+/wEAAAD//wEA//8BAAAA//8BAAAA/v8EAPv/BAD+/wAAAAABAP7/AgD//wAAAAABAP7/AgD//wAAAAAAAAAAAAABAP3/BAD8/wQA/f8BAAAAAAABAP7/AgD+/wIA/v8CAP7/AgD+/wIA/v8BAAAAAAD//wIA/f8DAP7/AAABAP//AAACAPz/BAD9/wIA//8AAP//AwD9/wMA/P8EAP3/AwD9/wIA//8BAP//AQD+/wMA/f8DAP7/AAABAP//AQAAAP//AQD//wIA/f8DAP7/AQAAAP//AQAAAAAA//8CAP7/AQABAP7/AgD+/wEAAQD+/wIA/v8CAP////8CAP7/AgD//wAAAAABAP7/AwD9/wIAAAD+/wMA/f8CAP//AQD+/wMA/f8CAP//AAACAPz/BQD6/wUA/v///wIA/v8CAP3/BAD7/wYA+v8FAPz/AwD/////AgD+/wEAAAD//wEAAAD//wIA/f8DAP7/AQAAAP//AgD//wAA//8BAAAAAAAAAP//AQD//wEA//8AAAIA/f8DAP3/AgAAAP//AQD//wEA//8AAAEA//8BAP////8CAP//AAABAP3/BAD9/wIA/v8BAAEA//8BAP7/AgD//wEA//8AAAEA//8BAP//AAAAAAEA//8BAP7/AgD//wEA//8AAAAAAQD+/wIA/v8BAAAAAAD//wIA/v8BAAAAAAAAAAAAAQD+/wMA/f8CAP//AQD//wIA/f8DAP7/AQD//wEA//8CAP7/AAABAP7/AwD9/wMA/v8AAAEA//8BAAAAAAD//wIA/v8BAAAA//8CAP7/AgD+/wEA//8CAP7/AgD//wAAAAAAAAAAAQD//wEA/v8DAPz/BQD8/wIA//8AAAEAAAD//wEA//8BAP//AQAAAAAA//8BAP//AgD+/wEAAAAAAP//AQD+/wMA/////wEA/v8CAP//AQD//wEA//8AAAEA//8BAAAA/v8EAPz/AwD+/wEAAAAAAAAA//8CAP7/AQD//wEA//8BAP//AAABAP7/AwD9/wIA//8BAP//AQD//wEA//8AAAEA/v8EAPv/BAD9/wIA//8BAP7/AwD9/wIA//8AAAEA//8BAP//AQD//wAAAQD//wEAAAD+/wMA/v8AAAIA/f8DAP7/AQD//wAAAQD+/wMA/f8CAP//AAABAP7/AgD+/wMA/f8CAP7/AQABAP7/AgD+/wIA/v8CAP7/AwD8/wMA//8AAAEA//8AAAAAAAABAP//AQD//wAAAQD//wIA/f8DAP3/AwD+/wAAAgD9/wIA//8AAAEAAAD+/wMA/P8FAPv/BAD9/wIA//8AAP//AgD+/wIA/v8BAAAAAAD//wEAAAAAAP//AQD//wEA//8BAP//AAABAP7/AwD9/wIA//8BAP//AAABAP//AQD//wAAAQD//wEA//8BAP//AAABAAAA//8BAP7/AwD9/wMA/f8DAP3/AgD//wEA//8BAP7/AgD//wAAAgD8/wQA/f8CAP//AQD+/wMA/f8CAP7/AgD//wAAAAAAAAAAAAABAP7/AwD9/wIA/v8DAP3/AwD9/wIA/v8DAPz/BQD7/wQA/f8CAP7/AwD9/wMA/f8CAP//AQAAAP7/AwD+/wEA//8AAAEAAAAAAP//AAABAP//AQAAAP7/AwD9/wMA/f8CAP//AQD//wEA//8AAAIA/f8CAAAA//8BAAAA//8BAAAA/v8EAPv/BAD9/wIA//8AAAEA/v8CAP//AAABAP//AAABAP//AAABAP7/AwD8/wQA/f8CAAAA/v8DAP3/AwD9/wMA/v8BAAAA//8BAAAA//8CAP7/AQAAAAAAAAAAAAAA//8CAP7/AgD+/wIA/v8CAP7/AgD//wAAAQD//wAAAQD//wAAAQD//wAAAQD+/wIA//8AAAAAAQD+/wMA/f8CAP//AQD//wEA//8AAAEA/v8DAP3/AgD//wAAAAABAP7/AwD9/wIA//8AAAEA/v8DAP3/AgD//wAAAAABAP7/AwD8/wMA/v8CAP//AAD//wIA/v8CAP7/AQABAP7/AQAAAP//AgD/////AQD//wEAAAD//wEA/v8EAPv/BAD9/wMA/v8BAAAA//8BAAEA/P8GAPr/BQD8/wMA/v8BAAAA//8CAP7/AQABAP3/BAD7/wYA+/8EAPz/AwD//wEA//8BAP7/BAD8/wMA/v8AAAIA/v8BAAAA//8BAAAA//8BAAAA//8CAP3/AwD+/wAAAgD8/wUA/P8DAP7/AAABAAAAAAD//wEAAAD//wIA/f8DAP7/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAEA/f8EAPz/AwD/////AgD+/wIA/f8DAP7/AgD+/wEA//8CAP7/AQD//wEAAAAAAP//AQAAAP//AgD9/wMA/v8BAAAA//8BAP//AQAAAP//AAACAP3/BAD7/wQA/v8BAAAA//8BAP//AQAAAP//AQAAAP7/BAD7/wUA+/8EAP3/AgD//wAAAQD+/wIA//8AAAEA/v8CAP//AQD+/wEAAAAAAAAAAAD//wEA//8CAP3/AwD9/wIA//8AAAAAAAAAAAAA//8BAP//AgD+/wEA//8CAP7/AQAAAP//AgD/////AgD/////AgD+/wIA//8AAP//AQABAP7/AgD9/wMA/v8CAP////8BAAAAAAAAAAAA//8CAP////8DAPz/AwD+/wEAAAAAAP//AQD//wEAAAD//wEAAAD+/wQA+/8FAPz/AgAAAP//AgD9/wMA/v8BAAAAAAD//wEAAAD//wIA/v8BAAAAAAD//wIA/v8BAAAA//8BAAAA//8CAP7/AQD//wEA//8BAAAA//8BAP//AAABAP//AQAAAP7/AgD//wEA//8AAAAAAQD+/wMA/P8EAP7///8DAPz/BQD8/wEAAQD+/wMA/v8AAAEA//8BAP//AQD//wEA/v8CAP//AQD//wAAAAABAAAA//8BAP//AQAAAAAA//8BAP//AgD+/wAAAQD//wIA/f8CAP//AQAAAP7/AwD9/wMA/v8BAP//AAABAP//AgD9/wIA//8BAAAA//8BAAAA//8CAP3/AwD+/wEAAAD+/wQA/P8DAP7/AAACAP7/AQAAAP//AQAAAP//AQAAAP//AgD9/wIAAAD//wIA/f8DAP7/AQD//wEA//8CAP7/AQD//wAAAQD//wEA//8AAAAAAQD//wEAAAD9/wUA+/8FAPz/AgD//wAAAQD//wAAAQD+/wMA/f8BAAEA/v8CAP7/AgD+/wIA/v8BAAAAAAAAAAAAAAD//wIA/v8CAP////8CAP7/AgD+/wIA/v8CAP7/AQAAAP//AQAAAP//AQD//wAAAQD//wAAAQD+/wMA/f8CAAAA/v8DAP3/AgAAAP//AQAAAP7/AwD9/wMA/v8BAP//AQD//wEAAAD+/wMA/f8CAAAA/v8CAP//AAAAAAEA//8AAAEA/v8DAP3/AwD9/wIA//8BAP//AgD8/wQA/v8BAAAA/v8CAP//AQD//wAAAAAAAAEA/f8EAPz/BAD9/wIA//8AAAAAAAABAP//AAAAAAAAAAABAP3/BAD9/wIA/v8BAAEA//8AAAAA//8CAP7/AgD9/wQA+/8FAPv/BQD8/wMA/f8DAP3/AwD+/wAAAgD9/wMA/f8CAAAA/v8EAPv/BQD7/wUA/P8DAP///v8DAP3/BAD8/wMA/f8DAP7/AQD//wEAAAD//wEA/v8CAAAA/v8CAP7/AgD//wAAAAAAAAAAAQD+/wIA//8AAAEA/v8DAPz/BAD9/wIA//8AAP//AgD//wEA/v8BAAAAAQD//wAAAAAAAAEA//8AAAEA//8BAP//AAABAP//AQD+/wIA/v8DAPz/BAD8/wQA/f8BAAAAAQD+/wMA/P8DAP//AAAAAAAAAAD//wMA+/8FAP3/AQABAP3/BAD8/wMA/v8BAAAA//8CAP3/AwD+/wEAAQD9/wMA/f8EAPz/BAD7/wQA/v8BAAEA/f8DAP7/AQAAAP//AgD+/wEAAAD//wIA/v8CAP7/AgD+/wEAAQD//wEA/v8CAP7/BAD7/wQA/f8CAAAA//8AAAAAAAABAP//AQD+/wEAAQD+/wMA/f8BAAEA/v8DAPz/AwD/////AwD8/wQA/P8DAP7/AgD//wAA//8BAAAAAAAAAP//AgD+/wEAAAD//wIA/v8BAAAA//8CAP3/AgD//wAAAQD+/wIA/v8BAAAA//8CAP7/AgD+/wEA//8CAP3/BAD7/wQA/v8BAAAA//8AAAEAAAD//wIA/f8DAP7/AgD+/wIA/v8CAP7/AgD+/wEAAAAAAP//AgD9/wMA/v8BAP//AgD9/wMA/v8AAAEA//8BAP//AQD//wEA//8AAAEA/v8EAPz/AgD//wAAAQAAAP//AAABAP//AQD//wEAAAD//wEA//8BAAEA/f8DAP7/AQABAP3/AwD+/wIA/////wEAAAAAAAAAAAD//wIA/v8CAP////8CAP7/AgD//wAA//8CAP3/BAD9/wAAAgD9/wMA/v8BAP//AQAAAP//AQAAAP//AgD9/wMA/f8EAPz/AwD+/wEAAAAAAAAAAAD//wIA/f8EAP3/AAABAAAA//8CAP7/AQAAAP//AQAAAAAA//8BAP//AQAAAP//AQAAAP//AQAAAP//AgD9/wMA/v8BAP//AQAAAP//AQD//wIA/v8CAP3/BAD9/wEAAAD//wEAAQD9/wMA/f8CAAAA/v8DAP3/AgD//wAAAQD+/wIA/v8CAP7/AQAAAP//AgD+/wEAAAAAAP//AwD7/wUA/f8BAAEA/v8BAAEA/v8DAP3/AgD//wEA//8BAP//AQD//wEA//8CAP3/BAD7/wQA/////wIA/v8AAAIA/v8CAP3/BAD7/wUA/P8DAP3/AwD9/wMA/v8AAAIA/v8CAP7/AgD+/wIA//8AAAEA/v8CAP7/AgD//wAAAAD//wEAAAAAAAAA//8BAP7/BAD7/wUA/P8CAAAA//8BAP//AQAAAP//AgD9/wMA/v8BAAAA//8BAAAA//8CAP3/AwD+/wEA//8CAP3/AwD+/wAAAwD8/wIAAAD//wIA/////wIA/v8CAP7/AgD+/wEAAAAAAAAAAAAAAP//AgD+/wIA//8AAAAA//8CAP7/AgD+/wEA//8CAP3/AwD9/wMA/v8BAP7/AwD9/wMA/f8CAP//AQD+/wIA//8BAP//AQD+/wMA/v8BAAAA//8BAAAA//8CAP7/AQAAAP//AgD+/wIA/v8CAP//AAAAAAEA//8BAP//AAABAAAA//8BAP//AQD//wEA//8BAP//AQAAAP//AQD//wEAAAD//wIA/f8CAAAA//8BAAAA//8BAP//AAABAP//AQD//wAAAAAAAAEA/v8CAP//AQD//wAAAAABAP7/AwD9/wIAAAD+/wIA//8BAP//AgD9/wMA/f8DAP7/AgD+/wEAAAAAAAEA/v8CAP7/AgD//wAAAAAAAAAAAAAAAP//AgD/////AgD9/wQA/f8BAAAAAAAAAAEA/f8DAP////8DAP3/AQABAP7/AgD//wAAAQD+/wMA/f8CAP7/AQABAP7/AwD7/wYA+v8FAP3/AQABAP7/AgD+/wMA/f8CAP7/AwD+/wEA//8BAP//AQAAAP7/BQD5/wcA+v8FAPz/AwD+/wIA/v8BAAAA//8DAPv/BQD8/wMA/////wEAAAAAAAAAAAD//wIA/f8DAP7/AQAAAP//AQAAAP//AgD+/wIA/v8BAAEA/f8EAPz/AwD+/wEA//8CAP7/AQD//wEA//8CAP7/AQAAAP//AgD+/wEAAAAAAAAAAAAAAAAAAAD//wIA/f8EAPz/AwD+/wEA//8CAP7/AgD+/wEAAQD+/wEAAQD+/wIA/////wIA//8AAAAAAAAAAAAAAAD//wEAAAAAAP//AgD9/wMA/v8BAP//AQAAAP//AQD//wEA//8BAP//AQD//wEA//8BAP//AQAAAP7/AwD9/wMA/v8BAP7/AwD9/wMA/v8BAP//AAABAP//AQD//wAAAAABAP//AAAAAAAAAQD//wEA/v8CAAAA/v8EAPv/BAD9/wIAAAD+/wMA/P8DAP//AAAAAP//AQD//wIA/f8DAP3/AwD9/wMA/v8BAAAA//8BAAAA//8CAP3/AwD9/wQA+/8FAPv/BQD8/wMA/v8BAAAA//8BAP//AgD+/wEAAAD//wIA/v8BAAEA/f8DAP3/AgAAAP//AQD//wAAAQD//wEA//8BAP//AQD//wEA/v8DAP3/AgAAAP7/AwD9/wIAAAD//wEAAAD//wIA/f8DAP7/AgD9/wQA+/8FAPz/AgAAAP//AgD9/wIA//8BAP//AQD//wEA//8BAP//AQD//wIA/f8DAP3/AgD//wAAAQD+/wIA/v8BAAEA/v8CAP7/AgD+/wMA/P8DAP//AAABAP7/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEA/v8CAP3/BAD8/wMA/v8BAAAAAAD//wEAAAAAAAAAAAD//wEAAAAAAAAA//8BAP//AgD+/wEA//8CAP3/AwD9/wMA/f8EAPv/BAD+/wAAAQD//wEA//8BAP//AAABAP//AQD//wEAAAD//wEA//8BAP//AgD9/wMA/v8AAAIA/f8DAP7/AAACAP3/AwD+/wEA//8BAP//AQAAAP//AQAAAP7/AwD9/wMA/v8AAAEA//8BAP//AAAAAAEA//8AAAEA/v8CAP//AAAAAAEA/v8DAPz/BAD9/wEAAQD+/wEAAQD9/wQA/P8DAP7/AQAAAAAAAAAAAAAAAAAAAAAAAQD+/wIA/////wIA/v8BAAAA//8BAP//AQD//wEA//8BAAAA/v8EAPz/AwD///7/BAD8/wMA/////wIA/v8CAP////8CAP7/AgD+/wIA/v8CAP////8CAP7/AwD9/wIA/v8CAP//AAABAP7/AwD9/wEAAQD+/wMA/f8CAP//AAAAAAEA/v8DAPz/BAD9/wIA/v8CAP7/AgD//wAAAAD//wIA/v8CAP7/AQAAAAAA//8CAP7/AgD+/wIA/v8CAP7/AwD8/wUA+v8GAPv/AwD//wAAAAAAAAAA//8DAPv/BQD9/wAAAgD9/wMA/v8BAP//AQAAAP//AgD9/wMA/v8BAAAA//8BAAAAAAAAAP//AQAAAAAAAAD//wEA//8CAP3/AwD+/wAAAgD+/wEAAAD//wIA/v8CAP7/AgD/////AwD8/wUA/P8CAP//AQD//wIA/f8DAP3/AwD+/wAAAQD+/wMA/f8DAP3/AgD//wAAAQD//wEA//8BAP7/AwD+/wEA//8AAAEA//8CAPz/BAD9/wIA//8AAAEA/v8DAPz/BAD9/wIA//8AAAEA/v8CAP7/AgD//wEA/f8EAPz/BAD+////AgD//wAAAQD//wAAAQD//wEA//8BAP7/AwD+/wEA"
            }
        } catch (A) {
            return void l("audiopreload", !1)
        }
        o.setAttribute("preload", "auto"),
        o.style.cssText = "display:none",
        T.appendChild(o),
        setTimeout(function() {
            o.addEventListener("loadeddata", A, !1),
            e = setTimeout(A, i)
        }, 0)
    }),
    P.addTest("svgasimg", e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")),
    P.addAsyncTest(function() {
        function A(s) {
            o++,
            clearTimeout(e);
            var r = s && "playing" === s.type || 0 !== n.currentTime;
            return !r && i > o ? void (e = setTimeout(A, t)) : (n.removeEventListener("playing", A, !1),
            l("videoautoplay", r),
            void n.parentNode.removeChild(n))
        }
        var e, t = 200, i = 5, o = 0, n = r("video"), s = n.style;
        if (!(P.video && "autoplay"in n))
            return void l("videoautoplay", !1);
        s.position = "absolute",
        s.height = 0,
        s.width = 0;
        try {
            if (P.video.ogg)
                n.src = "data:video/ogg;base64,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";
            else {
                if (!P.video.h264)
                    return void l("videoautoplay", !1);
                n.src = "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMjYwMSBhMGNkN2QzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTEgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEwIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAD2WIhAA3//728P4FNjuZQQAAAu5tb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAZAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACGHRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAgAAAAIAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAGQAAAAAAAEAAAAAAZBtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAACgAAAAEAFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAE7bWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAA+3N0YmwAAACXc3RzZAAAAAAAAAABAAAAh2F2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAgACAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwFkAAr/4QAYZ2QACqzZX4iIhAAAAwAEAAADAFA8SJZYAQAGaOvjyyLAAAAAGHN0dHMAAAAAAAAAAQAAAAEAAAQAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAABRzdHN6AAAAAAAAAsUAAAABAAAAFHN0Y28AAAAAAAAAAQAAADAAAABidWR0YQAAAFptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAAC1pbHN0AAAAJal0b28AAAAdZGF0YQAAAAEAAAAATGF2ZjU2LjQwLjEwMQ=="
            }
        } catch (A) {
            return void l("videoautoplay", !1)
        }
        n.setAttribute("autoplay", ""),
        n.style.cssText = "display:none",
        T.appendChild(n),
        setTimeout(function() {
            n.addEventListener("playing", A, !1),
            e = setTimeout(A, t)
        }, 0)
    });
    var F = D.testStyles = c;
    P.addTest("hiddenscroll", function() {
        return F("#modernizr {width:100px;height:100px;overflow:scroll}", function(A) {
            return A.offsetWidth === A.clientWidth
        })
    }),
    P.addTest("touchevents", function() {
        var t;
        if ("ontouchstart"in A || A.DocumentTouch && e instanceof DocumentTouch)
            t = !0;
        else {
            var i = ["@media (", k.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
            F(i, function(A) {
                t = 9 === A.offsetTop
            })
        }
        return t
    }),
    P.addTest("checked", function() {
        return F("#modernizr {position:absolute} #modernizr input {margin-left:10px} #modernizr :checked {margin-left:20px;display:block}", function(A) {
            var e = r("input");
            return e.setAttribute("type", "checkbox"),
            e.setAttribute("checked", "checked"),
            A.appendChild(e),
            20 === e.offsetLeft
        })
    }),
    F("#modernizr div {width:1px} #modernizr div:nth-child(2n) {width:2px;}", function(A) {
        for (var e = A.getElementsByTagName("div"), t = !0, i = 0; 5 > i; i++)
            t = t && e[i].offsetWidth === i % 2 + 1;
        P.addTest("nthchild", t)
    }, 5);
    var U = {
        elem: r("modernizr")
    };
    P._q.push(function() {
        delete U.elem
    });
    var $ = {
        style: U.elem.style
    };
    P._q.unshift(function() {
        delete $.style
    });
    var q = D.testProp = function(A, e, i) {
        return h([A], t, e, i)
    }
    ;
    P.addTest("textshadow", q("textShadow", "1px 1px")),
    D.testAllProps = g;
    var z = D.prefixed = function(A, e, t) {
        return 0 === A.indexOf("@") ? I(A) : (-1 != A.indexOf("-") && (A = a(A)),
        e ? g(A, e, t) : g(A, "pfx"))
    }
    ;
    D.prefixedCSS = function(A) {
        var e = z(A);
        return e && s(e)
    }
    ,
    P.addTest("fullscreen", !(!z("exitFullscreen", e, !1) && !z("cancelFullScreen", e, !1))),
    P.addTest("intl", !!z("Intl", A)),
    P.addTest("pagevisibility", !!z("hidden", e, !1)),
    D.testAllProps = v,
    P.addTest("cssanimations", v("animationName", "a", !0)),
    P.addTest("backgroundsize", v("backgroundSize", "100%", !0)),
    P.addTest("bgsizecover", v("backgroundSize", "cover")),
    P.addTest("borderradius", v("borderRadius", "0px", !0)),
    P.addTest("boxshadow", v("boxShadow", "1px 1px", !0)),
    P.addTest("boxsizing", v("boxSizing", "border-box", !0) && (e.documentMode === t || e.documentMode > 7)),
    function() {
        P.addTest("csscolumns", function() {
            var A = !1
              , e = v("columnCount");
            try {
                (A = !!e) && (A = new Boolean(A))
            } catch (A) {}
            return A
        });
        for (var A, e, t = ["Width", "Span", "Fill", "Gap", "Rule", "RuleColor", "RuleStyle", "RuleWidth", "BreakBefore", "BreakAfter", "BreakInside"], i = 0; i < t.length; i++)
            A = t[i].toLowerCase(),
            e = v("column" + t[i]),
            ("breakbefore" === A || "breakafter" === A || "breakinside" == A) && (e = e || v(t[i])),
            P.addTest("csscolumns." + A, e)
    }(),
    P.addTest("flexbox", v("flexBasis", "1px", !0)),
    P.addTest("flexboxlegacy", v("boxDirection", "reverse", !0)),
    P.addTest("shapes", v("shapeOutside", "content-box", !0)),
    P.addTest("csstransforms", function() {
        return -1 === navigator.userAgent.indexOf("Android 2.") && v("transform", "scale(1)", !0)
    }),
    P.addTest("csstransforms3d", function() {
        var A = !!v("perspective", "1px", !0)
          , e = P._config.usePrefixes;
        if (A && (!e || "webkitPerspective"in T.style)) {
            var t, i = "#modernizr{width:0;height:0}";
            P.supports ? t = "@supports (perspective: 1px)" : (t = "@media (transform-3d)",
            e && (t += ",(-webkit-transform-3d)")),
            t += "{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}",
            F(i + t, function(e) {
                A = 7 === e.offsetWidth && 18 === e.offsetHeight
            })
        }
        return A
    }),
    P.addTest("csstransitions", v("transition", "all", !0)),
    o(),
    n(m),
    delete D.addTest,
    delete D.addAsyncTest;
    for (var Z = 0; Z < P._q.length; Z++)
        P._q[Z]();
    A.Modernizr = P
}(window, document),
/*! Respond.js v1.4.2: min/max-width media query polyfill
 * Copyright 2014 Scott Jehl
 * Licensed under MIT
 * http://j.mp/respondjs */
!function(A) {
    "use strict";
    A.matchMedia = A.matchMedia || function(A) {
        var e, t = A.documentElement, i = t.firstElementChild || t.firstChild, o = A.createElement("body"), n = A.createElement("div");
        return n.id = "mq-test-1",
        n.style.cssText = "position:absolute;top:-100em",
        o.style.background = "none",
        o.appendChild(n),
        function(A) {
            return n.innerHTML = '&shy;<style media="' + A + '"> #mq-test-1 { width: 42px; }</style>',
            t.insertBefore(o, i),
            e = 42 === n.offsetWidth,
            t.removeChild(o),
            {
                matches: e,
                media: A
            }
        }
    }(A.document)
}(this),
function(A) {
    "use strict";
    function e() {
        D(!0)
    }
    var t = {};
    A.respond = t,
    t.update = function() {}
    ;
    var i = []
      , o = function() {
        var e = !1;
        try {
            e = new A.XMLHttpRequest
        } catch (t) {
            e = new A.ActiveXObject("Microsoft.XMLHTTP")
        }
        return function() {
            return e
        }
    }()
      , n = function(A, e) {
        var t = o();
        t && (t.open("GET", A, !0),
        t.onreadystatechange = function() {
            4 !== t.readyState || 200 !== t.status && 304 !== t.status || e(t.responseText)
        }
        ,
        4 !== t.readyState && t.send(null))
    }
      , s = function(A) {
        return A.replace(t.regex.minmaxwh, "").match(t.regex.other)
    };
    if (t.ajax = n,
    t.queue = i,
    t.unsupportedmq = s,
    t.regex = {
        media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
        keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
        comments: /\/\*[^*]*\*+([^\/][^*]*\*+)*\//gi,
        urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
        findStyles: /@media *([^\{]+)\{([\S\s]+?)$/,
        only: /(only\s+)?([a-zA-Z]+)\s?/,
        minw: /\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
        maxw: /\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
        minmaxwh: /\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi,
        other: /\([^\)]*\)/g
    },
    t.mediaQueriesSupported = A.matchMedia && null !== A.matchMedia("only all") && A.matchMedia("only all").matches,
    !t.mediaQueriesSupported) {
        var r, a, l, d = A.document, c = d.documentElement, p = [], u = [], f = [], w = {}, h = 30, g = d.getElementsByTagName("head")[0] || c, v = d.getElementsByTagName("base")[0], m = g.getElementsByTagName("link"), y = function() {
            var A, e = d.createElement("div"), t = d.body, i = c.style.fontSize, o = t && t.style.fontSize, n = !1;
            return e.style.cssText = "position:absolute;font-size:1em;width:1em",
            t || (t = n = d.createElement("body"),
            t.style.background = "none"),
            c.style.fontSize = "100%",
            t.style.fontSize = "100%",
            t.appendChild(e),
            n && c.insertBefore(t, c.firstChild),
            A = e.offsetWidth,
            n ? c.removeChild(t) : t.removeChild(e),
            c.style.fontSize = i,
            o && (t.style.fontSize = o),
            A = l = parseFloat(A)
        }, D = function(e) {
            var t = "clientWidth"
              , i = c[t]
              , o = "CSS1Compat" === d.compatMode && i || d.body[t] || i
              , n = {}
              , s = m[m.length - 1]
              , w = (new Date).getTime();
            if (e && r && h > w - r)
                return A.clearTimeout(a),
                void (a = A.setTimeout(D, h));
            r = w;
            for (var v in p)
                if (p.hasOwnProperty(v)) {
                    var P = p[v]
                      , C = P.minw
                      , E = P.maxw
                      , S = null === C
                      , k = null === E
                      , T = "em";
                    C && (C = parseFloat(C) * (C.indexOf(T) > -1 ? l || y() : 1)),
                    E && (E = parseFloat(E) * (E.indexOf(T) > -1 ? l || y() : 1)),
                    P.hasquery && (S && k || !(S || o >= C) || !(k || E >= o)) || (n[P.media] || (n[P.media] = []),
                    n[P.media].push(u[P.rules]))
                }
            for (var b in f)
                f.hasOwnProperty(b) && f[b] && f[b].parentNode === g && g.removeChild(f[b]);
            f.length = 0;
            for (var B in n)
                if (n.hasOwnProperty(B)) {
                    var Q = d.createElement("style")
                      , x = n[B].join("\n");
                    Q.type = "text/css",
                    Q.media = B,
                    g.insertBefore(Q, s.nextSibling),
                    Q.styleSheet ? Q.styleSheet.cssText = x : Q.appendChild(d.createTextNode(x)),
                    f.push(Q)
                }
        }, P = function(A, e, i) {
            var o = A.replace(t.regex.comments, "").replace(t.regex.keyframes, "").match(t.regex.media)
              , n = o && o.length || 0;
            e = e.substring(0, e.lastIndexOf("/"));
            var r = function(A) {
                return A.replace(t.regex.urls, "$1" + e + "$2$3")
            }
              , a = !n && i;
            e.length && (e += "/"),
            a && (n = 1);
            for (var l = 0; n > l; l++) {
                var d, c, f, w;
                a ? (d = i,
                u.push(r(A))) : (d = o[l].match(t.regex.findStyles) && RegExp.$1,
                u.push(RegExp.$2 && r(RegExp.$2))),
                f = d.split(","),
                w = f.length;
                for (var h = 0; w > h; h++)
                    c = f[h],
                    s(c) || p.push({
                        media: c.split("(")[0].match(t.regex.only) && RegExp.$2 || "all",
                        rules: u.length - 1,
                        hasquery: c.indexOf("(") > -1,
                        minw: c.match(t.regex.minw) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                        maxw: c.match(t.regex.maxw) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
                    })
            }
            D()
        }, C = function() {
            if (i.length) {
                var e = i.shift();
                n(e.href, function(t) {
                    P(t, e.href, e.media),
                    w[e.href] = !0,
                    A.setTimeout(function() {
                        C()
                    }, 0)
                })
            }
        }, E = function() {
            for (var e = 0; e < m.length; e++) {
                var t = m[e]
                  , o = t.href
                  , n = t.media
                  , s = t.rel && "stylesheet" === t.rel.toLowerCase();
                o && s && !w[o] && (t.styleSheet && t.styleSheet.rawCssText ? (P(t.styleSheet.rawCssText, o, n),
                w[o] = !0) : (!/^([a-zA-Z:]*\/\/)/.test(o) && !v || o.replace(RegExp.$1, "").split("/")[0] === A.location.host) && ("//" === o.substring(0, 2) && (o = A.location.protocol + o),
                i.push({
                    href: o,
                    media: n
                })))
            }
            C()
        };
        E(),
        t.update = E,
        t.getEmValue = y,
        A.addEventListener ? A.addEventListener("resize", e, !1) : A.attachEvent && A.attachEvent("onresize", e)
    }
}(this),
/*!
 * selectivizr v1.0.2 - (c) Keith Clark, freely distributable under the terms of the MIT license.
 * selectivizr.com
 */
function(A) {}(this),
!function(A, e) {
    function t(A, e) {
        var t = A.createElement("p")
          , i = A.getElementsByTagName("head")[0] || A.documentElement;
        return t.innerHTML = "x<style>" + e + "</style>",
        i.insertBefore(t.lastChild, i.firstChild)
    }
    function i() {
        var A = m.elements;
        return "string" == typeof A ? A.split(" ") : A
    }
    function o(A, e) {
        var t = m.elements;
        "string" != typeof t && (t = t.join(" ")),
        "string" != typeof A && (A = A.join(" ")),
        m.elements = t + " " + A,
        l(e)
    }
    function n(A) {
        var e = v[A[h]];
        return e || (e = {},
        g++,
        A[h] = g,
        v[g] = e),
        e
    }
    function s(A, t, i) {
        if (t || (t = e),
        c)
            return t.createElement(A);
        i || (i = n(t));
        var o;
        return o = i.cache[A] ? i.cache[A].cloneNode() : w.test(A) ? (i.cache[A] = i.createElem(A)).cloneNode() : i.createElem(A),
        !o.canHaveChildren || f.test(A) || o.tagUrn ? o : i.frag.appendChild(o)
    }
    function r(A, t) {
        if (A || (A = e),
        c)
            return A.createDocumentFragment();
        t = t || n(A);
        for (var o = t.frag.cloneNode(), s = 0, r = i(), a = r.length; a > s; s++)
            o.createElement(r[s]);
        return o
    }
    function a(A, e) {
        e.cache || (e.cache = {},
        e.createElem = A.createElement,
        e.createFrag = A.createDocumentFragment,
        e.frag = e.createFrag()),
        A.createElement = function(t) {
            return m.shivMethods ? s(t, A, e) : e.createElem(t)
        }
        ,
        A.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + i().join().replace(/[\w\-:]+/g, function(A) {
            return e.createElem(A),
            e.frag.createElement(A),
            'c("' + A + '")'
        }) + ");return n}")(m, e.frag)
    }
    function l(A) {
        A || (A = e);
        var i = n(A);
        return !m.shivCSS || d || i.hasCSS || (i.hasCSS = !!t(A, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),
        c || a(A, i),
        A
    }
    var d, c, p = "3.7.3", u = A.html5 || {}, f = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, w = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, h = "_html5shiv", g = 0, v = {};
    !function() {
        try {
            var A = e.createElement("a");
            A.innerHTML = "<xyz></xyz>",
            d = "hidden"in A,
            c = 1 == A.childNodes.length || function() {
                e.createElement("a");
                var A = e.createDocumentFragment();
                return "undefined" == typeof A.cloneNode || "undefined" == typeof A.createDocumentFragment || "undefined" == typeof A.createElement
            }()
        } catch (A) {
            d = !0,
            c = !0
        }
    }();
    var m = {
        elements: u.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
        version: p,
        shivCSS: u.shivCSS !== !1,
        supportsUnknownElements: c,
        shivMethods: u.shivMethods !== !1,
        type: "default",
        shivDocument: l,
        createElement: s,
        createDocumentFragment: r,
        addElements: o
    };
    A.html5 = m,
    l(e),
    "object" == typeof module && module.exports && (module.exports = m)
}("undefined" != typeof window ? window : this, document),
!function(A) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], A) : "undefined" != typeof exports ? module.exports = A(require("jquery")) : A(jQuery)
}(function(A) {
    "use strict";
    var e = window.Slick || {};
    e = function() {
        function e(e, i) {
            var o, n = this;
            n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: A(e),
                appendDots: A(e),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(e, t) {
                    return A('<button type="button" data-role="none" role="button" tabindex="0" />').text(t + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            },
            n.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            },
            A.extend(n, n.initials),
            n.activeBreakpoint = null,
            n.animType = null,
            n.animProp = null,
            n.breakpoints = [],
            n.breakpointSettings = [],
            n.cssTransitions = !1,
            n.focussed = !1,
            n.interrupted = !1,
            n.hidden = "hidden",
            n.paused = !0,
            n.positionProp = null,
            n.respondTo = null,
            n.rowCount = 1,
            n.shouldClick = !0,
            n.$slider = A(e),
            n.$slidesCache = null,
            n.transformType = null,
            n.transitionType = null,
            n.visibilityChange = "visibilitychange",
            n.windowWidth = 0,
            n.windowTimer = null,
            o = A(e).data("slick") || {},
            n.options = A.extend({}, n.defaults, i, o),
            n.currentSlide = n.options.initialSlide,
            n.originalSettings = n.options,
            "undefined" != typeof document.mozHidden ? (n.hidden = "mozHidden",
            n.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (n.hidden = "webkitHidden",
            n.visibilityChange = "webkitvisibilitychange"),
            n.autoPlay = A.proxy(n.autoPlay, n),
            n.autoPlayClear = A.proxy(n.autoPlayClear, n),
            n.autoPlayIterator = A.proxy(n.autoPlayIterator, n),
            n.changeSlide = A.proxy(n.changeSlide, n),
            n.clickHandler = A.proxy(n.clickHandler, n),
            n.selectHandler = A.proxy(n.selectHandler, n),
            n.setPosition = A.proxy(n.setPosition, n),
            n.swipeHandler = A.proxy(n.swipeHandler, n),
            n.dragHandler = A.proxy(n.dragHandler, n),
            n.keyHandler = A.proxy(n.keyHandler, n),
            n.instanceUid = t++,
            n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/,
            n.registerBreakpoints(),
            n.init(!0)
        }
        var t = 0;
        return e
    }(),
    e.prototype.activateADA = function() {
        var A = this;
        A.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }
    ,
    e.prototype.addSlide = e.prototype.slickAdd = function(e, t, i) {
        var o = this;
        if ("boolean" == typeof t)
            i = t,
            t = null;
        else if (0 > t || t >= o.slideCount)
            return !1;
        o.unload(),
        "number" == typeof t ? 0 === t && 0 === o.$slides.length ? A(e).appendTo(o.$slideTrack) : i ? A(e).insertBefore(o.$slides.eq(t)) : A(e).insertAfter(o.$slides.eq(t)) : i === !0 ? A(e).prependTo(o.$slideTrack) : A(e).appendTo(o.$slideTrack),
        o.$slides = o.$slideTrack.children(this.options.slide),
        o.$slideTrack.children(this.options.slide).detach(),
        o.$slideTrack.append(o.$slides),
        o.$slides.each(function(e, t) {
            A(t).attr("data-slick-index", e)
        }),
        o.$slidesCache = o.$slides,
        o.reinit()
    }
    ,
    e.prototype.animateHeight = function() {
        var A = this;
        if (1 === A.options.slidesToShow && A.options.adaptiveHeight === !0 && A.options.vertical === !1) {
            var e = A.$slides.eq(A.currentSlide).outerHeight(!0);
            A.$list.animate({
                height: e
            }, A.options.speed)
        }
    }
    ,
    e.prototype.animateSlide = function(e, t) {
        var i = {}
          , o = this;
        o.animateHeight(),
        o.options.rtl === !0 && o.options.vertical === !1 && (e = -e),
        o.transformsEnabled === !1 ? o.options.vertical === !1 ? o.$slideTrack.animate({
            left: e
        }, o.options.speed, o.options.easing, t) : o.$slideTrack.animate({
            top: e
        }, o.options.speed, o.options.easing, t) : o.cssTransitions === !1 ? (o.options.rtl === !0 && (o.currentLeft = -o.currentLeft),
        A({
            animStart: o.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: o.options.speed,
            easing: o.options.easing,
            step: function(A) {
                A = Math.ceil(A),
                o.options.vertical === !1 ? (i[o.animType] = "translate(" + A + "px, 0px)",
                o.$slideTrack.css(i)) : (i[o.animType] = "translate(0px," + A + "px)",
                o.$slideTrack.css(i))
            },
            complete: function() {
                t && t.call()
            }
        })) : (o.applyTransition(),
        e = Math.ceil(e),
        o.options.vertical === !1 ? i[o.animType] = "translate3d(" + e + "px, 0px, 0px)" : i[o.animType] = "translate3d(0px," + e + "px, 0px)",
        o.$slideTrack.css(i),
        t && setTimeout(function() {
            o.disableTransition(),
            t.call()
        }, o.options.speed))
    }
    ,
    e.prototype.getNavTarget = function() {
        var e = this
          , t = e.options.asNavFor;
        return t && null !== t && (t = A(t).not(e.$slider)),
        t
    }
    ,
    e.prototype.asNavFor = function(e) {
        var t = this
          , i = t.getNavTarget();
        null !== i && "object" == typeof i && i.each(function() {
            var t = A(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0)
        })
    }
    ,
    e.prototype.applyTransition = function(A) {
        var e = this
          , t = {};
        e.options.fade === !1 ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase,
        e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(A).css(t)
    }
    ,
    e.prototype.autoPlay = function() {
        var A = this;
        A.autoPlayClear(),
        A.slideCount > A.options.slidesToShow && (A.autoPlayTimer = setInterval(A.autoPlayIterator, A.options.autoplaySpeed))
    }
    ,
    e.prototype.autoPlayClear = function() {
        var A = this;
        A.autoPlayTimer && clearInterval(A.autoPlayTimer)
    }
    ,
    e.prototype.autoPlayIterator = function() {
        var A = this
          , e = A.currentSlide + A.options.slidesToScroll;
        A.paused || A.interrupted || A.focussed || (A.options.infinite === !1 && (1 === A.direction && A.currentSlide + 1 === A.slideCount - 1 ? A.direction = 0 : 0 === A.direction && (e = A.currentSlide - A.options.slidesToScroll,
        A.currentSlide - 1 === 0 && (A.direction = 1))),
        A.slideHandler(e))
    }
    ,
    e.prototype.buildArrows = function() {
        var e = this;
        e.options.arrows === !0 && (e.$prevArrow = A(e.options.prevArrow).addClass("slick-arrow"),
        e.$nextArrow = A(e.options.nextArrow).addClass("slick-arrow"),
        e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows),
        e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows),
        e.options.infinite !== !0 && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }
    ,
    e.prototype.buildDots = function() {
        var e, t, i = this;
        if (i.options.dots === !0 && i.slideCount > i.options.slidesToShow) {
            for (i.$slider.addClass("slick-dotted"),
            t = A("<ul />").addClass(i.options.dotsClass),
            e = 0; e <= i.getDotCount(); e += 1)
                t.append(A("<li />").append(i.options.customPaging.call(this, i, e)));
            i.$dots = t.appendTo(i.options.appendDots),
            i.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }
    ,
    e.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"),
        e.slideCount = e.$slides.length,
        e.$slides.each(function(e, t) {
            A(t).attr("data-slick-index", e).data("originalStyling", A(t).attr("style") || "")
        }),
        e.$slider.addClass("slick-slider"),
        e.$slideTrack = 0 === e.slideCount ? A('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(),
        e.$list = e.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),
        e.$slideTrack.css("opacity", 0),
        (e.options.centerMode === !0 || e.options.swipeToSlide === !0) && (e.options.slidesToScroll = 1),
        A("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
        e.options.draggable === !0 && e.$list.addClass("draggable")
    }
    ,
    e.prototype.buildRows = function() {
        var A, e, t, i, o, n, s, r = this;
        if (i = document.createDocumentFragment(),
        n = r.$slider.children(),
        r.options.rows > 1) {
            for (s = r.options.slidesPerRow * r.options.rows,
            o = Math.ceil(n.length / s),
            A = 0; o > A; A++) {
                var a = document.createElement("div");
                for (e = 0; e < r.options.rows; e++) {
                    var l = document.createElement("div");
                    for (t = 0; t < r.options.slidesPerRow; t++) {
                        var d = A * s + (e * r.options.slidesPerRow + t);
                        n.get(d) && l.appendChild(n.get(d))
                    }
                    a.appendChild(l)
                }
                i.appendChild(a)
            }
            r.$slider.empty().append(i),
            r.$slider.children().children().children().css({
                width: 100 / r.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }
    ,
    e.prototype.checkResponsive = function(e, t) {
        var i, o, n, s = this, r = !1, a = s.$slider.width(), l = window.innerWidth || A(window).width();
        if ("window" === s.respondTo ? n = l : "slider" === s.respondTo ? n = a : "min" === s.respondTo && (n = Math.min(l, a)),
        s.options.responsive && s.options.responsive.length && null !== s.options.responsive) {
            o = null;
            for (i in s.breakpoints)
                s.breakpoints.hasOwnProperty(i) && (s.originalSettings.mobileFirst === !1 ? n < s.breakpoints[i] && (o = s.breakpoints[i]) : n > s.breakpoints[i] && (o = s.breakpoints[i]));
            null !== o ? null !== s.activeBreakpoint ? (o !== s.activeBreakpoint || t) && (s.activeBreakpoint = o,
            "unslick" === s.breakpointSettings[o] ? s.unslick(o) : (s.options = A.extend({}, s.originalSettings, s.breakpointSettings[o]),
            e === !0 && (s.currentSlide = s.options.initialSlide),
            s.refresh(e)),
            r = o) : (s.activeBreakpoint = o,
            "unslick" === s.breakpointSettings[o] ? s.unslick(o) : (s.options = A.extend({}, s.originalSettings, s.breakpointSettings[o]),
            e === !0 && (s.currentSlide = s.options.initialSlide),
            s.refresh(e)),
            r = o) : null !== s.activeBreakpoint && (s.activeBreakpoint = null,
            s.options = s.originalSettings,
            e === !0 && (s.currentSlide = s.options.initialSlide),
            s.refresh(e),
            r = o),
            e || r === !1 || s.$slider.trigger("breakpoint", [s, r])
        }
    }
    ,
    e.prototype.changeSlide = function(e, t) {
        var i, o, n, s = this, r = A(e.currentTarget);
        switch (r.is("a") && e.preventDefault(),
        r.is("li") || (r = r.closest("li")),
        n = s.slideCount % s.options.slidesToScroll !== 0,
        i = n ? 0 : (s.slideCount - s.currentSlide) % s.options.slidesToScroll,
        e.data.message) {
        case "previous":
            o = 0 === i ? s.options.slidesToScroll : s.options.slidesToShow - i,
            s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide - o, !1, t);
            break;
        case "next":
            o = 0 === i ? s.options.slidesToScroll : i,
            s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide + o, !1, t);
            break;
        case "index":
            var a = 0 === e.data.index ? 0 : e.data.index || r.index() * s.options.slidesToScroll;
            s.slideHandler(s.checkNavigable(a), !1, t),
            r.children().trigger("focus");
            break;
        default:
            return
        }
    }
    ,
    e.prototype.checkNavigable = function(A) {
        var e, t, i = this;
        if (e = i.getNavigableIndexes(),
        t = 0,
        A > e[e.length - 1])
            A = e[e.length - 1];
        else
            for (var o in e) {
                if (A < e[o]) {
                    A = t;
                    break
                }
                t = e[o]
            }
        return A
    }
    ,
    e.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && A("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", A.proxy(e.interrupt, e, !0)).off("mouseleave.slick", A.proxy(e.interrupt, e, !1)),
        e.$slider.off("focus.slick blur.slick"),
        e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
        e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide)),
        e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
        e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
        e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
        e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
        e.$list.off("click.slick", e.clickHandler),
        A(document).off(e.visibilityChange, e.visibility),
        e.cleanUpSlideEvents(),
        e.options.accessibility === !0 && e.$list.off("keydown.slick", e.keyHandler),
        e.options.focusOnSelect === !0 && A(e.$slideTrack).children().off("click.slick", e.selectHandler),
        A(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange),
        A(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
        A("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault),
        A(window).off("load.slick.slick-" + e.instanceUid, e.setPosition),
        A(document).off("ready.slick.slick-" + e.instanceUid, e.setPosition)
    }
    ,
    e.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", A.proxy(e.interrupt, e, !0)),
        e.$list.off("mouseleave.slick", A.proxy(e.interrupt, e, !1))
    }
    ,
    e.prototype.cleanUpRows = function() {
        var A, e = this;
        e.options.rows > 1 && (A = e.$slides.children().children(),
        A.removeAttr("style"),
        e.$slider.empty().append(A))
    }
    ,
    e.prototype.clickHandler = function(A) {
        var e = this;
        e.shouldClick === !1 && (A.stopImmediatePropagation(),
        A.stopPropagation(),
        A.preventDefault())
    }
    ,
    e.prototype.destroy = function(e) {
        var t = this;
        t.autoPlayClear(),
        t.touchObject = {},
        t.cleanUpEvents(),
        A(".slick-cloned", t.$slider).detach(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
        t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
        t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            A(this).attr("style", A(this).data("originalStyling"))
        }),
        t.$slideTrack.children(this.options.slide).detach(),
        t.$slideTrack.detach(),
        t.$list.detach(),
        t.$slider.append(t.$slides)),
        t.cleanUpRows(),
        t.$slider.removeClass("slick-slider"),
        t.$slider.removeClass("slick-initialized"),
        t.$slider.removeClass("slick-dotted"),
        t.unslicked = !0,
        e || t.$slider.trigger("destroy", [t])
    }
    ,
    e.prototype.disableTransition = function(A) {
        var e = this
          , t = {};
        t[e.transitionType] = "",
        e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(A).css(t)
    }
    ,
    e.prototype.fadeSlide = function(A, e) {
        var t = this;
        t.cssTransitions === !1 ? (t.$slides.eq(A).css({
            zIndex: t.options.zIndex
        }),
        t.$slides.eq(A).animate({
            opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(A),
        t.$slides.eq(A).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }),
        e && setTimeout(function() {
            t.disableTransition(A),
            e.call()
        }, t.options.speed))
    }
    ,
    e.prototype.fadeSlideOut = function(A) {
        var e = this;
        e.cssTransitions === !1 ? e.$slides.eq(A).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(A),
        e.$slides.eq(A).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }
    ,
    e.prototype.filterSlides = e.prototype.slickFilter = function(A) {
        var e = this;
        null !== A && (e.$slidesCache = e.$slides,
        e.unload(),
        e.$slideTrack.children(this.options.slide).detach(),
        e.$slidesCache.filter(A).appendTo(e.$slideTrack),
        e.reinit())
    }
    ,
    e.prototype.focusHandler = function() {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(t) {
            t.stopImmediatePropagation();
            var i = A(this);
            setTimeout(function() {
                e.options.pauseOnFocus && (e.focussed = i.is(":focus"),
                e.autoPlay())
            }, 0)
        })
    }
    ,
    e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
        var A = this;
        return A.currentSlide
    }
    ,
    e.prototype.getDotCount = function() {
        var A = this
          , e = 0
          , t = 0
          , i = 0;
        if (A.options.infinite === !0)
            for (; e < A.slideCount; )
                ++i,
                e = t + A.options.slidesToScroll,
                t += A.options.slidesToScroll <= A.options.slidesToShow ? A.options.slidesToScroll : A.options.slidesToShow;
        else if (A.options.centerMode === !0)
            i = A.slideCount;
        else if (A.options.asNavFor)
            for (; e < A.slideCount; )
                ++i,
                e = t + A.options.slidesToScroll,
                t += A.options.slidesToScroll <= A.options.slidesToShow ? A.options.slidesToScroll : A.options.slidesToShow;
        else
            i = 1 + Math.ceil((A.slideCount - A.options.slidesToShow) / A.options.slidesToScroll);
        return i - 1
    }
    ,
    e.prototype.getLeft = function(A) {
        var e, t, i, o = this, n = 0;
        return o.slideOffset = 0,
        t = o.$slides.first().outerHeight(!0),
        o.options.infinite === !0 ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = o.slideWidth * o.options.slidesToShow * -1,
        n = t * o.options.slidesToShow * -1),
        o.slideCount % o.options.slidesToScroll !== 0 && A + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (A > o.slideCount ? (o.slideOffset = (o.options.slidesToShow - (A - o.slideCount)) * o.slideWidth * -1,
        n = (o.options.slidesToShow - (A - o.slideCount)) * t * -1) : (o.slideOffset = o.slideCount % o.options.slidesToScroll * o.slideWidth * -1,
        n = o.slideCount % o.options.slidesToScroll * t * -1))) : A + o.options.slidesToShow > o.slideCount && (o.slideOffset = (A + o.options.slidesToShow - o.slideCount) * o.slideWidth,
        n = (A + o.options.slidesToShow - o.slideCount) * t),
        o.slideCount <= o.options.slidesToShow && (o.slideOffset = 0,
        n = 0),
        o.options.centerMode === !0 && o.options.infinite === !0 ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : o.options.centerMode === !0 && (o.slideOffset = 0,
        o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)),
        e = o.options.vertical === !1 ? A * o.slideWidth * -1 + o.slideOffset : A * t * -1 + n,
        o.options.variableWidth === !0 && (i = o.slideCount <= o.options.slidesToShow || o.options.infinite === !1 ? o.$slideTrack.children(".slick-slide").eq(A) : o.$slideTrack.children(".slick-slide").eq(A + o.options.slidesToShow),
        e = o.options.rtl === !0 ? i[0] ? -1 * (o.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0,
        o.options.centerMode === !0 && (i = o.slideCount <= o.options.slidesToShow || o.options.infinite === !1 ? o.$slideTrack.children(".slick-slide").eq(A) : o.$slideTrack.children(".slick-slide").eq(A + o.options.slidesToShow + 1),
        e = o.options.rtl === !0 ? i[0] ? -1 * (o.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0,
        e += (o.$list.width() - i.outerWidth()) / 2)),
        e
    }
    ,
    e.prototype.getOption = e.prototype.slickGetOption = function(A) {
        var e = this;
        return e.options[A]
    }
    ,
    e.prototype.getNavigableIndexes = function() {
        var A, e = this, t = 0, i = 0, o = [];
        for (e.options.infinite === !1 ? A = e.slideCount : (t = -1 * e.options.slidesToScroll,
        i = -1 * e.options.slidesToScroll,
        A = 2 * e.slideCount); A > t; )
            o.push(t),
            t = i + e.options.slidesToScroll,
            i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return o
    }
    ,
    e.prototype.getSlick = function() {
        return this
    }
    ,
    e.prototype.getSlideCount = function() {
        var e, t, i, o = this;
        return i = o.options.centerMode === !0 ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0,
        o.options.swipeToSlide === !0 ? (o.$slideTrack.find(".slick-slide").each(function(e, n) {
            return n.offsetLeft - i + A(n).outerWidth() / 2 > -1 * o.swipeLeft ? (t = n,
            !1) : void 0
        }),
        e = Math.abs(A(t).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
    }
    ,
    e.prototype.goTo = e.prototype.slickGoTo = function(A, e) {
        var t = this;
        t.changeSlide({
            data: {
                message: "index",
                index: parseInt(A)
            }
        }, e)
    }
    ,
    e.prototype.init = function(e) {
        var t = this;
        A(t.$slider).hasClass("slick-initialized") || (A(t.$slider).addClass("slick-initialized"),
        t.buildRows(),
        t.buildOut(),
        t.setProps(),
        t.startLoad(),
        t.loadSlider(),
        t.initializeEvents(),
        t.updateArrows(),
        t.updateDots(),
        t.checkResponsive(!0),
        t.focusHandler()),
        e && t.$slider.trigger("init", [t]),
        t.options.accessibility === !0 && t.initADA(),
        t.options.autoplay && (t.paused = !1,
        t.autoPlay())
    }
    ,
    e.prototype.initADA = function() {
        var e = this;
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }),
        e.$slideTrack.attr("role", "listbox"),
        e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
            A(this).attr({
                role: "option",
                "aria-describedby": "slick-slide" + e.instanceUid + t
            })
        }),
        null !== e.$dots && e.$dots.attr("role", "tablist").find("li").each(function(t) {
            A(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + e.instanceUid + t,
                id: "slick-slide" + e.instanceUid + t
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"),
        e.activateADA()
    }
    ,
    e.prototype.initArrowEvents = function() {
        var A = this;
        A.options.arrows === !0 && A.slideCount > A.options.slidesToShow && (A.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, A.changeSlide),
        A.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, A.changeSlide))
    }
    ,
    e.prototype.initDotEvents = function() {
        var e = this;
        e.options.dots === !0 && e.slideCount > e.options.slidesToShow && A("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide),
        e.options.dots === !0 && e.options.pauseOnDotsHover === !0 && A("li", e.$dots).on("mouseenter.slick", A.proxy(e.interrupt, e, !0)).on("mouseleave.slick", A.proxy(e.interrupt, e, !1))
    }
    ,
    e.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", A.proxy(e.interrupt, e, !0)),
        e.$list.on("mouseleave.slick", A.proxy(e.interrupt, e, !1)))
    }
    ,
    e.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(),
        e.initDotEvents(),
        e.initSlideEvents(),
        e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler),
        e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler),
        e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler),
        e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler),
        e.$list.on("click.slick", e.clickHandler),
        A(document).on(e.visibilityChange, A.proxy(e.visibility, e)),
        e.options.accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler),
        e.options.focusOnSelect === !0 && A(e.$slideTrack).children().on("click.slick", e.selectHandler),
        A(window).on("orientationchange.slick.slick-" + e.instanceUid, A.proxy(e.orientationChange, e)),
        A(window).on("resize.slick.slick-" + e.instanceUid, A.proxy(e.resize, e)),
        A("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
        A(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
        A(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition)
    }
    ,
    e.prototype.initUI = function() {
        var A = this;
        A.options.arrows === !0 && A.slideCount > A.options.slidesToShow && (A.$prevArrow.show(),
        A.$nextArrow.show()),
        A.options.dots === !0 && A.slideCount > A.options.slidesToShow && A.$dots.show()
    }
    ,
    e.prototype.keyHandler = function(A) {
        var e = this;
        A.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === A.keyCode && e.options.accessibility === !0 ? e.changeSlide({
            data: {
                message: e.options.rtl === !0 ? "next" : "previous"
            }
        }) : 39 === A.keyCode && e.options.accessibility === !0 && e.changeSlide({
            data: {
                message: e.options.rtl === !0 ? "previous" : "next"
            }
        }))
    }
    ,
    e.prototype.lazyLoad = function() {
        function e(e) {
            A("img[data-lazy]", e).each(function() {
                var e = A(this)
                  , t = A(this).attr("data-lazy")
                  , i = document.createElement("img");
                i.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        e.attr("src", t).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy").removeClass("slick-loading")
                        }),
                        s.$slider.trigger("lazyLoaded", [s, e, t])
                    })
                }
                ,
                i.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
                    s.$slider.trigger("lazyLoadError", [s, e, t])
                }
                ,
                i.src = t
            })
        }
        var t, i, o, n, s = this;
        s.options.centerMode === !0 ? s.options.infinite === !0 ? (o = s.currentSlide + (s.options.slidesToShow / 2 + 1),
        n = o + s.options.slidesToShow + 2) : (o = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1)),
        n = 2 + (s.options.slidesToShow / 2 + 1) + s.currentSlide) : (o = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide,
        n = Math.ceil(o + s.options.slidesToShow),
        s.options.fade === !0 && (o > 0 && o--,
        n <= s.slideCount && n++)),
        t = s.$slider.find(".slick-slide").slice(o, n),
        e(t),
        s.slideCount <= s.options.slidesToShow ? (i = s.$slider.find(".slick-slide"),
        e(i)) : s.currentSlide >= s.slideCount - s.options.slidesToShow ? (i = s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow),
        e(i)) : 0 === s.currentSlide && (i = s.$slider.find(".slick-cloned").slice(-1 * s.options.slidesToShow),
        e(i))
    }
    ,
    e.prototype.loadSlider = function() {
        var A = this;
        A.setPosition(),
        A.$slideTrack.css({
            opacity: 1
        }),
        A.$slider.removeClass("slick-loading"),
        A.initUI(),
        "progressive" === A.options.lazyLoad && A.progressiveLazyLoad()
    }
    ,
    e.prototype.next = e.prototype.slickNext = function() {
        var A = this;
        A.changeSlide({
            data: {
                message: "next"
            }
        })
    }
    ,
    e.prototype.orientationChange = function() {
        var A = this;
        A.checkResponsive(),
        A.setPosition()
    }
    ,
    e.prototype.pause = e.prototype.slickPause = function() {
        var A = this;
        A.autoPlayClear(),
        A.paused = !0
    }
    ,
    e.prototype.play = e.prototype.slickPlay = function() {
        var A = this;
        A.autoPlay(),
        A.options.autoplay = !0,
        A.paused = !1,
        A.focussed = !1,
        A.interrupted = !1
    }
    ,
    e.prototype.postSlide = function(A) {
        var e = this;
        e.unslicked || (e.$slider.trigger("afterChange", [e, A]),
        e.animating = !1,
        e.setPosition(),
        e.swipeLeft = null,
        e.options.autoplay && e.autoPlay(),
        e.options.accessibility === !0 && e.initADA())
    }
    ,
    e.prototype.prev = e.prototype.slickPrev = function() {
        var A = this;
        A.changeSlide({
            data: {
                message: "previous"
            }
        })
    }
    ,
    e.prototype.preventDefault = function(A) {
        A.preventDefault()
    }
    ,
    e.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var t, i, o, n = this, s = A("img[data-lazy]", n.$slider);
        s.length ? (t = s.first(),
        i = t.attr("data-lazy"),
        o = document.createElement("img"),
        o.onload = function() {
            t.attr("src", i).removeAttr("data-lazy").removeClass("slick-loading"),
            n.options.adaptiveHeight === !0 && n.setPosition(),
            n.$slider.trigger("lazyLoaded", [n, t, i]),
            n.progressiveLazyLoad()
        }
        ,
        o.onerror = function() {
            3 > e ? setTimeout(function() {
                n.progressiveLazyLoad(e + 1)
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
            n.$slider.trigger("lazyLoadError", [n, t, i]),
            n.progressiveLazyLoad())
        }
        ,
        o.src = i) : n.$slider.trigger("allImagesLoaded", [n])
    }
    ,
    e.prototype.refresh = function(e) {
        var t, i, o = this;
        i = o.slideCount - o.options.slidesToShow,
        !o.options.infinite && o.currentSlide > i && (o.currentSlide = i),
        o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0),
        t = o.currentSlide,
        o.destroy(!0),
        A.extend(o, o.initials, {
            currentSlide: t
        }),
        o.init(),
        e || o.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }
    ,
    e.prototype.registerBreakpoints = function() {
        var e, t, i, o = this, n = o.options.responsive || null;
        if ("array" === A.type(n) && n.length) {
            o.respondTo = o.options.respondTo || "window";
            for (e in n)
                if (i = o.breakpoints.length - 1,
                t = n[e].breakpoint,
                n.hasOwnProperty(e)) {
                    for (; i >= 0; )
                        o.breakpoints[i] && o.breakpoints[i] === t && o.breakpoints.splice(i, 1),
                        i--;
                    o.breakpoints.push(t),
                    o.breakpointSettings[t] = n[e].settings
                }
            o.breakpoints.sort(function(A, e) {
                return o.options.mobileFirst ? A - e : e - A
            })
        }
    }
    ,
    e.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"),
        e.slideCount = e.$slides.length,
        e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.registerBreakpoints(),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.cleanUpSlideEvents(),
        e.initSlideEvents(),
        e.checkResponsive(!1, !0),
        e.options.focusOnSelect === !0 && A(e.$slideTrack).children().on("click.slick", e.selectHandler),
        e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
        e.setPosition(),
        e.focusHandler(),
        e.paused = !e.options.autoplay,
        e.autoPlay(),
        e.$slider.trigger("reInit", [e])
    }
    ,
    e.prototype.resize = function() {
        var e = this;
        A(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay),
        e.windowDelay = window.setTimeout(function() {
            e.windowWidth = A(window).width(),
            e.checkResponsive(),
            e.unslicked || e.setPosition()
        }, 50))
    }
    ,
    e.prototype.removeSlide = e.prototype.slickRemove = function(A, e, t) {
        var i = this;
        return "boolean" == typeof A ? (e = A,
        A = e === !0 ? 0 : i.slideCount - 1) : A = e === !0 ? --A : A,
        !(i.slideCount < 1 || 0 > A || A > i.slideCount - 1) && (i.unload(),
        t === !0 ? i.$slideTrack.children().remove() : i.$slideTrack.children(this.options.slide).eq(A).remove(),
        i.$slides = i.$slideTrack.children(this.options.slide),
        i.$slideTrack.children(this.options.slide).detach(),
        i.$slideTrack.append(i.$slides),
        i.$slidesCache = i.$slides,
        void i.reinit())
    }
    ,
    e.prototype.setCSS = function(A) {
        var e, t, i = this, o = {};
        i.options.rtl === !0 && (A = -A),
        e = "left" == i.positionProp ? Math.ceil(A) + "px" : "0px",
        t = "top" == i.positionProp ? Math.ceil(A) + "px" : "0px",
        o[i.positionProp] = A,
        i.transformsEnabled === !1 ? i.$slideTrack.css(o) : (o = {},
        i.cssTransitions === !1 ? (o[i.animType] = "translate(" + e + ", " + t + ")",
        i.$slideTrack.css(o)) : (o[i.animType] = "translate3d(" + e + ", " + t + ", 0px)",
        i.$slideTrack.css(o)))
    }
    ,
    e.prototype.setDimensions = function() {
        var A = this;
        A.options.vertical === !1 ? A.options.centerMode === !0 && A.$list.css({
            padding: "0px " + A.options.centerPadding
        }) : (A.$list.height(A.$slides.first().outerHeight(!0) * A.options.slidesToShow),
        A.options.centerMode === !0 && A.$list.css({
            padding: A.options.centerPadding + " 0px"
        })),
        A.listWidth = A.$list.width(),
        A.listHeight = A.$list.height(),
        A.options.vertical === !1 && A.options.variableWidth === !1 ? (A.slideWidth = Math.ceil(A.listWidth / A.options.slidesToShow),
        A.$slideTrack.width(Math.ceil(A.slideWidth * A.$slideTrack.children(".slick-slide").length))) : A.options.variableWidth === !0 ? A.$slideTrack.width(5e3 * A.slideCount) : (A.slideWidth = Math.ceil(A.listWidth),
        A.$slideTrack.height(Math.ceil(A.$slides.first().outerHeight(!0) * A.$slideTrack.children(".slick-slide").length)));
        var e = A.$slides.first().outerWidth(!0) - A.$slides.first().width();
        A.options.variableWidth === !1 && A.$slideTrack.children(".slick-slide").width(A.slideWidth - e)
    }
    ,
    e.prototype.setFade = function() {
        var e, t = this;
        t.$slides.each(function(i, o) {
            e = t.slideWidth * i * -1,
            t.options.rtl === !0 ? A(o).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : A(o).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            })
        }),
        t.$slides.eq(t.currentSlide).css({
            zIndex: t.options.zIndex - 1,
            opacity: 1
        })
    }
    ,
    e.prototype.setHeight = function() {
        var A = this;
        if (1 === A.options.slidesToShow && A.options.adaptiveHeight === !0 && A.options.vertical === !1) {
            var e = A.$slides.eq(A.currentSlide).outerHeight(!0);
            A.$list.css("height", e)
        }
    }
    ,
    e.prototype.setOption = e.prototype.slickSetOption = function() {
        var e, t, i, o, n, s = this, r = !1;
        if ("object" === A.type(arguments[0]) ? (i = arguments[0],
        r = arguments[1],
        n = "multiple") : "string" === A.type(arguments[0]) && (i = arguments[0],
        o = arguments[1],
        r = arguments[2],
        "responsive" === arguments[0] && "array" === A.type(arguments[1]) ? n = "responsive" : "undefined" != typeof arguments[1] && (n = "single")),
        "single" === n)
            s.options[i] = o;
        else if ("multiple" === n)
            A.each(i, function(A, e) {
                s.options[A] = e
            });
        else if ("responsive" === n)
            for (t in o)
                if ("array" !== A.type(s.options.responsive))
                    s.options.responsive = [o[t]];
                else {
                    for (e = s.options.responsive.length - 1; e >= 0; )
                        s.options.responsive[e].breakpoint === o[t].breakpoint && s.options.responsive.splice(e, 1),
                        e--;
                    s.options.responsive.push(o[t])
                }
        r && (s.unload(),
        s.reinit())
    }
    ,
    e.prototype.setPosition = function() {
        var A = this;
        A.setDimensions(),
        A.setHeight(),
        A.options.fade === !1 ? A.setCSS(A.getLeft(A.currentSlide)) : A.setFade(),
        A.$slider.trigger("setPosition", [A])
    }
    ,
    e.prototype.setProps = function() {
        var A = this
          , e = document.body.style;
        A.positionProp = A.options.vertical === !0 ? "top" : "left",
        "top" === A.positionProp ? A.$slider.addClass("slick-vertical") : A.$slider.removeClass("slick-vertical"),
        (void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.msTransition) && A.options.useCSS === !0 && (A.cssTransitions = !0),
        A.options.fade && ("number" == typeof A.options.zIndex ? A.options.zIndex < 3 && (A.options.zIndex = 3) : A.options.zIndex = A.defaults.zIndex),
        void 0 !== e.OTransform && (A.animType = "OTransform",
        A.transformType = "-o-transform",
        A.transitionType = "OTransition",
        void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (A.animType = !1)),
        void 0 !== e.MozTransform && (A.animType = "MozTransform",
        A.transformType = "-moz-transform",
        A.transitionType = "MozTransition",
        void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (A.animType = !1)),
        void 0 !== e.webkitTransform && (A.animType = "webkitTransform",
        A.transformType = "-webkit-transform",
        A.transitionType = "webkitTransition",
        void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (A.animType = !1)),
        void 0 !== e.msTransform && (A.animType = "msTransform",
        A.transformType = "-ms-transform",
        A.transitionType = "msTransition",
        void 0 === e.msTransform && (A.animType = !1)),
        void 0 !== e.transform && A.animType !== !1 && (A.animType = "transform",
        A.transformType = "transform",
        A.transitionType = "transition"),
        A.transformsEnabled = A.options.useTransform && null !== A.animType && A.animType !== !1
    }
    ,
    e.prototype.setSlideClasses = function(A) {
        var e, t, i, o, n = this;
        t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"),
        n.$slides.eq(A).addClass("slick-current"),
        n.options.centerMode === !0 ? (e = Math.floor(n.options.slidesToShow / 2),
        n.options.infinite === !0 && (A >= e && A <= n.slideCount - 1 - e ? n.$slides.slice(A - e, A + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (i = n.options.slidesToShow + A,
        t.slice(i - e + 1, i + e + 2).addClass("slick-active").attr("aria-hidden", "false")),
        0 === A ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : A === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")),
        n.$slides.eq(A).addClass("slick-center")) : A >= 0 && A <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(A, A + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (o = n.slideCount % n.options.slidesToShow,
        i = n.options.infinite === !0 ? n.options.slidesToShow + A : A,
        n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - A < n.options.slidesToShow ? t.slice(i - (n.options.slidesToShow - o), i + o).addClass("slick-active").attr("aria-hidden", "false") : t.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")),
        "ondemand" === n.options.lazyLoad && n.lazyLoad()
    }
    ,
    e.prototype.setupInfinite = function() {
        var e, t, i, o = this;
        if (o.options.fade === !0 && (o.options.centerMode = !1),
        o.options.infinite === !0 && o.options.fade === !1 && (t = null,
        o.slideCount > o.options.slidesToShow)) {
            for (i = o.options.centerMode === !0 ? o.options.slidesToShow + 1 : o.options.slidesToShow,
            e = o.slideCount; e > o.slideCount - i; e -= 1)
                t = e - 1,
                A(o.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
            for (e = 0; i > e; e += 1)
                t = e,
                A(o.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
            o.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                A(this).attr("id", "")
            })
        }
    }
    ,
    e.prototype.interrupt = function(A) {
        var e = this;
        A || e.autoPlay(),
        e.interrupted = A
    }
    ,
    e.prototype.selectHandler = function(e) {
        var t = this
          , i = A(e.target).is(".slick-slide") ? A(e.target) : A(e.target).parents(".slick-slide")
          , o = parseInt(i.attr("data-slick-index"));
        return o || (o = 0),
        t.slideCount <= t.options.slidesToShow ? (t.setSlideClasses(o),
        void t.asNavFor(o)) : void t.slideHandler(o)
    }
    ,
    e.prototype.slideHandler = function(A, e, t) {
        var i, o, n, s, r, a = null, l = this;
        return e = e || !1,
        l.animating === !0 && l.options.waitForAnimate === !0 || l.options.fade === !0 && l.currentSlide === A || l.slideCount <= l.options.slidesToShow ? void 0 : (e === !1 && l.asNavFor(A),
        i = A,
        a = l.getLeft(i),
        s = l.getLeft(l.currentSlide),
        l.currentLeft = null === l.swipeLeft ? s : l.swipeLeft,
        l.options.infinite === !1 && l.options.centerMode === !1 && (0 > A || A > l.getDotCount() * l.options.slidesToScroll) ? void (l.options.fade === !1 && (i = l.currentSlide,
        t !== !0 ? l.animateSlide(s, function() {
            l.postSlide(i)
        }) : l.postSlide(i))) : l.options.infinite === !1 && l.options.centerMode === !0 && (0 > A || A > l.slideCount - l.options.slidesToScroll) ? void (l.options.fade === !1 && (i = l.currentSlide,
        t !== !0 ? l.animateSlide(s, function() {
            l.postSlide(i)
        }) : l.postSlide(i))) : (l.options.autoplay && clearInterval(l.autoPlayTimer),
        o = 0 > i ? l.slideCount % l.options.slidesToScroll !== 0 ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + i : i >= l.slideCount ? l.slideCount % l.options.slidesToScroll !== 0 ? 0 : i - l.slideCount : i,
        l.animating = !0,
        l.$slider.trigger("beforeChange", [l, l.currentSlide, o]),
        n = l.currentSlide,
        l.currentSlide = o,
        l.setSlideClasses(l.currentSlide),
        l.options.asNavFor && (r = l.getNavTarget(),
        r = r.slick("getSlick"),
        r.slideCount <= r.options.slidesToShow && r.setSlideClasses(l.currentSlide)),
        l.updateDots(),
        l.updateArrows(),
        l.options.fade === !0 ? (t !== !0 ? (l.fadeSlideOut(n),
        l.fadeSlide(o, function() {
            l.postSlide(o)
        })) : l.postSlide(o),
        void l.animateHeight()) : void (t !== !0 ? l.animateSlide(a, function() {
            l.postSlide(o)
        }) : l.postSlide(o))))
    }
    ,
    e.prototype.startLoad = function() {
        var A = this;
        A.options.arrows === !0 && A.slideCount > A.options.slidesToShow && (A.$prevArrow.hide(),
        A.$nextArrow.hide()),
        A.options.dots === !0 && A.slideCount > A.options.slidesToShow && A.$dots.hide(),
        A.$slider.addClass("slick-loading")
    }
    ,
    e.prototype.swipeDirection = function() {
        var A, e, t, i, o = this;
        return A = o.touchObject.startX - o.touchObject.curX,
        e = o.touchObject.startY - o.touchObject.curY,
        t = Math.atan2(e, A),
        i = Math.round(180 * t / Math.PI),
        0 > i && (i = 360 - Math.abs(i)),
        45 >= i && i >= 0 ? o.options.rtl === !1 ? "left" : "right" : 360 >= i && i >= 315 ? o.options.rtl === !1 ? "left" : "right" : i >= 135 && 225 >= i ? o.options.rtl === !1 ? "right" : "left" : o.options.verticalSwiping === !0 ? i >= 35 && 135 >= i ? "down" : "up" : "vertical"
    }
    ,
    e.prototype.swipeEnd = function() {
        var A, e, t = this;
        if (t.dragging = !1,
        t.interrupted = !1,
        t.shouldClick = !(t.touchObject.swipeLength > 10),
        void 0 === t.touchObject.curX)
            return !1;
        if (t.touchObject.edgeHit === !0 && t.$slider.trigger("edge", [t, t.swipeDirection()]),
        t.touchObject.swipeLength >= t.touchObject.minSwipe) {
            switch (e = t.swipeDirection()) {
            case "left":
            case "down":
                A = t.options.swipeToSlide ? t.checkNavigable(t.currentSlide + t.getSlideCount()) : t.currentSlide + t.getSlideCount(),
                t.currentDirection = 0;
                break;
            case "right":
            case "up":
                A = t.options.swipeToSlide ? t.checkNavigable(t.currentSlide - t.getSlideCount()) : t.currentSlide - t.getSlideCount(),
                t.currentDirection = 1
            }
            "vertical" != e && (t.slideHandler(A),
            t.touchObject = {},
            t.$slider.trigger("swipe", [t, e]))
        } else
            t.touchObject.startX !== t.touchObject.curX && (t.slideHandler(t.currentSlide),
            t.touchObject = {})
    }
    ,
    e.prototype.swipeHandler = function(A) {
        var e = this;
        if (!(e.options.swipe === !1 || "ontouchend"in document && e.options.swipe === !1 || e.options.draggable === !1 && -1 !== A.type.indexOf("mouse")))
            switch (e.touchObject.fingerCount = A.originalEvent && void 0 !== A.originalEvent.touches ? A.originalEvent.touches.length : 1,
            e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold,
            e.options.verticalSwiping === !0 && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
            A.data.action) {
            case "start":
                e.swipeStart(A);
                break;
            case "move":
                e.swipeMove(A);
                break;
            case "end":
                e.swipeEnd(A)
            }
    }
    ,
    e.prototype.swipeMove = function(A) {
        var e, t, i, o, n, s = this;
        return n = void 0 !== A.originalEvent ? A.originalEvent.touches : null,
        !(!s.dragging || n && 1 !== n.length) && (e = s.getLeft(s.currentSlide),
        s.touchObject.curX = void 0 !== n ? n[0].pageX : A.clientX,
        s.touchObject.curY = void 0 !== n ? n[0].pageY : A.clientY,
        s.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(s.touchObject.curX - s.touchObject.startX, 2))),
        s.options.verticalSwiping === !0 && (s.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(s.touchObject.curY - s.touchObject.startY, 2)))),
        t = s.swipeDirection(),
        "vertical" !== t ? (void 0 !== A.originalEvent && s.touchObject.swipeLength > 4 && A.preventDefault(),
        o = (s.options.rtl === !1 ? 1 : -1) * (s.touchObject.curX > s.touchObject.startX ? 1 : -1),
        s.options.verticalSwiping === !0 && (o = s.touchObject.curY > s.touchObject.startY ? 1 : -1),
        i = s.touchObject.swipeLength,
        s.touchObject.edgeHit = !1,
        s.options.infinite === !1 && (0 === s.currentSlide && "right" === t || s.currentSlide >= s.getDotCount() && "left" === t) && (i = s.touchObject.swipeLength * s.options.edgeFriction,
        s.touchObject.edgeHit = !0),
        s.options.vertical === !1 ? s.swipeLeft = e + i * o : s.swipeLeft = e + i * (s.$list.height() / s.listWidth) * o,
        s.options.verticalSwiping === !0 && (s.swipeLeft = e + i * o),
        s.options.fade !== !0 && s.options.touchMove !== !1 && (s.animating === !0 ? (s.swipeLeft = null,
        !1) : void s.setCSS(s.swipeLeft))) : void 0)
    }
    ,
    e.prototype.swipeStart = function(A) {
        var e, t = this;
        return t.interrupted = !0,
        1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow ? (t.touchObject = {},
        !1) : (void 0 !== A.originalEvent && void 0 !== A.originalEvent.touches && (e = A.originalEvent.touches[0]),
        t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : A.clientX,
        t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : A.clientY,
        void (t.dragging = !0))
    }
    ,
    e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
        var A = this;
        null !== A.$slidesCache && (A.unload(),
        A.$slideTrack.children(this.options.slide).detach(),
        A.$slidesCache.appendTo(A.$slideTrack),
        A.reinit())
    }
    ,
    e.prototype.unload = function() {
        var e = this;
        A(".slick-cloned", e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(),
        e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(),
        e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }
    ,
    e.prototype.unslick = function(A) {
        var e = this;
        e.$slider.trigger("unslick", [e, A]),
        e.destroy()
    }
    ,
    e.prototype.updateArrows = function() {
        var A, e = this;
        A = Math.floor(e.options.slidesToShow / 2),
        e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1 ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && e.options.centerMode === !0 && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }
    ,
    e.prototype.updateDots = function() {
        var A = this;
        null !== A.$dots && (A.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"),
        A.$dots.find("li").eq(Math.floor(A.currentSlide / A.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }
    ,
    e.prototype.visibility = function() {
        var A = this;
        A.options.autoplay && (document[A.hidden] ? A.interrupted = !0 : A.interrupted = !1)
    }
    ,
    A.fn.slick = function() {
        var A, t, i = this, o = arguments[0], n = Array.prototype.slice.call(arguments, 1), s = i.length;
        for (A = 0; s > A; A++)
            if ("object" == typeof o || "undefined" == typeof o ? i[A].slick = new e(i[A],o) : t = i[A].slick[o].apply(i[A].slick, n),
            "undefined" != typeof t)
                return t;
        return i
    }
});
