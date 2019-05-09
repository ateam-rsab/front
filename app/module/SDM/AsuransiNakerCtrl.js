define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('AsuransiNakerCtrl', ['$rootScope', '$scope', 'ModelItem', '$state','ManageSdm',
        function($rootScope, $scope, ModelItem, $state,ManageSdm) {
            ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
                $scope.item = {};
                $scope.now = new Date();
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) {});
            $scope.no = 1;
			
			
			
			
			
			 $scope.ganti = function() {
				    
                if ($scope.item.namaPegawai == $scope.item.namaPegawai) {
                    $scope.item.nip = $scope.item.namaPegawai.nipPegawai;
					$scope.item.tanggalLahir = moment($scope.item.namaPegawai.tglLahir).format("DD-MM-YYYY");
					$scope.item.pegId = $scope.item.namaPegawai.pegawaiId;
					$scope.item.tanggalLahirx = moment($scope.item.namaPegawai.tglLahir).format("YYYY-MM-DD");
                
                }
				
			 }	
			 
			 
			 
			  $scope.ok = function() {
			    //debugger; 
                if ($scope.item.namaAsuransi == $scope.item.namaAsuransi) {
				    $scope.item.namaAsuransi.id = $scope.item.namaAsuransi.id;
				}
				    var a = $scope.item.namaAsuransi.id;
					$scope.item.id = a;
					
                       
					
					
                   
                
				
			 }	
				
			
			
           

             var onChange = function(e) {
                //var inputId = this.element.attr("id");
              //  console.log(inputId);
                var grid = $(this).data("mainGridOptions");

            }
            
            $scope.mainGridOptions = {
				pageable:true,
				change:onChange,
				pageSize:10,
				selectable:'row',
				scrollable:true,
				 filterable: {
                            extra: false,
                            operators: {
                               string: {
                                   startswith: "Dimulai dengan",
                                    contains: "mengandung kata",
                                   neq: "Tidak mengandung kata"
                                }
                            }
                        },
                columns: [{
                "field": "nipPegawai",
                "title": "NIP ",
                "width": "20%"
            }, {
                "field": "namaPegawai",
                "title": "Nama Pegawai",
                "width": "20%"
            }, {
                "field": "namaPesertaAsuransi",
                "title": "Nama Pemegang Asuransi",
                "width": "20%"
            }, {
                "field": "namaHubunganPeserta",
                "title": "Hubungan Peserta",
                "width": "20%"
            }, {
                "field": "rekananNamaAsuransi",
                "title": "Asuransi",
                "width": "20%"
			}, {
                "field": "noKartuPolis",
                "title": "No Kartu/Polis",
                "width": "20%"	
            }],
                pageable: true,
                sortable: false,
                selectable: "row",
                editable: "popup"
            };
           



            ManageSdm.getOrderList("peserta-asuransi-bpjs-naker/get-all-hubungan-peserta", true).then(function(dat) {
				
				$scope.listhubunganpeserta=dat.data.data;
				
			
            });
			
			var init = function () {
			 ManageSdm.getOrderList("peserta-asuransi-bpjs-naker/get-all-peserta-asuransi-bpjs-naker", true).then(function(dat) {
				
				$scope.sourceOrder=dat.data.data;
			
            });
			}
			init();
			
			
		
		     ManageSdm.getOrderList("peserta-asuransi-bpjs-naker/get-all-pegawai-aktif", true).then(function(dat) {
				
				$scope.namPeg=dat.data.data;
		
			
            });
		
		
			
			ManageSdm.getOrderList("pay-roll/find-rekanan-penjamin-pasien", true).then(function (dat) {
				$scope.listrekanan=dat.data.data;
		    //debugger;
			
			});
           
		 


          $scope.Save = function() {
				//debugger;
				var data1 = {
					
					
					"tglLahir":$scope.item.tanggalLahirx,
				    "rekananAsuransiId": $scope.item.id,
					"pegawaiId": $scope.item.pegId,
					"nipPegawai": $scope.item.nip,
					"asuransiPasienId":"" ,
					"noKartuPolis":$scope.item.nomorKartu,
					"namaPesertaAsuransi":$scope.item.namaPemegang ,
					"namaHubunganPeserta":"",
					"namaPegawai": "",
					"rekananNamaAsuransi":"" ,
					"hubunganPesertaId":$scope.item.hubunganPeserta.id 
				
					
					
					
					
					
					
				}			
	
						
			 	
             ManageSdm.saveNaker(data1,"peserta-asuransi-bpjs-naker/save-peserta-asuransi-bpjs-naker").then(function (e) {
				 //debugger;
                //  $scope.item= {};
                  init();  
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
             });


            };






















        }
    ]);
});
