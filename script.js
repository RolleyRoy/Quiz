function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}


Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


// Displaying the question
function displayQuestion() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // show options
        let choices = quiz.getQuestionIndex().choices;
        for(let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
};


function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let ProgressElement = document.getElementById("progress");
    ProgressElement.innerHTML = 
    `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
};

function showScores() {
    let quizEndHTML = 
    `
    <h1>Quiz Completed</h1>
    <h2 id='score'> Your scored: ${quiz.score} of ${quiz.questions.length}</h2>
    <div class="quiz-repeat">
        <a href="index.html">Take Quiz Again</a>
    </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
};

// create questions here
let questions = [
    new Question(
        "Cosmo Property has its data centres on-premises. They are planning to move to the AWS cloud. What is the primary value proposition of cloud computing?", ["Reduced effort and investment in staff training", "Less expenditure as changing from Operational Expenses to Capital Expenses", "Less expenditure as changing from Capital Expenses to Operational Expenses", "Resource sharing and parallel executions of applications on multiple on-premises data centres"], "Less expenditure as changing from Capital Expenses to Operational Expenses"
    ),
    new Question(
        "Auto Car is planning to move their customer care website and other workloads from their traditional data centres to an EC2 instance in AWS. What is the advantage of this?", ["Physically isolating the data centres from the internet", " It will allow Auto Car to avoid expensive IT bills", "It will allow Auto Car not to take care of Operating System and Software patching", "It will allow Auto Car to focus on their business goals rather than the IT infrastructure investments and implementations"], "It will allow Auto Car to focus on their business goals rather than the IT infrastructure investments and implementations"
    ),
    new Question(
        "An AWS solution architect at Cosmo Property is describing the benefits of moving a data centre to the cloud. What is one primary benefit of this?", ["Avoiding patch management and its associated costs", "Eliminating dependence on internet connections", "Cost savings due to provisioning and decommissioning of resources based on varying traffic and workloads.", "Secured storage, retrieval and transmission of data"], "Cost savings due to provisioning and decommissioning of resources based on varying traffic and workloads."
    ),
    new Question(
        "How will Sun Solar reduce their Total Cost of Ownership when they use AWS instead of traditional data centres?", [" Encryption", "Identity and Management", "Shared Security Model", "Elastic Computing"], "Elastic Computing"
    ),
    new Question(
        "How can you define cloud computing?", ["Provisioning IT resources in advance using a fixed pricing model over the internet", "Provisioning IT resources on the fly using a fixed pricing model over the internet", "Provisioning IT resources whenever required using a pay-as-you-go pricing model over the internet", " Provisioning IT resources in advance  a pay-as-you-go pricing model over the internet"], "Provisioning IT resources whenever required using a pay-as-you-go pricing model over the internet"
    ),
    new Question(
        "Sun Solar wants to use an AWS feature that will help them reduce their expenses by spinning up EC2 instances based on demand. Which feature is that?", ["Availability Zones", "Amazon Lambda", "Elastic Container Service", " Auto Scaling"], " Auto Scaling"
    ),
    new Question(
        "Auto Car uses Amazon FSx to deploy S3 storage to on-premises Windows users so that they can save money. Which is the other service that they can use?", ["NAT Gateway", "AWS Direct Connect","Amazon EFS","Amazon EBS"], "AWS Direct Connect"
    ),
    new Question(
        "What benefit will Sun Solar realise if they migrate its on-premises databases to Amazon Aurora?", ["AWS manages scaling for NoSQL database workloads", "Configuration and management of MySQL clustering is automated", "Oracle read replicas can be used to increase performance and scaling", "SQL can be used to query exabyte-scale data warehouses"], "Configuration and management of MySQL clustering is automated"
    ),
    new Question(
        "Cosmo Property has historical data that they no longer frequently access and need to archive. Which Amazon S3 feature can they use to reduce costs in doing so?", ["Elastic File System (EFS)", "Storage Classes", "Object Tagging", "S3 Versioning"], "Storage Classes"
    ),
    new Question(
        "The Solution Architect at Auto Car is designing various services and resources architecture to be deployed on AWS. Which of the following should they not do as part of the general design principle of Well-Architected Framework in AWS?", ["Stop guessing your capacity needs", "Drive architectures using data", "Test systems at production scale", "Create static architecture"], "Create static architecture"
    ),
    new Question(
        "Sun Solar needs to keep using on-premises data centres due to government requirements. However, they want to augment some of their on-premises resources by providing overflow capacity. Which cloud model can they adopt?", ["Private Cloud", " Public Cloud", "Hybrid Cloud", "GovCloud"], "Hybrid Cloud"
    ),
    new Question(
        "Which type of Cloud Model is AWS GovCloud?", [" Community", "Hybrid", " Private", "Public"], " Community"
    ),
    new Question(
        "According to the Shared Responsibility Model, what is Sun Solar’s responsibility for various AWS resources?", [" Encryption of Data", "Infrastructure Security", " Network Cabling", "Hardware Firmware"], " Encryption of Data"
    ),
    new Question(
        "According to the Shared Responsibility Model, AWS manages hypervisors. What is the other resource that AWS manages?", ["Firmware Updates", " Instance Settings", "Python", "Sass"], "Firmware Updates"
    ),
    new Question(
        "Under the Shared Responsibility Model, Auto Car and AWS share configuration management. Which is the other control that will be shared between them?", ["Physical Controls", "Environmental Controls", " Zone Security", "Patch Management"], "Patch Management"
    ),
    new Question(
        "Under the Shared Responsibility Model, what needs to be done when A lambda function is throwing errors?", ["The customer should report all code errors to AWS", "AWS support will access and troubleshoot the error", "The customer should troubleshoot the server hosting Lambda", " The customer needs to debug the function and fix errors"], " The customer needs to debug the function and fix errors"
    ),
    new Question(
        "How can Cosmo Property provide secure internet access to its EC2 instances deployed in a Virtual Private Cloud?", ["Configure IAM Policy", "Configure Network ACLs", "Deploy a NAT Gateway", 
        "Create a Security Group"], "Deploy a NAT Gateway"
    ),
    new Question(
        "Cosmo Property wants to host its PCI-DSS compliance reports. Which of the following resources can be used to achieve this?", ["AWS CloudTrail", " AWS Audit Manager", "AWS Artifact", " AWS Certificate Manager"], "AWS Artifact"
    ),
    new Question(
        "Auto Car wants to automate their discovery of Personal Health Information (PC) stored in Amazon S3. What can they use to achieve this?", ["AWS Artifact", "AWS CloudTrail", "Amazon Macie", "AWS Audit Manager"], " Amazon Macie"
    ),
    new Question(
        "What AWS feature can Auto Car use to evaluate their control settings for compliance with government regulations?", [" Amazon CloudTrail", "Amazon Inspector", " Amazon CloudWatch", "Audit Manager"], "Audit Manager"
    ),
    
];





let quiz = new Quiz(questions);


displayQuestion();

// Add A CountDown for the Quiz
let time = 20;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown(){
    let quizTimer = setInterval(function(){
    if(quizTime <= 0) {
        clearInterval(quizTimer);
        showScores();
    } else {
        quizTime--;
        let sec = Math.floor(quizTime % 60);
        let min = Math.floor(quizTime / 60) % 60;
        counting.innerHTML = `TIME: ${min} : ${sec}`;   
    }
},1000);
}

startCountdown();
