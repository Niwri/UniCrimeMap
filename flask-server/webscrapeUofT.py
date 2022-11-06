from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import csv
import datetime

from tmu_webscrape import _convert_to_datetime, _convert_to_csv_elements

# EDIT THIS PATH BASED ON CHROMEDRIVER.EXE IN FLASK-SERVER
DRIVER_PATH = 'C:\\Users\\irwin\\Documents\\Programming Projects\\flask-server\\chromedriver.exe'

driver = webdriver.Chrome(executable_path=DRIVER_PATH)

current_month_class = "Text168183691__root Text168183691---typography-11-runningText Text168183691---priority-7-primary Picker3179403590__value"
category_class = "Text168183691__root Text168183691---typography-11-runningText Text168183691---priority-7-primary Event1036829578__ExpandedTitle"
incident_button_class = "buttonnext2433975401__root Focusable1365509354__root Event1090784403__buttonContainer"
date_class = "Text168183691__root Text168183691---typography-11-runningText Text168183691---priority-7-primary ExpandedTime4038329080__Time"
address_class = "buttonnext2433975401__content"
address_button_class = "buttonnext2433975401__root Focusable1365509354__root TextButton4024724401__root TextButton4024724401---priority-4-link ExpandedLocation3901782756__Location"
detail_class = "Text168183691__root Text168183691---typography-11-runningText Text168183691---priority-7-primary ExpandedSummary2311927419__Summary"
more_incident_button_class = "buttonnext2433975401__root Focusable1365509354__root Event1090784403__buttonContainer"
previous_month_button_class = "buttonnext2433975401__root Focusable1365509354__root IconButton771020510__root IconButton771020510---skin-4-line IconButton771020510---theme-4-none IconButton771020510__skin-line Picker3179403590__arrow"
incident_list_class = "Events782233432__EventsContainer Events782233432--isInPopper"
box_close_class = "buttonnext2433975401__root Focusable1365509354__root IconButton771020510__root IconButton771020510---skin-4-line IconButton771020510---theme-4-none IconButton771020510__skin-line CalendarPopover3636563415__close"
incident_box_container_class = "CalendarPopover3636563415__root CalendarPopover3636563415---arrowSide-4-left CalendarPopover3636563415--withShadow CalendarPopover3636563415--isShown Popper2437851568__Event"
calendar_box_class = "CalendarCell3081044552__innerContainer"
date_number_class = "Text168183691__root Text168183691---typography-11-runningText Text168183691---priority-7-primary CalendarCell3081044552__title"
more_incident_class = "ShowMore560806833__root"

currentYear = 2022
number_of_months_cycle = 1

lastDayNumber = 42
canContinue = True
FILENAME = "uoftcrimes.csv"

# Get Year (current_month_class)
# Get Each Incident (incident-button-class) (category-class) (date-class) (address-class) (detail-class)
# Get Each Incident that is hidden (more-incident-button-class) (incident-button-class) (category-class) (date-class) (address-class) (detail-class)
# Move to previous month (previous-month-button-class) and repeat

def get_date(date):
    dateSplit = date.replace(",", "").split()

    return dateSplit[1], int(dateSplit[2])
    


def to_previous_month(driver):
    driver.find_element(By.CSS_SELECTOR, "[class='" + previous_month_button_class + "']").click()
    time.sleep(4)
    return

def get_year(driver):
    year = driver.find_element(By.CSS_SELECTOR, "[class='" + current_month_class + "']")
    return int(year.get_attribute('innerHTML').split()[1])

def get_incident(driver, list_of_dates, list_of_categories, list_of_address, list_of_description):
    global canContinue
    global lastDayNumber
    dayList = driver.find_elements(By.CSS_SELECTOR, "[class='" + calendar_box_class + "']")
    currentDayNumber = 0
    for i in range(len(dayList)-1, -1, -1):
        currentDayNumber = int(dayList[i].find_element(By.CSS_SELECTOR, "[class='" + date_number_class + "']").find_element(By.CSS_SELECTOR, "div").get_attribute('aria-label').replace(".", ""))
        if(canContinue == False):
            if(currentDayNumber == lastDayNumber):
                canContinue = True
            continue

        
        incidentsList = dayList[i].find_elements(By.CSS_SELECTOR, "[class='" + more_incident_button_class + "']")
        
        if(len(incidentsList) == 0):
            continue
    
        incidentMore = dayList[i].find_elements(By.CSS_SELECTOR, "[class='" + more_incident_class + "']")   
        if(len(incidentMore) == 0):
            
            for i in range(len(incidentsList)-1, -1, -1):
                incidentsList[i].click()
                time.sleep(0.01)
                category = driver.find_element(By.CSS_SELECTOR, "[class='" + category_class + "']").get_attribute('innerHTML')
                address = ""
                try:
                    address = driver.find_element(By.CSS_SELECTOR, "[class='" + address_button_class + "']").find_element(By.CSS_SELECTOR, "[class='" + address_class + "']").get_attribute('innerHTML')
                except:
                    address = "No Address"
                date = driver.find_element(By.CSS_SELECTOR, "[class='" + date_class + "']").get_attribute('innerHTML')
                description = ""
                try:
                    description = driver.find_element(By.CSS_SELECTOR, "[class='" + detail_class + "']").find_element(By.CSS_SELECTOR, "div").get_attribute('innerHTML')
                except:
                    description = "No Description"
                year = currentYear
                month, day = get_date(date)

                list_of_dates.append(_convert_to_datetime(month, day, year))
                list_of_address.append(address)
                list_of_categories.append(category)
                list_of_description.append(description)

                driver.find_element(By.CSS_SELECTOR, "[class='" + box_close_class + "']").click()
                time.sleep(0.02)
        else:
            incidentMore[0].find_element(By.CSS_SELECTOR, "[class='" + more_incident_button_class + "']").click()
            time.sleep(0.02)
            incidentListBox = driver.find_elements(By.CSS_SELECTOR, "[class='" + incident_list_class + "']")
            incidentList = incidentListBox[0].find_elements(By.CSS_SELECTOR, "[class='" + incident_button_class + "']")

            for i in range(len(incidentList)-1, -1, -1):
                incidentList[i].click()
                time.sleep(0.01)
                category = driver.find_element(By.CSS_SELECTOR, "[class='" + category_class + "']").get_attribute('innerHTML')
                address = ""
                try:
                    address = driver.find_element(By.CSS_SELECTOR, "[class='" + address_button_class + "']").find_element(By.CSS_SELECTOR, "[class='" + address_class + "']").get_attribute('innerHTML')
                except:
                    address = "No Address"
                date = driver.find_element(By.CSS_SELECTOR, "[class='" + date_class + "']").get_attribute('innerHTML')
                description = ""
                try:
                    description = driver.find_element(By.CSS_SELECTOR, "[class='" + detail_class + "']").find_element(By.CSS_SELECTOR, "div").get_attribute('innerHTML')
                except:
                    description = "No Description"
                year = currentYear
                month, day = get_date(date)

                list_of_dates.append(_convert_to_datetime(month, day, year))
                list_of_address.append(address)
                list_of_categories.append(category)
                list_of_description.append(description)

                driver.find_element(By.CSS_SELECTOR, "[class='" + incident_box_container_class + "']").find_element(By.CSS_SELECTOR, "[class='" + box_close_class + "']").click()
                time.sleep(0.02)
            driver.find_element(By.CSS_SELECTOR, "[class='" + box_close_class + "']").click()
            time.sleep(0.02)
    lastDayNumber = currentDayNumber   
    canContinue = False 

def write_to_csv(date: datetime, address: str, category: str, description: str) -> None:
    """Transforms all information from data to a csv file
    """
    with open(FILENAME, 'a', encoding='UTF8', newline='') as f:
        writer = csv.writer(f)
        row = _convert_to_csv_elements(date, address, category, description)

        writer.writerow(row)

def reset_csv():
    """Reset the CSV with just the header
    """
    with open('uoftcrimes.csv', 'w') as f:

        writer = csv.DictWriter(f, fieldnames=["year", "month", "day", "address", "category", "description"])
        writer.writeheader()
        

def uoft_webscrapper():

    driver.get('https://www.campussafety.utoronto.ca/activity-reports')
    global currentYear
    # Waits for calendar to load
    time.sleep(30)

    driver.switch_to.frame(driver.find_element(By.CLASS_NAME, "_49_rs"))
    for i in range(number_of_months_cycle):
        list_of_dates = []
        list_of_categories = []
        list_of_address = []
        list_of_description = []
        currentYear = get_year(driver)
        get_incident(driver, list_of_dates, list_of_categories, list_of_address, list_of_description)
        to_previous_month(driver)

        assert len(list_of_dates) == len(list_of_address) == len(list_of_categories) == len(list_of_description)

        for i in range(0, len(list_of_dates)):
            write_to_csv(list_of_dates[i], list_of_address[i], list_of_categories[i], list_of_description[i])
        


    driver.close()

#reset_csv()
uoft_webscrapper()



