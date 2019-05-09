define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('PengeringanCtrl', ['$rootScope', '$scope', '$state', 'ModelItem','DateHelper','ManageSarpras','FindSarpras',
		function($rootScope, $scope,$state, ModelItem , DateHelper,ManageSarpras,FindSarpras){
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.tglCariAwal=$scope.now;
			$scope.item.tglCariAkhir=$scope.now;
			$scope.dataPost=[];

			$scope.beratLinen = $state.params.beratLinen;
		    $scope.noRecStrukPelayanan=$state.params.noRecStrukPelayanan;
			$scope.namaPelanggan=$state.params.namaPelanggan;
			$scope.ruanganAsalId=$state.params.ruanganAsalId;
		    Proses();
            function  Proses () {
			 var rec =   $scope.noRecStrukPelayanan;	
		    //var period =  moment($scope.item.Periode).format("MM-YYYY");	
			ManageSarpras.getOrderList("laundry/get-pembilasan-to-pengeringan?noRecStrukPelayanan="+rec ).then(function(dat){
			debugger;
			$scope.sourceOrder = dat.data.data.produkLinens;
			debugger;
			});			
			}
			
			FindSarpras.getSarpras("user/get-user").then(function(dat){
				$scope.item.petugas = dat.data.data.namaUser;
			    $scope.item.petugasx=dat.data.data.pegawai.id;
				 debugger;
			});

			$scope.Pengeringan = function(){
				debugger
				$state.go('DaftarPengeringan')
			}


			$scope.mainGridOptions_2_1 = {
				pageable: true,
				scrollable: false,
				shortable: true,
				dataBound: function() {
		            var data = this.dataSource.view();
		            for(var i=0; i<data.length; i++){
			            if(data[i].status == "MENUNGGU"){
			                var row = this.tbody.find("tr[data-uid='"+data[i].uid+"']");
			                /*data[i].set("LastName", true);*/ //if the field is boolean and the column contains a checkbox it will be checked
			                row.css("background-color", "red");
			                this.expandRow(row).first();
			            }
		            }
		        },
				columns: [
					{
					"field": "namaProduk",
					"title": "Nama Linen",
					"width": "100px"
				}, {
					"field": "jumlah",
					"title": "Jumlah",
					"width": "300px",
				}, {
					"field": "namaSatuan",
					"title": "Satuan",
					"width": "100px"
				}, {
					"field": "hargaSatuan",
					"title": "Harga Satuan",
					"width": "100px",
					"template": "{{formatRupiah('#: hargaSatuan #', 'Rp.')}}"	
				}, {
					"field": "totalHargaSatuan",
					"title": "Total Harga",
					"width": "150px",
					"template": "{{formatRupiah('#: totalHargaSatuan #', 'Rp.')}}"	
				}
				]
			};


			$scope.toggleSelectAll = function(ev) {
				debugger
				var grids = $('#kGrid').data("kendoGrid");
				var grid = $(ev.target).closest("[kendo-grid]").data("kendoGrid");
				var items = grid.dataSource.data();
				items.forEach(function(item){
					item.selected = ev.target.checked;
					if (item.selected == true) {
						$scope.selectRow(item);
					} else {
						$scope.selectRow(item);
					}
					
				});
			};
			


         $scope.kembali = function(){
         	$state.go("DaftarPencucianLinen");
         }


		
        $scope.mainGridOptions_3_1 = {
         	pageable: true,
         	scrollable:true,
         	sortable: false,
         	filterable: {
         		extra: false,
         		operators: {
         			string: {
         				startswith: "Starts with"
         			}
         		}
         	},
         	columns: [
         	{
         		width: "50px",
         		title:  "<center><input id='detailSelectAll' type='checkbox' title='Select all' ng-click='toggleSelectAllData($event)' />",
         		template: "<div class='center'><input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='selectDataPasien($event)' </div>"
         	},
         	{
         		"field": "namaPasien",
         		"width": "90%",
         		"title": "Nama Pasien",
         		filterable: false
         	}
         	]
         };
     
		$scope.Save = function() {
				debugger;
				var data1 = {
                    "tgl" :  moment($scope.item.tanggalPengeringan).format("YYYY-MM-DD"),
					"tglKerja" : moment($scope.item.tanggalKerja).format("YYYY-MM-DD"),
					"petugasId" : $scope.item.petugasx,
					"namaPetugas" : $scope.item.petugas,
					"jumlahCycle" : $scope.item.jumlahCycle,				
				    "noRecStrukPelayanan" : $scope.noRecStrukPelayanan,
					"ruanganAsalId" : $scope.ruanganAsalId
			}			
           
           ManageSarpras.savePengeringan(data1,"laundry/save-pengeringan").then(function (e) {
				 debugger;
                //  $scope.item= {};
                  init();  
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
             });
            };
			
			
			
			}
			])
})