window.onload = function() {
    var url = "http://192.168.0.133:5000/simpleHub";
    var connection = new signalR.HubConnectionBuilder().withUrl(url).build();

    //Disable send button until connection is established
    document.getElementById("sendButton").disabled = true;

    connection.on("ReceiveMessage", function (user, message) {
        console.log("recieved message");
        var ele = document.createElement("div");
        ele.innerHTML = message;
        document.getElementById("xD").appendChild(ele);
    });

    connection.start().then(function () {
        document.getElementById("sendButton").disabled = false;
    }).catch(function (err) {
        return console.error(err.toString());
    });

    document.getElementById("sendButton").addEventListener("click", function (event) {
        console.log("button clicked");
        var user = document.getElementById("userInput").value;
        var message = document.getElementById("messageInput").value;
        connection.invoke("SendMessage", user, message).catch(function (err) {
            return console.error(err.toString());
        });
        event.preventDefault();
        console.log("msg sent");
    });
    console.log("End of the script");
}
