//
// Rafal 'bl4de' Janicki <bloorq@gmail.com>
//
// getUserMedia WebKit demo - main script
//

(function () {
    "use strict";

    var video = document.querySelector('video');
    var timelapse = document.getElementById('timelapse');

    var btnSave = document.getElementById("saveImage");
    btnSave.addEventListener('click', startSaving, false);

    // intentionally global objects
    var _interval, _counter = 0;
    var _filters = [
        'huerotate',
        'grayscale',
        'sepia',
        'blur',
        'contrast',
        'invert',
        'saturate'
    ];


    function hasGetUserMedia() {
            // Note: Opera is unprefixed.
            return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia || navigator.msGetUserMedia);
        }

        function startSaving() {
            _interval = setInterval(saveImage, 750);
        }

        function saveImage() {
            if (_counter++ > 10) {
                clearInterval(_interval);
            }

            var _canvas = document.createElement('canvas');
            _canvas.setAttribute("width", "160");
            _canvas.setAttribute("height", "120");
            _canvas.setAttribute("class",
                _filters[ Math.floor(Math.random() * _filters.length)]);

            timelapse.appendChild(_canvas);
            var _context = _canvas.getContext('2d');
            _context.drawImage(video, 0, 0, 160, 120);
        }

        if (hasGetUserMedia()) {

            var onFailSoHard = function (e) {
                console.log('Reeeejected!', e.message);
            };

            navigator.webkitGetUserMedia({video: true, audio: false},
                function(localMediaStream) {

                    video.style.display = "none";
                    video.src = window.URL.createObjectURL(localMediaStream);


                    video.onloadedmetadata = function (e) {
                    // Ready to go. Do some stuff.
                    console.log(e);
                };
            }, onFailSoHard);

    } else {
        alert('getUserMedia() is not supported in your browser');
    }
})();
