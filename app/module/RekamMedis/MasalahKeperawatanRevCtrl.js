define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MasalahKeperawatanRevCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManagePasien', 'FindPasien',
        function($rootScope, $scope, ModelItem, $state, managePasien, findPasien) {
            $scope.title = "Psikologi";
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            // $scope.nav = function(state) {
            //     $state.go(state, $state.params);
            // }
            $scope.arrIntervensi =[];
            $scope.arrImplementasi =[];
            $scope.arrEvaluasi =[];
            $scope.arrDiagnosisKep = [];
            $scope.arrDiagnosisParent = [];
            $scope.checkedDiagnosisKep = [];

            findPasien.getMasterDiagnosis().then(function(data){
                // $scope.items = data.data;
                $scope.dataDaftarDiagnosis = new kendo.data.DataSource({
                    data: data.data,
                    sort: { field: "namaDiagnosaKep", dir: "asc" },
                    // autoSync: true,
                    schema: {
                        model: {
                            fields: {
                                namaDiagnosaKep: {editable: false}
                            }
                        }
                    }
                });
            })
            findPasien.getTransaksiDiagnosis($state.params.noRec).then(function(data){
                if (data.data.loadedData){
                    if (data.data.loadedData.length !== 0){
                        data.data.loadedData.forEach(function(items){
                            var result = $.grep($scope.arrDiagnosisParent, function(e) { 
                                return e.id == items.id;
                            });
                            if (result.length == 0) {
                                var tmpParent = {
                                    "id": items.id,
                                    "nama": items.nama
                                }
                                $scope.arrDiagnosisParent.push(tmpParent);
                                findPasien.getDetailDiagnosis(items.id).then(function(e){
                                    e.data.forEach(function(parent){
                                        switch (parent.header) {
                                            case "Intervensi":
                                                var tempArr = [];
                                                parent.detail.forEach(function(child){
                                                    var tmpData = {
                                                        "idDiagosis": items.id,
                                                        "header": parent.header,
                                                        "name": child.name,
                                                        "id": child.id
                                                    }
                                                    tempArr.push(tmpData);
                                                })

                                                var dataModified = {
                                                    "id": items.id,
                                                    "nama": parent.nama,
                                                    "detail": tempArr
                                                }
                                                $scope.arrIntervensi.push(dataModified);
                                                break;
                                            case "Implementasi":
                                                var tempArr = [];
                                                parent.detail.forEach(function(child){
                                                    var tmpData = {
                                                        "idDiagosis": items.id,
                                                        "header": parent.header,
                                                        "name": child.name,
                                                        "id": child.id
                                                    }
                                                    tempArr.push(tmpData);
                                                })
                                                var dataModified = {
                                                    "id": items.id,
                                                    "nama": parent.nama,
                                                    "detail": tempArr
                                                }
                                                $scope.arrImplementasi.push(dataModified);
                                                break;
                                            case "Evaluasi":
                                                var tempArr = [];
                                                parent.detail.forEach(function(child){
                                                    var tmpData = {
                                                        "idDiagosis": items.id,
                                                        "header": parent.header,
                                                        "name": child.name,
                                                        "id": child.id
                                                    }
                                                    tempArr.push(tmpData);
                                                })
                                                var dataModified = {
                                                    "id": items.id,
                                                    "nama": parent.nama,
                                                    "detail": tempArr
                                                }
                                                $scope.arrEvaluasi.push(dataModified);
                                                break;
                                        }
                                    })
                                })
                                // console.log(JSON.stringify($scope.arrDiagnosisParent));
                            }

                            items.detail.forEach(function(e){
                                debugger;
                                $scope.arrDiagnosisKep.push(e);
                                var tmpChild = {
                                    "idDiagosis": items.id,
                                    "header": items.header,
                                    "name": e.name,
                                    "id": e.id,
                                    "noRec": e.noRec
                                }
                                $scope.checkedDiagnosisKep.push(tmpChild);
                            })
                        })
                    }
                }
                // debugger;
                // $scope.items = data.data;
            })
            $scope.opsiDiagnosis = { 
                pageable: true,
                columns: [
                    { template: "<input type='checkbox' class='checkbox' ng-checked='isExistId(dataItem.id)' ng-change='cekArrDiagnosis(bool, dataItem)' ng-model='bool'/>", width: 40 },
                    { field:"id", title:"id", hidden: true},
                    { field:"tglAwal", title:"Tanggal Ditemukan", editor: dateTimeEditor, width: 200, type: "date", format: "{0:dd/MM/yyyy hh:mm:ss}"},
                    { field:"namaDiagnosaKep",title:"Diagnosis Keperawatan"},
                    { field:"tglAkhir", title:"Tanggal Teratas", editor: dateTimeEditor, width: 200, type: "date", format: "{0:dd/MM/yyyy hh:mm:ss}"}
                ],
                editable: true,
                selectable: true
            };
			$scope.isChecked = function(id){
				var match = false;
				for(var i=0 ; i < $scope.arrDiagnosisKep.length; i++) {
					if($scope.arrDiagnosisKep[i].id == id){
					match = true;
					}
				}
				return match;
			};
			$scope.isExistId = function(id){
				var match = false;
				for(var i=0 ; i < $scope.arrDiagnosisParent.length; i++) {
					if($scope.arrDiagnosisParent[i].id == id){
					match = true;
					}
				}
				return match;
			};
            $scope.cekArrDiagnosis = function(bool, item) {
				debugger;
				if(bool){
					// add item separated by header name (Intervensi/Implementasi/Evaluasi)
                    findPasien.getDetailDiagnosis(item.id).then(function(e){
                        e.data.forEach(function(parent){
                            switch (parent.header) {
                                case "Intervensi":
                                    var tempArr = [];
                                    parent.detail.forEach(function(child){
                                        var tmpData = {
                                            "idDiagosis": item.id,
                                            "header": parent.header,
                                            "name": child.name,
                                            "id": child.id
                                        }
                                        tempArr.push(tmpData);
                                    })

                                    var dataModified = {
                                        "id": item.id,
                                        "nama": parent.nama,
                                        "detail": tempArr
                                    }
                                    $scope.arrIntervensi.push(dataModified);
                                    break;
                                case "Implementasi":
                                    var tempArr = [];
                                    parent.detail.forEach(function(child){
                                        var tmpData = {
                                            "idDiagosis": item.id,
                                            "header": parent.header,
                                            "name": child.name,
                                            "id": child.id
                                        }
                                        tempArr.push(tmpData);
                                    })
                                    var dataModified = {
                                        "id": item.id,
                                        "nama": parent.nama,
                                        "detail": tempArr
                                    }
                                    $scope.arrImplementasi.push(dataModified);
                                    break;
                                case "Evaluasi":
                                    var tempArr = [];
                                    parent.detail.forEach(function(child){
                                        var tmpData = {
                                            "idDiagosis": item.id,
                                            "header": parent.header,
                                            "name": child.name,
                                            "id": child.id
                                        }
                                        tempArr.push(tmpData);
                                    })
                                    var dataModified = {
                                        "id": item.id,
                                        "nama": parent.nama,
                                        "detail": tempArr
                                    }
                                    $scope.arrEvaluasi.push(dataModified);
                                    break;
                            }
                        })
                        debugger;
                    })
				} else {
					// remove item
                    $scope.arrIntervensi.forEach(function(data){
                        for(var i=0 ; i < $scope.arrIntervensi.length; i++) {
                            if($scope.arrIntervensi[i].id == item.id){
                                $scope.arrIntervensi.splice(i,1);
                            }
                        }
                    })
                    $scope.arrImplementasi.forEach(function(data){
                        for(var i=0 ; i < $scope.arrImplementasi.length; i++) {
                            if($scope.arrImplementasi[i].id == item.id){
                                $scope.arrImplementasi.splice(i,1);
                            }
                        }
                    })
                    $scope.arrEvaluasi.forEach(function(data){
                        for(var i=0 ; i < $scope.arrEvaluasi.length; i++) {
                            if($scope.arrEvaluasi[i].id == item.id){
                                $scope.arrEvaluasi.splice(i,1);
                            }
                        }
                    })
				}
            };
            $scope.checkedDiagnosis = function(bool, item) {
				debugger;
				if(bool){
					// add item
                    item.value = true;
                    if (item.detail) {
                        item.detail.forEach(function(e){
                            $scope.checkedDiagnosisKep.push(e)
                        })
                        // var tmpArr = {
                        //     "id": item.id,
                        //     "name": item.name
                        // }
                        // $scope.checkedDiagnosisKep.push(item)
                    } else {
                        $scope.checkedDiagnosisKep.push(item);
                    }
				} else {
					// remove item
                    if (item.detail) {
                        item.detail.forEach(function(e){
                            $scope.checkedDiagnosisKep.forEach(function(data){
                                for(var i=0 ; i < $scope.checkedDiagnosisKep.length; i++) {
                                    if($scope.checkedDiagnosisKep[i].id == e.id){
                                        $scope.checkedDiagnosisKep.splice(i,1);
                                    }
                                }
                            })
                        })
                    } else {
                        $scope.checkedDiagnosisKep.forEach(function(data){
                            for(var i=0 ; i < $scope.checkedDiagnosisKep.length; i++) {
                                if($scope.checkedDiagnosisKep[i].id == item.id){
                                    $scope.checkedDiagnosisKep.splice(i,1);
                                }
                            }
                        })
                    }
				}
            };
            function dateTimeEditor(container, options) {
                $('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="{0:dd/MM/yyyy hh:mm:ss}"/>')
                    .appendTo(container)
                    .kendoDateTimePicker({
                        close: function(e) {
                            e.preventDefault(); 
                        }
                    });
            }
            $scope.Save = function(){
                $scope.dataDiagnosis = [];
                $scope.pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
                $scope.checkedDiagnosisKep.forEach(function(item){
                    debugger;
                    switch (item.header){
                        case "Implementasi":
                            var dataPush = {
                                "noRec": item.noRec,
                                "pasienDaftar": {
                                    "noRec": $state.params.noRec
                                },
                                "pasien": {
                                    "id": parseInt($state.params.pasienId)
                                },
                                "diagnosaKeperawatan": {
                                    "id": item.idDiagosis
                                },
                                "intervensi": {
                                    "id": null
                                },
                                "implementasi": {
                                    "id": item.id
                                },
                                "evaluasi": {
                                    "id": null
                                },
                                "pegawai": {
                                    "id": $scope.pegawai.id
                                },
                                "ruangan": {
                                    "id": $scope.pegawai.ruangan.id
                                }
                            }
                            $scope.dataDiagnosis.push(dataPush);
                            break;
                        case "Evaluasi":
                            var dataPush = {
                                "noRec": item.noRec,
                                "pasienDaftar": {
                                    "noRec": $state.params.noRec
                                },
                                "pasien": {
                                    "id": parseInt($state.params.pasienId)
                                },
                                "diagnosaKeperawatan": {
                                    "id": item.idDiagosis
                                },
                                "intervensi": {
                                    "id": null
                                },
                                "implementasi": {
                                    "id": null
                                },
                                "evaluasi": {
                                    "id": item.id
                                },
                                "pegawai": {
                                    "id": $scope.pegawai.id
                                },
                                "ruangan": {
                                    "id": $scope.pegawai.ruangan.id
                                }
                            }
                            $scope.dataDiagnosis.push(dataPush);
                            break;
                        case "Intervensi":
                            var dataPush = {
                                "noRec": item.noRec,
                                "pasienDaftar": {
                                    "noRec": $state.params.noRec
                                },
                                "pasien": {
                                    "id": parseInt($state.params.pasienId)
                                },
                                "diagnosaKeperawatan": {
                                    "id": item.idDiagosis
                                },
                                "intervensi": {
                                    "id": item.id
                                },
                                "implementasi": {
                                    "id": null
                                },
                                "evaluasi": {
                                    "id": null
                                },
                                "pegawai": {
                                    "id": $scope.pegawai.id
                                },
                                "ruangan": {
                                    "id": $scope.pegawai.ruangan.id
                                }
                            }
                            $scope.dataDiagnosis.push(dataPush);
                            break;
                    }
                })
                // console.log(JSON.stringify($scope.dataDiagnosis));
                managePasien.saveDiagnosisKeperawatan($scope.dataDiagnosis).then(function(e){
                    console.log(JSON.stringify(e.data));
                })
            }
        }
    ]);
});