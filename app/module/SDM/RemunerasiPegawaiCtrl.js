define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RemunerasiPegawaiCtrl', [ 'ModelItem', 'ManageSdm', '$state', '$rootScope', '$scope','$timeout', 
        function(modelItem, ManageSdm, $state, $rootScope, $scope,$timeout) {
            $scope.status = "Starting...";
            $scope.max = 500;
            $scope.progress = 0;
            $scope.now = new Date();
            // $scope.dataID;
            $scope.isRouteLoading = false;
            $scope.yearSelected = { 
                start: "year", 
                depth: "year",
                format: "MMMM yyyy",
                max: $scope.now
            };
            $scope.filterModel = {};
            $scope.item = {
                DatePickerBulan: new Date()
            }
            // function update() {
            //     $scope.progress += 1;
            //     if($scope.progress === 5){
            //         $scope.status = "Proses Pengambilan Data Remunerasi...";
            //     } 
            //     console.log($scope.progress);
            //     if($scope.progress === $scope.max) {
            //         $scope.status = "Proses Pengambilan Data Remunerasi Selesai..";
            //     }
            //     if($scope.progress === ($scope.max+5)) {
            //         $scope.isRouteLoading = false;
            //         return;
            //     } 
            //     $timeout(update, 1000);
            // }

            $scope.Cari = function() {
                var listRawRequired = [
                    "item.DatePickerBulan|k-ng-model|Periode"
                ];
                var isValid = modelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    $scope.isRouteLoading = true; 
                    $scope.mainGridOption = {
                        pageable: true,
                        enableHorizontalScrollbar: 1,
                        columns:[
                            {"field": "idPegawai","title": "id",visible:false},
                            {"field": "nilaiIndeksKehadiran","title": "nilaiIndeksKehadiran",visible:false},
                            {"field": "noRec","title": "noRec",visible:false},
                            {"field": "nipPns","title": "NIP","width": "200px"},
                            {"field": "namaLengkap","title": "NAMA PEGAWAI","width": "300px"},
                            {"field": "namaJabatan","title": "JABATAN","width": "300px"},
                            {"field": "grade","title": "GRADE","width": "100px"},
                            {"field": "nilaiJabatan","title": "NILAI JABATAN","width": "150px"},
                            {"field": "gaji","title": "GAJI","width": "150px",/*"format":"{0:n2}"*/},
                            {"field": "iki","title": "IKI","width": "150px",/*"format":"{0:n2}"*/},
                            {"field": "pir","title": "PIR","width": "150px",/*"format":"{0:n2}"*/},
                            {"field": "P1","title": "PIR P1","width": "150px",/*"format":"{0:n2}"*/},
                            {"field": "P2","title": "PIR P2","width": "150px",/*"format":"{0:n2}"*/},
                            {"field": "iku","title": "IKU","width": "150px",/*"format":"{0:n2}"*/},
                            {"field": "P1_Rp","title": "BESARAN P1","width": "150px",/*"format":"{0:n2}"*/},
                            {"field": "P2_Rp","title": "BESARAN P2","width": "150px",/*"format":"{0:n2}"*/},
                            {"field": "remunerasi","title": "BESARAN REMUNERASI","width": "150px",/*"format":"{0:n2}"*/},
                            {"field": "pajak","title": "PAJAK","width": "150px",/*"format":"{0:n2}"*/},
                            {"field": "remunerasiYgDiterima","title": "REMUNERASI YANG DITERIMA","width": "200px",/*"format":"{0:n2}"*/}
                        ]
                    }
    
                    ManageSdm.getOrderList("iki-remunerasi/get-kalkulasi-remunerasi-pegawai?date="+ moment($scope.item.DatePickerBulan).format("YYYY-MM")+"-01").then(function(dat){
                        if(dat.data.data.listIKIDanRemunerasi){
                            $scope.item.no =  dat.data.data.noStrukHistori;
                            $scope.item.jenisPembayaran = "Remunerasi";
                            $scope.sourceOrder = new kendo.data.DataSource({
                                data: dat.data.data.listIKIDanRemunerasi,
                                pageSize: 25
                            });
                            $scope.isRouteLoading = false;
                        } else {
                            toastr.warning("Data tidak tersedia")
                        }
                    }, function(err){
                        $scope.isRouteLoading = false;
                        toastr.warning('Failed to get Data');
                        throw err;
                    });
                } else {
                    modelItem.showMessages(isValid.messages);
                }
            };


            // $scope.getLoad = function(){
            //     debugger; 
            //     var dataLoad=[];
            //     var dataLoads=[];
            //     $scope.sourceOrder = new kendo.data.DataSource({
            //         data: dataLoads
            //     });
            //     var xx = 0;
            //     angular.forEach($scope.dataID, function(value){
            //         console.log("proses" + value); 
            //         xx +=1;
            //         ManageSdm.getOrderList("iki-remunerasi/get-kalkulasi-remunerasi?id="+ value +"&date="+ moment($scope.item.DatePickerBulan).format("YYYY-MM")+"-01").then(function(dat){
            //             // if(dat.data.data === []){
            //                 dataLoad = angular.extend(dataLoad, dat.data.data);
            //                 console.log( dataLoad);
            //             //}
            //         });
            //         dataLoads.push(dataLoad);
            //         $scope.sourceOrder = dataLoads;
            //     });
            //     if(xx === $scope.dataID.length){
            //         $scope.isRouteLoading = false;    
            //     }
            // }

            $scope.formatRupiah = function(value) {
                return parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            };

            $scope.Save = function() { 
                if ( $scope.sourceOrder.length === 0 ){
                    window.messageContainer.error("Data harus dilengkapi terlebih dahulu");
                    return;
                } 

                $scope.isRouteLoading = true;
                var data = $scope.sourceOrder;
                var data1=[];
                debugger;
                //dataAll.forEach(function(data){
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var element = data[key];
                        if (element.idPegawai !== undefined){
                            data1.push({
                                "pegawai":{
                                    "id":element.idPegawai
                                },
                                "nilaiJabatan": element.nilaiJabatan,
                                "p2": element.P2,
                                "p1":element.P1,
                                "gaji": element.gaji,
                                "indekKehadiran": element.nilaiIndeksKehadiran,
                                "iki": element.iki,
                                "p2Rp": element.P2_Rp, 
                                "periode": moment($scope.item.DatePickerBulan).format("YYYY-MM"), 
                                "evaluasiJabatan": {
                                    "noRec":element.noRec
                                },
                                "p1Rp": element.P1_Rp,
                                "pir": element.pir,
                                "grade": element.grade,
                                "remunerasi": element.remunerasi,
                                "iku": element.iku,
                                "statusEnabled":true
                            });
                        }
                    }
                }
                // });

                var dataSend = {
                    "nonHistori":  $scope.item.no,
                    "tglHistori":  moment($scope.item.DatePickerBulan).format("YYYY-MM") + '-01',
                    "ruangan": {
                        "id":213
                    },
                    "kelompokTransaksi": {
                        "id":43
                    },
                    "ikiDanRemunerasi" : data1
                }


                ManageSdm.saveDataUji(dataSend,"iki-remunerasi/save-iki-remunerasi").then(function(e) {
                    console.log("DATA :" + JSON.stringify(dataSend));
                    $scope.isRouteLoading = false;
                });
            };
            var timeoutPromise;
            $scope.$watch('filterModel.namaPegawai', function(newVal, oldVal){
                if(!newVal) return;
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function(){
                    if(newVal && newVal !== oldVal){
                        applyFilter("namaLengkap", newVal)
                    }
                }, 500)
            })
            function applyFilter(filterField, filterValue){
                var dataGrid = $("#gridRemunerasi").data("kendoGrid").dataSource;
                var currFilterObj = dataGrid.filter();
                var currentFilters = currFilterObj ? currFilterObj.filters : [];

                if(currentFilters && currentFilters.length > 0){
                    for (var i = 0; i < currentFilters.length; i++) {
                        if (currentFilters[i].field == filterField) {
                            currentFilters.splice(i, 1);
                            break;
                        }
                    }
                }

                currentFilters.push({
                    field: filterField,
                    operator: "contains",
                    value: filterValue
                });

                dataGrid.filter({
                    logic: "and",
                    filters: currentFilters
                });
            }
            $scope.resetFilter = function(){
                var dataGrid = $("#gridRemunerasi").data("kendoGrid").dataSource;
                dataGrid.filter({});
                $scope.filterModel = {};
            }
        }
    ]);
});