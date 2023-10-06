// import { API_URL } from "../config"

// export     async function fetchUserByEmail(userEmail: string, name: string) {
//     const response = await fetch(
//         `${API_URL}/GetUserByAzureAdUserId?azureAdUserId=${userEmail}`,
//         {
//             method: 'GET',
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json',
//                 'Access-Control-Allow-Origin': '*',
//             },
//         }
//     )
//     if (response.ok) {
//         const user = await response.json()

//         setCurrentUser(user)
//     } else if (response.status === 404) {

//         const newUser = await createUser(userEmail, name)

//         if (newUser) {
//             setCurrentUser(newUser)
//         }
//     } else {
//         console.error('Error fetching user by email')
//     }
// }
// useEffect(() => {
//     if (idToken) {
//         fetchUserAndUpdateContext(idToken)
//     }
// }, [idToken])
