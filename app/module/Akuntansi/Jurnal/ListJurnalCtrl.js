define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ListJurnalCtrl', ['$sce', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
		function($sce, $q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();

			$scope.item = {};
			$scope.item.tanggalAwal = $scope.now;
			$scope.item.tanggalAkhir = $scope.now;
			$scope.item.noReferensi = "";
			$scope.dataPost = [];
			$scope.showBtnVerifikasi = true;
 
	        $scope.listStatus = [
	        	{id:3, namaExternal:"Semua Status", is_verified:"all"},
		        {id:1, namaExternal:"Sudah Verifikasi", is_verified:"true"},
		        {id:2, namaExternal:"Belum Verifikasi", is_verified:"false"} 
		    ];

		    $scope.item.status = $scope.listStatus[0];

			//fungsi search data
			$scope.SearchData = function()
			{
				//http://192.168.0.74:8000/service/transaksi/akuntansi/verifikasi-jurnal?tglAwal=2016-12-30&tglAkhir=2016-12-30

				var tglAwal = moment($scope.item.tanggalAwal).format('YYYY-MM-DD');
				var tglAkhir = moment($scope.item.tanggalAkhir).format('YYYY-MM-DD');;

				modelItemAkuntansi.getDataTableTransaksi("akuntansi/verifikasi-jurnal?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir+"&is_verified="+$scope.item.status.is_verified+"&noReferensi="+$scope.item.noReferensi).then(function(data) {
	                $scope.mainGridOptions = new kendo.data.DataSource({
						data: data
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
            		noRec : dataItem.noRec,
            		noJurnal : dataItem.noJurnal,
            	}

            	var isExist = _.find($scope.dataPost, function(dataExist){ return dataExist.noRec == dataObj.noRec; });

				if(isExist == undefined)
				{
					$scope.dataPost.push(dataObj);
				}
				else
				{
					$scope.dataPost =  _.without($scope.dataPost, _.findWhere($scope.dataPost, {
						  noRec: dataObj.noRec
						}));
				}
			
            }

            
            $scope.columnData = [
             { 
             	"field": "is_verified",
				"title": " ",
				"width":"25px",
				"template": "# if (is_verified) { #"+
			                    ""+
			                "# } else { #"+
			                    "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />"+
			                "# } #",
             },
             {
                field: "tglBuktiTransaksi",
                title: "Tgl. Transaksi",
                width: "60px"
             },
             {
                field: "noBuktiTransaksi",
                title: "No. Referensi",
                width: "60px"
             },
             {
                field: "noPosting",
                title: "No. Posting",
                width: "60px"
             },
             {
                field: "keteranganLainnya",
                title: "Keterangan",
                width: "250px"
             }]

            $scope.detailGridOptions = function(dataItem) {
            	debugger;
                return {
                    dataSource: new kendo.data.DataSource({
						data: dataItem.jurnalDetail
					}),
                    columns: [
                    {
	                    field: "kodeAccount",
	                    title: "No. Account"
	                },
	                {
	                    field: "namaAccount",
	                    title: "Nama Akun"
	                },
	                {
	                    field: "hargaSatuanD",
	                    title: "Debit"
	                },
	                {
	                    field: "hargaSatuanK",
	                    title: "Kredit"
	                }]
                };
            };



            $scope.Verifikasi = function(){

            	manageAkuntansi.postingVerifikasiJurnal($scope.dataPost).then(function(e) {
                   
                }, function(){
                	
                });
            }

		}
	]);
});