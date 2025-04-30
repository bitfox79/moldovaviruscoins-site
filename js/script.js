document.addEventListener('DOMContentLoaded', () => {
  const SEGMENTS = 28;
  const REPS     = 3;
  const carousel = document.getElementById('carousel');
  const btn      = document.getElementById('spinButton');
  const resultEl = document.getElementById('result');
  const containerEl = document.querySelector('.slider-container');

  // Чёткий маппинг imageN → текст
  const results = {
    1:  { value: '-1кк',  text: 'Отличный день!' },
    2:  { value: '-5к',   text: 'Приходи еще!' },
    3:  { value: '-10к',  text: 'Ура спасибо за 10к!' },
    4:  { value: '-20к',  text: 'Логишно логишно' },
    5:  { value: '-15к',  text: '*уехал*' },
    6:  { value: '-100к', text: 'Получил и обналичил!' },
    7:  { value: '-7к',   text: 'Забил гвозди, забил на все проблемы!' },
    8:  { value: '0',     text: 'Не командуй' },
    9:  { value: '-50',   text: 'Косим деньги, косим капусту' },
    10: { value: '-1к',   text: 'Мало денег' },
    11: { value: '-2к',   text: 'Только у нас на мордор рп такая рулетка!' },
    12: { value: '-25к',  text: 'Это ограбление!' },
    13: { value: '-500$', text: 'Придется работать...' },
    14: { value: '-3к',   text: 'Время помыть тарелки...' },
    15: { value: '-500к', text: 'Спс лушая в мире!' },
    16: { value: '-50к',  text: 'Придется угнать эту тачку!' },
    17: { value: '-100$', text: 'Воды купить хоть...' },
    18: { value: '-150к', text: 'Удача тебе точно понадобится!' },
    19: { value: '-25к',  text: 'Такими темпами голодать придется!' },
    20: { value: '-150к', text: 'Можно и не работать!' },
    21: { value: '-250к', text: 'Не забыть поделиться с Кабан Кабанычем!' },
    22: { value: '-200к', text: 'Теперь мы банда!' },
    23: { value: '-8к',   text: 'Какая работа?' },
    24: { value: '-50$',  text: 'Давай крути еще раз!' },
    25: { value: '-300к', text: 'Деньги прихвати и приходи!' },
    26: { value: '-350к', text: 'Давай сюда свои денежки!' },
    27: { value: '-400к', text: 'Бери бери' },
    28: { value: '-2кк',  text: 'Кабан Кабаныч!' },
  };

  // 1) собираем 3 копии ленты
  for (let r = 0; r < REPS; r++) {
    for (let i = 1; i <= SEGMENTS; i++) {
      const img = document.createElement('img');
      img.src = `images/image${i}.jpg`;
      carousel.appendChild(img);
    }
  }

  // 2) меряем ширину контейнера и ставим на 2-ю копию
  const STRIDE = containerEl.clientWidth;
  const totalW = SEGMENTS * STRIDE;
  let initialOffset = - totalW;
  carousel.style.transform = `translateX(${initialOffset}px)`;

  let spinning = false;
  btn.addEventListener('click', () => {
    if (spinning) return;
    spinning = true;
    resultEl.innerHTML = '';

    const pick = Math.floor(Math.random() * SEGMENTS) + 1;
    // два полных цикла + нужный сдвиг
    const shift = initialOffset - totalW * 2 - (pick - 1) * STRIDE;

    carousel.style.transition = 'transform 4s cubic-bezier(.17,.67,.83,.67)';
    carousel.style.transform  = `translateX(${shift}px)`;

    carousel.addEventListener('transitionend', function handler() {
      carousel.removeEventListener('transitionend', handler);

      const { value, text } = results[pick];
      resultEl.innerHTML = `
        <div class="result-value">${value}</div>
        <div class="result-text">${text}</div>
      `;

      // мгновенно возвращаемся на позицию pick во 2-ю копию
      const resetPos = initialOffset - (pick - 1) * STRIDE;
      carousel.style.transition = 'none';
      carousel.style.transform  = `translateX(${resetPos}px)`;
      setTimeout(() => {
        carousel.style.transition = '';
        spinning = false;
      }, 50);
    });
  });
});
