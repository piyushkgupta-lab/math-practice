// Math question generator for ICSE Grade 5 & Grade 7
// Returns questions with: { topic, text, options[4], correctIndex, answerText }

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
const shuffle = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Build a 4-option question from correct answer + distractors.
// Guarantees 4 unique options; adds fallback distractors if there are collisions.
function buildQ(topic, text, correct, distractors) {
  const correctStr = String(correct);
  const seen = new Set([correctStr]);
  const uniqueDistractors = [];
  for (const d of distractors) {
    const s = String(d);
    if (!seen.has(s)) {
      seen.add(s);
      uniqueDistractors.push(s);
    }
  }
  // Fallback: if we don't have 3 unique distractors, generate safe ones
  // by nudging the correct answer numerically. Works for integers, decimals,
  // and things like "42 cm" / "₹500" by editing the leading number.
  let attempts = 0;
  while (uniqueDistractors.length < 3 && attempts < 20) {
    attempts++;
    const nudge = attempts + (attempts % 2 === 0 ? 1 : -1) * Math.ceil(attempts / 2);
    const candidate = correctStr.replace(/(-?\d+\.?\d*)/, (m) => {
      const n = parseFloat(m);
      if (Number.isInteger(n)) return String(n + nudge);
      return (n + nudge * 0.1).toFixed(1);
    });
    if (!seen.has(candidate) && candidate !== correctStr) {
      seen.add(candidate);
      uniqueDistractors.push(candidate);
    }
  }
  const all = shuffle([correctStr, ...uniqueDistractors.slice(0, 3)]);
  const correctIndex = all.indexOf(correctStr);
  return {
    topic,
    text,
    options: all,
    correctIndex,
    answerText: correctStr
  };
}

// ============ GRADE 5 GENERATORS ============

const g5 = {
  arithmetic() {
    const type = rand(1, 5);
    if (type === 1) {
      // Multi-digit addition
      const a = rand(100, 9999), b = rand(100, 9999);
      return buildQ('Arithmetic', `${a} + ${b} = ?`, a + b, [a + b + rand(1, 9), a + b - rand(1, 9), a + b + 100]);
    }
    if (type === 2) {
      // Subtraction
      const a = rand(1000, 9999), b = rand(100, a - 1);
      return buildQ('Arithmetic', `${a} − ${b} = ?`, a - b, [a - b + rand(1, 9), a - b - rand(1, 9), a - b - 10]);
    }
    if (type === 3) {
      // Multiplication 2-digit × 1 or 2 digit
      const a = rand(12, 99), b = rand(3, 12);
      return buildQ('Arithmetic', `${a} × ${b} = ?`, a * b, [a * b + b, a * b - b, a * b + a]);
    }
    if (type === 4) {
      // Division (clean)
      const b = rand(2, 12), ans = rand(5, 50);
      const a = b * ans;
      return buildQ('Arithmetic', `${a} ÷ ${b} = ?`, ans, [ans + 1, ans - 1, ans + 2]);
    }
    // Order of operations (simple)
    const a = rand(2, 9), b = rand(2, 9), c = rand(2, 9);
    const ans = a + b * c;
    return buildQ('Arithmetic', `${a} + ${b} × ${c} = ?`, ans, [(a + b) * c, ans + 1, ans - 2]);
  },

  fractions() {
    const type = rand(1, 4);
    if (type === 1) {
      // Add fractions with same denominator
      const d = pick([4, 5, 6, 8, 10]);
      const a = rand(1, d - 2), b = rand(1, d - a - 1);
      const num = a + b;
      const g = gcd(num, d);
      const correct = g === d ? '1' : `${num / g}/${d / g}`;
      return buildQ('Fractions', `${a}/${d} + ${b}/${d} = ?`, correct, [
        `${a + b}/${d * 2}`,
        `${num + 1}/${d}`,
        `${num}/${d + 1}`
      ]);
    }
    if (type === 2) {
      // Simplest form
      const g = pick([2, 3, 4]);
      const n = rand(2, 6), dn = rand(n + 1, 9);
      if (gcd(n, dn) !== 1) return g5.fractions();
      const num = n * g, den = dn * g;
      const correct = `${n}/${dn}`;
      return buildQ('Fractions', `Simplify: ${num}/${den}`, correct, [
        `${num}/${den}`,
        `${n + 1}/${dn}`,
        `${n}/${dn + 1}`
      ]);
    }
    if (type === 3) {
      // Decimal addition
      const a = (rand(10, 99) / 10).toFixed(1);
      const b = (rand(10, 99) / 10).toFixed(1);
      const ans = (parseFloat(a) + parseFloat(b)).toFixed(1);
      return buildQ('Decimals', `${a} + ${b} = ?`, ans, [
        (parseFloat(ans) + 0.1).toFixed(1),
        (parseFloat(ans) - 0.1).toFixed(1),
        (parseFloat(ans) + 1).toFixed(1)
      ]);
    }
    // Fraction to decimal (simple)
    const pairs = [['1/2', '0.5'], ['1/4', '0.25'], ['3/4', '0.75'], ['1/5', '0.2'], ['2/5', '0.4'], ['1/10', '0.1']];
    const [frac, dec] = pick(pairs);
    return buildQ('Decimals', `Write ${frac} as a decimal`, dec, ['0.125', '0.15', '0.05'].filter(x => x !== dec).slice(0, 3));
  },

  percentages() {
    const type = rand(1, 3);
    if (type === 1) {
      // Simple % of a number
      const p = pick([10, 20, 25, 50]);
      const n = pick([40, 60, 80, 100, 200, 400]);
      const ans = (p * n) / 100;
      return buildQ('Percentages', `What is ${p}% of ${n}?`, ans, [ans + 5, ans - 5, ans * 2]);
    }
    if (type === 2) {
      // Simple ratio — make sure ratio is not 1:1 and distractors are clean
      const k = rand(2, 5);
      const a = rand(2, 5) * k, b = rand(2, 5) * k;
      if (a === b) return g5.percentages();
      const g = gcd(a, b);
      const correct = `${a / g}:${b / g}`;
      return buildQ('Ratios', `Simplest form of ratio ${a} : ${b}`, correct, [
        `${a}:${b}`,
        `${a / g + 1}:${b / g}`,
        `${a / g}:${b / g + 1}`
      ]);
    }
    // Fraction to %
    const pairs = [['1/2', '50%'], ['1/4', '25%'], ['3/4', '75%'], ['1/5', '20%'], ['1/10', '10%']];
    const [frac, ans] = pick(pairs);
    return buildQ('Percentages', `${frac} as a percentage is`, ans, ['15%', '30%', '40%'].filter(x => x !== ans).slice(0, 3));
  },

  geometry() {
    const type = rand(1, 4);
    if (type === 1) {
      // Perimeter of rectangle
      const l = rand(4, 20), w = rand(3, 15);
      const ans = 2 * (l + w);
      return buildQ('Geometry', `Perimeter of a rectangle with length ${l} cm and width ${w} cm`, `${ans} cm`, [
        `${l * w} cm`, `${l + w} cm`, `${ans + 2} cm`
      ]);
    }
    if (type === 2) {
      // Area of rectangle
      const l = rand(4, 15), w = rand(3, 12);
      const ans = l * w;
      return buildQ('Geometry', `Area of a rectangle ${l} cm × ${w} cm`, `${ans} cm²`, [
        `${2 * (l + w)} cm²`, `${ans + l} cm²`, `${ans - w} cm²`
      ]);
    }
    if (type === 3) {
      // Angles of a triangle
      const a = rand(30, 70), b = rand(30, 100);
      const ans = 180 - a - b;
      if (ans <= 0) return g5.geometry();
      return buildQ('Geometry', `Two angles of a triangle are ${a}° and ${b}°. The third angle is?`, `${ans}°`, [
        `${ans + 10}°`, `${ans - 10}°`, `${180 - a}°`
      ]);
    }
    // Square perimeter
    const s = rand(5, 20);
    return buildQ('Geometry', `Perimeter of a square with side ${s} cm`, `${4 * s} cm`, [
      `${s * s} cm`, `${3 * s} cm`, `${2 * s} cm`
    ]);
  },

  algebra() {
    // Simple missing number
    const type = rand(1, 3);
    if (type === 1) {
      const x = rand(3, 20), b = rand(5, 30);
      return buildQ('Algebra', `If x + ${b} = ${x + b}, what is x?`, x, [x + 1, x - 1, x + 2]);
    }
    if (type === 2) {
      const x = rand(3, 12), k = rand(2, 6);
      return buildQ('Algebra', `If ${k}x = ${k * x}, what is x?`, x, [x + 1, x + 2, x - 2]);
    }
    const x = rand(10, 40), b = rand(3, 15);
    return buildQ('Algebra', `If x − ${b} = ${x - b}, what is x?`, x, [x + 1, x - 1, x + 2]);
  },

  wordProblems() {
    const type = rand(1, 4);
    if (type === 1) {
      const apples = rand(5, 15), cost = rand(8, 30);
      return buildQ('Word Problem',
        `Riya buys ${apples} apples at ₹${cost} each. How much does she pay?`,
        `₹${apples * cost}`,
        [`₹${apples + cost}`, `₹${apples * cost + 10}`, `₹${apples * cost - 5}`]);
    }
    if (type === 2) {
      const pages = rand(80, 250), read = rand(20, 60);
      return buildQ('Word Problem',
        `A book has ${pages} pages. Arjun has read ${read} pages. How many pages are left?`,
        pages - read,
        [pages + read, pages - read - 1, read]);
    }
    if (type === 3) {
      const total = rand(5, 20) * 6, groups = 6;
      return buildQ('Word Problem',
        `${total} chocolates are shared equally among ${groups} children. Each child gets?`,
        total / groups,
        [total / 2, total - groups, total / groups + 1]);
    }
    const start = rand(100, 500), saved = rand(50, 200);
    return buildQ('Word Problem',
      `Priya had ₹${start}. Her mother gave her ₹${saved} more. How much does she have now?`,
      `₹${start + saved}`,
      [`₹${start - saved}`, `₹${start + saved + 10}`, `₹${saved}`]);
  }
};

// ============ GRADE 7 GENERATORS ============

const g7 = {
  arithmetic() {
    const type = rand(1, 5);
    if (type === 1) {
      // Integer ops (with negatives)
      const a = rand(-50, 50), b = rand(-50, 50);
      if (a === 0 || b === 0) return g7.arithmetic();
      return buildQ('Integers', `(${a}) + (${b}) = ?`, a + b, [a + b + 1, a + b - 1, a - b]);
    }
    if (type === 2) {
      const a = rand(-30, 30), b = rand(-30, 30);
      if (b === 0 || a === 0) return g7.arithmetic();
      return buildQ('Integers', `(${a}) − (${b}) = ?`, a - b, [a - b + 1, a + b, a - b - 2]);
    }
    if (type === 3) {
      // Integer multiplication — avoid 0 and ±1 which make things trivial
      let a = rand(-12, 12), b = rand(-12, 12);
      if (Math.abs(a) < 2) a = a < 0 ? -2 : 2;
      if (Math.abs(b) < 2) b = b < 0 ? -2 : 2;
      return buildQ('Integers', `(${a}) × (${b}) = ?`, a * b, [a * b + 2, -a * b, a * b - 2]);
    }
    if (type === 4) {
      // Order of ops / BODMAS
      const x = rand(2, 9), y = rand(2, 9), z = rand(2, 6), w = rand(1, 5);
      const actual = x + y * z - w;
      return buildQ('BODMAS', `${x} + ${y} × ${z} − ${w} = ?`, actual, [actual + 1, (x + y) * z - w, x + y * (z - w)]);
    }
    // Powers/exponents — use bigger bases so distractors are more varied
    const base = rand(3, 7), exp = rand(2, 4);
    const ans = Math.pow(base, exp);
    return buildQ('Exponents', `${base}^${exp} = ?`, ans, [base * exp, ans + base, ans - base]);
  },

  fractions() {
    const type = rand(1, 4);
    if (type === 1) {
      // Different denominators
      const d1 = pick([2, 3, 4, 5, 6]), d2 = pick([2, 3, 4, 5, 6]);
      if (d1 === d2) return g7.fractions();
      const n1 = rand(1, d1 - 1), n2 = rand(1, d2 - 1);
      const lcm = (d1 * d2) / gcd(d1, d2);
      const numSum = n1 * (lcm / d1) + n2 * (lcm / d2);
      const g = gcd(Math.abs(numSum), lcm);
      const correct = lcm / g === 1 ? `${numSum / g}` : `${numSum / g}/${lcm / g}`;
      return buildQ('Fractions', `${n1}/${d1} + ${n2}/${d2} = ?`, correct, [
        `${n1 + n2}/${d1 + d2}`,
        `${numSum}/${lcm + 1}`,
        `${numSum + 1}/${lcm}`
      ]);
    }
    if (type === 2) {
      // Fraction multiplication
      const n1 = rand(1, 5), d1 = rand(n1 + 1, 8);
      const n2 = rand(1, 5), d2 = rand(n2 + 1, 8);
      const num = n1 * n2, den = d1 * d2;
      const g = gcd(num, den);
      const correct = `${num / g}/${den / g}`;
      return buildQ('Fractions', `${n1}/${d1} × ${n2}/${d2} = ?`, correct, [
        `${n1 + n2}/${d1 + d2}`,
        `${num}/${den + 1}`,
        `${num + 1}/${den}`
      ]);
    }
    if (type === 3) {
      // Decimal multiplication
      const a = (rand(10, 99) / 10).toFixed(1);
      const b = (rand(10, 50) / 10).toFixed(1);
      const ans = (parseFloat(a) * parseFloat(b)).toFixed(2);
      return buildQ('Decimals', `${a} × ${b} = ?`, ans, [
        (parseFloat(ans) + 0.1).toFixed(2),
        (parseFloat(ans) + 1).toFixed(2),
        (parseFloat(ans) - 0.5).toFixed(2)
      ]);
    }
    // Decimal division
    const b = pick([2, 4, 5]);
    const ansNum = rand(5, 40);
    const a = (ansNum * b / 10).toFixed(1);
    const ans = (ansNum / 10).toFixed(1);
    return buildQ('Decimals', `${a} ÷ ${b} = ?`, ans, [
      (parseFloat(ans) + 0.1).toFixed(1),
      (parseFloat(ans) * 2).toFixed(1),
      (parseFloat(ans) - 0.2).toFixed(1)
    ]);
  },

  percentages() {
    const type = rand(1, 4);
    if (type === 1) {
      // % of number (harder)
      const p = pick([5, 12, 15, 18, 35, 40, 60]);
      const n = pick([200, 300, 400, 500, 800, 1000]);
      const ans = (p * n) / 100;
      return buildQ('Percentages', `${p}% of ${n} = ?`, ans, [ans + 10, ans - 10, ans * 2]);
    }
    if (type === 2) {
      // % increase / decrease — use prices that give clean integer results
      const p = pick([10, 20, 25, 50]);
      const orig = pick([100, 200, 300, 400, 500, 600, 800, 1000]);
      const ans = orig + (orig * p) / 100;
      return buildQ('Percentages', `A price of ₹${orig} is increased by ${p}%. New price?`, `₹${ans}`, [
        `₹${orig - (orig * p) / 100}`, `₹${orig + p}`, `₹${ans + 50}`
      ]);
    }
    if (type === 3) {
      // Ratio problems — ensure non-trivial ratio
      const k = rand(2, 6);
      const m1 = rand(2, 6), m2 = rand(2, 6);
      if (m1 === m2) return g7.percentages();
      const a = m1 * k, b = m2 * k;
      const g = gcd(a, b);
      return buildQ('Ratios', `Simplest form of ${a} : ${b}`, `${a / g}:${b / g}`, [
        `${a}:${b}`, `${a / g + 1}:${b / g}`, `${a / g}:${b / g + 1}`
      ]);
    }
    // Profit/loss
    const cp = rand(100, 500), profit = rand(20, 100);
    const sp = cp + profit;
    const pct = Math.round((profit / cp) * 100);
    return buildQ('Profit & Loss', `CP = ₹${cp}, SP = ₹${sp}. Profit %?`, `${pct}%`, [
      `${pct + 5}%`, `${pct - 5}%`, `${profit}%`
    ]);
  },

  geometry() {
    const type = rand(1, 5);
    if (type === 1) {
      // Area of triangle
      const b = rand(4, 20) * 2, h = rand(3, 15);
      const ans = (b * h) / 2;
      return buildQ('Geometry', `Area of triangle: base ${b} cm, height ${h} cm`, `${ans} cm²`, [
        `${b * h} cm²`, `${ans + 5} cm²`, `${b + h} cm²`
      ]);
    }
    if (type === 2) {
      // Circumference of circle (π = 22/7)
      const r = pick([7, 14, 21, 28]);
      const ans = 2 * 22 * r / 7;
      return buildQ('Geometry', `Circumference of circle with radius ${r} cm (π = 22/7)`, `${ans} cm`, [
        `${22 * r / 7} cm`, `${ans + 10} cm`, `${r * 4} cm`
      ]);
    }
    if (type === 3) {
      // Angles in a triangle
      const a = rand(30, 80), b = rand(30, 80);
      if (a + b >= 180) return g7.geometry();
      const ans = 180 - a - b;
      return buildQ('Geometry', `Two angles of a triangle are ${a}° and ${b}°. Third angle?`, `${ans}°`, [
        `${ans + 10}°`, `${ans - 5}°`, `${180 - a}°`
      ]);
    }
    if (type === 4) {
      // Complementary/supplementary
      const a = rand(20, 70);
      return buildQ('Angles', `What is the supplement of ${a}°?`, `${180 - a}°`, [
        `${90 - a}°`, `${180 - a + 10}°`, `${a}°`
      ]);
    }
    // Area of circle
    const r = pick([7, 14, 21]);
    const ans = 22 * r * r / 7;
    return buildQ('Geometry', `Area of circle with radius ${r} cm (π = 22/7)`, `${ans} cm²`, [
      `${2 * 22 * r / 7} cm²`, `${ans - 10} cm²`, `${r * r} cm²`
    ]);
  },

  algebra() {
    const type = rand(1, 4);
    if (type === 1) {
      // Linear equation
      const x = rand(2, 15), a = rand(2, 8), b = rand(1, 20);
      const rhs = a * x + b;
      return buildQ('Algebra', `Solve: ${a}x + ${b} = ${rhs}`, `x = ${x}`, [
        `x = ${x + 1}`, `x = ${x - 1}`, `x = ${rhs - b}`
      ]);
    }
    if (type === 2) {
      // Simplify expression
      const a = rand(2, 9), b = rand(2, 9);
      return buildQ('Algebra', `Simplify: ${a}x + ${b}x`, `${a + b}x`, [
        `${a * b}x`, `${a + b}x²`, `${a + b}`
      ]);
    }
    if (type === 3) {
      // Substitute value
      const x = rand(2, 8), a = rand(2, 6), b = rand(1, 10);
      const ans = a * x + b;
      return buildQ('Algebra', `If x = ${x}, find ${a}x + ${b}`, ans, [
        ans + 1, a + x + b, ans - 2
      ]);
    }
    // Negative equation
    const x = rand(2, 10), a = rand(2, 6), b = rand(5, 25);
    const lhs = b - a * x;
    return buildQ('Algebra', `Solve: ${b} − ${a}x = ${lhs}`, `x = ${x}`, [
      `x = ${x + 1}`, `x = ${x - 1}`, `x = ${b - lhs}`
    ]);
  },

  wordProblems() {
    const type = rand(1, 5);
    if (type === 1) {
      const cp = rand(200, 800), loss = rand(20, 100);
      const sp = cp - loss;
      return buildQ('Word Problem',
        `Rohan bought a bag for ₹${cp} and sold it for ₹${sp}. His loss is?`,
        `₹${loss}`,
        [`₹${loss + 10}`, `₹${cp + sp}`, `₹${loss - 5}`]);
    }
    if (type === 2) {
      const speed = rand(30, 80), time = rand(2, 6);
      return buildQ('Word Problem',
        `A car travels at ${speed} km/h for ${time} hours. Distance covered?`,
        `${speed * time} km`,
        [`${speed + time} km`, `${speed * time + 10} km`, `${speed / time} km`]);
    }
    if (type === 3) {
      const pct = pick([10, 20, 25, 50]);
      const total = pick([20, 40, 60, 80, 100, 120, 200]);
      const ans = (total * pct) / 100;
      return buildQ('Word Problem',
        `In a class of ${total} students, ${pct}% are absent. How many are absent?`,
        ans,
        [total - ans, ans + 5, ans * 2]);
    }
    if (type === 4) {
      const ratio1 = rand(2, 5), ratio2 = rand(2, 5);
      if (ratio1 === ratio2) return g7.wordProblems();
      const mult = rand(3, 8);
      const total = (ratio1 + ratio2) * mult;
      return buildQ('Word Problem',
        `Two numbers are in ratio ${ratio1}:${ratio2}. Their sum is ${total}. The larger one is?`,
        Math.max(ratio1, ratio2) * mult,
        [Math.min(ratio1, ratio2) * mult, total / 2, Math.max(ratio1, ratio2) * mult + mult]);
    }
    const p = rand(500, 2000), r = pick([5, 8, 10, 12]), t = rand(2, 5);
    const si = (p * r * t) / 100;
    return buildQ('Word Problem',
      `Simple interest on ₹${p} at ${r}% for ${t} years?`,
      `₹${si}`,
      [`₹${si + 50}`, `₹${p + si}`, `₹${si / 2}`]);
  }
};

// ============ PUBLIC API ============

const TOPICS_G5 = ['arithmetic', 'fractions', 'percentages', 'geometry', 'algebra', 'wordProblems'];
const TOPICS_G7 = ['arithmetic', 'fractions', 'percentages', 'geometry', 'algebra', 'wordProblems'];

export function generateQuestions(grade, count = 15) {
  const gen = grade <= 5 ? g5 : g7;
  const topics = grade <= 5 ? TOPICS_G5 : TOPICS_G7;
  const questions = [];
  // Distribute across topics roughly evenly
  const distribution = [];
  for (let i = 0; i < count; i++) {
    distribution.push(topics[i % topics.length]);
  }
  const shuffled = shuffle(distribution);
  for (const topic of shuffled) {
    let q = null;
    let attempts = 0;
    while (!q && attempts < 5) {
      try { q = gen[topic](); } catch (e) { q = null; }
      attempts++;
    }
    if (!q) q = gen.arithmetic();
    questions.push(q);
  }
  return questions;
}

export const TOPIC_LABELS = {
  'Arithmetic': 'Arithmetic',
  'Integers': 'Integers',
  'BODMAS': 'Order of ops',
  'Exponents': 'Exponents',
  'Fractions': 'Fractions',
  'Decimals': 'Decimals',
  'Percentages': 'Percentages',
  'Ratios': 'Ratios',
  'Profit & Loss': 'Profit & Loss',
  'Geometry': 'Geometry',
  'Angles': 'Angles',
  'Algebra': 'Algebra',
  'Word Problem': 'Word Problems'
};
