//document.querySelectorAll('.button').forEach(botao =>{
    //botao.addEventListener('click', () => {
       // alert(`Voce clicou no botao:, ${botao.dataset.value}`);
   // });
//});

document.querySelectorAll(`.button`).forEach(botao =>{
    botao.addEventListener(`click`, () => {
        document.querySelector(`.visor`).value += botao.dataset.value;
    });

   
        
}) 

