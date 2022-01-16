export const chooseAddress = function () {
    return new Promise((res, rej) => {
        wx.chooseAddress({
            success: (result) => {
                res(result)
            },
            fail: (err) => {
                rej(err)
            },
        });
    })
}

export const openSetting = function () {
    return new Promise((res, rej) => {
        wx.openSetting({
            success: (result) => {
                res(result)
            },
            fail: (err) => {
                rej(err)
            },
        });
    })
}

export const getSetting = function () {
    return new Promise((res, rej) => {
        wx.getSetting({
            success: (result) => {
                res(result)
            },
            fail: (err) => {
                rej(err)
            },
        });
    })
}
export const showModal = ({
    content
}) => {
    return new Promise((res, rej) => {
        wx.showModal({
            title: '提示',
            content: content,
            success: (result) => {
                res(result)
            },
            fail: (err) => {
                rej(err)
            }
        });
    })
}

export const showToast = ({
    title
}) => {
    return new Promise((res, rej) => {
        wx.showToast({
            title: title,
            icon: 'none',
            mask: true,
            success: (result) => {
                res(result)
            },
            fail: (err) => {
                rej(err)
            },

        });
    })
}

export const login = () => {
    return new Promise((res, rej) => {
        wx.login({
            timeout: 10000,
            success: (result) => {
                res(result)
            },
            fail: (err) => {
                rej(err)
            }

        })
    })
}

export const requestPayment = (pay) => {
    return new Promise((res, rej) => {
        wx.requestPayment({
            ...pay,
            success: (result) => {
                res(result)
            },
            fail: (err) => {
                rej(err)
            }
        });

    })
}