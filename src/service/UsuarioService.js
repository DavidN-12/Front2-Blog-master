import axios from "axios";

const URL_Registro = "http://localhost:4445/auth/registrar";
const URL_Login = "http://localhost:4445/auth/login";
const URL_ResetPassword = "http://localhost:4445/auth/resetpassword";
const URL_UpdatePassword = "http://localhost:4445/auth/changepassword";

class UsuarioService {
  registrarUsuario(usuario) {
    return axios.post(URL_Registro, usuario)
      .catch(error => {
        console.error("Error al registrar usuario:", error);
        throw error; 
      });
  }

  iniciarSesion(credenciales) {
    return axios.post(URL_Login, credenciales)
      .catch(error => {
        console.error("Error al iniciar sesión:", error);
        throw error; 
      });
  }

  resetearContraseña(correo) {
    return axios.post(URL_ResetPassword, { correo: correo })
      .catch(error => {
        console.error("Error al restablecer la contraseña:", error);
        throw error; 
      });
  }

  async actualizarContraseña(token, newPassword) {
    try {
      const response = await axios.post(URL_UpdatePassword, { token, newPassword });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      throw error;
    }
  }
}

const usuarioService = new UsuarioService();
export default usuarioService;