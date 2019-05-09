define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarDraftCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window',
        function($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {
            $scope.redirect = function() {
                 if($scope.statKlik == true){
                    $state.go("KirimDraft", { idDokumen: $scope.idDocument });
                  }else{
                     window.messageContainer.error('Pilih 1 Data Terlebih dahulu')
                }
                //window.location = "#/KirimDraft/" + $scope.idDocument;
            }



         /*    $(document).ready(function() {
                    var myWindow = $("#window"),
                        undo = $("#undo");

                    undo.click(function() {
                        myWindow.data("kendoWindow").open();
                        undo.fadeOut();
                    });

                    function onClose() {
                        undo.fadeIn();
                    }

                    myWindow.kendoWindow({
                        width: "600px",
                        title: "About Alvar Aalto",
                        visible: false,
                        actions: [
                            "Pin",
                            "Minimize",
                            "Maximize",
                            "Close"
                        ],
                        close: onClose
                    }).data("kendoWindow").center().open();
                });*/
       

            $scope.now = new Date();
            $scope.item = {};
            $scope.item.tanggalAwal = new Date();
            $scope.item.tanggalAkhir = new Date();
            $scope.awalan = true;

            pencarianData();
            
            $scope.clear = function(){
              debugger
              $scope.item = {};
              $scope.item.tanggalAwal = new Date();
              $scope.item.tanggalAkhir = new Date();
              pencarianData();

            }

            $scope.cari = function() {
                pencarianData();
            }
            $scope.idDocument = "";
            $scope.klik = function() {
                $scope.statKlik = true;
                $scope.awalan = false;
                var grid = $("#usersGrid").data("kendoGrid");
                var selectedItem = grid.dataItem(grid.select());
                $scope.idDocument = selectedItem.id;

            };
            $scope.kirimDraft = function() {
                if($scope.statKlik == true){
                   $state.go("KirimDraft", { idDokumen: $scope.idDocument });
                }else{
                    window.messageContainer.error('Pilih 1 Data Terlebih dahulu');
                }
            }

            $scope.redirect2 = function() {
                debugger;
                //window.location = "#/DokumenVerbalKonsep";
                if($scope.statKlik == true){
                    $state.go("DokumenVerbalKonsep", { idDokumen: $scope.idDocument });
                }else{
                    window.messageContainer.error('Pilih 1 Data Terlebih dahulu');
                }
            }

            function pencarianData() {
                var ruangan = ModelItem.getPegawai().ruangan;
                var idRuangan = "";
                if (!_.isUndefined(ruangan.id)) {
                    idRuangan = ruangan.id;
                }
                var tglAwal = moment($scope.item.tanggalAwal).format('DD-MM-YYYY');
                var tglAkhir = moment($scope.item.tanggalAkhir).add(1, 'day').format('DD-MM-YYYY');
                ManageSarpras.getOrderList("surat-masuk/get-draft-surat?dateStart=" + tglAwal + "&dateEnd=" + tglAkhir + "&idRuangan=" + idRuangan, true).then(function(dat) {
                    for (var i = 0; i < dat.data.data.length; i++) {
                        var element = dat.data.data[i];
                        element.noDokumen = formatNumber(dat.data.data[i].noDokumen, 10);

                        for (var x = 0; x < dat.data.data[i].ruangans.length; x++) {
                            if (_.isUndefined(element.ruanganTujuan)) {
                                element.ruanganTujuan = dat.data.data[i].ruangans[x].namaRuangan;
                            } else {
                                element.ruanganTujuan += ' , ' + dat.data.data[i].ruangans[x].namaRuangan;
                            }
                        }

                    }

                    $scope.dataSource = new kendo.data.DataSource({
                        data: dat.data.data,
                        pageSize: 10,
                        total: dat.data.length,
                        serverPaging: false
                    });

                    $scope.detailGridOptions = function(dataItem) {
                        return {
                            dataSource: new kendo.data.DataSource({
                                data: dataItem.ruangans
                            }),
                            columns: [
                            {
                                field: "",
                                title: "<h3 align=center>Komponen<h3>"
                            },{
                                field: "",
                                title: "<h3 align=center>Qty<h3>"
                            },{
                                field: "namaRuangan",
                                title: "<h3 align=center>Harga Satuan<h3>"
                            },{
                                field: "namaRuangan",
                                title: "<h3 align=center>Total Harga<h3>"
                            } 
                            ]
                        };

                    };
                });
            }




            //Download file format
            $scope.downloadFormat = function() {
                debugger
                    ManageSarpras.downloadFile("surat-masuk/download-dokumen/" + this.dataItem.id, true);
            }

            function formatNumber(angka, panjang) {
                if (angka == null) {
                    return "";
                }
                if (panjang < 1) {
                    return angka;
                }
                var nol = "";
                var finalLength = panjang - angka.length;
                for (var i = 0; i < finalLength; i++) {
                    nol += "0";
                }
                return nol + angka;
            }
            $scope.colGridDaftarDraft = {
                pageable: true, 
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Dimulai dengan",
                            eq: "mengandung kata",
                            neq: "Tidak mengandung kata"
                        }
                    }
                },
                 columns: [{
                            field: "noDokumen",
                            title: "<h3 align=center>Nomor Draft Surat<h3>",
                            width: "10%"
                           }, 
                           {
                            field: "judulDokumen",
                            title: "<h3 align=center>Nama Sat<h3>",
                            width: "15%"
                                /*,template: "<a href='#' onClick='downloadFormat(${id})'>${judulDokumen}</a>"*/
                           }, 
                           { field:"Pengiriminan",title:"Pengiriman",headerAttributes: { style: "text-align : center"},
                            columns:[
                                    {
                                        field: "status",
                                        title: "<h3 align=center>Status<h3>",
                                        width: "10%"
                                    }, 
                                    {
                                        field: "ruanganTujuan",
                                        title: "<h3 align=center>Ruangan Tujuan<h3>",
                                        width: "15%"
                                    }, 
                                    {
                                        field: "statusVerifikasi",
                                        title: "<h3 align=center>Status Verifikasi<h3>",
                                        width: "15%"
                                    }]
                             }
                           ]
                    }

            $scope.columnDetailDaftar = [{
                field: "noDokumen",
                title: "<h3 align=center>Nomor Draft Surat<h3>",
                width: "10%"
               }, 
               {
                field: "judulDokumen",
                title: "<h3 align=center>Judul Dokumen<h3>",
                width: "15%"
                    /*,template: "<a href='#' onClick='downloadFormat(${id})'>${judulDokumen}</a>"*/
               }, 
               { field:"Pengiriminan",title:"<h3 align=center>Pengiriman<h3>",headerAttributes: { style: "text-align : center"},
                columns:[
                        {
                            field: "ruanganTujuan",
                            title: "<h3 align=center>Ruangan Tujuan<h3>",
                            width: "25%"
                        }, 
                        {
                            field: "status",
                            title: "<h3 align=center>Status Kirim<h3>",
                            width: "8%"
                        }, 
                        {
                            field: "statusVerifikasi",
                            title: "<h3 align=center>Status Verifikasi<h3>",
                            width: "8%"
                        }]
                 },
                 {
                        "title": "<h3 align=center>Format Dokumen</h3>",
                        "width" : "100px",
                        "template" : "<md-tooltip md-direction='left'>Download File</md-tooltip><button class='btnHapus' ng-click='downloadFormat()'>Download</button>"
                 }]
            /*[{
                field: "nip",
                title: "<div style='text-align:center'>NIP</div>",
                filterable: false
            }, {
                field: "namaPegawai",
                title: "<div style='text-align:center'>Nama Pegawai</div>",
                filterable: false
            }, {
                field: "golongan",
                title: "<div style='text-align:center'>Golongan</div>",
                filterable: false
            }, {
                field: "totalHarga",
                title: "<div style='text-align:center'>Total</div>",
                template: "<span class='style-right'>{{formatRupiah('#: totalHarga #', 'Rp.')}}</span>",
                filterable: false
            }];*/
            $scope.mainGridOptions = {
                toolbar : ['excel','pdf'],   
                columns: $scope.columnDetailDaftar,
                selectable: "row",
                editable: "popup",
                pageable: true
            };

        }
    ])
})