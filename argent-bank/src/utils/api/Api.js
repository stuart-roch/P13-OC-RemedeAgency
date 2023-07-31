class Api {

    constructor(baseUrl){
        this.baseUrl = baseUrl
    }

    postUserLogin = async (username,password) => {
        
        const user = {email: username , password: password}

        const response = await fetch(`${this.baseUrl}/user/login`,{
            method: "POST",
            headers: {
                'Content-Type' : "application/json"
            },
            body: JSON.stringify(user)
        })

        return await response.json()
        
    }

    postUserSignUp = async (email, password, firstName, lastName) => { 

        const user = {email: email , password: password, firstName: firstName, lastName: lastName}

        const response = await fetch(`${this.baseUrl}/user/signup`,{
            method: "POST",
            headers: {
                'Content-Type' : "application/json"
            },
            body: JSON.stringify(user)
        })

        return await response.json()

    }
    
    postUserProfile = async (headers) => {

        const response = await fetch(`${this.baseUrl}/user/profile`,{
            method: "POST",
            headers: {
                ...headers,
                'Content-Type' : "application/json"
            },
        })

        return await response.json()
    }

    patchUserProfile = async (firstName, lastName, headers) => {

        const user = {firstName: firstName, lastName: lastName}

        const response = await fetch(`${this.baseUrl}/user/profile`,{
            method: "PATCH",
            headers: {
                ...headers,
                'Content-Type' : "application/json"
            },
            body: JSON.stringify(user)
        })

        return await response.json()

    }

  }

  // eslint-disable-next-line import/no-anonymous-default-export
  export default new Api("http://localhost:3001/api/v1")