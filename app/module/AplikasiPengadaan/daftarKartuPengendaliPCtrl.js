define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('daftarKartuPengendaliPCtrl', ['$sce', '$rootScope', '$scope', '$state', 'DateHelper', 'dataRupService', 'ManageSarpras',
		function($sce, $rootScope, $scope, $state, DateHelper, dataRupService, ManageSarpras) {
			// ModelItem.get("PengajuanUsulan/dataRup").then(function(data) {
			// }, function errorCallBack(err) {});

			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;

			$scope.showBilling = false;

			var init = function(){
				dataRupService.getDataRUP("kartu-pengendali/kartu-pengendali-header-list?isPpk=true", true).then(function(dat){
				
					$scope.dataRupLengkap = dat.data.data;
					$scope.dataRupLengkap.forEach(function(data){
						// var date1 = data.tanggal;
						data.tanggal = DateHelper.getPeriodeFormatted(new Date(data.tanggal));
						var isVerifikasiCustom = [];

						data.isVerifikasi.forEach(function(data){
							isVerifikasiCustom.push(data.isVerifikasi);
						})

						data.isVerifikasi = JSON.stringify(isVerifikasiCustom);

					})
				});
			}

			init();

			$scope.cariRup = function() {
				var tgl;

				if ($scope.item.dari !== undefined && $scope.item.sampai !== undefined) {
					tgl = "&dateStart="+DateHelper.getPeriodeFormatted($scope.item.dari)+"&dateEnd="+DateHelper.getPeriodeFormatted($scope.item.sampai);
				} else {
					tgl="&dateStart=&dateEnd="
				}

				dataRupService.getDataRUP("kartu-pengendali/kartu-pengendali-header-list?isPpk=true"+tgl, true).then(function(dat){
					
					$scope.dataRupLengkap = dat.data.data;

					$scope.dataRupLengkap.forEach(function(data){

						data.tanggal = DateHelper.getPeriodeFormatted(new Date(data.tanggal));
						var isVerifikasiCustom = [];

						data.isVerifikasi.forEach(function(data){
							isVerifikasiCustom.push(data.isVerifikasi);
						})

						data.isVerifikasi = JSON.stringify(isVerifikasiCustom);

					})
				});	
			}

			$scope.mainGridOptions = {
				pageable: true,
				columns: [
				{
					field: "noUsulan",
					title: "No Usulan",
					width: 100,
					attributes: {
						style: "text-align:center"
					}
				},
				{
					field: "tanggal",
					title: "Tanggal",
					width: 120,
					attributes: {
						style: "text-align:center"
					}
				},
				{
					field: "asalProduk",
					title: "Sumber Dana",
					width: 150
				},
				{
					field: "namaAccount",
					title: "Nama Akun",
					width: 200,
					attributes: {
						style: "text-align:center"
					}
				},
				{
					field: "kdAccount",
					title: "Mata Anggaran",
					width: 100,
					attributes: {
						style: "text-align:center"
					}
				},
				{
					field: "namaPengendali",
					title: "Pengendali",
					width: 140
				},
				{
					field: "namaPengadaan",
					title: "Jenis Pengadaan",
					width: 160
				},
				{
					field: "isVerifikasi",
					title: "Status",
					width: 150,
					attributes: {
						style :"text-align: center;"
					}
				},
				{
					field: "totalCount",
					title: "Item",
					width: 60,
					attributes: {
						style: "text-align:center"
					},
					template: "#=kendo.toString(totalCount, \"n0\")#"
				},
				{
					field: "total",
					title: "Total",
					width: 120,
					template: "<div class=\"pull-right\">#=kendo.toString(total, \"n0\")#</div>"
				}],
			};

			$scope.kl = function(current){
				$scope.current = current;
				console.log(current);
			}

			$scope.handleChange = function(data, dataItem, columns) {
		      	$scope.data = data;
		      	$scope.columns = columns;
		      	$scope.dataItem = dataItem;
		    }
		    $scope.notf1Options = {
	            position: {
	                pinned: true,
	            	top: 30,
	                right: 30
	            },
	            autoHideAfter: 3000,
	            stacking: "down",
	            templates: [{
	                type: "ngTemplate",
	                template: $("#notificationTemplate").html()
	            }]
	        }
	        $scope.showPopup = function () {
	            $scope.notf1.show({
	                title: "Informasi",
	                message: $scope.messages
	            }, "ngTemplate");
	        }
			$scope.cetak = function() {
				var getDetailID = $scope.current.noRec;
				$scope.urlBilling = $sce.trustAsResourceUrl(dataRupService.reportHps(getDetailID));
			  	$scope.showBilling = true;
			}
		    $scope.verifikasiKartuPengendali = function(data) {

		    	var getDetailID = $scope.current.noRec;
		    	console.log(getDetailID);

				$state.go('VerifikasiUsulanPPK', {
	                noRec: getDetailID
	            });
		    };

		    $scope.rekapPemenang = function(data) {

		    	var getDetailID = $scope.current.noRec;
		    	console.log(getDetailID);
		    	if ($scope.current.namaPengadaan === "E Catalogue") {
					$state.go('RekapPemenangPengadaanPPK', {
		                noRec: getDetailID
		            });
		    	} else {
		    		$scope.messages = "Jenis pengadaan bukan E-Catalog";
		    		$scope.showPopup();
		    	}
		    }

		    $scope.lihatPemenang = function(data) {

		    	var getDetailID = $scope.current.noRec;
		    	console.log(getDetailID);
		    	
		    	$state.go('RekapPemenang', {
	                noRec: getDetailID
	            });
		    }
		    $scope.editKartuPengendali = function(data) {
		    	var arrDataRup = [];

		    	$scope.data.forEach(function(data){
		    		arrDataRup.push(data.noRec)
		    	})
		    }
		    $scope.doTheBack = function() {
			  	window.history.back();
			};
			$scope.kembali = function() {
				$scope.showBilling = false;
			}
		}
	]);
});