class Api {

    constructor(baseUrl){
        this.baseUrl = baseUrl
    }

    postUserLogin = async (user) => {

        const response = await fetch(`${this.baseUrl}/user/login`,{
            method: "POST",
            headers: {
                'Content-Type' : "application/json"
            },
            body: JSON.stringify(user)
        })

        return await response.json()
        
    }

    postUserSignUp = async (user) => { 

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

        return await response.json("http://localhost:3001/api/v1")
    }

    patchUserProfile = async (user, headers) => {

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