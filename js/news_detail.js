var params = window.location.search.replace('?','').split('&').reduce(function(p,e) {
    var a = e.split('=');
    p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
    return p; 
 },{});
 
 var img = params['img-path'];
 var title = params['title'];
 var content = params['content'].split('$new-paragraph'); // Разделяем контент по разделителю
 var date = params['date'];
 var type = params['type'];

 var container = document.getElementById("news-data");
 var result_content = '';

 content.forEach(cntnt => {
    result_content += "<p class\"content\">"+ cntnt +"</p>";
 });

 container.innerHTML = 
 "<img id=\"img\" src=\""+ img + "\">"+
 "<div>"+
 "<div id=\"date\">" + date + "</div>" + 
 "<div id=\"title\">" + title + "</div>" + 
 result_content +
 "</div>";

 replaceNewsContainer(type);
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
            for (var i = 0; i < items.length; i++) {
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
                    newsLink.href = "news_detail.html?title=" + encodeURIComponent(title) + "&content=" + encodeURIComponent(content) + "&date=" + encodeURIComponent(date) + "&type=" + encodeURIComponent(type) + "&img-path=" + encodeURIComponent(image);
                    newsLink.innerHTML = "<img src=\"" + image + "\" alt=\"" + "\">" +
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

