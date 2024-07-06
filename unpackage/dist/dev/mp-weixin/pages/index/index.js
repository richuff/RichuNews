"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let listArr = common_vendor.ref([]);
    const goEdit = () => {
      common_vendor.index.navigateTo({
        url: "/pages/Add/Add"
      });
    };
    common_vendor.onReachBottom(() => {
      getData();
    });
    common_vendor.onPullDownRefresh(() => {
      listArr.value = [];
      getData();
    });
    const getData = () => {
      common_vendor.Ws.callFunction({
        name: "getArticle",
        data: {
          skip: listArr.value.length
        }
      }).then((res) => {
        listArr.value = [...listArr.value, ...res.result.data];
        common_vendor.index.stopPullDownRefresh();
      });
    };
    common_vendor.onLoad(() => {
      getData();
    });
    const getDatetime = common_vendor.computed(() => (index) => {
      let time = listArr.value[index].posttime;
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
    const goDetail = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/detail/detail?id=" + id
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(listArr), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.author),
            c: common_vendor.t(getDatetime.value(index)),
            d: item.imageURL.length
          }, item.imageURL.length ? {
            e: item.imageURL[0]
          } : {}, {
            f: common_vendor.o(($event) => goDetail(item._id), item._id),
            g: item._id
          });
        }),
        b: common_vendor.p({
          type: "plusempty",
          size: "30",
          color: "#fff"
        }),
        c: common_vendor.o(goEdit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/MYproject/Uni-cloud/richucloudapp/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
