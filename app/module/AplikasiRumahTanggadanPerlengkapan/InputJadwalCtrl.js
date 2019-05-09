define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('InputJadwalCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', '$state', 'DateHelper',
		function($rootScope, $scope, ModelItem, ManageSarpras, $state,DateHelper){
			$scope.title = "";
			$scope.dataVOloaded = true;

			$scope.jadwal = [];
			$scope.item = {};
			$scope.item.petugas = $state.params.nama;
			$scope.item.tahun = new Date();
			$scope.isDaily = true;
			// $scope.item.petugas = $state.params.nama;

			$scope.now = new Date();
			var newForm = function(date){
				debugger;
				var n = new Date(date.getFullYear(), (date.getMonth()+1), 0);
				var j = n.getDate();
				console.log(n.getDate());
				for (var i = 1; i <= j; i++) {
					var newCol = {
					    "tanggalJadwal": (new Date(date)).setDate(i),
					    "ruangan": {
					    	"id": 238
					    },
					    "jadwalPraktek": {},
					    "dokter": {
					    	"id": $state.params.id
					    }
					}
					// console.log(DateHelper.DescDay(new Date()));
					$scope.jadwal.push(newCol);
				}
			}

			var weekly = function(){
				$scope.mingguan = [];
				var day = [ "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
				for (var k = 0; k < 7; k++) {
					var newData = {
						// "hari": k,
						"name": day[k],
						"jadwalPraktek": {}
						// "dokter": {
						// 	"id": $state.params.id
						// }
					}
					$scope.mingguan.push(newData);
				}
			}

			ManageSarpras.getListData("JadwalPraktek&select=*").then(function(data){
				$scope.sourcePraktek = data;
			})

			$scope.daily = function(param){
				if(param == "daily") $scope.isDaily = true;
				else $scope.isDaily = false;
			}

			var fillJadwal = function(date){
				var url = $state.params.id + "/" + parseInt(date.getMonth()+1) + "/" + date.getFullYear();
						debugger;
				ManageSarpras.getOrderList("jadwalDokter/get-jadwal-supir-ambulance/" + url).then(function(data){
					var temp = data.data;
					$scope.item.petugas = temp[0].listJadwal.namaLengkap;
					temp.forEach(function(tgl){
						var idx = (new Date(tgl.listJadwal.tglJadwal)).getDate()-1;
						$scope.jadwal[idx].id = tgl.listJadwal.id;
						$scope.jadwal[idx].jadwalPraktekId = tgl.listJadwal.jadwalPraktekId;
						$scope.jadwal[idx].namaLengkap = tgl.listJadwal.namaLengkap;
						$scope.jadwal[idx].reportDisplay = tgl.listJadwal.reportDisplay;
						$scope.jadwal[idx].tglJadwal = tgl.listJadwal.tglJadwal;
						$scope.jadwal[idx].jadwalPraktek = {
							"namaExternal":tgl.listJadwal.reportDisplay,
							"id": tgl.listJadwal.jadwalPraktekId
						}
					})
				})	
			}

			var update = function(date){
				newForm(date);
				weekly();
				fillJadwal(date);
			}

			$scope.$watch('item.tahun', function() {
				$scope.jadwal = [];
				update($scope.item.tahun);
			})

			$scope.monthSelectorOptions = {
               	start: "year",
              	depth: "year"
            };

            $scope.Back = function(){
            	$state.go("JadwalSupirAmbulance");
            }

            $scope.Save = function(){
				debugger;
				$scope.jadwal.forEach(function(datas){
					datas.reportDisplay = datas.jadwalPraktek.namaExternal
					datas.jadwalPraktekId = datas.jadwalPraktek.id;
				})
            	if(!$scope.isDaily){
            		$scope.jadwal.forEach(function(data){
            			var idx = (new Date(data.tanggalJadwal)).getDay();
            			data.jadwalPraktek = $scope.mingguan[idx].jadwalPraktek;
            			// console.log(JSON.stringify(new Date(data.tanggalJadwal)));
            		})
            	}
            	ManageSarpras.saveDataSarPras(ModelItem.beforePost($scope.jadwal), "jadwalDokter/save-all-jadwal-dokter/").then(function(e){
            		console.log(JSON.stringify(e.data));
            		$scope.Back();
            	})
            }
	}])
})