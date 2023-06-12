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

function post(e){
    e.preventDefault();

    console.log("prevented")
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
            <form id="add_comment">
            <input type=text name="comment_id" value=${val.id} style="display:none;"></input>
            <input type=text name="comment" placeholder=comment></input>
            <input type=submit value=reply > </input>
            </form>
            <div style="margin-left:20px;">
                ${comments}
            </div>
            </div>`;
        });
        comment.innerHTML=isi.join("");
    }).then(()=>{

        var elms = document.querySelectorAll("[id='add_comment']");
 
        for(var i = 0; i < elms.length; i++) 
        console.log(elms[i]);
    });
}
 init()



// this is the id of the form
$("#comments").submit(function(e) {

e.preventDefault(); // avoid to execute the actual submit of the form.

var form = $(this);
var actionUrl = form.attr('action');
console.log(form)

// $.ajax({
//     type: "POST",
//     url: actionUrl,
//     data: form.serialize(), 
//     success: function(data)
//     {
//         alert(data); 
//     }
// });

});
//   comment.innerHTML=`<div>${datas[0]}</div>`