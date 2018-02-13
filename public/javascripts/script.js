window.onload = function(){
  var specN1 = document.getElementById("spec-n1");
  var specList = document.getElementById("spec-list");
  var hugeImg = document.getElementById("hugeImg");
  var zoomdiv = document.getElementById("zoomdiv");
  var bigImg = specN1.getElementsByTagName("img")[0];
  var layer = specN1.getElementsByTagName("div")[0];
  var smallLis = specList.getElementsByTagName("li");
  var smallImgs = specList.getElementsByTagName("img");
  specN1.onmousemove = function(event){
    event = event || window.event;
    this.style.cursor = "move";
    zoomdiv.style.display = layer.style.display = "block";
    var t = event.clientY - getElementTop(this) - layer.clientHeight/2;
    var l = event.clientX - getElementLeft(this) - layer.clientWidth/2;
    
    if (t < 0) {
      t = 0;
    } else if (t > this.clientHeight -layer.clientHeight) {
      t = this.clientHeight -layer.clientHeight;
    }
    if (l < 0) {
      l = 0;
    } else if (l > this.clientWidth - layer.clientWidth) {
      l = this.clientWidth - layer.clientWidth;
    }
    layer.style.top = t + "px";
    layer.style.left = l + "px";
    var scaleX = l/(this.clientWidth - layer.clientWidth);
    var scaleY = t/(this.clientHeight - layer.clientHeight);
    hugeImg.style.left = -scaleX * (hugeImg.clientWidth - zoomdiv.clientWidth) + "px";
    hugeImg.style.top = -scaleY * (hugeImg.clientHeight -zoomdiv.clientHeight) + "px";

  };
   function getElementLeft(element){
            var actualLeft = element.offsetLeft;
            var current = element.offsetParent;
        
            while (current !== null){        
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
        
            return actualLeft;
        }
    
  function getElementTop(element){
      var actualTop = element.offsetTop;
      var current = element.offsetParent;
  
      while (current !== null){        
          actualTop += current.offsetTop;
          current = current.offsetParent;
      }
  
      return actualTop;
  }

  specN1.onmouseout = function(){
    zoomdiv.style.display = layer.style.display = "none";

  };
  for (var i=0; i<smallLis.length; i++) {
    smallLis[i].id = i;
    smallLis[i].onmouseover = function(){
      
      for (var j=0; j<smallImgs.length; j++) {
        smallImgs[j].className = "";
      }
      smallImgs[this.id].className = "img-hover";
      var changeSrc = smallImgs[this.id].getAttribute("src").replace("small","big");
      var changeHugeSrc = smallImgs[this.id].getAttribute("src").replace("small","huge-img");
      bigImg.setAttribute("src",changeSrc);
      hugeImg.setAttribute("src",changeHugeSrc);

    }
  }
  var specForward = document.getElementById("spec-forward");
  var specBackward = document.getElementById("spec-backward");
  var boxUl = specList.getElementsByTagName("ul")[0];
  specForward.onclick = function(event){
    if (boxUl.timer) {
      
      clearInterval(boxUl.timer);
         
    }
    var ulLeft = parseInt(boxUl.style.left);
    if (ulLeft == 0) {
      this.className = "spec-control disabled";
      return false;
    } else if (ulLeft == -496) {
      specBackward.className = "spec-control"
    } 
    var targetL = ulLeft + 62;
    var speed = Math.ceil(62/8);
    boxUl.timer = setInterval(function(){
      ulLeft += speed;
      if (ulLeft >= targetL) {
        ulLeft = targetL;
        boxUl.style.left = ulLeft + "px";
        clearInterval(boxUl.timer);
      }
      boxUl.style.left = ulLeft + "px";
    },20);
  };
  specBackward.onclick = function(event){
    if (boxUl.timer) {
     
      clearInterval(boxUl.timer);
      // event.preventDefault();


      
    }
    var ulLeft = parseInt(boxUl.style.left);
    if (ulLeft == 0) {
      specForward.className = "spec-control"
    } else if (ulLeft == -496) {
      this.className = "spec-control disabled";
      return false;
    }
    var targetL = ulLeft + -62;

    var speed = Math.floor(-62/8);
    boxUl.timer = setInterval(function(){
      ulLeft += speed;
      if (ulLeft <= targetL) {
        ulLeft = targetL;
        boxUl.style.left = ulLeft + "px";
        clearInterval(boxUl.timer);
      }
      boxUl.style.left = ulLeft + "px";
    },20)
  }
  // function move(element,distance,limit,attr) {
  //   var d_attr = parseInt(elment[attr]);
  //   if (d_attr == limit) {
  //     return false;
  //   }
  //   var d_target = d_attr + distance;
  //   var d_speed = distance > 0 ? Math.ceil(distance/8) : Math.floor(distance/8);
  //   var timer = setInterval(function(){
  //     d_attr += d_speed;
  //     if (d_attr )
  //   })
  // }

}
