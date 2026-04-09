// ICSE Class 7 Biology question bank
// Topics: Plant & Animal Tissues, Classification, Photosynthesis & Respiration,
// Excretion, Nervous System, Allergy & Immunity

const Q = [
  // ============ TISSUES ============
  { topic: 'Tissues', type: 'mcq', text: 'A group of similar cells performing the same function is called:', options: ['An organ', 'A tissue', 'A system', 'An organism'], correctIndex: 1 },
  { topic: 'Tissues', type: 'mcq', text: 'Tissues that help in the growth of a plant are:', options: ['Permanent tissues', 'Meristematic tissues', 'Xylem', 'Phloem'], correctIndex: 1 },
  { topic: 'Tissues', type: 'mcq', text: 'The tissue that transports water in plants is:', options: ['Phloem', 'Xylem', 'Parenchyma', 'Collenchyma'], correctIndex: 1 },
  { topic: 'Tissues', type: 'mcq', text: 'The tissue that transports food in plants is:', options: ['Xylem', 'Phloem', 'Sclerenchyma', 'Meristem'], correctIndex: 1 },
  { topic: 'Tissues', type: 'mcq', text: 'Which of these is an animal tissue?', options: ['Xylem', 'Phloem', 'Muscle tissue', 'Parenchyma'], correctIndex: 2 },
  { topic: 'Tissues', type: 'mcq', text: 'Blood is an example of:', options: ['Epithelial tissue', 'Muscular tissue', 'Connective tissue', 'Nervous tissue'], correctIndex: 2 },
  { topic: 'Tissues', type: 'mcq', text: 'Nerve tissue is responsible for:', options: ['Movement', 'Protection', 'Transmitting messages', 'Storing food'], correctIndex: 2 },
  { topic: 'Tissues', type: 'tf', text: 'Muscle tissue helps in movement.', options: ['True', 'False'], correctIndex: 0 },
  { topic: 'Tissues', type: 'tf', text: 'Xylem transports food from leaves to other parts of the plant.', options: ['True', 'False'], correctIndex: 1, explain: 'Xylem transports water. Phloem transports food.' },

  // ============ CLASSIFICATION ============
  { topic: 'Classification', type: 'mcq', text: 'Animals with a backbone are called:', options: ['Invertebrates', 'Vertebrates', 'Arthropods', 'Molluscs'], correctIndex: 1 },
  { topic: 'Classification', type: 'mcq', text: 'Which of these is an invertebrate?', options: ['Fish', 'Frog', 'Butterfly', 'Bird'], correctIndex: 2 },
  { topic: 'Classification', type: 'mcq', text: 'Fish breathe through:', options: ['Lungs', 'Gills', 'Skin', 'Trachea'], correctIndex: 1 },
  { topic: 'Classification', type: 'mcq', text: 'Mammals give birth to:', options: ['Eggs only', 'Young ones', 'Larvae', 'Pupa'], correctIndex: 1 },
  { topic: 'Classification', type: 'mcq', text: 'Which of these is a reptile?', options: ['Frog', 'Lizard', 'Shark', 'Sparrow'], correctIndex: 1 },
  { topic: 'Classification', type: 'mcq', text: 'Plants that do not produce flowers are called:', options: ['Flowering plants', 'Non-flowering plants', 'Herbs', 'Trees'], correctIndex: 1 },
  { topic: 'Classification', type: 'mcq', text: 'Ferns and mosses are examples of:', options: ['Flowering plants', 'Non-flowering plants', 'Algae only', 'Fungi'], correctIndex: 1 },
  { topic: 'Classification', type: 'tf', text: 'All birds can fly.', options: ['True', 'False'], correctIndex: 1, explain: 'Ostriches, penguins, and emus are birds that cannot fly.' },
  { topic: 'Classification', type: 'tf', text: 'Whales are mammals.', options: ['True', 'False'], correctIndex: 0 },
  { topic: 'Classification', type: 'mcq', text: 'Small plants with soft green stems are called:', options: ['Trees', 'Shrubs', 'Herbs', 'Creepers'], correctIndex: 2 },

  // ============ PHOTOSYNTHESIS & RESPIRATION ============
  { topic: 'Photosynthesis', type: 'mcq', text: 'Photosynthesis takes place mainly in the:', options: ['Roots', 'Stem', 'Leaves', 'Flowers'], correctIndex: 2 },
  { topic: 'Photosynthesis', type: 'mcq', text: 'The green pigment in plants that traps sunlight is:', options: ['Haemoglobin', 'Chlorophyll', 'Carotene', 'Melanin'], correctIndex: 1 },
  { topic: 'Photosynthesis', type: 'mcq', text: 'During photosynthesis, plants release:', options: ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'], correctIndex: 2 },
  { topic: 'Photosynthesis', type: 'mcq', text: 'Plants need which of these for photosynthesis?', options: ['Only water', 'Only sunlight', 'Water, CO₂, and sunlight', 'Only CO₂'], correctIndex: 2 },
  { topic: 'Photosynthesis', type: 'mcq', text: 'The food produced during photosynthesis is:', options: ['Protein', 'Fat', 'Glucose', 'Vitamin'], correctIndex: 2 },
  { topic: 'Photosynthesis', type: 'mcq', text: 'During respiration, living organisms take in:', options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'], correctIndex: 1 },
  { topic: 'Photosynthesis', type: 'mcq', text: 'During respiration, living organisms release:', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Water vapour only'], correctIndex: 2 },
  { topic: 'Photosynthesis', type: 'tf', text: 'Plants perform photosynthesis only during the day.', options: ['True', 'False'], correctIndex: 0 },
  { topic: 'Photosynthesis', type: 'tf', text: 'Respiration only occurs in animals, not in plants.', options: ['True', 'False'], correctIndex: 1, explain: 'Plants also respire — all living things do.' },

  // ============ EXCRETION ============
  { topic: 'Excretion', type: 'mcq', text: 'The main organs of excretion in humans are:', options: ['Lungs', 'Kidneys', 'Heart', 'Liver'], correctIndex: 1 },
  { topic: 'Excretion', type: 'mcq', text: 'The liquid waste excreted by humans is called:', options: ['Sweat', 'Saliva', 'Urine', 'Bile'], correctIndex: 2 },
  { topic: 'Excretion', type: 'mcq', text: 'How many kidneys does a normal human being have?', options: ['One', 'Two', 'Three', 'Four'], correctIndex: 1 },
  { topic: 'Excretion', type: 'mcq', text: 'Urine is stored in the:', options: ['Kidney', 'Urethra', 'Urinary bladder', 'Ureter'], correctIndex: 2 },
  { topic: 'Excretion', type: 'mcq', text: 'Sweat is excreted through:', options: ['Kidneys', 'Lungs', 'Skin', 'Liver'], correctIndex: 2 },
  { topic: 'Excretion', type: 'tf', text: 'The kidneys filter waste from the blood.', options: ['True', 'False'], correctIndex: 0 },

  // ============ NERVOUS SYSTEM ============
  { topic: 'Nervous System', type: 'mcq', text: 'The central nervous system consists of:', options: ['Brain and spinal cord', 'Only the brain', 'Only the nerves', 'Heart and brain'], correctIndex: 0 },
  { topic: 'Nervous System', type: 'mcq', text: 'The basic unit of the nervous system is the:', options: ['Neuron', 'Muscle cell', 'Blood cell', 'Bone cell'], correctIndex: 0 },
  { topic: 'Nervous System', type: 'mcq', text: 'The largest part of the brain is the:', options: ['Cerebellum', 'Cerebrum', 'Medulla', 'Spinal cord'], correctIndex: 1 },
  { topic: 'Nervous System', type: 'mcq', text: 'Which part of the brain controls balance and coordination?', options: ['Cerebrum', 'Cerebellum', 'Medulla', 'Spinal cord'], correctIndex: 1 },
  { topic: 'Nervous System', type: 'mcq', text: 'Involuntary actions like heartbeat are controlled by the:', options: ['Cerebrum', 'Cerebellum', 'Medulla', 'Nerves'], correctIndex: 2 },
  { topic: 'Nervous System', type: 'mcq', text: 'A sudden, automatic response to a stimulus is called a:', options: ['Voluntary action', 'Reflex action', 'Thought', 'Habit'], correctIndex: 1 },
  { topic: 'Nervous System', type: 'tf', text: 'The spinal cord is protected by the backbone.', options: ['True', 'False'], correctIndex: 0 },
  { topic: 'Nervous System', type: 'tf', text: 'Neurons transmit messages in the form of electrical signals.', options: ['True', 'False'], correctIndex: 0 },

  // ============ ALLERGY & IMMUNITY ============
  { topic: 'Allergy', type: 'mcq', text: 'An allergy is a reaction of the body to:', options: ['Food only', 'Any substance', 'A normally harmless substance', 'Only medicines'], correctIndex: 2 },
  { topic: 'Allergy', type: 'mcq', text: 'Which of these can cause allergies?', options: ['Pollen', 'Dust', 'Certain foods', 'All of these'], correctIndex: 3 },
  { topic: 'Allergy', type: 'mcq', text: 'Sneezing and a runny nose are common symptoms of:', options: ['A bone injury', 'An allergy', 'Hunger', 'Dehydration'], correctIndex: 1 },
  { topic: 'Allergy', type: 'tf', text: 'Allergies can be passed from one person to another like a cold.', options: ['True', 'False'], correctIndex: 1, explain: 'Allergies are not contagious.' },
  { topic: 'Allergy', type: 'tf', text: 'Some people are allergic to peanuts.', options: ['True', 'False'], correctIndex: 0 }
];

export const BIOLOGY_BANK = Q;
