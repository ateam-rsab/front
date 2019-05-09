define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('SkriningKekhususanTambahanLanjutanCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {
            // duplicate from SkriningKekhususanTambahanCtrl
            $scope.noRecPap = cacheHelper.get('idPengkajianLanjut');
            //indikator harap tunggu
            $scope.dataVOloaded = true;
            $rootScope.doneLoad = false;

            $scope.noCM = $state.params.noCM;
            $scope.pasien = {};
            $scope.kajianAwal = cacheHelper.get("kajianAwal");
            if ($scope.kajianAwal === undefined)
                $scope.kajianAwal = {};

            $scope.formId = 323;
            $scope.arrParameterSkriningTmbhn = [];
            findPasien.getDataKajianLanjutan($scope.formId, $scope.noRecPap).then(function(data) {
				debugger;
				if (data.data.data.pengkajianAwalTransaksi) {
					$scope.noRecTransaksi = data.data.data.pengkajianAwalTransaksi.noRec;
					debugger;
				}
				$scope.formMaster = data.data.data.pengkajianAwal;
				$scope.formMaster.detail.forEach(function(frmMaster){
                    if (!frmMaster.value)
                        frmMaster.value = 329
                        $scope.arrParameterSkriningTmbhn.push({
                            // "id": frmMaster.id,
                            "idParent": frmMaster.id,
                            "descNilai": frmMaster.descNilai,
                            "nama": frmMaster.nama,
                            "value": frmMaster.value
                        })
                })
			})
            $scope.listYaTidak = [{
                "id": 328,
                "descNilai": "",
                "value": null,
                "nama": "Ya"
            },
            {
                "id": 329,
                "descNilai": "",
                "value": null,
                "nama": "Tidak"
            }]
            $scope.klikOption = function(data, stat) {
                debugger;
                var result = $.grep($scope.arrParameterSkriningTmbhn, function(e) { 
					return e.idParent == data.id;
				});
				var tempData = {
					// "id": stat.id,
					"idParent": data.id,
					"descNilai": stat.descNilai,
					"nama": stat.nama,
					"value": stat.id
				}
				if (result.length == 0) {
					$scope.arrParameterSkriningTmbhn.push(tempData);
				} else {
					for (var i = 0; i < $scope.arrParameterSkriningTmbhn.length; i++)
						if ($scope.arrParameterSkriningTmbhn[i].idParent && $scope.arrParameterSkriningTmbhn[i].idParent === data.id) { 
							$scope.arrParameterSkriningTmbhn.splice(i, 1);
							break;
						}
					$scope.arrParameterSkriningTmbhn.push(tempData);
				}
                console.log(JSON.stringify($scope.arrParameterSkriningTmbhn));
            }
            $scope.Save = function() {
                var dataForm = [];
                $scope.arrParameterSkriningTmbhn.forEach(function(data){
					var tmpData = {
						"pengkajianAwal": {
							"id": data.idParent
						},
						"nilai": data.value.toString()
					}
					dataForm.push(tmpData);
				});

                if ($scope.noRecTransaksi) {
					$scope.tempData = {   
						"noRec": $scope.noRecTransaksi,
						"pengkajianAwalBaru":{  
							"noRec": $scope.noRecPap
						},
						"detailPengkajianAwal": dataForm
					}
					ManagePasien.updatePengkajianAwalPasien($scope.tempData, $scope.currentState).then(function(e) {
						// $scope.Next();
					})
				} else {
					$scope.tempData = {  
						"pengkajianAwalBaru":{  
							"noRec": $scope.noRecPap
						},
						"detailPengkajianAwal": dataForm
					}
					ManagePasien.simpanPengkajianAwalPasien($scope.tempData, $scope.currentState).then(function(e) {
						// $scope.Next();
					})
				}

                // for (var i = 0; i < $scope.listKarateristikNyeri.length; i++) {
                //     delete $scope.listKarateristikNyeri[i].isChecked;
                // }

                // for (var i = 0; i < $scope.listNyeriMempengaruhi.length; i++) {
                //     delete $scope.listNyeriMempengaruhi[i].isChecked;
                // }

                // $scope.item.karakteristikNyeriSet = ModelItem.setObjCollectionForCheckbox($scope.listKarateristikNyeri, $scope.arrKarateristikNyeri, "dataKarakteristikNyeri");
                // $scope.item.pengaruhNyeriSet = ModelItem.setObjCollectionForCheckbox($scope.listNyeriMempengaruhi, $scope.arrNyeriMempengaruhi, "dataNyeriPempengaruhi");

                // cacheHelper.set("kajianAwal", $scope.kajianAwal);
                // var pasien = { noRec: $state.params.noRec };
                // $scope.item.pengkajianAwalBaru = {
                //     "noRec": $scope.noRecPap
                // };
                // ManagePasien.saveSkriningNyeri(ModelItem.beforePost(pasien), dateHelper.toTimeStamp(new Date()), ModelItem.beforePost($scope.item)).then(function(e) {
                //     $scope.kajianAwal.SkriningNyeri = $scope.item;
                //     cacheHelper.set("kajianAwal", $scope.kajianAwal);
                //     $scope.isNext = true;
                // });
            };

            $scope.Next = function() {
                $rootScope.next();
            }

           
        }
    ]);
});