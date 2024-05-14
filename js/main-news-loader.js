document.addEventListener("DOMContentLoaded", function() {
    var newsLink = document.querySelector("#main-news-item-link");
    fetch('js/main-news.xml')
        .then(response => response.text())
        .then(xmlText => {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            var item = xmlDoc.getElementsByTagName('item')[0];
            var title = item.getElementsByTagName('title')[0].textContent;
            var date = item.getElementsByTagName('date')[0].textContent;
            var image = item.getElementsByTagName('img-path')[0].textContent;
            // Получаем все теги <content> внутри текущего элемента <small-news>
            var contentElements = item.getElementsByTagName('content');
            var contentArray = [];

            // Добавляем содержимое каждого тега <content> в массив
            for (var j = 0; j < contentElements.length; j++) {
                contentArray.push(contentElements[j].textContent);
            }

            // Объединяем содержимое массива в строку с разделителем "$new-paragraph"
            var content = contentArray.join('$new-paragraph');

            var newsUrl = "news_detail.html?title=" + encodeURIComponent(title) +
                          "&date=" + encodeURIComponent(date) +
                          "&content=" + encodeURIComponent(content) +
                          "&img-path=" + encodeURIComponent(image);

            newsLink.href = newsUrl;
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));
});
