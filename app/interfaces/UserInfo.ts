interface authority {
    authority: string
}

export default interface UserInfo {
    name: string;
    surname: string; 
    email: string;
    nickname: string; 
    profileImage: string;
    googleId: string;
    status: boolean, 
    token: string, 
    enabled: boolean, 
    username: string, 
    password: string, 
    authority: authority[], 
    accountNonExpired: boolean, 
    accountNonLocked: boolean, 
    credentialsNonExpired: boolean
    id: number
}

