
requirejs.config({
    //enforceDefine: true,
    baseUrl: 'dist/js',
    waitSeconds : 300,
    paths: {
        app: 'app.min',
        jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min',
        modernizr: 'modernizr',
        foundation : 'foundation.min',
        //velocity : 'velocity.min',
        //backstretch : 'jquery.backstretch.min',
        cookie: 'jquery.cookie.min',
        //readmore: 'readmore.min',
        // easing : 'jquery.easing.min',
        //royalslider : '../../plugins/royalslider/jquery.royalslider.min',
        //waypoints : 'jquery.waypoints.min',
        //lazyloadxt : 'jquery.lazyloadxt.min',
        //lazyloadxtvideo : 'jquery.lazyloadxt.extra.min',
        //scroll_reveal : 'scrollReveal.min',
        picturefill : 'picturefill.min'
    },
    /* Add anything with a dependancy in here */
    shim: {
        jquery : ['modernizr'],
        foundation : ['jquery'],
        //backstretch : ['jquery'],
        //velocity: ['jquery'],
        cookie: ['jquery'],
        //readmore: ['jquery'],
        //easing :  ['jquery'],
        //royalslider :  ['jquery','easing'],
        //waypoints : ['jquery'],
        //lazyloadxt : ['jquery'],
        //lazyloadxtvideo : ['jquery'],
        picturefill : ['jquery'],
        app: ['jquery',
              'cookie',
              //'royalslider',
              'foundation',
              //'readmore',
              //'velocity',
              //'easing',
              //'waypoints',
              //'lazyloadxt',
              //'lazyloadxtvideo',
              //'scroll_reveal',
              'picturefill'
        ]
    }
});

//This function is called when the following are loaded.
requirejs(['modernizr','jquery','app'], function() {


});





