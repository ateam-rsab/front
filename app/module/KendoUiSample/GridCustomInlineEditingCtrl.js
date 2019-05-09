define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('GridCustomInlineEditingCtrl', [ '$mdDialog', '$element','$rootScope', '$scope', 'ModelItem',
		function($mdDialog, $element, $rootScope, $scope, ModelItem) {

			$(document.body).keydown(function(e) {
                if (e.altKey && e.keyCode == 87) {
                    $("#grid").data("kendoGrid").table.focus();
                }
            });

			// - ini data dummy 
			// - kalo mo ngetes dengan data kosong, ubah aja jadi array kosong
		    var user = [{
			    userId : 1,
			    namaLengkap : "Dicky Jaya Umbara",
			    jenisKelamin : { id : 1, name : "Laki-laki" },
			    statusAktif : true,
			    statusPernikahan :  { id : 1, name : "Belum Menikah" },
			    agama : { id : 1, name : "Islam" },
			    hobi : [
			    	{ "id":1, "name": "Sepakbola"},
		    		{ "id":2, "name": "Bulutangkis"}
		    	]
			}];

			// - bikin data source untuk grid kendo
		    $scope.dataSource = new kendo.data.DataSource({
		        pageSize: 20,
		        data: user,
		        autoSync: true,
		        schema: {
		          model: {
		            id: "ProductID",
		            fields: {
		              userId: { editable: false, nullable: true },
		              namaLengkap: { validation: { required: true } },
		              jenisKelamin: { defaultValue: { id: 1, name : "Laki-laki" } },
		              statusAktif : { type: "boolean" },
		              statusPernikahan: { defaultValue: { id : 1, name : "Belum Menikah" } },
		              agama: { defaultValue: { id : 1, name : "Islam" } },
		              hobi: { defaultValue: [] },
		            }
		          }
		        }
		     });


		    //start for jenis kelamin
		    // - data ini masih data dummy
		    // - data ini harusnya di ambil dari backend
		    var listJenisKelamin = [
            	{ "id":1, "name": "Laki-laki"},
            	{ "id":2, "name": "Wanita"}
            ];
		    $scope.dataSource_jenisKelamin = new kendo.data.DataSource({
		        data: listJenisKelamin
		    });

		    // -- ini fungsi untuk component dropdown jenis kelamin di grid
		    $scope.dropDownEditor_jenisKelamin = function(container, options) {
		        var editor = $('<input kendo-drop-down-list required k-data-text-field="\'name\'" k-data-value-field="\'id\'" k-data-source="dataSource_jenisKelamin" data-bind="value:' + options.field + '"/>')
		        .appendTo(container);
		    }
		    //end of jenis kelamin

		    //start for status pernikahan 
		    // - data ini masih data dummy
		    // - data ini harusnya di ambil dari backend
		    var listStatusPernikahan = [
            	{ "id":1, "name": "Menikah"},
            	{ "id":2, "name": "Janda"},
            	{ "id":3, "name": "Belum Menikah"},
            	{ "id":4, "name": "Duda"}	
            ];
		    $scope.dataSource_statusPernikahan = new kendo.data.DataSource({
		        data: listStatusPernikahan
		    });

		    // -- ini fungsi untuk component dropdown status pernikahan di grid
		    $scope.dropDownEditor_statusPernikahan = function(container, options) {
		        var editor = $('<input kendo-drop-down-list required k-data-text-field="\'name\'" k-data-value-field="\'id\'" k-data-source="dataSource_statusPernikahan" data-bind="value:' + options.field + '"/>')
		        .appendTo(container);
		    }
		    //end of status pernikahan

		    //start for agama
		    // - data ini masih data dummy
		    // - data ini harusnya di ambil dari backend
		    var listAgama = [
            	{ "id":1, "name": "Islam"},
            	{ "id":2, "name": "Katolik"},
            	{ "id":3, "name": "Buddha"},
            	{ "id":4, "name": "Hindu"},
            	{ "id":5, "name": "Protestan"}
            ];
		    $scope.dataSource_agama = new kendo.data.DataSource({
		        data: listAgama
		    });

		    // -- ini fungsi untuk component dropdown agama di grid
		    $scope.dropDownEditor_agama = function(container, options) {
		        var editor = $('<input kendo-drop-down-list required k-data-text-field="\'name\'" k-data-value-field="\'id\'" k-data-source="dataSource_agama" data-bind="value:' + options.field + '"/>')
		        .appendTo(container);
		    }
		    //end of agama

		    //start hobi
		    // - data ini masih data dummy
		    // - data ini harusnya di ambil dari backend
		    var listHobi = [
		    	{ "id":1, "name": "Sepakbola"},
		    	{ "id":2, "name": "Bulutangkis"},
		    	{ "id":3, "name": "Renang"},
		    	{ "id":4, "name": "Lari"},
		    	{ "id":5, "name": "Billiard"}
		    ]
		    $scope.dataSource_hobi = new kendo.data.DataSource({
		    	valuePrimitive: true,
		        data: listHobi
		    });

		    // -- ini fungsi untuk component dropdown multiselect hobbi di grid
		    $scope.dropDownEditor_hobi = function(container, options) {
		        var editor = $('<select kendo-multi-select k-data-text-field="\'name\'" k-data-value-field="\'id\'" k-data-source="dataSource_hobi" k-ng-model="" data-bind="value:' + options.field + '"/>')
		        .appendTo(container);
			}
			var multiSelectArrayToString = function (item) {
				var tempHobi = [];
				for(var i=0; i<item.hobi.length; i++){
					tempHobi.push(item.hobi[i].name);
				}


		        return tempHobi.join(', ');
		    };
		    //end of hobi


		    // - ini penting buat inisialiasi option grid
			$scope.mainGridOptions = {
				navigatable: true,
		        dataSource: $scope.dataSource,
		        pageable: true,
		        height: 550,
		        toolbar: ["create"],
		        columns: [
		          { field:"namaLengkap", title:"Nama Lengkap", width:"100px"},
		          { field: "jenisKelamin", title: "Jenis Kelamin", width: "70px", editor: $scope.dropDownEditor_jenisKelamin, template: "#=jenisKelamin.name#" },
		          { field:"statusAktif", title:"Status Aktif", width:"50px"},
		          { field: "statusPernikahan", title: "Status", width: "100px", editor: $scope.dropDownEditor_statusPernikahan, template: "#=statusPernikahan.name#" },
		          { field: "agama", title: "Agama", width: "70px", editor: $scope.dropDownEditor_agama, template: "#=agama.name#" },
		          { field: "hobi", title: "Hobi", width: "250px", editor: $scope.dropDownEditor_hobi, template: multiSelectArrayToString },
		          { command: "destroy", title: " ", width: "50px" }],
		        editable: true
		    };

		    $scope.Save = function(){
		    	var dataPost = $scope.dataSource._data;
		    	debugger;
		    }

		}
	]);
});