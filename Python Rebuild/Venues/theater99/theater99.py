# Imports
import requests
from bs4 import BeautifulSoup
from pathlib import Path
import json

# FUNCTIONS

#  currently empty


# request html, beautiful soup results

url = "https://theatre99.com/schedule/"
result = requests.get(url)
doc = BeautifulSoup(result.text, "lxml")


# parsing by class type

# parsing by event name
events_block = doc.find_all(class_="ai1ec-event-title")

# parsing by dates
dates_block = doc.find_all(class_="ai1ec-event-time")

# parsing by detail
details_block = doc.find_all(class_="ai1ec-popup-excerpt")


# date list
date_time = []
for date in dates_block:
    item = date.get_text(strip=True)
    date_time.append(item)
# print(date_time)


# name list
name_list_caps = []
for title in events_block:
    item = title.get_text(strip=True)
    name_list_caps.append(item)

# turn into title style
name_list = []
for cap in name_list_caps:
    cap_title = str(cap.title())
    name_list.append(cap_title)

# print(name_list)


# more details

detail_list = []
for sect in details_block:
    item = sect.get_text(strip=True)
    detail_list.append(item)


# zip lists
names_dates_list = zip(name_list, date_time)
names_dates_list = list(names_dates_list)
names_dates_info = zip(names_dates_list, detail_list)


# print lists
# print(*names_dates_info, sep="\n")

# write data to a JSON file
with Path("../../JSON/theater99.json").open("w") as outfile:
    json.dump(names_dates_list, outfile)
