import pywhatkit
import sys
from srcs.Programs import Program

idprogram = sys.argv[1]
try:
    program = Program()
    program.id = idprogram
    deleted = program.delete()
    print(deleted)
except Exception as e:
    print("Error: {}.".format(e))
