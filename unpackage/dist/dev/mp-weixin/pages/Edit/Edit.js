"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_file_picker2 + _easycom_uni_load_more2)();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_file_picker + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "Edit",
  setup(__props) {
    let id = common_vendor.ref("");
    let imageValue = common_vendor.ref([]);
    let detail = common_vendor.ref({});
    let isshow = common_vendor.ref(false);
    let isshowbutton = common_vendor.ref(true);
    let imageURL = common_vendor.ref([]);
    common_vendor.onLoad((e) => {
      id.value = e.id;
      common_vendor.Ws.callFunction({
        name: "getarticlebyid",
        data: {
          id: id.value
        }
      }).then((res) => {
        detail.value = res.result.data[0];
        if (!detail.value.imageURL) {
          isshow.value = true;
          return;
        }
        let URL = detail.value.imageURL.map((item) => {
          return { url: item };
        });
        imageValue.value = URL;
        isshow.value = true;
      });
    });
    const Updated = () => {
      if (!imageURL.value.length) {
        imageURL.value = imageValue.value.map((item) => item.url);
      }
      common_vendor.Ws.callFunction({
        name: "updateArticle",
        data: {
          detail: detail.value,
          imageURL: imageURL.value
        }
      }).then((res) => {
        common_vendor.index.showToast({
          title: "修改成功",
          icon: "success"
        });
        common_vendor.index.navigateBack();
      });
    };
    const select = () => {
      isshowbutton.value = false;
    };
    const Uploadsuccess = () => {
      imageURL.value = imageValue.value.map((item) => item.url);
      isshowbutton.value = true;
    };
    const fail = () => {
      isshowbutton.value = true;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isshow)
      }, common_vendor.unref(isshow) ? {
        b: common_vendor.unref(detail).title,
        c: common_vendor.o(($event) => common_vendor.unref(detail).title = $event.detail.value),
        d: common_vendor.unref(detail).author,
        e: common_vendor.o(($event) => common_vendor.unref(detail).author = $event.detail.value),
        f: -1,
        g: common_vendor.unref(detail).context,
        h: common_vendor.o(($event) => common_vendor.unref(detail).context = $event.detail.value),
        i: common_vendor.o(Uploadsuccess),
        j: common_vendor.o(select),
        k: common_vendor.o(fail),
        l: common_vendor.o(($event) => common_vendor.isRef(imageValue) ? imageValue.value = $event : imageValue = $event),
        m: common_vendor.p({
          fileMediatype: "image",
          mode: "grid",
          modelValue: common_vendor.unref(imageValue)
        }),
        n: common_vendor.o(Updated),
        o: !common_vendor.unref(isshowbutton)
      } : {
        q: common_vendor.p({
          status: "loading"
        })
      }, {
        p: common_vendor.unref(isshow)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ecc27760"], ["__file", "D:/MYproject/Uni-cloud/richucloudapp/pages/Edit/Edit.vue"]]);
wx.createPage(MiniProgramPage);
