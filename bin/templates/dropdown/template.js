define(function () {

    return '\
        <div class="share ns__share-dropdown">\
            <button class="share__button">\
                <%= label %>\
            </button>\
            <span class="share__overlay">\
                <p><%= label %></p>\
                <ul>\
                    <% for ( var i = 0; i < networks.length; i++ ) { %>\
                        <li class="share__tool share__tool--<%=networks[i] %>">\
                            <a id="<%=networks[i] %>__share-button" data-network="<%=networks[i] %>" class="share__tool--network" href="#">\
                                <span> <i aria-hidden="true" class="gelicon gelicon--<%=networks[i] %>"></i></span>\
                                <%=networks[i].charAt(0).toUpperCase() + networks[i].slice(1) %>\
                            </a>\
                        </li>\
                    <% } %>\
                </ul>\
                <a href="#" class="share__overlay-close"></a>\
             </span>\
         </div>\
    ';

});