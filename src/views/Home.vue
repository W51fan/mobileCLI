<template>
  <div>
    <div
      style="height:40px;border-bottom: 1px solid #ddd;box-shadow:0px 3px 9px rgba(0, 0, 0, 0.1);"
    >
      <img src="../assets/logolong.png" style="max-width: 70%;padding: 15px 0;">
    </div>
    <div style="padding-bottom: 40px;">
      <div style="font-weight: 900;">
        <div style="font-size:15px;padding: 10px 18px 0;text-align: left;">
          <p style="margin: 0;">亲,近期我们公司采用的“机床管家云”，</p>
          <span>这个轻量MES系统，</span>
          <span>帮助我公司实现制程数字化，</span>
          <p style="margin: 0;">他们承诺的10%效率提升，确实超额完成了，</p>
          <span>交期方面也有大幅缩短，价格也不贵。</span>
          <p>下面是这个产品的视频介绍：</p>
        </div>
        <!-- playsinline="true"  /*IOS微信浏览器支持小窗内播放*/ -->
        <!--  webkit-playsinline="true "这个属性是ios 10中设置可以让视频在小窗内播放，也就是不是全屏播放 -->
        <!-- x5-video-player-type="h5" /*启用H5播放器,是wechat安卓版特性*/ -->
        <!-- preload="auto" /*这个属性规定页面加载完成后载入视频*/  -->
        <video
          class="video"
          poster="../assets/video.png"
          playsinline="true"
          x-webkit-airplay="true" 
          x5-playsinline="true"
          webkit-playsinline="true" 
          x5-video-player-type="h5"
          
          controls
        >
          <source src="http://www.lightmes.cn/product/upload/company.mp4" type="video/mp4">
        </video>
        <ul class="l-center advantage" v-show="showDesc">
          <li>受友之托，</li>
          <li>如果您有兴趣，</li>
          <li>我愿意把这个产品引荐给您。</li>
          <li>如果您还想了解我公司的实际运行情况，</li>
          <li>我也可以开放一个内部帐号给您观察一下，</li>
          <li>不过出于保密需要，时长也只能一周。</li>
          <!-- <li>如果你想了解产品的实际运行情况，</li>
          <li>我可以帮助申请一个内部帐号给你观察体验，</li>
          <li>不过出于保密需要，时长只有一周。</li> -->
          <!-- <li>助力机床联网，把机床装进口袋，让企业轻松实现数字化管理。</li>
          <li>机床管家云推广前期每台机床只需200元即可试用</li>
          <li>我们郑重承诺，上线不成功不收费！</li>
          <li>效率提升不到10%不收费</li>-->
        </ul>
        <!-- <p class="on-desc" v-show="showDesc">成为观察员需如下两步：</p> -->
        <p class="on-desc" v-show="showDesc">成为我公司观察员需如下两步：</p>
        <div style="padding: 0 15px;display: grid;" v-show="!showDesc">
          <div
            class="infobloack1"
            style="margin-top: -10px;text-align:left;line-height:2.6;font-size:15px;display: inline-flex;"
          >
            <p class="nameinfo">已经为您开通观察员账号：</p>
            <p class="accountinfo" style="color:red;font-weight: 900;">{{mobile}}</p>
          </div>
        </div>
        <div style="padding: 0 15px;display: grid;" v-show="!showDesc">
          <div
            class="infobloack2"
            style="margin-top: -25px;text-align:left;line-height:2.6;font-size:15px;display: inline-flex;"
          >
            <p class="tobeinfo">下载APP马上查看</p>
            <p
              class="indstryinfo"
              style="color:red;padding: 0 10px;font-weight: 900;"
            >{{selectIndusty}}</p>
          </div>
        </div>
        <div style="padding: 0 15px;" v-show="!showDesc">
          <div
            class="infobloack3"
            style="margin-top: -25px;text-align:left;line-height:2.6;font-size:15px;"
          >
            <p class="stringinfo">工厂的机床状态，工单进度和效率数据</p>
          </div>
        </div>
      </div>

      <div style="padding: 0 18px;">
        <!-- <label v-show="showfirstPage" class="on-point">成为机床云管家观察员:</label> -->
        <ul>
          <li v-show="showfirstPage">
            <van-row type="flex" justify="space-between">
              <van-col span="12" style="text-align: center;">
                <van-button type="default" @click="selectfun">{{selectIndusty}}</van-button>
                <van-dialog v-model="showIndustry" :beforeClose="onSelect">
                  <van-picker
                    :columns="selectNameLists"
                    @change="onIndustryChange"
                    v-model="showSelect"
                  />
                </van-dialog>
              </van-col>
              <van-col span="12" style="text-align: center;">
                <button
                  style="width: 155px;font-size: 15px;line-height: 30px;"
                  class="on-button"
                  id="apply"
                  @click="applyFun()"
                >申请成为观察员</button>
              </van-col>
            </van-row>
          </li>
        </ul>
      </div>
      <div v-show="!showfirstPage" class="loadappImg" style="text-align: center;">
        <img src="../assets/loadapp.png" alt>
        <p style="text-align:center;font-size:15px;">如需协助可致电值班客服
          <a href="tel:18122056360">18122056360</a>
        </p>
      </div>
      <van-dialog
        v-model="show"
        title="请输入观察员信息"
        close-on-click-overlay
        show-cancel-button
        :before-close="beforeClose"
      >
        <van-field
          v-model="selectIndusty"
          label="观察对象"
          left-icon="browsing-history"
          required
          disabled
          style="font-weight: 700;"
        />
        <van-field
          v-model="username"
          label="姓名"
          placeholder="请输入姓名"
          left-icon="contact"
          required
          clearable
          style="font-weight: 700;"
        />
        <van-field
          v-model="company"
          label="公司"
          placeholder="请输入公司名称"
          left-icon="coupon"
          required
          clearable
          style="font-weight: 700;"
        />
        <van-field
          v-model="email"
          type="email"
          label="邮箱"
          placeholder="请输入邮箱"
          left-icon="description"
          clearable
          style="font-weight: 700;"
        />
        <van-field
          v-model="mobile"
          type="mobile"
          label="电话"
          placeholder="请输入电话"
          left-icon="phone"
          required
          clearable
          @blur="checkmobile"
          :error="mobileErr"
          style="font-weight: 700;"
        />
        <div v-show="showmobileErroeMsg" style="color: red;font-size: 13px;">{{mobileErroeMsg}}</div>
        <van-field
          v-model="sms"
          label="验证码"
          placeholder="短信验证码"
          left-icon="qr"
          required
          center
          clearable
          style="font-weight: 700;"
          ref="verifyInput"
        >
          <van-button
            slot="button"
            round
            size="small"
            type="primary"
            @click="getVerifyCodeFun"
            :disabled="isdisabled"
          >{{verifyText}}</van-button>
        </van-field>
        <div v-show="showErroeMsg" style="color: red;font-size: 13px;">{{smsError.text}}</div>
      </van-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    // columns: ["道具行业：刀父精工", "贴片行业：德米", "模具行业：谭氏"],
    showfirstPage: true,
    showDesc: true,
    show: false,
    username: "",
    mobile: "",
    email: "",
    company: "",
    sms: "",
    showErroeMsg: false,
    smsError: {
      text: ""
    },
    showSelect: false,
    selectNameLists: [],
    selectLists: [],
    selectIndusty: "选择要观察企业",
    businessID: "",
    verifyText: "发送验证码",
    isdisabled: false,
    mobileErr: false,
    showmobileErroeMsg: false,
    mobileErroeMsg: "",
    showIndustry: false,
    time: "",
    interval: {}
  }),
  methods: {
    applyFun: function() {
      if (this.selectIndusty == "选择要观察企业") {
        this.$toast("请先选择要观察企业");
        // this.$dialog.alert({
        //   message: "请先选择要观察行业"
        // });
        return;
      }
      let $this = this;
      $this.show = true;
    },
    getVerifyCodeFun() {
      let $this = this;
      // if(this.isdisabled){
      //   return;
      // }
      $this.$refs.verifyInput.focus()
      this.showErroeMsg = false;
      if (this.mobile == "") {
        // this.$toast("手机号码不能为空");
        this.smsError.text = "手机号码不能为空";
        this.showErroeMsg = true;
        // this.$dialog.alert({
        //   message: "手机号码不能为空"
        // });
        return;
      } else {
        var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
        if (!phoneReg.test(this.mobile)) {
          // this.$toast("请输入正确的手机号码！");
          this.smsError.text = "请输入正确的手机号码！";
          this.showErroeMsg = true;
          return;
        }
        this.mobileErr = false;
      }
      $this.time = 60;

      $this.interval && clearInterval($this.interval);
      $this.isdisabled = true;
      $this.verifyText = $this.time-- + "s";
      $this.interval = setInterval(function() {
        if ($this.time === 0) {
          clearInterval($this.interval);

          $this.verifyText = "获取验证码";
          $this.isdisabled = false;
          // $that.removeAttr("disabled");
        } else {
          // $that.html(time-- + "s");
          $this.isdisabled = true;
          $this.verifyText = $this.time-- + "s";
        }
      }, 1000);
      let param = JSON.stringify({
        phone: this.mobile
      });
      this.$http
        .post(
          "http://t.lightmes.cn/jcmes-user/app/AppUserController/getShareIdentify",
          {
            phone: this.mobile
          }
        )
        .then(res => {
          if (res.data.code == 1 || res.data.code == "-120") {
            $this.smsError.text = "发送成功！";
            $this.showErroeMsg = true;
            $this.verifyInput.focus()
            // this.$toast("发送成功！");
          } else if (res.data.code == "-121" || res.data.code == "-122") {
            // this.$toast(res.data.message);
            $this.smsError.text = res.data.message;
            $this.showErroeMsg = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    beforeClose(action, done) {
      if (action == "cancel") {
        this.time = 0;
        // clearInterval(this.interval);
        this.smsError.text = "";
        this.showErroeMsg = false;
        this.mobileErr = false;
        this.mobile = "";
        this.company = "";
        this.username = "";
        this.email = "";
        this.sms = "";
        done();
        return;
      }
      let $this = this;
      this.selectLists.forEach(item => {
        debugger;
        if (this.selectIndusty == item.name) {
          this.businessID = item.teamId;
        }
      });
      let shareId =
        window.location.search.split("?id=")[1] == undefined
          ? "38"
          : window.location.search.split("?id=")[1].split("?src=")[0];
      let type =
        window.location.search.split("?id=")[1] == undefined
          ? ""
          : window.location.search.split("?id=")[1].split("?src=")[1];
      if (this.username == "") {
        this.$toast("姓名不能为空");
        // this.$dialog.alert({
        //   message: "姓名不能为空"
        // });
        done(false);
        return;
      }
      if (this.company == "") {
        this.$toast("公司不能为空");
        // this.$dialog.alert({
        //   message: "公司不能为空"
        // });
        done(false);
        return;
      }
      if (this.mobile == "") {
        this.$toast("电话不能为空");
        // this.$dialog.alert({
        //   message: "电话不能为空"
        // });
        done(false);
        return;
      } else {
        this.checkmobile(done(false));
        // done(false);
        // return;
      }
      if (this.sms == "") {
        this.$toast("验证码不能为空");
        // this.$dialog.alert({
        //   message: "验证码不能为空"
        // });
        done(false);
        return;
      }
      var param = {
        phone: this.mobile,
        email: this.email,
        name: this.username,
        code: this.sms,
        currentTid: this.businessID,
        company: this.company,
        shareId: shareId == "" ? 38 : shareId,
        type: type
      };
      if (action === "confirm") {
        this.$http
          .post(
            "http://t.lightmes.cn/jcmes-user/app/AppUserController/saveShareUser",
            param
          )
          .then(res => {
            // console.log(res);

            if (res.data.code == 1 || res.data.code == "-121") {
              // console.log(res);
              this.showDesc = false;
              $this.showfirstPage = false;
              $this.showErroeMsg = false;
              $this.smsError.text = "";
              $this.$toast("申请成功！");
              done();
            } else if (res.data.code == "-122" || res.data.code == "-123") {
              // $this.showErroeMsg = true;
              // $this.showDesc = true;
              // $this.smsError.text = res.data.message;
              $this.$toast(res.data.message);

              // this.$dialog.alert({
              //   message: res.data.message,
              // });
            } else {
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    getIndutryfun() {
      this.$http
        .post(
          "http://t.lightmes.cn/jcmes-user/app/AppTeamRecommendController/getTeamRecommendList",
          {}
        )
        .then(res => {
          // console.log(res);
          if (res.data.code == 1000) {
            let $this = this;
            res.data.data.forEach(element => {
              $this.selectNameLists.push(element.teamName);
              $this.selectLists.push({
                name: element.teamName,
                id: element.id,
                teamId: element.teamId
              });
            });
          } else {
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectfun() {
      this.showIndustry = true;
    },
    onSelect(value, done) {
      this.showSelect = false;
      if (this.selectIndusty == "选择要观察企业") {
        this.selectIndusty = this.selectNameLists[0];
      }
      done();
    },
    onIndustryChange(picker, value, index) {
      this.selectIndusty = value;
    },
    checkmobile(done) {
      var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
      if (!phoneReg.test(this.mobile)) {
        this.mobileErr = true;
        // this.showmobileErroeMsg = true;
        // this.mobileErroeMsg = "请输入正确的手机号码！";
        this.$toast("请输入正确的手机号码！");
        // this.$dialog.alert({
        //   message: "请输入正确的手机号码！"
        // });
        if (done) {
          done;
        }
        return;
      }
    }
  },
  mounted() {
    this.getIndutryfun();
  }
};
</script>

<style>
html {
  font-family: sans-serif;
  /* 1 */
  -ms-text-size-adjust: 100%;
  /* 2 */
  -webkit-text-size-adjust: 100%;
  /* 2 */
}

* {
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}

input[type="checkbox"] {
  -webkit-appearance: checkbox;
  box-sizing: border-box;
}

input[type="radio" i] {
  -webkit-appearance: radio;
  box-sizing: border-box;
}

body {
  margin: 0;
  /* background-image: url('../assets/backgroundImg.jpg');
  background-size: 101% 130%;
  background-repeat: no-repeat; */
}

/** CSS reset **/

body,
ul,
ol,
dt,
dd,
dl,
li,
a {
  margin: 0;
  padding: 0;
}

li {
  list-style-type: none;
}

html {
  font-size: 9px;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}

.l-center {
  text-align: left;
  font-size: 14px;
  padding: 0 18px;
  font-weight: 900;
  color: black;
}

a {
  text-decoration: none;
}

a:focus,
a:active,
a:hover,
select:hover,
select:focus,
input:focus,
area:focus,
area:active,
area:hover {
  outline: 0;
}

button:active,
button:focus {
  outline: none;
}

input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  box-shadow: inset 0 0 0 1000px #fff;
  -moz-box-shadow: inset 0 0 0 1000px #fff;
  -webkit-box-shadow: inset 0 0 0 1000px #fff;
}

img {
  border-width: 0;
  max-width: 100%;
}

.nowrap {
  white-space: nowrap;
}

/* word-wrap */

.bk {
  word-wrap: break-word;
}

/* vertical-align */

.vm {
  vertical-align: middle;
}

.vtb {
  vertical-align: text-bottom;
}

.vb {
  vertical-align: bottom;
}

.vt {
  vertical-align: top;
}

/* position */

.rel {
  position: relative;
}

.abs {
  position: absolute;
}

.dn {
  display: none;
}

.di {
  display: inline;
}

.db {
  display: block;
}

.dib {
  display: inline-block;
}

.opo {
  opacity: 0;
}

.b {
  font-weight: bold;
}

/* ------------------- multiply CSS ------------------ */

.auto {
  margin-left: auto;
  margin-right: auto;
}

.fix {
  *zoom: 1;
}

.fix:after {
  display: table;
  content: "";
  clear: both;
}

html {
  -webkit-text-size-adjust: none;
  word-wrap: break-word;
}

html {
  font-size: calc(100% + 14 * (100vw - 150px) / 100);
}

@media screen and (min-width: 320px) {
  html {
    font-size: calc(104% + 14 * (100vw - 150px) / 100);
  }
}

@media screen and (min-width: 375px) {
  html {
    font-size: calc(105% + 14 * (100vw - 150px) / 100);
  }
}

@media screen and (min-width: 414px) {
  html {
    font-size: calc(108% + 14 * (100vw - 150px) / 100);
  }
}

@media screen and (min-width: 749px) {
  html {
    font-size: calc(100% + 14 * (100vw - 150px) / 100);
  }
}

@media screen and (min-width: 750px) {
  html {
    margin: 0 auto;
    background-color: #fff !important;
    font-size: 100px;
    overflow-x: hidden;
  }
}

.main {
  padding: 0.1rem 0.2rem;
}

/* body {
  padding-bottom: 0.4rem;
} */

.page-mod section + section {
  margin-top: 0.3rem;
}

section ul li + li {
  margin-top: 0.2rem;
}

.on-h1 {
  font-size: 0.28rem;
}

.on-desc {
  font-size: 14px;
  line-height: 1.6;
  text-align: left;
  padding: 0 18px;
}

.on-h3 {
  font-size: 0.24rem;
}

.on-title {
  font-size: 24px;
  text-align: center;
  margin: 0;
}

/* ul li {
  font-size: 0.16rem;
} */

body video {
  /* margin-top: 0.2rem; */
  width: 100%;
}

.getVerifyCode {
  width: 2rem;
  height: 0.54rem;
  vertical-align: top;
}

.on-point {
  font-size: 14px;
  display: inline-block;
  margin-bottom: 0.2rem;
}

.on-select {
  padding: 0.1rem 0.15rem;
  margin-right: 0.2rem;
  font-size: 0.14rem;
}

.qrcode {
  text-align: center;
}

.qrcode img {
  width: 1.6rem;
  height: 1.6rem;
}

.qrcode > * {
  text-align: center;
}

.page-mod > * {
  padding: 0 0.2rem;
}

.page-mod > header {
  padding: 0;
}

article .on-title {
  text-align: left;
}

/* .page-mod .icon {
    position: absolute;
    background-image: url(img/exit.png);
    top: .32rem;
    left: .2rem;
    width: .4rem;
    height: .4rem;
    display: block;
    background-size: 100%;
    background-repeat: no-repeat;
    cursor: pointer;
} */

.page-mod header {
  width: 100%;
  padding: 0.24rem 0;
  box-sizing: border-box;
  background-color: #fff;
  z-index: 1;
  border-bottom: 1px solid #ddd;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.1);
  -ms-box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.1);
}

.apply-dialog-content {
  padding: 0.4rem 15px;
  background-color: #fff;
  position: absolute;
  width: 100%;
  bottom: 0;
  -moz-box-shadow: 0px 4px 20px #e5e5e5;
  -webkit-box-shadow: 0px 4px 20px #e5e5e5;
  box-shadow: 0px 4px 20px #e5e5e5;
  z-index: 9;
  max-height: 9.2rem;
  overflow-y: auto;
}

.apply-shade {
  height: 100%;
  width: 100%;
  background-color: rgba(38, 40, 40, 0.4);
}

.apply-company-dialog,
.apply-dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  margin: 0 auto;
  padding: 0;
}

.apply-dialog-content .input-item + .input-item {
  margin-top: 0.15rem;
}

.apply-dialog-content .input-item .on-input.short {
  width: 1.6rem;
}

.on-button {
  background-color: #00ade5;
  outline: 0;
  border: 1px solid #00ade5;
  padding: 0.1rem 0.24rem;
  font-size: 0.14rem;
  color: #fff;
  border-radius: 3px;
}

.on-button[disabled] {
  opacity: 0.6;
}

.on-input {
  background: #fff;
  border-radius: 3px;
  color: #333;
  border: 1px solid #333;
  padding: 0.1rem 0.24rem;
  font-size: 0.14rem;
}

.page-mod .advantage {
  font-size: 0.18rem;
  font-weight: bold;
  margin-bottom: 0.4rem;
}

.page-mod .apply-dialog-content label {
  display: inline-block;
  width: 1.1rem;
}

.on-input.error {
  border: 1px solid red;
}

.van-dialog__header {
  padding: 25px;
}
.van-button--primary {
  color: #fff;
  background-color: #2f9bff !important;
  border: 1px solid #2f9bff !important;
}
.van-field__control:disabled {
  color: rgba(19, 78, 195, 0.75) !important;
}
</style>

