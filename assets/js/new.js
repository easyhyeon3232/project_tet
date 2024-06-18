document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("joinForm").addEventListener("submit", function(event) {
        event.preventDefault();

        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("passwordConfirm").value;
        if (password != confirmPassword) {
            document.getElementById("pwCheckError").innerHTML = "비밀번호가 일치하지 않습니다.";
            return; // 일치하지 않을 경우 폼 제출을 막음
        }

        var email = document.getElementById("email").value;
        var emailError = document.getElementById("emailError");
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            emailError.innerHTML = "유효하지 않은 이메일 형식입니다.";
            return; // 유효하지 않은 이메일 형식일 경우 폼 제출을 막음
        } else {
            emailError.innerHTML = ""; // 유효한 경우 에러 메시지 초기화
        }

        var birthdate = new Date(document.getElementById("birthdate").value).toISOString();

        var data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            passwordConfirm: document.getElementById("passwordConfirm").value,
            birthdate: document.getElementById("birthdate").value
        };

        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // 서버 응답 확인
            alert("회원가입이 완료되었습니다.");
            window.location.href = "/home.do"; // 홈페이지로 리다이렉트
        })
        .catch(error => {
            console.error('Error:', error);
            alert("회원가입 중 오류가 발생했습니다.");
        });
    });
});
