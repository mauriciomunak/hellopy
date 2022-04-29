from srcs.libs.Database import Database
import os
ROOT_DIR = os.path.dirname(os.path.abspath(
    __file__))  # This is your Project Root


class Program():
    id = False
    name = False
    day = False
    idgroup = False
    hour = False
    minutes = False
    message = False

    def __init__(self) -> None:
        db = Database('{}/db/database.db'.format(ROOT_DIR))
        db.exec("CREATE TABLE IF NOT EXISTS hp_programs(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, day INTEGER, idgroup TEXT, hour INTEGER, minutes INTEGER, message TEXT)")

    def save(self):
        if int(self.countByHourMinuteAndDay()) < 1:
            db = Database('{}/db/database.db'.format(ROOT_DIR))
            query = "INSERT INTO hp_programs (`name`, `day`, `idgroup`, `hour`, `minutes`, `message`) VALUES ('{}', {}, '{}', {}, {}, '{}')".format(
                self.name, int(self.day), self.idgroup, int(self.hour), int(self.minutes), self.message)
            result = db.exec(query)
            return True if result != False else False
        else:
            return False

    def delete(self):
        db = Database('{}/db/database.db'.format(ROOT_DIR))
        query = "DELETE FROM hp_programs WHERE id = {}".format(
            int(self.id))
        result = db.exec(query)
        return True if result != False else False

    def countByHourMinuteAndDay(self):
        db = Database('{}/db/database.db'.format(ROOT_DIR))
        query = "SELECT COUNT(`id`) FROM hp_programs WHERE `day` = {} AND `hour` = {} AND `minutes` = {}".format(
            int(self.day), int(self.hour), int(self.minutes))
        return db.count(query)[0]

    def findAll(self):
        db = Database('{}/db/database.db'.format(ROOT_DIR))
        return db.select("SELECT * FROM hp_programs ORDER BY day, id")
