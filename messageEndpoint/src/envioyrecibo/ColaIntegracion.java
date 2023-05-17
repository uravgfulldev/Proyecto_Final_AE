/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package envioyrecibo;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeoutException;

/**
 *
 * @author luisg
 */
public class ColaIntegracion {
    
    
    private ConnectionFactory factory;
    
    /**
     * 
     */
    public ColaIntegracion() {
        this.factory = new ConnectionFactory();
        this.factory.setHost("localhost");
    }
    
    /**
     * Función que se encarga de enviar un mensaje a la cola terra_minera.
     * 
     * @param mensaje Mensaje a enviar 
     * @param nombre_cola Nombre de cola 
     * @throws IOException 
     * @throws TimeoutException 
     */
    public void enviaMensaje(String mensaje,String nombre_cola) throws IOException, TimeoutException {
        try (Connection connection = this.factory.newConnection(); Channel channel = connection.createChannel()) {
            channel.queueDeclare(nombre_cola, false, false, false, null);
            channel.basicPublish("", nombre_cola, null, mensaje.getBytes(StandardCharsets.UTF_8));
        }
    }
    
    /**
     * 
     * @return
     * @param nombre_cola Nombre de cola 
     * @throws IOException
     * @throws TimeoutException
     * @throws InterruptedException 
     */
    public String recibeMensaje(String nombre_cola) throws IOException, TimeoutException, InterruptedException {        
        BlockingQueue<String> messageQueue = new LinkedBlockingQueue<>();
        
        try (Connection connection = this.factory.newConnection(); Channel channel = connection.createChannel()) {
            channel.queueDeclare(nombre_cola, false, false, false, null);
            
            DeliverCallback deliverCallback = (consumerTag, delivery) -> {
                String mensaje = new String(delivery.getBody(), StandardCharsets.UTF_8);
                messageQueue.offer(mensaje);
            };
            channel.basicConsume(nombre_cola, true, deliverCallback, consumerTag -> {
            });
        }
        
        String mensaje = messageQueue.take();
        return mensaje;
    }

    
}
