import pywhatkit
import sys
if len(sys.argv) >= 4:
    id_grupo = sys.argv[1] if len(sys.argv[1]) > 5 else "Kcti8ujnusV2g0ouqhQTho"
    message = sys.argv[2]
    hour = int(sys.argv[3])
    minutes = int(sys.argv[4])
    print(id_grupo)
    try:
        pywhatkit.sendwhatmsg_to_group(id_grupo, message, hour, minutes)
        print("Mensaje Enviado")
    except:
        print("Ocurrio Un Error")
else: 
    print("Por favor ingrese los datos necesarios")