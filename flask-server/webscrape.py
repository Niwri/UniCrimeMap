"""
Comments
"""

import csv
import requests
from bs4 import BeautifulSoup

FILENAME = "crimes.csv"
WEBSITE = "https://www.campussafety.utoronto.ca/activity-reports"


def webscraper() -> list:
    """
    A webscraper designed for getting information from https://www.campussafety.utoronto.ca/activity-reports
    """
    page = requests.get(WEBSITE)

    return []


def write_to_csv() -> None:
    """
    Transforms all information from data to a csv file
    """
    with open('crimes.csv', 'w', encoding='UTF8', newline='') as f:
        writer = csv.writer(f)

        writer.writerow(["year", "month", "day", "address", "category", "description"])
        for i in range(0, 2):
            writer.writerow([2022, 5, 13, "40 St. George St.", "Medical", "Something happened"])



