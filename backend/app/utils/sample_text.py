# load sample text for processing

import os

def get_sample_text():
    script_dir = os.path.dirname(__file__)  # Get the directory of the script
    file_path = os.path.join(script_dir, 'sample_text.txt')  # Construct the full path to the file
    with open(file_path, 'r') as file:
        sample_text = file.read()
    return sample_text