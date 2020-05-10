// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAe3gZSFUk6-qbvOWHU7yesaZOHQEz2FIc",
  authDomain: "survey-2f874.firebaseapp.com",
  databaseURL: "https://survey-2f874.firebaseio.com",
  projectId: "survey-2f874",
  storageBucket: "survey-2f874.appspot.com",
  messagingSenderId: "969739775528",
  appId: "1:969739775528:web:bb8b3a65ab6b3045fbcf1d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

let questions = [
  {
    question:
      "What is the probability of the NO2 levels being between 150 and 200 on November 21st at 22:00 ?",
    chart: "https://rezpe.github.io/survey/charts/chart_dot_211117.html"
  },
  {
    question:
      "What is the probability of the NO2 levels being between 70 and 120 on November 21st at 14:00 ?",
    chart: "https://rezpe.github.io/survey/charts/chart_dot_211117.html"
  },
  {
    question:
      "What is the probability of the NO2 levels being above 150 on November 22nd at 09:00 ?",
    chart: "https://rezpe.github.io/survey/charts/chart_dot_211117.html"
  },
  {
    question:
      "What is the probability of the NO2 levels being between 50 and 100 on November 21st at 11:00 ?",
    chart: "https://rezpe.github.io/survey/charts/chart_dot_211117.html"
  },
  {
    question:
      "What is the probability of the NO2 levels being above 200 on November 21st at 20:00 ?",
    chart: "https://rezpe.github.io/survey/charts/chart_dot_211117.html"
  },

];

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxx2xxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
    c
  ) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

new Vue({
  el: "#app",
  data: {
    questions: questions,
    current: 0,
    answers: [],
    //Current question
    answer: 0,
    confidence: 0,
    load: 0,
    start: 0,
    end: 0,
    uuid: create_UUID()
  },
  methods: {
    add_answer: function () {
      this.answers.push({
        answer: this.answer,
        start: this.start,
        end: Date.now()
      });

      this.next();
    },
    next: function () {
      //reset
      this.start = Date.now();
      this.answer = 0;

      //Next question
      this.current += 1;
    },
    submit_answers: function () {
      let self = this
      db.collection("dot_recorded_answers")
        .add({ answers: this.answers,
              conficence:this.confidence,
              load:this.load,
              uuid:this.uuid})
        .then(function () {
          console.log("Document successfully written!");
          self.current=100
        })
        .catch(function (error) {
          console.log("Error writing document: ");
        });
      
    }
  }
});