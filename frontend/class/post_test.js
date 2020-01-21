const SAKURA_URL = 'http://127.0.0.1:3000/stanzas'

function postTest() {
  let requestBody = JSON.stringify({
    "stanza" : {
      "lines_attributes" : [
         {
            "text" : "we this is so fun"
         },
         {
            "text" : "I think I might dance"
         }
      ]
    }
  });
  console.log('fetch');
  fetch( SAKURA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: requestBody
    })
    .then( response => {
      return response.json();
    })
    .then( object => {
      console.log(object);
    })
    .catch( error => {
      //document.body.innerHTML = error.message;
      console.log(error.message);
    })
}

function showTest(id) {

  fetch( `http://127.0.0.1:3000/stanzas/${id}` )
    .then( response => {
      return response.json();
    })
    .then( object => {
      console.log(object);
    })
    .catch( error => {
      //document.body.innerHTML = error.message;
      console.log(error.message);
    })
}
