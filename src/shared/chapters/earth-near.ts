import type { NearMiss } from '../types';

// "Almost!" for the Earth chapter: the pairs kids try first, with a nudge towards the real step.
export const EARTH_NEAR: NearMiss[] = [
  {
    pair: ['fish', 'air'], target: 'frog',
    t: {
      bg: 'Във въздуха рибата се задушава. Опитай първо с мокър и кален бряг.',
      en: 'In the air a fish cannot breathe. Try a wet, muddy shore first.',
      de: 'An der Luft erstickt der Fisch. Versuch es zuerst mit einem nassen, schlammigen Ufer.',
    },
  },
  {
    pair: ['fish', 'water'], target: 'frog',
    t: {
      bg: 'Рибата вече си живее във водата. За да тръгне към сушата, ѝ трябва кал.',
      en: 'The fish already lives in water. To head for land it needs some mud.',
      de: 'Der Fisch lebt schon im Wasser. Um an Land zu gehen, braucht er Schlamm.',
    },
  },
  {
    pair: ['plant', 'water'], target: 'tree',
    t: {
      bg: 'Растението пие вода, но за да стане голямо и дървесно, му трябва време.',
      en: 'The plant drinks water, but to grow big and woody it needs time.',
      de: 'Die Pflanze trinkt Wasser, aber um groß und holzig zu werden, braucht sie Zeit.',
    },
  },
  {
    pair: ['lizard', 'air'], target: 'bird',
    t: {
      bg: 'Гущерите не летят. Летенето ще научи един техен по-голям и по-късен роднина.',
      en: 'Lizards do not fly. A bigger, later relative of theirs will learn to.',
      de: 'Eidechsen fliegen nicht. Das lernt erst ein größerer, späterer Verwandter.',
    },
  },
  {
    pair: ['dinosaur', 'time'], target: 'extinction',
    t: {
      bg: 'Само чакането не стига. Нещо трябва да падне от небето.',
      en: 'Just waiting is not enough. Something has to fall from the sky.',
      de: 'Nur warten reicht nicht. Etwas muss vom Himmel fallen.',
    },
  },
  {
    pair: ['water', 'sand'], target: 'mud',
    t: {
      bg: 'Мокрият пясък пада на парчета. За истинска кал трябва пръст.',
      en: 'Wet sand just crumbles. Real mud needs soil.',
      de: 'Nasser Sand zerbröselt nur. Für echten Schlamm braucht man Erde.',
    },
  },
  {
    pair: ['tree', 'fire'], target: 'coal',
    t: {
      bg: 'Изгоря! Въглищата се правят без огън: дърветата лежат под земята много, много дълго.',
      en: 'It burned! Coal is made without fire: trees lie underground for a very, very long time.',
      de: 'Verbrannt! Kohle entsteht ohne Feuer: Bäume liegen sehr, sehr lange unter der Erde.',
    },
  },
  {
    pair: ['cloud', 'sun'], target: 'rainbow',
    t: {
      bg: 'Слънце има. Сега му трябват капки дъжд, през които да грее.',
      en: 'There is sun. Now it needs raindrops to shine through.',
      de: 'Sonne ist da. Jetzt braucht sie Regentropfen, durch die sie scheint.',
    },
  },
  {
    pair: ['mammal', 'stone'], target: 'ape',
    t: {
      bg: 'Още не е човек. Първо трябва да се покатери по дърветата.',
      en: 'Not a human yet. First it has to climb the trees.',
      de: 'Noch kein Mensch. Zuerst muss es auf die Bäume klettern.',
    },
  },
  {
    pair: ['ape', 'fire'], target: 'human',
    t: {
      bg: 'Огънят ще дойде по-късно. Първо маймуната трябва да вземе в ръка нещо твърдо.',
      en: 'Fire comes later. First the ape has to pick up something hard.',
      de: 'Das Feuer kommt später. Zuerst muss der Affe etwas Hartes in die Hand nehmen.',
    },
  },
  {
    pair: ['ape', 'tree'], target: 'human',
    t: {
      bg: 'Маймуната вече живее по дърветата. Нека слезе долу и вземе камък.',
      en: 'The ape already lives in the trees. Let it climb down and pick up a stone.',
      de: 'Der Affe lebt schon in den Bäumen. Lass ihn herunterklettern und einen Stein aufheben.',
    },
  },
];
