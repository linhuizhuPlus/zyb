/**
 * Created by zhang on 2017/1/7.
 */
angular.module('app.services').factory('SafeCookProductDetailService', function (NetworkService, AppConfig, SafeCookService) {
    return {
        /**
         * 根据产品代码获取产品详情
         * @param productCode 产品代码
         * @returns {*}
         */
        getProductDetail: function (productCode) {
            return NetworkService.httpExecute(angular.extend({
                paths: {
                    productCode: productCode
                }
            }, AppConfig.GET_PRODUCT_DETAIL)).then(function (response) {
                if (response && response.success) {
                    // 暂存所有产品信息
                    SafeCookService.setInstance(response.data);

                    return response.data;
                } else {
                    throw new Error(response && response.message);
                }
            });
        },

        /**
         * 设置选中的产品
         */
        setSelectedProduct: function (product) {
            SafeCookService.setProduct(product);
        }
    } 
});