import type { ElementDef, ElementText, Lang } from '../types';

// Chapter 2: from the young Earth to the first human.
// Ingredients may come from the Cosmos chapter (earth, oxygen, heat, sun, ice, moon, ...).
type T = Record<Lang, ElementText>;
const el = (id: string, cat: string, emoji: string, recipes: [string, string][], t: T, key = false): ElementDef =>
  ({ id, cat, emoji, recipes, t, ...(key ? { key: true } : {}) });

export const EARTH: ElementDef[] = [
  // ---------- the elements ----------
  el('water', 'elements', '💧', [['ice', 'heat'], ['ice', 'sun']], {
    bg: { n: 'Вода', f: 'Водата покрива около 71% от Земята. Почти цялата е солена, а сладката, която можем да пием, е по-малко от 3%.', h: 'Ледът, когато го стоплиш.' },
    en: { n: 'Water', f: 'Water covers about 71% of the Earth. Almost all of it is salty; fresh water we can drink is less than 3%.', h: 'Ice, once you warm it up.' },
    de: { n: 'Wasser', f: 'Wasser bedeckt etwa 71 % der Erde. Fast alles davon ist salzig, trinkbares Süßwasser macht weniger als 3 % aus.', h: 'Eis, wenn du es erwärmst.' },
  }),
  el('air', 'elements', '🌬️', [['earth', 'oxygen'], ['earth', 'gas_cloud']], {
    bg: { n: 'Въздух', f: 'Въздухът е 78% азот и само 21% кислород. Без него небето нямаше да е синьо, а черно като в космоса.', h: 'Невидимата дреха на планетата, в която може да се диша.' },
    en: { n: 'Air', f: 'Air is 78% nitrogen and only 21% oxygen. Without it the sky would not be blue, it would be black like in space.', h: 'The invisible coat of the planet, one you can breathe.' },
    de: { n: 'Luft', f: 'Luft besteht zu 78 % aus Stickstoff und nur zu 21 % aus Sauerstoff. Ohne sie wäre der Himmel nicht blau, sondern schwarz wie im Weltall.', h: 'Der unsichtbare Mantel des Planeten, den man atmen kann.' },
  }),
  el('fire', 'elements', '🔥', [['oxygen', 'heat'], ['air', 'heat'], ['lightning', 'tree']], {
    bg: { n: 'Огън', f: 'Без кислород нищо не гори. Затова в космоса няма огън, а пожарникарите покриват пламъците, за да ги задушат.', h: 'Много горещо, а наоколо има с какво да се диша.' },
    en: { n: 'Fire', f: 'Nothing burns without oxygen. That is why there is no fire in space, and why firefighters cover flames to smother them.', h: 'Very hot, with something to breathe around it.' },
    de: { n: 'Feuer', f: 'Ohne Sauerstoff brennt nichts. Deshalb gibt es im Weltall kein Feuer, und die Feuerwehr deckt Flammen ab, um sie zu ersticken.', h: 'Sehr heiß, und ringsum gibt es etwas zum Atmen.' },
  }),
  el('lava', 'elements', '🟠', [['earth', 'heat'], ['stone', 'fire'], ['stone', 'heat']], {
    bg: { n: 'Лава', f: 'Лавата е разтопен камък, горещ около 1000 °C. Под земната кора скалите са толкова горещи, че текат бавно като гъст мед.', h: 'Камък, толкова горещ, че тече.' },
    en: { n: 'Lava', f: 'Lava is melted rock at about 1000 °C. Under the crust of the Earth the rocks are so hot that they slowly flow like thick honey.', h: 'Stone so hot that it flows.' },
    de: { n: 'Lava', f: 'Lava ist geschmolzenes Gestein, etwa 1000 °C heiß. Unter der Erdkruste ist das Gestein so heiß, dass es langsam fließt wie dicker Honig.', h: 'Stein, so heiß, dass er fließt.' },
  }),
  el('stone', 'elements', '🪨', [['lava', 'water'], ['lava', 'air']], {
    bg: { n: 'Камък', f: 'Когато лавата изстине, става на камък. Най-старите камъни на Земята са на около 4 милиарда години.', h: 'Какво остава от лавата, когато изстине?' },
    en: { n: 'Stone', f: 'When lava cools down it turns into stone. The oldest rocks on Earth are about 4 billion years old.', h: 'What is left of lava once it cools?' },
    de: { n: 'Stein', f: 'Wenn Lava abkühlt, wird sie zu Stein. Die ältesten Gesteine der Erde sind etwa 4 Milliarden Jahre alt.', h: 'Was bleibt von der Lava, wenn sie abkühlt?' },
  }),
  el('steam', 'elements', '♨️', [['water', 'fire'], ['water', 'heat']], {
    bg: { n: 'Пара', f: 'На морското равнище водата кипи при 100 °C. На върха на Еверест кипи още при около 70 °C, защото въздухът там е рядък.', h: 'Вода, която е станала прекалено гореща, за да остане течна.' },
    en: { n: 'Steam', f: 'At sea level water boils at 100 °C. On top of Mount Everest it boils at about 70 °C, because the air up there is thin.', h: 'Water that got too hot to stay liquid.' },
    de: { n: 'Dampf', f: 'Auf Meereshöhe kocht Wasser bei 100 °C. Auf dem Mount Everest kocht es schon bei etwa 70 °C, weil die Luft dort dünn ist.', h: 'Wasser, das zu heiß geworden ist, um flüssig zu bleiben.' },
  }),

  // ---------- sky and weather ----------
  el('cloud', 'weather', '☁️', [['steam', 'air'], ['water', 'air']], {
    bg: { n: 'Облак', f: 'Облакът е милиарди мънички капчици. Едно обикновено бяло облаче тежи около 500 тона, колкото 100 слона.', h: 'Вода, издигната високо във въздуха.' },
    en: { n: 'Cloud', f: 'A cloud is billions of tiny droplets. One ordinary white cloud weighs about 500 tonnes, as much as 100 elephants.', h: 'Water lifted high into the air.' },
    de: { n: 'Wolke', f: 'Eine Wolke besteht aus Milliarden winziger Tröpfchen. Eine gewöhnliche weiße Wolke wiegt etwa 500 Tonnen, so viel wie 100 Elefanten.', h: 'Wasser, hoch in die Luft gehoben.' },
  }),
  el('rain', 'weather', '🌧️', [['cloud', 'water'], ['cloud', 'cloud'], ['cloud', 'gravity']], {
    bg: { n: 'Дъжд', f: 'Дъждовните капки не приличат на сълзи. Малките са кръгли, а големите се сплескват отдолу като питка.', h: 'Облакът стане ли твърде тежък…' },
    en: { n: 'Rain', f: 'Raindrops are not shaped like tears. Small ones are round, and big ones get squashed flat underneath like a bun.', h: 'When a cloud gets too heavy…' },
    de: { n: 'Regen', f: 'Regentropfen sehen nicht aus wie Tränen. Kleine sind rund, große werden unten flach gedrückt wie ein Brötchen.', h: 'Wenn eine Wolke zu schwer wird…' },
  }),
  el('wind', 'weather', '💨', [['air', 'energy'], ['air', 'sun']], {
    bg: { n: 'Вятър', f: 'Слънцето огрява Земята неравномерно. Топлият въздух се издига, студеният идва на мястото му и така се ражда вятърът.', h: 'Въздух, който някой е побутнал.' },
    en: { n: 'Wind', f: 'The Sun warms the Earth unevenly. Warm air rises, cold air rushes in to take its place, and that is wind.', h: 'Air that something has pushed.' },
    de: { n: 'Wind', f: 'Die Sonne erwärmt die Erde ungleichmäßig. Warme Luft steigt auf, kalte strömt nach, und so entsteht Wind.', h: 'Luft, die etwas angeschoben hat.' },
  }),
  el('storm', 'weather', '⛈️', [['wind', 'rain'], ['cloud', 'wind']], {
    bg: { n: 'Буря', f: 'Във всеки момент над Земята бушуват около 2000 гръмотевични бури.', h: 'Дъжд, който вятърът гони.' },
    en: { n: 'Storm', f: 'At any moment there are about 2000 thunderstorms raging somewhere on Earth.', h: 'Rain chased by the wind.' },
    de: { n: 'Sturm', f: 'In jedem Augenblick toben irgendwo auf der Erde etwa 2000 Gewitter.', h: 'Regen, den der Wind jagt.' },
  }),
  el('lightning', 'weather', '🌩️', [['storm', 'energy'], ['cloud', 'energy']], {
    bg: { n: 'Мълния', f: 'Мълнията нагрява въздуха до около 30 000 °C, пет пъти повече от повърхността на Слънцето. Гърмът е звукът на този нагорещен въздух.', h: 'Облак, зареден със сила.' },
    en: { n: 'Lightning', f: 'Lightning heats the air to about 30,000 °C, five times hotter than the surface of the Sun. Thunder is the sound of that hot air.', h: 'A cloud charged with power.' },
    de: { n: 'Blitz', f: 'Ein Blitz erhitzt die Luft auf etwa 30.000 °C, fünfmal heißer als die Oberfläche der Sonne. Der Donner ist das Geräusch dieser heißen Luft.', h: 'Eine Wolke voller Kraft.' },
  }),
  el('rainbow', 'weather', '🌈', [['rain', 'sun'], ['rain', 'light']], {
    bg: { n: 'Дъга', f: 'Всяка капка разделя бялата слънчева светлина на цветове. Дъгата се вижда само ако Слънцето е зад гърба ти.', h: 'Слънце, което грее през дъжда.' },
    en: { n: 'Rainbow', f: 'Every raindrop splits white sunlight into colours. You can see a rainbow only when the Sun is behind you.', h: 'Sun shining through the rain.' },
    de: { n: 'Regenbogen', f: 'Jeder Tropfen zerlegt das weiße Sonnenlicht in Farben. Einen Regenbogen siehst du nur, wenn die Sonne hinter dir steht.', h: 'Sonne, die durch den Regen scheint.' },
  }),
  el('snow', 'weather', '❄️', [['cloud', 'ice'], ['rain', 'ice']], {
    bg: { n: 'Сняг', f: 'Всяка снежинка има шест лъча, но няма две еднакви, защото всяка пада по свой път през облака.', h: 'Дъжд, който е замръзнал още в облака.' },
    en: { n: 'Snow', f: 'Every snowflake has six arms, yet no two are alike, because each one falls its own way through the cloud.', h: 'Rain that froze while still in the cloud.' },
    de: { n: 'Schnee', f: 'Jede Schneeflocke hat sechs Arme, doch keine gleicht der anderen, weil jede ihren eigenen Weg durch die Wolke nimmt.', h: 'Regen, der schon in der Wolke gefroren ist.' },
  }),
  el('seasons', 'weather', '🍂', [['earth', 'sun'], ['earth', 'time']], {
    bg: { n: 'Годишни времена', f: 'Лятото и зимата идват от наклона на Земята, а не от разстоянието до Слънцето. Всъщност в началото на януари Земята е най-близо до него.', h: 'Земята обикаля около Слънцето цяла година.' },
    en: { n: 'Seasons', f: 'Summer and winter come from the tilt of the Earth, not from its distance to the Sun. In fact, the Earth is closest to the Sun in early January.', h: 'The Earth goes around the Sun for a whole year.' },
    de: { n: 'Jahreszeiten', f: 'Sommer und Winter entstehen durch die Neigung der Erde, nicht durch den Abstand zur Sonne. Anfang Januar ist die Erde der Sonne sogar am nächsten.', h: 'Die Erde kreist ein ganzes Jahr um die Sonne.' },
  }),

  // ---------- land ----------
  el('volcano', 'land', '🌋', [['lava', 'earth'], ['lava', 'mountain'], ['fire', 'mountain']], {
    bg: { n: 'Вулкан', f: 'Вулканът е пукнатина в земната кора, през която излиза лава. На сушата има около 1350 вулкана, които могат да изригнат.', h: 'Планина с огън вътре.' },
    en: { n: 'Volcano', f: 'A volcano is a crack in the crust of the Earth where lava comes out. There are about 1350 volcanoes on land that could still erupt.', h: 'A mountain with fire inside.' },
    de: { n: 'Vulkan', f: 'Ein Vulkan ist ein Riss in der Erdkruste, aus dem Lava austritt. An Land gibt es etwa 1350 Vulkane, die noch ausbrechen könnten.', h: 'Ein Berg mit Feuer im Inneren.' },
  }),
  el('mountain', 'land', '⛰️', [['stone', 'stone'], ['stone', 'earth']], {
    bg: { n: 'Планина', f: 'Хималаите още растат с по няколко милиметра всяка година, защото Индия бавно се блъска в Азия.', h: 'Много камъни, натрупани един върху друг.' },
    en: { n: 'Mountain', f: 'The Himalayas still grow a few millimetres every year, because India keeps slowly pushing into Asia.', h: 'Lots of stones piled on top of each other.' },
    de: { n: 'Berg', f: 'Der Himalaya wächst jedes Jahr noch um einige Millimeter, weil Indien sich langsam gegen Asien schiebt.', h: 'Viele Steine, aufeinander gestapelt.' },
  }),
  el('sand', 'land', '🏖️', [['stone', 'water'], ['stone', 'wind'], ['stone', 'ocean']], {
    bg: { n: 'Пясък', f: 'Водата и вятърът стриват камъка на песъчинки за хиляди години. Някои плажове имат розов или черен пясък.', h: 'Камък, стрит на дребно от вода или вятър.' },
    en: { n: 'Sand', f: 'Water and wind grind stone into tiny grains over thousands of years. Some beaches have pink or black sand.', h: 'Stone ground small by water or wind.' },
    de: { n: 'Sand', f: 'Wasser und Wind zerreiben Stein über Tausende Jahre zu Körnchen. Manche Strände haben rosa oder schwarzen Sand.', h: 'Stein, von Wasser oder Wind fein zerrieben.' },
  }),
  el('soil', 'land', '🟫', [['stone', 'time'], ['sand', 'bacteria']], {
    bg: { n: 'Пръст', f: 'Пръстта е стрит камък, смесен с живи същества. В една лъжичка пръст има повече микроби, отколкото хора на Земята.', h: 'Камък, който много дълго се е ронил.' },
    en: { n: 'Soil', f: 'Soil is crumbled stone mixed with living things. One teaspoon of soil holds more microbes than there are people on Earth.', h: 'Stone that has crumbled for a very long time.' },
    de: { n: 'Erde', f: 'Erde ist zerbröselter Stein, gemischt mit Lebewesen. In einem Teelöffel Erde stecken mehr Mikroben, als es Menschen auf der Welt gibt.', h: 'Stein, der sehr lange zerbröselt ist.' },
  }),
  el('mud', 'land', '🟤', [['soil', 'water'], ['rain', 'soil']], {
    bg: { n: 'Кал', f: 'Слоновете и прасетата се валят в кал, за да се пазят от слънцето и от хапещи насекоми.', h: 'Пръст, която се е намокрила.' },
    en: { n: 'Mud', f: 'Elephants and pigs roll in mud to protect themselves from the sun and from biting insects.', h: 'Soil that got wet.' },
    de: { n: 'Schlamm', f: 'Elefanten und Schweine wälzen sich im Schlamm, um sich vor der Sonne und vor stechenden Insekten zu schützen.', h: 'Erde, die nass geworden ist.' },
  }),
  el('glacier', 'land', '🏔️', [['snow', 'mountain'], ['ice', 'mountain'], ['snow', 'time']], {
    bg: { n: 'Ледник', f: 'Ледниците пазят около 69% от сладката вода на Земята. Те се плъзгат надолу бавно като много гъста река.', h: 'Сняг, който се трупа в планината година след година.' },
    en: { n: 'Glacier', f: 'Glaciers hold about 69% of the fresh water on Earth. They slide downhill slowly, like a very thick river.', h: 'Snow that piles up in the mountains year after year.' },
    de: { n: 'Gletscher', f: 'Gletscher speichern etwa 69 % des Süßwassers der Erde. Sie gleiten langsam bergab wie ein sehr zäher Fluss.', h: 'Schnee, der sich Jahr für Jahr in den Bergen türmt.' },
  }),
  el('island', 'land', '🏝️', [['volcano', 'ocean'], ['mountain', 'ocean']], {
    bg: { n: 'Остров', f: 'Хавайските острови са върховете на огромни подводни вулкани. Мерен от дъното на океана, Мауна Кеа е по-висок от Еверест.', h: 'Връх, който стърчи от морето.' },
    en: { n: 'Island', f: 'The Hawaiian Islands are the tops of huge underwater volcanoes. Measured from the ocean floor, Mauna Kea is taller than Mount Everest.', h: 'A peak sticking out of the sea.' },
    de: { n: 'Insel', f: 'Die Hawaii-Inseln sind die Spitzen riesiger Unterwasservulkane. Vom Meeresboden aus gemessen ist der Mauna Kea höher als der Mount Everest.', h: 'Ein Gipfel, der aus dem Meer ragt.' },
  }),
  el('river', 'land', '🏞️', [['rain', 'mountain'], ['water', 'mountain']], {
    bg: { n: 'Река', f: 'Водата винаги тече от високо към ниско. Дунав минава през 10 държави, повече от всяка друга река на света.', h: 'Вода, която тича надолу по планината.' },
    en: { n: 'River', f: 'Water always runs from high to low. The Danube flows through 10 countries, more than any other river in the world.', h: 'Water running down the mountain.' },
    de: { n: 'Fluss', f: 'Wasser fließt immer von oben nach unten. Die Donau fließt durch 10 Länder, mehr als jeder andere Fluss der Welt.', h: 'Wasser, das den Berg hinunterläuft.' },
  }),
  el('lake', 'land', '💧', [['river', 'stone'], ['glacier', 'time']], {
    bg: { n: 'Езеро', f: 'Седемте рилски езера са издълбани от ледници. Байкал в Русия е най-дълбокото езеро в света, над 1600 м.', h: 'Река, която камък е спрял, или ледник, който е изчезнал.' },
    en: { n: 'Lake', f: 'Many mountain lakes were dug out by glaciers. Lake Baikal in Russia is the deepest lake in the world, over 1600 m.', h: 'A river stopped by stone, or a glacier that has gone.' },
    de: { n: 'See', f: 'Viele Bergseen wurden von Gletschern ausgehöhlt. Der Baikalsee in Russland ist mit über 1600 m der tiefste See der Welt.', h: 'Ein Fluss, den Stein aufhält, oder ein Gletscher, der verschwunden ist.' },
  }),
  el('desert', 'land', '🏜️', [['sand', 'sun'], ['sand', 'sand'], ['sand', 'heat']], {
    bg: { n: 'Пустиня', f: 'Пустиня е всяко място, където почти не вали. Затова най-голямата пустиня на света е ледената Антарктида.', h: 'Много пясък и силно слънце.' },
    en: { n: 'Desert', f: 'A desert is any place where it hardly ever rains. That is why the biggest desert in the world is icy Antarctica.', h: 'Lots of sand and strong sun.' },
    de: { n: 'Wüste', f: 'Eine Wüste ist jeder Ort, an dem es kaum regnet. Deshalb ist die größte Wüste der Welt die eisige Antarktis.', h: 'Viel Sand und starke Sonne.' },
  }),
  el('cave', 'land', '🕳️', [['river', 'mountain']], {
    bg: { n: 'Пещера', f: 'Подземни реки бавно разтварят камъка и издълбават пещери. В България има над 5000 пещери, като Дяволското гърло.', h: 'Вода, която е проправила път през планината.' },
    en: { n: 'Cave', f: 'Underground rivers slowly dissolve the rock and carve out caves. Some caves are so big that they have their own clouds inside.', h: 'Water that found its way through a mountain.' },
    de: { n: 'Höhle', f: 'Unterirdische Flüsse lösen das Gestein langsam auf und höhlen es aus. Manche Höhlen sind so groß, dass sich darin eigene Wolken bilden.', h: 'Wasser, das sich einen Weg durch den Berg gebahnt hat.' },
  }),
  el('swamp', 'land', '🌾', [['mud', 'water'], ['mud', 'plant']], {
    bg: { n: 'Блато', f: 'Блатата са като огромна гъба: попиват дъжда и пазят селата наоколо от наводнения.', h: 'Още повече вода върху калта.' },
    en: { n: 'Swamp', f: 'Swamps work like a giant sponge: they soak up rain and protect the villages around them from floods.', h: 'Even more water on top of mud.' },
    de: { n: 'Sumpf', f: 'Sümpfe sind wie ein riesiger Schwamm: Sie saugen Regen auf und schützen die Dörfer ringsum vor Hochwasser.', h: 'Noch mehr Wasser auf dem Schlamm.' },
  }),
  el('earthquake', 'land', '〰️', [['earth', 'energy'], ['mountain', 'energy']], {
    bg: { n: 'Земетресение', f: 'Кората на Земята е от огромни плочи, които се движат колкото растат ноктите ти. Когато заседнат и рязко се отпуснат, земята се тресе.', h: 'Сила, която разтърсва цялата планета.' },
    en: { n: 'Earthquake', f: 'The crust of the Earth is made of huge plates that move about as fast as your fingernails grow. When they get stuck and suddenly slip, the ground shakes.', h: 'Power that shakes the whole planet.' },
    de: { n: 'Erdbeben', f: 'Die Erdkruste besteht aus riesigen Platten, die sich etwa so schnell bewegen, wie deine Fingernägel wachsen. Verhaken sie sich und rutschen plötzlich, bebt die Erde.', h: 'Kraft, die den ganzen Planeten erschüttert.' },
  }),
  el('geyser', 'land', '⛲', [['volcano', 'water'], ['steam', 'earth']], {
    bg: { n: 'Гейзер', f: 'Думата идва от исландския извор Гейсир. Подземна вода, нагрята от вулкан, изстрелва фонтан на десетки метри.', h: 'Вода под вулкан, която изригва нагоре.' },
    en: { n: 'Geyser', f: 'The word comes from Geysir, a hot spring in Iceland. Underground water heated by a volcano shoots up tens of metres.', h: 'Water under a volcano that bursts upwards.' },
    de: { n: 'Geysir', f: 'Das Wort stammt vom Geysir, einer heißen Quelle in Island. Von einem Vulkan erhitztes Grundwasser schießt Dutzende Meter hoch.', h: 'Wasser unter einem Vulkan, das nach oben schießt.' },
  }),

  // ---------- sea ----------
  el('ocean', 'sea', '🌊', [['water', 'water'], ['water', 'earth'], ['rain', 'earth'], ['salt', 'water']], {
    bg: { n: 'Океан', f: 'Океанът е дълбок средно 3,7 км. Най-дълбокото място, Марианската падина, е почти 11 км, повече от височината на Еверест.', h: 'Много, много вода на едно място.' },
    en: { n: 'Ocean', f: 'The ocean is 3.7 km deep on average. Its deepest point, the Mariana Trench, is almost 11 km, more than Mount Everest is tall.', h: 'Lots and lots of water in one place.' },
    de: { n: 'Ozean', f: 'Der Ozean ist im Schnitt 3,7 km tief. Die tiefste Stelle, der Marianengraben, misst fast 11 km, mehr als der Mount Everest hoch ist.', h: 'Sehr, sehr viel Wasser an einem Ort.' },
  }),
  el('tide', 'sea', '🌕', [['ocean', 'moon']], {
    bg: { n: 'Прилив', f: 'Луната дърпа океаните с гравитацията си и водата се надига два пъти на денонощие. Черно море е почти затворено и там приливът е едва няколко сантиметра.', h: 'Кой дърпа морето от небето?' },
    en: { n: 'Tide', f: 'The Moon pulls the oceans with its gravity, and the water rises twice a day. In some bays the sea rises more than 15 metres.', h: 'Who pulls the sea from the sky?' },
    de: { n: 'Gezeiten', f: 'Der Mond zieht mit seiner Schwerkraft an den Ozeanen, und das Wasser steigt zweimal am Tag. In manchen Buchten steigt das Meer um mehr als 15 Meter.', h: 'Wer zieht vom Himmel aus am Meer?' },
  }),
  el('wave', 'sea', '🌊', [['ocean', 'wind'], ['water', 'wind']], {
    bg: { n: 'Вълна', f: 'Вълните ги прави вятърът. Най-високите вълни, измервани в открития океан, са над 25 метра, колкото осеметажен блок.', h: 'Вятърът гони морето.' },
    en: { n: 'Wave', f: 'Waves are made by the wind. The tallest waves ever measured in the open ocean were over 25 metres, as tall as an eight-storey building.', h: 'The wind chases the sea.' },
    de: { n: 'Welle', f: 'Wellen macht der Wind. Die höchsten je im offenen Ozean gemessenen Wellen waren über 25 Meter hoch, so hoch wie ein Haus mit acht Stockwerken.', h: 'Der Wind jagt das Meer.' },
  }),

  // ---------- substances ----------
  el('salt', 'materials', '🧂', [['ocean', 'sun'], ['ocean', 'heat']], {
    bg: { n: 'Сол', f: 'Когато морската вода се изпари, солта остава. Така се добива сол в солниците край Бургас и Поморие.', h: 'Какво остава, когато слънцето изсуши морето?' },
    en: { n: 'Salt', f: 'When sea water dries up, the salt stays behind. That is how salt is still made in salt pans by the sea.', h: 'What is left when the sun dries up the sea?' },
    de: { n: 'Salz', f: 'Wenn Meerwasser verdunstet, bleibt das Salz zurück. So wird in Salzgärten am Meer bis heute Salz gewonnen.', h: 'Was bleibt, wenn die Sonne das Meer austrocknet?' },
  }),
  el('crystal', 'materials', '💎', [['lava', 'time'], ['cave', 'time']], {
    bg: { n: 'Кристал', f: 'Колкото по-бавно расте кристалът, толкова по-голям става. В една пещера в Мексико има кристали, дълги над 11 метра.', h: 'Камък, който е растял много бавно.' },
    en: { n: 'Crystal', f: 'The slower a crystal grows, the bigger it gets. A cave in Mexico has crystals more than 11 metres long.', h: 'Stone that grew very, very slowly.' },
    de: { n: 'Kristall', f: 'Je langsamer ein Kristall wächst, desto größer wird er. In einer Höhle in Mexiko gibt es Kristalle, die über 11 Meter lang sind.', h: 'Stein, der sehr langsam gewachsen ist.' },
  }),
  el('glass', 'materials', '🔮', [['sand', 'fire'], ['sand', 'lightning']], {
    bg: { n: 'Стъкло', f: 'Стъклото е разтопен пясък. Когато мълния удари пясъка, тя сама прави стъклени тръбички, наречени фулгурити.', h: 'Пясък в много силен огън.' },
    en: { n: 'Glass', f: 'Glass is melted sand. When lightning strikes sand, it makes little glass tubes all by itself, called fulgurites.', h: 'Sand in a very hot fire.' },
    de: { n: 'Glas', f: 'Glas ist geschmolzener Sand. Schlägt ein Blitz in Sand ein, entstehen von selbst kleine Glasröhren, die Fulgurite.', h: 'Sand in einem sehr heißen Feuer.' },
  }),

  // ---------- the start of life ----------
  el('soup', 'life', '🧪', [['ocean', 'lightning'], ['ocean', 'energy'], ['water', 'lightning']], {
    bg: { n: 'Първична супа', f: 'През 1952 г. учените Милър и Юри пускат искри като мълнии през вода и газове като на младата Земя. Получават градивните частици на живота.', h: 'Мълнии, които удрят в древното море.' },
    en: { n: 'Primordial soup', f: 'In 1952 the scientists Miller and Urey sent sparks like lightning through water and gases like those of the young Earth. They got the building blocks of life.', h: 'Lightning striking the ancient sea.' },
    de: { n: 'Ursuppe', f: '1952 schickten die Forscher Miller und Urey Funken wie Blitze durch Wasser und Gase wie auf der jungen Erde. Sie erhielten die Bausteine des Lebens.', h: 'Blitze, die ins urzeitliche Meer schlagen.' },
  }),
  el('cell', 'life', '🦠', [['soup', 'time'], ['soup', 'energy']], {
    bg: { n: 'Клетка', f: 'Първите клетки са живели преди повече от 3,5 милиарда години. Твоето тяло е изградено от около 30 трилиона клетки.', h: 'Супата на живота, оставена дълго да ври.' },
    en: { n: 'Cell', f: 'The first cells lived more than 3.5 billion years ago. Your body is built from about 30 trillion cells.', h: 'The soup of life, left to simmer for a long time.' },
    de: { n: 'Zelle', f: 'Die ersten Zellen lebten vor mehr als 3,5 Milliarden Jahren. Dein Körper besteht aus etwa 30 Billionen Zellen.', h: 'Die Suppe des Lebens, lange köcheln gelassen.' },
  }),
  el('bacteria', 'life', '🧫', [['cell', 'ocean'], ['cell', 'water']], {
    bg: { n: 'Бактерия', f: 'В тялото ти живеят горе-долу толкова бактерии, колкото са твоите собствени клетки. Повечето ти помагат да смилаш храната.', h: 'Клетка, пусната да плува на воля.' },
    en: { n: 'Bacteria', f: 'About as many bacteria live in your body as there are cells of your own. Most of them help you digest your food.', h: 'A cell set free to swim.' },
    de: { n: 'Bakterie', f: 'In deinem Körper leben etwa so viele Bakterien, wie du eigene Zellen hast. Die meisten helfen dir, das Essen zu verdauen.', h: 'Eine Zelle, die frei herumschwimmen darf.' },
  }),
  el('algae', 'life', '🌿', [['cell', 'sun'], ['bacteria', 'sun'], ['bacteria', 'light']], {
    bg: { n: 'Водорасло', f: 'Преди повече от 2 милиарда години мънички водорасли и бактерии, които ядат светлина, са напълнили въздуха с кислород.', h: 'Мъничко живо същество, което се храни със слънце.' },
    en: { n: 'Algae', f: 'More than 2 billion years ago tiny algae and bacteria that feed on light filled the air with oxygen.', h: 'A tiny living thing that feeds on sunshine.' },
    de: { n: 'Alge', f: 'Vor mehr als 2 Milliarden Jahren füllten winzige Algen und Bakterien, die sich von Licht ernähren, die Luft mit Sauerstoff.', h: 'Ein winziges Lebewesen, das sich von Sonne ernährt.' },
  }),
  el('plankton', 'life', '🫧', [['algae', 'ocean'], ['algae', 'water']], {
    bg: { n: 'Планктон', f: 'Около половината кислород, който дишаш, идва от мъничкия планктон в океана. Името му на гръцки означава „скитник“.', h: 'Водорасли, които се носят из цялото море.' },
    en: { n: 'Plankton', f: 'About half the oxygen you breathe comes from tiny plankton in the ocean. Its name means "wanderer" in Greek.', h: 'Algae drifting all over the sea.' },
    de: { n: 'Plankton', f: 'Etwa die Hälfte des Sauerstoffs, den du atmest, stammt vom winzigen Plankton im Ozean. Sein Name bedeutet auf Griechisch „Umherirrender“.', h: 'Algen, die durchs ganze Meer treiben.' },
  }),

  // ---------- plants ----------
  el('moss', 'plants', '🟩', [['algae', 'stone'], ['algae', 'soil']], {
    bg: { n: 'Мъх', f: 'Първите растения на сушата са приличали на мъх. Някои мъхове попиват вода 20 пъти повече от теглото си.', h: 'Водорасло, излязло от водата на камъка.' },
    en: { n: 'Moss', f: 'The first plants on land looked like moss. Some mosses can soak up 20 times their own weight in water.', h: 'Algae that climbed out of the water onto a stone.' },
    de: { n: 'Moos', f: 'Die ersten Landpflanzen sahen aus wie Moos. Manche Moose saugen das Zwanzigfache ihres Gewichts an Wasser auf.', h: 'Eine Alge, die aus dem Wasser auf einen Stein geklettert ist.' },
  }),
  el('plant', 'plants', '🌱', [['moss', 'soil'], ['moss', 'time'], ['seed', 'soil'], ['seed', 'water']], {
    bg: { n: 'Растение', f: 'Растенията си правят храна сами от слънчева светлина, вода и въздух. На това се казва фотосинтеза.', h: 'Мъх, който е пуснал корени в пръстта.' },
    en: { n: 'Plant', f: 'Plants make their own food from sunlight, water and air. This is called photosynthesis.', h: 'Moss that put down roots in the soil.' },
    de: { n: 'Pflanze', f: 'Pflanzen machen ihre Nahrung selbst aus Sonnenlicht, Wasser und Luft. Das nennt man Photosynthese.', h: 'Moos, das in der Erde Wurzeln geschlagen hat.' },
  }),
  el('grass', 'plants', '🌾', [['plant', 'soil'], ['plant', 'plant']], {
    bg: { n: 'Трева', f: 'Тревата е млада. Когато са живели динозаврите, тя едва се е появявала, а големите ливади идват милиони години след тях.', h: 'Много малки растения, покрили пръстта.' },
    en: { n: 'Grass', f: 'Grass is young. When dinosaurs lived it was only just appearing, and big meadows came millions of years after them.', h: 'Lots of little plants covering the soil.' },
    de: { n: 'Gras', f: 'Gras ist jung. Zur Zeit der Dinosaurier tauchte es gerade erst auf, große Wiesen gab es erst Millionen Jahre nach ihnen.', h: 'Viele kleine Pflanzen, die die Erde bedecken.' },
  }),
  el('tree', 'plants', '🌳', [['plant', 'time'], ['seed', 'time']], {
    bg: { n: 'Дърво', f: 'Най-старото живо дърво е бор в Калифорния, на около 4800 години. То е било фиданка, когато са строили пирамидите.', h: 'Растение, оставено да расте много години.' },
    en: { n: 'Tree', f: 'The oldest living tree is a pine in California, about 4800 years old. It was a sapling when the pyramids were being built.', h: 'A plant left to grow for many years.' },
    de: { n: 'Baum', f: 'Der älteste lebende Baum ist eine Kiefer in Kalifornien, etwa 4800 Jahre alt. Er war ein Setzling, als die Pyramiden gebaut wurden.', h: 'Eine Pflanze, die viele Jahre wachsen durfte.' },
  }),
  el('forest', 'plants', '🌲', [['tree', 'tree']], {
    bg: { n: 'Гора', f: 'Горите покриват около една трета от сушата и са дом на повечето видове животни и растения на сушата.', h: 'Много дървета заедно.' },
    en: { n: 'Forest', f: 'Forests cover about a third of the land and are home to most kinds of land animals and plants.', h: 'Lots of trees together.' },
    de: { n: 'Wald', f: 'Wälder bedecken etwa ein Drittel des Festlands und sind die Heimat der meisten Tier- und Pflanzenarten an Land.', h: 'Viele Bäume zusammen.' },
  }),
  el('flower', 'plants', '🌼', [['plant', 'sun'], ['plant', 'light']], {
    bg: { n: 'Цвете', f: 'Цветята са се появили по времето на динозаврите. Преди тях светът е бил зелен, без нито едно цветно петно.', h: 'Растение, което се е обърнало към слънцето.' },
    en: { n: 'Flower', f: 'Flowers appeared in the time of the dinosaurs. Before that the world was green, without a single colourful bloom.', h: 'A plant that turned to face the sun.' },
    de: { n: 'Blume', f: 'Blumen entstanden zur Zeit der Dinosaurier. Davor war die Welt grün, ohne eine einzige bunte Blüte.', h: 'Eine Pflanze, die sich zur Sonne gedreht hat.' },
  }),
  el('fruit', 'plants', '🍎', [['flower', 'time'], ['tree', 'flower']], {
    bg: { n: 'Плод', f: 'Всеки плод се ражда от цвят. За ботаниците доматът и краставицата също са плодове, защото в тях има семена.', h: 'Какво става от цвета, като мине време?' },
    en: { n: 'Fruit', f: 'Every fruit grows from a flower. To botanists, tomatoes and cucumbers are fruits too, because they hold seeds.', h: 'What does a flower turn into after a while?' },
    de: { n: 'Frucht', f: 'Jede Frucht wächst aus einer Blüte. Für Botaniker sind auch Tomaten und Gurken Früchte, weil sie Samen enthalten.', h: 'Was wird aus einer Blüte, wenn Zeit vergeht?' },
  }),
  el('seed', 'plants', '🌰', [['flower', 'wind'], ['fruit', 'time']], {
    bg: { n: 'Семе', f: 'Вятърът носи семената на глухарчето на километри. Семе от финикова палма, старо около 2000 години, е покълнало отново.', h: 'Вятърът духва цвете и разнася…' },
    en: { n: 'Seed', f: 'The wind carries dandelion seeds for kilometres. A date palm seed about 2000 years old has sprouted again.', h: 'The wind blows on a flower and carries away…' },
    de: { n: 'Samen', f: 'Der Wind trägt Pusteblumensamen kilometerweit. Ein etwa 2000 Jahre alter Dattelpalmensamen hat wieder gekeimt.', h: 'Der Wind pustet eine Blume an und trägt fort…' },
  }),
  el('mushroom', 'plants', '🍄', [['forest', 'rain'], ['soil', 'tree']], {
    bg: { n: 'Гъба', f: 'Гъбите са по-близки до животните, отколкото до растенията. Най-голямото живо същество на света е гъба в Орегон, широка близо 10 км².', h: 'Какво никне в гората след дъжд?' },
    en: { n: 'Mushroom', f: 'Mushrooms are closer to animals than to plants. The biggest living thing in the world is a fungus in Oregon, almost 10 km² wide.', h: 'What pops up in the forest after rain?' },
    de: { n: 'Pilz', f: 'Pilze sind näher mit Tieren verwandt als mit Pflanzen. Das größte Lebewesen der Welt ist ein Pilz in Oregon, fast 10 km² groß.', h: 'Was sprießt nach dem Regen im Wald?' },
  }),

  // ---------- traces of the past ----------
  el('coal', 'traces', '⚫', [['tree', 'time'], ['forest', 'swamp'], ['forest', 'time']], {
    bg: { n: 'Въглища', f: 'Въглищата са гори, паднали в блата преди около 300 милиона години и смачкани под земята.', h: 'Дървета, заровени за много, много дълго.' },
    en: { n: 'Coal', f: 'Coal is forests that fell into swamps about 300 million years ago and got squashed underground.', h: 'Trees buried for a very, very long time.' },
    de: { n: 'Kohle', f: 'Kohle sind Wälder, die vor etwa 300 Millionen Jahren in Sümpfe fielen und unter der Erde zusammengepresst wurden.', h: 'Bäume, sehr, sehr lange begraben.' },
  }),
  el('oil', 'traces', '🛢️', [['plankton', 'time'], ['plankton', 'stone']], {
    bg: { n: 'Нефт', f: 'Нефтът не е от динозаври, а от древен планктон, потънал на морското дъно и сварен под камъните за милиони години.', h: 'Мъничките морски същества, затрупани за милиони години.' },
    en: { n: 'Oil', f: 'Oil does not come from dinosaurs but from ancient plankton that sank to the sea floor and was cooked under rocks for millions of years.', h: 'Tiny sea creatures, buried for millions of years.' },
    de: { n: 'Erdöl', f: 'Erdöl stammt nicht von Dinosauriern, sondern von urzeitlichem Plankton, das auf den Meeresgrund sank und unter Gestein Millionen Jahre lang gekocht wurde.', h: 'Winzige Meereswesen, Millionen Jahre lang begraben.' },
  }),
  el('fossil', 'traces', '🦴', [['dinosaur', 'stone'], ['fish', 'stone']], {
    bg: { n: 'Вкаменелост', f: 'Затрупана в кал, костта бавно се превръща в камък. Така знаем как са изглеждали животни, които никой не е виждал жив.', h: 'Древно животно, затворено в камък.' },
    en: { n: 'Fossil', f: 'Buried in mud, a bone slowly turns into stone. That is how we know what animals looked like that nobody ever saw alive.', h: 'An ancient animal locked in stone.' },
    de: { n: 'Fossil', f: 'Im Schlamm begraben, wird ein Knochen langsam zu Stein. So wissen wir, wie Tiere aussahen, die nie jemand lebend gesehen hat.', h: 'Ein urzeitliches Tier, in Stein eingeschlossen.' },
  }),
  el('extinction', 'traces', '☄️', [['dinosaur', 'meteor'], ['dinosaur', 'asteroid']], {
    bg: { n: 'Голямото измиране', f: 'Преди 66 милиона години астероид, широк около 10 км, пада в днешно Мексико. Изчезват динозаврите и три четвърти от всички видове.', h: 'Динозаврите и нещо, паднало от небето.' },
    en: { n: 'Mass extinction', f: 'Sixty-six million years ago an asteroid about 10 km wide hit what is now Mexico. The dinosaurs and three quarters of all species vanished.', h: 'The dinosaurs and something falling from the sky.' },
    de: { n: 'Massenaussterben', f: 'Vor 66 Millionen Jahren schlug ein etwa 10 km großer Asteroid im heutigen Mexiko ein. Die Dinosaurier und drei Viertel aller Arten verschwanden.', h: 'Die Dinosaurier und etwas, das vom Himmel fällt.' },
  }),

  // ---------- animals ----------
  el('jellyfish', 'animals', '🪼', [['cell', 'cell'], ['plankton', 'ocean']], {
    bg: { n: 'Медуза', f: 'Медузите нямат мозък, сърце и кости, а са 95% вода. Плуват в моретата от над 500 милиона години, много преди динозаврите.', h: 'Много клетки заедно, които плуват като чадърче.' },
    en: { n: 'Jellyfish', f: 'Jellyfish have no brain, heart or bones and are 95% water. They have swum in the seas for over 500 million years, long before the dinosaurs.', h: 'Lots of cells together, swimming like a little umbrella.' },
    de: { n: 'Qualle', f: 'Quallen haben kein Gehirn, kein Herz und keine Knochen und bestehen zu 95 % aus Wasser. Seit über 500 Millionen Jahren schwimmen sie in den Meeren, lange vor den Dinosauriern.', h: 'Viele Zellen zusammen, die wie ein Schirmchen schwimmen.' },
  }),
  el('coral', 'animals', '🪸', [['jellyfish', 'stone']], {
    bg: { n: 'Корал', f: 'Коралите са роднини на медузите, които си строят каменни къщички. Големият бариерен риф в Австралия се вижда дори от космоса.', h: 'Роднина на медузата, който живее в каменна къщичка.' },
    en: { n: 'Coral', f: 'Corals are cousins of jellyfish that build little stone houses. The Great Barrier Reef in Australia can even be seen from space.', h: 'A jellyfish cousin that lives in a stone house.' },
    de: { n: 'Koralle', f: 'Korallen sind Verwandte der Quallen, die sich kleine Steinhäuser bauen. Das Great Barrier Reef in Australien sieht man sogar aus dem Weltall.', h: 'Ein Verwandter der Qualle, der in einem Steinhaus wohnt.' },
  }),
  el('worm', 'animals', '🪱', [['cell', 'soil'], ['jellyfish', 'mud'], ['cell', 'mud']], {
    bg: { n: 'Червей', f: 'Дъждовните червеи нямат бели дробове и дишат през кожата си. Като ровят, те правят пръстта рохкава и плодородна.', h: 'Живинка, която се рови в пръстта.' },
    en: { n: 'Worm', f: 'Earthworms have no lungs and breathe through their skin. By digging, they make the soil loose and rich.', h: 'A little living thing that digs in the soil.' },
    de: { n: 'Wurm', f: 'Regenwürmer haben keine Lunge und atmen durch die Haut. Beim Graben machen sie die Erde locker und fruchtbar.', h: 'Ein kleines Lebewesen, das in der Erde wühlt.' },
  }),
  el('snail', 'animals', '🐌', [['worm', 'stone']], {
    bg: { n: 'Охлюв', f: 'Охлювът не е червей, но и той има меко тяло без кости. Черупката си я строи сам от варовик, същия камък, от който са много скали и пещери. И тя расте заедно с него.', h: 'Мекичко същество, което си е направило каменна къщичка.' },
    en: { n: 'Snail', f: 'A snail is not a worm, but it too has a soft body with no bones. It builds its shell itself from limestone, the same stone many rocks and caves are made of. And the shell grows together with it.', h: 'A soft little creature that built itself a stone house.' },
    de: { n: 'Schnecke', f: 'Eine Schnecke ist kein Wurm, aber auch sie hat einen weichen Körper ohne Knochen. Ihr Haus baut sie selbst aus Kalk, demselben Stein, aus dem viele Felsen und Höhlen sind. Und es wächst mit ihr mit.', h: 'Ein weiches Tierchen, das sich ein Steinhaus gebaut hat.' },
  }),
  el('fish', 'animals', '🐟', [['worm', 'ocean'], ['worm', 'water']], {
    bg: { n: 'Риба', f: 'Първите риби са се появили преди около 500 милиона години и са нямали челюсти. Днес видовете риби са повече от всички птици, бозайници и влечуги заедно.', h: 'Червейче, което се е научило да плува в морето.' },
    en: { n: 'Fish', f: 'The first fish appeared about 500 million years ago and had no jaws. Today there are more kinds of fish than birds, mammals and reptiles put together.', h: 'A little worm that learned to swim in the sea.' },
    de: { n: 'Fisch', f: 'Die ersten Fische lebten vor etwa 500 Millionen Jahren und hatten keine Kiefer. Heute gibt es mehr Fischarten als Vögel, Säugetiere und Reptilien zusammen.', h: 'Ein Würmchen, das im Meer schwimmen gelernt hat.' },
  }),
  el('shark', 'animals', '🦈', [['fish', 'time'], ['fish', 'fish']], {
    bg: { n: 'Акула', f: 'Акулите са по-стари от дърветата. И нямат нито една кост: скелетът им е от хрущял, като върха на носа ти.', h: 'Риба, която е станала голяма и опасна.' },
    en: { n: 'Shark', f: 'Sharks are older than trees. And they have no bones at all: their skeleton is cartilage, like the tip of your nose.', h: 'A fish that grew big and dangerous.' },
    de: { n: 'Hai', f: 'Haie sind älter als Bäume. Und sie haben keinen einzigen Knochen: Ihr Skelett ist aus Knorpel, wie deine Nasenspitze.', h: 'Ein Fisch, der groß und gefährlich geworden ist.' },
  }),
  el('frog', 'animals', '🐸', [['fish', 'mud'], ['fish', 'swamp'], ['fish', 'soil']], {
    bg: { n: 'Жаба', f: 'Жабите не пият с уста, а попиват вода през кожата си. Като попови лъжички дишат с хриле, точно като рибите.', h: 'Риба, която е изпълзяла на калния бряг.' },
    en: { n: 'Frog', f: 'Frogs do not drink with their mouths, they soak up water through their skin. As tadpoles they breathe with gills, just like fish.', h: 'A fish that crawled out onto the muddy shore.' },
    de: { n: 'Frosch', f: 'Frösche trinken nicht mit dem Maul, sie nehmen Wasser über die Haut auf. Als Kaulquappen atmen sie mit Kiemen, genau wie Fische.', h: 'Ein Fisch, der ans schlammige Ufer gekrochen ist.' },
  }),
  el('insect', 'animals', '🦗', [['worm', 'air'], ['worm', 'wind']], {
    bg: { n: 'Насекомо', f: 'Насекомите са летели над 150 милиона години преди първите птици. Познати са около милион вида, повече от всички други животни.', h: 'Мъничка живинка, която се е издигнала във въздуха.' },
    en: { n: 'Insect', f: 'Insects were flying more than 150 million years before the first birds. About a million kinds are known, more than all other animals.', h: 'A tiny creature that took to the air.' },
    de: { n: 'Insekt', f: 'Insekten flogen schon über 150 Millionen Jahre vor den ersten Vögeln. Etwa eine Million Arten sind bekannt, mehr als alle anderen Tiere.', h: 'Ein winziges Tier, das sich in die Luft erhoben hat.' },
  }),
  el('bee', 'animals', '🐝', [['insect', 'flower']], {
    bg: { n: 'Пчела', f: 'Една пчела събира за целия си живот едва около една дванайсета от чаена лъжичка мед.', h: 'Насекомо, което обича цветята.' },
    en: { n: 'Bee', f: 'In its whole life one bee makes only about a twelfth of a teaspoon of honey.', h: 'An insect that loves flowers.' },
    de: { n: 'Biene', f: 'In ihrem ganzen Leben macht eine Biene nur etwa ein Zwölftel Teelöffel Honig.', h: 'Ein Insekt, das Blumen liebt.' },
  }),
  el('butterfly', 'animals', '🦋', [['worm', 'flower']], {
    bg: { n: 'Пеперуда', f: 'Пеперудата започва живота си като гъсеница. А вкуса на храната усеща с краката си.', h: 'Гъсеничка, която живее сред цветята.' },
    en: { n: 'Butterfly', f: 'A butterfly starts its life as a caterpillar. And it tastes its food with its feet.', h: 'A little caterpillar living among the flowers.' },
    de: { n: 'Schmetterling', f: 'Ein Schmetterling beginnt sein Leben als Raupe. Und er schmeckt sein Futter mit den Füßen.', h: 'Eine kleine Raupe, die zwischen den Blumen lebt.' },
  }),
  el('lizard', 'animals', '🦎', [['frog', 'sun'], ['frog', 'desert'], ['frog', 'sand']], {
    bg: { n: 'Гущер', f: 'Твърдата кожа и яйцата с черупка позволяват на влечугите да живеят далеч от водата. Някои гущери пускат опашката си, за да избягат.', h: 'Жаба, която е излязла да се пече на сухото и топлото.' },
    en: { n: 'Lizard', f: 'Tough skin and eggs with shells let reptiles live far from water. Some lizards drop their tail to escape.', h: 'A frog that went out to bask somewhere dry and warm.' },
    de: { n: 'Eidechse', f: 'Harte Haut und Eier mit Schale lassen Reptilien weit weg vom Wasser leben. Manche Eidechsen werfen ihren Schwanz ab, um zu fliehen.', h: 'Ein Frosch, der sich im Trockenen und Warmen sonnt.' },
  }),
  el('snake', 'animals', '🐍', [['lizard', 'worm']], {
    bg: { n: 'Змия', f: 'Змиите са гущери, които са загубили краката си. Подушват с езика си.', h: 'Гущер, дълъг и без крака като червей.' },
    en: { n: 'Snake', f: 'Snakes are lizards that lost their legs. They smell with their tongue.', h: 'A lizard that is long and legless like a worm.' },
    de: { n: 'Schlange', f: 'Schlangen sind Eidechsen, die ihre Beine verloren haben. Sie riechen mit der Zunge.', h: 'Eine Eidechse, lang und ohne Beine wie ein Wurm.' },
  }),
  el('turtle', 'animals', '🐢', [['lizard', 'stone'], ['lizard', 'ocean']], {
    bg: { n: 'Костенурка', f: 'Черупката е част от скелета на костенурката, затова тя не може да излезе от нея. Някои костенурки живеят над 150 години.', h: 'Влечуго с каменна броня.' },
    en: { n: 'Turtle', f: 'The shell is part of the skeleton of a turtle, so it can never leave it. Some tortoises live for more than 150 years.', h: 'A reptile with stone armour.' },
    de: { n: 'Schildkröte', f: 'Der Panzer gehört zum Skelett der Schildkröte, deshalb kann sie nie heraus. Manche Schildkröten werden über 150 Jahre alt.', h: 'Ein Reptil mit einer Rüstung aus Stein.' },
  }),
  el('dinosaur', 'animals', '🦕', [['lizard', 'time'], ['lizard', 'mountain']], {
    bg: { n: 'Динозавър', f: 'Динозаврите са живели около 165 милиона години. Хората съществуват едва от 300 000 години.', h: 'Гущер, който е растял милиони години.' },
    en: { n: 'Dinosaur', f: 'Dinosaurs lived for about 165 million years. Humans have only been around for 300,000 years.', h: 'A lizard that kept growing for millions of years.' },
    de: { n: 'Dinosaurier', f: 'Dinosaurier lebten etwa 165 Millionen Jahre lang. Menschen gibt es erst seit 300.000 Jahren.', h: 'Eine Eidechse, die Millionen Jahre lang gewachsen ist.' },
  }),
  el('bird', 'animals', '🐦', [['dinosaur', 'air'], ['dinosaur', 'wind']], {
    bg: { n: 'Птица', f: 'Птиците са динозаври, които са оцелели. Кокошката е далечна роднина на тиранозавъра.', h: 'Динозавър, който се е научил да лети.' },
    en: { n: 'Bird', f: 'Birds are dinosaurs that survived. The chicken is a distant cousin of T. rex.', h: 'A dinosaur that learned to fly.' },
    de: { n: 'Vogel', f: 'Vögel sind Dinosaurier, die überlebt haben. Das Huhn ist ein entfernter Verwandter des T. rex.', h: 'Ein Dinosaurier, der fliegen gelernt hat.' },
  }),
  el('penguin', 'animals', '🐧', [['bird', 'ice'], ['bird', 'snow']], {
    bg: { n: 'Пингвин', f: 'Пингвините не летят във въздуха, а „летят“ под водата. Императорският пингвин се гмурка на над 500 метра.', h: 'Птица, която живее сред леда.' },
    en: { n: 'Penguin', f: 'Penguins cannot fly in the air, but they "fly" under water. The emperor penguin dives deeper than 500 metres.', h: 'A bird that lives among the ice.' },
    de: { n: 'Pinguin', f: 'Pinguine können nicht in der Luft fliegen, aber sie „fliegen“ unter Wasser. Der Kaiserpinguin taucht tiefer als 500 Meter.', h: 'Ein Vogel, der im Eis lebt.' },
  }),
  el('mammal', 'animals', '🐭', [['lizard', 'heat'], ['extinction', 'time']], {
    bg: { n: 'Бозайник', f: 'Бозайниците са топлокръвни, имат козина и хранят малките си с мляко. Дълго са били мънички, но след измирането на динозаврите завладяват света.', h: 'Животно, което само си прави топлина.' },
    en: { n: 'Mammal', f: 'Mammals are warm-blooded, have fur and feed their babies with milk. For a long time they were tiny, but after the dinosaurs died out they took over the world.', h: 'An animal that makes its own warmth.' },
    de: { n: 'Säugetier', f: 'Säugetiere sind warmblütig, haben Fell und füttern ihre Jungen mit Milch. Lange waren sie winzig, doch nach dem Aussterben der Dinosaurier eroberten sie die Welt.', h: 'Ein Tier, das selbst Wärme macht.' },
  }),
  el('whale', 'animals', '🐋', [['mammal', 'ocean'], ['mammal', 'water']], {
    bg: { n: 'Кит', f: 'Прадедите на китовете са ходили по сушата на четири крака. Синият кит е най-голямото животно, живяло някога, по-голямо и от динозаврите.', h: 'Бозайник, който се е върнал в морето.' },
    en: { n: 'Whale', f: 'The ancestors of whales walked on land on four legs. The blue whale is the biggest animal that ever lived, bigger than any dinosaur.', h: 'A mammal that went back to the sea.' },
    de: { n: 'Wal', f: 'Die Vorfahren der Wale liefen auf vier Beinen an Land. Der Blauwal ist das größte Tier, das je gelebt hat, größer als jeder Dinosaurier.', h: 'Ein Säugetier, das ins Meer zurückgekehrt ist.' },
  }),
  el('bat', 'animals', '🦇', [['mammal', 'air'], ['mammal', 'cave']], {
    bg: { n: 'Прилеп', f: 'Прилепът е единственият бозайник, който истински лети. В тъмното „вижда“ с ехото на собствения си писък.', h: 'Бозайник с крила, който спи в пещера.' },
    en: { n: 'Bat', f: 'The bat is the only mammal that can truly fly. In the dark it "sees" with the echo of its own squeaks.', h: 'A mammal with wings that sleeps in a cave.' },
    de: { n: 'Fledermaus', f: 'Die Fledermaus ist das einzige Säugetier, das wirklich fliegen kann. Im Dunkeln „sieht“ sie mit dem Echo ihrer eigenen Rufe.', h: 'Ein Säugetier mit Flügeln, das in einer Höhle schläft.' },
  }),
  el('wolf', 'animals', '🐺', [['mammal', 'forest']], {
    bg: { n: 'Вълк', f: 'Всички кучета по света са потомци на древни вълци. Вълците живеят на глутници, като голямо семейство.', h: 'Бозайник, който ловува в гората.' },
    en: { n: 'Wolf', f: 'All dogs in the world descend from ancient wolves. Wolves live in packs, like a big family.', h: 'A mammal that hunts in the forest.' },
    de: { n: 'Wolf', f: 'Alle Hunde der Welt stammen von urzeitlichen Wölfen ab. Wölfe leben in Rudeln, wie eine große Familie.', h: 'Ein Säugetier, das im Wald jagt.' },
  }),
  el('mammoth', 'animals', '🦣', [['mammal', 'snow'], ['mammal', 'ice']], {
    bg: { n: 'Мамут', f: 'Последните мамути са живели на един остров преди около 4000 години, когато пирамидите в Египет вече са били построени.', h: 'Космат бозайник, свикнал със снега.' },
    en: { n: 'Mammoth', f: 'The last mammoths lived on an island about 4000 years ago, when the pyramids in Egypt had already been built.', h: 'A hairy mammal used to the snow.' },
    de: { n: 'Mammut', f: 'Die letzten Mammuts lebten vor etwa 4000 Jahren auf einer Insel, als die Pyramiden in Ägypten schon gebaut waren.', h: 'Ein zotteliges Säugetier, das an Schnee gewöhnt ist.' },
  }),
  el('ape', 'animals', '🐒', [['mammal', 'tree']], {
    bg: { n: 'Маймуна', f: 'Шимпанзетата споделят с нас около 98% от ДНК-то си. Те също си правят сечива, например пръчки за изваждане на термити.', h: 'Бозайник, който живее по дърветата.' },
    en: { n: 'Ape', f: 'Chimpanzees share about 98% of their DNA with us. They make tools too, such as sticks for fishing out termites.', h: 'A mammal that lives in the trees.' },
    de: { n: 'Affe', f: 'Schimpansen teilen etwa 98 % ihrer DNA mit uns. Sie machen auch Werkzeuge, zum Beispiel Stöcke, um Termiten herauszuangeln.', h: 'Ein Säugetier, das in den Bäumen lebt.' },
  }),
  el('human', 'animals', '🧑', [['ape', 'time'], ['ape', 'stone']], {
    bg: { n: 'Човек', f: 'Най-старите каменни сечива са на около 3,3 милиона години. Хора като нас има от около 300 000 години, а сега започва нашата история.', h: 'Маймуна, която е взела камък в ръка.' },
    en: { n: 'Human', f: 'The oldest stone tools are about 3.3 million years old. People like us have been around for about 300,000 years, and now our story begins.', h: 'An ape that picked up a stone.' },
    de: { n: 'Mensch', f: 'Die ältesten Steinwerkzeuge sind etwa 3,3 Millionen Jahre alt. Menschen wie uns gibt es seit etwa 300.000 Jahren, und jetzt beginnt unsere Geschichte.', h: 'Ein Affe, der einen Stein in die Hand genommen hat.' },
  }, true),
];
