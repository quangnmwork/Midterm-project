
const productDOM = document.querySelector(".product__center");
const cartDOM = document.querySelector(".cart");
const cartContent = document.querySelector(".cart__centent");
const openCart = document.querySelector(".person__cart");
const closeCart = document.querySelector(".close__cart");
const overlay = document.querySelector(".cart__overlay");
const cartTotal = document.querySelector(".cart__total");
const clearCartBtn = document.querySelector(".clear__cart");
const itemTotals = document.querySelector(".item__total");
const btnLogout  = document.querySelector(".person__logout");
const orderCartBtn = document.querySelector(".order__cart");
const footerCart = document.querySelector(".cart__footer h3");
const state = {
    products:[],
    carts:[],
}
const  getProducts = async () => {
    try {
      const result = await fetch("products.json");
      const data = await result.json();
      const products = data.items;
      return products ;
    } catch (err) {
      console.log(err);
    }
}
const createProductObject = (data) => {
    return {
        id:data.id,
        title:data.title,
        price:data.price,
        image_url:data.image_url
    }
}
class userView {
    btnDOM ;
    btnIsDisable = [];
    displayProducts(products){
      let markup = products.map(product => 
        `<div class="product">
        <div class="image__container">
          <img src="${product.image_url}" alt="" />
        </div>
        <div class="product__footer">
          <h1>${product.title}</h1>
          <div class="rating">
            <span>
              <svg>
                <use xlink:href="./image/sprite.svg#icon-star-full"></use>
              </svg>
            </span>
            <span>
                <svg>
                  <use xlink:href="./image/sprite.svg#icon-star-full"></use>
                </svg>
            </span>
            <span>
              <svg>
                <use xlink:href="./image/sprite.svg#icon-star-empty"></use>
              </svg>
            </span>
          </div>
          <div class="bottom">
            <div class="btn__group">
             <button class="btn__add"  data-id=${product.id}>${!state.carts.some(item => item.id === product.id)?'Add To Cart':'In Cart'}</button>                 
            </div>
            <div class="price">$${product.price}</div>
          </div>
        </div>
        </div> `
       ).join('');
       productDOM.innerHTML = '' ; 
       productDOM.insertAdjacentHTML('beforeend',markup);
    }
    buttonAddHandler(products){
        const btnAdd = document.querySelectorAll('.btn__add');
        this.btnDOM  = [...btnAdd] ;
        btnAdd.forEach(btn => {
            btn.addEventListener('click',(event) => {
                event.preventDefault();
                const btnId = btn.dataset.id;            
                btn.innerText ='In Cart'; 
                btn.disabled = true;
                const inCart = state.carts.find(item => item.id === parseInt(btnId, 10));
                if(!inCart){
                    const newCart = {...productStorage.getProduct(btnId),amount:1};
                    state.carts = [...state.carts,newCart];
                    productStorage.saveCart(state.carts);
                    this.setItemValues(state.carts)
                    this.addCartHandler(newCart);
                }
            })
        })
    }
    toggleCartHanndler(){
        cartDOM.classList.toggle("show");
        overlay.classList.toggle("show");
    }
    cartShowHandler() {
        openCart.addEventListener('click',(event) => {
            event.preventDefault();
            this.toggleCartHanndler()
        })
        closeCart.addEventListener('click',(event) => {
            event.preventDefault();
            this.toggleCartHanndler();
        })
    }
    addCartHandler(product) {
        const markup = `
            <div class="cart__item">
            <img src="${product.image_url}" alt="">
            <div>
            <h3>The Original Super Donut</h3>
            <h3 class="price">$${product.price}</h3>
            </div>
            <div>
            <span class = "increase__item" data-id = ${product.id}>
                <svg>
                <use xlink:href="image/sprite.svg#icon-angle-up"></use>
                </svg>
            </span>
            <p>${product.amount}</p>
            <span class ="decrease__item" data-id = ${product.id}>
                <svg>
                <use xlink:href="image/sprite.svg#icon-angle-down"></use>
                </svg>
            </span>
            </div>
            <div>
            <span class="remove__item " data-id =${product.id} >
                <svg >
                <use xlink:href="image/sprite.svg#icon-trash"></use>
                </svg>
            </span>
                </div>
            </div>
        `
        cartContent.insertAdjacentHTML('beforeend',markup);
    }
    setItemValues(cart) {
      let tempTotal = 0;
      let itemTotal = 0;
  
      cart.map(item => {
        tempTotal += item.price * item.amount;
        itemTotal += item.amount;
      });
      cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
      itemTotals.innerText = itemTotal;
    }
    cartLogicHandler() {
      // Clear Cart
      clearCartBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.clearCart();
        window.localStorage.removeItem('cart');
      });
      //Oder cart
      orderCartBtn.addEventListener('click',(e) =>{
        e.preventDefault();
        this.clearCart();
        footerCart.innerHTML = 'Thank you for oder'
        window.localStorage.removeItem('cart');
      })
  
      // Cart Functionality
      cartContent.addEventListener("click", e => {
        const target = e.target.closest("span");
        const targetElement = target.classList.contains("remove__item");
        if (!target) return;
  
        if (targetElement) {
          const id = parseInt(target.dataset.id);
          console.log(id)
          this.removeItem(id);
          cartContent.removeChild(target.parentElement.parentElement);
          this.setItemValues(state.carts);
        } 
        if (target.classList.contains("increase__item")) {
            const id = parseInt(target.dataset.id, 10);
            let tempItem = state.carts.find(item => item.id === id);
            tempItem.amount++;
            productStorage.saveCart(state.carts);
            this.setItemValues(state.carts);
            target.nextElementSibling.innerText = tempItem.amount;
        }
        if (target.classList.contains("decrease__item")) {
            const id = parseInt(target.dataset.id, 10);
            let tempItem = state.carts.find(item => item.id === id);
            tempItem.amount--;
          if (tempItem.amount > 0) {
            productStorage.saveCart(state.carts);
            this.setItemValues(state.carts);
            target.previousElementSibling.innerText = tempItem.amount;
          } else {
            this.removeItem(id);
            cartContent.removeChild(target.parentElement.parentElement);
          }
        }
      });
    }
    clearCart() {
      const cartItems = state.carts.map(item => item.id);
      cartItems.forEach(id => this.removeItem(id));
  
      while (cartContent.children.length > 0) {
        cartContent.removeChild(cartContent.children[0]);
      }
      state.carts = [];
      this.setItemValues(state.carts);
    }
  
    removeItem(id) {
      const cart = state.carts.filter(item => item.id !== id);
      this.setItemValues(cart);
      productStorage.saveCart(cart);
      let button = this.getButton(id);
      button.disabled = false;
      button.innerText = "Add to Cart";
    }
    getButton(id) {
      return this.btnDOM.find(button => parseInt(button.dataset.id) === id);
    }
    refreshWindowHandler(){
      window.onbeforeunload = (event) => {
        event.preventDefault();
        state.carts = [] ; 
        productStorage.saveCart(state.carts);
      }
    }
    searchingHandler(products){
      let textValue = '';
      const searchingText  = document.querySelector('.search__input'); 
      const searchingBtn = document.querySelector('.searchButton');
      searchingText.addEventListener('input',(event) =>{
          textValue = event.target.value;
      })
      searchingBtn.addEventListener('click',(event) =>{
        event.preventDefault();
        const filterProducts = state.products.filter((item) => {
           return (item.title.toLowerCase().includes(textValue.toLowerCase()));
        })
        this.displayProducts(filterProducts);
        this.buttonAddHandler(filterProducts);
      })
    }
    logoutHandler() {
      btnLogout.addEventListener('click',(event) => {
        event.preventDefault();
        window.location.pathname='/Midterm-project/login.html'
      })
    }

    
}
class productStorage {
    static saveProduct(obj) {
      localStorage.setItem("products", JSON.stringify(obj));
    }
    static getProduct(id) {
      const products = JSON.parse(localStorage.getItem("products"));
      return products.find(product => product.id === parseFloat(id, 10));
    }
    static saveCart(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    static getCart() {
      return localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
    }
}

const init = () => {
    const products = getProducts() ; 
    ui = new userView(); 
    products.then(data => {
        data.map(i => state.products.push(i));
        ui.displayProducts(state.products);
        productStorage.saveProduct(state.products);
        ui.buttonAddHandler(state.products);
        ui.cartShowHandler();
        ui.cartLogicHandler();
        ui.refreshWindowHandler();
        ui.searchingHandler(state.products);
        ui.logoutHandler();
    })
}
init();
