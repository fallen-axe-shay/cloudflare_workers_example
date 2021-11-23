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
  } else if(request.url.includes('signup')) {
      response = await signupUser(request);
  } else if(request.url.includes('login')) {
      response = await loginUser(request);
  } else {
    response = new Response("Page not found", { status: 404 });
  }
  return response
}

async function signupUser(request) {
  let data = await request.json();
  let user = await Users.get(data.username);
  let JSONdata;
  try{
    if(user == null) {
      await Users.put(data.username, data.password);
      JSONdata = {
        status: 'OK',
        code: '200',
        message: "Successfully Signed Up"
      }
    } else {
      JSONdata = {
        status: 'Error',
        code: '100',
        message: "User Already exists"
      }
    }
  } catch(ex) {
    JSONdata = {
      status: 'Error',
      code: '105',
      message: ex.toString()
    }
  }
  return new Response(JSON.stringify(JSONdata), {status: 200})
}

async function loginUser(request) {
  let data = await request.json();
  let user = await Users.get(data.username);
  let JSONdata;
  try{
    if(user != null && data.password == user) {
      await Users.put(data.username, data.password);
      JSONdata = {
        status: 'OK',
        code: '200',
        message: "User exists"
      }
    } else {
      JSONdata = {
        status: 'Error',
        code: '100',
        message: "User does not exist."
      }
    }
  } catch(ex) {
    JSONdata = {
      status: 'Error',
      code: '105',
      message: ex.toString()
    }
  }
  return new Response(JSON.stringify(JSONdata), {status: 200})
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
