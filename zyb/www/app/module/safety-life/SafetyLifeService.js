/**
 * Created by zhang on 2017/1/8.
 */
angular.module('app.services').factory('SafetyLifeService', function () {
    var product = {}; // 选择的配置
    var insureInfo = {}; // 投保信息
    var instance = {}; // 产品的所有信息

    return {
        /**
         * 获取产品相关信息
         * @returns {*}
         */
        getInstance: function () {
            return angular.copy(instance);
        },

        /**
         * 设置产品相关信息
         * @param ins
         */
        setInstance: function (ins) {
            instance = angular.copy(ins);
        },

        /**
         * 获取选中配置
         * @returns {{}}
         */
        getProduct: function () {
            return angular.copy(product);
        },

        /**
         * 设置选中的配置
         * @param pro
         */
        setProduct: function (pro) {
            product = angular.copy(pro);
        },

        /**
         * 获取投保信息
         * @returns {{}}
         */
        getInsureInfo: function () {
            return angular.copy(insureInfo);
        },

        /**
         * 设置投保信息
         * @param info
         */
        setInsureInfo: function (info) {
            insureInfo = angular.copy(info);
        }
    }
});