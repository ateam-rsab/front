define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ListJurnalPostingCtrl', ['$sce', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi','DateHelper','ManageTataRekening',
		function($sce, $q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi, DateHelper,manageTataRekening) {
			$scope.dataVOloaded = true;

			$scope.item = {};
			$scope.date = new Date();
	        var tanggals = DateHelper.getDateTimeFormatted3($scope.date);
	        
	        //Tanggal Default
	        $scope.item.tanggalAwal = tanggals+" 00:00";
	        $scope.item.tanggalAkhir= tanggals+" 23:59";
			$scope.item.noRegistrasi = "";
			$scope.dataPost = [];
			$scope.showBtnPosting = true;
			$scope.isRouteLoading=false;
 
	        $scope.listStatus = [
	        	{id:3, namaExternal:"Semua Status", is_posting:"all"},
		        {id:1, namaExternal:"Sudah Posting", is_posting:"true"},
		        {id:2, namaExternal:"Belum Posting", is_posting:"false"} 
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
				var tglAkhir = moment($scope.item.tanggalAkhir).format('YYYY-MM-DD HH:mm');

				modelItemAkuntansi.getDataTableTransaksi("akuntansi/get-data-posting?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir+"&is_posting="+$scope.item.status.is_posting+"&noregistrasi="+$scope.item.noRegistrasi).then(function(data) {
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
            		noregistrasi : dataItem.noregistrasi
            	}

            	var isExist = _.find($scope.dataPost, function(dataExist){ return dataExist.noregistrasi == dataObj.noregistrasi; });

				if(isExist == undefined)
				{
					$scope.dataPost.push(dataObj);
				}
				else
				{
					$scope.dataPost =  _.without($scope.dataPost, _.findWhere($scope.dataPost, {
						  noregistrasi: dataObj.noregistrasi
						}));
				}
			
            }

            
            $scope.columnData = [
             { 
             	"field": "is_posting",
				"title": " ",
				"width":"20px",
				"template": "# if (is_posting) { #"+
			                    ""+
			                "# } else { #"+
			                    "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />"+
			                "# } #",
             },
             {
                field: "tglpelayanan",
                title: "Tgl. Pelayanan",
                width: "60px"
             },
             {
                field: "noregistrasi",
                title: "No. Registrasi",
                width: "60px"
             },
             {
                field: "nocm",
                title: "No. CM",
                width: "60px"
             },
             {
                field: "namapasien",
                title: "Nama Pasien",
                width: "100px"
             },
             {
                field: "tglbuktitransaksi",
                title: "Tgl. Posting",
                width: "60px"
             },
             {
                field: "noposting",
                title: "No. Posting",
                width: "60px"
             }]

     //        $scope.detailGridOptions = function(dataItem) {
     //            return {
     //                dataSource: new kendo.data.DataSource({
					// 	data: dataItem.postingdetail
					// }),
     //                columns: [
     //                {
	    //                 field: "tgl",
	    //                 title: "Tgl Pelayanan",
	    //                 width:"30px",
	    //                 "template": "#= moment(new Date(tgl)).format('DD-MM-YYYY HH:mm') #",
	    //             },
	    //             {
	    //                 field: "prid",
	    //                 title: "Kd Produk",
	    //                 width:"30px",
	    //             },
	    //             {
	    //                 field: "namaproduk",
	    //                 title: "Nama Produk",
	    //                 width:"100px",
	    //             },
	    //             {
	    //                 field: "hargajual",
	    //                 title: "Harga",
	    //                 width:"50px",
	    //                 "template": "<span class='style-right'>{{formatRupiah('#: hargajual #', '')}}</span>"
	    //             },
	    //             {
	    //                 field: "jumlah",
	    //                 title: "Qty",
	    //                 width:"20px"
	    //             },
	    //             {
	    //                 field: "hargadiscount",
	    //                 title: "Diskon",
	    //                 width:"50px",
	    //                 "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
	    //             }]
     //            };
     //        };

            $scope.ClearData = function(){
            	$scope.item.noRegistrasi = "";
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

            $scope.Posting = function(){
            	$scope.showBtnPosting = false;
            	var objSave ={
					tglAwal : moment($scope.item.tanggalAwal).format('YYYY-MM-DD HH:mm'),
					tglAkhir : moment($scope.item.tanggalAkhir).format('YYYY-MM-DD HH:mm')
				}
            	manageTataRekening.postJurnalAkuntansi(objSave).then(function(data){
            		//$scope.SearchData();
            		$scope.showBtnPosting = true;
				})

				
            }

		}
	]);
});