import {
  chooseAddress,
  showModal,
  showToast
} from '../../utils/asyncWx.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    address: {},
    cart: {},
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart") || [];
    this.setData({
      address
    });
    this.setCart(cart);
  },
  async handleAddress() {
    const address = await chooseAddress();
    wx.setStorageSync("address", address);
  },
  handleItemChange(e) {
    const index = e.currentTarget.dataset.id;
    let {
      cart
    } = this.data;
    cart[index].checked = !cart[index].checked;
    this.setData({
      cart
    });
    this.setCart(cart)
  },
  setCart(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num
      } else {
        allChecked = false
      }
    });
    allChecked = cart.length !== 0 ? allChecked : false;
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    });
    wx.setStorageSync("cart", cart);
  },
  handleSelectAll() {
    let {
      cart,
      allChecked
    } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => {
      v.checked = allChecked
    });
    this.setCart(cart)
  },
  handleNum(e) {
    const {
      id,
      operation
    } = e.currentTarget.dataset;
    const {
      cart
    } = this.data;
    const index = id;
    if (cart[index].num == 1 && operation == -1) {
      showModal({
        content: "您是否要删除？"
      }).then(ret => {
        if (ret.confirm) {
          cart.splice(index, 1);
          this.setCart(cart)
        }
      })
    } else {
      cart[index].num += operation;
      this.setCart(cart);
    }
  },
  async handleAccount() {
    const {
      address,
      totalNum
    } = this.data;
    if (!address) {
      await showToast({
        title: "您还没有收获地址"
      });
      return
    } else if (totalNum == 0) {
      await showToast({
        title: "您还没有选择商品"
      });
      return
    } else {
      wx.navigateTo({
        url: '/pages/pay/index'
      });
    }

  }
})