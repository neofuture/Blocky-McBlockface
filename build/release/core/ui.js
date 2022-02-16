let ui = {
    loadSprite: function(imageName){
        var image = new Image();
        image.src = imageName;
        image.onload = function () {
            assets.loadedAssets++;
        };
        return image;
    }
};