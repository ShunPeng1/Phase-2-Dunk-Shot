import { Scene } from "phaser";
import AssetManager from "../managers/AssetManager"

class LoadingScene extends Scene {
    private loadingProgressComplete: boolean;

    constructor() {
        super(AssetManager.LOADING_SCENE);
    }

    public preload() : void {

        // Basket
        this.load.image(AssetManager.GOLDEN_STAR_KEY, AssetManager.GOLDEN_STAR_IMAGE);
        this.load.image(AssetManager.SHIELD_1_KEY, AssetManager.SHIELD_1_IMAGE);
        this.load.image(AssetManager.SHIELD_2_KEY, AssetManager.SHIELD_2_IMAGE);
        this.load.image(AssetManager.SHIELD_3_KEY, AssetManager.SHIELD_3_IMAGE);
        this.load.image(AssetManager.SHIELD_4_KEY, AssetManager.SHIELD_4_IMAGE);

        // Masks
        this.load.image(AssetManager.INNER_RING_BASKET_KEY, AssetManager.INNER_RING_BASKET_IMAGE);
        this.load.image(AssetManager.OUTER_RING_BASKET_KEY, AssetManager.OUTER_RING_BASKET_IMAGE);
        this.load.image(AssetManager.NET_BASKET_KEY, AssetManager.NET_BASKET_IMAGE);

        this.load.image(AssetManager.BASKETBALL_KEY, AssetManager.BASKETBALL_IMAGE);
        this.load.image(AssetManager.TRAJECTORY_KEY, AssetManager.TRAJECTORY_IMAGE);

        this.load.image(AssetManager.TOP_IMPACT_KEY, AssetManager.TOP_IMPACT_IMAGE);
        this.load.image(AssetManager.BOTTOM_IMPACT_KEY, AssetManager.BOTTOM_IMPACT_IMAGE);
        this.load.image(AssetManager.MIDDLE_IMPACT_KEY, AssetManager.MIDDLE_IMPACT_IMAGE);

        // Main menu title image
        this.load.image(AssetManager.MAIN_MENU_TITLE_KEY, AssetManager.MAIN_MENU_TITLE_IMAGE);
        this.load.image(AssetManager.MOBILE_TITLE_KEY, AssetManager.MOBILE_TITLE_IMAGE);

        // UI Buttons
        this.load.image(AssetManager.CHALENGES_BUTTON_KEY, AssetManager.CHALENGES_BUTTON_IMAGE);
        this.load.image(AssetManager.CUSTOMIZE_BUTTON_KEY, AssetManager.CUSTOMIZE_BUTTON_IMAGE);
        
        this.load.image(AssetManager.RESTART_BUTTON_KEY, AssetManager.RESTART_BUTTON_IMAGE);

        this.load.image(AssetManager.PAUSE_BUTTON_KEY, AssetManager.PAUSE_BUTTON_IMAGE);
        
        
        this.load.image(AssetManager.RESUME_WIDE_BUTTON_KEY, AssetManager.RESUME_WIDE_BUTTON_IMAGE);
        this.load.image(AssetManager.HOMEPAGE_WIDE_BUTTON_KEY, AssetManager.HOMEPAGE_WIDE_BUTTON_IMAGE);
        this.load.image(AssetManager.SKIN_WIDE_BUTTON_KEY, AssetManager.SKIN_WIDE_BUTTON_IMAGE);


        this.load.image(AssetManager.BALLS_104_KEY, AssetManager.BALLS_104_IMAGE);
        this.load.image(AssetManager.BALLS_105_KEY, AssetManager.BALLS_105_IMAGE);
        this.load.image(AssetManager.BALLS_107_KEY, AssetManager.BALLS_107_IMAGE);
        this.load.image(AssetManager.BALLS_108_KEY, AssetManager.BALLS_108_IMAGE);
        this.load.image(AssetManager.BALLS_109_KEY, AssetManager.BALLS_109_IMAGE);
        this.load.image(AssetManager.BALLS_11_KEY, AssetManager.BALLS_11_IMAGE);
        this.load.image(AssetManager.BALLS_110_KEY, AssetManager.BALLS_110_IMAGE);
        this.load.image(AssetManager.BALLS_113_KEY, AssetManager.BALLS_113_IMAGE);
        this.load.image(AssetManager.BALLS_122_KEY, AssetManager.BALLS_122_IMAGE);
        this.load.image(AssetManager.BALLS_125_KEY, AssetManager.BALLS_125_IMAGE);
        this.load.image(AssetManager.BALLS_127_KEY, AssetManager.BALLS_127_IMAGE);
        this.load.image(AssetManager.BALLS_13_KEY, AssetManager.BALLS_13_IMAGE);
        this.load.image(AssetManager.BALLS_134_KEY, AssetManager.BALLS_134_IMAGE);
        this.load.image(AssetManager.BALLS_138_KEY, AssetManager.BALLS_138_IMAGE);
        this.load.image(AssetManager.BALLS_14_KEY, AssetManager.BALLS_14_IMAGE);
        this.load.image(AssetManager.BALLS_140_KEY, AssetManager.BALLS_140_IMAGE);
        this.load.image(AssetManager.BALLS_145_KEY, AssetManager.BALLS_145_IMAGE);
        this.load.image(AssetManager.BALLS_146_KEY, AssetManager.BALLS_146_IMAGE);
        this.load.image(AssetManager.BALLS_15_KEY, AssetManager.BALLS_15_IMAGE);
        this.load.image(AssetManager.BALLS_150_KEY, AssetManager.BALLS_150_IMAGE);
        this.load.image(AssetManager.BALLS_153_KEY, AssetManager.BALLS_153_IMAGE);
        this.load.image(AssetManager.BALLS_154_KEY, AssetManager.BALLS_154_IMAGE);
        this.load.image(AssetManager.BALLS_155_KEY, AssetManager.BALLS_155_IMAGE);
        this.load.image(AssetManager.BALLS_156_KEY, AssetManager.BALLS_156_IMAGE);
        this.load.image(AssetManager.BALLS_158_KEY, AssetManager.BALLS_158_IMAGE);
        this.load.image(AssetManager.BALLS_16_KEY, AssetManager.BALLS_16_IMAGE);
        this.load.image(AssetManager.BALLS_162_KEY, AssetManager.BALLS_162_IMAGE);
        this.load.image(AssetManager.BALLS_164_KEY, AssetManager.BALLS_164_IMAGE);
        this.load.image(AssetManager.BALLS_165_KEY, AssetManager.BALLS_165_IMAGE);
        this.load.image(AssetManager.BALLS_166_KEY, AssetManager.BALLS_166_IMAGE);
        this.load.image(AssetManager.BALLS_169_KEY, AssetManager.BALLS_169_IMAGE);
        this.load.image(AssetManager.BALLS_171_KEY, AssetManager.BALLS_171_IMAGE);
        this.load.image(AssetManager.BALLS_174_KEY, AssetManager.BALLS_174_IMAGE);
        this.load.image(AssetManager.BALLS_175_KEY, AssetManager.BALLS_175_IMAGE);
        this.load.image(AssetManager.BALLS_178_KEY, AssetManager.BALLS_178_IMAGE);
        this.load.image(AssetManager.BALLS_18_KEY, AssetManager.BALLS_18_IMAGE);
        this.load.image(AssetManager.BALLS_183_KEY, AssetManager.BALLS_183_IMAGE);
        this.load.image(AssetManager.BALLS_187_KEY, AssetManager.BALLS_187_IMAGE);
        this.load.image(AssetManager.BALLS_189_KEY, AssetManager.BALLS_189_IMAGE);
        this.load.image(AssetManager.BALLS_192_KEY, AssetManager.BALLS_192_IMAGE);
        this.load.image(AssetManager.BALLS_194_KEY, AssetManager.BALLS_194_IMAGE);
        this.load.image(AssetManager.BALLS_197_KEY, AssetManager.BALLS_197_IMAGE);
        this.load.image(AssetManager.BALLS_202_KEY, AssetManager.BALLS_202_IMAGE); 
        this.load.image(AssetManager.BALLS_207_KEY, AssetManager.BALLS_207_IMAGE);
        this.load.image(AssetManager.BALLS_215_KEY, AssetManager.BALLS_215_IMAGE);
        this.load.image(AssetManager.BALLS_216_KEY, AssetManager.BALLS_216_IMAGE);
        this.load.image(AssetManager.BALLS_25_KEY, AssetManager.BALLS_25_IMAGE);
        this.load.image(AssetManager.BALLS_28_KEY, AssetManager.BALLS_28_IMAGE);
        this.load.image(AssetManager.BALLS_29_KEY, AssetManager.BALLS_29_IMAGE);
        this.load.image(AssetManager.BALLS_33_KEY, AssetManager.BALLS_33_IMAGE);
        this.load.image(AssetManager.BALLS_34_KEY, AssetManager.BALLS_34_IMAGE);
        this.load.image(AssetManager.BALLS_40_KEY, AssetManager.BALLS_40_IMAGE);
        this.load.image(AssetManager.BALLS_41_KEY, AssetManager.BALLS_41_IMAGE);
        this.load.image(AssetManager.BALLS_46_KEY, AssetManager.BALLS_46_IMAGE);
        this.load.image(AssetManager.BALLS_47_KEY, AssetManager.BALLS_47_IMAGE);
        this.load.image(AssetManager.BALLS_49_KEY, AssetManager.BALLS_49_IMAGE);
        this.load.image(AssetManager.BALLS_51_KEY, AssetManager.BALLS_51_IMAGE);
        this.load.image(AssetManager.BALLS_54_KEY, AssetManager.BALLS_54_IMAGE);
        this.load.image(AssetManager.BALLS_55_KEY, AssetManager.BALLS_55_IMAGE);
        this.load.image(AssetManager.BALLS_56_KEY, AssetManager.BALLS_56_IMAGE);
        this.load.image(AssetManager.BALLS_57_KEY, AssetManager.BALLS_57_IMAGE);
        this.load.image(AssetManager.BALLS_58_KEY, AssetManager.BALLS_58_IMAGE);
        this.load.image(AssetManager.BALLS_60_KEY, AssetManager.BALLS_60_IMAGE);
        this.load.image(AssetManager.BALLS_61_KEY, AssetManager.BALLS_61_IMAGE);
        this.load.image(AssetManager.BALLS_68_KEY, AssetManager.BALLS_68_IMAGE);
        this.load.image(AssetManager.BALLS_7_KEY, AssetManager.BALLS_7_IMAGE);
        this.load.image(AssetManager.BALLS_71_KEY, AssetManager.BALLS_71_IMAGE);
        this.load.image(AssetManager.BALLS_72_KEY, AssetManager.BALLS_72_IMAGE);
        this.load.image(AssetManager.BALLS_74_KEY, AssetManager.BALLS_74_IMAGE);
        this.load.image(AssetManager.BALLS_78_KEY, AssetManager.BALLS_78_IMAGE);
        this.load.image(AssetManager.BALLS_81_KEY, AssetManager.BALLS_81_IMAGE);
        this.load.image(AssetManager.BALLS_86_KEY, AssetManager.BALLS_86_IMAGE);
        this.load.image(AssetManager.BALLS_87_KEY, AssetManager.BALLS_87_IMAGE);
        this.load.image(AssetManager.BALLS_93_KEY, AssetManager.BALLS_93_IMAGE);
        this.load.image(AssetManager.BALLS_94_KEY, AssetManager.BALLS_94_IMAGE);
        this.load.image(AssetManager.BALLS_97_KEY, AssetManager.BALLS_97_IMAGE);
        this.load.image(AssetManager.BALLS_99_KEY, AssetManager.BALLS_99_IMAGE);
        

        this.load.image(AssetManager.BASKETS_142_KEY, AssetManager.BASKETS_142_IMAGE);
        this.load.image(AssetManager.BASKETS_144_KEY, AssetManager.BASKETS_144_IMAGE);
        this.load.image(AssetManager.BASKETS_148_KEY, AssetManager.BASKETS_148_IMAGE);
        this.load.image(AssetManager.BASKETS_182_KEY, AssetManager.BASKETS_182_IMAGE);
        this.load.image(AssetManager.BASKETS_208_KEY, AssetManager.BASKETS_208_IMAGE);
        this.load.image(AssetManager.BASKETS_211_KEY, AssetManager.BASKETS_211_IMAGE);
        this.load.image(AssetManager.BASKETS_24_KEY, AssetManager.BASKETS_24_IMAGE);


        this.load.image(AssetManager.MASKS_102_KEY, AssetManager.MASKS_102_IMAGE);
        this.load.image(AssetManager.MASKS_103_KEY, AssetManager.MASKS_103_IMAGE);
        this.load.image(AssetManager.MASKS_111_KEY, AssetManager.MASKS_111_IMAGE);
        this.load.image(AssetManager.MASKS_116_KEY, AssetManager.MASKS_116_IMAGE);
        this.load.image(AssetManager.MASKS_117_KEY, AssetManager.MASKS_117_IMAGE);
        this.load.image(AssetManager.MASKS_118_KEY, AssetManager.MASKS_118_IMAGE);
        this.load.image(AssetManager.MASKS_120_KEY, AssetManager.MASKS_120_IMAGE);
        this.load.image(AssetManager.MASKS_121_KEY, AssetManager.MASKS_121_IMAGE);
        this.load.image(AssetManager.MASKS_124_KEY, AssetManager.MASKS_124_IMAGE);
        this.load.image(AssetManager.MASKS_130_KEY, AssetManager.MASKS_130_IMAGE);
        this.load.image(AssetManager.MASKS_135_KEY, AssetManager.MASKS_135_IMAGE);
        this.load.image(AssetManager.MASKS_136_KEY, AssetManager.MASKS_136_IMAGE);
        this.load.image(AssetManager.MASKS_143_KEY, AssetManager.MASKS_143_IMAGE);
        this.load.image(AssetManager.MASKS_147_KEY, AssetManager.MASKS_147_IMAGE);
        this.load.image(AssetManager.MASKS_152_KEY, AssetManager.MASKS_152_IMAGE);
        this.load.image(AssetManager.MASKS_159_KEY, AssetManager.MASKS_159_IMAGE);
        this.load.image(AssetManager.MASKS_167_KEY, AssetManager.MASKS_167_IMAGE);
        this.load.image(AssetManager.MASKS_168_KEY, AssetManager.MASKS_168_IMAGE);
        this.load.image(AssetManager.MASKS_176_KEY, AssetManager.MASKS_176_IMAGE);
        this.load.image(AssetManager.MASKS_177_KEY, AssetManager.MASKS_177_IMAGE);
        this.load.image(AssetManager.MASKS_186_KEY, AssetManager.MASKS_186_IMAGE);
        this.load.image(AssetManager.MASKS_190_KEY, AssetManager.MASKS_190_IMAGE);
        this.load.image(AssetManager.MASKS_196_KEY, AssetManager.MASKS_196_IMAGE);
        this.load.image(AssetManager.MASKS_198_KEY, AssetManager.MASKS_198_IMAGE);
        this.load.image(AssetManager.MASKS_199_KEY, AssetManager.MASKS_199_IMAGE);
        this.load.image(AssetManager.MASKS_200_KEY, AssetManager.MASKS_200_IMAGE);
        this.load.image(AssetManager.MASKS_201_KEY, AssetManager.MASKS_201_IMAGE);
        this.load.image(AssetManager.MASKS_209_KEY, AssetManager.MASKS_209_IMAGE);
        this.load.image(AssetManager.MASKS_FIRE_KEY, AssetManager.MASKS_FIRE_IMAGE);
        this.load.image(AssetManager.MASKS_210_KEY, AssetManager.MASKS_210_IMAGE);
        this.load.image(AssetManager.MASKS_212_KEY, AssetManager.MASKS_212_IMAGE);
        this.load.image(AssetManager.MASKS_220_KEY, AssetManager.MASKS_220_IMAGE);
        this.load.image(AssetManager.MASKS_222_KEY, AssetManager.MASKS_222_IMAGE);
        this.load.image(AssetManager.MASKS_23_KEY, AssetManager.MASKS_23_IMAGE);
        this.load.image(AssetManager.MASKS_27_KEY, AssetManager.MASKS_27_IMAGE);
        this.load.image(AssetManager.MASKS_37_KEY, AssetManager.MASKS_37_IMAGE);
        this.load.image(AssetManager.MASKS_BIG_SMOKE_KEY, AssetManager.MASKS_BIG_SMOKE_IMAGE);
        this.load.image(AssetManager.MASKS_TOP_WAVY_KEY, AssetManager.MASKS_TOP_WAVY_IMAGE);
        this.load.image(AssetManager.MASKS_5_KEY, AssetManager.MASKS_5_IMAGE);
        this.load.image(AssetManager.MASKS_50_KEY, AssetManager.MASKS_50_IMAGE);
        this.load.image(AssetManager.MASKS_53_KEY, AssetManager.MASKS_53_IMAGE);
        this.load.image(AssetManager.MASKS_SMALL_SMOKE_KEY, AssetManager.MASKS_SMALL_SMOKE_IMAGE);
        this.load.image(AssetManager.MASKS_6_KEY, AssetManager.MASKS_6_IMAGE);
        this.load.image(AssetManager.MASKS_LEFT_TRIANGLE_KEY, AssetManager.MASKS_LEFT_TRIANGLE_IMAGE);
        this.load.image(AssetManager.MASKS_65_KEY, AssetManager.MASKS_65_IMAGE);
        this.load.image(AssetManager.MASKS_76_KEY, AssetManager.MASKS_76_IMAGE);
        this.load.image(AssetManager.MASKS_80_KEY, AssetManager.MASKS_80_IMAGE); 
        this.load.image(AssetManager.MASKS_85_KEY, AssetManager.MASKS_85_IMAGE);
        this.load.image(AssetManager.MASKS_89_KEY, AssetManager.MASKS_89_IMAGE);
        this.load.image(AssetManager.MASKS_92_KEY, AssetManager.MASKS_92_IMAGE);
        this.load.image(AssetManager.MASKS_95_KEY, AssetManager.MASKS_95_IMAGE);
        this.load.image(AssetManager.MASKS_98_KEY, AssetManager.MASKS_98_IMAGE);
        this.load.image(AssetManager.SHOP_12_KEY, AssetManager.SHOP_12_IMAGE);
        this.load.image(AssetManager.SHOP_170_KEY, AssetManager.SHOP_170_IMAGE);
        this.load.image(AssetManager.SHOP_191_KEY, AssetManager.SHOP_191_IMAGE);
        this.load.image(AssetManager.SHOP_195_KEY, AssetManager.SHOP_195_IMAGE);
        this.load.image(AssetManager.SHOP_213_KEY, AssetManager.SHOP_213_IMAGE);
        this.load.image(AssetManager.SHOP_69_KEY, AssetManager.SHOP_69_IMAGE);


        this.load.image(AssetManager.TUTORIALS_123_KEY, AssetManager.TUTORIALS_123_IMAGE);
        this.load.image(AssetManager.TUTORIALS_129_KEY, AssetManager.TUTORIALS_129_IMAGE);
        this.load.image(AssetManager.TUTORIALS_137_KEY, AssetManager.TUTORIALS_137_IMAGE);
        this.load.image(AssetManager.TUTORIALS_149_KEY, AssetManager.TUTORIALS_149_IMAGE);
        this.load.image(AssetManager.TUTORIALS_20_KEY, AssetManager.TUTORIALS_20_IMAGE);
        this.load.image(AssetManager.TUTORIALS_204_KEY, AssetManager.TUTORIALS_204_IMAGE);
        this.load.image(AssetManager.TUTORIALS_206_KEY, AssetManager.TUTORIALS_206_IMAGE);
        this.load.image(AssetManager.TUTORIALS_43_KEY, AssetManager.TUTORIALS_43_IMAGE);
        this.load.image(AssetManager.TUTORIALS_52_KEY, AssetManager.TUTORIALS_52_IMAGE);
        this.load.image(AssetManager.TUTORIALS_64_KEY, AssetManager.TUTORIALS_64_IMAGE);
        this.load.image(AssetManager.TUTORIALS_66_KEY, AssetManager.TUTORIALS_66_IMAGE);
        this.load.image(AssetManager.TUTORIALS_79_KEY, AssetManager.TUTORIALS_79_IMAGE);


        this.load.image(AssetManager.UI_101_KEY, AssetManager.UI_101_IMAGE);
        this.load.image(AssetManager.UI_106_KEY, AssetManager.UI_106_IMAGE);
        this.load.image(AssetManager.UI_114_KEY, AssetManager.UI_114_IMAGE);
        this.load.image(AssetManager.UI_115_KEY, AssetManager.UI_115_IMAGE);
        this.load.image(AssetManager.UI_126_KEY, AssetManager.UI_126_IMAGE);
        this.load.image(AssetManager.UI_131_KEY, AssetManager.UI_131_IMAGE);
        this.load.image(AssetManager.UI_133_KEY, AssetManager.UI_133_IMAGE);
        this.load.image(AssetManager.UI_139_KEY, AssetManager.UI_139_IMAGE);
        this.load.image(AssetManager.UI_141_KEY, AssetManager.UI_141_IMAGE);
        this.load.image(AssetManager.UI_151_KEY, AssetManager.UI_151_IMAGE);
        this.load.image(AssetManager.UI_157_KEY, AssetManager.UI_157_IMAGE);
        this.load.image(AssetManager.UI_160_KEY, AssetManager.UI_160_IMAGE);
        this.load.image(AssetManager.UI_161_KEY, AssetManager.UI_161_IMAGE);
        this.load.image(AssetManager.UI_163_KEY, AssetManager.UI_163_IMAGE);
        this.load.image(AssetManager.UI_173_KEY, AssetManager.UI_173_IMAGE);
        this.load.image(AssetManager.UI_179_KEY, AssetManager.UI_179_IMAGE);
        this.load.image(AssetManager.UI_180_KEY, AssetManager.UI_180_IMAGE);
        this.load.image(AssetManager.UI_184_KEY, AssetManager.UI_184_IMAGE);   
        this.load.image(AssetManager.UI_19_KEY, AssetManager.UI_19_IMAGE);
        this.load.image(AssetManager.UI_193_KEY, AssetManager.UI_193_IMAGE);
        this.load.image(AssetManager.UI_214_KEY, AssetManager.UI_214_IMAGE);
        this.load.image(AssetManager.UI_217_KEY, AssetManager.UI_217_IMAGE);
        this.load.image(AssetManager.UI_218_KEY, AssetManager.UI_218_IMAGE);
        this.load.image(AssetManager.UI_22_KEY, AssetManager.UI_22_IMAGE);
        this.load.image(AssetManager.UI_221_KEY, AssetManager.UI_221_IMAGE);
        this.load.image(AssetManager.UI_30_KEY, AssetManager.UI_30_IMAGE);
        this.load.image(AssetManager.UI_31_KEY, AssetManager.UI_31_IMAGE);
        this.load.image(AssetManager.UI_32_KEY, AssetManager.UI_32_IMAGE); 
        this.load.image(AssetManager.UI_38_KEY, AssetManager.UI_38_IMAGE);
        this.load.image(AssetManager.UI_387_KEY, AssetManager.UI_387_IMAGE);
        this.load.image(AssetManager.UI_4_KEY, AssetManager.UI_4_IMAGE);
        this.load.image(AssetManager.UI_44_KEY, AssetManager.UI_44_IMAGE);
        this.load.image(AssetManager.UI_62_KEY, AssetManager.UI_62_IMAGE);
        this.load.image(AssetManager.UI_AD_WIDE_KEY, AssetManager.UI_AD_WIDE_IMAGE);
        this.load.image(AssetManager.UI_77_KEY, AssetManager.UI_77_IMAGE);
        this.load.image(AssetManager.UI_8_KEY, AssetManager.UI_8_IMAGE);
        this.load.image(AssetManager.UI_84_KEY, AssetManager.UI_84_IMAGE);
        this.load.image(AssetManager.UI_85_KEY, AssetManager.UI_85_IMAGE);
        this.load.image(AssetManager.UI_88_KEY, AssetManager.UI_88_IMAGE);
        this.load.image(AssetManager.UI_9_KEY, AssetManager.UI_9_IMAGE);
        this.load.image(AssetManager.UI_90_KEY, AssetManager.UI_90_IMAGE);
        this.load.image(AssetManager.UI_91_KEY, AssetManager.UI_91_IMAGE);
        this.load.image(AssetManager.UI_96_KEY, AssetManager.UI_96_IMAGE);


        this.load.image(AssetManager.WHEEL_128_KEY, AssetManager.WHEEL_128_IMAGE);
        this.load.image(AssetManager.WHEEL_132_KEY, AssetManager.WHEEL_132_IMAGE);
        this.load.image(AssetManager.WHEEL_181_KEY, AssetManager.WHEEL_181_IMAGE);
        this.load.image(AssetManager.WHEEL_203_KEY, AssetManager.WHEEL_203_IMAGE);
        this.load.image(AssetManager.WHEEL_219_KEY, AssetManager.WHEEL_219_IMAGE);
        this.load.image(AssetManager.WHEEL_35_KEY, AssetManager.WHEEL_35_IMAGE);
        this.load.image(AssetManager.WHEEL_67_KEY, AssetManager.WHEEL_67_IMAGE);
        this.load.image(AssetManager.WHEEL_73_KEY, AssetManager.WHEEL_73_IMAGE);
        this.load.image(AssetManager.WHEEL_83_KEY, AssetManager.WHEEL_83_IMAGE);
    

        // Sounds
        this.load.audio(AssetManager.SOUNDS_BOUNCE_SHOT_KEY, AssetManager.SOUNDS_BOUNCE_SHOT_SOUND);   
        this.load.audio(AssetManager.SOUNDS_BUBBLE_KEY, AssetManager.SOUNDS_BUBBLE_SOUND);
        this.load.audio(AssetManager.SOUNDS_BUMP_1_KEY, AssetManager.SOUNDS_BUMP_1_SOUND);
        this.load.audio(AssetManager.SOUNDS_BUMP_2_KEY, AssetManager.SOUNDS_BUMP_2_SOUND);
        this.load.audio(AssetManager.SOUNDS_BUMP_3_KEY, AssetManager.SOUNDS_BUMP_3_SOUND);
        this.load.audio(AssetManager.SOUNDS_BUMP_5_KEY, AssetManager.SOUNDS_BUMP_5_SOUND);
        this.load.audio(AssetManager.SOUNDS_BUMP_6_KEY, AssetManager.SOUNDS_BUMP_6_SOUND);
        this.load.audio(AssetManager.SOUNDS_CERAMIC_1_KEY, AssetManager.SOUNDS_CERAMIC_1_SOUND);       
        this.load.audio(AssetManager.SOUNDS_CLICK_1_KEY, AssetManager.SOUNDS_CLICK_1_SOUND);
        this.load.audio(AssetManager.SOUNDS_FADE_IN_1_KEY, AssetManager.SOUNDS_FADE_IN_1_SOUND);       
        this.load.audio(AssetManager.SOUNDS_FIRE_1_KEY, AssetManager.SOUNDS_FIRE_1_SOUND);
        this.load.audio(AssetManager.SOUNDS_FIRE_2_KEY, AssetManager.SOUNDS_FIRE_2_SOUND);
        this.load.audio(AssetManager.SOUNDS_FIRE_3_KEY, AssetManager.SOUNDS_FIRE_3_SOUND);
        this.load.audio(AssetManager.SOUNDS_FIRE_4_KEY, AssetManager.SOUNDS_FIRE_4_SOUND);
        this.load.audio(AssetManager.SOUNDS_FIRE_5_KEY, AssetManager.SOUNDS_FIRE_5_SOUND);
        this.load.audio(AssetManager.SOUNDS_GLASS_3_KEY, AssetManager.SOUNDS_GLASS_3_SOUND);
        this.load.audio(AssetManager.SOUNDS_GLASS_HIGH_KEY, AssetManager.SOUNDS_GLASS_HIGH_SOUND);     
        this.load.audio(AssetManager.SOUNDS_GLASS_LITE_KEY, AssetManager.SOUNDS_GLASS_LITE_SOUND);     
        this.load.audio(AssetManager.SOUNDS_HIT_KEY, AssetManager.SOUNDS_HIT_SOUND);
        this.load.audio(AssetManager.SOUNDS_NET_SHOOT_HARD_KEY, AssetManager.SOUNDS_NET_SHOOT_HARD_SOUND);
        this.load.audio(AssetManager.SOUNDS_NET_SHOOT_LITE_KEY, AssetManager.SOUNDS_NET_SHOOT_LITE_SOUND);
        this.load.audio(AssetManager.SOUNDS_NET_SHOOT_MEDIUM_KEY, AssetManager.SOUNDS_NET_SHOOT_MEDIUM_SOUND);
        this.load.audio(AssetManager.SOUNDS_NON_PERFECT_KEY, AssetManager.SOUNDS_NON_PERFECT_SOUND);   
        this.load.audio(AssetManager.SOUNDS_OTHER_15_KEY, AssetManager.SOUNDS_OTHER_15_SOUND);
        this.load.audio(AssetManager.SOUNDS_OTHER_21_KEY, AssetManager.SOUNDS_OTHER_21_SOUND);
        this.load.audio(AssetManager.SOUNDS_OTHER_26_KEY, AssetManager.SOUNDS_OTHER_26_SOUND);
        this.load.audio(AssetManager.SOUNDS_OTHER_33_KEY, AssetManager.SOUNDS_OTHER_33_SOUND);
        this.load.audio(AssetManager.SOUNDS_OTHER_35_KEY, AssetManager.SOUNDS_OTHER_35_SOUND);
        this.load.audio(AssetManager.SOUNDS_OTHER_37_KEY, AssetManager.SOUNDS_OTHER_37_SOUND);
        this.load.audio(AssetManager.SOUNDS_OTHER_38_KEY, AssetManager.SOUNDS_OTHER_38_SOUND);
        this.load.audio(AssetManager.SOUNDS_OTHER_39_KEY, AssetManager.SOUNDS_OTHER_39_SOUND);
        this.load.audio(AssetManager.SOUNDS_OTHER_40_KEY, AssetManager.SOUNDS_OTHER_40_SOUND);
        this.load.audio(AssetManager.SOUNDS_OTHER_43_KEY, AssetManager.SOUNDS_OTHER_43_SOUND);
        this.load.audio(AssetManager.SOUNDS_OTHER_44_KEY, AssetManager.SOUNDS_OTHER_44_SOUND);
        this.load.audio(AssetManager.SOUNDS_OTHER_45_KEY, AssetManager.SOUNDS_OTHER_45_SOUND);
        this.load.audio(AssetManager.SOUNDS_OTHER_47_KEY, AssetManager.SOUNDS_OTHER_47_SOUND);
        this.load.audio(AssetManager.SOUNDS_OTHER_48_KEY, AssetManager.SOUNDS_OTHER_48_SOUND);
        this.load.audio(AssetManager.SOUNDS_OTHER_56_KEY, AssetManager.SOUNDS_OTHER_56_SOUND);
        this.load.audio(AssetManager.SOUNDS_PERFECT_1_KEY, AssetManager.SOUNDS_PERFECT_1_SOUND);       
        this.load.audio(AssetManager.SOUNDS_PERFECT_10_KEY, AssetManager.SOUNDS_PERFECT_10_SOUND);     
        this.load.audio(AssetManager.SOUNDS_PERFECT_2_KEY, AssetManager.SOUNDS_PERFECT_2_SOUND);       
        this.load.audio(AssetManager.SOUNDS_PERFECT_3_KEY, AssetManager.SOUNDS_PERFECT_3_SOUND);       
        this.load.audio(AssetManager.SOUNDS_PERFECT_4_KEY, AssetManager.SOUNDS_PERFECT_4_SOUND);       
        this.load.audio(AssetManager.SOUNDS_PERFECT_5_KEY, AssetManager.SOUNDS_PERFECT_5_SOUND);       
        this.load.audio(AssetManager.SOUNDS_PERFECT_6_KEY, AssetManager.SOUNDS_PERFECT_6_SOUND);       
        this.load.audio(AssetManager.SOUNDS_PERFECT_7_KEY, AssetManager.SOUNDS_PERFECT_7_SOUND);       
        this.load.audio(AssetManager.SOUNDS_PERFECT_8_KEY, AssetManager.SOUNDS_PERFECT_8_SOUND);       
        this.load.audio(AssetManager.SOUNDS_PERFECT_9_KEY, AssetManager.SOUNDS_PERFECT_9_SOUND);       
        this.load.audio(AssetManager.SOUNDS_STAR_2_KEY, AssetManager.SOUNDS_STAR_2_SOUND);
        this.load.audio(AssetManager.SOUNDS_TIMEOUT_KEY, AssetManager.SOUNDS_TIMEOUT_SOUND);
        this.load.audio(AssetManager.SOUNDS_TRUMP_1_KEY, AssetManager.SOUNDS_TRUMP_1_SOUND);
        this.load.audio(AssetManager.SOUNDS_TRUMP_2_KEY, AssetManager.SOUNDS_TRUMP_2_SOUND);
        this.load.audio(AssetManager.SOUNDS_TRUMP_4_KEY, AssetManager.SOUNDS_TRUMP_4_SOUND);
        this.load.audio(AssetManager.SOUNDS_TRUMP_5_KEY, AssetManager.SOUNDS_TRUMP_5_SOUND);
        this.load.audio(AssetManager.SOUNDS_TRUMP_6_KEY, AssetManager.SOUNDS_TRUMP_6_SOUND);
        this.load.audio(AssetManager.SOUNDS_TRUMP_8_KEY, AssetManager.SOUNDS_TRUMP_8_SOUND);
        this.load.audio(AssetManager.SOUNDS_TRUMP_9_KEY, AssetManager.SOUNDS_TRUMP_9_SOUND);


        // levels
        this.load.tilemapTiledJSON(AssetManager.LEVELS_ACHIEVEMENT_1_KEY, AssetManager.LEVELS_ACHIEVEMENT_1);
    }
    
    // The rest of this file makes the visual loading bar work!
    public create() : void {
        // Loading bar code
        let centerX = this.cameras.main.centerX;
        let centerY = this.cameras.main.centerY;

        this.add.text(centerX, centerY - 48, "Dunk Shot", { fontFamily: 'Arial', fontSize: '32px', color: '#ffffff' })
        .setOrigin(0.5, 0.5);
    }

    public init() : void {
        // Loading bar code
        let centerX = this.cameras.main.centerX;
        let centerY = this.cameras.main.centerY;
        let barWidth = this.cameras.main.width - 24;
        let barHeight = 25;

        var progressBox = this.add.rectangle(
        centerX,
        centerY,
        barWidth,
        barHeight,
        0x000000
        );

        var progressBar = this.add
        .rectangle(
            progressBox.x - progressBox.width / 2,
            centerY,
            barWidth,
            barHeight,
            0xffffff
        )
        .setOrigin(0, 0.5)
        .setScale(0, 1);

        this.load.on("progress", (value: number | undefined) => {
            console.log(value);
            progressBar.setScale(value, 1);
        });

        this.load.on("complete", () => {
            this.nextScene();
            this.loadingProgressComplete = true;
        });
    }

    private nextScene() : void {
        this.scene.start(AssetManager.DUNK_SHOT_GAME_SCENE);
    }
}

export default LoadingScene;