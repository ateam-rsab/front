@echo off
if exist .\app\WelcomeAsli.html goto :ada
echo 'Peringatan : Masih pakai interface lama'
goto :end

:ada

copy .\app\javascripts\Controllers\WelcomeCtrlAsli.js .\app\javascripts\Controllers\WelcomeCtrl.js
copy .\app\WelcomeAsli.html .\app\Welcome.html 
copy .\app\mainAsli.html .\app\main.html 
copy .\app\module\header\headerAsli.html .\app\module\header\header.html 
copy .\app\stylesheets\lama\*.* .\app\stylesheets\


del .\app\javascripts\Controllers\WelcomeCtrlAsli.js
del .\app\WelcomeAsli.html
del .\app\module\header\headerAsli.html


echo 'Informasi : Ganti ke interface lama  berhasil'
goto :end

:end
pause