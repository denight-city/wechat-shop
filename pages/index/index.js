import {
  request
} from "../../request/index.js";
Page({
  data: {
    swiperList: [],
    navList: [],
    floorList: []
  },
  onLoad: function () {
    this.getSwiper({
      url: "/home/swiperdata"
    });
    this.getNav({
      url: "/home/catitems"
    });
    this.getFloor({
      url: "/home/floordata"
    })
  },
  getSwiper(i) {
    request(i).then(ret => {
      this.setData({
        swiperList: ret
      })
    })
  },
  getNav(i) {
    request(i).then(ret => {
      this.setData({
        navList: ret
      })
    })
  },
  getFloor(i) {
    request(i).then(ret => {
      this.setData({
        floorList: ret
      })
    })
  }
})