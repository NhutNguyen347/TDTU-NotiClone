$('input.typeahead').typeahead({
    name: 'email',
    //remote: 'http://localhost:3000/search?key=%QUERY',
    remote: 'https://tdtu-noticlone.herokuapp.com/search?key=%QUERY',
    limit: 10
});