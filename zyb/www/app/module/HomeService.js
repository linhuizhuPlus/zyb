/**
 * Created by zhang on 2017/1/8.
 */
angular.module('app.services').factory('HomeService', function (NetworkService, AppConfig) {
    return {
        /**
         * 获取产品列表
         * index 获取的页数
         */
        getProductList: function (index, rows) {
            return NetworkService.httpExecute(angular.extend({
                data: {
                    id: 'pengguiliang',
                    idType: 'USERID',
                    productType: '',
                    rows: rows,
                    index: index
                }
            }, AppConfig.GET_PRODUCT_LIST)).then(function (response) {
                if (response && response.success) {

                    return response.data.productList.data;
                } else {
                    throw new Error(response && response.message);
                }
            });
        },

        /**
         * 获取账户名称
         */
        getAccountName: function () {
            return NetworkService.httpExecute(angular.extend({
                data: {
                    id: 'test',
                    idType: 'USERID',
                    productType: '',
                    rows: 5,
                    index: index
                }
            }, AppConfig.GET_PRODUCT_LIST)).then(function (response) {
                if (response && response.success) {
                    return response.data.accountName;
                } else {
                    throw new Error('获取失败');
                }
            });
        }
    }
});