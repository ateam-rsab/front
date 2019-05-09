define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PemusnahanBarangLogistikCtrl', ['FindProduk', 'ManageSarpras', '$rootScope', '$scope', 'ModelItem', 'DateHelper',
            function(findProduk, manageSarpras, $rootScope, $scope, ModelItem, DateHelper) {     

            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item = {
                tanggalPemusnahan: $scope.now
            };
            $scope.listJenisPemeriksaan = [{ name: "Kelompok Produk", id: 1 },
                { name: "Jenis Produk", id: 2 }
            ];
            $scope.isSelected = false;
            manageSarpras.getListData("Pegawai&select=id,namaLengkap", true).then(function(e){
                $scope.listPegawai = e.data;
            })
            $scope.$watch('item.jenisPermintaan', function(e) {
                if (e === undefined) return;
                if (e.id === 1) {
                    $scope.isSelected = true;
                    $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);
                }
            })
            manageSarpras.getOrderList("anggaran/get-ruangan", true).then(function(dat){
                $scope.item.ruangan = dat.data.data;
            });
            $scope.cari = function(){
                var kelBarang, jenBarang, barangId;
                if ($scope.item.kelompokBarang === undefined) {
                    kelBarang = "";
                } else {
                    kelBarang = $scope.item.kelompokBarang.id
                }

                if ($scope.item.jenisProduk === undefined) {
                    jenBarang = "";
                } else {
                    jenBarang = $scope.item.jenisProduk.id
                }

                if ($scope.item.namaBarang === undefined) {
                    barangId = "";
                } else {
                    barangId = $scope.item.namaBarang.id
                }
                manageSarpras.getOrderPemusnahan(kelBarang, jenBarang, barangId).then(function(e) {
                    // $scope.isReport = true;
                    $scope.isEdit = true;

                    // e.data.data.forEach(function(data){
                    //     data.tanggalKadaluarsa = DateHelper.getPeriodeFormatted(new Date(data.tanggalKadaluarsa));
                    // })

                    $scope.dataOrderPemusnahan = new kendo.data.DataSource({
                        data: e.data.data
                    });
                })
            }
            $scope.kl = function(current){
                $scope.current = current;
                console.log(current);
            };
            $scope.optionsOrderPemusnahan = {
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            contains: "Contains",
                            startswith: "Starts with"
                        }
                    }
                },
                pageable: true,
                editable: false,
                columns: [{ 
                    template: "<input type='checkbox' class='checkbox' />",
                    width: 20
                },{
                    "field": "kdProduk",
                    "title": "Kode Barang",
                    "width": 100,
                    filterable: false
                }, {
                    "field": "namaProduk",
                    "title": "Nama Barang",
                    "width": "200px"
                }, {
                    "field": "noRegisterAset",
                    "title": "No Registrasi",
                    "width": 160,
                    filterable: false
                }, {
                    "field": "noBatch",
                    "title": "No Batch",
                    "width": 160,
                    filterable: false
                }, {
                    "field": "tanggalKadaluarsa",
                    "title": "Tgl Expired",
                    "width": 80,
                    filterable: false,
                    // template: "#= kendo.toString(tanggalKadaluarsa, 'MM/dd/yyyy') #"
                    template: "#= new moment(new Date(tanggalKadaluarsa)).format('DD-MM-YYYY') #"
                }, {
                    "field": "qtyProduk",
                    "title": "Jumlah Stok",
                    "format": "{0:n0}",
                    "attributes": {
                        "style": "text-align:right"
                    },
                    "width": 60,
                    filterable: false
                }],

            };
            $scope.dataListPemusnahan = new kendo.data.DataSource({
                data: [],
                schema: {
                    model: {
                        fields: {
                            produkId: {editable: false},
                            namaProduk: {editable: false},
                            noBatch: {editable: false},
                            tanggalKadaluarsa: {editable: false},
                            qtyProduk: {editable: false},
                            qty: {type: "number"},
                            satuan: {editable: false},
                            noReg: {editable: false},
                            noReg: {editable: false},
                            keterangan: {type: "string"}
                        }
                    }
                },
                pageSize: 20,
                change: function (e) {
                    console.log("change :" + e.action);
                    if (e.field && e.action === "itemchange") {
                        
                    }
                }
            });
            $scope.optionsListPemusnahan = {
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            contains: "Contains",
                            startswith: "Starts with"
                        }
                    }
                },
                pageable: true,
                editable: true,
                columns: [{
                    "field": "kdProduk",
                    "title": "Kode Barang",
                    "width": 100,
                    filterable: false
                }, {
                    "field": "namaProduk",
                    "title": "Nama Barang",
                    "width": "200px"
                }, {
                    "field": "noBatch",
                    "title": "No Batch",
                    "width": 80,
                    filterable: false
                }, {
                    "field": "tanggalKadaluarsa",
                    "title": "Tgl Expired",
                    "width": 100,
                    filterable: false,
                    template: "#= new moment(new Date(tanggalKadaluarsa)).format('DD-MM-YYYY') #"
                }, {
                    field: "Qty",
                    headerAttributes: { style: "text-align : center"},
                    columns: [{
                        "field": "qtyProduk",
                        "title": "Saldo",
                        "format": "{0:n0}",
                        "attributes": {
                            "style": "text-align:right"
                        },
                        "width": 60,
                        filterable: false
                    }, {
                        "field": "qty",
                        "title": "Pemusnahan",
                        "format": "{0:n0}",
                        "attributes": {
                            "style": "text-align:right"
                        },
                        "width": 100,
                        filterable: false
                    }]
                }, {
                    "field": "satuan",
                    "title": "Satuan",
                    "width": "200px",
                    filterable: false
                }, {
                    "field": "noRegisterAset",
                    "title": "No Registrasi",
                    "width": 120,
                    filterable: false
                }, {
                    "field": "keterangan",
                    "title": "Keterangan",
                    "width": 200,
                    filterable: false
                }, {
                    "command": [{
                        name: "destroy",
                        text: "Hapus"
                    }],
                    "width": 90,
                }],

            };
            $scope.checkedIds = [];
            $scope.showCheckboxes = function(){
                var grid = $("#kgrid").data("kendoGrid");
                $("#kgrid").find("input:checked").each(function(){
                    var row = $(this).closest('tr'),
                    dataItem = grid.dataItem(row);
                    $scope.dataListPemusnahan.add(dataItem);
                })
                $scope.isSelected = true;

            };
            $scope.$watch('item.kelompokBarang', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
                $scope.listJenisBarang = ModelItem.kendoHttpSource('product/find-jenis-produk?idKelompokProduk=' + e.id, true);
            })
            $scope.$watch('item.jenisProduk', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-produk-by-jenis-produk-and-nama-produk?idDetailJenisProduk=' + e.id, true);
            })
            $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);
            $scope.Save = function() {
                var listRawRequired = [
                    "item.tanggalPemusnahan|k-ng-model|Tanggal pemusnahan",
                    "item.namaPJ|k-ng-model|Nama penanggung jawab",
                    "item.saksi1|k-ng-model|Nama saksi 1",
                    "item.saksi2|k-ng-model|Nama saksi 2"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                if(isValid.status){
                    var listBarang = [];
                    $scope.dataListPemusnahan._data.forEach(function(element){
                        if (element.qty !== undefined && element.qty <= element.qtyProduk) {
                            var tempBarang = {
                                "tglExpired": new moment(element.tanggalKadaluarsa).format('DD-MM-YYYY'),
                                "produk": {
                                    "id": element.produkId
                                },
                                // "qtyProduk": element.qtyProduk,
                                "qtyProduk": element.qty,
                                "asalProduk": {
                                    "id": element.asalProdukId
                                },
                                "ruangan": {
                                    "id": 50
                                },
                                "strukPelayanan": {
                                    "noRec": element.noRecStrukPelayanan
                                },
                                "keteranganAlasan": element.keterangan === undefined ? "-" : element.keterangan,
                                "noBatch": element.noBatch
                            }
                            listBarang.push(tempBarang);
                        }
                    })

                    if (listBarang.length === $scope.dataListPemusnahan._data.length) {
                        var tempData = {
                            "ruangan": {
                                "id":  $scope.item.ruangan.id
                            },
                            "saksiSatu": {
                                "id":  $scope.item.saksi1.id
                            },
                            "saksiDua": {
                                "id": $scope.item.saksi2.id
                            },
                            "penanggungJawab": {
                                "id": $scope.item.namaPJ.id
                            },
                            "destroyProduk": listBarang,
                            "tglHistori": DateHelper.getPeriodeFormatted($scope.item.tanggalPemusnahan)
                        }
                        // console.log(JSON.stringify(tempData));
                        manageSarpras.saveDataSarPras(tempData, "pemusnahan-barang/save-pemusnahan-barang/").then(function(e){
                            $scope.isNext = true;
                            $scope.isReport = true;
                        });
                    } else {
                        window.messageContainer.error('Data tidak valid');
                    }
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
            $scope.cetak = function() {
                window.messageContainer.error('Fitur belum tersedia');
            }
            $scope.batal = function(){
                // $scope.item = {};
                location.reload(); // reload halaman
            }
        }
    ]);
});