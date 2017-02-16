/**
 * Created by zhang on 2017/1/7.
 */
angular.module('app.services').service('AppConfig', function() {
    // 版本信息
    this.VERSION_INFO = 'CLOSED_BETA'; // 内测版本

    this.URL_CONFIG = {
        CLOSED_BETA: {
            name: 'closed',
            server: '/'
        }
    };

    this.setUrl = function (url) {
        this.SERVER_ADDRESS = url.server;

        // 获取token
        this.GET_TOKEN = {
            method: 'GET',
            url: this.SERVER_ADDRESS + 'token/get'
        };

        // 获取产品列表
        this.GET_PRODUCT_LIST = {
            method: 'POST',
            url: this.SERVER_ADDRESS + 'product/load/list'
        };

        // 获取产品详情
        this.GET_PRODUCT_DETAIL = {
            method: 'GET',
            url: this.SERVER_ADDRESS + 'product/load/instance/{productCode}'
        };

        // 投保
        this.INSURE = {
            method: 'POST',
            url: this.SERVER_ADDRESS + 'policy/buy?channel=WEBCHAT'
        }
    };

    this.setUrl(this.URL_CONFIG[this.VERSION_INFO]);
});