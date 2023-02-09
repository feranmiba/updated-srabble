'use strict'
import{words} from './word.js'


//THE DECLARATION
const theWords = document.querySelector('.word'),
hintText = document.querySelector('.hint  span'),
inputField = document.querySelector('.text'),
refershBtn = document.querySelector('.refresh-word'),
checkAnswerBtn = document.querySelector('.check-word'),
MessageBox = document.querySelector('.message'),
okayBtn = document.querySelector('.ok'),
overlay = document.querySelector('.overlay'),
theOutcome = document.querySelector('.outcome'),
gameStartingBtn = document.querySelector('.get'),
theIntro = document.querySelector('.name'),
theGame = document.querySelector('.container'),
theSignUpForm = document.querySelector('.form'),
theDoneButton = document.querySelector('.first'),
theNameInput = document.querySelector('.names'),
theEmailInput = document.querySelector('.email'),
thePasscodeInput = document.querySelector('.pass'),
theuserName = document.querySelector('.user'),
thefullView = document.querySelector('.move'),
theErrorMessage = document.querySelectorAll('.fill'),
signIn = document.querySelector('.up'),
skipTheForm = document.querySelector('.secont'),
theHighScore = document.querySelector('.high')



//THE INTRO TO THE GAME
const startTheGame = () => {
    theIntro.classList.add('hidden')
    theSignUpForm.classList.remove('hidden')
}
const signUp = () => {
    theIntro.classList.add('hidden')
    theSignUpForm.classList.remove('hidden')
    theGame.classList.add('hidden')
        thefullView.classList.add('hidden')
}
const skip = () => {
    theSignUpForm.classList.add('hidden')
    theGame.classList.remove('hidden')
    thefullView.classList.remove('hidden') 
    initGame()
}

//THE SIGN UP FORM 
const doneMethod = () => {
    //THE NAME AND METHOD OF USERNAME
const user = {
    fname: theNameInput.value,
    email: theEmailInput.value,
    passcode: Number(thePasscodeInput.value),    
}
if (!user.fname, !user.email, !user.passcode) {
    theGame.classList.add('hidden')
    theSignUpForm.classList.remove('hidden')
    thefullView.classList.add('hidden') 
    theErrorMessage.forEach((error) => error.classList.remove('hidden'))
} else if (!user.fname){
    theGame.classList.add('hidden')
    theSignUpForm.classList.remove('hidden')
    thefullView.classList.add('hidden') 
} else if (!user.email) {
    theGame.classList.add('hidden')
    theSignUpForm.classList.remove('hidden')
    thefullView.classList.add('hidden') 
} else if (!user.passcode) {
    theGame.classList.add('hidden')
    theSignUpForm.classList.remove('hidden')
    thefullView.classList.add('hidden') 
}
 else {
    const passcodeUpdated = user.passcode  + Math.trunc(Math.random() * 1234) + 1
    const useName = user.fname.toLocaleUpperCase() .split(' ')[0]
    const userName = useName + passcodeUpdated
    theuserName.textContent += userName
    console.log(userName);
        theGame.classList.remove('hidden')
        theSignUpForm.classList.add('hidden')
        thefullView.classList.remove('hidden')
        initGame()  
}
}

theDoneButton.addEventListener('click', doneMethod)
gameStartingBtn.addEventListener('click', startTheGame)
signIn.addEventListener('click', signUp)
skipTheForm.addEventListener('click', skip)



let correctWord , timer
let score = 0
let highScore = 0


//THE OUTCOMES FUNCTION
const hiddenShowed = () => {
    overlay.classList.remove('hidden')
    theOutcome.classList.remove('hidden')
}

//THE TIMER
const startLoseTimer = maxTime => {
     clearInterval(timer)
   timer = setInterval(function () {

      if(maxTime > 0) {
        maxTime--
       return theTime.textContent = maxTime

      }

        if (maxTime >= -1) {
            clearInterval(timer)
            hiddenShowed()
            MessageBox.textContent = 'Time up!' +' ' + `${correctWord}`.toLocaleUpperCase() + ' was the correct word'
            
        }
    }, 1000)

}

//THE GAME FUNCTION
const initGame = () => {
    startLoseTimer(30)
    let randomObj = words[Math.floor(Math.random() * words.length)]
    let wordArray = randomObj.word.split('')
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i] , wordArray[j]] =  [wordArray[j] , wordArray[i]]
    }
    correctWord = randomObj.word.toLocaleLowerCase()
    console.log(randomObj);
    theWords.textContent = wordArray.join('')
    hintText.textContent = randomObj.hint
    inputField.value = ``
    inputField.setAttribute("maxlength", correctWord.length) 
}
const checkword = () => {
    startLoseTimer(30)
    let userword = inputField.value.toLocaleLowerCase()
    if (!userword) {
        MessageBox.textContent = `you did not insert any value`
    }
    console.log(userword);
    if (userword !== correctWord) {
       MessageBox.textContent = 'oops!' + ' ' + `${userword}`.toLocaleUpperCase() + ' ' + `is not correct`
    } else {
       MessageBox.textContent ='Congratulation' + ' ' + `${userword}`.toLocaleUpperCase() + ' ' + `is correct`
       score++
       if (score > highScore) {
        highScore  = score;
       }
      console.log(highScore);
      theHighScore.addEventListener('click', () => {
        hiddenShowed()  
        MessageBox.textContent = `You have a highscore of ${highScore}`
    } )
    }
    hiddenShowed()  
}



refershBtn.addEventListener('click', initGame)
checkAnswerBtn.addEventListener('click', checkword)

const theTime = document.querySelector('.sec')


//THE OKAY BUTTON
const okayFun =  () => {
    overlay.classList.add('hidden')
    theOutcome.classList.add('hidden')
    initGame() 
}
okayBtn.addEventListener('click', okayFun)
