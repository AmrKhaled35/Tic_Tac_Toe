let grid = document.getElementById("grid");
let cells = document.querySelectorAll("#cells");
let reset = document.getElementById("reset");
let player = 'X';
function hoveringCells(){
    for(let i =  0 ; i < 7 ; ++i){
        for(let j = 5 ; j >= 0 ; --j){
            if(cells[j*7 + i].textContent===''){
                console.log(j*7 + i);
                cells[j*7 + i].classList.add('cellHover');
                break ;
            }
        }
    }    
}


function playerSwap(){
    player = player === 'X' ? 'O' : 'X';
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if(cell.classList.contains('cellHover')){
            cell.textContent = player;
            if(cell.textContent==='X')
                cell.style.color = '#1892EA';
            else
                cell.style.color = '#A737FF';
            if(checkDraw()){
                document.querySelector('.connect4').textContent = "DRAW !";
                reset.style.display = 'block';
                reset.addEventListener('click', () => {
                    location.reload();
                    reset.style.display = 'none';
                })
            }
            if(checkWin()){
                document.querySelector('.connect4').textContent = player + ' wins';
                reset.style.display = 'block';
                reset.addEventListener('click', () => {
                    location.reload();
                    reset.style.display = 'none';
                })
            }
            cell.classList.remove('cellHover');
            hoveringCells();
            playerSwap();
        }
    });
});

hoveringCells() ;


function checkWin(){
    for(let i = 0 ; i < 6 ; ++i){
        for(let j = 0 ; j < 7 ; ++j){
            if(cells[i*7 + j].textContent === player){
                if((j+3<7)&&
                    cells[i*7 + j+1].textContent === player &&
                    cells[i*7 + j+2].textContent === player &&
                    cells[i*7 + j+3].textContent === player){
                        cells[i*7 + j].style.backgroundColor = "#667292ac";
                        cells[i*7 + j+1].style.backgroundColor = "#667292ac";
                        cells[i*7 + j+2].style.backgroundColor = "#667292ac";
                        cells[i*7 + j+3].style.backgroundColor = "#667292ac";
                    return true;
                }
                else if((i+3<6)&&
                    cells[(i+1)*7 + j].textContent === player &&
                    cells[(i+2)*7 + j].textContent === player &&
                    cells[(i+3)*7 + j].textContent === player){
                        cells[i*7 + j].style.backgroundColor = "#667292ac";
                        cells[(i+1)*7 + j].style.backgroundColor = "#667292ac";
                        cells[(i+2)*7 + j].style.backgroundColor = "#667292ac";
                        cells[(i+3)*7 + j].style.backgroundColor = "#667292ac";
                    return true;
                }
                else if((i+3<6 && j+3 < 7)&&
                    cells[(i+1)*7 + j+1].textContent === player &&
                    cells[(i+2)*7 + j+2].textContent === player &&
                    cells[(i+3)*7 + j+3].textContent === player){
                        cells[i*7 + j].style.backgroundColor = "#667292ac";
                        cells[(i+1)*7 + j+1].style.backgroundColor = "#667292ac";
                        cells[(i+2)*7 + j+2].style.backgroundColor = "#667292ac";
                        cells[(i+3)*7 + j+3].style.backgroundColor = "#667292ac";
                    return true;
                }
                else if((i+3<6 && j-3 > -1) &&
                    cells[(i+1)*7 + j-1].textContent === player &&
                    cells[(i+2)*7 + j-2].textContent === player &&
                    cells[(i+3)*7 + j-3].textContent === player){
                    cells[i*7 + j].style.backgroundColor = "#667292ac";
                    cells[(i+1)*7 + j-1].style.backgroundColor = "#667292ac";
                    cells[(i+2)*7 + j-2].style.backgroundColor = "#667292ac";
                    cells[(i+3)*7 + j-3].style.backgroundColor = "#667292ac";
                    return true;
                }
            }
        }
    }
    return false ;
}

function checkDraw(){
    for(let i = 0 ; i < 6 ; ++i){
        for(let j = 0 ; j < 7 ; ++j){
            if(cells[i*7 + j].textContent === ''){
                return false ;
            }
        }
    }
    return true ;
}