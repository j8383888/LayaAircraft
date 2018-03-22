class GameObjectEnum{
    /*flag类型*/
    public static readonly TEXTURE_FLAG:string = "texture";
	public static readonly ANIMATION_FLAG:string = "animation"; 
    /*typeStr类型*/
    public static readonly BULLET:string = "bullet";
    public static readonly PANEL:string = "panel";
    public static readonly STONE:string = "stone";
    public static readonly BURST:string = "burst";
}
/*子弹类型枚举*/
const enum BULLET_KIND{
    BULLET_KIND_0,
    BULLET_KIND_1,
    BULLET_KIND_2,
    BULLET_KIND_3,
    BULLET_KIND_4,
    BULLET_KIND_5
}

/*飞机种类枚举*/
const enum PANEL_KIND{
    PANEL_KIND_0,
    PANEL_KIND_1,
    PANEL_KIND_2
}

/*陨石种类枚举*/
const enum STONE_KIND{

}

/*游戏物体状态1-100为通用状态，101开始为自定义状态*/
const enum COMMON_STATUS{
    ALIVE,
    DIE    
}

/*自定义玩MASTER机状态 枚举*/
const enum MASTER_STATUS{
    FIRE = 100
}

/*自定义ENEMY_SINGLE飞机状态 枚举*/
const enum ENEMY_SINGLE_STATUS{
    FIRE = 100
}



