(function(a, b) {
    var c = function(a, b, c, d) {
        var e = new XMLHttpRequest, f = new Promise;
        e.onreadystatechange = function() {
            e.readyState === 4 && (e.status === 200 ? f.fulfill(e.responseText) : f.reject({statusText: e.statusText,status: e.status,responseText: e.responseText}))
        }, e.open(b, a, !0);
        if (d)
            for (var g in d)
                d.hasOwnProperty(g) && e.setRequestHeader(g, d[g]);
        return e.send(c), f
    }, d = function(a) {
        var b = "", c = 0;
        for (var d in a)
            a.hasOwnProperty(d) && (c > 0 && (b += "&"), b += d + "=" + a[d], c++);
        return b
    }, e = {get: function(a) {
            return c(a, "GET")
        },put: function(a, b, d) {
            return c(a, "PUT", b, d)
        },post: function(a, b, d) {
            return c(a, "POST", b, d)
        },jsonPost: function(a, b, d) {
            return d || (d = {}), d["Content-Type"] = "application/json", c(a, "POST", JSON.stringify(b), d)
        },formPost: function(a, b, e) {
            var f = d(b);
            return e || (e = {}), e["Content-Type"] = "application/x-www-form-urlencoded", c(a, "POST", f, e)
        },delete_: function(a) {
            return c(a, "DELETE")
        },formDelete_: function(a, b, e) {
            var f = d(b);
            return e || (e = {}), e["Content-Type"] = "application/x-www-form-urlencoded", c(a, "DELETE", f, e)
        }};
    a.ajax = e
})(window)
