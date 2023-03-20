const dog_button = document.getElementById("dog_button");

dog_button.addEventListener("click", getRandomDog);

async function getRandomDog() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        if(!response.ok) {
            throw Error(response.statusText);
        }
        console.log(response);
        const data = await response.json();
        const image_url = data.message;
        const canvas = document.getElementById("picture_canvas");
        const ctx = canvas.getContext("2d");
        const dog_image = new Image();
        dog_image.src = image_url;
        dog_image.onload = function() {
            canvas.width = dog_image.width * 2;
            canvas.height = dog_image.height * 2;
            ctx.drawImage(dog_image, dog_image.width / 2, 0);
            ctx.save();
            setTimeout(function() {
                // ctx.drawImage(dog_image, 0, 0);
                ctx.translate(dog_image.width, dog_image.height);
                ctx.scale(-1, 1);
                ctx.save();
                // ctx.drawImage(dog_image, -dog_image.width, -dog_image.height);
                ctx.drawImage(dog_image, -dog_image.width / 2, -dog_image.height);
                ctx.restore();
            }, 2000);
            setTimeout(secondFunction, 4000);
            function secondFunction() {
                ctx.translate(-dog_image.width / 2, -dog_image.height / 2);
                ctx.scale(1, -1);
                ctx.save();
                ctx.drawImage(dog_image, 0, -dog_image.height / 2);
                ctx.restore();
            };
            setTimeout(thirdFunction, 6000);
            function thirdFunction() {
                ctx.translate(0, -dog_image.height / 2);
                ctx.scale(-1, 1);
                ctx.save();
                ctx.drawImage(dog_image, -dog_image.width, 0);
                ctx.restore();
            };
        }
    } catch(error) {
        console.log(error);
        alert("Sorry, error.")
    }
};