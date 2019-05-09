define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarReturSterilisasiAlatCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras','IPSRSService', 'DateHelper', '$state',
		function($rootScope, $scope, ModelItem, ManageSarpras, IPSRSService, DateHelper, $state) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.dataPost = [];


			var init = function () {
				$scope.no = 1;
				IPSRSService.getItem("retur-cssd/list-retur-cssd?tanggalAwal=&tanggalAhir=&produkId=&jenisProdukId=&kelompokProdukId=").then(function(dat){
					$scope.dataGrid = dat.data.data;
					$scope.dataGrid.forEach(function (data) {
						var tanggal = new Date(data.tglRetur);
						data.no = $scope.no++;
						data.tglRetur = DateHelper.getTanggalFormatted(tanggal);
					})	
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 5,
						data: $scope.dataGrid,
						batch: true/*,
						schema: {
                        model: {
                            fields: {
                                namaProduk: { editable: false},
                                satuanStandar: { editable: false},
                                qtyProduk: { editable: false},
                                jamMulai: { editable: true},
                                jamSelesai: { editable: true}
                            }
                        }
                        }*/
                   
					});
				});
			};
			init();
			
			$scope.listStatus = [
			{"id":1,"name":"Dikirim"},
			{"id":2,"name":"Belum Dikirim"}]
			$scope.timeEditor = function(container, options) {
                $('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
		            .appendTo(container)
		            .kendoTimePicker({});
            }

            $scope.Refresh = function(){
            	debugger
            	$scope.item.tglAwal = undefined;
            	$scope.item.tglAkhir = undefined
            	init();
            	$scope.Pencarians = "";
            	
            }


          $scope.ChangeDate = function(){
	    	$scope.Rubahdat = false;
	    	$scope.Pencarians = "";
	    	$scope.Pencarians = undefined;
	    	$scope.cari();
	    }

          $scope.cari = function (Pencarians) {
          	debugger
          	var tanggalawal =  new moment($scope.item.tglAwal).format("YYYY-MM-DD")
          	var tanggalakhir =  new moment($scope.item.tglAkhir).format("YYYY-MM-DD");
          	var GetPencarian = Pencarians;
				$scope.no = 1;
				if(GetPencarian == undefined && $scope.Rubahdat == false){
					IPSRSService.getItem("retur-cssd/list-retur-cssd?tanggalAwal="+tanggalawal+"&tanggalAhir="+tanggalakhir+"&produkId=&jenisProdukId=&kelompokProdukId=").then(function(dat){
					$scope.dataGrid = dat.data.data;
					$scope.dataGrid.forEach(function (data) {
						var tanggal = new Date(data.tglRetur);
						data.no = $scope.no++;
						data.tglRetur = DateHelper.getTanggalFormatted(tanggal);
					})	
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 5,
						data: $scope.dataGrid,
						batch: true/*,
						schema: {
                        model: {
                            fields: {
                                namaProduk: { editable: false},
                                satuanStandar: { editable: false},
                                qtyProduk: { editable: false},
                                jamMulai: { editable: true},
                                jamSelesai: { editable: true}
                            }
                        }
                        }*/
                   
					});
				});
				 $scope.Rubahdat = true;
			  }else{	
			  	$scope.cariData(GetPencarian);
			  }
			};

       $scope.cariData = function(GetPencarian){
       	debugger
       	   if(GetPencarian != undefined){
			  var q = GetPencarian;
		      var grid = $("#grid").data("kendoGrid");
		     	  grid.dataSource.query({
		          page:1,
		          pageSize:20,
		          filter:{
		          	logic:"or",
		         		 filters:[
		            		       {field:"noOrder", operator:"contains",value:q},
		            		       {field:"noRetur", operator:"contains",value:q},
		            		       {field:"petugasname", operator:"contains",value:q}
		           				 ]
		           }
		      });
	       }

       }


			$scope.gridDistribusiInternal = { 
				pageable: true,
				toolbar: ["cancel"],
				columns: [
				{ field:"no",title:"<h3 align=center>No.<h3>", width:50},
				{ field:"noOrder",title:"<h3 align=center>No Order<h3>", width:100},
				{ field:"noRetur",title:"<h3 align=center>No Retur<h3>", width:100},
				{ field:"tglRetur",title:"<h3 align=center>Tanggal Retur<h3>", width:100},
				{ field:"namaProduk",title:"<h3 align=center>Nama Barang<h3>", width:200},
				{ field:"qtyProduk",title:"<h3 align=center>Jumlah<h3>", width:100},
				{ field:"namaRuangan",title:"<h3 align=center>Nama Ruangan<h3>", width:200},
				{ field:"namaPegawai",title:"<h3 align=center>Nama Pegawai<h3>", width:100},
				{ field:"keterangan",title:"<h3 align=center>Keterangan<h3>", width:100},
				],
				editable: false
			};

			$scope.simpanInternal = function () {
				var dataPengemasan = []
				for (var i=0;i<$scope.dataSource._data.length;i++){
					var dataTemp =
					{
						"produk": {
					    	"id": $scope.dataSource._data[i].produkId
					    },
					    "qtyProduk": $scope.dataSource._data[i].qtyProduk,
					    "noRec": $scope.dataSource._data[i].noRec,
					    "jamMulai":$scope.dataSource._data[i].jamMulai,
         				"jamSelesai":$scope.dataSource._data[i].jamAkhir
					}
					dataPengemasan.push(dataTemp);
				}
				var data = 
				{
				  "strukPelayanan": {
				    "noRec": $state.params.strukPelayananId
				  },
				  "noRec": $scope.dataHeader.noRec,
				  "tanggal": $scope.item.tanggal,
				  "cssdPengemasanDetail": dataPengemasan
				}
				ManageSarpras.saveDataSarPras(data, "cssd-pengemasan/save-pengemasan/").then(function (e) {
					init();
				});
			}

			$scope.dataSource = new kendo.data.DataSource({
				pageSize: 5,
				data: $scope.dataDitribusiEksternal,
				autoSync: true
			});
			$scope.gridDistribusiEksternal = { 
				pageable: true,
				columns: [
				{ field:"namaPaket", title:"<h3 align=center>Nama Paket<h3>"},
				{ field:"namaBarang",title:"<h3 align=center>Nama Barang<h3>"},
				{ field:"jumlah",title:"<h3 align=center>Jumlah<h3>"},
				{ field:"satuan",title:"<h3 align=center>Satuan<h3>"}
				],
				editable: false
			};
		}
		]);
});