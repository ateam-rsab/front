define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SoapCtrl', ['$q','$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'FindPasien', 'ManagePasien', 'DateHelper',
		function($q,$rootScope, $scope, ModelItem, $state, cacheHelper, findPasien, ManagePasien, dateHelper) {
			debugger;
            $rootScope.showMenu = true;
			$scope.now = new Date();
			$scope.title = "Soap";
			$scope.noCM = $state.params.noCM;
			$scope.tanggal = $state.params.tanggal;
			$scope.arrTandaVital = [
                { "name": "Berat Badan", "nilai": "", "type": "", "ket": "Kg", "noRec": "" },
                { "name": "Tekanan Darah", "nilai": "", "type": "", "ket": "mmHg", "noRec": "" },
                { "name": "Suhu", "nilai": "", "type": "numeric", "ket": "'C", "noRec": "" },
                { "name": "Nadi", "nilai": "", "type": "numeric", "ket": "x/mnt", "noRec": "" },
                { "name": "Pernapasan", "nilai": "", "type": "numeric", "ket": "x/mnt", "noRec": "" }
            ];
            ModelItem.getDataDummyGeneric("JenisDiagnosa", true, undefined, 10).then(function(data) {
                $scope.sourceJenisDiagnosisPrimer = data;
            });
			ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                    $scope.sourceDiagnosisPrimer = data;
                });

            ModelItem.getDataDummyGeneric("DiagnosaTindakan", true, true, 10).then(function(data) {
                $scope.sourceTindakanPrimer = data;
            });

            $q.all([
                findPasien.getByNoCM($scope.noCM)
            ]).then(function(data) {
                if (data[0].statResponse) {

                    $rootScope.currentPasien = data[0].data.data;
                    $scope.pasien = data[0].data.data;
                }

                //ambil data current pasien seusia no cm dan tanggal     
                getDataCurentPasien();
            });

            var pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
            	$scope.datauser = pegawai.id
                findPasien.getTandaVital($state.params.noRec).then(function(e) {
                    debugger;
                    if (e.data.data.dataFound) {

                        $scope.item.PapTandaVital = e.data.data.papTandaVital;
                        $scope.item.noRec = $scope.item.PapTandaVital.noRec;

                        $scope.arrTandaVital = ModelItem.setTandaVitalCurrentData($scope.item.PapTandaVital.papDataTandaVitalSet, $scope.arrTandaVital);
                        var arr = $scope.item.PapTandaVital.gcs.split(';');
                        $scope.GCS.E = arr[0].substring(1);
                        $scope.GCS.M = arr[1].substring(1);
                        $scope.GCS.V = arr[2].substring(1);
                        $scope.item.kesadaran = $scope.listStatusKesadaran[1];
                    }
                });

			$rootScope.showMenu = false;
			$rootScope.showMenuDetail = false;
			$scope.kajianAwal = cacheHelper.get("kajianAwal");
			if ($scope.kajianAwal === undefined)
				$scope.kajianAwal = {};
			ModelItem.get("Soap").then(function(data) {
				$scope.item = data;

				$scope.item.Subject = "Keluhan Utama :" + $scope.kajianAwal.keluhanUtama;
				$scope.item.Subject += "\nKeluhan Tambahan : ";
				for (var key in $scope.kajianAwal.listKeluhan) {
					if ($scope.kajianAwal.listKeluhan.hasOwnProperty(key)) {
						var element = $scope.kajianAwal.listKeluhan[key];
						$scope.item.Subject += "\n" + element.keluhan;
					}
				}
				$scope.item.Object = $scope.kajianAwal.diagnosisKeperawatan;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			// $scope.kajianAwal.keluhanUtama = $scope.item.keluhanUtama;
			// $scope.kajianAwal.listKeluhan = $scope.listKeluhan;
			$scope.Next = function() {
				$state.go('dashboardpasien.SkriningNyeri', {
					noCM: $scope.noCM,
					noRec: $state.params.noRec
				});
			};
            debugger;
			function getListPelayananRawatInap(data) {
                debugger;
                findPasien.getPelayananRawatInap(data.noRecAntrian).then(function(data) {
                    var temp = [];

                    for (var key in data.data) {
                        if (data.data.hasOwnProperty(key)) {
                            var element = data.data[key];
                            var jam = element.tanggal.split(' ')[1];
                            var arr = element.tanggal.split(' ')[0].split('/');
                            element.tanggal = new Date(arr[2], arr[1] - 1, arr[0]);
                            element.jam = jam;
                            temp.push(element);
                        }
                    }


                    // temp.push({
                    //     tanggal: new Date(),
                    //     display: moment().format('DD MMM')
                    // });
                    temp = _.sortBy(temp, function(num) {
                        var arr = num.tanggal;
                        return (parseInt(arr.getDate()) + parseInt(arr.getMonth()) * 31 + parseInt(arr.getYear()) * 365) * -1;
                    });
                    $scope.listTimeLine = temp;
                    $scope.selectedDate = data.data[data.data.length - 1];
                });

            }

			$scope.isKembali = false;

			/*----------------------------*/
			if ($state.params.noRegister !== undefined) {
                findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
                    $scope.item.pasien = data.data.pasien;
                    $scope.item.pasien.noRec = data.data.noRec;
                    findPasien.getDiagnosaNyNoRec(data.data.noRec).then(function(data) {

                        if (data.data.data.DiagnosaPasien === undefined) return;
                        if (data.data.data.DiagnosaPasien.length === 0) return;
                        $scope.listDiagnosa = ModelItem.beforePost(data.data.data.DiagnosaPasien[0].diagnosis, true);
                        $scope.item.noRec = data.data.data.DiagnosaPasien[0].noRec;
                        var temp = [];
                        var i = 1;
                        for (var key in $scope.listDiagnosa) {
                            if ($scope.listDiagnosa.hasOwnProperty(key)) {
                                var element = $scope.listDiagnosa[key];
                                temp.push({
                                    jenisDiagnosis: element.jenisDiagnosa,
                                    kdDiagnosa: element.diagnosa.kdDiagnosa,
                                    namaDiagnosa: element.diagnosa.namaDiagnosa,
                                    id: element.diagnosa.id,
                                    no: i
                                });
                                i++;
                            }
                        }
                        $scope.dataDiagnosisPrimer = new kendo.data.DataSource({
                            data: temp
                        });
                        $scope.isLoadingDiagnosis = false;
                    });
                });

            } else {
                findPasien.getDiagnosa($scope.noCM, $state.params.tanggal).then(function(data) {

                    if (data.data.data.DiagnosaPasien === undefined) return;
                    if (data.data.data.DiagnosaPasien.length === 0) return;
                    $scope.listDiagnosa = ModelItem.beforePost(data.data.data.DiagnosaPasien[0].diagnosis, true);
                    $scope.item.noRec = data.data.data.DiagnosaPasien[0].noRec;
                    var temp = [];
                    var i = 1;
                    for (var key in $scope.listDiagnosa) {
                        if ($scope.listDiagnosa.hasOwnProperty(key)) {
                            var element = $scope.listDiagnosa[key];
                            temp.push({
                                jenisDiagnosis: element.jenisDiagnosa,
                                kdDiagnosa: element.diagnosa.kdDiagnosa,
                                namaDiagnosa: element.diagnosa.namaDiagnosa,
                                id: element.diagnosa.id,
                                no: i
                            });
                            i++;
                        }
                    }
                    $scope.dataDiagnosisPrimer = new kendo.data.DataSource({
                        data: temp
                    });
                    $scope.isLoadingDiagnosis = false;
                });
            }

				$scope.isLoadingDiagnosis = true;
				$scope.removeRiwayatDiagnosa = function(e) {
                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                var selectedItem = grid.dataItem(row);

                $scope.dataDiagnosisPrimer.remove(selectedItem);
            };
                //load diagnosa inputan
                $scope.columnDiagnosisPrimer = [{
                    "field": "id",
                    "title": "no",
                    "width": 50
                }, {
                    "field": "kode",
                    "title": "Kode ICD 10"
                }, {
                    "field": "name",
                    "title": "ICD 10"
                }];
                ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                    $scope.sourceDiagnosisPrimer = data;
                });
                findPasien.getDiagnosa
                    //-----keperluan grid data diagnosis primer
                $scope.dataDiagnosisPrimer = new kendo.data.DataSource({
                    data: []
                });

                $scope.columnDiagnosisPrimer = [{
                    "field": "no",
                    "title": "No",
                    "width": 50
                }, {
                    "field": "jenisDiagnosis.jenisDiagnosa",
                    "title": "Jenis Diagnosis",
                    "width": 150
                }, {
                    "field": "kdDiagnosa",
                    "title": "Kode ICD 10",
                    "width": 150
                }, {
                    "field": "namaDiagnosa",
                    "title": "ICD 10"
                }, {
                	command: {
                    text: "Hapus",
                    click: $scope.removeRiwayatDiagnosa
                	},
                	title: "&nbsp;",
                	width: "110px"
                }];
            

                $scope.addDataDiagnosisPrimer = function() {
                	debugger;
                    var any = _.filter($scope.dataDiagnosisPrimer._data, {
                        kdDiagnosa: $scope.item.diagnosisPrimer.kdDiagnosa
                    });
                    var temp = [];
                    for (var key in $scope.dataDiagnosisPrimer._data) {
                        if ($scope.dataDiagnosisPrimer._data.hasOwnProperty(key)) {
                            var element = $scope.dataDiagnosisPrimer._data[key];
                            if (element.jenisDiagnosis != undefined && element.jenisDiagnosis.jenisDiagnosa === 'DIAGNOSA UTAMA')
                                return;
                        }
                    }

                    if (any.length === 0) {
                        $scope.item.diagnosisPrimer.no = $scope.dataDiagnosisPrimer._data.length + 1;
                        $scope.item.diagnosisPrimer.jenisDiagnosis = $scope.item.jenisDiagnosis;
                        $scope.dataDiagnosisPrimer.add($scope.item.diagnosisPrimer);
                        $scope.item.ambilDiagnosa =  $scope.dataDiagnosisPrimer
                    }
                }

            $scope.removeDataDiagnosisPrimer = function() {
            	debugger;

                $scope.dataDiagnosisPrimer.data([]);
            };
                /*---------------------------*/
                 /*++++++++++++++++++++++++++++*/
                  $scope.removeRiwayatPenyakitOrObat = function(e) {
                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                var selectedItem = grid.dataItem(row);

                $scope.dataTindakanPrimer.remove(selectedItem);
            };

                $scope.columnTindakanPrimer = [{
                "field": "no",
                "title": "No"
            }, {
                "field": "kdDiagnosaTindakan",
                "title": "Kode ICD 9 CM"
            }, {
                "field": "namaDiagnosaTindakan",
                "title": "Nama ICD 9 CM"
            }, {
                command: {
                    text: "Hapus",
                    click: $scope.removeRiwayatPenyakitOrObat
                },
                title: "&nbsp;",
                width: "110px"
            }];

            $scope.dataTindakanPrimer = new kendo.data.DataSource({
                data: []
            })
            $scope.addDataTindakanPrimer = function() {
            	debugger;
                var any = [];
                //  = _.filter($scope.dataDiagnosisPrimer._data, {
                //     kdDiagnosaTindakan: $scope.item.diagnosisPrimer.kdDiagnosaTindakan
                // });
                if (any.length === 0) {
                    $scope.item.tindakanPrimer.no = $scope.dataDiagnosisPrimer._data.length + 1;
                    $scope.dataTindakanPrimer.add($scope.item.tindakanPrimer);
                    $scope.item.ambilTindakan = $scope.dataTindakanPrimer
                }
            }

            $scope.removeDataTindakanPrimer = function() {
            	debugger;

                $scope.dataTindakanPrimer.data([]);
            };
            /*++++++++++++++++++++++++++++++*/
			$scope.Save = function() {
				debugger;
				var data = [];
				// var datatindakan = [];

    //                 for (var key in $scope.item.ambilDiagnosa._data) {
    //                     if ($scope.item.ambilDiagnosa._data.hasOwnProperty(key)) {
    //                         var element = $scope.item.ambilDiagnosa._data[key];
    //                         if (element.id !== undefined) {

    //                             data.push({
    //                                 diagnosa: element,
    //                                 jenisDiagnosa: element.jenisDiagnosis
    //                             });
    //                         }
    //                     }
    //                 }
    //                 for (var key in $scope.item.ambilTindakan._data) {
    //                     if ($scope.item.ambilTindakan._data.hasOwnProperty(key)) {
    //                         var element = $scope.item.ambilTindakan._data[key];
    //                         if (element.id !== undefined) {

    //                             datatindakan.push({
    //                                 diagnosaTindakan: element,
    //                                 id: element.id
    //                             });
    //                         }
    //                     }
    //                 }
				var ysysys = $scope.datauser
				$scope.pasienDaftar = {"noRec" : $state.params.noRec}
				$scope.pegawaiDaftar = {"id" : $scope.datauser} 
				// $scope.item.diagnosaPasien = {
    //                 "noRec": $state.params.noRec,
				// 	"tanggalPendaftaran" : dateHelper.toTimeStamp($scope.now),
				// 	"diagnosis" : data,
    //                 "pasien" : $scope.pasien
				// }
				// $scope.item.diagnosaTindakanPasien = {
    //                 "noRec": $state.params.noRec,
				// 	"tanggalPendaftaran" : dateHelper.toTimeStamp($scope.now),
				// 	"diagnosisTindakan" : datatindakan,
    //                 "pasien" : $scope.pasien
				// }
				/*$scope.item.diagnosaPasien = ModelItem.setObjCollectionForCheckbox($scope.listStatusTempatTinggal, $scope.arrStatusTempatTinggal, "diagnosis");*/
				ManagePasien.saveSOAP(ModelItem.beforePost($scope.pasienDaftar), dateHelper.toTimeStamp($scope.now), ModelItem.beforePost($scope.item),$scope.pegawaiDaftar, {
                        diagnosis: data,
                        noRec: $state.params.noRec
                    }).then(function(e) {
					debugger;
					getListPelayananRawatInap();
                });
			}
		}
	]);
});