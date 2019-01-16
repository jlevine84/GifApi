var charList = ["Iron Man", "Captain America", "Spider-Man", "Thor", "Hulk",
                 "Wolverine", "Magneto", "Dr. Strange", "Ant-Man", "Wasp",
                 "Venom", "Groot", "Thanos", "Blade", "Doctor Octopus"]

//API reference https://api.giphy.com/v1/gifs/search?q=Spider%20Man&api_key=z1IwOYprI4qGGTTgjzqit9IDATm3d7q0
    

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

    $(".char").click(function() {
        character = $(this).text();
        $.ajax({ 
            url: "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=z1IwOYprI4qGGTTgjzqit9IDATm3d7q0",
            method: "GET"
            }).then(function(response) {
                console.log(response.data)
            });
    });
});