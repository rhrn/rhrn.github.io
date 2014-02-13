var app = angular.module('app', ['ngRoute', 'ngResource', 'ngAnimate']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
    .when('/currencies', {
      controller: 'offerwallController',
      action: 'currencies'
    })
    .when('/providers', {
      controller: 'offerwallController',
      action: 'providers'
    })
    .when('/offers/:currencyId/:providerId', {
      controller: 'offerwallController',
      action: 'offers'
    })
    .otherwise({
      redirectTo: '/currencies'
    });

}]);

app.controller('offerwallController', ['$scope', '$resource', '$route', function($scope, $resource, $route) {

  /** Access-Control-Allow-Origin not allowed access
    var api = $resource('http://i.adventize.com/models/:name/');

    var currencies = api.get({name: 'currencies'});
    var providers = api.get({name: 'providers'});
    var offers = api.get({name: 'offers'});
  */

  var prepareData = function(data) {
    var object = {};
    for(var i = 0, len = data.length; i < len; i += 1) {
      object[data[i].id] = data[i];
    }
    return object;
  };

  var getDataByIds = function(ids, data) {
    var object = {}; 
    for(var i = 0, len = ids.length; i < len; i+=1) {
      object[ids[i]] = data[ids[i]];
    }
    return object;
  };

  $scope.offer = {
    provider: null,
    currency: null
  };

  $scope.show = {
    currencies: true,
    providers: false,
    offers: false
  };

  $scope.$on('$routeChangeSuccess', function(next, current) {
    if (current.$$route) {

      for(var i in $scope.show) {
        $scope.show[i] = false;
      }

      $scope.show[current.$$route.action] = true;

      switch (current.$$route.action) {
        case 'offers':
          $scope.offer.currency = $scope.currencies[current.params.currencyId];
          if (current.params.providerId) {
            $scope.offer.provider = $scope.providers[current.params.providerId];
          }
          break;
      }
    }
  });

  $scope.currencies = prepareData(currencies);
  $scope.providers = prepareData(providers);
  $scope.offers = prepareData(offers);

  $scope.getProviders = function(providers) {
    return getDataByIds(providers, $scope.providers);
  };

  $scope.getCurrencies = function(currencies) {
    return getDataByIds(currencies, $scope.currencies);
  };

  $scope.goBack = function() {
    window.history.back();
  };

}]);
