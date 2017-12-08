/*
 * View model for OctoPrint-Debugflags
 *
 * Author: ntoff
 * License: AGPLv3
 */
$(function() {
    function DebugflagsViewModel(parameters) {
        var self = this;
        self.control = parameters[0];
        
        self.control.flag_echo = ko.observable(false); //1
        self.control.flag_info = ko.observable(true); //2
        self.control.flag_error = ko.observable(true); //4
        self.control.flag_dry = ko.observable(false); //8
        self.control.flag_comm = ko.observable(false); //10
        self.control.flag_moves = ko.observable(false); //20
        self.control.flag_debug = ko.observable(false); //40
        
        
        self.control.repetier_setFlags = function(){
            var echo = 0;
            var info = 0;
            var error = 0;
            var dry = 0;
            var comm = 0;
            var moves = 0;
            var debug = 0;
            var debuglevel = 0;

            if (self.control.flag_echo()){
                echo = 1;
            }
            if (self.control.flag_info()){
                info = 2;
            }
            if (self.control.flag_error()){
                error = 4;
            }
            if (self.control.flag_dry()){
                dry = 8;
            }
            if (self.control.flag_comm()){
                comm = 10;
            }
            if (self.control.flag_moves()){
                moves = 20;
            }
            if (self.control.flag_debug()){
                debug = 40;
            }
            debuglevel = echo+info+error+dry+comm+moves+debug;
            console.log("-----------Repetier Firmware Debug Flags-----------")
            console.log("Echo: " + self.control.flag_echo());
            console.log("Info: " + self.control.flag_info());
            console.log("Error: " + self.control.flag_error());
            console.log("Dry Run: " + self.control.flag_dry());
            console.log("Comms: " + self.control.flag_comm());
            console.log("Moves: " + self.control.flag_moves());
            console.log("Debug: " + self.control.flag_debug());
            
            self.control.sendCustomCommand({ command: "M111 S" + debuglevel });
        }

        $("#control-jog-general").after("\
            <div id=\"debug\">\
                <h1>Debug</h1>\
                <div  id=\"debug-button-container\">\
                    <form class=\"form-horizontal\">\
                        <div  class=\"jog-panel\">\
                            <div>\
                                <input class=\"pull-left\" type=\"checkbox\" data-bind=\"checked: $root.flag_echo\"> Echo</input>\
                            </div>\
                            <div>\
                                <input class=\"pull-left\" type=\"checkbox\" data-bind=\"checked: $root.flag_info\"> Info</input>\
                            </div>\
                            <div>\
                                <input class=\"pull-left\" type=\"checkbox\" data-bind=\"checked: $root.flag_error\"> Error</input>\
                            </div>\
                            <div>\
                                <input class=\"pull-left\" type=\"checkbox\" data-bind=\"checked: $root.flag_dry\"> Dry Run</input>\
                            </div>\
                            <div>\
                                <input class=\"pull-left\" type=\"checkbox\" data-bind=\"checked: $root.flag_comm\"> Comms</input>\
                            </div>\
                            <div>\
                                <input class=\"pull-left\" type=\"checkbox\" data-bind=\"checked: $root.flag_moves\"> Moves</input>\
                            </div>\
                            <div>\
                                <input class=\"pull-left\" type=\"checkbox\" data-bind=\"checked: $root.flag_debug\"> Debug</input>\
                            </div>\
                            <button class=\"btn btn-default\" data-bind=\"click: function() { $root.repetier_setFlags() }\">Set Flags</button></p>\
                        </div>\
                    </form>\
                </div>\
            </div>");
    }


    OCTOPRINT_VIEWMODELS.push({
        construct: DebugflagsViewModel,

        dependencies: [ "controlViewModel" /* "loginStateViewModel", "settingsViewModel" */ ],

        elements: [ /* ... */ ]
    });
});
