document.addEventListener("DOMContentLoaded", function() {
    var newsContainer = document.querySelector(".secondary-news-container");
    fetch('js/small-news.xml')
        .then(response => response.text())
        .then(xmlText => {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            var items = xmlDoc.getElementsByTagName('small-news');
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var image = item.getElementsByTagName('img-path')[0].textContent;
                var date = item.getElementsByTagName('date')[0].textContent;
                var title = item.getElementsByTagName('title')[0].textContent;
                var type = item.getElementsByTagName('type')[0].textContent;

                // Получаем все теги <content> внутри текущего элемента <small-news>
                var contentElements = item.getElementsByTagName('content');
                var contentArray = [];

                // Добавляем содержимое каждого тега <content> в массив
                for (var j = 0; j < contentElements.length; j++) {
                    contentArray.push(contentElements[j].textContent);
                }

                // Объединяем содержимое массива в строку с разделителем "$new-paragraph"
                var content = contentArray.join('$new-paragraph');

                // Создаем ссылку для каждой новости
                var newsLink = document.createElement("a");
                newsLink.href = "news_detail.html?title=" + encodeURIComponent(title) + "&content=" + encodeURIComponent(content) + "&date=" + encodeURIComponent(date) + "&type=" + encodeURIComponent(type) + "&img-path=" + encodeURIComponent(image);
                newsLink.innerHTML = "<div class=\"small-news-item\">" +
                    "<img src=\"" + image + "\" alt=\"" + "\">" +
                    "<h3>" + title + "</h3>" +
                    "</div>";

                // Добавляем ссылку в контейнер
                newsContainer.appendChild(newsLink);
            }
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));
});
