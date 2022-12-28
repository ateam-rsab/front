const updateDays=()=>{
    future = Date.parse("feb 24, 2023 01:30:00");
    now = new Date();
    diff = future - now;
    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    d = days;
    let html='';
    $('#day-timer').html(d);
    html += '<strong>'+d+'</strong><br>Hari';
    $('#timer-hari').html(html)
}
const updateHours=()=>{
    future = Date.parse("feb 24, 2023 01:30:00");
    now = new Date();
    diff = future - now;
    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    hours = Math.floor(diff / (1000 * 60 * 60));
    h = hours - days * 24;
    let html='';
    html += '<strong>'+h+'</strong><br>Jam';
    $('#timer-jam').html(html)
}
const updateMinute=(mins,hours)=>{
    future = Date.parse("feb 24, 2023 01:30:00");
    now = new Date();
    diff = future - now;
    hours = Math.floor(diff / (1000 * 60 * 60));
    mins = Math.floor(diff / (1000 * 60));
    m = mins - hours * 60;
    let html='';
    html += '<strong>'+m+'</strong><br>Menit';
    $('#timer-menit').html(html)
}
const updateSecond=()=>{
    future = Date.parse("feb 24, 2023 01:30:00");
    now = new Date();
    diff = future - now;
    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    hours = Math.floor(diff / (1000 * 60 * 60));
    mins = Math.floor(diff / (1000 * 60));
    secs = Math.floor(diff / 1000);
    s = secs - mins * 60;
    if(s===0){
        m = mins - hours * 60;
        let htmlm='';
        htmlm += '<strong>'+m+'</strong><br>Menit';
        $('#timer-menit').html(htmlm)
        if(m===0){
            h = hours - days * 24;
            let htmlh='';
            htmlh += '<strong>'+h+'</strong><br>Jam';
            $('#timer-jam').html(htmlh)
            if(h===0){
                let htmld='';
                $('#day-timer').html(days);
                htmld += '<strong>'+days+'</strong><br>Hari';
                $('#timer-hari').html(htmld)
            }
        }
    }
    let html='';
    html += '<strong>'+s+'</strong><br>Detik';
    $('#timer-detik').html(html)
}

updateDays(); updateHours(); updateMinute(null,null); updateSecond();
setInterval(() => {updateSecond()},1000);
// setInterval(() => {updateMinute()},60*1000);
// setInterval(() => {updateHours()},3600*1000);