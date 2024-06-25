// タブを作成する関数
function createTabs() {
    const categoryRoot = document.querySelector('._p13n-zg-nav-tree-all_style_zg-browse-group__88fbz');
    if (!categoryRoot) {
        console.log('Category root element not found. Exiting tab creation.');
        return;
    }

    const categoryLinks = categoryRoot.querySelectorAll('._p13n-zg-nav-tree-all_style_zg-browse-item__1rdKf a');
    if (categoryLinks.length === 0) {
        console.log('No category links found. Exiting tab creation.');
        return;
    }

    const tabContainer = document.createElement('div');
    tabContainer.id = 'category-tabs';
    tabContainer.setAttribute('role', 'tablist'); // role属性を追加


    // 検索コンテナの作成
    const searchContainer = document.createElement('div');
    searchContainer.id = 'search-container';

    const searchInput = document.createElement('input');
    searchInput.id = 'search-input';
    searchInput.type = 'text';
    searchInput.placeholder = '検索キーワードを入力';

    // エンターキーが押されたときの処理
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            performSearch();
        }
    });

    const searchButton = document.createElement('button');
    searchButton.id = 'search-button';
    searchButton.textContent = '注文履歴内検索';
    searchButton.onclick = performSearch;

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchButton);

    tabContainer.appendChild(searchContainer);


    // Amazonギフトチャージボタンの作成
    const giftChargeButton = document.createElement('button');
    giftChargeButton.id = 'gift-charge-button';
    giftChargeButton.className = 'tab-link';
    giftChargeButton.textContent = 'Amazon ギフトチャージ';
    giftChargeButton.onclick = () => {
        window.location.href = 'https://www.amazon.co.jp/combinedreload?ref_=gcui_b_e_cr_c_d';
    };

    tabContainer.appendChild(giftChargeButton);

    

    // Kindle日替わりボタンの作成
    const kindlehigawari = document.createElement('button');
    kindlehigawari.id = 'kindlehigawari';
    kindlehigawari.className = 'tab-link';
    kindlehigawari.textContent = 'Kindle 日替わり';
    kindlehigawari.onclick = () => {
        window.location.href = 'https://www.amazon.co.jp/Kindle%E6%97%A5%E6%9B%BF%E3%82%8F%E3%82%8A/b?ie=UTF8&node=3338926051';
    };

    tabContainer.appendChild(kindlehigawari);

    // 欲しいものリストボタンの作成
    const wishlistButton = document.createElement('button');
    wishlistButton.id = 'wishlist-button';
    wishlistButton.className = 'tab-link';
    wishlistButton.textContent = '欲しいものリスト';
    wishlistButton.onclick = () => {
        window.location.href = 'https://www.amazon.co.jp/hz/wishlist/ls?requiresSignIn=1&ref_=nav_AccountFlyout_wl';
    };

    // 欲しいものリストボタンをタブコンテナに追加
    tabContainer.appendChild(wishlistButton);

    const tabList = document.createElement('ul');
    tabList.className = 'tab-list';

    categoryLinks.forEach((link, index) => {
        const tabItem = document.createElement('li');
        tabItem.className = 'tab-item';

        const tab = document.createElement('a');
        tab.className = 'tab-link';
        tab.textContent = link.textContent;
        tab.href = link.href;
        tab.setAttribute('role', 'tab'); // role属性を追加

        if (index === 0) {
            tabItem.classList.add('active');
        }

        tabItem.appendChild(tab);
        tabList.appendChild(tabItem);
    });



    if (categoryRoot) {
        categoryRoot.insertAdjacentElement('beforebegin', tabContainer);
    } else {
        console.log('Ranking header element not found. Unable to insert tabs.');
    }

    // カテゴリーのルート要素を非表示にする
    categoryRoot.style.display = 'none';

    // 現在のページURLと一致するタブをアクティブにする
    const currentUrl = window.location.href;
    const tabs = tabList.querySelectorAll('.tab-link');
    tabs.forEach(tab => {
        if (tab.href === currentUrl) {
            tab.parentElement.classList.add('active');
        }
    });

    // 検索を実行する関数
    function performSearch() {
        const searchQuery = encodeURIComponent(searchInput.value.trim());
        if (searchQuery) {
            const searchUrl = `https://www.amazon.co.jp/gp/legacy/order-history?opt=ab&search=${searchQuery}&_encoding=UTF8&ref_=ppx_yo2ov_dt_b_search`;
            window.location.href = searchUrl;
        }
    }

   // おすすめ商品のランダム表示とカウント機能の追加
   const productContainer = document.createElement('div');
   productContainer.id = 'random-product-container';

   const productLink = document.createElement('a');
   productLink.id = 'random-product-link';
   productLink.href = '#';

   const productImage = document.createElement('img');
   productImage.id = 'random-product-image';
   productLink.appendChild(productImage);

   const productTitle = document.createElement('div');
   productTitle.id = 'random-product-title';
   productContainer.appendChild(productLink);
   productContainer.appendChild(productTitle);

   let clickCount = 0;
   const clickThreshold = 5;

   productLink.addEventListener('click', (e) => {
       e.preventDefault();
       clickCount++;
       displayRandomProduct();
       if (clickCount >= clickThreshold && !document.getElementById('view-product-button')) {
           viewProductButton.onclick = () => {
               window.location.href = productLink.href;
           };
           productContainer.appendChild(viewProductButton);
       }
   });

   tabContainer.appendChild(productContainer);
   displayRandomProduct(); // 初期表示
   tabContainer.appendChild(tabList);
}
function displayRandomProduct() {
    const productItems = document.querySelectorAll('.zg-grid-general-faceout');
    if (productItems.length === 0) {
        console.log('No products found.');
        return;
    }

    const randomIndex = Math.floor(Math.random() * productItems.length);
    const randomProduct = productItems[randomIndex];

    const productLink = document.getElementById('random-product-link');
    const productImage = document.getElementById('random-product-image');
    const productTitle = document.getElementById('random-product-title');

    const imageElement = randomProduct.querySelector('img');
    // const titleElement = randomProduct.querySelector('.p13n-sc-truncated');
    // const linkElement = randomProduct.querySelector('a');
    console.log(imageElement)
    // console.log(titleElement)
    // console.log(linkElement)
    if (imageElement) {
        productImage.src = imageElement.src;
        // productImage.alt = titleElement.textContent;
        // productLink.href = linkElement.href;
        // productTitle.textContent = titleElement.textContent;
    } else {
        console.log('Product information not found.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    createTabs();
});

// または、すでにDOMが読み込まれている場合のために、即時実行も追加
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    createTabs();
}