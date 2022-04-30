/**
 * Run programs
 */
let runPrograms = function () {
  let current = new Date();
  let day = current.getDay() == 0 ? 7 : current.getDay();

  for (const key in programs) {
    if (Object.hasOwnProperty.call(programs, key)) {
      const program = programs[key];
      console.log(`${current.getHours()} ${current.getMinutes()}`);
      console.log(program);
      let diferenceminutes = program[5] - current.getMinutes();
      if (
        program[2] == day &&
        program[4] == current.getHours() &&
        diferenceminutes >= 0 &&
        diferenceminutes <= 2
      ) {
        let options = {
          mode: "text",
          args: [program[3], program[6], program[4], program[5]],
        };
        PythonShell.run(
          `${env.urlpy}/whatsapp/send.py`,
          options,
          function (err, results) {
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
          }
        );
      }
    }
  }
};

/**
 * Cron Programs
 */
let cronPrograms = function () {
  setInterval(
    function () {
      runPrograms();
    },
    env.crontime ? env.crontime * 60000 : 60000
  );
};
