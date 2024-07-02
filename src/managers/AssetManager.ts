class AssetManager {
    // Images
    public static readonly DUNK_SHOT_IMAGE_FOLDER: string = "assets/dunk-shot/images/";
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

    // Basket images
    public static readonly GOLDEN_STAR_IMAGE: string = AssetManager.BASKETS_FOLDER + "119.png";
    public static readonly GOLDEN_STAR_KEY: string = "golden star";

    // Masks images
    public static readonly INNER_RING_BASKET_IMAGE: string = AssetManager.MASKS_FOLDER + "48.png";
    public static readonly INNER_RING_BASKET_KEY: string = "inner ring";

    public static readonly OUTER_RING_BASKET_IMAGE: string = AssetManager.MASKS_FOLDER + "82.png";
    public static readonly OUTER_RING_BASKET_KEY: string = "outer ring";

    public static readonly NET_BASKET_IMAGE: string = AssetManager.MASKS_FOLDER + "26.png";
    public static readonly NET_BASKET_KEY: string = "net";

    public static readonly TRAJECTORY_IMAGE: string = AssetManager.MASKS_FOLDER + "45.png";
    public static readonly TRAJECTORY_KEY: string = "trajectory";

    public static readonly PAUSE_BUTTON_IMAGE: string = AssetManager.MASKS_FOLDER + "188.png";
    public static readonly PAUSE_BUTTON_KEY: string = "pause button";


    public static readonly TOP_IMPACT_IMAGE: string = AssetManager.MASKS_FOLDER + "2.png";
    public static readonly TOP_IMPACT_KEY: string = "top impact";

    public static readonly BOTTOM_IMPACT_IMAGE: string = AssetManager.MASKS_FOLDER + "1.png";
    public static readonly BOTTOM_IMPACT_KEY: string = "bottom impact";

    public static readonly MIDDLE_IMPACT_IMAGE: string = AssetManager.MASKS_FOLDER + "3.png";
    public static readonly MIDDLE_IMPACT_KEY: string = "middle impact";


    // Title images
    public static readonly MAIN_MENU_TITLE_IMAGE: string = AssetManager.TITLES_FOLDER + "10.png";
    public static readonly MAIN_MENU_TITLE_KEY: string = "main menu title";

    public static readonly MOBILE_TITLE_IMAGE: string = AssetManager.TITLES_FOLDER + "172.png";
    public static readonly MOBILE_TITLE_KEY: string = "mobile title";


    // Ui images
    public static readonly BUTTON_IMAGE: string = AssetManager.UI_FOLDER + "button.png";
    public static readonly BUTTON_KEY: string = "button";

    public static readonly CHALENGES_BUTTON_IMAGE: string = AssetManager.UI_FOLDER + "36.png";
    public static readonly CHALENGES_BUTTON_KEY: string = "chalenges button";

    public static readonly CUSTOMIZE_BUTTON_IMAGE: string = AssetManager.UI_FOLDER + "205.png";
    public static readonly CUSTOMIZE_BUTTON_KEY: string = "customize button";

    public static readonly CLOSE_BUTTON_IMAGE: string = AssetManager.UI_FOLDER + "close-button.png";
    public static readonly CLOSE_BUTTON_KEY: string = "close button";
    
    public static readonly RESTART_BUTTON_IMAGE: string = AssetManager.UI_FOLDER + "112.png";
    public static readonly RESTART_BUTTON_KEY: string = "restart button";

    public static readonly RESUME_WIDE_BUTTON_IMAGE: string = AssetManager.UI_FOLDER + "100.png";
    public static readonly RESUME_WIDE_BUTTON_KEY: string = "resume wide button";

    public static readonly HOMEPAGE_WIDE_BUTTON_IMAGE: string = AssetManager.UI_FOLDER + "70.png";
    public static readonly HOMEPAGE_WIDE_BUTTON_KEY: string = "homepage wide button";

    public static readonly SKIN_WIDE_BUTTON_IMAGE: string = AssetManager.UI_FOLDER + "185.png";
    public static readonly SKIN_WIDE_BUTTON_KEY: string = "skin wide button";

    // Sounds
    public static readonly DUNK_SHOT_SOUND_FOLDER: string = "assets/dunk-shot/sounds/";


    // Scenes
    public static readonly LOADING_SCENE: string = "LoadingScene";
    public static readonly GAME_SCENE: string = "GameScene";


    public static readonly MAIN_MENU_UI_SCENE: string = "MainMenuUIScene";
    public static readonly RESTART_UI_SCENE: string = "RestartUIScene";
    public static readonly DUNK_SHOT_GAME_UI_SCENE: string = "GameUIScene";
    public static readonly PAUSE_UI_SCENE: string = "PauseUIScene";
    

    // WORLD RESOLUTION
    
    public static readonly RATIO = 9/16;
    public static readonly WORLD_WIDTH: number = 520;
    public static readonly WORLD_HEIGHT: number = AssetManager.WORLD_WIDTH / AssetManager.RATIO;



}


export default AssetManager;