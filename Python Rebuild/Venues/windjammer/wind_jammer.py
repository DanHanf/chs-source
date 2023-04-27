# Imports
import requests
from bs4 import BeautifulSoup
from pathlib import Path
import json

# FUNCTIONS

#  currently empty


# request html, beautiful soup results

url = "https://the-windjammer.com/events/"
result = requests.get(url)
doc = BeautifulSoup(result.text, "lxml")


# parsing by class type!

# parsing by event name
events_block = doc.find_all(class_="event-arc-title")
# parsing by dates


find_day_item = doc.find_all(class_="event-arc-day")
find_month_item = doc.find_all(class_="event-arc-month")

find_day = []
for day in find_day_item:
    item = day.get_text()
    find_day.append(item)

find_month = []
for month in find_month_item:
    item = month.get_text()
    find_month.append(item)


dates_block_item = zip(find_day, find_month)
date_time = list(dates_block_item)

# print(date_time)


# parsing by detail
# details_block = doc.find_all(class_="event_arc_info")
# print(details_block)


# date list
# date_time = []
# for date in dates_block:
#     item = date.get_text(strip=True)
#     date_time.append(item)
# # print(date_time)


# name list
name_list = []
for title in events_block:
    item = title.get_text(strip=True)
    name_list.append(item)

# print(name_list)

# turn into title style
# name_list = []
# for cap in name_list_caps:
#     cap_title = str(cap.title())
#     name_list.append(cap_title)

# print(name_list)


# more details

# detail_list = []
# for sect in details_block:
#     item = sect.get_text(strip=True)
#     detail_list.append(item)


# zip lists
names_dates_list = zip(name_list, date_time)
names_dates_list = list(names_dates_list)


# names_dates_info = zip(names_dates_list, detail_list)


# print lists
# print(*names_dates_list, sep="\n")

# write data to a JSON file
with Path("../../JSON/wind_jammer.json").open("w") as outfile:
    json.dump(names_dates_list, outfile)
