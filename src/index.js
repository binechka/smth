
const form = document.querySelector(".search-form")
const cardList = document.querySelector(".card-box")
const inputEl = document.querySelector('div[name="choose-country"]')
import axios from 'axios';


let page = 1;
let size = 16;
let currentCode = "";
// let countryCode = "";
const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
const key = 'gq43zGRtwYd9WTdGGX7KlpGS3X1lGFUk';

export default async function fetchEventCards(name) {
  let options = {
    baseURL: `${baseUrl}?apikey=${key}&size=${size}`,
    method: 'GET',
    params: {
      page: page,
        keyword: name,
        countryCode: currentCode,
    },
  };
  try {
      const response = await axios(options);
      const events = response.data._embedded.events;
      const countryEl = response.data._embedded.events[0]._embedded.venues[0].country.name;
      console.log(events);
    return countryEl
  } catch (error) {
    console.log(error);
  }
}
fetchEventCards()

form.addEventListener("submit", renderCards)


export function renderCards(e) {
    e.preventDefault();
let formSearch = inputEl.elements.value;
    console.log(formSearch)
    
  fetchEventCards().then(events => {
    console.log(events)
    //   eventsData = events;
    const markup = events
      .map(
        event => {
          //eventsData[event.id] = event;
          //console.log(eventsData);
          return `<li class="event-card" data-id="${event.id}">
          <a href="#" class="event-card__link" >
            <div class="event-card__img-wrapper">
              <span class="event-card__border-elem"></span>
              <img
                src="${event.images[0].url}"
                alt=""
                class="event-card__img"
              />
            </div>
            <div class="event-card__descr">
              <h2 class="event-card__title">${event.name}</h2>
              <p class="event-card__date">${event.dates.start.localDate}</p>
              <p class="event-card__location">
               <svg class="event-card__location-icon" width="7" height="10">
                    <use href="./images/location.svg"></use>
             </svg>
              <span>${event.dates.timezone}</span></p>
            </div>
          </a>
        </li>`
        })
      .join('');

    cardList.insertAdjacentHTML('beforeend', markup);
    // addListenerLinks();
  });
}


let select = function () {
  let selectItem = document.querySelectorAll('.select__item');
  let selectCountry = document.querySelectorAll('.select-country');

  selectCountry.forEach(e => {
    e.addEventListener('click', selectToggle);
  });

  selectItem.forEach(e => {
    e.addEventListener('click', selectChoose);
  });

  function selectToggle() {
    this.parentElement.classList.toggle('is-active');
  }
  function selectChoose() {
    let text = this.innerText;

    let select = this.closest('.select');
    let currentText = select.querySelector('.select-current-country');
    currentText.innerText = text;

    select.classList.remove('is-active');
    console.dir();
  }
};
select();
