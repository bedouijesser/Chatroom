const msgField = document.querySelector('#msg');
const chNameField = document.querySelector('#user-name')
const topicBtns = document.querySelectorAll('body > div > div.chat-rooms.mb-3.text-center > button');







// add a new user to the database
const logNewUser =() =>{
    const newUser = {
        id: "Anonym",
        lastMessage: "",
        lastMessageTime:"" 
    };
    users.add(newUser);
}

// delete user on exit ..? (still testing)
window.onbeforeunload = function (e) {
    var message = "Are you fuckin sure?";
    localStorage.add("key","this cond worked");

    var e = e || window.event;
    // For IE and Firefox
    if (e) {
      e.returnValue = message;
    }
  
    // For Safari
    return message;
  };


// event listener for the chatroom buttons

topicBtns.forEach(btn => {
    btn.addEventListener('click' , e =>{
        e.preventDefault();

        console.log(btn.getAttribute('id'));
    })
});
