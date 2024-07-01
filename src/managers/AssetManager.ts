class AssetManager {
    // Images
    public static readonly DUNK_SHOT_IMAGE_FOLDER: string = "assets/images/dunk-shot/";
    public static readonly BALLS_FOLDER: string = AssetManager.DUNK_SHOT_IMAGE_FOLDER + "balls/";
    public static readonly BASKETS_FOLDER: string = AssetManager.DUNK_SHOT_IMAGE_FOLDER + "baskets/";
    public static readonly MASKS_FOLDER: string = AssetManager.DUNK_SHOT_IMAGE_FOLDER + "masks/";
    public static readonly SHOP_FOLDER: string = AssetManager.DUNK_SHOT_IMAGE_FOLDER + "shop/";
    public static readonly TUTORIALS_FOLDER: string = AssetManager.DUNK_SHOT_IMAGE_FOLDER + "tutorials/";
    public static readonly UI_FOLDER: string = AssetManager.DUNK_SHOT_IMAGE_FOLDER + "ui/";
    public static readonly WHEEL_FOLDER: string = AssetManager.DUNK_SHOT_IMAGE_FOLDER + "wheel/";
    public static readonly TITLES_FOLDER: string = AssetManager.DUNK_SHOT_IMAGE_FOLDER + "titles/";

    // Balls images
    public static readonly BASKETBALL_IMAGE: string = AssetManager.BALLS_FOLDER + "17.png"; 
    public static readonly BASKETBALL_KEY: string = "basketball";


    // Masks images
    public static readonly INNER_RING_BASKET_IMAGE: string = AssetManager.MASKS_FOLDER + "48.png";
    public static readonly INNER_RING_BASKET_KEY: string = "inner ring";

    public static readonly OUTER_RING_BASKET_IMAGE: string = AssetManager.MASKS_FOLDER + "82.png";
    public static readonly OUTER_RING_BASKET_KEY: string = "outer ring";

    public static readonly NET_BASKET_IMAGE: string = AssetManager.MASKS_FOLDER + "26.png";
    public static readonly NET_BASKET_KEY: string = "net";

    public static readonly TRAJECTORY_IMAGE: string = AssetManager.MASKS_FOLDER + "45.png";
    public static readonly TRAJECTORY_KEY: string = "trajectory";


    // Title images
    public static readonly MAIN_MENU_TITLE_IMAGE: string = AssetManager.TITLES_FOLDER + "10.png";
    public static readonly MAIN_MENU_TITLE_KEY: string = "main menu title";

    public static readonly MOBILE_TITLE_IMAGE: string = AssetManager.TITLES_FOLDER + "172.png";
    public static readonly MOBILE_TITLE_KEY: string = "mobile title";


    

    // Sounds
    public static readonly DUNK_SHOT_SOUND_FOLDER: string = "assets/sounds/dunk-shot/";


    // Scenes
    public static readonly LOADING_SCENE: string = "LoadingScene";
    public static readonly PLAY_SCENE: string = "PlayScene";
    public static readonly MAIN_MENU_UI_SCENE: string = "MainMenuUIScene";

    

    // WORLD RESOLUTION
    
    public static readonly RATIO = 9/16;
    public static readonly WORLD_WIDTH: number = 520;
    public static readonly WORLD_HEIGHT: number = AssetManager.WORLD_WIDTH / AssetManager.RATIO;



}


export default AssetManager;