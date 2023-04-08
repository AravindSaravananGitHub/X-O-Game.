
const boxs=document.querySelectorAll('.box');
const status_txt=document.querySelector('.status');
const btn_restart=document.getElementById('restart');
let x="<img class='img' src='x.png' width=50px height=50px>";
let o="<img class='img' src='o.png' width=50px height=50px>";

const win=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options=["","","","","","","","",""];

let current_player=x;
let player="X";
let running=false;
init();

function init(){
    boxs.forEach(box=>box.addEventListener('click',box_click));
    btn_restart.addEventListener('click',restart_game);
    status_txt.textContent=`${player} Your Turn`;
    running=true;
}

function box_click(){
    const index=this.dataset.prime;
    if(options[index]!="" || !running){
        return;
    }
    update_box(this,index);
    check_winner();
}

function update_box(box,index){
    options[index]=player;
    box.innerHTML=current_player;
}

function change_player(){
    player=(player=='X')?"O":"X";
    current_player=(current_player==x)?o:x;
    status_txt.textContent=`${player} Your Turn`;
}

function check_winner(){
    let is_won=false;
    for(let i=0;i<win.length;i++){
        const condition=win[i];
        const box1=options[condition[0]];
        const box2=options[condition[1]];
        const box3=options[condition[2]];
        if(box1=="" || box2=="" || box3==""){
            continue;
        }
        if(box1==box2 && box2==box3){
            is_won=true;
            boxs[condition[0]].classList.add('win');
            boxs[condition[1]].classList.add('win');
            boxs[condition[2]].classList.add('win');
        }
    }

    if(is_won){
        status_txt.textContent=`${player} Won`;
        running=false;
    }
    else if(!options.includes("")){
        status_txt.textContent=`Game DRAW...!`;
        running=false;
    }else{
        change_player();
    }
}

function restart_game(){
    options=["","","","","","","","",""];
    current_player=x;
    player="X";
    running=true;
    status_txt.textContent=`${player} Your Turn`;

    boxs.forEach(box=>{
        box.innerHTML="";
        box.classList.remove('win');
    });
}