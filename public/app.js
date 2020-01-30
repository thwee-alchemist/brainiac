var BrainiacApp = angular.module('BrainiacApp', []);

var BrainiacCtrl = BrainiacApp.controller('BrainiacCtrl', ['$scope', function($scope){

  $scope.start = Date.now();

  $scope.graph = document.querySelector('#graph');
  $scope.edge = $scope.graph.querySelector('#edge');
  const vi = document.querySelector($scope.edge.source);
  const vj = document.querySelector($scope.edge.target);

  window.onerror = function(message, source, lineno, colno, error) { 
    $scope.stop = Date.now();
  }

  $scope.edgeLength = function(){
    let xi = vi.cube.position;
    let xj = vj.cube.position;
    var l = xi.distanceTo(xj);
    // report length
  }

}]);
