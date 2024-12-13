// transition

var StartGame = document.getElementById("start-game");
var PlayingGame = document.getElementById("playing-game");
var ShowRules=document.getElementById("rules-container");
var BackRules=document.getElementById("rules-back");


// moving the transition for palying game

document.getElementById("start-btn").addEventListener("click", () => {
        StartGame.style.transform = "translateX(-580px)";
        PlayingGame.style.transform = "translateX(0)";
});

// moving the transition back to start game

document.getElementById("go-back-start-game").addEventListener("click",()=>{
    StartGame.style.transform="translateX(0px)";
    PlayingGame.style.transform="translateX(580px)";
});

// see the rules 

document.getElementById("see-rules").addEventListener("click", ()=>{
    
    StartGame.style.transform="translateX(-600px)";
    ShowRules.style.transform="translateX(0)";
});

//back rules

document.getElementById("rules-back").addEventListener("click", ()=>{
    
    StartGame.style.transform="translateX(0px)";
    ShowRules.style.transform="translateX(600px)";
});

// player playing level and conditional

var NumGues=document.getElementById("num-gues");
var YourScore=document.getElementById("your-score");
var ComputerScore=document.getElementById("computer-score");
var EmptyInput=document.getElementById("empty-input");
var RoundUpdate=document.getElementById("get-round");
var SetUpdate=document.getElementById("get-set");
var UpdateScore=document.getElementById("update-score");
var AvalibleSetCount=document.getElementById("set-avalible");
var Winning=document.getElementById("winning-container");
var Losing=document.getElementById("lose-container");
var WinMatch=document.getElementById("win-match");
var LoseMatch=document.getElementById("lose-match");
var AutoGameStart=document.getElementById("auto-play");
var AutoGameStart2=document.getElementById("auto-play2");

var usr=0,cmp=0,btnclick=0,setscore=0,setclick=1,round=1,totalset=10,autoplay=10;

// adding score 

function CheckNumber(GU,CM){
    console.log("You"+GU+"Computer"+CM)

    if (GU == CM) {
        usr+=1;
        YourScore.innerHTML=usr;
        EmptyInput.innerHTML="You Win";
        EmptyInput.style.color="green";
        NumGues.innerHTML="Your Guess : "+GU+" || Computer Guess : "+CM;
        GU.value=0;
    }

    else{
        cmp+=1;
        ComputerScore.innerHTML=cmp;
        EmptyInput.innerHTML="Computer Win";
        EmptyInput.style.color="yellow";
        NumGues.innerHTML="Your Guess :  "+GU+"|| Computer Guess : "+CM;
        GU.value=0;
    }
}

// button clicking and updating score

function ButtonClick()
{
    btnclick+=1;
    SetButtonClickCount(btnclick);
    RoundButtonClickCount(btnclick);
    AvalibleSet();
}

// set update

function SetButtonClickCount(a)
{
    setclick+=1;
    if(a<5 || a >=6)
    {
        SetUpdate.innerHTML=setclick;
    }

    else if(a==5)
    {
        PlayingGame.style.transform="translateX(-600px)";

        // show winning moment

        if(usr>cmp)
        {
            Winning.style.transform="translateX(0px)";
        }
        
        else{
            Losing.style.transform="translateX(0px)";
        }

        const AutoStart=setInterval(()=>{
            autoplay-=1;
            AutoGameStart.innerHTML=autoplay;
            AutoGameStart2.innerHTML=autoplay;
        },1000);

        const StopIntervel=setTimeout(()=>{
            console.log("hi");
            PlayingGame.style.transform="translateX(0)";

            if(usr>cmp){
                Winning.style.transform="translateX(600px)";
            }

            else{
                Losing.style.transform="translateX(600px)";
                
            }
        },10000);

        setclick=1;
        SetUpdate.innerHTML=setclick;
        EmptyInput.innerHTML="";
        CalculateScore();

        autoplay=10;

        document.getElementById("stop-game").addEventListener("click",()=>{
            
            StartGame.style.transform="translateX(0)";
            Losing.style.transform="translateX(600px)";
            Winning.style.transform="translateX(600px)";
            PlayingGame.style.transform="translateX(600px)";
            clearTimeout(StopIntervel);
            clearInterval(AutoStart);
        });
    }

    else{
        alert("thi gaame");
    }
    
}

// round update

function RoundButtonClickCount(ButtonCount)
{
    if(ButtonCount==10)
    {
        PlayingGame.style.transform="translateX(-600px)";
        Winning.style.transform="translateX(600px)";
        Losing.style.transform="translateX(600px)";
        FinalResult();
    }

    else if(ButtonCount==5)
    {
        round+=1;
        RoundUpdate.innerHTML=round;   
    }
}

function AvalibleSet()
{
    totalset-=1;
    AvalibleSetCount.innerHTML=totalset;
}

// final score update

function CalculateScore()
{
    if(usr>cmp)
    {
        setscore+=1;
        UpdateScore.innerHTML=setscore;
    }
}

function FinalResult()
{
    if(setscore==2 || setscore==1)
    {
        WinMatch.style.transform="translateX(0px)";
    }

    else{
        LoseMatch.style.transform="translateX(0px)";
    }
}
 
// event genrating

var IndexGame=document.getElementById("check-result").addEventListener("click", () => {
    var GetUserValue = document.getElementById("get-user");
    var GetRange=document.getElementById("get-range").value;

    var GetUser=GetUserValue.value;

    var ComputerChoices = Math.floor(Math.random() * GetRange)+1;

    if(GetUser=='' || GetUser==null)
    {
        EmptyInput.innerHTML="Please give any number";
        EmptyInput.style.color="red";
    }

    else{
        CheckNumber(GetUser,ComputerChoices);
        ButtonClick();
    }

    GetUserValue.value="";
});

