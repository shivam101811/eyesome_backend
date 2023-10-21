const conformOrderTemplate = (username) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Our Website</title>
        <link rel="stylesheet" href="./style/style.css">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&family=Monoton&display=swap');
    
    
    * {
      box-sizing: border-box;
      margin: 0;
      font-family: 'Josefin Sans', sans-serif;
      line-height: 1.2;
    }
    .welcome-page{
      background:#e8e7e5;
      text-align:center;
      padding:20px 0;
    
    }
    .welcome-page > h1{
      font-size:50px;
    }
    
    .welcome-page{
      font-size:25px;
    }
    
    
    .text1{
      width:100%;
    /*   background:yellow; */
      border-radius:10px;
      font-size:80px;
      color:black;
      font-weight:900;
      background:#fdd448;
      padding:10px;
    }
    
    .container-box{
      display:flex;
      align-items:center;
      width:100%;
      justify-content:space-between;
      background:#f4d8dd;
      padding:10px;
    }
    
    .container-box1 > p{
      font-size:20px;
      margin:20px 10px;
      
    } 
    
    .btn-1{
      background:#fdd448;
      border:1px solid;
      font-size:20px;
      font-weight:900;
      padding:10px 8px;
      border-radius:10px;
      cursor:pointer;
    }
    
    
    
      
    @media (max-width: 900px){
    .img1{width:300px}
    } 

    @media (max-width: 500px){
      .img1{width:100px}
      } 
      
      
      </style>
    </head>
    
    <body>
        <header>
            <!-- Your website's header content goes here -->
        </header>
    
        <div class="welcome-page">
            <h1>Welcome ${username} to Eyesome</h1>
            <p>Your source for high-quality eyewear and sunglasses.</p>
        </div>
    
        <div class="container-box">
          <div class="container-box1"> <div class="text1">Glasses And Lenses</div>
      <p>Welcome to Eyesome, your gateway to the world of fashionable eyewear."
    </p>
            
      <button class="btn-1">EYESOME</button>      
    </div>
         
          
          
        
        <img class="img1" src="https://eyesome.netlify.app/static/media/bannerImg.712fc34e6a2084115f10.png" alt="glasses">
        </div>
    
        <footer>
            <!-- Your website's footer content goes here -->
        </footer>
    
        <script src="./js/script.js"></script>
        <!-- Add your JavaScript file here if needed -->
    </body>
    
    </html>
    
    `
  }



  module.exports = conformOrderTemplate 