const msgForm = document.querySelector('body > div > form.input-group.mb-3');
const msgField = document.querySelector('#msg');
const chNameForm = document.querySelector('body > div > form.input-group.mb-2');
const chNameField = document.querySelector('#user-name')
const topicBtns = document.querySelectorAll('body > div > div.chat-rooms.mb-3.text-center > button');
const chatWindow = document.querySelector('chat-window');
const chatList = document.querySelector('ul');


//creating a new ChatUi instence
const chatUi = new ChatUi(chatList);

//  Getting DB chat logs
defAccount().then(defUser =>{
    defUser.getChats(data => {
        chatUi.printf(data)
    });
    
    // listener for the name form submit; updates defUser.id properity
    chNameForm.addEventListener('submit', e => {
        e.preventDefault();

        defUser.updateName(chNameField.value)
            .then(()=>{
                console.log("Name changed");
                localStorage.setItem("user",chNameField.value);
            });
        chNameField.setAttribute('placeholder', `Your new id = ${chNameField.value}`);
        chNameForm.reset();
    });

    //  listener for the room btns; updates defUser.room properity
    topicBtns.forEach(btn=>{
        btn.addEventListener('click', e =>{
            e.preventDefault();
            
            defUser.updateRoom(btn.id).then(()=>{
                chatList.innerHTML=''
                defUser.getChats(data =>{
                    chatUi.printf(data);
                });
            });
        });
    });

    //  listener for the msg form submit; creates a new message and saves it to the DB
    msgForm.addEventListener('submit', e=>{
        e.preventDefault();

        defUser.users.doc(localStorage.getItem("user")).delete();
        defUser.addMsg(msgField.value);
        msgForm.reset();
        console.clear();
    })
})
    .catch(err => console.log(err));
