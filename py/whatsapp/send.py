import pywhatkit
import sys
import webbrowser
import pyautogui
import time
import os    

if len(sys.argv) >= 4:
    # CLose all tabs
    os.system("taskkill /im chrome.exe /f")

    # MacOS
    # chrome_path = 'open -a /Applications/Google\ Chrome.app %s'

    # Linux
    # chrome_path = '/usr/bin/google-chrome %s'

    # Windows
    chrome_path = 'C:/Program Files/Google/Chrome/Application/chrome.exe %s'
    webbrowser.get(chrome_path).open_new('https://web.whatsapp.com/')

    id_grupo = sys.argv[1] if len(sys.argv[1]) > 5 else "Kcti8ujnusV2g0ouqhQTho"
    message = sys.argv[2]
    hour = int(sys.argv[3])
    minutes = int(sys.argv[4])
    try:
        pywhatkit.sendwhatmsg_to_group(id_grupo, message, hour, minutes)
        print("Mensaje Enviado")
    except:
        print("Ocurrio Un Error")
else: 
    print("Por favor ingrese los datos necesarios")