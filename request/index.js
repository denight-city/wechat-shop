 var ajaxTime = 0;
 export const request = (params) => {
     const header = {
         ...params.header
     };
     if (params.url.includes("/my/")) {
         header["Authorization"] = wx.getStorageSync("token");
     }
     ajaxTime++;
     wx.showLoading({
         title: '加载中',
         mask: true
     });

     const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
     return new Promise((res, rej) => {
         wx.request({
             ...params,
             url: baseUrl + params.url,
             success: (result) => {
                 res(result.data.message)
             },
             fail: (err) => {
                 rej(err)
             },
             complete: () => {
                 ajaxTime--;
                 if (ajaxTime == 0) {
                     wx.hideLoading();
                 }
             }
         })
     })
 }