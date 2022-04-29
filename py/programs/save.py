import pywhatkit
import sys
from srcs.Programs import Program

if len(sys.argv) >= 6:
    id_group = sys.argv[1] if len(
        sys.argv[1]) > 5 else "Kcti8ujnusV2g0ouqhQTho"
    message = sys.argv[2]
    hour = int(sys.argv[3])
    minutes = int(sys.argv[4])
    name = sys.argv[5]
    day = int(sys.argv[6])
    type = sys.argv[7]
    try:
        program = Program()
        program.idgroup = id_group
        program.message = message
        program.hour = hour
        program.minutes = minutes
        program.name = name
        program.day = day
        program.type = type
        saved = program.save()
        print(saved)
    except Exception as e:
        print("Error: {}.".format(e))
else:
    print("Por favor ingrese los datos necesarios")
