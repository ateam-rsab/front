define([], function() {
    var eventRouteState = angular.module('EventRouteState', ['ngResource']);
    eventRouteState.service('GlobalToState', function() {
        var globalToState = "";
        return {
            get: function() {
                return globalToState;
            },
            set: function(value) {
                globalToState = value;
                window.globalToState = globalToState;
            }
        }
    });

    return eventRouteState;
});