const msgField = document.querySelector('#msg');
const chNameField = document.querySelector('#user-name')
const topicBtns = document.querySelectorAll('body > div > div.chat-rooms.mb-3.text-center > button');

const logNewUser =() =>{
    const newUser = {
        id: "Anonym",
        lastMessage: "",
        lastMessageTime:"" 
    };
    users.add(newUser);
}




// event listener for the chatroom buttons

topicBtns.forEach(btn => {
    btn.addEventListener('click' , e =>{
        e.preventDefault();

        console.log(btn.getAttribute('id'));
    })
});
