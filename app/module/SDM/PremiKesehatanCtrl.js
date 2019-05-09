define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PremiKesehatanCtrl', ['$rootScope', '$scope', 'ModelItem','$state','NamaAsuransi','ManageSdm',
		function($rootScope, $scope, ModelItem,$state,NamaAsuransi,ManageSdm) {
			ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
				$scope.item = {};
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.no=1;
			
			ModelItem.getDataDummyGeneric("Penandatangan", true).then(function(data) {
				$scope.listPenandatangan = data;
			})
			$scope.dataLaporanUjiHasil = new kendo.data.DataSource({
				data: [{}]
			});
			
			 $scope.pindah = function(){
				 
				$state.go("RekamDataPegawai");
				 
			 }
			 NamaAsuransi.getOrderList("service/list-generic/?view=NamaAsuransi&select=*", true).then(function(dat){
				$scope.ListNamaAsuransi = dat.data;
		
				});		
			 
			  $scope.Listketerangan = [{
					"id": 1,
					"kode": "1",
					"name": "2016"
				}];
				
				
			$scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };
				
			$scope.periode = function () {
			$scope.item.jumlahumr = $scope.item.Periode;
		//	if ($scope.item.Periode==undefined)
			//	{
			//	$scope.item.jumlahumr=undefined;	
			//	}
			//	else
			//	{
			//		$scope.item.Periode=$scope.item.jumlahumr;
					
			//	}
        //   debugger;				
				
			}


			



			$scope.aqua = function() {
				
				var gaji = moment($scope.item.Periode).format("MM-YYYY"); 
				
                ManageSdm.getOrderList("pay-roll/find-umr?periode="+gaji, true).then(function(dat) {
				
				$scope.listhubunganpeserta=dat.data.data;
				
				$scope.item.jumlah = $scope.formatRupiah(dat.data.data.umr,"");
				
			debugger;
			
            });
				
			 }
					
			$scope.formatRupiah = function(value, currency) {
			    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}		
					
			ManageSdm.getOrderList("pay-roll/find-rekanan-penjamin-pasien", true).then(function (dat) {
				$scope.listrekanan=dat.data.data;
	
			
			});	
			
			 ManageSdm.getOrderList("pay-roll/find-jenis-gaji", true).then(function(dat) {
				
				$scope.listgaji=dat.data.data;
            });

			
		     function Proses () {
				
			 var gaji = $scope.item.jenisGaji.id ;	
			 var rekanan =  $scope.item.namaAsuransi.id;	
			 var period =  moment($scope.item.Periode).format("MM-YYYY");
			 
			debugger;	
			ManageSdm.getOrderList("pay-roll/get-premi-asuransi?idJenisGaji="+gaji+"&idRekanan="+rekanan+"&periode="+period ).then(function(dat){
			debugger;
			$scope.sourceOrder = new kendo.data.DataSource({
				data: dat.data.data
			});				
			$scope.item.nomorGaji = dat.data.data[0].noGaji;
			debugger;
			
			});	
		
				
			}
			
			
			$scope.viewgrid = function(){
			 
			 var gaji = $scope.item.jenisGaji.id ;	
			 var rekanan =  $scope.item.namaAsuransi.id;	
			 var period =  moment($scope.item.Periode).format("MM-YYYY");	 
		     Proses();
         			
				
				
			}
 
			 
			 
			
			
			
			
			
			
			
			$scope.columnLaporanUjiHasil = [
			
			{
				"field": "namaLengkap",
				"title": "Nama",
				"width": "20%"
			},
			{
				"field": "tglLahir",
				"title": "Tanggal Lahir",
				"width": "20%",
				"template": "#= new moment(new Date(tglLahir)).format('DD-MM-YYYY') #"
			},
			{
				"field": "noAsuransi",
				"title": "No Kartu Asuransi/Polis",
				"width": "20%"
			},
			{
				"field": "premiDiBayarPegawai",
				"title": "Premi dibayar Pegawai",
				"width": "20%",
				"template": "{{formatRupiah('#: premiDiBayarPerusahaan #', 'Rp.')}}"
			},
			{
				"field": "premiDiBayarPerusahaan",
				"title": "Premi dibayar RS",
				"width": "20%",
				"template": "{{formatRupiah('#: premiDiBayarPerusahaan #', 'Rp.')}}"	
			},
			{
				"field": "jumlahPremiDiBayar",
				"title": "Jumlah Premi yang dibayarkan",
				"width": "20%",
				"template": "{{formatRupiah('#: jumlahPremiDiBayar #', 'Rp.')}}"	
			}
			];
		
			

			
			
			 $scope.Save = function() {
						
			  
          var detail = $scope.sourceOrder._data;
				var i = 0;
				var detailHVA = [];
				detail.forEach(function (data) {
					var data = {
						
						
						"namaLengkap": data.namaLengkap
					
						
					
						
					}
					detailHVA[i] = data;
					i++;
				})			
	
				
			 	
             ManageSdm.savePremiAsuransi(detail,"pay-roll/save-premi-asuransi").then(function (e) {
				 debugger;
                //  $scope.item= {};
                 // init();  
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
             });


            }
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
	]);
});