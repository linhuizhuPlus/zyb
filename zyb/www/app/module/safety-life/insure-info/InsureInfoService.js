/**
 * Created by zhang on 2017/1/7.
 */
angular.module('app.services').factory('InsureInfoService', function (NetworkService, AppConfig, SafetyLifeService) {
    return {
        /**
         * 投保
         * @param policyHolder 投保人
         * @param insured 被保人
         * @param address 地址
         * @param insurancePeriod 保险期限
         * @param baseInfo 购买份额以及金额信息
         */
        insure: function (policyHolder, insured, address, insurancePeriod, baseInfo) {
            var productInfo = SafetyLifeService.getProduct(); // 获取产品信息
            var instanceInfo = SafetyLifeService.getInstance();

            // 组装投保信息
            var insureObj = {
                id: instanceInfo.id,
                name: instanceInfo.name,
                code: instanceInfo.code,
                schemeId: productInfo.schemeId,
                prodObjectData: productInfo.prodObjectData
            };

            insureObj.prodObjectData.POLICYHOLDER = policyHolder;
            insureObj.prodObjectData.INSURED = insured;
            insureObj.prodObjectData.ADDRESS = address;
            insureObj.prodObjectData.BASEINFO = baseInfo;
            insureObj.prodObjectData.INSURANCEPERIOD = insurancePeriod;
            
            // 保存投保信息
            SafetyLifeService.setInsureInfo(insureObj);
            
            return NetworkService.httpExecute(angular.extend({
                data: insureObj
            }, AppConfig.INSURE)).then(function (response) {
                if (response && response.success) {
                    return response;
                } else {
                    throw new Error(response && response.message);
                }
            });
        },

        /**
         * 获取选中的产品信息
         * @returns {*|{}}
         */
        getSelectedProduct: function () {
            return SafetyLifeService.getProduct();
        }
    }
});