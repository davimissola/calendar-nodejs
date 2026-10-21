import './login.css'




export function Login() {
    return (
        <main className="page-login">
            <form action="#">
                <h2>Login</h2>

                <div className="auth__campo-form">
                    <label htmlFor="username">Username :</label>
                    <input type="text" id='username' name='username' />
                </div>
                <div className="auth__campo-form">
                    <label htmlFor="senha">Senha :</label>
                    <input type="password" id='senha' name='senha' />
                </div>
            </form>
        </main>
    )
}