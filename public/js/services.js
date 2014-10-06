var coServices = angular.module('coServices', []);
coServices.factory("customerListData", function($http, $q) {

	alert("making server call");
	return $http.get("http://localhost:8081/COServerHub/api", {
		params : {
			action : 'GETCLIST'
		},
		cache : false
	});

});

coServices.factory("customerDataSingle", function($http, $routeParams) {

	return $http.get("http://localhost:8081/COServerHub/api", {
		params : {
			action : 'GETC',
			id : $routeParams.id
		},
		cache : false
	});

});

coServices.factory("newCustIdS", function($http, $q) {

	var delay = $q.defer();

	$http({

		url : "http://localhost:8081/COServerHub/api",
		params : {
			action : 'GETID'
		},
		method : 'GET',
		cache : false

	}).then(function(data, status, headers, config) {

		delay.resolve(data);
		rdata = data;

	});

	return delay.promise;

});
