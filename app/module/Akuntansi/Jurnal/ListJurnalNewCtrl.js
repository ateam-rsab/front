define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ListJurnalNewCtrl', ['$sce', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi','DateHelper',
		function($sce, $q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi, DateHelper) {
			$scope.dataVOloaded = true;

			$scope.item = {};
			$scope.date = new Date();
	        var tanggals = DateHelper.getDateTimeFormatted3($scope.date);
	        
	        //Tanggal Default
	        $scope.item.tanggalAwal = tanggals+" 00:00";
	        $scope.item.tanggalAkhir= tanggals+" 23:59";
			$scope.item.noReferensi = "";
			$scope.dataPost = [];
			$scope.showBtnVerifikasi = true;
			$scope.isRouteLoading=false;
 
	        $scope.listStatus = [
	        	{id:3, namaExternal:"Semua Status", is_verified:"all"},
		        {id:1, namaExternal:"Sudah Verifikasi", is_verified:"true"},
		        {id:2, namaExternal:"Belum Verifikasi", is_verified:"false"} 
		    ];

		    $scope.item.status = $scope.listStatus[0];
		    $scope.GridOptions = {
                pageable: true
            };
			//fungsi search data
			$scope.SearchData = function()
			{
				//http://192.168.0.74:8000/service/transaksi/akuntansi/verifikasi-jurnal?tglAwal=2016-12-30&tglAkhir=2016-12-30
				$scope.isRouteLoading=true;
				var tglAwal = moment($scope.item.tanggalAwal).format('YYYY-MM-DD HH:mm');
				var tglAkhir = moment($scope.item.tanggalAkhir).format('YYYY-MM-DD HH:mm');;

				modelItemAkuntansi.getDataTableTransaksi("akuntansi/get-jurnal-entry?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir+"&is_verified="+$scope.item.status.is_verified+"&noReferensi="+$scope.item.noReferensi).then(function(data) {
	                $scope.isRouteLoading=false;
	                $scope.mainGridOptions = new kendo.data.DataSource({
						data: data.daftar,
						pageSize: 10
					})

		            var grid = $('#kGrid').data("kendoGrid");

	                grid.setDataSource($scope.mainGridOptions);
	                grid.refresh();
	                $scope.dataVOloaded = true;
		        })
			}

            $scope.selectRow = function(dataItem)
            {
            	var dataObj = {
            		norec : dataItem.norec,
            		nojurnal : dataItem.nojurnal
            	}

            	var isExist = _.find($scope.dataPost, function(dataExist){ return dataExist.norec == dataObj.norec; });

				if(isExist == undefined)
				{
					$scope.dataPost.push(dataObj);
				}
				else
				{
					$scope.dataPost =  _.without($scope.dataPost, _.findWhere($scope.dataPost, {
						  norec: dataObj.norec
						}));
				}
			
            }

            
            $scope.columnData = [
             { 
             	"field": "is_verified",
				"title": " ",
				"width":"10px",
				"template": "# if (is_verified) { #"+
			                    ""+
			                "# } else { #"+
			                    "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />"+
			                "# } #",
             },
             {
                field: "tglbuktitransaksi",
                title: "Tgl. Transaksi",
                width: "60px"
             },
             {
                field: "nobuktitransaksi",
                title: "No. Referensi",
                width: "60px"
             },
             {
                field: "noposting",
                title: "No. Posting",
                width: "60px"
             },
             {
                field: "keteranganlainnya",
                title: "Keterangan",
                width: "250px"
             },
             {
                field: "verifikasi",
                title: "Verifikasi",
                width: "100px"
             }]

            $scope.detailGridOptions = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
						data: dataItem.jurnalDetail
					}),
                    columns: [
                    {
	                    field: "kdaccount",
	                    title: "No. Account",
	                    width:"30px",
	                },
	                {
	                    field: "namaaccount",
	                    title: "Nama Akun",
	                    width:"100px",
	                },
	                {
	                    field: "hargasatuand",
	                    title: "Debit",
	                    width:"50px",
	                    "template": "<span class='style-right'>{{formatRupiah('#: hargasatuand #', '')}}</span>"
	                },
	                {
	                    field: "hargasatuank",
	                    title: "Kredit",
	                    width:"50px",
	                    "template": "<span class='style-right'>{{formatRupiah('#: hargasatuank #', '')}}</span>"
	                }]
                };
            };

            $scope.ClearData = function(){
            	$scope.item.noReferensi = "";
            	$scope.item.tanggalAwal = tanggals+" 00:00";
	        	$scope.item.tanggalAkhir= tanggals+" 23:59";
            	$scope.item.status = $scope.listStatus[0];
            	var grid = $('#kGrid').data("kendoGrid");
            	$scope.mainGridOptions = new kendo.data.DataSource({
					data: []
				})
            }

            $scope.formatRupiah = function(value, currency) {
			    return currency + "Rp. " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

            $scope.Verifikasi = function(){

            	manageAkuntansi.postingVerifikasiJurnal($scope.dataPost).then(function(e) {
                   
                }, function(){
                	
                });
            }

		}
	]);
});