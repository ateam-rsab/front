define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RevDaftarPemesananLaundryCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageSarpras', 'FindSarpras', '$state',
		function($rootScope, $scope, ModelItem, DateHelper, ManageSarpras, FindSarpras, $state) {
			$scope.item = {};
			ModelItem.get("Laundry/Pencucianlinen").then(function(data) {
				$scope.item = data;
				$scope.no = 1;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			$scope.no = 1;
			$scope.satuan = function() {
				$scope.item.satuanKg = $scope.item.mesin.satuanStandarKapasitas;
				$scope.item.kapasitas = $scope.item.mesin.kapasitas;
			};
			FindSarpras.getSarpras("laundry/get-order-laundry-sebelum-diterima").then(function(dat){
			  var Getdata = [];
			  $scope.SourceDaftarPemesananLaundry2 = dat.data.data;
			  for(var x=0; x<$scope.SourceDaftarPemesananLaundry2.length; x++){
			  	  var nomor = $scope.no+++".";
			  	  $scope.SourceDaftarPemesananLaundry2[x].tglstruk = new moment(new Date($scope.SourceDaftarPemesananLaundry2[x].tglstruk)).format('DD-MM-YYYY');
			  	  if($scope.SourceDaftarPemesananLaundry2[x].tglterimakiriman == null){
			  	  	debugger
			  	  	 $scope.SourceDaftarPemesananLaundry2[x].tglterimakiriman = new moment(new Date($scope.SourceDaftarPemesananLaundry2[x].tglterimakiriman)).format('DD-MM-YYYY');
			  	  }else{
			  	  	$scope.SourceDaftarPemesananLaundry2[x].tglterimakiriman = "-"
			  	  }
			  	  $scope.SourceDaftarPemesananLaundry2[x].no = nomor;
			  	  if($scope.SourceDaftarPemesananLaundry2[x].namaPenerima == null){
			  	  	 $scope.SourceDaftarPemesananLaundry2[x].namaPenerima = "Pegawai Belum Menerima"
			  	  }
			  	  Getdata.push($scope.SourceDaftarPemesananLaundry2[x])	
			  }
			  $scope.SourceDaftarPemesananLaundry = Getdata;
			});

			$scope.bahan = function(){
				var data1 = $scope.item.mesin;
				var data2 = $scope.item.kapasitas; 
				var data1 = $scope.item.jenisLinen; 
				var url = "mesin=" + data1 + "&kapasitas=" + data2+ "&jenisLinen=" + data3
			};

			$scope.Batal = function(){
			  $scope.item.jumlahCycle="";
			}

			$scope.detailOrder = function(){
				$state.go("DetailOrderInt")
			}

		     $scope.klik= function(dataSelected){
			  $scope.item.nomorOrder = dataSelected.nomorOrder;
			  $scope.item.Menyerahkan = dataSelected.idMenyerahkan;
			  $scope.item.Penerima = dataSelected.idPenerima;
			  $scope.item.ket = dataSelected.ket;
			  $scope.item.namaExternal = dataSelected.namaExternal;
			  $scope.item.noRec = dataSelected.noRec;
			  $scope.item.nostruk =  dataSelected.nostruk;
			  $scope.item.qtyproduk = dataSelected.qtyproduk;
			  $scope.item.tglstruk = dataSelected.tglstruk;
			  $scope.item.tglterimakiriman = dataSelected.tglterimakiriman;
			 }

		  $("#btnSearch").kendoButton({
		    click:OnRefresh
		  })

		 function createMultiSelect(element) {
		 	debugger
		  var DataBinding = _.sortBy(_.uniq(_.pluck($scope.SourceDaftarPemesananByPeriodik, "nostruk")), function(n) { return n; });
          element.removeAttr("data-bind");
          element.kendoMultiSelect({
            dataSource: DataBinding,
            change: function(e) {
              var filter = { logic: "or", filters: [] };
              var values = this.value();
              $.each(values, function(i, v) {
                filter.filters.push({field: "nostruk", operator: "eq", value: v });
              });
              console.log(this.dataSource.data());
              dataSource.filter(filter);
            }
          });
        }

         $("#btnClear").kendoButton({
		  	click:clearFilters
		 });

		 function clearFilters() {
		  	$scope.Pencarians = "";
		  	$scope.item.tglawal = "";
		  	$scope.item.tglakhir = "";
		    var gridData = $("#GridKendo").data("kendoGrid");
		    gridData.dataSource.filter({});
		}


		   function OnRefresh(){ 
		   	debugger
		      var q = $("#txtSearchString").val();
		      var tanggalAwal = $("#txtSearchTanggalAwal").val();
		      var tanggalAkhir = $("#txtSearchTanggalAkhir").val();
		      if(tanggalAwal == "" && tanggalAkhir == "" && (q != "" || q != undefined)){
			      var grid = $("#GridKendo").data("kendoGrid");
			     	  grid.dataSource.query({
			          page:1,
			          pageSize:20,
			          filter:{
			          	logic:"or",
			         		 filters:[
			            		       {field:"nostruk", operator:"contains",value:q},
			            		       {field:"ket", operator:"contains",value:q},
			            		       {field:"namaMenyerahkan", operator:"contains",value:q}
			           				 ]
			           		 } 
			          });
		      }else{
		      	var grid = $("#GridKendo").data("kendoGrid");
		      		grid.dataSource.query({
		      		  page : 1,
		      		  pageSize : 20,
		      		  filter :{
		      		  		logic :"and",
		      		  			filters:[
		      		  				     {field:"tglstruk", operator:"contains",value:tanggalAwal},
			            		         {field:"tglstruk", operator:"contains",value:tanggalAkhir}
		      		  			        ]
		      		 		  }
		      		});
		      }
		    }

			$scope.KirimPenerimaanLinen = function(){
			  if($scope.item.noRec != undefined){
				$state.go('PenerimaanLinen',{
			   		noRec: $scope.item.noRec
				});
			  }else{
			  	toastr.warning("Pilih 1 Data Terlebih Dahulu")
			  }
			}

			$scope.kirim = function(){
				if($scope.item.nomorOrder == undefined){
					toastr.error('Pilih 1 Data Terlebih dahulu !!')	
				}else{
					toastr.success('Data Dikirim !!')
				}
			}

			$scope.detailOrder = function(){
			$state.go('DetailOrderInt');
			}

			$scope.daftardistribusi = function(){
			$state.go('DaftarDistribusi');
			}


    		$scope.mainGridOptions = { 
					pageable: true,
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
    				operators: {
		    					string: {
		    					startsWith: "Pencarian"
		    					}
    					      }
    		}


			$scope.columndaftarPelipatan = [{
				"field": "no",
				"title": "<h3 align=center>No.</h3>",
				"width": "20px",
				"filterable" : false,
				"attributes": {
      							style: "text-align: center"
   							  }
			}, 
			{
				"field": "nostruk",
				"title": "<h3 align=center>Nomor<br>Order</h3>",
				"width": "50px"
			}, 
		    {
				"field": "tglstruk",
				"title": "<h3 align=center>Tanggal<br>Struk</h3>",
				"width": "40px",
				"filterable" : false,
				"attributes": {
      							style: "text-align: center"
   							  }
			},
			{
				"field": "tglterimakiriman",
				"title": "<h3 align=center>Tanggal<br>Terima Kiriman</h3>",
				"width": "40px",
				"filterable" : false,
				"attributes": {
      							style: "text-align: center"
   							  }
			},
			{
				"field": "qtyproduk",
				"title": "<h3 align=center>Jumlah<br>Produk</h3>",
				"width": "40px"
			}, 
			{
				"field": "namaMenyerahkan",
				"title": "<h3 align=center>Yang Menyerahkan</h3>",
				"width": "100px"
			}, 
			{
				"field": "namaPenerima",
				"title": "<h3 align=center>Yang Menerima</h3>",
				"width": "100px"
			},  
		    {
				"field": "ket",
				"title": "<h3 align=center>Keterangan</h3>",
				"width": "150px"
			}
			];

		}
		]);
});

		 /*{
				"field": "ruanganPemesan",
				"title": "<h3 align=center>Ruangan Pemesan</h3>",
				"width": "100px"
			},*/
	/*		{
				"field": "status",
				"title": "<h3 align=center>Status</h3>",
				"width": "60px"
			}*/

/*=============================================================================================SOURCE OLD DATA================================================
FindSarpras.getSarpras("mapping-cycle/get-cycle-by?" + url).then(function(dat){
					 debugger;
					$scope.sourceDaftarBahan = dat.data;
				});*/


/*		 function betweenFilter(args) {
debugger
var filterCell = args.element.parents(".k-filtercell");

filterCell.empty();
filterCell.html(`
<span style="display:flex; justify-content:center;">
<span>From:</span>
<input  class='start-date'/>
<span>To:</span>
<input  class='end-date'/>
</span>
`);

$(".start-date", filterCell).kendoDatePicker({
change: function (e) {
var startDate = e.sender.value(),
endDate = $("input.end-date", filterCell).data("kendoDatePicker").value(),
dataSource = $("#grid").data("kendoGrid").dataSource;

if (startDate & endDate) {
var filter = { logic: "and", filters: [] };
filter.filters.push({ field: "BirthDate", operator: "gte", value: startDate });
filter.filters.push({ field: "BirthDate", operator: "lte", value: endDate });
dataSource.filter(filter);
}
}
});
$(".end-date", filterCell).kendoDatePicker({
change: function (e) {
var startDate = $("input.start-date", filterCell).data("kendoDatePicker").value(),
endDate = e.sender.value(),
dataSource = $("#grid").data("kendoGrid").dataSource;

if (startDate & endDate) {
var filter = { logic: "and", filters: [] };
filter.filters.push({ field: "BirthDate", operator: "gte", value: startDate });
filter.filters.push({ field: "BirthDate", operator: "lte", value: endDate });
dataSource.filter(filter);
}
}
});
}

		$scope.Save = function(){
				var data = 
				{
					"berat": {
						"berat": parseInt($scope.item.beratLinen)
					},
					"mesin": {
						"id": $scope.item.mesin.idMesin
					},
					"tgl": $scope.item.tanggalPencucian,
					"kapasitas" : 	{
						"noRec": "2c909078570e0c3d01570e10b1510000"
					},
					"jenisLinen": {
						"id": $scope.item.jenisLinen.id
					},
					"prosesCuci" : {
						"id": $scope.item.prosesCuci.id
					}
				};
				console.log(JSON.stringify(data));
				ManageSarpras.saveSarpras(data,"pencucian-linen/save-pencucian-linen/").then(function(e) {
					$scope.item = {};
				});
			};

*/