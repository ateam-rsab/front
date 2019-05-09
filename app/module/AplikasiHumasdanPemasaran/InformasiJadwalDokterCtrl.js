define(['initialize'], function(initialize) {
	'use strict';
	 initialize.controller('InformasiJadwalDokterCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper','InformasiDokter','InformasiRuangan','TampilPenghargaan','$state', 'ModelItemAkuntansi',
        function($rootScope, $scope, ModelItem,dateHelper,InformasiDokter,InformasiRuangan,TampilPenghargaan,$state,modelItemAkuntansi) {
		$scope.item = {};
		$scope.grishoW=false;
		$scope.now = new Date();
		var startTimes= "01-01-" + moment($scope.now).format('YYYY');
		var startDate= "01-" + moment($scope.now).format('MM-YYYY');
    	var dates=  moment(startTimes).format('YYYY-MM-DD');
    	var Awal=moment($scope.now).format('YYYY-MM-DD 00:00')
		var Akhir=moment($scope.now).format('YYYY-MM-DD 23:59')
		var datatemp=[];
		$scope.isRouteLoading=false;
		loadDataCombo();

		
		function loadDataCombo(){
			modelItemAkuntansi.getDataDummyPHP("humas/get-daftar-combo-pegawai", true, true, 20).then(function(data) {
                $scope.listdokter=data;
            });

            modelItemAkuntansi.getDataTableTransaksi("humas/get-daftar-combo?", true).then(function(dat){
            	$scope.ListRuangan=dat.ruangan;
            });
            LoadData();
		}

		function LoadData(){
			var tglAwal=moment($scope.now).format('YYYY-MM-DD 00:00')
			var tglAkhir=moment($scope.now).format('YYYY-MM-DD 23:59')
			$scope.isRouteLoading=true;

			var dokter="";
			if($scope.item.dokter != undefined){
				dokter = $scope.item.dokter.id
			}
			var ruangan="";
			if($scope.item.ruangan != undefined){
				ruangan = $scope.item.ruangan.id
			}

			modelItemAkuntansi.getDataTableTransaksi("humas/get-daftar-jadwal-dokter?"
            	+ "tglAwal=" + tglAwal
				+ "&tglAkhir=" + tglAkhir
				+ "&dokterId=" + dokter
				+ "&ruanganId=" + ruangan, true).then(function(dat){
				var datas=dat.callback;
				$scope.sourceJadwal = new kendo.data.DataSource({
						data: datas,//data[0].details,
	            		// pageSize: 20,
						group: [
	                        {field: "namaruangan"}
	                    ],
	                	// pageSize: 10,
				});
				for(var i = 0; i < datas.length; i++){
                       datas[i].no = i+1
                       var datap ={
                            "id": datas[i].no,
                            "title": datas[i].namaruangan + ' ' + ':' + ' ' + datas[i].namalengkap,
                            // "pegawaiid": datas[i].pegawaiid,
                            "namalengkap": datas[i].namalengkap,
                            // "ruanganid": datas[i].ruanganid,
                            "namaruangan": datas[i].namaruangan,
				            // "tanggaljadwal": datas[i].tanggaljadwal,
				            "start": datas[i].start,
				            "end": datas[i].end,
				            // "startepoch": '\/date(' +  datas[i].startepoch + ')\/',
				            // "endpoch": '\/date(' + datas[i].endpoch + ')\/',
				            // "Description": "Jadwal Dokter",
				            // "StartTimezone": null,
				            // "EndTimezone": null,
				            // "RecurrenceRule": null,
				            // "RecurrenceID": null,
				            // "RecurrenceException": null,
				            // "IsAllDay": false
                        }
                        datatemp.push(datap);
                    }

                    $scope.schedulerOptions = {
						date: new Date(Awal),
			    		// startTime: new Date(Awal),
						height: 600,
						views: [
						    "agenda",
						    { type: "month", selected: true, allDaySlot: false },
						    { selectedDateFormat: "{0:dd-MM-yyyy}" }
						],
						// eventTemplate: "<span class='custom-event'>{{dataItem.title}}</span>",
						// allDayEventTemplate: "<div class='custom-all-day-event'>{{dataItem.title}}</div>",
						// timezone: "Indonesia/Jakarta",
						dataSource: datatemp,
						// resources: [
					 //        {
					 //            field: "namaruangan",
					 //            dataSource: datatemp,
					 //            title: "namaruangan"
					 //        }
					    // ]
					};
				$scope.isRouteLoading=false;
            });
		}
		
		$scope.columndata= [
			{
				"field": "namalengkap",
				"title": "Dokter",
				"width": "120px"
			}, 
			{
				"field": "start",
				"title": "Jadwal Awa",
				"width": "120px"
			}, 
			{
				"field": "end",
				"title": "Jadwal Akhir",
				"width": "100px"
					
			}
			// {
			// 	"field": "hargalayanan",
			// 	"title": "Tarif",
			// 	"width": "100px",
			// 	"template": "<span class='style-right'>{{formatRupiah('#: hargalayanan #', '')}}</span>",
			// 	"attributes": {align:"right"}

		 //    }
		    ];

		    $scope.SearchData = function()
			{
				LoadData();
			}


	
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		}
	]);
});