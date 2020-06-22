import Mirai from "./src";

export namespace MessageType {
  /**
   * 群的信息
   */
  interface Group {
    /**
     * 群号
     */
    id: number;
    /**
     * 群的群名称
     */
    name: string;
    /**
     * 群中，Bot的群限权
     */
    permission: string;
  }
  /**
   * 发送者信息
   */
  interface Sender {
    /**
     * QQ 号
     */
    id: number;
    [propName: string]: any;
  }

  /**
   * 
   */
  interface FriendSender extends Sender {
    /**
     * 发送者的昵称
     */
    nickname: string;
    /**
     * 发送者的备注
     */
    remark: string;
  }

  /**
   * 消息发送群的信息
   */
  interface GroupSender extends Sender {
    /**
     * 群名片
     */
    memberName: string;
    /**
     * 群权限 OWNER、ADMINISTRATOR或MEMBER
     */
    permission: string;
    group: Group;
  }

  /**
    * 消息链
    */
  interface MessageChain {
    [index: number]: SingleMessage;
  }

  /**
   * fetchMessage 获取的消息或事件
   */
  interface Message {
    type: string;
    messageChain: MessageChain;
    sender: Sender;
  }

  /**
   * 单条消息 此处命名与 mamoe/mirai-core 保持一致
   */
  interface SingleMessage {
    type: string;
  }

  interface Source extends SingleMessage {
    /**
     * 	消息的识别号，用于引用回复（Source 类型永远为 chain 的第一个元素）
     */
    id: number,
    /**
     * 时间戳
     */
    time: number;
  }

  interface Quote extends SingleMessage {
    /**
     * 	被引用回复的原消息的messageId
     */
    id: number,
    /**
     * 被引用回复的原消息所接收的群号，当为好友消息时为0
     */
    groupId?: number,
    /**
     * 被引用回复的原消息的发送者的QQ号
     */
    senderId?: number,
    /**
     * 被引用回复的原消息的接收者者的QQ号（或群号）
     */
    targetId?: number,
    /**
     * 被引用回复的原消息的消息链对象
     */
    origin?: object;
  }

  /**
   * 艾特某人
   */
  interface At extends SingleMessage {
    /**
     * 群员QQ号
     */
    target: number,
    /**
     * 	At时显示的文字，发送消息时无效，自动使用群名片
     */
    display: string;
  }

  /**
   * 艾特全体成员
   */
  interface AtAll extends SingleMessage { }

  /**
   * 原生表情
   */
  interface Face extends SingleMessage {
    /**
     * QQ表情编号，可选，优先高于name
     */
    faceId: number,
    /**
     * QQ表情拼音，可选
     */
    name: string;
  }

  /**
   * 文本
   */
  interface Plain extends SingleMessage {
    /**
     * 	文字消息
     */
    text: string;
  }

  /**
   * 图片
   */
  interface Image extends SingleMessage {
    /**
     * 图片的imageId，群图片与好友图片格式不同。不为空时将忽略url属性
     */
    imageId: string,
    /**
     * 图片的URL，发送时可作网络图片的链接；接收时为腾讯图片服务器的链接，可用于图片下载
     */
    url: string,
    /**
     * 图片的路径，发送本地图片，相对路径于plugins/MiraiAPIHTTP/images
     */
    path: string;
  }

  /**
   * 闪照
   */
  interface FlashImage extends Image { }

  /**
   * 富文本消息（譬如合并转发）
   */
  interface Xml extends SingleMessage {
    /**
     * XML文本
     */
    xml: string;
  }

  interface Json extends SingleMessage {
    /**
     * Json文本
     */
    json: string;
  }

  /**
   * 小程序
   */
  interface App extends SingleMessage {
    /**
     * 内容
     */
    content: string;
  }

  /**
   * "Poke": 戳一戳
   * "ShowLove": 比心
   * "Like": 点赞
   * "Heartbroken": 心碎
   * "SixSixSix": 666
   * "FangDaZhao": 放大招
   */
  enum Pokes { Poke, ShowLove, Like, Heartbroken, SixSixSix, FangDaZhao }

  interface Poke extends SingleMessage {
    /**
     * 	戳一戳的类型
     */
    name: Pokes;
  }
}

declare const Mirai: Mirai;
