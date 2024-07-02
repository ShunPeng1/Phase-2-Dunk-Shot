import os

# Base directories to scan for assets
image_dir = './assets/dunk-shot/images'
sound_dir = './assets/dunk-shot/sounds'

# Template for AssetManager class entries to include key string for images and sounds
asset_manager_template = {
    'image': '''    public static readonly {key}_IMAGE: string = AssetManager.{folder} + "{filename}";
    public static readonly {key}_KEY: string = "{key_string}";''',
    'sound': '''    public static readonly {key}_SOUND: string = AssetManager.{folder} + "{filename}";
    public static readonly {key}_KEY: string = "{key_string}";'''
}

# Template for LoadingScene preload entries for images and sounds
loading_scene_template = {
    'image': '        this.load.image(AssetManager.{key}_KEY, AssetManager.{filename}_IMAGE);',
    'sound': '        this.load.audio(AssetManager.{key}_KEY, AssetManager.{filename}_SOUND);'
}



# Dictionary to hold folder names and their corresponding keys
folders_to_keys = {
    'balls': 'BALLS_FOLDER',
    'baskets': 'BASKETS_FOLDER',
    'masks': 'MASKS_FOLDER',
    'shop': 'SHOP_FOLDER',
    'tutorials': 'TUTORIALS_FOLDER',
    'ui': 'UI_FOLDER',
    'wheel': 'WHEEL_FOLDER',
    'titles': 'TITLES_FOLDER',
    'sounds': 'SOUNDS_FOLDER'
}

# Predefined keys for already renamed files
predefined_keys = {
    
}


# Function to determine asset type based on file extension
def get_asset_type(filename):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        return 'image'
    elif filename.lower().endswith('.mp3'):
        return 'sound'
    return None

# Function to generate a valid key name from a filename
def generate_key_name(folder_name, filename):
    if filename in predefined_keys:
        return predefined_keys[filename]
    file_key = filename.upper().replace(' ', '_').replace('.PNG', '').replace('.JPG', '').replace('.JPEG', '').replace('.MP3', '').replace('.WAV', '')
    return f'{folder_name.upper()}_{file_key}'


# Function to process a directory of assets
def process_assets(directory, asset_type):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if get_asset_type(file) == asset_type:
                folder_name = os.path.basename(root)
                if folder_name in folders_to_keys:
                    folder_key = folders_to_keys[folder_name]
                    key_name = generate_key_name(folder_name, file)
                    # Print the AssetManager class entry with key string
                    print(asset_manager_template[asset_type].format(key=key_name, folder=folder_key, filename=file, key_string=key_name.lower()))

# Process image assets
def process_loading_scene(directory, asset_type):
# Iterate again for LoadingScene preload calls
    for root, dirs, files in os.walk(directory):
        for file in files:
            if get_asset_type(file) == asset_type:

                folder_name = os.path.basename(root)
                if folder_name in folders_to_keys:
                    key_name = generate_key_name(folder_name, file)
                    # Print the LoadingScene preload entry
                    print(loading_scene_template[asset_type].format(key=key_name, filename=key_name))


# Start of the AssetManager class
print('class AssetManager {')

# Process image assets
#process_assets(image_dir, 'image')
# Process sound assets
process_assets(sound_dir, 'sound')

# End of the AssetManager class
print('}\n')

# Start of the LoadingScene class
print('class LoadingScene extends Scene {')
print('    private loadingProgressComplete: boolean;\n')
print('    constructor() {')
print('        super(AssetManager.LOADING_SCENE);')
print('    }\n')
print('    public preload() : void {')

# Process image assets
#process_loading_scene(image_dir, 'image')

# Process sound assets
process_loading_scene(sound_dir, 'sound')


# End of the LoadingScene class
print('    }\n}')