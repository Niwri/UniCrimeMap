from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# EDIT THIS PATH BASED ON CHROMEDRIVER.EXE IN FLASK-SERVER
DRIVER_PATH = 'C:\\Users\\irwin\\Documents\\Programming Projects\\flask-server\\chromedriver.exe'

driver = webdriver.Chrome(executable_path=DRIVER_PATH)

current_month_class = "Text168183691__root Text168183691---typography-11-runningText Text168183691---priority-7-primary Picker3179403590__value"
category_class = "Text168183691__root Text168183691---typography-11-runningText Text168183691---priority-7-primary Event1036829578__ExpandedTitle"
incident_button_class = "buttonnext2433975401__root Focusable1365509354__root Event1090784403__buttonContainer"
date_class = "Text168183691__root Text168183691---typography-11-runningText Text168183691---priority-7-primary ExpandedTime4038329080__Time"
address_class = "buttonnext2433975401__content"
detail_class = "Text168183691__root Text168183691---typography-11-runningText Text168183691---priority-7-primary ExpandedSummary2311927419__Summary"
more_incident_button_class = "buttonnext2433975401__root Focusable1365509354__root Event1090784403__buttonContainer"
previous_month_button_class = "buttonnext2433975401__root Focusable1365509354__root IconButton771020510__root IconButton771020510---skin-4-line IconButton771020510---theme-4-none IconButton771020510__skin-line Picker3179403590__arrow"
incident_list_class = "Events782233432__EventsContainer Events782233432--isInPopper"

driver.get('https://www.campussafety.utoronto.ca/activity-reports')

# Waits for calendar to load
time.sleep(5)

driver.switch_to.frame(driver.find_element(By.CLASS_NAME, "_49_rs"))

# Get Year (current_month_class)
# Get Each Incident (incident-button-class) (category-class) (date-class) (address-class) (detail-class)
# Get Each Incident that is hidden (more-incident-button-class) (incident-button-class) (category-class) (date-class) (address-class) (detail-class)
# Move to previous month (previous-month-button-class) and repeat

def toPreviousMonth(driver):
    driver.find_element(By.CSS_SELECTOR, "[class='" + previous_month_button_class + "']").click()
    return

def getYear(driver):
    year = driver.find_element(By.CSS_SELECTOR, "[class='" + current_month_class + "']")
    return year.get_attribute('innerHTML').split()[0]

def getIncident(driver):
    incidentsList = driver.find_element(By.CSS_SELECTOR, "[class='" + more_incident_button_class + "']")
    for incidents in incidentsList:
        incidents.click()
        incidentListBox = driver.find_elements(By.CSS_SELECTOR, "[class='" + incident_list_class + "']")

        #If it exists
        if incidentListBox.size() != 0:
            incidentList = incidentListBox.find_elements(By.CSS_SELECTOR, "[class='" + incident_button_class + "']")

            for incident in incidentList:
                incident.click()
    return


getIncidents(driver)

