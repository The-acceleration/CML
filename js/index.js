// Функция для замены содержимого контейнера на странице
function replaceNewsContainer(newsType) {
    // Получаем контейнер для новостей
    var newsContainer = document.getElementById("news-container");

    // Очищаем содержимое контейнера
    newsContainer.innerHTML = "";

    // Получаем данные из XML файла
    fetch('js/index.xml')
        .then(response => response.text())
        .then(xmlText => {
            // Преобразуем XML текст в DOM объект
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmlText, 'text/xml');

            // Получаем все элементы <item>
            var items = xmlDoc.getElementsByTagName('item');

            // Преобразуем каждый элемент <item> в объект новости
            // Преобразуем каждый элемент <item> в объект новости
for (var i = 0; i < 6; i++) {
    var item = items[i];
    var image = item.getElementsByTagName('img-path')[0].textContent;
    var date = item.getElementsByTagName('date')[0].textContent;
    var title = item.getElementsByTagName('title')[0].textContent;
    var type = item.getElementsByTagName('type')[0].textContent;

    // Получаем все теги <content> внутри текущего элемента <item>
    var contentElements = item.getElementsByTagName('content');
    var contentArray = [];

    // Добавляем содержимое каждого тега <content> в массив
    for (var j = 0; j < contentElements.length; j++) {
        contentArray.push(contentElements[j].textContent);
    }

    // Объединяем содержимое массива в строку с разделителем "$new-paragraph"
    var content = contentArray.join('$new-paragraph');

    // Фильтруем новости в соответствии с типом
    if (newsType === "all" || type === newsType) {
        var newsItem = document.createElement("div");
        newsItem.classList.add("article");

        // Создаем ссылку для каждой новости
        var newsLink = document.createElement("a");
        newsLink.classList.add("gay1");
        newsLink.href = "news_detail.html?title=" + encodeURIComponent(title) + "&content=" + encodeURIComponent(content) + "&date=" + encodeURIComponent(date) + "&type=" + encodeURIComponent(type)+ "&img-path=" + encodeURIComponent(image);
        newsLink.innerHTML = "<img src=\"" + image+ "\" alt=\"" + "\">" +
        "<h2 class=\"gay2\">" + title + "</h2>" +
        "<p class=\"gay2\">Дата: " + date + "</p>";

        // Добавляем ссылку в элемент новости
        newsItem.appendChild(newsLink);

        // Добавляем элемент новости на страницу
        newsContainer.appendChild(newsItem);
    }
}

        })
        .catch(error => console.error('Ошибка загрузки данных:', error));
}


document.addEventListener("DOMContentLoaded", function() {
    // Политика
    document.getElementById("nburger_js1").addEventListener("click", function(event) { event.preventDefault(); replaceNewsContainer("politics"); });
    // Экономика
    document.getElementById("nburger_js2").addEventListener("click", function(event) { event.preventDefault(); replaceNewsContainer("economy"); });
    // Спорт
    document.getElementById("nburger_js3").addEventListener("click", function(event) { event.preventDefault(); replaceNewsContainer("sports"); });
    // Наука
    document.getElementById("nburger_js4").addEventListener("click", function(event) { event.preventDefault(); replaceNewsContainer("science"); });
    // Политика
    document.getElementById("burger_js1").addEventListener("click", function(event) { event.preventDefault(); replaceNewsContainer("politics"); });
    // Экономика
    document.getElementById("burger_js2").addEventListener("click", function(event) { event.preventDefault(); replaceNewsContainer("economy"); });
    // Спорт
    document.getElementById("burger_js3").addEventListener("click", function(event) { event.preventDefault(); replaceNewsContainer("sports"); });
    // Наука
    document.getElementById("burger_js4").addEventListener("click", function(event) { event.preventDefault(); replaceNewsContainer("science"); });
    // Все новости
    document.getElementById("all-news-link").addEventListener("click", function(event) { event.preventDefault(); replaceNewsContainer("all"); });
    replaceNewsContainer("all");
});

function setSecondElementWidth() {
    var firstElementWidth = document.getElementById('first-element-gay').width;
    document.getElementById('second-element').style.maxWidth = firstElementWidth + "px";
    document.getElementById('third-element').style.maxWidth = firstElementWidth + "px";
  }
  setSecondElementWidth();
  window.addEventListener('resize', setSecondElementWidth);
  
  document.addEventListener("DOMContentLoaded", function() {
    // Получаем все ссылки в навигационном меню
    var navLinks = document.querySelectorAll("nav a");

    // Обходим каждую ссылку
    navLinks.forEach(function(link) {
        // Добавляем обработчик события при нажатии на ссылку
        link.addEventListener("click", function(event) {
            // Проверяем, что текущая ссылка не ведет на about.html
            if (link.getAttribute("href") !== "about.html") {
                // Получаем элемент с id="main-news"
                var mainNews = document.getElementById("main-news");
                // Скрываем элемент
                mainNews.style.display = "none";
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    // Получаем ссылку на "Новостной канал"
    var allNewsLink = document.getElementById("all-news-link");

    // Добавляем обработчик события при нажатии на ссылку
    allNewsLink.addEventListener("click", function(event) {
        // Получаем элемент с id="main-news"
        var mainNews = document.getElementById("main-news");
        // Возвращаем стиль к исходному состоянию (показываем элемент)
        mainNews.style.display = "flex";
    });
});
