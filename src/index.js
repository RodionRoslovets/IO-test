import './scss/new.scss';

window.addEventListener('DOMContentLoaded', ()=>{

    // Положение меток относительно текста
    let points = document.querySelectorAll('.slider-point'),
        skills = document.querySelectorAll('.JS-skills__item'),
        slider = document.querySelector('.JS-skills__slider'),
        runner = document.querySelector('.slider-runner');

    points.forEach((point, index )=> {

        let position = skills[index + 1].getBoundingClientRect().left - slider.getBoundingClientRect().left;
        
        point.style.left = `${position}px`;        
    });

    // Начальное положение слайдера
    
    let pointOffset = points[1].getBoundingClientRect().left - slider.getBoundingClientRect().left;
    runner.style.left = `${pointOffset - runner.offsetWidth / 2}px`;

    // Оживляем слайдер

    function moveslider(e){
        let start = slider.getBoundingClientRect().left,
            end = slider.offsetWidth,
            // проверка типа события
            moveType = e.type == 'touchstart' ? 'ontouchmove' : 'onmousemove',
            endType = e.type == 'touchstart' ? 'ontouchend' : 'onmouseup';

        document[moveType] = (e) => {
            //координаты события
            let mouseCoord = e.type == 'touchmove' ? e.targetTouches[0].clientX : e.clientX;
                        
            var newLeft = mouseCoord - start - runner.offsetWidth/2;

            //проверка на начало и конец

            newLeft <= 0 ? newLeft = 0 - runner.offsetWidth/2 : newLeft >= end ? newLeft = end - runner.offsetWidth/2 : newLeft = newLeft;

            runner.style.left = `${newLeft}px`;            
        };

        document[endType] = () =>{
            document[moveType] = document[endType] = null;
        }
    }

    runner.addEventListener('mousedown', moveslider);
    runner.addEventListener('touchstart', moveslider);

    // Нажатие на уровень скилла JS

    skills.forEach((skill, index)=>{
        skill.addEventListener('click', ()=>{
            switch(index){
                case 0:
                    runner.style.left = `${0 - runner.offsetWidth/2}px`;
                    break;
                case skills.length - 1:
                    runner.style.left = `${slider.offsetWidth - runner.offsetWidth/2}px`;
                    break;
                default:
                    runner.style.left = `${points[index - 1].offsetLeft - runner.offsetWidth/2}px`;
            }
        });
    });    

    // чекбоксы

    let checkboxes = document.querySelectorAll('.person-skills__item input[type="checkbox"]'),
        checks = document.querySelectorAll('.person-skills__check'),
        labels = document.querySelectorAll('.person-skills__item label');

    checkboxes.forEach((checkbox, index)=>{
        if(checkbox.checked){
            checks[index].classList.add('person-skills__check__visible');
        }
    });

    labels.forEach((label, index)=>{
        label.addEventListener('click', (e)=>{
            if(e.target.tagName=='LABEL' || e.target.tagName=='IMG'){
                if(checks[index].classList.contains('person-skills__check__visible') && checkboxes[index].checked){
                    checks[index].classList.remove('person-skills__check__visible');
                } else if(!checks[index].classList.contains('person-skills__check__visible') && !checkboxes[index].checked){
                    checks[index].classList.add('person-skills__check__visible');
                }
            }
            
        });
    });

    
});