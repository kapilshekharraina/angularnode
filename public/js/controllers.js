'use strict';

var coControllers = angular.module('coControllers', [ 'coServices' ]);

coControllers.controller("HomeController", function($scope, $http) {

	$http.get("http://localhost:8081/COServerHub/api", {
		params : {
			action : 'GETCLIST'
		},
		cache : false
	}).success(function(data, status, headers, config) {
		// alert(angular.toJson(data));
		$scope.customerList = data;
	});

});

coControllers.controller("headerController", function($scope) {

	$scope.showWaitImage = false;
	$scope.$on('$routeChangeStart', function() {
		$scope.showWaitImage = true;
	});
	$scope.$on('$routeChangeSuccess', function() {
		$scope.showWaitImage = false;
	});

});

coControllers.controller("CustomerController", function($scope, $http,
		$routeParams) {

	$http.get("http://localhost:8081/COServerHub/api", {
		params : {
			action : 'GETC',
			id : $routeParams.id
		},
		cache : false
	}).success(function(data, status, headers, config) {
		alert(angular.toJson(data,false));
		$scope.customer = data;
	});

});

coControllers.controller("NewCustomerController", function($scope, $http) {
	$scope.customer = {};

	// Adding a new Customer
	// alert($scope.id);
	$scope.newCustomer = {};
	$scope.savedNewCustomer = false;
	$scope.addMainCustomer = function() {

		$http({

			url : "http://localhost:8081/COServerHub/api",
			params : {
				action : 'GETID'
			},
			method : 'GET',
			cache : false

		}).success(function(data, status, headers, config) {
			// alert(angular.toJson(data));
			$scope.id = data;

			$scope.newCustomer.id = $scope.id;
			$scope.newCustomer.addresses = [];

			// alert("Saved\n" + angular.toJson($scope.newCustomer));
			$http({

				url : "http://localhost:8081/COServerHub/api",
				params : {
					action : 'SAVEC'
				},
				method : 'POST',
				data : $scope.newCustomer,
				headers : {
					"Content-Type" : "application/json"
				}

			}).success(function(data, status, headers, config) {

				$scope.savedNewCustomer = true;

			}).error(function(data, status, headers, config) {

			});
		});

	};

	// Addresses
	$scope.newAddress = {};
	$scope.addAddress = function() {

		$scope.newAddress.verified = true;
		$http({

			url : "http://localhost:8081/COServerHub/api",
			params : {
				action : 'SAVEA',
				id : $scope.newCustomer.id
			},
			method : 'POST',
			data : $scope.newAddress,
			headers : {
				"Content-Type" : "application/json"
			}

		}).success(function(data, status, headers, config) {

			$scope.savedNewCustomer = true;
			$scope.newAddress = {};
		}).error(function(data, status, headers, config) {

		});

	};
});

coControllers.controller("OrderController", function($scope, $routeParams,
		$http) {

	$scope.hasOrders = false;
	$scope.id = $routeParams.id;
	$scope.total = 0;
	$http.get("http://localhost:8081/COServerHub/api", {
		params : {
			action : 'GETO',
			id : $routeParams.id
		},
		cache : false
	}).success(function(data, status, headers, config) {

		// alert(angular.toJson(data, true));

		$scope.order = data;
		if ($scope.order['orderItems']) {
			$scope.hasOrders = true;
		}

		if ($scope.order) {

			angular.forEach($scope.order['orderItems'], function(item) {

				$scope.total += item.itemQuantity * item.item.unitPrice;

			});

		}

	});
});