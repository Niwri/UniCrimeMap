"""
Comment
"""
import datetime


class crime_report:
    """
    A class that stores all information related to a crime
    """
    date: datetime.datetime
    address: str
    category: str
    description: str

    def __init__(self, date: datetime, address: str, category: str, description: str):
        self.date = date
        self.address = address
        self.category = category
        self.description = description