const btnlogin = document.getElementById('btn-play')
const input = document.getElementById('input-name')
const loginSection = document.getElementById('login')
const gameSection = document.getElementById('game')
const playerInfo = document.getElementById('data-player')
const name = document.getElementById('name')
const score = document.getElementById('score')
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const icon = document.getElementById('icon')
const difficulty = document.getElementById('difficulty')
const btnEase = document.getElementById('ease');
const btnNormal = document.getElementById('normal');
const btnHard = document.getElementById('hard');

btnlogin.addEventListener("click",()=>{
    loginSection.classList.add('hide')
    gameSection.classList.remove('hide')
    playerInfo.classList.remove('hide')
    name.innerHTML = input.value
    score.innerHTML = `Nivel: 1/10`
});
btnEase.addEventListener("click",()=>{
    game.setDifficulty(1)
    game.defaultValues()
    setTimeout(() => {
        game.onInit()
    }, 500);
    difficulty.classList.add('hide')
    icon.classList.remove('hide')
})
btnNormal.addEventListener("click",()=>{
    game.setDifficulty(2)
    game.defaultValues()
    setTimeout(() => {
        game.onInit()
    }, 500);
    difficulty.classList.add('hide')
    icon.classList.remove('hide')
})
btnHard.addEventListener("click",()=>{
    game.setDifficulty(3)
    game.defaultValues()
    setTimeout(() => {
        game.onInit()
    }, 500);
    difficulty.classList.add('hide')
    icon.classList.remove('hide')
})
icon.addEventListener("click",()=>{
    icon.classList.add('hide')
    difficulty.classList.remove('hide')
    icon.classList.remove('fa-play')
    icon.classList.add('fa-sync')
})

class Game{
    constructor(){
        this.secuencia = []
        this.MAX_LEVEL = 15
        this.nivel_actual = 1
        this.aux_nivel = 0
        this.difficulty = 1000
        this.delay = 350
        this.reset = false
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
        this.selectColor = this.selectColor.bind(this)
    }
    defaultValues(){
        this.aux_nivel = 0;
        this.nivel_actual = 1;
    }
    onInit(){
        score.innerHTML = `Nivel: 1/${this.MAX_LEVEL}`
        this.generarSecuencia()
        this.siguienteNivel()
    }
    setDifficulty(number){
        switch(number){
            case 1: this.difficulty=1000;this.delay=350; break
            case 2: this.difficulty=350;this.delay=200;break
            case 3: this.difficulty=150;this.delay=100;break
        }
    }
    getReset(){
        return this.reset
    }
    generarSecuencia(){
        this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
    }
    siguienteNivel(){
        if(this.nivel_actual-1===this.MAX_LEVEL){
            this.disableEvents()
            swal('SimonDice','Felicitaciones, ganaste!','success')
        }
        else{
            score.innerHTML = `Nivel: ${this.nivel_actual}/${this.MAX_LEVEL}`
            for(let i=0; i<this.nivel_actual;i++){
                setTimeout(() => {
                    this.iluminarColor(this.secuencia[i])
                }, this.difficulty * i)
            }
            setTimeout(() => {
                this.enableEvents()
            }, this.difficulty * this.nivel_actual)
        }
    }
    enableEvents(){
        for(let i=0;i<4;i++){
            let color = this.numberToColor(i)
            this.colores[color].classList.add(color)
            this.colores[color].addEventListener("click",this.selectColor)
        }
    }
    disableEvents(){
        for(let i=0;i<4;i++){
            let color = this.numberToColor(i)
            this.colores[color].classList.remove(color)
            this.colores[color].removeEventListener("click",this.selectColor)
        }
    }
    selectColor(event){
        let number = this.colorToNumber(event.target.id)
        if(this.secuencia[this.aux_nivel]!==number){
            icon.classList.remove('fa-play')
            icon.classList.add('fa-sync')
            icon.classList.remove('hide')
            swal('SimonDice','Que mal, perdiste :(','error').then(()=>{
                this.disableEvents()
            })
        }else{
            this.aux_nivel++
            if(this.aux_nivel===this.nivel_actual){
                this.nivel_actual++
                this.aux_nivel=0
                this.disableEvents()
                setTimeout(() => {
                    this.siguienteNivel()                    
                }, 500);
            }
        }
    }
    numberToColor(number){
        switch(number){
            case 0: return 'celeste'
            case 1: return 'violeta'
            case 2: return 'naranja'
            case 3: return 'verde'
        }
    }
    colorToNumber(color){
        switch(color){
            case 'celeste': return 0
            case 'violeta': return 1
            case 'naranja': return 2
            case 'verde': return 3
        }
    }
    iluminarColor(number){
        let color = this.numberToColor(number)
        this.colores[color].classList.add('light')
        setTimeout(() => {
            this.colores[color].classList.remove('light')
        }, this.delay);
    }
}

let game = new Game()
