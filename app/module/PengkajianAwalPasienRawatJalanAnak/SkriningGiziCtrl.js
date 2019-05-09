define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SkriningGiziCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
		function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {
			debugger;

			var isNotClick = true;
			$scope.noCM = $state.params.noCM;
			$rootScope.showMenu = true;
			$rootScope.showMenuDetail = false;

			$scope.isRawatInap = window.isRawatInap;
			// if ($scope.isRawatInap === undefined)
			// 	$scope.isRawatInap = true
			// console.log(JSON.stringify($scope.isRawatInap));

			$scope.pasien = {};
			$scope.item = {};
			var date = new Date();
			// get noRecPap dari local storage yg di ush di halaman dashboard PAP
            $scope.noRecPap = window.localStorage.getItem('noRecPap');
			/*$scope.item.tglInputData = date;*/
			$scope.now = date;
			$scope.kajianAwal = cacheHelper.get("kajianAwal");
			if ($scope.kajianAwal === undefined)
				$scope.kajianAwal = {};
			findPasien.getByNoCM($scope.noCM).then(function(data) {
				$rootScope.currentPasien = data.data.data;
				$scope.pasien = data.data.data;
				var umur = $scope.pasien.umur.split(','),
					thn = parseInt(umur[0]),
					bln = parseInt(umur[1]),
					usia = (thn * 12) + bln;
				if (usia >= 0 && usia <= 11) {$scope.isNeonatal = true}
				if (usia >= 12 && usia <= 216) {$scope.isAnak = true}
				// if (usia >= 217) {$scope.isDewasa = true}
				// debugger;
			});

			// mengambil data VO
			ModelItem.setActiveMenu($rootScope.listActive, "SkriningGizi");
			ModelItem.get("SkriningGizi").then(function(data) {
				$scope.item = data;
				$scope.item.noRec = "";
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$q.all([ModelItem.getDataDummyGeneric("DataPertanyaanSkriningGizi", false),
				ModelItem.getDataDummyGeneric("StatusYaTidak", false),
				ModelItem.getDataDummyGeneric("DataPenyakit", false),
			]).then(function(data) {

				if (data[0].statResponse)
				{
					/*$scope.listPertanyaanSkriningGizi = data[0];*/
					
					$scope.listPertanyaanSkriningGizi = _.filter(data[0], function(e) {
                        return e.kategori === '1';
                    });

                    $scope.tempListSkriningGizi = [];
					for(var i=0; i<$scope.listPertanyaanSkriningGizi.length; i++)
					{
						var objSkrining = {
							"id":$scope.listPertanyaanSkriningGizi[i].id
						}

						var obj = {
							"nilai":"0",
							"skriningGizi":objSkrining,
							"noRec":"",
							"yaTidak":{
								"id":1
							}
						}

						$scope.tempListSkriningGizi.push(obj);

					}
				}
				if (data[1].statResponse)
				{
					$scope.listStatusYaTidak = data[1];
				}

				if (data[2].statResponse)
				{
					$scope.listDaftarPenyakit = data[2];
				}
				getDataCurentPasien();
			});

			//Validasi Ketika radio button di klik
			$scope.cekTotalSkor = function(data, stat)
			{
				isNotClick = false;
				var skor = 0;

				for(var i = 0; i < $scope.listPertanyaanSkriningGizi.length; i++)
				{
					if($scope.listPertanyaanSkriningGizi[i].stat.name == "Ya")
					{
						skor += $scope.listPertanyaanSkriningGizi[i].nilai;

					}
				}
				$scope.item.TotalSkor = skor;
				var currentData = _.find($scope.tempListSkriningGizi, function(arr){ return arr.skriningGizi.id == data.id; });
				var indexArray = _.indexOf($scope.tempListSkriningGizi, currentData);

				var objYaTidak = {
					"id":stat.id
				}

				$scope.tempListSkriningGizi[indexArray].yaTidak = objYaTidak;
				if(stat.name == "Ya")
				{
					for(var i=0; i<$scope.listPertanyaanSkriningGizi.length; i++){
						if( $scope.tempListSkriningGizi[indexArray].skriningGizi.id == $scope.listPertanyaanSkriningGizi[i].id)
						{
							$scope.tempListSkriningGizi[indexArray].nilai = $scope.listPertanyaanSkriningGizi[i].nilai;
						}
					}
				}
				else{
					$scope.tempListSkriningGizi[indexArray].nilai = "0";
				}
			}
			// untuk load data yang sudah terisi sebelum nya
			function getDataCurentPasien() {
				debugger;
				$scope.isRouteLoading = true;
				findPasien.getSkriningGizi($state.params.noRec,$state.params.tanggal).then(function(e) {
					if (e.data.data.PapSkriningGizi[0] != undefined) {
						$scope.item.PapSkriningGizi = e.data.data.PapSkriningGizi[0];
						/*if ($scope.item.keluhanUtama !== undefined)
						 $scope.editMode = true;*/
						$scope.item.noRec = $scope.item.PapSkriningGizi.noRec;
						$scope.item.beratBadan = $scope.item.PapSkriningGizi.beratBadan;
						$scope.item.lingkarKepala = $scope.item.PapSkriningGizi.lingkarKepala;
						$scope.item.tinggiBadan = $scope.item.PapSkriningGizi.tinggiBadan;
						$scope.item.TotalSkor = $scope.item.PapSkriningGizi.totalSkor;

						$scope.item.tglinputAwal = $scope.item.PapSkriningGizi.tglInputData;
						$scope.item.tglInputData = dateHelper.formatDate($scope.item.tglinputAwal, 'YYYY-MM-DD HH:mm:ss')
						var ee = _.find()
						var aaa = $scope.item.PapSkriningGizi.papSkriningGiziDetailSet;
						for(var i = 0; i < aaa.length; i++){
							var xxx = aaa[i].noRec
						}
						debugger;
						var giziDetailSet = $scope.item.PapSkriningGizi.papSkriningGiziDetailSet;
						for(var i = 0; i < giziDetailSet.length; i++){
							for(var j = 0; j < $scope.listPertanyaanSkriningGizi.length; j++){
								if( $scope.listPertanyaanSkriningGizi[j].id == giziDetailSet[i].skriningGizi.id){
									$scope.listPertanyaanSkriningGizi[j].noRec = giziDetailSet[i].noRec;
									$scope.listPertanyaanSkriningGizi[j].stat = ModelItem.convertObjectLoadData($scope.listStatusYaTidak, giziDetailSet[i].yaTidak.id);
								}
							}
						}

						for(var k = 0; k < $scope.listPertanyaanSkriningGizi.length; k++){
							for(var l = 0; l < $scope.tempListSkriningGizi.length; l++){
								if( $scope.listPertanyaanSkriningGizi[k].id == $scope.tempListSkriningGizi[l].skriningGizi.id){
									if($scope.listPertanyaanSkriningGizi[k].stat.name == "Ya"){
										$scope.tempListSkriningGizi[l].nilai = $scope.listPertanyaanSkriningGizi[k].nilai;
									}
									else
									{
										$scope.tempListSkriningGizi[j].nilai = 0;
									}
								}
							}
						}
						if (!$scope.$$phase)
							$scope.$apply();
					}
				});
			};

			$scope.Save = function() {
				var xxx = $scope.item.tglKeluhan
				debugger;

				for(var i=0; i<$scope.listPertanyaanSkriningGizi.length; i++){
					for(var j=0; j<$scope.tempListSkriningGizi.length; j++)
					{
						if( $scope.tempListSkriningGizi[j].skriningGizi.id == $scope.listPertanyaanSkriningGizi[i].id)
						{
							if($scope.item.PapSkriningGizi == undefined){
								$scope.tempListSkriningGizi[j].noRec= "";
							}

							else{
								$scope.tempListSkriningGizi[j].noRec = $scope.listPertanyaanSkriningGizi[i].noRec;
							}

							$scope.tempListSkriningGizi[j].yaTidak = $scope.listPertanyaanSkriningGizi[i].stat;
						}
					}
				}
				var totalscore = $scope.item.TotalSkor
				$scope.item.papSkriningGiziDetailSet = $scope.tempListSkriningGizi;
				$scope.pasienku = {noRec:$state.params.noRec}
				cacheHelper.set("kajianAwal", $scope.kajianAwal);
				$scope.item.pengkajianAwalBaru = {
                    "noRec": $scope.noRecPap
                };
				ManagePasien.saveSkriningGizi($scope.pasienku,totalscore,ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp(new Date()), ModelItem.beforePost($scope.item)).then(function(e) {
					$scope.isNext = true;
					$scope.kajianAwal.skriningGizi = $scope.item;
					cacheHelper.set("kajianAwal", $scope.kajianAwal);
				});
			};
			$scope.Next = function() {
				$rootScope.next();
			}

		}
	]);
});