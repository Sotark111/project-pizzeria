/* global Flickity */


import { templates } from '../settings.js';

class Home {
  constructor(element) {
    this.render(element);
    this.initActions();
    this.initWidgets();
  }

  render(element) {
    const generatedHTML = templates.home(); 
    this.dom = {};
    this.dom.wrapper = element;
    this.dom.wrapper.innerHTML = generatedHTML;

    this.dom.orderBox = this.dom.wrapper.querySelector('.hero-order');
    this.dom.bookingBox = this.dom.wrapper.querySelector('.hero-booking');
    this.dom.carousel = this.dom.wrapper.querySelector('.carousel');
  }

  initActions() {
    this.dom.orderBox.addEventListener('click', () => {
      const event = new CustomEvent('navigate', {
        bubbles: true,
        detail: {
          to: '#order',
        },
      });
      this.dom.wrapper.dispatchEvent(event);
    });

    this.dom.bookingBox.addEventListener('click', () => {
      const event = new CustomEvent('navigate', {
        bubbles: true,
        detail: {
          to: '#booking',
        },
      });
      this.dom.wrapper.dispatchEvent(event);
    });
  }

  initWidgets() {
    new Flickity(this.dom.carousel, {
      cellAlign: 'left',
      contain: true,
      wrapAround: true,
      autoPlay: 3000,
      prevNextButtons: false,
      pageDots: true,
    });
  }
}

export default Home;
