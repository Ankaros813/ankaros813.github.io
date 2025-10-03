(function() {
    function displaySearchResults(results, store) {
        var searchResults = document.getElementById('search-results');
        if (results.length) {
            var appendString = '';
            for (var i = 0; i < results.length; i++) {
                var item = store[results[i].ref];
                appendString += '<li><a href="' + item.url + '"><h6>' + item.title + '</h6></a>';
                appendString += '<p>' + item.content.substring(0, 150) + '...</p></li>';
            }
            searchResults.innerHTML = appendString;
        } else {
            searchResults.innerHTML = '<li>검색 결과가 없습니다.</li>';
        }
    }

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
            }
        }
    }

    var searchTerm = getQueryVariable('query');

    if (searchTerm) {
        var searchBox = document.getElementById('search-box');
        if (searchBox) searchBox.value = searchTerm;

        // 인덱스 생성 + 데이터 추가 (루프 안)
        var idx = lunr(function () {
            this.ref('id');
            this.field('title', { boost: 10 });
            this.field('author');
            this.field('category');
            this.field('content');

            for (var key in window.store) {
                if (window.store.hasOwnProperty(key)) {
                    this.add({
                        id: key,
                        title: window.store[key].title,
                        author: window.store[key].author,
                        category: window.store[key].category,
                        content: window.store[key].content
                    });
                }
            }
        });

        var results = idx.search(searchTerm);
        displaySearchResults(results, window.store);
    }
})();