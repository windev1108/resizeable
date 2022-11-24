    function makeResizableDiv(div) {
        const element = document.querySelector(div);
        const resizers = document.querySelectorAll(".resizer");
        const elementLeft = element.getBoundingClientRect().left;
        const elementTop = element.getBoundingClientRect().top;
        const elementRight = element.getBoundingClientRect().right;
        const elementBottom = element.getBoundingClientRect().bottom;
      

        console.log("elementLeft:",elementLeft)

        let checkMouseDownX = 0;
        let checkMouseDownY = 0;
      
        let resizableX = 0;
        let resizableY = 0;
      
        let original_x = 0;
        let original_y = 0;
      
        let originalWidth = 0;
        let originalHeight = 0;
      
        resizers.forEach((resizer) => {
          resizer.addEventListener("mousedown", function (e) {
            e.preventDefault();
      
            originalWidth = element.offsetWidth;
            originalHeight = element.clientHeight;
            
            original_x = resizer.getBoundingClientRect().left;
            original_y = resizer.getBoundingClientRect().top;
      
            window.addEventListener("mousemove", resize);
            window.addEventListener("mouseup", stopResize);
           
          });
      
          function resize(e) {
            if (resizer.classList.contains("right")) {
              if (e.pageX > elementRight) {
                element.style.width = e.pageX - element.getBoundingClientRect().left + "px";
              }
            } 
            else if (resizer.classList.contains("bottom")) {
              if (e.pageY > elementBottom) {
                element.style.height = e.pageY - element.getBoundingClientRect().top + "px";
              }
            } 
            else if (resizer.classList.contains("left")) {
              checkMouseDownX++;
              if (checkMouseDownX == 1) {
                resizableX = original_x;
              }
              if (e.pageX < elementLeft) {
                element.style.width =  originalWidth + (original_x - e.pageX) + "px";
                element.style.left =  -(resizableX - e.pageX)   + "px";
              }
            } 
            else if (resizer.classList.contains("top")) {
              checkMouseDownY++;
              if (checkMouseDownY == 1) {
                resizableY = original_y;
              }
              if (e.pageY < elementTop) {
                element.style.height = originalHeight - (e.pageY - original_y) + "px";
                element.style.top = e.pageY - resizableY + "px";
              }
            }
          }
      
          function stopResize(e) {
            window.removeEventListener("mousemove", resize);
          }
          
        });
      }
      
      makeResizableDiv(".resizable");

