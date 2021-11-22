addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  let response;
  if(request.url.includes('posts')) {
    if (request.method === "POST") {
      response = await postData(request);
    } else {
      response = await readData(request);
    }
  } else {
    response = new Response("Page not found", { status: 404 });
  }
  return response
}

function postData(request) {
  //Generate POST response
  let JSONdata = {
    name: "gffd",
    id: "123"
  }
  return new Response(JSON.stringify(JSONdata), {status: 200})
}

function readData(request) {
  //Generate GET response
  let JSONdata = { 
    posts: [
      {
        name: "gffd",
        id: "123",
        title: "asdsad"
      }
  ]
}
  return new Response(JSON.stringify(JSONdata), {status: 200})
}
