define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SkriningGiziDewasaRevCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper','ManagePhp',
		function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper,ManagePhp) 
		{
			
			$scope.dataForm = {};
			var isNotClick = true;
			$scope.isRawatInap = window.isRawatInap;

			$rootScope.showMenuPengkajianMedis = false;
			$scope.noCM = $state.params.noCM;
			$rootScope.showMenu = true;
			$rootScope.showMenuDetail = false;
			$scope.pasien = {};
			$scope.item = {};
			var date = new Date();
			/*$scope.item.tglInputData = date;*/
			$scope.now = date;
			var norecPap = ''
            loadCache()
            function loadCache (){
                var cache = cacheHelper.get('noRecPap');
                if (cache != undefined){
					norecPap =cache
					$scope.noRecPap =cache

                }
            }

			$scope.skriningGiziDewasa = [
                { "name": "Berat Badan", "nilai": "", "type": "numeric", "ket": "Kg", "noRec": "" },
                { "name": "Tinggi Badan", "nilai": "", "type": "numeric", "ket": "Cm", "noRec": "" },
                { "name": "Lingkar Kepala", "nilai": "", "type": "numeric", "ket": "Cm", "noRec": "" },
                { "name": "Index Masa Tubuh", "nilai": "", "type": "", "ket": "Kg / m2", "noRec": "" },
                { "name": "Status Gizi", "nilai": "", "type": "", "ket": "", "noRec": "" }
            ];
		            
			// ModelItem.setActiveMenu($rootScope.listActive, "SkriningGiziDewasa");
			
			// $scope.noRecPap = window.localStorage.noRecPap;
			$scope.formId = 1;
			$scope.arrPengkajianSkrining = [];
			$scope.arrPengkajianMST = [];
			$scope.skrining = {};
			$scope.mst = {};
			$scope.opsiYaTidak = [
				// maipulasi data detil skrining obstetri
				{"id": 67,"nama": "Tidak","descNilai": "0","value": null},
				{"id": 66,"nama": "Ya","descNilai": "1","value": null}
			]			

			$scope.klikChange = function(data, stat) {
				
				// $scope.pasienDewasa.perluKonsultasi.detail.forEach(function(items){
				// 	items.value = null
				// })
				// stat.value = "true";
				var result = $.grep($scope.arrPengkajianSkrining, function(e) { 
					return e.idParent == data.id;
				});
				var tempData = {
					"id": stat.id,
					"idParent": data.id,
					"descNilai": stat.descNilai,
					"namaDetail": stat.namaDetail,
					"value": "true"
				}
				if (result.length == 0) {
					
					$scope.arrPengkajianSkrining.push(tempData);
					// console.log(JSON.stringify($scope.arrayDetilPengkajianAwal));
				} else {
					for (var i = 0; i < $scope.arrPengkajianSkrining.length; i++)
						if ($scope.arrPengkajianSkrining[i].idParent && $scope.arrPengkajianSkrining[i].idParent === data.id) { 
							$scope.arrPengkajianSkrining.splice(i, 1);
							break;
						}
					$scope.arrPengkajianSkrining.push(tempData);
					console.log(JSON.stringify($scope.arrPengkajianSkrining));
					
				}
			}
			

            $scope.listSoalSkrining = [
            	{
            		"id":1,
            		"nama": "Apakah pasien mengalami penurunan berat badan yang tidak diinginkan dalam 3 bulan terakhir?",
            		"detail":[
            			{
            				"id": 1,
            				"nama": "Tidak ada penurunan berat badan",
            				"descNilai": "0"
            			},
            			{
            				"id": 2,
            				"nama": "Tidak yakin / tidak tahu",
            				"descNilai": "2"
            			},
            			{
            				"id": 3,
            				"nama": "Jika ya, berapa penurunan berat badan tersebut?",
            				"detail":[
            					{
            						"id": 31,
            						"nama": "1-5 kg",
            						"descNilai": "1"
            					},
            					{
            						"id": 32,
            						"nama": "6-10 kg",
            						"descNilai": "2"
            					},
            					{
            						"id": 33,
            						"nama": "11-15 kg",
            						"descNilai": "3"
            					},
            					{
            						"id": 34,
            						"nama": ">= 15 kg",
            						"descNilai": "4"
            					}
            				]
            			}
            		]
            	},
            	{
            		"id": 2,
            		"nama" : "Apakah asupan makan berkurang karena tidak nafsu makan?",
            		"detail": [
            			{
            				"id": 1,
            				"nama": "Ya",
            				"descNilai": "1"
            			},
            			{
            				"id": 2,
            				"nama": "Tidak",
            				"descNilai": "0"
            			}
            		]
            	},
            	{
            		"id": 3,
            		"nama": "Apakah perlu konsultsi gizi?",
            		"detail": [
            			{
            				"id": 1,
            				"nama": "Ya",
            				"descNilai": "1"
            			},
            			{
            				"id": 2,
            				"nama": "Tidak",
            				"descNilai": "0"
            			}
            		]
            	}
            ]

            $scope.listSoalMST = [
            	{
            		"id": 1,
            		"nama": "Apakah asupan makanan berkurang karena tidak nafsu makan?"
            	},
            	{
            		"id": 2,
            		"nama" : "Ada gangguan metabolisme? (DM, gangguan fungsi thyroid, infeksi kronis seperti TB, HIV/AIDS, Lupus, lain-lain, sebutkan.........)"
            	},
            	{
            		"id": 3,
            		"nama": "Apakah ada pertambahan berat badan yang kurang atau lebih selama kehamilan?"
            	},
            	{
            		"id": 4,
            		"nama": "NIlai Hb < 10 g/dl atau Hct < 30%"
            	}
            ]

            $scope.setSoalSkrining = function(){
            	$scope.listSoalSkrining.forEach(function(items){
            		if(items.id == 1){
            			$scope.skrining.turunBeratBadan = items
            		}
            		if(items.id == 2){
            			$scope.skrining.tidakNafsuMakan = items
            		}
            		if(items.id == 3){
            			$scope.skrining.perluKonsultasi = items
            		}
            	})
            }
            $scope.setSoalSkrining();

            $scope.setSoalMST = function(){
            	$scope.listSoalMST.forEach(function(items){
            		if(items.id == 1){
            			$scope.mst.asupanMakanan = items
            		}
            		if(items.id == 2){
            			$scope.mst.metabolisme = items
            		}
            		if(items.id == 3){
            			$scope.mst.tambahBeratBadan = items
            		}
            		if(items.id == 4){
            			$scope.mst.nilaiHB = items
            		}
            	})
            }
            $scope.setSoalMST();

            var getTotalSkrining = function() {
				var skorAwal = 0;
				$scope.arrPengkajianSkrining.forEach(function(data){
					skorAwal += parseInt(data.descNilai);
				})
				$scope.dataForm.totalSkorSkrining = skorAwal
			}
			var getTotalMST = function() {
				var skorAwal = 0;
				$scope.arrPengkajianMST.forEach(function(data){
					skorAwal += parseInt(data.descNilai);
				})
				$scope.dataForm.totalSkorMST = skorAwal
			}

            $scope.getdata=function(){
                var objectfk = "SGD";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
				ManagePhp.getData("rekam-medis/get-data-rekam-medis?noregistrasifk="+noregistrasifk+'&objectfk='+objectfk
				+ '&riwayatfk=' + norecPap).then(function(e) {
                    $scope.dataSkrining = e.data.data;
                    if($scope.dataSkrining.length != 0){
	                    for (var i = 0; i < $scope.dataSkrining.length; i++) {
	                        if($scope.dataSkrining[i].objectfk == "SGD-000001"){
	                            $scope.noRecBB = $scope.dataSkrining[i].norec
	                            $scope.skriningGiziDewasa[0].nilai = $scope.dataSkrining[i].nilai
	                        }
	                        if($scope.dataSkrining[i].objectfk == "SGD-000002"){
	                            $scope.noRecTB = $scope.dataSkrining[i].norec
	                            $scope.skriningGiziDewasa[1].nilai = $scope.dataSkrining[i].nilai
	                        }
	                        if($scope.dataSkrining[i].objectfk == "SGD-000003"){
	                            $scope.noRecLK = $scope.dataSkrining[i].norec
	                            $scope.skriningGiziDewasa[2].nilai = $scope.dataSkrining[i].nilai
	                        }
	                        if($scope.dataSkrining[i].objectfk == "SGD-000004"){
	                            $scope.noRecIMT = $scope.dataSkrining[i].norec
	                            $scope.skriningGiziDewasa[3].nilai = $scope.dataSkrining[i].nilai
	                        }
	                        if($scope.dataSkrining[i].objectfk == "SGD-000005"){
	                            $scope.noRecSG = $scope.dataSkrining[i].norec
	                            $scope.skriningGiziDewasa[4].nilai = $scope.dataSkrining[i].nilai
	                        }
	                        if($scope.dataSkrining[i].objectfk == "SGD-000006"){
	                            $scope.noRecTurunBeratBadan= $scope.dataSkrining[i].norec;
	                            $scope.turunBeratBadan = $scope.dataSkrining[i].nilai;
	                        }
	                        if($scope.dataSkrining[i].objectfk == "SGD-000007"){
	                            $scope.noRecTidakNafsuMakan = $scope.dataSkrining[i].norec;
	                            $scope.tidakNafsuMakan = $scope.dataSkrining[i].nilai;
	                        }
	                        if($scope.dataSkrining[i].objectfk == "SGD-000008"){
	                            $scope.noRecPerluKonsultasi = $scope.dataSkrining[i].norec;
	                            $scope.perluKonsultasi = $scope.dataSkrining[i].nilai;
	                        }
	                        if($scope.dataSkrining[i].objectfk == "SGD-000009"){
	                            $scope.noRecMstSatu = $scope.dataSkrining[i].norec;
	                            $scope.dataMstSatu = $scope.dataSkrining[i].nilai;
	                        }
	                        if($scope.dataSkrining[i].objectfk == "SGD-000010"){
	                            $scope.noRecMstDua = $scope.dataSkrining[i].norec;
	                            $scope.dataMstDua = $scope.dataSkrining[i].nilai;
	                        }
	                        if($scope.dataSkrining[i].objectfk == "SGD-000011"){
	                            $scope.noRecMstTiga = $scope.dataSkrining[i].norec;
	                            $scope.dataMstTiga = $scope.dataSkrining[i].nilai;
	                        }
	                        if($scope.dataSkrining[i].objectfk == "SGD-000012"){
	                            $scope.noRecMstEmpat = $scope.dataSkrining[i].norec;
	                            $scope.dataMstEmpat = $scope.dataSkrining[i].nilai;
	                        }
	                    }
	                }
	                if($scope.turunBeratBadan == "1"){
	                    $scope.item.turunBeratBadan = 1
	                    var temp = {
	                    	"id": 1,
							"idParent": 1,
							"descNilai": '0'
	                    }
	               		$scope.arrPengkajianSkrining.push(temp)
	                }
	                if($scope.turunBeratBadan == "2"){
	                    $scope.item.turunBeratBadan = 2
	                    var temp = {
	                    	"id": 2,
							"idParent": 1,
							"descNilai": '2'
	                    }
	                    $scope.arrPengkajianSkrining.push(temp)
	                }
	                if($scope.turunBeratBadan == "31"){
	                    $scope.item.turunBeratBadan = 31
	                    var temp = {
	                    	"id": 31,
							"idParent": 1,
							"descNilai": '1'
	                    }
	                    $scope.arrPengkajianSkrining.push(temp)
	                }
	                if($scope.turunBeratBadan == "32"){
	                    $scope.item.turunBeratBadan = 32
	                    var temp = {
	                    	"id": 32,
							"idParent": 1,
							"descNilai": '2'
	                    }
	                    $scope.arrPengkajianSkrining.push(temp)
	                }
	                if($scope.turunBeratBadan == "33"){
	                    $scope.item.turunBeratBadan = 33
	                    var temp = {
	                    	"id": 33,
							"idParent": 1,
							"descNilai": '3'
	                    }
	                    $scope.arrPengkajianSkrining.push(temp)
	                }
	                if($scope.turunBeratBadan == "34"){
	                    $scope.item.turunBeratBadan = 34
	                    var temp = {
	                    	"id": 34,
							"idParent": 1,
							"descNilai": '4'
	                    }
	                    $scope.arrPengkajianSkrining.push(temp)
	                }
	                if($scope.tidakNafsuMakan == "1"){
	                    $scope.item.tidakNafsuMakan = 1
	                    var temp = {
	                    	"id": 1,
							"idParent": 2,
							"descNilai": '1'
	                    }
	                    $scope.arrPengkajianSkrining.push(temp)
	                }
	                if($scope.tidakNafsuMakan == "2"){
	                    $scope.item.tidakNafsuMakan = 2
	                    var temp = {
	                    	"id": 2,
							"idParent": 2,
							"descNilai": '0',
	                    }
	                    $scope.arrPengkajianSkrining.push(temp)
	                }
	                if($scope.perluKonsultasi == "1"){
	                    $scope.item.perluKonsultasi = 1
	                    var temp = {
	                    	"id": 1,
							"idParent": 3,
							"descNilai": '1'
	                    }
	                    $scope.arrPengkajianSkrining.push(temp)
	                }
	                if($scope.perluKonsultasi == "2"){
	                    $scope.item.perluKonsultasi = 2
	                    var temp = {
	                    	"id": 1,
							"idParent": 3,
							"descNilai": '0'
	                    }
	                    $scope.arrPengkajianSkrining.push(temp)
	                }
	                if($scope.dataMstSatu == "66"){
	                    $scope.item.dataMstSatu = 66
	                    var temp = {
	                    	"id": 66,
							"idParent": 1,
							"descNilai": '1'
	                    }
	                    $scope.arrPengkajianMST.push(temp)
	                }

	                if($scope.dataMstSatu == "67"){
	                    $scope.item.dataMstSatu = 67
	                    var temp = {
	                    	"id": 67,
							"idParent": 1,
							"descNilai": '0'
	                    }
	                    $scope.arrPengkajianMST.push(temp)
	                }
	                if($scope.dataMstDua == "66"){
	                    $scope.item.dataMstDua = 66
	                    var temp = {
	                    	"id": 66,
							"idParent": 2,
							"descNilai": '1'
	                    }
	                    $scope.arrPengkajianMST.push(temp)
	                }
	                if($scope.dataMstDua == "67"){
	                    $scope.item.dataMstDua = 67
	                    var temp = {
	                    	"id": 67,
							"idParent": 2,
							"descNilai": '0'
	                    }
	                    $scope.arrPengkajianMST.push(temp)
	                }
	                if($scope.dataMstTiga == "66"){
	                    $scope.item.dataMstTiga = 66
	                    var temp = {
	                    	"id": 66,
							"idParent": 3,
							"descNilai": '1'
	                    }
	                    $scope.arrPengkajianMST.push(temp)
	                }
	                if($scope.dataMstTiga == "67"){
	                    $scope.item.dataMstTiga = 67
	                    var temp = {
	                    	"id": 67,
							"idParent": 3,
							"descNilai": '0'
	                    }
	                    $scope.arrPengkajianMST.push(temp)
	                }
	                if($scope.dataMstEmpat == "66"){
	                    $scope.item.dataMstEmpat = 66
	                    var temp = {
	                    	"id": 66,
							"idParent": 4,
							"descNilai": '1'
	                    }
	                    $scope.arrPengkajianMST.push(temp)
	                }
	                if($scope.dataMstEmpat == "67"){
	                    $scope.item.dataMstEmpat = 67
	                    var temp = {
	                    	"id": 67,
							"idParent": 4,
							"descNilai": '0'
	                    }
	                    $scope.arrPengkajianMST.push(temp)
	                }
					getTotalSkrining();
					getTotalMST();
                })
				
            };
            $scope.getdata();

			// $scope.arrayDetilPengkajianAwal = [];
			$scope.cekTotalSkor = function(data, stat) {
				var result = $.grep($scope.arrPengkajianSkrining, function(e) { 
					return e.idParent == data.id;
				});
				var tempData = {
					"id": stat.id,
					"idParent": data.id,
					"descNilai": stat.descNilai,
					"namaDetail": stat.namaDetail,
					"value": "true"
				}
				if (result.length == 0) {
					
					$scope.arrPengkajianSkrining.push(tempData);
					console.log(JSON.stringify($scope.arrPengkajianSkrining));
				} else {
					for (var i = 0; i < $scope.arrPengkajianSkrining.length; i++)
						if ($scope.arrPengkajianSkrining[i].idParent && $scope.arrPengkajianSkrining[i].idParent === data.id) { 
							$scope.arrPengkajianSkrining.splice(i, 1);
							break;
						}
					$scope.arrPengkajianSkrining.push(tempData);
					console.log(JSON.stringify($scope.arrPengkajianSkrining));
					
				}

				// $scope.arrayDetilPengkajianAwal.forEach(function(data){
				// 	skor += parseInt(data.descNilai);
				// })
				getTotalSkrining();
			}
			$scope.cekSkorMST = function(data, stat) {
				var result = $.grep($scope.arrPengkajianMST, function(e) { 
					return e.idParent == data.id;
				});
				var tempData = {
					"id": stat.id,
					"idParent": data.id,
					"descNilai": stat.descNilai,
					"namaDetail": stat.namaDetail,
					"value": "true"
				}
				if (result.length == 0) {
					
					$scope.arrPengkajianMST.push(tempData);
					console.log(JSON.stringify($scope.arrPengkajianMST));
				} else {
					for (var i = 0; i < $scope.arrPengkajianMST.length; i++)
						if ($scope.arrPengkajianMST[i].idParent && $scope.arrPengkajianMST[i].idParent === data.id) { 
							$scope.arrPengkajianMST.splice(i, 1);
							break;
						}
					$scope.arrPengkajianMST.push(tempData);
					console.log(JSON.stringify($scope.arrPengkajianMST));
					
				}
				getTotalMST();
			}

            // simpan data
			$scope.Save = function() {
				var dataForm = [
                    {
                        norec: $scope.noRecBB,
                        objectfk: "SGD-000001",
                        nilai: $scope.skriningGiziDewasa[0].nilai,
                        satuan: "Kg",
                        jenisobject : "textbox"
                    },
                    {
                        norec: $scope.noRecTB,
                        objectfk: "SGD-000002",
                        nilai: $scope.skriningGiziDewasa[1].nilai,
                        satuan: "Cm",
                        jenisobject: 'textbox'
                    },
                    {
                        norec: $scope.noRecLK,
                        objectfk: "SGD-000003",
                        nilai: $scope.skriningGiziDewasa[2].nilai,
                        satuan: "Cm",
                        jenisobject: "textbox"
                    },
                    {
                        norec: $scope.noRecIMT,
                        objectfk: "SGD-000004",
                        nilai: $scope.skriningGiziDewasa[3].nilai,
                        satuan: "Kg / m2",
                        jenisobject: 'textbox'
                    },
                    {
                        norec: $scope.noRecSG,
                        objectfk: "SGD-000005",
                        nilai: $scope.skriningGiziDewasa[4].nilai,
                        satuan: "-",
                        jenisobject: "textbox"
                    }
                ]
				$scope.arrPengkajianSkrining.forEach(function(data){
					if(data.idParent == 1){
						var dataSoal = {
							norec: $scope.noRecTurunBeratBadan,
	                        objectfk: "SGD-000006",
	                        nilai: data.id.toString(),
	                        satuan: "-",
	                        jenisobject : "radio button"
						}
					}
					if(data.idParent == 2){
						var dataSoal = {
							norec: $scope.noRecTidakNafsuMakan,
	                        objectfk: "SGD-000007",
	                        nilai: data.id.toString(),
	                        satuan: "-",
	                        jenisobject : "radio button"
						}
					}
					if(data.idParent == 3){
						var dataSoal = {
							norec: $scope.noRecPerluKonsultasi,
	                        objectfk: "SGD-000008",
	                        nilai: data.id.toString(),
	                        satuan: "-",
	                        jenisobject : "radio button"
						}
					}
					dataForm.push(dataSoal)
				})

				$scope.arrPengkajianMST.forEach(function(data){
					if(data.idParent == 1){
						var dataSoal = {
							norec: $scope.noRecMstSatu,
	                        objectfk: "SGD-000009",
	                        nilai: data.id.toString(),
	                        satuan: "-",
	                        jenisobject : "radio button"
						}
					}
					if(data.idParent == 2){
						var dataSoal = {
							norec: $scope.noRecMstDua,
	                        objectfk: "SGD-000010",
	                        nilai: data.id.toString(),
	                        satuan: "-",
	                        jenisobject : "radio button"
						}
					}
					if(data.idParent == 3){
						var dataSoal = {
							norec: $scope.noRecMstTiga,
	                        objectfk: "SGD-000011",
	                        nilai: data.id.toString(),
	                        satuan: "-",
	                        jenisobject : "radio button"
						}
					}
					if(data.idParent == 4){
						var dataSoal = {
							norec: $scope.noRecMstEmpat,
	                        objectfk: "SGD-000012",
	                        nilai: data.id.toString(),
	                        satuan: "-",
	                        jenisobject : "radio button"
						}
					}
					dataForm.push(dataSoal)		
				});
				
				for (var i = dataForm.length - 1; i >= 0; i--) {
                    if(dataForm[i].nilai == undefined){
                        dataForm.splice([i],1)
                    }
                    if(dataForm[i].norec == undefined){
                        dataForm[i].norec = '-'
                    }

                }
                var jsonSave = {
                    data: dataForm,
					noregistrasifk: $state.params.noRec,
					riwayatpapfk: norecPap
                }
                ManagePhp.saveData(jsonSave).then(function(e) {
                	$scope.arrPengkajianSkrining=[];
                	$scope.arrPengkajianMST=[];
                    $scope.getdata();
                });
			}
		}
	]);
});