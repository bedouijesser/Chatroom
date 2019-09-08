const chatWindow = document.querySelector('chat-window');
const msgForm = document.querySelector('body > div > form.input-group.mb-3');
const msgField = document.querySelector('#msg');
const chNameForm = document.querySelector('body > div > form.input-group.mb-2');
const chNameField = document.querySelector('#user-name')
const topicBtns = document.querySelectorAll('body > div > div.chat-rooms.mb-3.text-center > button');


// Chatroom main class
class Chatroom {
    constructor(room,id) {
        this.id = id,
        this.room = room, 
        this.users = users,
        this.unsub,
        this.DBid
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
        const response = this.users.doc(this.id).set(chat);
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
                            } else if (change.type == 'modified'){
                                console.log(change.doc.data())
                            }        
                        });
                    });

    }  

    async updateName(newId) {
        this.id = newId;
        localStorage.setItem('user',this.newId);
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
        counter = data.data().count;

        
        
        //check local storage for an existing account
        if ( !(localStorage.getItem("user")) ) {
            
            // making a new instence for an Anony user 
            defUser = new Chatroom("lobby",`Anony${counter}`);
            
            // adding a blank message to save the instence to the db
            defUser.addMsg("")
                .then(()=> console.log("User added"))
                .catch(err=> console.log(err));

            //set the user name to local storage under the "user" key
            localStorage.setItem("user",`Anony${counter}`);

                //  increment the defCounter value
            defUser.users.doc("defCounter").update({
                count: counter + 1
            });

            } else {
            defUser = new Chatroom("lobby",localStorage.getItem("user"));
            defUser.users.doc(localStorage.getItem("user")).delete();
            
            }
        
            
    }). catch (err => console.log(err))
    return defUser;
};

