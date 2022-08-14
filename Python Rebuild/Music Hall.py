### CHS music source Charleston Music Hall


import requests
from bs4 import BeautifulSoup
import numpy as np

music_hall = requests.get("https://www.charlestonmusichall.com/shows/")
soup = BeautifulSoup(music_hall.content, "html.parser")

music_hall_sect = soup.find_all(type="application/ld+json")


music_hall_list = list(music_hall_sect)

music_hall_string = str(music_hall_list)
music_hall_string_quotes = music_hall_string.replace('"', ' ')

result = music_hall_string_quotes.split(",")
# print('\n'.join(result))

result_strings = []
for list in result:
    result_strings.append(str(list))


### attempt as a list iterator function

# def sep(list, chunk_size):
#     for item in range(0, len(list), chunk_size):
#         yield list[item:item + chunk_size]

# music_hall_split_item = sep(music_hall_list, 6)
# music_hall_split_list = list(music_hall_split_item)
# music_hall_split_dict = dict(music_hall_split_item)
# music_hall_split_string = str(music_hall_split_item)





# print(len(music_hall_split_string))

# music_hall_names = []
# for name, event in music_hall_split_dict:
#     music_hall_names.append(name, ":", event)
# print(music_hall_names)

# music_hall_items = []

# for list in music_hall_split_list:
#     music_hall_items.append(list)

# names = []
# for item in music_hall_items:
#     fresh_item = item.find('"name')
#     names.append(fresh_item)

# print(type(music_hall_split_list))



#### attempt to convert to list, to string, then into seperate lists

# music_hall_list = list(music_hall_sect)
# music_hall_string = str(music_hall_list)
# music_hall_split = music_hall_string.split(",")

# print(music_hall_split)


# print(music_hall_sect)
# event_name = []

# for event in music_hall_sect:
#     event_name.append(event)
# print(event_name)

# for event in music_hall_sect:
#     name = music_hall_sect.find_all('name')
#     event_name.append(name)
# print(event_name)



# print(music_hall_sect.text())
# music_hall_events = music_hall.find_all('script', attrs={'@type': "Event"})
# print(music_hall_events)

# print(type(music_hall_sect))

# music_hall_sect_text = music_hall_sect.text
# print(music_hall_sect_text)
