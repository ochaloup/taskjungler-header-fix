// Function which loading JQuery
function loadScript(path,callback,chkvar){
  var a=document.createElement('script');
  a.src=path;
  a.type='text/javascript';
  a.onreadystatechange=function(){
    if(this.readyState=='complete'||this.readyState=='loaded')
      callback();
  };
  a.onload=callback;
  if(a.hasOwnProperty('onload')==false) {
    var e=setInterval(function(){
      if(eval(chkvar)){  //chkvar will only be available after js file is loaded.
        clearInterval(e);
        callback();
      }
    },100);
  }
  document.getElementsByTagName('head').item(0).appendChild(a);
}

// Go to load JQuery
if(typeof $ == 'undefined') {
  var isJqueryReady = false; //waiting for jquery is loaded from net - when the element has not onload hook available, it's workarounded by checking in interval whether '$' is defined (see gojquery function)
  var counter = 0; // we don't want to wait forerver - 15000 ms should be enought - otherwise we suppose that the internet connection isn't available and doing quit
  loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js", gojquery, isJqueryReady);
}

function gojquery() {
  // Waiting until JQuery library is loaded
  counter++;
  if(typeof $ == 'undefined') {
    if (counter > 150) {
      isJqueryReady = true;
    }
    return
  } else {
    isJqueryReady = true;
  }

  // .tj_table_header_cell - all pages
  // .tabhead > div - planned work and gant diagram
  var selector = '.tj_table_header_cell, .tabhead > div';  

  $(document).ready(function() {
    // tj_table_header_cell redefininion to be able to take position fixed
    var tableTop = $('.tj_table_frame:first').offset().top + $('.tj_table_headline:first').height() + 12;
    $(selector).each(function() {
      $(this).width($(this).parent().width());
      $(this).css('top', $(this).offset().top - tableTop);
    });
    $(selector)
      .css('position', 'fixed').css('z-index', 999).css('background-color', 'black');
    $(selector).each(function(){
      l = $(this).position().left;
      $(this).css('left', l);
      $(this).attr('data-left', l);
    });
    
    
    // Fixing menu when we scroll to top of the screen
    // grab the initial top offset of the navigation
    var sticky_navigation_offset_top = $('.tabhead:first').offset().top;
     
    // our function that decides weather the navigation bar should have "fixed" css position or not.
    var sticky_navigation = function(){
        var scroll_top = $(window).scrollTop() + 10; // our current vertical position from the top
        // if we've scrolled more than the navigation, change its position to fixed to stick to top,
        // otherwise change it back to relative
        if (scroll_top > sticky_navigation_offset_top) {
          $(selector).css({ 'position': 'fixed' });
        } else {
          $(selector).css({ 'position': 'static' });
        }  
    };
     
    // run our function on load
    sticky_navigation();
    // and run it again every time you scroll
    $(window).scroll(function() {
         sticky_navigation();
    });
  }); // end of $(document).ready

  // Fixing problem with horizontal scrolling
  $('.tj_page .tabhead:first > td:not(.tabcell) > div').scroll(function(){
    var l = $(this).scrollLeft();
    $(selector).each(function() {
      var dataleft = $(this).attr('data-left');
      $(this).css('left', dataleft - l);
    });
  });
}