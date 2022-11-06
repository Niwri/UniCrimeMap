import googlemaps
from csv import reader, writer
import csv
from datetime import datetime
from filters import default_filter

gmaps = googlemaps.Client(key='AIzaSyD3c6wzabNKGdieh53xvuM9qn_vFt2mugs')


def getGeoCode(filename):
    list_of_crimes = []

    with open(filename) as f:
        reader = csv.reader(f)
        next(reader)

        for row in reader:
            year = int(row[0])
            month = int(row[1])
            day = int(row[2])
            address = row[3]
            category = row[4]
            description = row[5]
            
            if(len(gmaps.geocode(address)) == 0):
                continue
            geocode_result = gmaps.geocode(address)[0]['geometry']['location']

            lat = geocode_result['lat']
            lng = geocode_result['lng']
            if 42 < lat < 45 and -81 < lng < -77:
                crime = [year, month, day, address, category, description, lat, lng]
                list_of_crimes.append(crime)

    with open("tmu_geocode.csv", 'w', encoding='UTF8', newline='') as f:
        writer = csv.writer(f)
        for crime in list_of_crimes:
            row = crime
            writer.writerow(row)
        

getGeoCode('tmu_crimes.csv')
