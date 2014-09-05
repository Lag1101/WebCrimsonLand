/**
 * Created by vasiliy.lomanov on 05.09.2014.
 */

postMessage("I\'m working before postMessage(\'ali\').");

onmessage = function (oEvent) {
    postMessage("Hi " + oEvent.data);
};