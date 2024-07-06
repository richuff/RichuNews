"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  _easycom_uni_file_picker2();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
if (!Math) {
  _easycom_uni_file_picker();
}
const _sfc_main = {
  __name: "Add",
  setup(__props) {
    let detail = common_vendor.ref({});
    let isshowbutton = common_vendor.ref(true);
    let imageValue = common_vendor.ref([]);
    let formdata = common_vendor.reactive({
      title: "",
      author: "",
      context: ""
    });
    let imageURL = common_vendor.ref([]);
    const OnSubmit = (e) => {
      detail.value = e.detail.value;
      common_vendor.Ws.callFunction({
        name: "AddArticle",
        data: {
          detail: detail.value,
          imageURL: imageURL.value
        }
      }).then((res) => {
        common_vendor.index.showToast({
          title: "添加成功",
          icon: "success"
        });
        common_vendor.index.reLaunch({
          url: "/pages/index/index"
        });
      });
    };
    const isDisable = (obj) => {
      let bools = Object.keys(obj).some((key, value) => {
        return obj[key] == "";
      });
      return bools;
    };
    const Uploadsuccess = (e) => {
      let tempFiles = e.tempFilePaths;
      common_vendor.Ws.getTempFileURL({
        fileList: tempFiles
      }).then((res) => {
        imageURL.value = res.fileList.map((item) => item.tempFileURL);
        isshowbutton.value = true;
      });
    };
    const select = () => {
      isshowbutton.value = false;
    };
    const fail = () => {
      isshowbutton.value = true;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(formdata).title,
        b: common_vendor.o(($event) => common_vendor.unref(formdata).title = $event.detail.value),
        c: common_vendor.unref(formdata).author,
        d: common_vendor.o(($event) => common_vendor.unref(formdata).author = $event.detail.value),
        e: -1,
        f: common_vendor.unref(formdata).context,
        g: common_vendor.o(($event) => common_vendor.unref(formdata).context = $event.detail.value),
        h: common_vendor.o(Uploadsuccess),
        i: common_vendor.o(select),
        j: common_vendor.o(fail),
        k: common_vendor.o(($event) => common_vendor.isRef(imageValue) ? imageValue.value = $event : imageValue = $event),
        l: common_vendor.p({
          fileMediatype: "image",
          mode: "grid",
          modelValue: common_vendor.unref(imageValue)
        }),
        m: isDisable(common_vendor.unref(formdata)) || !common_vendor.unref(isshowbutton),
        n: common_vendor.o(OnSubmit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d85b74b4"], ["__file", "D:/MYproject/Uni-cloud/richucloudapp/pages/Add/Add.vue"]]);
wx.createPage(MiniProgramPage);
