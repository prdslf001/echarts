//定义省份名称和拼音映射的对象接口类型；

interface ProvincePinyin {
    [key: string]: string  // 这个对象可以有任意数量的属性（key）;
    //属性名（键）必须是字符串类型;  属性值必须是字符串类型
}

const name2pinyin: ProvincePinyin = {
    '安徽': 'anhui',
    '陕西': 'shanxi1',
    '澳门': 'aomen',
    '北京': 'beijing',
    '重庆': 'chongqing',
    '福建': 'fujian',
    '甘肃': 'gansu',
    '广东': 'guangdong',
    '广西': 'guangxi',
    '贵州': 'guizhou',
    '海南': 'hainan',
    '河北': 'hebei',
    '黑龙江': 'heilongjiang',
    '河南': 'henan',
    '湖北': 'hubei',
    '湖南': 'hunan',
    '江苏': 'jiangsu',
    '江西': 'jiangxi',
    '吉林': 'jilin',
    '辽宁': 'liaoning',
    '内蒙古': 'neimenggu',
    '宁夏': 'ningxia',
    '青海': 'qinghai',
    '山东': 'shandong',
    '上海': 'shanghai',
    '山西': 'shanxi',
    '四川': 'sichuan',
    '台湾': 'taiwan',
    '天津': 'tianjin',
    '香港': 'xianggang',
    '新疆': 'xinjiang',
    '西藏': 'xizang',
    '云南': 'yunnan',
    '浙江': 'zhejiang'
}

//定制返回值接口

interface ProvinceMapInfo {
    key: string,
    path: string,
}

export function getProvinceMapInfo(arg: string): ProvinceMapInfo {
    const path = `/static/map/province/${name2pinyin[arg]}.json`
    return {
        key: name2pinyin[arg],
        path: path
    }
}
