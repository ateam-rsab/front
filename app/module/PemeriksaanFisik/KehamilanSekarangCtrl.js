define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KehamilanSekarangCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'ManagePasien', 'DateHelper',
		function($rootScope, $scope, ModelItem, $state, findPasien, managePasien, dateHelper) {
			$scope.title = "Tanda Vital";
			$rootScope.showMenu = true;
			$scope.noCM = $state.params.noCM;
			$scope.formId = 437;
            $scope.noRecPap = window.localStorage.getItem('noRecPap'); // noRecPap
			$scope.item = {};

			ModelItem.get("RiwayatTumbuhKembang").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
            
			$scope.now = new Date();
			
			$scope.ListAntenatal = [
				{"id": 3, "name": "Sp.OG"},
				{"id": 4, "name": "Bidan"},
				{"id": 5, "name": "Tidak Pernah"}
			]
			$scope.ListYaTidak = [
				{"id": 1, "name": "Tidak Teratur"},
				{"id": 2, "name": "Teratur"}
			]
			$scope.listKelainan = [
				{"id": 1, "name": "Isoimunisasi"},
				{"id": 2, "name": "Toxemia"},
				{"id": 3, "name": "Hidramnion"},
				{"id": 5, "name": "Diabetes"},
				{"id": 4, "name": "Perdarahan per Vagina"},
				{"id": 6, "name": "Infeksi Traktus Urinarius"},
				{"id": 7, "name": "Lain-lain..."},
			]
			// controller master data PAP
            findPasien.getMasterDataPAP($scope.formId, $scope.noRecPap).then(function(data) {
				$scope.gpa = [];
				$scope.kehamilanSekarang = [];
				$scope.kelainan = [];
				$scope.fetalDistress = [];
				$scope.partuss = [];
				$scope.placenta = [];
				$scope.taliPusat = [];
				$scope.jenisKelamin = [];
				$scope.dataLab = [];
				$scope.dataUsg = [];

				// default selected checkbox in array kelainan
				$scope.arrKelainan = [];

				debugger;
				if (data.data.pengkajianAwalTransaksi) {
					$scope.noRecTransaksi = data.data.pengkajianAwalTransaksi.noRec;
				}
				$scope.formMaster = data.data.pengkajianAwal;
				$scope.formMaster.detail.forEach(function(frmMaster){
					switch (frmMaster.id) {
						case 438:
							// GPA
							$scope.gpa.push(frmMaster)
							break;
						case 439:
							// Kehamilan sekarang
							$scope.kehamilanSekarang.push(frmMaster)
							break;
						case 445:
							// form kelainan
							$scope.kelainan.push(frmMaster);
							frmMaster.detail.forEach(function(data){
								if (data.value !== null)
									$scope.arrKelainan.push(data)
								if (data.id === 452)
									$scope.kelainanLain = true;
							});
							break;
						case 453:
							// form fetal distres
							$scope.fetalDistress.push(frmMaster)
							break;
						case 469:
							// form partus
							$scope.partuss.push(frmMaster)
							break;
						case 475:
							// form placenta
							$scope.placenta.push(frmMaster)
							break;
						case 478:
							// form tali pusat
							$scope.taliPusat.push(frmMaster)
							break;
						case 484:
							// form jenis kelamin
							$scope.jenisKelamin.push(frmMaster)
							break;
						case 488:
							// form data laboratorium
							$scope.dataLab.push(frmMaster)
							break;
						case 491:
							// form data USG
							$scope.dataUsg.push(frmMaster)
							break;
						default: 
					}
                })
            })
			
			$scope.isChecked = function(id){
				var match = false;
				for(var i=0 ; i < $scope.arrKelainan.length; i++) {
					if($scope.arrKelainan[i].id == id){
					match = true;
					}
				}
				return match;
			};
            $scope.checkboxCLick = function(bool, item) {
				debugger;
				if(bool){
					// show text-box
					if (item.id === 452)
						$scope.kelainanLain = true;
					// add item
					$scope.arrKelainan.push(item);
				} else {
					// hide text-box
					if (item.id === 452)
						$scope.kelainanLain = false;
					// remove item
					for(var i=0 ; i < $scope.arrKelainan.length; i++) {
						if($scope.arrKelainan[i].id == item.id){
						$scope.arrKelainan.splice(i,1);
						}
					}      
				}
            };
			$scope.cekRadioClick = function(data, stat){
				data.value = stat.id;
				console.log(JSON.stringify('nama parameter: ' + data.nama + ', nilai: '+ stat.nama));
				// debugger;
				// if (stat.id === 452) {
				// 	console.log(JSON.stringify('nama parameter: ' + data.nama + ', nilai: '+ stat.nama + ', keterangan: textbox lain2'));
				// } else {
				// 	console.log(JSON.stringify('nama parameter: ' + data.nama + ', nilai: '+ stat.nama));
				// }
			}

			$scope.Save = function(){
				var dataForm = [];
				$scope.gpa.forEach(function(data){
					data.detail.forEach(function(items){
						if (items.value !== null)
							var tmpData = {
								"pengkajianAwal": {
									"id": items.id
								},
								"nilai": items.value.toString()
							}
							dataForm.push(tmpData)
					})
				})
				$scope.kehamilanSekarang.forEach(function(data){
					if (data.value !== null) {
						var tmpData = {
							"pengkajianAwal": {
								"id": data.id
							},
							"nilai": data.value.toString()
						}
						dataForm.push(tmpData)
						
						//check detail
						data.detail.forEach(function(items){
							if (items.value !== null) {
								var tmpData = {
									"pengkajianAwal": {
										"id": items.id
									},
									"nilai": items.value.toString()
								}
								dataForm.push(tmpData)
							}
						})
					}
				})

				$scope.arrKelainan.forEach(function(data){
					debugger;
					if(data.id === 452) {
						var tmpData = {
							"pengkajianAwal": {
								"id": data.id
							},
							"nilai": data.value
						}
						dataForm.push(tmpData)
					} else {
						var tmpData = {
							"pengkajianAwal": {
								"id": data.id
							},
							"nilai": "true"
						}
						dataForm.push(tmpData)
					}
				})

				$scope.fetalDistress.forEach(function(data){
					data.detail.forEach(function(items){
						if (items.value !== null){
							var tmpData = {
								"pengkajianAwal": {
									"id": items.id
								},
								"nilai": items.value.toString()
							}
							dataForm.push(tmpData)
						}
					})
				})

				$scope.partuss.forEach(function(data){
					if (data.value !== null) {
						var tmpData = {
							"pengkajianAwal": {
								"id": data.id
							},
							"nilai": data.value.toString()
						}
						dataForm.push(tmpData)
					}
					if(data.detail) {
						data.detail.forEach(function(items){
							if (items.value !== null) {
								switch(items.id) {
									case 470:
										var tmpData = {
											"pengkajianAwal": {
												"id": items.id
											},
											"nilai": dateHelper.getPeriodeFormatted(items.value)
										}
										dataForm.push(tmpData);
										break;
									case 471:
										var tmpData = {
											"pengkajianAwal": {
												"id": items.id
											},
											"nilai": dateHelper.getJamFormatted(items.value)
										}
										dataForm.push(tmpData);
										break;
									default:
										var tmpData = {
											"pengkajianAwal": {
												"id": items.id
											},
											"nilai": items.value.toString()
										}
										dataForm.push(tmpData)
								}
							}
						})
					}
				})

				$scope.placenta.forEach(function(data){
					debugger;
					data.detail.forEach(function(items){
						if (items.value) {
							var tmpData = {
								"pengkajianAwal": {
									"id": items.id
								},
								"nilai": items.value.toString()
							}
							dataForm.push(tmpData)
						}
					})
				})

				$scope.taliPusat.forEach(function(data){
					data.detail.forEach(function(items){
						if (items.value !== null) {
							var tmpData = {
								"pengkajianAwal": {
									"id": items.id
								},
								"nilai": items.value.toString()
							}
							dataForm.push(tmpData)
						}
					})
				})

				$scope.jenisKelamin.forEach(function(data){
					if (data.value !== null){
						var tmpData = {
							"pengkajianAwal": {
								"id": data.id
							},
							"nilai": data.value.toString()
						}
						dataForm.push(tmpData)
					}
				})

				$scope.dataLab.forEach(function(data){
					if (data.value !== null){
						var tmpData = {
							"pengkajianAwal": {
								"id": data.id
							},
							"nilai": data.value.toString()
						}
						dataForm.push(tmpData)
					}
				})

				$scope.dataUsg.forEach(function(data){
					if (data.value !== null){
						var tmpData = {
							"pengkajianAwal": {
								"id": data.id
							},
							"nilai": data.value.toString()
						}
						dataForm.push(tmpData)
					}
				})

				// console.log(JSON.stringify(dataForm));
				if ($scope.noRecTransaksi) {
					$scope.tempData = {   
						"noRec": $scope.noRecTransaksi,
						"pengkajianAwalBaru":{  
							"noRec": $scope.noRecPap
						},
						"detailPengkajianAwal": dataForm
					}
					// console.log(JSON.stringify($scope.tempData));
					managePasien.updatePengkajianAwalPasien($scope.tempData).then(function(e) {
						// $scope.Next();
					})
				} else {
					$scope.tempData = {  
						"pengkajianAwalBaru":{  
							"noRec": $scope.noRecPap
						},
						"detailPengkajianAwal": dataForm
					}
					// console.log(JSON.stringify($scope.tempData));
					managePasien.simpanPengkajianAwalPasien($scope.tempData).then(function(e) {
						// $scope.Next();
					})
				}
			}
		}
	]);
});