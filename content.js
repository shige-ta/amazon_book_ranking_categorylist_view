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

    

    // Amazonギフトチャージボタンの作成
    const kindlehigawari = document.createElement('button');
    kindlehigawari.id = 'kindlehigawari';
    kindlehigawari.className = 'tab-link';
    kindlehigawari.textContent = 'Kindle 日替わり';
    kindlehigawari.onclick = () => {
        window.location.href = 'https://www.amazon.co.jp/Kindle%E6%97%A5%E6%9B%BF%E3%82%8F%E3%82%8A/b?ie=UTF8&node=3338926051';
    };




    tabContainer.appendChild(kindlehigawari);



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

    tabContainer.appendChild(tabList);

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

}

// DOMContentLoaded イベントを使用して、DOMが完全に読み込まれた後に実行する
document.addEventListener('DOMContentLoaded', () => {
    createTabs();
});

// または、すでにDOMが読み込まれている場合のために、即時実行も追加
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    createTabs();
}
