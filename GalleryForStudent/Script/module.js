
angular.module('gallery', ['ngRoute'])
    .config([
        '$locationProvider', '$routeProvider',
        function ($locationProvider, $routeProvider) {
            $routeProvider
                /* admin */
                .when('/Angular/gallery', {
                    templateUrl: '/views/Angular/gallery.html',
                    controller: 'GalleryController'
                })
                .when('/Angular/addImg', {
                    templateUrl: '/views/Angular/addImg.html',
                    controller: 'AddImgController'
                })
                .when('/Angular/text', {
                    templateUrl: '/views/Angular/text.html',
                    controller: 'TextController'
                })
                .otherwise({
                    redirectTo: '/Angular/gallery'
                });

            // Uses HTLM5 history API for navigation
            $locationProvider.html5Mode(true);
        }
    ])
    .controller('TextController', ['$scope', function ($scope) {
        $scope.text = "testa adsf asdf asdf asdf asdf";
        $scope.isEdit = false;

        $scope.goEdit = function () {
            $scope.isEdit = true;
        }

        $scope.applyEdit = function () {
            $scope.isEdit = false;
        }
    }])




    .controller('GalleryController', ['$scope', 'dataCenter', function ($scope, dataCenter) {
        $scope.remove = function (index) {
            dataCenter.remove(index);
        }

        dataCenter.getAll().then(function (response) {
            $scope.guitars = response.data;
        });

        var a = 123;
    }])
    .controller('AddImgController', ['$scope', 'dataCenter', function ($scope, dataCenter) {
        $scope.img = {};

        $scope.addImg = function () {
            dataCenter.add($scope.img);
        }
    }])
    .service('dataCenter', ['$http', function ($http) {
        function getAll() {
            var respons = $http({
                url: 'http://localhost:56448/Image/GetImages'
            });
            return respons;
        };

        return {
            getAll: getAll,
            add: function (newOne) {
                guitars.push(newOne);
            },
            remove: function (index) {
                guitars.splice(index, 1);
            }
        }

        
    }]);