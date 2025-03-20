const menuBtn = document.querySelector('.wrapper__navbar-btn'),
    modalWindow = document.querySelector('.wrapper__navbar-basket'),
    modalWindowClose = document.querySelector('.wrapper__navbar-close');


menuBtn.addEventListener('click', () => {
    modalWindow.classList.add('active');
});

modalWindowClose.addEventListener('click', () => {
    modalWindow.classList.remove('active');
});

const products = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSumm() {
            return this.amount * this.price;
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSumm() {
            return this.amount * this.price;
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSumm() {
            return this.amount * this.price;
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSumm() {
            return this.amount * this.price;
        }
    },
};


const productItemBtn = document.querySelectorAll('.wrapper__list-btn');
const basketTotalPrice = document.querySelector('.wrapper__navbar-totalprice');

productItemBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        plusOrMinus(btn);
    });
});

function plusOrMinus(btn) {
    const parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id');

    products[parentId].amount++;
    basket();
}


const basketCheckList = document.querySelector('.wrapper__navbar-checklist');

function basket() {
    const productsArray = [];

    for (const key in products) {

        const product = products[key];
        const productCard = document.querySelector(`#${product.name.toLowerCase()}`),
            productIndicator = productCard.querySelector('.wrapper__list-count');
        if (product.amount) {
            productsArray.push(product);
            productIndicator.classList.add('active');
            productIndicator.innerHTML = product.amount;
        } else {
            productIndicator.classList.remove('active');
            productIndicator.innerHTML = 0;
        }

        basketCheckList.innerHTML = '';
        for (let i = 0; i < productsArray.length; i++) {
            basketCheckList.innerHTML += cardItemGenerate(productsArray[i]);
        }

        const allCount = getTotalCount();
        if (allCount) {
            menuBtn.querySelector('.warapper__navbar-count').classList.add('active');
            menuBtn.querySelector('.warapper__navbar-count').innerHTML = allCount;
        } else {
            menuBtn.querySelector('.warapper__navbar-count').classList.remove('active');
        }
        basketTotalPrice.innerHTML = getTotalSumm();
    }
}



function getTotalCount() {

    let count = 0;

    for (const key in products) {
        count += products[key].amount;
    }

    return count;
}

function getTotalSumm() {

    let summ = 0;

    for (const key in products) {
        summ += products[key].totalSumm;
    }

    return summ.toString();
}


function cardItemGenerate(product) {

    const {
        name,
        totalSumm: price,
        img,
        amount
    } = product;

    return `
    
      <div class="wrapper__navbar-product">
          <div class="wrapper__navbar-info">
             <img src="${img}" class="wrapper__navbar-productImage" alt="productImage">
             <div class="wrapper__navbar-infoSub">
               <p class="wrapper__navbar-infoName">${name}</p>
               <p class="wrapper__navbar-infoPrice">${price}</p>
             </div>
          </div>
          
          <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
          <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
          <output class="wrapper__navbar-count">${amount}</output>
          <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
      </div>
    </div>
    `;
}


window.addEventListener('click', (e) => {

    const btn = e.target;

    if (btn.classList.contains('wrapper__navbar-symbol')) {

        const attr = btn.getAttribute('data-symbol');

        const parent = btn.closest('.wrapper__navbar-option');
        if (parent) {
            const parentId = parent.getAttribute('id').split('_')[0];
            if (attr == '-') products[parentId].amount--;
            else if (attr == '+') products[parentId].amount++;
            basket();
        }
    }
});



const printBody = document.querySelector('.print__body'),
    printFooter = document.querySelector('.print__footer'),
    checkListBtn = document.querySelector('.wrapper__navbar-bottom'),
    checkList = document.querySelector('.wrapper__navbar-checklist');

checkListBtn.addEventListener('click', () => {
    printBody.innerHTML = '';
    for (const key in products) {
        const {
            name,
            totalSumm,
            amount,
            img
        } = products[key];
        
        if (amount) {

        printBody.innerHTML += `
       <div class="wrapper__navbar-product">
       <div class="wrapper__navbar-info">
          <img src="${img}" class="wrapper__navbar-productImage" alt="productImage">
          <div class="wrapper__navbar-infoSub">
            <p class="wrapper__navbar-infoName"><span>Название:</span>${name}</p>
            <p class="wrapper__navbar-infoPrice"><span>Сумма:</span>${totalSumm}</p>
            <p class="wrapper__navbar-infoPrice"><span>Количество:</span>${amount}</p>
        </div>
        </div>
        </div>
       `;
        }

    }
    
    printFooter.innerHTML = `
    
    <div class="footer__info">
        <p class="footer__count"><span>Итого:</span>${getTotalCount()}</p>
        <p class="footer__sum"><span>Всего:</span>${getTotalSumm()}</p>
    </div>
    `;
    
    print();
})