define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('GawatDaruratFormCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'GetPostOnPengkajianAwal','ManagePasien','pengkajiangd',
        function($rootScope, $scope, ModelItem, $state, findPasien, getPostOnPengkajianAwal,ManagePasien,pengkajiangd) {
            
            //$rootScope.listActive -> data listMenu
			$scope.item = {};
			$scope.item.noRecPasienDaftar=$state.params.noRec;
            $scope.noRegistrasi = $state.params.noRegistrasi;
			$scope.item.noCm=$state.params.noCm;
			$scope.item.noRegistrasi = $state.params.noRegistrasi;
            $rootScope.isOpen = true;
            $scope.now = new Date();

           	$scope.isDokter = false;
           	$scope.isSuster=false;
            $scope.statusCode = ModelItem.getStatusUser();
            if($scope.statusCode === "suster"){
                $scope.isDokter=false;
                $scope.isSuster=true;
            }else{
                $scope.isDokter=true;
                $scope.isSuster=false;
            }
            ModelItem.getDataDummyGeneric("StatusPsikologis", false).then(function(data) {
                $scope.listStatusPsikologis = data;
            })
            ModelItem.getDataDummyGeneric("ResikoJatuh", false).then(function(data) {
                $scope.listResikoJatuh = data;
            })
            ModelItem.getDataDummyGeneric("DiagnosisKeperawatan", false).then(function(data) {
                $scope.listDiagnosaKeperawatan = data;
            })
            ModelItem.getDataDummyGeneric("StatusKeputusan", false).then(function(data) {
                $scope.listStatusKeputusan = data;
            })
            ModelItem.getDataDummyGeneric("TandaKehidupan", false).then(function(data) {
                $scope.listTandaKehidupan = data;
            })
            ModelItem.getDataDummyGeneric("JenisNyeri", false).then(function(data) {
                $scope.listJenisNyeri = data;
            })
            ModelItem.getDataDummyGeneric("StatusImageGawatDarurat", false).then(function(data) {
                $scope.listStatusImageGawatDarurat = data;
            })
            ModelItem.getDataDummyGeneric("RuangPerawatanIGD", false).then(function(data) {
                $scope.listRuangPerawatan = data;
            })
            ModelItem.getDataDummyGeneric("SkalaNyeri", false).then(function(data) {
                $scope.sourceGmbrNyeri = data;
            })
            ModelItem.getDataDummyGeneric("DeathOnArrival", false).then(function(data) {
                $scope.DeathOnArrival = data;
            })
            								 	 
			$scope.noRecPasienDaftar=$state.params.noRec;
			
			var init = function () {
			var awal  =  $scope.noRecPasienDaftar;
			
			pengkajiangd.getOrderList("gawat-darurat/get-pengkajian/?noRec="+awal).then(function(dat){
			 	$scope.sourceOrder = dat.data.data.gawatDarurat;
			 	if($scope.sourceOrder != undefined){
			 		$scope.noRec = $scope.sourceOrder.noRec;
				  	$scope.item["skorNyeri"] = $scope.sourceOrder.skorNyeri;
				  	$scope.item["skalaNyeri"] = $scope.sourceOrder.skalaNyeriId;
				  	$scope.item["jenisNyeri"] = $scope.sourceOrder.jenisNyeriId;
				  	$scope.item["lokasi"] = $scope.sourceOrder.lokasi;
				  	$scope.item["durasi"] = $scope.sourceOrder.durasi;
				  	$scope.item["diagnosaKeperawatan"] = $scope.sourceOrder.diagnosaKeperawatanId;
				  	$scope.item["resikoJatuh"] = $scope.sourceOrder.resikoJatuhId;
				  	$scope.item["skorResikoJatuh"] = $scope.sourceOrder.skorResikoJatuh;
				  	$scope.item["pencetus"] = $scope.sourceOrder.pencetus;
				  	$scope.item["statusPasien"] = $scope.sourceOrder.statusPasienId;
				  	$scope.item["tandaKehidupan"] = $scope.sourceOrder.tandaKehidupanId;
				  	$scope.item["psikologis"] = $scope.sourceOrder.psikologisId;
				  	$scope.item["pasangOroPharsingAirway"] = $scope.sourceOrder.pasangOroPharsingAirway;
				  	$scope.item["aturPosisi1"] = $scope.sourceOrder.aturPosisi1;
				  	$scope.item["aturPosisi2"] = $scope.sourceOrder.aturPosisi2;
				  	$scope.item["monitorIntakeOutput"] = $scope.sourceOrder.monitorIntakeOutput;
				  	$scope.item["isapLendir"] = $scope.sourceOrder.isapLendir;
				  	$scope.item["monitorTtvdanSp021"] = $scope.sourceOrder.monitorTtvdanSp021;
				  	$scope.item["monitorTtvdanSp022"] = $scope.sourceOrder.monitorTtvdanSp022;
				  	$scope.item["berikanOksigen1"] = $scope.sourceOrder.berikanOksigen1;
				  	$scope.item["pasangInfus1"] = $scope.sourceOrder.pasangInfus1;
				  	$scope.item["pasangInfus2"] = $scope.sourceOrder.pasangInfus2;
				  	$scope.item["defibrasi1"] = $scope.sourceOrder.defibrasi1;
				  	$scope.item["defibrasi2"] = $scope.sourceOrder.defibrasi2;
				  	$scope.item["PemberianObat"] = $scope.sourceOrder.pemberiObat;
				  	$scope.item["berikanOksigen2"] = $scope.sourceOrder.berikanOksigen2;
				  	$scope.item["pasangEtt1"] = $scope.sourceOrder.pasangEtt1;
				  	$scope.item["pasangEtt2"] = $scope.sourceOrder.pasangEtt2;
				  	$scope.item["monitorIntakeOutput"] = $scope.sourceOrder.monitorIntakeOutput;
				  	$scope.item["pemeriksaanLaboratorium"] = $scope.sourceOrder.pemeriksaanLaboratorium;
				  	$scope.item["pemberianObat"] = $scope.sourceOrder.pemberiObat;
				  	$scope.item["lainnya"] = $scope.sourceOrder.lainnya;
				  	$scope.item["skor"] = $scope.sourceOrder.skor;
				  	$scope.item["ruangPerawat"] = $scope.sourceOrder.ruanganPerawatId;
				  	$scope.arrStatusGambar = $scope.sourceOrder.statusGambar;
				  	$scope.arrDiputuskan = $scope.sourceOrder.diputuskan;
				  }
			 	});	
			};
			init();

			$scope.cekSkorNyeri = function(stat) {
				if($scope.item.skalaNyeri === 1)
					$scope.item.skorNyeri = 0
				if($scope.item.skalaNyeri === 2)
					$scope.item.skorNyeri = 2
				if($scope.item.skalaNyeri === 3)
					$scope.item.skorNyeri = 4
				if($scope.item.skalaNyeri === 4)
					$scope.item.skorNyeri = 6
				if($scope.item.skalaNyeri === 5)
					$scope.item.skorNyeri = 8
				if($scope.item.skalaNyeri === 6)
					$scope.item.skorNyeri = 10
			};

			$scope.isChecked = function(id){
				var match = false;
				for(var i=0 ; i < $scope.arrStatusGambar.length; i++) {
					if($scope.arrStatusGambar[i].id == id){
					match = true;
					}
				}
				return match;
			};

			$scope.isCheckedPutusan = function(id){
				var match = false;
				for(var i=0 ; i < $scope.arrDiputuskan.length; i++) {
					if($scope.arrDiputuskan[i].id == id){
					match = true;
					}
				}
				return match;
			};

			$scope.cekDeathOnArrival=function(){
				if($scope.item.statusPasien===1){
					$scope.item.jamPenentuanKematian=""
				}else{
					$scope.item.tandaKehidupan=null
				}
			}

			$scope.statusGambar = [];
			$scope.cekStatusGambar = function(stat) {
				var isExist = _.find($scope.statusGambar, function(dataExist){ return dataExist == stat; });

				if(isExist == undefined)
				{
					$scope.statusGambar.push(stat);
				}
				else
				{
					$scope.statusGambar = _.without($scope.statusGambar, stat);
				}
			
				console.log('list statusGambar : ' + JSON.stringify($scope.statusGambar));
			};

			$scope.StatusKeputusan = [];
			$scope.cekStatusKeputusan = function(stat) {
				var isExist = _.find($scope.StatusKeputusan, function(dataExist){ return dataExist == stat; });

				if(isExist == undefined)
				{
					$scope.StatusKeputusan.push(stat);
				}
				else
				{
					$scope.StatusKeputusan = _.without($scope.StatusKeputusan, stat);
				}
			
				console.log('list StatusKeputusan : ' + JSON.stringify($scope.StatusKeputusan));
			};
										  
            $scope.Save = function() {
				debugger;
				if($scope.statusCode === "suster"){
					var dataStatusGambar = [];
	                $scope.statusGambar.forEach(function(stat){
	                    debugger;		         
                        var tmpData = {
                        	"statusImageGawatDarurat":{
                            	"id": stat.id
                            }
                        }
                        dataStatusGambar.push(tmpData);
	                })
	                if($scope.item.tandaKehidupan === undefined){
	                	var tandaKehidupan = null
	                }else{
	                	var tandaKehidupan = $scope.item.tandaKehidupan
	                }

	                if($scope.item.jamPenentuanKematian === undefined){
	                	var jamPenentuanKematian = ""
	                }else{
	                	var jamPenentuanKematian = $scope.item.jamPenentuanKematian
	                }
	                if($scope.noRec===undefined){
						var data = {
							"statusPegawai": "suster",
							"antrianPasienDiPeriksa":{
								"noRec":$scope.noRecPasienDaftar
							},
							"skalaNyeri":{
								"id": $scope.item.skalaNyeri
							},
							"skorNyeri":$scope.item.skorNyeri,
							"jenisNyeri":{
								"id": $scope.item.jenisNyeri
							},
							"lokasi"    :$scope.item.lokasi,
							"durasi"    :$scope.item.durasi,
							"pencetus"  :$scope.item.pencetus,
							"statusPasien":{
								"id": $scope.item.statusPasien
							},
							"tandaKehidupan": {
								"id": tandaKehidupan
							},
							"jamPenentuanKematian": jamPenentuanKematian,
							"psikologis":{
								"id": $scope.item.psikologis
							},
							"resikoJatuh": {
								"id": $scope.item.resikoJatuh
							},
							"skorResikoJatuh":$scope.item.skorResikoJatuh,
							"statusGambar": dataStatusGambar,
							"diagnosaKeperawatan": {
								"id": $scope.item.diagnosaKeperawatan,
							},
							"isapLendir": $scope.item.isapLendir,
							"pasangOroPharsingAirway": $scope.item.pasangOroPharsingAirway,
							"aturPosisi1": $scope.item.aturPosisi1,
							"aturPosisi2": $scope.item.aturPosisi2,
							"monitorIntakeOutput": $scope.item.monitorIntakeOutput,
							"monitorTtvdanSp021": $scope.item.monitorTtvdanSp021,
							"monitorTtvdanSp022": $scope.item.monitorTtvdanSp022,
							"berikanOksigen1": $scope.item.berikanOksigen1,
							"berikanOksigen2": $scope.item.berikanOksigen2,
							"pasangInfus1": $scope.item.pasangInfus1,
							"pasangInfus2": $scope.item.pasangInfus2,
							"pasangEtt1": $scope.item.pasangEtt1,
							"pasangEtt2": $scope.item.pasangEtt2,
							"defibrasi1": $scope.item.defibrasi1,
							"defibrasi2": $scope.item.defibrasi2,
							"pemeriksaanLaboratorium": $scope.item.pemeriksaanLaboratorium,
							"pemberiObat": $scope.item.pemberianObat,
							"lainnya": $scope.item.lainnya
						}
					}else{
						var data = {
							"statusPegawai": "suster",
							"noRec":$scope.noRec,
							"antrianPasienDiPeriksa":{
								"noRec":$scope.noRecPasienDaftar
							},
							"skalaNyeri":{
								"id": $scope.item.skalaNyeri
							},
							"skorNyeri":$scope.item.skorNyeri,
							"jenisNyeri":{
								"id": $scope.item.jenisNyeri
							},
							"lokasi"    :$scope.item.lokasi,
							"durasi"    :$scope.item.durasi,
							"pencetus"  :$scope.item.pencetus,
							"statusPasien":{
								"id": $scope.item.statusPasien
							},
							"tandaKehidupan": {
								"id": tandaKehidupan
							},
							"jamPenentuanKematian": jamPenentuanKematian,
							"psikologis":{
								"id": $scope.item.psikologis
							},
							"resikoJatuh": {
								"id": $scope.item.resikoJatuh
							},
							"skorResikoJatuh":$scope.item.skorResikoJatuh,
							"statusGambar": dataStatusGambar,
							"diagnosaKeperawatan": {
								"id": $scope.item.diagnosaKeperawatan
							},
							"isapLendir": $scope.item.isapLendir,
							"pasangOroPharsingAirway": $scope.item.pasangOroPharsingAirway,
							"aturPosisi1": $scope.item.aturPosisi1,
							"aturPosisi2": $scope.item.aturPosisi2,
							"monitorIntakeOutput": $scope.item.monitorIntakeOutput,
							"monitorTtvdanSp021": $scope.item.monitorTtvdanSp021,
							"monitorTtvdanSp022": $scope.item.monitorTtvdanSp022,
							"berikanOksigen1": $scope.item.berikanOksigen1,
							"berikanOksigen2": $scope.item.berikanOksigen2,
							"pasangInfus1": $scope.item.pasangInfus1,
							"pasangInfus2": $scope.item.pasangInfus2,
							"pasangEtt1": $scope.item.pasangEtt1,
							"pasangEtt2": $scope.item.pasangEtt2,
							"defibrasi1": $scope.item.defibrasi1,
							"defibrasi2": $scope.item.defibrasi2,
							"pemeriksaanLaboratorium": $scope.item.pemeriksaanLaboratorium,
							"pemberiObat": $scope.item.pemberianObat,
							"lainnya": $scope.item.lainnya
						}
					}
					if(data.skalaNyeri.id===undefined)
						delete data.skalaNyeri
					if(data.jenisNyeri.id===undefined)
						delete data.jenisNyeri
					if(data.statusPasien.id===undefined)
						delete data.statusPasien
					if(data.psikologis.id===undefined)
						delete data.psikologis
					if(data.resikoJatuh.id===undefined)
						delete data.resikoJatuh
					if(data.diagnosaKeperawatan.id===undefined)
						delete data.diagnosaKeperawatan
					if(data.tandaKehidupan.id===undefined||data.tandaKehidupan.id===null)
						delete data.tandaKehidupan
					}else{
					var dataStatusKeputusan = [];
	                $scope.StatusKeputusan.forEach(function(data){		         
                        var tmpData = {
                        	"statusKeputusan":{
                            	"id": data.id
                            }
                        }
                        dataStatusKeputusan.push(tmpData);
	                })
					var data = {
						"statusPegawai": "dokter",
						"noRec":$scope.noRec,
						"diputuskan": dataStatusKeputusan,
						"skor": $scope.item.skor,
						"ruanganPerawat": {
							"id": $scope.item.ruangPerawat
						}
					}
					if(data.diputuskan.id===undefined||data.diputuskan.id===null)
						delete data.diputuskan
					if(data.ruanganPerawat.id===undefined)
						delete data.ruanganPerawat
					}
				
                ManagePasien.saveDataGawat(data,"gawat-darurat/save-pengakajian").then(function (e) {
                	init();  
             	})	            
            };
        }
    ]);
});