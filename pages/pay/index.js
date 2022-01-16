import {
  request
} from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
import {
  requestPayment,
  showToast
} from "../../utils/asyncWx";
Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart");
    cart = cart.filter(v => v.checked);
    this.setData({
      address
    });
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },
  async handlePay() {
    try {
      const token = wx.getStorageSync("token");
      if (!token) {
        wx.navigateTo({
          url: '../../pages/auth/index'
        });
        return
      };
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address.all;
      const cart = this.data.cart;
      let goods = [];
      cart.forEach(v => {
        goods.push({
          goods_id: v.goods_id,
          goods_number: v.goods_number,
          goods_price: v.goods_price
        })
      });
      const orderParams = {
        order_price,
        consignee_addr,
        goods
      };
      const {
        order_number
      } = await request({
        url: "/my/orders/create",
        data: orderParams,
        method: "POST"
      });
      const {
        pay
      } = await request({
        url: "/my/orders/req_unifiedorder",
        method: "POST",

        data: {
          order_number
        }
      });
      await requestPayment(pay);
      const res = request({
        url: "/my/orders/chkOrder",
        header,
        method: "POST",
        data: {
          order_number
        }
      });
      await showToast({
        title: "支付成功"
      });
      const newCart = wx.getStorageSync("cart");
      newCart = newCart.filter(v => !v.checked);
      wx.setStorageSync("cart", newCart);
      wx.navigateTo({
        url: '/pages/order/index',
      });
    } catch (error) {
      await showToast({
        title: "支付失败"
      });
      console.log(error);
    }

  }
})