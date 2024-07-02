import os

# Base directory to scan for assets
base_dir = './assets/dunk-shot/images'

# Template for AssetManager class entries
asset_manager_template = '''    public static readonly {key}_IMAGE: string = AssetManager.{folder} + "{filename}";
    public static readonly {key}_KEY: string = "{key_string}";'''

# Template for LoadingScene preload entries
loading_scene_template = '        this.load.image(AssetManager.{key}_KEY, AssetManager.{filename}_IMAGE);'



# Dictionary to hold folder names and their corresponding keys
folders_to_keys = {
    'balls': 'BALLS_FOLDER',
    'baskets': 'BASKETS_FOLDER',
    'masks': 'MASKS_FOLDER',
    'shop': 'SHOP_FOLDER',
    'tutorials': 'TUTORIALS_FOLDER',
    'ui': 'UI_FOLDER',
    'wheel': 'WHEEL_FOLDER',
    'titles': 'TITLES_FOLDER'
}

# Predefined keys for already renamed files
predefined_keys = {
    '17.png': 'BASKETBALL',
    '119.png': 'GOLDEN_STAR',
    '48.png': 'INNER_RING_BASKET',
    '82.png': 'OUTER_RING_BASKET',
    '26.png': 'NET_BASKET',
    '45.png': 'TRAJECTORY',
    '188.png': 'PAUSE_BUTTON',
    '2.png': 'TOP_IMPACT',
    '1.png': 'BOTTOM_IMPACT',
    '3.png': 'MIDDLE_IMPACT',
    '10.png': 'MAIN_MENU_TITLE',
    '172.png': 'MOBILE_TITLE',
    '36.png': 'CHALENGES_BUTTON',
    '205.png': 'CUSTOMIZE_BUTTON',
    '112.png': 'RESTART_BUTTON',
    '100.png': 'RESUME_WIDE_BUTTON',
    '70.png': 'HOMEPAGE_WIDE_BUTTON',
    '185.png': 'SKIN_WIDE_BUTTON',
}


# Function to generate a valid key name from a filename
def generate_key_name(folder_name, filename):
    if filename in predefined_keys:
        return predefined_keys[filename]
    file_key = filename.upper().replace(' ', '_').replace('.PNG', '').replace('.JPG', '')
    return f'{folder_name.upper()}_{file_key}'


# Start of the AssetManager class
print('class AssetManager {')

# Iterate over directories and files
for root, dirs, files in os.walk(base_dir):
    for file in files:
        # Determine the folder name and generate the key
        folder_name = os.path.basename(root)
        if folder_name in folders_to_keys:
            folder_key = folders_to_keys[folder_name]
            key_name = generate_key_name(folder_name, file)
            # Print the AssetManager class entry
            print(asset_manager_template.format(key=key_name, folder=folder_key, filename=file, key_string=key_name.lower()))


# End of the AssetManager class
print('}\n')

# Start of the LoadingScene class
print('class LoadingScene extends Scene {')
print('    private loadingProgressComplete: boolean;\n')
print('    constructor() {')
print('        super(AssetManager.LOADING_SCENE);')
print('    }\n')
print('    public preload() : void {')

# Iterate again for LoadingScene preload calls
for root, dirs, files in os.walk(base_dir):
    for file in files:
        folder_name = os.path.basename(root)
        if folder_name in folders_to_keys:
            key_name = generate_key_name(folder_name, file)
            # Print the LoadingScene preload entry
            print(loading_scene_template.format(key=key_name, filename=key_name))

# End of the LoadingScene class
print('    }\n}')