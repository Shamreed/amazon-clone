import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
  id: '1',
  deliverydays: 7,
  priceCents: 0
}, {
  id: '2',
  deliverydays: 3,
  priceCents: 499
}, {
  id: '3',
  deliverydays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  
  return deliveryOption || deliveryOptions[0];
}

function isWeekend(date) {
  const day = date.format('dddd');
  return day === 'Saturday' || day === 'Sunday';
}

export function calculateDeliveryDate(deliveryOption) {
  let remainingDate = deliveryOption.deliverydays;
  let deliveryDate = dayjs();
  
  while (remainingDate > 0) {
    deliveryDate = deliveryDate.add(1, 'days');

    if (!isWeekend(deliveryDate)) {
      remainingDate--;
    }
  }

  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );
  
  return dateString;
}