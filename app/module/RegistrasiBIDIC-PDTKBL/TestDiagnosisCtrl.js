define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('TestDiagnosisCtrl', ['$rootScope', '$scope', 'ModelItem',
        function($rootScope, $scope, ModelItem) {
        $scope.now = new Date();
        $scope.item = {};
        $scope.dataTestDiagnosis = new kendo.data.DataSource({
                data: []
            });

            $scope.columnTestDiagnosis= [{
                "field": "No",
                "title": "No",
                "width": "50px"
            }, {
                "field": "Test",
                "title": "Test Diagnosis",
                "width": "200px"
            }, {
                "field": "Keterangan",
                "title": "Keterangan",
                "width": "100px"
            }, {
                command: { text: "Hapus", click: $scope.removeDataKomponenLengkap },
                title: "Action",
                width: "110px"
            }];


        ModelItem.get("RegistrasiBidicPDTKBL/TestDiagnosis").then(function(data) {
            $scope.item = data;
            $scope.dataVOloaded = true;
        }, function errorCallBack(err) {});

        ModelItem.getDataDummyGeneric("RegistrasiBidicPDTKBL/Tindakan/Radio", false).then(function(data) {
            $scope.ListTindakan = data;
        })
        ModelItem.getDataDummyGeneric("ContohPelayanan/RadioPenyakit", false).then(function(data) {
            $scope.ListRadioPenyakit = data;
        })
        $scope.addTestDiagnosis = function() {
                // 
                var tempDataTestDiagnosis = {
                    "No" : $scope.dataTestDiagnosis._data.length+1,
                    "Test" : $scope.item.Test,
                    "Keterangan" : $scope.item.Keterangan   
                }

                $scope.dataTestDiagnosis.add(tempDataTestDiagnosis);
                $scope.item.Test="";
                $scope.item.Keterangan=""
            }

            $scope.removeDataKomponenLengkap = function(e) {
                e.preventDefault();
 
                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                $scope.tempDataTestDiagnosis = $scope.dataTestDiagnosis
                .filter(function(el){
                    return el.name !== grid[0].name;
                });
                grid.removeRow(row);

                // var selectedItem = grid.dataItem(row);

                // $scope.dataKomponenLengkap.remove(selectedItem);

            };

        $scope.Save = function() {
            console.log(JSON.stringify($scope.item));

        };

        }
    ]);
});