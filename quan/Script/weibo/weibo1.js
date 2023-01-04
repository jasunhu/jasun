/*
更新时间: 2021-02-21 22:30

本脚本仅适用于微博每日签到，支持多账号运行  


获取ck: https:\/\/api\.weibo\.cn\/\d\/users\/show url script-request-header weibo.js
*/
var search = "gsid"
var CookieName = "微博"
var CookieKey = "sy_token_wb"


const $ = jasun(CookieName)
// let Key = "wm=3333_2001&launchid=default&b=0&from=10B8293010&c=iphone&networktype=wifi&v_p=89&skin=default&v_f=1&lang=zh_CN&sflag=1&ua=iPhone13,2__weibo__11.8.2__iphone__os14.6&ft=11&aid=01A1vYds7g7Ze_u0yG5xGu1lMveVSbQtmijG5jq0umIbdiFiw.&get_teenager=1&has_extend=1&uid=6773449490&s=0b264444&gsid=_2A25MLMYpDeRxGeBJ7FEV9CfIwjyIHXVteF7hrDV6PUJbkdAKLVbTkWpNRi3LHmndXAPpqSdyvhXA60XLTnw3odyg&has_profile=1&ul_sid=C5DF5509-625A-40B0-9985-C2A462D5B67C&ul_hid=A4EC550B-606F-4110-B0EA-C1217F841129&ul_ctime=1630126360805"
let Key = $.getdata(CookieKey);
var wbsign = ""
 

if (typeof $request != "undefined") {
    $.GetUrl(search,CookieKey);
    $.done()
} else {
    (async () => {
        if (!Key) {
            $.msg(CookieName, '【提示】请先获取新浪微博一cookie')
            return;
        }
        // await console.log(Key)
        await getsign();
        // await doCard();
        // 钱包有点问题，实际不能获得
        // await paysign();
        await $.showmsg(wbsign)
    })()
        .finally(() => $.done())
}
//微博签到

function getsign() {
    return new Promise((resolve, reject) => {
        let signurl = {
            url: `https://api.weibo.cn/2/checkin/add?${Key}`,
            headers: {
                "User-Agent": `Weibo/52021 (iPhone; iOS 14.5; Scale/3.00)`
            }
        }
        $.post(signurl, (error, resp, data) => {
            let result = JSON.parse(data)
            if (result.status == 10000) {
                wbsign += `【每日签到】✅ 已连续签到${result.data.continuous}天，收益: ${result.data.desc}💰\n`
            } else if (result.errno == 30000) {
                wbsign += `【每日签到】 🔁 已签到\n`
                // if (cookie) {
                //     getcash()
                // }
            } else if (result.status == 90005) {
                wbsign += `【每日签到】‼️` + result.msg + '\n'
            } else {
                wbsign += `【每日签到】 ❌ 签到失败 ` + result.errmsg;
                // $.msg("微博", wbsign, ``)
                // if ($.isNode()) {
                //     console.log("微博", wbsign)
                // }
            }
            resolve()
        })
    })
}

// function getcash() {
//     return new Promise((resolve, reject) => {
//         let url = {
//             url: `https://m.weibo.cn/c/checkin/getcashdetail`,
//             headers: {
//                 "User-Agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Weibo (iPhone10,2__weibo__11.2.1__iphone__os14.5)`,
//                 Cookie: cookie
//             }
//         }
//         $.get(url, async (error, resp, data) => {
//             let cashres = JSON.parse(data)
//             if (cashres.apiCode == 10000) {
//                 signcash = " " + cashres.data.header[0].title + cashres.data.header[0].value + "元"
//             }
//             resolve()
//         })
//     })
// }


// function doCard() {
//     return new Promise((resolve, reject) => {
//         let doCardurl = {
//             url: `https://api.weibo.cn/2/!/ug/king_act_home?c=iphone&${token}`,
//             headers: {
//                 "User-Agent": `Weibo/52021 (iPhone; iOS 14.5; Scale/3.00)`
//             }
//         }
//         $.get(doCardurl, (error, resp, data) => {
//             //$.log(data)
//             let result = JSON.parse(data)
//             if (result.status == 10000) {
//                 signday = result.data.signin.title.split('<')[0]
//                 docard = `【每日打卡】 ✅ ` + signday + '天 积分总计: ' + result.data.user.energy
//             } else {
//                 docard = `【每日打卡】 ❌ 活动过期或失效`
//             }
//             resolve()
//         })
//     })
// }

// 钱包签到
function paysign() {
    return new Promise((resolve, reject) => {
        $.post(payApi('aj/mobile/home/welfare/signin/do?_=' + $.startTime + 10), async (error, resp, data) => {
            // 过来是一堆乱码..只有手机能解析console.log(data)
            console.log(resp)
            let result = JSON.parse(data)
            if (result.status == 1) {
                wbsign += `【微博钱包】 ✅ 获得${result.score}分\n`
            } else if (result.status == '2') {
                wbsign += `【微博钱包】 🔁 已签到\n`
            } else {
                wbsign += `【钱包签到】❌ Cookie失效` + '\n'
            }
            resolve()
        })
    })
}

function payApi(api) {
    return {
        url: 'https://pay.sc.weibo.com/' + api,
        headers: {
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'pay.sc.weibo.com',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Weibo (iPhone10,1__weibo__11.2.1__iphone__os14.5)'
        },
        body: Key + '&lang=zh_CN&wm=3333_2001'
    }
}

// function payinfo() {
//     return new Promise((resolve, reject) => {
//         $.post(payApi('api/client/sdk/app/balance'), (error, resp, data) => {
//             let paynum = JSON.parse(data)
//             if (paynum.code == 100000) {
//                 paybag += '现金:' + paynum.data.balance + ' 元\n'
//             }
//             resolve()
//         })
//     })
// }

function jasun(CookieName) {
    const isSurge = typeof $httpClient != "undefined"
    const isQuanX = typeof $task != "undefined"
    const isLoon = typeof $loon != "undefined"
    const isJSBox = typeof $app != "undefined" && typeof $http != "undefined"
    const isNode = typeof require == "function" && !isJSBox;
    var date = new Date
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
        if (isNode) { this.msg('请输入cookie', "", "") }
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