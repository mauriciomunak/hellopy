/**
 * Detect news deleted buttons
 */
let detectDeleteButtons = function () {
  let deletedbuttons = document.getElementsByClassName("deletedprogram");
  console.log(deletedbuttons);
  for (const key in deletedbuttons) {
    if (Object.hasOwnProperty.call(deletedbuttons, key)) {
      const buttondel = deletedbuttons[key];
      const iddel = buttondel.getAttribute("deleteid");
      buttondel.addEventListener("click", function () {
        swal({
          icon: "info",
          title: "¿Seguro?",
          text: "Desea eliminar el programa",
          buttons: ["Cancelar", "De acuerdo"],
        }).then((rt) => {
          if (rt) {
            deleteProgram(iddel);
          } else {
            swal({
              title: "De acuerdo",
              text: "No se eliminará",
              icon: "info",
            });
          }
        });
      });
    }
  }
};

/**
 * Clean programs
 */
let cleanPrograms = function () {
  let programsPrint = document.getElementById("programsPrint");
  programsPrint.innerHTML = "";
};

/**
 * Print program
 */
let printProgram = function (program) {
  let programsPrint = document.getElementById("programsPrint");
  let days = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];
  let addHTML = `
    <div class="card my-3">
        <div class="card-header">
            ${program[1]}
        </div>
        <div class="card-body">
            <h5 class="card-title mb-3">ID del grupo o número: ${
              program[2]
            }</h5>
            <p class="card-text m-0"><strong>Mensaje:</strong> ${program[6]}</p>
            <p class="card-text m-0"><strong>Día:</strong> ${
              days[program[2] - 1]
            }</p>
            <p class="card-text m-0"><strong>Hora:</strong> ${program[4]}:${
    program[5]
  }</p>
            <button class="btn btn-danger mt-3 deletedprogram" deleteid="${
              program[0]
            }">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" class="bi bi-trash3 pb-1" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                </svg>
                Eliminar
            </button>
        </div>
    </div>
    `;
  programsPrint.innerHTML += addHTML;
  detectDeleteButtons();
};
/**
 * Get Programs
 */
let getPrograms = function () {
  swal({
    title: "Por favor espere",
    text: "Cargando programas",
    icon: "info",
    buttons: false,
    closeOnClickOutside: false,
  });
  PythonShell.run(`${urlpy}getPrograms.py`, null, function (err, results) {
    cleanPrograms();
    if (results) {
      let programs = JSON.parse(results[0]);
      for (const key in programs) {
        const program = programs[key];
        console.log(program);
        printProgram(program);
      }
      swal.close();      
    }
    if(err){
      console.error(err);
    }
  });
};

document.addEventListener("DOMContentLoaded", function () {
  getPrograms();
});
