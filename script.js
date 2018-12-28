function send(){
    if (audit('username')[1] == 'red'){return 0}
    if (audit('email')[1] == 'red'){return 0}
    if (audit('rep_pass')[1] == 'red'){return 0}
    var em = email.value
    var pa = pass.value
    var us = username.value
    var xhttp = new XMLHttpRequest()
    xhttp.open('POST', 'https://reqres.in/api/register')
    xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.send(JSON.stringify({
        email: em,
        username: us,
        password: pa
    }))
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 201){
            let data = JSON.parse(this.responseText)
            console.log(data)
            alert('Account Created!')
        }
    }
}

document.getElementById('r_area').onmouseover = function (event){
    var res = audit('username')
    document.getElementById(res[0]).style.background = res[1]
    var res = audit('email')
    document.getElementById(res[0]).style.background = res[1]
    var res = audit('rep_pass')
    document.getElementById(res[0]).style.background = res[1]
}

function audit(elem){
    rules = '!#$%^&*()_-=/,"№;:?'
    var n = 0
    if (elem == 'username'){
        for (i = 0; i < document.getElementById(elem).value.length; i++){
            for (o = 0; o < rules.length; o++){
                if (document.getElementById(elem).value[i] == rules[o] || document.getElementById(elem).value[i] == '+' || document.getElementById(elem).value[i] == '@'){
                    return ['us','red']
                }
            }
        }
        return ['us','wheat']
    }
    if (elem == 'email'){
        for (i = 0; i < document.getElementById(elem).value.length; i++){
            for (o = 0; o < rules.length; o++){
                if (document.getElementById(elem).value[i] == rules[o] || document.getElementById(elem).value[i] == '+'){return ['em','red']}
            }
            if (document.getElementById(elem).value[i] == '@'){n += 1}
        }
        if (n != 1 && document.getElementById(elem).value.length != 0){return ['em','red']}
        return ['em','wheat']
    }
    if (elem == 'rep_pass'){
        if (document.getElementById(elem).value != document.getElementById('pass').value && document.getElementById(elem).value.length >= 8){return ['ps', 'red']}
        if (document.getElementById(elem).value.length < 8 && document.getElementById(elem).value.length > 0){return ['ps','red']}
        return ['ps', 'wheat']
    }
}
