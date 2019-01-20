var charList = ["Iron Man", "Captain America", "Spider-Man", "Thor", "Hulk", "Deadpool",
                 "Wolverine", "Magneto", "Dr. Strange", "Ant-Man", "Black Widow",
                 "Venom", "Groot", "Star Lord", "Ultron", "Loki", "Gamora"]

//API reference https://api.giphy.com/v1/gifs/search?q=Spider%20Man&api_key=z1IwOYprI4qGGTTgjzqit9IDATm3d7q0

var currentChar = {
    id: [],
    rating: [],
    stillUrl: [],
    activeUrl: []
}

$(document).ready(function() {
    //Create buttons for search field
    $("form").submit(function(event) {
        event.preventDefault();
        var inputVal = $("#search-gif").val();
        newCharacter = $("<button>").text(inputVal).addClass("btn btn-secondary char");
        $("#char-list").append(newCharacter)
    });

    //Create buttons for the initial Character List Array
    for (i = 0; i < charList.length; i++) {
        newButton = $("<button>").text(charList[i]).addClass("btn btn-secondary char")
        $("#char-list").append(newButton)
    }

    //When a character's button is clicked, get request for .char's values
    $(document).on("click" , ".char", function() {
        $("#gifs").empty()
        character = $(this).text();
        $.ajax({ 
            url: "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=z1IwOYprI4qGGTTgjzqit9IDATm3d7q0",
            method: "GET"
            }).then(function(response) {
                console.log(response)
                for(i = 0; i < 20; i++) {
                    currentChar.id[i] = i;
                    currentChar.rating[i] = response.data[i].rating;
                    currentChar.stillUrl[i] = response.data[i].images.fixed_width_still.url;
                    currentChar.activeUrl[i] = response.data[i].images.fixed_width.url;
                    gif = $("<span>").addClass("clearfix")
                    imgRating = $("<p>").text("Rating: " + currentChar.rating[i])
                    charImg = $("<img>").attr("src", response.data[i].images.fixed_width_still.url).attr("data-id", currentChar.id[i]).attr("data-still", "true")
                    gif.append(imgRating, charImg)
                    $("#gifs").append(gif)

                }
            });
    });

    //toggle between still and active gifs
    $(document).on("click", "img", function() {
        if ($(this).attr("data-still") === "true") {
            var tempI = $(this).attr("data-id")
            $(this).attr("src", currentChar.activeUrl[tempI])
            $(this).attr("data-still", "false"); 
        } else if 
        ($(this).attr("data-still") === "false") {
            var tempI = $(this).attr("data-id")
            $(this).attr("src", currentChar.stillUrl[tempI])
            $(this).attr("data-still", "true");
        }

    });


});