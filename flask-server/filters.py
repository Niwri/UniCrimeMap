"""
Comments
"""
import datetime
import csv
import crime_report as c

FILENAME = 'crimes.csv'


def filter_by_date(start_year: int, start_month: int, start_day: int, end_year: int, end_month: int, end_day: int):
    """Return a list of crime objects within the specified time range (inclusive).
    """
    start_date = datetime.datetime(start_year, start_month, start_day)
    end_date = datetime.datetime(end_year, end_month, end_day)
    list_of_crimes = []

    with open(FILENAME) as f:
        reader = csv.reader(f)
        next(reader)

        for row in reader:
            check_date = datetime.datetime(int(row[0]), int(row[1]), int(row[2]))

            if start_date <= check_date <= end_date:
                address = row[3]
                category = row[4]
                description = row[5]

                crime = c.crime_report(check_date, address, category, description)
                list_of_crimes.append(crime)

    return list_of_crimes


def filter_by_address(address: str):
    """Return a list of crime objects with the corresponding address.
    """
    list_of_crimes = []

    with open(FILENAME) as f:
        reader = csv.reader(f)
        next(reader)

        for row in reader:
            check_address = row[3]

            if address == check_address:
                date = datetime.datetime(int(row[0]), int(row[1]), int(row[2]))
                category = row[4]
                description = row[5]

                crime = c.crime_report(date, check_address, category, description)
                list_of_crimes.append(crime)

    return list_of_crimes


def filter_by_category(category: str):
    """Return a list of crime objects with the corresponding address.
    """
    list_of_crimes = []

    with open(FILENAME) as f:
        reader = csv.reader(f)
        next(reader)

        for row in reader:
            check_category = row[3]

            if category == check_category:
                date = datetime.datetime(int(row[0]), int(row[1]), int(row[2]))
                address = row[3]
                description = row[5]

                crime = c.crime_report(date, address, check_category, description)
                list_of_crimes.append(crime)

    return list_of_crimes
