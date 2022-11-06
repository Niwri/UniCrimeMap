"""
Author: Andrew Nguyen
Date: November 5/22
Description: This file scrapes all necessary information off of tmu security incidents website. Change the constant
NUM_PAGES depending on how many pages of information needed. Each page contains 10 incidents.
"""

import csv
import datetime

from selenium import webdriver
from selenium.webdriver.common.by import By
import time

FILENAME = "tmu_crimes.csv"
URL = "https://www.torontomu.ca/community-safety-security/security-incidents/list-of-security-incidents/"
NUM_PAGES = 11


def tmu_webscraper() -> None:
    """
    A webscraper designed for getting information from
    https://www.torontomu.ca/community-safety-security/security-incidents/list-of-security-incidents/
    All information is sent to write-to_csv()
    """
    reset_csv()
    driver = webdriver.Chrome()
    driver.get(URL)
    list_of_dates = []
    list_of_categories = []
    list_of_address = []

    for i in range(1, NUM_PAGES + 1):
        driver.find_element(By.CSS_SELECTOR, "a[data-page='" + str(i) + "']").click()
        time.sleep(0.5)
        titles = driver.find_elements(By.CLASS_NAME, 'title')

        for title in titles:
            category = title.text.split(sep='\n')[1]
            list_of_categories.append(category)

            date_elements = title.text.split(sep='\n')[0].split()
            date_elements[1] = date_elements[1].replace(',', '')

            date = _convert_to_datetime(
                date_elements[0],
                int(date_elements[1]),
                int(date_elements[2]))
            list_of_dates.append(date)

        addresses = driver.find_elements(By.CLASS_NAME, 'location')
        for address in addresses:
            location = address.text.split(sep=': ')[1]
            list_of_address.append(location)

    assert len(list_of_dates) == len(list_of_address) == len(list_of_categories)

    for i in range(0, len(list_of_dates)):
        write_to_csv(list_of_dates[i], list_of_address[i], list_of_categories[i])

    driver.close()


def reset_csv():
    """Reset the CSV with just the header
    """
    with open(FILENAME, 'w', encoding='UTF8', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(["year", "month", "day", "address", "category", "description"])


def write_to_csv(date: datetime, address: str, category: str, description: str = 'No Description Provided') -> None:
    """Transforms all information from data to a csv file
    """
    with open(FILENAME, 'a', encoding='UTF8', newline='') as f:
        writer = csv.writer(f)
        row = _convert_to_csv_elements(date, address, category, description)

        writer.writerow(row)


def _convert_to_datetime(month: str, day: int, year: int) -> datetime:
    """Returns a datetime object of the inputted date elements
    """
    months = {
        'January': 1,
        'February': 2,
        'March': 3,
        'April': 4,
        'May': 5,
        'June': 6,
        'July': 7,
        'August': 8,
        'September': 9,
        'October': 10,
        'November': 11,
        'December': 12
    }

    return datetime.datetime(year, months.get(month), day)


def _convert_to_csv_elements(date: datetime, address: str, category: str, description: str):
    """Returns a inputted elements into respective csv elements
    """
    year = int(date.year)
    month = int(date.month)
    day = int(date.day)

    return [year, month, day, address, category, description]
