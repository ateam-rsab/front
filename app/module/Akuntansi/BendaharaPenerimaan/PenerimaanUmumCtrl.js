define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PenerimaanUmumCtrl', [ '$q', '$rootScope', '$scope', 'ManageSdm', '$state','CacheHelper','DateHelper','ModelItemAkuntansi', 
		function($q, $rootScope, $scope, manageSdm ,$state,cacheHelper,dateHelper,modelItemAkuntansi ) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item={};
			 $scope.items={};
			$scope.item.tglPembayaran = new Date();
			//$scope.item.tglLahir = new Date();
			$scope.listRuangan={};
			$scope.selectedData=[];
			$scope.listProduk= {};
            $scope.listRuangan= {};
            $scope.listPegawai= {};
			 /*manageKasir.getItem("service/list-generic?view=jenisKelamin&select=id,jenisKelamin&order=id:asc", true).then(function(dat){
				$scope.listJenisKelamin = dat.data;
			});*/
			//Load all data on firstime
			//var data = cacheHelper.get('listPegawai');
            //if (cacheHelper.get('listPegawai') === undefined || cacheHelper.get('PenerimaanUmumCtrl-listJenisRekanan') === undefined){
                //Ambil data dari cache aj biar cepat
                $q.all([
					modelItemAkuntansi.getDataGeneric("jenisKelamin&select=id,jenisKelamin&order=id:asc"),//jenis kelamin
					modelItemAkuntansi.getDataGeneric("jenisRekanan&select=id,namaExternal&order=id:asc"),//jenis rekanan
					modelItemAkuntansi.getDataGeneric("rekanan&select=id,namaRuangan&order=id:asc"),//rekanan
					 manageSdm.getOrderList("service/list-generic/?view=Produk&select=id,namaProduk&take=10"),//Data Produk               
					//modelItemAkuntansi.getDataGeneric("produk&select=*&order=id:asc"),//produk
					modelItemAkuntansi.getDataGeneric("ruangan&select=*&order=id:asc"),//ruangan
					manageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&take=10"), //pegawai
			]).then(function(data) {
				/*cacheHelper.set('PenerimaanUmumCtrl-listJenisKelamin', data[0]);
				cacheHelper.set('PenerimaanUmumCtrl-listJenisRekanan', data[1]);
				cacheHelper.set('PenerimaanUmumCtrl-listProduk', data[3]);
				cacheHelper.set('PenerimaanUmumCtrl-listRuangan', data[4]);
				cacheHelper.set('PenerimaanUmumCtrl-listPegawai', data[5]);*/
                $scope.listJenisKelamin= data[0];
                $scope.listJenisRekanan= data[1];
                $scope.listRekanan= data[2];
                $scope.listProduk= data[3];
                $scope.listRuangan= data[4];
                $scope.listPegawai= data[5];
			});
             /*}else{// ambil data dari cache
             	$scope.listJenisKelamin= cacheHelper.get('PenerimaanUmumCtrl-listJenisKelamin');
                $scope.listJenisRekanan=  cacheHelper.get('PenerimaanUmumCtrl-listJenisRekanan');
                $scope.listRekanan= {};
                $scope.listProduk= cacheHelper.get('PenerimaanUmumCtrl-listProduk');
                $scope.listRuangan= cacheHelper.get('PenerimaanUmumCtrl-listRuangan');
                $scope.listPegawai= cacheHelper.get('PenerimaanUmumCtrl-listPegawai');
             }*/
			/**/
var _roleDataSource = new kendo.data.DataSource({
    data: [
        { id: 1, title: "Software Engineer" },
        { id: 2, title: "Quality Assurance Engineer" },
        { id: 3, title: "Team Lead" }
    ]
});

var _peopleDataSource = new kendo.data.DataSource({
    data: [
        { id: 1, name: "John", roleId: 1, roleTitle: "Software Engineer" },
        { id: 2, name: "Dave", roleId: 2, roleTitle: "Quality Assurance Engineer" },
        { id: 3, name: "Aaron", roleId: 3, roleTitle: "Team Lead" }
    ]
});

var _grid = $("#grid").kendoGrid({
    dataSource: _peopleDataSource,
    columns: [
        {
            field: "name",
            title: "Name"
        },{
            field: "roleTitle",
            title: "Role",
            editor: function(container, options) {
                $("<input data-bind='value:roleTitle' />")
                    .attr("id", "ddl_roleTitle")
                    .appendTo(container)
                    .kendoDropDownList({
                        dataSource: _roleDataSource,
                        dataTextField: "title",
                        dataValueField: "title",
                        template: "<span data-id='${data.id}'>${data.title}</span>",
                        select: function(e) {
                            var id = e.item.find("span").attr("data-id");
                            var person =_grid.dataItem($(e.sender.element).closest("tr"));
                            person.roleId = id;
                            
                            setTimeout(function() {
                                $("#log")
                                    .prepend($("<div/>")
                                        .text(
                                            JSON.stringify(_grid.dataSource.data().toJSON())
                                         ).append("<br/><br/>")
                                    );
                                });
                        }
                    });
            }
        }
    ],
    editable: true
}).data("kendoGrid");
			//***/
			//On Enter press 
			$('#noReg').keyup(function(ev){
		      if(ev.keyCode === 13){
		        $q.all([
					modelItemAkuntansi.getDataGeneric("pasien&select=*&order=id:asc&search=noCm:010255"),//jenis kelamin
				]).then(function(data) {
					debugger;
					var dataTemp= data[0];
	                $scope.items.namaPasien= dataTemp[0].namaExternal;
	                $scope.items.jenisKelamin= {"id":dataTemp[0].jenisKelaminFk,"jenisKelamin":dataTemp[0].jenisKelamin};
	                $scope.items.tglLahir=new Date(dataTemp[0].tglLahir);	                
				});
		      }
		    });
			//Onchange jenis Rekanan
			$scope.$watch('item.jenisRekanan', function(newValue, oldValue) {
				//debugger;
		       if(newValue != undefined ){
		       	var tempJenisRekananId= newValue.id;
				//Ambil data rekanan sesuai jenis rekanan
				 
					$q.all([
					 modelItemAkuntansi.getDataGeneric("rekanan&order=id:asc&search=kdJenisRekanan:"+tempJenisRekananId+"&select=id,namaRekanan"),
					 
					]).then(function(data) {
		                $scope.listRekanan= data[0];
		                 
		                
					});
		       }
    		});
			 
			$scope.Terima =function(){
				debugger;
				console.log($scope.item);
				console.log(JSON.stringify($scope.dataSource._data))
				 
			}
			$scope.Detail =function(){
				
			}
			$scope.Back =function(){
				
			}
			 
		 

			$scope.formatRupiah = function(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
			};

			$scope.dataSource = new kendo.data.DataSource({
            	pageSize: 20,
                   data: [],
                   autoSync: true,
                   schema: {
                       model: {
                         id: "ProductID",
                         fields: {
                            ProductID: { editable: false, nullable: true },
                            TglPelayanan:{type:"date"},
                            ProductName: {   },
                            Petugas: {  },
                            HargaSatuan: { type: "number", validation: { required: true, min: 0} },
                            HargaDiskon: { type: "number", validation: { required: true, min: 0} },
                            Qty: { type: "number", validation: { required: true, min: 0} }
                         }
                       }
                   }
            });
			$("#kGrid").kendoGrid({
                dataSource: $scope.dataSource,
                pageable: true,
                height: 200,
                toolbar: ["create"],
                columns: [
                    { field:"ProductName",title:"Product Name", editor: produkLayananDropDownEditor, template: "#=ProductName.namaProduk#"  },
                    { field:"TglPelayanan", title:"Tgl Pelayanan", format:"{0:yyyy-MM-dd HH:mm}", editor: dateTimeEditor },
                    { field: "Petugas", title: "Petugas P.Jawab", width: "180px", editor: penanggungJawabDropDownEditor, template: "#=Petugas.namaLengkap#" },
                    { field: "HargaSatuan", title:"Harga Satuan", width: "130px" },
                    { field: "HargaDiskon", title:"Harga Diskon", width: "130px" },
                    { field: "Qty", title:"Qty", width: "130px" },
                    { field: "Totalharga", title:"Total Harga", width: "130px" ,template: "#= HargaSatuan * Qty #"},
                    { command: "destroy", title: " ", width: "150px" }],
                editable: true
            });
              function dateTimeEditor(container, options) {
				    $('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
				            .appendTo(container)
				            .kendoDateTimePicker({});
				}

			function penanggungJawabDropDownEditor(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        dataTextField: "namaLengkap",
                        dataValueField: "id",
                        dataSource: $scope.listPegawai,
                        index:0
                        
                    });
            }
			function produkLayananDropDownEditor(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        dataTextField: "namaProduk",
                        dataValueField: "id",
                        dataSource:$scope.listProduk,
                         index: 0,
                        change: onChange(this)
                        
                    });
            } //end function produkLayananDropDownEditor
			function ruanganLayananDropDownEditor(container, options) {
            $('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    dataTextField: "namaLayanan",
                    dataValueField: "idLayanan",
                    dataSource: $scope.listRuangan,
                    index:0
                    
                });
        } //end function ruanganLayananDropDownEditor
			function onChange(temp) {
                debugger;
                var data= temp;
                alert(temp);
            }; 

		}
		]);
});

/*
[
  {
    "id": 13882,
    "namaPasien": "Yovita",
    "noCm": "010255",
    "tglLahir": "08-07-1986",
    "noHp": null,
	"jenisKelamin":{"id":2},
    "jenisRekanan":{"id":11},
	"namaRekanan":{"id":4803}
	"listProduk":[
		{
			"ProductID":null,
			"TglPelayanan":"2017-03-14T09:22:42.735Z",
			"ProductName":
				{
					"id":1,
					"namaProduk":"Beverages"
				},
			"Petugas":{
				"id":1,
				"namaLengkap":"Beverages"
			},
			"Ruangan":{
				"id":1,
				"namaRuangan":"Beverages"
			},
			"HargaSatuan":1000,
			"HargaDiskon":0,
			"Qty":1,
			"Total": 1000
		},		
	],
	"totalTagihan": 1000,
	"tglPembayaran": "08-03-2017",
  }
]*/