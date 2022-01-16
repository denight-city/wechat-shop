Page({
  data: {
    tabs: [{
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      }
    ],
    chooseImgs: [],
    textVal: ""

  },
  UpLoadImgs: [],
  tabsItemChange(e) {
    const {
      index
    } = e.detail.index;
    const tabs = this.data.tabs;
    tabs.forEach((v, i) => i == index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  handleChooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {

        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    });

  },

  handleRemoveImg(e) {

    const {
      index
    } = e.currentTarget.dataset;
    let {
      chooseImgs
    } = this.data;
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    })
  },
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  handleFormSubmit() {
    const {
      textVal,
      chooseImgs
    } = this.data;
    if (!textVal.trim()) {
      // 不合法
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true
      });
      return;
    }
    wx.showLoading({
      title: "正在上传中",
      mask: true
    });

    if (chooseImgs.length != 0) {
      chooseImgs.forEach((v, i) => {
        wx.uploadFile({
          // 图片要上传到哪里
          url: 'img.coolcr.cn/index/api.html',
          // 被上传的文件的路径
          filePath: v,
          // 上传的文件的名称 后台来获取文件  file
          name: "image",
          // 顺带的文本信息
          formData: {},
          success: (result) => {
            console.log(result);
            let url = JSON.parse(result.data).url;
            this.UpLoadImgs.push(url);
            if (i === chooseImgs.length - 1) {
              wx.hideLoading();
              this.setData({
                textVal: "",
                chooseImgs: []
              })
            }
          }
        });
      })
    } else {
      wx.hideLoading();
      this.setData({
        textVal: ""
      })
    }
  }
})