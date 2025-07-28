import { templates }  from '../settings.js';

const Flickity = window.Flickity;

class Home {
  constructor(element) {
    this.element = element;
    this.render();
    this.initWidgets();
    this.initActions();
  }

  render() {
    const template = templates.home;
    this.element.innerHTML = template();
    this.carouselElem = this.element.querySelector('.carousel');
    this.heroOrder = this.element.querySelector('.hero-order');
    this.heroBooking = this.element.querySelector('.hero-booking');
  }

  initWidgets() {
    this.flickity = new Flickity(this.carouselElem, {
      cellAlign: 'center',
      contain: true,
      autoPlay: 3000,
      wrapAround: true,
      pauseAutoPlayOnHover: false,
      prevNextButtons: false,
      pageDots: true,
    });
  }

  initActions() {
    this.heroOrder.addEventListener('click', () => {
      window.location.hash = '#order';
      this.setActiveLink('order');
    });
    this.heroOrder.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        this.heroOrder.click();
      }
    });

    this.heroBooking.addEventListener('click', () => {
      window.location.hash = '#booking';
      this.setActiveLink('booking');
    });
    this.heroBooking.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        this.heroBooking.click();
      }
    });

    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      this.setActiveLink(hash);
    });

    const initialHash = window.location.hash.replace('#', '') || 'home';
    this.setActiveLink(initialHash);
  }

  setActiveLink(page) {
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      if (href === page) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

export default Home;
