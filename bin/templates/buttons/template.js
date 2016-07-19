define(function () {

    return '\
    <div class="bbc-news-vj-sharetools bbc-news-vj-sharetools--buttons">\
        <ul class="share__tools ">\
            <% for ( var i = 0; i < networks.length; i++ ) { %>\
                <li class="share__tool share__tool--<%=networks[i] %>">\
                    <a href="#" data-network="<%=networks[i] %>" class="share__tool--network">\
                        <span><%=networks[i].charAt(0).toUpperCase() + networks[i].slice(1) %></span>\
                    </a>\
                </li>\
            <% } %>\
        </ul>\
    </div>\
    ';

});