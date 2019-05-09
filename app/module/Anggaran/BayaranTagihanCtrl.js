define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('BayaranTagihanCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi','DateHelper','$http','$state',
        function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi,dateHelper,$http,$state) {

            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.periodeAwal = $scope.now;
            $scope.item.periodeAkhir = $scope.now;
            $scope.dataPasienSelected = {};
            $scope.listStatusKlinikMata = [{"id":1,"name":"PPN"}]
            debugger;
            var tahunPriode =  dateHelper.formatDate($scope.item.periodeTahun, 'YYYY');
            /*findPasien.getDataDetail(tahunPriode).then(function(data) {*/
            $http.get('module/Anggaran/dummy_json/DaftarRKAKLTahunan.json').success(function(data) {
                debugger;
                var arraydata = data.result;
                $scope.dataPenyusunanTRPNBP = new kendo.data.DataSource({
                    data: arraydata,
                    total: data.length,
                    serverPaging: false,
                    pageSize: 10,
                    schema:  {
                        model: {
                            fields: {
                                tanggalMasuk: { type: "date" },
                                tanggalPulang: { type: "date" }
                            }
                        }
                    }
                });
            })

            $scope.dataPenyusunanTRPNBP = new kendo.data.DataSource({

                data: $scope.item.dataArraySatu,
                pageSize: 10,
            });
            $scope.columnPenyusunanTRPNBP = [
                {
                    "field": "",
                    "title": "Struk Terima",
                    "width":"150px"
                },
                {
                    "field": "",
                    "title": "Tanggal Terima"
                },
                {
                    "field": "",
                    "title": "Supplier"
                },
                {
                    "field": "",
                    "title": "No Faktur"
                },
                {
                    "field": "",
                    "title": "Tanggal Jatuh Tempo"
                },
                {
                    "field": "",
                    "title": "Total"
                },
                {
                    "field": "",
                    "title": "Biaya"
                },
                {
                    "field": "",
                    "title": "Total PPN"
                },
                {
                    "field": "",
                    "title": "Total Diskon"
                },
                {
                    "field": "",
                    "title": "Status"
                }
            ];
            $scope.detailGridOptions = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.listKegiatan
                    }),
                    columns: [
                        {
                            "field": "kodeKegiatan",
                            "title": "Kode",
                            "width":"150px"
                        },
                        {
                            "field": "namaKegiatan",
                            "title": "Kegiatan"
                        },
                        {
                            "field": "",
                            "title": "Jumlah Biaya"
                        }]
                };
            };

            $scope.detailGridOptionsDua = function(dataItem) {
                debugger;
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.listDetailKegiatan
                    }),
                    columns: [
                        {
                            "field": "kodeKegiatanDetail",
                            "title": "Kode",
                            "width":"150px"
                        },
                        {
                            "field": "namaKegiatanDetail",
                            "title": "Detail Kegiatan",
                        },
                        {
                            "field": "volume",
                            "title": "Volume"
                        },
                        {
                            "field": "hargaSatuan",
                            "title": "Harga Satuan"
                        },
                        {
                            "field": "jumlahBiaya",
                            "title": "Jumlah Biaya"
                        }]
                };
            };
            $scope.Cetak = function(){
                debugger;
                var xxx =   $scope.dataPasienSelected.detail;
                var yyy = "aasas";
            }

            var thoudelim=".";
            var decdelim=",";
            var curr="Rp ";
            var d=document;
            var i
            var eja
            var a
            var b
            var c
            var subdigit


            function format(s,r) {
                s=Math.round(s*Math.pow(10,r))/Math.pow(10,r);
                s=String(s);s=s.split(".");var l=s[0].length;var t="";var c=0;
                while(l>0){t=s[0][l-1]+(c%3==0&&c!=0?thoudelim:"")+t;l--;c++;}
                s[1]=s[1]==undefined?"0":s[1];
                for(i=s[1].length;i<r;i++) {s[1]+="0";}
                return curr+t+decdelim+s[1];
            }

            function threedigit(word) {
                eja=Array("Nol","Satu","Dua","Tiga","Empat","Lima","Enam","Tujuh","Delapan","Sembilan");
                while(word.length<3) word="0"+word;
                word=word.split("");
                a=word[0];b=word[1];c=word[2];
                word="";
                word+=(a!="0"?(a!="1"?eja[parseInt(a)]:"Se"):"")+(a!="0"?(a!="1"?" Ratus":"ratus"):"");
                word+=" "+(b!="0"?(b!="1"?eja[parseInt(b)]:"Se"):"")+(b!="0"?(b!="1"?" Puluh":"puluh"):"");
                word+=" "+(c!="0"?eja[parseInt(c)]:"");
                word=word.replace(/Sepuluh ([^ ]+)/gi, "$1 Belas");
                word=word.replace(/Satu Belas/gi, "Sebelas");
                word=word.replace(/^[ ]+$/gi, "");

                return word;
            }

            function sayit(s) {
                var thousand=Array("","Ribu","Juta","Milyar","Trilyun");
                s=Math.round(s*Math.pow(10,2))/Math.pow(10,2);
                s=String(s);s=s.split(".");
                var word=s[0];
                var cent=s[1]?s[1]:"0";
                if(cent.length<2) cent+="0";

                var subword="";i=0;
                while(word.length>3) {
                    subdigit=threedigit(word.substr(word.length-3, 3));
                    subword=subdigit+(subdigit!=""?" "+thousand[i]+" ":"")+subword;
                    word=word.substring(0, word.length-3);
                    i++;
                }
                subword=threedigit(word)+" "+thousand[i]+" "+subword;
                subword=subword.replace(/^ +$/gi,"");

                word=(subword==""?"NOL":subword.toUpperCase())+"RUPIAH";
                subword=threedigit(cent);
                cent=(subword==""?"":" ")+subword.toUpperCase()+(subword==""?"":" SEN");
                return word+cent;
            }

            $scope.$watch('item.subTotal', function(newValue) {
                debugger;
                if (newValue===undefined) {
                    newValue = 0;
                }
                $scope.item.terbilang = sayit(newValue,3)
            });
            $scope.Bayar = function() {
                alert('Fungsi bayar masih belum berfungsi')
            }
            $scope.Kembali = function() {
                $state.go('DaftarTagihanSupplier')
            }
        }
    ]);
});/**
 * Created by jasamedika on 02/02/2017.
 */
