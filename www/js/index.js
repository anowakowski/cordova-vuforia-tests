
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        var errors = document.getElementById('');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        document.getElementById('startVufTrackers').onclick = function () {
            app.startVufTrackers();
        };
        document.getElementById('startVuforiaWithPluginTest').onclick = function () {
            app.startVuforiaWithPluginTest();
        };

        document.getElementById("logInfo").innerHTML = "end receivedEvent";
    },

    startVuforiaWithPluginTest(){
        document.getElementById("logInfo").innerHTML = "startVuforia";
        var options = {
            databaseXmlFile: 'PluginTest.xml',
            targetList: [ 'logo', 'iceland', 'canterbury-grass', 'brick-lane' ],
            overlayMessage: 'Point your camera at a test image...',
            vuforiaLicense: 'AR20Sjb/////AAAAGZ96LHpbSUNhgypY9cVx7vQWshcituXJnKUKU5SKvsk3E1bOhHCjx1FMFzecKKBt/r+dYsQIgt5SqfV9LwRh4WKRVR5h4a4+i1FP1tHbFukNTxQW3Sy4OwO1pEAIIYSmclMFKf78nlRRXCblBvcJp9MSgybRSukb8CQvYBKmvRgwejDHqTsu6Q/pJeqbRtISCQU2hNM+Q92qG3PN3S3maJk28nqVfgJsf9mKUcW1H8+7mgykDT7YTURpTb1dFQFBr2dOSpQ+ToFZJKz4NrULQ5O3eSKgTxBe/tMgfwu3Y/IVlvyXYoL2LOZLsREMWKHv501btR6m98Mn12USrUrXn/a7fiONUmHgLSHHVh8nA1tT'
          };

            successCallback = function(data) {
                document.getElementById("logInfo").innerHTML = data.result.imageName;
                console.log('Found '+ data.result.imageName);
                
                if(data.status.imageFound) {
                    alert("Image name: "+ data.result.imageName);
                  }
                  else if (data.status.manuallyClosed) {
                    alert("User manually closed Vuforia by pressing back!");
                }
            }; 
          
          navigator.VuforiaPlugin.startVuforia(
            options,
            successCallback,
            function(data) {
                var errors = "Error: " + data;
                document.getElementById("errorContainer").innerHTML = errors;
                alert(errors);
            });
    },

    startVufTrackers(){
        document.getElementById("logInfo").innerHTML = "startVufTrackers";
        navigator.VuforiaPlugin.startVuforiaTrackers(
            function (data) {
              console.log(data);
              
              alert('Started Vuforia Trackers' + data);
            },
            function (data) {
              console.log("Error: " + data);
            }
          );
    },

};

app.initialize();