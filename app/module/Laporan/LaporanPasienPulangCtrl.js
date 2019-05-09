define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('LaporanPasienPulangCtrl', ['CacheHelper','$q', '$rootScope', '$scope','ModelItemAkuntansi','DateHelper','$http','$state','ReportPelayanan','ManageSdm','ManageLogistikPhp', 'FindPasien', 'ManageTataRekening',
    function(cacheHelper,$q, $rootScope, $scope,modelItemAkuntansi,DateHelper,$http,$state,ReportPelayanan,ManageSdm,manageLogistikPhp,findPasien, manageTataRekening) {
    		//Inisial Variable 
        $scope.isRouteLoading=false;
        $scope.dataVOloaded = true;
        $scope.now = new Date();
        $scope.dataSelected={};
        $scope.item={};
        var details =[];
        $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
        debugger;
        $scope.CariLapPasienPulang = function () {
            $scope.isRouteLoading = true;
            LoadData()
        }
        function LoadData() {

            var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
            var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');;
            var tempRuanganId = "";
            if ($scope.item.ruangan != undefined) {
                tempRuanganId = "&idRuangan=" + $scope.item.ruangan.id;
            }
            var tempDepartemen = "";
            if ($scope.item.departement != undefined) {
                tempDepartemen = "&idDept=" + $scope.item.departement.id;
            }
            var tempKelPasienId = "";
            if ($scope.item.namaPenjamin != undefined) {
                tempKelPasienId = "&kelompokPasien=" + $scope.item.namaPenjamin.id;
            }
            var tempRekananId = "";
            if ($scope.item.institusiAsalPasien != undefined) {
                tempRekananId = "&institusiAsalPasien=" + $scope.item.institusiAsalPasien.id;
            }

            var chacePeriode = {
                0: tglAwal,
                1: tglAkhir
            }
            cacheHelper.set('LaporanPasienPulangCtrl', chacePeriode);

            modelItemAkuntansi.getDataTableTransaksi("laporan/get-laporan-pasien-pulang-new?"
                + "tglAwal=" + tglAwal
                + "&tglAkhir=" + tglAkhir
                + tempRuanganId
                + tempDepartemen
                + tempKelPasienId
                + tempRekananId).then(function (data) {
                    $scope.isRouteLoading = false;
                    details=data.data;
                    // var doubleTotal = 0;
                    // var doubleKarcis = 0;
                    // for (var i = 0; i < data.data.length; i++) {
                    //     doubleTotal = doubleTotal + parseFloat(data.data[i].total)
                    //     doubleKarcis = doubleKarcis + parseFloat(data.data[i].karcis)
                    // }
                    // $scope.item.karcis = doubleKarcis
                    // $scope.item.total = doubleTotal
                    $scope.dataPasienPulang =  {
                    // new kendo.data.DataSource({
                        data: data.data,
                        pageSize: 10,
                        total: data.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        },
                        refresh: true,
                        selectable: true,
                        refresh: true,
                        groupable: true,
                        allowCopy: true,
                    }
                    // });
                })
        }

        $scope.click = function (dataPasienSelected) {
            var data = dataPasienSelected;
            
        };
        $scope.formatTanggal = function (tanggal) {
            return moment(tanggal).format('DD-MMM-YYYY HH:mm');
        }
        $scope.formatRupiah = function (value, currency) {
            return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        }

        $scope.columnPasienPulang =
            { toolbar: [
                "excel",
                "pdf",
            ],
            excel: {
                fileName: "LaporanPasienPulang.xlsx",
                allPages: true,
            },
            pdf: {

                fileName: "LaporanPasienPulang.pdf",
                allPages: true,
                avoidLinks: true,
                paperSize: "A4",
                margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
                landscape: true,
                repeatHeaders: true,
                template: $("#page-template").html(),
                scale: 0.8
            },
            excelExport: function (e) {
                
                var sheet = e.workbook.sheets[0];
                sheet.frozenRows = 2;
                sheet.mergedCells = ["A1:P1"];
                sheet.name = "LAPORAN";

                var myHeaders = [

                    {
                        value: "LAPORAN PASIEN PULANG " +DateHelper.formatDate($scope.item.tglAwal, 'DD-MM-YY') +' sampai ' +
                        DateHelper.formatDate($scope.item.tglAkhir, 'DD-MM-YY'),
                        fontSize: 15,
                        textAlign: "center",
                        background: "#c1d2d2",
                        // color:"#ffffff"
                    }];

                sheet.rows.splice(0, 0, { cells: myHeaders, type: "header",height: 50});
            },
            selectable: 'row',
            sortable: false,
            reorderable: true,
            filterable: false,
            pageable: true,
            columnMenu: false,
            resizable: true,
            columns:    
            [
                {
                    "field": "tglregistrasi",
                    "title": "Tgl Masuk",
                    "width": "150px",
                    "template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
                },
                {
                    "field": "tglpulang",
                    "title": "Tgl Pulang",
                    "width": "150px",
                    "template": "<span class='style-left'>{{formatTanggal('#: tglpulang #')}}</span>"
                },
                {
                    "field": "tglstruk",
                    "title": "Tgl Struk",
                    "width": "150px",
                    "template": "<span class='style-left'>{{formatTanggal('#: tglstruk #')}}</span>"
                },
                {
                    "field": "nodaftar",
                    "title": "No MR / No. Registrasi",
                    "width": "200px"              
                },
                {
                    "field": "namapasien",
                    "title": "Nama",
                    "width": "180px"
                },           
                {
                    "field": "namaruangan",
                    "title": "Nama Ruangan",
                    "width": "180px",
                    "template": "<span class='style-center'>#: namaruangan #</span>"
                },
                {
                    "field": "namakelas",
                    "title": "Kelas",
                    "width": "180px"
                }, 
                {
                    "field": "nobilling",
                    "title": "No Billing",
                    "width": "100px",
                    "template": "<span class='style-center'>#: nobilling #</span>"
                },
                {
                    "field": "nokwitansi",
                    "title": "No Kwitansi",
                    "width": "100px",
                    "template": "<span class='style-center'>#: nokwitansi #</span>"
                },            
                {
                    "field": "totalresep",
                    "title": "Total Resep",
                    "width": "180px",
                    "template": "<span class='style-right'>{{formatRupiah('#: totalresep #','')}}</span>"
                },
                {
                    "field": "jumlahbiaya",
                    "title": "Jumlah Biaya",
                    "width": "180px",
                    "template": "<span class='style-right'>{{formatRupiah('#: jumlahbiaya #','')}}</span>"
                },                   
                {
                    "field": "totalppenjamin",
                    "title": "Piutang Perusahaan",
                    "width": "180px",
                    "template": "<span class='style-right'>{{formatRupiah('#: totalppenjamin #','')}}</span>"
                
                },
                {
                    "field": "diskon",
                    "title": "Diskon",
                    "width": "180px",
                    "template": "<span class='style-right'>{{formatRupiah('#: diskon #','')}}</span>"
                },
                {
                    "field": "namarekanan",
                    "title": "Nama Rekanan",
                    "width": "180px",
                    "template": "<span class='style-center'>#: namarekanan #</span>"
                },
                {
                    "field": "totalharusdibayar",
                    "title": "Ditanggung Pasien",
                    "width": "180px",
                    "template": "<span class='style-right'>{{formatRupiah('#: totalharusdibayar #','')}}</span>"
                },
                {
                    "field": "kelompokpasien",
                    "title": "Kelompok Pasien",
                    "width": "100px",
                    "template": "<span class='style-center'>#: kelompokpasien #</span>"
                }
                // {
                //     "field": "keteranganlainnya",
                //     "title": "Jenis Pembayaran",
                //     "width": "100px",
                //     "template": "<span class='style-center'>#: keteranganlainnya #</span>"
                // }
            ],
            sortable: {
                mode: "single",
                allowUnsort: false,
            }
            ,
            pageable: {
                messages: {
                    display: "Menampilkan {0} - {1} data dari {2} data"
                },
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            },
        };

        $scope.Perbaharui = function () {

            $scope.ClearSearch();
            
        }

        //fungsi clear kriteria search
        $scope.ClearSearch = function () {
            $scope.item = {};
            $scope.item.tglawal = $scope.now;
            $scope.item.tglakhir = $scope.now;
            $scope.CariLapPasienPulang();
        }

        var HttpClient = function() {
            this.get = function(aUrl, aCallback) {
                var anHttpRequest = new XMLHttpRequest();
                anHttpRequest.onreadystatechange = function() { 
                    if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                        aCallback(anHttpRequest.responseText);
                }

                anHttpRequest.open( "GET", aUrl, true );            
                anHttpRequest.send( null );
            }
        }
        //sdm service hanya sementara, nanti harus diganti pake service kasir !!

	    // ManageSdm.getItem("service/list-generic/?view=Ruangan&select=id,namaRuangan").then(function(dat) {
	    // $scope.listRuangan = dat.data;
	    // });
        manageTataRekening.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", false).then(function(data) {
            $scope.listDepartemen = data.data.departemen;
            $scope.listKelompokPasien = data.data.kelompokpasien;
        })

        $scope.getIsiComboRuangan = function(){
            $scope.listRuangan = $scope.item.departement.ruangan
        }

	    // ManageSdm.getItem("service/list-generic/?view=KelompokPasien&select=*").then(function(dat) {
	    // $scope.listPasien = dat.data;
	    // });
        // manageLogistikPhp.getDataTableTransaksi("kasir/laporan-penerimaan-kasir-datacombo", true).then(function(dat){
        //     debugger;
        //     //$scope.listPegawai = dat.data.dataDokter;
        //     $scope.listRuangan = dat.data.dataruangan;
        //     //$scope.listPegawaiKasir = dat.data.datakasir;
        //     //$scope.dataLogin = dat.data.datalogin[0];
        //     $scope.listKelompokPasien = dat.data.datakelompokpasien;
        // });
        findPasien.getKelompokPasien().then(function(e) {
            $scope.kelompokPasiens = e.data.data
        })
        $scope.$watch('item.namaPenjamin', function(e){
            debugger;
            if (e === undefined) return;
            findPasien.getDataRekanan(e.id).then(function(data) {
                $scope.sourceDataRekanan = data.data.data.listData;
                $scope.item.institusiAsalPasien = $scope.sourceDataRekanan;
            });
            if(e.id==5 || e.id==3 ){
                $scope.Perusahaan=true
            }else{
                $scope.Perusahaan=false
                $scope.item.institusiAsalPasien=""
            }
        })

        $scope.tglPelayanan = $scope.item.pelayanan;
        $scope.dokter = $scope.item.namaPegawai;

        $scope.listDataFormat = [
             {
             "id":1, "format":"pdf"
             },
             {
              "id":2, "format":"xls"
             }
		];
        
        
        $scope.date = new Date();
        var tanggals = DateHelper.getDateTimeFormatted3($scope.date);
        
        //Tanggal Default
        $scope.item.tglawal = tanggals+" 00:00";
        $scope.item.tglakhir= tanggals+" 23:59";
       
        // Tanggal Inputan
        $scope.tglawal = $scope.item.tglawal;
        $scope.tglakhir = $scope.item.tglakhir;
        $scope.pegawai = modelItemAkuntansi.getPegawai();
		
            $scope.Cetak = function() {
                if($scope.item.tglawal == $scope.tglawal)
                    var tglawal = $scope.item.tglawal;
                else
                    var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
                if($scope.item.tglakhir == $scope.tglakhir)
                    var tglakhir = $scope.item.tglakhir;
                else
                    var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");
                if($scope.item.departement == undefined)
                    var departement = "";
                else
                    var departement = $scope.item.departement.id;
                if($scope.item.namaPenjamin == undefined)
                    var kelompokPasien = "";
                else
                    var kelompokPasien = $scope.item.namaPenjamin.id;
                if($scope.item.ruangan == undefined)
                    var ruangan = "";
                else
                    var ruangan = $scope.item.ruangan.id;
                if($scope.item.institusiAsalPasien == undefined || $scope.item.institusiAsalPasien.id == undefined)
                    var perusahaan = "";
                else
                    var perusahaan = $scope.item.institusiAsalPasien.id;


                var data2 = details

                var  TempData = []
                        for(var i=0;i<data2.length; i++){
                           // if (details[i].rekananfk != null && details[i].statusbarang == null){
                               TempData.push(data2[i])
                            // }    
                        }
                var data = 
                    {
                        details:TempData
                    }
                    manageTataRekening.simpanlaporanpasienpulang(data).then(function(e) {
                    $scope.isRouteLoading=false;
                    var noId = e.data.noId
                    var stt = 'false'
                    if (confirm('View Laporan Pasien Pulang? ')){
                        stt='true';
                    }else {
                        stt='false'
                    }
                    var client = new HttpClient();        
                        client.get('http://127.0.0.1:1237/printvb/kasir?cetak-LaporanPasienPulang=1&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&idlaporan='+noId+'&strIdDepartement='+departement+'&strIdRuangan='+ruangan+'&strIdKelompokPasien='+kelompokPasien+'&strIdPegawai='+$scope.pegawai.id+'&strIdPerusahaan='+perusahaan+'&view='+ stt, function(response) {
                                 // http://127.0.0.1:1237/printvb/kasir?cetak-LaporanPasienPulang=1&tglAwal=2017-08-01%2000:00:00&tglAkhir=2017-09-08%2023:59:59&idlaporan=PP18070001&strIdDepartement=16&strIdRuangan=18&strIdKelompokPasien=2&strIdPegawai=1&strIdPerusahaan=&view=true
                    });
                });
    	    }
       
        }
    ]);
});