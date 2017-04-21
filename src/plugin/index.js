import Vue from 'vue'
import Axios from 'axios'
import Qs from 'qs'

Vue.prototype.Qs = Qs

//** ajax */
Vue.prototype.Ajax = Axios.create({
    method: 'post',
    responseType: 'json',
    timeout: 20000,
    baseURL: 'http://web.amyun.cn/api/commodity/'
})

//** cookie */
Vue.prototype.Cookie = {
    set: function (name, value, days) {
        var d = new Date;
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
        window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    },
    get: function (name) {
        var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    },
    delete: function (name) {
        this.set(name, '', -1);
    }
}

//** 时间格式 */
Vue.prototype.DateFormat = function (datetime, formatStr) {
    var dat = datetime;
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, dat.getFullYear());
    str = str.replace(/yy|YY/, (dat.getYear() % 100) > 9 ? (dat.getYear() % 100).toString() : '0' + (dat.getYear() % 100));
    str = str.replace(/MM/, dat.getMonth() > 9 ? (dat.getMonth() + 1).toString() : '0' + (dat.getMonth() + 1));
    str = str.replace(/M/g, (dat.getMonth() + 1));
    str = str.replace(/w|W/g, Week[dat.getDay()]);
    str = str.replace(/dd|DD/, dat.getDate() > 9 ? dat.getDate().toString() : '0' + dat.getDate());
    str = str.replace(/d|D/g, dat.getDate());
    str = str.replace(/hh|HH/, dat.getHours() > 9 ? dat.getHours().toString() : '0' + dat.getHours());
    str = str.replace(/h|H/g, dat.getHours());
    str = str.replace(/mm/, dat.getMinutes() > 9 ? dat.getMinutes().toString() : '0' + dat.getMinutes());
    str = str.replace(/m/g, dat.getMinutes());
    str = str.replace(/ss|SS/, dat.getSeconds() > 9 ? dat.getSeconds().toString() : '0' + dat.getSeconds());
    str = str.replace(/s|S/g, dat.getSeconds());
    return str
}

//** 获取字符长度 */
Vue.prototype.GetLength = function (str) {
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode > 0 && charCode <= 128) realLength += 1; else realLength += 2;
        return realLength
    }
}

//** 左侧补零 */
Vue.prototype.PadLeft = function (str, lenght) {
    if (str.toString().length >= lenght) return str; else return this.padLeft("0" + str, lenght)
}

//** 右侧补零 */
Vue.prototype.PadRight = function (str, lenght) {
    if (str.toString().length >= lenght) return str; else return this.padRight(str + "0", lenght)
}

//** 时间间隔 */
Vue.SetInterval = function (f, time, param) {
    return setInterval(function () {
        param--;
        f(param)
    }, time)
}

//** 检测微信 */
Vue.prototype.IsWeixn = function (f, time, param) {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

//** log输出 */
Vue.prototype.Log = function (str) {
    console.log('%c' + str, 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:2em;')
}

//** 正则检测 */
Vue.prototype.DataCheck = function (type, value) {
    value = value.replace(/(^\s*)|(\s*$)/g, "");
    switch (type) {
        case "required": return /[^(^\s*)|(\s*$)]/.test(value); break;
        case "chinese": return /^[\u0391-\uFFE5]+$/.test(value); break;
        case "number": return /^\d+$/.test(value); break;
        case "integer": return /^[-\+]?\d+$/.test(value); break;
        case "plusinteger": return /^[+]?\d+$/.test(value); break;
        case "double": return /^[-\+]?\d+(\.\d+)?$/.test(value); break;
        case "plusdouble": return /^[+]?\d+(\.\d+)?$/.test(value); break;
        case "english": return /^[A-Za-z]+$/.test(value); break;
        case "username": return /^[a-z]\w{3,}$/i.test(value); break;
        case "mobile": return /^(1[3|4|5|7|8])+\d{9}?$/.test(value); break;
        case "phone": return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test(value); break;
        case "tel": return /^(1[3|4|5|7|8])+\d{9}?$/.test(value) || /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test(value); break;
        case "email": return /^[^@]+@[^@]+\.[^@]+$/.test(value); break;
        case "url": return /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(value); break;
        case "ip": return /^[\d\.]{7,15}$/.test(value); break;
        case "qq": return /^[1-9]\d{4,10}$/.test(value); break;
        case "currency": return /^\d+(\.\d+)?$/.test(value); break;
        case "zip": return /^[1-9]\d{5}$/.test(value); break;
    }
}

//** 检测表单数据 */
Vue.prototype.CheckStr = function (type, value, error, success) {
    if (this.DataCheck(type, value)) { if (typeof success === 'function') success.call(); } else { if (typeof error === 'function') error.call(); }
}