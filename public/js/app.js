var coApp = angular.module('coApp',
		[ 'ngRoute', 'coControllers', 'coServices' ]);

coApp.run(function($rootScope, $templateCache) {
	$rootScope.$on('$routeChangeStart', function(event, next, current) {

		// $templateCache.removeAll();

	});
});

coApp.config(function($routeProvider) {

	$routeProvider.when("/", {
		templateUrl : "partials/Home.html",
		controller : "HomeController",

	}).when("/customer", {
		templateUrl : "partials/AddCustomer.html",
		controller : "NewCustomerController",
		resolve : {
			newCustId : function(newCustIdS) {
				return newCustIdS;

			}

		}
	}).when("/customer/:id", {
		templateUrl : "partials/Customer.html",
		controller : "CustomerController",

	}).when("/order/:id", {
		templateUrl : "partials/Order.html",
		controller : "OrderController"
	}).otherwise({
		redirectTo : "partials/Home.html"
	});
});
