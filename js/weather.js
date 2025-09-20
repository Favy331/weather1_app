 document.getElementById("btn").addEventListener("click", () => {
    alert("hello")

    
    const inputfilde = document.getElementById('input').value;
    localStorage.setItem("input", inputfilde )

    if (inputfilde === "") {
        alert("please type your name")
    } else{
        window.location.href = '../pages/weather.html'
    }
 })
