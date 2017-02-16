/**
 * Created by zhang on 2017/1/7.
 */
angular.module('app.services').factory('PayService', function (SafetyLifeService) {
    return {
        /**
         * 获取投保信息
         * @returns {*}
         */
        getInsureInfo: function () {
            var insureInfo = SafetyLifeService.getInsureInfo();
            var product = SafetyLifeService.getProduct();

            insureInfo.productName = product.name; // 获取选择的产品名称

            return insureInfo;
        }
    }
});