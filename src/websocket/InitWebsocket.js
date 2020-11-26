export const InitWebsocket = ({ url, onmessage, onopen, onclose }) => {
  let ws = new WebSocket(url);

  const JsonParse = str => {
    try {
      return JSON.parse(str);
    } catch (e) {
      return false;
    }
  };

  ws.onopen = function() {
    ws.send(JSON.stringify({
        type: "auth",
        token: localStorage.getItem("access-token")
    }));
  };

  ws.onmessage = function(e) {
    console.log('Message:', JsonParse(e.data));
  };

  ws.onclose = function(e) {
    console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
    setTimeout(function() {
      InitWebsocket({url})
    }, 1000);
  };

  ws.onerror = function(err) {
    console.error('Socket encountered error: ', err.message, 'Closing socket');
    ws.close();
  };
  return ws
}