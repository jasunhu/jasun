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