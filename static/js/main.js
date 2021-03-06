$(document).ready( function() {
  $('#search-results').perfectScrollbar();

})
/*
window.addEventListener('load', function(e) {

  window.applicationCache.addEventListener('updateready', function(e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
      // Browser downloaded a new app cache.
      console.log('la');
      if (confirm('A new version of this site is available. Load it?')) {
        console.log('reload');
        window.location.reload();
      }
    } else {
      console.log('man didn chang')
      // Manifest didn't changed. Nothing new to server.
    }
  }, false);

}, false);
*/


function enableApps() {
  if (document.getElementById('search-panel').className=="searching") {
    se = " searching";
  } else {
    se=""
  }
  var wp = document.getElementById("apps");
  wp.className="active"+se;
  var cont = document.getElementById("widgets");
  cont.className="";
  var wp_ = document.getElementById("app-view");
  wp_.className="active" + se;
  var cont_ = document.getElementById("widget-view");
  cont_.className="";
}
function enableWidgets() {
  if (document.getElementById('search-panel').className=="searching") {
    se = " searching";
  } else {
    se=""
  }
  var wp = document.getElementById("apps");
  wp.className="";
  var cont = document.getElementById("widgets");
  cont.className="active"+se;
  var wp_ = document.getElementById("app-view");
  wp_.className="";
  var cont_ = document.getElementById("widget-view");
  cont_.className="active"+se;
}

function showSearchPanel() {
  var p = document.getElementById('search-panel');
  p.className='searching';

  if (document.getElementById("apps").className=="active"){
      var a_s = " active";
      var w_s="";
  } else if (document.getElementById("widgets").className=="active") {
    var w_s = " active";
    var a_s="";
  } else {
    var w_s = " active";
    var a_s=""
  }

  var a = document.getElementById('app-view');
  a.className='searching'+a_s;
  var w = document.getElementById('widget-view');
  w.className='searching'+w_s;

}
function hideSearchPanel() {
  var p = document.getElementById('search-panel');
  p.className='';
  if (document.getElementById("apps").className=="active"){
      var a_s = "active";
      var w_s="";
  } else {
    var w_s = "active";
    var a_s="";
  }
  var a = document.getElementById('app-view');
  a.className=a_s;
  var w = document.getElementById('widget-view');
  w.className=w_s;
}

function setSearchInput(query) {
  var s =document.getElementById('search-input');
  s.value = query+' ';
  searchFunction(query);
  s.focus();
}

function searchFunction(data) {
  if (data != '') {
    showSearchPanel();
    $.getJSON( "/search?q="+data, function( d ) {
      $('#search-results').empty();
      var res= d.results;
      if (d.responseType=='plugin-results') {
        $.each( res, function(k,v) {
          var a = document.createElement('a');
          if (v.type == 'image'){
            a.className='item-img';
            a.href=v.url;
            a.style.borderColor=v.brand_color;
            var img= document.createElement('div');
            img.className = 'img';
            img.style.background = "url('"+v.img+"') center center";
            img.style.backgroundSize = "contain";
            img.style.backgroundRepeat = "no-repeat";
            a.appendChild(img);
            var t = document.createElement('p');
            t.innerHTML = v.text;
            a.appendChild(t);
          } else if (v.type == 'basic') {
            a.className='item-basic';
            a.href=v.url;
            a.style.borderColor=v.brand_color;
            var t = document.createElement('p');
            t.innerHTML = v.text;
            a.appendChild(t);
          }
          $('#search-results').append(a);
        });
      } else if (d.responseType=='plugins-available') {
        var sugg_title = document.createElement('p');
        sugg_title.innerHTML = 'Search Suggestions:';
        sugg_title.className='plugins-title';
        $('#search-results').append(sugg_title);
        for (var key in res) {
          var d = document.createElement('div');
          d.className='plugin-suggestion';
          var header = document.createElement('a');
          header.className='pl-name';
          header.innerHTML=key+':';
          /*header.style.borderColor=res[key]['brand-color'];*/
          header.style.backgroundColor=res[key]['brand-color'];
          d.appendChild(header);
          for (i = 0; i < res[key]['domains'].length; i++) {
            var a = document.createElement('a');
            a.className='pl-domain';
            a.style.borderColor=res[key]['brand-color'];
            a.style.color=res[key]['brand-color'];
            a.setAttribute("onclick","setSearchInput('"+res[key]['domains'][i]+"')");
            a.innerHTML=res[key]['domains'][i];
            d.appendChild(a);
          };
          $('#search-results').append(d);
        }

      }
      $('#search-results').perfectScrollbar('update');
    })
  } else {
    hideSearchPanel()
  }
}
