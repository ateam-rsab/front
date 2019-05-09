define(['initialize', 'Configuration'], function(initialize, configuration) {
  'use strict';
  initialize.controller('InputTindakanPendaftaranCtrl', [ 'ManagePasien','$scope', '$parse','ModelItem', '$state', '$rootScope', '$timeout', '$window','CacheHelper', 'DateHelper', 'CetakHelper', 'ModelItem', 'ManageServicePhp','ModelItemAkuntansi','FindPasien','FindPegawai',
    function( managePasien,$scope, $parse, modelItem, $state, $rootScope, $timeout, $window, cacheHelper, dateHelper, cetakHelper, ModelItem, manageServicePhp,modelItemAkuntansi,findPasien,findPegawai) {
      $scope.now = new Date();
      $scope.currentNorecPD = $state.params.norecPD;
      $scope.currentNorecAPD = $state.params.norecAPD;
      $scope.item = {};
      $scope.model = {};
      $scope.dataModelGrid = [];
      $scope.formatJam24 = {
                format: "dd-MM-yyyy HH:mm", //set date format
                timeFormat: "HH:mm",    //set drop down time format to 24 hours
            };
        $scope.model.hargaTindakan = "";

      // $scope.item.tglPelayanan = $scope.now;
  
      loadPertama();

      function loadPertama(){
        $scope.model.tglPelayanan = $scope.now;
        
        $scope.isRouteLoading=true;

        var jensiPelayananId = "";
        if ($scope.item.pasien!= undefined) {
            jensiPelayananId = "&idJenisPelayanan=" +$scope.item.pasien.objectjenispelayananfk;
        }
        manageServicePhp.getDataTableTransaksi("registrasipasien/get-pasien-bynorec/"
              +$scope.currentNorecPD
              +"/"
              +$scope.currentNorecAPD)         
            .then(function (e) {
             $scope.isRouteLoading = false;
             $scope.item.pasien=e.data[0]; 

             manageServicePhp.getDataTableTransaksi("inputtindakan/get-tindakan?idRuangan="
                  +$scope.item.pasien.objectruanganfk
                  +"&idKelas="
                  +$scope.item.pasien.objectkelasfk
                  +"&idJenisPelayanan=" +$scope.item.pasien.objectjenispelayananfk
                  )         
                 .then(function (x) {
                        $scope.listProduk=x.data.data;
             })
    
       });

       $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
       }

       $scope.getHargaTindakan = function () {
                $scope.model.hargaTindakan =$scope.model.namaProduk.hargasatuan;
                                $scope.model.jumlah = 1;
                                getKomponenHarga()
        }
        function getKomponenHarga(){
               if ($scope.model.namaProduk!=undefined){
               
                 manageServicePhp.getDataTableTransaksi("inputtindakan/get-komponenharga?idRuangan=" 
                      + $scope.item.pasien.objectruanganfk
                      + "&idKelas=" + $scope.item.pasien.objectkelasfk
                      + "&idProduk=" + $scope.model.namaProduk.id
                      // + "&idJenisPelayanan=" + $scope.item.pasien.objectjenispelayananfk 
                       )
                        .then(function(dat){
                       $scope.listKomponen = dat.data.data;

                      })          
                  }
        }
        
        refreshDetilTagihan();
        
               
      }
      manageServicePhp.getDataTableTransaksi("inputtindakan/get-combo")         
      .then(function (da) {
       $scope.listJenisPelaksana=da.data.jenispelaksana;
     })
      function getPegawaiById(id, input, output){
        var selectedData = $parse(output);
        selectedData.assign($scope, []);
        var model = $parse(input);
        manageServicePhp.getDataTableTransaksi("inputtindakan/get-pegawaibyjenispetugas?idJenisPetugas=" + id, true).then(function(dat){
          $scope.listPegawai = new kendo.data.DataSource({
            data: dat.data.jenispelaksana
          });
          model.assign($scope, $scope.listPegawai);
        });
      }
        //input tindakan di pendaftaran pasien
            var pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
           
            $scope.listYaTidak = [
            {
                "id": 1, "name":"Ya"
            },
            {
                "id": 0, "name":"Tidak"
            }]
            $scope.hapusTransaksi = function(id){
                var raw = $scope.dataTindakan.data();
                var length = raw.length;
                var item, i;
                for(i=length-1; i>=0; i--){
                    item = raw[i];
                    if (item.no.toString() === id.toString()){
                        raw.remove(item);
                        //TODO call remote service to delete item....
                    }
                }
                // var data = $scope.dataSelectedRow;
                // $scope.dataTindakan.remove(data);
            };
            $scope.hapusAll = function(){
                // debugger;
                $scope.dataTindakan = new kendo.data.DataSource({
                    data: []
                })
            };
           
            $scope.dataSelectedRow = {};
            $scope.dataTindakan = new kendo.data.DataSource({
                data: []
            });
            $scope.columnDataTindakan = [{
                "field": "noRec",
                "title": "",
                "hidden": true
            },{
                "field": "ruangan",
                "title": "",
                "hidden": true
            },{
                "field": "pasienDaftar",
                "title": "",
                "hidden": true
            },{
                "field": "no",
                "title": "<h3 align=center>No</h3>",
                "width": "80px"
            },{
                "field": "tglPelayanan",
                "title": "<h3 align=center>Tanggal</h3>",
                "width": "100px"
            },
            {
                "field": "produk",
                "title": "<h3 align=center>Tindakan</h3>",
                "width": "400px",
                "template": '#= produk.namaProduk #'
            },
            {
                "field": "hargaNetto",
                "title": "<h3 align=center>Harga Netto</h3>",
                "width": "100px",
                "attributes": {align:"center"}
            },
            {
                "field": "qty",
                "title": "<h3 align=center>Jumlah</h3>",
                "width": "70px",
                "attributes": {align:"center"}
            },{
                title: "<h5 align=center>Action</h5>",
                width: "70px",
                template: "<button class='btnTemplate1' style='width:50%' ng-click='hapusTransaksi(#=no#)'>Hapus</button>"
            },{
                "field": "pelayananPasienPetugasSet",
                "title": "",
                "hidden": true
            }];
            $scope.opsiGridTindakan = {
                columns: $scope.columnDataTindakan,
                pageable: true,
                selectable: "row",
                pageSizes: true
            };
            var id = 0;


            $scope.tambahTindakan = function() {
                var listRawRequired = [
                    "model.namaProduk|k-ng-model|Tindakan",
                    "model.jumlah|k-ng-model|Jumlah",
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    // var tglPelayanan = dateHelper.getTanggalFormattedNew(new Date());
                    var grid = $('#grid').data("kendoGrid");
                    id += 1;
                    $scope.dataModelGrid[id] = {};

                    grid.dataSource.add({
                        "no": id,
                        "noRec": $scope.currentNorecPD,
                        "tglPelayanan": $scope.model.tglPelayanan,
                        "ruangan" : $scope.item.pasien.namaruangan,
                        "produk": {
                            "id": $scope.model.namaProduk.id,
                            "namaProduk": $scope.model.namaProduk.namaproduk
                        },
                        "hargaNetto": $scope.model.hargaTindakan,
                        "qty" : $scope.model.jumlah,
                        "kelas" : $scope.item.pasien.namakelas,
                        "pasienDaftar": {
                            "noRec" : $scope.currentNorecAPD
                        },
                        "pelayananPasienPetugasSet": [{
                            "objectJenisPetugasPe": {
                                "id": 2
                            },
                            "mapPelayananPasienPetugasToPegawaiSet": [{
                                "id": pegawai.id,
                                "namaLengkap": pegawai.namaLengkap,
                                "jenisPegawai": pegawai.jenisPegawai.id
                            }]
                        }],
                          "listKomponen":   $scope.listKomponen 
                    });
                    $scope.SaveTindakan();
                    // $scope.model.namaProduk = "";
                    // $scope.model.hargaTindakan = "";
                    // $scope.model.jumlah = "";
                }else{
                    ModelItem.showMessages(isValid.messages);
                }
            };     

             $scope.SaveTindakan = function () {
                var dataTindakanFix = [];
                if ($scope.listKomponen.length<=0){
                         window.messageContainer.error("Simpan Gagal, Komponen Tindakan tidak ada");
                         return
                }
                else
                {
                    if ($scope.model.namaProduk.namaproduk.indexOf('Konsul') >= 0 )
                        // || $scope.model.namaProduk.namaproduk.indexOf('Karcis') >= 0)
                      {
                        var data ={
                                "noregistrasifk": $scope.currentNorecAPD,
                                "tglregistrasi": $scope.item.pasien.tglregistrasi,
                                "tglpelayanan": new moment($scope.model.tglPelayanan).format('YYYY-MM-DD HH:mm'),
                                "ruangan" : $scope.item.pasien.namaruangan,
                                "produkfk": $scope.model.namaProduk.id,
                                "hargasatuan": $scope.model.hargaTindakan,
                                "hargajual": $scope.model.hargaTindakan,
                                "harganetto": $scope.model.hargaTindakan,
                                "jumlah" : $scope.model.jumlah,
                                "kelasfk" : $scope.item.pasien.objectkelasfk,
                                "pelayananpetugas": [{
                                    "objectjenispetugaspefk": 4,
                                    "listpegawai": [{
                                                 "objectjenispetugaspefk": 4,
                                                 "id": $scope.item.pasien.objectpegawaifk
                                                }]
                                        }],     
                                "komponenharga":$scope.listKomponen
                                }
                      }
                      else
                      {
                         var data ={
                              "noregistrasifk": $scope.currentNorecAPD,
                                "tglregistrasi": $scope.item.pasien.tglregistrasi,
                                "tglpelayanan": new moment($scope.model.tglPelayanan).format('YYYY-MM-DD HH:mm'),
                                "ruangan" : $scope.item.pasien.namaruangan,
                                "produkfk": $scope.model.namaProduk.id,
                                "hargasatuan": $scope.model.hargaTindakan,
                                "hargajual": $scope.model.hargaTindakan,
                                "harganetto": $scope.model.hargaTindakan,
                                "jumlah" : $scope.model.jumlah,
                                "kelasfk" : $scope.item.pasien.objectkelasfk,
                                "pelayananpetugas": [{
                                    "objectjenispetugaspefk": 4,
                                    "listpegawai": []
                                        }],     
                                "komponenharga":$scope.listKomponen
                                }
                      }

                    dataTindakanFix.push(data);
                    var objSave={ 
                         pelayananpasien:dataTindakanFix
                    }
                    manageServicePhp.saveTindakanPelayanan(objSave).then(function(e){
                        // $scope.showTindakan = false;
                        $scope.dataTindakan = new kendo.data.DataSource({
                            data: [],
                            pageSize:5
                        });
                        $scope.model.namaProduk = "";
                        $scope.model.hargaTindakan = "";
                        $scope.model.jumlah = "";
                        refreshDetilTagihan();
                    })
                }          
            }

            $scope.Cancel = function(){
                window.history.back();
            }

            // controller untk data detil tagihan
            $scope.group = [
                {
                    field: "tglPelayanan",
                    groupHeaderTemplate: "Tanggal.  #= value #",
                    aggregates: [{
                        field: "namaProduk",
                        aggregate: "count"
                    }, {
                        field: "detailJenisProduk",
                        aggregate: "count"
                    }]
                }, {
                    field: "namaRuangan",
                    aggregates: [{
                        field: "tglPelayanan",
                        aggregate: "count"
                    }, {
                        field: "namaProduk",
                        aggregate: "count"
                    }, {
                        field: "namaRuangan",
                        aggregate: "count"
                    }]
                }, {
                    field: "detailJenisProduk",
                    groupHeaderTemplate: "Bagian #= value #",
                    aggregates: [{
                        field: "namaProduk",
                        aggregate: "count"
                    }, {
                        field: "detailJenisProduk",
                        aggregate: "count"
                    }]
                }
            ];
        
            $scope.gridOptions = {
                // dataSource: {
                //     data: data,
                //     group: $scope.group
                // },
                selectable: "row",
                sortable: true,
                columns: [
                {
                    "field": "tglPelayanan",
                    "title": "Tgl Pelayanan",
                      width: 150
                }, 
                {
                    "field": "namaProduk",
                    "title": "Nama Pelayanan",
                }, {
                    "field": "jumlah",
                    "title": "Jumlah",
                    width: 100
                }, {
                    "field": "hargaSatuan",
                    "title": "Harga",
                    width: 180,
                    template: "<span style='text-align:right;display:block'>#=kendo.toString(hargaSatuan, 'n2')#</span>",

                }, {
                    "field": "jumlah * hargaSatuan",
                    "title": "Total",
                    width: 180,
                    template: " <span style='text-align:right;display:block'> #=kendo.toString(jumlah*hargaSatuan, 'n2')# </span>  ",
                }, {
                    hidden: true,
                    field: "namaRuangan",
                    title: "Nama Ruangan",
                    aggregates: ["count"],
                    groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)"
                },
                {
                    hidden: true,
                    field: "detailJenisProduk",
                    title: "",
                    aggregates: ["count"],
                    groupHeaderTemplate: " #= value # Jumlah: #= count# "
                },
                {
                    command: { 
                              text: "Hapus",
                              width:"50px", 
                              align:"center",
                              attributes: {align:"center"},
                              click: removeRowTindakan
                              },
                              title: "",
                              width: "80px"
                }]
            };
            function removeRowTindakan(e){
                  e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr); 
                $scope.tempDataTindakan = $scope.dataTindakan
                .filter(function(el){
                  return el.name !== grid[0].name;
                });
                if(dataItem.noRecStruk != null){
                    toastr.error('Data sudah diclosing, hubungi Tatarekening','Error')
                    return
                }
                var itemDelete = {
                            // "noRec": dataItem.noRec,
                            "norec_pp": dataItem.noRec,
                            // "noRecStruk": null
                        }
                var tempData=[];
                 tempData.push(itemDelete);
                //  managePasien.removekan(tempData).then(function(e){
                //     if(e.status === 201){
                //          refreshDetilTagihan();
                //             grid.removeRow(row);
                //     }
                // })
                var objDelete = {
                    "dataDel": tempData,
                };
	             manageServicePhp.saveDataTransaksi('inputtindakan/hapus-pelayanan-pasien',objDelete).then(function(e){
                    if(e.status === 201){
                        refreshDetilTagihan();
                           grid.removeRow(row);
                   }
				 })
             
           }
       
          function refreshDetilTagihan(){
              $scope.isRouteLoading =true
              manageServicePhp.getDataTableTransaksi('inputtindakan/get-pelayanan-pasien?norec_pd='+$scope.currentNorecPD)
                    .then(function(e) {
                // findPasien.findDetailPelayanan( $scope.currentNorecPD).then(function(e) {
                    $scope.listData = e.data.data;
                    var data = e.data.data;
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            var element = data[key];
                            element.tglPelayanan = moment(element.tglPelayanan).format('DD-MMM-YYYY HH:mm');
                        }
                    }
              

                    $scope.total = _.reduce(data, function(memo, num) {
                        if (num.nilaiNormal === 0)
                            return memo + (num.jumlah * num.hargaSatuan * -1);
                        return memo + (num.jumlah * num.hargaSatuan);
                    }, 0);
                    $scope.isRouteLoading =false
                });
            }   

    
            }
        ]);
});