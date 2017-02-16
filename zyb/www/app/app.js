/**
 * Created by zhang on 2017/1/7.
 */
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'app.controllers', 'app.services', 'app.directives', 'app.filters'])

    .run(['$ionicPlatform', function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // if (window.cordova && window.cordova.plugins.Keyboard) {
            //     // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            //     // for form inputs)
            //     cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            //
            //     // Don't remove this line unless you know what you are doing. It stops the viewport
            //     // from snapping when text inputs are focused. Ionic handles this internally for
            //     // a much nicer keyboard experience.
            //     cordova.plugins.Keyboard.disableScroll(true);
            // }
        });
    }])
    .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
        // 默认的 timeout
        $httpProvider.defaults.timeout = 6;

        // ionicConfigProvider
        // 在 android 中依然使用 iOS style
        $ionicConfigProvider.views.transition('ios');
        $ionicConfigProvider.tabs.style('standard').position('bottom');
        $ionicConfigProvider.navBar.alignTitle('center').positionPrimaryButtons('left');

        // 不用缓存
        // $ionicConfigProvider.views.maxCache(0);
        // backbtn 取消文字
        $ionicConfigProvider.backButton.previousTitleText(false);
        $ionicConfigProvider.backButton.text('');
        $ionicConfigProvider.backButton.icon('ion-ios-arrow-back');

        // 禁止滑动返回，这是因为返回界面需要有一些前置操作
        $ionicConfigProvider.views.swipeBackEnabled(false);

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'app/module/home.html',
                controller: 'HomeController'
            })
            .state('safetyLifeProductDetail', {
                url: '/product-detail',
                templateUrl: 'app/module/gold-protect/product-detail/product-detail.html',
                controller: 'ProductDetailController'
            })
            .state('safetyLifeInsureInfo', {
                url: '/insure-info',
                templateUrl: 'app/module/safety-life/insure-info/insure-info.html',
                controller: 'InsureInfoController'
            })
            .state('safetyLifePay', {
                url: '/pay',
                templateUrl: 'app/module/safety-life/pay/pay.html',
                controller: 'PayController'
            })
            .state('goldProtectProductDetail', {
            url: '/product-detail',
            templateUrl: 'app/module/gold-protect/product-detail/product-detail.html',
            controller: 'goldProtectProductDetailController'
        })
            .state('goldProtectInsureInfo', {
                url: '/insure-info',
                templateUrl: 'app/module/gold-protect/insure-info/insure-info.html',
                controller: 'goldProtectInsureInfoController'
            })
            .state('goldProtectPay', {
                url: '/pay',
                templateUrl: 'app/module/gold-protect/pay/pay.html',
                controller: 'goldProtectPayController'
            })
            .state('SafeCookProductDetail', {
            url: '/product-detail',
            templateUrl: 'app/module/safe-cook/product-detail/product-detail.html',
            controller: 'SafeCookProductDetailController'
        })
            .state('SafeCookInsureInfo', {
                url: '/insure-info',
                templateUrl: 'app/module/safe-cook/insure-info/insure-info.html',
                controller: 'SafeCookInsureInfoController'
            })
            .state('SafeCookPay', {
                url: '/pay',
                templateUrl: 'app/module/safe-cook/pay/pay.html',
                controller: 'SafeCookPayController'
            });

        $urlRouterProvider.otherwise('/home');
    }]);

angular.module('app.controllers', []);
angular.module('app.services', []);
angular.module('app.directives', []);
angular.module('app.filters', []);
