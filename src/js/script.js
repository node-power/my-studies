"use strict" 

document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('myForm');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        const message = {
            loading: 'Loading',
            success: 'Everything went smoothly',
            failure: 'Error'
        };

        let error = formValidate(form);
        let formData = new FormData(form);

        // const xhr = new XMLHttpRequest();

        //     xhr.open("POST", "https://localhost:3000/auth/login");
        //     xhr.send(formData);
        //     xhr.addEventListener("load", function () {
        //         if (xhr.status == 200) {
        //             console.log(xhr.response);
        //         } else {
        //             console.error("error");
        //         }
        //     })


        if (error === 0) {
            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            let response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result);
                statusMessage.textContent = message.success;
                form.reset();
            } else {
                alert('An error has occurred.');
                statusMessage.textContent = message.failure;
                form.reset();
            }
        } else {
            alert('This is a required field.')
        }
    }
    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }
    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
        console.log('This is a required field.')
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
})