define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('SkriningKekhususanRiwayatTumbuhKembangCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {
        debugger;
            //$rootScope.listActive -> data listMenu
            //ModelItem.setActiveMenu($rootScope.listActive, "SkriningNyeri");
            // get noRecPap dari local storage yg di ush di halaman dashboard PAP
            $scope.noRecPap = window.localStorage.getItem('noRecPap');
            //indikator harap tunggu
            $scope.dataVOloaded = true;
            $rootScope.doneLoad = false;

            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.pasien = {};
            $scope.kajianAwal = cacheHelper.get("kajianAwal");
            if ($scope.kajianAwal === undefined)
                $scope.kajianAwal = {};

            // $scope.arrKarateristikNyeri = [];
            // $scope.cekArrKarateristikNyeri = function(data) {

            //     var isExist = _.find($scope.arrKarateristikNyeri, function(dataExist) {
            //         return dataExist == data;
            //     });

            //     if (isExist == undefined) {
            //         $scope.arrKarateristikNyeri.push(data);
            //     } else {
            //         $scope.arrKarateristikNyeri = _.without($scope.arrKarateristikNyeri, data);
            //     }

            //     console.log('list statKaratersitikNyeri : ' + JSON.stringify($scope.arrKarateristikNyeri));
            // };

            // $scope.arrNyeriMempengaruhi = [];
            // $scope.isAdaTidak = false
            // $scope.cekArrNyeriMempengaruhi = function(data) {

            //     var isExist = _.find($scope.arrNyeriMempengaruhi, function(dataExist) {
            //         return dataExist == data;
            //     });

            //     if (isExist == undefined) {
            //         $scope.arrNyeriMempengaruhi.push(data);
            //     } else {
            //         $scope.arrNyeriMempengaruhi = _.without($scope.arrNyeriMempengaruhi, data);
            //     }

            //     console.log('list statNyerMempengaruhi : ' + JSON.stringify($scope.arrNyeriMempengaruhi));
            // };

            // $q.all([ModelItem.getDataDummyGeneric("StatusAdaTidakAda", false),
            //     ModelItem.getDataDummyGeneric("DataTipeNyeri", false),
            //     ModelItem.getDataDummyGeneric("DataKarateristikNyeri", false),
            //     ModelItem.getDataDummyGeneric("DataNyeriMempengaruhi", false),
            //     ModelItem.getDataDummyGeneric("DataLokasiNyeri", false),
            //     ModelItem.get("SkriningNyeri"),
            //     findPasien.getByNoCM($scope.noCM)
            // ]).then(function(data) {

            //     if (data[0].statResponse)
            //         $scope.listAdaTidakAda = data[0];

            //     if (data[1].statResponse)
            //         $scope.listTipeNyeri = data[1];

            //     if (data[2].statResponse) {
            //         for (var i = 0; i < data[2].length; i++) {
            //             data[2][i].isChecked = false;
            //         }
            //         $scope.listKarateristikNyeri = data[2];
            //     }

            //     if (data[3].statResponse) {
            //         for (var i = 0; i < data[3].length; i++) {
            //             data[3][i].isChecked = false;
            //         }
            //         $scope.listNyeriMempengaruhi = data[3];
            //     }


            //     if (data[4].statResponse)
            //         $scope.listLokasiNyeri = data[4];

            //     if (data[5].statResponse) {
            //         $scope.item = {};
            //         $scope.item = data[5];
            //         $scope.item.noRec = "";
            //     }


            //     if (data[6].statResponse) {
            //         $rootScope.currentPasien = data[6].data.data;
            //         $scope.pasien = data[6].data.data;
            //     }

            //     //ambil data current pasien seusia no cm dan tanggal     
            //     getDataCurentPasien();
            // });

            $scope.formId = 363;
            $scope.arrParameterSkriningTmbhn = [];
            findPasien.getMasterDataPAP($scope.formId, $scope.noRecPap).then(function(data) {
				debugger;
				if (data.data.pengkajianAwalTransaksi) {
					$scope.noRecTransaksi = data.data.pengkajianAwalTransaksi.noRec;
					debugger;
				}
				$scope.formMaster = data.data.pengkajianAwal;
				// $scope.formMaster.detail.forEach(function(frmMaster){
                //     if (!frmMaster.value)
                //         frmMaster.value = 329
                //         $scope.arrParameterSkriningTmbhn.push({
                //             // "id": frmMaster.id,
                //             "idParent": frmMaster.id,
                //             "descNilai": frmMaster.descNilai,
                //             "nama": frmMaster.nama,
                //             "value": frmMaster.value
                //         })
                // })
			})

            $scope.Save = function() {
                var dataForm = [];
                $scope.formMaster.detail.forEach(function(data){
                    if (data.value) {
                        var tmpData = {
                            "pengkajianAwal": {
                                "id": data.id
                            },
                            "nilai": data.value.toString()
                        }
                        dataForm.push(tmpData);
                    }
				});
                console.log(JSON.stringify(dataForm));
                if ($scope.noRecTransaksi) {
					$scope.tempData = {   
						"noRec": $scope.noRecTransaksi,
						"pengkajianAwalBaru":{  
							"noRec": $scope.noRecPap
						},
						"detailPengkajianAwal": dataForm
					}
					ManagePasien.updatePengkajianAwalPasien($scope.tempData).then(function(e) {
						// $scope.Next();
					})
				} else {
					$scope.tempData = {  
						"pengkajianAwalBaru":{  
							"noRec": $scope.noRecPap
						},
						"detailPengkajianAwal": dataForm
					}
					ManagePasien.simpanPengkajianAwalPasien($scope.tempData).then(function(e) {
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

            $scope.satuan={"id": 1,"satuan":"Bulan"};
           
        }
    ]);
});