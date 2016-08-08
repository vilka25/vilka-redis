var app = angular.module('vilkaApp', ['ngRoute', 'ngSanitize', 'ngAnimate']);

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: '/html/home.html',
                controller: 'homeController'
            })
            .when("/games", {
                templateUrl: '/html/sports.html',
                controller: 'gamesController'
            })
            .when("/games/:sport/:competition", {
                templateUrl: '/html/events.html',
                controller: 'gamesController'
            })
            .when("/profile", {
                templateUrl: '/html/profile.html',
                controller: 'profileController'
            })
            .when("/404", {
                templateUrl: '/html/404.html',
                controller: 'otherController'
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
]);
app.run(['$rootScope', '$timeout',
    function($rootScope, $timeout) {

    }
]);

app.controller('mainController', ['$http', '$routeParams', '$scope', '$rootScope', '$sce', 'mainService',
    function($http, $routeParams, $scope, $rootScope, $sce, mainService) {
        $rootScope.pageReady = false;
        $rootScope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };
        $rootScope.scrollToTop = function() {
            $('html, body').animate({ scrollTop: 0 }, 'fast');
            $('html, body').scrollTop( 300 );
        };
        $rootScope.getData = function(url, data) {
            return $http({
                method: 'POST',
                timeout: 15000,
                url: '/api/' + url,
                data : data
            })
        }
    }
]);

app.controller('homeController', ['$http', '$scope', '$rootScope',
    function($http, $scope, $rootScope) {

    }
]);

app.controller('gamesController', ['$http', '$scope', '$rootScope', '$routeParams',
    function($http, $scope, $rootScope, $routeParams) {

        $scope.sports = [];
        $scope.competitions = [];
        $scope.events = [];

        $scope.formData = {};

        $scope.formData.sport_id = $routeParams.sport;
        $scope.formData.competition_id = $routeParams.competition;

        $scope.current_sport = [];
        $scope.current_country = [];

        Array.prototype.pluck = function(key) {
            return this.map(function(object) { return object[key]; });
        };

        $scope.getSports = function() {
            $rootScope.getData("getSports", {}).success(function(sports){
                console.log(sports);
                if(sports && !sports.error && sports.length > 0) $scope.sports = sports;
                else $scope.getSports();
            });
        };
        $scope.getCompetitions = function() {
            $rootScope.getData("getCompetitions", {sport : $scope.formData.sport}).success(function(competitions){
                if(competitions && !competitions.error && competitions.data.length > 0) $scope.competitions = competitions.data;
                else $scope.getCompetitions();
            });
        };
        $scope.getEvents = function() {
            $scope.formData.sport_id = 1;
            $scope.formData.competition_id = 1;
            $rootScope.getData("getEvents", {sport_id : $scope.formData.sport_id, competition_id : $scope.formData.competition_id}).success(function(events){
                if(events && !events.error && events.length > 0) {

                    $scope.events = events;
                    console.log($scope.events)
                }
                else $scope.getEvents();
            });
        };
        
        $scope.getSports();

        $scope.selectSport = function(sport) {
            $scope.formData.sport_id = sport.sport_id;
            console.log(sport)
            $scope.current_sport = angular.copy(sport);
        };
        $scope.selectCountry = function(country) {
            console.log(country)
            $scope.current_country = angular.copy(country);
        };
        $scope.selectCompetition = function(competition) {
            $scope.formData.competition_id = competition.id;
            $scope.getEvents();
        }
    }
]);

app.controller('profileController', ['$http', '$scope', '$rootScope',
    function($http, $scope, $rootScope) {
        $rootScope.getData('services', {}).success(function(data){
            $scope.services = data.data;
            $rootScope.scrollToTop();
            $rootScope.pageReady = true;
        });
    }
]);

app.service('mainService', ['$rootScope', '$location', '$route',
    function($rootScope, $location, $route){
        return {
            init : function(routeParams) {

            }
        }
    }
]);

app.filter('orderSports', function() {
    return function(items) {
        items.sort(function(a,b){
            // Make sure we are comparing integers
            var aPos = parseInt(a.order.allListPosition);
            var bPos = parseInt(b.order.allListPosition);

            // Do our custom test
            if (aPos  > bPos ) return 1;
            if (aPos < bPos) return -1;
            return 0;
        })
    }
});
