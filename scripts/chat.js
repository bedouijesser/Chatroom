const chatWindow = document.querySelector('chat-window');


let html = `<li class="align-self-end mt-1">
<div class="card bg-light col-12">
        <div class="card-body">
            <p class="card-text" style="max-width: 25em" >Some text iqsdqsdddddd ddqsdqqsdsqq sdqsdqsdqsdqsdqsdqssdqsdqsdqssdnside the card</p>
        </div>
    </div>
</li>`;

users.onSnapshot(snapshot => {
    
    const changes = snapshot.docChanges();
    changes.forEach(change => {
        
    
    switch (change.type){
        
        case 'added': 
        console.log('user Added');
        const user = change.doc.data();
        if (user.lastMessage === '' ) console.log('user messag is empty')
        
            break;
        case 'modified':
        console.log('User Modified');
            break;
        case 'removed': 
        console.log('User Deleted');
            break;
    };
});
});


