define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ListFifoServiceCtrl', ['$sce', '$q', '$rootScope', '$scope', 'DateHelper','ManageLogistikPhp','ModelItemAkuntansi',
		function($sce, $q, $rootScope, $scope, DateHelper,manageLogistikPhp,modelItemAkuntansi) {
			$scope.dataVOloaded = true;

			$scope.item = {};
			$scope.date = new Date();
	        var tanggals = DateHelper.getDateTimeFormatted3($scope.date);
	        
	        //Tanggal Default
	        $scope.item.tanggalAwal = tanggals+" 00:00";
	        $scope.item.tanggalAkhir= tanggals+" 23:59";
			$scope.dataPost = [];
			$scope.isRouteLoading=false;
 
	        manageLogistikPhp.getDataTableTransaksi("get-data-login", true).then(function(dat){
                $scope.listDokter = dat.data;
                $scope.item.dokter ={id:dat.data[0].id,namalengkap:dat.data[0].namalengkap};
            });

		    $scope.GridOptions = {
                pageable: true
            };

            function addDays(date, offset) {
                var hours = date.getHours();
                date = new Date(date);
                setTime(date, offset * 86400000);
                adjustDST(date, hours);
                return date;
            }

            function setTime(date, milliseconds, ignoreDST) {
                var offset = date.getTimezoneOffset();
                var difference;
                date.setTime(date.getTime() + milliseconds);
                if (!ignoreDST) {
                    difference = date.getTimezoneOffset() - offset;
                    date.setTime(date.getTime() + difference * 60000);
                }
            }
            function adjustDST(date, hours) {
                if (!hours && date.getHours() === 23) {
                    date.setHours(date.getHours() + 2);
                }
            }
            self.getTime = function() {
			    return self.date.getTime() - self.offsetDiff;
			};
			self.getTimezoneOffset = function() {
			    return offset * 60;
			 };
		  	function getDay(year, month) {
	        	return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
	      	};
            
			//fungsi search data
			$scope.SearchData = function()
			{
				//http://192.168.0.74:8000/service/transaksi/akuntansi/verifikasi-jurnal?tglAwal=2016-12-30&tglAkhir=2016-12-30
				$scope.isRouteLoading=true;
				var tglAwal = moment($scope.item.tanggalAwal).format('YYYY-MM-DD HH:mm');
				var tglAkhir = moment($scope.item.tanggalAkhir).format('YYYY-MM-DD HH:mm');
				var t1 = new Date($scope.item.tanggalAwal);
				var t2 = new Date($scope.item.tanggalAkhir);
				var dokter = $scope.item.dokter.id;
				var SQLdate = "";
				var strTglJamSQL ="";
				modelItemAkuntansi.getDataTableTransaksi("pasien/get-type-dokter?&idDokter="+dokter).then(function(data) {
					var typepegawai = data.typepegawai[0].objecttypepegawaifk
					var datediff = (t2 - t1) / 86400000
					var numdays = Math.round(datediff)

					if(typepegawai==1){
						for (var i = 0; i <= numdays; i++){
							var strTgl = moment(addDays(t1,i)).format('YYYY-MM-DD')
							var strTgld = new Date (strTgl)
							var weekday = strTgld.getDay()
							if(weekday==6 || weekday==0){
								strTglJamSQL = " or x.tglpelayanan between '"+ strTgl + " 00:00' and '" +strTgl + " 23:59'"
								SQLdate = SQLdate + strTglJamSQL
							}else{
								strTglJamSQL = " or x.tglpelayanan between '" + strTgl + " 00:00' and '" + strTgl + " 06:59' or x.tglpelayanan between '" + strTgl + " 15:30' and '" + strTgl + " 23:59'"
								SQLdate = SQLdate + strTglJamSQL
							}
                		}
					}else{
						for (var i = 0; i <= numdays; i++){
							var strTgl = moment(addDays(t1,i)).format('YYYY-MM-DD')
							var strTgld = new Date (strTgl)
							var weekday = strTgld.getDay()
							var strTglJamSQL = " or x.tglpelayanan between '"+ strTgl + " 00:00' and '" +strTgl + " 23:59'"
                		}
					}
					var tglPelayanan = SQLdate.slice(3, SQLdate.length)
					// console.log(JSON.stringify(tglPelayanan))
					modelItemAkuntansi.getDataTableTransaksi("pasien/get-feeforservice?tglpelayanan="+tglPelayanan+"&idDokter="+dokter).then(function(data) {
		                $scope.isRouteLoading=false;
		                $scope.mainGridOptions = new kendo.data.DataSource({
							data: data,
							pageSize: 10
						})

			            var grid = $('#kGrid').data("kendoGrid");

		                grid.setDataSource($scope.mainGridOptions);
		                grid.refresh();
		                $scope.dataVOloaded = true;
			        })
				})
				
				
			}

            $scope.columnData = [
             {
                field: "noregistrasi",
                title: "No Registrasi",
                width: "100px"
             },
             {
                field: "nocm",
                title: "No. MR",
                width: "100px"
             },
             {
                field: "namapasien",
                title: "Nama Pasien",
                width: "200px"
             },
             {
                field: "kelompokpasien",
                title: "Kelompok",
                width: "150px"
             },
             {
                field: "total",
                title: "Total",
                width: "100px",
                "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
             }]

            $scope.detailGridOptions = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
						data: dataItem.details
					}),
                    columns: [
                    {
	                    field: "namaruangan",
	                    title: "Ruangan",
	                    width:"200px",
	                },
	                {
	                    field: "tglpelayanan",
	                    title: "Tgl Pelayanan",
	                    width:"100px",
	                    "template": "#= moment(new Date(tglpelayanan)).format('DD-MM-YYYY HH:mm') #",
	                },
	                {
	                    field: "tindakan",
	                    title: "Tindakan",
	                    width:"200px",
	                },
	                {
	                    field: "tarif",
	                    title: "Tarif",
	                    width:"100px",
	                    "template": "<span class='style-right'>{{formatRupiah('#: tarif #', '')}}</span>"
	                },
	                {
	                    field: "diskon",
	                    title: "Diskon",
	                    width:"100px",
	                    "template": "<span class='style-right'>{{formatRupiah('#: diskon #', '')}}</span>"
	                },
	                {
	                    field: "jumlah",
	                    title: "Qty",
	                    width:"70px",
	                },
	                {
	                    field: "jasamedis",
	                    title: "Jasa Medis",
	                    width:"100px",
	                    "template": "<span class='style-right'>{{formatRupiah('#: jasamedis #', '')}}</span>"
	                }]
                };
            };

            $scope.ClearData = function(){
            	$scope.item.tanggalAwal = tanggals+" 00:00";
	        	$scope.item.tanggalAkhir= tanggals+" 23:59";
            	var grid = $('#kGrid').data("kendoGrid");
            	$scope.mainGridOptions = new kendo.data.DataSource({
					data: []
				})
            }

            $scope.formatRupiah = function(value, currency) {
			    return currency + "Rp. " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

			 
		}
	]);
});