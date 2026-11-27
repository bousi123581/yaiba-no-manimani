/* 刃のまにまに v8
   キャラクター追加: 下の SWORDS 配列に同形式のオブジェクトを追加。
   会話は talk.topic の配列に話題を追加。各 topic は choices を持ちます。
*/
const SWORDS = [
  {
    id: "kashu",
    name: "加州清光",
    type: "打刀",
    personality: "気配り上手・美意識",
    art: "🌺",
    lines: {
      normal: "ちゃんと見ててよ。俺、頑張ってるんだから。",
      expedition: "よーし、綺麗に勝って帰ろう。",
      duty: "こういう地味な仕事も、嫌いじゃないよ。",
      dark: "……無理をさせるの、そろそろやめない？",
      farewell: "最後くらい、格好よく見送らせてよ。",
    },
    talk: {
      intro: "ねえ、少し時間ある？せっかくだし、話そうよ。",
      topics: [
        {
          title: "身だしなみの話",
          choices: [
            {
              text: "いつも気を配っていてすごいね",
              reply: "でしょ？褒められると、もっと磨きたくなるな。",
              aff: 5,
            },
            {
              text: "自然体でも十分だと思う",
              reply: "……そういう言い方、ちょっと照れる。ありがと。",
              aff: 7,
            },
            {
              text: "今度一緒に手入れをしよう",
              reply: "いいね！道具も準備しておくよ。",
              aff: 8,
            },
          ],
        },
        {
          title: "本丸での居場所",
          choices: [
            {
              text: "君がいてくれると安心する",
              reply: "へえ。じゃあ、今日も隣で支えてあげる。",
              aff: 8,
            },
            {
              text: "皆が安心できる場所にしたい",
              reply: "うん。そういう本丸、好きだな。",
              aff: 6,
            },
            {
              text: "まだ手探りなんだ",
              reply: "焦らなくていいよ。少しずつ綺麗に整えよ。",
              aff: 7,
            },
          ],
        },
      ],
    },
  },
  {
    id: "kasen",
    name: "歌仙兼定",
    type: "打刀",
    personality: "文雅・内番好き",
    art: "🌿",
    lines: {
      normal: "風雅を忘れずにいたいものだね。",
      expedition: "雅とは程遠い戦場だが、務めを果たそう。",
      duty: "畑にも季節の趣がある。",
      dark: "心を置き去りにするのは、風雅ではない。",
      farewell: "君の歩みが、穏やかなものとなるよう。",
    },
    talk: {
      intro: "少し言葉を交わそうか。茶も用意してある。",
      topics: [
        {
          title: "季節の趣",
          choices: [
            {
              text: "庭の花を眺めたい",
              reply: "良い選択だ。花は急かさずとも咲く。",
              aff: 7,
            },
            {
              text: "季節を日誌に残したい",
              reply: "言葉に留めるのは、確かに良い営みだね。",
              aff: 8,
            },
            {
              text: "景色より皆の様子が気になる",
              reply: "その心遣いもまた、趣の一つだろう。",
              aff: 6,
            },
          ],
        },
        {
          title: "料理の相談",
          choices: [
            {
              text: "皆の好みを聞いて献立を考える",
              reply: "手間を惜しまない姿勢、素晴らしい。",
              aff: 8,
            },
            {
              text: "簡単なものから覚えたい",
              reply: "無理なく始めるのがよい。手伝おう。",
              aff: 7,
            },
            {
              text: "今日はお任せしたい",
              reply: "承知した。君はゆっくり休むといい。",
              aff: 5,
            },
          ],
        },
      ],
    },
  },
  {
    id: "mutsuu",
    name: "陸奥守吉行",
    type: "打刀",
    personality: "陽気・開拓好き",
    art: "🌞",
    lines: {
      normal: "こりゃあ、面白うなりそうじゃ！",
      expedition: "いっちょ、腕試しといこうかのう！",
      duty: "土いじりも未来への投資ぜよ。",
      dark: "誰かを追い詰めるやり方は、古いぜよ。",
      farewell: "新しい時代を、君が切り開くんじゃ。",
    },
    talk: {
      intro: "おう！茶でも飲みながら話そうぜよ。",
      topics: [
        {
          title: "新しい本丸",
          choices: [
            {
              text: "皆の意見を聞いて改良したい",
              reply: "ええ考えじゃ！皆で作る場所じゃき。",
              aff: 8,
            },
            {
              text: "まずは自分で試してみる",
              reply: "行動力があるのう。失敗も糧になるぜよ。",
              aff: 6,
            },
            {
              text: "何から始めればいいか相談したい",
              reply: "任せちょけ！一緒に考えよう。",
              aff: 7,
            },
          ],
        },
        {
          title: "外の世界",
          choices: [
            {
              text: "遠征で見聞を広げたい",
              reply: "よし、地図を広げるぜよ！",
              aff: 7,
            },
            {
              text: "本丸の暮らしを整えたい",
              reply: "足元を固めるのも大事じゃ。",
              aff: 6,
            },
            {
              text: "皆の好きなものを知りたい",
              reply: "そりゃあ賑やかになりそうじゃ！",
              aff: 8,
            },
          ],
        },
      ],
    },
  },
  {
    id: "kunihiro",
    name: "山姥切国広",
    type: "打刀",
    personality: "真面目・努力家",
    art: "🗡️",
    lines: {
      normal: "俺でよければ、力になる。",
      expedition: "先陣は任せろ。",
      duty: "淡々とこなす。それが大事だ。",
      dark: "……無理を続けるのは、強さじゃない。",
      farewell: "俺は俺の役目を果たした。君も、君らしく。",
    },
    talk: {
      intro: "……話があるのか。聞こう。",
      topics: [
        {
          title: "自信について",
          choices: [
            {
              text: "君の努力をちゃんと見ている",
              reply: "……そうか。見ていてくれたのなら、嬉しい。",
              aff: 9,
            },
            {
              text: "比べなくてもいいと思う",
              reply: "そう言われると、少し肩の力が抜ける。",
              aff: 8,
            },
            {
              text: "一緒に練習してみない？",
              reply: "ああ。互いに励みになるだろう。",
              aff: 7,
            },
          ],
        },
        {
          title: "役目について",
          choices: [
            {
              text: "頼りにしている",
              reply: "期待に応えられるよう、努める。",
              aff: 7,
            },
            { text: "休むことも役目だよ", reply: "……覚えておこう。", aff: 8 },
            {
              text: "皆で支え合いたい",
              reply: "その方針なら、俺も賛成だ。",
              aff: 8,
            },
          ],
        },
      ],
    },
  },
  {
    id: "honey",
    name: "蜂須賀虎徹",
    type: "打刀",
    personality: "誇り高い・公平",
    art: "💠",
    lines: {
      normal: "虎徹の名に恥じぬ働きをしよう。",
      expedition: "正々堂々、勝負だ。",
      duty: "手を抜くつもりはない。",
      dark: "誇りを損なう命令には、考える時間が必要だ。",
      farewell: "君の選んだ道に、誇りがあるように。",
    },
    talk: {
      intro: "話なら聞こう。遠慮はいらない。",
      topics: [
        {
          title: "誇りと評価",
          choices: [
            {
              text: "出自よりも日々の働きを尊重する",
              reply: "……公平な考えだ。君の言葉として受け取ろう。",
              aff: 9,
            },
            {
              text: "皆の違いを大切にしたい",
              reply: "それができるなら、この本丸は良い場所になる。",
              aff: 8,
            },
            {
              text: "君自身の考えを聞かせて",
              reply: "ふむ。では少し、率直に話そう。",
              aff: 7,
            },
          ],
        },
      ],
    },
  },
  {
    id: "hasebe",
    name: "へし切長谷部",
    type: "打刀",
    personality: "忠実・責任感",
    art: "⚔️",
    lines: {
      normal: "主命とあらば、最善を尽くします。",
      expedition: "迅速に片付けましょう。",
      duty: "務めを果たします。",
      dark: "主。皆の限界を見誤らないでください。",
      farewell: "あなたが築いたものを、忘れません。",
    },
    talk: {
      intro: "主。お時間をいただけるなら、報告と相談を。",
      topics: [
        {
          title: "本丸の方針",
          choices: [
            {
              text: "皆の意見を聞いて決めよう",
              reply: "承知しました。合議の場を整えます。",
              aff: 8,
            },
            {
              text: "君の判断も聞かせて",
              reply: "……信頼いただき、恐縮です。慎重に提案します。",
              aff: 9,
            },
            {
              text: "まずは休息を優先する",
              reply: "良い判断です。休むことも務めのうちです。",
              aff: 8,
            },
          ],
        },
        {
          title: "頼ること",
          choices: [
            {
              text: "いつも助けてくれてありがとう",
              reply: "いえ……その言葉だけで、報われます。",
              aff: 10,
            },
            {
              text: "仕事を分担しよう",
              reply: "効率的です。皆の負担を確認します。",
              aff: 8,
            },
            {
              text: "困った時は相談するね",
              reply: "必ず支えになります。遠慮は不要です。",
              aff: 9,
            },
          ],
        },
      ],
    },
  },
  {
    id: "jikkyu",
    name: "実休光忠",
    type: "太刀",
    personality: "穏やか・気遣い",
    art: "🌼",
    lines: {
      normal: "穏やかな日も、大切にしたいね。",
      expedition: "静かに、確実に進もう。",
      duty: "花も野菜も、育つ時間が必要だよ。",
      dark: "心が疲れてしまう前に、休もうね。",
      farewell: "君が穏やかな日々を見つけられますように。",
    },
    talk: {
      intro: "お茶を淹れたよ。少し一緒に休もうか。",
      topics: [
        {
          title: "休むこと",
          choices: [
            {
              text: "こういう時間が必要だった",
              reply: "うん。静かな時間も、明日への力になるね。",
              aff: 10,
            },
            {
              text: "皆にもお茶を配ろう",
              reply: "いいね。皆の顔が浮かぶよ。",
              aff: 9,
            },
            {
              text: "庭の花の話を聞きたい",
              reply: "今朝ね、小さな蕾を見つけたんだ。",
              aff: 8,
            },
          ],
        },
        {
          title: "優しさについて",
          choices: [
            {
              text: "優しさは弱さじゃない",
              reply: "そうだね。支える強さもあると思う。",
              aff: 9,
            },
            {
              text: "無理して優しくしなくてもいい",
              reply: "ありがとう。自然に笑えるのが一番だね。",
              aff: 8,
            },
            {
              text: "皆が自分らしくいられるといい",
              reply: "その願い、素敵だね。大切にしよう。",
              aff: 10,
            },
          ],
        },
      ],
    },
  },
  {
    id: "tsuru",
    name: "鶴丸国永",
    type: "太刀",
    personality: "驚き好き・柔軟",
    art: "🕊️",
    lines: {
      normal: "驚きは、日々に彩りを添えるものだ。",
      expedition: "さて、どんな景色が待っているかな。",
      duty: "まさか畑当番とは。驚いたな。",
      dark: "驚かせるにも、相手を思いやる心が必要だ。",
      farewell: "次の驚きが、君にとって良いものであるように。",
    },
    talk: {
      intro: "おや、話とは？驚きのある時間にしよう。",
      topics: [
        {
          title: "驚きの企画",
          choices: [
            {
              text: "皆で小さな祭りを開く",
              reply: "おお！準備から楽しいことになりそうだ。",
              aff: 9,
            },
            {
              text: "静かな驚きもいい",
              reply: "なるほど。予想外の静けさ、というわけか。",
              aff: 8,
            },
            {
              text: "君の案を聞きたい",
              reply: "では秘密の企画を……いや、まず相談だな。",
              aff: 7,
            },
          ],
        },
      ],
    },
  },
  {
    id: "mikazuki",
    name: "三日月宗近",
    type: "太刀",
    personality: "悠然・古雅・見守る",
    art: "🌙",
    lines: {
      normal: "ははは。今日もよい日和だな。",
      expedition: "さて、月の名に恥じぬ働きをしよう。",
      duty: "急ぐことはない。手をかけた分だけ応えてくれる。",
      dark: "無理を重ねる前に、皆で立ち止まるとしよう。",
      farewell: "月は満ち欠けを繰り返す。またよい折に会おう。",
    },
    talk: {
      intro: "おお、話か。茶でも飲みながらゆるりと聞こう。",
      topics: [
        {
          title: "月を眺める",
          choices: [
            {
              text: "今夜はよく晴れているね",
              reply: "うむ。月もよく見える。こういう夜は心が静まるな。",
              aff: 8,
            },
            {
              text: "昔の月の話を聞きたい",
              reply: "ははは、長い話になるぞ。少しずつ語るとしよう。",
              aff: 9,
            },
            {
              text: "皆で縁側に集まろう",
              reply: "それはよい。月見の席を整えるとしようか。",
              aff: 8,
            },
          ],
        },
        {
          title: "長い時の過ごし方",
          choices: [
            {
              text: "今の時間を大切にしたい",
              reply: "よい心がけだ。今この時も、やがて思い出となる。",
              aff: 9,
            },
            {
              text: "新しいことを始めてみたい",
              reply: "ははは、いくつになっても初めてはあるものだ。",
              aff: 8,
            },
            {
              text: "皆の話を聞いていたい",
              reply: "人の話には、その者の時が宿る。よく聞くとよい。",
              aff: 10,
            },
          ],
        },
      ],
    },
  },
  {
    id: "chougi",
    name: "山姥切長義",
    type: "打刀",
    personality: "自負心・理知的・率直",
    art: "🦋",
    lines: {
      normal: "当然だね。僕に任せておけばいい。",
      expedition: "状況を見極めて進もう。",
      duty: "分担は合理的に。手際よく済ませよう。",
      dark: "君の判断を支えるのが僕の役目だ。だが、無理は見過ごせない。",
      farewell: "君が選んだ道だ。最後まで見届けよう。",
    },
    talk: {
      intro: "何か用かな。話す時間くらいは取れるよ。",
      topics: [
        {
          title: "本歌と写し",
          choices: [
            {
              text: "それぞれの歩みを尊重したい",
              reply: "ふうん。言うだけでなく、態度で示してもらおうか。",
              aff: 8,
            },
            {
              text: "君自身のことを知りたい",
              reply: "僕自身、か。……そうだね、少しなら話してもいい。",
              aff: 9,
            },
            {
              text: "比べずに協力できたらいい",
              reply: "合理的だね。互いの得意分野を活かせばいい。",
              aff: 7,
            },
          ],
        },
        {
          title: "本丸の運営",
          choices: [
            {
              text: "改善案を一緒に考えて",
              reply: "いいだろう。現状を整理して、優先順位をつけよう。",
              aff: 9,
            },
            {
              text: "皆の意見を集めたい",
              reply: "意見を集めるのはいい。ただし結論は出そう。",
              aff: 8,
            },
            {
              text: "今日は少し休もう",
              reply: "休息も計画のうちだ。……まあ、付き合うよ。",
              aff: 8,
            },
          ],
        },
      ],
    },
  },
  {
    id: "yagen",
    name: "薬研藤四郎",
    type: "短刀",
    personality: "冷静・面倒見がよい",
    art: "🩺",
    lines: {
      normal: "大将、何かあったらすぐ声をかけてくれ。",
      expedition: "焦らずいこう。周りをよく見てな。",
      duty: "細かい仕事も大事だ。きっちり片付けよう。",
      dark: "大将、ひとりで抱え込むな。俺たちにも頼ってくれ。",
      farewell: "大将の歩みが健やかであるよう、祈ってるぜ。",
    },
    talk: {
      intro: "おう、大将。相談でも雑談でも聞くぜ。",
      topics: [
        {
          title: "体調管理",
          choices: [
            {
              text: "皆の休みもきちんと確保したい",
              reply: "いい判断だ。休むのも仕事のうちだからな。",
              aff: 9,
            },
            {
              text: "自分の調子も気にかけるよ",
              reply: "そうしてくれ。大将が倒れたら皆が心配する。",
              aff: 10,
            },
            {
              text: "薬研の知恵を借りたい",
              reply: "任せな。無理のない範囲で一緒に考えよう。",
              aff: 8,
            },
          ],
        },
        {
          title: "大将として",
          choices: [
            {
              text: "まだ分からないことが多い",
              reply: "最初から全部できる奴はいないさ。経験を積めばいい。",
              aff: 9,
            },
            {
              text: "皆を信じて任せたい",
              reply: "その信頼に応えられるよう、俺たちも努めるぜ。",
              aff: 8,
            },
            {
              text: "困った時は相談する",
              reply: "ああ。遠慮はいらねえよ、大将。",
              aff: 10,
            },
          ],
        },
      ],
    },
  },
  {
    id: "fudou",
    name: "不動行光",
    type: "短刀",
    personality: "繊細・率直・芯が強い",
    art: "🍶",
    lines: {
      normal: "……今日は、少しだけ調子がいいんだ。",
      expedition: "気負わず行こう。できることをやるだけさ。",
      duty: "こういう仕事も、案外悪くないね。",
      dark: "無理をして笑わなくていい。皆で支え合おう。",
      farewell: "また穏やかな日々を重ねられるといいね。",
    },
    talk: {
      intro: "あれ、俺に話？……うん、聞くよ。",
      topics: [
        {
          title: "自分の歩幅",
          choices: [
            {
              text: "焦らなくていいよ",
              reply: "……そう言ってもらえると、少し気が楽になる。",
              aff: 10,
            },
            {
              text: "できたことを数えてみよう",
              reply: "小さなことでも、積み重ねれば自信になるかな。",
              aff: 9,
            },
            {
              text: "一緒に庭を歩こう",
              reply: "うん。外の空気を吸うのもいいかもしれない。",
              aff: 8,
            },
          ],
        },
        {
          title: "本丸の居場所",
          choices: [
            {
              text: "ここでは自分らしくいてほしい",
              reply: "ありがとう。そう思える場所なら、大切にしたい。",
              aff: 10,
            },
            {
              text: "皆で支え合っていこう",
              reply: "……うん。俺にもできることがあるはずだ。",
              aff: 9,
            },
            {
              text: "ゆっくり話を聞かせて",
              reply: "急がなくていいなら、少しずつ話すよ。",
              aff: 8,
            },
          ],
        },
      ],
    },
  },
];
const PERSONAL_EVENTS = {
  kashu: [
    [
      "花の手入れ",
      "花壇の手入れをしていた加州は、花の色を見比べている。",
      "花は細かいところまで手をかけると応えてくれるよ。",
    ],
    [
      "道具の整頓",
      "加州が手入れ道具を整頓している。",
      "使いやすくしておくのも、綺麗に働くコツだね。",
    ],
    [
      "気分転換",
      "加州が小さな飾りを見せてくれた。",
      "ちょっとした変化って、気持ちを切り替えるのにいいでしょ？",
    ],
    [
      "皆の身だしなみ",
      "皆の装備や衣服を整える時間になった。",
      "一緒に確認しておけば、出先でも安心だよ。",
    ],
  ],
  kasen: [
    [
      "庭の草花",
      "歌仙が庭の草花を眺め、季節の移ろいを語る。",
      "名を知り、手をかける。それだけで景色は深くなる。",
    ],
    [
      "献立の相談",
      "歌仙が献立帳を広げている。",
      "旬のものを取り入れよう。食卓にも季節を。",
    ],
    [
      "筆と紙",
      "歌仙が日誌用の筆を選んでくれた。",
      "記録するなら、書き心地も大切だ。",
    ],
    [
      "茶の時間",
      "歌仙が茶器を並べている。",
      "慌ただしい日にも、ひと息つく余白を作りたいね。",
    ],
  ],
  mutsuu: [
    [
      "新しい道具",
      "陸奥守が便利そうな道具を試している。",
      "こりゃあ工夫のし甲斐があるぜよ！",
    ],
    [
      "畑の計画",
      "陸奥守が畑の区画を考えている。",
      "皆の知恵を集めりゃ、もっと面白くなるき！",
    ],
    [
      "地図を広げて",
      "陸奥守が遠征先の地図を広げた。",
      "知らん場所を知るのは、わくわくするぜよ。",
    ],
    [
      "小さな改善",
      "陸奥守が本丸の改善案を書き出した。",
      "まず試してみる。それが大事じゃ！",
    ],
  ],
  kunihiro: [
    [
      "稽古の記録",
      "山姥切が稽古の記録を見直している。",
      "積み重ねは、記録しておくと確かめられる。",
    ],
    [
      "布の手入れ",
      "山姥切が布の手入れをしている。",
      "道具も装いも、長く使うなら手入れが必要だ。",
    ],
    [
      "見回り",
      "山姥切と本丸の見回りをした。",
      "異常なし。……こういう平穏も、守るべきものだ。",
    ],
    [
      "相談",
      "山姥切が少し迷いながら相談を持ちかけた。",
      "俺の考えも聞いてもらえると、助かる。",
    ],
  ],
  honey: [
    [
      "装備点検",
      "蜂須賀が装備の点検をしている。",
      "細部まで確かめてこそ、誇りを持って使える。",
    ],
    [
      "公平な分担",
      "蜂須賀が当番表を見直している。",
      "負担が偏らないよう、きちんと調整しよう。",
    ],
    [
      "虎徹の話",
      "蜂須賀が刀の来歴について話してくれた。",
      "伝わってきたものを、丁寧に扱いたいね。",
    ],
    [
      "庭の掃除",
      "蜂須賀と庭の掃除をした。",
      "整った場所は、皆の心にも余裕を作る。",
    ],
  ],
  hasebe: [
    [
      "報告書",
      "長谷部が報告書をまとめている。",
      "要点を整理しました。必要な判断は主にお任せします。",
    ],
    [
      "当番の調整",
      "長谷部が当番の偏りを調べている。",
      "皆の負担を確認し、適切に調整いたします。",
    ],
    [
      "備品確認",
      "長谷部と備品の在庫を確認した。",
      "不足分を一覧にしました。早めに手配いたしましょう。",
    ],
    [
      "休憩の提案",
      "長谷部が仕事の区切りを提案してきた。",
      "集中を保つためにも、休息を予定に含めましょう。",
    ],
  ],
  jikkyu: [
    [
      "花の蕾",
      "実休が庭の蕾を見つけ、そっと教えてくれた。",
      "急がず見守ろう。きっと良い時に咲くよ。",
    ],
    [
      "茶葉選び",
      "実休と茶葉を選んだ。",
      "香りの違いを楽しむのも、豊かな時間だね。",
    ],
    [
      "静かな掃除",
      "実休と静かに掃除を進めた。",
      "少しずつ整う様子を見ると、心も落ち着くね。",
    ],
    [
      "野菜の苗",
      "実休が苗の育て方を教えてくれた。",
      "根が育つ時間も、大切にしたいね。",
    ],
  ],
  tsuru: [
    [
      "仕掛けの相談",
      "鶴丸が驚かせない範囲の企画を相談してきた。",
      "意外性は、皆が笑えるものがいいな。",
    ],
    [
      "宝探し",
      "鶴丸が本丸内の小さな宝探しを提案した。",
      "見慣れた場所にも、発見は隠れているものだ。",
    ],
    [
      "昔の話",
      "鶴丸が昔見た景色について語る。",
      "長い時間を過ごしてきても、忘れられない景色はある。",
    ],
    [
      "白い飾り",
      "鶴丸が季節の飾りを作っている。",
      "さて、どこに飾れば皆が気づくかな？",
    ],
  ],
  mikazuki: [
    [
      "月見の支度",
      "三日月が縁側に座り、月見の席を整えている。",
      "急がずとも月は昇る。皆で眺めるとしよう。",
    ],
    [
      "古い茶器",
      "三日月が古い茶器を手に取っている。",
      "長く使われた道具には、それだけの景色がある。",
    ],
    [
      "庭の石",
      "庭石の配置について三日月が穏やかに意見をくれた。",
      "少し角度を変えるだけで、景色は変わるものだ。",
    ],
    [
      "昔語り",
      "三日月が昔の本丸で見た景色を語ってくれた。",
      "時が流れても、心に残るものはある。",
    ],
    [
      "朝の縁側",
      "朝の縁側で三日月と茶を飲んだ。",
      "よい朝だ。今日もゆるりと始めよう。",
    ],
    [
      "書庫の整理",
      "三日月と古い記録を整理した。",
      "記録を残すことは、未来への手紙でもある。",
    ],
    [
      "季節の移ろい",
      "三日月が庭の木々を眺めている。",
      "同じ場所でも、季節ごとに違う顔を見せる。",
    ],
    [
      "皆の集い",
      "三日月が皆の集まる席を用意した。",
      "賑やかなのもよいものだな。",
    ],
    [
      "静かな午後",
      "三日月と静かな午後を過ごした。",
      "何も起きぬ日も、よい日であろう。",
    ],
    [
      "月の話",
      "三日月が月の満ち欠けについて話してくれた。",
      "欠けているように見えても、月はそこにある。",
    ],
  ],
  chougi: [
    [
      "記録の見直し",
      "長義が本丸の記録を分類している。",
      "情報は整理してこそ役に立つ。",
    ],
    [
      "稽古の評価",
      "長義が稽古の結果を分析している。",
      "結果だけでなく過程も見るべきだね。",
    ],
    [
      "道具の選定",
      "長義と備品の品質を確認した。",
      "長く使うものなら、基準は明確にしておこう。",
    ],
    [
      "庭の整備",
      "長義が庭の動線を確認している。",
      "見た目と使いやすさ、両方が大切だ。",
    ],
    [
      "意見の整理",
      "皆の意見を長義が一覧にまとめた。",
      "異なる意見にも、役立つ視点はある。",
    ],
    [
      "書物の時間",
      "長義が書物を読んでいる。",
      "知識は持っているだけでなく、使ってこそだ。",
    ],
    [
      "本丸の規則",
      "長義と当番の決まりを見直した。",
      "公平で分かりやすい規則にしよう。",
    ],
    [
      "手合わせの後",
      "稽古の後、長義が改善点を教えてくれた。",
      "次に活かせばいい。反省だけで終わらせないこと。",
    ],
    [
      "季節の支度",
      "長義と季節の飾りを選んだ。",
      "細部まで整えると、全体の印象も変わる。",
    ],
    [
      "率直な助言",
      "長義が本丸運営について率直な意見をくれた。",
      "耳の痛い話でも、必要なら伝えるよ。",
    ],
  ],
  yagen: [
    [
      "薬箱の点検",
      "薬研が備品の状態を確かめている。",
      "必要なものがすぐ使えるようにしておこう。",
    ],
    [
      "休憩のすすめ",
      "薬研が皆の休憩時間を確認している。",
      "調子を崩す前に休む。それが大事だ。",
    ],
    [
      "相談役",
      "薬研が皆の相談を聞いていた。",
      "話すだけで楽になることもあるからな。",
    ],
    [
      "手入れ道具",
      "薬研と手入れ道具を整えた。",
      "道具の準備は基本だ。基本を大切にな。",
    ],
    [
      "食事の確認",
      "薬研が食堂の献立を見ている。",
      "しっかり食べて、しっかり休む。",
    ],
    ["見回り", "薬研と本丸を見回った。", "異常なし。今日も平穏だな。"],
    [
      "大将の予定",
      "薬研が審神者の予定を整理してくれた。",
      "予定を詰め込みすぎるなよ。",
    ],
    [
      "短刀たちの稽古",
      "薬研が短刀たちの稽古を見守っている。",
      "それぞれの得意を伸ばしてやりたいな。",
    ],
    [
      "静かな読書",
      "薬研と書庫で本を読んだ。",
      "知識は、いざという時に役立つ。",
    ],
    [
      "差し入れ",
      "薬研が皆に温かい飲み物を配っている。",
      "気負わず受け取ってくれ。",
    ],
  ],
  fudou: [
    ["庭の散歩", "不動と庭をゆっくり歩いた。", "こういう時間も、悪くないね。"],
    [
      "花の水やり",
      "不動が花に水をやっている。",
      "手をかけた分、ちゃんと応えてくれるんだ。",
    ],
    [
      "小さな達成",
      "不動が今日できたことを日誌に書いている。",
      "少しずつでも、進めているなら十分だよね。",
    ],
    [
      "茶の時間",
      "不動と温かい茶を飲んだ。",
      "落ち着くね。もう少しここにいようかな。",
    ],
    [
      "皆との会話",
      "不動が皆の話の輪に加わっていた。",
      "聞いているだけでも、居場所ってできるんだね。",
    ],
    [
      "季節の飾り",
      "不動と季節の飾りを作った。",
      "不器用でも、気持ちを込めればいいよね。",
    ],
    [
      "書庫の片隅",
      "不動が静かに本を読んでいる。",
      "知らないことを知るのは、少し楽しい。",
    ],
    [
      "当番の相談",
      "不動が当番について相談してきた。",
      "無理のないやり方を一緒に考えてほしい。",
    ],
    [
      "朝の挨拶",
      "不動と朝の挨拶を交わした。",
      "今日は昨日より、少しよくなるといいな。",
    ],
    [
      "本丸の灯り",
      "不動が廊下の灯りを整えている。",
      "明るい場所があると、ほっとするね。",
    ],
  ],
};

const INIT_IDS = ["kashu", "kasen", "mutsuu", "kunihiro", "honey"];
const serverNames = [
  "備前国",
  "相模国",
  "山城国",
  "大和国",
  "武蔵国",
  "豊後国",
  "陸奥国",
  "加賀国",
];
const seasons = ["春", "夏", "秋", "冬"],
  seasonEmoji = { 春: "🌸", 夏: "🌿✨", 秋: "🍁", 冬: "❄️" };
const ranks = [
  { r: "S", flower: "牡丹", acts: 6 },
  { r: "A", flower: "藤", acts: 5 },
  { r: "B", flower: "桜", acts: 4 },
  { r: "C", flower: "椿", acts: 3 },
  { r: "D", flower: "菫", acts: 2 },
];
const $ = (id) => document.getElementById(id);
let G = null,
  view = "title",
  modal = null,
  folded = false;
function rand(a) {
  return a[Math.floor(Math.random() * a.length)];
}
function clamp(n, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}
function fresh() {
  let rank = rand(ranks);
  return {
    phase: "profile",
    server: rand(serverNames),
    rank,
    reason: rand([
      "政府からのスカウト",
      "家系の継承",
      "偶然の適性",
      "古い記録に導かれて",
      "現代遠征中の刀剣男士からのスカウト",
    ]),
    age: 5 + Math.floor(Math.random() * 21),
    year: 1,
    season: rand(seasons),
    actions: rank.acts,
    maxActions: rank.acts,
    level: 1,
    exp: 0,
    resources: { wood: 500, stone: 500, iron: 500, coal: 500, coins: 300 },
    black: 0,
    white: 50,
    owned: [],
    adjutant: null,
    logs: [],
    turns: 0,
    dayAction: 0,
    affEvents: {},
    ending: null,
  };
}
function save() {
  if (G) localStorage.setItem("hanomanimani_v3", JSON.stringify(G));
}
function normalizeState(data) {
  if (!data || typeof data !== "object") return null;
  data.owned = Array.isArray(data.owned) ? data.owned : [];
  data.logs = Array.isArray(data.logs) ? data.logs : [];
  data.resources =
    data.resources && typeof data.resources === "object"
      ? data.resources
      : { wood: 500, stone: 500, iron: 500, coal: 500, coins: 300 };
  for (const k of ["wood", "stone", "iron", "coal", "coins"])
    if (!Number.isFinite(data.resources[k])) data.resources[k] = 500;
  data.rank =
    data.rank && typeof data.rank === "object"
      ? data.rank
      : { r: "B", flower: "桜", acts: 5 };
  data.rank.acts = Number.isFinite(data.rank.acts) ? data.rank.acts : 5;
  data.year = Number.isFinite(data.year) ? data.year : 1;
  data.age = Number.isFinite(data.age) ? data.age : 15;
  data.level = Number.isFinite(data.level) ? data.level : 1;
  data.exp = Number.isFinite(data.exp) ? data.exp : 0;
  data.actions = Number.isFinite(data.actions) ? data.actions : data.rank.acts;
  data.maxActions = Number.isFinite(data.maxActions)
    ? data.maxActions
    : data.rank.acts;
  data.turns = Number.isFinite(data.turns) ? data.turns : 0;
  data.dayAction = Number.isFinite(data.dayAction) ? data.dayAction : 0;
  data.black = Number.isFinite(data.black) ? data.black : 0;
  data.white = Number.isFinite(data.white) ? data.white : 50;
  data.season = seasons.includes(data.season) ? data.season : "春";
  data.owned = data.owned
    .filter((o) => o && typeof o.id === "string" && sword(o.id))
    .filter((o, i, arr) => arr.findIndex((x) => x.id === o.id) === i)
    .slice(0, 12)
    .map((o) => ({
      ...o,
      level: Number.isFinite(o.level) ? o.level : 1,
      aff: Number.isFinite(o.trust)
        ? o.trust
        : Number.isFinite(o.aff)
          ? o.aff
          : Number.isFinite(o.affinity)
            ? o.affinity
            : Number.isFinite(o.intimacy)
              ? o.intimacy
              : 30,
      fatigue: Number.isFinite(o.fatigue) ? o.fatigue : 0,
      milestones: Array.isArray(o.milestones) ? o.milestones : [],
      timedEvents: Array.isArray(o.timedEvents) ? o.timedEvents : [],
    }));
  data.owned.forEach((o) => {
    o.trust = o.aff;
    delete o.affinity;
    delete o.intimacy;
  });
  if (!data.adjutant || !data.owned.some((o) => o.id === data.adjutant))
    data.adjutant = data.owned[0]?.id || null;
  data.phase = data.phase || "home";
  return data;
}
function load() {
  try {
    return normalizeState(JSON.parse(localStorage.getItem("hanomanimani_v3")));
  } catch (e) {
    return null;
  }
}
function entry(s, txt) {
  G.logs.unshift({
    year: G.year,
    season: G.season,
    n: G.dayAction,
    text: txt,
    who: s || "本丸",
  });
  if (G.logs.length > 200) G.logs.length = 200;
}
function sword(id) {
  return SWORDS.find((x) => x.id === id);
}
function owned(id) {
  return G && Array.isArray(G.owned) ? G.owned.find((x) => x.id === id) : null;
}
function grant(id) {
  if (owned(id)) return false;
  G.owned.push({
    id,
    level: 1,
    aff: 30,
    fatigue: 0,
    milestones: [],
    timedEvents: [],
  });
  return true;
}
function scrollTop() {
  window.scrollTo({ top: 0, behavior: "instant" });
}
function render() {
  if (!G) {
    $("status").innerHTML = "";
    $("nav").hidden = true;
    renderTitle();
    return;
  }
  $("nav").hidden = false;
  renderStatus();
  if (view === "home") renderHome();
  else if (view === "actions") renderActions();
  else if (view === "book") renderBook();
  else if (view === "journal") renderJournal();
  else if (view === "profile") renderProfile();
  else if (view === "initial") renderInitial();
  else if (view === "forgeintro") renderForgeIntro();
  scrollTop();
}
function renderTitle() {
  view = "title";
  $("app").innerHTML =
    `<section class="paper hero"><h1>刃のまにまに</h1><p>— 本丸歳時記 —</p><p class="muted">桜の便りと、刀の声が紡ぐ日々。</p></section><section class="paper choice"><button class="wide" onclick="newStart()">新しく本丸を開く</button><button class="wide" ${load() ? "" : "disabled"} onclick="continueGame()">前回の続きから</button></section><p class="muted">和紙の頁に、あなたの本丸の物語を。</p>`;
}
function renderStatus() {
  G.owned = Array.isArray(G.owned) ? G.owned : [];
  G.resources = G.resources || {
    wood: 0,
    stone: 0,
    iron: 0,
    coal: 0,
    coins: 0,
  };
  G.rank = G.rank || { flower: "桜", r: "B" };
  let a = G.owned.find((x) => x.id === G.adjutant),
    s = a ? sword(a.id) : null;
  $("status").className = "status" + (folded ? " folded" : "");
  $("status").innerHTML =
    `<div class="statgrid"><div class="stat">就任 ${G.year}年目 / ${G.age}歳</div><div class="stat">${seasonEmoji[G.season]} ${G.season}</div><div class="stat">審神者Lv.${G.level}</div><div class="stat">霊力 ${G.rank.flower}(${G.rank.r})</div><div class="stat">本丸 ${G.black > 60 ? "黒寄り" : G.black < 15 ? "穏やか" : "中立"} ${G.black}</div><div class="stat">木 ${G.resources.wood} 石 ${G.resources.stone}</div><div class="stat">鉄 ${G.resources.iron} 炭 ${G.resources.coal} 小判 ${G.resources.coins}</div><div class="stat">近侍 ${s ? s.name : "未設定"} / 行動 ${G.actions}/${G.maxActions}</div></div>`;
}
function renderHome() {
  let a = owned(G.adjutant),
    s = a ? sword(a.id) : null;
  $("app").innerHTML =
    `<section class="paper hero"><h2>本丸へようこそ</h2><p>${G.year}年目・${G.season}。 ${s ? s.lines.normal : "まだ静かな本丸です。"}</p><p class="muted">本丸の空気：${G.black < 20 ? "柔らかな空気が流れている。" : G.black < 55 ? "皆、少し疲れているようだ。" : "張り詰めた気配が漂っている。"}</p></section><section class="paper"><h3 class="section-title">近侍</h3>${s ? `<div class="portrait">${s.art}</div><h3>${s.name}</h3><p>${s.personality}</p>` : "近侍を選んでください"}<div class="row"><button onclick="changeAdjutant()">近侍を変更</button><button onclick="openTalk()">近侍と語らう</button></div></section><section class="paper"><h3 class="section-title">今日の営み</h3><button class="wide" onclick="setView('actions')">今日の行動を選ぶ</button><p class="muted">日々の行動が、刀たちとの縁と本丸の姿を形作ります。</p></section><section class="paper"><button class="wide" onclick="resetAsk()">新しく本丸を始める</button></section>`;
}
function renderActions() {
  $("app").innerHTML =
    `<h2>今日の行動</h2><section class="paper actions">${["出陣", "鍛刀", "内番", "遠征", "演練", "休息・万屋"].map((x, i) => `<button onclick="action('${x}')">${["⚔️ 出陣", "🔨 鍛刀", "🌱 内番", "🧭 遠征", "🥋 演練", "🍵 休息・万屋"][i]}</button>`).join("")}</section><button class="wide" onclick="setView('home')">本丸へ戻る</button><button class="wide" onclick="showEndings()">節目の記録</button>`;
}
function renderBook() {
  $("app").innerHTML = `<h2>刀帳</h2>${G.owned
    .map((o) => {
      let s = sword(o.id);
      return `<section class="paper"><div class="row"><div class="portrait" style="flex:0 0 80px;height:80px">${s.art}</div><div><h3>${s.name}</h3><p>${s.type} / ${s.personality}</p><p>Lv.${o.level}　信頼度 ${o.aff}/100　疲労 ${o.fatigue}</p></div></div></section>`;
    })
    .join(
      "",
    )}<button class="wide" onclick="setView('home')">本丸へ戻る</button>`;
}
function renderJournal() {
  $("app").innerHTML =
    `<h2>本丸日誌</h2>${G.logs.length ? G.logs.map((l) => `<section class="paper"><div class="muted">${l.year}年目 ${l.season} 行動${l.n}回目 / ${l.who}</div><div class="log">${l.text}</div></section>`).join("") : "<p>日誌はまだ白紙です。</p>"}<button class="wide" onclick="setView('home')">本丸へ戻る</button>`;
}
function renderProfile() {
  $("app").innerHTML =
    `<section class="paper hero"><div style="font-size:2.5rem">📜 ✨ 🏯</div><h2>審神者就任の儀</h2><p class="dialog-line">「時の政府より、正式に辞令を交付する。あなたの霊力と判断をもって、歴史を守る刀剣たちの居場所を築いてほしい。焦らず、周囲と協力し、健やかな本丸を育てることを期待する。」</p><p>政府より、あなたへ本丸の管理を委ねる辞令が届いた。</p><p>サーバー：${G.server}</p><p>霊力：${G.rank.flower}(${G.rank.r})</p><p>年齢：${G.age}歳</p><p>就任理由：${G.reason}</p><p>${G.rank.r === "S" ? "強い霊力は時空の歪みにも感知されやすい。" : "霊力は本丸を支える力となる。"}</p><button class="wide" onclick="goInitial()">辞令を受け取る</button></section>`;
}
function renderInitial() {
  $("app").innerHTML =
    `<h2>初期刀を選ぶ</h2><p>五振りの中から、最初の近侍を選んでください。</p><section class="paper choice">${INIT_IDS.map((id) => `<button onclick="chooseInitial('${id}')">${sword(id).name}</button>`).join("")}</section>`;
}
function renderForgeIntro() {
  $("app").innerHTML =
    `<section class="paper hero"><h2>初鍛刀</h2><p>政府から届いた資材と鍛刀道具。最初の刀を迎える時が来た。</p><button class="wide" onclick="firstForge()">初期刀と鍛刀を始める</button></section>`;
}
function setView(v) {
  view = v;
  render();
  scrollTop();
}
function newStart() {
  G = fresh();
  view = "profile";
  render();
  save();
  scrollTop();
}
function continueGame() {
  G = load();
  if (!G) {
    renderTitle();
    return;
  }
  save();
  view = G.phase === "home" ? "home" : G.phase;
  render();
  scrollTop();
}
function goInitial() {
  G.phase = "initial";
  view = "initial";
  render();
}
function chooseInitial(id) {
  grant(id);
  G.adjutant = id;
  G.phase = "forgeintro";
  view = "forgeintro";
  entry(sword(id).name, `${sword(id).name}が初期刀として本丸に迎えられた。`);
  render();
  save();
}
function firstForge() {
  let pool = SWORDS.filter((s) => !owned(s.id));
  if (G.owned.length >= 12 || !pool.length) {
    G.phase = "home";
    view = "home";
    save();
    render();
    return;
  }
  let id = rand(pool).id;
  grant(id);
  G.phase = "home";
  view = "home";
  entry(
    sword(id).name,
    `初鍛刀で${sword(id).name}が顕現した。新たな気配が本丸に満ちる。`,
  );
  save();
  showModal(
    `<div class="portrait">${sword(id).art} ✨</div><h2>${sword(id).name} 顕現</h2><p>${sword(id).lines.normal}</p><button class="wide" onclick="closeModal()">本丸へ</button>`,
  );
}
function modalOpen(html) {
  modal = html;
  $("modal-content").innerHTML = html;
  $("modal").hidden = false;
  setTimeout(() => {
    let card = document.querySelector(".modal-card");
    if (card) card.scrollTop = 0;
  }, 0);
}
function showModal(html) {
  modalOpen(html);
}
function closeModal() {
  $("modal").hidden = true;
  modal = null;
  render();
}
function changeAdjutant() {
  modalOpen(
    `<h2>近侍を選ぶ</h2><div class="choice">${G.owned.map((o) => `<button onclick="setAdjutant('${o.id}')">${sword(o.id).name}</button>`).join("")}</div><button class="wide" onclick="closeModal()">閉じる</button>`,
  );
}
function setAdjutant(id) {
  G.adjutant = id;
  entry(sword(id).name, `${sword(id).name}が近侍に任じられた。`);
  save();
  closeModal();
}
function ageIntro(base) {
  return G.age < 10
    ? "まだ幼い審神者にもわかるよう、ゆっくりと言葉を選ぶ。 " + base
    : G.age < 16
      ? "成長途中の審神者を気遣い、少し柔らかな言い回しで話す。 " + base
      : G.age < 25
        ? base
        : "経験を重ねた審神者へ、落ち着いた調子で話す。 " + base;
}
function openTalk() {
  let s = sword(G.adjutant);
  if (!s) return;
  let o = owned(s.id);
  if (o) {
    let m = milestoneFor(o);
    if (m !== null) {
      showAffinityEvent(s, o, m);
      return;
    }
  }
  let topics = s.talk.topics;
  modalOpen(
    `<div class="portrait">${s.art}</div><h2>${s.name}との語らい</h2><p class="dialog-line">${ageIntro(s.talk.intro)}</p><h3>話題を選ぶ</h3><div class="choice">${topics.map((t, i) => `<button onclick="talkTopic(${i})">${t.title}</button>`).join("")}</div><button class="wide" onclick="closeModal()">今日はここまで</button>`,
  );
}
function talkTopic(i) {
  let s = sword(G.adjutant),
    topic = s.talk.topics[i];
  modalOpen(
    `<div class="portrait">${s.art}</div><h2>${s.name} — ${topic.title}</h2><p>${ageIntro(s.talk.intro)}</p><div class="choice">${topic.choices.map((c, j) => `<button onclick="talkChoice(${i},${j})">${c.text}</button>`).join("")}</div><button class="wide" onclick="openTalk()">話題に戻る</button>`,
  );
}
function talkChoice(i, j) {
  let s = sword(G.adjutant),
    c = s.talk.topics[i].choices[j],
    o = owned(s.id),
    old = o.aff;
  o.aff = clamp(o.aff + c.aff);
  o.fatigue = clamp(o.fatigue - 10);
  G.white = clamp(G.white + 1);
  entry(
    s.name,
    `${s.name}と「${s.talk.topics[i].title}」について話した。${c.reply} (信頼度 +${c.aff})`,
  );
  save();
  let m = milestoneFor(o);
  modalOpen(
    `<div class="portrait">${s.art}</div><h2>${s.name}</h2><p class="dialog-line">${ageIntro(c.reply)}</p><p>信頼度 +${c.aff}</p>${m !== null ? `<button class="wide" onclick="showAffinityEvent(sword('${s.id}'),owned('${s.id}'),${m})">信頼の節目イベントへ</button>` : ""}<button class="wide" onclick="closeModal()">本丸へ戻る</button>`,
  );
}

function personalizedAffinityEvent(s, o, t) {
  let data = PERSONAL_EVENTS[s.id] || [
    [
      "本丸でのひととき",
      "本丸で穏やかな時間を過ごした。",
      "これからも互いに支え合っていこう。",
    ],
  ];
  let idx = Math.min(t, data.length - 1);
  let ev = data[idx];
  let response = [
    "ありがとう。そう言ってもらえると励みになる。",
    "互いに無理のない形で続けよう。",
    "その考えも大切にしたい。",
  ];
  modalOpen(
    `<div class="portrait">${s.art}</div><h2>${["小さな信頼", "協力の実感", "絆の確認", "長い歩み"][t]}</h2><p>${ev[1]}</p><p class="dialog-line">${s.name}：「${ev[2]}」</p><div class="choice"><button onclick="personalAffinityChoice('${s.id}',${[40, 60, 80, 100][t]},0)">感謝を伝える</button><button onclick="personalAffinityChoice('${s.id}',${[40, 60, 80, 100][t]},1)">皆で続けていこうと提案する</button><button onclick="personalAffinityChoice('${s.id}',${[40, 60, 80, 100][t]},2)">日誌に記録する</button></div>`,
  );
}
function personalAffinityChoice(id, threshold, i) {
  let o = owned(id),
    s = sword(id);
  if (!o.milestones) o.milestones = [];
  if (!o.milestones.includes(threshold)) o.milestones.push(threshold);
  let replies = [
    "感謝の言葉を交わした。",
    "これからも協力することを確認した。",
    "今日の出来事を日誌に残した。",
  ];
  o.aff = clamp(o.aff + 2);
  entry(s.name, `信頼イベント「${threshold}」：${replies[i]}`);
  save();
  modalOpen(
    `<h2>${s.name}</h2><p>${replies[i]}</p><button class="wide" onclick="closeModal()">本丸へ戻る</button>`,
  );
}
function personalTimedEvent(o, s) {
  let list = PERSONAL_EVENTS[s.id] || [
    [
      "本丸でのひととき",
      "本丸で穏やかな時間を過ごした。",
      "これからも互いに支え合っていこう。",
    ],
  ];
  let idx = (o.timedEvents || []).length % list.length;
  let ev = list[idx];
  if (!o.timedEvents) o.timedEvents = [];
  o.timedEvents.push(idx);
  modalOpen(
    `<div class="portrait">${s.art}</div><h2>${ev[0]}</h2><p>${ev[1]}</p><p class="dialog-line">${s.name}：「${ev[2]}」</p><div class="choice"><button onclick="timedPersonalChoice('${o.id}',0,'${ev[0]}')">話を聞く</button><button onclick="timedPersonalChoice('${o.id}',1,'${ev[0]}')">一緒に取り組む</button><button onclick="timedPersonalChoice('${o.id}',2,'${ev[0]}')">日誌に残す</button></div>`,
  );
}
function timedPersonalChoice(id, i, title) {
  let o = owned(id),
    s = sword(id);
  let msgs = [
    "落ち着いて話す時間を持った。",
    "協力して小さな仕事を進めた。",
    "出来事を日誌に記録した。",
  ];
  o.aff = clamp(o.aff + [2, 4, 3][i]);
  o.fatigue = clamp(o.fatigue - 2);
  G.white = clamp(G.white + 1);
  entry(s.name, `${title}：${msgs[i]} (信頼度 +${[2, 4, 3][i]})`);
  save();
  modalOpen(
    `<h2>${s.name}</h2><p>${msgs[i]}</p><button class="wide" onclick="closeModal()">本丸へ戻る</button>`,
  );
}
function milestoneFor(o) {
  if (!o) return null;
  let thresholds = [40, 60, 80, 100];
  if (!o.milestones) o.milestones = [];
  return thresholds.findIndex(
    (t, i) => o.aff >= t && !o.milestones.includes(t),
  ) >= 0
    ? thresholds.findIndex((t, i) => o.aff >= t && !o.milestones.includes(t))
    : null;
}
function showAffinityEvent(s, o, t) {
  personalizedAffinityEvent(s, o, t);
  return;
  let threshold = [40, 60, 80, 100][t],
    title = ["信頼の芽生え", "支え合う仲", "確かな絆", "揺るがぬ信頼"][t],
    story = [
      `${s.name}は、あなたが日々の小さな約束を守ってきたことに気づいたようだ。\n「……以前より、安心して話せるようになった」`,
      ` ${s.name}は本丸の仕事を終え、協力することの意味を語る。\n「一人で抱えず、これからも相談し合おう」`,
      ` ${s.name}は本丸の仲間たちとあなたの連携を見て、静かに頷いた。\n「この場所を、皆で守っていきたい」`,
      ` ${s.name}は長い歩みを振り返る。\n「積み重ねた信頼は、簡単には揺らがないものだな」`,
    ][t];
  modalOpen(
    `<div class="portrait">${s.art}</div><h2>${title}</h2><p>${story}</p><div class="choice"><button onclick="affinityChoice('${s.id}',${threshold},0)">言葉を受け止め、感謝する</button><button onclick="affinityChoice('${s.id}',${threshold},1)">少し照れながら話題を変える</button><button onclick="affinityChoice('${s.id}',${threshold},2)">今は返事を保留して、仕事に戻る</button></div>`,
  );
}
function affinityChoice(id, threshold, choice) {
  let o = owned(id),
    s = sword(id);
  if (!o.milestones) o.milestones = [];
  if (!o.milestones.includes(threshold)) o.milestones.push(threshold);
  let replies = [
    "「こちらこそ、ありがとう。これからもよろしく頼む。」",
    "「はは、無理に言葉にしなくてもいいさ。」",
    "「了解。必要なときにまた話そう。」",
  ];
  entry(s.name, `信頼度${threshold}の節目：${replies[choice]}`);
  save();
  modalOpen(
    `<div class="portrait">${s.art}</div><h2>${s.name}</h2><p>${replies[choice]}</p><button class="wide" onclick="closeModal()">本丸へ戻る</button>`,
  );
}
function timedHonmaruEvent() {
  if (!G || !Array.isArray(G.owned) || !G.owned.length) return;
  let o = rand(G.owned),
    s = sword(o.id);
  personalTimedEvent(o, s);
}
function timedChoice(id, i, title) {
  let o = owned(id),
    s = sword(id);
  let msg = [
    "皆で穏やかな時間を過ごした。",
    "相談を通して、互いの考えを知る機会になった。",
    "気遣いが本丸に広がった。",
  ][i];
  o.aff = clamp(o.aff + 2);
  G.white = clamp(G.white + 1);
  entry(s.name, `${title}：${msg} (信頼度 +2)`);
  save();
  modalOpen(
    `<h2>${s.name}</h2><p>${msg}</p><button class="wide" onclick="closeModal()">本丸へ戻る</button>`,
  );
}
function action(name) {
  if (G.actions <= 0) {
    modalOpen(
      `<h2>行動回数が尽きた</h2><p>季節を進めて休息を取ろう。</p><button class="wide" onclick="advanceSeason()">季節を進める</button>`,
    );
    return;
  }
  switch (name) {
    case "休息・万屋":
      rest();
      return;
    case "鍛刀":
      forge();
      return;
    case "内番":
      duty();
      break;
    case "遠征":
      expedition();
      break;
    case "演練":
      training();
      break;
    case "出陣":
      combat();
      return;
  }
  consume();
  setView("journal");
  randomEvent();
}
function consume() {
  G.actions--;
  G.dayAction++;
  G.turns++;
  if (G.turns % 3 === 0) randomEvent();
  if (G.turns > 0 && G.turns % 6 === 0 && G.actions > 0) timedHonmaruEvent();
  if (G.actions <= 0) {
    G.actions = 0;
    modalOpen(
      `<h2>季節の区切り</h2><p>今日の務めを終えました。次の季節へ進みますか？</p><button class="wide" onclick="advanceSeason()">季節を進める</button>`,
    );
  }
}
function rest() {
  let o = owned(G.adjutant);
  if (o) {
    o.fatigue = clamp(o.fatigue - 20);
    o.aff = clamp(o.aff + 5);
  }
  G.black = clamp(G.black - 3);
  entry(
    sword(G.adjutant).name,
    "休息を取り、近侍と語らう時間を持った。疲労が和らぎ、信頼度が上がった。",
  );
  G.actions--;
  G.dayAction++;
  G.turns++;
  save();
  setView("home");
  openTalk();
}
function forge() {
  if (G.owned.length >= 12) {
    modalOpen(
      `<h2>本丸の顕現枠がいっぱいです</h2><p>この本丸に迎えられる刀剣男士は最大12振りです。</p><button class="wide" onclick="closeModal()">戻る</button>`,
    );
    return;
  }
  if (G.resources.wood < 100 || G.resources.iron < 100) {
    modalOpen(
      `<h2>資材不足</h2><p>木材と鉄が各100必要です。</p><button class="wide" onclick="closeModal()">戻る</button>`,
    );
    return;
  }
  let pool = SWORDS.filter((s) => !owned(s.id));
  if (!pool.length) {
    modalOpen(
      `<h2>顕現できる刀剣男士はいません</h2><p>実装済みの刀剣男士は全員本丸にいます。</p><button class="wide" onclick="closeModal()">戻る</button>`,
    );
    return;
  }
  G.resources.wood -= 100;
  G.resources.iron -= 100;
  let id = rand(pool).id;
  if (!grant(id)) {
    modalOpen(
      `<h2>顕現できませんでした</h2><p>本丸の枠を確認してください。</p><button class="wide" onclick="closeModal()">戻る</button>`,
    );
    return;
  }
  entry(sword(id).name, `鍛刀を行い、${sword(id).name}が顕現した。`);
  consume();
  save();
  setView("journal");
  showModal(
    `<div class="portrait">${sword(id).art} ✨</div><h2>${sword(id).name} 顕現</h2><p>${sword(id).lines.normal}</p><button class="wide" onclick="closeModal()">日誌へ戻る</button>`,
  );
}
function duty() {
  let o = owned(G.adjutant);
  if (o) {
    o.aff = clamp(o.aff + 8);
    o.fatigue = clamp(o.fatigue + 4);
  }
  G.resources.coins += 15;
  entry(
    sword(G.adjutant).name,
    "畑・馬・手合せなどの内番を行った。小さな働きが本丸を支える。",
  );
}
function expedition() {
  G.resources.wood += 80;
  G.resources.stone += 60;
  G.resources.coins += 35;
  let o = owned(G.adjutant);
  if (o) o.aff = clamp(o.aff + 5);
  entry(sword(G.adjutant).name, "遠征隊が帰還。資材と小判を持ち帰った。");
}
function training() {
  G.level++;
  G.exp += 15;
  let o = owned(G.adjutant);
  if (o) o.aff = clamp(o.aff + 4);
  entry(
    sword(G.adjutant).name,
    "演練を行い、互いの技を磨いた。審神者レベルが上がった。",
  );
}
function combat() {
  let s = sword(G.adjutant),
    o = owned(G.adjutant);
  modalOpen(
    `<h2>出陣</h2><div class="portrait">${s.art}</div><p>${s.lines.expedition}</p><p>戦況を判断してください。</p><div class="choice"><button onclick="battleResolve(false)">慎重に進み、撤退も視野に入れる</button><button onclick="battleResolve(true)">さらに進軍する（危険）</button></div>`,
  );
}
function battleResolve(risky) {
  let o = owned(G.adjutant),
    s = sword(G.adjutant);
  if (risky && G.black > 35) {
    G.black = clamp(G.black + 8);
    entry(
      s.name,
      "危険な進軍は避けられず、部隊は消耗した。無理を重ねる前に立て直す必要がある。",
    );
  } else {
    G.resources.coins += 20;
    G.exp += 20;
    o.level++;
    o.aff = clamp(o.aff + 6);
    entry(s.name, "出陣を終え、部隊は無事帰還。経験を積み、連携が深まった。");
    if (Math.random() < 0.2) {
      let pool = SWORDS.filter((x) => !owned(x.id));
      if (pool.length) {
        let id = rand(pool).id;
        grant(id);
        entry(
          sword(id).name,
          `${sword(id).name}が戦場の縁から本丸に加わった。`,
        );
      }
    }
  }
  consume();
  save();
  setView("journal");
}
function randomEvent() {
  if (G.turns % 3 !== 0) return;
  let who = rand(G.owned),
    s = sword(who.id);
  if (!s) return;
  let msg = rand([
    "廊下で短い笑い声が聞こえた。皆の気持ちが少しほぐれた。",
    "庭の手入れについて、刀たちが自然と相談していた。",
    "食堂に小さな差し入れが置かれ、穏やかな空気が広がった。",
  ]);
  who.aff = clamp(who.aff + 2);
  entry(s.name, msg);
  G.black = clamp(G.black - 1);
}
function advanceSeason() {
  let prev = G.season;
  G.season = seasons[(seasons.indexOf(G.season) + 1) % 4];
  G.actions = G.maxActions;
  G.dayAction = 0;
  if (prev === "冬") {
    G.age += 2;
    G.year += 2;
    if (G.age > 30) {
      G.rank.acts = Math.max(2, G.rank.acts - 1);
      G.maxActions = Math.max(2, G.maxActions - 1);
    }
  }
  save();
  closeModal();
  render();
  let ov = document.createElement("div");
  ov.className = "season-overlay";
  ov.textContent = seasonEmoji[G.season] + " " + G.season;
  document.body.append(ov);
  setTimeout(() => ov.remove(), 1800);
}
function showEndings() {
  let ending =
    G.black >= 70
      ? "張り詰めた本丸"
      : G.white >= 70
        ? "穏やかな本丸"
        : G.year >= 20
          ? "長く続く本丸"
          : "これから築く本丸";
  modalOpen(
    `<h2>本丸の節目</h2><p>現在の歩みから見える姿：<strong>${ending}</strong></p><p>${G.year}年目、${G.age}歳。日々の選択は、本丸の空気や刀たちとの信頼に積み重なっていく。</p><button class="wide" onclick="closeModal()">閉じる</button>`,
  );
}
function resetAsk() {
  let s = G && sword(G.adjutant);
  modalOpen(
    `<h2>本丸を閉じる？</h2><p>${s ? s.lines.farewell : "これまでの記録が消えます。"}<br>保存データを初期化しますか？</p><div class="row"><button onclick="resetGame()">新しく始める</button><button onclick="closeModal()">やめる</button></div>`,
  );
}
function resetGame() {
  localStorage.removeItem("hanomanimani_v3");
  G = null;
  view = "title";
  $("modal").hidden = true;
  render();
  scrollTop();
}
$("fold").onclick = () => {
  folded = !folded;
  renderStatus();
};
$("nav").addEventListener("click", (e) => {
  let b = e.target.closest("button[data-view]");
  if (b) setView(b.dataset.view);
});
$("modal").addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-backdrop")) closeModal();
});
renderTitle();

//
let TALK_TARGET = null;
let BATTLE = null;
let BATTLE_PARTY_SELECTION = [];
function normalizeTrust() {
  if (!G || !Array.isArray(G.owned)) return;
  G.owned.forEach((o) => {
    if (!Number.isFinite(o.aff))
      o.aff = Number.isFinite(o.trust) ? o.trust : 30;
    o.trust = o.aff;
  });
}
function grant(id) {
  if (!G.owned) G.owned = [];
  if (owned(id) || G.owned.length >= 12 || !sword(id)) return false;
  G.owned.push({
    id,
    level: 1,
    aff: 30,
    trust: 30,
    fatigue: 0,
    condition: "健康",
    milestones: [],
    timedEvents: [],
  });
  return true;
}
function save() {
  if (G) {
    normalizeTrust();
    localStorage.setItem("hanomanimani_v3", JSON.stringify(G));
  }
}
function render() {
  if (!G) {
    $("status").innerHTML = "";
    $("nav").hidden = true;
    renderTitle();
    return;
  }
  normalizeTrust();
  $("nav").hidden = false;
  renderStatus();
  if (view === "home") renderHome();
  else if (view === "actions") renderActions();
  else if (view === "book") renderBook();
  else if (view === "journal") renderJournal();
  else if (view === "profile") renderProfile();
  else if (view === "initial") renderInitial();
  else if (view === "forgeintro") renderForgeIntro();
  else if (view === "expedition") renderBattleView();
  scrollTop();
}
function renderHome() {
  let a = owned(G.adjutant),
    s = a ? sword(a.id) : null;
  $("app").innerHTML =
    `<section class="paper hero"><h2>本丸へようこそ</h2><p>${G.year}年目・${G.season}。 ${s ? s.lines.normal : "まだ静かな本丸です。"}</p><p class="muted">本丸の空気：${G.black < 20 ? "柔らかな空気が流れている。" : G.black < 55 ? "皆、少し疲れているようだ。" : "張り詰めた気配が漂っている。"}</p></section><section class="paper"><h3 class="section-title">近侍</h3>${s ? `<div class="portrait">${s.art}</div><h3>${s.name}</h3><p>${s.personality}</p>` : "近侍を選んでください"}<div class="row"><button onclick="changeAdjutant()">近侍を変更</button><button onclick="startTalkSelect()">刀剣男士と語らう</button></div></section><section class="paper"><h3 class="section-title">本丸の皆</h3><div class="owned-grid">${G.owned
      .map((o) => {
        let x = sword(o.id);
        return `<button class="member-chip" onclick="startTalk('${o.id}')">${x.art} ${x.name}<small>信頼度 ${o.aff}/100</small></button>`;
      })
      .join(
        "",
      )}</div></section><section class="paper"><h3 class="section-title">今日の営み</h3><button class="wide" onclick="setView('actions')">今日の行動を選ぶ</button><p class="muted">日々の行動が、刀たちとの縁と本丸の姿を形作ります。</p></section><section class="paper"><button class="wide" onclick="resetAsk()">新しく本丸を始める</button></section>`;
}
function renderBook() {
  $("app").innerHTML = `<h2>刀帳</h2>${
    G.owned
      .map((o) => {
        let s = sword(o.id);
        return `<section class="paper"><div class="row"><div class="portrait book-portrait">${s.art}</div><div class="book-info"><h3>${s.name}</h3><p>${s.type} / ${s.personality}</p><p>Lv.${o.level}　信頼度 ${o.aff}/100　疲労 ${o.fatigue}</p><button onclick="startTalk('${o.id}')">この刀と話す</button><button onclick="setAdjutant('${o.id}')">近侍に任命</button></div></div></section>`;
      })
      .join("") || "<p>まだ刀剣男士はいません。</p>"
  }<button class="wide" onclick="setView('home')">本丸へ戻る</button>`;
}
function startTalkSelect() {
  if (!G.owned.length) {
    modalOpen(
      `<h2>まだ誰もいません</h2><p>先に初期刀を迎えましょう。</p><button class="wide" onclick="closeModal()">閉じる</button>`,
    );
    return;
  }
  modalOpen(
    `<h2>誰と語らいますか？</h2><div class="choice">${G.owned
      .map((o) => {
        let s = sword(o.id);
        return `<button onclick="startTalk('${o.id}')">${s.art} ${s.name}　信頼度 ${o.aff}/100</button>`;
      })
      .join(
        "",
      )}</div><button class="wide" onclick="closeModal()">閉じる</button>`,
  );
}
function startTalk(id) {
  TALK_TARGET = id;
  openTalk();
}
function openTalk() {
  let id = TALK_TARGET || G.adjutant;
  let s = sword(id);
  if (!s || !owned(id)) return;
  TALK_TARGET = id;
  let o = owned(id);
  let m = milestoneFor(o);
  if (m !== null) {
    showAffinityEvent(s, o, m);
    return;
  }
  let topics = s.talk.topics;
  modalOpen(
    `<div class="portrait">${s.art}</div><h2>${s.name}との語らい</h2><p class="dialog-line">${ageIntro(s.talk.intro)}</p><h3>話題を選ぶ</h3><div class="choice">${topics.map((t, i) => `<button onclick="talkTopic(${i})">${t.title}</button>`).join("")}</div><button class="wide" onclick="closeModal()">今日はここまで</button>`,
  );
}
function talkTopic(i) {
  let s = sword(TALK_TARGET || G.adjutant),
    topic = s.talk.topics[i];
  modalOpen(
    `<div class="portrait">${s.art}</div><h2>${s.name} — ${topic.title}</h2><p>${ageIntro(s.talk.intro)}</p><div class="choice">${topic.choices.map((c, j) => `<button onclick="talkChoice(${i},${j})">${c.text}</button>`).join("")}</div><button class="wide" onclick="openTalk()">話題に戻る</button>`,
  );
}
function talkChoice(i, j) {
  let id = TALK_TARGET || G.adjutant,
    s = sword(id),
    c = s.talk.topics[i].choices[j],
    o = owned(id);
  o.aff = clamp(o.aff + c.aff);
  o.trust = o.aff;
  o.fatigue = clamp(o.fatigue - 5);
  G.white = clamp(G.white + 1);
  entry(
    s.name,
    `${s.name}と「${s.talk.topics[i].title}」について話した。${c.reply}（信頼度 +${c.aff}）`,
  );
  save();
  let m = milestoneFor(o);
  modalOpen(
    `<div class="portrait">${s.art}</div><h2>${s.name}</h2><p class="dialog-line">${ageIntro(c.reply)}</p><p>信頼度 +${c.aff}　現在 ${o.aff}/100</p>${m !== null ? `<button class="wide" onclick="showAffinityEvent(sword('${id}'),owned('${id}'),${m})">信頼度の節目イベントへ</button>` : ""}<button class="wide" onclick="closeModal()">本丸へ戻る</button>`,
  );
}
function duty() {
  let candidates = G.owned.slice();
  if (!candidates.length) return;
  let html = `<h2>内番の担当を選ぶ</h2><p>誰に内番をお願いする？</p><div class="choice">${candidates.map((o) => `<button onclick="doDuty('${o.id}')">${sword(o.id).name}</button>`).join("")}</div>`;
  modalOpen(html);
}
function doDuty(id) {
  let o = owned(id),
    s = sword(id);
  o.aff = clamp(o.aff + 8);
  o.trust = o.aff;
  o.fatigue = clamp(o.fatigue + 4);
  G.resources.coins += 15;
  entry(
    s.name,
    "畑・馬・手合せなどの内番を行った。小さな働きが本丸を支える。信頼度 +8。",
  );
  consume();
  save();
  closeModal();
  setView("journal");
}
function combat() {
  if (!G.owned.length) {
    modalOpen(
      `<h2>部隊を編成できません</h2><p>刀剣男士を迎えてから出陣しましょう。</p><button class="wide" onclick="closeModal()">戻る</button>`,
    );
    return;
  }
  BATTLE_PARTY_SELECTION = G.owned.slice(0, 6).map((o) => o.id);
  const rows = G.owned
    .map((o) => {
      let sw = sword(o.id),
        checked = BATTLE_PARTY_SELECTION.includes(o.id) ? "checked" : "";
      return `<label class="roster-choice"><input type="checkbox" value="${o.id}" ${checked} onchange="toggleBattleMember('${o.id}',this.checked)"><span>${sw.art} ${sw.name}</span><small>Lv.${o.level || 1} / ${o.condition || "健康"}</small></label>`;
    })
    .join("");
  modalOpen(
    `<h2>出陣準備</h2><section class="paper"><p>出陣先：時の歪み・第一巡回路</p><p>時代・地域：歴史の狭間</p><p>部隊編成：最大6振り（現在 <b id="roster-count">${BATTLE_PARTY_SELECTION.length}</b>/6）</p><div class="roster-select">${rows}</div><p id="roster-warning" class="muted">出陣する刀剣男士を選択してください。</p><p id="roster-strength">合計戦力：${BATTLE_PARTY_SELECTION.reduce((n, id) => n + (owned(id)?.level || 1), 0)}</p></section><button class="wide primary-action" onclick="beginBattle()">出陣する</button><button class="wide" onclick="closeModal()">準備に戻る</button>`,
  );
}
function toggleBattleMember(id, checked) {
  if (checked) {
    if (BATTLE_PARTY_SELECTION.length >= 6) {
      let box = [...document.querySelectorAll(".roster-choice input")].find(
        (x) => x.value === id,
      );
      if (box) box.checked = false;
      let w = $("roster-warning");
      if (w) w.textContent = "部隊に編成できるのは最大6振りです。";
      return;
    }
    if (!BATTLE_PARTY_SELECTION.includes(id)) BATTLE_PARTY_SELECTION.push(id);
  } else
    BATTLE_PARTY_SELECTION = BATTLE_PARTY_SELECTION.filter((x) => x !== id);
  let count = $("roster-count"),
    strength = $("roster-strength"),
    warn = $("roster-warning");
  if (count) count.textContent = BATTLE_PARTY_SELECTION.length;
  if (strength)
    strength.textContent =
      "合計戦力：" +
      BATTLE_PARTY_SELECTION.reduce((n, x) => n + (owned(x)?.level || 1), 0);
  if (warn)
    warn.textContent = BATTLE_PARTY_SELECTION.length
      ? "出陣部隊を確認してください。"
      : "少なくとも1振り選択してください。";
}
function beginBattle() {
  if (!BATTLE_PARTY_SELECTION.length || BATTLE_PARTY_SELECTION.length > 6) {
    let w = $("roster-warning");
    if (w) w.textContent = "1振り以上、6振り以内で編成してください。";
    return;
  }
  let nodes = ["出陣", "第一地点", "第二地点", "第三地点", "ボス地点"];
  BATTLE = {
    nodes,
    index: 0,
    party: BATTLE_PARTY_SELECTION.slice(),
    encounters: 0,
    logs: ["部隊は出陣し、第一巡回路へ向かった。"],
    status: "進軍中",
    loot: { wood: 0, stone: 0, iron: 0, coins: 0 },
    exp: 0,
    injury: 0,
    retreated: false,
    won: false,
  };
  entry(
    "部隊",
    `時の歪み・第一巡回路へ${BATTLE.party.map((id) => sword(id).name).join("、")}の${BATTLE.party.length}振りで出陣した。`,
  );
  save();
  closeModal();
  view = "expedition";
  render();
}
function renderBattleView() {
  if (!BATTLE) {
    view = "actions";
    renderActions();
    return;
  }
  let b = BATTLE,
    partyIds = Array.isArray(b.party)
      ? b.party
      : G.owned.slice(0, 6).map((o) => o.id);
  let map = b.nodes
    .map(
      (n, i) =>
        `<div class="map-node ${i < b.index ? "done" : i === b.index ? "current" : "future"}"><span>${i < b.index ? "✓" : i + 1}</span><small>${n}</small></div>`,
    )
    .join("");
  let party = partyIds
    .map((id) => {
      let o = owned(id);
      return o
        ? `<span class="party-tag">${sword(id).name} Lv.${o.level}</span>`
        : "";
    })
    .join("");
  let actionLabel =
    b.status === "進軍中"
      ? "次の地点へ進軍する"
      : b.status === "戦闘中"
        ? "戦況を進める"
        : b.status === "戦闘後"
          ? "次の地点へ進軍する"
          : "本丸へ帰還する";
  let actionFn =
    b.status === "進軍中"
      ? "advanceBattle()"
      : b.status === "戦闘中"
        ? "battleStep()"
        : b.status === "戦闘後"
          ? "continueBattle()"
          : "returnBattle()";
  let canRetreat = ["進軍中", "戦闘後"].includes(b.status);
  $("app").innerHTML =
    `<h2>進軍記録</h2><section class="paper battle-summary"><p><b>時の歪み・第一巡回路</b>　${b.status}</p><p>地点 ${Math.min(b.index + 1, b.nodes.length)}/${b.nodes.length}　戦闘 ${b.encounters}回　編成 ${partyIds.length}/6振り</p><div class="route-map">${map}</div><div class="party-tags">${party}</div><details class="battle-details"><summary>部隊の健康状態・疲労を確認</summary><div class="details-body">${partyIds
      .map((id) => {
        let o = owned(id);
        return o
          ? `<div class="listitem"><b>${sword(id).name}</b>　Lv.${o.level}<br>状態：${o.condition || "健康"} / 疲労：${o.fatigue}</div>`
          : "";
      })
      .join(
        "",
      )}</div></details></section><section class="paper battle-history"><h3 class="section-title">戦闘・進軍ログ</h3><div id="battle-log-list" aria-live="polite">${b.logs.map((x, i) => `<div class="log ${i === b.logs.length - 1 ? "latest-log" : ""}">${x}</div>`).join("")}</div></section><div class="battle-fixed-controls"><button class="wide primary-action" onclick="${actionFn}">${actionLabel}</button>${canRetreat ? `<div class="row"><button onclick="inspectParty()">部隊詳細</button><button onclick="retreatBattle()">撤退する</button></div>` : ""}</div>`;
  let logbox = $("battle-log-list");
  if (logbox) {
    let latest = logbox.querySelector?.(".latest-log");
    if (latest && latest.scrollIntoView)
      latest.scrollIntoView({ block: "nearest" });
    logbox.scrollTop = logbox.scrollHeight;
  }
}

function advanceBattle() {
  if (!BATTLE || BATTLE.status !== "進軍中") return;
  let b = BATTLE;
  if (b.index < b.nodes.length - 1) b.index++;
  let event =
    b.index === b.nodes.length - 1
      ? "boss"
      : rand(["enemy", "enemy", "resource", "coins", "safe", "special"]);
  if (event === "enemy" || event === "boss") {
    b.encounters++;
    b.status = "戦闘中";
    b.boss = event === "boss";
    b.steps = [
      `敵部隊と遭遇。味方は隊列を整え、状況を確認する。`,
      `${sword(rand((b.party || G.owned.slice(0, 6).map((o) => o.id)).map((id) => ({ id }))).id).name}が連携し、戦況を優位に導いた。`,
      b.boss
        ? "ボス地点の守りを突破し、巡回路の安定を確認した。"
        : "敵部隊は退き、道が開けた。",
    ];
    b.step = 0;
    b.logs.push(
      `${b.nodes[b.index]}：${b.boss ? "ボス部隊" : "敵部隊"}と遭遇した。`,
    );
  } else {
    let msg = "";
    if (event === "resource") {
      b.loot.wood += 40;
      b.loot.stone += 25;
      msg = "資材の入った保管箱を発見。木材40・砥石25を確保した。";
    } else if (event === "coins") {
      b.loot.coins += 30;
      msg = "道中で小判30枚を発見した。";
    } else if (event === "safe") {
      msg = "穏やかな道が続く。部隊は周囲を確認しながら進んだ。";
    } else {
      b.loot.iron += 20;
      msg = "古い記録片を発見。調査の結果、玉鋼20を確保した。";
    }
    b.logs.push(`${b.nodes[b.index]}：${msg}`);
    if (b.index === b.nodes.length - 1) b.status = "帰還待ち";
  }
  save();
  render();
}
function battleStep() {
  let b = BATTLE;
  if (!b || b.status !== "戦闘中") return;
  let line = b.steps[b.step++];
  b.logs.push(line);
  if (b.step >= b.steps.length) {
    b.status = "戦闘後";
    b.exp += 12 + (b.boss ? 25 : 0);
    (b.party || G.owned.slice(0, 6).map((o) => o.id)).forEach((id) => {
      let o = owned(id);
      if (!o) return;
      o.level += b.boss ? 1 : 0;
      o.aff = clamp(o.aff + 2);
      o.trust = o.aff;
      o.fatigue = clamp(o.fatigue + 4);
      if (Math.random() < 0.12) o.condition = "軽傷";
    });
    b.logs.push(
      `戦闘終了。経験値を${b.boss ? 37 : 12}獲得。部隊の連携が深まった。`,
    );
    if (b.boss) {
      b.won = true;
      b.status = "帰還待ち";
      b.logs.push("ボス地点を制圧。特別報酬を確保した。");
      b.loot.coins += 80;
      b.loot.wood += 50;
    }
  }
  save();
  render();
}
function continueBattle() {
  if (!BATTLE) return;
  BATTLE.status = "進軍中";
  BATTLE.logs.push("部隊は次の地点へ進む準備を整えた。");
  save();
  render();
}
function inspectParty() {
  let ids = BATTLE?.party || G.owned.slice(0, 6).map((o) => o.id);
  let html = `<h2>部隊の状態</h2>${ids
    .map((id) => owned(id))
    .filter(Boolean)
    .map(
      (o) =>
        `<section class="paper"><b>${sword(o.id).name}</b><p>Lv.${o.level} / 信頼度 ${o.aff}/100 / 疲労 ${o.fatigue} / 状態 ${o.condition || "健康"}</p></section>`,
    )
    .join(
      "",
    )}<button class="wide" onclick="closeModal()">進軍画面へ戻る</button>`;
  modalOpen(html);
}
function retreatBattle() {
  if (!BATTLE) return;
  BATTLE.retreated = true;
  BATTLE.logs.push("部隊の状態を考慮し、無理をせず撤退を決定した。");
  BATTLE.status = "帰還待ち";
  save();
  render();
}
function returnBattle() {
  if (!BATTLE) return;
  let b = BATTLE;
  G.resources.wood += b.loot.wood;
  G.resources.stone += b.loot.stone;
  G.resources.iron += b.loot.iron;
  G.resources.coins += b.loot.coins;
  G.exp += b.exp;
  (b.party || G.owned.slice(0, 6).map((o) => o.id)).forEach((id) => {
    let o = owned(id);
    if (!o) return;
    o.fatigue = clamp(o.fatigue + 5);
    if (b.retreated && o.condition === "中傷") o.condition = "軽傷";
  });
  entry(
    "部隊",
    `出陣から帰還。経験値${b.exp}、木材${b.loot.wood}、砥石${b.loot.stone}、玉鋼${b.loot.iron}、小判${b.loot.coins}を獲得。${b.retreated ? "途中撤退した。" : b.won ? "ボス地点を制圧した。" : "巡回を終えた。"}`,
  );
  let report = `<h2>出陣結果</h2><p>${b.retreated ? "部隊は安全を優先して帰還した。" : b.won ? "ボス地点を制圧し、無事帰還した。" : "巡回を終えて帰還した。"}</p><section class="paper"><p>経験値：${b.exp}</p><p>木材：${b.loot.wood} / 砥石：${b.loot.stone} / 玉鋼：${b.loot.iron} / 小判：${b.loot.coins}</p><p>戦闘回数：${b.encounters}</p><p>疲労・状態は刀帳から確認できます。</p></section><h3>出陣中の出来事</h3>${b.logs.map((x) => `<div class="log">${x}</div>`).join("")}<button class="wide" onclick="finishBattle()">本丸へ戻る</button>`;
  BATTLE = null;
  consume();
  save();
  modalOpen(report);
  view = "home";
}
function finishBattle() {
  closeModal();
  setView("home");
}
function battleResolve(risky) {
  beginBattle();
}
function affinityChoice(id, threshold, choice) {
  let o = owned(id),
    s = sword(id);
  if (!o.milestones) o.milestones = [];
  if (!o.milestones.includes(threshold)) o.milestones.push(threshold);
  let replies = [
    "「こちらこそ、ありがとう。これからもよろしく頼む。」",
    "「はは、無理に言葉にしなくてもいいさ。」",
    "「了解。必要なときにまた話そう。」",
  ];
  entry(s.name, `信頼度${threshold}の節目：${replies[choice]}`);
  save();
  modalOpen(
    `<div class="portrait">${s.art}</div><h2>${s.name}</h2><p>${replies[choice]}</p><button class="wide" onclick="closeModal()">本丸へ戻る</button>`,
  );
}
function advanceSeason() {
  let prev = G.season;
  G.season = seasons[(seasons.indexOf(G.season) + 1) % 4];
  G.actions = G.maxActions;
  G.dayAction = 0;
  if (prev === "冬") {
    G.age += 2;
    G.year += 2;
    if (G.age > 30) {
      G.rank.acts = Math.max(2, G.rank.acts - 1);
      G.maxActions = Math.max(2, G.maxActions - 1);
    }
  }
  save();
  closeModal();
  render();
  let ov = document.createElement("div");
  ov.className = "season-overlay";
  ov.textContent = seasonEmoji[G.season] + " " + G.season;
  document.body.append(ov);
  setTimeout(() => ov.remove(), 1800);
}

// v8.1: 行動消費の重複防止、特殊会話、進軍中セーブ
function action(name) {
  if (G.actions <= 0) {
    modalOpen(
      `<h2>行動回数が尽きた</h2><p>季節を進めて休息を取りましょう。</p><button class="wide" onclick="advanceSeason()">季節を進める</button>`,
    );
    return;
  }
  if (name === "休息・万屋") {
    rest();
    return;
  }
  if (name === "鍛刀") {
    forge();
    return;
  }
  if (name === "内番") {
    duty();
    return;
  }
  if (name === "出陣") {
    combat();
    return;
  }
  if (name === "遠征") expedition();
  else if (name === "演練") training();
  consume();
  save();
  setView("journal");
}
function save() {
  if (G) {
    normalizeTrust();
    G.battle = BATTLE || null;
    localStorage.setItem("hanomanimani_v3", JSON.stringify(G));
  }
}
function continueGame() {
  G = load();
  if (!G) {
    renderTitle();
    return;
  }
  BATTLE = G.battle || null;
  save();
  view = BATTLE ? "expedition" : G.phase === "home" ? "home" : G.phase;
  render();
  scrollTop();
}
function resetGame() {
  localStorage.removeItem("hanomanimani_v3");
  G = null;
  BATTLE = null;
  TALK_TARGET = null;
  view = "title";
  $("modal").hidden = true;
  render();
  scrollTop();
}
function renderStatus() {
  G.owned = Array.isArray(G.owned) ? G.owned : [];
  G.resources = G.resources || {
    wood: 0,
    stone: 0,
    iron: 0,
    coal: 0,
    coins: 0,
  };
  G.rank = G.rank || { flower: "桜", r: "B" };
  let a = G.owned.find((x) => x.id === G.adjutant),
    s = a ? sword(a.id) : null;
  $("status").className = "status" + (folded ? " folded" : "");
  $("status").innerHTML =
    `<div class="statgrid"><div class="stat">就任 ${G.year}年目 / ${G.age}歳</div><div class="stat">${seasonEmoji[G.season]} ${G.season}</div><div class="stat">審神者Lv.${G.level}</div><div class="stat">霊力 ${G.rank.flower}(${G.rank.r})</div><div class="stat">本丸 ${G.black > 60 ? "黒寄り" : G.black < 15 ? "穏やか" : "中立"} ${G.black}</div><div class="stat">木 ${G.resources.wood} 石 ${G.resources.stone}</div><div class="stat">鉄 ${G.resources.iron} 炭 ${G.resources.coal} 小判 ${G.resources.coins}</div><div class="stat">近侍 ${s ? s.name : "未設定"} / 行動 ${G.actions}/${G.maxActions}</div></div>`;
}
const CROSS_TALKS = [
  {
    a: "mikazuki",
    b: "tsuru",
    title: "月夜の趣向",
    line: "三日月と鶴丸が、縁側で月見の席に小さな趣向を添えようと相談している。",
    reply:
      "三日月「さて、どのような席になるか楽しみだな」　鶴丸「驚きは控えめに、皆が喜ぶものにしよう」",
  },
  {
    a: "chougi",
    b: "kunihiro",
    title: "記録と稽古",
    line: "長義と山姥切が、稽古の記録を見ながら改善点を話し合っている。",
    reply:
      "長義「記録を見れば、次に何をすべきか分かる」　山姥切「……ああ。次の稽古に活かそう」",
  },
  {
    a: "yagen",
    b: "fudou",
    title: "休憩のすすめ",
    line: "薬研が不動に休憩を勧め、二振りで温かい茶を用意している。",
    reply: "薬研「無理は禁物だぜ」　不動「うん。今日は少しゆっくりしてみるよ」",
  },
  {
    a: "kasen",
    b: "jikkyu",
    title: "季節の献立",
    line: "歌仙と実休が、旬の食材を使った献立を考えている。",
    reply:
      "歌仙「季節を味わう献立にしよう」　実休「皆がほっとできる食卓にしたいね」",
  },
];
function openCrossTalk(id) {
  let pairs = CROSS_TALKS.filter(
    (x) => (x.a === id && owned(x.b)) || (x.b === id && owned(x.a)),
  );
  if (!pairs.length) {
    modalOpen(
      `<h2>特別な会話</h2><p>この刀と特別な会話をする相手は、まだ本丸にいないようです。</p><button class="wide" onclick="openTalk()">戻る</button>`,
    );
    return;
  }
  let p = rand(pairs);
  entry("本丸", `特殊会話「${p.title}」：${p.line}`);
  G.owned
    .filter((o) => o.id === p.a || o.id === p.b)
    .forEach((o) => {
      o.aff = clamp(o.aff + 2);
      o.trust = o.aff;
    });
  save();
  modalOpen(
    `<h2>${p.title}</h2><p>${p.line}</p><p class="dialog-line">${p.reply}</p><p>二振りの信頼度がそれぞれ2上がった。</p><button class="wide" onclick="closeModal()">本丸へ戻る</button>`,
  );
}
// 通常会話画面に、所持状況に応じた刀同士の特殊会話入口を追加
const _v8OpenTalk = openTalk;
function openTalk() {
  let id = TALK_TARGET || G.adjutant,
    s = sword(id);
  if (!s || !owned(id)) return;
  let o = owned(id),
    m = milestoneFor(o);
  if (m !== null) {
    showAffinityEvent(s, o, m);
    return;
  }
  let topics = s.talk.topics;
  modalOpen(
    `<div class="portrait">${s.art}</div><h2>${s.name}との語らい</h2><p class="dialog-line">${ageIntro(s.talk.intro)}</p><h3>話題を選ぶ</h3><div class="choice">${topics.map((t, i) => `<button onclick="talkTopic(${i})">${t.title}</button>`).join("")}</div><button class="wide" onclick="openCrossTalk('${id}')">刀剣男士同士の特別会話</button><button class="wide" onclick="closeModal()">今日はここまで</button>`,
  );
}

// キャラクター追加データを一元参照し、既存刀も含めて会話・個別記録を拡張
const CHARACTER_DETAILS = {
  kashu: {
    clan: "加州",
    first: "俺",
    master: "主",
    others: "名前で呼ぶ",
    strong: "気配り・身だしなみ",
    weak: "細かな評価を気にしやすい",
  },
  kasen: {
    clan: "之定",
    first: "僕",
    master: "君",
    others: "名で呼ぶ",
    strong: "文芸・内番",
    weak: "無粋な振る舞い",
  },
  mutsuu: {
    clan: "陸奥守",
    first: "わし",
    master: "主",
    others: "名で呼ぶ",
    strong: "開拓・遠征",
    weak: "古いやり方に固執すること",
  },
  kunihiro: {
    clan: "堀川",
    first: "俺",
    master: "あんた",
    others: "名で呼ぶ",
    strong: "稽古・見回り",
    weak: "自分を過小評価しがち",
  },
  honey: {
    clan: "虎徹",
    first: "俺",
    master: "君",
    others: "名で呼ぶ",
    strong: "装備点検・公平な分担",
    weak: "不公平な扱い",
  },
  hasebe: {
    clan: "長谷部",
    first: "俺",
    master: "主",
    others: "名で呼ぶ",
    strong: "事務・調整",
    weak: "主の負担を見過ごすこと",
  },
  jikkyu: {
    clan: "光忠",
    first: "僕",
    master: "君",
    others: "名で呼ぶ",
    strong: "休息・園芸",
    weak: "誰かが無理をすること",
  },
  tsuru: {
    clan: "五条",
    first: "俺",
    master: "君",
    others: "名で呼ぶ",
    strong: "企画・発想",
    weak: "誰かを傷つける驚き",
  },
  mikazuki: {
    clan: "三条",
    first: "俺",
    master: "主",
    others: "名で呼ぶ",
    strong: "見守り・古い記録",
    weak: "急かされること",
  },
  chougi: {
    clan: "長船",
    first: "僕",
    master: "君",
    others: "名で呼ぶ",
    strong: "分析・記録",
    weak: "曖昧な判断",
  },
  yagen: {
    clan: "粟田口",
    first: "俺",
    master: "大将",
    others: "名で呼ぶ",
    strong: "相談・備品管理",
    weak: "仲間の無理",
  },
  fudou: {
    clan: "織田",
    first: "俺",
    master: "あんた",
    others: "名で呼ぶ",
    strong: "観察・細かな手仕事",
    weak: "急な変化や無理強い",
  },
};
const EXTRA_EVENT_SETS = {
  kashu: [
    ["新しい髪飾り", "加州が新しい髪飾りを試している。", "どう？似合ってる？"],
    [
      "道具の手入れ",
      "加州と手入れ道具を磨いた。",
      "こういう時間も大切だよね。",
    ],
    [
      "廊下の飾り",
      "加州が廊下の飾りつけを考えている。",
      "本丸も可愛くしていこうよ。",
    ],
    [
      "皆への気配り",
      "加州が皆の様子を気にかけている。",
      "困ってることがあったら教えてね。",
    ],
    [
      "出陣前の確認",
      "加州と出陣前の装備を確認した。",
      "準備はばっちり。格好よく行こう。",
    ],
    [
      "小さな贈り物",
      "加州が手作りの小物を見せてくれた。",
      "気に入ってくれると嬉しいな。",
    ],
  ],
  kasen: [
    [
      "花器選び",
      "歌仙と花を生ける器を選んだ。",
      "花と器の取り合わせも風雅のうちだ。",
    ],
    [
      "短冊の言葉",
      "歌仙が季節の言葉を短冊にしたためている。",
      "言葉を選ぶ時間もまた、趣深い。",
    ],
    [
      "茶菓子の相談",
      "歌仙と茶菓子の献立を考えた。",
      "甘さにも季節を映したいものだ。",
    ],
    [
      "庭の小径",
      "歌仙と庭の小径を整えた。",
      "歩くたびに景色が変わるようだね。",
    ],
    [
      "書の稽古",
      "歌仙が筆の運びを教えてくれた。",
      "一画ずつ丁寧に。焦る必要はない。",
    ],
    [
      "季節の便り",
      "歌仙と季節の便りをまとめた。",
      "記録に残せば、後からも味わえる。",
    ],
  ],
  mutsuu: [
    ["新しい畑", "陸奥守と畑の区画を考えた。", "こりゃあ収穫が楽しみじゃ！"],
    [
      "遠征の土産話",
      "陸奥守が遠征先の話を聞かせてくれた。",
      "外にはまだまだ知らんことがあるぜよ。",
    ],
    [
      "道具の改良",
      "陸奥守と道具の使い勝手を見直した。",
      "工夫すりゃあ、もっと便利になるき。",
    ],
    [
      "皆の案",
      "陸奥守が皆の改善案を集めている。",
      "知恵を出し合うのは面白いのう。",
    ],
    ["朝の体操", "陸奥守と朝の軽い運動をした。", "今日も元気に始めるぜよ！"],
    [
      "新しい地図",
      "陸奥守が新しい地図を広げている。",
      "次はどこへ行こうかのう。",
    ],
  ],
  kunihiro: [
    ["布の補修", "山姥切と布のほつれを直した。", "これでまた安心して使える。"],
    [
      "稽古相手",
      "山姥切と稽古の予定を立てた。",
      "互いに無理のない内容にしよう。",
    ],
    [
      "本丸の巡回",
      "山姥切と本丸の隅々を確認した。",
      "皆が安心して過ごせるように。",
    ],
    [
      "記録の整理",
      "山姥切が稽古の記録を整理している。",
      "積み重ねを確かめるのは大切だ。",
    ],
    ["静かな読書", "山姥切と書庫で本を読んだ。", "……静かな時間も悪くない。"],
    [
      "当番の相談",
      "山姥切と当番の分担を相談した。",
      "皆の負担が偏らないようにしたい。",
    ],
  ],
  honey: [
    [
      "手入れの心得",
      "蜂須賀が道具の手入れについて話してくれた。",
      "丁寧に扱えば、長く応えてくれる。",
    ],
    [
      "当番表の改訂",
      "蜂須賀と当番表を見直した。",
      "公平さは、日々の確認から生まれる。",
    ],
    [
      "庭の花壇",
      "蜂須賀と花壇の手入れをした。",
      "美しいものを守るのも務めだ。",
    ],
    [
      "虎徹の誇り",
      "蜂須賀が虎徹の名に込めた思いを語った。",
      "誇りは、日々の行いで示すものだ。",
    ],
    [
      "装備の相談",
      "蜂須賀と装備の使い心地を確認した。",
      "細かな違和感も見逃さないことだ。",
    ],
    [
      "皆の意見",
      "蜂須賀が皆の意見を公平に聞いている。",
      "誰の声も軽んじるべきではない。",
    ],
  ],
  hasebe: [
    [
      "予定表の整理",
      "長谷部と本丸の予定表を整理した。",
      "優先順位を明確にいたしましょう。",
    ],
    [
      "備品の補充",
      "長谷部が不足している備品を報告した。",
      "早めに手配しておきます。",
    ],
    [
      "皆への連絡",
      "長谷部と皆への連絡事項をまとめた。",
      "伝達漏れがないよう確認します。",
    ],
    [
      "仕事の区切り",
      "長谷部が休憩の時間を提案してきた。",
      "集中を保つためにも必要です。",
    ],
    [
      "書類の保管",
      "長谷部と大切な書類を整理した。",
      "後から探しやすい形にしておきます。",
    ],
    [
      "主の相談",
      "長谷部が本丸運営の相談に乗ってくれた。",
      "主の判断を支えるのが俺の役目です。",
    ],
  ],
  jikkyu: [
    [
      "庭の手入れ",
      "実休と庭の草花を手入れした。",
      "少しずつ育つ様子を見るのは楽しいね。",
    ],
    [
      "お茶の香り",
      "実休と茶葉の香りを比べた。",
      "香りだけでも気持ちが和らぐね。",
    ],
    [
      "季節の苗",
      "実休が季節に合う苗を選んでいる。",
      "育つ時間も一緒に楽しもう。",
    ],
    [
      "休息の場所",
      "実休と休みやすい場所を整えた。",
      "ほっとできる場所があるといいね。",
    ],
    [
      "食卓の花",
      "実休が食卓に小さな花を飾った。",
      "いつもの景色が少し明るくなるね。",
    ],
    [
      "皆の様子",
      "実休が皆の様子を穏やかに見守っている。",
      "それぞれのペースを大切にしたいね。",
    ],
  ],
  tsuru: [
    [
      "小さな仕掛け",
      "鶴丸と皆が笑える小さな仕掛けを考えた。",
      "さて、どんな反応が返ってくるかな。",
    ],
    [
      "庭の散策",
      "鶴丸と庭を歩き、隠れた景色を探した。",
      "見慣れた場所にも驚きはある。",
    ],
    [
      "飾りの準備",
      "鶴丸が季節の飾りを用意している。",
      "気づいた時に嬉しくなる仕掛けがいい。",
    ],
    [
      "昔の驚き",
      "鶴丸が昔の出来事を語ってくれた。",
      "予想外のことほど、記憶に残るものだ。",
    ],
    [
      "皆の企画",
      "鶴丸と皆で楽しめる企画を考えた。",
      "一人より大勢の方が面白いこともある。",
    ],
    [
      "白い布",
      "鶴丸が白い布を使った飾りを作っている。",
      "さて、どこに置けば驚くかな。",
    ],
  ],
};
SWORDS.forEach((s) => {
  const d = CHARACTER_DETAILS[s.id] || {};
  Object.assign(s, {
    clan: d.clan || "不詳",
    firstPerson: d.first || "俺",
    saniwaCall: d.master || "主",
    othersCall: d.others || "名で呼ぶ",
    strength: d.strong || "協力・見守り",
    weakness: d.weak || "無理を重ねること",
    initialStats: { level: 1, trust: 30, fatigue: 0 },
  });
  let list = PERSONAL_EVENTS[s.id] || (PERSONAL_EVENTS[s.id] = []);
  (EXTRA_EVENT_SETS[s.id] || []).forEach((ev) => list.push(ev));
  while (list.length < 10) {
    let n = list.length + 1;
    list.push([
      `本丸での出来事 ${n}`,
      `${s.name}と本丸で小さな仕事を進めた。`,
      `今日の積み重ねも、きっと次につながる。`,
    ]);
  }
  s.events = list;
  s.talk.topics = s.talk.topics || [];
  while (s.talk.topics.length < 10) {
    let idx = s.talk.topics.length;
    let ev = list[idx % list.length];
    s.talk.topics.push({
      title: ev[0],
      choices: [
        { text: "その話をもっと聞かせて", reply: ev[2], aff: 7 },
        { text: "一緒に取り組もう", reply: `${ev[1]} ${s.lines.duty}`, aff: 8 },
        {
          text: "日誌に記録しておこう",
          reply: "ああ。今日のことを忘れないように残しておこう。",
          aff: 6,
        },
      ],
    });
  }
});
