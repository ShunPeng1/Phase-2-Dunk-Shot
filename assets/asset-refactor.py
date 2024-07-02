import os
import shutil
import librosa
import numpy as np

def move_and_rename_images(source_dir, target_dir):
    # Ensure target directory exists
    os.makedirs(target_dir, exist_ok=True)
    
    # Initialize a counter for renaming
    counter = 1
    
    # Supported image extensions
    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'}
    
    # Walk through all directories and files in the source directory
    for root, dirs, files in os.walk(source_dir):
        for file in files:
            if os.path.splitext(file)[1].lower() in image_extensions:
                # Construct full file path
                file_path = os.path.join(root, file)
                
                # Construct new file name and path
                new_file_name = f"{counter}{os.path.splitext(file)[1]}"
                new_file_path = os.path.join(target_dir, new_file_name)
                
                # Move and rename the file
                shutil.move(file_path, new_file_path)
                print(f"Moved and renamed {file} to {new_file_name}")
                
                # Increment the counter for the next file
                counter += 1


def move_and_rename_others(source_dir, target_dir):
    # Ensure target directory exists
    os.makedirs(target_dir, exist_ok=True)
    
    # Initialize a counter for renaming
    counter = 1
    
    # Supported image extensions
    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'}
    
    # Walk through all directories and files in the source directory
    for root, dirs, files in os.walk(source_dir):
        for file in files:
            if os.path.splitext(file)[1].lower() not in image_extensions:
                # Construct full file path
                file_path = os.path.join(root, file)
                
                # Construct new file name and path
                new_file_name = f"other_{counter}{os.path.splitext(file)[1]}"
                new_file_path = os.path.join(target_dir, new_file_name)
                
                # Move and rename the file
                shutil.move(file_path, new_file_path)
                print(f"Moved and renamed {file} to {new_file_name}")
                
                # Increment the counter for the next file
                counter += 1


def analyze_pitch(file_path):
    # Load the audio file
    y, sr = librosa.load(file_path)
    # Extract pitches and magnitudes
    pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
    # Select the predominant pitch
    predominant_pitch = np.max(pitches)
    return predominant_pitch

def sort_and_rename_files_by_pitch(source_dir, target_dir):
    # Ensure target directory exists
    os.makedirs(target_dir, exist_ok=True)
    
    # List to hold tuples of (file_path, pitch)
    files_with_pitch = []
    
    # Walk through all files in the source directory
    for file in os.listdir(source_dir):
        if file.endswith('.mp3'):
            file_path = os.path.join(source_dir, file)
            pitch = analyze_pitch(file_path)
            files_with_pitch.append((file_path, pitch))
    
    # Sort files by pitch
    files_with_pitch.sort(key=lambda x: x[1])
    
    # Rename and move the files
    for i, (file_path, _) in enumerate(files_with_pitch, start=1):
        new_file_name = f"sorted_{i}.mp3"
        new_file_path = os.path.join(target_dir, new_file_name)
        shutil.move(file_path, new_file_path)
        print(f"Moved and renamed {os.path.basename(file_path)} to {new_file_name}")


# Specify the source directory and the target directory
source_directory = './assets/images/dunk-shot-raw/'
target_directory = './assets/images/dunk-shot/'

# Call the function
#move_and_rename_images(source_directory, target_directory)
#move_and_rename_others(source_directory, target_directory)

sort_and_rename_files_by_pitch('./assets/dunk-shot/sounds/perfect/', './assets/dunk-shot/sounds/perfect/')