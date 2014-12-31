(function(a, b) {
    var c = {Pending: 1,Fulfilled: 2,Rejected: 4}, d = function(a) {
        if (!(this instanceof d))
            return new d(a);
        this._stateValue = a, this._transits = {}, this._mapTransit(c.Pending, this._pend), this._mapTransit(c.Fulfilled, this._fulfill), this._mapTransit(c.Rejected, this._reject)
    };
    d.prototype = {get: function() {
            return this._stateValue
        },transit: function(a) {
            var b = this._transits[a];
            if (b)
                return b.apply(this);
            throw new Error("can not transit to state: " + a)
        },_mapTransit: function(a, b) {
            this._transits[a] = b
        },_pend: function() {
            if (this._stateValue !== c.Pending)
                throw new Error("can not transit to pending");
            return this
        },_fulfill: function() {
            if (this._stateValue === c.Pending)
                return new d(c.Fulfilled);
            if (this._stateValue === c.Fulfilled)
                return this;
            throw new Error("can not transit to fulfilled")
        },_reject: function() {
            if (this._stateValue === c.Pending)
                return new d(c.Rejected);
            if (this._stateValue === c.Rejected)
                return this;
            throw new Error("can not transit to rejected")
        }};
    var e = function(a, b) {
        if (!(this instanceof e))
            return new e(a, b);
        this._stateHandlers = {}, this.nextPromise = new f, this._setStateHandler(c.Fulfilled, a), this._setStateHandler(c.Rejected, b)
    };
    e.prototype = {_setStateHandler: function(a, b) {
            this._stateHandlers[a] = b
        },call: function(a, b) {
            var c, d = this._stateHandlers[a];
            d && (c = d(b), this.nextPromise.fulfill(c))
        }};
    var f = function() {
        if (!(this instanceof f))
            return new f;
        this._state = new d(c.Pending), this._handlers = []
    };
    f.prototype = {_callHandlers: function(a) {
            var b = this._state.get();
            for (var c = 0; c < this._handlers.length; c++)
                this._handlers[c].call(b, a)
        },fulfill: function(a) {
            this._state = this._state.transit(c.Fulfilled), this._state.value = a, this._callHandlers(a)
        },reject: function(a) {
            this._state = this._state.transit(c.Rejected), this._state.reason = a, this._callHandlers(a)
        },then: function(a, b) {
            var c = new e(a, b);
            return this._handlers.push(c), c.nextPromise
        }}, a.Promise = f
})(window)
