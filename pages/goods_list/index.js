import {
  request
} from "../../request/index.js";
Page({
  data: {
    tabs: [{
      id: 1,
      value: "综合",
      isActive: true
    }, {
      id: 2,
      value: "销量",
      isActive: false
    }, {
      id: 3,
      value: "价格",
      isActive: false
    }],
    goodsList: []
  },
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  totalPages: 1,
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoods()
  },
  getGoods() {
    request({
      url: "/goods/search",
      data: this.QueryParams
    }).then(ret => {
      const total = ret.total;
      this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
      this.setData({
        goodsList: [...this.data.goodsList, ...ret.goods]
      })
    });
    wx.stopPullDownRefresh();
  },
  tabsItemChange(e) {
    const index = e.detail.index.index;
    const tabs = this.data.tabs;
    tabs.forEach((v, i) => i == index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  onReachBottom() {
    if (this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有下一页了'
      })
    } else {
      this.QueryParams.pagenum++;
      this.getGoods
    }
  },
  onPullDownRefresh() {
    this.setData({
      goodsList: []
    });
    this.QueryParams.pagenum = 1;
    this.getGoods()
  }
})