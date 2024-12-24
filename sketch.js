let rotationAngle = 0;
let Angle = 0; // 라이트 선 
let isDragging = false;
let dragStartAngle = 0;
let Type = 0;
let speed = 0.2; // 속도를 0.5로 설정하여 느리게 회전하도록

let textString = "Happy Holiday"; // 원형으로 배치할 문자열
let radius = 46; // 원의 반지름 ->텍스트 위치 조정할 때 씀

let stripeCount = 30; // 스트라이프 개수
let angleStep = 360 / stripeCount; // 각 스트라이프의 각도

//엘피 판 줄무늬 관련
let strokeWeights = [];
let opacities = [];
  let maxRadius = 175;  // 최대 반지름 (지름 350)
  let numCircles = 40;  // 그릴 원의 개수

//전체적으로 사이즈 키우기
let lpScale = 1.5;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  
  textAlign(CENTER, CENTER); // 텍스트 중심 정렬

  input = createInput();
  input.input(typing);

  textFont("Black Han Sans");
  
    // 랜덤 값 한 번만 배정(엘피 판 줄무늬)
  for (let s = 0; s < numCircles; s++) {
    strokeWeights[s] = random(1, 4);  // strokeWeight를 1, 2, 3 중 랜덤으로 설정
    opacities[s] = random(50, 90);  // 투명도 값을 200에서 240 사이로 설정
  }
  
  
}

function typing() {
  textString = input.value();
}


function draw() {
  background("#E6E5DC");    
  translate(width / 2, height / 2);
  
  if (!isDragging) {
    rotationAngle += 1; // 자동 회전
  }
  
  scale(lpScale);
  push();
  rotate(rotationAngle);
  setLPStyle();
  drawLP();
  LpStripe();
  setLabelStyle();
  
pop();
  
  staticLight();  //같이 회전 안하는 고정 라이트

push();  
    

pop();  
  
  
}

// LP 스타일 설정
function setLPStyle() {
  if (Type === 0) {
    noStroke();
    fill(5, 5, 5, 230); //검은색    
   
  } else if (Type === 1) {
    fill('#33FF57');
    stroke('#39C700');
    strokeWeight(4);

  } else if (Type === 2) {
    fill('#3357FF');
    stroke('#0039C7');
    strokeWeight(6);

  } else if (Type === 3) {
    fill('#F3FF33');
    stroke('#C7C700');
    strokeWeight(8);

  }
}

// LP 그리기
function drawLP() { 
  ellipse(0, 0, 350, 350);  
  stroke(1);
  strokeWeight(2);
  stroke(0, 0, 0, 5);
  noFill();
  ellipse(0, 0, 340, 340); //라인
  ellipse(0, 0, 270, 270); //라인
  ellipse(0, 0, 170, 170); //라인

  fill(0, 0, 0, 30); //얘때문에 뭔가 그라데이션이 생기는데 이유를 모르겠어 
  ellipse(0, 0, 140, 140); // 제일 안쪽 어두운 영역
  // noFill(); //아 여기 다시 이거 해주니까 그라데이션 안생긴다.. 아까 스트라이프쪽에 필이 들어가서 안쪽이 더 어둡게       

}

function staticLight() { 
 
 
   noFill();
    //blendMode(OVERLAY);
    stroke(255,255,255); // 하얀색 선
    strokeWeight(1); 
    strokeJoin(ROUND); // 선의 끝을 둥글게 설정   
    rotate(Angle);
    arc(0, 0, 160, 160, -3-30, 3-30);
    arc(0, 0, 180, 180, -4-30, 4-30);
    arc(0, 0, 240, 240, -5-30, 5-30);
    arc(0, 0, 300, 300, -6-30, 6-30);
    arc(0, 0, 318, 318, -6-30, 6-30);
  
//     arc(0, 0, 160, 160, -3+180, 3+180);
//     arc(0, 0, 180, 180, -4+180, 4+180);
//     arc(0, 0, 240, 240, -6+180, 6+180);
//     arc(0, 0, 300, 300, -7+180, 7+180);
//     arc(0, 0, 318, 318, -5+180, 5+180);

    // 1도씩 왔다갔다 하도록 회전 각도 조정 (속도 감소)
    Angle += speed;
    // 회전 각도가 -1도에서 1도 사이를 왔다 갔다 하도록 반전
    if (Angle >= 1 || Angle <= -1) {
      speed = -speed; // 방향 반전
    }
 // 빛
    fill(255, 255, 255, 5);
    arc(0, 0, 350, 350, -30, 30);
    arc(0, 0, 350, 350, -30 + 180, 30 + 180);

    // 그림자
    fill(0, 0, 0, 5);
    arc(0, 0, 350, 350, 30, 150);
    arc(0, 0, 350, 350, 210, 330);
   
 
  
}

//라벨 스타일 설정
function setLabelStyle() {
  if (Type === 0) {
    fill(240, 230, 220);
    ellipse(0, 0, 120, 120);
    //스트라이프    
    angleMode(RADIANS);
      for (let j = 0; j < stripeCount; j++) {
      let startAngle = j * angleStep;
      let endAngle = startAngle + angleStep; // 스트라이프의 두께 조정
      if (j % 2 === 0) {
        fill(255, 77, 41); // 빨간색
      } else {
        fill(0, 166, 100); // 녹색
      }
      noStroke();
      arc(0, 0, 80, 80, radians(startAngle), radians(endAngle), PIE);
        }

    //글자시작
    angleMode(DEGREES); // 각도를 도 단위로 사용
    //let angleStep = 360 / textString.length; // 각 글자 간의 각도
    let typeStep = 25; // 각 글자 간의 각도
    for (let i = 0; i < textString.length; i++) {
      let currentChar = textString.charAt(i); // 현재 문자
      let angle = i * typeStep; // 현재 문자의 각도
      push();
        fill(0,0,0,200); //검은글자
        textSize(24);
        rotate(angle); // 원의 중심에서 회전
        translate(0, -radius); // 반지름만큼 위로 이동
        // rotate(-angle); // 텍스트를 읽을 수 있도록 반대로 회전
        text(currentChar, 0, 0); // 텍스트 그리기
      pop();
    } 
    
  } else if (Type === 1) {
    fill('#03A9F4');
    ellipse(0, 0, 120, 120);
   // stroke('#39C700');
    //strokeWeight(4);
  } else if (Type === 2) {
    fill('#3357FF');
    ellipse(0, 0, 120, 120);
   // stroke('#0039C7');
    //strokeWeight(6);
  } else if (Type === 3) {
    fill('#E91E63');
    ellipse(0, 0, 120, 120);
    //stroke('#C7C700');
    //strokeWeight(8);
  }
  
  fill("#444444");
  ellipse(0, 0, 10, 10); //구멍
  
}


// function drawLabel() {
//   ellipse(0, 0, 120, 120);
// }


// 마우스 클릭 처리
function mousePressed() {
    // LP판 영역 터치
  let d = dist(width / 2, height / 2, mouseX, mouseY);
  if (d > 50*lpScale && d < 170*lpScale) {
    changeType(1); // 스타일 변경
    }
  
 //  if (mouseX > 25 && mouseX < 475 && mouseY > 25 && mouseY < 475) {
 //   changeType(1); // 스타일 변경
//  } 
  
  // LP 회전 영역 클릭 및 드래그 시작
  if (isInsideLP(mouseX, mouseY)) {
    startDragging(mouseX, mouseY);
  }
}

function mouseDragged() {
  if (isDragging) {
    updateRotation(mouseX, mouseY);
  }
}

function mouseReleased() {
  stopDragging();
}

// 모바일 터치 이벤트
function touchStarted() {
    // LP판 영역 터치
 // if (touches[0].x > 25 && touches[0].y < 475 && touches[0].y >25 && touches[0].y < 475) {
 //    changeType(1); // 스타일 변경
 //  }

  let d = dist(width / 2, height / 2, touches[0].x, touches[0].y);
  if (d > 50*lpScale && d < 170*lpScale) {
    changeType(1); // 스타일 변경
    }
  
  // LP 회전 영역 클릭 및 드래그 시작
 if (isInsideLP(touches[0].x, touches[0].y)) {
    startDragging(touches[0].x, touches[0].y);
  }
  return false;
}

function touchMoved() {
  if (isDragging) {
    updateRotation(touches[0].x, touches[0].y);
  }
  return false;
}

 function touchEnded() {
  stopDragging();
  return false;
}

// LP 영역 안에 있는지 확인
function isInsideLP(x, y) {
  let d = dist(x, y, width / 2, height / 2);
  return d < 600/2;
}

// 스타일 변경
function changeType(direction) {
  Type = (Type + direction + 4) % 4; // 4가지 스타일 순환
}

// 드래그 시작
function startDragging(x, y) {
  isDragging = true;
  dragStartAngle = atan2(y - height / 2, x - width / 2) - rotationAngle;
}

// 회전 업데이트
function updateRotation(x, y) {
  let currentAngle = atan2(y - height / 2, x - width / 2);
  rotationAngle = currentAngle - dragStartAngle;
}

// 드래그 종료
function stopDragging() {
  isDragging = false;
}



function LpStripe() {
  push();
  blendMode(SOFT_LIGHT);
  strokeCap(ROUND);  // 선의 끝을 둥글게 설정
  fill(0,0,0,10);
  // 원을 차곡차곡 그리기
  // 원을 차곡차곡 그리기
  for (let s = 1; s <= numCircles; s++) {
    let radius = map(s, 1, numCircles, 10, maxRadius);  // 원의 반지름을 점차적으로 증가시킴
    let randomColor = color(255, 255, 255, opacities[s - 1]);  // 랜덤 색상과 투명도 생성
    
    stroke(randomColor);  // 선 색상 설정
    strokeWeight(strokeWeights[s - 1]);  // 선 두께 설정

    ellipse(0, 0, radius * 2, radius * 2);  // 원을 그리되, 반지름이 점차 커짐
  }
  pop();
}
