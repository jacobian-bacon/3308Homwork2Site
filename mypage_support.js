function addCard() {
    let newCard = -1;
    for (let i = 0; i < 100; i++) {
        if (!document.getElementById('interest' + i.toString())) {
            newCard = i;
            break;
        }
    }
    if (newCard == -1) {
        return;
    }
    let div1 = document.createElement('div');
    div1.className = "card";
    div1.id = "interest" + newCard.toString();
    div1.innerHTML = "<div class='input-group'>\
        <input id='upload" + newCard.toString() + "' type='file' onchange='readURL(this);' class='form-control border-0'>\
        <label id='labelloadup" + newCard.toString() + "' for='upload" + newCard.toString() + "' class='font-weight-light my-auto text-muted'>Choose file</label>\
        <div class='input-group-append'>\
          <label for='upload" + newCard.toString() + "' class='btn btn-light'> <i class='fa fa-cloud-upload mr-2 text-muted'></i><small class='text-uppercase font-weight-bold text-muted'>Choose file</small></label>\
        </div>\
      </div>\
      <div class='image-area'><img id='imageResult" + newCard.toString() + "' src='#' alt='' class='img-fluid rounded shadow-sm mx-auto d-block'></div>\
        <input type='text' class='form-control' id='inputName" + newCard.toString() + "' placeholder='Interest Name'>\
        <div class='form-group'>\
            <p></p>\
            <label style='color: grey' for='FormControlTextarea" + newCard.toString() + "'><small>Text about interest</small></label>\
            <textarea class='form-control" + newCard.toString() + "' id='FormControlTextarea" + newCard.toString() + "' rows='4'></textarea>\
        </div>\
        <div class='btn-group my-auto'>\
            <button type='button' class='btn btn-primary my-auto' id='pubButton" + newCard.toString() + "' onclick='publishCard(this)'>Publish Interest</button>\
        </div>";
    document.getElementById("mainCardColumns").append(div1);
}

function publishCard(button) {
    let cardChar = button.id.charAt(button.id.length - 1);
    let buttonParentID = "interest" + cardChar;
    let buttonParent = document.getElementById(buttonParentID);
    let imgSRC = document.getElementById("imageResult" + cardChar).src;
    let interestName = document.getElementById("inputName" + cardChar).value;
    let interestText = document.getElementById("FormControlTextarea" + cardChar).value;
    buttonParent.innerHTML = "<button type='button' class='btn btn-danger btn-circle btn-sm d-flex' onclick='removeCard(this)'>X</button>\
                <img src='" + imgSRC + "' class='card-img-top'\
                    alt='" + interestName + "'>\
                <button type = 'button' class='btn btn-primary btn-circle btn-twt d-flex' id='twitButton" + cardChar + "' onclick ='getTweetInfo(this)' >+</button >\
                <div class='card-body d-flex'>\
                    <h5 class='card-title'>" + interestName + "</h5>\
                    <p class='card-text text-muted'>" + interestText + "</p>\
                </div>";

}

function getTweetInfo(elem) {
    let newCard = elem.id.charAt(elem.id.length - 1);
    let div2 = document.createElement('div');
    div2.className = "card-body";
    div2.id = "interestTweet" + newCard.toString();
    div2.innerHTML = "<div class='input-group'>\
        <div class='form-group'>\
            <p></p>\
            <label style='color: grey' for='FormControlTextarea" + newCard.toString() + "'>tweet URL</label>\
            <textarea class='form-control' id='FormControlURL" + newCard.toString() + "' rows='4'></textarea>\
        </div>\
    </div>\
    <div class='btn-group my-auto'>\
        <button type='button' class='btn btn-primary my-auto' id='urlButton" + newCard.toString() + "' onclick='getUrl(this)'>Embed Tweet</button>\
    </div>";
    elem.parentNode.append(div2);
}

function getUrl(curButton) {
    let newCard = curButton.id.charAt(curButton.id.length - 1);
    let tweetCardCount = 0;
    for (let i = 0; i < 100; i++) {
        if (document.getElementById('html' + i.toString())) {
            tweetCardCount += 1;
        }
    }
    let newHTMLName = "html" + tweetCardCount;
    if (document.getElementById("html")) {
        document.getElementById("html").id = newHTMLName;
    }
    return new Promise(function (resolve, reject) {
        resolve(document.getElementById("FormControlURL" + newCard.toString()).value);
    }).then(function (newUrl) {
        console.log(newUrl);
        $.getJSON("https://cors-anywhere.herokuapp.com/" + "https://publish.twitter.com/oembed?url=" + newUrl, function (data) {
            let items = [];
            let div3 = document.createElement('div');
            div3.className = "container";
            div3.id = "tempThing";
            div3.visibility = "hidden";
            document.getElementById("mainCardColumns").append(div3);
            $.each(data, function (key, val) {
                items.push("<card id='" + key + "'>" + val + "</card>");
            });
            $("<blockquote/>", {
                "class": "twitter-tweet",
                html: items.join("")
            }).appendTo("#tempThing");
            document.getElementById("interest" + newCard).append(html);
            for (let j = 0; j < 10; j++) {
                if (document.getElementById("interest" + newCard).childNodes[j] == "html") {
                    console.log(j, " html")
                }
            }
            div3.remove();
            let tmpStr = "<button type='button' class='btn btn-danger btn-circle btn-sm d-flex' onclick='removeCard(this)'>X</button>";
            document.getElementById("html").insertAdjacentHTML("afterbegin", tmpStr);
            document.getElementById('interestTweet' + newCard.toString()).remove();
        });
    }).catch(function (reason) {
        console.log("issuehere", reason);
    });
}



function removeCard(card) {
    card.parentNode.remove();
}

var infoArea;
var input;



function readURL(input) {
    lastchar = input.id.charAt(input.id.length - 1);
    infoArea = document.getElementById('labelloadup' + lastchar.toString());
    if (input) {
        document.addEventListener('change', showFileName);
    }
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $("[id^='imageResult']")
                .attr('src', e.target.result);
            // var img = new Image();

            // img.src = reader.result;
            // localStorage.theImage = img.src;
        };

        reader.readAsDataURL(input.files[0]);
    }
}



function showFileName(event) {
    var input = event.srcElement;
    if (input.files) {
        var fileName = input.files[0].name;
        infoArea.nodeValue = fileName;
    }
}