// 三套分享文案
var shareText = [
  {
    title: '时隔30年，葫芦娃再出毁童年新番！',
    desc: '不看不是90后',
    image: 'https://qnm.163.com/m/2017/dzdl/images/sns1.jpg',
  },
  {
    title: '葫芦娃：“我不管，丁三石还欠我一个女朋友！”',
    desc: '找不到媳妇都是你的错',
    image: 'https://qnm.163.com/m/2017/dzdl/images/sns1.jpg',
  },
  {
    title: '网易大楼昨夜遭七名男子打砸，丁磊情绪稳定',
    desc: '火速围观',
    image: 'https://qnm.163.com/m/2017/dzdl/images/sns2.jpg',
  },
];
var random = parseInt(Math.random() * 3, 10);

(function () {
  var _title = shareText[random].title;
  var _desc = shareText[random].desc;
  var _imgUrl = shareText[random].image;

  var _link = 'https://qnm.163.com/m/2017/dzdl/';
  var signPackage;

  wx.config({
    // debug: true,
    appId: wx_conf.appId,
    timestamp: wx_conf.timestamp,
    nonceStr: wx_conf.nonceStr,
    signature: wx_conf.signature,
    jsApiList: [
      // 所有要调用的 API 都要加到这个列表中
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'hideOptionMenu',
      'showOptionMenu',
      'closeWindow',
    ],
  });

  wx.error(function () {
    console.error('wx config error')
  })

  wx.ready(function () {

    // 在这里调用 API
    // 2. 分享接口
    // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareAppMessage({
      title: _title,
      desc: _desc,
      link: _link,
      imgUrl: _imgUrl,
      trigger: function (res) {
        //alert('用户点击发送给朋友');
      },
      success: function (res) {
      },
      cancel: function (res) {
        //alert('已取消');
      },
      fail: function (res) {
        //alert(JSON.stringify(res));
      },
    });
    // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareTimeline({
      title: _title,
      link: _link,
      imgUrl: _imgUrl,
      trigger: function (res) {
        // alert('用户点击分享到朋友圈');
      },
      success: function (res) {
      },
      cancel: function (res) {
        // alert('已取消');
      },
      fail: function (res) {
        // alert(JSON.stringify(res));
      },
    });
  }); //end of wx.ready

})();
