// ICSE Class 7 Physics question bank — roughly syllabus-aligned
// Topics: Measurement, Force/Motion, Energy, Light, Heat, Sound, Electricity/Magnetism
// Question format: { topic, type, text, options, correctIndex, answerText, explain? }
// type: 'mcq' or 'tf'

const Q = [
  // ============ MEASUREMENT ============
  { topic: 'Measurement', type: 'mcq', text: 'The SI unit of length is:', options: ['Centimetre', 'Metre', 'Kilometre', 'Millimetre'], correctIndex: 1 },
  { topic: 'Measurement', type: 'mcq', text: 'The SI unit of mass is:', options: ['Gram', 'Pound', 'Kilogram', 'Tonne'], correctIndex: 2 },
  { topic: 'Measurement', type: 'mcq', text: 'Which instrument is used to measure the volume of an irregular solid?', options: ['Beaker', 'Measuring cylinder', 'Ruler', 'Thermometer'], correctIndex: 1, explain: 'By water displacement method.' },
  { topic: 'Measurement', type: 'mcq', text: 'Density is defined as:', options: ['Mass × Volume', 'Mass / Volume', 'Volume / Mass', 'Mass + Volume'], correctIndex: 1 },
  { topic: 'Measurement', type: 'mcq', text: 'The SI unit of density is:', options: ['kg/m', 'kg/m²', 'kg/m³', 'g/cm'], correctIndex: 2 },
  { topic: 'Measurement', type: 'tf', text: 'The area of a rectangle is measured in square units.', options: ['True', 'False'], correctIndex: 0 },
  { topic: 'Measurement', type: 'tf', text: 'One litre is equal to 1000 cubic centimetres.', options: ['True', 'False'], correctIndex: 0 },
  { topic: 'Measurement', type: 'mcq', text: 'If an object has a mass of 200 g and volume of 100 cm³, its density is:', options: ['0.5 g/cm³', '2 g/cm³', '20 g/cm³', '200 g/cm³'], correctIndex: 1 },

  // ============ FORCE & MOTION ============
  { topic: 'Force & Motion', type: 'mcq', text: 'A force is a:', options: ['Push only', 'Pull only', 'Push or pull', 'None of these'], correctIndex: 2 },
  { topic: 'Force & Motion', type: 'mcq', text: 'The SI unit of force is:', options: ['Kilogram', 'Newton', 'Joule', 'Watt'], correctIndex: 1 },
  { topic: 'Force & Motion', type: 'mcq', text: 'Motion in which an object travels equal distances in equal intervals of time is called:', options: ['Non-uniform motion', 'Uniform motion', 'Circular motion', 'Random motion'], correctIndex: 1 },
  { topic: 'Force & Motion', type: 'mcq', text: 'The motion of a swing is an example of:', options: ['Linear motion', 'Rotatory motion', 'Oscillatory motion', 'Random motion'], correctIndex: 2 },
  { topic: 'Force & Motion', type: 'mcq', text: 'Speed is defined as:', options: ['Distance × Time', 'Distance / Time', 'Time / Distance', 'Distance + Time'], correctIndex: 1 },
  { topic: 'Force & Motion', type: 'mcq', text: 'If a car travels 120 km in 2 hours, its speed is:', options: ['30 km/h', '60 km/h', '240 km/h', '100 km/h'], correctIndex: 1 },
  { topic: 'Force & Motion', type: 'tf', text: 'Friction is a force that opposes motion.', options: ['True', 'False'], correctIndex: 0 },
  { topic: 'Force & Motion', type: 'tf', text: 'The motion of the hands of a clock is an example of circular motion.', options: ['True', 'False'], correctIndex: 0 },
  { topic: 'Force & Motion', type: 'mcq', text: 'The force that pulls objects towards the earth is called:', options: ['Magnetic force', 'Muscular force', 'Gravitational force', 'Electric force'], correctIndex: 2 },

  // ============ ENERGY ============
  { topic: 'Energy', type: 'mcq', text: 'Energy is defined as the capacity to do:', options: ['Force', 'Work', 'Motion', 'Pressure'], correctIndex: 1 },
  { topic: 'Energy', type: 'mcq', text: 'The SI unit of work and energy is:', options: ['Newton', 'Watt', 'Joule', 'Pascal'], correctIndex: 2 },
  { topic: 'Energy', type: 'mcq', text: 'Energy possessed by a body due to its motion is called:', options: ['Potential energy', 'Kinetic energy', 'Chemical energy', 'Heat energy'], correctIndex: 1 },
  { topic: 'Energy', type: 'mcq', text: 'Energy possessed by a body due to its position is called:', options: ['Kinetic energy', 'Sound energy', 'Potential energy', 'Light energy'], correctIndex: 2 },
  { topic: 'Energy', type: 'mcq', text: 'Which of these is a renewable source of energy?', options: ['Coal', 'Petroleum', 'Solar', 'Natural gas'], correctIndex: 2 },
  { topic: 'Energy', type: 'tf', text: 'Energy can be created or destroyed.', options: ['True', 'False'], correctIndex: 1, explain: 'Energy can only be transformed from one form to another.' },
  { topic: 'Energy', type: 'tf', text: 'A stretched rubber band has potential energy.', options: ['True', 'False'], correctIndex: 0 },
  { topic: 'Energy', type: 'mcq', text: 'A ball rolling on the ground has:', options: ['Only potential energy', 'Only kinetic energy', 'Both kinetic and some potential energy', 'No energy'], correctIndex: 2 },

  // ============ LIGHT ============
  { topic: 'Light', type: 'mcq', text: 'Light travels in:', options: ['Curved lines', 'Straight lines', 'Zigzag lines', 'Circular paths'], correctIndex: 1 },
  { topic: 'Light', type: 'mcq', text: 'The bouncing back of light from a surface is called:', options: ['Refraction', 'Reflection', 'Dispersion', 'Absorption'], correctIndex: 1 },
  { topic: 'Light', type: 'mcq', text: 'The image formed by a plane mirror is:', options: ['Real and inverted', 'Real and erect', 'Virtual and inverted', 'Virtual and erect'], correctIndex: 3 },
  { topic: 'Light', type: 'mcq', text: 'The speed of light in air is approximately:', options: ['3 × 10⁵ km/s', '3 × 10⁸ km/s', '3 × 10⁸ m/s', '300 m/s'], correctIndex: 2 },
  { topic: 'Light', type: 'mcq', text: 'According to the law of reflection, the angle of incidence is:', options: ['Greater than angle of reflection', 'Less than angle of reflection', 'Equal to angle of reflection', 'Zero'], correctIndex: 2 },
  { topic: 'Light', type: 'mcq', text: 'The three primary colours of light are:', options: ['Red, yellow, blue', 'Red, green, blue', 'Red, green, yellow', 'Yellow, blue, green'], correctIndex: 1 },
  { topic: 'Light', type: 'tf', text: 'A plane mirror forms a laterally inverted image.', options: ['True', 'False'], correctIndex: 0 },
  { topic: 'Light', type: 'tf', text: 'Opaque objects allow light to pass through them.', options: ['True', 'False'], correctIndex: 1 },
  { topic: 'Light', type: 'mcq', text: 'An object which allows light to pass through it completely is called:', options: ['Opaque', 'Translucent', 'Transparent', 'Reflective'], correctIndex: 2 },

  // ============ HEAT ============
  { topic: 'Heat', type: 'mcq', text: 'Heat is a form of:', options: ['Matter', 'Energy', 'Force', 'Mass'], correctIndex: 1 },
  { topic: 'Heat', type: 'mcq', text: 'The SI unit of temperature is:', options: ['Celsius', 'Fahrenheit', 'Kelvin', 'Joule'], correctIndex: 2 },
  { topic: 'Heat', type: 'mcq', text: 'The normal body temperature of a human is about:', options: ['32°C', '37°C', '42°C', '100°C'], correctIndex: 1 },
  { topic: 'Heat', type: 'mcq', text: 'Heat transfer by direct contact in solids is called:', options: ['Convection', 'Radiation', 'Conduction', 'Reflection'], correctIndex: 2 },
  { topic: 'Heat', type: 'mcq', text: 'Heat from the Sun reaches the Earth mainly by:', options: ['Conduction', 'Convection', 'Radiation', 'All three equally'], correctIndex: 2 },
  { topic: 'Heat', type: 'mcq', text: 'Water boils at:', options: ['0°C', '50°C', '100°C', '212°C'], correctIndex: 2 },
  { topic: 'Heat', type: 'tf', text: 'Metals are good conductors of heat.', options: ['True', 'False'], correctIndex: 0 },
  { topic: 'Heat', type: 'tf', text: 'Wood is a better conductor of heat than iron.', options: ['True', 'False'], correctIndex: 1 },
  { topic: 'Heat', type: 'mcq', text: 'Ice melts at:', options: ['0°C', '10°C', '100°C', '-10°C'], correctIndex: 0 },
  { topic: 'Heat', type: 'mcq', text: 'Heat transfer in liquids and gases occurs mainly by:', options: ['Conduction', 'Convection', 'Radiation', 'Reflection'], correctIndex: 1 },

  // ============ SOUND ============
  { topic: 'Sound', type: 'mcq', text: 'Sound is produced by:', options: ['Light', 'Heat', 'Vibration', 'Pressure'], correctIndex: 2 },
  { topic: 'Sound', type: 'mcq', text: 'Sound cannot travel through:', options: ['Solids', 'Liquids', 'Gases', 'Vacuum'], correctIndex: 3 },
  { topic: 'Sound', type: 'mcq', text: 'The reflection of sound is called:', options: ['Refraction', 'Echo', 'Vibration', 'Resonance'], correctIndex: 1 },
  { topic: 'Sound', type: 'mcq', text: 'Sound travels fastest in:', options: ['Air', 'Water', 'Iron', 'Vacuum'], correctIndex: 2, explain: 'Sound travels fastest in solids because their particles are closely packed.' },
  { topic: 'Sound', type: 'tf', text: 'Humans can hear sounds of all frequencies.', options: ['True', 'False'], correctIndex: 1, explain: 'Humans can hear only between about 20 Hz and 20,000 Hz.' },
  { topic: 'Sound', type: 'tf', text: 'Bats use ultrasonic waves to navigate.', options: ['True', 'False'], correctIndex: 0 },

  // ============ ELECTRICITY & MAGNETISM ============
  { topic: 'Electricity', type: 'mcq', text: 'The path along which electric current flows is called an:', options: ['Electric circuit', 'Electric field', 'Magnetic field', 'Wire'], correctIndex: 0 },
  { topic: 'Electricity', type: 'mcq', text: 'Which of these is a good conductor of electricity?', options: ['Rubber', 'Wood', 'Plastic', 'Copper'], correctIndex: 3 },
  { topic: 'Electricity', type: 'mcq', text: 'Which of these is an insulator?', options: ['Iron', 'Aluminium', 'Rubber', 'Silver'], correctIndex: 2 },
  { topic: 'Electricity', type: 'mcq', text: 'A device that breaks an electric circuit is a:', options: ['Bulb', 'Switch', 'Cell', 'Wire'], correctIndex: 1 },
  { topic: 'Electricity', type: 'mcq', text: 'Like poles of a magnet:', options: ['Attract each other', 'Repel each other', 'Sometimes attract and sometimes repel', 'Do nothing'], correctIndex: 1 },
  { topic: 'Electricity', type: 'mcq', text: 'A freely suspended magnet always points in the direction of:', options: ['East-West', 'North-South', 'Up-Down', 'None of these'], correctIndex: 1 },
  { topic: 'Electricity', type: 'tf', text: 'An electric cell is a source of electric current.', options: ['True', 'False'], correctIndex: 0 },
  { topic: 'Electricity', type: 'tf', text: 'A magnet has only one pole.', options: ['True', 'False'], correctIndex: 1 }
];

export const PHYSICS_BANK = Q;
