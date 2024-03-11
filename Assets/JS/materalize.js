
//This function allows the search field to offer autocompleated options
document.addEventListener('DOMContentLoaded', function() {
    var inputField = document.querySelector('.autocomplete');
    M.Autocomplete.init(inputField, {
        data:{
            "Death Star": null,
            "X-Wing": null,
            "Star Destroyer": null,
            "A-wing": null,
            "AA-9 Coruscant freighter": null,
            "B-wing": null,
            "Banking clan frigate": null,
            "CR90 corvette": null,
            "Calamari Cruiser": null,
            "Droid control ship": null,
            "EF76 Nebulon-B escort frigate": null,
            "Executor": null,
            "H-type Nubian yacht": null,
            "Imperial shuttle": null,
            "J-type diplomatic barge": null,
            "Jedi Interceptor": null,
            "Jedi starfighter": null,
            "Millennium Falcon": null,
            "Naboo Royal Starship": null,
            "Naboo fighter": null,
            "Naboo star skiff": null,
            "Rebel transport": null,
            "Republic Assault ship": null,
            "Republic Cruiser": null,
            "Republic attack cruiser": null,
            "Scimitar": null,
            "Sentinel-class landing craft": null,
            "Slave 1": null,
            "Solar Sailer": null,
            "TIE Advanced x1": null,
            "Theta-class T-2c shuttle": null,
            "Trade Federation cruiser": null,
            "V-wing": null,
            "Y-wing": null,
            "arc-170": null
        },

        //current limit of how many displayed at a given time is 5
        limit:5
    })
  });

//trigers the cart dropdown menu
const elems = document.querySelectorAll('.dropdown-trigger');
const instances = M.Dropdown.init(elems,{
    coverTrigger: false,
    closeOnClick: false,
});

// //carousel wrap
// const wheel = document.querySelector('.carousel');
// M.Carousel.init(wheel, {})




document.addEventListener('DOMContentLoaded', function() {
    let manufact = document.querySelectorAll('select');
   M.FormSelect.init(manufact, {
    data:{}
  });
});


document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.modal');
    M.Modal.init(elems,);
  });
  

  
  
 
