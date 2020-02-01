const brainingApp = angular.module('brainingApp', []);

const brainingCtrl = brainingApp.controller('brainingCtrl', ['$scope', function($scope){
  $scope.io = io();

  $scope.runs = [];
  $scope.selectedRun = null;

  $scope.output = "Nothing yet..."

  $scope.net = new brain.NeuralNetwork();
  $scope.data = [];

  /*
  $scope.inputStream = new brain.TrainStream({
    neuralNetwork: $scope.net,

    floodCallback: function(){
      // $scope.io.emit('results?', $scope.selectedRun)
    },

    doneTrainingCallback: function(obj) {
      console.log(`Trained in ${obj.iterations} iterations with error: ${obj.error}`);

      $scope.output = retro({edge_length: 10, stopped: false}, $scope.net);
    }
  })
  */

  $scope.io.on('error', function(){
    $scope.inputStream.endInputs();
  })

  $scope.io.on('result', function(record){
    console.log('adding record:', record)
    /*
    $scope.inputStream.write({
      input: record.input,
      output: record.output
    });
    */
   $scope.data.push(record);

  });

  $scope.io.on('results end', function(){
    console.log('done loading results')
    // $scope.inputStream.endInputs();
    $scope.output = "training..."
    $scope.net.train($scope.data);

    $scope.output = retro({edge_length: 10, stopped: false}, $scope.net);
  })

  $scope.io.on('runs', function(docs){
    console.log('docs', docs)
    $scope.runs = docs;
    $scope.$apply();
  })

  $scope.fetch = function(){
    $scope.io.emit('results?', $scope.selectedRun);
  }

  $scope.io.emit('runs?');

  // $scope.io.emit('results?');
}])