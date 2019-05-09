define(['initialize'], function (initialize) {
      'use strict';
      initialize.controller('SewaAsramaCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', '$state', 'DateHelper', '$window', '$timeout',
            function ($rootScope, $scope, ModelItem, ManageSarpras, $state, DateHelper, $window, $timeout) {
                  ModelItem.get("RumahTangga/SewaAsrama").then(function (data) {
                        $scope.ite = data;
                        $scope.now = new Date();
                        $scope.dataVOloaded = true;
                        $scope.isReport = true;
                        $scope.item.harga = 0;
                  }, function errorCallBack(err) { });
                  $scope.item = {};

                  $scope.$watch('item.tglSewaAwal', function () {
                        if ($scope.item.tglSewaAwal != undefined && $scope.item.tglSewaAkhir != undefined) {
                              debugger
                              var d1 = moment($scope.item.tglSewaAwal);
                              var d2 = moment($scope.item.tglSewaAkhir);
                              var days = moment.duration(d2.diff(d1)).asDays();
                              $scope.item.lamaSewaAsrama = days;
                              $scope.item.totalHargaSatuan = $scope.item.harga * days;
                        }

                  });

                  $scope.$watch('item.tglSewaAkhir', function () {
                        if ($scope.item.tglSewaAwal != undefined && $scope.item.tglSewaAkhir != undefined) {
                              var d1 = moment($scope.item.tglSewaAwal);
                              var d2 = moment($scope.item.tglSewaAkhir);
                              var days = moment.duration(d2.diff(d1)).asDays();
                              $scope.item.lamaSewaAsrama = days;
                              $scope.item.totalHargaSatuan = $scope.item.harga * days;
                              console.log(JSON.stringify(DateHelper))
                              // $scope.min = $scope.item.tglSewaAsramaAwal;
                        }
                  });

                  ManageSarpras.getOrderList("sewa-asrama/find-kamar/?namaRuangan=Asrama").then(function (data) {
                        $scope.listNoKamar = data.data.data.data;
                        $scope.unavailable = false;
                        if ($scope.listNoKamar.length == undefined) {
                              $scope.unavailable = true;
                              $scope.item.noKamar = {
                                    "id": "Kamar Penuh",
                                    "kdKamar": "Kamar Penuh"
                              }
                        }
                  });

                  $scope.removeDaftarKamar = function (e) {
                        e.preventDefault();
                        var grid = this;
                        var row = $(e.currentTarget).closest("tr");

                        $scope.tempDataBarang = $scope.daftarDataKamar
                              .filter(function (el) {
                                    return el.name !== grid[0].name;
                              });
                        console.log(JSON.stringify(row));
                        grid.removeRow(row);
                        debugger;
                  };

                  $scope.listNoKamar = new kendo.data.DataSource({
                        data: [
                              {
                                    "namaKamar": "Kamar 501",
                                    "harga": 1234
                              },
                              {
                                    "namaKamar": "Kamar 502",
                                    "harga": 897
                              },
                              {
                                    "namaKamar": "Kamar 503",
                                    "harga": 80
                              }

                        ]
                  });

                  $scope.kembali = function () {
                        window.location.href = "#/DaftarSewaAsrama"
                  }
                  $scope.listStatus = ["BELUM", "PROSES", "SELESAI"]

                  $scope.dataSource = new kendo.data.DataSource({
                        data: [],
                        pageSize: 5,
                        sortable: true,
                        autoSync: true
                  });


                  $scope.daftarDataKamar = new kendo.data.DataSource({
                        data: [

                        ],
                        aggregate: [
                              { field: "harga", aggregate: "sum" },


                        ]

                  });

                  $scope.columnDataKamar = [
                        {
                              field: "namaKamar",
                              title: "<h3 >Nomor Kamar</h3>",
                              attributes: { align: "left" },
                              width: 180,
                              type: "string",
                              footerTemplate: "<center>Total :</center> "

                        },
                        {
                              field: "harga",
                              title: "<h3 >Harga Kamar</h3>",
                              attributes: { align: "center" },
                              width: 180,
                              type: "number",
                              footerTemplate: "<center>#= sum #</center> "//,
                              //template: "<input style=\"width: 100%\" kendo-date-time-picker k-ng-model=\"item.tanggalAwal\" placeholer=\"{{item.now}}\"/>"
                        },
                        {
                              command: { text: "Hapus", click: $scope.removeDaftarKamar },
                              title: "&nbsp;",
                              width: "50px"
                        }
                  ]





                  $scope.tambahDataKamar = function () {
                        if ($scope.item.kamar.idKamar != undefined) {
                              var unique = true;

                              $scope.daftarDataKamar._data.forEach(function (dat) {
                                    if ($scope.item.kamar.idKamar == dat.idKamar)
                                          unique = false;
                              })


                              debugger;
                              if (unique) {
                                    if ($scope.item.tglSewaAwal != undefined && $scope.item.tglSewaAkhir != undefined) {
                                          var awal = DateHelper.getPeriodeFormatted($scope.item.tglSewaAwal);
                                          var akhir = DateHelper.getPeriodeFormatted($scope.item.tglSewaAkhir);
                                          var url = "periodeAwal=" + awal + "&periodeAkhir=" + akhir + "&idKamar=" + $scope.item.kamar.idKamar;
                                          ManageSarpras.getOrderList("sewa-asrama/find-status-kamar/?" + url).then(function (dat) {
                                                var statusKamar = dat.data.data.StatusKamar;
                                                debugger;
                                                if (statusKamar == false) {
                                                      var tempDataKamar = {
                                                            "namaKamar": $scope.item.kamar.namaKamar,
                                                            "harga": $scope.item.kamar.hargaSatuan,
                                                            "idKamar": $scope.item.kamar.idKamar,
                                                            "idProduk": $scope.item.kamar.idProduk,
                                                            "idRuangan": $scope.item.kamar.idRuangan
                                                      }
                                                      debugger;
                                                      $scope.item.harga = 0;
                                                      $scope.daftarDataKamar.add(tempDataKamar);
                                                      $scope.daftarDataKamar._data.forEach(function (dat) {
                                                            $scope.item.harga = $scope.item.harga + dat.harga;
                                                      })

                                                      $scope.item.totalHargaSatuan = $scope.item.harga * $scope.item.lamaSewaAsrama;

                                                      $scope.item.kamar = "";

                                                } else {
                                                      kendoAlert("Kamar sudah terisi! Silakan pilih kamar lain.")
                                                }
                                          })
                                    } else {
                                          kendoAlert("Tanggal mulai sewa / tanggal akhir sewa belum diisi. Silakan isi terlebih dahulu!")
                                    }
                              } else {
                                    kendoAlert("Kamar sudah dipilih! Silakan pilih kamar lain")
                              }

                        } else {
                              kendoAlert("Silakan pilih kamar")
                        }


                  }

                  // attach kendoAlert to the window
                  $window.kendoAlert = (function () {

                        // create modal window on the fly
                        var win = $("<div>").kendoWindow({
                              modal: true
                        }).getKendoWindow();

                        return function (msg) {

                              // set the content
                              win.content(msg);

                              // center it and open it
                              win.center().open();
                        };

                  } ());

                  $scope.asd = function () {
                        // $("#open").on("click", function () {
                        kendoAlert("Hey Now!");
                        // });
                  };



                  $scope.Back = function () {
                        $scope.item = {};
                  }

                  $scope.NavToDaftarSewaAsrama = function () {
                        debugger;
                        $state.go("DaftarSewaAsrama")
                  }

                  if ($state.current.name == "KeluarAsrama") {
                        $scope.isOut = true;
                        ManageSarpras.getOrderList("daftar-sewa-asrama/find-by-no-order/?noOrder=" + $state.params.noOrder).then(function (data) {
                              $scope.order = data.data.data.data[0];
                              $scope.item = $scope.order;
                              $scope.item.noTelpMobile = $scope.item.noTelp;
                              $scope.item.tglPelayananAwal = new Date($scope.item.tglSewaAwal);
                              $scope.item.tglPelayananAkhir = new Date($scope.item.tglSewaAkhir);
                              $scope.item.noKamar = $scope.order.kamar;
                              $scope.item.harga = $scope.order.hargaSatuan;
                        })
                        $scope.Save = function () {
                              var saveData = {
                                    "strukOrder": {
                                          "tglKeluar": $scope.item.tglKeluar.getTime()
                                    }
                              }
                              ManageSarpras.saveDataSarPras(saveData, "daftar-sewa-asrama/save-status-sewa-asrama/?noOrder=" + $state.params.noOrder).then(function (e) {
                                    console.log(JSON.stringify(e.data));
                                    $state.go("DaftarSewaAsrama");
                              })
                        }
                  } else {
                     
                        $scope.Save = function () {
                              $scope.item.tglPelayananAwal = new moment($scope.item.tglSewaAwal).format('YYYY-MM-DD');
                              $scope.item.tglPelayananAkhir = new moment($scope.item.tglSewaAkhir).format('YYYY-MM-DD');

                              var arrKamar = [];
                              var idProduk;
                              var i = 0;
                              var statusKamar = true;
                              debugger;
                              $scope.daftarDataKamar._data.forEach(function (datas) {
                                    var dataKamar = {
                                          "kamar": {
                                                "id": datas.idKamar
                                          },
                                          "hargaSatuan": datas.harga,
                                          "ruangan": {
                                                "id": datas.idRuangan
                                          },
                                          "ruanganTujuan": {
                                                "id": datas.idRuangan
                                          }
                                    }
                                    arrKamar[i] = dataKamar;
                                    i++;
                                    idProduk = datas.idProduk;

                              })

                              var data = {
                                    "strukOrder": $scope.item,
                                    "orderPelayanan": {
                                          "mapKamarAsrama": arrKamar,
                                          "produk": {
                                                "id": idProduk
                                          },
                                          "ruangan": {
                                                "id": arrKamar[0].ruangan.id
                                          },
                                          "ruanganTujuan": {
                                                "id": arrKamar[0].ruangan.id
                                          }

                                    }
                              }
                              debugger;
                              console.log(JSON.stringify(data));
                              ManageSarpras.saveDataSarPras(ModelItem.beforePost(data), "sewa-asrama/save-sewa-asrama/").then(
                                    function (e) {
                                          console.log(JSON.stringify(e));
                                          $timeout(function () {

                                                $window.location.reload();
                                          }, 5500);
                                      
                                    })

                        }
                  }
            }
      ]);
});


//==========================================SOURCE DATAOLD======================================================= 
//$scope.mainGridOptions = {
//       //dataSource: $scope.dataSource,
//       pageable: true,
//       toolbar: ["create"],
//       editable: {
//             mode: "popup",
//             template: kendo.template($("#popup-editor").html())
//       },
//       columns: [
//             {
//                   field: "namaKamar",
//                   title: "<h3 >Nomor Kamar</h3>",
//                   width: 180,
//                   type: "string",

//             },
//             {
//                   field: "harga",
//                   title: "<h3 >Harga Kamar</h3>",
//                   width: 180,
//                   type: "string"//,
//                   //template: "<input style=\"width: 100%\" kendo-date-time-picker k-ng-model=\"item.tanggalAwal\" placeholer=\"{{item.now}}\"/>"
//             },
//             {
//                   command: ["destroy"],
//                   title: "&nbsp;",
//                   width: "50px"
//             }]//,
//       // /editable: true
// };
// $scope.$watch('daftarDataKamar', function () {
//       debugger;
//       $scope.item.harga = $scope.item.noKamar.hargaSatuan;
//       $scope.item.totalHargaSatuan = $scope.item.harga * $scope.item.lamaSewaAsrama;
// });
// $scope.item = {};
// var awal = DateHelper.getPeriodeFormatted($scope.item.tglSewaAwal);
// var akhir = DateHelper.getPeriodeFormatted($scope.item.tglSewaAkhir);
// var url = "periodeAwal=" + awal + "&periodeAkhir=" + akhir + "&idKamar=" + $scope.item.noKamar.idKamar;


// debugger;
// ManageSarpras.getOrderList("sewa-asrama/find-status-kamar/?" + url + "").then(function (dat) {
//       var statusKamar = dat.data.data.StatusKamar;
//       debugger;
//       if (statusKamar == false) {
//             var data = {
//                   "strukOrder": $scope.item,
//                   "orderPelayanan": {
//                         "mapKamaAsrama": [
//                               {
//                                     "kamar": {
//                                           "id": $scope.item.noKamar.idKamar
//                                     },
//                                     "hargaSatuan": $scope.item.harga
//                               }

//                         ],

//                         "produk": {
//                               "id": $scope.item.noKamar.idProduk
//                         },
//                         "ruangan": {
//                               "id": $scope.item.noKamar.idRuangan
//                         },
//                         "ruanganTujuan": {
//                               "id": $scope.item.noKamar.idRuangan
//                         }
//                   }
//             }
//             debugger;
//             ManageSarpras.saveDataSarPras(ModelItem.beforePost(data), "sewa-asrama/save-sewa-asrama/").then(
//                   function (e) {
//                         console.log(JSON.stringify(e));
//                         $scope.item = {};
//                   })
//       } else {
//             alert("Kamar sudah terisi. Silakan pilih kamar lain.")
//       }

// });

//       "total": "",                     v
// "noOrder": "",                         v
// "harga": "",                           v                 
// "lamaSewaAsrama": "",                  v
// "kdProfile": "",
// "tglSewaAsramaAkhir": "",        v
// "statusEnabled": "",
// "noRec": "",
// "noKTP": "",                           v
// "tglSewaAsramaAwal": "",         v
// "noHp": "",                            v
// "noKamar": {                           v
//   "qKamar": "",
//   "kodeExsternal": "",
//   "kdKamar": "",
//   "qtyBed": "",
//   "namaKamar": "",
//   "id": "",
//   "kdProfile": "",
//   "namaExternal": "",
//   "statusEnabled": "",
//   "noRec": "",
//   "kelasId": "",
//   "ruangan": {},
//   "ruanganId": "",
//   "kelas": {},
//   "reportDisplay": ""
// },
// "alamat": "",                          v
// "namaPenyewa": ""                      v