define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPembilasanLinenCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','ManageSarpras',
		function($rootScope, $scope, $state, ModelItem, DateHelper,ManageSarpras) {
		$scope.item = {};
		$scope.now = new Date();
		$scope.daftarPencucianLinen = new kendo.data.DataSource({
			data: [

				]
			});
			
			 $scope.kl = function(current){
				$scope.current = current;
				$scope.item.nmmesin=current.namaMesin;
				$scope.item.kapasitas=current.kapasitas;
				$scope.item.namaPetugas = current.namaPetugas;
				$scope.item.beratLinen=current.beratLinen;
				$scope.item.prosesCuci=current.namaProdukProsesCuci;
				$scope.item.mesinId=current.mesinId;
				$scope.item.petugasId=current.petugasId;
				$scope.item.noRecStrukPelayanan=current.noRecStrukPelayanan;
				$scope.item.namaPelanggan=current.namaPelanggan;
                $scope.item.ruanganAsalId=current.ruanganAsalId;
                debugger;		
				//console.log(JSON.stringify($scope.item.id));
			}
			
			
			 $scope.pindah = function(current){
				 
				$state.go("Pengeringan",{noRecStrukPelayanan:$scope.item.noRecStrukPelayanan,namaPelanggan:$scope.item.namaPelanggan,ruanganAsalId:$scope.item.ruanganAsalId});
				 
			 }
			
			
			$scope.Proses = function () {
				
			 var gaji = moment($scope.item.awal).format("YYYY-MM-DD 00:00:00") ;	
			 var kerja =  moment($scope.item.akhir).format("YYYY-MM-DD hh:mm:ss") ;		
			
			 
			debugger;	
			ManageSarpras.getOrderList("laundry/get-all-pembilasan?startPeriode="+gaji+"&endPeriode="+kerja ).then(function(dat){
			debugger;
			$scope.sourceOrder = dat.data.data;
							
			
			debugger;
			});		
					
			}
			
			
			
			 var onChange = function(e) {
                //var inputId = this.element.attr("id");
              //  console.log(inputId);
                var grid = $(this).data("mainGridOptions");

            }
			
			
			$scope.formatRupiah = function(value, currency) {
			    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
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
                columns: [
				{
                    "field": "noStrukPelayanan",
                    "title": "Nomor Struk",
					"filterable":true		
				},{
                    "field": "status",
                    "title": "Asal Linen",
					"filterable":true		
				},{
                    "field": "tglPencucianLinen",
                    "title": "Tanggal",
				    "width": "200px",
					"template": "#= new moment(new Date(tglPencucianLinen)).format('DD-MM-YYYY') #",
					"filterable":false
				}, {
                    "field": "namaMesin",
                    "title": "Mesin"
                   	
				}, {
                    "field": "kapasitas",
                    "title": "Kapasitas",
                   	"filterable":false	
				}, {
                    "field": "beratLinen",
                    "title": "Berat Linen",
                    "filterable":false	
				}, {
                    "field": "namaProdukProsesCuci",
                    "title": "Proses Cuci"
                    	
				}, {
                    "field": "namaPetugas",
                    "title": "Petugas"
                }, {
                    "field": "statusBayar",
                    "title": "Status Bayar",
                    "filterable":true    	
                }, {
                     "command": [{
                                   name: "edit",
                                        text: "Detail",
                                        text: { cancel: "", edit: "Detail" },
                                        icon: { cancel: "" },
                                        button: { cancel: "" }
                                    }],
                                    "title": "Detail",
                                    width: "100px"
                                	
				
              
                }],
                editable: {
                                mode: "popup",
								window : {
								title: "confirmation form"
								},
                                template: kendo.template($("#template").html())
                            },
                            //Change kendo window title
                            edit: function(e) {
                                e.container.kendoWindow("title", "Detail");
							
								
								
                            },
                            dataBound: function(e) {
                                $("#grid tbody tr .k-grid-edit").each(function() {
                                    var currentDataItem = $("#grid").data("kendoGrid").dataItem($(this).closest("tr"));
                                    debugger;
                                    if (currentDataItem.status == "Internal") {
                                        $(this).closest("tr").find(".k-grid-edit").hide();
                                    } else {

                                    }
                                })
                            }
            };
			
			
			$scope.mainGridOptions_1_2 = function(dataItem) {
               return {
                    dataSource: new kendo.data.DataSource({
						data: dataItem.detailBilas
					}),
                    columns: [
                    {
	                    field: "namaProsesBilas",
	                    title: "Proses Bilas"
	                },
					{
	                    field: "namaBahan",
	                    title: "Nama Bahan"
	                },
					{
	                    field: "jumlah",
	                    title: "Jumlah"
	                },
					{
	                    field: "namaSatuan",
	                    title: "Satuan"
	                }]
                }
			}
			
			
			$scope.mainGridOptions_1_3 = function(dataItem) {
               return {
                    dataSource: new kendo.data.DataSource({
						data: dataItem.produkLinens,
						aggregate: [
									{ field: "totalHargaSatuan", aggregate: "sum" }
	                               ]
						
					}),
                    columns: [
                    {
	                    field: "namaProduk",
	                    title: "Nama Linen",
						width: "100px"
					
	                },
	                {
	                    field: "jumlah",
	                    title: "Jumlah",
						width: "100px"
					   
	                },
					    {
	                    field: "namaSatuan",
	                    title: "Satuan",
						width: "100px"
						
					   
	                },{
	                    field: "hargaSatuan",
	                    title: "Harga Satuan",
						width: "100px",
					    template: "{{formatRupiah('#: hargaSatuan #', 'Rp.')}}"	
						
					},{
	                    field: "totalHargaSatuan",
	                    title: "Total Harga Satuan",
						width: "200px",
						template: "{{formatRupiah('#: totalHargaSatuan #', 'Rp.')}}",	
						footerTemplate: "<center>{{formatRupiah('#: sum #', 'Rp.')}}</center> "	
					   
					}
					
					],     
        resizable: true
					
                }
			}
	
			
			

		  //  $scope.pengeringan=function() {
		  //  	$state.go("Pengeringan")
		  //  }

		}
	]);
});