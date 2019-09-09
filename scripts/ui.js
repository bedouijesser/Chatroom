//render chat templates to the dom
//clear the chat list when room changes

class ChatUi {
    constructor(list){
        this.list = list
    }
    
    printf(user){
        
        const timeNow = new Date().getTime();
        var diffTime = Math.round((timeNow - user.created_at.toMillis())/1000/60);
        if(diffTime > 60) {diffTime =Math.round(diffTime/ 60) + ' hours'}
        else{diffTime += ' minutes'}
       
        var addedChange ='';
        if (user.id === defUser.id) addedChange = 'float-right';       
        const html = `<li class="list-group-item float-right">
                <span class="username">${user.id} :</span>
                <span class="message">${user.message}</span>
                <div class="time">${diffTime}  ago</div>
        </li>`;
        
        chatList.innerHTML += html;
        
       
    }
};

