let Xplayer = true;
let Oplayer = false;

let game = true;

let button = document.querySelector('.reset');

let arr = ['','','','','','','','',''];

let cell = document.querySelectorAll('.cell');

let prop = [
    [0,1,4],
    [0,3,8],
    [0,2,6],
    [1,2,3],
    [4,5,6],
    [5,6,7],
    [6,7,8],
];


cell.forEach(element => {
    element.addEventListener('click',function(){
        if(Xplayer === true && element.textContent === '' && game === true){
            element.style.color = '#1892EA';
            arr[element.id-1] = 'X';
            element.innerHTML = 'X';
            Xplayer = false;
            Oplayer = true; 
        }
        else if(Oplayer === true && element.textContent === '' && game === true){
            element.style.color = '#A737FF';
            arr[element.id-1] = 'O';
            element.innerHTML = 'O';
            Xplayer = true;
            Oplayer = false;
        }
        
        for(let i = 0; i < prop.length; i++)
        {
            if(arr[prop[i][0]] === 'X' && arr[prop[i][1]] === 'X' && arr[prop[i][2]] === 'X'){
                document.getElementById(prop[i][0]+1).style.backgroundColor = '#2A2343';
                document.getElementById(prop[i][1]+1).style.backgroundColor = '#2A2343';
                document.getElementById(prop[i][2]+1).style.backgroundColor = '#2A2343';
                document.getElementsByClassName('text')[0].innerHTML = 'X win';
                document.getElementsByClassName('text')[0].style.fontSize = '40px';
                document.getElementsByClassName('text')[0].style.fontFamily = 'bold';
                game = false;
                button.style.display = 'block';
                button.addEventListener('click',function(){
                    game = true;
                    location.reload();
                    button.style.display = 'none';
                });
                return 1;
            }
            else if(arr[prop[i][0]] === 'O' && arr[prop[i][1]] === 'O' && arr[prop[i][2]] === 'O'){
                document.getElementsByClassName('text')[0].innerHTML = 'O win';
                document.getElementsByClassName('text')[0].style.fontSize = '40px';
                document.getElementsByClassName('text')[0].style.fontFamily = 'bold';

                game = false;
                button.style.display = 'block';
                button.addEventListener('click',function(){
                    game = true;
                    location.reload();
                    button.style.display = 'none';
                });
                return 1;
            }
        }
        let flag = true;
        for(let i = 0; i < arr.length; i++){
            if(arr[i]  === ''){
                flag = false;
            }
        }
        if(flag === true){
            document.getElementsByClassName('text')[0].innerHTML = 'Draw!'; 
            document.getElementsByClassName('text')[0].style.fontSize = '40px';
            document.getElementsByClassName('text')[0].style.fontFamily = 'bold';
            game = false;
            button.style.display = 'block';
            button.addEventListener('click',function(){
                game = true;
                location.reload();
                button.style.display = 'none';
            });
            return 1;
        }


    });
});
