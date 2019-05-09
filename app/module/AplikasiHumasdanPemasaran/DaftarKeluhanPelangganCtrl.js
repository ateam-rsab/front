define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarKeluhanPelangganCtrl', ['$rootScope', '$scope', 'ModelItem','IPSRSService','$state','ManageSarpras',
		function($rootScope, $scope, ModelItem,IPSRSService,$state,ManageSarpras) {
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.now = new Date();
      		$scope.monthUngkul = {
			 start: "year",
			 depth: "year"
		    }
			$scope.tahunpilih = {
				start: "decade",
				depth: "decade"
			}

			$scope.OnChangeBulan = function(month, year){
				$scope.nomor = 1;
				var tahunSkrg = new Date();
				var bulanSkrg = new Date();
				if(year == tahunSkrg){
					var taun = parseInt(new moment(new Date()).format('YYYY'));
				}else{
					var taun = parseInt(new moment(year).format('YYYY'));
				}
				if(month == bulanSkrg){
					var bulan = parseInt(moment(new Date()).format("MM"));	
				}else{
					var bulan = parseInt(moment(month).format("MM"));
				}

			     IPSRSService.getItem("keluhan-pelanggan/get-keluhanpelanggan-by-period?bulan="+bulan+"&tahun="+taun, true).then(function(dat){
					if(dat.data.data.data != undefined){
						for(var i=0; i<dat.data.data.data.length; i++){
							dat.data.data.data[i].no = $scope.nomor++
						}
						$scope.sourceOrder = dat.data.data;
					 }else{
					 	$scope.sourceOrder = {};
					 }
				  });
			}
			

			$scope.ClearCari = function(){
				$scope.item.Cari = ""
				var grid = $("#kGrid").data("kendoGrid");
				grid.dataSource.filter({});
			}

            $scope.cari = function(e){
                var dataSource = e;
         		var nomor = 1;
				var bulans =  parseInt(moment($scope.item.bulan).format("MM"));
				var tahuns =  moment($scope.item.tahun).format("YYYY");
				var taun = parseInt(tahuns);

	            if (bulans==undefined){
	            	alert("Data Bulan Tidak Boleh Kosong")
	            }else if(tahuns==undefined){
	            	alert("Data Tahun Tidak Boleh Kosong")
	            }
	            IPSRSService.getItem("keluhan-pelanggan/get-keluhanpelanggan-by-period?bulan="+bulans+"&tahun="+taun, true).then(function(dat){
					for(var i=0; i<dat.data.data.data.length; i++){
						dat.data.data.data[i].no = nomor+++"."
					}
					$scope.sourceOrder = dat.data.data;
			    });	
            }

            $scope.CariKeluhan = function(dataSource){
            	var q = dataSource;
            	var grid = $("#kGrid").data("kendoGrid");
            	grid.dataSource.query({
            		page:1,
            		pageSize:20,
            		filter:{
            			logic : "or",
            			filters : [{field:"namaPasien", operators:"contains", value : q}, 
            			           {field:"umur", operators:"contains", value : q},
            			           {field:"email", operators:"contains", value : q}]
            		}
            	})
            }


            $scope.OnInit = function(){
				$scope.item.bulan = new Date();
				$scope.item.tahun = new Date();
			  $scope.cari();
			}
			$scope.OnInit();
         
			

			$scope.batal = function(){
			  $scope.item= {};
			}
			
			$scope.kl = function(current){
			 	toastr.info(current.namaPasien+" Terpilih");
				$scope.current = current;
				$scope.item.keluhan = current.keluhan;
				$scope.item.saran = current.saran;
				$scope.item.namaPasien=current.namaPasien;
				$scope.item.email=current.email;
				$scope.item.idKeluhan = current.id;
				console.log(JSON.stringify($scope.item.id));
			}


			 $scope.pindah = function(current){
			 	if($scope.item.email != undefined && $scope.item.namaPasien != undefined && $scope.item.email != undefined){
				   $state.go("PenangananKeluhanPelanggan",
				  	  {
				  	  	email:$scope.item.email,
				  	  	namaPasien:$scope.item.namaPasien,
				  	  	idKeluhan : $scope.item.idKeluhan,
				  	  	keluhan : $scope.item.keluhan,
				  	  	saran : $scope.item.saran
				  	  }
				   );			 		
			 	}else{
			 		window.messageContainer.error('Data yang dipilih belum lengkap');
			 	}
			 }


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
					 toolbar: ["excel"],
			            excel: {
			                fileName: "DashboardPerbaikan.xlsx",
			                filterable: false
			         },
					columns: [
					{
						"field": "no",
						"title": "<h3 align=center>No.<h3>",
						"width": "30px",
						"filterable" : false,
						"attributes" : { style:"text-align:center"}
						  
					},			
					{
						"field": "namaPasien",
						"title": "<h3 align=center>Nama<h3>",
						"width": "180px",
						"filterable" : false
					},
					{
						"field": "umur",
						"title": "<h3 align=center>Umur<h3>",
						"width": "100px",
						"filterable" : false
					},
					{
						"field": "email",
						"title": "<h3 align=center>Email<h3>",
						"width": "150px",
						"filter" : false
					},
					{
						"field": "keluhan",
						"title": "<h3 align=center>Keluhan<h3>",
						"width": "150px",
						"filter" : false
					}
					]
				}
		}
	]);
});