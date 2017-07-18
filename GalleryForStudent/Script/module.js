
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
        $scope.remove = function (url, index) {
            dataCenter.remove(url);
            $scope.guitars.splice(index, 1);
        }

        var defered = dataCenter.getAll();
        defered.then(function (response) {
            $scope.guitars = response.data;
        });
    }])
    .controller('AddImgController', ['$scope', 'dataCenter', function ($scope, dataCenter) {
        $scope.img = {};

        $scope.addImg = function () {
            dataCenter.add($scope.img.name, $scope.img.data);
            $scope.img = {};
        }
    }])
    .service('dataCenter', ['$http', function ($http) {
        return {
            getAll: getAll,
            add: add,
            remove: remove
        };

        function getAll() {
            return $http({
                url: 'http://localhost:56448/Image/GetImages'
            });
        }

        function add(fileName, data) {
            var respons = $http({
                method: 'POST',
                url: 'http://localhost:56448/Image/AddImageAjax',
                data: {
                    fileName: fileName,
                    data: data
                },
                headers: { 'Accept': 'application/json' }
            });
            return respons;
        };

        function remove(url) {
            return $http({
                method: 'POST',
                url: 'http://localhost:56448/Image/RemoveImage',
                data: {
                    url: url
                },
                headers: { 'Accept': 'application/json' }
            });
        }
    }])
    .directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }]);