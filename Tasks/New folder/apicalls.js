// GET REQUEST
function getTodos() {
    axios.get('/api/todos')
      .then(function(response) {
        showOutput(response);
      })
      .catch(function(error) {
        console.error(error);
      });
  }
  
  // POST REQUEST
  function addTodo() {
    axios.post('/api/todos', {
        title: 'New Todo',
        completed: false
      })
      .then(function(response) {
        showOutput(response);
      })
      .catch(function(error) {
        console.error(error);
      });
  }
  
  // PUT/PATCH REQUEST
  function updateTodo() {
    axios.put('/api/todos/1', {
        title: 'Updated Todo',
        completed: true
      })
      .then(function(response) {
        showOutput(response);
      })
      .catch(function(error) {
        console.error(error);
      });
  }
  
  // DELETE REQUEST
  function removeTodo() {
    axios.delete('/api/todos/1')
      .then(function(response) {
        showOutput(response);
      })
      .catch(function(error) {
        console.error(error);
      });
  }
  
  // SIMULTANEOUS DATA
  function getData() {
    axios.all([
        axios.get('/api/todos'),
        axios.get('/api/posts')
      ])
      .then(axios.spread(function(todosResponse, postsResponse) {
        showOutput(todosResponse);
        showOutput(postsResponse);
      }))
      .catch(function(error) {
        console.error(error);
      });
  }
  
  // CUSTOM HEADERS
  function customHeaders() {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer your_token_here'
      }
    };
  
    axios.get('/api/todos', config)
      .then(function(response) {
        showOutput(response);
      })
      .catch(function(error) {
        console.error(error);
      });
  }
  
  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    const options = {
      transformResponse: axios.defaults.transformResponse.concat(function(data) {
        data.title = data.title.toUpperCase();
        return data;
      })
    };
  
    axios.get('/api/todos', options)
      .then(function(response) {
        showOutput(response);
      })
      .catch(function(error) {
        console.error(error);
      });
  }
  
  // ERROR HANDLING
  function errorHandling() {
    axios.get('/api/todos')
      .then(function(response) {
        showOutput(response);
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', error.message);
        }
      });
  }
  
  // CANCEL TOKEN
  function cancelToken() {
    const source = axios.CancelToken.source();
  
    axios.get('/api/todos', {
        cancelToken: source.token
      })
      .then(function(response) {
        showOutput(response);
      })
      .catch(function(thrown) {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message);
        } else {
          console.error(thrown);
        }
      });
  
    if (true) {
      source.cancel('Request canceled manually.');
    }
  }
  