import sqlite3

class Database():
    def __init__(self, db) -> None:
        self.createConnection(db)
        
    def createConnection(self, db):
        self.conext = sqlite3.connect(db)
        self.shot = self.conext.cursor()

    def exec(self, query):
        result = self.shot.execute(query)
        self.conext.commit()
        self.conext.close()
        return result
    
    def select(self, query):
        self.shot.execute(query)
        result = self.shot.fetchall()
        self.conext.commit()
        self.conext.close()
        return result
    def count(self, query):
        self.shot.execute(query)
        result = self.shot.fetchone()
        self.conext.commit()
        self.conext.close()
        return result
