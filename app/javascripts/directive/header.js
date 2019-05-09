 define([], function() {

     var componentDirective = angular.module('ComponentDirective', []);

     /*
     - nama directive : ListMenuHeader
     - deskripsi : service untuk ngambil data menu header
     - param post : token
     - url : liat di file config data (sekarang belom ada config datanya)
     */
     componentDirective.directive('generateField', function() {
         return {
             restrict: 'EA',
             template: '<h2>Hello cuuuuuy asdfasfd</h2>'
         };
     });

     componentDirective.directive("panelPasien", function($compile) {
         return {
             restrict: "EA",
             scope: {
                 dataPanelPasien: '=data',
             },
             link: function(scope, elm, attrs) {
                 console.log("Directive Called");
                 var dataPasien = scope.dataPanelPasien.dataPasien;
                 var template = "";



                 //nyari object by key and value
                 function objectFindByKey(array, key, value) {
                     for (var i = 0; i < array.length; i++) {
                         if (array[i][key] === value) {
                             return array[i];
                         }
                     }
                     return null;
                 }

                 //field untuk kode title
                 var objKodeTitle = objectFindByKey(dataPasien.attributes, 'name', 'kdTitle');
                 var fieldTemp = ['<form name="myForm"><div class="grid_4">',
                     '<label c-label c-label-text="' + objKodeTitle.caption + '"></label>',
                     '</div>',

                     '<div class="grid_8">',
                     '<input c-text-box type="input" required name="kdTitle" class="k-textbox" ng-model="dataPasien.model.kdTitle" />',
                     '<p ng-show="myForm.kdTitle.$error.required" class="help-block">*' + objKodeTitle.messagesRequired + '</p>',
                     '</div>'
                 ].join('');


                 //field untuk nama lengkap pasien
                 var objNamaLengkapPasien = objectFindByKey(dataPasien.attributes, 'name', 'namaLengkapPasien');
                 fieldTemp += ['<form name="myForm"><div class="grid_4">',
                     '<label c-label c-label-text="' + objNamaLengkapPasien.caption + '"></label>',
                     '</div>',

                     '<div class="grid_8">',
                     '<input c-text-box type="input" required name="namaLengkapPasien" class="k-textbox" ng-model="dataPasien.model.namaLengkapPasien" />',
                     '<p ng-show="myForm.namaLengkapPasien.$error.required" class="help-block">*' + objNamaLengkapPasien.messagesRequired + '</p>',
                     '</div>'
                 ].join('');

                 //field untuk tanggal lahir


                 /*<div class="grid_8">
                             <input style="width: 100%;" kendo-combo-box k-ng-model="item.KdTitle"
                                    k-data-text-field="'NamaTitle'"
                                    k-filter="'contains'"
                                    k-data-value-field="'KdTitle'"
                                    k-data-source="titles" />
                         </div>*/

                 var objTanggalLahir = objectFindByKey(dataPasien.attributes, 'name', 'tanggalLahir');
                 var placeHolder = "'1'";
                 var tanggalValue = "'TanggalValue'";
                 var tanggalId = "'TanggalId'";
                 var tanggalSource = "'dataPanelPasien.dataTanggal.tanggal'";
                 fieldTemp += ['<form name="myForm"><div class="grid_4">',
                     '<label c-label c-label-text="' + objTanggalLahir.caption + '"></label>',
                     '</div>',

                     '<div style="padding-top: 1em;">',
                     '<select kendo-combo-box',
                     'k-placeholder="' + placeHolder + '"',
                     'k-data-text-field="' + tanggalValue + '"',
                     'k-data-value-field="' + tanggalId + '"',
                     'k-data-source="' + tanggalSource + '"',
                     'style="width: 100%" >',
                     '</select>',
                     '</div>',
                 ].join('');

                 //field untuk tipe pesan
                 var objTipePasien = objectFindByKey(dataPasien.attributes, 'name', 'tipePasien');
                 fieldTemp += ['<div class="grid_4">',
                     '<label c-label c-label-text="' + objTipePasien.caption + '"></label>',
                     '</div>',

                     '<div class="grid_8">',
                     '<input c-text-box type="input" required name="tipePasien" class="k-textbox" ng-model="dataPasien.model.tipePasien" />',
                     '<p ng-show="myForm.tipePasien.$error.required" class="help-block">*' + objTipePasien.messagesRequired + '</p>',
                     '</div>'
                 ].join('');

                 //field untuk nama keluarga
                 var objNamaKeluarga = objectFindByKey(dataPasien.attributes, 'name', 'namaKeluarga');
                 fieldTemp += ['<div class="grid_4">',
                     '<label c-label c-label-text="' + objNamaKeluarga.caption + '"></label>',
                     '</div>',

                     '<div class="grid_8">',
                     '<input c-text-box type="input" required name="namaKeluarga" class="k-textbox" ng-model="dataPasien.model.namaKeluarga" />',
                     '<p ng-show="myForm.namaKeluarga.$error.required" class="help-block">*' + objNamaKeluarga.messagesRequired + '</p>',
                     '</div>'
                 ].join('');

                 //field untuk nama
                 var objKodeTitle = objectFindByKey(dataPasien.attributes, 'name', 'nama');
                 fieldTemp += ['<div class="grid_4">',
                     '<label c-label c-label-text="' + objKodeTitle.caption + '"></label>',
                     '</div>',

                     '<div class="grid_8">',
                     '<input c-text-box type="input" required name="nama" class="k-textbox" ng-model="dataPasien.model.nama" />',
                     '<p ng-show="myForm.nama.$error.required" class="help-block">*' + objKodeTitle.messagesRequired + '</p>',
                     '</div>'
                 ].join('');

                 //field untuk tempat
                 var objTempat = objectFindByKey(dataPasien.attributes, 'name', 'tempat');
                 fieldTemp += ['<div class="grid_4">',
                     '<label c-label c-label-text="' + objTempat.caption + '"></label>',
                     '</div>',

                     '<div class="grid_8">',
                     '<input c-text-box type="input" required name="tempat" class="k-textbox" ng-model="dataPasien.model.tempat" />',
                     '<p ng-show="myForm.tempat.$error.required" class="help-block">*' + objTempat.messagesRequired + '</p>',
                     '</div>'
                 ].join('');

                 //field untuk Tanggal Lahir
                 var objTanggalLahir = objectFindByKey(dataPasien.attributes, 'name', 'tglLahir');
                 fieldTemp += ['<div class="grid_4">',
                     '<label c-label c-label-text="' + objTanggalLahir.caption + '"></label>',
                     '</div>',

                     '<div class="grid_8">',
                     '<input c-text-box type="input" required name="tglLahir" class="k-textbox" ng-model="dataPasien.model.tglLahir" />',
                     '<p ng-show="myForm.tglLahir.$error.required" class="help-block">*' + objTanggalLahir.messagesRequired + '</p>',
                     '</div>'
                 ].join('');

                 //field untuk wargaNegara
                 var objWargaNegara = objectFindByKey(dataPasien.attributes, 'name', 'wargaNegara');
                 fieldTemp += ['<div class="grid_4">',
                     '<label c-label c-label-text="' + objWargaNegara.caption + '"></label>',
                     '</div>',

                     '<div class="grid_8">',
                     '<input c-text-box type="input" required name="wargaNegara" class="k-textbox" ng-model="dataPasien.model.wargaNegara" />',
                     '<p ng-show="myForm.wargaNegara.$error.required" class="help-block">*' + objWargaNegara.messagesRequired + '</p>',
                     '</div>'
                 ].join('');

                 //field untuk Suku
                 var objSuku = objectFindByKey(dataPasien.attributes, 'name', 'suku');
                 fieldTemp += ['<div class="grid_4">',
                     '<label c-label c-label-text="' + objSuku.caption + '"></label>',
                     '</div>',

                     '<div class="grid_8">',
                     '<input c-text-box type="input" required name="suku" class="k-textbox" ng-model="dataPasien.model.suku" />',
                     '<p ng-show="myForm.suku.$error.required" class="help-block">*' + objSuku.messagesRequired + '</p>',
                     '</div>'
                 ].join('');

                 //field untuk Agama
                 var objAgama = objectFindByKey(dataPasien.attributes, 'name', 'agama');
                 fieldTemp += ['<div class="grid_4">',
                     '<label c-label c-label-text="' + objAgama.caption + '"></label>',
                     '</div>',

                     '<div class="grid_8">',
                     '<input c-text-box type="input" required name="agama" class="k-textbox" ng-model="dataPasien.model.agama" />',
                     '<p ng-show="myForm.agama.$error.required" class="help-block">*' + objAgama.messagesRequired + '</p>',
                     '</div>'
                 ].join('');

                 //field untuk Jenis Kelamin
                 var objJenisKelamin = objectFindByKey(dataPasien.attributes, 'name', 'jenisKelamin');
                 fieldTemp += ['<div class="grid_4">',
                     '<label c-label c-label-text="' + objJenisKelamin.caption + '"></label>',
                     '</div>',

                     '<div class="grid_8">',
                     '<input c-text-box type="input" required name="jenisKelamin" class="k-textbox" ng-model="dataPasien.model.jenisKelamin" />',
                     '<p ng-show="myForm.jenisKelamin.$error.required" class="help-block">*' + objJenisKelamin.messagesRequired + '</p>',
                     '</div>'
                 ].join('');

                 //field untuk Jenis Kelamin
                 var objGolonganDarah = objectFindByKey(dataPasien.attributes, 'name', 'golonganDarah');
                 fieldTemp += ['<div class="grid_4">',
                     '<label c-label c-label-text="' + objGolonganDarah.caption + '"></label>',
                     '</div>',

                     '<div class="grid_8">',
                     '<input c-text-box type="input" required name="golonganDarah" class="k-textbox" ng-model="dataPasien.model.golonganDarah" />',
                     '<p ng-show="myForm.golonganDarah.$error.required" class="help-block">*' + objGolonganDarah.messagesRequired + '</p>',
                     '</div>'
                 ].join('');

                 //field untuk Status 
                 var objStatus = objectFindByKey(dataPasien.attributes, 'name', 'status');
                 fieldTemp += ['<div class="grid_4">',
                     '<label c-label c-label-text="' + objStatus.caption + '"></label>',
                     '</div>',

                     '<div class="grid_8">',
                     '<input c-text-box type="input" required name="status" class="k-textbox" ng-model="dataPasien.model.status" />',
                     '<p ng-show="myForm.status.$error.required" class="help-block">*' + objStatus.messagesRequired + '</p>',
                     '</div>'
                 ].join('');

                 //field untuk Pendidikan
                 var objPendidikan = objectFindByKey(dataPasien.attributes, 'name', 'pendidikan');
                 fieldTemp += ['<div class="grid_4">',
                     '<label c-label c-label-text="' + objPendidikan.caption + '"></label>',
                     '</div>',

                     '<div class="grid_8">',
                     '<input c-text-box type="input" required name="pendidikan" class="k-textbox" ng-model="dataPasien.model.pendidikan" />',
                     '<p ng-show="myForm.pendidikan.$error.required" class="help-block">*' + objPendidikan.messagesRequired + '</p>',
                     '</div>'
                 ].join('');

                 //field untuk Jenis Pekerjaan
                 var objPekerjaan = objectFindByKey(dataPasien.attributes, 'name', 'pekerjaan');
                 fieldTemp += ['<div class="grid_4">',
                     '<label c-label c-label-text="' + objPekerjaan.caption + '"></label>',
                     '</div>',

                     '<div class="grid_8">',
                     '<input c-text-box type="input" required name="pekerjaan" class="k-textbox" ng-model="dataPasien.model.pekerjaan" />',
                     '<p ng-show="myForm.pekerjaan.$error.required" class="help-block">*' + objPekerjaan.messagesRequired + '</p>',
                     '</div>'
                 ].join('');

                 //field untuk Jenis Pekerjaan
                 var objAlamat = objectFindByKey(dataPasien.attributes, 'name', 'alamat');
                 fieldTemp += ['<div class="grid_4">',
                     '<label c-label c-label-text="' + objAlamat.caption + '"></label>',
                     '</div>',

                     '<div class="grid_8">',
                     '<input c-text-box type="input" required name="alamat" class="k-textbox" ng-model="dataPasien.model.alamat" />',
                     '<p ng-show="myForm.alamat.$error.required" class="help-block">*' + objAlamat.messagesRequired + '</p></form>',
                     '</div>'
                 ].join('');


                 template = fieldTemp;

                 elm.append($compile(template)(scope));
             }
         };
     });


     /*<div class="grid_4">
         <label c-label c-label-text="MR/Search"></label>
     </div>
     <div class="grid_8">
         <input style="width: 100%;" kendo-combo-box k-ng-model="item.KdTitle"
                k-data-text-field="'NamaTitle'"
                k-filter="'contains'"
                k-data-value-field="'KdTitle'"
                k-data-source="titles" />
     </div>*/

     /*
         componentDirective.directive('generateField', function ($compile) {
           return {
             restrict:'EA',
             scope: { form_generator_schema: '=data' },
             link: function (scope, elm, attrs) {
               console.log("Directive Called");
               var schema = scope.form_generator_schema.schema;
               var field_inputs = "";
               for (var field in schema){
                 var new_field = "";
                 var field_type = schema[field].data_type == "boolean" ? "checkbox" : schema[field].data_type;

                 switch (field_type){
                   case 'file':
                     new_field = "<div>" + schema[field].display_name + ":<input type='file' ng-model='" + field_type + "' id='fileToUpload' class='file-field' /></div>";
                     break;
                   case 'textInput':
                     new_field = "<div class='grid_4'>"+
                                     "<label c-label c-label-text='"+schema[field].display_name+"'></label>"+
                                 "</div>"+

                                 "<div class='grid_8'>"+
                                     "<input c-text-box type='input' filter='string' class='k-textbox' ng-model='tes' />"+
                                 "</div>"
                     break;
                   case 'comboBox':
                     new_field = "<div class='grid_4'>"+
                                     "<label c-label c-label-text='"+schema[field].display_name+"'></label>"+
                                 "</div>"+
                                 "<div class='grid_8'>"+
                                     "<input style='width: 100%;'' kendo-combo-box k-ng-model='item.KdTitle'"+
                                            "k-data-text-field='NamaTitle"+
                                            "k-filter'contains'"+
                                            "k-data-value-field='KdTitle'"+
                                            "k-data-source='titles' />"+
                                 "</div>"
                     break;
                 }

                 field_inputs = field_inputs + new_field;
               }
               elm.append($compile(field_inputs)(scope));
             }
           };
     });*/

 });

 /*
  define(['initialize'], function(initialize) {


     initialize.directive('generateFieldDirective',function(){
      return {
        restrict:'EA',
        template:'<h2>tesdulu</h2>'
      };
    });

 });

 */  