/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package persistencia;

import dominio.Usuario;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author luisg
 */
public class UsuariosDAO {
    
    private final String CADENA_CONEXION = "jdbc:mysql://mysql-server:3306/sistema_gerencia";
    private final String USUARIO = "root";
    private final String CONTRASENIA = "1234";
    private final String DRIVER_NAME = "com.mysql.cj.jdbc.Driver";
    
    public Usuario consultarUsuario(String username, String password) {
        Usuario usuario = null;
        
        try {
            Class.forName(DRIVER_NAME);
            Connection connection = DriverManager.getConnection(CADENA_CONEXION, USUARIO, CONTRASENIA);
            
            String sql = "SELECT usuario, password FROM usuarios WHERE usuario = '" + username + "' AND password = '" + password + "';";
            PreparedStatement comando = connection.prepareStatement(sql);
            ResultSet resultado = comando.executeQuery();
            
            if (resultado.next()) {
                String nombreUsuario = resultado.getString("usuario");
                String contrasenia = resultado.getString("password");
                
                usuario = new Usuario(nombreUsuario, contrasenia);
            }
            
            connection.close();
            return usuario;
        } catch (SQLException | ClassNotFoundException ex) {
            System.err.println(ex.getMessage());
            return usuario;
        }
    }
}
