(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.Cookie = factory();
    }
}(this, function () {
    return {
        get: function(name) {
            if(typeof name !== 'string' || !name || !document.cookie) {
                return;
            }
            // RFC2109 RFC2068 RFC6265
            name = name.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
            var re = new RegExp('(?:^|;)\\s?' + name + '=(.*?)(?:;|$)','i'),
                match = document.cookie.match(re);
            return match && decodeURIComponent(match[1]);
        },
        set: function(name, value, options) {
            if(typeof name !== 'string' || !name) {
                return;
            }
            options = options || {};
            var date = options.expires, str = name + '=' + value;
            if(typeof date === 'number') {
                date = new Date();
                date.setTime(date.getTime() + options.expires);
            }
            if(date instanceof Date) {
                str += '; expires=' + date.toUTCString();
            }
            if(options.domain) {
                str += '; domain=' + options.domain;
            }
            if(options.path) {
                str += '; path=' + options.path;
            }
            if(options.secure) {
                str += '; secure'
            }

            document.cookie = str;
            return str;
        }
    }; 
}));
