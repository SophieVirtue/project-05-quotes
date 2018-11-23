(function($){
    $(function() {

        let lastPage = '';
    
    $('#new-quote-button').on('click', function(event){
        event.preventDefault();
        getQuote();
    });
    
    function getQuote(){

        lastPage = document.URL;

        $.ajax({
            method: 'GET',
            url: qod_vars.rest_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1', 
        }).done(function(data){
            const quote = data[0];

            history.pushState(null, null, qod_vars.home_url + '/' + quote.slug)

            $('.post').empty();

            $('.post').append(
            `<div class="entry-content">
             ${quote.content.rendered}
            </div>
            <div class="entry-meta">
                <h2 class="entry-title">&mdash; ${quote.title.rendered}</h2>
                <span class="source">
                    
                </span>
            </div>`);

            if (quote._qod_quote_source_url.length > 0) {
                $('.source').append(`,<a href="${quote._qod_quote_source_url}">&nbsp;${quote._qod_quote_source}</a>`);
              } else if (quote._qod_quote_source.length > 0) {
                $('.source').append(`, ${quote._qod_quote_source}`);
              } else {
                $('.source').append(``);
              }
            
            }).fail(function(err){
            $('.post').empty();
            alert('Apologies, this page is not loading...');
        });
    }

    $(window).on('popstate', function(){
        window.location.replace(lastPage);
    });

    //Submit form and create a new quote post
    $( '#quote-submission-form' ).on( 'submit', function(){
        event.preventDefault();
        postQuote();
    });

    function postQuote(){

         const quoteTitle = $('#quote-author').val();
         const quoteContent = $('#quote-content').val();
         const quoteSource = $('#quote-source').val();
         const quoteSourceUrl = $('#quote-source-url').val();


        $.ajax({
            method: 'POST',
            url: qod_vars.rest_url + 'wp/v2/posts',
            data: {
                title: quoteTitle, 
                content: quoteContent,
                _qod_quote_source: quoteSource, 
                _qod_quote_source_url: quoteSourceUrl,
                status: 'pending'
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader( 'X-WP-Nonce', qod_vars.nonce );
            }
        }).done(function(){  
            $('#quote-submission-form').slideUp(500);
            $('.quote-submission').append(`<p class="replace-content">Thanks, your quote submission was received!</p>`);
        }).fail(function(){
            alert('We are not able to submit this quote, are you missing a field?');
        });
    }

    });
})(jQuery);