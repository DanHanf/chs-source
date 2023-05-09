### CHS music source Charleston Music Hall

### Imports
import requests
from bs4 import BeautifulSoup
import numpy as np
import regex as re
import json
#### FUNCTIONS

### attempt to clean string of []{} characters, but not working as of 8/13/22
# def process_string(txt):
#     special_chars = '@', '"', '{', '}'
#     for char in txt:
#         new_txt = txt.replace(special_chars, " ")
#     return str(new_txt)


#### request html, beautiful soup results

url = "https://www.charlestonmusichall.com/shows/"
result = requests.get(url)
doc = BeautifulSoup(result.text, "html5lib")


##### parsing by class type!!!!!!!!
events_block = doc.find_all(class_="tribe-events-calendar-list__event-title-link tribe-common-anchor-thin")
print(events_block)


# #### convert beautiful soup result to string

# events_block_string = str(events_block)
# result = events_block_string.split(",")
# result_split = '\n'.join(result)

# #### convert each line to string
# big_string = ""
# for line in result_split:
#     line_clean = str(line)
#     big_string += line_clean
# # print(big_string)

# ### remove special characters
# quotation_marks = big_string.replace('"', ' ')
# bracket_1 = quotation_marks.replace('{', ' ')
# bracket_2 = bracket_1.replace('}', ' ')
# bracket_3 = bracket_2.replace('[', ' ')
# bracket_4 = bracket_3.replace(']', ' ')
# ugh_ookay = bracket_4.replace('(', ' ')
# ugh_okay = ugh_ookay.replace(')', ' ')
# at_sign = ugh_okay.replace('@', ' ')
# number_sign = at_sign.replace('#', ' ')
# ampersand = number_sign.replace('&', ' ')
# colon_oscopy = ampersand.replace(':', ' ')
# # print(colon_oscopy)


# ##### split string into several sublists inside mast_list
# mast_list = colon_oscopy.split('\n')
# # print(mast_list)
# # print(type(mast_list))
# # print(len(mast_list))

# new_list = list(enumerate(mast_list))
# # print(new_list)


# if 'name' in new_list:
#     return True

### remove tuples isn't working
# clean_lines = ""
# dirty_lines = ""
# for line in ampersand:
#     if type(line) != tuple:
#         clean_lines += line
# else:
#     dirty_lines += line
# print(dirty_lines)

# clean_string = ""
# for line in big_string:
#     processed_line = process_string(line)
#     clean_string += processed_line












### BeautifulSoup html request

# music_hall = requests.get("https://www.charlestonmusichall.com/shows/")
# soup = BeautifulSoup(music_hall.content, "html.parser")

# music_hall_sect = soup.find_all(type="application/ld+json")


# music_hall_list = list(music_hall_sect)

# music_hall_string = str(music_hall_list)
# music_hall_string_clean = process_string(music_hall_string)

# music_hall_string_quotes = music_hall_string_clean.replace('"', ' ')

# result = music_hall_string_quotes.split(",")
# # print('\n'.join(result))

# result_strings = []
# for list in result:
#     result_strings.append(str(list))
# result_string_line = '\n'.join(result_strings)
# #### TRY BREAKING result OBJECT DOWN FURTHER, THEN TO NEAT DICT

# # for line in result_string_line:
# #     result_string_clean = process_string(line)
# #     return result_string_clean


# result_string_to_list = result_string_line.split('\n')



# true_lists = []
# discard_lists = []
# for list in result_string_to_list:
#     if len(list) in result_string_to_list > 2:
#         discard_lists.append(list)
#     else:
#         true_lists.append(list)

# # print(true_lists)

# true_list_keys = true_lists[::2]
# true_list_values = true_lists[1::2]
# # print(true_list_keys)
# # print(true_list_values)

# true_dict = dict(zip(true_list_keys, true_list_values))
# print(true_dict)



### how to break down into key:value pairs

# for line in result_string_line:
#     line.split(",")
    


