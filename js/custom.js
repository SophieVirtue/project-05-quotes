(function($){
    $(document).ready(function() {
    // get a random post and append content to the dom
    $('#new-quote-button').on('click', function(event){
        event.preventDefault();
        getQuote();
    });
    
    function getQuote(){
        $.ajax({
            method: 'GET',
            url: qod_vars.rest_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1', 
        }).done(function(data){

            $('.post').empty();

            $('.post').append(
            `<div class="entry-content">
             ${data[0].content.rendered}
            </div>`
            `<div class="entry-meta">
                <h2 class="entry-title">&mdash; ${data[0].title.rendered}</h2>
                <span class="source">
                    ,<a href="${data[0]._qod_quote_source_url}"> ${data[0]._qod_quote_source}</a>
                </span>
            </div>`);
            
            //append content to the DOM e.g. replace the quote content with rest api content TODO refer to instanews (no loops or filtering needed - just replacing data)
            }).fail(function(err){
            $(`.post`).empty();
            $(`.post`).append('<p>Apologies, this page is not loading...</p>');
        });
    }
    });
})(jQuery);