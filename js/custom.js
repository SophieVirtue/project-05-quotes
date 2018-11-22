(function($){
    $(document).ready(function() {

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

            history.pushState(null, null, qod_vars.home_url + '/' + data[0].slug)

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

    $(window).on('popstate', function(){
        window.location.replace(lastPage);
    });

    //Submit form and create a new quote post
    $( '#quote-submission-form' ).on( 'submit', function(){
        event.preventDefault();
        postQuote();
    });

    //page 34 of AJAX lesson
    function postQuote(){

        //get values of your form inputs
        //  const quoteTitle = $('#form-id').val();

        $.ajax({
            method: 'POST',
            url: qod_vars.rest_url + 'wp/v2/posts',
            data: {
                title: quoteTitle, //for example
                //send title, quote author, source, etc. //also need to update the status somewhere
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader( 'X-WP-Nonce', qod_vars.nonce );
            }
        }).done(function(){
            // .slideUp (jQuery) the form
            //append a success message
        }).fail(function(){
            //ouput a message for the user saying something went wrong
        });
    }

    });
})(jQuery);