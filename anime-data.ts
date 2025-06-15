type DeckItem = {
  title: string
}

type DeckData = {
  [env: string]: DeckItem[]
}

const data: DeckData = {
  "日月AB标（1.5）": [
    { title: "闪电鸟" },
    { title: "索罗亚克GX" },
    { title: "究极耐克洛兹玛GX" },
    { title: "裂空坐GX" },
    { title: "投掷猴" },
    { title: "爆肌蚊GX" },
    { title: "布鲁皇" },
    { title: "狙射树枭GX" },
    { title: "沙奈朵GX" },
    { title: "放逐行军" }
  ],
  "日月C标（2.5）": [
    { title: "闪耀鬼树" },
    { title: "三神花岩怪" },
    { title: "白喷TT" },
    { title: "皮捷TT" },
    { title: "钢TT" },
    { title: "泥偶巨人" },
    { title: "乌贼王BOX" },
    { title: "超梦TT" },
    { title: "砰头小丑" },
    { title: "三神银伴" }
  ],
  "剑盾D标（4.5）": [
    { title: "无极汰那VMAX" },
    { title: "三神苍响" },
    { title: "超超梦" },
    { title: "千面避役VMAX" },
    { title: "焚焰蚣VMAX" },
    { title: "蹭蹭脸颊" },
    { title: "破破舵轮" },
    { title: "巨碳山VMAX" },
    { title: "多龙巴鲁托" },
    { title: "彩超梦" }
  ],
  "剑盾E标（6.5）": [
    { title: "雪道鸣鸣" },
    { title: "锹农炮虫" },
    { title: "铝钢龙VMAX" },
    { title: "三神" },
    { title: "黑马VMAX" },
    { title: "汇流梦幻" },
    { title: "连击熊" },
    { title: "连击鱿鱼" },
    { title: "水君白马" },
    { title: "耿鬼VMAX" }
  ],
  "剑盾F标前期（7.5）": [
    { title: "宙斯" },
    { title: "千面轴" },
    { title: "索罗BOX" },
    { title: "帕路奇亚" },
    { title: "洗翠索罗" },
    { title: "神柱王" },
    { title: "日月石" },
    { title: "叶伊布" },
    { title: "幸福蛋" },
    { title: "光辉喷" }
  ],
  "剑盾F标后期（8.5）": [
    { title: "洛奇亚" },
    { title: "放逐粘美龙" },
    { title: "宙斯鸣鸣" },
    { title: "梦幻" },
    { title: "炮虫" },
    { title: "放逐" },
    { title: "宙斯铝钢龙" },
    { title: "放逐鬼龙" },
    { title: "风妖精" },
    { title: "龙王蝎" }
  ],
  "朱紫G标环境（11.0）": [
    { title: "宙斯粘美龙" },
    { title: "宙斯鬼龙" },
    { title: "连击熊千面" },
    { title: "密勒顿" },
    { title: "梦幻" },
    { title: "古剑豹" },
    { title: "一击洛奇亚" },
    { title: "沙奈朵" },
    { title: "水龙古剑豹" },
    { title: "挡道卡比兽" }
  ]
}

export default data
