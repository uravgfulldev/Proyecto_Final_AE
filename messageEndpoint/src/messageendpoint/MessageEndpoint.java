/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package messageendpoint;

import envioyrecibo.ColaIntegracion;
import java.io.IOException;
import java.util.concurrent.TimeoutException;

/**
 *
 * @author luisg
 */
public class MessageEndpoint {
    
    private ColaIntegracion colaIntegracion;
    
    /**
     * 
     */
    public MessageEndpoint() {
        this.colaIntegracion = new ColaIntegracion();
    }
    
    /**
     * 
     * @param mensaje
     * @throws IOException
     * @throws TimeoutException 
     */
    public void enviar(String mensaje) throws IOException, TimeoutException {
        this.colaIntegracion.enviaMensaje(mensaje);
    }
    
    /**
     * 
     * @return
     * @throws IOException
     * @throws TimeoutException
     * @throws InterruptedException 
     */
    public String recibir() throws IOException, TimeoutException, InterruptedException {
        return this.colaIntegracion.recibeMensaje();
    }
}
