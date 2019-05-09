@echo off
if exist .\app\WelcomeAsli.html goto :ada
echo 'Peringatan : Masih pakai interface lama'
goto :end

:ada

copy .\app\javascripts\Controllers\WelcomeCtrlAsli.js .\app\javascripts\Controllers\WelcomeCtrl.js
copy .\app\WelcomeAsli.html .\app\Welcome.html 
copy .\app\mainAsli.html .\app\main.html 
copy .\app\module\header\headerAsli.html .\app\module\header\header.html 
copy .\app\javascripts\Services\HeaderServiceAsli.js .\app\javascripts\Services\HeaderService.js
copy .\app\javascripts\ControllerAsli.js .\app\javascripts\Controller.js
copy .\app\module\header\header_controllerAsli.js .\app\module\header\header_controller.js
copy .\app\stylesheets\lama\*.* .\app\stylesheets\


del .\app\javascripts\Controllers\WelcomeCtrlAsli.js
del .\app\WelcomeAsli.html
del .\app\module\header\headerAsli.html
del .\app\javascripts\ControllerAsli.js
del .\app\javascripts\Services\HeaderServiceAsli.js
del .\app\module\header\header_controllerAsli.js


echo 'Informasi : Ganti ke interface lama  berhasil'
goto :end

:end
pause