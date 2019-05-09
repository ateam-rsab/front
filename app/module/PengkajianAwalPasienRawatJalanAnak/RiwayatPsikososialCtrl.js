define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RiwayatPsikososialCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'ManagePasien', 'FindPasien',
        function($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, ManagePasien, findPasien) {

            //$rootScope.listActive -> data listMenu
            //ModelItem.setActiveMenu($rootScope.listActive, "RiwayatPsikososial");
            $rootScope.showMenuPengkajianMedis = false;
            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.tanggal = $state.params.tanggal;
            $rootScope.tanggal = $state.params.tanggal;
            $scope.pasien = {};
            $scope.item = {};
            $scope.kajianAwal = cacheHelper.get("kajianAwal");
            if ($scope.kajianAwal === undefined)
                $scope.kajianAwal = {};

            // get noRecPap dari local storage yg di ush di halaman dashboard PAP
            $scope.noRecPap = window.localStorage.getItem('noRecPap');
			$scope.formId = 299; //get master form skrining nyeri
            $scope.arrParameterPsikososial = [];
            $scope.arrParameterStatusSosial = [];

            findPasien.getMasterDataPAP($scope.formId, $scope.noRecPap).then(function(data) {
				debugger;
				if (data.data.pengkajianAwalTransaksi) {
					$scope.noRecTransaksi = data.data.pengkajianAwalTransaksi.noRec;
					debugger;
				}
				$scope.formMaster = data.data.pengkajianAwal;
                // console.log(JSON.stringify($scope.formMaster.detail));
				$scope.formMaster.detail.forEach(function(frmMaster){
                    switch (frmMaster.id) {
                        case 308:
                            $scope.titleStatusSosial = frmMaster.nama;
                            $scope.item.statusSosial = frmMaster.detail;
                            frmMaster.detail.forEach(function(items){
                                if (items.value !== null) 
                                    items.value = parseInt(items.value)
                                if (items.detail) {
                                    items.detail.forEach(function(data){
                                        debugger;
                                        if(data.id === items.value) {
                                            e.descNilai = x.descNilai;
                                            var arrSkor = {
                                                "id": x.id,
                                                "idParent": e.id,
                                                "descNilai": x.descNilai,
                                                "namaDetail": x.namaDetail,
                                                "value": "true"
                                            }
                                            $scope.arrParameterStatusSosial.push(arrSkor)
                                        }
                                    })
                                }
                            })
                            break;
                        case 300:
                            $scope.titlePsikososial = frmMaster.nama;
                            $scope.item.psikososial = frmMaster.detail;
                            frmMaster.detail.forEach(function(items){
                                debugger;
                                if (items.value === "true") 
                                    $scope.arrParameterPsikososial.push(items);
                            })
                            break;
                        default :
                    }
				})
			})
			$scope.isChecked = function(id){
                debugger;
				var match = false;
				for(var i=0 ; i < $scope.arrParameterPsikososial.length; i++) {
					if($scope.arrParameterPsikososial[i].id == id){
					match = true;
					}
				}
				return match;
			};
            $scope.cekArrPsikososial = function(data, item) {
				debugger;
				if(data){
					$scope.arrParameterPsikososial.push(item);
				} else {
					for(var i=0 ; i < $scope.arrParameterPsikososial.length; i++) {
						if($scope.arrParameterPsikososial[i].id == item.id){
						$scope.arrParameterPsikososial.splice(i,1);
						}
					}      
				}
                console.log('list statResikoGeriatri : ' + JSON.stringify($scope.arrParameterPsikososial));
            };
			$scope.cekStatusSosial = function(data, stat) {
				debugger;
                data.value = stat.id;
                data.descNilai = stat.descNilai;
				var result = $.grep($scope.arrParameterStatusSosial, function(e) { 
					return e.idParent == data.id;
				});
				var tempData = {
					"id": stat.id,
					"idParent": data.id,
					"descNilai": stat.descNilai,
					"nama": stat.nama,
					"value": "true"
				}
				if (result.length == 0) {
					debugger;
					$scope.arrParameterStatusSosial.push(tempData);
					console.log(JSON.stringify($scope.arrParameterStatusSosial));
				} else {
					for (var i = 0; i < $scope.arrParameterStatusSosial.length; i++)
						if ($scope.arrParameterStatusSosial[i].idParent && $scope.arrParameterStatusSosial[i].idParent === data.id) { 
							$scope.arrParameterStatusSosial.splice(i, 1);
							break;
						}
					$scope.arrParameterStatusSosial.push(tempData);
					console.log(JSON.stringify($scope.arrParameterStatusSosial));
					debugger;
				}
                debugger;
            }
            
            $scope.arrStatusRiwayatPsikologi = [];
            $scope.cekArrStatusRiwayatPsikologi = function(data) {

                var isExist = _.find($scope.arrStatusRiwayatPsikologi, function(dataExist) {
                    return dataExist == data;
                });

                if (isExist == undefined) {
                    $scope.arrStatusRiwayatPsikologi.push(data);
                } else {
                    $scope.arrStatusRiwayatPsikologi = _.without($scope.arrStatusRiwayatPsikologi, data);
                }

            };
            // $scope.arrStatusTempatTinggal = [];
            // $scope.cekArrStatusTempatTinggal = function(data) {
            //     if (data != undefined) {

            //         if (data.name == "Tempat lainnya" && !$scope.isTempatTinggalLain) {
            //             {
            //                 $scope.isTempatTinggalLain = true;
            //                 $scope.arrStatusTempatTinggal = [];
            //                 $scope.TempItem.tempatTinggal = false;
            //             }
            //         } else {
            //             $scope.isTempatTinggalLain = false;
            //         }
            //     } else {

            //     }
            //     var isExist = _.find($scope.arrStatusTempatTinggal, function(dataExist) {
            //         return dataExist == data;
            //     });

            //     if (isExist == undefined) {
            //         $scope.arrStatusTempatTinggal.push(data);
            //         data.isChecked = true;

            //     } else {
            //         $scope.arrStatusTempatTinggal = _.without($scope.arrStatusTempatTinggal, data);
            //         data.isChecked = false;
            //     }
            // };
            // $scope.$watch('isTempatTinggalLain', function(newValue, oldValue) {

            //     if (newValue != undefined) {
            //         if (newValue.name == "Tidak normal") {
            //             $scope.isBentukDadaTidakNormal = true;
            //         } else {
            //             $scope.isBentukDadaTidakNormal = false;
            //         }
            //     }
            // });


            /*$scope.isTempatTinggalLain = false;
             $scope.$watch('TempItem.tempatTinggal', function(newValue, oldValue) {
             if (newValue != undefined) {
             
             if (newValue.name == "Tempat lainnya" && !$scope.isTempatTinggalLain ) {
             alert('checked')
             $scope.isTempatTinggalLain = true;
             } else {
             $scope.isTempatTinggalLain = false;
             alert('unchceked')
             }
             }
             });*/

            // $q.all([ModelItem.getDataDummyGeneric("StatusBaikTidakBaik", false),
            //     ModelItem.getDataDummyGeneric("StatusTempatTinggal", false),
            //     ModelItem.getDataDummyGeneric("StatusRiwayatPsikologi", false),
            //     ModelItem.get("RiwayatPsikososial"),
            //     findPasien.getByNoCM($scope.noCM)
            // ]).then(function(data) {

            //     if (data[0].statResponse)
            //         $scope.listStatusKesadaran = data[0];


            //     if (data[1].statResponse) {
            //         for (var i = 0; i < data[1].length; i++) {
            //             data[1][i].isChecked = false;
            //         }
            //         $scope.listStatusTempatTinggal = data[1];
            //     }

            //     if (data[2].statResponse) {
            //         for (var i = 0; i < data[2].length; i++) {
            //             data[2][i].isChecked = false;
            //         }
            //         $scope.listStatusRiwayatPsikologi = data[2];
            //     }

            //     /*if(data[2].statResponse)
            //      $scope.listStatusRiwayatPsikologi = data[2];*/

            //     if (data[3].statResponse) {
            //         $scope.item = data[4];
            //         $scope.item.noRec = "";
            //     }
            //     if (data[4].statResponse) {

            //         $rootScope.currentPasien = data[4].data.data;
            //         $scope.pasien = data[4].data.data;
            //     }

            //     //ambil data current pasien seusia no cm dan tanggal     
            //     getDataCurentPasien();
            // });

            // function getDataCurentPasien() {
            //     debugger;
            //     findPasien.getRiwayatPsikososialByNoRec($state.params.noRec).then(function(e) {
            //         if (e.data.data.PapRiwayatPsikososial[0] != undefined) {
            //             $scope.item.PapRiwayatPsikososial = e.data.data.PapRiwayatPsikososial[0];
            //             $scope.item.noRec = $scope.item.PapRiwayatPsikososial.noRec;
            //             $scope.item.KetStatusPsikologiLainnya = $scope.item.PapRiwayatPsikososial.keteranganStatusPsikologiLainnya;
            //             $scope.item.hubunganPasien = $scope.item.PapRiwayatPsikososial.hubunganPasien;

            //             for (var key in $scope.listStatusKesadaran) {
            //                 if ($scope.listStatusKesadaran.hasOwnProperty(key)) {
            //                     var element = $scope.listStatusKesadaran[key];
            //                     if (element.id === $scope.item.hubunganPasien.id) {
            //                         element.isNilai = true;
            //                     }
            //                 }
            //             }
            //             for (var key in $scope.listStatusRiwayatPsikologi) {
            //                 if ($scope.listStatusRiwayatPsikologi.hasOwnProperty(key)) {
            //                     var element = $scope.listStatusRiwayatPsikologi[key];

            //                     for (var keyItem in $scope.item.PapRiwayatPsikososial.papStatusPsikososialSet) {
            //                         if ($scope.item.PapRiwayatPsikososial.papStatusPsikososialSet.hasOwnProperty(keyItem)) {
            //                             var elementItem = $scope.item.PapRiwayatPsikososial.papStatusPsikososialSet[keyItem];
            //                             if (elementItem.statusRiwayatPsikologi.id === element.id) {
            //                                 element.isNilai = elementItem.isNilai;
            //                                 if (element.isNilai === true)
            //                                     $scope.arrStatusRiwayatPsikologi.push(element);
            //                             }
            //                         }
            //                     }
            //                 }
            //             }

            //             for (var key in $scope.listStatusTempatTinggal) {
            //                 if ($scope.listStatusTempatTinggal.hasOwnProperty(key)) {
            //                     var element = $scope.listStatusTempatTinggal[key];

            //                     for (var keyItem in $scope.item.PapRiwayatPsikososial.papTempatTinggalSet) {
            //                         if ($scope.item.PapRiwayatPsikososial.papTempatTinggalSet.hasOwnProperty(keyItem)) {
            //                             var elementItem = $scope.item.PapRiwayatPsikososial.papTempatTinggalSet[keyItem];
            //                             if (elementItem.tempatTinggal.id === element.id) {
            //                                 element.isNilai = elementItem.isNilai;
            //                                 if (element.isNilai === true)
            //                                     $scope.arrStatusTempatTinggal.push(element);
            //                             }
            //                         }
            //                     }
            //                 }
            //             }

            //         }
            //     });
            // };


            $scope.Save = function() {
                var dataForm = [];
                $scope.arrParameterPsikososial.forEach(function(data){
					var tmpData = {
						"pengkajianAwal": {
							"id": data.id
						},
						"nilai": "true"
					}
					dataForm.push(tmpData)
					debugger;
				});
				$scope.arrParameterStatusSosial.forEach(function(data){
					var tmpData = {
						"pengkajianAwal": {
							"id": data.idParent
						},
						"nilai": data.id.toString()
					}
					dataForm.push(tmpData)
					debugger;
				});
                if ($scope.noRecTransaksi) {
					$scope.tempData = {   
						"noRec": $scope.noRecTransaksi,
						"pengkajianAwalBaru":{  
							"noRec": $scope.noRecPap
						},
						"detailPengkajianAwal": dataForm
					}
					ManagePasien.updatePengkajianAwalPasien($scope.tempData).then(function(e) {
						$scope.Next();
					})
				} else {
					$scope.tempData = {  
						"pengkajianAwalBaru":{  
							"noRec": $scope.noRecPap
						},
						"detailPengkajianAwal": dataForm
					}
					ManagePasien.simpanPengkajianAwalPasien($scope.tempData).then(function(e) {
						$scope.Next();
					})
				}


                // function save lama
                // $scope.item.StatusPsikososialSet = ModelItem.setObjCollectionForCheckbox($scope.listStatusRiwayatPsikologi, $scope.arrStatusRiwayatPsikologi, "statusRiwayatPsikologi");
                // $scope.item.tempatTinggal = ModelItem.setObjCollectionForCheckbox($scope.listStatusTempatTinggal, $scope.arrStatusTempatTinggal, "tempatTinggal");

                // cacheHelper.set("kajianAwal", $scope.kajianAwal);
                // var pasien = { noRec: $state.params.noRec };
                // $scope.item.pengkajianAwalBaru = { noRec: $scope.noRecPap};
                // ManagePasien.saveRiwayatPsikososial(ModelItem.beforePost(pasien), dateHelper.toTimeStamp(new Date()), ModelItem.beforePost($scope.item)).then(function(e) {

                //     $scope.isNext = true;

                // });

            };
            $scope.Next = function() {
                $rootScope.next();
            }
        }
    ]);
});