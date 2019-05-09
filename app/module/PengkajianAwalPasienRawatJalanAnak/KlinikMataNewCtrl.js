define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('KlinikMataNewCtrl', ['ReportHelper', '$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'DateHelper', 'ManagePasien', 'CetakHelper',
        function(reportHelper, $q, $rootScope, $scope, ModelItem, $state, findPasien,  cacheHelper, dateHelper, ManagePasien, cetakHelper) {
            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Pengkajian  Keperawatan";

            $scope.dataVOloaded = true;
            $rootScope.doneLoad = false;
            $rootScope.showMenu = false;
            $scope.noCM = $state.params.noCM;
            $scope.now = new Date();

            $scope.item = {};
            $scope.item.noRec = "";
            $scope.arrKacamata = [];
            $scope.pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
            
            $scope.listKomponenUtama = [
                {
                    "id": 1,
                    "nameOD": "Conjunctiva OD",
                    "od_id": 2,
                    "nameOS": "Conjunctiva OS",
                    "os_id": 10,
                    "kategoriName": "Conjunctiva"
                },
                {
                    "id": 2,
                    "nameOD": "Cornea OD",
                    "od_id": 3,
                    "nameOS": "Cornea OS",
                    "os_id": 11,
                    "kategoriName": "Cornea"
                },
                {
                    "id": 3,
                    "nameOD": "Funduskopi OD",
                    "od_id": 8,
                    "nameOS": "Funduskopi OS",
                    "os_id": 16,
                    "kategoriName": "Funduskopi"
                },
                {
                    "id": 4,
                    "nameOD": "Iris OD",
                    "od_id": 4,
                    "nameOS": "Iris OS",
                    "os_id": 12,
                    "kategoriName": "Iris"
                },
                {
                    "id": 5,
                    "nameOD": "Pupil OD",
                    "od_id": 5,
                    "nameOS": "Pupil OS",
                    "os_id": 13,
                    "kategoriName": "Pupil"
                },
                {
                    "id": 6,
                    "nameOD": "Lensa OD",
                    "od_id": 6,
                    "nameOS": "Lensa OS",
                    "os_id": 14,
                    "kategoriName": "Lensa"
                },
                {
                    "id": 7,
                    "nameOD": "Palbera OD",
                    "od_id": 1,
                    "nameOS": "Palbera OS",
                    "os_id": 9,
                    "kategoriName": "Palbera"
                },
                {
                    "id": 8,
                    "nameOD": "Vitreous humor OD",
                    "od_id": 7,
                    "nameOS": "Vitreous humor OS",
                    "os_id": 15,
                    "kategoriName": "Vitreous humor"
                }
            ];
            $scope.pasien = {};
            $scope.kajianAwal = cacheHelper.get("kajianAwal");
            if ($scope.kajianAwal === undefined)
                $scope.kajianAwal = {};

            $q.all([findPasien.getDataMata('get-list-dataMata/OD'),
                findPasien.getDataMata('get-list-dataMata/OS'),
                findPasien.getDataMata('get-list-kategori-mata'),
                findPasien.getDataMata('get-list-streak')
            ]).then(function(data){
                if(data[0].statResponse)
                    $scope.listKacamataOD = data[0].data.data;
                if(data[1].statResponse)
                    $scope.listKacamataOS = data[1].data.data;
                if(data[2].statResponse)
                    $scope.listKategoriMata = data[2].data.data;
                if(data[3].statResponse)
                    $scope.listStreakMata = data[3].data.data;
            })
            
            function getDataCurentPasien() {
                if ($state.params.noRec === undefined || $state.params.noRec === "") return;
                findPasien.getByNoRegistrasi($state.params.noRec).then(function(data){
                    $scope.currentPasien = data.data.pasienDaftar.noRec;
                })
            };
            getDataCurentPasien();

            $scope.tempItem = {};
            // $scope.arrDataKategoriMata = [];
            $scope.addKategori = function() {
                var listRawRequired = [
                    "item.kategoriMata|k-ng-model|kategori",
                    "item.ktrngKategoriMata|ng-model|keterangan"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    var obj = {
                        "kategoriKlinikMata": $scope.item.kategoriMata,
                        "keterangan": $scope.item.ktrngKategoriMata
                    }
                    $scope.dataKategoriMata.add(obj);
                    // reset field
                    $scope.item.kategoriMata = undefined;
                    $scope.item.ktrngKategoriMata = "";

                } else {
                    ModelItem.showMessages(isValid.messages);
                }
                console.log(JSON.stringify($scope.dataKategoriMata._data))
            }

            $scope.removeDataKategori = function(e) {
                e.preventDefault();

                var grid = $("#grid").data("kendoGrid");
                $("#grid").find("input:checked").each(function(){
                    grid.removeRow($(this).closest('tr'));
                })
            };

             //-----keperluan grid RiwayatPenyakitOrObat
            $scope.dataKategoriMata = new kendo.data.DataSource({
                data: []
            });


            $scope.columnDataKategoriMata = [
                {
                    "title":"",
                    "width" : "5%",
                    "template": "<input type='checkbox' class='sel' />"
                },{
                    "field": "kategoriKlinikMata",
                    "title": "Kategori Mata",
                    "template": "#= kategoriKlinikMata.name #"
                },{
                    "field": "keterangan",
                    "title": "Keterangan"
                },{
                    command: {
                        text: "Hapus",
                        click: $scope.removeDataKategori
                    },
                    title: "&nbsp;",
                    width: "110px"
                }
            ];

            $scope.dataLaboratorium = new kendo.data.DataSource({
                data: [{
                    no: 1, "pemeriksaan": "Pemeriksaan Darah", "tanggal": "2017-03-25T12:00:00-06:30"
                },{
                    no: 2, "pemeriksaan": "Pemeriksaan Urine", "tanggal": "2017-02-28T12:00:00-06:30"
                },{
                    no: 3, "pemeriksaan": "Pemeriksaan Pankreas", "tanggal": "2015-02-15T12:00:00-06:30"
                }]
            });
            
            $scope.columnDataLaboratorium = [
                {
                    "field": "no",
                    "title": "No",
                    "width": 60
                }, {
                    "field": "pemeriksaan",
                    "title": "Pemeriksaan"
                },{
                    "field": "tanggal",
                    "title": "tanggal Pemeriksaan",
                    "template": "#= kendo.toString(kendo.parseDate(tanggal), 'dd-MM-yyyy hh:mm') #"
                }
            ];

            $scope.warna = {};
            $scope.warna.normal = "#05b72a";
            $scope.warna.tidakNormal = "#FFFFFF";
            $scope.changeStat = function(stat) {
                var target = "";
                if (stat == "Normal") {
                    $scope.warna.normal = "#05b72a";
                    $scope.warna.tidakNormal = "#FFFFFF";
                    $scope.item.isNormal = true;
                } else {
                    $scope.warna.normal = "#FFFFFF";
                    $scope.warna.tidakNormal = "#05b72a";
                    $scope.item.isNormal = false;
                }
            }
			$scope.isChecked = function(id){
				var match = false;
				for(var i=0 ; i < $scope.arrKacamata.length; i++) {
					if($scope.arrKacamata[i].id == id){
					match = true;
					}
				}
				return match;
			};
            $scope.cekKacaMata = function(data, item) {
				if(data){
					$scope.arrKacamata.push({
                        "dataMata": {
                            "id": item.id
                        },
                        "isNilai": true
                    });
				} else {
					for(var i=0 ; i < $scope.arrKacamata.length; i++) {
						if($scope.arrKacamata[i].id == item.id){
						    $scope.arrKacamata.splice(i,1);
						}
					}      
				}
            };

            $scope.Save = function() {
                $scope.listKomponenUtama.forEach(function(data){
                    if (data.keteranganOD) {
                        debugger;
                        $scope.dataKategoriMata.add({
                            "keterangan": data.keteranganOD,
                            "kategoriKlinikMata": {
                                "id": data.od_id
                            }
                        })
                    }
                    if (data.keteranganOS) {
                        debugger;
                        $scope.dataKategoriMata.add({
                            "keterangan": data.keteranganOS,
                            "kategoriKlinikMata": {
                                "id": data.os_id
                            }
                        })
                    }
                })
                if ($scope.dataKategoriMata._data.length !== 0) {
                    var dataKategoriMata = $scope.dataKategoriMata._data;
                } else {
                    var dataKategoriMata = "";
                }
                ManagePasien.saveKlinikMataBaru($scope.currentPasien, dateHelper.getPeriodeFormatted($scope.now), $scope.pegawai, $scope.arrKacamata, dataKategoriMata, $scope.item).then(function(data){
                    $scope.isNext = true;
                    $scope.isReport = true;
                })
            };

            $scope.cetak = function() {
                if($scope.noCM != undefined){
                    var fixUrlLaporan = cetakHelper.open("reporting/lapKlinikMata?noCm=" + $scope.noCM );
                        window.open(fixUrlLaporan, '', 'width=800,height=600')
                }
            }
            
        }
    ]);
});