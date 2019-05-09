define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarTagihanBusinessCenterCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', 'ManageIPSRS', 'DateHelper','$state',
		function($rootScope, $scope, ModelItem, IPSRSService, ManageIPSRS, DateHelper, $state) {
			ModelItem.get("IPSRS/DaftarTagihanBusinessCenter").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				ManageIPSRS.getItemIPSRS("ipsrs-tagihan-business-center/get-jenis-business-center", true).then(function(dat){
					$scope.listJenisPemakaian = dat.data.data.jenisPemakaian;
					//debugger;
				});


			    $scope.mainGridOptions = { 
					pageable: true,
					filterable: {
    				extra: false,
    				operators: {
    					string: {
    					startsWith: "Pencarian"
    					}
    					}
    					},
                 sortable: true,
				 //toolbar: ["excel"],
		         //    excel: {
		         //        fileName: "DashboardPerbaikan.xlsx",
		         //        filterable: false
		         // },
				// dataBound: onDataBound,
		     	}


				$scope.cari = function() {
					debugger;
  					if ($scope.item.periodeAwal == undefined && $scope.item.periodeAkhir == undefined ){
  						init();
  					} else {
  						if($scope.item.periodeAwal == undefined){
  							alert("Pilih Periode awal Terlebih dahulu !!!");
  						}else{
  							 var awal = DateHelper.getTanggalFormattedNew($scope.item.periodeAwal);	
  						      	if($scope.item.periodeAkhir == undefined){
  						      		alert("Pilih Periode Akhir Terlebih dahulu !!!");		
  						      	}else{
  									var akhir = DateHelper.getTanggalFormattedNew($scope.item.periodeAkhir);
  										if($scope.item.jenisPemakaian.id == undefined){
  											alert("Pilih Jenis Pemakaian Terlebih dahulu !!")
  										}else{
											ManageIPSRS.getItemIPSRS("ipsrs-tagihan-business-center/find-by-periode?id="+$scope.item.jenisPemakaian.id+"&&periodeAwal="+awal+"&&periodeAkhir="+akhir, true).then(function(dat){
			   								   $scope.dataBusinessCenter = dat.data.data.ipsrsTagihanBusinessCenter;									
			   								 });

  										}
  									      		
  						      	}
  						   }
  					   }
  				   }
				var init = function () {
					ManageIPSRS.getItemIPSRS("ipsrs-tagihan-business-center/get-all-business-center", true).then(function(dat){
						$scope.dataBusinessCenter = dat.data.data.listTagihanBusinessCenter;
						//debugger;
					});
  				};
  				init();

  				$scope.tutup = function(){
  					debugger
  					$state.go("home");
  				}
  				
  				$scope.duit = function(value, currency) {
    			   return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
				};

 
  				$scope.columnBusinessCenter = [
						{
							field: "jenisPemakaian",
							title: "Jenis Pemakaian",
							width: 100
						},
						{
							field: "periode",
							title: "Periode",
							width: 100,
							filterable: false
						},
						{
							field: "namaRekanan",
							title: "Ruangan",
							width: 150
						},
						{
							field: "jumlahPemakaian",
							title: "Jumlah Pemakaian",
							width: 100,
							filterable: false
						},
						{
							field: "satuan",
							title: "Satuan",
							width: 100,
							filterable: false
						},
						{
							field: "biayaPerBulan",
							title: "Biaya/Bulan",
							width: 100,
							"template": "<span class='style-right'>{{duit('#: biayaPerBulan #', 'Rp.')}}</span>",
							width: 100,
							filterable: false,
							attributes: {
      									  style: "text-align: left"
   										 }
						}];
				
				

			}, function errorCallBack(err) {});
		}
	]);
});