"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    let Article = common_vendor.ref({});
    let isshow = common_vendor.ref(false);
    let id = common_vendor.ref("");
    common_vendor.onLoad((e) => {
      id.value = e.id;
    });
    common_vendor.onShow(() => {
      getarticle();
    });
    const getarticle = () => {
      common_vendor.Ws.callFunction({
        name: "getarticlebyid",
        data: {
          id: id.value
        }
      }).then((res) => {
        Article.value = res.result.data[0];
        common_vendor.index.setNavigationBarTitle({
          title: Article.value.title
        });
        isshow.value = true;
      }).catch(() => {
        common_vendor.index.showToast({
          icon: "error",
          title: "删除错误"
        });
        common_vendor.index.reLaunch({
          url: "/pages/index/index"
        });
      });
    };
    const GoEdit = () => {
      common_vendor.index.navigateTo({
        url: "/pages/Edit/Edit?id=" + id.value
      });
    };
    const getDatetime = common_vendor.computed(() => {
      let time = Article.value.posttime;
      let ntime = Date.now();
      const postdate = new Date(time);
      if (ntime - time < 6e4) {
        return "刚刚";
      } else if (ntime - time >= 6e4 && ntime - time < 36e5) {
        return Math.floor((ntime - time) / 6e4) + "分钟前";
      } else if (ntime - time >= 36e5 && ntime - time < 864e5) {
        return Math.floor((ntime - time) / 36e5) + "小时前";
      } else {
        return postdate.getFullYear() + "-" + (postdate.getMonth() + 1) + "-" + postdate.getDay();
      }
    });
    const removefunction = () => {
      common_vendor.Ws.callFunction({
        name: "removearticle",
        data: {
          id: id.value
        }
      }).then((res) => {
        common_vendor.index.showToast({
          title: "删除成功"
        });
        common_vendor.index.reLaunch({
          url: "/pages/index/index"
        });
      });
    };
    const Onremove = () => {
      common_vendor.index.showModal({
        content: "请确认是否删除!",
        success: (res) => {
          if (res.confirm) {
            removefunction();
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isshow)
      }, common_vendor.unref(isshow) ? common_vendor.e({
        b: common_vendor.t(common_vendor.unref(Article).title),
        c: common_vendor.t(common_vendor.unref(Article).author),
        d: common_vendor.t(getDatetime.value),
        e: common_vendor.t(common_vendor.unref(Article).context),
        f: common_vendor.unref(Article).imageURL
      }, common_vendor.unref(Article).imageURL ? {
        g: common_vendor.f(common_vendor.unref(Article).imageURL, (item, index, i0) => {
          return {
            a: item
          };
        })
      } : {}, {
        h: common_vendor.o(GoEdit),
        i: common_vendor.o(Onremove)
      }) : {
        k: common_vendor.p({
          status: "loading"
        })
      }, {
        j: common_vendor.unref(isshow)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/MYproject/Uni-cloud/richucloudapp/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
