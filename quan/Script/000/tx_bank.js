
var CookieName = "腾讯银行"
var CookieKey = "txbank"
var search = "wx_union_id="

const $ = jasun(CookieName)
let Key = "net_type=&terminal_type=iOS&appid=wx00dc2e2a59bc3a1f&uid=ozf_BuL7WIPUM6rE2y-uLkmomaBA&app_ver_code=600001&session=48_lwWYZ4Spwq5VgH_kr81f1Rmy3TH5wrH5W41sJYLM0tCm1CD8s-JSCdVqNqN0fqEu-jh-XqKWawmL-cUgsFJ8c8mlUCASInJ85Gq5pTvlVa4&machine_info=iPhone13%2C2&channel_id=ios&imei=00000000-0000-0000-0000-000000000000&wx_union_id=oNawNt2QKWtddq5hb3UWFYSRKgEA&target_type=0&h5_ver=1770&os_ver=14.6&app_ver=6.0.1&session_type=token&uid_type=weixin&device_id=43CDFEEF-B446-43A4-8DE9-F43ED569E726&param=%7B%22starting_row%22%3A0%2C%22per_return_rows%22%3A20%2C%22inquiry_field%22%3A%22APR%22%2C%22inquiry_order%22%3A1%2C%22first_inquiry_flg%22%3A%221%22%2C%22use_cache%22%3Atrue%7D&"
// "net_type=&terminal_type=iOS&appid=wx00dc2e2a59bc3a1f&uid=ozf_BuL7WIPUM6rE2y-uLkmomaBA&app_ver_code=600001&session=48_lwWYZ4Spwq5VgH_kr81f1Rmy3TH5wrH5W41sJYLM0tCm1CD8s-JSCdVqNqN0fqEu-jh-XqKWawmL-cUgsFJ8c8mlUCASInJ85Gq5pTvlVa4&machine_info=iPhone13%2C2&channel_id=ios&imei=00000000-0000-0000-0000-000000000000&wx_union_id=oNawNt2QKWtddq5hb3UWFYSRKgEA&target_type=0&h5_ver=1770&os_ver=14.6&app_ver=6.0.1&session_type=token&uid_type=weixin&device_id=43CDFEEF-B446-43A4-8DE9-F43ED569E726&param=%7B%22starting_row%22%3A0%2C%22per_return_rows%22%3A20%2C%22inquiry_field%22%3A%22APR%22%2C%22inquiry_order%22%3A1%2C%22first_inquiry_flg%22%3A%221%22%2C%22use_cache%22%3Atrue%7D&"
// "net_type=&terminal_type=iOS&appid=wx00dc2e2a59bc3a1f&uid=ozf_BuL7WIPUM6rE2y-uLkmomaBA&app_ver_code=600001&session=48_lwWYZ4Spwq5VgH_kr81f1Rmy3TH5wrH5W41sJYLM0tCm1CD8s-JSCdVqNqN0fqEu-jh-XqKWawmL-cUgsFJ8c8mlUCASInJ85Gq5pTvlVa4&machine_info=iPhone13%2C2&channel_id=ios&imei=00000000-0000-0000-0000-000000000000&wx_union_id=oNawNt2QKWtddq5hb3UWFYSRKgEA&target_type=0&h5_ver=1770&os_ver=14.6&app_ver=6.0.1&session_type=token&uid_type=weixin&device_id=43CDFEEF-B446-43A4-8DE9-F43ED569E726&param=%7B%22starting_row%22%3A0%2C%22per_return_rows%22%3A20%2C%22inquiry_field%22%3A%22APR%22%2C%22inquiry_order%22%3A1%2C%22first_inquiry_flg%22%3A%221%22%2C%22use_cache%22%3Atrue%7D&"
// let Key = $.getdata(CookieKey)
let msg = ""

// 获取cookie
if (typeof $request != "undefined") {
    $.GetCookie(search, CookieKey);
    $.done()
} else {
    (async () => {
        if (!Key) {
            $.msg(CookieName, '【提示】请先获取cookie!')
            return;
        }
        await getdata();
        await $.showmsg(msg)
    })()
        .finally(() => $.done())
}

function getdata() {
    return new Promise((resolve, reject) => {
        let url = {
            url: `https://personalv6.webank.com/hj/deposit/transfer/order_list?${Key}`,
            headers: {
                "User-Agent": ` WebankApp/202108192059 CFNetwork/1240.0.4 Darwin/20.5.0`,
                "Host": "personalv6.webank.com",
                "Accept": "application/json",
                "Content-Type": "application/json",
                "encrypt": "N",
                "Cookie": `hjToken=210901150921wv6i29KwaIRGNNVX2q; accountTypeList=%5B%7B%22ecifNo%22%3A%220999960031318579%22%2C%22product%22%3A%22RETAIL003%22%7D%2C%7B%22ecifNo%22%3A%220999960031318579%22%2C%22product%22%3A%22101163%22%7D%5D; coopOpenId=""; custom=2; dcnNo=100; encryptedUserId="{AES}G8mat9dffqgIsIRm/EhMMespJv3aoAUlqkoFE4Qe3WE="; extData=""; hjCookieSign=7258df9fb48917d36dd50cae06245ccf; module=00000001; qqOpenId=""; secOpenId=ozf_BuL7WIPUM6rE2y-uLkmomaBA; symmetricKey=true; time="Wed Sep 01 15:09:18 CST 2021"; userId=0999960031318579; userIdType=4; userType=2; webankToken=09CDF6D2D6923555C0BDFBEF39FA180465B2E66EB8EDA190816A7B3015DA11BED612F271E; wechatAccessToken=48_gusFalR4mx4WVANereklPIcPsVJQy11twYBGurtT7ECcrjDbZLcEt37UFjyrub7L3JDmVWW9xwSbDUDhphN0SABJKm0tCawijBVv5PnGeNI; wechatAppId=wx00dc2e2a59bc3a1f; wechatOpenId=ozf_BuL7WIPUM6rE2y-uLkmomaBA; wechatUnionId=oNawNt2QKWtddq5hb3UWFYSRKgEA`,
            }
        }
        $.get(url, (error, resp, data) => {
            console.log(data)
            let result = JSON.parse(data.ret_data)
            for (i = 0; i < length(result); i++) {
                if (result.buyer_benef_rate > 4.1) {
                    $.msg(CookieName, "有收益大于4.1的票据", "")
                }
                else {
                    $.msg(CookieName, "无事")
                }
            }
            resolve()
        })
    })

}
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