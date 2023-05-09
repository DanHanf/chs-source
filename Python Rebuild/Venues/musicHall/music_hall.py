# Imports
import requests
from bs4 import BeautifulSoup
# import numpy as np
# import regex as re
from pathlib import Path
import json

# FUNCTIONS

#  currently empty


# request html, beautiful soup results

url = "https://www.charlestonmusichall.com/shows/"
result = requests.get(url)
doc = BeautifulSoup(result.text, "html5lib")


# parsing by class type
events_block = doc.find_all(class_="tribe-events-calendar-list__event-title-link tribe-common-anchor-thin")

# class is dates
dates_block = doc.find_all(class_="tribe-events-calendar-list__event-date-tag-datetime cmh-event-dates")


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

# print lists!
# print(*names_dates_list, sep = "\n")

# write data to a JSON file
with Path("../../JSON/music_hall.json").open("w") as outfile:
    json.dump(names_dates_list, outfile)
