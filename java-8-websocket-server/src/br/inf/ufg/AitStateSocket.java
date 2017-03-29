package br.inf.ufg;

import java.io.IOException;

import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.StatusCode;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketError;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

@WebSocket(maxTextMessageSize = 1024 * 1024)
public class AitStateSocket {
	
	public static String state = "null";

	@OnWebSocketClose
	public void onClose(int statusCode, String reason) {
		System.out.println("Close: statusCode=" + statusCode + ", reason=" + reason);
	}

	@OnWebSocketError
	public void onError(Throwable t) {
		System.out.println("Error: " + t.getMessage());
	}

	@OnWebSocketConnect
	public void onConnect(Session session) {
		System.out.println("Connect: " + session.getRemoteAddress().getAddress());
	}

	@OnWebSocketMessage
	public void onMessage(Session session, String message) {
		if(message.equalsIgnoreCase("close")) {
			session.close(StatusCode.NORMAL, "Connection shutdown requested!");
			return;
		}
		else if(message.equalsIgnoreCase("state")) {
			try {
				session.getRemote().sendString(state);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		else {
			System.out.println("State updated!");
			state = message;
			//System.out.println("State: " + state);
		}
	}
}