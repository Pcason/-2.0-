/*
΢���Ķ�
�Ķ���ڣ���������΢�Ŵ�
https://lh100-1253806495.cos.ap-beijing.myqcloud.com/index.html?carteamflg=100036&extflg=29117

�������ƣ�woniu

ץ�������ؼ��� userid ��passport   passport@userid
���˺Ż��м���
�������ı��������ץ��userid ��passport 

ÿ2Сʱˢ��һ��50ƪ����
ÿ��50ƪ ������
��ʱһСʱһ�� һ����6��
*/
const $ = new Env("��ţ�Ķ�");
const notify = $.isNode() ? require('./sendNotify') : '';
let envSplitor = ['@', '\n']
let httpResult, httpReq, httpResp
let ckName = 'woniu'
let userCookie = ($.isNode() ? process.env[ckName] : $.getdata(ckName)) || '';
let userList = []
let userIdx = 0
let userCount = 0
var msg = ''

let newurl = "https://api.shandian.shandianyueche.com/task/Task.php"
///////////////////////////////////////////////////////////////////
class UserInfo {
    constructor(str,id) {
        this.index = ++userIdx, 
        this.idx = `�˺�[${this.index}] `,
        this.ck = str//.split('#'), this.u = this.ck[0], this.t = this.ck[1]
        this.userid=id
        this.flag=false;
    }

    async getreadurl(id) {
        try {
            //�û��ύ����
            let body = {act:"userDrawReadTaskBaidu",passport:this.ck,task_id:id}
            let urlObject = popu(newurl, body,this.ck)
            await httpRequest('post', urlObject)
            let result = httpResult;
            if ( result && result.code==='0') {
                console.log(result.msg+",����id:"+result.data.user_task_id)
                await this.read(result.data.user_task_id)
            }else{
                if(result.code==='8008'){
                  console.log(result.msg)
                  this.flag= true;
                }else{
                    console.log(result.msg)
                    this.flag= true;
                }
               
              
            }
            /*
            "1" == result.info.type && 1 !== this.dx && (console.log(`���»�ȡ�ɹ� `), this.b = 1, await $.wait(1000), await this.readfinish()),
                "3" == result.info.type && 1 !== this.dx && (console.log(`�������Ķ�   ���Թ���֤`), this.x = result.info.key, this.c = result.info.url.split("/s/")[1], this.b = 2,
                    await $.wait(6000), await this.readfinish());
                    */
        } catch (e) {
            console.log(e)
        }
    }

    //�ύ����
    async read(user_task_id) {
        try {
            let t = Date.now()
       
            //�ȴ�ʱ���ύ
            await $.wait(40000)
            let body = {act:"finishUserReadTaskBaidu",passport:this.ck,user_task_id:user_task_id}
            let urlObject = popu(newurl, body,this.ck)
            await httpRequest('post', urlObject)
            let result= httpResult;
            if(result && result.code==='0'){
                   //��ȡ�û��Ķ����
                console.log('�Ķ��ɹ����+100')
            }else{
               console.log(result.meg) 
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(1);
        }
    }
    async getreadinfo() {
        try {
            let t = Date.now()
            let url = newurl;
            let body = {act:"getReadTaskListBaidu",passport:this.ck}
            let urlObject = popu(url, body,'')
            await httpRequest('post', urlObject)
            let result = httpResult;
            if(result && result.ret==='succ'){
                return result.task_list 
            }
        } catch (e) {
            console.log(e)
        }
    }

     async getmoney() {
        try {
            let t = Date.now()
            let url = newurl;
            let body = {act:"getUserMoneyAccounts",passport:this.ck}
            let urlObject = popu(url, body,this.ck)
            await httpRequest('post', urlObject)
            let result = httpResult;
            if (result && result.ret==='succ') {
                result = result.money_account
                console.log(`\n��ǰ�˺���� ${result.read_money}�� \n`)
                let money =(result.read_money/100).toPrecision(4)
                this.tixian(money)
               
                
               
            }
        } catch (e) {
            console.log(e)
        }
    }
    async tixian(money){
        try {
            let t = Date.now()
            const options = {
              method: 'POST',
              url: 'https://api.shandian.shandianyueche.com/task/Task.php',
              headers: {'content-type': 'application/x-www-form-urlencoded'},
              form: {
                 act: 'addUserMoneyCash',
                 money: money,
                 passport: this.ck,
                 type: '2',
                 cash_type: '6'
               }
            };
           
            await httpRequest('post', options)
            let result = httpResult;
            if (result && result.ret==='0') {
                console.log(result.msg)
            }else{
                  console.log("�Զ�����ʧ�����ֶ����֣�����ԭ��"+result.msg)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(1);
        }

    }


     async gettasklist() {
        try {
            let tasklist=await this.getreadinfo()
            if (tasklist && tasklist.length>0) {
                //await this.getreadurl(tasklist[0].id)
                for (let i = 0;i< tasklist.length;i++) {
                    //console.log(tasklist[i].id)
                    if(this.flag)break
                    await this.getreadurl(tasklist[i].id)
                  }
                // await this.getreadinfo()
                //await $.wait(15000)
                
            }

        } catch (e) {
            console.log(e)
        }
    }

    async task() {
        try {
            console.log(`\n=========== ${this.idx} ��ʼ�Ķ����� ===========\n`)
             for(let i=0;i<=10;i++){
                  if(!this.flag){
                    await this.gettasklist()
                 }else{
                     break
                 }
              }
              
            await this.getmoney()
            
            
            
            


            // let tasklist=await this.getreadinfo()
            // if (tasklist && tasklist.length>0) {
            //     for (let i = 0;i< tasklist.length;i++) {
            //         //console.log(tasklist[i].id)
            //         await this.getreadurl(3607)
            //     }
            //    // await this.getreadinfo()
            //     //await $.wait(15000)
                
            // }
            // await this.withdrawal()
            
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(1);
        }
    }
}


!(async () => {
    if (typeof $request !== "undefined") {
        await GetRewrite()
    } else {
        
        if (!(await checkEnv())) {
            console.log('�����������󣬼�黷����������ִ��')
            return;
        }
      
        if (userList.length > 0) {
            
            //  console.log('��ȡ��newurl��'+newurl)
             for (let user of userList) {
                await gethost(user.ck,user.userid)
                await user.task()
             }
             if (msg) await notify.sendNotify('΢���Ķ��������',msg)
        }
    }
})()
    .catch((e) => console.log(e))
    .finally(() => $.done())

///////////////////////////////////////////////////////////////////

async function gethost(ck,userid) {
    //����������
    try {
        let t = Date.now()
        let url = 'https://api.shandian.shandianyueche.com/task/Task.php';
        let body = {act:"getUserInfoByID",passport:ck,userid:userid}
        let urlObject = popugethost(url, body)
        await httpRequest('post', urlObject)
        let result = httpResult;
        if (result.ret==='succ') {
           console.log('�˺ŵ�¼�ɹ�')
         }else{
              console.log('tokenʧЧ������ץ����ȡ')
         }
    } catch (e) {
        console.log(e)
    } finally {
        return Promise.resolve(1);
    }
}

//��ȡ����������ck �ŵ�userList��ȥ
async function checkEnv() {
    if (userCookie) {
        let aa='\u6700\u65b0\u811a\u672c\u8bf7\u5728\u5fae\u4fe1\u5c0f\u7a0b\u5e8f\u641c\u7d22\u7d2b\u8776\u0061\u0070\u0070\u63a8\u5e7f\u8f93\u5165\u0031\u0038\u0038\u0038\u8bc6\u522b\u7801\u83b7\u53d6\u6700\u65b0\u4e0b\u8f7d\u94fe\u63a5\uff0c\u5176\u4ed6\u811a\u672c\u5747\u4e3a\u6807\u9898\u515a\u8bf7\u52ff\u76f8\u4fe1';
        console.log(aa)
        for(let userCookies of userCookie.split(envSplitor[1])){
            let aa=userCookies.split(envSplitor[0])
            userList.push(new UserInfo(aa[0],aa[1]))
        }
        userCount = userList.length
    } else {
       console.log(`�ҵ�[${ckName}] ���� ���ô���`) 
       return false
    }
    console.log(`�ҵ�[${ckName}] ���� ${userCount}���˺�`)
   
    return true
}

////////////////////////////////////////////////////////////////////

//��װ����ͷ
function popu(url, body = '',ck) {
    let host = url.replace('//', '/').split('/')[1]
    let urlObject = {
        url: url,
        headers:   {
            "Host": host,
            "Content-Type":"application/x-www-form-urlencoded", 
            "Origin": "http://read.imoney888.shop",   
            "User-Agent": "Mozilla/5.0 (Linux; Android 12; M2012K11AC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4425 MMWEBSDK/20221206 Mobile Safari/537.36 MMWEBID/4883 MicroMessenger/8.0.32.2300(0x2800205D) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64",
            "Accept": "*/*",
            "Referer": "http://read.imoney888.shop"
        },
        timeout: 6000,
        form:body
    }
    return urlObject;
}
function popugethost(url, body = '') {
    let host = url.replace('//', '/').split('/')[1]
    let urlObject = {
        url: url,
        headers:   {
            "Host": host,
            "Content-Type":"application/x-www-form-urlencoded", 
            "Origin": "http://read.imoney888.shop",   
            "User-Agent": "Mozilla/5.0 (Linux; Android 12; M2012K11AC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4425 MMWEBSDK/20221206 Mobile Safari/537.36 MMWEBID/4883 MicroMessenger/8.0.32.2300(0x2800205D) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64",
            "Accept": "*/*",
            "Referer": "http://read.imoney888.shop"
        },
        form: body,
        timeout: 6000,
    }
    return urlObject;
}

async function httpRequest(method, url) {
    //console.log(url)
    httpResult = null, httpReq = null, httpResp = null;
    return new Promise((resolve) => {
        $.send(method, url, async (err, req, resp) => {
            try {
                httpReq = req;
                httpResp = resp;
                if (err) {
                } else {
                    if (resp.body) {
                        if (typeof resp.body == "object") {
                            httpResult = resp.body;
                        } else {
                            try {
                                httpResult = JSON.parse(resp.body);
                            } catch (e) {
                                httpResult = resp.body;
                            }
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            } finally {
                resolve();
            }
        });
    });
}
////////////////////////////////////////////////////////////////////
function Env(a, b) {
    return "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0), new class {
        constructor(a, b) {
            this.name = a, this.notifyStr = "", this.startTime = (new Date).getTime(), Object.assign(this, b), console.log(`${this.name} ��ʼ���У�
`)
        } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } getdata(b) { let a = this.getval(b); if (/^@/.test(b)) { let [, c, f] = /^@(.*?)\.(.*?)$/.exec(b), d = c ? this.getval(c) : ""; if (d) try { let e = JSON.parse(d); a = e ? this.lodash_get(e, f, "") : a } catch (g) { a = "" } } return a } setdata(c, d) { let a = !1; if (/^@/.test(d)) { let [, b, e] = /^@(.*?)\.(.*?)$/.exec(d), f = this.getval(b), i = b ? "null" === f ? null : f || "{}" : "{}"; try { let g = JSON.parse(i); this.lodash_set(g, e, c), a = this.setval(JSON.stringify(g), b) } catch (j) { let h = {}; this.lodash_set(h, e, c), a = this.setval(JSON.stringify(h), b) } } else a = this.setval(c, d); return a } getval(a) { return this.isSurge() || this.isLoon() ? $persistentStore.read(a) : this.isQuanX() ? $prefs.valueForKey(a) : this.isNode() ? (this.data = this.loaddata(), this.data[a]) : this.data && this.data[a] || null } setval(b, a) { return this.isSurge() || this.isLoon() ? $persistentStore.write(b, a) : this.isQuanX() ? $prefs.setValueForKey(b, a) : this.isNode() ? (this.data = this.loaddata(), this.data[a] = b, this.writedata(), !0) : this.data && this.data[a] || null } send(b, a, f = () => { }) { if ("get" != b && "post" != b && "put" != b && "delete" != b) { console.log(`��Ч��http������${b}`); return } if ("get" == b && a.headers ? (delete a.headers["Content-Type"], delete a.headers["Content-Length"]) : a.body && a.headers && (a.headers["Content-Type"] || (a.headers["Content-Type"] = "application/x-www-form-urlencoded")), this.isSurge() || this.isLoon()) { this.isSurge() && this.isNeedRewrite && (a.headers = a.headers || {}, Object.assign(a.headers, { "X-Surge-Skip-Scripting": !1 })); let c = { method: b, url: a.url, headers: a.headers, timeout: a.timeout, data: a.body }; "get" == b && delete c.data, $axios(c).then(a => { let { status: b, request: c, headers: d, data: e } = a; f(null, c, { statusCode: b, headers: d, body: e }) }).catch(a => console.log(a)) } else if (this.isQuanX()) a.method = b.toUpperCase(), this.isNeedRewrite && (a.opts = a.opts || {}, Object.assign(a.opts, { hints: !1 })), $task.fetch(a).then(a => { let { statusCode: b, request: c, headers: d, body: e } = a; f(null, c, { statusCode: b, headers: d, body: e }) }, a => f(a)); else if (this.isNode()) { this.got = this.got ? this.got : require("got"); let { url: d, ...e } = a; this.instance = this.got.extend({ followRedirect: !1 }), this.instance[b](d, e).then(a => { let { statusCode: b, request: c, headers: d, body: e } = a; f(null, c, { statusCode: b, headers: d, body: e }) }, b => { let { message: c, response: a } = b; f(c, a, a && a.body) }) } } time(a) { let b = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "h+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; for (let c in /(y+)/.test(a) && (a = a.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))), b) new RegExp("(" + c + ")").test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? b[c] : ("00" + b[c]).substr(("" + b[c]).length))); return a } async showmsg() { if (!this.notifyStr) return; let a = this.name + " \u8FD0\u884C\u901A\u77E5\n\n" + this.notifyStr; if ($.isNode()) { var b = require("./sendNotify"); console.log("\n============== \u63A8\u9001 =============="), await b.sendNotify(this.name, a) } else this.msg(a) } logAndNotify(a) { console.log(a), this.notifyStr += a, this.notifyStr += "\n" } msg(d = t, a = "", b = "", e) { let f = a => { if (!a) return a; if ("string" == typeof a) return this.isLoon() ? a : this.isQuanX() ? { "open-url": a } : this.isSurge() ? { url: a } : void 0; if ("object" == typeof a) { if (this.isLoon()) { let b = a.openUrl || a.url || a["open-url"], c = a.mediaUrl || a["media-url"]; return { openUrl: b, mediaUrl: c } } if (this.isQuanX()) { let d = a["open-url"] || a.url || a.openUrl, e = a["media-url"] || a.mediaUrl; return { "open-url": d, "media-url": e } } if (this.isSurge()) return { url: a.url || a.openUrl || a["open-url"] } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(d, a, b, f(e)) : this.isQuanX() && $notify(d, a, b, f(e))); let c = ["", "============== \u7CFB\u7EDF\u901A\u77E5 =============="]; c.push(d), a && c.push(a), b && c.push(b), console.log(c.join("\n")) } getMin(a, b) { return a < b ? a : b } getMax(a, b) { return a < b ? b : a } padStr(e, b, f = "0") { let a = String(e), g = b > a.length ? b - a.length : 0, c = ""; for (let d = 0; d < g; d++)c += f; return c + a } json2str(b, e, f = !1) { let c = []; for (let d of Object.keys(b).sort()) { let a = b[d]; a && f && (a = encodeURIComponent(a)), c.push(d + "=" + a) } return c.join(e) } str2json(e, f = !1) { let d = {}; for (let a of e.split("#")) { if (!a) continue; let b = a.indexOf("="); if (-1 == b) continue; let g = a.substr(0, b), c = a.substr(b + 1); f && (c = decodeURIComponent(c)), d[g] = c } return d } randomString(d, a = "abcdef0123456789") { let b = ""; for (let c = 0; c < d; c++)b += a.charAt(Math.floor(Math.random() * a.length)); return b } randomList(a) { let b = Math.floor(Math.random() * a.length); return a[b] } wait(a) { return new Promise(b => setTimeout(b, a)) } done(a = {}) {
            let b = (new Date).getTime(), c = (b - this.startTime) / 1e3; console.log(`
${this.name} ���н������������� ${c} �룡`), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(a)
        }
    }(a, b)
}