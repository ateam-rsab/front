define(['WelcomeCtrl'],
  function(example) {
    describe('example', function() {
      var scope, ctrl, $httpBackend;
      var inj = inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        debugger;
        ctrl = $controller('WelcomeCtrl', {
          $scope: scope
        });
      });
      beforeEach(module('myApp'));
      beforeEach(inj);
      describe('WelcomeCtrl', function() {
        it('Check Data dalam welcome controller', function() {
          debugger;
          expect(scope.data).toBeDefined();
        });
      });

    });
  }
);