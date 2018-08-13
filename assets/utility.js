export const resizeImage =  function (file, callback) {
if(file.type.match(/image.*/)) {
    var reader = new FileReader();
    reader.onload = function (readerEvent) {
        var image = new Image();
        image.onload = function (imageEvent) {
            var canvas = document.createElement('canvas'),
                max_size = 1024,// TODO : pull max size from a site config
                width = image.width,
                height = image.height;
                if (width > max_size) {
                    height *= max_size / width;
                    width = max_size;
                }

            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(image, 0, 0, width, height);
            var dataUrl = canvas.toDataURL('image/jpeg', 0.8);

            var blobBin = atob(dataUrl.split(',')[1]);
            var array = [];
            for(var i = 0; i < blobBin.length; i++) {
                array.push(blobBin.charCodeAt(i));
            }
            var outputFile=new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
            callback(outputFile);
            return outputFile;
        }
        image.src = readerEvent.target.result
    }
    reader.readAsDataURL(file);
}
}