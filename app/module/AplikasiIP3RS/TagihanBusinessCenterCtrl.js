define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('TagihanBusinessCenterCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', 'ManageIPSRS',
		function($rootScope, $scope, ModelItem, IPSRSService, ManageIPSRS) {
			ModelItem.get("IPSRS/TagihanBusinessCenter").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;

				$scope.$watch('item.jenisPemakaian', function() {
        		 $scope.satuan();
    			});

				ManageIPSRS.getItemIPSRS("ipsrs-tagihan-business-center/get-ruangan-business-center", true).then(function(dat){
					$scope.listRuangan = dat.data.data.listRuangan;
				});
				ManageIPSRS.getItemIPSRS("ipsrs-tagihan-business-center/get-jenis-business-center", true).then(function(dat){
					$scope.listJenisPemakaian = dat.data.data.jenisPemakaian;
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

				$scope.satuan = function () {
  					if($scope.item.jenisPemakaian.jenisPemakaian == "Telepon"){
  						$scope.hideTelepon = true
  						$scope.disMeterAwal = true;
  						$scope.disMeterAkhir = true;
  					} else {
  						$scope.hideTelepon = false;
  						$scope.disMeterAwal = false;
  						$scope.disMeterAkhir = false;
  					}
  					var jenisPemakaianId = $scope.item.jenisPemakaian.id;
  					if(jenisPemakaianId != undefined){
  						if(jenisPemakaianId != ""){
							ManageIPSRS.getItemIPSRS("ipsrs-tagihan-business-center/get-kapasitas-jenis-business-center?id="+jenisPemakaianId, true).then(function(dat){
							// debugger
							$scope.listSatuan = dat.data.data.kapasitasJenisPemakaian;
							$scope.item.satuan = {
                           		   jenisPemakaian : $scope.listSatuan[0].jenisPemakaian,
						   		   satuan : $scope.listSatuan[0].satuan
								  }
							});
					      }
					   }
  				 };

  			    $scope.$watch('item.biayaPerBulan', function() {
					// debugger
				 $scope.ArrayCurency = parseInt($scope.item.biayaPerBulan);
    			});
  				var init = function () {
					ManageIPSRS.getItemIPSRS("ipsrs-tagihan-business-center/get-all-business-center", true).then(function(dat){
						$scope.dataTagihanBusinessCenter = dat.data.data.listTagihanBusinessCenter;
					});
  				};
  				init();

				$scope.simpan=function()
				{	
					var data = 
					{
					  	"ipsrsKapasitasJenisPemakaian": {
					  	  "id": $scope.item.jenisPemakaian.id
					  	},
					  	"noRec" : $scope.noRecGrid,
					  	"biayaPerBulan": $scope.item.biayaPerBulan,
					  	"satuanStandar": {
					  	  "id": $scope.item.satuan.jenisPemakaian
					  	},
					  	"periode": $scope.item.periode,
					  	"ruangan": {
					  	  "id": $scope.item.ruangan.id
					  	},
					  	"jenisPemakaian": $scope.item.jenisPemakaian.jenisPemakaian,
					  	"jumlahPemakaian": $scope.item.jumlahPemakaian,
					  	"jumlahMeterAhir": $scope.item.jumlahMeterAkhir,
					  	"jumlahMeterAwal": $scope.item.jumlahMeterAwal
					}
					ManageIPSRS.saveDataSarPras(data,"ipsrs-tagihan-business-center/save-business-center").then(function(e) {
						console.log(JSON.stringify(e.data));
						$scope.item = {};
						$scope.item.periode = "";
						init();
	                });
				};
				$scope.kl = function(current){
					// debugger
					$scope.current = current;
					$scope.noRecGrid = current.noRec
					$scope.item.jenisPemakaian = {id:current.idSatuan, jenisPemakaian : current.jenisPemakaian};
					$scope.item.satuan = {jenisPemakaian : current.idSatuan, satuan : current.satuan};
					$scope.item.ruangan = {id : current.idRekanan, namaRekanan : current.namaRekanan};
					$scope.item.periode = current.periode;
					$scope.item.jumlahMeterAwal = current.jumlahMeterAwal;
					$scope.item.jumlahMeterAkhir = current.jumlahMeterAhir;
				  	$scope.item.jumlahPemakaian = current.jumlahPemakaian;
				    $scope.item.biayaPerBulan = current.biayaPerBulan;
        	     };
				  
				  $scope.hapus=function()
					{
						ManageIPSRS.getItemIPSRS("ipsrs-tagihan-business-center/delete-business-center?noRec="+$scope.noRecGrid, true).then(function(dat){
							init();
						});
						$scope.item.jenisPemakaian = "";
						$scope.item.satuan = "";
						$scope.item.ruangan = "";
						$scope.item.periode = "";
						$scope.item.jumlahMeterAwal = "";
						$scope.item.jumlahMeterAkhir = "";
						$scope.item.jumlahPemakaian = "";
						$scope.item.biayaPerBulan = "";
				    };
				 

				$scope.batal = function () {
					$scope.item = {};
				};

				$scope.removeTagihanBusinessCenter = function(e) {
					e.preventDefault();
	 
				    var grid = this;
				    var row = $(e.currentTarget).closest("tr");
				    grid.removeRow(row);
				};


				$scope.total = function () {
   					var awal = parseInt($scope.item.jumlahMeterAwal);
    				var akhir = parseInt($scope.item.jumlahMeterAkhir);
   					$scope.item.jumlahPemakaian = akhir-awal;
  				};
  				
  				$scope.duit = function(value, currency) {
    			   return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
				};

				$scope.baru = function(){
					$scope.item.jenisPemakaian = "";
					$scope.item.satuan = "";
					$scope.item.ruangan = "";
					$scope.item.periode = "";
					$scope.item.jumlahMeterAwal = "";
					$scope.item.jumlahMeterAkhir = "";
					$scope.item.jumlahPemakaian = "";
					$scope.item.biayaPerBulan = "";
					$scope.noRecGrid = undefined;
					
				}

				

				$scope.columnTagihan = [
						{
							field: "jenisPemakaian",
							title: "Jenis Pemakaian",
							width: 100
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
							filterable : false
						},
						{
							field: "satuan",
							title: "Satuan",
							width: 100,
							filterable : false
						},
						{
							field: "biayaPerBulan",
							title: "Biaya/Bulan",
							"template": "<span class='style-right'>{{duit('#: biayaPerBulan #', 'Rp.')}}</span>",
							width: 100,
							filterable : false,
							attributes: {
      									  style: "text-align: left"
   										 }
						}];	      	
			}, function errorCallBack(err) {});
		}
	]);
});
