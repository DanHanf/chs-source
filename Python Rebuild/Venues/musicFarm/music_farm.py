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

url = "https://www.musicfarm.com/shows/"
result = requests.get(url)
doc = BeautifulSoup(result.text, "lxml")


# parsing by class type
events_block = doc.find_all(class_="tribe-events-calendar-list__event-title-link tribe-common-anchor-thin")
# parsing by dates
dates_block = doc.find_all(class_="tribe-events-calendar-list__event-date-tag-daynum tribe-common-h5 tribe-common-h4--min-medium")

# parsing by detail
details_block = doc.find_all("h3")


# date list
date_time = []
for date in dates_block:
    item = date.get_text(strip=True)
    date_time.append(item)
# print(date_time)


# name list
name_list = []
for title in events_block:
    item = title.get_text(strip=True)
    name_list.append(item)
# print(name_list)
# print(len(name_list))

# zip lists
names_dates_list = zip(name_list, date_time)
names_dates_list = list(names_dates_list)

# print lists
# print(*names_dates_list, sep="\n")

# write data to a JSON file
with Path("../../JSON/music_farm.json").open("w") as outfile:
    json.dump(names_dates_list, outfile)
