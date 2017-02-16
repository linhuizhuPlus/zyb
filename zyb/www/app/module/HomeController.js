/**
 * Created by zhang on 2017/1/7.
 */
angular.module('app.controllers').controller('HomeController', function ($scope, $state, HomeService) {
    var ROWS = 12; // 每页请求的数量

    var init = function () {
        $scope.productList = {
            index: 0, // 当前所在页数
            rows: ROWS,
            hasMoreData: true, // 是否有更多数据加载
            data: []
        };

        $scope.home = {
            currentTab: 0
        };
    };

    // 切换tab页
    $scope.changeTab = function (index) {
        $scope.home.currentTab = index;
    };

    // 刚进入页面时，由指令调用该函数加载数据
    $scope.loadMore = function () {
        // 加载下一页的数据
        HomeService.getProductList($scope.productList.index + 1, $scope.productList.rows).then(function (data) {
            $scope.productList.index++;
            $scope.productList.data = $scope.productList.data.concat(data);

            $scope.productList.hasMoreData = data.length >= $scope.productList.rows;

            $scope.$broadcast('scroll.infiniteScrollComplete');
        }).catch(function () {
            // 出错则认为没有数据可以加载
            $scope.productList.hasMoreData = false;

            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.filterProduct = function (product) {
        switch ($scope.home.currentTab) {
            case 0:
                return true;
            case 1:
                return product.cKind == '000001';
            case 2:
                return product.cKind == '000002';
            default:
                return true;
        }
    };

    // 判断是否有更多数据加载
    $scope.moreDataCanLoad = function () {
        return $scope.productList.hasMoreData;
    };

    // 跳转到产品具体页面
    $scope.goProduct = function (product) {
        if (product.cCode == '081J1') {
            $state.go('safetyLifeProductDetail');
        } else if (product.cCode == 'P000010'){
            $state.go('SafeCookProductDetail');
        }else if(product.cCode=='P000007'){
         $state.go('goldProtectProductDetail');
         }
    };
    init();
});