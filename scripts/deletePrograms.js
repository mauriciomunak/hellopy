/**
 *
 * Sending Program to Data Base Or Sending message directly
 *
 */
let deleteProgram = function (id) {
  swal({
    title: "Por favor espere",
    text: "Se está elimininando el programa",
    icon: "info",
    closeOnClickOutside: false,
    buttons: false,
  });
  let options = {
    mode: "text",
    args: [id],
  };
  PythonShell.run(`${urlpy}deleteProgram.py`, options, function (err, results) {
    if (err || (results.length == 1 && results != "True")) {
      swal({
        title: "Lo sentimos",
        text: `Hubo un error en la eliminación. ${results[0]}`,
        icon: "error",
        button: "De acuerdo",
      });
      console.error(err);
    } else {
      // results is an array consisting of messages collected during execution
      swal({
        title: "Listo",
        text: "Se ha eliminado correctamente",
        icon: "success",
        button: "De acuerdo",
      });
      console.log("response: ", results);
      getPrograms()
    }
  });
};