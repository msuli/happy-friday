<template>
  <div>
    <section>
      <header class="top_tips">
        <span class="num_tip">题目{{itemQuestion}}</span>
      </header>
      <div>
        <div class="item_back item_container_style">
          <div class="item_list_container">
            <header class="item_title">题目{{itemQuestion}} {{ question }}</header>
            <ul>

              <li
                class="item_list"
                v-for="(btnData, index) in answerData"
              >
                <span
                  class="option_style"
                  v-bind:class="{'has_choosed':btnData.isSelected}"
                >{{btnData.name}}</span>
                <span
                  class="option_detail"
                  @click="answered(btnData)">
                        {{ btnData.answer}}
                    </span>
              </li>
            </ul>
          </div>
        </div>
        <span class="next_item button_style" v-if="!isSubmit"
              @click="nextQuestion"></span>
        <span class="submit_item button_style" v-else @click="submit"></span>
      </div>
    </section>
  </div>
</template>
<script>
  const Plus = 1;
  const Minus = 2;
  export default{
    data(){
      return {
        score: 0,
        itemQuestion: 1,
        totalNumber : 5,
        isSelected: false,
        isSubmit: false,
        question: 'oops, the error occered',
        answerData: [
          {correct: true, answer: 0, isSelected: false, name: 'A'},
          {correct: false, answer: 0, isSelected: false, name: 'B'},
          {correct: false, answer: 0, isSelected: false, name: 'C'},
          {correct: false, answer: 0, isSelected: false, name: 'D'}
        ]
      }
    },
    methods: {
        isChoosed(){
           let a =this.answerData.filter((item)=>{
               return item.isSelected;
           })
          return a.length;
        },
      nextQuestion(){
            if(this.isChoosed()<=0) {
              alert('请选出该题的答案后才能做下一题');
            }else{
              if (this.itemQuestion + 1 === this.totalNumber) {
                this.isSubmit = true;
              }
              this.itemQuestion += 1;
              this.generateQuestion();
            }
      },
      submit(){
          this.$router.push('/score');
      },
      answered(btn){
        this.answerData.map((item)=>{
          item.isSelected = false;
        });
         btn.isSelected = true;
         if(btn.correct){
             this.score += 20;
         }
      },
      generateRandomNumber(max, min, except){
        const random = Math.floor(Math.random() * (max - min) + min);
        if (random === except) {
          return this.generateRandomNumber(max, min, except);
        }
        return random;
      },
      generateQuestion(){
        const firstNumber = this.generateRandomNumber(1, 100);
        const secondNumber = this.generateRandomNumber(1, 100);
        const modeNumber = this.generateRandomNumber(1, 3);
        let correctNumber = 0;
        switch (modeNumber) {
          case Plus: {
            correctNumber = firstNumber + secondNumber;
            this.question = `what's ` + firstNumber + '+' + secondNumber + '?';
            break;
          }
          case Minus: {
            correctNumber = firstNumber - secondNumber;
            this.question = `what's ` + firstNumber + '-' + secondNumber + '?';
            break;
          }
        }
        this.generateAnwser(firstNumber, secondNumber, correctNumber);
      },
      generateAnwser(firstNumber, secondNumber, correctNumber){
        this.answerData[0].answer = this.generateRandomNumber(firstNumber - 10,
          secondNumber + 10, correctNumber);
        for(let i =0; i<4; i++){
          this.answerData[i].correct = false;
          this.answerData[i].isSelected = false;

        }

        this.answerData[1].answer = this.generateRandomNumber(firstNumber - 10,
          secondNumber + 10, correctNumber);

        this.answerData[2].answer = this.generateRandomNumber(firstNumber - 10,
          secondNumber + 10, correctNumber);

        this.answerData[3].answer = this.generateRandomNumber(firstNumber - 10,
          secondNumber + 10, correctNumber);

        const correctButton = this.generateRandomNumber(0, 3);
        this.answerData[correctButton].answer = correctNumber;
        this.answerData[correctButton].correct = true;
      }
    },
    created(){
      this.generateQuestion();
    }
  }
</script>
<style lang="scss">
  .top_tips {
    position: absolute;
    height: 7.35rem;
    width: 3.25rem;
    top: -1.3rem;
    right: 1.6rem;
    background: url(../images/WechatIMG2.png) no-repeat;
    background-size: 100% 100%;
    z-index: 10;
    .num_tip {
      position: absolute;
      left: 0.48rem;
      bottom: 1.1rem;
      height: 0.7rem;
      width: 2.5rem;
      font-size: 0.6rem;
      font-family: '黑体';
      font-weight: 600;
      color: #a57c50;
      text-align: center;
    }
  }

  .item_container_style {
    height: 11.625rem;
    width: 13.15rem;
    background-repeat: no-repeat;
    position: absolute;
    top: 4.1rem;
    left: 1rem;
  }

  .home_logo {
    background-image: url(../images/1-2.png);
    background-size: 13.142rem 100%;
    background-position: right center;
  }

  .item_back {
    background-image: url(../images/2-1.png);
    background-size: 100% 100%;
  }

  .button_style {
    display: block;
    height: 2.1rem;
    width: 4.35rem;
    background-size: 100% 100%;
    position: absolute;
    top: 16.5rem;
    left: 50%;
    margin-left: -2.4rem;
    background-repeat: no-repeat;
  }

  .start {
    background-image: url(../images/1-4.png);
  }

  .next_item {
    background-image: url(../images/2-2.png);
  }

  .submit_item {
    background-image: url(../images/3-1.png);
  }

  .item_list_container {
    position: absolute;
    height: 7.0rem;
    width: 8.0rem;
    top: 2.4rem;
    left: 3rem;
    -webkit-font-smoothing: antialiased;
  }

  .item_title {
    font-size: 0.65rem;
    color: #fff;
    line-height: 0.7rem;
  }

  .item_list {
    font-size: 0;
    margin-top: 0.4rem;
    width: 10rem;
    span {
      display: inline-block;
      font-size: 0.6rem;
      color: #fff;
      vertical-align: middle;
    }
    .option_style {
      height: 0.725rem;
      width: 0.725rem;
      border: 1px solid #fff;
      border-radius: 50%;
      line-height: 0.725rem;
      text-align: center;
      margin-right: 0.3rem;
      font-size: 0.5rem;
      font-family: 'Arial';
    }
    .has_choosed {
      background-color: #ffd400;
      color: #575757;
      border-color: #ffd400;
    }
    .option_detail {
      width: 7.5rem;
      padding-top: 0.11rem;
    }
  }
</style>
