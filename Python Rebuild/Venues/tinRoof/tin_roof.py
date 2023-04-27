# Imports
import requests
from bs4 import BeautifulSoup
from pathlib import Path
import json

# FUNCTIONS

#  currently empty


# request html, beautiful soup results

url = "https://charlestontinroof.com/#schedule"
result = requests.get(url)
doc = BeautifulSoup(result.text, "lxml")


# parsing by class type
events_block = doc.find_all(tag="ng-scope")

# class is dates
dates_block = doc.find_all(class_="tribe-events-calendar-list__event-date-tag-datetime cmh-event-dates")
print(doc.prettify())

# date list
date_time = []
for date in dates_block:
    item = date.get_text()
    date_time.append(item)
# print(date_time)


# name list
name_list = []
for title in events_block:
    item = title.get_text()
    name_list.append(item)
# print(name_list)
# print(len(name_list))

# zip lists
names_dates_list = zip(name_list, date_time)
names_dates_list = list(names_dates_list)

# print lists
print(*names_dates_list, sep="\n")

