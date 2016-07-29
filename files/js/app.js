var app = angular.module('TwitchPostApp', ['ngRoute', 'ngSanitize', 'ngAnimate']);

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: '/templates/home.html',
                controller: 'homeController'
            })
            .when("/portfolio", {
                templateUrl: '/templates/portfolio.html',
                controller: 'portfolioController'
            })
            .when("/portfolio/:category", {
                templateUrl: '/templates/portfolio.html',
                controller: 'portfolioController'
            })
            .when("/services", {
                templateUrl: '/templates/services.html',
                controller: 'servicesController'
            })
            .when("/team", {
                templateUrl: '/templates/team.html',
                controller: 'teamController'
            })
            .when("/contact", {
                templateUrl: '/templates/contact.html',
                controller: 'contactsController'
            })
            .when("/404", {
                templateUrl: '/templates/404.html',
                controller: 'portfolioController'
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
]);
app.run(['$rootScope', '$timeout',
    function($rootScope, $timeout) {
        $rootScope.firstLoad = true;
        $rootScope.animateClass = false;
        $rootScope.direction = '';
        $rootScope.siteMap = {'/404' : 0, '/' : 1, '/portfolio' : 2, '/services' : 3, '/team' : 4, '/contact' : 5};
        $rootScope.positions = [1, 11, 161, 342, 504, 666];
        console.log(new Date())
        $rootScope.$on( "$routeChangeStart", function(event, next, previous) {
            var newRoute = next.$$route.originalPath;
            if(newRoute.indexOf('/portfolio') > -1) newRoute = '/portfolio';
            var to = $rootScope.positions[$rootScope.siteMap['' + newRoute]];
            if(to == 1) $(".footer-scroll-line").css({ display : 'none'});
            else $(".footer-scroll-line").css({ display : 'block'});
            if(previous) {
                var oldRoute = previous.$$route.originalPath;
                if(oldRoute.indexOf('/portfolio') > -1) oldRoute = '/portfolio';
                $rootScope.direction = $rootScope.siteMap['' + newRoute] > $rootScope.siteMap['' + oldRoute] ? 'nextPage' : 'prevPage';
                $( ".view" ).addClass("slide");
                setTimeout(function() {
                    var from = parseInt($('.footer-scroll-line').css("marginLeft"));
                    $('.footer-scroll-line').animate({marginLeft: '+=' + (to - from)}, 2150);
                },
                2500);
            }
            else {
                $timeout(function() {
                    $rootScope.firstLoad = false;
                }, 5000);
                $(".footer-scroll-line").css({ marginLeft : to});
            }
        });
        $rootScope.$on( "$routeChangeSuccess", function(event, current) {
            $( "p" ).removeClass( "myClass");
            $rootScope.animateClass = false;
            $rootScope.currentRoute = location.pathname;
        });

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
        $rootScope.getData('homeVideo', {}).success(function(homeVideo) {
            console.log(homeVideo);
            $scope.homeVideo = $rootScope.trustSrc(homeVideo.img);
            $rootScope.scrollToTop();
            $rootScope.pageReady = true;
        });
    }
]);

app.controller('portfolioController', ['$http', '$scope', '$rootScope', '$routeParams',
    function($http, $scope, $rootScope, $routeParams) {
        $rootScope.getData('categories', {}).success(function(categories){
            console.log($routeParams);
            function orderPortfolioData(portfolioItems) {
                console.log(portfolioItems.length, $scope.currentFilters);
                var arrays = [], _temp = angular.copy(portfolioItems);
                while (_temp.length > 0) {
                    arrays.push(_temp.splice(0, 2));
                }
                $scope.portfolioPairs = arrays;
            }
            function filterByCategory(allItems, currentFilters) {
                var tempArray = [];
                $.each(allItems, function( i, item ) {
                    var isValid = false;
                    $.each(item.categories, function( j, category ) {
                        if($.inArray(category, currentFilters) != -1) isValid = true;
                    });
                    if(isValid) tempArray.push(item);
                });
                $('.footer-scroll-line').animate({marginLeft: 161}, 1);
                $scope.tempItems = tempArray;
                orderPortfolioData(tempArray);
            }
            Array.prototype.remove = function(from, to) {
                var rest = this.slice((to || from) + 1 || this.length);
                this.length = from < 0 ? this.length + from : from;
                return this.push.apply(this, rest);
            };

            $rootScope.getData('portfolioItems', {}).success(function(portfolioItems) {
                $scope.portfolioItems = portfolioItems.data;
                orderPortfolioData($scope.portfolioItems);
                $scope.showVideoItem = false;
                $scope.tempItems = $scope.portfolioItems;
                $scope.categories = categories.data;
                $scope.filters = $.map(categories.data, function(o) { return o["name"]; });
                $scope.categoryArray = {};
                if(!$routeParams.category) {
                    $scope.allChecked = true;
                    $.each($scope.filters, function( index, value ) { $scope.categoryArray["" + value] = false; });
                    $scope.currentFilters = $.map(categories.data, function(o) { return o["name"]; });
                }
                else {
                    $scope.allChecked = false;
                    $.each($scope.filters, function( index, value ) {
                        if(value == $routeParams.category) $scope.categoryArray["" + value] = true;
                        else $scope.categoryArray["" + value] = false;
                    });
                    $scope.currentFilters = [$routeParams.category];
                }

                $scope.checkAllCategory= function() {
                    if($scope.allChecked) {
                        $scope.currentFilters = [];
                        $.each($scope.filters, function( index, value ) { $scope.categoryArray["" + value] = false; });
                    }
                    else {
                        $scope.currentFilters = $.map(categories.data, function(o) { return o["name"]; });
                        $.each($scope.filters, function( index, value ) { $scope.categoryArray["" + value] = false; });
                    }
                    filterByCategory($scope.portfolioItems, $scope.currentFilters);
                };

                $scope.checkCategory = function(category) {
                    if($scope.allChecked) {
                        $scope.allChecked = false;
                        $scope.currentFilters = [];
                        $.each($scope.filters, function( index, value ) { $scope.categoryArray["" + value] = false; });
                    }
                    var temp = $.inArray( category.name, $scope.currentFilters );
                    if(temp != -1) $scope.currentFilters.remove(temp);
                    else $scope.currentFilters.push(category.name);
                    //$scope.allChecked = $scope.currentFilters.length == $scope.filters.length;
                    filterByCategory($scope.portfolioItems, $scope.currentFilters);
                };
                $scope.openPortfolioPopUp = function(item) {
                    $scope.showVideoItem = true;
                    $scope.tempVideo = item;
                    $scope.videoIndex = $.inArray( item.link, $.map($scope.tempItems, function(o) { return o["link"]} ));
                };
                $scope.closePortfolioPopUp = function() {
                    $scope.tempVideo = {};
                    $scope.showVideoItem = false;
                };
                $scope.nextVideo = function () {
                    $scope.openPortfolioPopUp($scope.tempItems[$scope.videoIndex + 1]);
                };
                $scope.prevVideo = function () {
                    $scope.openPortfolioPopUp($scope.tempItems[$scope.videoIndex - 1]);
                };
                $rootScope.scrollToTop();
                $rootScope.pageReady = true;
            });
        });

    }
]);

app.controller('servicesController', ['$http', '$scope', '$rootScope',
    function($http, $scope, $rootScope) {
        $rootScope.getData('services', {}).success(function(data){
            $scope.services = data.data;
            $rootScope.scrollToTop();
            $rootScope.pageReady = true;
        });
    }
]);

app.controller('teamController', ['$http', '$scope', '$rootScope',
    function($http, $scope, $rootScope) {
        $rootScope.getData('team', {}).success(function(data){
            $scope.team = data.data;
            $rootScope.scrollToTop();
            $rootScope.pageReady = true;
        });
    }
]);

app.controller('contactsController', ['$http', '$scope', '$rootScope',
    function($http, $scope, $rootScope) {
        $rootScope.getData('contacts', {}).success(function(data){
            $scope.contacts = data.data;
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

app.directive('portfolioslider', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            $timeout(function() {
                if (scope.$last === true) {
                    if($(".portfolio-table").length == 0) {
                        $(".portfolio-slider").wrapInner("<table class='portfolio-table' border='0' cellspacing='0' cellspacing='0'><tr>");
                        $(".portfolio-item").wrap("<td></td>");
                    }
                    $(".portfolio-slider").mousewheel(function(event, delta) {
                        var tempScrollLeft = this.scrollLeft;
                        this.scrollLeft -= (delta * 30);
                        event.preventDefault();
                    });
                    function resizeP() {
                        var sliderHeight = $(".page-wrapper").height() - $(".page-header").height();
                        $(".portfolio-slider").height(sliderHeight+26);
                        $(".portfolio .page-content").css({top:$(".page-header").height()});
                        $(".portfolio-slider img").height(sliderHeight / 2).width(sliderHeight / 9 * 8);
                    }
                    var styleProps = {
                        "page-title" : {"font-size":"18px", "line-height":"18px", "margin-bottom":"20px", "margin-top":"40px", "padding-bottom":"0px", "padding-top":"0px"},
                        "page-header-inner" : {"margin-bottom": "27px"},
                        "checkbox-wrapper" : {"font-size": "11px",  "margin-right": "20px"},
                        "checkbox-wrapper input + label::before" : {"width": "18px", "height": "18px", "margin-right": "5px"},
                        "team-item" : {"background-position-y":"-4px"},
                        "contacts-img" : {"height": "130px"},
                        "contacts-img span" : {"margin-top": "4px", "font-size": "18px", "width": "190px"},
                        "team-title" : {"font-size":"18px", "margin-bottom": "10px", "line-height": "23px"},
                        "team-position" : {"font-size": "14px", "margin-bottom":"12px"},
                        "contacts-text" : {"font-size":"12px", "line-height": "18px", "margin-bottom": "10px"}
                    };
                    function responsiveResize() {
                        var bodyWidth = $("body").width();
                        if(bodyWidth > 1024) {
                            if(bodyWidth > 1920) {bodyWidth = 1920;}
                            var responsivePercent = bodyWidth / 1440;
                            $.each(styleProps, function(key1, value) {
                                var newStyleProps = {};
                                $.each(value, function(key2, value2) {
                                    newStyleProps[key2] = parseFloat(value2, 10) * responsivePercent + 'px';
                                });
                                $( ".portfolio ." + key1).css(newStyleProps);
                            });
                        }
                    }
                    responsiveResize();
                    resizeP();
                    $( window ).resize(function() {responsiveResize();resizeP();});

                }
            })
        }
    }
});
app.directive('secondslider', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            $timeout(function() {
                if (scope.$last === true) {
                    var owl = $('.products-slider-list');
                    owl.owlCarousel({
                        margin: 0,
                        loop: true,
                        dots: false,
                        navigation: true,
                        navigationText: [
                            "<div class=\"main-slider-arrow-left\"></div>",
                            "<div class=\"main-slider-arrow-right\"></div>"
                        ],
                        autoplay: true,
                        autoplayTimeout: 5000,
                        autoplayHoverPause: true
                    });
                }
            })
        }
    }
});
app.directive('productsimgslider', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            $timeout(function() {
                if (scope.$last === true) {
                    var owl = $('.more-views-list');
                    owl.owlCarousel({
                        margin: 0,
                        loop: true,
                        dots: false,
                        navigation: true,
                        navigationText: [
                            "<img class=\"prod-arrow-left\" src='/img/other/arrow_dark_left.png'>",
                            "<img class=\"prod-arrow-right\" src='/img/other/arrow_dark_right.png'>"
                        ],
                        autoplay: true,
                        autoplayTimeout: 5000,
                        autoplayHoverPause: true
                    });
                }
            })
        }
    }
});

app.directive('homeresize', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            $timeout(function() {
                var styleProps = {
                    "home-title" : {"font-size":"36px", "top":"250px", "width":"384px", "left":"528px"}
                };
                function responsiveResize() {
                    var bodyWidth = $("body").width();
                    if(bodyWidth > 1280) {
                        if(bodyWidth > 1920) {bodyWidth = 1920;}
                        var responsivePercent = bodyWidth / 1440;
                        $.each(styleProps, function(key1, value) {
                            var newStyleProps = {};
                            $.each(value, function(key2, value2) {
                                newStyleProps[key2] = parseFloat(value2, 10) * responsivePercent + 'px';
                            });
                            $( ".home-wrapper ." + key1).css(newStyleProps);
                        });
                    }
                }
                responsiveResize();
                $( window ).resize(function() {responsiveResize();});
            })
        }
    }
});

app.directive('servicesresize', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            $timeout(function() {
                if (scope.$last === true) {
                    var styleProps = {
                        "page-title" : {"font-size":"18px", "line-height":"18px", "margin-bottom":"20px", "margin-top":"40px", "padding-bottom":"0px", "padding-top":"0px"},
                        "services-wrapper" : {"max-width":"1255px"},
                        "services-item" : {"max-width":"243px", "margin-top":"34px", "margin-bottom":"34px", "min-height":"334px", "background-position-y":"-53px"},
                        "services-img" : {"height":"206px"},
                        "services-img img" : {"width": "62px", "height": "55px", "margin-right" : "6px", "margin-top":"89px"},
                        "services-title" : {"font-size":"18px", "margin-bottom": "10px", "line-height": "23px"},
                        "services-text" : {"font-size":"12px", "line-height": "18px"}
                    };
                    function responsiveResize() {
                        var bodyWidth = $("body").width();
                        if(bodyWidth > 1024) {
                            if(bodyWidth > 1920) {bodyWidth = 1920;}
                            var responsivePercent = bodyWidth / 1440;
                            $.each(styleProps, function(key1, value) {
                                var newStyleProps = {};
                                $.each(value, function(key2, value2) {
                                    newStyleProps[key2] = parseFloat(value2, 10) * responsivePercent + 'px';
                                });
                                $( ".services ." + key1).css(newStyleProps);
                            });
                        }
                    }
                    responsiveResize();
                    $( window ).resize(function() {responsiveResize();});
                }
            })
        }
    }
});

app.directive('teamresize', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            $timeout(function() {
                if (scope.$last === true) {
                    var styleProps = {
                        "page-title" : {"font-size":"18px", "line-height":"18px", "margin-bottom":"20px", "margin-top":"40px", "padding-bottom":"0px", "padding-top":"0px"},
                        "services-wrapper" : {"max-width":"1255px"},
                        "team-item" : {"max-width":"243px", "margin-top":"34px", "margin-bottom":"34px", "min-height":"334px", "background-position-y":"-53px"},
                        "team-img" : {"padding-top":"12px", "padding-bottom":"11px", "padding-left":"19px", "padding-right":"19px"},
                        "team-img img" : {"width": "152px", "margin-top": "30px"},
                        "team-title" : {"font-size":"18px", "margin-bottom": "10px", "line-height": "23px"},
                        "team-position" : {"font-size": "14px", "margin-bottom":"12px"},
                        "team-text" : {"font-size":"12px", "line-height": "18px"}
                    };
                    function responsiveResize() {
                        var bodyWidth = $("body").width();
                        if(bodyWidth > 1024) {
                            if(bodyWidth > 1920) {bodyWidth = 1920;}
                            var responsivePercent = bodyWidth / 1440;
                            $.each(styleProps, function(key1, value) {
                                var newStyleProps = {};
                                $.each(value, function(key2, value2) {
                                    newStyleProps[key2] = parseFloat(value2, 10) * responsivePercent + 'px';
                                });
                                $( ".team ." + key1).css(newStyleProps);
                            });
                        }
                    }
                    responsiveResize();
                    $( window ).resize(function() {responsiveResize();});
                }
            })
        }
    }
});

app.directive('contactsresize', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            $timeout(function() {
                if (scope.$last === true) {
                    var styleProps = {
                        "page-title" : {"font-size":"18px", "line-height":"18px", "margin-bottom":"20px", "margin-top":"40px", "padding-bottom":"0px", "padding-top":"0px"},
                        "services-wrapper" : {"max-width":"1255px"},
                        "team-item" : {"background-position-y":"-4px"},
                        "contacts-img" : {"height": "130px"},
                        "contacts-img span" : {"margin-top": "4px", "font-size": "18px", "width": "190px"},
                        "team-title" : {"font-size":"18px", "margin-bottom": "10px", "line-height": "23px"},
                        "team-position" : {"font-size": "14px", "margin-bottom":"12px"},
                        "contacts-text" : {"font-size":"12px", "line-height": "18px", "margin-bottom": "10px"}
                    };
                    function responsiveResize() {
                        var bodyWidth = $("body").width();
                        if(bodyWidth > 1024) {
                            if(bodyWidth > 1920) {bodyWidth = 1920;}
                            var responsivePercent = bodyWidth / 1440;
                            $.each(styleProps, function(key1, value) {
                                var newStyleProps = {};
                                $.each(value, function(key2, value2) {
                                    newStyleProps[key2] = parseFloat(value2, 10) * responsivePercent + 'px';
                                });
                                $( ".contacts ." + key1).css(newStyleProps);
                            });
                        }
                    }
                    responsiveResize();
                    $( window ).resize(function() {responsiveResize();});
                }
            })
        }
    }
});

app.directive('portfolioresize', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            $timeout(function() {
                if (scope.$last === true) {

                }
            })
        }
    }
});
