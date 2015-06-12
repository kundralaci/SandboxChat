/* global angular */
var mainModule = angular.module('main', []);

var mainController = function($scope, $http, $interval, $location, $timeout){
	$scope.name = '';
	$scope.text = '';
	$scope.cnt = -1;
	$scope.messages = [];
	
	/*
	$interval(function(){
		$http.get('/cnt').success(function(res){
			$scope.cnt = res.cnt;
		});
	},1000);
	*/
	
	/* global io */
	var socketUrl = 'http://' + $location.host()+':3001';
	var socket = io.connect(socketUrl);
	
	socket.on('cnt', function(data){
		$scope.cnt = data.cnt;
		$timeout(function(){},0);
	});
	
	socket.on('message', function(msg){
		$scope.messages.push(msg);
		$timeout(function(){},0);
	});
	
	this.makeApiCall = function(){
		$http.get('/up').success(function(res){});
	};
	
	this.sendMessage = function(){
		socket.emit('message', {name: $scope.name, text: $scope.text});
		$scope.text = '';
	};
};

mainModule.controller('mainController', mainController);