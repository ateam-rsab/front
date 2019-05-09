define([], function () {
    var stateService = angular.module('State', ['ngResource']);
    stateService.service('StateService', function() {
        var state = "";
        return {
            get() {
                return state;
            },
            set:function(value) {
                state = value;
            }
        }
    });

    return stateService;
});