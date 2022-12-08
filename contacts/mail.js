
document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e){
        e.preventDefault();
        let error = formValidate(form);

        let formData = new FormData(form);
        

        if(error === 0){
            form.classList.add('_sending');

            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if(response.ok){
                let resalt = await response.json();
                alert('resalt.message');
                form.resalt();
                form.classList.remove('_sending');
            }else{
                alert('Помилка відправлення');
                form.classList.remove('_sending'); 
            }
        } else{
            alert('Не вірно заповнені поля!')
        }

    }

    function formValidate(form){
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for(let index = 0; index < formReq.length; index++){
            const input = formReq[index];

            formRemoveError(input);
            if(input.classList.contains('._email')){
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }
            }else {
                if(input.value === ''){
                    formAddError(input);
                    error++;
                }
            }

        }
        return error;
    }

    function formAddError(input){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input){
        return /^(?:[a-z0-9]+(?:[-_.]?[a-z0-9]+)?@[a-z0-9_.-]+(?:\.?[a-z0-9]+)?\.[a-z]{2,5})$/i.test(input.value);
    }
})