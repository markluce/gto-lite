export const sections = [
  {
    id: "intro",
    title: "GTO 是什麼？",
    icon: "🎯",
    color: "#22c55e",
  },
  {
    id: "setup",
    title: "標準牌桌設定",
    icon: "🪑",
    color: "#3498db",
  },
  {
    id: "preflop",
    title: "Preflop 開局範圍",
    icon: "🃏",
    color: "#e74c3c",
  },
  {
    id: "terms",
    title: "GTO 核心術語",
    icon: "📖",
    color: "#f39c12",
  },
  {
    id: "example",
    title: "經典牌例分析",
    icon: "♠️",
    color: "#9b59b6",
  },
  {
    id: "philosophy",
    title: "GTO 核心哲學",
    icon: "🧠",
    color: "#27ae60",
  },
];

export const introContent = {
  question:
    "如果一群完全理性、完全不會犯錯的玩家坐在一桌撲克桌前，他們會怎麼打牌？",
  answer:
    "那個桌子就像一個小型經濟模型。每個人都在做「數學上不可被剝削（unexploitable）」的決策。沒有情緒、沒有 tilt，只有機率與策略平衡。",
  fullName: "Game Theory Optimal",
};

export const tableSetup = {
  format: "6-Max No-Limit Hold'em Cash Game",
  conditions: [
    { label: "桌型", value: "6人桌 (6-max)" },
    { label: "有效籌碼", value: "100BB" },
    { label: "Ante", value: "無（或 small ante）" },
    { label: "Small Blind", value: "0.5BB" },
    { label: "Big Blind", value: "1BB" },
  ],
  positions: [
    { name: "UTG", full: "Under The Gun", order: 1, color: "#e74c3c" },
    { name: "MP", full: "Middle Position", order: 2, color: "#e67e22" },
    { name: "CO", full: "Cutoff", order: 3, color: "#f39c12" },
    { name: "BTN", full: "Button", order: 4, color: "#27ae60" },
    { name: "SB", full: "Small Blind", order: 5, color: "#3498db" },
    { name: "BB", full: "Big Blind", order: 6, color: "#9b59b6" },
  ],
  reason: "100BB + 6max = 最穩定的策略空間",
};

export const preflopRanges = [
  {
    position: "UTG",
    percentage: "~15%",
    color: "#e74c3c",
    description: "非常緊。因為後面還有五個人。",
    hands: [
      "AA–77",
      "AK, AQ, AJ",
      "KQ",
      "A5s–A2s",
      "KJs",
      "QJs",
      "JTs",
      "T9s",
    ],
  },
  {
    position: "CO",
    percentage: "~27–30%",
    color: "#f39c12",
    description: "加入更多 suited connector、KTs / QTs、小 pocket pair。",
    hands: [
      "UTG 所有牌 +",
      "66–22",
      "KTs, QTs",
      "J9s, T8s, 98s",
      "A9o, KJo",
      "更多 suited connector",
    ],
  },
  {
    position: "BTN",
    percentage: "~45–50%",
    color: "#27ae60",
    description: "因為只剩兩個人。開非常寬。",
    hands: [
      "幾乎所有 suited ace",
      "大部分 suited king",
      "多數 connector",
      "一些 offsuit broadway",
      "所有 pocket pair",
    ],
  },
  {
    position: "SB",
    percentage: "混合策略",
    color: "#3498db",
    description: "GTO solver 有兩種打法。",
    strategies: [
      {
        name: "混合策略",
        detail: "Raise + Limp + Fold。很多 solver 喜歡 SB 大量 limp。",
      },
      {
        name: "純 Raise",
        detail: "簡化策略：SB open 3BB，不 limp。",
      },
    ],
  },
];

export const gtoTerms = [
  {
    term: "EV",
    fullName: "Expected Value（期望值）",
    color: "#22c55e",
    definition: "長期平均贏多少。GTO 的目標：最大化 EV，同時避免被 exploit。",
    formula: null,
    example: "如果一個 call 的 EV = +2BB，代表長期每次這樣做平均贏 2BB。",
  },
  {
    term: "Range",
    fullName: "範圍",
    color: "#3498db",
    definition: "不是一手牌，是所有可能的牌集合。GTO 是 range vs range，不是 hand vs hand。",
    formula: null,
    example: "BTN range 可能是：A2s+, K7s+, Q9s+, JTs, 22+",
  },
  {
    term: "Solver",
    fullName: "求解器",
    color: "#9b59b6",
    definition: "用來算 GTO 策略的軟體。本質在做 Nash equilibrium approximation。",
    formula: null,
    example: "PioSolver、GTO Wizard、Monker、Simple Postflop",
  },
  {
    term: "Mixed Strategy",
    fullName: "混合策略",
    color: "#e67e22",
    definition: "GTO 不會每次都做同一件事。同一手牌在同一個 spot，有時 bet 有時 check。",
    formula: null,
    example: "AK 在某個 spot：bet 70% / check 30%。避免策略被 exploit。",
  },
  {
    term: "Polarized Range",
    fullName: "極化範圍",
    color: "#e74c3c",
    definition: "Range 分成兩端：超強牌 + 純 bluff。中間牌不下注。",
    formula: null,
    example: "River overbet：要嘛 nuts，要嘛空氣牌。",
  },
  {
    term: "Linear Range",
    fullName: "線性範圍",
    color: "#27ae60",
    definition: "強到弱依序下注：AA → KK → QQ → JJ → TT⋯⋯",
    formula: null,
    example: "常見於 preflop 3bet。",
  },
  {
    term: "MDF",
    fullName: "Minimum Defense Frequency（最小防守頻率）",
    color: "#f39c12",
    definition: "你至少要 defend 多少 range，不然對手 any two cards bluff 都賺。",
    formula: "MDF = Pot / (Pot + Bet)",
    example: "Pot = 100，對手 bet 100 → MDF = 100/200 = 50%。你至少要 defend 50% range。",
  },
  {
    term: "Blocker",
    fullName: "阻斷牌",
    color: "#9b59b6",
    definition: "手上的牌阻擋對手強牌組合，讓 bluff 成功率更高。",
    formula: null,
    example: "你有 A♠K♦ → 對手少了很多 AA、AK 組合。",
  },
  {
    term: "Nut Advantage",
    fullName: "堅果優勢",
    color: "#e74c3c",
    definition: "誰的 range 有最多 nuts（最強牌）。",
    formula: null,
    example: "BTN vs BB，Flop: AKQ → BTN 有更多 AK、AQ、KK → BTN 有 nut advantage。",
  },
  {
    term: "Range Advantage",
    fullName: "範圍優勢",
    color: "#3498db",
    definition: "整體平均強度更高。不只是 nuts，而是整個 range 的 equity 更高。",
    formula: null,
    example: "BTN open → BB call → 多數 flop BTN 有 range advantage。",
  },
];

export const classicExample = {
  setup: {
    stacks: "100BB",
    positions: "BTN vs BB",
    action: "BTN open 2.5BB → BB call",
    pot: "5.5BB",
  },
  flop: {
    cards: ["K♣", "7♦", "2♠"],
    description: "乾燥面（dry board）",
  },
  strategy: {
    btn: {
      action: "高頻小下注 — 25% pot",
      reason: "BTN 有 range advantage",
      detail: "這種小 bet 被叫做 range bet strategy。BTN 幾乎用整個 range 下注一個小的尺寸。",
    },
    bb: {
      actions: ["Call 很多", "Raise 少量", "Fold 一些 air"],
      reason: "BB 的 range 較弱，但在這個 size 下必須大量 defend。",
    },
  },
};

export const philosophy = {
  core: "讓對手無法找到穩定剝削你的方式",
  meaning: "不管對手怎麼調整，你都不會被打爆。",
  paradox: {
    title: "現實世界撲克的有趣悖論",
    content: "最賺錢的打法不是 GTO。最賺錢的是：Exploit + GTO baseline。",
    detail: "先有 GTO 做底，再去 exploit 魚。",
  },
  exploits: [
    { condition: "對手 overfold", action: "多 bluff" },
    { condition: "對手 overcall", action: "少 bluff" },
  ],
  metaphor: {
    gto: "GTO 是物理定律",
    exploit: "Exploit 是賺錢工程學",
  },
  deeper: [
    "GTO 最標準 3bet size",
    "為什麼 solver 喜歡 25% flop bet",
    "為什麼 A5s 是神牌",
    "為什麼 KQo 在 UTG 不能開",
  ],
  closing: "撲克桌就是一個六人博弈宇宙。",
};
