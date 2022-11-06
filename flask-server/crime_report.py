"""
Author: Andrew Nguyen
Date: November 5/22
Description: A crime report object used to store crime data
"""
import datetime


class CrimeReport:
    """
    A crime_report object that stores all information related to a crime

    Instance Attributes:
        - date: the date that the crime occurred
        - address: the location that the crime occurs
        - category: the type of crime reported
        - description: the description of the crime if provided

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
