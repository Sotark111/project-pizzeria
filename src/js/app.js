import { settings, select } from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';




  const app = {
    init: function () {
      const thisApp = this;
      thisApp.initData();
      thisApp.initCart(); 
      
    },

    initCart: function () {
  const thisApp = this;
  thisApp.cart = new Cart(document.querySelector(select.containerOf.cart));

  const orderForm = document.querySelector(select.cart.form);

  thisApp.productList = document.querySelector(select.containerOf.menu);
  thisApp.productList.addEventListener('add-to-cart', function(event){
  thisApp.cart.add(event.detail.product);
});

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
      console.log('Telefon:', phone);
      console.log('Adres:', address);

      orderForm.reset();
    });
  }
},

    initData: function () {
      const thisApp = this;
      thisApp.data = {};

      const url = settings.db.url + '/' + settings.db.products;
      fetch(url)
        .then(function (rawResponse) {
          return rawResponse.json();
        })
        .then(function (parsedResponse) {
          console.log('parsedResponse', parsedResponse);
          thisApp.data.products = parsedResponse;
          console.log('thisApp.data', JSON.stringify(thisApp.data));
          thisApp.initMenu();
        });

      console.log('thisApp.data', JSON.stringify(thisApp.data));

            },
    
   
 


    initMenu: function () {
      const thisApp = this;
      for (let productData of thisApp.data.products) {
        new Product(productData.id, productData);
      }
    }
    
  };
  
  app.init();
