define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PemantauanAnestesiLokalCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien',
		function($rootScope, $scope, ModelItem, $state, findPasien) {
			$scope.cek = "PemantauanAnestesiLokal";
			$scope.dataVOloaded = true;

			$scope.now = new Date();

			$scope.item = {};
			$scope.tempItem = {};

            ModelItem.get("Pasien/PemantauanAnestesiLokal").then(function(data) {
                $scope.item = data;
                findPasien.getDataPemantauanAnestesiLokal($state.params.noCM, $state.params.tanggal).then(function(e) {
                    $scope.item = e.data;
                    if (e.data.status === false)
                        $scope.isShowForm = true;
                });
                $rootScope.dataVOloaded = true;
            }, function errorCallBack(err) {});

			var arrColumnWaktuPemantauan= [{
				"field": "tekananDarah",
				"title": "Tekanan Darah (mmhg)",
                "width": 180
			}, {
				"field": "nadi",
				"title": "Nadi (x/mnt)",
                "width": 100
			}, {
				"field": "suhu",
				"title": "Suhu ('C)",
                "width": 100
			}, {
				"field": "pernafasan",
				"title": "pernafasan",
                "width": 120
			}, {
				"field": "waktuPemantauan",
				"title": "Waktu Pemantauan",
                "width": 150
			},{
		        command: { text: "Hapus", click: $scope.removeDataWaktuPemantauan },
		        title: "&nbsp;",
		        width: "80px"
		    }];
			
		    $scope.sourceGridWaktuPemantauan = [];

			ModelItem.getGridOption($scope.sourceGridWaktuPemantauan, arrColumnWaktuPemantauan, true).then(function(data) {
				$scope.mainGridOptions = data;
			})

			ModelItem.getDataDummyGeneric("StatusNormalAbnormal", false).then(function(data) {
				$scope.listNormalAbnormal = data;
			})

			ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
				$scope.listYaTidak = data;
			})

			ModelItem.getDataDummyGeneric("Pasien/PemantauanAnestesiLokal/DataWaktuPemantauan", false).then(function(data) {
				$scope.listWaktuPemantauan = data;
			})

			$scope.isDiencerkan = false;
            $scope.$watch('item.diencerkan', function(newValue, oldValue) {
                if (newValue == "Ya") {
                    $scope.isDiencerkan = true;
                } else {
                    $scope.isDiencerkan = false;
                    $scope.item.jenisPengencer = "";
                }
            });

            $scope.addDataWaktuPemantauan = function() {

				var dataWaktuPemantauan = {
					"tekananDarah" : $scope.tempItem.tekananDarah,
					"suhu" : $scope.tempItem.Suhu,
					"nadi" :  $scope.tempItem.Nadi,
					"pernafasan" :  $scope.tempItem.Pernafasan,
					"waktuPemantauan" :  $scope.tempItem.waktuPemantauan.name
				}

				$scope.mainGridOptions.dataSource.add(dataWaktuPemantauan);
				$scope.tempItem = {};

			}

			$scope.removeDataWaktuPemantauan = function(e) {
				e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");

			    var selectedItem = grid.dataItem(row);

			    grid.dataSource.remove(selectedItem);
			};

			$scope.Save = function()
			{

				$scope.item.dataWaktuPemanatauan = $scope.mainGridOptions.dataSource._data;
				console.log(JSON.stringify($scope.item));
            	//hasilnya :
				/*
					{
					    "jalanNafas": {
					        "id": 2,
					        "name": "Abnormal",
					        "$$hashKey": "object:155"
					    },
					    "obatAnestesi": "obat lokal",
					    "dosisObat": "aaaa",
					    "jam": "2016-07-03T17:30:00.000Z",
					    "adrenalin": {
					        "id": 1,
					        "name": "Tidak",
					        "$$hashKey": "object:162"
					    },
					    "dosis": "bbb",
					    "diencerkan": {
					        "id": 1,
					        "name": "Tidak",
					        "$$hashKey": "object:162"
					    },
					    "jenisPengencer": "",
					    "lokasi": "ccccc",
					    "dataWaktuPemanatauan": [
					        {
					            "tekananDarah": "112/80 ",
					            "suhu": "213",
					            "nadi": "12",
					            "pernafasan": "21",
					            "waktuPemantauan": "45"
					        },
					        {
					            "tekananDarah": "115/76 ",
					            "suhu": "44",
					            "nadi": "12",
					            "pernafasan": "22",
					            "waktuPemantauan": "105"
					        }
					    ]
					}
				*/
            	
			}

		}
	]);
});