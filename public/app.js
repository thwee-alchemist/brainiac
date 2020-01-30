var BrainiacApp = angular.module('BrainiacApp', []);

var BrainiacCtrl = BrainiacApp.controller('BrainiacCtrl', ['$scope', '$http', function($scope, $http){
  $scope.start = Date.now();

  $scope.graph = document.querySelector('#graph');
  $scope.edge = $scope.graph.querySelector('#edge');
  const vi = document.querySelector($scope.edge.source);
  const vj = document.querySelector($scope.edge.target);

  $scope.edgeLength = function(){
    let xi = vi.cube.position;
    let xj = vj.cube.position;
    var l = xi.distanceTo(xj);
    // report length
  }

  $scope.getSettings = function(){
    const settingNames = ['attraction', 'repulsion', 'epsilon', 'inner_distance', 'friction', 'dampening'];
    let settings = {};
    settingNames.forEach(name => {
      settings[name] = parseFloat($scope.graph.getAttribute(name.replace('_', '-')))
    })

    return settings;
  }

  $scope.echoSettings = function(){
    const i = parseFloat($scope.graph.getAttribute('data-settings-i'));
    const settings = $scope.getSettings();
    $http.post('/settings', {
      't': Date.now(),
      'i': i,
      'settings': settings
    })
  };
  
  $scope.echoSettings();

}]);
