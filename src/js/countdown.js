window.onload = updateClock;

// var totalTime = localStorage.getItem("date")
// var fechaFinal = localStorage.getItem("fecha_final");
// var totalTime = localStorage.getItem("fecha_final");
// var timeNow = new Date().getTime();

function updateClock() {
    var fechaFinal = localStorage.getItem("fecha_final");
var totalTime = localStorage.getItem("fecha_final");
    if (fechaFinal) {
        var fechaToShow=fechaFinal-new Date().getTime()
        // console.log(fechaFinal)
        document.getElementById("countdown").innerHTML = `<div id="fecha">
          
        <div id="dias"> <h3>Días</h3> 
        ${Math.round(fechaToShow / (1000 * 60 * 60 * 24) - 1)}
        </div>
        <div id="minutos">
        <h3>Minutos</h3> 
        ${Math.round(fechaToShow / (1000 * 60) - 1)}
        </div>
        <div id="segundos">
        <h3>Segundos</h3> 
        ${Math.round(fechaToShow)}
        </div>
        </div>
        `;
        if (fechaFinal == 0) {
            alert("Llegaste al final de tu Hardcorse season!!");
            localStorage.clear();
        } else {
            // totalTime -= 1;
            // localStorage.setItem("fecha_final", totalTime);

            setTimeout("updateClock()", 1);
        }
    } else {
        setTimeout("updateClock()", 1000);
    }
}
