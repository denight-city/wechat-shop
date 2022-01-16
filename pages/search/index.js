import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    goods: [],

    isFocus: true,
    inpValue: ""
  },
  TimeId: -1,
  handleInput(e) {
    const {
      value
    } = e.detail;
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: true
      })
      return;
    }
    this.setData({
      isFocus: false
    })
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000);
  },
  async qsearch(query) {
    const res = await request({
      url: "/goods/qsearch",
      data: {
        query
      }
    });
    this.setData({
      goods: res
    })
  },
  // 点击 取消按钮
  handleCancel() {
    this.setData({
      inpValue: "",
      isFocus: true,
      goods: []
    })
  }
})