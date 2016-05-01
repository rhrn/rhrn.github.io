var hoursOne = {
  1: 'час',
  2: 'два',
  3: 'три',
  4: 'четыре',
  5: 'пять',
  6: 'шесть',
  7: 'семь',
  8: 'восемь',
  9: 'девять',
  10: 'десять',
  11: 'одинадцать',
  12: 'двенадцать',
  0: 'двенадцать',
  13: 'час'
};

var hoursTwo = {
  1: 'первого',
  2: 'второго',
  3: 'третьего',
  4: 'четвёртого',
  5: 'пятого',
  6: 'шестого',
  7: 'седьмого',
  8: 'восьмого',
  9: 'девятого',
  10: 'десятого',
  11: 'одиннадцaтого',
  12: 'двенадцатого',
  13: 'первого'
};

var step = 'пять';

var minutesOne = {
  5: step,
  10: 'десять',
  15: 'пятнадцать',
  20: 'двадцать',
  25: 'двадцать ' + step,
  30: 'половина',
  35: 'тридцать ' + step
};

var step2 = 'пяти';

var minutesTwo = {
  5: step2,
  10: 'десяти',
  15: 'пятнадцати',
  20: 'двадцати',
  25: 'двадцати ' + step2
};

var declension = function(number, titles) {
  var cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number % 100 > 4 && number % 100 < 20) ?  2 : cases[(number % 10 < 5) ? number % 10 : 5] ];
};

var toWords = function(h, m) {

  var date; 

  if (h === undefined && m === undefined) {
    date = new Date();
  } else if (h instanceof Date) {
    date = h;
  }

  if (date) {
    h = date.getHours();
    m = date.getMinutes();
  }

  var hm = h > 12 ? h - 12 : h;
  var mod = m % 5, mr;

  if (mod === 0) {
    mr = m;
  } else if (mod < 3) {
    mr = m - mod;
  } else {
    mr = m + (5 - mod);
  }

  if (mr === 60) {
    hm++;
    h++;
    mr = 0;
  }

  var words = [];

  var night = h >= 0 && h <= 3 || h === 24;
  var morning = h >= 4 && h <= 11;
  var day = h >= 12 && h <= 17;
  var evening = h >= 18 && h <= 23;

  if (mr !== 0) {

    if (mr <= 35) {

      words.push(minutesOne[mr]);
      if (mr !== 30) {
        words.push('минут');
      }
      words.push(hoursTwo[hm + 1]);

    } else {

      words.push('без');
      words.push(minutesTwo[60 - mr]);
      words.push(hoursOne[hm + 1]);

    }

  } else if (mr === 0) {

    words.push(hoursOne[hm]);

    if (hm !== 1) {
      words.push(declension(hm, ['час', 'часа', 'часов']));
    }

    if (night) {
      words.push('ночи');
    }

    if (morning) {
      words.push('утра');
    }

    if (day) {
      words.push('дня');
    }

    if (evening) {
      words.push('вечера');
    }

  }

  return {
    hours: h,
    minutes: m,
    minutesRounded: mr,
    hoursMeridian: hm,
    mod: mod,
    words: words,
    value: words.join(' ')
  };
};

/*
return console.log(toWords());

var h, m, words;
for(h = 0; h <= 23; h += 1) {
  for(m = 0; m <= 59; m += 1) {
    words = toWords(h, m); 
    console.log(words);
  }
}
*/
