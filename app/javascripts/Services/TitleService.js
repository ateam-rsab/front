define([], function () {
    var phonecatServices = angular.module('Services', ['ngResource']);
    
    return {
        KendoData: function () {
            return new kendo.data.DataSource({
                serverFiltering: true,
                data: data,
                schema: {
                    model: {
                        fields: {
                            //KdProfile: { type: 'string' },
                            //KdAgama: { type: 'string' },
                            //Agama: { type: 'string' }
                        }
                    }
                }
            });
        }

    };
});