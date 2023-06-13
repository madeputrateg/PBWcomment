const comment =document.getElementById("comment");

function Processcomment(comment){
    let hasil='';
    if (comment.length>0){
        data=comment.map((val)=>{
            let comments=Processcomment(val.comments);
            return `<div>
            ${val.username} :
            " ${val.comment} "
            (${val.time}) 
            <form id="reply_comment">
            <input type=text name=comment_id value=${val.id} style="display:none;"></input>
            <input type=text name=comment placeholder=comment></input>
            <input type=submit value=reply> </input>
            </form>
            <div style="margin-left:20px;">
                ${comments}
            </div>
            </div>`
        });
        hasil=data.join("");
    }
    return hasil;
}



function init(){
    fetch("http://localhost:8001/comment/all")
    .then((response)=>{return response.json()})
    .then((hasil)=>{
        isi=hasil.map( (val)=>{
            let comments=Processcomment(val.comments);
            return `<div>
            ${val.username} :
            " ${val.comment} "
            (${val.time}) 
            <form id="reply_comment">
            <input type=text name="comment_id" value=${val.id} style="display:none;"></input>
            <input type=text name="comment" placeholder=comment></input>
            <input type=submit value=reply > </input>
            </form>
            <div style="margin-left:20px;">
                ${comments}
            </div>
            </div>`;
        });

        let data=`         
        <div>add comment</div>
        <form id="add_comment">
        <input type=text name="comment" placeholder=comment></input>
        <input type=submit value=add > </input>
        </form>`;
        data+=isi.join("");
        comment.innerHTML=data;
    }).then(()=>{

        var elms = document.querySelectorAll("[id='add_comment']");
 
        for(var i = 0; i < elms.length; i++) 
        {
            elms[i].addEventListener('submit',function(e){
                e.preventDefault();
                user = localStorage.getItem("token_inget")
                if (user==null){
                    alert("login dulu");
                    return ;
                }
                let data={
                    user_id:user,
                    comment:e.target["comment"].value
                }
                console.log(data)
                $.ajax({
                    type: "POST",
                    url: "http://localhost:8001/comment/add",
                    contentType: "application/json",
                    dataType:"json",
                    data:JSON.stringify(data), 
                    success: function(data)
                    {
                        console.log("done");
                    }
                }).then(()=>{
                    location.reload();
                })
                ;
            });
        };
        var reply_elms = document.querySelectorAll("[id='reply_comment']");
 
        for(var i = 0; i < reply_elms.length; i++) 
        {
            reply_elms[i].addEventListener('submit',function(e){
                e.preventDefault();
                user = localStorage.getItem("token_inget")
                if (user==null){
                    alert("login dulu");
                    return ;
                }
                let data={
                    user_id:user,
                    comment_id:e.target["comment_id"].value,
                    comment:e.target["comment"].value
                }
                console.log(data)
                $.ajax({
                    type: "POST",
                    url: "http://localhost:8001/comment/reply",
                    contentType: "application/json",
                    dataType:"json",
                    data:JSON.stringify(data), 
                    success: function(data)
                    {
                        console.log("done");
                    }
                })
                .then(()=>{
                    location.reload();
                })
            });
        };
        
    });
}

init()

$("#login").submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);

    let data={
        username:e.target["username"].value,
        password:e.target["password"].value
    }
    $.ajax({
        type: "GET",
        url: "http://localhost:8001/login",
        dataType:"json",
        contentType: "application/json",
        data:data, // serializes the form's elements.
        success: function(data)
        {
          localStorage.setItem("token_inget",data.token.user_id);// show response from the php script.
        }
    });
    
});

$("#register").submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    let data={
        username:e.target["username"].value,
        password:e.target["password"].value
    }
    
    $.ajax({
        type: "GET",
        url: "http://localhost:8001/login",
        dataType:"json",
        contentType: "application/json",
        data:data, // serializes the form's elements. // serializes the form's elements.
        success: function(data)
        {
            localStorage.setItem("token_inget",data.token.user_id); // show response from the php script.
        }
    });
    
});

// this is the id of the form

//   comment.innerHTML=`<div>${datas[0]}</div>`