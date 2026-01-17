// 伤寒论条文数据 - 确保症状和病名一字不差地从条文中提取
const shanghanArticles = [
    // 太阳病篇
    {
        id: 1,
        content: "太阳之为病，脉浮，头项强痛而恶寒。（1）（Ⅰ）",
        symptoms: ["脉浮", "头项强痛", "恶寒"],
        hasPrescription: false,
        prescription: "",
        category: "太阳病",
        difficulty: 1,
        level: 1
    },
    {
        id: 2,
        content: "太阳病，发热，汗出，恶风，脉缓者，名为中风。（2）（Ⅰ）",
        symptoms: ["发热", "汗出", "恶风", "脉缓"],
        hasPrescription: false,
        prescription: "",
        category: "太阳病",
        difficulty: 1,
        level: 1
    },
    {
        id: 3,
        content: "太阳病，或已发热，或未发热，必恶寒，体痛，呕逆，脉阴阳俱紧者，名为伤寒。（3）（Ⅰ）",
        symptoms: ["恶寒", "体痛", "呕逆", "脉阴阳俱紧"],
        hasPrescription: false,
        prescription: "",
        category: "太阳病",
        difficulty: 1,
        level: 1
    },
    {
        id: 12,
        content: "太阳中风，阳浮而阴弱，阳浮者，热自发，阴弱者，汗自出，啬啬恶寒，淅淅恶风，翕翕发热，鼻鸣干呕者，桂枝汤主之。（12）（Ⅰ）",
        symptoms: ["阳浮而阴弱", "热自发", "汗自出", "啬啬恶寒", "淅淅恶风", "翕翕发热", "鼻鸣", "干呕"],
        hasPrescription: true,
        prescription: "桂枝汤",
        category: "太阳病",
        difficulty: 2,
        level: 1
    },
    {
        id: 13,
        content: "太阳病，头痛、发热、汗出、恶风，桂枝汤主之。（13）（Ⅱ）",
        symptoms: ["头痛", "发热", "汗出", "恶风"],
        hasPrescription: true,
        prescription: "桂枝汤",
        category: "太阳病",
        difficulty: 2,
        level: 2
    },
    {
        id: 31,
        content: "太阳病，项背强几几，无汗恶风，葛根汤主之。(31)（Ⅰ）",
        symptoms: ["项背强几几", "无汗", "恶风"],
        hasPrescription: true,
        prescription: "葛根汤",
        category: "太阳病",
        difficulty: 1,
        level: 1
    },
    {
        id: 32,
        content: "太阳与阳明合病者，必自下利，葛根汤主之。(32)（Ⅱ）",
        symptoms: ["太阳与阳明合病", "自下利"],
        hasPrescription: true,
        prescription: "葛根汤",
        category: "太阳病",
        difficulty: 1,
        level: 2
    },
    {
        id: 35,
        content: "太阳病，头痛发热，身疼腰痛，骨节疼痛，恶风，无汗而喘者，麻黄汤主之。(35)（Ⅰ）",
        symptoms: ["头痛", "发热", "身疼", "腰痛", "骨节疼痛", "恶风", "无汗", "喘"],
        hasPrescription: true,
        prescription: "麻黄汤",
        category: "太阳病",
        difficulty: 2,
        level: 1
    },
    {
        id: 40,
        content: "伤寒表不解，心下有水气，干呕，发热而咳，或渴，或利，或噎，或小便不利、少腹满，或喘者，小青龙汤主之。（40）（Ⅰ）",
        symptoms: ["伤寒表不解", "心下有水气", "干呕", "发热而咳", "渴", "利", "噎", "小便不利", "少腹满", "喘"],
        hasPrescription: true,
        prescription: "小青龙汤",
        category: "太阳病",
        difficulty: 3,
        level: 1
    },
    {
        id: 62,
        content: "发汗后，身疼痛，脉沉迟者，桂枝加芍药生姜各一两人参三两新加汤主之。（62）（Ⅰ）",
        symptoms: ["身疼痛", "脉沉迟"],
        hasPrescription: true,
        prescription: "桂枝加芍药生姜各一两人参三两新加汤",
        category: "太阳病",
        difficulty: 2,
        level: 1
    },
    {
        id: 63,
        content: "发汗后，不可更行桂枝汤，汗出而喘，无大热者，可与麻黄杏仁甘草石膏汤。（63）（Ⅰ）",
        symptoms: ["汗出而喘", "无大热"],
        hasPrescription: true,
        prescription: "麻黄杏仁甘草石膏汤",
        category: "太阳病",
        difficulty: 2,
        level: 1
    },
    {
        id: 64,
        content: "发汗过多，其人叉手自冒心，心下悸，欲得按者，桂枝甘草汤主之。（64）（Ⅰ）",
        symptoms: ["叉手自冒心", "心下悸", "欲得按"],
        hasPrescription: true,
        prescription: "桂枝甘草汤",
        category: "太阳病",
        difficulty: 2,
        level: 1
    },
    {
        id: 71,
        content: "太阳病，发汗后，大汗出，胃中干，烦躁不得眠，欲得饮水者，少少与饮之，令胃气和则愈；若脉浮，小便不利，微热，消渴者，五苓散主之。（71）（Ⅰ）",
        symptoms: ["脉浮", "小便不利", "微热", "消渴"],
        hasPrescription: true,
        prescription: "五苓散",
        category: "太阳病",
        difficulty: 2,
        level: 1
    },
    {
        id: 96,
        content: "伤寒五六日，中风，往来寒热，胸胁苦满，嘿嘿不欲饮食，心烦喜呕，或胸中烦而不呕，或渴，或腹中痛，或胁下痞硬，或心下悸、小便不利，或不渴、身有微热，或咳者，小柴胡汤主之。（96）（Ⅰ）",
        symptoms: ["往来寒热", "胸胁苦满", "嘿嘿不欲饮食", "心烦喜呕"],
        hasPrescription: true,
        prescription: "小柴胡汤",
        category: "太阳病",
        difficulty: 3,
        level: 1
    },
    // 阳明病篇
    {
        id: 180,
        content: "阳明之为病，胃家实是也。（180）（Ⅰ）",
        symptoms: ["胃家实"],
        hasPrescription: false,
        prescription: "",
        category: "阳明病",
        difficulty: 1,
        level: 1
    },
    {
        id: 182,
        content: "问曰：阳明病外证云何？答曰：身热，汗自出，不恶寒，反恶热也。（182）（Ⅰ）",
        symptoms: ["身热", "汗自出", "不恶寒", "反恶热"],
        hasPrescription: false,
        prescription: "",
        category: "阳明病",
        difficulty: 1,
        level: 1
    },
    {
        id: 208,
        content: "阳明病，脉迟，虽汗出不恶寒者，其身必重，短气，腹满而喘，有潮热者，此外欲解，可攻里也。手足濈然汗出者，此大便已硬也，大承气汤主之。（208）（Ⅲ）",
        symptoms: ["脉迟", "汗出不恶寒", "身重", "短气", "腹满而喘", "潮热", "手足濈然汗出", "大便已硬"],
        hasPrescription: true,
        prescription: "大承气汤",
        category: "阳明病",
        difficulty: 3,
        level: 3
    },
    {
        id: 213,
        content: "阳明病，其人多汗，以津液外出，胃中燥，大便必硬，硬则谵语，小承气汤主之。（213）（Ⅰ）",
        symptoms: ["多汗", "胃中燥", "大便必硬", "谵语"],
        hasPrescription: true,
        prescription: "小承气汤",
        category: "阳明病",
        difficulty: 2,
        level: 1
    },
    {
        id: 219,
        content: "三阳合病，腹满身重，难以转侧，口不仁，面垢，谵语遗尿。发汗则谵语，下之则额上生汗，手足逆冷。若自汗出者，白虎汤主之。（219）（Ⅲ）",
        symptoms: ["三阳合病", "腹满身重", "难以转侧", "口不仁", "面垢", "谵语", "遗尿", "自汗出"],
        hasPrescription: true,
        prescription: "白虎汤",
        category: "阳明病",
        difficulty: 3,
        level: 3
    },
    {
        id: 223,
        content: "若脉浮，发热，渴欲饮水，小便不利者，猪苓汤主之。（223）（Ⅰ）",
        symptoms: ["脉浮", "发热", "渴欲饮水", "小便不利"],
        hasPrescription: true,
        prescription: "猪苓汤",
        category: "阳明病",
        difficulty: 2,
        level: 1
    },
    {
        id: 236,
        content: "阳明病，发热汗出者，此为热越，不能发黄也。但头汗出，身无汗，剂颈而还，小便不利，渴饮水浆者，此为瘀热在里，身必发黄，茵陈蒿汤主之。（236）（Ⅰ）",
        symptoms: ["但头汗出", "身无汗", "剂颈而还", "小便不利", "渴饮水浆"],
        hasPrescription: true,
        prescription: "茵陈蒿汤",
        category: "阳明病",
        difficulty: 2,
        level: 1
    },
    // 少阳病篇
    {
        id: 263,
        content: "少阳之为病，口苦，咽干，目眩也。（263）（Ⅰ）",
        symptoms: ["口苦", "咽干", "目眩"],
        hasPrescription: false,
        prescription: "",
        category: "少阳病",
        difficulty: 1,
        level: 1
    },
    {
        id: 265,
        content: "伤寒，脉弦细，头痛发热者，属少阳。少阳不可发汗，发汗则谵语，此属胃。（265）（Ⅱ）",
        symptoms: ["脉弦细", "头痛", "发热"],
        hasPrescription: false,
        prescription: "",
        category: "少阳病",
        difficulty: 2,
        level: 2
    },
    {
        id: 266,
        content: "本太阳病不解，转入少阳者，胁下硬满，干呕不能食，往来寒热，尚未吐下，脉沉紧者，与小柴胡汤。（266）（Ⅱ）",
        symptoms: ["胁下硬满", "干呕不能食", "往来寒热", "脉沉紧"],
        hasPrescription: true,
        prescription: "小柴胡汤",
        category: "少阳病",
        difficulty: 2,
        level: 2
    },
    // 太阴病篇
    {
        id: 273,
        content: "太阴之为病，腹满而吐，食不下，自利益甚，时腹自痛。若下之，必胸下结硬。（273）（Ⅰ）",
        symptoms: ["腹满", "吐", "食不下", "自利", "时腹自痛"],
        hasPrescription: false,
        prescription: "",
        category: "太阴病",
        difficulty: 2,
        level: 1
    },
    {
        id: 277,
        content: "自利不渴者，属太阴，以其藏有寒故也，当温之，宜服四逆辈。（277）（Ⅰ）",
        symptoms: ["自利不渴", "藏有寒"],
        hasPrescription: true,
        prescription: "四逆汤",
        category: "太阴病",
        difficulty: 1,
        level: 1
    },
    {
        id: 278,
        content: "伤寒脉浮而缓，手足自温者，系在太阴。太阴当发身黄，若小便自利者，不能发黄。至七八日，虽暴烦下利日十余行，必自止，以脾家实，腐秽当去故也。（278）",
        symptoms: ["脉浮而缓", "手足自温", "暴烦下利", "脾家实"],
        hasPrescription: false,
        prescription: "",
        category: "太阴病",
        difficulty: 2,
        level: 3
    },
    // 少阴病篇
    {
        id: 281,
        content: "少阴之为病，脉微细，但欲寐也。（281）（Ⅰ）",
        symptoms: ["脉微细", "但欲寐"],
        hasPrescription: false,
        prescription: "",
        category: "少阴病",
        difficulty: 1,
        level: 1
    },
    {
        id: 301,
        content: "少阴病，始得之，反发热，脉沉者，麻黄细辛附子汤主之。（301）（Ⅰ）",
        symptoms: ["反发热", "脉沉"],
        hasPrescription: true,
        prescription: "麻黄细辛附子汤",
        category: "少阴病",
        difficulty: 2,
        level: 1
    },
    {
        id: 303,
        content: "少阴病，得之二三日以上，心中烦，不得卧，黄连阿胶汤主之。（303）（Ⅰ）",
        symptoms: ["心中烦", "不得卧"],
        hasPrescription: true,
        prescription: "黄连阿胶汤",
        category: "少阴病",
        difficulty: 2,
        level: 1
    },
    {
        id: 318,
        content: "少阴病，四逆，其人或咳，或悸，或小便不利，或腹中痛，或泄利下重者，四逆散主之。（318）（Ⅰ）",
        symptoms: ["四逆", "咳", "悸", "小便不利", "腹中痛", "泄利下重"],
        hasPrescription: true,
        prescription: "四逆散",
        category: "少阴病",
        difficulty: 2,
        level: 1
    },
    // 厥阴病篇
    {
        id: 326,
        content: "厥阴之为病，消渴，气上撞心，心中疼热，饥而不欲食，食则吐蛔，下之利不止。（326）（Ⅰ）",
        symptoms: ["消渴", "气上撞心", "心中疼热", "饥而不欲食", "食则吐蛔", "下之利不止"],
        hasPrescription: false,
        prescription: "",
        category: "厥阴病",
        difficulty: 2,
        level: 1
    },
    {
        id: 337,
        content: "凡厥者，阴阳气不相顺接，便为厥。厥者，手足逆冷者是也。（337）（Ⅰ）",
        symptoms: ["手足逆冷"],
        hasPrescription: false,
        prescription: "",
        category: "厥阴病",
        difficulty: 1,
        level: 1
    },
    {
        id: 338,
        content: "伤寒，脉微而厥，至七八日肤冷，其人躁无暂安时者，此为藏厥，非蛔厥也。蛔厥者，其人当吐蛔。蛔厥者，乌梅丸主之。（338）（Ⅰ）",
        symptoms: ["脉微而厥", "肤冷", "躁无暂安", "吐蛔"],
        hasPrescription: true,
        prescription: "乌梅丸",
        category: "厥阴病",
        difficulty: 3,
        level: 1
    },
    {
        id: 350,
        content: "伤寒脉滑而厥者，里有热，白虎汤主之。（350）（Ⅰ）",
        symptoms: ["脉滑而厥", "里有热"],
        hasPrescription: true,
        prescription: "白虎汤",
        category: "厥阴病",
        difficulty: 2,
        level: 1
    },
    {
        id: 351,
        content: "手足厥寒，脉细欲绝者，当归四逆汤主之。（351）（Ⅰ）",
        symptoms: ["手足厥寒", "脉细欲绝"],
        hasPrescription: true,
        prescription: "当归四逆汤",
        category: "厥阴病",
        difficulty: 1,
        level: 1
    },
    {
        id: 371,
        content: "热利下重者，白头翁汤主之。（371）（Ⅰ）",
        symptoms: ["热利", "下重"],
        hasPrescription: true,
        prescription: "白头翁汤",
        category: "厥阴病",
        difficulty: 1,
        level: 1
    },
    // 霍乱病篇
    {
        id: 382,
        content: "问曰：病有霍乱者何？答曰：呕吐而利，此名霍乱。（382）（Ⅱ）",
        symptoms: ["呕吐", "利"],
        hasPrescription: false,
        prescription: "",
        category: "霍乱病",
        difficulty: 1,
        level: 2
    },
    {
        id: 386,
        content: "霍乱，头痛发热，身疼痛，热多欲饮水者，五苓散主之；寒多不用水者，理中丸主之。（386）（Ⅰ）",
        symptoms: ["头痛", "发热", "身疼痛", "热多欲饮水", "寒多不用水"],
        hasPrescription: true,
        prescription: "五苓散/理中丸",
        category: "霍乱病",
        difficulty: 2,
        level: 1
    },
    {
        id: 388,
        content: "吐利汗出，发热恶寒，四肢拘急，手足厥冷者，四逆汤主之。（388）",
        symptoms: ["吐利汗出", "发热恶寒", "四肢拘急", "手足厥冷"],
        hasPrescription: true,
        prescription: "四逆汤",
        category: "霍乱病",
        difficulty: 2,
        level: 3
    },
    // 阴阳易差后劳复病篇
    {
        id: 393,
        content: "大病差后劳复者，枳实栀子豉汤主之。（393）（Ⅱ）",
        symptoms: ["大病差后", "劳复"],
        hasPrescription: true,
        prescription: "枳实栀子豉汤",
        category: "阴阳易差后劳复病",
        difficulty: 1,
        level: 2
    },
    {
        id: 394,
        content: "伤寒差以后，更发热，小柴胡汤主之。脉浮者，以汗解之，脉沉实者，以下解之。（394）（Ⅱ）",
        symptoms: ["伤寒差以后", "更发热"],
        hasPrescription: true,
        prescription: "小柴胡汤",
        category: "阴阳易差后劳复病",
        difficulty: 2,
        level: 2
    },
    {
        id: 397,
        content: "伤寒解后，虚羸少气，气逆欲吐，竹叶石膏汤主之。（397）（Ⅰ）",
        symptoms: ["虚羸少气", "气逆欲吐"],
        hasPrescription: true,
        prescription: "竹叶石膏汤",
        category: "阴阳易差后劳复病",
        difficulty: 2,
        level: 1
    },
    {
        id: 398,
        content: "病人脉已解，而日暮微烦，以病新差，人强与谷，脾胃气尚弱，不能消谷，故令微烦，损谷则愈。（398）",
        symptoms: ["日暮微烦", "病新差", "脾胃气尚弱", "不能消谷"],
        hasPrescription: false,
        prescription: "",
        category: "阴阳易差后劳复病",
        difficulty: 1,
        level: 3
    }
];

// 获取所有症状列表（用于随机生成网格）
const allSymptoms = Array.from(
    new Set(
        shanghanArticles.flatMap(article => article.symptoms)
    )
);

// 根据症状获取对应的条文
function getArticlesBySymptom(symptom) {
    return shanghanArticles.filter(article => article.symptoms.includes(symptom));
}

// 根据症状组合匹配条文
function matchArticle(symptoms, articles = shanghanArticles) {
    for (const article of articles) {
        const commonSymptoms = symptoms.filter(symptom => article.symptoms.includes(symptom));
        const totalSymptoms = article.symptoms.length;
        
        // 处理短条文（症状+病名≤3个）：点击完全即消除
        if (totalSymptoms <= 3) {
            if (commonSymptoms.length === totalSymptoms) {
                return {
                    article,
                    matchedSymptoms: commonSymptoms
                };
            }
        }
        // 处理普通条文：需要3个或以上症状匹配
        else if (commonSymptoms.length >= 3 && commonSymptoms.length >= Math.min(5, totalSymptoms)) {
            return {
                article,
                matchedSymptoms: commonSymptoms
            };
        }
    }
    return null;
}

// 获取所有条文的症状总数
function getTotalSymptoms() {
    return allSymptoms.length;
}