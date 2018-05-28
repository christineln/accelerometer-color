if (window.DeviceOrientationEvent != undefined) {
    window.addEventListener('deviceorientation', function (eventData) {

        function map(value, fromMin, fromMax, toMin, toMax) {
            return toMin + (value - fromMin) * (toMax - toMin) / (fromMax - fromMin);
        }

        // Raw values
        var a = eventData.alpha; // Range: 0 to 360
        var b = eventData.beta; // Range: -180 to 180
        var c = eventData.gamma; // Range: -90 to 90

        // No support
        if (!a) {
            document.querySelector('.warning').style.display = 'block';
        } else {
            // Map to RGB (from 0 to 255)
            var remappedA = map(a, 0, 360, 0, 255);
            var remappedB = map(b, -180, 180, 0, 255);
            var remappedC = map(c, -90, 90, 0, 255);

            // Background color
            var colorValue = "rgb(" + Math.round(remappedA) + "," + Math.round(remappedB) + "," + Math.round(remappedC) + ")";
            document.querySelector('.color').style.backgroundColor = colorValue;

            // Meta color
            document.querySelector('meta[name="theme-color"]').setAttribute('content',  colorValue);

            // Text values
            document.querySelector('.text').textContent = Math.round(a) + "=" + Math.round(remappedA) + "," + Math.round(b) + "=" + Math.round(remappedB) + "," + Math.round(c) + "=" + Math.round(remappedC);
        }
    }, false);
}
