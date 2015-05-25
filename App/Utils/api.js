var api = {
  getBio(username){
    username =  username.toLowerCase().trim();
    var url = `https://api.github.com/users/${username}`;
    console.log('fetching bio ', url)
    return fetch(url).then( (res) => res.json() );
  },
  getRepos(username){
    console.log('fetching repos for', username)
    username =  username.toLowerCase().trim();
    var url = `https://api.github.com/users/${username}/repos`
    return fetch(url).then( (res) => res.json() );
  },
  getNotes(username){
    username =  username.toLowerCase().trim();
    var url = `https://sweltering-heat-4959.firebaseio.com/${username}.json`
    console.log("get notes url", url)
    return fetch(url).then((res)=> res.json());
  },
  addNote(username, note){
    username =  username.toLowerCase().trim();
    var url = `https://sweltering-heat-4959.firebaseio.com/${username}.json`
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(note)
    }).then((res)=> res.json());
  }
};

module.exports = api;