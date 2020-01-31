var BrainiacApp = angular.module('BrainiacApp', []);

var BrainiacCtrl = BrainiacApp.controller('BrainiacCtrl', ['$scope', '$http', function($scope, $http){
  $scope.start = Date.now();
  angular.element(document).ready(() => {
    $scope.graph = document.querySelector('graph-visualization#graph');

    $scope.graph.addEventListener('stopped', () => {
      $http.post('/results', {
        'i': i,
        'stopped': true,
        'edge_length': $scope.edgeLength(),
        'running_time': Date.now() - $scope.start
      })
      location.reload();
    });

    $scope.timeout = 500;
    setTimeout(() => {
      $http.post('/results', {
        'i': i,
        'stopped': false,
        'edge_length': $scope.edgeLength(),
        'running_time': Date.now() - $scope.start
      })
      location.reload();
    }, $scope.timeout)


    $scope.edgeLength = function(){
      const graph = document.querySelector('#graph');
      const edge = graph.querySelector('#edge');
      console.log(edge.source, edge.target)
      const vi = graph.querySelector(edge.getAttribute('source'));
      const vj = graph.querySelector(edge.getAttribute('target'));

      let xi = vi.cube.position;
      let xj = vj.cube.position;
      var l = xi.distanceTo(xj);
      return l;
    }

    $scope.getSettings = function(){
      const settingNames = ['attraction', 'repulsion', 'epsilon', 'inner_distance', 'friction', 'dampening', 'theta'];
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

    $scope.checkVals = function(){
      if(vi.cube.position === NaN || vi.cube.position === undefined
      || vj.cube.positoin === NaN || vi.cube.position === undefined){
        location.reload();
      }
    }
    
    $scope.echoSettings();
  });
}]);
