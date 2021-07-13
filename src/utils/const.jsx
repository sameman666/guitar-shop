/* eslint-disable no-console */
import guitar1 from './../components/catalog/guitar_1.png';
import guitar2 from './../components/catalog/guitar_2.png';
import guitar3 from './../components/catalog/guitar_3.png';
import guitar4 from './../components/catalog/guitar_4.png';
import guitar5 from './../components/catalog/guitar_5.png';
import guitar6 from './../components/catalog/guitar_6.png';

const GUITARS = [
  {
    "number": `1`,
    "id": `SO757575`,
    "name": `Честер Bass`,
    "type": `электрогитара`,
    "reviews": `15`,
    "strings": `6`,
    "price": `17500`,
    "image": guitar1
  },
  {
    "number": `2`,
    "id": `AO757599`,
    "name": `СURT Z300`,
    "type": `электрогитара`,
    "reviews": `9`,
    "strings": `6`,
    "price": `29500`,
    "image": guitar2
  },
  {
    "number": `3`,
    "id": `RO111111`,
    "name": `Roman LX`,
    "type": `укулеле`,
    "reviews": `21`,
    "strings": `4`,
    "price": `6800`,
    "image": guitar3
  },
  {
    "number": `4`,
    "id": `TK436457`,
    "name": `СURT T300`,
    "type": `электрогитара`,
    "reviews": `15`,
    "strings": `6`,
    "price": `30000`,
    "image": guitar4
  },
  {
    "number": `5`,
    "id": `DI192138`,
    "name": `Dania Super`,
    "type": `акустическая гитара`,
    "reviews": `5`,
    "strings": `7`,
    "price": `3500`,
    "image": guitar5
  },
  {
    "number": `6`,
    "id": `SO934345`,
    "name": `Честер WX `,
    "type": `электрогитара`,
    "reviews": `17`,
    "strings": `6`,
    "price": `15300`,
    "image": guitar1
  },
  {
    "number": `7`,
    "id": `DI082347`,
    "name": `Dania VX`,
    "type": `укулеле`,
    "reviews": `5`,
    "strings": `4`,
    "price": `2200`,
    "image": guitar3
  },
  {
    "number": `8`,
    "id": `SO135646`,
    "name": `Честер Plus `,
    "type": `электрогитара`,
    "reviews": `27`,
    "strings": `4`,
    "price": `30000`,
    "image": guitar6
  },
  {
    "number": `9`,
    "id": `VO154751`,
    "name": `Виолана 300`,
    "type": `акустическая гитара`,
    "reviews": `3`,
    "strings": `7`,
    "price": `1700`,
    "image": guitar5
  },
  {
    "number": `10`,
    "id": `TK244556`,
    "name": `СURT Clasic`,
    "type": `электрогитара`,
    "reviews": `20`,
    "strings": `4`,
    "price": `23000`,
    "image": guitar1
  },
  {
    "number": `11`,
    "id": `TK134663`,
    "name": `СURT Z250`,
    "type": `электрогитара`,
    "reviews": `19`,
    "strings": `4`,
    "price": `18700`,
    "image": guitar2
  },
  {
    "number": `12`,
    "id": `SO123212`,
    "name": `Честер 7X`,
    "type": `электрогитара`,
    "reviews": `30`,
    "strings": `7`,
    "price": `35000`,
    "image": guitar3
  },
  {
    "number": `13`,
    "id": `SO123234`,
    "name": `Честер 6V`,
    "type": `электрогитара`,
    "reviews": `28`,
    "strings": `6`,
    "price": `14900`,
    "image": guitar4
  },
  {
    "number": `14`,
    "id": `VO519510`,
    "name": `Виолана Mix`,
    "type": `акустическая гитара`,
    "reviews": `7`,
    "strings": `6`,
    "price": `7600`,
    "image": guitar5
  },
  {
    "number": `15`,
    "id": `VO457369`,
    "name": `Виолана 250`,
    "type": `акустическая гитара`,
    "reviews": `19`,
    "strings": `6`,
    "price": `6500`,
    "image": guitar6
  },
  {
    "number": `16`,
    "id": `FB625903`,
    "name": `Фабио Лайт`,
    "type": `акустическая гитара`,
    "reviews": `26`,
    "strings": `7`,
    "price": `12000`,
    "image": guitar1
  },
  {
    "number": `17`,
    "id": `FB576948`,
    "name": `Фабио L100`,
    "type": `акустическая гитара`,
    "reviews": `31`,
    "strings": `7`,
    "price": `9900`,
    "image": guitar2
  },
  {
    "number": `18`,
    "id": `LU012032`,
    "name": `Liana Z200`,
    "type": `акустическая гитара`,
    "reviews": `28`,
    "strings": `12`,
    "price": `8900`,
    "image": guitar3
  },
  {
    "number": `19`,
    "id": `LU546853`,
    "name": `Liana Z100`,
    "type": `акустическая гитара`,
    "reviews": `34`,
    "strings": `12`,
    "price": `10500`,
    "image": guitar4
  },
  {
    "number": `20`,
    "id": `LU458283`,
    "name": `Liana Z300`,
    "type": `акустическая гитара`,
    "reviews": `9`,
    "strings": `6`,
    "price": `13300`,
    "image": guitar5
  },
  {
    "number": `21`,
    "id": `RO324341`,
    "name": `Roman RX`,
    "type": `укулеле`,
    "reviews": `37`,
    "strings": `4`,
    "price": `4800`,
    "image": guitar6
  },
  {
    "number": `22`,
    "id": `RO214235`,
    "name": `Roman TX`,
    "type": `укулеле`,
    "reviews": `5`,
    "strings": `4`,
    "price": `1900`,
    "image": guitar1
  },
  {
    "number": `23`,
    "id": `DI132414`,
    "name": `Dania U100`,
    "type": `укулеле`,
    "reviews": `23`,
    "strings": `4`,
    "price": `2500`,
    "image": guitar2
  },
  {
    "number": `24`,
    "id": `DI934754`,
    "name": `Dania WR`,
    "type": `укулеле`,
    "reviews": `3`,
    "strings": `4`,
    "price": `3800`,
    "image": guitar3
  },
  {
    "number": `25`,
    "id": `DI034292`,
    "name": `Dania LE`,
    "type": `укулеле`,
    "reviews": `10`,
    "strings": `4`,
    "price": `4100`,
    "image": guitar4
  },
  {
    "number": `26`,
    "id": `MI193214`,
    "name": `Mirana V10`,
    "type": `укулеле`,
    "reviews": `14`,
    "strings": `4`,
    "price": `2700`,
    "image": guitar5
  },
  {
    "number": `27`,
    "id": `VO043244`,
    "name": `Виолана Mi`,
    "type": `укулеле`,
    "reviews": `29`,
    "strings": `4`,
    "price": `6700`,
    "image": guitar6
  },
  {
    "number": `27`,
    "id": `VO0432442`,
    "name": `Виолана Mi`,
    "type": `укулеле`,
    "reviews": `29`,
    "strings": `4`,
    "price": `6700`,
    "image": guitar6
  },
];

const SortTypes = {
  PRICE: `по цене`,
  POPULARITY: `по популярности`
};

const SortDirections = {
  ASCENDING: `по возрастанию`,
  DESCENDING: `по убыванию`
};

const Prices = {
  PRICE_SEPARATOR: 3,
  MIN_PRICE: `min-price`,
  MAX_PRICE: `max-price`,
};

const AVAILABLE_STRINGS = [4, 6, 7, 12];
const ESCAPE_KEYCODE = 27;
const GUTARS_SORTED_BY_PRICE = GUITARS.slice().sort((a, b) => b.price - a.price);
const MAX_GUITAR_PRICE = GUTARS_SORTED_BY_PRICE[0].price;
const MIN_GUITAR_PRICE = GUTARS_SORTED_BY_PRICE[GUTARS_SORTED_BY_PRICE.length - 1].price;

const GUITAR_TYPES = [
  {
    id: `acoustic-guitars`,
    group: `Акустические гитары`,
    name: `акустическая гитара`,
    availableAmountOfStrings: [6, 7, 12]
  },
  {
    id: `electric-guitars`,
    group: `Электрогитары`,
    name: `электрогитара`,
    availableAmountOfStrings: [4, 6, 7]
  },
  {
    id: `ukulele`,
    group: `Укулеле`,
    name: `укулеле`,
    availableAmountOfStrings: [4]
  },
];

const returnSeparatedPrice = (price) => {
  let separatedPrice = typeof price === `string` ? price.split(``).reverse() : price.toFixed().split(``).reverse();

  for (let i = Prices.PRICE_SEPARATOR; i < separatedPrice.length; i = i + Prices.PRICE_SEPARATOR + 1) {
    separatedPrice.splice(i, 0, ` `);
  }
  return separatedPrice.reverse().join(``);
};

export {GUITARS, GUITAR_TYPES, ESCAPE_KEYCODE, AVAILABLE_STRINGS, MAX_GUITAR_PRICE, MIN_GUITAR_PRICE, SortTypes, SortDirections, Prices, returnSeparatedPrice};
