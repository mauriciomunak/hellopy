/**
 *
 * Sending Program to Data Base Or Sending message directly
 *
 */
let SendProgram = function () {
  //   Información de la programación
  let name = document.getElementById("nameprogram").value;
  let days = Array.prototype.slice
    .call(document.querySelectorAll("#daystosend option:checked"), 0)
    .map(function (v, i, a) {
      return v.value;
    });
  let idgroup = document.getElementById("idtosend").value;
  let hourcomp = document.getElementById("timehour").value;
  let hour = parseInt(hourcomp.split(":")[0]);
  let minutes = parseInt(hourcomp.split(":")[1]);
  let message = document.getElementById("messagetosend").value;

  //   Cajas de texto para control de errores
  let help_name = document.getElementById("nameprogramhelp");
  let help_days = document.getElementById("daystosendhelp");
  let help_idgroup = document.getElementById("idtosendhelp");
  let help_hour = document.getElementById("timehourhelp");
  let help_minutes = document.getElementById("timehourhelp");
  let help_message = document.getElementById("messagetosendhelp");
  let error_active = false;

  if (!name || !idgroup || !hour) {
    if (!name) {
      help_name.innerHTML = "Por favor ingrese un nombre";
      error_active = true;
    } else {
      help_name.innerHTML = "";
    }
    if (!idgroup) {
      help_idgroup.innerHTML = "Por favor llene este campo";
      error_active = true;
    } else {
      help_idgroup.innerHTML = "";
    }
    if (!hourcomp) {
      help_hour.innerHTML = "Por favor llene este campo";
      error_active = true;
    } else {
      help_hour.innerHTML = "";
    }
  } else {
    help_name.innerHTML = "";
    help_idgroup.innerHTML = "";
    help_hour.innerHTML = "";
    error_active = false;
  }

  if (!message) {
    swal({
      title: "Lo sentimos",
      text: "El mensaje no se puede enviar vacío.",
      icon: "error",
      button: "Continar",
    });
    error_active = true;
  }

  if (error_active) {
    return false;
  }
  //   Sí no se escoge día para envío se envía el mensaje directamente
  //   En caso de que se envien días se programará desde la base
  if (days.length > 0) {
    swal({
      title: "Por favor espere",
      text: "Se está programando el mensaje",
      icon: "info",
      closeOnClickOutside: false,
      buttons: false,
    });
    count = 0;
    errorsval = false;
    days.forEach((day) => {
      count++;
      let options = {
        mode: "text",
        args: [idgroup, message, hour, minutes, name, day],
      };
      PythonShell.run(`./py/saveProgram.py`, options, function (err, results) {
        if (err || (results.length == 1 && results != "True")) {
          errorsval = true;
          if (count == days.length) {
              swal({
                title: "Lo sentimos",
                text: `Hubiero errores en la programación. Por favor rectifique en el botón Programaciones`,
                icon: "error",
                button: "De acuerdo",
              });
              console.error(err);              
          }
        } else {
          // results is an array consisting of messages collected during execution
          swal({
            title: "Listo",
            text: "Se ha programado correctamente",
            icon: "success",
            button: "De acuerdo",
          });
          console.log("response: ", results);
          getPrograms();
        }
      });
    });
  } else {
    swal({
      title: "Por favor espere",
      text: "Se está enviando el mensaje",
      icon: "info",
      closeOnClickOutside: false,
      buttons: false,
    });
    let options = {
      mode: "text",
      args: [idgroup, message, hour, minutes],
    };
    PythonShell.run(`./py/sendMessages.py`, options, function (err, results) {
      if (err || results.length == 1) {
        swal({
          title: "Lo sentimos",
          text: "Hubo un error en la programación",
          icon: "error",
          button: "De acuerdo",
        });
        console.error(err);
      } else {
        // results is an array consisting of messages collected during execution
        swal({
          title: "Listo",
          text: "Se ha programado correctamente",
          icon: "success",
          button: "De acuerdo",
        });
        console.log("response: ", results);
      }
    });
  }
};

let btnSendMensaje = document.getElementById("btnSendMensaje");
btnSendMensaje.addEventListener("click", () => {
  SendProgram();
});
