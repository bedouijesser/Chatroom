//render chat templates to the dom
//clear the chat list when room changes

class ChatUi {
    constructor(list){
        this.list = list
    }
    
    printf(user){
        const html = `<li>
                <span class="username">${user.id}</span>
                <span class="message">${user.message}</span>
                <div class="time">${user.created_at.toDate()}</div>
        </li>`;
        
        chatList.innerHTML += html;
    }
};

