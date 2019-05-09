define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarJadwalSeleksiCtrl', ['$rootScope', '$scope', 'ModelItem','$state','ManageSdm',
		function($rootScope, $scope, ModelItem,$state,ManageSdm) {
			ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
				$scope.item = data;
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
			
			 
			  $scope.Listketerangan = [{
					"id": 1,
					"kode": "1",
					"name": "2016"
				}];
				
				
				$scope.ganti = function() {
				
				if ($scope.item.tahunUMR.name=="2016")
				{
					$scope.item.jumlahUMR="2300000";
					
				}
				else
				{
					$scope.item.jumlahUMR="";
					
				}
				
			}
					
					
					
					
				

			
			 
			 
			  $scope.pindah1 = function(){
				 
				$state.go("DataKeluarga");
				 
			 }
			
			
			
			
			
			
			
			$scope.columnLaporanUjiHasil = [
			{
				"field": "no",
				"title": "Kode Sub Unit Kerja ",
				"width": "5%"
			},
			{
				"field": "nama",
				"title": "Nama Sub Unit Kerja",
				"width": "20%"
			}
			];
			
			 $scope.cari = function () {
				 
			var periode = moment($scope.item.Periode).format("MM-YYYY");	 
			ManageSdm.getOrderList("rekrutmen/get-jadwal-seleksi?periodeLowongan="+periode, true).then(function (dat) {
				$scope.ListTampilGrid = new kendo.data.DataSource({
				data: dat.data.data
			});				
			
		
			});	
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
			columns:[{
				"field": "noPlanning",
				"title": "No. Planning",
				"width": "15%",
				filterable:true
			},
			{
				"field": "tglPlanning",
				"title": "Tanggal Rencana Seleksi",
				"width": "20%"
			},
			{
				"field": "namaProdukRs",
				"title": "Jenis Test",
				"width": "20%"
			},
			{
				"field": "namaRuangan",
				"title": "Ruangan",
				"width": "20%"
			},
			{
				"field": "namaPetugas",
				"title": "Petugas Penanggung Jawab",
				"width": "20%"
			},{
                     "command": [{
                                   name: "edit",
                                        text: "Peserta",
                                        text: { cancel: "", edit: "Peserta" },
                                        icon: { cancel: "" },
                                        button: { cancel: "" }
                                    }],
                                    "title": "Rincian Peserta",
                                    width: "150px"
                                	
				
              
                },{
				"field": "qtyPeserta",
				"title": "Quantity Peserta",
				"width": "20%",
				filterable:false
			}],editable: {
                                mode: "popup",
								window : {
								title: "confirmation form"
								},
                                template: kendo.template($("#template").html())
                            },
                            //Change kendo window title
                            edit: function(e) {
                                e.container.kendoWindow("title", "Rincian Peserta");
								
								
								
                            },
                            dataBound: function(e) {
                                $("#grid tbody tr .k-grid-edit").each(function() {
                                    var currentDataItem = $("#grid").data("kendoGrid").dataItem($(this).closest("tr"));
                                    debugger;
                                  
                                })
                            }		
			
		
			 };	
			 
			 
			 			 $scope.mainGridOptions_1_3 = function(dataItem) {
               return {
                    dataSource: new kendo.data.DataSource({
						data: dataItem.pesertas
					}),
                    columns: [
                    {
	                    field: "pelamarId",
	                    title: "Nomor Peserta",
						width : "70%"
	                },
	                {
	                    field: "namaLengkap",
	                    title: "Nama Lengkap",
					    width : "70%"
	               
					   
	                },{
	                    field: "namaPendidikan",
	                    title: "Degree",
						width : "50%"
					},{
	                    field: "kualifikasiJurusan",
	                    title: "Jurusan",
						width : "60%"
					},{
	                    field: "ipkNilai",
	                    title: "Nilai",
						width : "50%"						
					},{
	                    field: "posisiLamar",
	                    title: "Posisi Dilamar",
                        width : "70%"						
						
					   
	                }
					
					
					]
                }
			}
			
		
			

			
			
			$scope.Save = function() {
						
			  
             ManageSdm.savePremiKesehatan(ModelItem.beforePost($scope.item)).then(function (e) {
                  $scope.item= {};
                   init();  
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
             });


            };
			
			
			
			
			
			

			$scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };

          
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
	]);
});