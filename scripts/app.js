//  Getting DB chat logs
defAccount().then(defUser =>{
    defUser.getChats(data => {
        console.log(data)
    });
    
    // listener for the name form submit; updates defUser.id properity
    chNameForm.addEventListener('submit', e => {
        e.preventDefault();

        defUser.updateName(chNameField.value)
            .then(()=>{
                console.log("Name changed");
                localStorage.setItem("user",chNameField.value);
            });
    });

    //  listener for the room btns; updates defUser.room properity
    topicBtns.forEach(btn=>{
        btn.addEventListener('click', e =>{
            e.preventDefault();
            
            defUser.updateRoom(btn.id).then(()=>{
                
                defUser.getChats(data =>{
                    console.log(data);
                });
            });
        });
    });

    //  listener for the msg form submit; creates a new message and saves it to the DB
    msgForm.addEventListener('submit', e=>{
        e.preventDefault();

        defUser.addMsg(msgField.value);
        msgForm.reset();
        console.clear();
    })
})
    .catch(err => console.log(err));
