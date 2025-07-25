import moment from "moment"
import html2canvas from "html2canvas"

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

//get lightest avg color
export const getLightColorFromImage=(imageUrl)=>{
    return new Promise((resolve,reject)=>{
        //check if imageUrl is valid
        if (!imageUrl || typeof imageUrl !== 'string'){
            return reject(new Error('Invalid image url'))
        }

        const img = new Image();

        //if not a base64 string set crossOrigin (important for Cors)
        if (!imageUrl.startsWith('data:')){
            img.crossOrigin = 'anonymous'
        }

        img.src = imageUrl;

        img.onload=()=>{
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d');

            canvas.width = img.width
            canvas.height=img.height
            ctx.drawImage(img , 0 ,0);

            const imageData = ctx.getImageData(0,0,canvas.width,canvas.height).data
             
            let r=0,g=0,b=0,count=0;

            for (let i=0;i<imageData.length;i+=4){
                const red = imageData[i];
                const green=imageData[i+1]
                const blue = imageData[i+2]
                const brightness = (red+green+blue)/3

                //only count light pixels (twark thrushhold is needed)
                if (brightness > 180){
                    r += red;
                    g +=green;
                    b += blue;
                    count++
                }
            }

            if (count===0){
                resolve('#ffffff');  //feedback if no bright pixels found
            }else {
                r = Math.round(r/count);
                g = Math.round(g/count);
                b = Math.round(b/count);
                resolve(`rgb(${r},${g},${b})`);
            }
        };

        img.onerror = (e) => {
            console.error(`failed to load image`,e);
            reject(new Error('Image could not be loaded or blocked by cors'))
            
        }
    })
};

// Eg: Mar 2025
export function formatYearMonth(yearMonth) {
  return yearMonth ? moment(yearMonth, "YYYY-MM").format("MMM YYYY") : "";
}

export const fixTailwindColors = (element) => {
  const elements = element.querySelectorAll("*");

  elements.forEach((el) => {
    const style = window.getComputedStyle(el);

    ["color", "backgroundColor", "borderColor"].forEach((prop) => {
      const value = style[prop];
      if (value.includes("oklch")) {
        el.style[prop] = "#000"; // or any safe fallback
      }
    });
  });
};

// convert component to image


//utility to convert base64 data url to a file object
export const dataURLtoFile = (dataUrl,fileName)=>{
    const arr = dataUrl.split(",")
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n= bstr.length
    const u8arr = new Uint8Array(n)

    while(n--){
        u8arr[n]=bstr.charCodeAt(n);
    }

    return new File([u8arr],fileName,{type:mime});
}
