declare namespace Music {
  /** 歌曲详情列表 */
  export interface SongDetailList {
    songs: Song[]
    privileges: Privilege[]
    code: number
  }

  export interface Song {
    name: string
    id: number
    pst: number
    t: number
    ar: Ar[]
    alia: string[]
    pop: number
    st: number
    rt?: string
    fee: number
    v: number
    crbt: any
    cf: string
    al: Al
    dt: number
    h?: H
    m?: M
    l?: L
    sq?: Sq
    hr?: Hr
    a: any
    cd: string
    no: number
    rtUrl: any
    ftype: number
    rtUrls: any[]
    djId: number
    copyright: number
    s_id: number
    mark: number
    originCoverType: number
    originSongSimpleData?: OriginSongSimpleData
    tagPicList: any
    resourceState: boolean
    version: number
    songJumpInfo: any
    entertainmentTags: any
    awardTags: any
    single: number
    noCopyrightRcmd?: NoCopyrightRcmd
    mst: number
    cp: number
    rtype: number
    rurl: any
    mv: number
    publishTime: number
    tns?: string[]
  }

  export interface Ar {
    id: number
    name: string
    tns: any[]
    alias: any[]
  }

  export interface Al {
    id: number
    name: string
    picUrl: string
    tns: any[]
    pic_str?: string
    pic: number
  }

  export interface H {
    br: number
    fid: number
    size: number
    vd: number
    sr: number
  }

  export interface M {
    br: number
    fid: number
    size: number
    vd: number
    sr: number
  }

  export interface L {
    br: number
    fid: number
    size: number
    vd: number
    sr: number
  }

  export interface Sq {
    br: number
    fid: number
    size: number
    vd: number
    sr: number
  }

  export interface Hr {
    br: number
    fid: number
    size: number
    vd: number
    sr: number
  }

  export interface OriginSongSimpleData {
    songId: number
    name: string
    artists: Artist[]
    albumMeta: AlbumMeta
  }

  export interface Artist {
    id: number
    name: string
  }

  export interface AlbumMeta {
    id: number
    name: string
  }

  export interface NoCopyrightRcmd {
    type: number
    typeDesc: string
    songId: any
    thirdPartySong: any
    expInfo: any
  }

  export interface Privilege {
    id: number
    fee: number
    payed: number
    st: number
    pl: number
    dl: number
    sp: number
    cp: number
    subp: number
    cs: boolean
    maxbr: number
    fl: number
    toast: boolean
    flag: number
    preSell: boolean
    playMaxbr: number
    downloadMaxbr: number
    maxBrLevel: string
    playMaxBrLevel: string
    downloadMaxBrLevel: string
    plLevel: string
    dlLevel: string
    flLevel: string
    rscl: any
    freeTrialPrivilege: FreeTrialPrivilege
    chargeInfoList: ChargeInfoList[]
  }

  export interface FreeTrialPrivilege {
    resConsumable: boolean
    userConsumable: boolean
    listenType: any
  }

  export interface ChargeInfoList {
    rate: number
    chargeUrl: any
    chargeMessage: any
    chargeType: number
  }

  // 歌词相关
  /** 歌词信息 */
  export interface SongLyric {
    sgc: boolean
    sfy: boolean
    qfy: boolean
    lrc: Lrc
    klyric: Klyric
    tlyric: Tlyric
    romalrc: Romalrc
    code: number
  }

  export interface Lrc {
    version: number
    lyric: string
  }

  export interface Klyric {
    version: number
    lyric: string
  }

  export interface Tlyric {
    version: number
    lyric: string
  }

  export interface Romalrc {
    version: number
    lyric: string
  }

  // 歌曲播放链接
  /** 歌曲播放链接 */
  export interface SongPlayUrl {
    data: Daum[]
    code: number
  }
  
  export interface Daum {
    id: number
    url: string
    br: number
    size: number
    md5: string
    code: number
    expi: number
    type: string
    gain: number
    peak: number
    fee: number
    uf: any
    payed: number
    flag: number
    canExtend: boolean
    freeTrialInfo: any
    level: string
    encodeType: string
    freeTrialPrivilege: FreeTrialPrivilege
    freeTimeTrialPrivilege: FreeTimeTrialPrivilege
    urlSource: number
    rightSource: number
    podcastCtrp: any
    effectTypes: any
    time: number
  }
  
  export interface FreeTrialPrivilege {
    resConsumable: boolean
    userConsumable: boolean
    listenType: any
    cannotListenReason: any
  }
  
  export interface FreeTimeTrialPrivilege {
    resConsumable: boolean
    userConsumable: boolean
    type: number
    remainTime: number
  }

  /** 喜欢的歌曲id集合 */
  export interface SongsLikeIdList {
    ids: number[]
    checkPoint: number
    code: number
  }
}

  
