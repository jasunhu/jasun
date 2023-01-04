/*
吾爱破解签到脚本

更新时间: 2020.11.11
脚本兼容: QuantumultX, Surge, Loon, Node.js
电报频道: @NobyDa
问题反馈: @NobyDa_bot

************************
QX, Surge, Loon说明：
************************
手动登录 https://www.52pojie.cn/home.php 如通知成功获取cookie, 则可以使用此签到脚本.
获取Cookie后, 请将Cookie脚本禁用并移除主机名, 以免产生不必要的MITM.
脚本将在每天上午9点执行, 您可以修改执行时间.

************************
Node.js说明: 
************************
需自行安装"got"与"tough-cookie"模块. 例: npm install got tough-cookie -g

抓取Cookie说明:
浏览器打开 https://www.52pojie.cn/home.php 登录账号后, 开启抓包软件并刷新页面.
抓取该URL请求头下的Cookie字段, 填入以下CookieWA的单引号内即可. */

/***********************
Surge 4.2.0+ 脚本配置:
************************

[Script]
吾爱签到 = type=cron,cronexp=0 9 * * *,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/52pojie-DailyBonus/52pojie.js

吾爱获取Cookie = type=http-request,pattern=https:\/\/www\.52pojie\.cn\/home\.php\?,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/52pojie-DailyBonus/52pojie.js

[MITM] 
hostname= www.52pojie.cn

************************
QuantumultX 远程脚本配置:
************************

[task_local]
# 吾爱签到
0 9 * * * https://raw.githubusercontent.com/NobyDa/Script/master/52pojie-DailyBonus/52pojie.js

[rewrite_local]
# 获取Cookie
https:\/\/www\.52pojie\.cn\/home\.php\? url script-request-header https://raw.githubusercontent.com/NobyDa/Script/master/52pojie-DailyBonus/52pojie.js

[mitm] 
hostname= www.52pojie.cn

************************
Loon 2.1.0+ 脚本配置:
************************

[Script]
# 吾爱签到
cron "0 9 * * *" script-path=https://raw.githubusercontent.com/NobyDa/Script/master/52pojie-DailyBonus/52pojie.js

# 获取Cookie
http-request https:\/\/www\.52pojie\.cn\/home\.php\? script-path=https://raw.githubusercontent.com/NobyDa/Script/master/52pojie-DailyBonus/52pojie.js

[Mitm] 
hostname= www.52pojie.cn
*/
var CookieName = "吾爱破解"
var CookieKey = "CookieWA"
var search = "www.52pojie.cn"

let cookie = "htVD_2132_saltkey=s6oU66iu; htVD_2132_lastvisit=1631019891; __gads=ID=9e6463fa5f936171-22ca57d78dcb0090:T=1631025779:RT=1631025779:S=ALNI_MbHmTk-iGy8-zfpmHcRJoKDk6bo7Q; htVD_2132_atarget=1; htVD_2132_forum_lastvisit=D_16_1631025869; htVD_2132_visitedfid=16; BAIDU_SSP_lcr=https://cn.bing.com/; Hm_lvt_46d556462595ed05e05f009cdafff31a=1631025759,1631347071; htVD_2132_seccodecSM4z=2812450.2ee0030e0a74119c19; htVD_2132_ulastactivity=1631347091%7C0; htVD_2132_auth=83d3ma5xgnXYsRUy6oiZoNSwusqVNR7CcA02%2BcaTLD9qfNZSXzlDtTAoq0cUEJz4x0NdHgsCVzSs4R5k0amP%2F9R5oW8E; htVD_2132_lastcheckfeed=1625912%7C1631347091; htVD_2132_checkfollow=1; htVD_2132_lip=218.82.160.133%2C1631347091; htVD_2132_connect_is_bind=1; htVD_2132_ttask=1625912%7C20210911; htVD_2132_seccodecS=2812488.6bf04163429beee647; htVD_2132_sid=0; htVD_2132_nofavfid=1; htVD_2132_checkpm=1; htVD_2132_noticeTitle=1; Hm_lpvt_46d556462595ed05e05f009cdafff31a=1631347084; htVD_2132_ignore_notice=1; htVD_2132_lastact=1631347099%09home.php%09spacecp"

const Cookie52 = cookie || $.getdata(CookieKey)
const date = new Date
const $ = jasun(CookieName);

if (typeof $request != "undefined") {
  $.GetCookie(search, CookieKey);
  $.done()
} else {
  checkin()
}

function checkin() {
  $.get({
    url: 'https://www.52pojie.cn/home.php?mod=task&do=apply&id=2&mobile=no',
    headers: {
      Cookie: Cookie52
    }
  },
    function (error, response, data) {
      if (error && !data) {
        $.msg("吾爱破解", "签到请求失败 ‼️‼️", error)
      } else {
        
        if (data.match(/(ÒÑÍê³É|\u606d\u559c\u60a8|��̳΢�š��ᰮ�ƽ�)/)) {
          $.msg("吾爱破解", "", date.getMonth() + 1 + "月" + date.getDate() + "日, 签到成功 🎉")
        } else if (data.match(/(ÄúÒÑ|\u4e0b\u671f\u518d\u6765|>��Ǹ������)/)) {
          $.msg("吾爱破解", "", date.getMonth() + 1 + "月" + date.getDate() + "日, 已签过 ⚠️")
        } else if (data.match(/(ÏÈµÇÂ¼|\u9700\u8981\u5148\u767b\u5f55|�Ҫ�ȵ�¼���ܼ�)/)) {
          $.msg("吾爱破解", "", "签到失败, Cookie失效 ‼️‼️")
        } else if (response.statusCode == 403) {
          $.msg("吾爱破解", "", "服务器暂停签到 ⚠️")
        } else {
          $.msg("吾爱破解", "", "脚本待更新 ‼️‼️")
        }
      }
      $.done();
    })
}

function jasun(CookieName) {
  const isSurge = typeof $httpClient != "undefined"
  const isQuanX = typeof $task != "undefined"
  const isLoon = typeof $loon != "undefined"
  const isJSBox = typeof $app != "undefined" && typeof $http != "undefined"
  const isNode = typeof require == "function" && !isJSBox;
 
  const node = (() => {
    if (isNode) {
      const request = require('request'); const fs = require("fs"); const path = require("path");
      return ({ request, fs, path })
    } else { return (null) }
  })()

  return new (class {
    done(val = {}) {
      if (isSurge || isQuanX || isLoon) { $done(val) }
    }

    setdata(value, key) {
      if (isQuanX) return $prefs.setValueForKey(value, key)
      if (isSurge) return $persistentStore.write(value, key)
      if (isNode) { this.msg('请输入cookie', "", "") }
      if (isJSBox) {
        if (!value) return $file.delete(`shared://${key}.txt`);
        return $file.write({
          data: $data({
            string: value
          }),
          path: `shared://${key}.txt`
        })
      }
    }
    getdata(key) {
      if (isQuanX) return $prefs.valueForKey(key)
      if (isSurge) return $persistentStore.read(key)
      if (isNode) { 
        this.msg('请输入cookie', "", "") 
        return null
      }
      if (isJSBox) {
        if (!$file.exists(`shared://${key}.txt`)) return null;
        return $file.read(`shared://${key}.txt`).string
      }
    }
    msgcookie(CookieKey, CookieValue) {
      if (this.getdata(CookieKey)) {
        if (this.getdata(CookieKey) != CookieValue) {
          var cookie = this.setdata(CookieValue, CookieKey);
          if (!cookie) { this.msg("", "", "更新" + CookieName + "Cookie失败 ‼️") }
          else { this.msg("", "", "更新" + CookieName + "Cookie成功 🎉") }
        } else { this.msg("", "", CookieName + "Cookie相同 ‼️") }
      } else {
        var cookie = this.setdata(CookieValue, CookieKey);
        if (!cookie) {
          this.msg("", "", "首次写入" + CookieName + "Cookie失败 ‼️")
        } else { this.msg("", "", "首次写入" + CookieName + "Cookie成功 🎉") }
      }
    }
    GetUrl(search, CookieKey) {
      try {
        if ($request && $request.method != 'OPTIONS' && $request.url.indexOf(search) > -1) {
          let index = $request.url.lastIndexOf("?")
          const CookieValue = $request.url.substring(index + 1, $request.url.length)
          this.msgcookie(CookieKey, CookieValue)
        } else { this.msg("写入Cookie失败", "", "请检查匹配URL或配置内脚本类型 ‼️") }
      } catch (eor) { this.msg("写入Cookie失败", "", "未知错误 ‼️") }
    }
    GetCookie(search, CookieKey) {
      try {
        if ($request && $request.method != 'OPTIONS' && $request.url.indexOf(search) > -1) {
          CookieValue = $request.headers['Cookie'];
          this.msgcookie(CookieKey, CookieValue)
        } else { this.msg("写入Cookie失败", "", "请检查匹配URL或配置内脚本类型 ‼️") }
      } catch (eor) { this.msg("写入Cookie失败", "", "未知错误 ‼️") }
    }
    msg(title = "", subtitle = '', message = '', rawopts) {
      const Opts = (rawopts) => {
        if (!rawopts) return rawopts
        if (typeof rawopts === 'string') {
          if (isLoon) return rawopts
          else if (isQuanX) return { 'open-url': rawopts }
          else if (isSurge) return { url: rawopts }
          else return undefined
        } else if (typeof rawopts === 'object') {
          if (isLoon) {
            let openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']
            let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
            return { openUrl, mediaUrl }
          } else if (isQuanX) {
            let openUrl = rawopts['open-url'] || rawopts.url || rawopts.openUrl
            let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl
            return { 'open-url': openUrl, 'media-url': mediaUrl }
          } else if (isSurge) {
            let openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']
            return { url: openUrl }
          }
        } else { return undefined }
      }
      console.log(`${title}\n${subtitle}\n${message}`)
      if (isQuanX) $notify(title, subtitle, message, Opts(rawopts))
      if (isSurge) $notification.post(title, subtitle, message, Opts(rawopts))
      if (isJSBox) $push.schedule({ title: title, body: subtitle ? subtitle + "\n" + message : message })
    }
    showmsg(message) { this.msg(`【${CookieName}${date.getMonth() + 1}月${date.getDate()}日签到】`, "", message) }
    adapterStatus(response) {
      if (response) {
        if (response.status) { response["statusCode"] = response.status }
        else if (response.statusCode) { response["status"] = response.statusCode }
      }
      return response
    }
    get(options, callback = () => { }) {
      options.headers['User-Agent'] = 'JD4iPhone/167169 (iPhone; iOS 13.4.1; Scale/3.00)'
      if (isQuanX) {
        if (typeof options == "string") options = {
          url: options
        }
        options["method"] = "GET"
        //options["opts"] = {
        //  "hints": false
        //}
        $task.fetch(options).then(response => {
          callback(null, this.adapterStatus(response), response.body)
        }, reason => callback(reason.error, null, null))
      }
      if (isSurge) {
        options.headers['X-Surge-Skip-Scripting'] = false
        $httpClient.get(options, (error, response, body) => {
          callback(error, this.adapterStatus(response), body)
        })
      }
      if (isNode) {
        node.request(options, (error, response, body) => {
          callback(error, this.adapterStatus(response), body)
        })
      }
      if (isJSBox) {
        if (typeof options == "string") options = {
          url: options
        }
        options["header"] = options["headers"]
        options["handler"] = function (resp) {
          let error = resp.error;
          if (error) error = JSON.stringify(resp.error)
          let body = resp.data;
          if (typeof body == "object") body = JSON.stringify(resp.data);
          callback(error, this.adapterStatus(resp.response), body)
        };
        $http.get(options);
      }
    }
    post(options, callback = () => { }) {
      options.headers['User-Agent'] = 'JD4iPhone/167169 (iPhone; iOS 13.4.1; Scale/3.00)'
      if (options.body) options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      if (isQuanX) {
        if (typeof options == "string") options = { url: options }
        options["method"] = "POST"
        //options["opts"] = {
        //  "hints": false
        //}
        $task.fetch(options).then(response => {
          callback(null, this.adapterStatus(response), response.body)
        }, reason => callback(reason.error, null, null))
      }
      if (isSurge) {
        options.headers['X-Surge-Skip-Scripting'] = false
        $httpClient.post(options, (error, response, body) => {
          callback(error, this.adapterStatus(response), body)
        })
      }
      if (isNode) {
        node.request.post(options, (error, response, body) => {
          callback(error, this.adapterStatus(response), body)
        })
      }
      if (isJSBox) {
        if (typeof options == "string") options = { url: options }
        options["header"] = options["headers"]
        options["handler"] = function (resp) {
          let error = resp.error;
          if (error) error = JSON.stringify(resp.error)
          let body = resp.data;
          if (typeof body == "object") body = JSON.stringify(resp.data)
          callback(error, this.adapterStatus(resp.response), body)
        }
        $http.post(options);
      }
    }

  })()
  
}