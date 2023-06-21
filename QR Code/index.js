let qr_txt,qr_code_url,is_qr_generated=false;

let input_qr_text = document.querySelector("#input_qr_text");
let qr_code_view_area = document.querySelector(".qr_code_view_area");
let qr_code_img = document.querySelector("#qr_code_img");

let generate_qr_btn = document.querySelector(".generate_qr_btn");
let download_qr_btn = document.querySelector(".download_qr_btn");

// generate qr code
generate_qr_btn.addEventListener("click",()=>{
    if(is_qr_generated==false){
        qr_txt = input_qr_text.value;

        if(qr_txt==""){
            alert("Write some text!");
        }else if(window.navigator.onLine!=true){
            alert("Oops! No internet connection");
        }else{
            GenerateQR();
        }
    }else{
        // reset qr code
        is_qr_generated = false;
        input_qr_text.classList.remove("hide_view");
        qr_code_view_area.classList.add("hide_view");
        generate_qr_btn.innerHTML = "Generate <i class='bx bx-chevron-right' ></i>";
        download_qr_btn.classList.add("disable_btn");
    }
});

function GenerateQR(){
    input_qr_text.classList.add("hide_view");
    qr_code_view_area.classList.remove("hide_view");

    qr_code_url = `https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=`+qr_txt;
    qr_code_img.src = qr_code_url;
    is_qr_generated=true;
    generate_qr_btn.innerHTML = "Reset QR  <i class='bx bx-reset'></i>";
    download_qr_btn.classList.remove("disable_btn");
}

// download qr code
download_qr_btn.addEventListener("click",()=>{
    if(is_qr_generated==true){
        if(qr_code_url!="" && qr_code_url!=null){
            fetch(qr_code_url)
            .then(resp => resp.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "qr-code.png";
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            }).catch(()=>{
                alert("Oops! failed to download qr code!");
            })
        }else{
            alert("Invalid Image URL");
        }
    }
});