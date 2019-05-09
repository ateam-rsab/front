define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PerencanaanPulangBaruCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'FindPasien', 'ManagePasien',
        function($rootScope, $scope, ModelItem, $state, cacheHelper, DateHelper, findPasien, ManagePasien) {
            debugger;
            $rootScope.showMenuPengkajianMedis = false;
            $rootScope.showMenu = true;
            $scope.pasien = {};
            $scope.noRecPap = window.localStorage.getItem('noRecPap');
            // ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
            //     $scope.listStatusKesadaran = data;
            // })
            $scope.item = {};

            $scope.title = "Perencanaan Pulang";
            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = true;
            $scope.isPernahDirawat = false;
            // $scope.$watch('item.PernahDirawat', function(newValue, oldValue) {
            //     if (newValue == "Ya") {
            //         $scope.isPernahDirawat = true;
            //     } else {
            //         $scope.isPernahDirawat = false;
            //         $scope.tempItem = {};
            //         $scope.datariwayat = [];
            //         $scope.dataRiwayatPenyakitOrObat.data([]);
            //     }
            // });
            $scope.kajianAwal = cacheHelper.get("kajianAwal");
            if ($scope.kajianAwal === undefined)
                $scope.kajianAwal = {};
            //waktu saat ini
            $scope.now = new Date();
            $scope.formId = 759;
            $scope.arrRencanaPulang = [];
            findPasien.getMasterDataPAP($scope.formId, $scope.noRecPap).then(function(data) {
				debugger;
				if (data.data.pengkajianAwalTransaksi) {
					$scope.noRecTransaksi = data.data.pengkajianAwalTransaksi.noRec;
					debugger;
				}
				$scope.formMaster = data.data.pengkajianAwal;
				$scope.formMaster.detail.forEach(function(frmMaster){
                    if (frmMaster.id === 760) {
                        frmMaster.detail.forEach(function(tanya){
                            if (tanya.value !== null) {
                                debugger;
                                tanya.value = parseInt(tanya.value);
                                tanya.detail.forEach(function(jawab){
                                    if (jawab.value !== null) {
                                        $scope.arrKeteranganRencana.push(jawab);
                                    }
                                    if (jawab.id === tanya.value) {
                                        debugger;
                                        $scope.arrRencanaPulang.push({
                                            // "id": jawab.id,
                                            "idParent": tanya.id,
                                            "descNilai": tanya.descNilai,
                                            "nama": tanya.nama,
                                            "value": tanya.value
                                        })
                                    }
                                })
                            } else {
                                tanya.detail.forEach(function(jawab){
                                    if (jawab.nama === "Tidak") {
                                        debugger;
                                        tanya.value = jawab.id;
                                    }
                                })
                            }
                        });
                    } 
                    if (frmMaster.id === 782) {
                        frmMaster.detail.forEach(function(tanya){
                            if (tanya.value !== null) 
                                $scope.pegawai = tanya.value;
                        })
                    } 
                })
			})
            
            $scope.klikOption = function(data, stat) {
                debugger;
                var result = $.grep($scope.arrRencanaPulang, function(e) { 
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
					$scope.arrRencanaPulang.push(tempData);
				} else {
					for (var i = 0; i < $scope.arrRencanaPulang.length; i++)
						if ($scope.arrRencanaPulang[i].idParent && $scope.arrRencanaPulang[i].idParent === data.id) { 
							$scope.arrRencanaPulang.splice(i, 1);
							break;
						}
					$scope.arrRencanaPulang.push(tempData);
				}
                console.log(JSON.stringify($scope.arrRencanaPulang));
            }
            $scope.arrKeteranganRencana = [];
            $scope.setKeterangan = function(data, stat){
                debugger;
                data.value = stat.id;
                $scope.klikOption(data, stat);
                var result = $.grep($scope.arrKeteranganRencana, function(e) { 
                    debugger;
					return e.id == stat.id;
				});
                if (result.length == 0) {
					$scope.arrKeteranganRencana.push(stat);
				} else {
					for (var i = 0; i < $scope.arrKeteranganRencana.length; i++)
						if ($scope.arrKeteranganRencana[i].id && $scope.arrKeteranganRencana[i].id === stat.id) { 
							$scope.arrKeteranganRencana.splice(i, 1);
							break;
						}
					$scope.arrKeteranganRencana.push(stat);
				}
                console.log(JSON.stringify($scope.arrKeteranganRencana));
                // $scope.arrKebutuhanDasar.forEach(function(e){
                //     debugger;
                //     if (e.idParent === data.id)
                //         e.descNilai = data.descNilai
                // })
            }
            $scope.Save = function(){
                var pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
                $scope.item.pegawai = pegawai.namaExternal;
                if ($scope.item.pegawai !== $scope.pegawai){
                    $scope.winDialog.center().open();
                } else {
                    $scope.Simpan();
                }
                
            }
            $scope.Simpan = function() {
                $scope.winDialog.close();

                var dataForm = [];
                if ($scope.item.pegawai !== null && $scope.item.pegawai !== undefined && $scope.item.pegawai !== "" ) {
                    var tmpData = {
                        "pengkajianAwal": {
                            "id": 783
                        },
                        "nilai": $scope.item.pegawai
                    }
                    dataForm.push(tmpData);
                    $scope.arrRencanaPulang.forEach(function(data){
                        var dataArray = {
                            "pengkajianAwal": {
                                "id": data.idParent
                            },
                            "nilai": data.value.toString()
                        }
                        dataForm.push(dataArray);
                    });
                    $scope.arrKeteranganRencana.forEach(function(data){
                        debugger;
                        var dataArray = {
                            "pengkajianAwal": {
                                "id": data.id
                            },
                            "nilai": data.value
                        }
                        dataForm.push(dataArray);
                    });

                }
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
            };
            // $scope.isAdaAlatImplant = false;
            // $scope.$watch('item.AlatImplant', function(newValue, oldValue) {
            //     if (newValue == "Ya") {
            //         $scope.isAdaAlatImplant = true;
            //     } else {
            //         $scope.isAdaAlatImplant = false;
            //         $scope.item.KeteranganAlatImplant = "";
            //     }
            // });

            // $scope.isAdaPenyakitMayor = false;
            // $scope.$watch('item.RiwayatDalamKeluarga', function(newValue, oldValue) {
            //     if (newValue == "Ya") {
            //         $scope.isAdaPenyakitMayor = true;
            //     } else {
            //         $scope.isAdaPenyakitMayor = false;
            //     }
            // });

            // $scope.item = {};
            // if ($scope.kajianAwal.riwayatKesehatan !== undefined) {
            //     $scope.item = $scope.kajianAwal.riwayatKesehatan;
            //     $scope.dataVOloaded = true;
            // } else
            //     ModelItem.get("RiwayatKesehatan").then(function(data) {
            //         $scope.item = data;

            //         $scope.dataVOloaded = true;
            //     }, function errorCallBack(err) {});

            // ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
            //     $scope.listYaTidak = data;
            // })

            // ModelItem.getDataDummyGeneric("StatusKomponenPenilaian", false).then(function(data) {
            //     $scope.listDiagnosis = data;
            // })

            // $scope.tempItem = {};
            // $scope.isAdaDiagnosis = true;
            // $scope.datariwayat = [];
            // $scope.addDataRiwayatPenyakitOrObat = function() {
            //     if($scope.tempItem.riwayatPenyakitOrObat != "" && $scope.tempItem.riwayatPenyakitOrObat != undefined )
            //     {
            //         for(var i=0; i < $scope.datariwayat.length; i++)
            //         {

            //             if($scope.datariwayat[i].name == $scope.tempItem.riwayatPenyakitOrObat.name)
            //             {
            //                 return;
            //             }
            //         }
            //         // alert($scope.tempItem.HubunganPasienDenganAnggotaKeluarga)
            //         var tempDatariwayat = {
            //             "name" : $scope.tempItem.riwayatPenyakitOrObat.name,
            //             "status" : $scope.tempItem.HubunganPasienDenganAnggotaKeluarga,
            //             "tanggalbs" : $scope.tempItem.TextAreaKeterangan


            //         }

            //         $scope.dataRiwayatPenyakitOrObat.add(tempDatariwayat);
            //         $scope.datariwayat.push(tempDatariwayat);
            //     }
            // }

            // $scope.removeRiwayatPenyakitOrObat = function(e) {
            //     e.preventDefault();

            //     var grid = this;
            //     var row = $(e.currentTarget).closest("tr");

            //     $scope.datariwayat = $scope.datariwayat
            //         .filter(function (el) {
            //             return el.name !== grid._data[0].name;
            //         });

            //     grid.removeRow(row);
            // };

            //-----keperluan grid RiwayatPenyakitOrObat
            // $scope.dataRiwayatPenyakitOrObat = new kendo.data.DataSource({
            //     data: []
            // });

            // $scope.columnRiwayatPenyakitOrObat = [{
            //     "field": "name",
            //     "title": "Komponen Penilaian"
            // }, {
            //     "field": "status",
            //     "title": "Status"
            // }, {
            //     "field": "tanggalbs",
            //     "title": "Keterangan"
            // }, {
            //     command: { text: "Hapus", click: $scope.removeRiwayatPenyakitOrObat },
            //     title: "&nbsp;",
            //     width: "110px"
            // }];
//dimulai dari sini servicenya
            $scope.Next = function() {
                $scope.item.dataRiwayat = $scope.datariwayat;

                if($scope.item.RiwayatDalamKeluarga == "Tidak")
                {
                    $scope.item.PenyakitMayor = "";
                }

                var dataVO = delete $scope.item.attributes;
                console.log(JSON.stringify($scope.item));
                debugger;
                //kirim data inputan dari frontend ke server
                GetPostOnPengkajianAwal.SendData(dataVO, "Pengkajian/RiwayatKesehatan")
                    .then(
                        function(res) {
                            console.log(JSON.stringify(res));
                            //eksekusi posting berhasil
                        },
                        function(err) {
                            //eksekusi kalo posting gagal
                        })
            };
        }
    ]);
});