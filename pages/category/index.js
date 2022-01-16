import {
  request
} from "../../request/index.js";
Page({
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0
  },
  cateList: [],
  onLoad: function (options) {
    const cates = wx.getStorageSync("cates");
    if (!cates) {
      this.getCates();
    } else {
      if (Date.now() - cates.time > 1000 * 10) {
        this.getCates();
      } else {
        this.cateList = cates.data;
        let leftMenuList = this.cateList.map((v) => v.cat_name);
        let rightContent = this.cateList[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  getCates() {
    request({
      url: "/categories"
    }).then(ret => {
      this.cateList = ret;
      wx.setStorageSync("cates", {
        time: Date.now(),
        data: this.cateList
      });
      let leftMenuList = this.cateList.map(v => v.cat_name);
      let rightContent = this.cateList[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  handleItemTap(e) {
    const currentIndex = e.currentTarget.dataset.index;
    let rightContent = this.cateList[currentIndex].children;
    this.setData({
      currentIndex,
      rightContent,
      scrollTop: -1
    })
  },

})