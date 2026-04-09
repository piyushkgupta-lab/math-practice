// ICSE Class 7 Chemistry question bank
// Topics: Matter, Physical/Chemical changes, Elements/Compounds/Mixtures,
// Atomic Structure, Language of Chemistry, Acids Bases Salts, Air & Atmosphere

const Q = [
  // ============ MATTER ============
  { topic: 'Matter', type: 'mcq', text: 'Matter is anything that has:', options: ['Only mass', 'Only volume', 'Mass and occupies space', 'Only weight'], correctIndex: 2 },
  { topic: 'Matter', type: 'mcq', text: 'The three states of matter are:', options: ['Solid, liquid, gas', 'Hot, warm, cold', 'Hard, soft, liquid', 'Heavy, light, medium'], correctIndex: 0 },
  { topic: 'Matter', type: 'mcq', text: 'In which state of matter are the particles most tightly packed?', options: ['Solid', 'Liquid', 'Gas', 'All are equally packed'], correctIndex: 0 },
  { topic: 'Matter', type: 'mcq', text: 'The process of change from solid to liquid is called:', options: ['Evaporation', 'Melting', 'Condensation', 'Sublimation'], correctIndex: 1 },
  { topic: 'Matter', type: 'mcq', text: 'The process of change from liquid to gas is called:', options: ['Melting', 'Freezing', 'Evaporation', 'Condensation'], correctIndex: 2 },
  { topic: 'Matter', type: 'mcq', text: 'The change from gas directly to solid (or vice versa) without passing through the liquid state is called:', options: ['Melting', 'Evaporation', 'Sublimation', 'Condensation'], correctIndex: 2 },
  { topic: 'Matter', type: 'tf', text: 'Gases have a definite shape and volume.', options: ['True', 'False'], correctIndex: 1 },
  { topic: 'Matter', type: 'tf', text: 'Liquids take the shape of the container they are in.', options: ['True', 'False'], correctIndex: 0 },
  { topic: 'Matter', type: 'mcq', text: 'Camphor changing directly into vapour is an example of:', options: ['Melting', 'Sublimation', 'Evaporation', 'Condensation'], correctIndex: 1 },

  // ============ PHYSICAL & CHEMICAL CHANGES ============
  { topic: 'Changes', type: 'mcq', text: 'Which of these is a physical change?', options: ['Burning of paper', 'Rusting of iron', 'Melting of ice', 'Cooking of food'], correctIndex: 2 },
  { topic: 'Changes', type: 'mcq', text: 'Which of these is a chemical change?', options: ['Breaking a glass', 'Melting of wax', 'Burning of wood', 'Tearing of paper'], correctIndex: 2 },
  { topic: 'Changes', type: 'mcq', text: 'Rusting of iron is a:', options: ['Physical change', 'Chemical change', 'Neither', 'Both'], correctIndex: 1 },
  { topic: 'Changes', type: 'mcq', text: 'A change in which no new substance is formed is called a:', options: ['Chemical change', 'Physical change', 'Permanent change', 'Irreversible change'], correctIndex: 1 },
  { topic: 'Changes', type: 'tf', text: 'In a chemical change, a new substance is always formed.', options: ['True', 'False'], correctIndex: 0 },
  { topic: 'Changes', type: 'tf', text: 'Boiling of water is a chemical change.', options: ['True', 'False'], correctIndex: 1 },
  { topic: 'Changes', type: 'mcq', text: 'Photosynthesis is an example of:', options: ['Physical change', 'Chemical change', 'No change', 'Reversible physical change'], correctIndex: 1 },

  // ============ ELEMENTS, COMPOUNDS, MIXTURES ============
  { topic: 'Elements', type: 'mcq', text: 'A pure substance made up of only one kind of atom is called:', options: ['Compound', 'Mixture', 'Element', 'Solution'], correctIndex: 2 },
  { topic: 'Elements', type: 'mcq', text: 'Water (H₂O) is an example of a:', options: ['Element', 'Compound', 'Mixture', 'Atom'], correctIndex: 1 },
  { topic: 'Elements', type: 'mcq', text: 'Air is an example of a:', options: ['Compound', 'Element', 'Mixture', 'Pure substance'], correctIndex: 2 },
  { topic: 'Elements', type: 'mcq', text: 'Which of these is an element?', options: ['Salt', 'Sugar', 'Oxygen', 'Water'], correctIndex: 2 },
  { topic: 'Elements', type: 'mcq', text: 'The chemical symbol for Sodium is:', options: ['So', 'S', 'Na', 'Sd'], correctIndex: 2 },
  { topic: 'Elements', type: 'mcq', text: 'The chemical symbol for Gold is:', options: ['Go', 'Gd', 'Au', 'Ag'], correctIndex: 2 },
  { topic: 'Elements', type: 'mcq', text: 'The chemical symbol for Iron is:', options: ['Ir', 'Fe', 'In', 'I'], correctIndex: 1 },
  { topic: 'Elements', type: 'mcq', text: 'The chemical formula for carbon dioxide is:', options: ['CO', 'CO₂', 'C₂O', 'CO₃'], correctIndex: 1 },
  { topic: 'Elements', type: 'tf', text: 'A mixture can be separated into its components by physical methods.', options: ['True', 'False'], correctIndex: 0 },
  { topic: 'Elements', type: 'tf', text: 'Oxygen is a compound.', options: ['True', 'False'], correctIndex: 1 },
  { topic: 'Elements', type: 'mcq', text: 'Which of these is a mixture?', options: ['Distilled water', 'Carbon dioxide', 'Salt solution', 'Oxygen gas'], correctIndex: 2 },
  { topic: 'Elements', type: 'mcq', text: 'The technique used to separate a soluble solid from a liquid is:', options: ['Filtration', 'Evaporation', 'Decantation', 'Sieving'], correctIndex: 1 },

  // ============ ATOMIC STRUCTURE ============
  { topic: 'Atomic Structure', type: 'mcq', text: 'The smallest particle of an element is:', options: ['Molecule', 'Atom', 'Compound', 'Cell'], correctIndex: 1 },
  { topic: 'Atomic Structure', type: 'mcq', text: 'The particles found inside the nucleus of an atom are:', options: ['Protons and electrons', 'Neutrons and electrons', 'Protons and neutrons', 'Only electrons'], correctIndex: 2 },
  { topic: 'Atomic Structure', type: 'mcq', text: 'Electrons carry a charge that is:', options: ['Positive', 'Negative', 'Neutral', 'Sometimes positive'], correctIndex: 1 },
  { topic: 'Atomic Structure', type: 'mcq', text: 'Protons carry a charge that is:', options: ['Positive', 'Negative', 'Neutral', 'Varies'], correctIndex: 0 },
  { topic: 'Atomic Structure', type: 'tf', text: 'Neutrons have no electric charge.', options: ['True', 'False'], correctIndex: 0 },
  { topic: 'Atomic Structure', type: 'tf', text: 'Electrons orbit the nucleus of an atom.', options: ['True', 'False'], correctIndex: 0 },

  // ============ ACIDS, BASES, SALTS ============
  { topic: 'Acids & Bases', type: 'mcq', text: 'Acids taste:', options: ['Sweet', 'Sour', 'Bitter', 'Salty'], correctIndex: 1 },
  { topic: 'Acids & Bases', type: 'mcq', text: 'Bases taste:', options: ['Sweet', 'Sour', 'Bitter', 'Tasteless'], correctIndex: 2 },
  { topic: 'Acids & Bases', type: 'mcq', text: 'Acids turn blue litmus paper:', options: ['Green', 'Red', 'Yellow', 'Stays blue'], correctIndex: 1 },
  { topic: 'Acids & Bases', type: 'mcq', text: 'Bases turn red litmus paper:', options: ['Blue', 'Yellow', 'Green', 'Stays red'], correctIndex: 0 },
  { topic: 'Acids & Bases', type: 'mcq', text: 'The acid present in a lemon is:', options: ['Acetic acid', 'Citric acid', 'Lactic acid', 'Hydrochloric acid'], correctIndex: 1 },
  { topic: 'Acids & Bases', type: 'mcq', text: 'Vinegar contains:', options: ['Citric acid', 'Acetic acid', 'Sulphuric acid', 'Lactic acid'], correctIndex: 1 },
  { topic: 'Acids & Bases', type: 'mcq', text: 'When an acid reacts with a base, it forms:', options: ['Another acid', 'Salt and water', 'Only water', 'A gas only'], correctIndex: 1 },
  { topic: 'Acids & Bases', type: 'tf', text: 'Soap is basic in nature.', options: ['True', 'False'], correctIndex: 0 },
  { topic: 'Acids & Bases', type: 'tf', text: 'Common salt is formed by the reaction of an acid with a base.', options: ['True', 'False'], correctIndex: 0 },
  { topic: 'Acids & Bases', type: 'mcq', text: 'The chemical name of common salt is:', options: ['Sodium carbonate', 'Sodium chloride', 'Sodium bicarbonate', 'Calcium chloride'], correctIndex: 1 },

  // ============ AIR & ATMOSPHERE ============
  { topic: 'Air', type: 'mcq', text: 'The most abundant gas in the atmosphere is:', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'], correctIndex: 2, explain: 'Nitrogen makes up about 78% of air.' },
  { topic: 'Air', type: 'mcq', text: 'The percentage of oxygen in air is approximately:', options: ['10%', '21%', '50%', '78%'], correctIndex: 1 },
  { topic: 'Air', type: 'mcq', text: 'Which gas is used by plants during photosynthesis?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], correctIndex: 2 },
  { topic: 'Air', type: 'mcq', text: 'Which gas is needed for burning?', options: ['Nitrogen', 'Oxygen', 'Carbon dioxide', 'Helium'], correctIndex: 1 },
  { topic: 'Air', type: 'tf', text: 'Air is a mixture of gases.', options: ['True', 'False'], correctIndex: 0 },
  { topic: 'Air', type: 'tf', text: 'Carbon dioxide supports burning.', options: ['True', 'False'], correctIndex: 1, explain: 'Carbon dioxide is used in fire extinguishers to put out fires.' }
];

export const CHEMISTRY_BANK = Q;
