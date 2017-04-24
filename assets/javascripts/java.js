$(document).ready(function() {
    var arr = ['hamburger', 'hotdog', 'french fries', 'taco', 'burrito', 'milk shake', 'sushi', 'ramen', 'bulgogi', 'korean bbq', 'jamon', 'paella', 'pad thai']

    function start() {
        for (var i = 0; i < arr.length; i++) {
            var but = $("<button type='button' class='btn btn-info'>");
            but.html(arr[i]);
            $('#buttonBox').append(but);
        }
    }
    start();

    $("#add").on('click', function() {
        var name = $('#inputBox').val().trim();
        var but = $("<button type='button' class='btn btn-info'>");
        but.html(name);
        $('#buttonBox').append(but)
    });
    $(document).on('click', '.btn', gifs);
    $(document).on('click', 'img', clicks);

    function clicks() {

        if ($(this).data('status') == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).data('status', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).data('status', 'still');
        }
    }

    function gifs() {
        var animal = $(this).html();
        console.log(animal)
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            console.log(response)
            for (var i = 0; i < response.data.length; i++) {
                var divHolder = $('<span>');
                var rating = $('<h4> Rating: ' + response.data[i].rating + '</h4>');
                var imgStill = response.data[i].images.fixed_height_still.url;
                var imgAnimate = response.data[i].images.fixed_height.url;
                var img = $('<img class="rounded">');
                img.attr('src', imgStill);
                img.attr('data-still', imgStill);
                img.attr('data-animate', imgAnimate);
                img.attr('data-status', 'still');
                img.attr;
                divHolder.prepend(rating)
                divHolder.prepend(img)
                $('#imageHolder').prepend(divHolder)
            }


        })
    }

});
