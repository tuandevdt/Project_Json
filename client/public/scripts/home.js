        //SLIDER MAIN
        let conten_sd = document.getElementById('content-sd');
        let leftSlider = document.getElementById('left1');
        let rightSlider = document.getElementById('right1');
            rightSlider.addEventListener('click', () => {
            let listSlider = document.querySelectorAll('.img-slider');
            document.getElementById('slider-main').appendChild(listSlider[0]);
            
        });
        leftSlider.addEventListener('click', () => {
            let listSlider = document.querySelectorAll('.img-slider');
         
           
            document.getElementById('slider-main').prepend(listSlider[listSlider.length-1]);
           
        });

  

   

        //SLIDER DANH MỤC SẢN PHẨM
        let btnLeftModel = document.getElementById('left-model');
        let btnRightModel = document.getElementById('right-model');
        btnRightModel.addEventListener('click', () => {
        let listSlider = document.querySelectorAll('.img-model');
        document.getElementById('models-slid').appendChild(listSlider[0]);

        });
        btnLeftModel.addEventListener('click', () => {
        let listSlider = document.querySelectorAll('.img-model');
        document.getElementById('models-slid').prepend(listSlider[listSlider.length-1]);
        });

        //SLIDER SAN PHAM GIẢM GIÁ
        let btnLeftSale = document.getElementById('left-sale');
        let btnRightSale = document.getElementById('right-sale');
        btnRightSale.addEventListener('click', () => {
        let listSlider = document.querySelectorAll('.sale-model');
        document.getElementById('models-sale').appendChild(listSlider[0]);
        });
        btnLeftSale.addEventListener('click', () => {
        let listSlider = document.querySelectorAll('.sale-model');
        document.getElementById('models-sale').prepend(listSlider[listSlider.length-1]);
        });

        //SLIDER SAN PHAM BÁN CHẠY
        let btnLeftSelling = document.getElementById('left-selling');
        let btnRightSelling = document.getElementById('right-selling');
        btnRightSelling.addEventListener('click', () => {
        let listSlider = document.querySelectorAll('.selling-model');
        document.getElementById('models-selling').appendChild(listSlider[0]);
        });
        btnLeftSelling.addEventListener('click', () => {
        let listSlider = document.querySelectorAll('.selling-model');
        document.getElementById('models-selling').prepend(listSlider[listSlider.length-1]);
        });
