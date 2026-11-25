import type { ElementDef } from '../types';

// Chapter 1: from nothing to the Earth.
// recipes: unordered pairs of ingredients. texts: n = name, f = "did you know" fact, h = riddle hint.
export const COSMOS: ElementDef[] = [
  {
    id: 'energy', cat: 'basics', emoji: '⚡', start: true, recipes: [],
    t: {
      bg: { n: 'Енергия', f: 'Енергията не може да се създаде или унищожи, само сменя формата си. Светлината на лампата ти някога е била слънчева светлина, затворена във въглища, вятър или вода.', h: 'С нея всичко започва.' },
      en: { n: 'Energy', f: 'Energy can never be created or destroyed, only changed from one form into another. The light of your lamp was once sunlight, stored in coal, wind or water.', h: 'Everything starts with it.' },
      de: { n: 'Energie', f: 'Energie kann weder erzeugt noch vernichtet werden, sie wechselt nur ihre Form. Das Licht deiner Lampe war einmal Sonnenlicht, gespeichert in Kohle, Wind oder Wasser.', h: 'Mit ihr fängt alles an.' },
    },
  },
  {
    id: 'space', cat: 'basics', emoji: '🌌', start: true, recipes: [],
    t: {
      bg: { n: 'Пространство', f: 'Вселената непрекъснато се разширява. Далечните галактики се отдалечават от нас и колкото по-далеч са, толкова по-бързо бягат.', h: 'Мястото, където всичко ще се побере.' },
      en: { n: 'Space', f: 'The universe keeps getting bigger. Distant galaxies are moving away from us, and the farther they are, the faster they go.', h: 'The place where everything will fit.' },
      de: { n: 'Raum', f: 'Das Universum dehnt sich ständig aus. Ferne Galaxien entfernen sich von uns, und je weiter sie weg sind, desto schneller.', h: 'Der Ort, an dem alles Platz finden wird.' },
    },
  },
  {
    id: 'time', cat: 'basics', emoji: '⏳', start: true, recipes: [],
    t: {
      bg: { n: 'Време', f: 'Времето не тече еднакво навсякъде. Часовниците на спътниците GPS вървят малко по-бързо от тези на Земята и всеки ден се коригират, иначе навигацията ще греши с километри.', h: 'Без него нищо не може да се промени.' },
      en: { n: 'Time', f: 'Time does not tick the same everywhere. Clocks on GPS satellites run a little faster than clocks on Earth and are corrected every day, or your map would be kilometres off.', h: 'Without it, nothing could ever change.' },
      de: { n: 'Zeit', f: 'Die Zeit vergeht nicht überall gleich schnell. Die Uhren der GPS-Satelliten gehen etwas schneller als auf der Erde und werden täglich korrigiert, sonst läge das Navi kilometerweit daneben.', h: 'Ohne sie könnte sich nie etwas ändern.' },
    },
  },
  {
    id: 'matter', cat: 'basics', emoji: '🪨', recipes: [['atom', 'atom']],
    t: {
      bg: { n: 'Материя', f: 'Всичко, което можеш да пипнеш, е материя. Но обикновената материя е само около 5% от Вселената, останалото са тъмна материя и тъмна енергия, които още никой не е видял.', h: 'Много от едни и същи мънички тухлички, събрани заедно.' },
      en: { n: 'Matter', f: 'Everything you can touch is matter. Yet ordinary matter is only about 5% of the universe; the rest is dark matter and dark energy, which nobody has ever seen.', h: 'Lots of the same tiny building blocks put together.' },
      de: { n: 'Materie', f: 'Alles, was du anfassen kannst, ist Materie. Doch gewöhnliche Materie macht nur etwa 5 % des Universums aus, der Rest sind Dunkle Materie und Dunkle Energie, die noch niemand gesehen hat.', h: 'Viele gleiche winzige Bausteine, zusammengefügt.' },
    },
  },
  {
    id: 'big_bang', cat: 'basics', emoji: '💥', recipes: [['space', 'energy']],
    t: {
      bg: { n: 'Големият взрив', f: 'Вселената е на около 13,8 милиарда години. Големият взрив не е бил експлозия в пространството, а раждането на самото пространство.', h: 'Огромно количество сила в мъничко място.' },
      en: { n: 'Big Bang', f: 'The universe is about 13.8 billion years old. The Big Bang was not an explosion in space, it was the birth of space itself.', h: 'A huge amount of power in a tiny place.' },
      de: { n: 'Urknall', f: 'Das Universum ist etwa 13,8 Milliarden Jahre alt. Der Urknall war keine Explosion im Raum, sondern die Geburt des Raumes selbst.', h: 'Riesige Kraft an einem winzigen Ort.' },
    },
  },
  {
    id: 'particle', cat: 'micro', emoji: '✨', recipes: [['big_bang', 'time']],
    t: {
      bg: { n: 'Частица', f: 'В първата секунда след Големия взрив Вселената е била супа от мънички частици. Протоните в тялото ти са се родили точно тогава.', h: 'Миг след голямото начало, докато всичко изстива.' },
      en: { n: 'Particle', f: 'In the first second after the Big Bang the universe was a soup of tiny particles. The protons in your body were born right then.', h: 'A moment after the great beginning, while everything cools down.' },
      de: { n: 'Teilchen', f: 'In der ersten Sekunde nach dem Urknall war das Universum eine Suppe aus winzigen Teilchen. Die Protonen in deinem Körper sind genau damals entstanden.', h: 'Einen Augenblick nach dem großen Anfang, während alles abkühlt.' },
    },
  },
  {
    id: 'light', cat: 'basics', emoji: '💡', recipes: [['heat', 'space']],
    t: {
      bg: { n: 'Светлина', f: 'Светлината изминава 300 000 км в секунда. От Слънцето до нас пътува около 8 минути, така че винаги виждаш Слънцето такова, каквото е било преди 8 минути.', h: 'Горещото свети, а сиянието излита в тъмното.' },
      en: { n: 'Light', f: 'Light travels 300,000 km every second. It takes about 8 minutes to reach us from the Sun, so you always see the Sun as it was 8 minutes ago.', h: 'Hot things glow, and the glow flies off into the dark.' },
      de: { n: 'Licht', f: 'Licht legt 300.000 km pro Sekunde zurück. Von der Sonne zu uns braucht es etwa 8 Minuten, du siehst die Sonne also immer so, wie sie vor 8 Minuten war.', h: 'Heißes leuchtet, und das Leuchten fliegt hinaus ins Dunkel.' },
    },
  },
  {
    id: 'heat', cat: 'basics', emoji: '🔥', recipes: [['energy', 'particle']],
    t: {
      bg: { n: 'Топлина', f: 'Топлината е просто движение: колкото по-бързо треперят частиците в нещо, толкова е по-горещо. При абсолютната нула, −273,15 °C, почти всичко спира.', h: 'Когато мъничките трохи получат сила, започват да трептят.' },
      en: { n: 'Heat', f: 'Heat is just movement: the faster the particles in something jiggle, the hotter it is. At absolute zero, −273.15 °C, almost everything stops.', h: 'When the tiniest bits get power, they start to jiggle.' },
      de: { n: 'Wärme', f: 'Wärme ist einfach Bewegung: Je schneller die Teilchen in etwas zittern, desto heißer ist es. Beim absoluten Nullpunkt, −273,15 °C, steht fast alles still.', h: 'Wenn die winzigsten Teilchen Kraft bekommen, fangen sie an zu zittern.' },
    },
  },
  {
    id: 'gravity', cat: 'basics', emoji: '🧲', recipes: [['matter', 'space']],
    t: {
      bg: { n: 'Гравитация', f: 'Гравитацията е най-слабата от основните сили, но стига безкрайно далеч. Тя държи Луната около Земята и теб на земята.', h: 'Какво прави материята с пространството около себе си?' },
      en: { n: 'Gravity', f: 'Gravity is the weakest of the basic forces, yet it reaches endlessly far. It keeps the Moon around the Earth and you on the ground.', h: 'What does matter do to the space around it?' },
      de: { n: 'Schwerkraft', f: 'Die Schwerkraft ist die schwächste der Grundkräfte, reicht aber unendlich weit. Sie hält den Mond bei der Erde und dich am Boden.', h: 'Was macht Materie mit dem Raum um sich herum?' },
    },
  },
  {
    id: 'atom', cat: 'micro', emoji: '⚛️', recipes: [['particle', 'particle']],
    t: {
      bg: { n: 'Атом', f: 'Атомът е почти изцяло празен. Ако ядрото беше колкото грахово зърно в средата на стадион, електроните щяха да летят чак по най-горните редове.', h: 'Мъничките неща обичат да са по двойки.' },
      en: { n: 'Atom', f: 'An atom is almost completely empty. If its nucleus were a pea in the middle of a stadium, the electrons would be flying around the top rows of seats.', h: 'Tiny things like to come in pairs.' },
      de: { n: 'Atom', f: 'Ein Atom ist fast völlig leer. Wäre sein Kern eine Erbse in der Mitte eines Stadions, würden die Elektronen ganz oben auf den letzten Rängen kreisen.', h: 'Winzige Dinge sind gern zu zweit.' },
    },
  },
  {
    id: 'hydrogen', cat: 'micro', emoji: '🫧', recipes: [['atom', 'space']],
    t: {
      bg: { n: 'Водород', f: 'Водородът е най-простият и най-разпространеният елемент: около три от всеки четири грама обикновена материя във Вселената са водород.', h: 'Първият атом се разпръсква навсякъде.' },
      en: { n: 'Hydrogen', f: 'Hydrogen is the simplest and most common element: about three of every four grams of ordinary matter in the universe are hydrogen.', h: 'The first atom spreads out everywhere.' },
      de: { n: 'Wasserstoff', f: 'Wasserstoff ist das einfachste und häufigste Element: Etwa drei von vier Gramm gewöhnlicher Materie im Universum sind Wasserstoff.', h: 'Das erste Atom verteilt sich überall.' },
    },
  },
  {
    id: 'helium', cat: 'micro', emoji: '🎈', recipes: [['hydrogen', 'heat']],
    t: {
      bg: { n: 'Хелий', f: 'Хелият е открит първо на Слънцето и чак после на Земята. Затова носи името на гръцкия бог на Слънцето, Хелиос.', h: 'Най-лекото, нагрято докато се слее.' },
      en: { n: 'Helium', f: 'Helium was found on the Sun before it was found on Earth. That is why it is named after Helios, the Greek god of the Sun.', h: 'The lightest thing, heated until it fuses.' },
      de: { n: 'Helium', f: 'Helium wurde zuerst auf der Sonne entdeckt und erst später auf der Erde. Deshalb ist es nach Helios benannt, dem griechischen Sonnengott.', h: 'Das Leichteste, erhitzt bis es verschmilzt.' },
    },
  },
  {
    id: 'gas_cloud', cat: 'stars', emoji: '☁️', recipes: [['hydrogen', 'helium']],
    t: {
      bg: { n: 'Газов облак', f: 'Мъглявината Орион е облак газ, в който точно сега се раждат звезди. Виждаш я с просто око като мъгливо петно в съзвездието Орион.', h: 'Двата най-леки газа се събират на едно място.' },
      en: { n: 'Gas cloud', f: 'The Orion Nebula is a gas cloud where stars are being born right now. You can see it with your bare eyes as a fuzzy patch in Orion.', h: 'The two lightest gases gather in one place.' },
      de: { n: 'Gaswolke', f: 'Der Orionnebel ist eine Gaswolke, in der gerade jetzt Sterne entstehen. Man sieht ihn mit bloßem Auge als verschwommenen Fleck im Orion.', h: 'Die zwei leichtesten Gase sammeln sich an einem Ort.' },
    },
  },
  {
    id: 'star', cat: 'stars', emoji: '⭐', recipes: [['gas_cloud', 'gravity']],
    t: {
      bg: { n: 'Звезда', f: 'В ясна нощ без луна виждаш с просто око около 3 000 звезди. Само в нашата галактика те са над 100 милиарда.', h: 'Облак, който се свива сам в себе си.' },
      en: { n: 'Star', f: 'On a clear night without the Moon you can see about 3,000 stars with your bare eyes. Our galaxy alone has more than 100 billion.', h: 'A cloud that pulls itself together.' },
      de: { n: 'Stern', f: 'In einer klaren Nacht ohne Mond siehst du mit bloßem Auge etwa 3.000 Sterne. Allein unsere Galaxie hat über 100 Milliarden.', h: 'Eine Wolke, die sich selbst zusammenzieht.' },
    },
  },
  {
    id: 'supernova', cat: 'stars', emoji: '🎆', recipes: [['star', 'time']],
    t: {
      bg: { n: 'Свръхнова', f: 'Когато огромна звезда умре, тя избухва като свръхнова и за няколко седмици може да свети по-ярко от цяла галактика.', h: 'И звездите не живеят вечно.' },
      en: { n: 'Supernova', f: 'When a giant star dies it blows up as a supernova and for a few weeks can shine brighter than a whole galaxy.', h: 'Even stars do not live forever.' },
      de: { n: 'Supernova', f: 'Wenn ein riesiger Stern stirbt, explodiert er als Supernova und kann einige Wochen lang heller leuchten als eine ganze Galaxie.', h: 'Auch Sterne leben nicht ewig.' },
    },
  },
  {
    id: 'neutron_star', cat: 'stars', emoji: '💠', recipes: [['supernova', 'gravity']],
    t: {
      bg: { n: 'Неутронна звезда', f: 'Неутронната звезда е голяма колкото град, но тежи повече от Слънцето. Една чаена лъжичка от нея би тежала милиард тона.', h: 'Каквото остане след взрива, се смачква до краен предел.' },
      en: { n: 'Neutron star', f: 'A neutron star is the size of a city but heavier than the Sun. One teaspoon of it would weigh a billion tonnes.', h: 'What is left after the blast gets squeezed to the limit.' },
      de: { n: 'Neutronenstern', f: 'Ein Neutronenstern ist so groß wie eine Stadt, aber schwerer als die Sonne. Ein Teelöffel davon würde eine Milliarde Tonnen wiegen.', h: 'Was nach der Explosion übrig bleibt, wird bis zum Äußersten zusammengedrückt.' },
    },
  },
  {
    id: 'black_hole', cat: 'stars', emoji: '🕳️', recipes: [['neutron_star', 'gravity'], ['neutron_star', 'neutron_star']],
    t: {
      bg: { n: 'Черна дупка', f: 'От черната дупка не може да избяга дори светлината. Първата ѝ снимка е направена през 2019 г. с телескопи от цял свят, свързани в един.', h: 'Остатък от звезда, толкова тежък, че пропада сам в себе си.' },
      en: { n: 'Black hole', f: 'Not even light can escape a black hole. The first picture of one was taken in 2019 by telescopes all over the world working as one.', h: 'What is left of a star, so heavy it falls into itself.' },
      de: { n: 'Schwarzes Loch', f: 'Nicht einmal Licht kann einem Schwarzen Loch entkommen. Das erste Bild davon entstand 2019 mit Teleskopen auf der ganzen Welt, die wie eines zusammenarbeiteten.', h: 'Der Rest eines Sterns, so schwer, dass er in sich selbst stürzt.' },
    },
  },
  {
    id: 'galaxy', cat: 'stars', emoji: '🌀', recipes: [['star', 'star'], ['black_hole', 'star']],
    t: {
      bg: { n: 'Галактика', f: 'Млечният път е нашата галактика. Слънцето обикаля около центъра ѝ веднъж на около 230 милиона години, последният път по Земята са ходели динозаври.', h: 'Една звезда е сама. А много?' },
      en: { n: 'Galaxy', f: 'The Milky Way is our galaxy. The Sun goes around its centre once every 230 million years or so; last time round, dinosaurs walked the Earth.', h: 'One star is lonely. What about many?' },
      de: { n: 'Galaxie', f: 'Die Milchstraße ist unsere Galaxie. Die Sonne umrundet ihr Zentrum etwa alle 230 Millionen Jahre, beim letzten Mal lebten auf der Erde Dinosaurier.', h: 'Ein Stern ist einsam. Und viele?' },
    },
  },
  {
    id: 'carbon', cat: 'materials', emoji: '💎', recipes: [['helium', 'star']],
    t: {
      bg: { n: 'Въглерод', f: 'Въглеродът е в основата на всичко живо. Един и същ въглерод може да е мек графит в молива или най-твърдия камък, диаманта.', h: 'В сърцето на звездата най-лекият благороден газ се слепва.' },
      en: { n: 'Carbon', f: 'Carbon is the backbone of every living thing. The very same carbon can be soft graphite in a pencil or the hardest stone of all, diamond.', h: 'In a star\'s heart, the light noble gas sticks together.' },
      de: { n: 'Kohlenstoff', f: 'Kohlenstoff ist das Gerüst alles Lebendigen. Derselbe Kohlenstoff kann weicher Graphit im Bleistift sein oder der härteste Stein überhaupt, der Diamant.', h: 'Im Herzen eines Sterns klebt das leichte Edelgas zusammen.' },
    },
  },
  {
    id: 'oxygen', cat: 'micro', emoji: '🫁', recipes: [['carbon', 'helium']],
    t: {
      bg: { n: 'Кислород', f: 'Кислородът е третият най-разпространен елемент във Вселената. Почти две трети от теглото на тялото ти е кислород, най-вече във водата.', h: 'Добави още малко от балонния газ към черното.' },
      en: { n: 'Oxygen', f: 'Oxygen is the third most common element in the universe. Almost two thirds of your body weight is oxygen, mostly inside water.', h: 'Add a little more balloon gas to the black stuff.' },
      de: { n: 'Sauerstoff', f: 'Sauerstoff ist das dritthäufigste Element im Universum. Fast zwei Drittel deines Körpergewichts sind Sauerstoff, vor allem im Wasser.', h: 'Gib dem Schwarzen noch etwas Ballongas dazu.' },
    },
  },
  {
    id: 'iron', cat: 'materials', emoji: '⚙️', recipes: [['oxygen', 'star']],
    t: {
      bg: { n: 'Желязо', f: 'Желязото е последното, което звездата може да изгори в ядрото си. Щом се натрупа, звездата е обречена. Желязото в кръвта ти е направено в звезди.', h: 'Звездата продължава да пече все по-тежки неща.' },
      en: { n: 'Iron', f: 'Iron is the last thing a star can burn in its core. Once it piles up, the star is doomed. The iron in your blood was made inside stars.', h: 'The star keeps baking heavier and heavier things.' },
      de: { n: 'Eisen', f: 'Eisen ist das Letzte, was ein Stern in seinem Kern verbrennen kann. Sammelt es sich an, ist der Stern verloren. Das Eisen in deinem Blut entstand in Sternen.', h: 'Der Stern backt immer schwerere Dinge.' },
    },
  },
  {
    id: 'dust', cat: 'materials', emoji: '🌫️', recipes: [['supernova', 'space']],
    t: {
      bg: { n: 'Космически прах', f: 'Всяка година на Земята падат хиляди тонове космически прах. Част от праха под леглото ти може да е по-стар от Слънцето.', h: 'Взривът разпилява парченца надалеч.' },
      en: { n: 'Cosmic dust', f: 'Thousands of tonnes of cosmic dust fall on the Earth every year. Some of the dust under your bed may be older than the Sun.', h: 'The blast scatters bits far and wide.' },
      de: { n: 'Sternenstaub', f: 'Jedes Jahr fallen Tausende Tonnen Sternenstaub auf die Erde. Ein Teil des Staubs unter deinem Bett ist vielleicht älter als die Sonne.', h: 'Die Explosion verstreut Stückchen weit und breit.' },
    },
  },
  {
    id: 'sun', cat: 'stars', emoji: '☀️', recipes: [['star', 'dust']],
    t: {
      bg: { n: 'Слънце', f: 'В Слънцето биха се събрали около милион Земи. Слънцето е звезда от второ поколение, родена от праха на по-стари звезди.', h: 'Нова звезда, родена от остатъците на старите.' },
      en: { n: 'Sun', f: 'About a million Earths would fit inside the Sun. The Sun is a second-generation star, born from the dust of older stars.', h: 'A new star born from the leftovers of old ones.' },
      de: { n: 'Sonne', f: 'In die Sonne würden etwa eine Million Erden passen. Die Sonne ist ein Stern der zweiten Generation, entstanden aus dem Staub älterer Sterne.', h: 'Ein neuer Stern aus den Resten alter Sterne.' },
    },
  },
  {
    id: 'planet', cat: 'worlds', emoji: '🪐', recipes: [['dust', 'gravity']],
    t: {
      bg: { n: 'Планета', f: 'Планетите растат като снежни топки: прашинки се слепват в камъчета, камъчетата в скали, а скалите в цели светове.', h: 'Прашинки, които нещо невидимо събира на топка.' },
      en: { n: 'Planet', f: 'Planets grow like snowballs: specks of dust stick into pebbles, pebbles into rocks and rocks into whole worlds.', h: 'Specks pulled into a ball by something invisible.' },
      de: { n: 'Planet', f: 'Planeten wachsen wie Schneebälle: Staubkörner kleben zu Kieseln zusammen, Kiesel zu Felsen und Felsen zu ganzen Welten.', h: 'Körnchen, die etwas Unsichtbares zu einer Kugel zieht.' },
    },
  },
  {
    id: 'solar_system', cat: 'worlds', emoji: '🌞', recipes: [['sun', 'planet']],
    t: {
      bg: { n: 'Слънчева система', f: 'В Слънчевата система има 8 планети. Почти цялата ѝ маса, над 99,8%, е в самото Слънце.', h: 'Една звезда и онези, които кръжат около нея.' },
      en: { n: 'Solar system', f: 'The solar system has 8 planets. Almost all of its mass, over 99.8%, is in the Sun itself.', h: 'One star and the ones that circle it.' },
      de: { n: 'Sonnensystem', f: 'Das Sonnensystem hat 8 Planeten. Fast seine gesamte Masse, über 99,8 %, steckt in der Sonne selbst.', h: 'Ein Stern und die, die um ihn kreisen.' },
    },
  },
  {
    id: 'ice', cat: 'materials', emoji: '🧊', recipes: [['hydrogen', 'oxygen']],
    t: {
      bg: { n: 'Лед', f: 'Водата е два атома водород и един кислород. В студения космос тя почти винаги е лед, а ледът е по-лек от водата, затова плува.', h: 'Най-лекият газ и газът, който дишаш.' },
      en: { n: 'Ice', f: 'Water is two hydrogen atoms and one oxygen. In cold space it is nearly always ice, and ice is lighter than water, which is why it floats.', h: 'The lightest gas and the gas you breathe.' },
      de: { n: 'Eis', f: 'Wasser besteht aus zwei Wasserstoffatomen und einem Sauerstoffatom. Im kalten Weltall ist es fast immer Eis, und Eis ist leichter als Wasser, deshalb schwimmt es.', h: 'Das leichteste Gas und das Gas, das du atmest.' },
    },
  },
  {
    id: 'comet', cat: 'worlds', emoji: '☄️', recipes: [['ice', 'dust']],
    t: {
      bg: { n: 'Комета', f: 'Кометите са „мръсни снежни топки“. Когато се доближат до Слънцето, ледът им се изпарява и опашката им може да стане дълга милиони километри.', h: 'Мръсна снежна топка.' },
      en: { n: 'Comet', f: 'Comets are "dirty snowballs". When they come close to the Sun their ice turns to gas, and the tail can grow millions of kilometres long.', h: 'A dirty snowball.' },
      de: { n: 'Komet', f: 'Kometen sind „schmutzige Schneebälle“. Kommen sie der Sonne nahe, verdampft ihr Eis, und der Schweif kann Millionen Kilometer lang werden.', h: 'Ein schmutziger Schneeball.' },
    },
  },
  {
    id: 'asteroid', cat: 'worlds', emoji: '🥔', recipes: [['iron', 'dust']],
    t: {
      bg: { n: 'Астероид', f: 'Между Марс и Юпитер има пояс с милиони астероиди. Въпреки това са толкова раздалечени, че космическите сонди минават през него без проблем.', h: 'Метал и прах, слепени в буца.' },
      en: { n: 'Asteroid', f: 'There is a belt of millions of asteroids between Mars and Jupiter. Still, they are so far apart that space probes fly through it with no trouble.', h: 'Metal and dust stuck into a lump.' },
      de: { n: 'Asteroid', f: 'Zwischen Mars und Jupiter liegt ein Gürtel mit Millionen Asteroiden. Trotzdem sind sie so weit voneinander entfernt, dass Raumsonden problemlos hindurchfliegen.', h: 'Metall und Staub, zu einem Klumpen verklebt.' },
    },
  },
  {
    id: 'meteor', cat: 'worlds', emoji: '🌠', recipes: [['asteroid', 'gravity']],
    t: {
      bg: { n: 'Метеор', f: '„Падащата звезда“ всъщност е камъче, често колкото песъчинка, което изгаря във въздуха. Ако парче стигне до земята, се нарича метеорит.', h: 'Скитащ камък, който нещо придърпва.' },
      en: { n: 'Meteor', f: 'A "shooting star" is really a pebble, often no bigger than a grain of sand, burning up in the air. If a piece reaches the ground it is called a meteorite.', h: 'A wandering rock that something pulls in.' },
      de: { n: 'Meteor', f: 'Eine „Sternschnuppe“ ist eigentlich ein Steinchen, oft nicht größer als ein Sandkorn, das in der Luft verglüht. Erreicht ein Stück den Boden, heißt es Meteorit.', h: 'Ein umherirrender Stein, den etwas anzieht.' },
    },
  },
  {
    id: 'moon', cat: 'worlds', emoji: '🌕', recipes: [['planet', 'asteroid']],
    t: {
      bg: { n: 'Луна', f: 'Учените смятат, че Луната се е родила, когато голямо тяло се е блъснало в младата Земя. Тя се отдалечава от нас с около 3,8 см всяка година.', h: 'Какво става, когато скала удари свят?' },
      en: { n: 'Moon', f: 'Scientists think the Moon was born when a large body crashed into the young Earth. It moves about 3.8 cm farther away from us every year.', h: 'What happens when a rock hits a world?' },
      de: { n: 'Mond', f: 'Forscher glauben, dass der Mond entstand, als ein großer Körper mit der jungen Erde zusammenstieß. Er entfernt sich jedes Jahr etwa 3,8 cm von uns.', h: 'Was passiert, wenn ein Fels eine Welt trifft?' },
    },
  },
  {
    id: 'planetary_ring', cat: 'worlds', emoji: '💍', recipes: [['moon', 'gravity']],
    t: {
      bg: { n: 'Пръстен', f: 'Пръстените на Сатурн са широки стотици хиляди километри, но на много места са дебели само десетина метра. Направени са най-вече от лед.', h: 'Спътник, разкъсан от теглене.' },
      en: { n: 'Planetary ring', f: 'Saturn\'s rings are hundreds of thousands of kilometres wide but in many places only about ten metres thick. They are made mostly of ice.', h: 'A moon torn apart by pulling.' },
      de: { n: 'Planetenring', f: 'Die Ringe des Saturn sind Hunderttausende Kilometer breit, aber an vielen Stellen nur etwa zehn Meter dick. Sie bestehen vor allem aus Eis.', h: 'Ein Mond, vom Ziehen zerrissen.' },
    },
  },
  {
    id: 'earth', cat: 'worlds', emoji: '🌍', key: true, recipes: [['solar_system', 'ice']],
    t: {
      bg: { n: 'Земя', f: 'Земята е на точното разстояние от Слънцето, за да има течна вода. Учените смятат, че част от водата ѝ е донесена от комети и астероиди.', h: 'Единственото място в системата, където ледът може да стане море.' },
      en: { n: 'Earth', f: 'The Earth is at just the right distance from the Sun to have liquid water. Scientists think some of its water was brought by comets and asteroids.', h: 'The one place in the system where ice can become a sea.' },
      de: { n: 'Erde', f: 'Die Erde hat genau den richtigen Abstand zur Sonne für flüssiges Wasser. Forscher glauben, dass ein Teil ihres Wassers von Kometen und Asteroiden gebracht wurde.', h: 'Der eine Ort im System, an dem Eis zu einem Meer werden kann.' },
    },
  },
];
