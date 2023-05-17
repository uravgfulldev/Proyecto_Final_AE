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
     * @param cola
     * @throws IOException
     * @throws TimeoutException 
     */
    public void enviar(String mensaje, String cola) throws IOException, TimeoutException {
        this.colaIntegracion.enviaMensaje(mensaje,cola);
    }
    
    /**
     * 
     * @return
     * @param cola
     * @throws IOException
     * @throws TimeoutException
     * @throws InterruptedException 
     */
    public String recibir(String cola) throws IOException, TimeoutException, InterruptedException {
        return this.colaIntegracion.recibeMensaje(cola);
    }
}
