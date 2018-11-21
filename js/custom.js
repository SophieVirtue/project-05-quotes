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
            url: qod_vars.rest_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
        }).done(function(data){
            //append content to the DOM e.g. replace the quote content with rest api content TODO refer to instanews (no loops or filtering needed - just replacing data)
            console.log(data);

        }).fail(function(err){
            //Append a message for the user or alert a message saying something went wrong TODO
            console.log(err);
        });
    }
    });
})(jQuery);