define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('StatusFungsionalCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'ManagePasien', 'CacheHelper',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, managePasien, cacheHelper) {
            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Status Fungsional";
            debugger;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.isPernahDirawat = false;
            $scope.isRawatInap = window.isRawatInap;
            $scope.item = {};
            ModelItem.get("statusfungsional").then(function(data) {
                $scope.item = data;
                $rootScope.dataVOloaded = true;
            }, function errorCallBack(err) {});
            // get noRecPap dari local storage yg di ush di halaman dashboard PAP
            $scope.noRecPap = cacheHelper.get('noRecPap');
            $scope.formId = 240; //get master form status fungsional
            $scope.arrParameterRawatJalan = [];
            $scope.arrParameterRawatInap = [];
            
			findPasien.getMasterDataPAP($scope.formId, $scope.noRecPap).then(function(data) {
				if (data.data.pengkajianAwalTransaksi) {
					$scope.noRecTransaksi = data.data.pengkajianAwalTransaksi.noRec;
					debugger;
				}
				$scope.formMaster = data.data.pengkajianAwal;
				$scope.formMaster.detail.forEach(function(frmMaster){
                    debugger;
                    switch (frmMaster.id) {
                        case 241:
                            $scope.subTitle = frmMaster.nama
                            break;
                        case 242:
                            $scope.item.statusFungsionalRwtJln = frmMaster.detail;
                            var getChecked = frmMaster.detail;
                            getChecked.forEach(function(item){
                                debugger;
                                if (item.detail) {
                                    if (item.value !== null)
                                        item.value = parseInt(item.value)
                                    item.detail.forEach(function(data){
                                        debugger;
                                        if (data.id === item.value) {
                                            var arrSkor = {
                                                "id": data.id,
                                                "idParent": item.id,
                                                "descNilai": data.descNilai,
                                                "namaDetail": data.namaDetail,
                                                "value": data.value
                                            }
                                            $scope.arrParameterRawatJalan.push(arrSkor);
                                            debugger;
                                        }
                                    })
                                    debugger;
                                } else {
                                    debugger;
                                    if (item.value !== null)
                                        $scope.arrParameterRawatJalan.push(item)
                                }
                            })
                            
                            break;
                        case 249:
                            frmMaster.detail.forEach(function(items){
                                // debugger;
                                if (items.id === 250) {
                                    $scope.item.formTitleRawatInap = items.nama;
                                    $scope.item.statusFungsionalRwtInap = items.detail;
                                    var getChecked = items.detail;
                                    items.detail.forEach(function(data){
                                        if (data.detail) {
                                            data.detail.forEach(function(e){
                                                if (e.value !== null) {
                                                    // debugger;
                                                    e.value = parseInt(e.value)
                                                    e.detail.forEach(function(x){
                                                        if (x.id === e.value) {
                                                            e.descNilai = x.descNilai;
                                                            var arrSkor = {
                                                                "id": x.id,
                                                                "idParent": e.id,
                                                                "descNilai": x.descNilai,
                                                                "namaDetail": x.namaDetail,
                                                                "value": "true"
                                                            }
                                                            $scope.arrParameterRawatInap.push(arrSkor)
                                                        }
                                                    })
                                                } else {
                                                    debugger;
                                                }
                                            })
                                        }
                                    })
                                    debugger;
                                }
                            })
                            // console.log(JSON.stringify($scope.item.statusFungsionalRwtInap));
                            $scope.getTotalSkor();
                            break;
                        default:
                    }
				})
                console.log($scope.subTitle);
			})
            var tempArray = [];
            // $scope.fungsionalRawatJalan = [{
            //     "id": 1, "name": "Alat bantu", "desc": "Alat Bantu", "keterangan": "-", "disable": true
            // }, {
            //     "id": 2, "name": "Prothesa", "desc": "Prothesa", "keterangan": "-", "disable": true
            // }, {
            //     "id": 3, "name": "Cacat tubuh", "desc": "Cacat tubuh", "keterangan": "-", "disable": true
            // }]

            // $scope.skorIndexBarthel = [{
            //     "id": 5, "name": "Skor 20", "desc": "Mandiri", "min": 20, "max": 20
            // }, {
            //     "id": 4, "name": "Skor 12 - 19", "desc": "Ketergantungan Ringan", "min": 12, "max": 19
            // }, {
            //     "id": 3, "name": "Skor 9 - 11", "desc": "Ketergantungan Sedang", "min": 9, "max": 11
            // }, {
            //     "id": 2, "name": "Skor 5 - 8", "desc": "Ketergantungan Berat", "min": 5, "max": 8
            // }, {
            //     "id": 1, "name": "Skor 0 - 4", "desc": "Ketergantungan Total", "min": 0, "max": 4
            // }]

           /* ModelItem.getDataDummyGeneric("ParameterStatusFungsional/StatusFungsional", false).then(function(data) {
                $scope.listStatusFungsional = data;
            })*/
            // $q.all([ModelItem.getDataDummyGeneric("StatusYaTidak", false),
            //     ModelItem.getDataDummyGeneric("StatusFungsional", false),
            //     findPasien.getByNoCM($scope.noCM)
            // ]).then(function(data) {
            //     debugger;
            //     if (data[0].statResponse)
            //         $scope.listStatusYaTidak = data[0];
            //     if (data[1].statResponse)
            //         $scope.listStatusfungsional = data[1];
            //     if (data[2].statResponse) {

            //         $rootScope.currentPasien = data[2].data.data;
            //         $scope.pasien = data[2].data.data;
            //     }

            //     //ambil data current pasien seusia no cm dan tanggal     
            //     getDataCurentPasien();
            // });
            
			$scope.cekAktivitas = function(data, stat) {
				debugger;
                data.value = stat.id;
                data.descNilai = stat.descNilai;
				var result = $.grep($scope.arrParameterRawatJalan, function(e) { 
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
					$scope.arrParameterRawatJalan.push(tempData);
					console.log(JSON.stringify($scope.arrParameterRawatJalan));
				} else {
					for (var i = 0; i < $scope.arrParameterRawatJalan.length; i++)
						if ($scope.arrParameterRawatJalan[i].idParent && $scope.arrParameterRawatJalan[i].idParent === data.id) { 
							$scope.arrParameterRawatJalan.splice(i, 1);
							break;
						}
					$scope.arrParameterRawatJalan.push(tempData);
					console.log(JSON.stringify($scope.arrParameterRawatJalan));
					debugger;
				}
                debugger;
            }
			$scope.isChecked = function(id){
                debugger;
				var match = false;
				for(var i=0 ; i < $scope.arrParameterRawatJalan.length; i++) {
					if($scope.arrParameterRawatJalan[i].id == id){
					match = true;
					}
				}
				return match;
			};
            $scope.cekArrRawatJalan = function(data, item) {
				debugger;
				if(data){
					$scope.arrParameterRawatJalan.push(item);
				} else {
					for(var i=0 ; i < $scope.arrParameterRawatJalan.length; i++) {
						if($scope.arrParameterRawatJalan[i].id == item.id){
						$scope.arrParameterRawatJalan.splice(i,1);
						}
					}      
				}
                console.log('list statResikoGeriatri : ' + JSON.stringify($scope.arrParameterRawatJalan));
            };
            
			$scope.cekTotalSkor = function(data, stat) {
                data.value = stat.id;
                data.descNilai = stat.descNilai;
				var result = $.grep($scope.arrParameterRawatInap, function(e) { 
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
					$scope.arrParameterRawatInap.push(tempData);
					console.log(JSON.stringify($scope.arrParameterRawatInap));
				} else {
					for (var i = 0; i < $scope.arrParameterRawatInap.length; i++)
						if ($scope.arrParameterRawatInap[i].idParent && $scope.arrParameterRawatInap[i].idParent === data.id) { 
							$scope.arrParameterRawatInap.splice(i, 1);
							break;
						}
					$scope.arrParameterRawatInap.push(tempData);
					console.log(JSON.stringify($scope.arrParameterRawatInap));
					debugger;
				}
				$scope.getTotalSkor();
                debugger;
            }
			$scope.getTotalSkor = function() {
				var skorAwal = 0;
				$scope.arrParameterRawatInap.forEach(function(data){
					skorAwal += parseInt(data.descNilai);
					debugger;
				})
				$scope.totalSkor = skorAwal
			}
            // function getDataCurentPasien() {
            //     findPasien.getStatusFungsional($state.params.noRec).then(function(e) {
            //         debugger;
            //             if (e.data.data.PapStatusFungsional[0] !== undefined) {
            //                 $scope.item.PapRiwayatPsikososial = e.data.data.PapStatusFungsional[e.data.data.PapStatusFungsional.length-1];
            //                 $scope.item.statusFungsional = $scope.item.PapRiwayatPsikososial.statusFungsional;
            //                 $scope.item.pernahJatuh = $scope.item.PapRiwayatPsikososial.pernahJatuh;
            //                 $scope.item.menggunakanAlatBantu = $scope.item.PapRiwayatPsikososial.menggunakanAlatBantu;
                            
            //                 for (var key in $scope.listStatusfungsional) {
            //                     if ($scope.listStatusfungsional.hasOwnProperty(key)) {
            //                         var element = $scope.listStatusfungsional[key];
            //                         if (element.id === $scope.item.statusFungsional.id) {
            //                             element.isNilai = true;
            //                             $scope.item.statusFungsional = element
            //                         }
            //                     }
            //                 }
                            
            //                 for (var key in $scope.listStatusYaTidak) {
            //                     if ($scope.listStatusYaTidak.hasOwnProperty(key)) {
            //                         var element = $scope.listStatusYaTidak[key];
            //                         if (element.id === $scope.item.pernahJatuh.id) {
            //                             element.isNilai = true;
            //                             $scope.item.pernahJatuh = element
            //                         }
            //                     }
            //                 }
                            
            //                 for (var key in $scope.listStatusYaTidak) {
            //                     if ($scope.listStatusYaTidak.hasOwnProperty(key)) {
            //                         var element = $scope.listStatusYaTidak[key];
            //                         if (element.id === $scope.item.menggunakanAlatBantu.id) {
            //                             element.isNilai = true;
            //                             $scope.item.menggunakanAlatBantu = element
            //                         }
            //                     }
            //                 }
            //             }
            //         /*$scope.item.PapStatusFungsional = e.data.data.PapStatusFungsional[0];
            //         $scope.item.statusFungsional = $scope.item.PapStatusFungsional.statusFungsional*/
            //     });
            // }
            // $scope.$watch('item.makan + item.mandi + item.perawatanDiri + item.Berpakaian + item.buangAir + item.buangAirKecil + item.penggunaanToilet + item.transfer + item.mobilitas + item.naikTurunTangga', function(value) {
            //     debugger;
            //     $scope.item.totalIndexBarthel = value
            // })
            $scope.Save = function() {
                var dataForm = [];
                // for (var i = 0; i < $scope.arrParameterRawatJalan.length; i++) {
                //     $scope.arrParameterRawatJalan[i].value = $scope.item.fungsionalRawatJalan[i].value;
                // }
				$scope.arrParameterRawatJalan.forEach(function(data){
                    debugger;
                    if (data.idParent === 246) {
                        var tmpData = {
                            "pengkajianAwal": {
                                "id": data.idParent
                            },
                            "nilai": data.id.toString()
                        }
                        dataForm.push(tmpData)
                        debugger;
                    } else {
                        var tmpData = {
                            "pengkajianAwal": {
                                "id": data.id
                            },
                            "nilai": data.value
                        }
                        dataForm.push(tmpData)
                        debugger;
                    }
				});
				$scope.arrParameterRawatInap.forEach(function(data){
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
					managePasien.updatePengkajianAwalPasien($scope.tempData).then(function(e) {
						$scope.Next();
					})
				} else {
					$scope.tempData = {  
						"pengkajianAwalBaru":{  
							"noRec": $scope.noRecPap
						},
						"detailPengkajianAwal": dataForm
					}
					managePasien.simpanPengkajianAwalPasien($scope.tempData).then(function(e) {
						$scope.Next();
					})
				}

                // save yang lama
                // $scope.item.antrianPasienDiPeriksa = {"noRec":$state.params.noRec};
                // $scope.item.pengkajianAwalBaru = {
                //     "noRec": $scope.noRecPap
                // };
                // managePasien.saveStatusFungsional($scope.item).then(function(e) {
                //     $scope.isNext = true;
                // })

                // $scope.Next = function() {
                //     $rootScope.next();
                // }
                /*$scope.item.dataRiwayat = $scope.datariwayat;

                if($scope.item.RiwayatDalamKeluarga == "Tidak")
                {
                	$scope.item.PenyakitMayor = "";
                }  

                var dataVO = delete $scope.item.attributes;
                console.log(JSON.stringify($scope.item));

                //kirim data inputan dari frontend ke server
                GetPostOnPengkajianAwal.SendData(dataVO, "PemeriksaanFisik/Genetalia")
                .then(
                	function(res) {
                		$scope.kajianAwal.riwayatKesehatan = $scope.item;
                		cacheHelper.set("kajianAwal", $scope.kajianAwal);
                		$state.go('dashboardpasien.RiwayatPsikososial', {
                			noCM: $scope.noCM
                		})
                	},
                	function(err) {
                		alert(err.data);
                	})*/
            };

        }
    ]);
});