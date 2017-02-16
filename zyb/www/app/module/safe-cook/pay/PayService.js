/**
 * Created by zhang on 2017/1/7.
 */
angular.module('app.services').factory('SafeCookPayService', function (SafeCookService) {
    return {
        /**
         * 获取投保信息
         * @returns {*}
         */
        getInsureInfo: function () {
            var insureInfo = SafeCookService.getInsureInfo();
            var product = SafeCookService.getProduct();

            insureInfo.productName = product.name; // 获取选择的产品名称

            return insureInfo;
        }
    }
});