/**
 * Created by zhang on 2017/1/7.
 */
angular.module('app.services')
    .factory('AccountService', function () {
        var token = '';

        return {
            /**
             * 设置token
             * @param to
             */
            setToken: function (to) {
                token = to;
            },

            /**
             * 获取token
             * @returns {string}
             */
            getToken: function () {
                return token;
            }
        }
    })
    .service('NetworkService', function($q, $http, $ionicLoading, AccountService, AppConfig) {
        /**
         * http请求统一接口
         * @param httpConfig http请求参数配置
         * @param isTransition 在调用后台时，是否显示默认加载动画，默认为true
         * @returns {*}
         */
        this.httpExecute = function(httpConfig, isTransition) {
            if (!httpConfig) {
                return $q.reject({
                    success: false,
                    message: 'no http config',
                    code: 'NO_HTTP_CONFIG'
                });
            }

            if (!httpConfig.timeout) {
                httpConfig.timeout = 60 * 1000;
            }

            // 对path参数配置到url中
            if (httpConfig.paths) {
                angular.forEach(Object.getOwnPropertyNames(httpConfig.paths), function (property) {
                    httpConfig.url = httpConfig.url.replace('{' + property + '}', httpConfig.paths[property]);
                });
                delete httpConfig.paths;
            }

            if (isTransition) {
                $ionicLoading.show({
                    template: '<div class="http-loading"><ion-spinner></ion-spinner><span> 加载...</span></div>'
                });
            }

            return $q(function (resolve, reject) {
                if (AccountService.getToken()) {
                    httpConfig.headers = {
                        token: AccountService.getToken()
                    };

                    $http(httpConfig).then(function(result) {
                        $ionicLoading.hide();

                        resolve(result.data);
                    }).catch(function (e) {
                        $ionicLoading.hide();

                        reject(e);
                    });
                } else {
                    $http(AppConfig.GET_TOKEN).then(function (response) {
                        response = response.data;

                        if (response && response.success) {
                            AccountService.setToken(response.data);

                            httpConfig.headers = {
                                token: response.data
                            };

                            $http(httpConfig).then(function(result) {
                                $ionicLoading.hide();

                                resolve(result.data);
                            }).catch(function (e) {
                                $ionicLoading.hide();

                                reject(e);
                            });

                        } else {
                            $ionicLoading.show({
                                template: '获取token失败',
                                duration: 2000
                            });

                            reject({
                                message: '获取token失败'
                            });
                        }
                    })
                }
            });
        };
    })
    // 数据校验
    .factory('CheckService', function () {
        return {
            /**
             * 校验电话号码是否合法
             * @param phoneNumber
             * @returns {boolean}
             */
            checkPhoneNumber: function (phoneNumber) {
                if (!phoneNumber) {
                    return false;
                }
                phoneNumber = (phoneNumber + '').trim();

                var reg = /^1[358]\d{9}$/;
                return reg.test(phoneNumber);
            },

            /**
             * 校验车牌号是否合法
             * @param licensePlateNumber
             * @returns {boolean}
             */
            checkLicensePlateNumber: function (licensePlateNumber) {
                var provinceShort = '沪京苏浙粤津渝川鲁冀豫晋鄂湘皖赣闽桂辽吉黑贵陕云蒙甘青宁新琼藏';

                if (!licensePlateNumber) {
                    return false;
                }
                licensePlateNumber = licensePlateNumber.trim();

                if (provinceShort.indexOf(licensePlateNumber.charAt(0)) < 0) {
                    return false;
                }

                var reg = /^\S[A-Z][A-Z0-9]{5}$/;

                return reg.test(licensePlateNumber);
            },
            /**
             * 校验银行卡
             * @param cardNumber
             * @returns {boolean}
             */
            checkCardNumber:function(cardNumber){
                if(!cardNumber){
                    return false;
                }
                cardNumber=(cardNumber+'').trim();
                var reg=/^(\d{16}|\d{19})$/;

                return reg.test(cardNumber);
            },

            /**
             * 校验身份证是否合法
             * @param cardNo
             * @returns {boolean}
             */
            checkIDCard: function (cardNo) {
                var year, month, day, p, birthday;

                if (!cardNo) {
                    return false;
                }
                cardNo = (cardNo + '').trim().toUpperCase();

                // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
                if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(cardNo))) {
                    return false;
                }

                var cityCode = {
                    11: '北京',
                    12: '天津',
                    13: '河北',
                    14: '山西',
                    15: '内蒙古',
                    21: '辽宁',
                    22: '吉林',
                    23: '黑龙江',
                    31: '上海',
                    32: '江苏',
                    33: '浙江',
                    34: '安徽',
                    35: '福建',
                    36: '江西',
                    37: '山东',
                    41: '河南',
                    42: '湖北',
                    43: '湖南',
                    44: '广东',
                    45: '广西',
                    46: '海南',
                    50: '重庆',
                    51: '四川',
                    52: '贵州',
                    53: '云南',
                    54: '西藏',
                    61: '陕西',
                    62: '甘肃',
                    63: '青海',
                    64: '宁夏',
                    65: '新疆',
                    71: '台湾',
                    81: '香港',
                    82: '澳门',
                    91: '国外'
                };

                if (!cityCode[cardNo.substring(0, 2)]) {
                    return false;
                }

                if (15 == cardNo.length) {
                    year = cardNo.substring(6, 8);
                    month = cardNo.substring(8, 10);
                    day = cardNo.substring(10, 12);
                    p = cardNo.substring(14, 15); // 性别位
                    birthday = new Date(year, parseInt(month) - 1, day);

                    // 对于老身份证中的年龄则不需考虑千年虫问题而使用getYear()方法
                    return (birthday.getYear() == year && birthday.getMonth()+1 == month && birthday.getDate() == day);
                }

                if (18 == cardNo.length) {
                    year = cardNo.substring(6, 10);
                    month = cardNo.substring(10, 12);
                    day = cardNo.substring(12, 14);
                    birthday = new Date(year, parseInt(month) - 1, day);

                    // 这里用getFullYear()获取年份，避免千年虫问题
                    if (birthday.getFullYear() != year || birthday.getMonth()+1 != month || birthday.getDate() != day) {
                        return false;
                    }

                    var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
                    var Y = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X

                    // 验证校验位
                    var sum = 0; // 声明加权求和变量
                    var _cardNo = cardNo.split("");

                    if (_cardNo[17] == 'X') {
                        _cardNo[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
                    }
                    for (var i = 0; i < 17; i++) {
                        sum += Wi[i] * _cardNo[i]; // 加权求和
                    }
                    var index = sum % 11; // 得到验证码所位置

                    return _cardNo[17] == Y[index];
                }

                return false;
            },

            /**
             * 校验vin码
             * @param vin
             * @returns {boolean}
             */
            checkVin: function (vin) {
                // vin码中字符到数字的映射
                var alphaMapNumber = {
                    A: 1,
                    B: 2,
                    C: 3,
                    D: 4,
                    E: 5,
                    F: 6,
                    G: 7,
                    H: 8,
                    J: 1,
                    K: 2,
                    L: 3,
                    M: 4,
                    N: 5,
                    P: 7,
                    R: 9,
                    S: 2,
                    T: 3,
                    U: 4,
                    V: 5,
                    W: 6,
                    X: 7,
                    Y: 8,
                    Z: 9
                };
                // vin码中每一位的权重
                var weight = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

                // 必须是字符串
                if (typeof vin != 'string') {
                    return false;
                }

                vin = vin.trim().toUpperCase();

                // 判断位数，vin码17位
                if (vin.length != 17) {
                    return false;
                }

                // 计算校验码
                var sum = 0;
                for (var i = 0; i < vin.length; i++) {
                    var codeInt = parseInt(vin[i]);
                    if (isNaN(codeInt)) {
                        if (alphaMapNumber[vin[i]]) {
                            sum += alphaMapNumber[vin[i]] * weight[i];
                        } else {
                            return false;
                        }
                    } else {
                        sum += codeInt * weight[i];
                    }
                }

                return (vin[8] == 'X' ? 10 : vin[8]) == (sum % 11);
            },

            /**
             * 校验邮箱
             * @param email
             * @returns {boolean}
             */
            checkEmail: function (email) {
                var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

                if (typeof email !== 'string') {
                    return false;
                }

                return reg.test(email.trim())
            }
        }
    });
