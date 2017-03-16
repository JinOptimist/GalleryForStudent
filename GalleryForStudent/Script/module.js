
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
                .otherwise({
                    redirectTo: '/Angular/gallery'
                });

            // Uses HTLM5 history API for navigation
            $locationProvider.html5Mode(true);
        }
    ])
    .controller('GalleryController', ['$scope', 'dataCenter', function ($scope, dataCenter) {
        $scope.remove = function (index) {
            dataCenter.remove(index);
        }

        $scope.guitars = dataCenter.getAll();
    }])
    .controller('AddImgController', ['$scope', 'dataCenter', function ($scope, dataCenter) {
        $scope.img = {};

        $scope.addImg = function () {
            dataCenter.add($scope.img);
        }
    }])
    .service('dataCenter', function () {
        var guitars = [
            {
                id: 1,
                desc: "My first guiatr",
                src: "/content/img/1.jpg"
            },
            {
                id: 2,
                desc: "Cute",
                src: "/content/img/2.gif"
            },
            {
                id: 3,
                desc: "qwe",
                src: "/content/img/3.jpg"
            }
        ];

        function getAll() {
            return guitars;
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

        
    });