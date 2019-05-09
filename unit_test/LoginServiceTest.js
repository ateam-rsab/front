      
define(['LoginService'], 
  function(example) {     
      describe('example', function() {
        var q,deferred,loginService,_scope,httpBackend;
      beforeEach(module('LoginServices'));
      beforeEach(inject(function($q,LoginService,$rootScope,$httpBackend){
        httpBackend=$httpBackend;
        loginService=LoginService;
        _scope= $rootScope.$new();
        q =$q;
        deferred = q.defer();
        spyOn(LoginService,'save').andCallFake(function(callback){          
          deferred.promise.then(callback);
          return deferred.promise;
        });
        deferred.resolve({token:'asdada'});
        $rootScope.$apply();
      }));
      describe('LoginService', function(){            
          it('ketika user malakukan Login ke System',function()       {          
            expect(loginService).toBeDefined();
          });  
      });
      it('service login di panggil',function(){
        loginService.save({username:'qq',password:'qq'},function(data){
        });
        expect(deferred.promise.$$state.value.token).toBeDefined();
      })
  

    });
  }
);