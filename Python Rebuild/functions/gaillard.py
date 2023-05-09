# CHS music source Gaillard

# Imports
import requests
from bs4 import BeautifulSoup
import numpy as np
import regex as re
import json


def gaillard_info():

    # request html, beautiful soup results

    url = "https://gaillardcenter.org/buy-tickets/"
    result = requests.get(url)
    doc = BeautifulSoup(result.text, "lxml")

    # parsing by class type!!!!!!!!
    events_block = doc.find_all(class_="performance-item__title")
    # parsing by dates
    dates_block = doc.find_all(class_="performance-item__date")
    # parsing by detail
    #details_block = doc.find_all(class_="performance-item__details")

    # date list
    date_time = []
    for date in dates_block:
        item = date.get_text()
        date_time.append(item)

    # name list
    name_list = []
    for title in events_block:
        item = title.get_text()
        name_list.append(item)

    # ### zip lists
    names_dates_list = zip(name_list, date_time)
    names_dates_list = list(names_dates_list)

    # #### print lists!!!!
    print(*names_dates_list, sep = "\n")

