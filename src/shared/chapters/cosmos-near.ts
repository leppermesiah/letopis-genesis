import type { NearMiss } from '../types';

// "Almost!": pairs that make sense but come too early. They teach why and point the way, without the answer.
export const COSMOS_NEAR: NearMiss[] = [
  {
    pair: ['matter', 'gravity'], target: 'planet',
    t: {
      bg: 'Материята още е твърде проста. Каменните планети се правят от нещо, което звездите оставят след себе си.',
      en: 'Matter is still too simple. Rocky planets are made from something stars leave behind.',
      de: 'Die Materie ist noch zu einfach. Steinige Planeten entstehen aus etwas, das Sterne zurücklassen.',
    },
  },
  {
    pair: ['hydrogen', 'gravity'], target: 'star',
    t: {
      bg: 'Близо си до звезда! Но един атом не стига: първо събери голям облак газ.',
      en: 'You are close to a star! But one atom is not enough: first gather a big cloud of gas.',
      de: 'Du bist nah an einem Stern! Aber ein Atom reicht nicht: Sammle zuerst eine große Gaswolke.',
    },
  },
  {
    pair: ['hydrogen', 'hydrogen'], target: 'helium',
    t: {
      bg: 'Два водорода се сливат само когато е адски горещо, както в сърцето на звезда.',
      en: 'Two hydrogens fuse only when it is incredibly hot, like in the heart of a star.',
      de: 'Zwei Wasserstoffe verschmelzen nur, wenn es unglaublich heiß ist, wie im Herzen eines Sterns.',
    },
  },
  {
    pair: ['energy', 'energy'], target: 'big_bang',
    t: {
      bg: 'Толкова много сила, но няма къде да се разгърне. Трябва ѝ място.',
      en: 'So much power, but nowhere to go. It needs room.',
      de: 'So viel Kraft, aber kein Platz, um sich auszubreiten. Sie braucht Raum.',
    },
  },
  {
    pair: ['big_bang', 'matter'], target: 'particle',
    t: {
      bg: 'Големият взрив е самото начало, материята идва чак след него. Дай му малко време.',
      en: 'The Big Bang is the very beginning, matter only comes after it. Give it a little time.',
      de: 'Der Urknall ist der allererste Anfang, Materie kommt erst danach. Gib ihm ein wenig Zeit.',
    },
  },
  {
    pair: ['star', 'gravity'], target: 'black_hole',
    t: {
      bg: 'Черна дупка от жива звезда не става. Първо звездата трябва да избухне, а от нея да остане малко, ужасно тежко ядро. С него опитай пак.',
      en: 'A living star cannot become a black hole. First it has to explode and leave behind a small, incredibly heavy core. Try again with that.',
      de: 'Aus einem lebenden Stern wird kein Schwarzes Loch. Zuerst muss er explodieren und einen kleinen, unglaublich schweren Kern zurücklassen. Versuch es damit noch einmal.',
    },
  },
  {
    pair: ['star', 'matter'], target: 'carbon',
    t: {
      bg: 'Звездите сами пекат нова материя в себе си. Започват от най-леките газове.',
      en: 'Stars bake new matter inside themselves. They start from the lightest gases.',
      de: 'Sterne backen in ihrem Inneren neue Materie. Sie beginnen mit den leichtesten Gasen.',
    },
  },
  {
    pair: ['star', 'energy'], target: 'supernova',
    t: {
      bg: 'На звездата не ѝ трябва още сила. Нейната история продължава с времето.',
      en: 'The star does not need more power. Its story goes on with time.',
      de: 'Der Stern braucht nicht mehr Kraft. Seine Geschichte geht mit der Zeit weiter.',
    },
  },


  {
    pair: ['planet', 'gravity'], target: 'moon',
    t: {
      bg: 'Гравитация планетата вече си има. За луна ѝ трябва удар от скала, който да откърти парче от нея.',
      en: 'The planet already has gravity. For a moon it needs a hit from a rock that knocks a piece off it.',
      de: 'Schwerkraft hat der Planet schon. Für einen Mond braucht er den Einschlag eines Felsens, der ein Stück von ihm abschlägt.',
    },
  },
];
