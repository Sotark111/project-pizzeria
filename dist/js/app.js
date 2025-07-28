import { settings, select, classNames } from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';
import Booking from './components/Booking.js';
import Home from './components/Home.js';

const app = {
  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    // Pobierz id strony z hasha (format #/pageId)
    const idFromHash = window.location.hash.replace('#/', '');

    // Sprawdź, czy istnieje strona o takim id, jeśli nie -> home
    let pageMatchingHash =
      idFromHash && [...thisApp.pages].some(p => p.id === idFromHash)
        ? idFromHash
        : 'home';

    thisApp.activatePage(pageMatchingHash);

    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const id = this.getAttribute('href').replace('#/', '');
        thisApp.activatePage(id);
        window.location.hash = '#/' + id;
      });
    }

    // Nasłuchiwanie zmiany hasha (np. ręczna zmiana przez użytkownika)
    window.addEventListener('hashchange', () => {
      const newPageId = window.location.hash.replace('#/', '') || 'home';
      thisApp.activatePage(newPageId);
    });
  },

  activatePage: function (pageId) {
    const thisApp = this;

    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id === pageId);
    }

    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') === '#/' + pageId
      );
    }
  },

  initBooking: function () {
    const thisApp = this;
    const bookingContainer = document.querySelector(select.containerOf.booking);
    if (bookingContainer) {
      thisApp.booking = new Booking(bookingContainer);
    }
  },

  initHome: function () {
    const thisApp = this;
    const homeContainer = document.querySelector(select.containerOf.home);
    if (homeContainer) {
      thisApp.home = new Home(homeContainer);
    }
  },

  initCart: function () {
    const thisApp = this;
    thisApp.cart = new Cart(document.querySelector(select.containerOf.cart));

    const orderForm = document.querySelector(select.cart.form);
    thisApp.productList = document.querySelector(select.containerOf.menu);

    if (thisApp.productList) {
      thisApp.productList.addEventListener('add-to-cart', function (event) {
        thisApp.cart.add(event.detail.product);
      });
    }

    if (orderForm) {
      orderForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const phone = orderForm.querySelector(select.cart.phone).value;
        const address = orderForm.querySelector(select.cart.address).value;
        if (!phone || !address) {
          alert('Uzupełnij numer telefonu i adres!');
          return;
        }
        console.log('Zamówienie złożone!');
        orderForm.reset();
      });
    }
  },

  initData: function () {
    const thisApp = this;
    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.products;
    fetch(url)
      .then(raw => raw.json())
      .then(parsed => {
        thisApp.data.products = parsed;
        thisApp.initMenu();
      });
  },

  initMenu: function () {
    const thisApp = this;
    for (let productData of thisApp.data.products) {
      new Product(productData.id, productData);
    }
  },

  init: function () {
    const thisApp = this;
    thisApp.initData();
    thisApp.initCart();
    thisApp.initPages();
    thisApp.initHome();
    thisApp.initBooking();
  },
};

app.init();
 