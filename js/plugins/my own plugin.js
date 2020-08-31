(function() {
   'use strict';
   Graphics._throttle=false;
   Graphics._canRender = function() {
       if(!!this._app.stage){
         return Graphics._throttle=!Graphics._throttle;
       }else return false;
   };
})();
