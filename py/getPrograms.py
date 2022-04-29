import pywhatkit
import sys
import json
from srcs.Programs import Program
try:
    program = Program()
    programs = program.findAll()
    print(json.dumps(programs))

except Exception as e:
    print("Error: {}.".format(e))
