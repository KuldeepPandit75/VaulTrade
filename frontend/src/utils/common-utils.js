
export const getAccessToken=()=> {
    const cookies = document.cookie.split('; ');
    
    for (let cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === 'access_token') {
        return decodeURIComponent(value); // Decode in case the token is URL-encoded
      }
    }
    return null; // Return null if the cookie is not found
}

export const getType=(value,body)=>{
    if(value.query){
        return {query: body}
    }else if(value.params){
        if(typeof body=== "object"){
            return {params: body._id}
        }else{
            return {params: body}
        }
    }
    return {};
}