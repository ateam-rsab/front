define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LaporanKunjunganUnitCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'ModelItem','DateHelper', 'ManageServicePhp', '$window', '$mdDialog',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, ModelItem, dateHelper, manageServicePhp, $window, $mdDialog) {
            $scope.item = {};
            $scope.jumlahLayanan = 2000;
            $scope.item.unitKerja='';
            $scope.newDataSource='';
            $scope.isRouteLoading = false;
            $scope.item.tglAwal = dateHelper.setJamAwal(new Date());
            $scope.item.tglAkhir = dateHelper.setJamAkhir(new Date());
            manageLogistikPhp.getDataTableMaster("unitkerja/get-combo-unit-kerja", true).then(function (res) {
                // console.log(res.data.unit_kerja)
                $scope.listUnitKerja = res.data.unit_kerja;
            });
            $scope.optGrid = {
                toolbar:["excel"],
                excel: {
                    fileName:"Rekap kunjungan Unit"+moment($scope.now).format( 'DD/MMM/YYYY'),
                    allPages: true,

                },
                excelExport: function(e){
                    let tglAwal = $scope.item.tglAwal ? dateHelper.formatDate($scope.item.tglAwal, "YYYY-MM-DD HH:mm") : dateHelper.formatDate(new Date(), "YYYY-MM-DD HH:mm"),
                    tglAkhir = $scope.item.tglAkhir ? dateHelper.formatDate($scope.item.tglAkhir, "YYYY-MM-DD HH:mm") : dateHelper.formatDate(new Date(), "YYYY-MM-DD HH:mm");
                  var sheet = e.workbook.sheets[0];
                //  sheet.name = "Orders";

                  var myHeaders = [{
                    value:"Tanggal Awal",
                    textAlign: "center",
                    background:"#10c4b2",
                    color:"#ffffff"
                  },{
                    value:tglAwal,
                    textAlign: "center",
                    background:"#10c4b2",
                    color:"#ffffff"
                  },{
                    value:"Tanggal Akhir",
                    textAlign: "center",
                    background:"#10c4b2",
                    color:"#ffffff"
                  },{
                    value:tglAkhir,
                    textAlign: "center",
                    background:"#10c4b2",
                    color:"#ffffff"
                  },];

                  sheet.rows.splice(0, 0, { cells: myHeaders, type: "header"});
                },
                selectable: 'row',
                columns: [{
                    "title": "No",
                    "template": "<span class='row-number'></span>",
                    "width": "20",
                    "attributes": { "style": "text-align: center" }
                },{
                    "field": "namaruangan",
                    "title": "Unit",
                    "width": "150",
                    "footerTemplate": "Total :",
                },{
                    "field": "total",
                    "title": "Jumlah Kunjungan",
                    "footerTemplate": "<span class='grandTotal'></span>",
                    "width": "100",
                    "attributes": { "style": "text-align: right" }
                },
                {
                    "field": "lakilaki",
                    "title": "Laki - Laki",
                    "footerTemplate": "<span class='grandLakilaki'></span>",
                    "width": "100",
                    "attributes": { "style": "text-align: right" }
                },
                {
                    "field": "perempuan",
                    "title": "Perempuan",
                    "footerTemplate": "<span class='grandPerempuan'></span>",
                    "width": "100",
                    "attributes": { "style": "text-align: right" }
                },
                {
                    "field": "asuransi",
                    "title": "Asuransi",
                    "footerTemplate": "<span class='grandAsuransi'></span>",
                    "width": "100",
                    "attributes": { "style": "text-align: right" }
                }],
                dataBound: function () {
                    let rows = this.items();
                    $(rows).each(function () {
                        let index = $(this).index() + 1;
                        let rowLabel = $(this).find(".row-number");
                        $(rowLabel).html(index);
                    });
                    let totalsum=0,lakilakisum=0,perempuansum=0,asuransisum=0;
                    if($scope.newDataSource!=''){
                        $scope.newDataSource.forEach(element => {
                            totalsum+=element.total;
                            if(element.lakilaki!==null){lakilakisum+=element.lakilaki;}
                            if(element.perempuan!==null){perempuansum+=element.perempuan;}
                            if(element.asuransi!==null){asuransisum+=element.asuransi;}
                        });
                    }
                    $("#kGrid").find(".grandTotal").html(totalsum);
                    $("#kGrid").find(".grandLakilaki").html(lakilakisum);
                    $("#kGrid").find(".grandPerempuan").html(perempuansum);
                    $("#kGrid").find(".grandAsuransi").html(asuransisum);
                    $(".k-grid-footer").find(".ng-scope").attr({"style": "text-align: right"})
                }
            };

            $scope.formatTanggal=(tanggal)=>{
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }
            $scope.filterData=()=>{
                if(!$scope.item.unitKerja){ toastr.info("Harap pilih Unit Kerja!");return;}
                $scope.isRouteLoading = true;
                $scope.dataSource=[];
                let tglAwal = $scope.item.tglAwal ? dateHelper.formatDate($scope.item.tglAwal, "YYYY-MM-DD HH:mm") : dateHelper.formatDate(new Date(), "YYYY-MM-DD HH:mm"),
                    tglAkhir = $scope.item.tglAkhir ? dateHelper.formatDate($scope.item.tglAkhir, "YYYY-MM-DD HH:mm") : dateHelper.formatDate(new Date(), "YYYY-MM-DD HH:mm"),
                    ruangan = $scope.item.unitKerja ? $scope.item.unitKerja.id : "";
                manageLogistikPhp.getDataTableTransaksi("laporan/get-laporan-kunjungan-pasien-by-unit?tglawal="+tglAwal+"&tglakhir="+tglAkhir+"&idunitkerja="+ruangan, true).then(function (res) {
                    let newDataSource=[],newRuangan= res.data.data.filter((arr, index, self) => index === self.findIndex((t) => (t.id == arr.id)));
                    newRuangan.forEach(newRuangan => {
                        let asuransi=0,lakilaki=0,perempuan=0,total=0,dataFilter = res.data.data.filter(e=>e.id==newRuangan.id);
                        dataFilter.forEach(dataFilter=> {
                            total+=dataFilter.jml_kunjungan;
                            if(dataFilter.kelamin_laki!==null){lakilaki+=dataFilter.kelamin_laki;}
                            if(dataFilter.kelamin_perempuan!==null){perempuan+=dataFilter.kelamin_perempuan;}
                            if(dataFilter.asuransi!==null){asuransi+=dataFilter.asuransi;}
                        });
                        newDataSource.push({
                            "tanggalwal": tglAwal,
                            "tanggaakhir": tglAkhir,
                            "id": newRuangan.id,
                            "namaruangan":newRuangan.namaruangan,
                            "total":total,
                            "lakilaki":lakilaki,
                            "perempuan":perempuan,
                            "asuransi":asuransi
                        });
                    });
                    $scope.dataSource = new kendo.data.DataSource({data:newDataSource,pageSize:100});
                    $scope.isRouteLoading = false;
                    $scope.newDataSource = newDataSource;
                })
            }

            // let init=()=>{
            //     $scope.filterData();
            // }
            // init();
        }
    ]);
});