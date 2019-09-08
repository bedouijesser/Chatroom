const msgForm = document.querySelector('body > div > form.input-group.mb-3');
const msgField = document.querySelector('#msg');
const chNameForm = document.querySelector('body > div > form.input-group.mb-2');
const chNameField = document.querySelector('#user-name')
const topicBtns = document.querySelectorAll('body > div > div.chat-rooms.mb-3.text-center > button');
const chatWindow = document.querySelector('chat-window');

// Chatroom main class
class Chatroom {
    constructor(room,id) {
        this.id = id,
        this.room = room, 
        this.users = users,
        this.unsub
    }
   
    async addMsg(message) {
        //  creating a new message format
        const now = new Date();
        const chat = {
            id: this.id,
            room: this.room,
            message,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        //  save the msg to the DB
        const response = await this.users.add(chat);
        return response;
    }
    
    getChats(callback) {
        this.unsub = this.users
            .where('room','==',this.room)
                .orderBy('created_at')
                    .onSnapshot(snapshot => {
        
                        const changes = snapshot.docChanges();

                        changes.forEach(change => {
                            
                            if (change.type == 'added'){
                                callback(change.doc.data());                
                            };        
                        });
                    });

    }  

    async updateName(newId) {
        this.id = newId;
    }

    async updateRoom(newRoom) {
        this.room = newRoom;
    }
}

// add new user to the firestoreDB

var counter = 0;    // current number of Anony users on the db
var defUser;    // making a unique "Anony" user

const defAccount = async () => {  
    
    await users.doc("defCounter").get()
        
        .then(data => {
        const counter = data.data().count;

        // making a new instence for an Anony user 
        defUser = new Chatroom("lobby",`Anony${counter}`);

        defUser.addMsg("")
            .then(()=> console.log("User added"))
            .catch(err=> console.log(err));
        
        //  increment the defCounter value
        defUser.users.doc("defCounter").update({
            count: counter + 1
        })

    }).catch(err => console.log(err))
return defUser;
};


//  Getting DB chat logs
defAccount().then(user =>{
    user.getChats(data => {
        console.log(data)
    });
    
    // listener for the name form submit; updates defUser.id properity
    chNameForm.addEventListener('submit', e => {
        e.preventDefault();

        defUser.updateName(chNameField.value)
            .then(()=>console.log("Name changed"));
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
    })

})
    .catch(err => console.log(err));
