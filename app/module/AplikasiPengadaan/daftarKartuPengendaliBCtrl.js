

define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('daftarKartuPengendaliBCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'dataRupService', 'ManageSarpras',
		function($rootScope, $scope, $state, DateHelper, dataRupService, ManageSarpras) {
			// ModelItem.get("PengajuanUsulan/dataRup").then(function(data) {
			// }, function errorCallBack(err) {});

			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;

			var init = function(){
				dataRupService.getDataRUP("kartu-pengendali/kartu-pengendali-header-list?isDirekturTerkait=true", true).then(function(dat){
				
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

				dataRupService.getDataRUP("kartu-pengendali/kartu-pengendali-header-list?isDirekturTerkait=true"+tgl, true).then(function(dat){
					
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
					width: 120,
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
					width: 220
				},
				{
					field: "namaAccount",
					title: "Nama Akun",
					width: 100,
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
					width: 275
				},
				{
					field: "isVerifikasi",
					title: "Status",
					width: 300,
					attributes: {
						style :"text-align: center;"
					}
				},
				{
					field: "totalCount",
					title: "Jumlah Item",
					width: 100,
					attributes: {
						style: "text-align:center"
					},
					template: "#=kendo.toString(totalCount, \"n0\")#"
				},
				{
					field: "total",
					title: "Total",
					width: 100,
					template: "<div class=\"pull-right\">#=kendo.toString(total, \"n0\")#</div>"
				}],
			};

			$scope.kl = function(current){
				$scope.current = current;
				console.log(JSON.stringify($scope.current));
			}

			$scope.handleChange = function(data, dataItem, columns) {
		      	$scope.data = data;
		      	$scope.columns = columns;
		      	$scope.dataItem = dataItem;
		    };

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
	        };

	        $scope.showPopup = function () {
	            $scope.notf1.show({
	                title: "Informasi",
	                message: $scope.messages
	            }, "ngTemplate");
	        }

		  //   $scope.verifikasiKartuPengendali = function(data) {

		  //   	var getDetail = $scope.current;
		  //   	console.log(getDetail);

				// $state.go('VerifikasiKartuPengendaliDirektur', {
	   //              noRec: getDetailID
	   //          });
		  //   }

		    $scope.verifikasiKartuPengendali = function(data) {
	    		var arrVerifikasi = [];

	    		var getDetail = $scope.current;
		    	console.log(getDetail);

	    		if (getDetail.isVerifikasi === "[\"VERIFIKASI_PENGENDALI\"]") {

	    			arrVerifikasi.push(getDetail.noRec)

	    		} else {
	    			$scope.messages = "Data sudah di verifikasi!";
	    			$scope.showPopup();
	    		}

		    	if (arrVerifikasi.length > 0) {

		    		console.log(JSON.stringify(arrVerifikasi));
		    		debugger;

		    		$state.go('VerifikasiKartuPengendaliDirektur', {
		                noRec: arrVerifikasi
		            });
		    	}
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

		}
	]);
});