interface UserLogin {
    id: number;
    login: string;
    password: string;
    token?: string | null;
}

export default UserLogin;