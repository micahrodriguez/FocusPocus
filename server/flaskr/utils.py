import os

'''
Utility Functions File
File Manipulation and String Manipulation
'''

# Check CSV File
def check_file(file_name):
    if '.' in file_name:
        return file_name.rsplit('.' , 1)[1].lower() == 'csv'
    return False

